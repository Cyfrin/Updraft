## Remove Liquidity: Contract Call 

We will look at the first variation of removing liquidity. To do this, we will call the function `remove_liquidity`.  

This function will burn the liquidity provider's LP shares.  

The pool will then send back all of the tokens that are in the pool. The amounts will be proportional to the amount of LP tokens that were burnt. These tokens will be sent back to the liquidity provider.  

For example, let's say we have a user who calls `remove_liquidity` on the StableSwap 3Pool contract. This contract contains three tokens: 

*   DAI 
*   USDC
*   USDT

The user will specify the amount of LP shares that they want to burn.  

The StableSwap contract will then calculate the amount of each of these tokens:  

*   DAI
*   USDC
*   USDT

that the user is entitled to. It will then burn the shares and send the tokens back to the user. 
