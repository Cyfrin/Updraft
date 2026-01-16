# Curve V2 for Two Tokens

Here is the equation of Curve V2 for two tokens:
```
f_curve(x, y, d) = xy + k(x, y, d)(x + y)(d/2)^2 - k(x, y, d)(d/2)^2
```
When using this equation, the x and y are not actual token balances. They are transformed balances. To get the transformed balances, you will multiply the actual balance of the tokens with price scales.

To start, we will graph the Curve V2 equation without a price scale. This is achieved by setting the price scales equal to 1, so that the actual balances are equal to the transformed balances.
```
A = 10
g = 0.2
p1 = 1
D = 10
f_sum(x, y, d) = 0
f_prod(x, y, d) = 0
f_curve(x, y, d) = 0
```
A will be A, G will be gamma, D is liquidity, and P1 is the price scale of token y. Since the price scale of token x is equal to 1, we don't need to put it here.

With a price scale of token x equal to 1, and the price scale of token y also equal to 1, let's see what the graph of Curve V2 will look like.

Here it is. Next, we are going to change the price scale for token y and see how this graph will change. But before we do that, we are also going to graph the equation for constant sum and constant product, to compare. As we change the price scale, it's helpful to see how the graph of the constant sum and the constant product also change. Let's increase the price scale of token y.

Starting from 1, as we increase this, I'll increase it all the way to four. You can see that the flat region of curve V2's graph changed. Notice that the flat region of Curve V2's graph is aligned with the graph of the constant sum amm.

Let's also find the point on Curve V2's graph where the transformed balances are exactly equal to each other. Let's begin by tackling a simpler problem. We'll set the price scale equal to 1, and from Curve V1, we know that D/2 will represent the token balances when the pool is perfectly balanced.

This point will be:
```
(D/2, D/2)
```
This is the point where in Curve V1, token balances are exactly equal to each other. How about in Curve V2 with transformed balances? To answer this question, we can start by looking at the constant sum equation.

The constant sum equation is:
```
x + y = D
```
This D is actually equal to D/2 + D/2. When the token balances of x and y are exactly equal, x will equal D/2, and y will also equal D/2.

How about with transformed balances? With transformed balances, we will use the same equation, but instead of using the actual token balances, we will use the transformed balances. So we will multiply all of the token balances with the price scale. The price scale of token x is 1, so we can leave it untouched. The price scale of y is given by P1.

Now using this equation, we can solve for the actual token balances where the transformed balances are equal to D/2.

The point where the transformed balance of token x will be equal to D/2, is D/2. When x is equal to D/2, this equation will become
```
D/2 + P1y = D/2 + D/2
```
This D/2 we can cancel out with this D/2. Solving for y, we get that the actual token balance of token y should be equal to, and we divide both side of the equation by the price scale P1, and we get
```
y = D / 2P1
```
So when the transformed token balance of x is D/2, the actual token balance of token y must be equal to D/2P1.
Let's now see where this point will be on curve V2's graph as we change the price scale. 

Let's increase the price scale.

This will be the point where the transformed balances are exactly equal to each other. With the actual balances this will be D/2 for token x, and D/2 times the price scale P1 for token y.
Currently the price scale is set to 4. And this number makes sense. Liquidity is 10, so D/2 will be 5. For the actual balance of y, D is 10 divided by 2 times the price scale of 4. So this will be 10 divided by 8, which is equal to 1.25.
