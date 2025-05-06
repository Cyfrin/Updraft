## Securing Your Merkle Airdrop Contract: Preventing Multiple Claims

Merkle airdrops provide an efficient way to distribute tokens by verifying eligibility off-chain and using on-chain proofs. However, a common vulnerability can arise if the claim logic isn't carefully implemented. This lesson details how to identify and fix a critical flaw in a Merkle Airdrop smart contract that could allow users to claim their tokens multiple times.

## Identifying the Multiple Claims Vulnerability

Consider a typical `claim` function in a Merkle Airdrop contract. It might look something like this (simplified):

```solidity
// Hypothetical initial state - VULNERABLE
function claim(address account, uint256 amount, bytes32[] calldata merkleProof) external {
    // Verify the user is in the Merkle tree using the proof
    bytes32 leaf = keccak256(abi.encodePacked(account, amount));
    bool isValidProof = MerkleProof.verify(merkleProof, i_merkleRoot, leaf);
    require(isValidProof, "MerkleAirdrop: Invalid proof.");

    // If proof is valid, transfer tokens
    emit Claim(account, amount);
    i_airdropToken.safeTransfer(account, amount);
}
```

This function correctly checks if the `account` providing the `merkleProof` is legitimately part of the airdrop, as defined by the `i_merkleRoot`. But what happens if a legitimate user calls this function *twice*?

The Merkle proof verification (`MerkleProof.verify`) will succeed both times because the user *is* indeed in the tree. The function lacks any mechanism to remember if this specific `account` has already successfully claimed their tokens. Consequently, a user could repeatedly call `claim`, receiving the `amount` each time, potentially draining all the airdrop tokens held by the contract. This is a critical vulnerability.

## Implementing State Tracking to Prevent Multiple Claims

To fix this, the contract needs to remember which addresses have already claimed their tokens. We need to introduce state tracking. In Solidity, the ideal data structure for this is a `mapping`. A mapping acts like a dictionary or hash table, allowing us to associate a key (the user's address) with a value (whether they have claimed).

We'll define a mapping where the key is an `address` and the value is a `boolean`. A `true` value will signify the address has claimed, while `false` (the default for booleans in mappings) means they haven't.

Add the following state variable declaration to your contract, typically above the constructor:

```solidity
contract MerkleAirdrop {
    // ... other variables (i_airdropToken, i_merkleRoot) ...

    // State variable to track claims
    mapping(address claimer => bool claimed) private s_hasClaimed;

    // ... events, errors, constructor, functions ...
}
```

*   `mapping(address => bool)`: Defines the mapping type.
*   `private`: Restricts access to this variable from outside the contract.
*   `s_hasClaimed`: The variable name. The `s_` prefix is a common convention indicating a storage variable (its value persists on the blockchain).

## Applying the Checks-Effects-Interactions Pattern

Now that we have a way to store claim status, we need to update it within the `claim` function. A naive approach might be to update the mapping *after* the token transfer:

```solidity
// Inside claim function - INCORRECT PLACEMENT
// ... Merkle proof verification ...
emit Claim(account, amount);
i_airdropToken.safeTransfer(account, amount);
s_hasClaimed[account] = true; // <--- WRONG: Effect after Interaction
```

This placement is dangerous and violates a fundamental Solidity security principle: the **Checks-Effects-Interactions (CEI)** pattern.

1.  **Checks:** Perform all validation conditions first (e.g., is the proof valid? Has the user already claimed?).
2.  **Effects:** Modify the contract's internal state (e.g., update the `s_hasClaimed` mapping).
3.  **Interactions:** Call other contracts or transfer native currency (e.g., `i_airdropToken.safeTransfer`, sending ETH). Event emissions are also often considered interactions.

Why is this order crucial? External calls (`Interactions`) can be risky. If an interaction occurs *before* the contract's state is updated (`Effects`), the external contract might potentially call back into our contract (a reentrancy attack) *before* the state change (`s_hasClaimed[account] = true;`) is recorded. This could allow an attacker to bypass the intended logic and potentially drain funds or manipulate state.

By performing Effects *before* Interactions, we ensure our contract's internal state is consistent before relinquishing execution flow to an external contract. The correct placement for the state update is:

```solidity
// Inside claim function - CORRECT PLACEMENT
// ... Merkle proof verification ...

// EFFECT: Update state BEFORE interactions
s_hasClaimed[account] = true;

// INTERACTIONS: Emit event and transfer tokens
emit Claim(account, amount);
i_airdropToken.safeTransfer(account, amount);
```

## Completing the Fix: Adding the Claim Check

Simply updating the state isn't enough; we must also *check* this state at the beginning of the function to prevent execution if the user has already claimed. We add a condition at the very start of the `claim` function.

Additionally, we'll use a custom error for better gas efficiency and clearer revert reasons compared to `require` statements with strings. Define the custom error at the contract level:

```solidity
// Add near the top of the contract
error MerkleAirdrop_AlreadyClaimed();
```

Now, modify the `claim` function to include the initial check:

```solidity
function claim(address account, uint256 amount, bytes32[] calldata merkleProof) external {
    // CHECK 1: Has the user already claimed?
    if (s_hasClaimed[account]) {
        revert MerkleAirdrop_AlreadyClaimed();
    }

    // CHECK 2: Verify the Merkle proof
    bytes32 leaf = keccak256(abi.encodePacked(account, amount));
    bool isValidProof = MerkleProof.verify(merkleProof, i_merkleRoot, leaf);
    // Using require here is still fine, or could be another custom error
    require(isValidProof, "MerkleAirdrop: Invalid proof.");

    // EFFECT: Mark the user as claimed (BEFORE interactions)
    s_hasClaimed[account] = true;

    // INTERACTIONS: Emit event and transfer tokens
    emit Claim(account, amount);
    bool success = i_airdropToken.safeTransfer(account, amount);
    require(success, "MerkleAirdrop: Transfer failed."); // Good practice to check transfer result
}
```

This implementation now follows the Checks-Effects-Interactions pattern:
1.  **Check:** Verifies if `s_hasClaimed[account]` is `true`. If so, revert.
2.  **Check:** Verifies the Merkle proof. If invalid, revert.
3.  **Effect:** Sets `s_hasClaimed[account]` to `true`.
4.  **Interaction:** Emits the `Claim` event.
5.  **Interaction:** Calls `safeTransfer` on the token contract.

## Conclusion: A Secure Airdrop Claim Function

By introducing the `s_hasClaimed` mapping to track claim status and strictly adhering to the Checks-Effects-Interactions pattern within the `claim` function, we have successfully addressed the multiple claims vulnerability. The initial check prevents users who have already claimed from proceeding, and updating the state *before* the external token transfer mitigates potential reentrancy risks. This ensures each eligible user can claim their airdrop exactly once, securing the contract's funds and guaranteeing a fair distribution. Always prioritize state tracking and the CEI pattern when designing functions that involve unique actions per user and external contract interactions.