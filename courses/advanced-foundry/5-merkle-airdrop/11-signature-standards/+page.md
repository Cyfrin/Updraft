## Understanding Ethereum Signatures: EIP-191 & EIP-712

This lesson delves into the essential Ethereum signature standards, EIP-191 and EIP-712. We'll explore how signatures are created, how they can be verified within smart contracts, and critically, how these standards enhance security by preventing replay attacks and improve the user experience by making signed data human-readable.

## The Need for EIP-191 and EIP-712: Solving Unreadable Messages and Replay Attacks

Before the advent of EIP-191 and EIP-712, interacting with decentralized applications often involved signing messages that appeared as long, inscrutable hexadecimal strings in wallets like MetaMask. For instance, a user might be presented with a "Sign Message" prompt showing data like `0x1257deb74be69e9c464250992e09f18b478fb8fa247dcb...`. This "unreadable nonsense" made it extremely difficult, and risky, for users to ascertain what they were actually approving. There was no easy way to verify if the data was legitimate or malicious.

This highlighted two critical needs:
1.  **Readability:** A method was required to present data for signing in a clear, understandable format.
2.  **Replay Protection:** A mechanism was needed to prevent a signature, once created, from being maliciously reused in a different context (a replay attack).

EIP-191 and EIP-712 were introduced as Ethereum Improvement Proposals to directly address these challenges. Modern wallet prompts, leveraging EIP-712, now display structured, human-readable data. For example, signing an "Ether Mail" message might clearly show domain information and mail details with fields like "from Person," "to Person," and "contents," allowing users to confidently verify what they are authorizing.

## Basic Signature Verification: The Fundamentals

Before diving into the EIP standards, let's understand the basic process of signature verification in Ethereum. The core concept involves taking a message, hashing it, and then using the signature (comprising `v`, `r`, and `s` components) along with this hash to recover the signer's Ethereum address. This recovered address is then compared against an expected signer's address.

Ethereum provides a built-in precompiled contract for this: `ecrecover`.
Its signature is: `ecrecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) returns (address)`
`ecrecover` takes the `keccak256` hash of the message and the three ECDSA signature components (`v`, `r`, `s`) as input. It then returns the address of the account that signed the message hash to produce that specific signature.

Let's look at a simplified smart contract example:

```solidity
// Simple function to recover a signer's address
function getSignerSimple(uint256 message, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address) {
    // Note: Hashing is simplified here for demonstration.
    // For a string, one would typically use keccak256(abi.encodePacked(string)).
    bytes32 hashedMessage = bytes32(message); 
    address signer = ecrecover(hashedMessage, _v, _r, _s);
    return signer;
}

// Simple function to verify if the recovered signer matches an expected signer
function verifySignerSimple(
    uint256 message,
    uint8 _v,
    bytes32 _r,
    bytes32 _s,
    address signer // The expected signer's address
)
    public
    pure
    returns (bool)
{
    address actualSigner = getSignerSimple(message, _v, _r, _s);
    require(signer == actualSigner, "Signer verification failed"); // Check if recovered signer matches expected
    return true;
}
```
In `getSignerSimple`, a `uint256` message is directly cast to `bytes32` for simplicity. In real-world scenarios, especially with strings or complex data, you would use `keccak256(abi.encodePacked(...))` or `keccak256(abi.encode(...))` to generate the `hashedMessage`. The `verifySignerSimple` function then uses `getSignerSimple` to recover the address and `require` to ensure it matches the `signer` address provided as an argument.

## The Problem with Simple Signatures and the Genesis of EIP-191

The simple signature verification method described above has a significant flaw: it lacks context. A signature created for one specific purpose or smart contract could potentially be valid for another if only the raw message hash is signed. This ambiguity opens the door for replay attacks, where a malicious actor could take a signature intended for contract A and use it to authorize an action on contract B, if contract B expects a similarly structured message.

Consider use cases like sponsored transactions or elements of account abstraction. Here, one party (Bob) might pre-sign a message or transaction data, which another party (Alice) then submits to a contract, with Alice paying the gas fees. The contract must reliably verify Bob's signature. Without a standard, ensuring this signature is only valid for the intended transaction and contract is challenging. This led to the development of EIP-191.

## EIP-191: The Signed Data Standard

EIP-191 was introduced to standardize the format for data that is signed off-chain and intended for verification, often within smart contracts. Its primary goal is to ensure that signed data cannot be misinterpreted as a regular Ethereum transaction, thereby preventing a class of replay attacks.

The EIP-191 specification defines the following format for data to be signed:
`0x19 <1 byte version> <version specific data> <data to sign>`

