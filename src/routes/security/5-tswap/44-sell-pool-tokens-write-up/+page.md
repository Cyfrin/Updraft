---
title: sellPoolTokens write up
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/YtYnkciULlk?si=_YTLelcfTS3j22tG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Unraveling Smart Contract Bugs: 'Sell Pool Tokens' Woes

In the chaotic and fast-paced world of blockchain programming, errors aren't just inconvenient; they can cost money. A lot of money. One notorious mistake often found in the wild is related to token swapping - that is, exchanging tokens within a liquidity pool. Today, we're diving into one high severity bug associated with a `sellPoolTokens` function.

The nature of this bug means the token swapping feature doesn't operate as expected, causing users to receive an incorrect number of tokens during transactions. Let's delve into this troublesome gaffe further.

## What's Going on with 'Sell Pool Tokens'?

The `sellPoolTokens` function is designed to enable users to efficiently sell pool tokens and receive Wrapped Ether (WETH) in return. Users specify how many pool tokens they're prepared to sell via the `poolTokenAmount` parameter.

However, this function has a miscalculation issue with the swapped amount, directly linked to the incorrect function call. The current `sellPoolTokens` function calls the `swapExactOutput` function, but it should call `swapExactInput` instead. Why is this a problem? Because users specify the precise input tokens volume, not the output.

> "Users will swap the wrong amount of tokens, which is a severe disruption of protocol functionality."

## Breaking Down the Proof of Concept

The proof of concept for this takes form in pseudo code, illustrating the botched token swap during a `sellPoolTokens` call. We'd typically piece together a proof-of-code here to further demonstrate this issue practically.

## Addressing the Bug: Recommendations for Mitigation

To tackle this damaging bug, the proposed mitigation strategy is restructuring the implementation to deploy `swapExactInput` instead of `swapExactOutput`. This, however, demands a modification to the `sellPoolTokens` function to accommodate a new parameter dubbed `minWETHtoReceive`.

But wait, there's more! Area for improvement exists beyond this immediate bug fix. It would be prudent to introduce a deadline to the function as no deadline currently exists. This is a crucial topic for later exploration in the blog series, particularly when we delve into Miner Extractable Value (MEV). For the time being, though, we'll set this to one side.

The `sellPoolTokens` bug is, rather deceptively, a compelling example of how small errors can disrupt the functionality of decentralized protocols dramatically. By presenting the concept and outlining potential solutions, we hope to contribute to more robust, secure, and user-friendly DeFi platforms.

Let's keep debugging!
