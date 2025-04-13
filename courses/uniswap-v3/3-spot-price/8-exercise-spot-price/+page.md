### Exercise

In this lesson, we'll explore how to extract the spot price from a Uniswap V3 pool contract. We will be using the USDC-WETH pool as our example. Our objective is to determine the price of WETH in terms of USDC, with the result formatted to 18 decimal places.

To accomplish this, we will leverage the `FullMath` library, and more specifically, its `mulDiv` function. This function is essential for preventing overflow when multiplying and dividing `uint256` numbers. The function will allow us to safely perform the calculation when multiplying `sqrtPriceX96` with `sqrtPriceX96`

Below is a code snippet demonstrating the function signature of our test function.

```javascript
function test_spot_price_from_sqrtPriceX96() public {
    uint256 price = 0;
    IUniswapV3Pool.Slot0 memory slot0 = pool.slot0();
```
This is where we'll add our logic for calculating the spot price. Be sure to maintain the existing comments and refrain from altering any other code in the function.

Good Luck!
