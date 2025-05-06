## Understanding Ethereum Signatures: EIP-191 and EIP-712 Explained

This lesson explores the fundamentals of signing and verifying messages in Ethereum, focusing on the EIP-191 and EIP-712 standards. We'll cover how signatures are created and verified, the problems these standards solve (like readability and replay attacks), and how to implement verification within smart contracts.

## The Problem: Why Standardized Signatures Matter

Before the introduction of EIP-191 and EIP-712, signing messages off-chain for on-chain verification presented significant challenges:

1.  **Lack of Readability:** Users were often prompted by wallets like Metamask to sign long, cryptic hexadecimal strings. It was impossible for a user to understand what action or data they were actually approving, posing a major security risk. Imagine being asked to sign "0xdeadbeef..." without any context – you wouldn't know if you were authorizing a simple message or transferring valuable assets.
2.  **Replay Attack Vulnerability:** A signature created for one purpose could potentially be reused (replayed) maliciously in a different context. For instance, a signature intended for one smart contract might be submitted to another, or a signature for one network (e.g., a testnet) could be replayed on the mainnet, leading to unintended consequences.
3.  **Need for Meta-Transactions:** Implementing features like sponsored transactions (where one account pays gas for another's action) required a standardized way for smart contracts to securely verify authorization given via an off-chain signature. This is often called a meta-transaction pattern.

EIP-712 was specifically designed to tackle the readability issue by allowing wallets to display structured, human-readable data during the signing process. It also directly addresses replay attacks by incorporating domain-specific information into the signed message hash. Instead of seeing meaningless hex, users see clearly labeled fields detailing the action they are signing.

## Basic Signature Verification in Solidity

At its core, verifying an Ethereum signature involves the `ecrecover` precompiled contract. `ecrecover` takes a *hash* of the message and the three components of an ECDSA signature (v, r, s) as input. It then outputs the public address of the account that created the signature.

**Signature Components (v, r, s):** These values mathematically represent the signature derived from signing a message hash with a private key.

**Hashing:** Crucially, the message itself is not signed directly. Instead, a hash of the message is calculated (typically using `keccak256`), and this hash is what gets signed.

**Recovering the Signer:**
You can implement a basic function to recover the signer's address:

```solidity
// Simple function to recover signer address from a message hash and signature
function getSignerSimple(uint256 message, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address) {
    // Note: In practice, 'message' should be a hash.
    // If starting with a string: keccak256(abi.encodePacked(yourString))
    // Here, we assume 'message' is already the hash or can be directly cast.
    bytes32 hashedMessage = bytes32(message);
    address signer = ecrecover(hashedMessage, _v, _r, _s);
    return signer;
}
```

**Verifying the Signer:**
To verify if a *specific* account signed the message, you compare the recovered address with the expected signer address:

```solidity
// Simple function to verify if the recovered signer matches an expected address
function verifySignerSimple(
    uint256 message, // The message hash
    uint8 _v,
    bytes32 _r,
    bytes32 _s,
    address expectedSigner // The address expected to have signed
) public pure returns (bool) {
    address actualSigner = getSignerSimple(message, _v, _r, _s);
    // Check if the recovered signer matches the expected one
    require(expectedSigner == actualSigner, "Signature verification failed");
    return true;
}
```

**Limitations:** While functional, this basic approach suffers from the problems mentioned earlier: the message data isn't necessarily readable, and the signature isn't protected against replay attacks across different applications or chains.

## EIP-191: Signed Data Standard Format

EIP-191 introduced a standardized *format* for hashing data that is intended to be signed, specifically to prevent signed messages from being mistaken for valid Ethereum transactions. It achieves this by defining a specific prefix.

**EIP-191 Format:**
The data to be hashed follows this structure:
`0x19 <1 byte version> <version specific data> <data to sign>`

*   `0x19`: A prefix byte (decimal 25). This byte value is not used in the standard RLP encoding of Ethereum transactions, ensuring that data formatted this way cannot be misinterpreted as a transaction by Ethereum nodes.
*   `<1 byte version>`: Indicates how the rest of the data is structured. Key versions include:
    *   `0x00`: For signatures intended for a specific validator (contract). `<version specific data>` is the 20-byte address of the intended validator.
    *   `0x01`: For structured data, as used by EIP-712. `<version specific data>` is the 32-byte EIP-712 `domainSeparator`.
    *   `0x45`: Used by the common `personal_sign` method in wallets. No `<version specific data>` is included here; the `<data to sign>` follows directly.
*   `<version specific data>`: Contextual data determined by the version byte.
*   `<data to sign>`: The actual payload or message hash being signed.

**Implementing EIP-191 (Version 0x00):**
Here's how you'd construct and hash data according to EIP-191 version `0x00` within a contract, intending the contract itself to be the validator:

```solidity
// Function demonstrating EIP-191 version 0x00 hashing and signer recovery
function getSigner191(uint256 message, uint8 _v, bytes32 _r, bytes32 _s) public view returns (address) {
    bytes1 prefix = bytes1(0x19);
    bytes1 eip191Version = bytes1(0x00); // Using version 0x00
    // Version specific data for 0x00 is the intended validator address
    address intendedValidatorAddress = address(this);
    // The actual data payload (treated as hash here)
    bytes32 applicationSpecificData = bytes32(message);

    // Construct the EIP-191 formatted message hash
    // Format: 0x19 <1 byte version> <version specific data> <data to sign>
    bytes32 hashedMessage = keccak256(abi.encodePacked(
        prefix,
        eip191Version,
        intendedValidatorAddress,
        applicationSpecificData
    ));

    // Recover the signer using the EIP-191 compliant hash
    address signer = ecrecover(hashedMessage, _v, _r, _s);
    return signer;
}
```

A corresponding `verifySigner191` function would call `getSigner191` and compare the result against an `expectedSigner` address, similar to the basic verification example.

**Limitations:** EIP-191 standardizes the wrapper format, adding some context (like the intended validator or signaling structured data), but it doesn't inherently make complex message payloads (`<data to sign>`) human-readable in wallets.

## EIP-712: Human-Readable Structured Data Signing

EIP-712 builds upon EIP-191 (specifically using version `0x01`) to address both readability and security for signing complex, structured data. It allows wallets to parse the data structure and present it to the user in a clear, understandable format, while also preventing replay attacks across different domains (applications, chains, contracts).

**EIP-712 Hashing Structure:**
The final hash used for signing and `ecrecover` follows this EIP-191 version `0x01` format:
`keccak256( 0x19 0x01 <domainSeparator> <hashStruct(message)> )`

*   `0x19 0x01`: The EIP-191 prefix and version byte signifying EIP-712 structured data.
*   `<domainSeparator>`: A 32-byte hash unique to the specific application domain. This prevents a signature generated for one DApp from being valid for another.
*   `<hashStruct(message)>`: A 32-byte hash representing the specific structured data message being signed.

**The Domain Separator:**
This is crucial for replay protection. It's calculated by hashing a specific structure, `EIP712Domain`, which contains metadata about the application:

```solidity
// Definition of the EIP712 Domain struct
struct EIP712Domain {
    string  name;              // Name of the DApp or protocol
    string  version;           // Version of the signing standard for the DApp
    uint256 chainId;           // Chain ID (EIP-155) the signature is valid for
    address verifyingContract; // Address of the contract that will verify the signature
    bytes32 salt;              // Optional unique value for further domain separation
}
```

The `domainSeparator` is computed as `hashStruct(eip712DomainInstance)`, where `eip712DomainInstance` contains the specific values (e.g., "My DApp", "1", chain ID 1, contract address 0xabc...) for your application.

**HashStruct Function:**
EIP-712 defines a function `hashStruct` to hash structured data instances. It combines a hash of the *structure type definition* with a hash of the *actual data*:
`hashStruct(structInstance) = keccak256(typeHash || hash(encodedData))`

*   `typeHash`: `keccak256` of the structure definition string (e.g., `keccak256("Mail(address to,string contents)")`).
*   `hash(encodedData)`: `keccak256` of the ABI-encoded values within the specific struct instance.

**Hashing the Message Data:**
The actual message being signed (e.g., a permit, an order, a vote) is also defined as a struct. Its hash, `<hashStruct(message)>`, is calculated using the same `hashStruct` principle:

1.  Define the message structure (e.g., `struct Message { uint256 number; }`).
2.  Calculate its `typeHash`: `bytes32 MESSAGE_TYPEHASH = keccak256("Message(uint256 number)");`
3.  Calculate the hash of the encoded data for a specific instance: `keccak256(abi.encode(instance.number))` (simplified view; actual encoding includes all fields).
4.  Combine them: `bytes32 messageStructHash = keccak256(abi.encode(MESSAGE_TYPEHASH, instance.number));` (Note: Actual EIP-712 encoding can be more complex for multiple fields).

**Calculating the Final Digest:**
The final value that is signed by the user and used in `ecrecover` is the `digest`. It combines all the EIP-712 elements:

```solidity
// Conceptual calculation of the final EIP-712 digest
function calculateEIP712Digest(bytes32 domainSeparator, bytes32 messageStructHash) internal pure returns (bytes32) {
    bytes1 prefix = bytes1(0x19);
    bytes1 eip712Version = bytes1(0x01);

    // Format: 0x19 0x01 <domainSeparator> <hashStruct(message)>
    bytes32 digest = keccak256(abi.encodePacked(
        prefix,
        eip712Version,
        domainSeparator,
        messageStructHash
    ));
    return digest;
}

// Usage with ecrecover
// address signer = ecrecover(digest, _v, _r, _s);
```

**Simplifying with OpenZeppelin:**
Implementing EIP-712 correctly involves many precise hashing and encoding steps. The OpenZeppelin Contracts library provides robust and audited helpers that significantly simplify this process:

*   **`EIP712` Base Contract:** Inheriting from `EIP712.sol` helps manage the `EIP712Domain` definition and `domainSeparator` calculation automatically based on constructor arguments (name, version).
*   **`_hashTypedDataV4(messageStructHash)`:** This internal function provided by the `EIP712` contract takes your pre-calculated `<hashStruct(message)>` and correctly computes the final EIP-712 `digest` by incorporating the `0x19 0x01` prefix and the contract's `domainSeparator`.
*   **`ECDSA.recover(digest, signature)` / `ECDSA.tryRecover(digest, v, r, s)`:** Found in `ECDSA.sol`, these functions provide a safer way to perform signature verification than using the raw `ecrecover` precompile. `tryRecover` is particularly useful as it handles potential errors gracefully (returning `address(0)`) and includes protection against signature malleability (a vulnerability where a signature can sometimes be slightly altered without invalidating it).

**Example Verification using OpenZeppelin:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

// Example contract inheriting EIP712 and using ECDSA
contract MyEIP712Contract is EIP712 {
    // Define the message struct
    struct Message {
        uint256 number;
    }

    // Calculate the TypeHash for the Message struct
    bytes32 public constant MESSAGE_TYPEHASH = keccak256("Message(uint256 number)");

    // Constructor sets up the EIP712 domain
    constructor(string memory name, string memory version) EIP712(name, version) {}

    // Function to compute the hashStruct(message)
    function hashMessageStruct(Message calldata message) public pure returns (bytes32) {
        return keccak256(abi.encode(
            MESSAGE_TYPEHASH,
            message.number // ABI encode all struct members in order
        ));
    }

    // Function to get the final EIP-712 digest using OZ helper
    function getDigest(Message calldata message) public view returns (bytes32) {
        bytes32 messageStructHash = hashMessageStruct(message);
        // _hashTypedDataV4 combines 0x1901, domainSeparator, and messageStructHash
        return _hashTypedDataV4(messageStructHash);
    }

    // Function to verify a signature using OZ helpers
    function verifySignature(
        Message calldata message,
        bytes calldata signature, // Packed v, r, s
        address expectedSigner
    ) public view returns (bool) {
        bytes32 digest = getDigest(message);
        address actualSigner = ECDSA.recover(digest, signature);

        // Ensure the recovered signer is not the zero address and matches the expected signer
        require(actualSigner != address(0), "ECDSA: invalid signature");
        require(actualSigner == expectedSigner, "Signature verification failed: incorrect signer");
        return true;
    }

     // Alternative verification using tryRecover with split v, r, s
    function verifySignatureVRS(
        Message calldata message,
        uint8 v,
        bytes32 r,
        bytes32 s,
        address expectedSigner
    ) public view returns (bool) {
        bytes32 digest = getDigest(message);
        // tryRecover returns address(0) on failure, does not revert
        address actualSigner = ECDSA.tryRecover(digest, v, r, s);

        require(actualSigner != address(0), "ECDSA: invalid signature");
        require(actualSigner == expectedSigner, "Signature verification failed: incorrect signer");
        return true;
    }
}
```

## Key Concepts Summary

*   **Signatures (v, r, s):** Mathematical components proving a message hash was signed by a specific private key.
*   **`ecrecover`:** Precompile to recover the signer address from a hash and signature.
*   **Hashing (`keccak256`):** Essential step; the hash, not the raw data, is signed.
*   **EIP-191:** Standardizes signed data format (`0x19 + version + ...`) to prevent confusion with transactions and provide versioning.
*   **EIP-712:** Builds on EIP-191 (`0x01`) for signing *structured* data. Enables readable signing prompts (wallets) and replay protection.
*   **Domain Separator:** EIP-712 hash unique to the application context (chain, contract, name, version) preventing cross-domain replays.
*   **TypeHash:** EIP-712 hash of the data *structure definition*.
*   **HashStruct:** EIP-712 hashing method: `keccak256(typeHash || hash(encodedData))`.
*   **Digest:** The final hash passed to `ecrecover`, incorporating EIP-191/712 prefixes, Domain Separator, and message hash.
*   **Replay Attack:** Malicious reuse of a signature in an unintended context. EIP-712's Domain Separator mitigates this.
*   **Signature Malleability:** ECDSA property allowing minor signature changes; `ECDSA.recover`/`tryRecover` help mitigate risks.
*   **OpenZeppelin:** Provides crucial libraries (`EIP712.sol`, `ECDSA.sol`) for secure and simplified implementation.

Understanding these standards is vital for building secure and user-friendly off-chain interactions that require on-chain verification in Web3 applications. Using established libraries like OpenZeppelin is highly recommended for implementing EIP-712.