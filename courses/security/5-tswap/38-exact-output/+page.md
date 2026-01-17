---
title: Manual Review - TSwapPool.sol - swapExactOutput
---

---

### Exploit - Slippage Protection

`swapExactOutput` we expect to be the inverse of `swapExactInput`. Here's a reminder of the function:

<details>
<summary>swapExactOutput Function </summary>

```js
function swapExactOutput(
    IERC20 inputToken,
    IERC20 outputToken,
    uint256 outputAmount,
    uint64 deadline
)
    public
    revertIfZero(outputAmount)
    revertIfDeadlinePassed(deadline)
    returns (uint256 inputAmount)
{
    uint256 inputReserves = inputToken.balanceOf(address(this));
    uint256 outputReserves = outputToken.balanceOf(address(this));

    inputAmount = getInputAmountBasedOnOutput(outputAmount, inputReserves, outputReserves);

    _swap(inputToken, inputAmount, outputToken, outputAmount);
}
```

</details>


One thing that may stand out to us right away is that there doesn't seem to be any check on maximum input (and there's one fewer parameter as well), similar to how our `swapExactInput` function has the `minOutputAmount`, this difference definitely has our senses tingling.

From there the function looks very similar to `swapExactInput` with one glaring omission. This omission is actually related to our missing parameter. We have nothing checking that our `inputAmount` is less than a `maxInputAmount`.

Consider this scenario:

1. You place a transaction to trade X DAI for 10 WETH
2. A transaction occurs before yours is confirmed dramatically changing the price of WETH for DAI
3. You spend way more than you expected to for your 10 WETH

This is absolutely a vulnerability and we should note it down.

```js
// @Audit-High - Needs slippage protection - maxInputAmount
```

This is also a vector for an MEV attack, but we'll come back to those later.

---

Great! We found another bug! Nice work, let's keep the momentum.
