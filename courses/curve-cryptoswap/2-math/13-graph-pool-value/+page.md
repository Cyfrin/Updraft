### Curve v2 Quantify Repeg Loss

Let's discuss constant product AMMs (Automated Market Makers).

If we have a constant product AMM, we can view it's graph on the right side of the screen. Over time this pool will collect swap fees, so liquidity increases. As the liquidity increases, we can see that the graph moves towards the top right of the screen. The graph also becomes flatter.

From this behavior we can gather 2 key pieces of information. First, we can compare 2 constant product AMMs and know which one has higher liquidity. Also, we can compare the constant product curve over time to see how much profit it made. As liquidity increases, the graph is going to move to the top right of the screen, and we can figure out how much profit it made.

Now, let's compare curve v2 AMMs. Here we have 2 graphs of curve v2 AMM with different price scales, and different values for D. Just by looking at these two graphs, we cannot tell which one has higher liquidity.

Unlike with the constant product curve, we can not simply compare the two graphs. If we compare a constant product AMM, the graph that is to the left of another graph has lower liquidity.

However, we cannot do the same for graphs of curve v2 AMM, to compare their liquidity. For example, if we compare the pink and orange graphs, on the left side of the screen, the pink curve is to the left of the orange curve, but on the right they intersect. Then in that region, the orange curve is to the left of the pink curve. 

So, there is no trivial way to compare two graphs of curve v2 AMM, to figure out which one has lower liquidity. The way that curve v2 quantifies the value of the pool, so that two curve v2 AMMs can be compared, is by constructing a constant product curve with the transformed balances. This will give us the liquidity for a constant product curve. Then, we do the same for another curve v2 AMM that might have a different price scale.

We can then compare the liquidity that was constructed by the constant product AMM, to compare the pool values of two different curve v2 AMMs that might be at different price scales, and also have different values for D.

For example, lets say we have the transformed balances, and we construct the constant product curve as:
```
xy = (D / 2)^2
```
Note that the x and y both represent transformed balances. We will come back to this later. 

D/2, for clarity, is equal to (D/2) * (D/2). Now, at the moment, this token balance represents the transformed balances. The transformed balances are the actual token balances multiplied by the price scale.

The price scale of token x, let's say, is equal to 1, and we can call the price scale of token y p of y. Now, this token x will be the actual token balance of token x, and this y will be the actual token balance of token y.

We can divide both sides of the equation by the price scales. For two tokens, we only need to divide the price scale of token y. Divide both sides of the equation by p of y:
```
xy = (D / 2)^2 / (p_y)
```
This will result in a constant product curve. Now, this D/2 * D/2 * p of y, will represent the liquidity L squared we are used to seeing with a constant product curve.

So when we construct a constant product curve for the graph of this curve v2 AMM, we get this. Then, we do the same for the curve v2 AMM, shown in pink, and we get two constant product AMM curves. If we zoom in, we can see that the constant product curve associated with the pink curve has a higher liquidity than the constant product curve associated with the orange curve.

So, this is how curve v2 compares different curve v2 AMMs, that might have different price scales, and might also have different values for D. Let's see what happens when we decrease or increase D, and change the price scales.

If we increase the value of D, for the pink curve, we can see the liquidity associated with the constant product curve also increases. If we decrease D, the liquidity associated with the constant product curve also decreases.

At this point, we can clearly see that the pool value of this pink curve, is less than the pool value of the orange curve. Another thing that will affect the pool value of the pink curve is by changing the price scales around.

If we increase it, we can see that the pool value also decreases, and if we decrease the price scale, we can see that the pool value increases.
