---
title: How do blockchains work?
---

You can follow along with this section of the course here.



In this in-depth tutorial, we're going to immerse ourselves in the complex yet captivating world of blockchain technology. Specifically, we're going to break down the process and the technology itself using a widely-praised and accessible demo available [here](https://andersbrownworth.com/blockchain/).

## Understanding Hash Functions

<img src="/blockchain-basics/hash-func.png" style="width: 100%; height: auto;">

At its simplest, a hash is a unique, fixed-length string that serves to identify any piece of data. When you input any kind of data into a hash function, it produces a hash. In this demo, the hash algorithm we'll focus on is SHA-256.

If I add `Patrick Collins` to our `SHA-256` algorithm, it will:

1. Convert the letters to numbers
2. Convert the numbers to a fixed-length “string” or “hash”

`Patrick Collins` gets converted to `7e5b5a1a6b80e2908b534dd5728a998173d502469c37121dd63fca283068077c`

Ethereum, a popular blockchain platform, uses its own version of a hashing algorithm that isn't exactly SHA-256 but belongs to the SHA family. This doesn't change things significantly as we're primarily concentrating on the concept of hashing.

In the application, whatever data you enter into the data section, undergoes processing by the SHA-256 hash algorithm resulting in a unique hash.

> For example, when I input my name as "Patrick Collins," the resulting hash uniquely represents "Patrick Collins." The fascinating aspect is, no matter how much data is input, the length of the generated hash string remains constant.

## Blockchain: Building Block by Block

<img src="/blockchain-basics/blockchain.png" style="width: 100%; height: auto;">

Now that we've grasped the concept of hashing and fixed-length string, let's inspect the structure of a blockchain—a collection of "blocks."

A block takes the same data input, but instead of a singular data field, a block is divided into 'block', 'nunce', and 'data.' All three are then run through the hash algorithm, producing the hash for that block. Hence, even a minor change in the data leads to an entirely different hash, hence, invalidating the block.

The data input can also change through a process called "mining". In essence, mining involves the computational trial and error process of finding an acceptable value to produce a hash which typically follows a certain pattern, such as starting with four zeros. The value found, which satisfies this criterion, is known as the 'nunce'.

## The Inherent Beauty of Blockchain: Immutability

<img src="/blockchain-basics/distributed.png" style="width: 100%; height: auto;">

In a blockchain, which is essentially a sequence of blocks, one block corresponds to the data of block 'nonce', 'nunce' and the hash of the previous block. As a result of this, the tampering of any single block invalidates the rest of the chain instantly, due to the cascading effect of the hash changes. This reveals the inherent feature of immutability in a blockchain.

> For instance, even typing a single 'A' in the place of a 'B' in a block data would require the entire blockchain to be re-computed to restore validity, an extremely resource intensive operation.

## Dissecting the Decentralization &amp; Distributed Aspect

<img src="/blockchain-basics/tokens.png" style="width: 100%; height: auto;">

Moving forward, the crux of blockchain's power lies in its decentralization or distributed nature. Under this system, multiple entities or "peers" run the blockchain technology, each holding equal weight and power. In the event of disparity between the blockchains run by different peers (due to tampering or otherwise), the majority hash wins, as the majority of the network agrees on it. Hence, in summary, the majority rules in the world of blockchain technology.

## Interplay of Blockchain &amp; Transactions

<img src="/blockchain-basics/transactions.png" style="width: 100%; height: auto;">

A blockchain is much more than an immutable record—it is an efficient and secure medium for transactions. Just as we allowed ourselves to experiment with random strings of data, we can replace the data sections with transaction information. In the event of an attempt to tamper with a past transaction—for instance, transferring a higher amount of money from one peer to another—the rest of the blockchain immediately becomes invalid, and the tampered blockchain will stand out as different from the majority of honest blockchains.

## Wrapping up with Private &amp; Public Keys

Finally, if you're wondering how the system ascertains the identities behind the transactions—consider Darcy sending $25 to Bingley—this is where public and private keys come into play. Without going too deep into this topic, these keys ensure the authenticity and non-repudiation of transactions.

To summarize, every transaction, block, and indeed the whole blockchain itself comes down to understanding the concept of a hash—this unique fixed-length string that is intrinsically linked with the original data. We've also underscored the importance of decentralization and highlighted how the concept of immutability plays into the system's security. Stay tuned for subsequent posts where we delve into topics like public and private keys, smart contracts, and more.
