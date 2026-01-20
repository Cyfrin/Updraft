## Pool Shares

In this lesson, we will derive an equation to calculate how many pool shares we need to mint when we add liquidity to a Uniswap V2 pool.

We will use the following variables:

* **S = shares to mint**
* **T = total shares**
* **L1 = liquidity after adding liquidity**
* **L0 = liquidity before adding liquidity**

We know that the ratio of tokens we provide when adding liquidity (dY / dX) must equal the spot price. This relationship can be expressed as: 

$\frac{L_1 - L_0}{L_0} = \frac{dx}{x_0} = \frac{dy}{y_0}$

This equation indicates that the change in liquidity (L1 - L0) relative to the initial liquidity (L0) is equivalent to the amount of token X (dX) we provide divided by the initial amount of token X (X0).  Similarly, it's equal to the amount of token Y (dY) we provide divided by the initial amount of token Y (Y0).

Using this information, we can derive the following equation for the number of shares to mint:

$S = \frac{(L_1 - L_0)}{L_0}) * T$

This equation tells us the number of shares (S) we need to mint based on the change in liquidity (L1 - L0), the initial liquidity (L0), and the total number of shares (T).

We will explore this equation in more detail in future lessons. 
