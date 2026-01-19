This will be the last video about math for TWAP in Uniswap V2. Here, we want to explain about a misconception that if you know the TWAP of token X, then you can get the TWAP of token Y by doing 1 over the TWAP of token X. This is not true, and in this video, we want to quickly explain why this is not true.

First of all, if we look at the spot price of token X in terms of token Y in Uniswap V2, we can write this as Y divided by X. 

And if we put this Y divided by X, we get X divided by Y, and this is spot price of token Y in terms of token X. In other words, if we know the spot price of token X in terms of token Y, let's call this P, then if we take 1 over P, then we get the spot price of token Y in terms of token X. 

However, we cannot apply this same logic to say that the TWAP of token Y is equal to 1 over the TWAP of token X. And here's why. 

As we discussed in the previous videos, the TWAP of token X from time tk to tn is given by this equation.

TWAP of X from $T_k$ to $T_n = \frac{\sum\limits_{i=k}^{n-1}{ΔT_iP_i}}{T_n-T_k}$


The equation for the TWAP of token Y is almost similar to this equation. The only difference is that we need to take the spot price of token Y in terms of token X. This is given by 1 over P of Y.


TWAP of Y from $T_k$ to $T_n = \frac{\sum\limits_{i=k}^{n-1}{ΔT_i\frac{1}{P_i}}}{T_n-T_k}$


And it's hard to imagine that taking 1 over this equation will be equal to this equation. If you're curious, you can do the math and check that taking 1 over this equation will not be equal to this equation. 
