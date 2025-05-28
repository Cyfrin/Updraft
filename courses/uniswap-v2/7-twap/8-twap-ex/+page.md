## Introduction to Time-Weighted Average Pricing (TWAP) Oracles

In this lesson we'll be building a time-weighted average pricing (TWAP) oracle using the Uniswap V2 protocol.  Oracles are a key component of decentralized finance (DeFi) applications. They provide external data to smart contracts, allowing them to make decisions based on real-world information. TWAP oracles are a type of oracle that calculates the average price of an asset over a period of time. This can be helpful for preventing front-running attacks and providing more reliable pricing data.

We are going to modify a simple oracle example from Uniswap V2 that uses a library called FixedPoint:

```solidity
import "FixedPoint.sol";
```

The FixedPoint library uses fixed-point arithmetic, which is a way of representing fractional numbers with a fixed number of decimal places. Fixed-point arithmetic is often used in smart contracts because it can be more efficient than floating-point arithmetic.

We will be using this library to calculate the time-weighted average price of two tokens, token0 and token1. The contract will have the following state variables: 

```solidity
uint256 public price0CumulativeLast;
uint256 public price1CumulativeLast;
uint32 public updatedAt;
```

The first exercise is to initialize the constructor of the contract.  This will require us to pass the address of the Uniswap V2 pair contract:

```solidity
constructor(address _pair) {
    pair = _pair;
}
```

The second exercise is to write the `getCurrentCumulativePrices` function. This function will be called to calculate the cumulative prices of the two tokens up to the current timestamp.  The function will do the following:

1. Get the latest cumulative prices of the two tokens from the Uniswap V2 pair contract.
2. Get the current block timestamp and the last timestamp that the reserves were updated.
3. Calculate the elapsed time since the last update.
4. Update the cumulative prices based on the spot price and the elapsed time.

The `getCurrentCumulativePrices` function is internal, meaning it can only be called by other functions within the contract.

The third exercise is to write the `update` function. This function will be called to update the cumulative prices.  The function will do the following:

1. Get the current block timestamp.
2. Calculate the elapsed time since the last time the `update` function was called.
3. Make sure the elapsed time is greater than or equal to the `MIN_WAIT` constant. This helps prevent the TWAP oracle from being updated too frequently, which could make it more susceptible to manipulation.
4. Call the `getCurrentCumulativePrices` function to get the latest cumulative prices.
5. Update the `price0CumulativeLast`, `price1CumulativeLast`, and `updatedAt` state variables.

The `update` function is external, meaning it can be called by other contracts or by users.

The fourth and final exercise is to write the `consult` function. This function will return the equivalent amount of one token in terms of the other token based on a given input amount.  The function will do the following:

1.  Ensure the `tokenIn` is either `token0` or `token1`.
2. Calculate the `amountOut` based on the input `amountIn` and the time-weighted average price (TWAP) of the `tokenIn`.
3. Return the `amountOut`. 

Let's look at an example. We have token0 as WETH and token1 as USDC. If we pass an amountIn of 2 WETH, and the average price of WETH in terms of USDC is 2000 USDC/1 WETH. The amount out would be 4000 USDC.

```solidity
function consult(address tokenIn, uint256 amountIn) external view returns (uint256 amountOut) {
    // 1. Require tokenIn is either token0 or token1
    require(tokenIn == token0 || tokenIn == token1, "invalid token");
    // 2. Calculate amountOut
    // -- amountOut = TWAP of tokenIn * amountIn
    // -- Use FixedPoint.mul to multiply TWAP of tokenIn with amountIn
    // -- FixedPoint.mul returns uq144x112, use FixedPoint.decode144 to return uint144
    // Example:
    // tokenIn = WETH
    // price0Avg = avg price of WETH in terms of USDC = 2000 USDC / 1 WETH
    // amountIn = 2 WETH
    // amountOut = price0Avg * amountIn = 4000 USDC
    if (tokenIn == token0) {
        amountOut = price0Avg.mul(amountIn).decode144();
    } else {
        amountOut = price1Avg.mul(amountIn).decode144();
    }
}
```

In the next lesson, we'll look at how to deploy this TWAP oracle and use it in a DeFi application.


---

