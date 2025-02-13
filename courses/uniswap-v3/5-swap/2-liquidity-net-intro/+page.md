# Uniswap V3 Active Liquidity

In this lesson, we'll learn about how Uniswap V3 keeps track of active liquidity. Let's first imagine there are multiple liquidity positions. For example, we have:
```javascript
0 <= y <= L0 {t_lower0 <= x <= t_upp}
```
```javascript
0 <= y <= L1 {t_lower1 <= x <= t_upp}
```
```javascript
0 <= y <= L2 {t_lower2 <= x <= t_upp}
```
```javascript
0 <= y <= L3 {t_lower3 <= x <= t_upp}
```
When we stack up all the individual liquidity positions, we get a graph. Let's say the current price is represented by a vertical dotted line. To the left of the current price, the liquidity is all in token Y. To the right of the current price, the liquidity is all in token X.

During a swap, this current price will move either to the left or to the right. If token X is coming in and token Y is going out, then the price will shift over to the left. If token Y is coming in and token X is going out, the price will move to the right. As the price goes back and forth, we can see that the liquidity changes. For example, currently the liquidity is at 14. Let's say there is a swap, and it swings the price over to a lower liquidity. Now the liquidity is at 4. As another example, let's say that the price swings over to the right. As the price swings over to the right, we can see the liquidity changes, from 14, to 13, then 8, 5, and finally 0.

As the price changes, how does Uniswap V3 keep track of the active liquidity? Active liquidity is represented as the height of the rectangle, and the height of the rectangle is calculated by stacking up all of the liquidity at that price.

For example, when the current liquidity is 14, this is the sum of two liquidity positions. We can see this by toggling on and off the positions. At this price, there are two positions that are active. Hence we get a rectangle that is higher than both of them. The height of the resulting rectangle is calculated by adding up all the heights of the individual rectangles that are currently active at the price.

We've now introduced the concept of how Uniswap V3 keeps track of the current active liquidity, which is the sum of all the liquidities that are currently active.
