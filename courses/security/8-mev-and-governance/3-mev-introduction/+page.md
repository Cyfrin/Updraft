---
title: MEV - Introduction
---

_Follow along with this video:_

<!-- TODO -->
<iframe width="560" height="315" src="https://www.youtube.com/watch?v=vtAOnxdFHqg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## What is MEV?

Mev stands for "Maximum Extractable Value" and it's the value that blockchain node operators and users can extract by ordering transactions in a block in a specific order. 

In order to develop an in-depth understanding, I would highly recommend visiting [Flashbots.net](https://www.flashbots.net/), a research and development organization dedicated to counteracting the negative implications of MEV. Their 'New to MEV' page, in particular, is a fantastic learning resource.

## What is the mempool? 

<img src="/security-section-8/3-mev-introduction/regular-transaction.png" style="width: 100%; height: auto;" alt="regular transaction">

When a transaction is initiated, it is directed to a specific node which, instead of immediately integrating it into its block, places it into its 'memory pool', or 'mempool'. This constitutes the lower tier of workings that enable blockchain.

<img src="/security-section-8/3-mev-introduction/mempool.png" style="width: 100%; height: auto;" alt="mempool">

As we know, Ethereum is a Proof-of-stake blockchain and the nodes essentially "take turns" building blocks for the blockchain. So if you send your transaction to a single node, the node will have to wait until it's that nodes turn to include your transaction! This could take months! So what the node does is that accepts your transaction, and will often "fan out" your transaction to other nodes. 

If it's one of the other nodes turns to build the block, if you sent enough of a tip (gas) with your transaction, the node will include your transaction in the block.

So this "mempool" is like a waiting room for transactions.

## Front-running

<img src="/security-section-8/3-mev-introduction/mev.svg" style="width: 100%; height: auto;" alt="front-running">

Suppose you're a malicious user and want to use this to your advantage. You have the ability to scan the mempool, essentially predicting future transactions. Let's say User A is malicious, and sees someone make a transaction that is going to make them $100. 

...Well User A might just say "Hey! I want to make $100!"

So what User A can do is something called *front-running*. They can send their *own* transaction *ahead* of your transaction to extra some value. The only reason they are able to extract this value is because they were able to see your transaction ahead of time. 

Front-running is one of the most common forms of MEV.