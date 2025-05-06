## Implementing a Gas-Efficient ERC20 Merkle Airdrop Contract

This lesson details the process of creating a Solidity smart contract, `MerkleAirdrop.sol`, designed for distributing ERC20 tokens efficiently to a large number of recipients. This method leverages Merkle proofs to significantly reduce the gas costs associated with traditional airdrop approaches, where each recipient might require an individual transaction or storage slot. We assume a foundational understanding of Merkle trees and how proofs are generated.

The core idea is to store only a single `bytes32` value, the Merkle root, on-chain. This root cryptographically represents the entire list of eligible addresses and their corresponding claimable token amounts. Users then provide proof off-chain to demonstrate their inclusion in the airdrop list, allowing them to claim their tokens via the smart contract.

**Contract Setup and Dependencies**

We begin by defining the Solidity version, license, and importing necessary components from the OpenZeppelin Contracts library.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24; // Ensure compatibility with OZ 0.8.20+

import { IERC20, SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { MerkleProof } from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleAirdrop {
    // Contract logic will go here
}
```

*   `IERC20`: An interface standard for interacting with any ERC20 token contract.
*   `SafeERC20`: A wrapper library providing safer versions of ERC20 functions (like `safeTransfer`) that revert on failure, preventing potential issues like tokens being sent to non-compatible addresses.
*   `MerkleProof`: A library providing helper functions, specifically `verify`, to validate Merkle proofs on-chain.

**State Variables: Storing the Essentials**

The contract needs to store two critical pieces of information, set only once during deployment: the Merkle root representing the allowlist and the address of the ERC20 token being airdropped.

```solidity
contract MerkleAirdrop {
    using SafeERC20 for IERC20; // Attach SafeERC20 functions to IERC20 type

    bytes32 public immutable i_merkleRoot;
    IERC20 public immutable i_airdropToken;

    // ... rest of the contract
}
```

*   `using SafeERC20 for IERC20;`: This directive allows us to call `SafeERC20` functions directly on variables of type `IERC20` (e.g., `i_airdropToken.safeTransfer(...)`).
*   `i_merkleRoot`: A `bytes32` value storing the root hash of the off-chain generated Merkle tree.
*   `i_airdropToken`: An `IERC20` variable holding the contract address of the token to be distributed.
*   `immutable`: This keyword is crucial for gas optimization. Immutable variables are set in the constructor and their values are embedded directly into the contract's deployed bytecode, making reads much cheaper than reading from storage slots.
*   `public`: Makes these variables easily readable via automatically generated getter functions. While `private` could be used, `public` allows easy off-chain verification of the contract's configuration.
*   `i_` Prefix: A common convention indicating immutable or constant variables.

**Events and Custom Errors**

To provide transparency and efficient error handling, we define an event and a custom error.

```solidity
contract MerkleAirdrop {
    // ... state variables ...

    event Claim(address indexed account, uint256 amount);

    error MerkleAirdrop__InvalidProof();

    // ... rest of the contract
}
```

*   `Claim` Event: Emitted whenever a user successfully claims their tokens. Indexing the `account` allows for efficient filtering and searching of these events off-chain.
*   `MerkleAirdrop__InvalidProof` Error: A custom error type. Using custom errors is more gas-efficient than reverting with string messages, saving gas during failed transactions.

**Constructor: Initializing Immutable State**

The constructor is executed only once when the contract is deployed. It initializes the immutable state variables.

```solidity
contract MerkleAirdrop {
    // ... state variables, event, error ...

    constructor(bytes32 merkleRoot, IERC20 airdropToken) {
        i_merkleRoot = merkleRoot;
        i_airdropToken = airdropToken;
    }

    // ... rest of the contract
}
```

*   Parameters: Takes the pre-calculated `merkleRoot` and the `airdropToken` contract address as input during deployment.
*   Logic: Assigns the provided values to the corresponding `immutable` state variables.

**The `claim` Function: Verifying and Distributing Tokens**

This is the core function users interact with to receive their airdropped tokens. It takes the user's details and their Merkle proof, verifies the proof against the stored root, and if valid, transfers the tokens.

```solidity
contract MerkleAirdrop {
    // ... state variables, event, error, constructor ...

    function claim(address account, uint256 amount, bytes32[] calldata merkleProof) external {
        // 1. Calculate the leaf node hash
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(account, amount))));

        // 2. Verify the Merkle Proof against the stored root
        if (!MerkleProof.verify(merkleProof, i_merkleRoot, leaf)) {
            revert MerkleAirdrop__InvalidProof();
        }

        // 3. Emit event to log the successful claim
        emit Claim(account, amount);

        // 4. Transfer the tokens safely
        i_airdropToken.safeTransfer(account, amount);
    }
}

```

*   **Parameters:**
    *   `account`: The address eligible for the airdrop. This allows claiming *for* an address, not necessarily requiring `msg.sender` to be the recipient.
    *   `amount`: The specific amount the `account` is eligible to claim, according to the off-chain Merkle tree data.
    *   `merkleProof`: An array of `bytes32` hashes provided by the user. These are the sibling nodes required to reconstruct the path from the user's leaf node up to the Merkle root. Using `calldata` for this parameter avoids copying the array into memory, saving gas.
*   **Visibility:** `external`, as this function is intended to be called by users outside the contract.
*   **Logic Breakdown:**
    1.  **Calculate Leaf Hash:** The contract recalculates the leaf hash corresponding to the claimant's data (`account` and `amount`). It's critical to use the *exact* same hashing mechanism used off-chain to generate the tree. Standard practice involves double hashing:
        *   `abi.encode(account, amount)`: Packs the account and amount data into a `bytes` string.
        *   `keccak256(...)`: The first hash of the encoded data.
        *   `bytes.concat(...)`: Concatenates the result of the first hash (needed before the second hash).
        *   `keccak256(...)`: The second hash. This double hashing (`keccak256(bytes.concat(keccak256(abi.encode(...))))`) is a defense-in-depth measure against potential second pre-image attacks, even though `keccak256` is generally resistant.
    2.  **Verify Merkle Proof:** The `MerkleProof.verify` function from the OpenZeppelin library is used. It takes the user-provided `merkleProof`, the contract's stored `i_merkleRoot`, and the freshly calculated `leaf` hash. It performs the cryptographic verification, hashing pairs of nodes up the tree. If the calculated root matches `i_merkleRoot`, it returns `true`. Otherwise, it returns `false`.
    3.  **Revert on Invalid Proof:** If `MerkleProof.verify` returns `false`, the proof is invalid. The transaction reverts with the custom `MerkleAirdrop__InvalidProof` error.
    4.  **Emit Event:** If the proof is valid, the `Claim` event is emitted *before* the token transfer. This follows good practice (often related to the Checks-Effects-Interactions pattern) and ensures the claim attempt is logged even if the subsequent transfer somehow fails unexpectedly (though `safeTransfer` mitigates many transfer risks).
    5.  **Transfer Tokens:** Finally, `i_airdropToken.safeTransfer(account, amount)` is called. This uses the `SafeERC20` library's wrapper function to securely transfer the specified `amount` of the `i_airdropToken` to the recipient `account`. `safeTransfer` includes checks to ensure the transfer is successful and reverts if the recipient contract cannot receive tokens or if the token contract indicates a failure, preventing tokens from being lost or locked.

This `MerkleAirdrop.sol` contract provides a robust and gas-efficient mechanism for distributing ERC20 tokens based on an off-chain generated allowlist, secured by Merkle proofs and enhanced with safety features from OpenZeppelin libraries.