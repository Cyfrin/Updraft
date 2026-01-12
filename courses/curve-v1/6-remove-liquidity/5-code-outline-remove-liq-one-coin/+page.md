## Removing Liquidity as a Single Coin

We will walk through how the `remove_liquidity_one_coin` function operates.

The first step is to calculate the amount of token to be removed. In the code, this is named `dy`. This calculation also calculates the imbalance fee. 

The function that calculates `dy` and the imbalance fee can be difficult to understand. This function is called `calc_withdrawal_one_coin`. 

Here are three things that the `calc_withdrawal_one_coin` function does:

*   Calculate the `A` parameter
*   Calculate the liquidity `D`
*   Calculate the imbalance fee

Since we are removing liquidity as a single coin, this will have the effect of making the token balances on the pool imbalanced.

Next, we need to update the state variables that keep track of the token balances. After updating the balances, we burn the LP shares that the user specified.

The final step is to transfer the tokens out. 
