---
title: Transaction Types
---

_Follow along with the video_

---

### Introduction

In this lesson, we will explore the **four** primary transaction types shared by both Ethereum and ZKsync. After that, we'll take a look at the transaction types specific to the ZKsync chain.

### Type 0 (Legacy Transactions)

This is the oldest transaction type, specified when using the `--legacy` flag. It was the first standard Ethereum transaction before the introduction of newer types.

### Type 1 (0x01)

This type was introduced to address contract breakage risks associated with EIP2929 and EIP2930, which introduced new rules for gas costs and access lists.

- This type adds an **access list** parameter to the standard fields, which contains an array of addresses and storage keys, allowing for gas savings on cross-contract calls by pre-declaring data.

### Type 2 (0x02)

Introduced by EIP1559 during Ethereum's London fork, this transaction type aims to mitigate Ethereum's high network fees.

- Replaces the gas price parameter with a **base fee**, adjusted for each block.
- Adds the **Max Priority Fee per Gas**, the maximum fee the sender is willing to pay for prioritization.
- Introduces the **Max Fee per Gas**, the total maximum fee the sender is willing to pay.

  > 🗒️ **NOTE**:br
  > While ZKsync supports type 2 transactions, it does not utilize the max fee parameters, as gas functions differently on ZKsync.

### Type 3 (0x03)

Introduced by EIP4844, this transaction type provides an initial scaling solution for rollups.

- **Max Blob Fee per Gas**: This parameter sets the maximum fee the sender is willing to pay per gas unit specifically for **blob gas**.

  > 🗒️ **NOTE**:br
  > Blob gas is a specific type of gas used in Ethereum to handle large data structures and is used in rollups. Blob gas is distinct from regular gas and has its own market.

- **Blob Versioned Hashes**: A list of versioned blob hashes associated with the transaction blobs. These hashes are used to verify the integrity of the blobs and ensure they are correctly linked to the transaction.

The blob fee is deducted and burned from the sender's account before the transaction executes, meaning it is not refunded if the transaction fails.

Next, we have two transaction types specific to ZKsync:

### Type 113 (0x71)

Defined by EIP712, these transactions standardize **data hashing** and **signing**, enabling features like **account abstraction** and **paymasters**.

> 👀❗**IMPORTANT**:br
> Smart contracts on ZKsync must be deployed using type 113 transactions.

Fields specific to type 113 transactions are:

- **Gas per Pub Data**: The maximum gas the sender is willing to pay for a single byte of **pub data**, the L2 state data submitted to L1.
- **Custom Signature**: Used when the signer's account is not an EOA.
- **Paymaster Params**: Parameters for configuring a custom paymaster, a smart contract that pays for the transaction.
- **Factory Depths**: Contains the bytecode of the deployed smart contract.

### Type 5 (0xFF) Transactions

Known as **priority transactions**, these allow users to send transactions directly from L1 to L2 in ZKsync.
