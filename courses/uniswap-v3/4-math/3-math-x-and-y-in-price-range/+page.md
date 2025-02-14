### Uniswap V3 - Amounts of Tokens Between Price Ranges

In this lesson, we're going to be looking at how to calculate the amount of tokens between different price ranges using Uniswap V3. We'll be using the following equations to help us:
```
L / sqrt(P) = x
L * sqrt(P) = y
```
Where L is liquidity and P is price. Using these equations, we will answer two questions:

First, given liquidity L and price P, what is the amount of token x between P and P_b. On a graph, this is the amount of token x needed to move the current price, P, all the way up to P_b. Using the equations above, we can express x as:
```
x = L / sqrt(P)
```
Where L is the liquidity and P is the price. Then, when the price is P_b, x becomes:
```
L / sqrt(P_b)
```
And finally, taking the difference between these to find the length of the line we get:
```
x = L / sqrt(P) - L / sqrt(P_b)
```
Secondly, what is the amount of token y between P and P_a. On a graph, this is the amount of token y needed to move the current price, P, all the way down to P_a. Using the equations above, we can express y as:
```
y = L * sqrt(P)
```
Where L is the liquidity and P is the price. Then, when the price is P_a, y becomes:
```
L * sqrt(P_a)
```
And finally, taking the difference between these to find the length of the line we get:
```
y = L * sqrt(P) - L * sqrt(P_a)
```
So, to generalize these equations, we'll rewrite P, P_b, and P_a as:
```
x = L / sqrt(P_lower) - L / sqrt(P_upper)
y = L * sqrt(P_upper) - L * sqrt(P_lower)
```
Where P_lower indicates the lower price, and P_upper indicates the upper price. For x we're considering the lower price, P, and for y we're considering the upper price, P.
These equations will allow us to calculate the amounts of token x and token y between price ranges.
