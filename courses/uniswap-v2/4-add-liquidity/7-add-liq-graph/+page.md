https://www.desmos.com/calculator/w3khgtzadd

When we add liquidity to Uniswap V2, we can add an arbitrary amount of tokens. If we want to provide some amount of token X, there is an equation that tells us how much token Y we must also provide.  Likewise, if we want to provide some amount of token Y, then there is an equation that tells us how much token X we must also provide. This equation is based on the invariant, which says that the price of the AMM before adding liquidity and after adding liquidity must be the same. 

Let's visualize this! We'll use Desmos to see how the AMM curve shifts when we add liquidity. We'll start with a pool with an initial liquidity, L, of 100. The invariant of this pool is $X * Y = L^2$, so in this case $X * Y = 100^2$. If we add more liquidity to the pool, the AMM curve will shift to the top right. The more liquidity we add, the flatter the curve becomes.

For this visualization, we'll focus on how the price (token X in terms of token Y) is affected by adding liquidity. The current price, P, is 0.4, meaning that 1 token X is worth 0.4 tokens Y. Let's draw a line from the origin of our graph to the point on the curve that represents the current state of the pool (before adding liquidity). This line will have a slope equal to the current price, 0.4.

Now, let's say we add liquidity to the pool. The AMM curve will shift, but the price will remain the same!  The resulting amount of tokens in the pool after we add liquidity will be represented by a point on the new curve where the price is still 0.4. We can draw a line from the origin to this new point. This line will have the same slope as the first line, because the price is still 0.4. 

We can use this visual representation to figure out how much token X and Y we need to add to the pool in order to reach this new point on the curve. 

Let's say we want to add a certain amount of token X to the pool. We can use the slope of the line to determine how much token Y we need to add as well. Because the slope of the line (our price) is 0.4, if we add 280 token X, then we must also add 280 token Y. We can see this in the visualization by noticing the two points are on a line parallel to the line from the origin. 

We can also see that if we want to add more token X than token Y (for a price that's higher than the current price), the resulting point on the new curve will be higher up on our orange line. Likewise, if we want to add more token Y than token X (for a price that's lower than the current price), the resulting point will be lower on our orange line.

In conclusion, when we add liquidity to a constant product AMM, the amount of tokens we must add to maintain the same price is determined by the slope of a line drawn from the origin to the point representing the current state of the pool.  We can use this visual representation to help us understand how liquidity affects the AMM curve and the price of a token pair. 
