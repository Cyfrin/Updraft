## Introduction to Constant Product AMMs

We'll take a look at the two most well-known mathematical equations that are used for AMMs: constant product AMMs and constant sum AMMs. In this video, we'll explain about constant product AMMs.

The constant product AMM is based on an equation called x * y = L^2, where x and y are token balances.

For example, think that token x will be ETH and token y will be DAI, the stablecoin DAI. The token balances in the AMM contract and this equation will define a curve (**add diagram tag here**). This curve shows that the token balances in the contract must be a point on this curve.

For example, let's say that we have 100 token x. What is the amount of token y that must be locked inside this AMM contract? The token balances must be a point on the curve. So, when token x is 100, token y must also be equal to 100.

Now, let's imagine that there's a swap and it would change the token balance. For example, let's say that 100 token x came in. The new token balance for token x will be 200. Again, the token balances must be on the curve. For that to be true, the token y balance must be equal to 50. The difference from 100 token x and 100 token y to 200 token x and 50 token y determines the amount of token that must come in and the amount of token that must go out of the AMM. That is how the AMM calculates the amount of token to give back to the user. 

In this example, we started out with 100 token x and 100 token y. Let's say that the user put in 100 token x. The AMM says that 50 token of token y must go out. Hence, this 50 token will be sent back to the user and the new token balance in the AMM will be 200 token x and 50 token y. 
