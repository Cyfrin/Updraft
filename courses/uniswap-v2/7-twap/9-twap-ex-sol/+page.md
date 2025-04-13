## Uniswap v2 TWAP

In this lesson, we'll go over the solution to the Uniswap v2 TWAP exercises.

The first exercise involves setting up the constructor of our contract. We begin by setting the pair contract address as a state variable. We then get the token zero and token one addresses from the pair contract and store them as state variables. Finally, we get the price0cumulativeLast and price1cumulativeLast values from the pair contract and store them as state variables.  To do this, we call the `getReserves()` function on the pair contract, which returns the reserves and the last timestamp the reserves were updated. We store the timestamp in our updatedAt variable.

```javascript
// Exercise 1
constructor(address _pair) {
    pair = _pair;
    token0 = pair.token0();
    token1 = pair.token1();
    price0CumulativeLast = pair.price0CumulativeLast();
    price1CumulativeLast = pair.price1CumulativeLast();
    updatedAt = pair.getReserves()[2];
}
```

The second exercise involves creating a function that calculates the cumulative prices up to the current timestamp. We use the `getCurrentCumulativePrices()` function which returns the current price0cumulative and price1cumulative. We then calculate the TWAP for token0 and token1. To calculate the TWAP, we subtract the last cumulative price from the current cumulative price and divide by the time elapsed since the last update. 

```javascript
// Exercise 2
function getCurrentCumulativePrices() internal view returns (uint256 price0Cumulative, uint256 price1Cumulative) {
    price0Cumulative = pair.price0CumulativeLast();
    price1Cumulative = pair.price1CumulativeLast();

    if (block.timestamp != updatedAt) {
        uint32 dt = uint32(block.timestamp - updatedAt);
        price0Cumulative += uint256(FixedPoint.fraction(reserve1, reserve0)._x) * dt;
        price1Cumulative += uint256(FixedPoint.fraction(reserve0, reserve1)._x) * dt;
    }
}
```

The third exercise involves updating the cumulative prices. We begin by casting the current block timestamp to a uint32 and storing it as a state variable. We then calculate the time elapsed since the last update and ensure that it's greater than or equal to our minimum wait time. If it's greater than or equal to the minimum wait time, we call the `getCurrentCumulativePrices()` function to get the current cumulative prices. We then subtract the last cumulative prices from the current cumulative prices and divide by the time elapsed to get the TWAP for token0 and token1. Lastly, we update our state variables, price0cumulativeLast, price1cumulativeLast, and updatedAt.

```javascript
// Exercise 3
function update() external {
    uint32 blockTimestamp = uint32(block.timestamp);
    uint32 dt = blockTimestamp - updatedAt;
    require(dt >= MIN_WAIT, "dt < min wait");

    (uint256 price0Cumulative, uint256 price1Cumulative) = getCurrentCumulativePrices();

    price0Avg = FixedPoint.uq112x112(uint224(price0Cumulative - price0CumulativeLast) / dt);
    price1Avg = FixedPoint.uq112x112(uint224(price1Cumulative - price1CumulativeLast) / dt);

    price0CumulativeLast = price0Cumulative;
    price1CumulativeLast = price1Cumulative;
    updatedAt = block.timestamp;
}
```

The fourth exercise involves a function called `consult()`. This function takes an address and a uint256 amount as inputs and returns a uint256 amount as an output. This function is designed to return the amount of the token that would be received in exchange for the input amount of the other token. 

To calculate the output amount, we multiply the TWAP of the input token by the input amount. We then use the `decode144()` function to convert the result from a `uq144x112` to a uint144.

```javascript
// Exercise 4
function consult(address tokenIn, uint256 amountIn) external view returns (uint256 amountOut) {
    require(tokenIn == token0 || tokenIn == token1, "invalid token");

    if (tokenIn == token0) {
        amountOut = FixedPoint.mul(price0Avg, amountIn).decode144();
    } else {
        amountOut = FixedPoint.mul(price1Avg, amountIn).decode144();
    }
}
```

To test our contract we first need to set our environment variables for the fork URL and then run the test using forge.

```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v2/exercises/UniswapV2Twap.sol --vvv
```

This will run the tests we wrote to ensure that our contract works as expected.
