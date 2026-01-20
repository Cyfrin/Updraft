---
title: Manual Review - TSwapPool.sol - Final Functions
---

---

### TSwapPool Final Functions

The outstanding functions to check in TSwapPool are getters it seems, let's give them a review.

### totalLiquidityTokenSupply

```js
/// @notice a more verbose way of getting the total supply of liquidity tokens
// @ Audit-Informational - should be marked external
function totalLiquidityTokenSupply() public view returns (uint256) {
    return totalSupply();
}
```

Looks _mostly_ good, but we should note that getters like these can be marked `external` to save gas.

### getPoolToken, getWeth, getMinimumWethDepositAmount

```js
function getPoolToken() external view returns (address) {
    return address(i_poolToken);
}
function getWeth() external view returns (address) {
    return address(i_wethToken);
}

function getMinimumWethDepositAmount() external pure returns (uint256) {
    return MINIMUM_WETH_LIQUIDITY;
}
```

These three functions all look great, with proper visibilities set.

Now, our final two functions:

```js
function getPriceOfOneWethInPoolTokens() external view returns (uint256) {
    return getOutputAmountBasedOnInput(
        1e18, i_wethToken.balanceOf(address(this)), i_poolToken.balanceOf(address(this))
    );
}

function getPriceOfOnePoolTokenInWeth() external view returns (uint256) {
    return getOutputAmountBasedOnInput(
        1e18, i_poolToken.balanceOf(address(this)), i_wethToken.balanceOf(address(this))
    );
}
```

These are returning the price of 1 weth in PoolTokens and 1 PoolToken in weth respectively. At face value, I'll tell you that these functions look fine. Their math checks out, simple enough. Though in a later section - Thunder Load - you'll learn that functions like these can be deceiving 😉

Having concluded our manual review, we can jump into the reporting phase in the next lesson - let's go!
