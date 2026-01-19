When we remove liquidity from a constant product AMM, we said that the price after removing liquidity must be equal to the price before removing liquidity. We want to figure out the amount of token X and the amount of token Y to remove so that the price remains the same.

The math to find out the amount of token X and the amount of token Y to remove so that the price remains the same is exactly the same math as the math for adding liquidity. When we add liquidity, we said that the price after adding liquidity must be equal to the price before. And this was expressed using this equation:

$\frac{y_0 + dy}{x_0 + dx} = \frac{y_0}{x_0}$

To figure out what DX and DY are when we're removing liquidity, we consider when DY and DX are both negative and do the same math. 

In other words, the ratio of amount of tokens to remove must be equal to the spot price before removing.

$\frac{dy}{dx} = \frac{y_0}{x_0}$
