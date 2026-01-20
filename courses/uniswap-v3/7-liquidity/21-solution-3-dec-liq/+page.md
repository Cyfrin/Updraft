### Exercise 3 Solution: Decreasing Liquidity

In this exercise, we'll be decreasing liquidity. As a setup, we are given a position where the `tokenID` is initialized as a variable. One requirement for this exercise is that the amount of liquidity to decrease cannot exceed the position's liquidity. This position's liquidity is stored inside a struct called `position`.

To decrease liquidity, we will call the `decreaseLiquidity` function on the `NonfungiblePositionManager`.
```javascript
manager.decreaseLiquidity
```
Then, we will pass in a parameter. The parameter is defined inside the `INonfungiblePositionManager` interface, and the struct that we will fill out is `DecreaseLiquidityParams`.
```javascript
struct DecreaseLiquidityParams {
  uint256 tokenID;
  uint128 liquidity;
  uint256 amount0Min;
  uint256 amount1Min;
  uint256 deadline;
}
```
We'll copy this struct and paste it into the function call. The struct we will be using is:
```javascript
INonfungiblePositionManager.DecreaseLiquidityParams
```
For the `tokenID`, we will pass in `tokenID`. The position's `liquidity` is stored inside the `position` struct. We will need to fetch this data using the `getPosition` function call. It obtains the data by calling `positions` on the `NonfungiblePositionManager` and stores it into the `position` struct. The `liquidity` of the position is one of the stored data points.

So we will call on the variable `p0.liquidity`. The `amount0Min` is the minimum amount of token 0 that must be decreased, and we will set it to 0 for simplicity. We will do the same for `amount1Min` and set it to 0. Lastly, the `deadline` will be set to `block.timestamp`.
```javascript
manager.decreaseLiquidity(
    INonfungiblePositionManager.DecreaseLiquidityParams(
        tokenID,
        p0.liquidity,
        0,
        0,
        block.timestamp
    )
);
```
This completes Exercise 3. The name of the test is `test_decreaseLiquidity`. Let's execute the test:

```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v3/exercises/UniswapV3Liquidity.test.sol --match-test test_decreaseLiquidity -vvv
```

The test passed.

When we decreased the liquidity, we withdrew 999.99... amount of Dai and approximately 2.58 ETH.
