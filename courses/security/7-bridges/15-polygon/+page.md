---
title: Case Study - Polygon Precompile
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/X-j63QRtB7o?si=eQFAGbmWn3eTo3Pq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Hunting for smart contract bugs: How a developer identified a $7 billion exploit

If you fancy yourself a tech-savvy problem solver or a capable and competent coder, the world of smart contract bug bounties could be your next lucrative adventure. Not only are these exploits well-paying when correctly identified, but they also aid in securing the ecosystem against hackers.

I recently had the occasion to interview a developer who discovered a $7 billion bug and was rewarded with $2.2 million for his conscientious reporting of this vulnerability. By exploring his successful case, we can learn the key strategies and tools you'll need to find your million-dollar bounty.

Let's delve into this intriguing world of hunting for smart contract bugs.

## Matic blockchain, Polygon, and the MRC20 contract

On May 31, 2020, the Matic blockchain, which later rebranded as the Polygon chain, was launched. An [EVM](https://ethereum.org/en/developers/docs/evm/) compatible blockchain, it's known for its low gas fees, rapid block times, and recent ventures into [ZK technology](https://polygon.technology/polygon-zkevm).

If we return to the beginning, block zero to be precise, we find ten transactions in this Genesis block. One of these transactions created the MRC20 contract. This contract allowed users to sign a transaction without sending it, meaning they could offset gas costs. For example, somebody else could be responsible for these costs. This technique is referred to as a metatransaction, which is better explained in [EIP 712](https://eips.ethereum.org/EIPS/eip-712). Initiated with almost 10 billion MATIC, this contract facilitated these gasless transactions. However, it concealed a critical exploit, an oversight that could potentially empty the contract of its entire content.

## The discovery of the dormant exploit

On December 3, 2021, Leon Spacewalker (a pseudonym of our developer hero) submitted a report about this potential vulnerability to Immunify. Less than two days later, another astute individual discovered this exploit. Unfortunately, this other individual was a malicious hacker and successfully pilfered 800,000 MATIC tokens from the contract.

Polygon was forked two days after the initial report, and the contract was swiftly mended. From December 5, 2021, the MRC20 contract was no longer vulnerable to this exploit.

But what exactly was this bug, and how did it remain unidentified for so long? Let's turn our attention to the function that enabled these gasless transactions.

## Anatomy of the bug - A detailed look

This function appears benign at first glance. It requires a user's signature, data, and an amount to send, an expiration date, and a recipient for the money. Running certain checks, it retrieves the data hash required for the metatransaction and ensures this data hash hasn't been previously used. Following these steps, it then launches an EC recovery function.

This recovery function, ecrecover, verifies the origin of a signed transaction. However, should it encounter an error, it simply returns the zero address without viability checks. Even though there is a condition to ensure that this return is not zero, the ececovery function still returns zero upon encountering an error. Herein lies the vulnerability.

If the function were to check the overall validity of this function and not just the zero address, the problem would've been handled. But alas, that check was overlooked. The transfer function, acting as the last line of defense, should at least verify the 'from' address. But it simply transfers money out of the MRC20 contract without making any such checks.

The exploit was then straightforward: Just passing a faulty signature, setting any quantity, and denoting a receiver. This method would essentially drain the entire MATIC balance.

### Prevalence of dormant bugs in the tech world

It's both peculiar and surprising that this bug remained latent for about 1.5 years, only to be discovered by multiple individuals within a short span. After discussing with the Immunified team, they provided a remarkable insight: these sleeping exploit beasts' simultaneous awakenings are a fairly common phenomenon. As soon as media outlets popularize new bugs, bug hunters flock to identify them in other plausible places.

Despite this seemingly random event, we can extract several valuable lessons from this saga.

## Strategies to identify bugs

My conversation with Leon yielded some precious tips and tricks he employed to discover this and numerous other security loopholes. Note that a basic understanding of Solidity and appropriate smart contract fundamentals are desirable assets in watching your million-dollar bounty surface.

### 1. Distinct advantage - Find your edge

Every bug bounty hunter must have a unique advantage. Leon's advice to anyone entering this space, hone that specific skill, that edge over other smart contract developers, bug hunters, and protocols.

### 2. Know the subject - Understand the protocol

Knowing the specifics of the protocol in-depth is one of the most common strategies to find bugs. Reading the documentation, experimenting with the protocol implementation, etc., if you grasp every corner of the protocol, you're likely to identify aberrations as well.

### 3. Research and Grow

Research on specific bugs and uncover projects that have those loopholes. This technique, requiring a solid understanding of diverse exploits and maintaining awareness of unexplored best practices, simplifies your search as you're only seeking a specific chunk of code in a project.

### 4. Speed is key

Being quick in identifying new bounties and updates surely benefits in this context. Equipped with the right tools, such as Immunified discord BBP notifications, one can always stay ahead.

### 5. Devising unique strategies - Be creative

Leon often visited community forums projecting a potential bug bounty. He would then start exploring their smart contracts even before approval to gain a head start.

### 6. Arm yourself with the right tools

Knowledgeable bug hunters use various helpful tools. Solidity Visual Developer, Hard Hat Foundry, Brownie, Dune Analytics, and Etherscan are a few examples.

### 7. Audited projects are not bug-free

Leon has discovered numerous vulnerabilities in projects that top firms had audited. So, do not be disheartened by audited projects.

### 8. Find your niche

Gaining industry-specific knowledge can dramatically improve your ability to uncover bugs.

Although the example discussed here is quite specific and outlines a single bug hunt, these tips can be generalized for anyone hopeful of winning a sizeable bug bounty.

Are you prepared to accept the challenge?

![](https://cdn.videotap.com/MuftBpuNZSZv4cmAeOuU-506.03.png)