Let's break down these components:
*   **`0x19` (Prefix):** A single byte prefix (decimal 25). This specific byte was chosen because it's not a valid starting byte for RLP-encoded data used in standard Ethereum transactions. This prefix ensures that an EIP-191 signed message cannot be accidentally or maliciously submitted as a valid Ethereum transaction.
*   **`<1 byte version>` (Version Byte):** This byte specifies the structure and purpose of the data that follows. Key versions include:
    *   **`0x00`**: "Data with intended validator." For this version, the `<version specific data>` is the 20-byte address of the contract or entity intended to validate this signature.
    *   **`0x01`**: "Structured data." This version is closely associated with EIP-712 and is the most commonly used in production for signing complex data structures. The `<version specific data>` is the EIP-712 `domainSeparator`.
    *   **`0x45`**: "personal_sign messages." This is often used by wallets for simple message signing (e.g., `eth_personalSign`).
*   **`<version specific data>`:** This data segment is defined by the `<1 byte version>`. For `0x00`, it's the validator's address; for `0x01`, it's the EIP-712 `domainSeparator`.
*   **`<data to sign>`:** This is the actual arbitrary message payload the user intends to sign (e.g., a string like "Kieran is awesome", or a hash of more complex data).

For a smart contract to verify an EIP-191 signature, it must reconstruct this exact byte sequence (`0x19` || `version` || `version_data` || `data_to_sign`), hash it using `keccak256`, and then use this resulting hash with the provided `v`, `r`, and `s` components in the `ecrecover` function.

Here's a Solidity example implementing EIP-191 version `0x00`:

```solidity
function getSigner191(uint256 message, uint8 _v, bytes32 _r, bytes32 _s) public view returns (address) {
    bytes1 prefix = bytes1(0x19);
    bytes1 eip191Version = bytes1(0x00); // Using version 0x00
    address intendedValidatorAddress = address(this); // Validator is this contract
    bytes32 applicationSpecificData = bytes32(message); // The message payload (simplified)

    // Construct the EIP-191 formatted message: 0x19 <1 byte version> <version specific data> <data to sign>
    bytes32 hashedMessage = keccak256(
        abi.encodePacked(prefix, eip191Version, intendedValidatorAddress, applicationSpecificData)
    );

    address signer = ecrecover(hashedMessage, _v, _r, _s);
    return signer;
}
```
In this `getSigner191` function, we define the `prefix` (`0x19`), `eip191Version` (`0x00`), and `intendedValidatorAddress` (which is the address of the current contract, `address(this)`). The `applicationSpecificData` is our message. These components are concatenated using `abi.encodePacked` and then hashed with `keccak256`. The resulting hash is used with `ecrecover`.

While EIP-191 standardizes the signing format and adds a layer of domain separation (e.g., with the validator address in version `0x00`), version `0x00` itself doesn't inherently solve the problem of displaying complex `<data to sign>` in a human-readable way in wallets. This is where EIP-712 comes into play.

## EIP-712: Typed Structured Data Hashing and Signing

EIP-712 builds upon EIP-191, specifically utilizing EIP-191 version `0x01`, to achieve two primary objectives:
1.  **Human-Readable Signatures:** Enable wallets to display complex, structured data in an understandable format to users before signing.
2.  **Robust Replay Protection:** Provide strong protection against replay attacks by incorporating domain-specific information into the signature.

The EIP-712 signing format, under EIP-191 version `0x01`, is:
`0x19 0x01 <domainSeparator> <hashStruct(message)>`

Let's dissect these components:
*   **`0x19 0x01`**: The EIP-191 prefix (`0x19`) followed by the EIP-191 version byte (`0x01`), indicating that the signed data adheres to the EIP-712 structured data standard.
*   **`<domainSeparator>`**: This is the "version specific data" for EIP-191 version `0x01`. It's a `bytes32` hash that is unique to the specific application domain. This makes a signature valid only for this particular domain (e.g., a specific DApp, contract, chain, and version of the signing structure).
    The `domainSeparator` is calculated as `hashStruct(eip712Domain)`. The `eip712Domain` is a struct typically defined as:
    ```solidity
    struct EIP712Domain {
        string  name;                // Name of the DApp or protocol
        string  version;             // Version of the signing domain (e.g., "1", "2")
        uint256 chainId;             // EIP-155 chain ID (e.g., 1 for Ethereum mainnet)
        address verifyingContract;   // Address of the contract that will verify the signature
        bytes32 salt;                // Optional unique salt for further domain separation
    }
    ```
    The `domainSeparator` is the `keccak256` hash of the ABI-encoded instance of this `EIP712Domain` struct. Crucially, including `chainId` and `verifyingContract` ensures that a signature created for one DApp on one chain cannot be replayed on another DApp or another chain.
