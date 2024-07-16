---
title:
---

_Follow along with the video_

---

<a name="top"></a>

### Introduction

In this lesson, we will explore Ethereum signature standards, how to sign and verify signatures and what are EIP 191 and EIP 712 standards. These Ethereum Improvement Proposals were introduced to make transaction data more readable and to secure signatures against replay attacks.

### EIP 191 and EIP 712

Before these standards were implemented, signing transactions in Metamask displayed unreadable messages, making it difficult to ensure the correctness of the transaction data. EIP 191 and EIP 712 addressed this by making transaction data more readable while preventing replay attacks. These attacks can occur when the same transaction or signature is reused maliciously multiple times.

### Simple Signature Verification

We can take a look at a simple signature verification contract, which contains the following methods:

1. **`getSimpleSigner`**: this function retrieves the signer by using the precompiled `ecrecover` function and the _v_, _r_ and _s_ values, formerly used to hash the message

   ```js
    function getSignerSimple(uint256 message, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address) {
        bytes32 hashedMessage = bytes32(message); // if string, we'd use keccak256(abi.encodePacked(string))
        address signer = ecrecover(hashedMessage, _v, _r, _s);
        return signer;
    }
   ```

   > 🗒️ **NOTE** <br> > `ecrecover` is a function built into the Ethereum protocol

2. **`verifySignerSimple`**: this function verifies signatures comparing the retrieved signer with the expected one, reverting if they do not match
   ```js
    function verifySignerSimple(
    uint256 message,
    uint8 _v,
    bytes32 _r,
    bytes32 _s,
    address signer
    ) public pure returns (bool) {
    address actualSigner = getSignerSimple(message, _v, _r, _s);
    require(signer == actualSigner);
    return true;
    }
   ```

### EIP 191

To enable transactions with pre-made signatures, or _sponsored transactions_, EIP 191 was introduced. For example, Bob can sign a message and give the signature to Alice, who then will send the transaction and pay for Bob’s gas fees.

<img src="/foundry-merkle-airdrop/10-signature-standards/signed-tx.png" width="100%" height="auto">

EIP 191 standardizes signed data format as follows:

```bash
0x19 <1 byte version> <version specific data> <data to sign>
```

- **0x19 Prefix:** signifies that the data is a signature.
- **1-byte Version:** defines the version of the signed data.
  - `0x00`: Data with an intended validator
  - `0x01`: Structured data, commonly used in production apps and associated with EIP 712
  - `0x45`: Personal signed messages.
- **version specific data**: for version `0x01` for example, it will be the validator address
- **data to sign**: the message we want to sign

### EIP 191 Implementation

We can then set up an EIP 191 signature for a message with the following code:

```js
function getSigner191(uint256 message, uint8 _v, bytes32 _r, bytes32 _s) public view returns (address) {
    // Arguments when calculating hash to validate
    // 1: byte(0x19) - the initial 0x19 byte
    // 2: byte(0) - the version byte
    // 3: version specific data, for version 0, it's the intended validator address
    // 4-6: Application specific data

    bytes1 prefix = bytes1(0x19);
    bytes1 eip191Version = bytes1(0);
    address indendedValidatorAddress = address(this);
    bytes32 applicationSpecificData = bytes32(message);

    // 0x19 <1 byte version> <version specific data> <data to sign>
    bytes32 hashedMessage = keccak256(abi.encodePacked(prefix, eip191Version, indendedValidatorAddress, applicationSpecificData));

    address signer = ecrecover(hashedMessage, _v, _r, _s);
    return signer;
}
```

### EIP 712

EIP 712 (version 0x01) give a structure the data to sign, making signatures more readable and will hold the format:

```bash
0x19 0x01 <domainSeparator> <hashStruct(message)>
```

- **Domain Separator:** is the version specific data
- **hashStruct(message)** is actually `hashStruct(eip712Domain)`, the hash of the struct defining the message domain, which includes the name, version, chain ID, and verifying contract.

  ```js
        struct eip712Domain = {
        string name
        string version
        uint256 chainId
        address verifyingContract
        bytes32 salt
    }
  ```

  This means that the contracts can knoow wherever the signature was crated specifically for that smart contract, because it will be the verifier and it will be encoded in the data.

  We can then rewrite this with

  ```bash
  0x19 0x01 <hashStruct(eip712Domain)> <hashStruct(message)>
  ```

  Where the hashStruct is

```bash
hashStruct(structData) = keccak256(typeHash || hash(structData))
```

### eip712Domain Hash Struct

And the typeHas is an hash of what the actual struct looks like

```js
// Here is the hash of our EIP712 domain struct
bytes32 constant EIP712DOMAIN_TYPEHASH =
    keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");
```

```js
// Here, we define what our "domain" struct looks like
eip_712_domain_separator_struct = EIP712Domain({
  name: "SignatureVerifier",
  version: "1",
  chainId: 1,
  verifyingContract: address(this),
});
```

Will then encoding them toghether and hashing the data

```js
i_domain_separator = keccak256(
  abi.encode(
    EIP712DOMAIN_TYPEHASH,
    keccak256(bytes(eip_712_domain_separator_struct.name)),
    keccak256(bytes(eip_712_domain_separator_struct.version)),
    eip_712_domain_separator_struct.chainId,
    eip_712_domain_separator_struct.verifyingContract
  )
);
```

