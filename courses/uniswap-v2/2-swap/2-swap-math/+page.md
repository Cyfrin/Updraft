
We saw some examples of swaps using a graph. We took two points on the curve and the difference of the X component and the Y component told us how much of a token we needed to put in and how much of a token we would get out.

In this video, we are going to derive the exact formula for the amount of tokens that go out given the amount of tokens that goes in.

We have the curve $X * Y = L^2$. Let's say that the AMM starts out with the amount of token X = to $X_0$ and the amount of token Y = to $Y_0$. Let's also say that Alice swaps dx for dy. This means that she is going to put in dx amount of token X. This will increase the amount of token X from $X_0$ to $X_0 + dx$. When a token comes in, the other token must go out. So when she puts in dx amount of token X, she's going to get back dy amount of token Y. This is expressed on the graph. The new amount of token Y in the pool is $Y_0 - dy$. 

Notice that from the original amount of token Y it decreased. 

So what we're going to do in this video is given dx we are going to calculate dy.

### Find dy

Before Alice does a swap, the equation $X_0 * Y_0 = L^2$ is true. If we plug in $X_0$ and $Y_0$, we'll get that $X_0 * Y_0$ is equal to $L^2$.

The equation must also be true after Alice does a swap. This is called an invariant.

So before Alice does a swap, $X_0 * Y_0$ must be equal to $L^2$.  When this equation is satisfied this tells us that this point ($X_0, Y_0$) is on this curve.

After we do a swap, remember that we said that the new point must also be on this curve. To express this mathematically, what we want to say is, after the swap the new point must also satisfy the equation.

So, what is the new point? The new point will be $X_0 + dx$ for the X component and $Y_0 - dy$ for the Y component.

So, before we do a swap, the equation $X * Y$, plugging in $X_0$ and $Y_0$ must be equal to $L^2$. And after we do a swap, the equation X * Y for the X, we plug in $X_0 + dx$, and for the Y, we plug in $Y_0 - dy$, must also be equal to $L^2$.

Notice that we have a dy. So, if we relate these two equations, we might be able to solve for dy.  We'll copy both the equations and paste them.

Notice that both of them are equal to $L^2$. So, what I can do is say $X_0 * Y_0$ is equal to $(X_0 + dx) * (Y_0 - dy)$. We can divide both sides of the equation by $X_0 + dx$. This will bring $X_0 + dx$ over to the left side.

Then we will add dy to both sides of the equation. So, dy comes over here. So, this will be dy plus.  We will then bring this over to the right side.

So, this is the equation that we have so far. Now, we can simplify the right side. We are going to multiply $Y_0$ by $X_0 + dx$, divided by $X_0 + dx$. We're just multiplying by one so it does not change the equation.

Now, we can simplify the equation. So, we have this equation and we'll bring this over to the top. So, the top will be $Y_0 * X_0 + Y_0 * dx$, and then minus this expression. The bottom is the same so we can combine these two equations together. We will bring the negative to the top. Then, we have a common denominator of $X_0 + dx$.

Notice that on top, we have $Y_0 * X_0 - X_0 * Y_0$. So, these two cancel out. We clean up the equation, and we're left with $Y_0 * dx$ divided by $X_0 + dx$ is equal to dy.

So, this is the equation for how to calculate dy. If we know the amount of token X, and the amount of token Y in the AMM, and then if we also know the amount of token that we're putting in, dx, then we can calculate the amount of token that we will get out. This is dy.

This equation will calculate the amount of token Y that will come out. However, here we're assuming that the swap fee is equal to zero. So, this equation will give us dy without the fees.

In the next video, we'll modify this equation and also include swap fees. 
