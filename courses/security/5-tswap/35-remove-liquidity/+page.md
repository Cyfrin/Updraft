---
title: Manual Review - TSwapPool.sol - Remove Liquidity
---

---

### Withdraw Function

In the last lesson, we walked through a review of _adding_ liquidity to a TSwap Pool. Now, we're going to address the logic behind _removing_ liquidity. Let's look at the `withdraw` function.

<details>
<summary>Withdraw Function</summary>

```js
// @notice Removes liquidity from the pool
// @param liquidityTokensToBurn The number of liquidity tokens the user wants to burn
// @param minWethToWithdraw The minimum amount of WETH the user wants to withdraw
// @param minPoolTokensToWithdraw The minimum amount of pool tokens the user wants to withdraw
// @param deadline The deadline for the transaction to be completed by
function withdraw(
    uint256 liquidityTokensToBurn,
    uint256 minWethToWithdraw,
    uint256 minPoolTokensToWithdraw,
    uint64 deadline
)
    external
    revertIfDeadlinePassed(deadline)
    revertIfZero(liquidityTokensToBurn)
    revertIfZero(minWethToWithdraw)
    revertIfZero(minPoolTokensToWithdraw)
{
    // We do the same math as above
    uint256 wethToWithdraw =
        (liquidityTokensToBurn * i_wethToken.balanceOf(address(this))) / totalLiquidityTokenSupply();
    uint256 poolTokensToWithdraw =
        (liquidityTokensToBurn * i_poolToken.balanceOf(address(this))) / totalLiquidityTokenSupply();

    if (wethToWithdraw < minWethToWithdraw) {
        revert TSwapPool__OutputTooLow(wethToWithdraw, minWethToWithdraw);
    }
    if (poolTokensToWithdraw < minPoolTokensToWithdraw) {
        revert TSwapPool__OutputTooLow(poolTokensToWithdraw, minPoolTokensToWithdraw);
    }

    _burn(msg.sender, liquidityTokensToBurn);
    emit LiquidityRemoved(msg.sender, wethToWithdraw, poolTokensToWithdraw);

    i_wethToken.safeTransfer(msg.sender, wethToWithdraw);
    i_poolToken.safeTransfer(msg.sender, poolTokensToWithdraw);
}
```

</details>


So, we know that liquidity providers are provided LP tokens in exchange for the liquidity they add to a pool - at a rate proportional to the percentage of the pool they've contributed.

In order to remove liquidity from the pool then, a liquidity provider must burn some number of LP Tokens they hold.

We can see how the `withdraw` function calculates the amounts of `weth` and `poolToken` to withdraw based on the submitted `liquidityTokensToBurn`.

```js
uint256 wethToWithdraw =
    (liquidityTokensToBurn * i_wethToken.balanceOf(address(this))) / totalLiquidityTokenSupply();
uint256 poolTokensToWithdraw =
    (liquidityTokensToBurn * i_poolToken.balanceOf(address(this))) / totalLiquidityTokenSupply();
```

Immediately following these calculations we compare these values in a couple conditional statements, reverting with a custom error if either value is too low. The `minWethToWithdraw` and `minPoolTokensToWithdraw` variables may seem confusing at first, but they'll make more sense when we discuss MEV situations later in the course.

```js
if (wethToWithdraw < minWethToWithdraw) {
    revert TSwapPool__OutputTooLow(wethToWithdraw, minWethToWithdraw);
}
if (poolTokensToWithdraw < minPoolTokensToWithdraw) {
    revert TSwapPool__OutputTooLow(poolTokensToWithdraw, minPoolTokensToWithdraw);
}
```

Next up, we perform our burn through `_burn`. This may seem like an external call at first glance, but its actually an internal function leveraging the imported and inherited ERC20 contract of `TSwapPool.sol`. Once `_burn` is called, we of course emit a LiquidityRemoved event - checking the parameters here for ordering - they look good!

```js
_burn(msg.sender, liquidityTokensToBurn);
emit LiquidityRemoved(msg.sender, wethToWithdraw, poolTokensToWithdraw);
```

Lastly our withdraw function is performing the necessary transfers, using safeTransfer. Overall withdraw looks good to me!

```js
i_wethToken.safeTransfer(msg.sender, wethToWithdraw);
i_poolToken.safeTransfer(msg.sender, poolTokensToWithdraw);
```

Time to check some of the function handling our token amount math.

### getOutputAmountBasedOnInput

We aren't going to review the specifics of the **_math_** here. If you want to dive into it further to confirm the calculations work out, I encourage you to. This is an important concept in this function that we do need to understand however.

