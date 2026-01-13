To swap tokens with the Curve's B1AMM, we will call the function `exchange`. 

For example, let's say that this user wanted to swap DAI for USDC from the StableSwap3Pool contract.

First, we will call the function `exchange` specifying that the token in is DAI and the amount of DAI to swap.

The StableSwap3Pool contract will transfer the DAI in from the user over to the pool contract, calculate the amount of USDC to get back and then transfer the USDC from the pool contract over to the user. 
