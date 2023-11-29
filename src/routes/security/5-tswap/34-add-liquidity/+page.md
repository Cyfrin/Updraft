---
title: T-Swap Manual Review T-Swap Pool - Add Liquidity
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/ql_0nR3Za8E?si=pdvrjnsUQWHqUwC8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Deep Dive into Cryptocurrency Smart Contract Deposits

In today's post, we're going to perform a deep-dive into the world of cryptocurrency smart contracts, specifically focusing on the deposit function. We'll be performing a detailed audit of a contract and identifying potential flaws.

We'll start off with the deposit function and eventually move our way down to analyze all aspects of the contract line-by-line. So, let's dive in!

## Analysing the Deposit Function

Let's take the state of the contract where we're trying to determine how much should be deposited.

If `WETH` is zero in the contract, we encounter a scenario where it reverts. We also have a condition where if the `WETH` deposit is less than a minimum defined _WETH liquidity deposit_; again a revert scenario.

Another thing to note is that we probably don't need the emission of the minimum `WETH` because it is, in a sense, redundant. It would be more effective as _audit info_. To put it simply, any user could look up the contract and see what the minimum `WETH` value is.

Next, there are two potential scenarios that initiate heating up the deposit function. These are:

1. If it's a user's first deposit (also called the initial funding of the protocol)
2. If the user has already deposited

## Exploring Internal Functions

Within the deposit function, it looks like it's calling an internal function, so let's go and check what that does.

Here, we interpret `weth_to_deposit` as the amount of `WETH` a user is going to deposit, `pool_tokens_to_deposit` as the number of pool tokens they're going to deposit, and `liquidity_tokens_to_mint` as the number of liquidity tokens they're planning to mint.

Given it's a sensitive function, it's marked private, meaning it can only be invoked within the contract. Inside this function, it seems like we mint the amount of `liquidity_tokens_to_mint` to the `msg.sender`.

There's also an event trigger called `Liquidity Added`. However, a closer look reveals an audit issue as the parameters are in the wrong order.

```js
emit LiquidityAdded(msg.sender, pool_tokens, WETH)
```

The correct code should look like this:

```js
emit LiquidityAdded(msg.sender, WETH, pool_tokens)
```

> Always make sure to check if the events are correctly emitted with the right parameters. This kind of mistake is not a high risk but it's important to avoid confusion.

## Checks and Interactions

After validating the event, we conduct some checks and interactions. It's good to see the external transactions happening towards the end of the function, which adheres to the Checks-Effects-Interactions (CEI) pattern.

The next steps include transferring the tokens from the `msg.sender` to the smart contract, and then updating the state variable `LiquidityTokensMinted`.

```code
transferFrom(msg.sender, address(this), ...);...liquidityTokensMinted = weth_to_deposit;
```

Ideally, we would want to follow the Checks-Effects-Interactions paradigm regularly to streamline the function operations.

## Updating Liquidity and Deposit Checks

Once the contract is warmed up and receiving liquidity, it's time to perform some checks and balances.

First, we crunch the numbers on how many pool tokens should be deposited based on the `WETH` balance. If we calculate too many pool tokens to deposit, the function reverts.

Next, similar checks are performed for liquidity. If the calculated `LiquidityTokensToMint` is less than the minimum, the function again reverts.

And voila! If everything goes well, the deposit function works smoothly.

## Concluding Thoughts

While auditing a smart contract, thoroughness is essential. The deposit function in our example had a high-severity issue where the deadline was being ignored, but function-wise, it looked solid.

Remember, the aim is always to leave notes with our thoughts anywhere possible and follow up at a later stage if doubt persists.

Join me in the next blog post as we examine the `addLiquidityMintAndTransfer` function!
