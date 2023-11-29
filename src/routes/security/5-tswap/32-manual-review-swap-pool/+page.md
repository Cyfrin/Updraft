---
title: T-Swap Manual Review T-Swap Pool
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/vHmtJrRpNYA?si=jvg8h9wCvkSQap_T" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Dissecting Uniswap v1 and TSWAP - An In-Depth Security Review

Welcome to this thrilling exploration of the TSWAP pool which gets us to the heart of Uniswap v1. By the end of this piece, you will have an in-depth understanding of Uniswap in its most rudimentary form. Let's delve right into the Uniswap TSWAP pool code and grasp what makes it tick.

## TSWAP in High-Level Review

Contrary to what one might expect, the TSWAP pool codebase is impressively user-friendly. Not only is it detailed and transparent, but it is also an ERC20 token, which rings a bell for most blockchain enthusiasts. Being a liquidity token, this characteristic intuitively aligns with its purpose.

## The Safe ERC20 Library

An additional feature that gives the TSWAP an edge is the usage of the Safe ERC20 library. The primary function of this library is to safely transfer from accounts.

The Safe ERC20 library comes in handy as a shield against some of the abnormal (and occasionally detrimental) ERC20 occurrences that we might encounter in the later stages of this article.

## Immutable State Variables in TSWAP

TSWAP comes packed with some immutable state variables, such as `Iweth token` and `pool token`, which make perfect sense considering the nature of smart contracts.

Every contract is bound to have at least two tokens, and these variables stand as unwavering constants for these tokens.

## The WETH Liquidity Feature

Another intriguing aspect of TSWAP is the WETH liquidity feature, a concept we gleaned from the invariant test suite. If you want to deposit WETH, you have to deposit at least a specific amount known as the WETH liquidity.

Of course, the question that follows is whether this hard-coded determinant is too high, or whether there's a chance something unusual could be going on here.

> "With coding, it's crucial not to take anything at face value."

## Swap Count and Swap Count Max

Next up on our review is the rather peculiar `swap count` and `swap count max`. Their existence can be attributed to an issue we discovered during our stateful fuzzing test suite. From the anomaly, we observed a quirky operation where the protocol gives out extra money after every ten swaps. This random and seemingly unnecessary function seems to break the protocol's expected behavior.

## About Events and Modifiers

TSWAP presents several events that we already have some audit notes about. It also includes modifiers such as `revert if deadline passes` and `revert if zero`. After analyzing these in detail, it is clear that these functions are named aptly.

The `revert if deadline passes` function reverts if the deadline is less than the current timestamp, which makes perfect sense.

Similarly, `revert if zero` checks if the account balance is Zero. If it is, the function reverts.

## The Role of the Constructor

Lastly, it's worth revisiting the constructor where it may be valuable to add some audit information.

There's a check for a zero address, but this isn't a pressing issue. For naming conventions, the token names in the constructor seem pretty straightforward.

This blog post is a deep dive into the codebase of TSWAP. Understanding the dynamics of this liquidity token can inform the design and understanding of other pools within the DeFi ecosystem.
