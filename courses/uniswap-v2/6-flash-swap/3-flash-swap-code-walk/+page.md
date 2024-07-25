Let's do a quick walk-through of the code for the UniswapV2Pair contract. This is the function that is called when we do a flash swap.  

The function has six inputs:

- **amount0Out**: The amount of token 0 we want to borrow.
- **amount1Out**: The amount of token 1 we want to borrow.
- **address2**: The address of the smart contract we will call with the function UniswapV2Call.
- **data**: The data that will be passed to the UniswapV2Call function. 
- **token0**: This refers to the first token that is included in the liquidity pool.
- **token1**: This refers to the second token that is included in the liquidity pool. 

After we call the UniswapV2Call function, the function must repay the amount of tokens borrowed plus the fees. 

The only condition required for this code to execute is that the "data" input must not be empty. 
