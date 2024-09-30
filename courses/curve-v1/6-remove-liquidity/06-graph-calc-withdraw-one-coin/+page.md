## Introduction to Liquidity Removal in One Coin

When we want to withdraw liquidity from a Curve pool, we have the option to withdraw all liquidity in a single coin, or just one coin at a time. This lesson will explore how liquidity removal in one coin is calculated.

Let's say we have a StableSwap 3pool with the following tokens:
* DAI
* USDC
* USDT

If we want to remove our liquidity in one coin, we can use the `remove_liquidity_one_coin` function. This function takes the following parameters:

* `token_amount`: The amount of LP tokens to burn
* `i`: The index of the token to withdraw

To calculate the amount of tokens that will be sent back to us, we can use the `calc_withdraw_one_coin` function. This function will:

1. **Get the current D.** 
2. **Solve the AMM equation y(x) for D - token_amount.** 
3. **Calculate the amount of the desired token to withdraw.**

Let's use a visual example to understand this concept.

Imagine we have a Curve v1 AMM with a total liquidity (D) of 20. Let's say the current token balances are X = 6.57 and Y = 13.52, as shown by the orange dot on the graph. If we decide to reduce our liquidity by 50%, we will decrease D to 10. Since we're only removing liquidity in one coin, let's say token Y, the token X balance should remain the same. As shown in the graph, the ideal token balance after the removal of liquidity in token Y will be X = 6.57 and Y = 6.76, as shown by the green dot on the graph. Notice that we have decreased the total liquidity by 50% (from D = 20 to D = 10). The new token balance on the curve is the intersection of the vertical line that extends from the original token balance of token X and the new liquidity curve, as shown by the pink line. 

The difference between the original token Y balance and the new balance will give us the amount of token Y that the user will receive. 

The actual amount of tokens that the user will receive will be slightly less than the ideal amount due to fees. Fees will be deducted from the amount of tokens calculated by the `calc_withdraw_one_coin` function. 