*   **`<hashStruct(message)>`**: This is the "data to sign" part of the EIP-191 structure. It's a `bytes32` hash representing the specific structured message the user is signing.
    Its calculation involves two main parts: `hashStruct(structData) = keccak256(typeHash || encodeData(structData))`.
    *   **`typeHash`**: This is a `keccak256` hash of the *definition* of the message's struct type. It includes the struct name and the names and types of its members, formatted as a string. For example, for a struct `Message { uint256 amount; address to; }`, the type string would be `"Message(uint256 amount,address to)"`, and the `typeHash` would be `keccak256("Message(uint256 amount,address to)")`.
    *   **`encodeData(structData)`**: This is the ABI-encoded data of the struct instance itself. The EIP-712 specification details how different data types within the struct should be encoded before hashing. For Solidity, this typically involves `abi.encode(...)` where the first argument is the `typeHash` of the primary type, followed by the values of the struct members in their defined order.

The **final `bytes32` digest** that is actually passed to `ecrecover` (or a safer alternative) for EIP-712 compliant signatures is:
`digest = keccak256(abi.encodePacked(bytes1(0x19), bytes1(0x01), domainSeparator, hashStruct(message)))`

**Conceptual Code Walkthrough for EIP-712 Hash Construction:**

1.  **Define your message struct:**
    ```solidity
    struct Message {
        uint256 number;
    }
    // Or for a string message:
    // struct Message {
    //     string message;
    // }
    ```

2.  **Calculate the `MESSAGE_TYPEHASH` (the `typeHash` for your message struct):**
    ```solidity
    // For uint256 number:
    bytes32 public constant MESSAGE_TYPEHASH = keccak256(bytes("Message(uint256 number)"));
    // For string message:
    // bytes32 public constant MESSAGE_TYPEHASH = keccak256(bytes("Message(string message)"));
    ```

3.  **Calculate `hashStruct(message)` (hash of the specific message instance):**
    ```solidity
    // Assume 'messageValue' is the uint256 value for the 'number' field
    // bytes32 hashedMessagePayload = keccak256(abi.encode(MESSAGE_TYPEHASH, messageValue));

    // For a struct instance Message myMessage = Message({number: messageValue});
    // bytes32 hashedMessagePayload = keccak256(abi.encode(MESSAGE_TYPEHASH, myMessage.number));
    // More generally, for a struct 'Mail { string from; string to; string contents; }'
    // MAIL_TYPEHASH = keccak256(bytes("Mail(string from,string to,string contents)"));
    // hashStructMail = keccak256(abi.encode(MAIL_TYPEHASH, mail.from, mail.to, mail.contents));
    ```
    It's `keccak256(abi.encode(MESSAGE_TYPEHASH, actual_value_of_number_field))`. If the struct has multiple fields, they are all included in `abi.encode` in order.

4.  **Calculate `domainSeparator`:** This is typically done once, often in the contract's constructor. It involves hashing an instance of the `EIP712Domain` struct.
    ```solidity
    // Pseudo-code for domain separator calculation
    // EIP712DOMAIN_TYPEHASH = keccak256(bytes("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract,bytes32 salt)"));
    // domainSeparator = keccak256(abi.encode(
    //     EIP712DOMAIN_TYPEHASH,
    //     "MyDAppName",
    //     "1",
    //     block.chainid, // or a specific chainId
    //     address(this),
    //     MY_SALT // some bytes32 salt
    // ));
    ```

5.  **Calculate the final `digest`:**
    ```solidity
    // bytes32 digest = keccak256(abi.encodePacked(
    //     bytes1(0x19),
    //     bytes1(0x01),
    //     domainSeparator, // Calculated in step 4
    //     hashedMessagePayload  // Calculated in step 3
    // ));
    ```

6.  **Recover the signer:**
    ```solidity
    // address signer = ecrecover(digest, _v, _r, _s);
    ```

## Leveraging OpenZeppelin for Robust EIP-712 Implementation

Manually implementing EIP-712 hashing and signature verification can be complex and error-prone. It is highly recommended to use well-audited libraries like those provided by OpenZeppelin. Specifically, `EIP712.sol` and `ECDSA.sol` are invaluable.

*   **`EIP712.sol`:** This utility contract simplifies the creation of EIP-712 compliant domains and the hashing of typed data.
    *   Your contract inherits from `EIP712`.
    *   The domain separator details (name, version string) are passed to the `EIP712` constructor. It automatically uses `block.chainid` and `address(this)` for `chainId` and `verifyingContract` respectively.
    *   It provides an internal function `_hashTypedDataV4(bytes32 structHash)` which correctly computes the final EIP-712 digest. This function internally calculates or retrieves the `domainSeparator` and combines it with the provided `structHash` (your `hashStruct(message)`) using the `0x19 0x01` prefix.

