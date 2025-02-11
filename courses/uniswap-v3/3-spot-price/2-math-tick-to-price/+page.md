# Uniswap V3 Price and Tick

In this lesson, we'll explain the math equation for how to calculate the price given the tick. We will set 'x' to represent token 0, and 'y' to represent token 1. 'P' will be the price of 'x' in terms of 'y'.

For example, think of 'x' as being WETH and 'y' as being USDC. In this case 'P' is the price of WETH in terms of USDC.

In Uniswap V2, to get the spot price of token 'x' in terms of token 'y', we had to get the amount of token 1 that is stored in the Uniswap V2 pair contract and divide by the amount of token 0 that is stored in the Uniswap V2 pair contract.

```
P = Y / X
```

In Uniswap V3, we can no longer do this because in V3 it no longer keeps track of the amounts of tokens locked inside the contract. Instead, it keeps track of the current price and from the current price, if we know the liquidity and the price ranges, then we can calculate the amount of tokens that must be locked in those price ranges.

However, the equation  P = Y / X is still a useful equation. Knowing that the price 'P' is equal to the ratio of token 'y' to token 'x' is useful, especially when we are dealing with decimal conversions. 

For example, if 'x' is WETH and 'y' is USDC, USDC has 6 decimals, and WETH has 18 decimals. When we take the ratio, we are left with 10<sup>6</sup> / 10<sup>18</sup> which is 10<sup>-12</sup>. If we wanted to normalize this ratio to 10<sup>18</sup>, then we'll have to multiply by 10<sup>12</sup> to cancel out the 10<sup>-12</sup> and then multiply by 10<sup>18</sup>.

We will explain more about decimal conversions when we actually write some code. Moving on, in Uniswap V3, the price is defined as 1.0001<sup>tick</sup>

```
P = 1.0001^tick
```

So if we know the number for what the tick is, then we can take 1.0001 raised to the tick to calculate the current price.
