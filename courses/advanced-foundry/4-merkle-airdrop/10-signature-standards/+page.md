---
title:
---

_Follow along with the video_

---

<a name="top"></a>

## Lesson Overview: Ethereum Signature Standards

### Follow Along with the Video

---

### Introduction

In this lesson, we will delve into Ethereum signature standards, focusing on how to sign and verify signatures, and exploring EIP 191 and EIP 712 standards. These Ethereum Improvement Proposals enhance transaction readability and security against replay attacks.

### EIP 191 and EIP 712

Before these standards, signing transactions in Metamask resulted in unreadable messages, making it hard to verify transaction data. EIP 191 and EIP 712 improve data readability and prevent replay attacks, where a transaction or signature is reused maliciously.

### Simple Signature Verification

Let's examine a basic signature verification contract with the following methods:

1. **`getSimpleSigner`**: Retrieves the signer using the `ecrecover` function with _v_, _r_, and _s_ values.

   ```js
   function getSignerSimple(uint256 message, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address) {
       bytes32 hashedMessage = bytes32(message); // If string, use keccak256(abi.encodePacked(string))
       address signer = ecrecover(hashedMessage, _v, _r, _s);
       return signer;
   }
   ```

   > 🗒️ **NOTE** <br> > `ecrecover` is a function built into the Ethereum protocol.

2. **`verifySignerSimple`**: Verifies signatures by comparing the retrieved signer with the expected one, reverting if they don't match.

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

EIP 191 facilitates pre-made signatures or _sponsored transactions_. For instance, Bob can sign a message, and Alice can send the transaction and pay for Bob’s gas fees.

<img src="/foundry-merkle-airdrop/10-signature-standards/signed-tx.png" width="100%" height="auto">

EIP 191 standardizes the signed data format:

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

### EIP 191 Implementation

Here's how to set up an EIP 191 signature for a message:

```js
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

EIP 712 structures the data to sign, making signatures more readable. The format is:

```bash
0x19 0x01 <domainSeparator> <hashStruct(message)>
```

- **Domain Separator:** Version-specific data.
- **hashStruct(message)**: `hashStruct(eip712Domain)`, including name, version, chain ID, and verifying contract.

  ```js
  struct eip712Domain = {
      string name;
      string version;
      uint256 chainId;
      address verifyingContract;
      bytes32 salt;
  }
  ```

  This ensures the signature is specific to the smart contract.

```bash
0x19 0x01 <hashStruct(eip712Domain)> <hashStruct(message)>
```

### eip712Domain Hash Struct

The type hash is the hash of the struct definition:

```js
bytes32 constant EIP712DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");
```

Define the domain struct:

```js
eip_712_domain_separator_struct = EIP712Domain({
  name: "SignatureVerifier",
  version: "1",
  chainId: 1,
  verifyingContract: address(this),
});
```

Hash and encode the domain struct:

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

Define the message struct:

```js
struct Message {
    uint256 number;
}
```

Create the message type hash:

```js
bytes32 public constant MESSAGE_TYPEHASH = keccak256("Message(uint256 number)");
```

Hash the message struct:

```js
bytes32 hashedMessage = keccak256(abi.encode(MESSAGE_TYPEHASH, Message({ number: message })));
```

### EIP 712 Implementation

```js
contract SignatureVerifier {

    function getSignerEIP712(uint256 message, uint8 _v, bytes32 _r, bytes32 _s) public view returns (address) {
        // Prepare data for hashing
        bytes1 prefix = bytes1(0x19);
        bytes1 eip712Version = bytes1(0x01); // EIP-712 is version 1 of EIP-191
        bytes32 hashStructOfDomainSeparator = i_domain_separator;

        // Hash the message struct
        bytes32 hashedMessage = keccak256(abi.encode(MESSAGE_TYPEHASH, Message({ number: message })));

        // Combine all elements
        bytes32 digest = keccak256(abi.encodePacked(prefix, eip712Version, hashStructOfDomainSeparator, hashedMessage));
        return ecrecover(digest, _v, _r, _s);
    }
}
```

Steps for EIP 712 implementation:

1. Define a domain separator struct with essential data.
2. Hash the struct and its type hash to create the domain separator.
3. Create a message type hash and combine it with the message data to generate a hashed message.
4. Combine all elements with a prefix and version byte to form a final digest.
5. Use `ecrecover` with the digest and signature to retrieve the signer's address and verify authenticity.

Verify the signer:

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

- Create the message type hash and hash it with the message data:

  ```js
  bytes32 public constant MESSAGE_TYPEHASH = keccak256(
      "Message(uint256 message)"
  );
  // Returns the hash of the fully encoded EIP712 message
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

- Use `getMessageHash` for hashing and `getSigner` to retrieve the signer with `ecdsa.tryRecover`.

Verify the signer:

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

Retrieve the signer:

```js
function getSignerOZ(uint256 digest, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address) {
    bytes32 hashedMessage = bytes32(message);
    (address signer, /* ECDSA.RecoverError recoverError */, /* bytes32 signatureLength */ ) =
        ECDSA.tryRecover(hashedMessage, _v, _r, _s);

    return signer;
}
```

> 👀❗**IMPORTANT** <br> > EIP 712 prevents replay attacks by ensuring structured data includes information that uniquely identifies the transaction and its context.

### Conclusion

EIP 191 standardizes the format of signed data, while EIP 712 extends data standardization to structured data and introduces domain separators to prevent cross-domain replay attacks.

[Back to top](#top)
