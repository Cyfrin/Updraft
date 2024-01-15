---
title: Answering Our Questions
---

---

# A Deep Dive into T-SWAP: Unpacking Questions and Bugs

In our exploration of the intricate protocol called T-SWAP, we're going to be asking some hard questions and unraveling complex aspects. The key thing about crypto dApps is you need to understand their working down to the bare-bones in order to exploit or protect against potential vulnerabilities.

To make the exercise simple, we will treat the hard-hitting questions as dialogue, with each question and answer followed by a quick analysis or piece of advice.

Let's jump in.

## Q1: Why are we using T-SWAP?

We're using T-SWAP to get the value of a token so that we can calculate fees. Sounds simple enough, right? However, this leads us to another question.

## Q2: Why are we only using the price of a pool token in WETH (Wrapped Ethereum)?

This is the part that may sound a bit odd. Why are we getting the price in WETH when our primary objective is the price of the token? We're using this pricing in `calculateFee` or `getCalculatedFee`. This calls the `getPriceInWETH`, but for a scenario where we have a flash loan, it's not making much sense.

![](https://cdn.videotap.com/Ko9tuGIzxt2a7EKvdpiz-189.39.png)

"If we intended to get the price in WETH then the fee should probably be in WETH," I hear you say. And you're right. This `getCalculatedFee` seems off. How can one USDC plus 0.3 USDC make sense when the fees are being calculated using `getPriceInWETH`? This could be a potential bug in the software.

At this juncture, we must determine the impact and likelihood of this bug.

## Potential Bugs in Fee Calculation

First off, let me assure you - we're not expecting you to grasp everything the first time around. Crypto security is rife with quirky implementations that some might consider "weird wonkiness."

Here's what we're dealing with - Whenever a fee gets calculated, it uses this potentially flawed method. If this is not the intended functionality, that's a problem! The audit likelihood might be high, leading to a 'medium to severe disruption of the protocol' and the impact could be either medium or high.

> **Quote:** "If the fee is going to be in the token, then the value should reflect that. But in current scenario it's super weird. We're getting the value of the borrowed token in units of WETH, and we're increasing the fee in units of WETH and USDC.

## Q3: Weird ERC20s with USDC

Now, let's move onto the next question. What if USDC blacklists the loan contract? USDC is behind a proxy and could be upgraded anytime, which could potentially 'wreck' the protocol. This could lead to a freeze on the whole protocol. This is crucial to discuss in private or competitive audit.

But remember, the rules in competitive audits _usually_ are: 'if a user is denied service or removed, too bad. However, if a user's denial affects others, that's usually an accepted finding in a competitive audit'.

In case of ERC20s, in competitive audits, these are often not considered valid findings. Sure, you need to keep the clients aware in a private audit, but competitive audits call for more pressing issues. We'll rate this an audit medium, maybe an audit low.

## Q4: Decimals with Token - Can the Price be Wrong?

Now, this is an intriguing aspect. Please note that for this blog, we're going to skip over this question. But here's a challenge to you, the reader, if you think you can answer it better: If a token is characterized by weird and different decimals, can the price be wrong?

Here's a nugget of wisdom: Always be thinking about these types of things. Find out if you can break the protocol by using weird tokens with weird decimals.

## Q5: Is `feePrecision` Misplaced?

This code deep dive also raises the audit question on whether the `feePrecision` value, which is currently a storage variable, could be better served as a constant immutable.

That covers some of our perplexing questions about T-SWAP, and we've unfortunately stumbled upon a few potential bugs! But hey, it's better to discover them now in an audit than later when the damage could be far more considerable.

The key takeaway from this exploration is the importance of meticulous analysis during crypto dApp development. Every piece of code should be audited carefully to ensure it's bug-free and works as intended.

I hope this blog enriched your knowledge about potential pitfalls and the need for audacious questions during protocol designing process.

Remember, in the complex world of crypto, curiosity doesn't kill the cat; complacency does!
