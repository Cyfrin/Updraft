In the previous video we were introduced to an equation that relates how liquidity changes in a Uniswap V2 constant product market maker (AMM) to changes in the amount of each asset in the pool. The equation is: 

L1 - L0 / L0 = dX / X0 = dY / Y0

Where L0 is the initial liquidity, L1 is the liquidity after adding dX and dY amount of token X and Y, X0 is the initial amount of token X, and Y0 is the initial amount of token Y. 

In this lesson we'll discuss how to define a function that measures the liquidity of a Uniswap V2 pool. This function takes the current amounts of each asset (X and Y) in the pool as input, and outputs the pool's liquidity.

We will define our liquidity function as F(X, Y) = L where:

- F is the function we are defining.
- X is the amount of the token X in the pool.
- Y is the amount of the token Y in the pool.
- L is the liquidity of the pool.

We came up with three different ways to define this function, which we will discuss in the coming lessons.

**#Tag: Diagram of pool liquidity function** 
