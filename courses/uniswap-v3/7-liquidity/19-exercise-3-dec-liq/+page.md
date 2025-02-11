### Exercise 3: Decreasing Liquidity for a Position

In this lesson, we will learn how to decrease liquidity for a position. The position is created using a helper function called `mint`, which assigns a token ID. The objective is to decrease the liquidity, and the method to do so is at our discretion.

We can get the current amount of liquidity for the position using the `getPosition` function, which stores it in a struct named `position`. This liquidity amount represents the maximum amount we can decrease. We can decrease any amount up to and including the current amount of liquidity. To decrease liquidity, we must call the `decreaseLiquidity` function on the `NonfungiblePositionManager`.

If we need a refresher on the `decreaseLiquidity` function, we can find it in the `INonfungiblePositionManager` interface. The function signature and struct definitions are:

```javascript
function decreaseLiquidity(DecreaseLiquidityParams calldata params) external payable returns (uint256 amount0, uint256 amount1);
```

```javascript
struct DecreaseLiquidityParams {
    uint256 tokenId;
    uint128 liquidity;
    uint256 amount0Min;
    uint256 amount1Min;
    uint256 deadline;
}
```

The struct `DecreaseLiquidityParams` shows the parameters that we need to pass to the `decreaseLiquidity` function.
