## Implementing EIP-712 Signature Verification for Gasless Airdrop Claims

In this lesson, we'll explore how to enhance a `MerkleAirdrop` smart contract by implementing EIP-712 signature verification. This powerful technique allows users to authorize a third party, often called a "relayer," to execute transactions on their behalf. The primary benefit for the user is a "gasless" experience, as the relayer can cover the transaction fees. We'll focus on modifying the `claim` function so that a user can sign a message authorizing the claim, and a relayer can submit this signature along with the claim details.

### Understanding the Goal: Enabling Delegated Transactions

Imagine an airdrop scenario where users are eligible to claim tokens. Some users might not have Ether (ETH) in their wallets to pay for the gas fees associated with the `claim` transaction, or they might prefer a simpler user experience that doesn't require them to directly interact with the blockchain and pay gas.

By adding signature verification, we enable the following flow:
1.  The **user** (airdrop recipient) signs a message off-chain, authorizing the claim of their specific amount. This signature doesn't cost gas.
2.  The user (or a frontend application acting for them) passes this signature and the claim details to a **relayer**.
3.  The **relayer** submits the `claim` transaction to the smart contract, including the user's signature and paying the necessary gas fees.
4.  The smart contract **verifies** that the signature is valid and was indeed produced by the user for the specified claim. If valid, the tokens are transferred to the user.

This pattern is central to many meta-transaction systems and efforts to improve blockchain usability.

### Core Cryptographic Concepts Involved

Before diving into the code, let's touch upon key concepts:

*   **Digital Signatures & ECDSA:** Ethereum uses the Elliptic Curve Digital Signature Algorithm (ECDSA) for transaction and message signing. A digital signature cryptographically proves that a message was approved by the owner of a specific private key, without revealing the key itself.
*   **Signature Components (v, r, s):** An ECDSA signature consists of three values:
    *   `r` and `s`: These are outputs of the signing algorithm.
    *   `v`: This is a recovery identifier, typically 27 or 28, which helps in recovering the public key (and thus the address) of the signer from the signature and the message hash.
*   **Message Digest (Hash):** Signatures are not generated over raw, arbitrary-length data. Instead, the data is first hashed using a secure cryptographic hash function (like Keccak256). This fixed-size digest is then signed. This is more efficient and secure.
*   **EIP-712 (Typed Structured Data Hashing and Signing):** This Ethereum Improvement Proposal standardizes the process of hashing and signing typed structured data. Instead of users signing opaque hexadecimal strings (as with `eth_sign`), EIP-712 allows wallets to display the actual data structure being signed in a human-readable format. This significantly improves user experience and security by making it harder for phishing attacks to succeed.
*   **Signature Malleability:** A potential cryptographic quirk where a third party could slightly alter a valid signature (e.g., by changing the `s` value to its modular inverse on the elliptic curve) without invalidating it for the basic `ecrecover` precompile. This could lead to issues like replay attacks if not handled. Fortunately, libraries like OpenZeppelin's `ECDSA.sol` provide mitigations.

### Step-by-Step Implementation in `MerkleAirdrop.sol`

Let's modify our `MerkleAirdrop` contract to incorporate EIP-712 signature verification. We'll assume you have a basic `MerkleAirdrop` contract already set up with Merkle proof verification.

**Prerequisites: OpenZeppelin Imports**
We'll leverage OpenZeppelin's battle-tested contracts for EIP-712 and ECDSA operations. Ensure you have them installed and imported:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { EIP712 } from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import { MerkleProof } from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

Our contract will now inherit from `EIP712`:

```solidity
contract MerkleAirdrop is EIP712 {
    using SafeERC20 for IERC20;

    // ... (rest of the contract state variables, events, etc.)
}
```

#### Step 1: Modify the `claim` Function Signature

The `claim` function needs to accept the signature components (`v`, `r`, `s`) in addition to the existing parameters.

The original signature might look like:
`function claim(address account, uint256 amount, bytes32[] calldata merkleProof) external`

The updated signature will be:

```solidity
function claim(
    address account,          // The recipient/signer address
    uint256 amount,           // The amount being claimed
    bytes32[] calldata merkleProof, // Merkle proof for the claim
    uint8 v,                  // Signature recovery ID
    bytes32 r,                // Signature component r
    bytes32 s                 // Signature component s
) external {
    // ... existing logic like alreadyClaimed check ...
    // ... new signature verification logic ...
    // ... existing Merkle proof verification and token transfer ...
}
```
Here, `account` is the address of the user who signed the message (the beneficiary of the airdrop). `v` is a `uint8`, and `r` and `s` are `bytes32`, which are standard types for these signature components.

#### Step 2: Define Custom Error and Add Signature Check

It's good practice to use custom errors for more gas-efficient error reporting compared to `require` strings. Let's define one for invalid signatures.

