---
title: Blob Transactions
---

_Follow along with the video_

---

### Introduction

In a default transaction, data is stored and visible on-chain permanently. Blob transactions (binary large objects), classified as transaction type 3, allow data to be stored temporarily on-chain and then deleted after a short period, ranging from 20 to 90 days.

### EIP4844

These transactions originate from EIP4844, also known as "Proto-Danksharding", introduced in the Dencun upgrade in March 2024. The purpose of this transaction type is to address Ethereum's high transaction costs.

Roll-ups help scale Ethereum by executing multiple transactions on their own chains, compressing them into batches, and submitting these batches back to Ethereum. Prior to the upgrade, all compressed transaction data had to be permanently stored on Ethereum nodes, which was inefficient and costly. With EIP4844, the data can be submitted **temporarily** for validation, avoiding permanent storage.

### Blobs and Transactions

Blobs are temporary data attached to a transaction, which is then validated and deleted. For example, ZKsync can send its batch of compressed transactions to Ethereum using blobs.

You can check [this transaction](https://etherscan.io/tx/0x291351476ef62e83ed33fb385f998232b8577bd1af60eb3463ce5a9e77fc8666) on Etherscan, which contains two [Blobs](https://etherscan.io/tx/0x291351476ef62e83ed33fb385f998232b8577bd1af60eb3463ce5a9e77fc8666#blobs). Clicking on one of them will reveal its massive data, which was not stored on-chain.

### Validation

Validating these blobs involves using the [`BLOBHASH`](https://www.evm.codes/#49?fork=cancun) opcode and a [point evaluation precompile](https://www.evm.codes/precompiled#0x0a?fork=cancun), which execute cryptographic processes to verify the correctness of the blob without requiring on-chain storage.

1. A transaction is submitted with a blob and cryptographic proof data
2. The contract on-chain does not directly access the blob. Instead, it uses the `BLOBHASH` opcode to generate a hash of the blob
3. The _blob hash_ and the _proof data_, is passed to the **point evaluation opcode** to verify the transaction batch

### Resources

- [What is EIP-4844?](https://www.cyfrin.io/blog/what-is-eip-4844-proto-danksharding-and-blob-transactions)
- [send_blob](https://github.com/PatrickAlphaC/send_blob) GitHub repository
