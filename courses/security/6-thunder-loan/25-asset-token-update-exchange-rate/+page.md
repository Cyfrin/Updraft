---
title: AssetToken.sol - updateExchangeRate
---

## The Function: Update Exchange Rate

Let's dive into a seemingly vital function called `updateExchangeRate()`. The comments clarify that it obtains the current exchange rate (#1) and computes it by dividing the fee size by the total supply. An intriguing remark states that the exchange rate should consistently increase—never decrease—an invariant principle at work. **But why should this exchange rate always escalate and never decline?**

**CODE BLOCK HERE**

As we delve deeper, we set:`newExchangeRate = oldExchangeRate * (totalSupply + fee) / totalSupply`.

![](https://cdn.videotap.com/gi422wVmQ3SFrgJrvlSw-84.97.png)

As we break down how this formula functions:

- If the old exchange rate is 1,
- The total supply of asset tokens is 4,
- Fee is 0.5,

Computing ((4 + 0.5)/ 4), we result with a new exchange rate of 1.125. From this, it seems that `updateExchangeRate()` is likely responsible for updating the asset tokens' exchange rate to their underlying assets.

To illustrate, imagine this hypothetical scenario where a whale deposits or withdraws shares. The amount that gets deposited or withdrawn hinges upon the exchange rate, which can change, presumably having something to do with the fee. In a scenario where the exchange rate is two to one, if a user were to deposit $1,000, they would receive 2000 asset tokens in return.

**But why are we updating the exchange rate?**

Let's revisit the above formula: What happens if the total supply is zero?As per the formula, `S exchange rate starts at 1 * 0 + let's say the fee is zero divided by zero`, the computation breaks. Would this pose an issue? Could there be a way that this could break and make the total supply zero? Questions to consider.

![](https://cdn.videotap.com/SLGckrl4g0AjIi7bUdwS-230.62.png)

We check for a condition `if newExchangeRate <= oldExchangeRate`, then instruct it to revert, with a message saying, "Exchange rate can only increase." The condition itself is a clear implementation of the invariant principle stated earlier. On the other hand, if the new exchange rate is higher, it sets `sExchangeRate = newExchangeRate` before emitting an event.

At a first glance, this function seems correct and ready to run. It updates the exchange rate, a crucial variable in the relationship between the shares and the underlying assets. The rate update mainly seems to be triggered by fees.

## Some Possible Improvements

An important aspect that one could focus on is the multiple storage reads in the `updateExchangeRate( )` function— `s_ exchangeRate`, `s_totalSupply`, and `s_fee`. Given that storage reads are gas expensive, you could possibly optimize this by storing them as a memory variable—an aspect to consider during an audit for gas usage.

Note: Sometimes, it is the experience that helps spot these potential storage issues. For instance, if you see multiple s\_ syntax terms, that might be a hint about multiple storage operations.

![](https://cdn.videotap.com/tGc23bAltPLCCdT51Y39-303.45.png)

Despite not discovering any immediate problem with the contract, analyzing this function helped us understand the contract better. We now know how the exchange rate behaves, and it's clear that the fee plays a significant role in its computation.

In the next phase, we plan on investigating two more functions—ThunderLoan and ThunderLoanUpgraded. We'll tackle ThunderLoan first, understand its functionalities thoroughly, then move onto ThunderLoanUpgraded to identify the upgrades.

Stay tuned in for our exciting journey as we delve deeper to explore these functions. Keep coding!
