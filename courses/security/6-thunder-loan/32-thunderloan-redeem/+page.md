---
title: Thunderloan.sol - Redeem
---

# How to Deposit and Redeem Asset Tokens: A Deep Dive into Blockchain Functions

Welcome back to the world of token functions! Today, we're going to dive deep into deposit and redeem functions in a blockchain-based system. Strap in!

## Diving into the 'Deposit' Function

First, let's revisit the `deposit` function. This function allows a user to deposit an underlying token in exchange for an asset token. In essence, the user puts their underlying token into the pool and receives the equivalent amount of asset tokens in return. We may return to it later, but it's critical to understand this function before we dig deeper into the `redeem`.

## Understanding the 'Redeem' Function

![](https://cdn.videotap.com/PFna6Zl1YqUpuTWXUXwx-48.27.png)

Moving on, the `redeem` function plays the opposite role. Where the `deposit` function pulls in an underlying token, the `redeem` function withdraws the underlying token from the asset token. When using this function, we must specify the token from which we want to withdraw, and how much therein we want to withdraw.

#### The Token Ambiguity

At this point, you might be wondering - does "token" refer to the asset token or the underlying token? After a detailed scrutiny, we confirmed that it refers to the actual token to be withdrawn, not the asset token.

![](https://cdn.videotap.com/ez1kq5fAGd1OgsIQfDqE-86.88.png)

Coming back to our code, we need to determine the exact asset token to withdraw (let's call it the 'actual asset token'). We have a revert of zero if the token is not allowed to be withdrawn, thus eliminating any unauthorized tokens.

#### On User Experience and Exchange Rates

This code incorporates an eye for user experience. If the amount equals the maximum, the contract returns the balance of asset tokens for the address (or 'message sender'). This function essentially lets a user say, "I have ten asset tokens for USDC, I want USDC equivalent to these ten tokens." And our function does exactly this.

![](https://cdn.videotap.com/54JcHcJspGCdA0pezifC-125.5.png)

The maths underline the code logic:

```javascript
amount_underlying =
  (amount_of_asset_token * exchange_rate) / asset_token_exchange_rate_precision;
```

This takes into account the precision of the exchange rate - if the user wants `1 E 18` and the exchange rate is `1 E 18`, dividing by `1 E 18` would yield a `1 E 18` back.

The function then emits a `redeemed` event and calls `assetsBurn` to burn the asset tokens from the user's holdings. This mirrors the process of deposit, but in reverse: where deposit multiplied the precision by the exchange rate, this instead multiplies the exchange rate by the precision.

#### Handling Weird ERC 20 Tokens

Looking at it from the outside, everything seems to be falling into place. But what if we're dealing with a non-standard ERC 20 token? Let's consider `USDT`, which has six decimals instead of eighteen (thus being referred to as a 'weirdo'). Would the equation still hold? After some calculations and investigations, we found that it does!

![](https://cdn.videotap.com/jWxqkTW1E5Jz4AjmtCqu-202.73.png)

The redeem function came out looking pretty solid. There was no apparent issue with re-entry and it seemed to follow "Checks-Effects-Interactions" (CEI) principle, where it checks upfront, performs certain effects, and then carries out any required interactions. DEI is a widely-accepted guideline in Ethereum community to avoid common issues such as reentrancy attacks.

With `redeem` function now in tow, we have two important functions - `deposit` and `redeem` - both seemingly bug-free.

![](https://cdn.videotap.com/nNvbG3E0OfsqbxJORxX2-231.69.png)

In conclusion, while blockchain functions like `deposit` and `redeem` can look complicated, breaking them down and understanding what each element does turns these seemingly convoluted calculations into understandable steps. As with anything in blockchain, the devil is in the detail - and it's safe to say we've captured all of them here. Stay tuned for more deep dives into the world of blockchain functions!
