---
title: T-Swap Manual Review T-Swap Pool - Checking the last few functions
---



---

# Understanding Swap: A Deep Dive into Pool Tokens and WETH

In this post, we're going to drill down into a topic that's obscure for many: Pool tokens and WETH in a Swap setting. We've already touched on these aspects a little, but they are so critical to more significant parts of DeFi that they deserve their own dedicated discussion.

## Pool Tokens, Liquidity, and the WETH Equations

In a Swap context, one of the fundamental functions is what we call `getPoolTokensToDepositBasedOffWETH`. You might recall that we've discussed this function before. It operates based on a core DeFi mathematical concept: `X * Y = K`.

As a refresher, `K` is a constant value, while `X` and `Y` represent the pool balances of two cryptocurrencies, say ETH and DAI. The function's purpose is to maintain the constant `K` during a swap, which keeps the market prices stable.

## Peeling Back the Layers of the Liquidity pool

Apart from the `getPoolTokensToDepositBasedOffWETH` function, another intriguing aspect of the system is the `totalLiquidityTokenSupply`. This term is just a more verbose way of expressing the total supply of liquidity tokens in the pool. The function, shown below, can be called to retrieve this information:

## Understanding Swap Prices

An essential pair of functions that we encounter are `getPriceOfOneWETHInPoolTokens()` and `getPriceOfOnePoolTokeninWeth()`.

The first, `getPriceOfOneWETHInPoolTokens()`, calls a separate function `getOutputAmountBasedOffInput()`, which takes one WETH as input and returns the resulting number of pool tokens.

In conclusion, understanding Swap contracts, particularly those involving Pool Tokens and WETH, entails delving into these intricate details. By deploying functions like `getPoolTokensToDepositBasedOffWETH` and `getPriceOfOnePoolTokeninWETH`, users can interact seamlessly with the DeFi ecosystem.

And as we always say:

> "The true art of coding is not in just writing code, but also in understanding other's code.”

So don't hesitate to study every function and each line of code, for they are your stepping stones to mastering DeFi and the entire world of blockchain!
