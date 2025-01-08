---
title: Merkle Proofs
---

_Follow along with the video_

---

### Introduction

Merkle Trees, Merkle Proofs, and Root Hashes are very important concepts in the realm of IT and blockchain technology. Invented by Ralph Merkle in 1979, a Merkle tree is a hierarchical structure where its base consists of **leaf nodes** representing data that has been hashed. The top of the tree is the **root hash**, created by hashing together pairs of adjacent nodes. This process continues up the tree, resulting in a single **root hash** that will represents all the data in the tree.

::image{src='/foundry-merkle-airdrop/03-merkle-proof/merkle-tree.png' style='width: 100%; height: auto;'}

### Merkle Proofs

Merkle proofs will verify that a specific piece of data is part of a Merkle Tree and consist of the hashes of **sibling nodes** present at each level of the tree.

For example, to prove that `Hash B` is part of the Merkle Tree, you would provide _Hash A_ (sibling 1) at the first level, and the _combined hash of Hash C and Hash D_ (sibling 2) at the second level as proofs.

This allows the Merkle Tree **verifier** to reconstruct a root hash and compare it to the expected root hash. If they match, the original data is confirmed to be part of the Merkle tree.

> 👀❗**IMPORTANT**:br
> Secure hashing functions, such as `keccak256`, are designed to prevent hash collisions

### Applications

Merkle trees are used in **rollups** to verify state changes and transaction order and in **airdropping**, enabling specific addresses to claim tokens by being included as **leaf nodes** in the tree. As discussed in lesson 1, using Merkle proofs for airdrops is safer and more efficient than relying on a simple array of addresses to prove that a piece of data (e.g. an address) is part of a group.

### OpenZeppelin

OpenZeppelin provides a library for [MerkleProofs](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/dbb6104ce834628e473d2173bbc9d47f81a9eec3/contracts/utils/cryptography/MerkleProof.sol), and we will use it in our smart contract. Its [`verify`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/dbb6104ce834628e473d2173bbc9d47f81a9eec3/contracts/utils/cryptography/MerkleProof.sol#L32) function takes the proof, the Merkle root, and the leaf to be verified as inputs.

```solidity
function verify(bytes32[] memory proof, bytes32 root, bytes32 leaf) internal pure returns (bool) {
    return processProof(proof, leaf) == root;
}
```

> 🗒️ **NOTE**:br
> The **root** is typically stored _on-chain_, while the **proof** is generated _off-chain_.

The [`processProof`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/dbb6104ce834628e473d2173bbc9d47f81a9eec3/contracts/utils/cryptography/MerkleProof.sol#L49) function iterates through the proof array, updating the computed hash by hashing it with the next proof element. This process ultimately returns a computed hash, which is compared to the expected root to verify the leaf's presence in the Merkle Tree.

```solidity
function processProof(bytes32[] memory proof, bytes32 leaf) internal pure returns (bytes32) {
    bytes32 computedHash = leaf;
    for (uint256 i = 0; i < proof.length; i++) {
        computedHash = _hashPair(computedHash, proof[i]);
    }
    return computedHash;
}
```

### Conclusion

Merkle proofs will help verifying that a specific piece of data is part of the Merkle tree. By providing hashes of sibling nodes at each level of the tree, a verifier can reconstruct the root hash and confirm data integrity.
