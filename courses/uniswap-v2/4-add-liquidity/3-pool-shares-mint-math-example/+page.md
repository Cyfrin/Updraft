Let's take a look at an example to understand how to calculate the amount of shares to mint when a deposit is made into a liquidity pool.

We'll say the value of the pool before the deposit is made is 1,100 USDC. We are measuring the value of the pool by the amount of USDC inside the pool contract. We'll call this state L0. 

L0 = 1,100 USDC.

A deposit of 110 USDC is then made. We'll call this state L1.

L1 = 1,210 USDC.

Let's visualize this with a pie chart. The purple portion of the pie represents the amount of USDC in the pool before the deposit, L0. The green portion represents the deposit that was made, L1 - L0. The total value of the pool in state L1 is 1,210 USDC.  

We're going to mint shares to reflect this change. To do this, we'll use the following equation:

$S=\frac{L_1 - L_0}{L_0}T$

Where:

* S is the amount of shares that will be minted
* L0 is the total value of the pool before the deposit
* L1 is the total value of the pool after the deposit
* T is the total number of shares before the deposit

We'll say that we have 1,000 total shares before the deposit. Using our equation, we can plug in the values for L1, L0, and T.

$S=\frac{1210 - 1100}{1100}*1000$

This simplifies to:

1. $S=\frac{110}{1100}*1000$
2. $S = 100$

We must mint 100 shares to reflect the 10% increase in the pool's value. Now, the total shares in the pool are 1,100. 
