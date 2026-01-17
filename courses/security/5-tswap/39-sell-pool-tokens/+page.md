---
title: Manual Review - TSwapPool.sol - sellPoolTokens
---

---

Alright, our next function seems a little simpler than the last few, let's take a look.

<details>
<summary>sellTokenPools Function</summary>

```js
/**
 * @notice wrapper function to facilitate users selling pool tokens in exchange of WETH
 * @param poolTokenAmount amount of pool tokens to sell
 * @return wethAmount amount of WETH received by caller
 */
function sellPoolTokens(uint256 poolTokenAmount) external returns (uint256 wethAmount) {
    return swapExactOutput(i_poolToken, i_wethToken, poolTokenAmount, uint64(block.timestamp));
}
```

</details>


This function just serves as a simplified wrapper for users to call `swapExactOutput` through. With any function call passing parameters, we should verify that what's being passed is correct as well as it's order. These are easy things for developers to overlook.

Refer back to `swapExactOutput`:

```js
function swapExactOutput(
    IERC20 inputToken,
    IERC20 outputToken,
    uint256 outputAmount,
    uint64 deadline
)
```

So in our function call:

- inputToken = i_poolToken
- outputToken = i_wethToken
- outputAmount = poolTokenAmount

Wait. Do you spot the issue? If our inputToken is poolToken, our outputAmount can't _also_ be derived from poolToken! This should be wethTokenAmount! Massive find.

```js
function sellPoolTokens(uint256 poolTokenAmount) external returns (uint256 wethAmount) {
    // @Audit - Incorrect parameter being passed for swapExactOutput function - poolTokenAmount!
    return swapExactOutput(i_poolToken, i_wethToken, poolTokenAmount, uint64(block.timestamp));
}
```

This is a perfect exactly of a bug that's a product of `business logic`. It's not a problem with the Solidity, simply the wrong variable was used. This is the type of thing that can be difficult for tooling to catch.

Let's wrap up the rest of our functions in the next lesson.
