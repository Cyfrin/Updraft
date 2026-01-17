---
title: sellPoolTokens Write-up
---

---

### sellPoolTokens Write-up

Ok, it looks like we're going to be on a streak of `high severity` findings, because the next was a vulnerability we identified within `sellPoolTokens`.

```js
function sellPoolTokens(uint256 poolTokenAmount) external returns (uint256 wethAmount) {
    // @Audit - Incorrect parameter being passed for swapExactOutput function - poolTokenAmount!
    return swapExactOutput(i_poolToken, i_wethToken, poolTokenAmount, uint64(block.timestamp));
}
```

The parameters of `swapExactOutput` for reference:

```js
function swapExactOutput(
    IERC20 inputToken,
    IERC20 outputToken,
    uint256 outputAmount,
    uint64 deadline
)
```

The third argument being passed to `swapExactOutput` in our `sellPoolTokens` function should be an `outputAmount`, not at amount correlated to our `inputToken`.

Compare your finding write-up to mine below! Again, I'm leaving the PoC in your hands. Reach out to the community through [**GitHub**](https://github.com/Cyfrin/security-and-auditing-full-course-s23/discussions) and [**Discord**](https://discord.gg/cyfrin) if you're struggling!

<details>
<summary>[H-3] `TSwapPool::sellPoolTokens` mismatches input and output tokens causing users to receive the incorrect amount of tokens</summary>

### [H-4] `TSwapPool::sellPoolTokens` mismatches input and output tokens causing users to receive the incorrect amount of tokens

**Description:** The `sellPoolTokens` function is intended to allow users to easily sell pool tokens and receive WETH in exchange. Users indicate how many pool tokens they're willing to sell in the `poolTokenAmount` parameter. However, the function currently miscalculates the swapped amount.

This is due to the fact that the `swapExactOutput` function is called, whereas the `swapExactInput` function is the one that should be called. Because users specify the exact amount of input tokens, not output.

**Impact:** Users will swap the wrong amount of tokens, which is a severe disruption of protocol functionality.

**Proof of Concept:**
<write PoC here>

**Recommended Mitigation:**

Consider changing the implementation to use `swapExactInput` instead of `swapExactOutput`. Note that this would also require changing the `sellPoolTokens` function to accept a new parameter (ie `minWethToReceive` to be passed to `swapExactInput`)

```diff
    function sellPoolTokens(
        uint256 poolTokenAmount,
+       uint256 minWethToReceive,
        ) external returns (uint256 wethAmount) {
-        return swapExactOutput(i_poolToken, i_wethToken, poolTokenAmount, uint64(block.timestamp));
+        return swapExactInput(i_poolToken, poolTokenAmount, i_wethToken, minWethToReceive, uint64(block.timestamp));
    }
```

Additionally, it might be wise to add a deadline to the function, as there is currently no deadline. (MEV later)

</details>


### Wrap Up

The next finding we'll write up is exciting. It's the vulnerability we uncovered through writing our stateful fuzz test suite! Let's get to it, see you there!
