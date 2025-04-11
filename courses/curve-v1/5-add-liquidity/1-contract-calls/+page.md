## Introduction to Adding Liquidity

Adding liquidity to a Curve pool is a process where a user provides tokens to a pool in exchange for LP shares. These LP shares represent the user's ownership in the pool.

### Overview of Adding Liquidity 

To add liquidity, a user will call the `add_liquidity` function in the Curve contract. This function requires the user to specify the amount of each token they want to provide to the pool.  The amount of tokens can be any combination of the tokens in the pool, with the amount of one or more of the tokens being equal to zero. For example, if a user wants to add only DAI to the pool, they can set the amount of USDC and USDT to zero.

In the example of the StableSwap3 pool, there are three tokens: DAI, USDC, and USDT. A user can choose to add any combination of these tokens to the pool.

### The Process of Adding Liquidity

1. **Call the Function**: The user calls the `add_liquidity` function in the Curve contract.

2. **Specify Token Amounts**: The user specifies the amount of each token they want to provide to the pool.

3. **Transfer Tokens**: The tokens specified by the user are transferred to the Curve pool contract.

4. **Calculate LP Shares**: The Curve pool contract calculates the amount of LP shares to mint to the user based on the amount of tokens provided.

5. **Mint LP Shares**: The Curve pool contract mints LP shares to the user.

These LP shares represent the user's ownership of the liquidity in the pool. The owner of the LP shares can later withdraw any of the tokens in the pool by exchanging their LP shares back to the pool contract.

