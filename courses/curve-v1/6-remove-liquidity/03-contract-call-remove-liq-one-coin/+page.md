## Remove Liquidity One Coin 

Another common way to remove liquidity is to call the function `remove_liquidity_one_coin`. 

This function will burn the LP shares of the user and then send back a single token specified by the user. 

For example, on the StableSwap3Pool contract, a user could call `remove_liquidity_one_coin` and specify an amount of LP shares to burn. The user could then specify a single token they want all of their liquidity withdrawn in. Let's say for example, they want all of their liquidity withdrawn in DAI. 

The StableSwap contract will calculate the amount of DAI to send back to the user, and then transfer this DAI over to the user. 

The difference between this function and the function `remove_liquidity` is that `remove_liquidity` will send back all three tokens to the user, whereas `remove_liquidity_one_coin` will send back just the single token specified by the user. 
