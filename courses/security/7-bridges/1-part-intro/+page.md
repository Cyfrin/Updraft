---
title: Introduction
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/WZSwgk4oi7I?si=XJdWQiUwnXB6zxuy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Unveiling Section Seven of Security and Auditing EVM DeFi: A Comprehensive Security Review

Welcome back, enthusiastic coders! Brace yourselves for an exciting deep dive into Section Seven of the Security and Auditing EVM DeFi. In this intriguing space, we are going to roll up our sleeves and immerse in not less than five detailed security reviews or audits. Stay tuned for more in part two as well.

## Flashback to Thunder Loan

We have recently waved goodbye to the thrilling Thunder loan security review and audit, an eye-opener in the world of Decentralized Finance (DeFi). The concept explored here, ranging from flash loans to Oracle manipulation encapsulates the primary attacks presently haunting DeFi.

![](https://cdn.videotap.com/j6Dr40RzmumPq9jhPJY3-36.13.png)

### New Concepts Unfolded

Our journey shed light on a multitude of aspects essential for better understanding the DeFi landscape, including price Oracle manipulation, reward manipulation, insufficient function access control, and a gamut of logic errors, function parameter validation, misconfigurations and reentrancies.

While these are considerable advancements, we are yet to uncover every crevice of the DeFi sphere. More obscure areas, such as governance attacks and stolen private keys, are yet to be traversed. Fortunately, we will unveil these mysteries and delve deeper into the riveting world of DeFi security in this seventh chapter.

## Sneak Peek into Section Seven

Primarily, we will scrutinize the Seven Boss Bridge audit code base, currently available for the first flight on the [CodeHawks platform](https://www.codehawks.com).

![](https://cdn.videotap.com/LLXHIyWzga7BHJru6Wjv-90.31.png)

### The Power of CodeHawks

Remember, reading and evaluating security reviews is an effective way to level-up your skills. If tech-upscaling piques your interest, Code Hawks curates a vast array of first flights that are worth exploring. Furthermore, signing up for CodeOx posts and participating in competitive audits can be quite advantageous.

### Repo Overview and Tooling Upgrades

Exploring this chapter's repo, we will first notice two conventional branches: `main` and `audit data`, where `audit data` hosts the answer keys (no peeking!).

We will explore varying Ethereum Virtual Machine (EVM) chains such as Arbitrum, Optimism, ZKSync, and Ethereum. We will ponder whether these are analogous or have unique features that set them apart.

Furthermore, we will explore tools, Tenderly and Solidit, which will aid us in streamlining our code review process.

### The Hans Checklist: A Systematic Approach to Coding Reviews

Next, we delve into a novel system for conducting smart contract security reviews: the Hans Checklist.

Towards the end of this section, we'll break down Hans' trend-setting checklist methodology, which helped him ascend to the rank of top competitive auditor globally for the first half of 2023.

## The Classic Security Review Steps and Exciting Case Studies

As before, we will follow the classical method for security reviews, incorporating scoping, reconnaissance, vulnerability identification, writeups, and reporting. We will also look at the intriguing case studies based on various chains, including Polygon, ZK Sync, and how different chains actually work with different opcodes.

In this part, we will focus more on bridge hacks as these were rampant in the year 2022. Most bridge hacks we noticed unfortunately happened due to centralized controls and the loss of private keys, leading to bizarre exploitations.

We will also study several exciting exercises that include researching some attacks and doing write-ups on them. Some significant aspects would be Signature Replay, merkel tree, signature issues, polygon double spend, and nomad bridge hack.

## Onwards with the Contract Scoping Phase

Finally, after discussing the technicalities, we will commence with the scoping phase of the contract that will be considerably quicker this time. Following the scoping, we will move on to the actual security review of the contract.

Remember, there are conceivably more issues than we cover. Thus, if you stumble across some extra issues, don't hesitate to share your insights!

Brace yourselves—with all that we have in store, we're sure to add significant value to your coding and auditing skills, inspiring you to dive deeper into the mesmerizing world of coding.
