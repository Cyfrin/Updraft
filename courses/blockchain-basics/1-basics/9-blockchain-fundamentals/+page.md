---
title: High Level Blockchain Fundamentals
---

You can follow along with this section of the course here.

<iframe width="560" height="315" src="https://www.youtube.com/embed/NgHe7yuhyhU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Understanding Cryptography and Blockchain

In our previous discussions, we have covered basic concepts of cryptography and elements of blockchain. Now, let's discuss how these concepts translate into real-world applications. It is important to bear in mind that varying blockchains utilize different algorithms and criteria, so there might be minute variations in the implementation, but the core principles remain consistent.

In the traditional sense, when we interact with an application or a server, such as a website, we are essentially engaging with a centralized entity. Contrarily, as we've seen, a blockchain operates within a network of independent nodes, all managed by individual users running blockchain software.

In the realm of blockchain, the term `node` takes on a special significance, emerging as the heartbeat of the decentralized system. Imagine it this way - each `node` represents an individual user's server, pulsating with the rhythmic cadence of blockchain technology. When these nodes sync and engage with each other, they weave together an intricate and robust blockchain network. The real magic, however, lies in its democratic essence. In this decentralized universe, anyone armed with the right hardware and software can join the network, embodying the true spirit of decentralization. This is not just a technological concept; it's a silent revolution celebrating inclusivity and accessibility.

For those eager to participate, Websites like GitHub offer the opportunity to set up your own Ethereum node in a matter of seconds!

## Blockchain: A Decentralized Powerhouse Resilient to Disruptions

The primary advantage of blockchain technology is its resilience to disruptions. Here's the reason: traditional online systems run by centralized entities are vulnerable. If they shut down due to a variety of reasons (like being hacked or due to internal issues), their services are interrupted.

On the other hand, blockchains are decentralized, and the chances of all nodes shutting down simultaneously are extremely low. So, even if one or more nodes fail, the system continues to operate unabated, as long as there is at least one functioning node. This inherent backup feature makes blockchain an incredibly resilient system. Popular chains like Bitcoin and Ethereum consist of thousands of nodes which makes them even more resistant to disruptions.

## The Consensus Protocols: Proof of Work and Proof of Stake

<img src="/blockchain-basics/09-blockchain-fundamentals/blockchain-fundamentals.jpg" style="width: 100%; height: auto;" alt="block fee">

Now that we've reviewed some fundamentals, let's move on to two key concepts you may have heard about: 'Proof of Work' and 'Proof of Stake'. These concepts are crucial to understanding how blockchains work.

Proof of work and proof of stake fall under the umbrella of consensus. Consensus is a critical topic when it comes to blockchains because it is used to reach an agreement on the state or a single value on the blockchain, especially in a decentralized system.

In the majority of blockchains, the consensus protocol can be broken down into two constituent parts; a chain selection algorithm and a civil resistance mechanism. We'll touch on the main characteristics of each mechanism and then cover in more detail how Proof of Stake forms an evolved alternative to the electricity-hungry Proof of Work.

### Proof of Work: Deciphering the Consensus Protocol

As already discussed, Proof of Work is a civil resistance mechanism, a way to avert potential Sybil attacks. A Sybil attack is when a user creates numerous pseudonymous identities aiming to gain a disproportionately influential sway over the system. In the Proof of Work environment, such an attack is difficult to execute. As Sybil resistance is inherent in the mechanism, irrespective of how many aliases an attacker creates, every identity must undertake the highly resource-intense process of mining to find the answer to the blockchain's puzzle.

The Proof of Work mechanism also interacts with the consensus protocol's other key component: the chain selection rule. With this, the decentralized network decides that the longest chain - i.e., the one with the highest number of blocks - will be the authoritative chain.

### Consensus and Scalability Issues

One key compromise with Proof of Work is the substantial demands it puts on electricity, rendering it environmentally unfriendly. This has spurred the development of more eco-friendly protocols, such as Proof of Stake. This alternative consensus protocol follows a different sybil resistance mechanism: rather than expending substantial computational resources to mine blocks, in Proof of Stake, nodes or "validators" instead stake collateral as a surety they will behave honestly.

However, another significant issue requiring attention is scalability. As the number of transactions exceeds the amount of block space, latency and high transaction costs, or "gas fees", can become a hindrance.

### Layer 1 and Layer 2 Scaling Solutions

Blockchain developers have devised two key options in response to this limitation:

1. `Layer 1` solutions: This refers to base layer blockchain implementations like Bitcoin or Ethereum.
2. `Layer 2` solutions: These are applications added on top of a layer one, like [Chainlink](https://chain.link/) or [Arbitrum](https://arbitrum.io/).

Options like Arbitrum, for instance, use a "roll-up" approach where transactions are processed in bulk and then rolled up into a Layer 1 blockchain. This increases the effective capacity of a Layer 1 blockchain, allowing it to absorb more transactions, effectively easing the scalability issue.
