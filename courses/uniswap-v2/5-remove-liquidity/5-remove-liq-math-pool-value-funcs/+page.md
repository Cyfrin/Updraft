We’ve derived the equation for how much liquidity we should receive when removing liquidity.  Let’s recap that equation.

$\frac{L_0 - L_1}{L_0} = \frac{D_X}{X_0} = \frac{D_Y}{Y_0}$

This equation tells us that when we decrease the liquidity from L0 to L1, then we will have to remove dx amount of token x and dy amount of token y.

So, we’ve derived this equation for how much liquidity we should receive when removing liquidity. Now, let’s talk about how that equation interacts with how we actually define the pool value. Let me write that down.

**True for all 3 functions to measure pool value F(x, y) -> L**

$f(x, y) = \sqrt{xy}$

or

```
F(x, y) = 2x
```

or

```
F(x, y) = 2y
```

This equation is true whether we define the pool value function f(x, y) to be equal to the square root of x * y, or set it equal to 2x, or set it equal to 2y.

Now, when we set the pool value function to 2x and 2y, this equation is straightforward.  So, I’ll leave that as an exercise for you if you’re curious. 

In the next video, we’ll go over the case when we define the pool value function f(x, y) to be equal to the square root of x * y. And then, we’ll derive this equation.  We’ll see how this derivation can be used to provide a conceptual understanding of the equation that we derived for removing liquidity. 
