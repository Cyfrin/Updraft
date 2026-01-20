## Uniswap v2 TWAP

In this lesson, we'll go over the solution to the Uniswap v2 TWAP exercises.

The first exercise involves setting up the constructor of our contract. We begin by setting the pair contract address as a state variable. We then get the token zero and token one addresses from the pair contract and store them as state variables. Finally, we get the price0cumulativeLast and price1cumulativeLast values from the pair contract and store them as state variables.  To do this, we call the `getReserves()` function on the pair contract, which returns the reserves and the last timestamp the reserves were updated. We store the timestamp in our updatedAt variable.

```solidity
// Exercise 1
constructor(address _pair) {
    // 1. Set pair contract from constructor input
    pair = IUniswapV2Pair(_pair);
    // 2. Set token0 and token1 from pair contract
    token0 = pair.token0();
    token1 = pair.token1();
    // 3. Store price0CumulativeLast and price1CumulativeLast from pair contract
    price0CumulativeLast = pair.price0CumulativeLast();
    price1CumulativeLast = pair.price1CumulativeLast();
    // 4. Call pair.getReserve to get last timestamp the reserves were updated
    //    and store it into the state variable updatedAt
    (,, updatedAt) = pair.getReserves();
}
```

The second exercise involves creating a function that calculates the cumulative prices up to the current timestamp. We use the `getCurrentCumulativePrices()` function which returns the current price0cumulative and price1cumulative. We then calculate the TWAP for token0 and token1. To calculate the TWAP, we subtract the last cumulative price from the current cumulative price and divide by the time elapsed since the last update. 

```solidity
// Exercise 2
// Calculates cumulative prices up to current timestamp
function _getCurrentCumulativePrices()
    internal
    view
    returns (uint256 price0Cumulative, uint256 price1Cumulative)
{
    // 1. Get latest cumulative prices from the pair contract
    price0Cumulative = pair.price0CumulativeLast();
    price1Cumulative = pair.price1CumulativeLast();

    // If current block timestamp > last timestamp reserves were updated,
    // calculate cumulative prices until current time.
    // Otherwise return latest cumulative prices retrieved from the pair contract.

    // 2. Get reserves and last timestamp the reserves were updated from
    //    the pair contract
    (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast) =
        pair.getReserves();
    // 3. Cast block.timestamp to uint32
    uint32 blockTimestamp = uint32(block.timestamp);
    if (blockTimestampLast != blockTimestamp) {
        // 4. Calculate elapsed time
        uint32 dt = blockTimestamp - blockTimestampLast;
        // Addition overflow is desired
        unchecked {
            // 5. Add spot price * elapsed time to cumulative prices.
            //    - Use FixedPoint.fraction to calculate spot price.
            //    - FixedPoint.fraction returns UQ112x112, so cast it into uint256.
            //    - Multiply spot price by time elapsed
            price0Cumulative +=
                uint256(FixedPoint.fraction(reserve1, reserve0)._x) * dt;
            price1Cumulative +=
                uint256(FixedPoint.fraction(reserve0, reserve1)._x) * dt;
        }
    }
}
```

The third exercise involves updating the cumulative prices. We begin by casting the current block timestamp to a uint32 and storing it as a state variable. We then calculate the time elapsed since the last update and ensure that it's greater than or equal to our minimum wait time. If it's greater than or equal to the minimum wait time, we call the `getCurrentCumulativePrices()` function to get the current cumulative prices. We then subtract the last cumulative prices from the current cumulative prices and divide by the time elapsed to get the TWAP for token0 and token1. Lastly, we update our state variables, price0cumulativeLast, price1cumulativeLast, and updatedAt.

```solidity
// Exercise 3
// Updates cumulative prices
function update() external {
    // 1. Cast block.timestamp to uint32
    uint32 blockTimestamp = uint32(block.timestamp);
    // 2. Calculate elapsed time since last time cumulative prices were
    //    updated in this contract
    uint32 dt = blockTimestamp - updatedAt;
    // 3. Require time elapsed >= MIN_WAIT
    if (dt < MIN_WAIT) {
        revert InsufficientTimeElapsed();
    }
    // 4. Call the internal function _getCurrentCumulativePrices to get
    //    current cumulative prices
    (uint256 price0Cumulative, uint256 price1Cumulative) =
        _getCurrentCumulativePrices();

    // Overflow is desired, casting never truncates
    // https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/building-an-oracle
    // Subtracting between two cumulative price values will result in
    // a number that fits within the range of uint256 as long as the
    // observations are made for periods of max 2^32 seconds, or ~136 years
    unchecked {
        // 5. Calculate TWAP price0Avg and price1Avg
        //    - TWAP = (current cumulative price - last cumulative price) / dt
        //    - Cast TWAP into uint224 and then into FixedPoint.uq112x112
        price0Avg = FixedPoint.uq112x112(
            uint224((price0Cumulative - price0CumulativeLast) / dt)
        );
        price1Avg = FixedPoint.uq112x112(
            uint224((price1Cumulative - price1CumulativeLast) / dt)
        );
    }

    // 6. Update state variables price0CumulativeLast, price1CumulativeLast and updatedAt
    price0CumulativeLast = price0Cumulative;
    price1CumulativeLast = price1Cumulative;
    updatedAt = blockTimestamp;
}
```

The fourth exercise involves a function called `consult()`. This function takes an address and a uint256 amount as inputs and returns a uint256 amount as an output. This function is designed to return the amount of the token that would be received in exchange for the input amount of the other token. 

To calculate the output amount, we multiply the TWAP of the input token by the input amount. We then use the `decode144()` function to convert the result from a `uq144x112` to a uint144.

```solidity
// Exercise 4
// Returns the amount out corresponding to the amount in for a given token
function consult(address tokenIn, uint256 amountIn)
    external
    view
    returns (uint256 amountOut)
{
    // 1. Require tokenIn is either token0 or token1
    if (tokenIn != token0 && tokenIn != token1) {
        revert InvalidToken();
    }
    // 2. Calculate amountOut
    //    - amountOut = TWAP of tokenIn * amountIn
    //    - Use FixePoint.mul to multiply TWAP of tokenIn with amountIn
    //    - FixedPoint.mul returns uq144x112, use FixedPoint.decode144 to return uint144
    if (tokenIn == token0) {
        // Example
        //   token0 = WETH
        //   token1 = USDC
        //   price0Avg = avg price of WETH in terms of USDC = 2000 USDC / 1 WETH
        //   tokenIn = WETH
        //   amountIn = 2
        //   amountOut = price0Avg * amountIn = 4000 USDC
        amountOut = FixedPoint.mul(price0Avg, amountIn).decode144();
    } else {
        amountOut = FixedPoint.mul(price1Avg, amountIn).decode144();
    }
}
```

To test our contract we first need to set our environment variables for the fork URL and then run the test using forge.

```bash
forge test --fork-url $FORK_URL --mp test/uniswap-v2/exercises/UniswapV2Twap.test.sol -vvv
```

This will run the tests we wrote to ensure that our contract works as expected.
