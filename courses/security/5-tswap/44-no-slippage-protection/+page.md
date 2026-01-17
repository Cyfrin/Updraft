---
title: Lack of Slippage Protection - Write-up
---

---

### Lack of Slippage Protection - Write-up

The very next vulnerability we're going to write up is found within `swapExactOutput` and is classified as a `lack of slippage protection`.

```js
// @Audit-High - Needs slippage protection - maxInputAmount
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

I suspect this is going to be a `high severity` bug, but let's assess `impact` and `likelihood` once more.

- **Impact:** High -> a swap may be significant worse for a user than expected
- **Likelihood:** -> Medium/High -> MEV (learn later), market conditions change all the time

Slippage protection is a necessary consideration in nearly all token swaps. I want you to take a moment to pause the read into some of the real-world examples identified in audits on [**Solodit**](https://solodit.xyz/).

Let's write up our second `high severity` finding! Compare your write up to mine below - challenge yourself not to peek!

<details>
<summary>[H-2] Lack of slippage protection in TSwapPool::swapExactOutput causes users to potentially receive way fewer tokens</summary>

### [H-2] Lack of slippage protection in TSwapPool::swapExactOutput causes users to potentially receive way fewer tokens

**Description:** The `swapExactOutput` function does not include any sort of slippage protection. This function is similar to what is done in `TSwapPool::swapExactInput`, where the function specifies a `minOutputAmount`, the `swapExactOutput` function should specify a `maxInputAmount`.

**Impact:** If market conditions change before the transaction processes, the user could get a much worse swap.

**Proof of Concept:**

1. The price of 1 WETH right now is 1,000 USDC
2. User inputs a `swapExactOutput` looking for 1 WETH
   1. inputToken = USDC
   2. outputToken = WETH
   3. outputAmount = 1
   4. deadline = whatever
3. The function does not offer a maxInput amount
4. As the transaction is pending in the mempool, the market changes! And the price moves HUGE -> 1 WETH is now 10,000 USDC. 10x more than the user expected
5. The transaction completes, but the user sent the protocol 10,000 USDC instead of the expected 1,000 USDC

**Recommended Mitigation:** We should include a `maxInputAmount` so the user only has to spend up to a specific amount, and can predict how much they will spend on the protocol.

```diff
    function swapExactOutput(
        IERC20 inputToken,
+       uint256 maxInputAmount,
.
.
.
        inputAmount = getInputAmountBasedOnOutput(outputAmount, inputReserves, outputReserves);
+       if(inputAmount > maxInputAmount){
+           revert();
+       }
        _swap(inputToken, inputAmount, outputToken, outputAmount);
```

</details>


### Wrap Up

I'll mention as an aside that there's _some_ argument for the above to be considered a `medium severity` vulnerability, this pertains to user approvals and things of an accountability nature, but for this we'll leave it as a `high`.

Let's tackle the next finding, in the next lesson!
