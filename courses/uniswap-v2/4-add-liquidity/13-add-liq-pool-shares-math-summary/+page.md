## Pool Shares

We've been talking about pool shares and liquidity, so let's summarise what we've learned about this. 

We learned that the number of shares we need to mint is described by the equation below. 

```
S = (L1 - L0) / L0 * T
```

This equation uses the following variables:

* **S** = shares to mint
* **T** = total shares
* **L1** = liquidity after
* **L0** = liquidity before

We also saw that the expression (L1 - L0) / L0 can be simplified in a few ways. This expression is equal to both dx / x0 and dy / y0, where:

* **dx** represents the change in the amount of token X we hold
* **x0** is the initial amount of token X
* **dy** represents the change in the amount of token Y we hold
* **y0** is the initial amount of token Y.

We can express all of this in the equation below:

```
(L1 - L0) / L0 = dx / x0 = dy / y0 
```

We saw that this equation holds true in all three ways of defining the pool value function.  If we substitute (L1 - L0) / L0 in the first equation, we get:

```
S = dx / x0 * T = dy / y0 * T
```

This equation tells us that the number of shares to mint is equal to dx / x0 times the total shares, and it's also equal to dy / y0 times the total shares. 
