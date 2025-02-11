## Uniswap V3 Liquidity Math

When adding or removing liquidity from a Uniswap V3 pool, we might have some questions. For instance, we might wonder how to calculate the amount of token x and the amount of token y to add liquidity given a price range. Alternatively, if we are removing liquidity, we might wonder what amounts of token x and token y will be returned. These questions can be answered by two equations, but we first need to derive an equation for liquidity, given the amount of token x, the amount of token y, price ranges, and the current price. In this lesson, we will derive an equation for finding liquidity given x, y, the current price p, p lower, and p upper.

In one of the previous videos, we derived the equations:

```javascript
x = L / sqrt(P lower) - L / sqrt(P upper)
y = L sqrt(P upper) - L sqrt(P lower)
```

We will be using these equations to derive the equation for liquidity.

First, we will consider the case where the current price p is less than or equal to p sub a. In this case, the liquidity will all be in token x, because for the current price p to swing from p sub a to p sub b, the corresponding amount of token x must exit the pool. So, in this case, what is the equation for liquidity? We will use our x equation from above.

```javascript
x = L / sqrt(P lower) - L / sqrt(P upper)
```
We then replace p lower with p sub a, and p upper with p sub b, like so:
```javascript
x = L / sqrt(P sub a) - L / sqrt(P sub b)
```
Now, we can factor out L on the right side:
```javascript
x = L ( 1 / sqrt(P sub a) - 1 / sqrt(P sub b) )
```
We can then flip the equation around, so that x is on the right side:
```javascript
L ( 1 / sqrt(P sub a) - 1 / sqrt(P sub b) ) = x
```
Then, we can divide both sides by the terms in the parenthesis to get an equation for L:
```javascript
L = x / ( 1 / sqrt(P sub a) - 1 / sqrt(P sub b) )
```
This is the equation for liquidity L, given token x and the price ranges p sub a and p sub b. In Uniswap's code, you will see this equation in a different form:

```javascript
L = x * sqrt(P sub a) * sqrt(P sub b) / (sqrt(P sub b) - sqrt(P sub a))
```

The way to get from the first equation to the second is through some algebra on the denominator.

Next, we will derive the equation for liquidity when the current price P is above p sub b.
For the case when p sub b is less than or equal to P, the liquidity will all be in token y. For the current price to swing from p sub b down to p sub a, the y amount must exit the pool. 
Now, to derive the equation for liquidity, we'll use our y equation from above:

```javascript
y = L sqrt(P upper) - L sqrt(P lower)
```
Here, p upper will be p sub b, and p lower will be p sub a:

```javascript
y = L sqrt(P sub b) - L sqrt(P sub a)
```
Now we can factor out liquidity L:
```javascript
y = L (sqrt(P sub b) - sqrt(P sub a))
```
Then, we can flip the equation and move the y to the right side

```javascript
L (sqrt(P sub b) - sqrt(P sub a)) = y
```

Finally, to get the equation for liquidity, divide both sides by the term in the parentheses:

```javascript
L = y / (sqrt(P sub b) - sqrt(P sub a))
```
And this will be the equation for liquidity L when the current price is above p sub b.

Finally, we will consider what happens when the current price is between the price ranges p sub a and p sub b. 
The liquidity between the price ranges p to p sub b will all be in token x, and the liquidity between p and p sub a will all be in token y. These two liquidities are not necessarily equal, so we'll label them separately.
We will call L sub x the liquidity from current price p to p sub b, and L sub y the liquidity from p sub a to the current price p.
To start with, we will derive the equation for L sub x, the liquidity from the current price to p sub b.

We will use this equation from the first case:
```javascript
L = x / ( 1 / sqrt(P sub a) - 1 / sqrt(P sub b) ) = x * sqrt(P sub a) * sqrt(P sub b) / (sqrt(P sub b) - sqrt(P sub a))
```
Since the lower price is now the current price p, we replace p sub a with p:

```javascript
Lx = x / (1 / sqrt(P) - 1 / sqrt(P sub b))
```
This is the equation for liquidity between the current price to the upper price. Now to derive the equation for the lower price range, we will use this equation for liquidity from the second case:

```javascript
L = y / (sqrt(P sub b) - sqrt(P sub a))
```
Since p upper is now the current price p, we replace p sub b with p:
```javascript
Ly = y / (sqrt(P) - sqrt(P sub a))
```

And now we have the liquidity between the price range p sub a to current price p.
With that, we now know how to derive the equations for liquidity under all three price ranges.
