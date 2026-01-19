# Tracking the Spot Price in Uniswap V3

In Uniswap V2, the amount of tokens inside a contract determines the spot price.  In Uniswap V3, the spot price and liquidity are tracked by the smart contracts. In addition, the price ranges are tracked in Uniswap V3 and used to calculate the amounts of tokens locked in specific price ranges.

The spot price is tracked in Uniswap V3 using the following formula:
```javascript
p = 1.0001^t
```

In the formula above, p is equal to the spot price, and t is the current tick. The smart contract tracks the current tick, and then calculates the price from it. When the tick is equal to zero, the price will be equal to one. If the tick is negative, then the price will be less than one. When the tick is positive, the price will be greater than one. If we slide the tick over to negative values we see the price moves to a smaller value. The price approaches zero as we move the tick further toward the negative numbers. Alternatively, as the tick moves from zero to higher values, the price will increase, and will approach infinity as the tick value increases. This is because the formula being used to calculate the spot price is an exponential function. When the tick slides to negative infinity the price approaches zero. And when the tick slides to positive infinity, the price approaches infinity.
