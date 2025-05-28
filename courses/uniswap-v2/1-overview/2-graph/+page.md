## Introduction to Constant Product AMMs

We are going to look at the constant product AMM, a type of decentralized exchange, and what we call *liquidity*. We can see how an AMM works by looking at a graph of a constant product function. This graph shows all possible combinations of tokens in the pool.

The function used for the constant product AMM is defined as:


$x * y = L^2$


Where:

* x = amount of token X
* y = amount of token Y
* L = liquidity

**Example:** 

In this example, we see an AMM where:

* x = 200
* y = 200
* L = 200

This means the liquidity of the AMM is 200, and all combinations of token X and token Y that satisfy the function $x * y = L^2$ are valid.

**How does the curve determine the amount of token that goes out in a trade?**

Let's look at a trade scenario where we begin with an AMM with 200 token X and 200 token Y. If a trader adds 200 tokens Y, the AMM will move to the point on the curve where the x-coordinate is 100 and the y-coordinate is 400. This means that the AMM will have to remove 100 token X from the pool to maintain the constant product. The difference between the initial value of Y and the new value of Y determines how much token Y goes out. 

**What is L?**

L represents the *liquidity* of the AMM. The bigger the L value, the bigger the curve gets and the more smooth it becomes.  This means that traders will get a better price for the same amount of token. 

**Example:**

If we start with an AMM where x = 400 and y = 400, and L = 400, adding 200 tokens X results in x1 = 600 and y1 = 266.66667. In this case, the amount of token Y removed from the pool (dY) will be 133.33333. 

We can see that as L increases, the amount of token Y that can be acquired for the same amount of token X increases.
