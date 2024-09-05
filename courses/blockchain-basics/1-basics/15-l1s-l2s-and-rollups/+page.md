---
title: Introduction to Layers and Rollups
---

_Follow along with the video_

---

### Introduction

In this course, we've briefly mentioned several key terms: Layer 1 (L1), Layer 2 (L2), and Rollups. Throughout this course, we will deploy and interact with smart contracts on **Sepolia**, a Layer 1 test net, and **zkSync Sepolia**, a Layer 2 Rollup.

### Blockchain layers

A **Layer 1 (L1)** blockchain is the base layer of the blockchain ecosystem, where nodes help the chain to reach consensus. It operates without any additional plugins and is often referred to as the _settlement layer_. Examples of L1 chains include Bitcoin, BNB Chain, Solana, and Avalanche. In this course, we primarily focus on Ethereum, which serves as the **hub** of the Ethereum ecosystem. Applications directly deployed on Ethereum, like Uniswap, are not considered L2s but rather dApps on L1.

A **Layer 2** is any application built on outside an L1 blockchain that _hooks back into it_. There are different types of Layer 2, for example **Chainlink**, a decentralized Oracle networks and event indexing networks like **The Graph**, which enable applications to access on-chain data. But the most popular type of L2 is the **rollup**, or **L2 chain**.

### Rollups

**Rollups** are L2 scaling solutions that enable to increase the number of transactions on Ethereum by bundling multiple transactions into one, reducing gas costs.

::image{src='/blockchain-basics/15-l1s-l2s-and-rollups/tx-bundle.png' style='width: 100%; height: auto;'}

Rollups help solve the blockchain trilemma, which states that a blockchain can only achieve two out of three properties: _decentralization_, _security_, and _scalability_. In the case of Ethereum, **scalability** is sacrificed as it can only process approximately 15 transactions per second. Rollups, on the other hand, aim to enhance scalability without compromising security or decentralization.

::image{src='/blockchain-basics/15-l1s-l2s-and-rollups/bc-trilemma.png' style='width: 100%; height: auto;'}

#### How Rollups Work

When a user [submits a transaction](https://docs.zksync.io/zk-stack/concepts/transaction-lifecycle) to a rollup, an **operator** (a node or entity responsible for processing transactions) picks it up, bundles it with other transactions, compresses them, and submits the batch back to the L1 blockchain. This process allows for efficient handling of transactions as gas costs associated with the transaction, are split among all the users that submitted the transactions in the batch.

There are two types of rollups, Optimistic and Zero-Knowledge rollups. The main difference between the two lies in how each rollup verifies the validity of the transactions.

### Optimistic Rollups

They assume that off-chain transactions are _valid by default_. Operators propose the **valid state** of the rollup chain, and during a **challenge period**, other operators can challenge potentially fraudulent transactions by computing a **fraud proof**.

This **fraud proof process** involves the operator engaging in a _call and response interaction_ with another operator to identify and isolate a specific computational step. This specific step is then executed on the Layer 1 blockchain: if the result differs from the original state, it indicates that the transaction was fraudulent. When the fraud proof succeeds, the rollup will re-execute the entire batch of transactions correctly, and the operator responsible for including the incorrect transaction will be penalized, usually by losing staked tokens (_slashing_).

### Zero-Knowledge (ZK) Rollups

ZK rollups use validity proofs, known as _zk proofs_, to verify transaction batches. In this process, the **prover** (operator) generates a zk proof to show that their inputs (the transactions) satisfy this equation. A **verifier** (an L1 contract) then checks this proof to ensure that the output matches the expected result. The solution that the prover uses to demostrate that their input satisfies the mathematical equation in the zk proof is commonly referred as the **witness**.

### Conclusion

Rollups enhance Ethereum's scalability by processing transactions off-chain, bundling them, and submitting them back to Ethereum with validity proofs. This method maintains the security and decentralization of L1 while significantly increasing transaction throughput.

### 🧑‍💻 Test yourself

1. 📕 What is the primary function of a Layer 2 blockchain?
2. 📕 How do optimistic rollups ensure the validity of transactions?
3. 📕 What is commonly referred as the _witness_?
