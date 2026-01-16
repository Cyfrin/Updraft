## Securing Your Merkle Airdrop: Preventing Multiple Claims

Merkle airdrops are a popular and gas-efficient method for distributing tokens to a large number of eligible users in the Web3 space. However, like any smart contract, they require careful design to prevent vulnerabilities. This lesson explores a common pitfall in Merkle airdrop contracts – the possibility of multiple claims by the same user – and demonstrates how to implement a robust solution.

## The Vulnerability: Unlimited Claims in Merkle Airdrops

Consider a typical Merkle airdrop smart contract. The `claim` function is designed to verify that a user (an `account`) is indeed eligible for a specific `amount` of tokens by checking a `merkleProof` against the contract's `i_merkleRoot`.

The problem arises if the contract only performs this verification without tracking whether a user has already successfully claimed their tokens.

Here's an example of a vulnerable `claim` function:

```solidity
// MerkleAirdrop.sol (before fix)
contract MerkleAirdrop {
    // ... other state variables and constructor ...
    IERC20 private immutable i_airdropToken;
    bytes32 private immutable i_merkleRoot;
    // ...

    event Claim(address account, uint256 amount);

    function claim(address account, uint256 amount, bytes32[] calldata merkleProof) external {
        // calculate using the account and the amount, the hash -> leaf node
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(account, amount))));
        if (!MerkleProof.verify(merkleProof, i_merkleRoot, leaf)) {
            revert MerkleAirdrop_InvalidProof();
        }

        emit Claim(account, amount);
        i_airdropToken.safeTransfer(account, amount);
    }
}
```
In this scenario, once a user provides a valid `account`, `amount`, and `merkleProof`, the contract verifies them and transfers the tokens. However, nothing prevents the same user from calling the `claim` function again with the exact same valid parameters. If they do, the Merkle proof will still be valid, and they will receive another distribution of tokens. This can be repeated, potentially allowing a single eligible user to drain a significant portion, if not all, of the airdrop funds.

## The Solution: Implementing a Claim Tracking Mechanism

To address this critical vulnerability, we need to introduce a mechanism within the smart contract to keep track of which addresses have already claimed their tokens. A common and effective way to achieve this in Solidity is by using a mapping.

We will add a mapping that associates each claimant's address with a boolean value indicating whether they have claimed their tokens.

### Step 1: Declaring a Mapping to Track Claimed Addresses

First, we declare a new state variable, a mapping named `s_hasClaimed`. This mapping will store `true` for an address if it has already claimed tokens, and `false` otherwise (the default for boolean types in Solidity).

```solidity
// MerkleAirdrop.sol (adding the mapping)
contract MerkleAirdrop {
    // ...
    IERC20 private immutable i_airdropToken;
    bytes32 private immutable i_merkleRoot;
    mapping(address claimant => bool) private s_hasClaimed; // New mapping
    // ...
}
```
Note the naming convention `s_` for storage variables, a common practice to distinguish them from local or global variables.

### Step 2: Updating Claim Status and the Importance of Order (Checks-Effects-Interactions)

After a successful claim verification, we need to update this mapping to mark the user as having claimed. A crucial aspect here is *when* this update occurs.

A naive approach might be to update `s_hasClaimed` *after* the token transfer:

```solidity
// MerkleAirdrop.sol (incorrect placement - for illustration of reentrancy)
function claim(address account, uint256 amount, bytes32[] calldata merkleProof) external {
    // ... (leaf calculation and Merkle proof verification) ...

    emit Claim(account, amount);
    i_airdropToken.safeTransfer(account, amount);
    s_hasClaimed[account] = true; // INCORRECT PLACEMENT
}
```
This placement is **highly problematic** because it violates the **Checks-Effects-Interactions (CEI) pattern**, a fundamental security principle in smart contract development. If the state update (`s_hasClaimed[account] = true;`) happens after an external call (like `i_airdropToken.safeTransfer`), the contract becomes vulnerable to a **reentrancy attack**. An attacker could craft a malicious recipient contract that, upon receiving tokens via `safeTransfer`, immediately calls back into the `claim` function. Since `s_hasClaimed[account]` would not yet be `true`, the attacker could successfully claim tokens multiple times before the initial call's state update is executed.

The **correct approach** is to update the state *before* any external interactions:

```solidity
// MerkleAirdrop.sol (correct placement)
function claim(address account, uint256 amount, bytes32[] calldata merkleProof) external {
    // ... (leaf calculation and Merkle proof verification) ...

    // CORRECT PLACEMENT - update state BEFORE external call
    s_hasClaimed[account] = true;

    emit Claim(account, amount);
    i_airdropToken.safeTransfer(account, amount);
}
```
By setting `s_hasClaimed[account] = true;` before the `safeTransfer` call, any reentrant call would find the state already updated, thus preventing subsequent claims.

### Step 3: Preventing Repeat Claims with a Pre-Check

With the `s_hasClaimed` mapping in place and correctly updated, we now add a check at the very beginning of the `claim` function. This check will verify if the `account` has already claimed. If `s_hasClaimed[account]` is `true`, the transaction should revert, preventing any further processing.

