## Uniswap V2 Arbitrage Optimal Amount In

In this lesson, we will derive the optimal amount of a token to put in to Uniswap V2 contracts to maximize an arbitrage opportunity. 

We will start with two Uniswap V2 AMMs: AMMA and AMMB. We will assume that both AMMs are selling the same tokens. We will also assume that the price of the token on AMMA is cheaper than the price of the token on AMMB. 

We will use this opportunity to buy the token on AMMA, where it is cheaper, and sell it on AMMB, where it is more expensive. This will bring the prices closer together and result in a profit. 

We will define the following variables to derive the optimal amount of token to put in:

* F = swap fee. We will assume that the swap fee is the same on both AMMs. The swap fee will be a number between 0 and 1.
* $X_A$ = AMMA reserve out. The reserve out is the amount of the token that is coming out of the AMM.
* $Y_A$ = AMMA reserve in. The reserve in is the amount of the token that is going into the AMM.
* $X_B$ = AMMB reserve in.
* $Y_B$ = AMMB reserve out.

We will then use these variables to calculate the profit from the arbitrage. 

We will define the profit from the arbitrage as $F(dy_a)$, where $dy_a$ is the amount of token y that we put into AMMA. 

$F(dy_a)$ is equal to $dy_b - dy_a$, where $dy_b$ is the amount of token y that we get out of AMMB.

We want to find the $dy_a$ that maximizes $F(dy_a)$. We will use calculus to find this value. 

We will first find the derivative of $F(dy_a)$ with respect to $dy_a$. 

$F'(dy_a) = dy_b'-1$

We then need to find where $F'(dy_a) = 0$, and this will be the dy_a that maximizes $F(dy_a)$.

To find where $F'(dy_a) = 0$, we can use the quadratic formula.

The quadratic formula is:

$dy_a* = \frac{-b + \sqrt{b^2 - 4ac}}{2a}$


Where a, b, c and k are defined as follows:

* $a = k^2$
* $b = 2 * k * Y_a * X_b$
* $c = (Y_a * X_b)^2 + (1 - f)^2X_aY_aX_bY_b$
* $k = (1 - f)X_b + (1-f)^2X_a$

Plugging these values into the quadratic formula will give us the optimal amount of token y to put into AMMA to maximize the arbitrage profit. 

We will derive the quadratic formula for a, b, c and k in the next lesson. 
