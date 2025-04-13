Okay, here's the written lesson based on the provided video:

### Exercise 1 Solution: Uniswap V3 - Get Twap Amount Out Solution

In this lesson, we'll walk through the solution to the Uniswap V3 `getTwapAmountOut` exercise.

The first task is to ensure that `tokenIn` is equal to either `token0` or `token1`. We can accomplish this by using a require statement:

```javascript
require(tokenIn == token0 || tokenIn == token1, "invalid token");
```

The next task is to assign the `tokenOut` address.
```javascript
address tokenOut;
```

We know that `tokenIn` is equal to either `token0` or `token1` from the previous task. Using a ternary operator we can assign `tokenOut`. If `tokenIn` is equal to `token0`, then `tokenOut` should be `token1`, otherwise, it should be `token0`:
```javascript
tokenOut = tokenIn == token0 ? token1 : token0;
```
Task three is to fill out `timeDeltas` with `dt` and `0`.
```javascript
uint32[] memory timeDeltas = new uint32[](2);
timeDeltas[0] = dt;
timeDeltas[1] = 0;
```
Next, we need to call `pool.observe`, passing in `timeDeltas`. The function returns two dynamic arrays, but we only care about the first one, which contains the tick cumulatives.
```javascript
(int56[] memory tickCumulatives,) = pool.observe(timeDeltas);
```
Now we can calculate `tickCumulativeDelta`. We’ll take the difference of the tick cumulative at the first index and the tick cumulative at the zeroth index.
```javascript
int56 tickCumulativeDelta;
tickCumulativeDelta = tickCumulatives[1] - tickCumulatives[0];
```
Next, calculate the average tick. Note that we must cast `dt` to a `uint56` before we can cast it to an `int56`.
```javascript
int24 tick;
tick = int24(tickCumulativeDelta / int56(uint56(dt)));
```
The final task is to call the `getQuoteAtTick` function.
```javascript
return getQuoteAtTick(tick, amountIn, tokenIn, tokenOut);
```
Now we'll compile the contract by typing the following command in our terminal:

```bash
forge build
```
We ran into a typo. Let's fix this line:
```javascript
return getQuoteAtTick(tick, amountIn, tokenIn, tokenOut);
```
Let's compile again:
```bash
forge build
```
Now the contract has been successfully compiled. Now, let's execute the test by first setting the fork URL environment variable.
```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v3/exercises/UniswapV3Twap.test.sol -vvv
```
The test passed. The test contract instantiates the Twap contract and then calls the `getTwapAmountOut` function, passing in one WETH, a `dt` of 3600 seconds, and logs the amount of USDC that is returned.
The time-weighted average price of WETH over the period of one hour is roughly 3,000 USDC.
