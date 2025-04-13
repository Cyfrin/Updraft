### Graphing Tick on the Constant Product Curve

In this lesson, we will explore how Uniswap V3 calculates the price and how that price interacts with the constant product curve.

In the previous video, we saw that the price was calculated with the formula:
```javascript
p = 1.0001^t
```
where t is some tick.

In this video, we'll observe how the price is plotted on the constant product curve as we increase and decrease the tick. 

As a review: in Uniswap V2, we could calculate the spot price given the amount of tokens. However, in Uniswap V3, we can calculate the amount of tokens given the price and liquidity.

Because we know the liquidity and price, we can determine where the amount of tokens should be on this curve, and we can plot this price as we change the tick.

For example, if we increase the tick, we can see that the price increases. If we decrease the tick, we can see that the price decreases.