For clarity and gas efficiency, we'll introduce a new custom error, `MerkleAirdrop_AlreadyClaimed`.

First, declare the custom error at the contract level:
```solidity
// MerkleAirdrop.sol (declaring the new error)
contract MerkleAirdrop {
    // ...
    error MerkleAirdrop_InvalidProof();
    error MerkleAirdrop_AlreadyClaimed(); // New error
    // ...
    mapping(address claimant => bool) private s_hasClaimed;
    // ...
}
```

Then, add the check to the `claim` function:
```solidity
// MerkleAirdrop.sol (full claim function with fixes)
function claim(address account, uint256 amount, bytes32[] calldata merkleProof) external {
    // CHECK if already claimed
    if (s_hasClaimed[account]) {
        revert MerkleAirdrop_AlreadyClaimed();
    }

    // CHECK Merkle proof
    bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(account, amount))));
    if (!MerkleProof.verify(merkleProof, i_merkleRoot, leaf)) {
        revert MerkleAirdrop_InvalidProof();
    }

    // EFFECT - update state
    s_hasClaimed[account] = true;

    // INTERACTION - external call
    emit Claim(account, amount);
    i_airdropToken.safeTransfer(account, amount);
}
```
This revised function now robustly follows the Checks-Effects-Interactions pattern:
1.  **Checks:**
    *   Verify if the `account` has already claimed (`if (s_hasClaimed[account])`).
    *   Verify the Merkle proof.
2.  **Effects:**
    *   Update the contract's state by marking the account as claimed (`s_hasClaimed[account] = true`).
3.  **Interactions:**
    *   Emit the `Claim` event.
    *   Perform the external call to transfer tokens (`i_airdropToken.safeTransfer`).

## The Secured Merkle Airdrop Contract Code

Below are the relevant parts of the `MerkleAirdrop.sol` contract incorporating all the discussed fixes:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { MerkleProof } from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleAirdrop {
    using SafeERC20 for IERC20;

    error MerkleAirdrop_InvalidProof();
    error MerkleAirdrop_AlreadyClaimed(); // Added error for clarity

    // State Variables
    bytes32 private immutable i_merkleRoot;
    IERC20 private immutable i_airdropToken;
    mapping(address claimant => bool) private s_hasClaimed; // Tracks claimed addresses

    event Claim(address account, uint256 amount);

    constructor(bytes32 merkleRoot, IERC20 airdropToken) {
        i_merkleRoot = merkleRoot;
        i_airdropToken = airdropToken;
    }

    function claim(address account, uint256 amount, bytes32[] calldata merkleProof) external {
        // CHECK 1: Has this account already claimed?
        if (s_hasClaimed[account]) {
            revert MerkleAirdrop_AlreadyClaimed();
        }

        // CHECK 2: Is the Merkle proof valid for this account and amount?
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(account, amount))));
        if (!MerkleProof.verify(merkleProof, i_merkleRoot, leaf)) {
            revert MerkleAirdrop_InvalidProof();
        }

        // EFFECT: Update state to mark this account as claimed.
        // This is done BEFORE the external call to prevent reentrancy.
        s_hasClaimed[account] = true;

        // INTERACTION: Emit event and transfer tokens.
        emit Claim(account, amount);
        i_airdropToken.safeTransfer(account, amount);
    }
}
```
After implementing these changes, recompiling the contract using a development environment like Foundry (e.g., running `forge build`) will confirm that the code is syntactically correct and ready for further testing and deployment.

## Key Security Concepts and Best Practices Reinforced

This lesson highlights several crucial concepts for secure smart contract development:

*   **Multiple Claims Vulnerability:** A frequent oversight in airdrop or reward distribution contracts. Always ensure that a user cannot claim their entitlement more than once.
*   **State Tracking:** Using `mapping(address => bool)` is a straightforward and gas-efficient method to track whether an address has performed a specific state-changing action.
*   **Reentrancy Attacks:** One of the most notorious smart contract vulnerabilities. It occurs when an external call allows an attacker to re-enter the calling function before its initial execution completes critical state changes.
*   **Checks-Effects-Interactions (CEI) Pattern:** A vital security design pattern to mitigate reentrancy and other unexpected behaviors.
    *   **Checks:** Perform all validations (e.g., permissions, input validity, existing state) first.
    *   **Effects:** Make all internal state changes to your contract.
    *   **Interactions:** Execute calls to other contracts or transfer value.
    Adhering to this order significantly reduces the attack surface for reentrancy.
*   **Custom Errors:** Introduced in Solidity 0.8.4, custom errors (e.g., `error MerkleAirdrop_AlreadyClaimed();`) provide a more gas-efficient and descriptive way to handle error conditions compared to traditional string-based `require` messages. Development tools like GitHub Copilot can often assist in suggesting appropriate error names and structures.
*   **Modern Solidity Tooling:** Utilizing tools like Foundry for development, compilation (`forge build`), testing, and deployment helps streamline the development lifecycle and catch errors early.

By understanding these vulnerabilities and applying these security best practices, developers can build more robust and secure Merkle airdrop contracts, ensuring fair and intended token distribution.