*   **`ECDSA.sol`:** This library provides safer alternatives to the raw `ecrecover` precompile.
    *   The key function is `ECDSA.tryRecover(bytes32 digest, uint8 v, bytes32 r, bytes32 s) returns (address, RecoverError)`.
    *   **Signature Malleability Protection:** `tryRecover` (and `recover`) checks that the `s` value of the signature is in the lower half of the elliptic curve order. This prevents certain signature malleability attacks where a third party could slightly alter a valid signature (e.g., by changing `s` to `secp256k1n - s`) to create a different signature that still validates for the same message and key, potentially causing issues in some contract logic. If `s` is not canonical, it causes a revert.
    *   **Safe Error Handling:** `tryRecover` returns a zero address and an error code if the signature is invalid (e.g., `v` is incorrect, or point decompression fails), instead of `ecrecover`'s behavior which can sometimes revert or return garbage for certain invalid inputs.

**Example using OpenZeppelin libraries:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract MyEIP712Contract is EIP712 {
    // Define the struct for the message
    struct Message {
        string message;
    }

    // Calculate the TYPEHASH for the Message struct
    // keccak256("Message(string message)")
    bytes32 public constant MESSAGE_TYPEHASH = 0xf30f2840588e47605f8476d894c1d95d7220f7eda638ebb2e21698e5013de90a; // Precompute this

    constructor(string memory name, string memory version) EIP712(name, version) {}

    function getMessageHash(string memory _message) public view returns (bytes32) {
        // Calculate hashStruct(message)
        bytes32 structHash = keccak256(abi.encode(
            MESSAGE_TYPEHASH,
            keccak256(bytes(_message)) // EIP-712 requires hashing string/bytes members
        ));
        
        // _hashTypedDataV4 constructs the final EIP-712 digest:
        // keccak256(abi.encodePacked(0x19, 0x01, domainSeparator, structHash))
        return _hashTypedDataV4(structHash);
    }

    function getSignerOZ(bytes32 digest, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address) {
        // Use ECDSA.tryRecover for safer signature recovery
        (address signer, ECDSA.RecoverError error) = ECDSA.tryRecover(digest, _v, _r, _s);
        
        // Optional: Handle errors explicitly
        // require(error == ECDSA.RecoverError.NoError, "ECDSA: invalid signature");
        if (error != ECDSA.RecoverError.NoError) {
            // Handle specific errors or revert
            if (error == ECDSA.RecoverError.InvalidSignatureLength) revert("Invalid sig length");
            if (error == ECDSA.RecoverError.InvalidSignatureS) revert("Invalid S value");
            // ... etc. or a generic revert
            revert("ECDSA: invalid signature");
        }
        
        return signer;
    }

    function verifySignerOZ(
        string memory _message,
        uint8 _v,
        bytes32 _r,
        bytes32 _s,
        address expectedSigner
    )
        public
        view
        returns (bool)
    {
        bytes32 digest = getMessageHash(_message);
        address actualSigner = getSignerOZ(digest, _v, _r, _s);
        require(actualSigner == expectedSigner, "Signer verification failed");
        require(actualSigner != address(0), "Invalid signer recovered"); // Additional check
        return true;
    }
}

```
Note: For EIP-712, dynamic types like `string` and `bytes` within your struct are themselves hashed before being included in the `abi.encode` for `structHash`. So, `Message({ message: _message })` becomes `abi.encode(MESSAGE_TYPEHASH, keccak256(bytes(_message)))`.

**Replay Protection Summary with EIP-712:**
EIP-712 provides robust replay protection primarily through the `domainSeparator`. Since the `domainSeparator` includes the `chainId` and the `verifyingContract` address (among other details like the DApp name and version), a signature generated for a specific message on one contract (e.g., `ContractA` on Mainnet) will not be valid for:
*   The same message on a different contract (e.g., `ContractB` on Mainnet).
*   The same message on the same contract deployed to a different chain (e.g., `ContractA` on Sepolia).
*   A different version of the signing domain if the `version` string in `EIP712Domain` changes.

## Conclusion

EIP-191 established a foundational standard for formatting signed data in Ethereum, ensuring signed messages are distinct from transactions. Building upon this, EIP-712 revolutionized how structured data is handled for signing, introducing human-readable formats in wallets and, critically, strong replay protection mechanisms through the `domainSeparator` and `hashStruct` concepts.

While the underlying mechanics of constructing these hashes and verifying signatures can be intricate, leveraging libraries like OpenZeppelin's `EIP712.sol` and `ECDSA.sol` significantly simplifies implementation and enhances security. Understanding these standards is crucial for any developer building applications that require off-chain message signing and on-chain verification, common in scenarios like meta-transactions, gasless transactions, and various off-chain agreement protocols. Mastering these concepts takes practice, but they are fundamental to secure and user-friendly Web3 development.