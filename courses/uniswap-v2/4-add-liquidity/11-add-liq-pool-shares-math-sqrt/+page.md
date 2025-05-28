## Introduction to Pool Value

In this lesson, we're going to explore how to measure the value of a constant product AMM pool.

We'll define a function *f* that takes the amount of tokens in the pool as input and outputs the value of the pool. This function is simply the square root of the product of the two tokens.

$f(x, y) = \sqrt{xy}$

This function is motivated by the constant product equation, which states that the product of the two tokens in the pool is always a constant. 

We can see this in the following equation:

$xy = L^2$

Where *x* and *y* are the amounts of the two tokens, and *L* is the liquidity.  We can take the square root of both sides of the equation to get:

$\sqrt{xy} = L$

This equation tells us that the value of the pool is equal to the square root of the product of the two tokens.

We can use this function to measure the change in the value of the pool as liquidity is added. We can calculate this change using the following formula:

$\frac{L_1 - L_0}{L_0} = \frac{f(x_0 + dx, y_0 + dy) - f(x_0, y_0)}{f(x_0, y_0)}$

Where $L_1$ is the liquidity after adding liquidity, $L_0$ is the liquidity before adding liquidity, $x_0$ is the amount of the first token before adding liquidity, $y_0$ is the amount of the second token before adding liquidity, dx is the amount of the first token added, and dy is the amount of the second token added.

In the next lesson, we'll look at how to simplify this formula.
