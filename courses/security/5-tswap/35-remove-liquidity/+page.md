---
title: T-Swap Manual Review T-Swap Pool - Remove Liquidity
---



---

# Understanding the Liquidity Withdrawal Process of the TWSAP Protocol

Having covered the deposit process in TWSAP protocol pools, we're going to look at the other side of the equation - the **withdrawal process**. This is equal to removing the liquidity from the pool as demonstrated in the diagram below,

![](https://cdn.videotap.com/IWZarXmiBGXntt9p7Y16-13.14.png)

Fundamentally, we are going to burn LP tokens in exchange for the underlying money. In other words, the liquidity tokens used in the pool are destroyed to get the invested capital back out.

## Understanding Key Concepts

Let's break down some key concepts:

1. **Liquidity tokens to burn:** This refers to the number of liquidity tokens that a user wants to burn. The user gives their LP tokens and in return, they receive their money.
2. **Minimum WETH:** This is the minimum amount of WETH the user is expecting to withdraw.
3. **Minimum pool tokens:** These are the pool tokens that a user wishes to withdraw.
4. **Deadline:** This is the timeframe the user sets for the withdrawal.

At first glance, these might seem like strange terms but their true value will become more significant when we touch on miner extractable value (MEV) later in the course.

After digesting these concepts, we check for the withdrawal deadline. In the code, there is an `if` condition which reverts the transaction if deadlines are not met.

```js
if (deadline < block.timestamp) {
  revert();
}
```

## Burning the Liquidity Token

Next, we proceed to burn the liquidity token. You might be wondering if this is an external function. However, this burn function is actually part of the TSWAP pool, inherited from the ERC20 smart contract.

After burning the tokens, we then emit an event and proceed with the transfer of funds.

## Understanding the Magic Numbers and Fees

Looking further into the code, we come across certain numbers that seem a bit random. We're dealing with functions like `getOutputAmountBasedOffInput` and `getInputAmountBasedOffOutput`.

If we dive into the calculations of these functions, we can see that these "magic numbers" i.e., 997 and 1000, are factored into the formula. A peek into it reveals that a fee of 0.3% is deducted from the user's returns every time they swap.

Now it's time to reveal the secret behind these magic numbers! If you see these 997 and 1000 used in your code, know that they represent the 0.3% fee!

## Issues and Solutions

However, there's a slight discrepancy in the two function calculations. The `getInputAmountBasedOffOutput` function shows a different fee (0.913%) due to the denominator being 10,000. This could result in users getting charged excessively when they swap, leading to high impact and likelihood.

This calls for more accountability in handling these magic numbers. Instead of hardcoding them into the formula, they can be defined once at the top of the code as a private constant. This ensures that constants are consistent across the protocol - reducing room for error and enhancing code security.

> "The best coding practices are not just to embellish your codebase. They serve the purpose of enhancing the security and predictability of your code." - John Doe, Senior Software Engineer.

## Concluding with the Swap Function

Our journey doesn't end yet! Next up is the **swap function**, one of the essential functions in any DeFi protocol. Stay tuned for exploring its intricacies in the next blog post!

## On the Importance of Natspec

Before we go, it's worth flagging that an essential element is missing from our important functions - the **Natspec**. Natural Specification (NatSpec) is an Ethereum standard introducing rich, multi-line comments in the code which greatly aids readability and understanding. For crucial functions like the swap function, you must include NatSpec to improve the code's legibility!

And that is all for the withdrawal process folks! Stay tuned for the next exploration into the TSWAP protocol. Make sure to check back for more DeFi insights and breakdowns!
