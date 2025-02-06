---
title:
---

_Follow along with the video_

---

### Introduction

In this lesson, we will delve into Ethereum signature standards, specifically EIP 191 and EIP 712. We'll learn how to sign and verify signatures, and understand how these standards enhance data readability and security. Prior to these standards, signing transactions in MetaMask resulted in unreadable messages, making it difficult to verify transaction data. EIP 191 and EIP 712 improve data readability and prevent replay attacks, which involve reusing a transaction or signature maliciously.

### Simple Signature Verification

Let's start with a basic signature verification contract. It retrieves the **signer address** using the `ecrecover` function and then verifies signatures by comparing the signer with the expected one.

```solidity
function getSignerSimple(uint256 message, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address) {
    bytes32 hashedMessage = bytes32(message); // If string, use keccak256(abi.encodePacked(string))
    address signer = ecrecover(hashedMessage, _v, _r, _s);
    return signer;
}
```

> 🗒️ **NOTE**:br > `ecrecover` is a function built into the Ethereum protocol.

```solidity
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

EIP 191 facilitates pre-made signatures or _sponsored transactions_. For instance, Bob can sign a message, and Alice can send the transaction and pay for Bob’s gas fees.

::image{src='/foundry-merkle-airdrop/10-signature-standards/signed-tx.png' style='width: 100%; height: auto;'}

This EIP standardizes the signed data format:

```bash
0x19 <1 byte version> <version specific data> <data to sign>
```

- **0x19 Prefix:** Indicates that the data is a signature.
- **1-byte Version:** Defines the signed data version.
  - `0x00`: Data with an intended validator.
  - `0x01`: Structured data, commonly used in production apps and associated with EIP 712.
  - `0x45`: Personal signed messages.
- **Version Specific Data:** For version `0x01`, this is the validator address.
- **Data to Sign:** The message we want to sign.

Here is how to set up EIP 191, by encoding and then hashing the message before retrieving the signer:

```solidity
function getSigner191(uint256 message, uint8 _v, bytes32 _r, bytes32 _s) public view returns (address) {
    // Prepare data for hashing
    bytes1 prefix = bytes1(0x19);
    bytes1 eip191Version = bytes1(0);
    address intendedValidatorAddress = address(this);
    bytes32 applicationSpecificData = bytes32(message);

    // Standardized message format
    bytes32 hashedMessage = keccak256(abi.encodePacked(prefix, eip191Version, intendedValidatorAddress, applicationSpecificData));

    address signer = ecrecover(hashedMessage, _v, _r, _s);
    return signer;
}
```

### EIP 712

EIP-712 is a standard for structuring and signing typed data in Ethereum, enhancing readability and ensuring specificity to certain contracts. The format for signing data using EIP-712 is:

```bash
0x19 0x01 <domainSeparator> <hashStruct(message)>
```

1. **Domain Separator:** Version-specific data.
2. **hashStruct(message):** The hash of the structured message you want to sign.

### EIP 712: Domain Separator

To define the domain separator, we first declare a domain separator struct and its type hash:

```solidity
struct EIP712Domain {
    string name;
    string version;
    uint256 chainId;
    address verifyingContract;
};

bytes32 constant EIP712DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");
```

The domain separator is obtained by encoding and hashing the `EIP712Domain` struct:

```solidity
bytes32 domainSeparator = keccak256(
  abi.encode(
    EIP712DOMAIN_TYPEHASH,
    keccak256(bytes(eip712Domain.name)),
    keccak256(bytes(eip712Domain.version)),
    eip712Domain.chainId,
    eip712Domain.verifyingContract
  )
);
```

### EIP 712: Message Hash Struct

First, define the message struct and its type hash:

```solidity
struct Message {
    uint256 number;
};

bytes32 public constant MESSAGE_TYPEHASH = keccak256("Message(uint256 number)");
```

Then encode and hash them together:

```solidity
bytes32 hashedMessage = keccak256(abi.encode(MESSAGE_TYPEHASH, Message({ number: message })));
```

### EIP 712: Implementation

Steps for EIP 712 implementation:

1. Define a domain separator struct with essential data.
2. Hash the struct and its type hash to create the domain separator.
3. Create a message type hash and combine it with the message data to generate a hashed message.
4. Combine all elements with a prefix and version byte to form a final digest.
5. Use `ecrecover` with the digest and signature to retrieve the signer's address and verify authenticity.

```solidity
contract SignatureVerifier {

    function getSignerEIP712(uint256 message, uint8 _v, bytes32 _r, bytes32 _s) public view returns (address) {
        // Prepare data for hashing
        bytes1 prefix = bytes1(0x19);
        bytes1 eip712Version = bytes1(0x01); // EIP-712 is version 1 of EIP-191
        bytes32 hashStructOfDomainSeparator = domainSeparator;

        // Hash the message struct
        bytes32 hashedMessage = keccak256(abi.encode(MESSAGE_TYPEHASH, Message({ number: message })));

        // Combine all elements
        bytes32 digest = keccak256(abi.encodePacked(prefix, eip712Version, hashStructOfDomainSeparator, hashedMessage));
        return ecrecover(digest, _v, _r, _s);
    }
}
```

We can then verify the signer as in the first example, but using `verifySignerEIP712`:

```solidity
function verifySignerEIP712(
    uint256 message,
    uint8 _v,
    bytes32 _r,
    bytes32 _s,
    address signer
) public view returns (bool) {
    address actualSigner = getSignerEIP712(message, _v, _r, _s);
    require(signer == actualSigner);
    return true;
}
```

### EIP 712: OpenZeppelin

It's recommended to use OpenZeppelin libraries to simplify the process, by using `EIP712::_hashTypedDataV4` function:

- Create the message type hash and hash it with the message data:

  ```solidity
  bytes32 public constant MESSAGE_TYPEHASH = keccak256("Message(uint256 message)");

  function getMessageHash(uint256 _message) public view returns (bytes32) {
      return _hashTypedDataV4(
          keccak256(
              abi.encode(
                  MESSAGE_TYPEHASH,
                  Message({message: _message})
              )
          )
      );
  }
  ```

- Retrieve the signer with `ECDSA.tryRecover` and compare it to the actual signer:

```solidity
function getSignerOZ(uint256 digest, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address) {
    (address signer, /* ECDSA.RecoverError recoverError */, /* bytes32 signatureLength */ ) = ECDSA.tryRecover(digest, _v, _r, _s);
    return signer;
}
```

```solidity
function verifySignerOZ(
    uint256 message,
    uint8 _v,
    bytes32 _r,
    bytes32 _s,
    address signer
) public pure returns (bool) {
    address actualSigner = getSignerOZ(getMessageHash(message), _v, _r, _s);
    require(actualSigner == signer);
    return true;
}
```

> 👀❗**IMPORTANT**:br
> EIP 712 prevents replay attacks by uniquely identifying the transaction.

### Conclusion

EIP 191 standardizes the format of signed data, while EIP 712 extends data standardization to structured data and introduces domain separators to prevent cross-domain replay attacks.
