---
title: Reporting Continued
---

---

### Reporting Continued

> **Note:** You may have additional `informational severity` issues that we identified in your project. The write ups for these should be fairly easy with all the experience we have, as such we won't explicitly cover them further in this course, but I encourage you to write them anyway for practice.

In this lesson, we'll continue to create write-ups for the vulnerabilities we've identified in TSwap. The next bug noted is `low severity` and found in the `_addLiquidityMintAndTransfer` function.

```js
function _addLiquidityMintAndTransfer(
   uint256 wethToDeposit,
   uint256 poolTokensToDeposit,
   uint256 liquidityTokensToMint
)
   private
{
   _mint(msg.sender, liquidityTokensToMint);
   //@Audit-Low - Ordering of event emissions incorrect, should be `emit LiquidityAdded(msg.sender, wethToDeposit, poolTokensToDeposit)`
   emit LiquidityAdded(msg.sender, poolTokensToDeposit, wethToDeposit);

   // Interactions
   i_wethToken.safeTransferFrom(msg.sender, address(this), wethToDeposit);
   i_poolToken.safeTransferFrom(msg.sender, address(this), poolTokensToDeposit);
}
```

Let's write this up!

My example of each section of the write-up template is below, but I encourage you to write your own first and then compare!

<details>
<summary>[L-1] `TSwapPool::LiquidityAdded` event has parameters out of order</summary>

### [L-1] `TSwapPool::LiquidityAdded` event has parameters out of order

**Description:** What the `LiquidityAdded` event is emitted in the `TSwapPool::_addLiquidityMintAndTransfer` function, it logs values in an incorrect order. The `poolTokensToDeposit` value should go in the third parameter position, whereas the `wethToDeposit` value should go second.

**Impact:** Event emission is incorrect, leading to off-chain functions potentially malfunctioning.
When it comes to auditing smart contracts, there are a lot of nitty-gritty details that one needs to pay attention to in order to prevent possible vulnerabilities.

**Recommended Mitigation:**

```diff
- emit LiquidityAdded(msg.sender, poolTokensToDeposit, wethToDeposit);
+ emit LiquidityAdded(msg.sender, wethToDeposit, poolTokensToDeposit);
```

</details>


> **Note:** We omitted a PoC in our write up above. This vulnerability is pretty self-evident, but if you wanted to write one as a challenge, I encourage you to try!

Next up, our first `high severity`! This one we found in `getInputAmountBasedOnOutput` (the video marks this as `H-2`, but we've since reassessed the missing deadline vulnerability).

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
   // @Audit-High - Erroneous fee calculation resulting in 90.03% fees
   return ((inputReserves * outputAmount) * 10000) / ((outputReserves - outputAmount) * 997);
}
```

We identified a magic number resulting in an inaccurate fee calculation! This one is big. Again, I challenge you to write your own `Proof of Concept`, keep those skills sharp.

<details>
<summary>[H-1] Incorrect fee calculation in `TSwapPool::getInputAmountBasedOnOutput` causes protocol to take too many tokens from users, resulting in lost fees</summary>

### [H-1] Incorrect fee calculation in `TSwapPool::getInputAmountBasedOnOutput` causes protocol to take too many tokens from users, resulting in lost fees

**Description:** The `getInputAmountBasedOnOutput` function is intended to calculate the amount of tokens a user should deposit given an amount of tokens of output tokens. However, the function currently miscalculates the resulting amount. When calculating the fee, it scales the amount by `10_000` instead of `1_000`.

**Impact:** Protocol takes more fees than expected from users.

**Recommended Mitigation:**

```diff
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
-       return ((inputReserves * outputAmount) * 10_000) / ((outputReserves - outputAmount) * 997);
+       return ((inputReserves * outputAmount) * 1_000) / ((outputReserves - outputAmount) * 997);
    }
```

</details>


Attempting to write the `PoC` for the above is really important. Writing lots of `PoCs` is how you'll get better at them and `PoCs` are how you _prove_ there's an issue, often they help you _test_ if there's an issue.

Continuing on, we'll next do a quick write up for a `low severity` vulnerability our compiler identified in `swapExactInput`.

```js
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
   //@Audit-Low - Return value not updated/used
   returns (uint256 output)
{...}
```

This will be our second low, compare your write up to mine below:

<details>
<summary>[L-2] Default value returned by `TSwapPool::swapExactInput` results in incorrect return value given</summary>

### [L-2] Default value returned by `TSwapPool::swapExactInput` results in incorrect return value given

**Description:** The `swapExactInput` function is expected to return the actual amount of tokens bought by the caller. However, while it declares the named return value `output` it is never assigned a value, nor uses an explicit return statement.

**Impact:** The return value will always be `0`, giving incorrect information to the caller.

**Recommended Mitigation:**

```diff
{
   uint256 inputReserves = inputToken.balanceOf(address(this));
   uint256 outputReserves = outputToken.balanceOf(address(this));

-        uint256 outputAmount = getOutputAmountBasedOnInput(inputAmount, inputReserves, outputReserves);
+        output = getOutputAmountBasedOnInput(inputAmount, inputReserves, outputReserves);

-        if (output < minOutputAmount) {
-            revert TSwapPool__OutputTooLow(outputAmount, minOutputAmount);
+        if (output < minOutputAmount) {
+            revert TSwapPool__OutputTooLow(outputAmount, minOutputAmount);
   }

-        _swap(inputToken, inputAmount, outputToken, outputAmount);
+        _swap(inputToken, inputAmount, outputToken, output);
}
}
```

</details>


### Wrap Up

Great work! We've only got a few more write-ups to add to our findings.md before generating our professional PDF audit report.

Up next is our `slippage protection` vulnerability!
