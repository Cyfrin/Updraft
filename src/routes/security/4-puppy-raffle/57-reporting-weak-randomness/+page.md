---
title: Reporting - Weak Randomness
---

_Follow along with this video:_

## <iframe width="560" height="315" src="VIDEO_LINK" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Auditing Randomness in Blockchain Protocols: A Deep Dive

In the world of decentralized applications and blockchain protocols, randomness plays a critical role in creating fair outcomes. Platforms relying on randomness mechanisms like lottery games tend to be prone to vulnerabilities. In this article, we'll discuss the common weaknesses related to randomness and their impact on the functionality of the protocol.

## Auditing the Process of Randomness

![](https://cdn.videotap.com/A0C1NmhbMJhDQtFHw3eb-29.91.png)While auditing a recent protocol, we encountered a significant flaw in the system: The randomness involved wasn't verifiably random. This observation led us to assess a variety of variables, namely the impact and the likelihood of this flaw affecting the protocol.

> "The impact of a non-verifiably random number in a protocol can be high. The winner could be predicted or altered, which can significantly undermine the protocol's integrity."

The likelihood of this happening is also high because individuals, motivated by self-interest, will likely try to exploit this vulnerability to cheat the system. Therefore, we rated the potential impact and likelihood both high, placing the issue at a high severity level.

## Unearthing the Root Cause and Impact

![](https://cdn.videotap.com/K1jaGIVHSOnaSRtPUtcD-99.69.png)Reentrancy stood out as another significant issue we encountered during the audit. However, the primary focus of this article revolves around weak randomness, a common security flaw in many blockchain protocols.

To understand it better, let's explore an example: 'Puppy Raffle'. Weak randomness in 'Puppy Raffle' gives users an influencer role, allowing them to predict or alter the winner. This prediction is based on a simple susceptibility - hashing the message sender, block timestamp, and block difficulty together leads to a predictable final number. The outcome isn't truly random, providing malicious users with an opportunity to manipulate values or predict them in advance to influence the raffle results.

This vulnerability also exposes another potential threat - front running. Users clever enough to see they aren't the winner may choose to call router functions and disrupt the functionality of the protocol further.

## Impact and Inaccurate Randomness

![](https://cdn.videotap.com/6sKiQi1LSBNokBJRuCbW-149.53.png)The dangers of weak randomness are magnified in scenarios where users can influence the raffle winner, thus winning the prize money or getting access to the rarest puppy. The problem amplifies when bad randomness also effects the rarity of the puppies, making the entire raffle worthless if evolved into a gas war.

We'll combine these two issues arising from inaccurate randomness - the raffle winner and the puppy rarity - into one. They have unique root causes but the same dysfunctionality resultant from the weak randomness at play.

## Proof of Concept

Understanding these vulnerabilities isn't enough. We also need to establish a concrete proof of concept:

1. Validators predicting block timestamp and block difficulty can significantly manipulate their participation.
2. Users can modify their message sender value, making their address the preferred one to determine the winner.
3. Transactions, such as select winner, can be reverted by users if the result doesn't meet their satisfaction.

In this case, creating proof of concept would require fuzzing the message sender, manipulating it to a preferred outcome.

Also noteworthy is a common attack vector - using on-chain values as seeds for randomness. The solution requires a reform of the randomness mechanism used in the protocol.

## Recommended Mitigation

A cryptographically verifiable random number generator, such as [Chainlink VRF](https://docs.chain.link/docs/get-a-random-number/), could substantially mitigate such issues.

## Wrapping Up

The audit, evaluation, and subsequent steps we discussed underline the essential nature of randomness in blockchain protocols. At the same time, they also highlight the need for robust mechanisms to ensure the implementation of fair and unpredictable randomness.

In the dynamic and rapidly evolving blockchain space, keeping up with security vulnerabilities, understanding them and formulating comprehensive mitigation strategies, is of utmost importance.