```solidity
// At the contract level
error MerkleAirdrop_InvalidSignature();
error MerkleAirdrop_AlreadyClaimed(); // Assuming this exists
error MerkleAirdrop_InvalidProof();   // Assuming this exists
```

Inside the `claim` function, typically after checking if the claim has already been processed but before Merkle proof verification, we'll add the signature validation logic:

```solidity
// Inside the claim function:
// function claim(...) external {
    if (s_hasClaimed[account]) { // Or however you track claimed amounts
        revert MerkleAirdrop_AlreadyClaimed();
    }

    // --- New Signature Check ---
    // Construct the digest the user should have signed
    bytes32 digest = getMessage(account, amount);
    // Verify the signature
    if (!_isValidSignature(account, digest, v, r, s)) {
        revert MerkleAirdrop_InvalidSignature();
    }
    // --- End of Signature Check ---

    // Existing Merkle proof logic:
    // bytes32 leaf = keccak256(abi.encodePacked(account, amount));
    // if (!MerkleProof.verify(merkleProof, i_merkleRoot, leaf)) {
    //     revert MerkleAirdrop_InvalidProof();
    // }

    // ... (Mark as claimed and transfer tokens) ...
// }
```
This snippet introduces two helper functions we need to implement: `getMessage` (to compute the EIP-712 digest) and `_isValidSignature` (to perform the actual ECDSA recovery and check).

#### Step 3: Constructing the Message for Signing (EIP-712)

