We're going to take a look at the `get_y` function in the StableSwap pool, which is part of Curve v1. 

The `get_y` function takes in the indexes of the token in and token out, along with the new balance of token in and the normalized balances of all tokens except the token out. 

The function then uses Newton's method to calculate the new balance of the token out. To do this, it calculates various variables like `amp`, `D`, `c`, `S_`, `Ann`, and `b`. 

We're going to focus on the equation used for calculating the `c` variable:

```javascript
c = D**(n+1) / (n**n * p)
```

Where:

* `D` represents the liquidity of the pool.
* `n` is the number of tokens in the pool.
* `p` is the product of the normalized balances of all tokens except the token out.

We can also see how the `S_` variable is calculated:

```javascript
S_ = sum(x[i] for i != j)
```

Which is the sum of all token balances except the token out.

Finally, the function calculates `b` using:

```javascript
b = (Ann * S_ + D * Ann) / Amm - D
```

Where:

* `Ann` represents `a` * `n` to the `n`.
* `Amm` represents `a` * `n` to the `n` * `n`.

These variables `c`, `D`, `S_`, and `b` are used to calculate the new balance of the token out. 

The function then runs a for loop, iterating a maximum of 255 times. In each iteration, it uses Newton's method to update the value of `y`, which represents the new balance of the token out.

The equation used in the for loop is:

```javascript
y = (y * y * c) / (2 * y * b - D)
```

This equation is equivalent to Newton's method for finding the root of a function.

The loop continues to update `y` until the difference between the new `y` and the previous `y` is less than or equal to one. When this condition is met, the function returns the value of `y`, which represents the calculated new balance of the token out.

