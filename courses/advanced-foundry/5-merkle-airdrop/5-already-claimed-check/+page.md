---
title: Already Claimed Check
---

_Follow along with the video_

---

### Tracking

To prevent users from claiming their tokens multiple times and draining the contract's funds, we need a mechanism to track who has already claimed their tokens and stop them from doing so again.

We can declare a mapping of addresses to boolean values to keep track of whether an address has claimed its tokens:

```solidity
mapping(address => bool) private s_hasClaimed;
```

We then update this value in the `claim` function:

```solidity
//..
if (!MerkleProof.verify(merkleProof, i_merkleRoot, leaf)) {
    revert MerkleAirdrop__InvalidProof();
}
s_hasClaimed[account] = true;
emit Claimed(account, amount);
//..
```

> 👮‍♂️ **BEST PRACTICE**  
> Ensure you follow the checks-effects-interactions (CEI) pattern to prevent vulnerabilities such as re-entrancy attacks.

### Verifying

At the beginning of our contract, we can implement a check to verify if an address has already claimed:

```solidity
if (s_hasClaimed[account]) {
    revert MerkleAirdrop__AlreadyClaimed();
}
```
