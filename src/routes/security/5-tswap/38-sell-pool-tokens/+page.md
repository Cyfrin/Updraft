---
title: T-Swap Manual Review T-Swap Pool - sellPoolTokens
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/wnIByWj8Jr0?si=AU5Xli9jzWQv61GH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Understanding the Functionality of Selling Pool Tokens in Ethereum

Welcome to another exciting blog post where we'll dive deeper into the intricate functions of DeFi or Decentralized Finance and specifically, Ethereum pool tokens. In one of my recent code explorations, I came across an interesting function – the Sell pool tokens. It had a unique wrapper function apparently designed to help users sell their pool tokens in exchange for WETH (Wrapped Ether). Let's take a closer look at this function and try to unravel what it does.

## Sell Pool Tokens Wrapper Function

The function, at its core, seems quite simple.

Basically, the function accepts an input of the pool token amount from the user. Then it calls another function - `SwapExactOutput()`. The parameters for this function are the amount of pool tokens to sell and the amount of WETH to be received by the caller.

However, don't get too comfortable with the simplicity as the devil is in the details.

## The SwapExactOutput Function

The SwapExactOutput function accepts three parameters:

1. Input: Pool Tokens
2. Output: WETH Tokens
3. Deadline: Date and Time at which transaction is invalid

The "Input" which is the pool token has other variants notably "Pool token PT" and the "Output" typically represents the WETH Token amount in the Block.

The function essentially works by swapping the exact output amounts of the pool tokens to the amount of WETH by the caller.

Despite the simplicity of the process, there could be flaws that exist not due to Solidity (the coding language), but because of business logic issues.

## Spotting the Business Logic Issue

In our case, the SwapExactOutput function seems to have a logic flaw. It appears to be running on backward logic. Instead of an output of WETH tokens, the initial setup of the function gives an output of pool tokens. A quote from my code review captures this error perfectly:

> "So we have pool token is going to be what? Pool token is going to be the input, right? So this is going to be the pool token PT. And then we have the wet token is going to be the...the alpha token is going to be the wet token. So this should be the WETH token amount. Oh, no, this is the pool token amount. At audit, this is wrong, right? And again, this isn't like a solidity issue. This is just like a business logic issue. It's a whoops. You put the wrong thing in here."

This could lead to incorrect results. It would seem like instead of `SwapExactOutput`, the function `SwapExactInput` should have been used. Rather than using `Pool token`, the `Min WETH to receive` should have been used for a more accurate result.

## Final Thoughts and Correction

In the exciting world of DeFi, sometimes it's not just about the Solidity. Business logic also plays a key role in the successful operation of smart contracts and functions. In our case, the logic error led to backward results. Remember, the function's purpose was to initialize trading from pool tokens to WETH tokens. However, due to this business logic flaw, it was providing results of pool tokens instead.

So there you have it, another interesting piece of code examined and explained. Coding, like any language, allows for fascinating narratives to unfold if we know how to read it.

Until next time, happy coding!
