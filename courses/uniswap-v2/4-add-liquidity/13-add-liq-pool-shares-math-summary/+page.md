## Pool Shares

We've been talking about pool shares and liquidity, so let's summarise what we've learned about this. 

We learned that the number of shares we need to mint is described by the equation below. 

$S = \frac{L_1 - L_0}{L_0}T$


This equation uses the following variables:

* **S** = shares to mint
* **T** = total shares
* **L1** = liquidity after
* **L0** = liquidity before

We also saw that the expression $\frac{(L_1 - L_0)}{L_0}$ can be simplified in a few ways. This expression is equal to both $\frac{dx}{x_0}$ and $\frac{dy}{y_0}$, where:

* **dx** represents the change in the amount of token X we hold
* **x0** is the initial amount of token X
* **dy** represents the change in the amount of token Y we hold
* **y0** is the initial amount of token Y.

We can express all of this in the equation below:

$\frac{L_1 - L_0}{L_0} = \frac{dx}{d_0} = \frac{dy}{y_0}$


We saw that this equation holds true in all three ways of defining the pool value function.  If we substitute (L1 - L0) / L0 in the first equation, we get:

$S = \frac{dx}{x_0}T = \frac{dy}{y_0}T$

This equation tells us that the number of shares to mint is equal to dx / x0 times the total shares, and it's also equal to dy / y0 times the total shares. 