Exercises：`foundry/test/uniswap-v2/exercises/UniswapV2Twap.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >= 0.4 < 0.9;

import {IUniswapV2Pair} from
    "../../../src/interfaces/uniswap-v2/IUniswapV2Pair.sol";
import {FixedPoint} from "../../../src/uniswap-v2/FixedPoint.sol";

// Modified from https://github.com/Uniswap/v2-periphery/blob/master/contracts/examples/ExampleOracleSimple.sol
// Do not use this contract in production
contract UniswapV2Twap {
    using FixedPoint for *;

    // Minimum wait time in seconds before the function update can be called again
    // TWAP of time > MIN_WAIT
    uint256 private constant MIN_WAIT = 300;

    IUniswapV2Pair public immutable pair;
    address public immutable token0;
    address public immutable token1;

    // Cumulative prices are uq112x112 price * seconds
    uint256 public price0CumulativeLast;
    uint256 public price1CumulativeLast;
    // Last timestamp the cumulative prices were updated
    uint32 public updatedAt;

    // TWAP of token0 and token1
    // range: [0, 2**112 - 1]
    // resolution: 1 / 2**112
    // TWAP of token0 in terms of token1
    FixedPoint.uq112x112 public price0Avg;
    // TWAP of token1 in terms of token0
    FixedPoint.uq112x112 public price1Avg;

    // Exercise 1
    constructor(address _pair) {
        // 1. Set pair contract from constructor input
        pair = IUniswapV2Pair(address(0));
        // 2. Set token0 and token1 from pair contract
        token0 = address(0);
        token1 = address(0);
        // 3. Store price0CumulativeLast and price1CumulativeLast from pair contract
        // 4. Call pair.getReserve to get last timestamp the reserves were updated
        //    and store it into the state variable updatedAt
    }

    // Exercise 2
    // Calculates cumulative prices up to current timestamp
    function _getCurrentCumulativePrices()
        internal
        view
        returns (uint256 price0Cumulative, uint256 price1Cumulative)
    {
        // 1. Get latest cumulative prices from the pair contract

        // If current block timestamp > last timestamp reserves were updated,
        // calculate cumulative prices until current time.
        // Otherwise return latest cumulative prices retrieved from the pair contract.

        // 2. Get reserves and last timestamp the reserves were updated from
        //    the pair contract
        (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast) =
            (0, 0, 0);

        // 3. Cast block.timestamp to uint32
        uint32 blockTimestamp = 0;
        if (blockTimestampLast != blockTimestamp) {
            // 4. Calculate elapsed time
            uint32 dt;

            // Addition overflow is desired
            unchecked {
                // 5. Add spot price * elapsed time to cumulative prices.
                //    - Use FixedPoint.fraction to calculate spot price.
                //    - FixedPoint.fraction returns UQ112x112, so cast it into uint256.
                //    - Multiply spot price by time elapsed
                price0Cumulative += 0;
                price1Cumulative += 0;
            }
        }
    }

    // Exercise 3
    // Updates cumulative prices
    function update() external {
        // 1. Cast block.timestamp to uint32
        uint32 blockTimestamp = 0;
        // 2. Calculate elapsed time since last time cumulative prices were
        //    updated in this contract
        uint32 dt = 0;
        // 3. Require time elapsed >= MIN_WAIT

        // 4. Call the internal function _getCurrentCumulativePrices to get
        //    current cumulative prices
        (uint256 price0Cumulative, uint256 price1Cumulative) = (0, 0);

        // Overflow is desired, casting never truncates
        // https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/building-an-oracle
        // Subtracting between two cumulative price values will result in
        // a number that fits within the range of uint256 as long as the
        // observations are made for periods of max 2^32 seconds, or ~136 years
        unchecked {
            // 5. Calculate TWAP price0Avg and price1Avg
            //    - TWAP = (current cumulative price - last cumulative price) / dt
            //    - Cast TWAP into uint224 and then into FixedPoint.uq112x112
            price0Avg = FixedPoint.uq112x112(0);
            price1Avg = FixedPoint.uq112x112(0);
        }

        // 6. Update state variables price0CumulativeLast, price1CumulativeLast and updatedAt
    }

    // Exercise 4
    // Returns the amount out corresponding to the amount in for a given token
    function consult(address tokenIn, uint256 amountIn)
        external
        view
        returns (uint256 amountOut)
    {
        // 1. Require tokenIn is either token0 or token1

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
            amountOut = 0;
        } else {
            amountOut = 0;
        }
    }
}

```
