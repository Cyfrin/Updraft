---
title: MEV - Introduction
---

_Follow along with this video:_

---

## What is MEV?

Mev stands for "Maximum Extractable Value", or sometimes "Miner Extractable Value", and it's the value that blockchain node operators and users can extract by ordering transactions in a block in a specific order.

In order to develop an in-depth understanding, I would highly recommend visiting [Flashbots.net](https://www.flashbots.net/), a research and development organization dedicated to counteracting the negative implications of MEV. Their '[**New to MEV**](https://docs.flashbots.net/new-to-mev)' page of their docs, in particular, is a fantastic learning resource. I highly _highly_ recommend reading through these articles to understand what's going on with MEVs.

## What is the mempool?

![regular transaction](/security-section-8/3-mev-introduction/regular-transaction.png)

When a transaction is initiated it uses an RPC_URL, as we know. This URL points to a specific node on the blockchain which, instead of immediately integrating it into its block, places it into its 'memory pool', or 'mempool'. This constitutes the lower tier of workings that enable blockchain.

![mempool](/security-section-8/3-mev-introduction/mempool.png)

As we know, nodes essentially "take turns" building blocks for the blockchain. So if you send your transaction to a single node, the node will have to wait until it's that node's turn to include your transaction! This could take months!

So what the node does is accept your transaction, and add it to the `mempool`, accessible to other nodes. When another node sees this transaction waiting to be sent, it will pull transactions from the `mempool` to include in the block, often based on gas paid for that transaction.

> **Remember:** Part of gas paid serves as a financial incentive for node operators!

So this "`mempool`" is like a waiting room for transactions.

### Front-running

Suppose a malicious actor has visibility into the `mempool` and wants to use this to their advantage. Visibility into the `mempool` allows someone to effectively predict future transactions.

If a malicious actor were to see a transaction in this waiting room that would benefit them, they're able to send _their own_ transaction, paying more gas, skipping the line.

The malicious actor's transaction would execute before the victims!

![front-running](/security-section-8/3-mev-introduction/mev.svg)

This is called Front-Running and is one of the most common forms of MEV. Let's look at a more minimal diagram in the next lesson before moving on.
