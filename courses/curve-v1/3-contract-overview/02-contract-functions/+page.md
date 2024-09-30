The StableSwap contract can hold any number of tokens. For example, the StableSwap3Pool contract manages the tokens DAI, USDC, and USDT. Another example we saw was the STEF4 which holds two tokens, EIF and STEIF. 

We will cover five functions that are common to all StableSwap contracts. These are:

*   exchange
*   add\_liquidity
*   remove\_liquidity
*   remove\_liquidity\_imbalance
*   remove\_liquidity\_one\_coin

The `exchange` function is used to swap tokens. `add_liquidity` is used to add tokens to the pool. 

For removing liquidity, there are several variations. The `remove_liquidity` function will return the liquidity providers all of the tokens. `remove_liquidity_imbalance` will give the user an option to specify how many of each token they wish to get back. `remove_liquidity_one_coin` allows the user to specify the token they want to get back as a single token. 
