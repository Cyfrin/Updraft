## Add Liquidity

When we add liquidity, we need to ensure that the amount of each token we add is proportional to the current ratio of tokens in the pool. This ensures that the price of the token pair remains the same before and after adding liquidity.

We can express this mathematically as:

$\frac{dy}{dx} = \frac{y_0}{x_0}$


Where:

*  `dy` is the amount of token Y we add.
*  `dx` is the amount of token X we add.
*  `y0` is the amount of token Y in the pool before adding liquidity.
*  `x0` is the amount of token X in the pool before adding liquidity.

The equation $\frac{dy}{dx} = \frac{y_0}{x_0}$ tells us that the ratio of tokens we add must be equal to the current ratio of tokens in the pool.

Let's look at an example. Imagine we have a pool with 100 ETH and 1,000 USDC. This means the current ratio of ETH to USDC is 1:10. 

If we want to add liquidity to this pool, we need to ensure that the ratio of ETH to USDC we add is also 1:10. This means that if we add 1 ETH, we need to add 10 USDC.

**Here's how we can derive this equation:**

1. We start with the equation for the price of a token pair in a constant product AMM:

$Price = \frac{y_0}{x_0}$  

2.  We then set the price after adding liquidity equal to the price before adding liquidity:
  
$\frac{y_0 + dy}{x_0 + dx} = \frac{y_0}{x_0}$  

3.  We can then simplify this equation by multiplying both sides by (x0 + dx) and x0:

$x_0(y_0 + dy) = y_0(x_0 + dx)$  


4.  Expanding both sides of the equation, we get:

$x_0 * y_0 + x_0 * dy = y_0 * x_0 + y_0 * d_x$

5.  Canceling out the x0 y0 terms on both sides, we are left with:

$x_0 * dy = y_0 * dx$


6.  Finally, dividing both sides by dx and x0, we get:

$\frac{dy}{dx} = \frac{y_0}{x_0}$


This equation tells us the ratio of tokens we need to add to maintain the same price after adding liquidity.

**Diagram of Add Liquidity**
![Pasted image 20250519131426](https://github.com/user-attachments/assets/495ec2c9-a179-49d4-afdb-14b878a23829)


This diagram shows the relationship between the tokens in the pool and the price.  You can see that the price of the token pair is determined by the ratio of the tokens in the pool.

The equation $\frac{dy}{dx} = \frac{y_0}{x_0}$ is important to understand because it helps us to ensure that we add liquidity to the pool in a way that does not affect the price of the token pair.

By following this rule, we can contribute to the liquidity of the pool without impacting the trading price.