To make signatures user-friendly and secure, we use EIP-712. This involves:
1.  **Defining the data structure (`struct`)** that represents the information being signed.
2.  **Defining its `TYPEHASH`** (a hash of the struct's name and member types).
3.  **Initializing the `EIP712` base contract** with a domain separator (unique to your contract, version, and chain).
4.  **Implementing `getMessage`** to compute the final EIP-712 compliant digest.

Let's add the EIP-712 specific definitions to our contract:

```solidity
contract MerkleAirdrop is EIP712 {
    // ... (SafeERC20, state variables like i_merkleRoot, i_airdropToken, s_hasClaimed mapping) ...

    // EIP-712 Typehash for our specific claim structure
    // "AirdropClaim(address account,uint256 amount)"
    bytes32 private constant MESSAGE_TYPEHASH = 0x810786b83997ad50983567660c1d9050f79500bb7c2470579e75690d45184163;
    // It's good practice to pre-compute this hash: keccak256("AirdropClaim(address account,uint256 amount)")

    // The struct representing the data to be signed
    struct AirdropClaim {
        address account;
        uint256 amount;
    }

    // ... (events, errors) ...

    constructor(bytes32 merkleRoot, IERC20 airdropToken)
        EIP712("MerkleAirdrop", "1") // Initialize EIP712 with contract name and version
    {
        i_merkleRoot = merkleRoot;
        i_airdropToken = airdropToken;
    }

    // Function to compute the EIP-712 digest
    function getMessage(address account, uint256 amount) public view returns (bytes32) {
        // 1. Hash the struct instance according to EIP-712 struct hashing rules
        bytes32 structHash = keccak256(abi.encode(
            MESSAGE_TYPEHASH,
            AirdropClaim({account: account, amount: amount}) // Encode struct explicitly
        ));

        // 2. Combine with domain separator using _hashTypedDataV4 from EIP712 contract
        // _hashTypedDataV4 constructs the EIP-712 digest:
        // keccak256(abi.encodePacked("\x19\x01", _domainSeparatorV4(), structHash))
        return _hashTypedDataV4(structHash);
    }

    // ... (claim function, other getters) ...
}
```

**Explanation of `getMessage`:**
*   `MESSAGE_TYPEHASH`: This is `keccak256` of the string defining the structure of our `AirdropClaim` message (e.g., `"AirdropClaim(address account,uint256 amount)"`). This hash identifies the *type* of data being signed.
*   `AirdropClaim struct`: Defines the fields that constitute the message: the claimant's `account` and the `amount` they are claiming.
*   `constructor`: When deploying the contract, we call the `EIP712` constructor with a name (e.g., "MerkleAirdrop") and a version (e.g., "1"). This, along with the current chain ID and contract address, forms the **domain separator**. The domain separator ensures that a signature intended for this contract on this chain cannot be replayed on a different contract or chain.
*   `getMessage(address account, uint256 amount)`:
    1.  It first creates an instance of `AirdropClaim` and encodes it along with its `MESSAGE_TYPEHASH` using `abi.encode`. The `keccak256` of this is the `structHash`.
    2.  It then calls `_hashTypedDataV4()` (a helper from OpenZeppelin's `EIP712` contract). This function takes the `structHash` and combines it with the pre-computed `_domainSeparatorV4()` (also from `EIP712`), prefixing it with `\x19\x01` as per the EIP-712 specification, to produce the final digest that the user must sign.
*   This function is `public view` so that off-chain applications (like a frontend) can call it (or replicate its logic) to know exactly what digest the user needs to sign.

#### Step 4: Verifying the Signature

Now, we implement the `_isValidSignature` internal helper function. This function will use OpenZeppelin's `ECDSA.tryRecover` to determine the address of the signer from the digest and the signature components.

```solidity
// Add this internal function to your contract
function _isValidSignature(
    address expectedSigner, // The address we expect to have signed (claim.account)
    bytes32 digest,         // The EIP-712 digest calculated by getMessage
    uint8 v,
    bytes32 r,
    bytes32 s
) internal pure returns (bool) {
    // Attempt to recover the signer address from the digest and signature components
    // ECDSA.tryRecover is preferred as it handles signature malleability and
    // returns address(0) on failure instead of reverting.
    address actualSigner = ECDSA.tryRecover(digest, v, r, s);

    // Check two things:
    // 1. Recovery was successful (actualSigner is not the zero address).
    // 2. The recovered signer matches the expected signer (the 'account' parameter).
    return actualSigner != address(0) && actualSigner == expectedSigner;
}
```

**Explanation of `_isValidSignature`:**
*   It takes the `expectedSigner` (which is the `account` parameter passed to the `claim` function), the `digest` (from `getMessage`), and the signature components `v, r, s`.
*   `ECDSA.tryRecover(digest, v, r, s)`: This function from OpenZeppelin's library attempts to recover the public key that produced the signature `(v,r,s)` for the given `digest`, and then derives the Ethereum address from that public key.
    *   It's safer than the native `ecrecover` precompile because it includes checks against certain forms of signature malleability.
    *   If recovery fails (e.g., invalid signature), `tryRecover` returns `address(0)` instead of reverting the transaction. This allows our contract to handle the failure gracefully with our custom `MerkleAirdrop_InvalidSignature` error.
*   The function returns `true` if and only if a valid signer address was recovered *and* this recovered address matches the `expectedSigner`.

### The Off-Chain Signing Process

With the smart contract ready, the user (or a frontend application acting on their behalf) needs to perform these steps:

1.  **Determine Claim Details:** Identify the user's `account`, the `amount` they are eligible for, and their `merkleProof`.
2.  **Calculate the Digest:** The frontend application will call the `getMessage(account, amount)` view function on your deployed `MerkleAirdrop` contract (or replicate its exact EIP-712 hashing logic client-side using libraries like ethers.js or viem). This produces the `digest` to be signed.
3.  **Request Signature:** The frontend will use a wallet provider (like MetaMask) to request the user to sign this typed data. Wallets that support EIP-712 (e.g., MetaMask via `eth_signTypedData_v4`) will display the structured `AirdropClaim` data (account and amount) and the domain information (contract name, version) to the user in a readable format.
4.  **User Approves:** The user reviews the information and approves the signing request in their wallet. The wallet then returns the signature components: `v`, `r`, and `s`.
5.  **Submit to Relayer:** The frontend sends the `account`, `amount`, `merkleProof`, and the signature (`v`, `r`, `s`) to a relayer service.
6.  **Relayer Executes Claim:** The relayer calls the `MerkleAirdrop.claim(account, amount, merkleProof, v, r, s)` function on the smart contract, paying the gas fee for the transaction.

### Key Benefits and Considerations

*   **Improved User Experience:** Users can authorize actions without needing ETH for gas or directly submitting transactions, simplifying interaction.
*   **Enhanced Security with EIP-712:** Signatures are tied to specific contract instances, versions, and chain IDs (via the domain separator), preventing replay attacks across different contexts. Users see what they are signing, reducing phishing risks.
*   **Reliance on Audited Libraries:** Using OpenZeppelin's `EIP712.sol` and `ECDSA.sol` is highly recommended as they are well-audited and handle cryptographic complexities and potential pitfalls (like signature malleability) correctly.
*   **Gas Costs:** While the *user* doesn't pay gas directly, the *relayer* does. The signature verification process (hashing, `ecrecover`) itself consumes additional gas in the `claim` function compared to a claim without signature verification. This overhead should be considered by the relayer.
*   **Relayer Infrastructure:** This pattern requires a relayer system to be in place, which is responsible for submitting the signed transactions and managing gas payments.

### Conclusion

You have now learned how to implement EIP-712 signature verification in a Solidity smart contract, specifically for an airdrop claim scenario. This powerful pattern allows for delegated transaction execution, enabling features like gasless transactions from the user's perspective and improving the overall usability of decentralized applications. By understanding the underlying cryptographic principles and leveraging robust libraries like OpenZeppelin, you can build more flexible and user-friendly smart contracts.