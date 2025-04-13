## Introduction to Time-Weighted Average Pricing (TWAP) Oracles

In this lesson we'll be building a time-weighted average pricing (TWAP) oracle using the Uniswap V2 protocol.  Oracles are a key component of decentralized finance (DeFi) applications. They provide external data to smart contracts, allowing them to make decisions based on real-world information. TWAP oracles are a type of oracle that calculates the average price of an asset over a period of time. This can be helpful for preventing front-running attacks and providing more reliable pricing data.

We are going to modify a simple oracle example from Uniswap V2 that uses a library called FixedPoint:

```javascript
import "FixedPoint.sol";
```

The FixedPoint library uses fixed-point arithmetic, which is a way of representing fractional numbers with a fixed number of decimal places. Fixed-point arithmetic is often used in smart contracts because it can be more efficient than floating-point arithmetic.

We will be using this library to calculate the time-weighted average price of two tokens, token0 and token1. The contract will have the following state variables: 

```javascript
uint256 public price0CumulativeLast;
uint256 public price1CumulativeLast;
uint32 public updatedAt;
```

The first exercise is to initialize the constructor of the contract.  This will require us to pass the address of the Uniswap V2 pair contract:

```javascript
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

```javascript
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