<details>
<summary>getOutputAmountBasedOnInput Function</summary>

```js
function getOutputAmountBasedOnInput(
    uint256 inputAmount,
    uint256 inputReserves,
    uint256 outputReserves
)
    public
    pure
    revertIfZero(inputAmount)
    revertIfZero(outputReserves)
    returns (uint256 outputAmount)
{
    // x * y = k
    // numberOfWeth * numberOfPoolTokens = constant k
    // k must not change during a transaction (invariant)
    // with this math, we want to figure out how many PoolTokens to deposit
    // since weth * poolTokens = k, we can rearrange to get:
    // (currentWeth + wethToDeposit) * (currentPoolTokens + poolTokensToDeposit) = k
    // **************************
    // ****** MATH TIME!!! ******
    // **************************
    // FOIL it (or ChatGPT): https://en.wikipedia.org/wiki/FOIL_method
    // (totalWethOfPool * totalPoolTokensOfPool) + (totalWethOfPool * poolTokensToDeposit) + (wethToDeposit *
    // totalPoolTokensOfPool) + (wethToDeposit * poolTokensToDeposit) = k
    // (totalWethOfPool * totalPoolTokensOfPool) + (wethToDeposit * totalPoolTokensOfPool) = k - (totalWethOfPool *
    // poolTokensToDeposit) - (wethToDeposit * poolTokensToDeposit)
    uint256 inputAmountMinusFee = inputAmount * 997;
    uint256 numerator = inputAmountMinusFee * outputReserves;
    uint256 denominator = (inputReserves * 1000) + inputAmountMinusFee;
    return numerator / denominator;
}
```

</details>


I want to draw your attention to these lines - which of course we would flag for `magic numbers`:

```js
// @Audit-Informational - Use constants instead of literals, avoid magic numbers
uint256 inputAmountMinusFee = inputAmount * 997;
uint256 numerator = inputAmountMinusFee * outputReserves;
uint256 denominator = (inputReserves * 1000) + inputAmountMinusFee;
return numerator / denominator;
```

What's happening here is we are multiplying our inputAmount by 997 in our numerator and then dividing by 1000 in our denominator. The effect is that the calculated output amount is reduced by the protocols required 0.3% fee!

> Remember: Liquidity Providers are incentivized through the implementation of these fees!

Like I said, we won't get deep into the math here, but I do recommend you take a moment to read through the commented derivation if you want to know more.

Otherwise, the math here looks good, lets move to the next function!

### getInputAmountBasedOnOutput

`getInputAmountBasedOnOutput` is effectively the reserve of the function we just assessed.

<details>
<summary>getInputAmountBasedOnOutput Function</summary>

```js
function getInputAmountBasedOnOutput(
    uint256 outputAmount,
    uint256 inputReserves,
    uint256 outputReserves
)
    public
    pure
    revertIfZero(outputAmount)
    revertIfZero(outputReserves)
    returns (uint256 inputAmount)
{
    return ((inputReserves * outputAmount) * 10000) / ((outputReserves - outputAmount) * 997);
}
```

</details>


Alright, there's only one line, a return calculation, but something should stick out to you here. Rather than using 1,000 in the fee calculation, the protocol has used 10,000!

```
997/1000 = 0.997 * 100 = 99.7% tokens transferred -> 0.3% fee

997/10000 = 0.0997 * 100 = 9.97% tokens transferred -> 90.03% fee
```

This bug is causing more than 90%! of tokens transferred to be charged as a fee. This is a massive finding and a great example of why using constants are preferred over literals or "magic numbers".

- Impact - High - Users are charged >90% of tokens transferred in fees
- Likelihood - High - swapExactOutput, which calls this function is a main swapping function

This will definitely be a high severity finding.

```js
// @Audit-High - Erroneous fee calculation resulting in 90.03% fees
return (
  (inputReserves * outputAmount * 10000) /
  ((outputReserves - outputAmount) * 997)
);
```

### Wrap Up

We found a massive bug! The next function in our manual review is going to be `swapExactInput`, a major function in the TSwap protocol - which doesn't have natspec. Good start.

```js
// @Audit-Informational - Where's the natspec?
// @Audit-Informational functions not used internally can be marked external to save gas.
    function swapExactInput(
        IERC20 inputToken,
        uint256 inputAmount,
        IERC20 outputToken,
        uint256 minOutputAmount,
        uint64 deadline
    )
        public
        revertIfZero(inputAmount)
        revertIfDeadlinePassed(deadline)
        returns (uint256 output)
    {...}
```

See you in the next lesson to take a closer look!
