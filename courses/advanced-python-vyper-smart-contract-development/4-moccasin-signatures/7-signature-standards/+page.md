## Signatures & Verification

We're going to talk about signature standards and how they are implemented in smart contracts. We'll look at the different types of signatures and how they work. 

First, we're going to cover the basics of signature verification in Solidity.  We'll create a simple Solidity smart contract to demonstrate signature verification:

```javascript
contract SignatureVerifier {
    function getSignerSimple(uint256 message, uint8 v, bytes32 r, bytes32 s) public pure returns (address) {
        bytes32 hashedMessage = bytes32(message); // if string, we'd use keccak256(abi.encodePacked(string))
        address signer = ecrecover(hashedMessage, v, r, s);
        return signer;
    }

    function verifySignerSimple(
        uint256 message,
        uint8 v,
        bytes32 r,
        bytes32 s,
        address signer
    ) public pure returns (bool) {
        address actualSigner = getSignerSimple(message, v, r, s);
        require(signer == actualSigner);
        return true;
    }
}
```

In this contract, we have two functions.  The first, `getSignerSimple` hashes the message using the `bytes32` data type, and then recovers the signer using the pre-compiled `ecrecover`. The second function, `verifySignerSimple`, retrieves the signer from the message using the `getSignerSimple` function and then compares that address to the expected signer address. It reverts if they aren't the same.

We'll then dive into EIP 191 and 712 and how they are used to improve signature verification. EIP 191 standardizes the format for signed data.  Let's look at the structure for an EIP 191 signature:

```
0x19 <1 byte version> <version specific data> <data to sign>
```

This signature starts with a 0x19 prefix, followed by the one-byte version, which indicates which version of the standard is being used. Next is the version-specific data, which will vary depending on the version. Lastly, the data to sign is appended.

EIP 712 uses a version of this format that is a little more complex to prevent replay attacks. It does this by hashing the data in a structured way:

```
0x19 0x01 <domainSeparator> <hashStruct(message)>
```

The main difference between the EIP 712 and the simple EIP 191 signature is the inclusion of the `domainSeparator`. The domain separator is a hash struct that defines the domain of the message being signed.  

The hash struct is defined as follows:

```javascript
struct EIP712Domain {
    string name;
    string version;
    uint256 chainId;
    address verifyingContract;
    bytes32 salt;
}
```

The domain separator is created by hashing the name, version, chain ID, verifying contract, and salt. 

Let's demonstrate this in Solidity:

```javascript
contract SignatureVerifier {
    bytes32 public constant MESSAGE_TYPEHASH = keccak256(
        "Message(uint256 message)"
    );

    function getMessageHash(string message) public view returns (bytes32) {
        return keccak256(
            abi.encodePacked(
                MESSAGE_TYPEHASH,
                Message(message: message)
            )
        );
    }

    function getSignerEIP712(
        uint256 message,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public view returns (address) {
        bytes1 prefix = bytes1(0x19); // 0x19 is version 1 of EIP-191
        bytes1 eip712Version = bytes1(0x01); // EIP-712 is version 1 of EIP-191
        bytes32 hashStructOfDomainSeparator = _domain_separator;
        bytes32 hashedMessage = keccak256(abi.encodePacked(MESSAGE_TYPEHASH, Message(number: message)));
        bytes32 digest = keccak256(abi.encodePacked(prefix, eip712Version, hashStructOfDomainSeparator, hashedMessage));
        return ecrecover(digest, v, r, s);
    }

    function verifySignerEIP712(
        uint256 message,
        uint8 v,
        bytes32 r,
        bytes32 s,
        address signer
    ) public view returns (bool) {
        address actualSigner = getSignerEIP712(message, v, r, s);
        require(signer == actualSigner);
        return true;
    }
}
```

In this code, we first define the `getMessageHash` function that takes a message and calculates its hash using `keccak256`. We then create a `getSignerEIP712` function. This function follows the EIP 712 format, which means it also takes the domain separator as an argument, as well as the prefix and version. 

The `verifySignerEIP712` function then retrieves the signer from the message, using the `getSignerEIP712` function, and compares it to the expected signer address. It reverts if they are not the same. 

We can also use OpenZeppelin to easily verify signatures:

```javascript
import { SignatureChecker } from "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SignatureVerifier {
    bytes32 public constant MESSAGE_TYPEHASH = keccak256(
        "Message(uint256 message)"
    );

    function getMessageHash(string message) public view returns (bytes32) {
        return keccak256(
            abi.encodePacked(
                MESSAGE_TYPEHASH,
                Message(message: message)
            )
        );
    }

    function getSignerEIP712(uint256 digest, uint8 v, bytes32 r, bytes32 s) public pure returns (address) {
        (address signer, ECDSA.RecoverError recoverError) = ECDSA.tryRecover(digest, bytes32(signatureLength), v, r, s);
        //address signer = ECDSA.recover(hashedMessage, packedSignature);
        // address signer = ecrecover(hashedMessage, v, r, s); 
        // address signer = ecrecover(prefixedHashedMessage, v, r, s);
        return signer;
    }

    function verifySignerEIP712(
        uint256 message,
        uint8 v,
        bytes32 r,
        bytes32 s,
        address signer
    ) public pure returns (bool) {
        address actualSigner = getSignerEIP712(getMessageHash(message), v, r, s);
        require(actualSigner == signer);
        return true;
    }
}
```

This code demonstrates how to use OpenZeppelin's `SignatureChecker` and `ECDSA` libraries for signature verification.  

As we saw in the previous example, EIP 712 utilizes a `domainSeparator`. Let's look at how we can define the domain separator and hash it together with the other data:

```javascript
contract SignatureVerifier {
    bytes32 public constant EIP712DOMAIN_TYPEHASH = keccak256(
        "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
    );
    bytes32 public immutable _domain_separator;

    constructor() {
        _domain_separator = keccak256(
            abi.encode(
                EIP712DOMAIN_TYPEHASH,
                keccak256("SignatureVerifier"),
                keccak256("1"),
                1,
                address(this)
            )
        );
    }

    bytes32 public constant MESSAGE_TYPEHASH = keccak256(
        "Message(uint256 message)"
    );

    function getMessageHash(string message) public view returns (bytes32) {
        return keccak256(
            abi.encodePacked(
                MESSAGE_TYPEHASH,
                Message(message: message)
            )
        );
    }

    function getSignerEIP712(uint256 digest, uint8 v, bytes32 r, bytes32 s) public pure returns (address) {
        (address signer, ECDSA.RecoverError recoverError) = ECDSA.tryRecover(digest, bytes32(signatureLength), v, r, s);
        return signer;
    }

    function verifySignerEIP712(
        uint256 message,
        uint8 v,
        bytes32 r,
        bytes32 s,
        address signer
    ) public pure returns (bool) {
        address actualSigner = getSignerEIP712(getMessageHash(message), v, r, s);
        require(actualSigner == signer);
        return true;
    }
}
```

In this code, we define the `EIP712Domain` struct and then calculate the `_domain_separator` in the constructor. This helps ensure that signatures can only be used with our contract on our chain, along with our application.

This code helps make our smart contract more secure by preventing replay attacks. Replay attacks are where the same transaction can be sent multiple times.  The extra data in the EIP 712 structure prevents this by ensuring that signatures are unique to that specific domain. 
