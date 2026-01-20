## Constant Sum AMM

We're going to discuss a different type of AMM called a constant sum AMM.

The mathematical equation for a constant sum AMM is:

```
x + y = L 
```

Where *x* and *y* are the token balances.

For example, let's say we have starting token balances of 100 for *x* and 100 for *y*. 

Similar to a constant product AMM, the token balances must fall on a line (we'll call it the orange line). We'll disregard any negative values; all token balances must be greater than or equal to 0.

Let's say we add 50 *x* tokens. The new *x* balance will be 150. Since the token balances must be on the orange line, the *y* balance must be 50.

The difference between constant sum and constant product is that the exchange rate for a constant sum AMM is always 1:1. For every *x* token added, a *y* token is removed. And this is true no matter how many *x* tokens are added. 

For example, if we add 75 *x* tokens, 75 *y* tokens will be removed. 

The same is true if we remove *x* tokens. Let's say we remove 50 *x* tokens. We started with *x* = 100, so now *x* = 50. To maintain balance on the orange line, we must add 50 *y* tokens.

The important takeaway with a constant sum AMM is that the amount of tokens you put in is the amount of tokens you get out. The exchange rate is always 1:1. 
