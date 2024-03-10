---
title: Thunderloan.sol (Continued)
---

# Understanding Asset Tokens and Exchange Rates in Thunder Loan

Hello coders! In this blog post, we're delving into the world of contracts and tokens. If you're here, you know that asset tokens represent the shares of the pool. But honestly, how many times have we gone over that?

Still, it's crucial to understand that the asset token represents just how much of the contract the whale or depositor actually owns.

## Getting the Asset Token

![](https://cdn.videotap.com/2I1K8YkcCB7hMk6vhMGv-37.2.png)
To get the asset token, you simply use `AssetToken get exchange rate`. Here we're getting the exchange rate between USDC (the USD Coin) and the flash loan tokens. The key question here is: what ratio exists between these flash loan tokens and the underlying tokens?

## Minting the Amount

Your mint amount is calculated from the amount deposited, maybe around 100 USDC, times the exchange rate precision times the asset rate. The exchange rate precision usually defaults to `1E 18`.

For all you math enthusiasts, here's the calculation flow:

```bash
Exchange rate precision = 1E 18100 (deposit amount) x 1E 18 (exchange rate precision) / Exchange rate = Mint amount
```

If the exchange rate is 2, then you would have half the flash loan tokens in exchange for the 100 USDC, which stands to reason logically.

> An important point to note here is that we cannot divide by zero in this context. The exchange rate cannot be zero and should preferably always be increasing, never decreasing. If you start at one, it should never decrease to zero due to the way asset tokens are conditioned.

## Emitting the Event

The role of the event emitter comes into play high up in this process when we call `AssetToken mint`. This is only callable by the Flash Loan investors and passes fine, giving the depositor the mint amount.

Interestingly, when a liquidity provider deposits, the money sits in the asset token contract, not in Thunder Loan. Hence, the money goes directly to the asset token contract.

## Calculating the Fee and Updating Exchange Rate

In our final stage of the process, the calculated fee is determined using `getCalculatedFee`; this updates the exchange rate and the asset token amount is transferred from message sender to the address of the asset token.

Here's where it could get a little confusing. Why are we calculating the fee of the flash loans at the deposit? And why are we updating the exchange rate?

Let's examine the first issue; our flash loan calculation process goes like this:

```bash
Value of borrowed token = Amount x getPrice / Fee precisionFee = Value of borrowed token x Flash loan fee / Fee precision
```

However, it's perplexing as to why the fee of the flash loans would be calculated at this juncture in the depositing process.

Secondly, the matter of updating the exchange rate also raises questions. If tokens are deposited, the exchange rate varies. If more is deposited, then what would the exchange rate be? This part seems a little disorienting, definitely warrants a follow-up audit as there may be something off here.

Once these two issues are addressed, the process should work correctly. The user gets minted some asset tokens and the tokens are then transferred to the underlying.

There are a few perplexing areas as noted which we look forward to addressing in future posts. Happy coding!
