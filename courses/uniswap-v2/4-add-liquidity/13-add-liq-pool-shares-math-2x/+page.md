## Defining Pool Value

We're going to cover how we can define the value of a pool. We can do this in a couple of ways, we're going to cover both.

The first way we can define the value of the pool is to say that the function _F_ which takes in the amount of tokens in the pool _X_ and _Y_ is equal to twice the amount of _X_ in the pool.

```
F(X, Y) = 2 * X = Value of pool in token X
```

This is just one way to define it. We could do it as twice _Y_ as well.

The other way to define the value of the pool is to say that the function _F_ which takes in the amount of tokens in the pool _X_ and _Y_ is equal to twice the amount of _X_ in the pool. 

We are trying to measure the amount of token _X_ in the AMM and the amount of token _Y_ in the pool when we convert it into terms of token _X_.

For example, let's say that we have an AMM with 6 million DAI and 3,000 ETH. We'll measure the value of this pool in terms of DAI by first saying _X0_ , which is the amount of DAI in the pool, plus _Y0_. _Y0_ is the amount of ETH in the pool. So we'll somehow need to convert this number in terms of DAI.

```
Motivation
X0 = 6,000,000 DAI
Y0 = 3000 ETH
F(X0, Y0) = X0 + Y0
```

We call this the *spot price of Y in terms of X*. This is equal to _Y_ divided by _X_.

```
X/Y = Spot price of Y in terms of X
```

So if we flip this around, _X_ divided by _Y_ would be the spot price of token _Y_ in terms of token _X_.

Now we can use this to convert this _Y0_ in terms of token _X_.

We multiply _Y0_ by the spot price of _Y0_. 

$F(X_0, Y_0) = X_0 + Y_0 * \frac{X_0}{Y_0}$


The _Y0_ on the top and the _Y0_ on the bottom cancel out, and this turns out to be 2 times _X0_.

$F(X_0, Y_0) = X_0 + Y_0 * \frac{X_0}{Y_0} = 2 * X_0$


So this is the motivation for saying that _F_ of _X_ and _Y_ is equal to $2X_0$. We are measuring the value of this AMM in terms of token _X_. The first term simply comes from the amount of token _X_ that is inside the pool. And the second term comes from converting the amount of token _Y_ in terms of token _X_.

Let's go over an example. _X0_ is 6 million DAI and _Y0_ is 3,000 ETH.

$F(X_0, Y_0) = X_0 + Y_0 * \frac{X_0}{Y_0} = 2 * X_0$

$= 6,000,000 DAI + \frac{6,000,000 DAI}{3000 ETH} * 3000ETH$

$= 12,000,000 DAI$


Next, using this definition as the value of the pool, let's calculate _L1_ minus _L0_ over _L0_.

$\frac{L_1 - L_0}{L_0}$

Let's start with _L1_. Again, _L1_ will be the value of the pool after adding liquidity. After adding _dX_ and _dY_ amounts of tokens, by definition this is equal to _F_ of _X0_ plus _dX_ , _Y0_ plus _dY_.

$\frac{L_1 - L_0}{L_0} = \frac{F(X_0 + d_X, Y_0 + d_Y) - F(X_0, Y_0)}{F(X_0, Y_0)}$

_L0_ is liquidity before adding liquidity. This is simply _F_ of _X0_ and _Y0_.

$\frac{L_1 - L_0}{L_0} = \frac{F(X_0 + d_X, Y_0 + d_Y) - F(X_0, Y_0)}{F(X_0, Y_0)}$

$= \frac{2(X_0 + d_X) - 2X_0}{2X_0}$

The 2s cancel out and the _X0_ on the top cancel out, and we are left with _dX_ divided by _X0_.
    
$= \frac{d_X}{d_Y}$


So this shows that when we define the pool value function as 2X, then _L1_ minus _L0_ divided by _L0_ is equal to _dX_ divided by _X0_.

Now we can do something similar and define _F_ of _X_ and _Y_ to be 2 times _Y_. And we will get that _L1_ minus _L0_ over _L0_ is equal to _dY_ divided by _Y0_.

```
F(X, Y) = 2 * Y = Value of pool in token X
```
