### Exercise 1: TWAP using a Uniswap V3 Pool

In this lesson, we'll create a Time Weighted Average Price (TWAP) using a Uniswap V3 pool.

The pool contract, along with token0 and token1, are initialized inside the constructor. Later on in the lesson, we'll call the `getQuoteAtTick` function to calculate the amount of token out based on the amount of token in.

The exercise we'll be working on is inside of the function called `getTwapAmountOut`. This function takes in three inputs: `tokenIn`, `amountIn`, and `dt`, which is the time interval to take the TWAP. This function should return the amount of token out that is calculated from the TWAP and the amount in.

The first task is to verify that `tokenIn` is either `token0` or `token1`, which were initialized inside of the constructor. Once we verify the `tokenIn`, we'll then assign `tokenOut`.

Next, we'll initialize a dynamic array of type `uint32` which will store two elements. At index zero, we'll put the input `dt`, and at index one we'll put zero. This dynamic array will then be passed to the `pool.observe` function which we'll use to get the tick cumlatives.

To understand how to call `observe` on the pool contract, we can navigate to the interface for the `IUniswapV3Pool`. Inside this interface, we can see how to call the function `observe`.

```javascript
    function observe(uint32[] calldata secondsAgos) external view returns (int56[] memory tickCumulatives, uint160[] memory secondsPerLiquidityCumulativeX128s);
```

Moving back to our TWAP contract, once we get two observations, one from 0 seconds ago, and another from `dt` seconds ago, we can calculate the `tickCumulativeDelta`. This value can be calculated by taking the difference of the tick cumulative at 0 minus the tick cumulative at `dt`.

Next, we'll calculate the average tick. After we calculate the `tickCumulativeDelta`, we'll divide this by `dt` to calculate the average tick.

The next part of the code handles the logic for rounding down the numbers. This works for both positive and negative numbers.

The code handles the following logic: If the `tickCumulativeDelta` is less than zero and it does not divide evenly by `dt`, then round down to negative infinity by doing `tick--`.

```javascript
    if (tickCumulativeDelta < 0
        && (tickCumulativeDelta % int56(uint56(dt)) != 0)) {
        tick--;
    }
```

The last task is to call the `getQuoteAtTick` function, to return the amount of token out that will come out for amount of token in.

```javascript
    function getTwapAmountOut(address tokenIn, uint128 amountIn, uint32 dt) external view returns (uint256 amountOut){
```