### Message Hash Struct

We'll define what our message hash struct looks like:

```js
struct Message {
    uint256 number;
}
```

The message type hash will be just the hash of the type Message(uint256)

```js
bytes32 public constant MESSAGE_TYPEHASH = keccak256("Message(uint256 number)");
```

Now we can hash the message struct, which will become the abi encoded type hash alongside the strucured Message data

```js
bytes32 hashedMessage = keccak256(abi.encode(MESSAGE_TYPEHASH, Message({ number: message })));
```

```bash
EIP-712 (version 0x01)

0x19 0x01 <hash of who verifies this signature, and what the verifier looks like>
<hash of signed structured message, and what the signature looks like>
```

### EIP 712 Implementation

```js
contract SignatureVerifier {

    function getSignerEIP712(uint256 message, uint8 _v, bytes32 _r, bytes32 _s) public view returns (address) {
        // Arguments when calculating hash to validate
        // 1: byte(0x19) - the initial 0x19 byte
        // 2: byte(1) - the version byte
        // 3: hashStruct of domain separator (includes the typehash of the domain struct)
        // 4: hashStruct of message (includes the typehash of the message struct)

        bytes1 prefix = bytes1(0x19);
        bytes1 eip712Version = bytes1(0x01); // EIP-712 is version 1 of EIP-191
        bytes32 hashStructOfDomainSeparator = i_domain_separator;

        // now, we can hash our message struct
        bytes32 hashedMessage = keccak256(abi.encode(MESSAGE_TYPEHASH, Message({ number: message })));

        // And finally, combine them all
        bytes32 digest = keccak256(abi.encodePacked(prefix, eip712Version, hashStructOfDomainSeparator, hashedMessage));
        return ecrecover(digest, _v, _r, _s);
    }
}
```

The EIP 712 implementation involves several key steps:

1. First, a domain separator struct is defined, which includes essential data such as the name, version, chain ID, and verifying contract.
2. This struct is then hashed along with its type hash to create the domain separator.
3. Next, a message type hash is created and combined with the actual message data to generate a hashed message.
4. These elements, along with a prefix and version byte, are combined to form a final digest.
5. Finally, the `ecrecover` function is used with the digest and the provided signature to retrieve the signer's address, which is then compared to the expected signer to verify authenticity.

We can then verify this value in the function:

```js
function verifySignerEIP712(
    uint256 message,
    uint8 _v,
    bytes32 _r,
    bytes32 _s,
    address signer
)
    public
    view
    returns (bool)
{
    address actualSigner = getSignerEIP712(message, _v, _r, _s);
    require(signer == actualSigner);
    return true;
}
```

### OpenZeppelin for EIP 712

OpenZeppelin simplifies the process:

- Create the message type hash and hash it with the message data. This will use the function `_hashTypeDataV4` to add the EIP 712 domain and hash everything together to create the digest.

  ```js
  bytes32 public constant MESSAGE_TYPEHASH = keccak256(
  "Message(uint256 message)"
  );
  // returns the hash of the fully encoded EIP712 message for this domain i.e. the keccak256 digest of an EIP-712 encoded message
  function getMessageHash(
    string _message
  ) public view returns (bytes32) {
    return
        _hashTypedDataV4(
            keccak256(
                abi.encode(
                    MESSAGE_TYPEHASH,
                    Message({message: _message})
                )
            )
        );
  }
  ```

- Pass the message through `getMessageHash` for hashing and use `getSigner` to retrieve the signer using `ecdsa.tryRecover`.
  The content in the image is:

```js
function verifySignerOZ(
    uint256 message,
    uint8 _v,
    bytes32 _r,
    bytes32 _s,
    address signer
)
    public
    pure
    returns (bool)
{
    address actualSigner = getSignerOZ(getMessageHash(message), _v, _r, _s);
    require(actualSigner == signer);
    return true;
}
```

```js
function getSignerOZ(uint256 digest, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address) {
    bytes32 hashedMessage = bytes32(message);
    (address signer, /* ECDSA.RecoverError recoverError */, /* bytes32 signatureLength */ ) =
        ECDSA.tryRecover(hashedMessage, _v, _r, _s);

    // The above is equivalent to each of the following:
    // address signer = ECDSA.recover(hashedMessage, _v, _r, _s);
    // address signer = ecrecover(hashedMessage, _v, _r, _s);

    // bytes memory packedSignature = abi.encodePacked(_r, _s, _v); // <-- Yes, the order here is different!
    // address signer = ECDSA.recover(hashedMessage, packedSignature);

    return signer;
}
```

> 👀❗**IMPORTANT** <br>
> EIP 712 prevents replay attacks by ensuring that the structured data includes information that uniquely identifies the transaction and the context in which it is valid.

### Conclusion

EIP 191 is focused on standardizing the format of signed data while EIP 712, on the other hand, extends the concept of data standardization to structured data and version-specific data, which introduces the concept of domain separators to prevent cross-domain replay attacks.

[Back to top](#top)
