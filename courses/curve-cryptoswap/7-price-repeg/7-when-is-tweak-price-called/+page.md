### When is Tweak Price Called?

Here, we explain the relationship between external functions, the internal function `tweak_price`, and state variables `virtual_price` and `D`.

The user has the option to call functions: `exchange`, `add_liquidity`, `remove_liquidity`, and `remove_liquidity_one_coin`.

In all cases except for the function call `remove_liquidity`, the internal function `tweak_price` is called.

The `tweak_price` function, as the name suggests, is called when the Curve V2 AMM may need to change its price and re-peg. The price changes when the `exchange`, `add_liquidity`, or `remove_liquidity_one_coin` functions are called.

Because we can add single-sided liquidity, when the `add_liquidity` function is called, it may change the internal price of a token.

The `remove_liquidity_one_coin` function changes the ratio of token balances, which may change the internal price.

The `tweak_price` function is called when `exchange`, `add_liquidity`, or `remove_liquidity_one_coin` are called.

However, when `remove_liquidity` is called, it doesn't change the price because all the tokens are withdrawn so the internal price remains the same.

When the function `tweak_price` is called, a decision must be made whether to re-peg or keep the peg the same. When re-pegging, this will affect the `virtual_price` and the variable `D`. First, it will affect the value of `D`. When we re-peg, we're trying to find this new value for `D`, the new center of liquidity. The `virtual_price` is calculated based on this value of `D`. So, when the value of `D` changes, the `virtual_price` is affected as well.

Another factor that will affect the value of `D` is when the functions `exchange`, `add_liquidity`, or `remove_liquidity_one_coin` are called to collect some fees.

A swap fee is collected when the function `exchange` is called, and an imbalance fee is collected when either `add_liquidity` or `remove_liquidity_one_coin` is called.

When fees are collected, this will increase liquidity. So, this value of `D` will also increase, which will affect the `virtual_price`.
