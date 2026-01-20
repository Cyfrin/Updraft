## Uniswap V3 Spot Price Solution

Okay, let’s go over the solution.

First, let’s review what price we need to return. Do we need to return the price y / x or do we need to return x / y?

If we have P, this is the ratio of token y / token x, and in our case token x is USDC and token y is WETH. So the ratio would be WETH / USDC. This ratio represents the price of token X in terms of token Y. In our case, this is the price of USDC in terms of WETH. However, we want to return the price of WETH in terms of USDC, so to do that we need to flip this ratio. Therefore, we need to calculate 1/P, which will result in X/Y. This will result in the ratio of USDC/WETH. When we calculate 1/P, we will get the price of WETH in terms of USDC. What we need to find is 1/P.

Before we do that, let's calculate how many decimals this 1/P has. If we look at P, it has WETH, which has 18 decimals, or 1e18, divided by USDC which has 6 decimals, or 1e6. This equals 1e12 decimals. For 1/P, we need to flip the decimals. This will give us 1e6 on the numerator divided by 1e18 on the denominator, which equals 1e-12 decimals.

So far we know that we need to calculate 1/P to get the price of WETH in terms of USDC. We also know that 1/P has 1e-12 decimals.

Next let's think about how we will get this price P from slot0. Inside slot0, there is data called “sqrtPriceX96”, and we’ll need to use this to calculate the price P.

Let’s start by reviewing what “sqrtPriceX96” represents.

```javascript
sqrtPriceX96 = square root of P * Q96
```

Q96 is 2 to the power of 96. To get the price that represents P we need to take the square of sqrtPriceX96.

```javascript
sqrtPriceX96 * sqrtPriceX96 = sqrt(P) * Q96 * sqrt(P) * Q96 = P * Q96 * Q96
```
Each Q96 has 96 bits, and here we have two Q96 which equals 2 * 96 or 192 bits. uint256 has 256 bits, so 256 bits - 192 bits gives us 64 bits. Therefore, we have 64 bits to represent price P. 

Now, imagine we want to return 18 decimals. Out of the 64 bits we have, or 2^64, we’re going to use 1e18 decimals to represent the decimal part of the price. If you plug that into a calculator, this is approximately equal to 18. What this means is that if we were to return the price with 18 decimals, the maximum price we can return is roughly 18. For example, the current price of ETH is above 3,000. This means that when we do the calculation, we won’t be able to return the actual price of ETH.

So, when we do the `sqrtPriceX96 * sqrtPriceX96` calculation to get the price P, we need to somehow make that multiplication smaller. One way we can do this is by saying `sqrtPriceX96` divided by Q96, times `sqrtPriceX96` divided by Q96. This will give us P. The problem with this approach is that because we’re dividing by Q96, if the sqrtPriceX96 represents a very small number, this will round down to 0 and the price will be incorrect.

To solve these two problems, first an overflow and second, and incorrect price, we are going to use the library `FullMath.mulDiv` to calculate the price P accurately without any overflows.

```javascript
price = FullMath.mulDiv(slot0.sqrtPriceX96, slot0.sqrtPriceX96, Q96)
```
Right now, the price is equal to the price that we discussed over here as P = WETH / USDC.  What we need to return is 1 over P.  Therefore,  `1 / price` is equal to one, multiplied by Q96, over P.  
However, when we perform this calculation, we're doing one, divided by a large number. Therefore, the result is going to round down to zero. What we need to do is multiply this one, divided by price, by a large number, so that it doesn’t round down to zero when we divide by P * Q96. So we’re going to multiply the top by 1e12.
```javascript
price = 1e12 * Q96 / price
```
And then finally, for this exercise we want to return the price with 18 decimals. Therefore, we need to multiply this by 1e18.
```javascript
price = 1e12 * Q96 / price * 1e18
```
And this completes the exercise.
Let’s execute the test. Inside the terminal, first set up an environment variable for the fork URL.

```bash
FORK_URL="https://eth-mainnet.g.alchemy.com/v2/...""
```
Then to execute the test for this exercise, type:

```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v3/exercises/UniswapV3SpotPrice.test.sol -vvv
```
Okay and the test passed. The price that was logged is `3.284093583669330714062e21`. We said we wanted to return the price with 18 decimals, 21-18 is 3. So, the spot price given by the uniswap v3 pool is currently roughly `3,284` USDC per one WETH.
