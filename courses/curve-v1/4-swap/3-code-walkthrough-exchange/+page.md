We are going to walk through the `exchange` function that is used to swap tokens on a Curve B1AMM.

### The `exchange` Function

The `exchange` function takes in the following parameters:

* `i`: The index of the token coming in.
* `j`: The index of the token going out.
* `dx`: The amount of the token coming in.
* `min_dy`: The minimum amount of token you expect to get back. If this is not met, the function will fail.

### Normalizing Token Balances

First, we will create an array called `rates`. This is a constant value for the `StableSwap3Pool.vy` contract and is set to `1e18, 1e30, 1e30`.

We then store the balances of the tokens in an array called `old_balances`. The `old_balances` array will contain the balances of `DAI`, `USDC`, and `USDT`.

Then, the function will normalize the balances by calling the `_xp_mem` function.

### Transferring Tokens

Next, we will transfer the token in into the pool contract by calling the `transferFrom` function, which is encoded using a `raw_call`.

The `raw_call` is used instead of the ERC20 interface because some tokens, like USDT, do not return a boolean when the `transferFrom` function is called.

We then get the address of the token that will come in and store it in a variable called `input_coin`. We also check if the token has a fee on transfer. If it does, we calculate the fee by calling the `balanceOf` function on the input token.

The difference between the balance before and after transferring the token will be the actual amount that came into the pool.

### Calculating the Amount Out and Fee

We then perform some calculations to determine the amount of token that will go out and the associated fee. We will call these variables `dy` and `dy_fee`.

* `x`: This represents the normalized balance of the token coming in.
* `xp`:  This is the normalized balance of the token going out.
* `y`: This is the new normalized balance of the token going out, calculated by calling the `getY` function.

We then subtract the new normalized balance from the current normalized balance to get `dy`. We then subtract the amount of the fee from the `dy` and store the result in `dy_fee`. 

### Updating Token Balances

Next, we will update the token balances to reflect the changes that have occurred. We are basically just adding the amount that came in and subtracting the amount going out and the admin fee.

* The balance of the token that came in is updated by adding the actual amount that came in, `dx_w_fee`.
* The balance of the token going out is updated by subtracting the amount that went out, `dy`.
* The admin fee is calculated as a fraction of the `dy_fee`.

Finally, we log the token exchange event.

### Summary

In essence, the `exchange` function takes in tokens, normalizes the balances, transfers the tokens in and then out, and then updates the balances of the tokens. 
