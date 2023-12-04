---
title: T-Swap Manual Review T-Swap Pool - Swap Exact Input
---



---

# Unraveling Swap Exact Input and Output in Ethereum Smart Contracts

The language of Ethereum smart contracts, Solidity, can be complex and daunting, especially when dealing with functions like "Swap Exact Input" and "Swap Exact Output". Let's walk through how these functions work, what they're designed to do, and some critical points to look out for.

**Understanding "Swap Exact Output"**

The "Swap Exact Output" function provides a useful, straightforward way of determining how much input is required for a specific output. In essence, this function works out how much you would need to exchange to receive your desired amount of tokens.

In practical terms, let's assume you're swapping or selling DAI to buy WETH, or wrapped Ether. Here, the '"Swap Exact Output" function calculates how much DAI you'd need to input to get the exact amount of WETH you want.

**What about "Swap Exact Input"?**

Along the same lines, you could infer that "Swap Exact Input" does just the opposite; it determines how much output you'd receive for a definite input. Essentially, this is the function you'd apply if you have a particular amount of tokens you'd like to swap with an expectation of the amount of tokens you will receive.

But what happens if your output is less than the one WETH you expect? The function logs an error message, typically something along the lines of "TSWAP pool output too low", and reverts the transaction.

**The Role of "Deadline"**

A crucial part of swapping tokens is setting a deadline for when the transaction should expire. This timestamp, defined in the function, reverts to zero if the deadline fails.

![](https://cdn.videotap.com/CP5x1AoZaOQRK8ROhjOo-190.47.png)

**Auditing Swap Function**

A key function to scrutinize during smart contract auditing is the swap function. In theory, this function should maintain the protocol invariant (x\*y = k), but in some contracts, you might spot a discrepancy that defies this key principle. Any "extra" tokens appearing can violate this rule, consequently causing potential vulnerabilities.

> "After every 10 swaps, we give the caller an extra token for an extra incentive to keep trading on TSWAP."

This statement flags a potential breach. A good practice in smart contracts is to incorporate invariant checks in functions, basically a `require` statement that validates the invariant hasn't been violated.

To sum up, "Swap Exact Input" and "Swap Exact Output" play a vital role in token swaps. By understanding how these functions work, smart contract developers and auditors can uncover potential pitfalls and ensure efficient, secure trading experiences.
