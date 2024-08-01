## Add Liquidity

When we add liquidity, we need to ensure that the amount of each token we add is proportional to the current ratio of tokens in the pool. This ensures that the price of the token pair remains the same before and after adding liquidity.

We can express this mathematically as:

```
dy / dx = y0 / x0
```

Where:

*  `dy` is the amount of token Y we add.
*  `dx` is the amount of token X we add.
*  `y0` is the amount of token Y in the pool before adding liquidity.
*  `x0` is the amount of token X in the pool before adding liquidity.

The equation `dy / dx = y0 / x0` tells us that the ratio of tokens we add must be equal to the current ratio of tokens in the pool.

Let's look at an example. Imagine we have a pool with 100 ETH and 1,000 USDC. This means the current ratio of ETH to USDC is 1:10. 

If we want to add liquidity to this pool, we need to ensure that the ratio of ETH to USDC we add is also 1:10. This means that if we add 1 ETH, we need to add 10 USDC.

**Here's how we can derive this equation:**

1.  We start with the equation for the price of a token pair in a constant product AMM:
```
Price = y0 / x0
```
2.  We then set the price after adding liquidity equal to the price before adding liquidity:
```
(y0 + dy) / (x0 + dx) = y0 / x0
```
3.  We can then simplify this equation by multiplying both sides by (x0 + dx) and x0:
```
x0 (y0 + dy) = y0 (x0 + dx) 
```
4.  Expanding both sides of the equation, we get:
```
x0 y0 + x0 dy = y0 x0 + y0 dx
```
5.  Canceling out the x0 y0 terms on both sides, we are left with:
```
x0 dy = y0 dx
```
6.  Finally, dividing both sides by dx and x0, we get:
```
dy / dx = y0 / x0
```

This equation tells us the ratio of tokens we need to add to maintain the same price after adding liquidity.

**Diagram of Add Liquidity**
[Insert Diagram Here]

This diagram shows the relationship between the tokens in the pool and the price.  You can see that the price of the token pair is determined by the ratio of the tokens in the pool.

The equation `dy / dx = y0 / x0` is important to understand because it helps us to ensure that we add liquidity to the pool in a way that does not affect the price of the token pair.

By following this rule, we can contribute to the liquidity of the pool without impacting the trading price.
