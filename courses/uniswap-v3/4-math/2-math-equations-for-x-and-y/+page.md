# Uniswap V3 - Equations for X and Y

In Uniswap V3, we need to derive several equations to answer questions about the amount of token X and token Y between a price range, and the amount of token X or Y we will get for a swap.

The first equations that will help us when we are doing math with Uniswap V3 equations is rewriting the amount of token X and amount of token Y in terms of the liquidity L and the price P. To begin with, we have the constant product equation:
```
X * Y = L^2
```
The spot price P in a constant product curve is given by the amount of token Y divided by the amount of token X:
```
Y / X = P
```
In Uniswap V2, it is easy to know the amount of token Y and the amount of token X in the contract. From these we can easily figure out what the spot price is. In Uniswap V3, this is no longer true. Because there may be multiple positions in different price ranges, we can't simply take the amount of token Y and the amount of token X in the contract to figure out what the spot price is. Instead, in Uniswap V3, it keeps track of the current price and the current liquidity. From these, we can figure out what the amount of token Y and the amount of token X should be in a price range.

To find the amount of token X given the liquidity and the spot price, we will use our two equations. First, let's copy these equations and rewrite them below:
```
X * Y = L^2
Y / X = P
```
We can write X in terms of L and P if we do L^2 divided by P:
```
L^2 / P =
```
L^2 is X times Y, and P is Y divided by X:
```
L^2 / P = X * Y / (Y / X)
```
The Ys cancel out and the X comes to the top, and we will have X squared:
```
L^2 / P = X^2
```
So we get:
```
L^2 / P = X^2
```
Now we will take the square root of both sides of the equation. On the right we have square root of X^2, so this is simply equal to X:
```
sqrt(L^2 / P) = X
```
On the left side, the square root of L^2 will be L, and in the bottom we will have the square root of P:
```
L / sqrt(P) = X
```
So if we know the current liquidity L and the price P, then we can calculate the amount of token X. L divided by square root of P is equal to X.

Next, we will do something similar to get the equation for Y in terms of L and P. We will copy the two equations again and paste them below:
```
X * Y = L^2
Y / X = P
```
If we take L squared times P we get:
```
L^2 * P =
```
L squared is X times Y and P is Y divided by X:
```
L^2 * P = X * Y * (Y / X)
```
The X’s cancel out and we are left with Y squared:
```
L^2 * P = Y^2
```
Now we will take the square root of both sides. On the right side, the square root of Y squared is simply equal to Y:
```
sqrt(L^2 * P) = Y
```
And on the left side, the square root of L squared is L, and we can remove the power of 2, and we're left with the square root of P:
```
L * sqrt(P) = Y
```
So, given that we know the liquidity and the price, we can calculate the amount of token Y, and this is equal to L times the square root of P.
