# Graphing a Single Uniswap V3 Position

Let's consider a scenario where we are the sole liquidity provider to a Uniswap V3 pool. When we add liquidity, we're creating a position. A position represents liquidity concentrated within a specific price range. To add liquidity effectively, we need to know:

* The current price within the Uniswap V3 pool contract.
* The desired price ranges for our liquidity.
* The quantities of tokens to deposit.

The amount of tokens we can add is subject to conditions based on the current price and our selected price ranges, but we'll skip those details here.

Our focus will be on visualizing the liquidity within the price ranges *P<sub>a</sub>* and *P<sub>b</sub>*. To achieve this, we will plot prices against liquidity.

On the horizontal axis, we'll represent prices, but because prices in Uniswap V3 are given by the formula:
```javascript
P = 1.0001^t
```
Where *P* is the price and *t* is the current tick, we'll use ticks instead of prices on the horizontal axis. On this axis, T<sub>a</sub> corresponds to the tick of the lower price, P<sub>a</sub>, and T<sub>b</sub> to the tick of the upper price, P<sub>b</sub>.  The current tick will represent the current price. An increasing price causes the tick to increase, shifting to the right. A decreasing price causes the tick to decrease, shifting to the left.  Therefore, on this horizontal axis, moving right represents positive infinity while moving left represents negative infinity.

On the vertical axis, we'll plot liquidity. Higher liquidity corresponds to a taller purple rectangle, while decreasing liquidity will reduce the height of the purple rectangle.

If the current tick T is below the lower tick T<sub>a</sub>,  as the price increases, the tick moves to the right. When the current tick is between T<sub>a</sub> and T<sub>b</sub>, this represents our position. Further price increases will cause the tick to move to the right and when current price goes over the upper tick P<sub>b</sub>, then this tick will be outside the liquidity position.

This purple rectangle shows token amounts where the color red represents token x and blue represents token y. When the current price is above the upper price range, *P<sub>b</sub>*, the liquidity position is entirely in token y. The amount of token y is 214 and token x is 0. Therefore, when the current tick is above the upper tick T<sub>b</sub>, all the liquidity is in token y. When the current price is below the lower price range, *P<sub>a</sub>*, the position between *P<sub>a</sub>* and *P<sub>b</sub>* consists only of token x, and the amount of token y in this position is 0. Therefore, all the liquidity in this region is token x. As the price increases, the amount of token y increases, while the amount of token x decreases.  Conversely, if the price decreases, the amount of token x increases and token y decreases.
