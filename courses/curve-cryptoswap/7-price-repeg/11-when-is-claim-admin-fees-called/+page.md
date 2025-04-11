### When is `claim_admin_fees` Called?

The internal function `claim_admin_fees` is called when the functions `add_liquidity`, `remove_liquidity` or `remove_liquidity_one_coin` are called.  This function claims the fees that have been collected, and mints LP shares based on the amount of fees claimed. Because it mints LP shares, this increases the total supply, which will affect the virtual price.  

Claiming admin fees will also affect the state variable D and the state variables that are used to track the growth of the pool.  These two state variables are `xcp_profit` and `xcp_profit_a`. The variable `xcp_profit_a` stores the `xcp_profit` value after the last time `claim_admin_fees` was called.
These are the external functions that call the internal function `claim_admin_fees` and some of the state variables that are updated when this function is called.
