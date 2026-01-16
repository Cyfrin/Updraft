# Code Walkthrough: `remove_liquidity_one_coin`

In this lesson, we'll be walking through the function `remove_liquidity_one_coin`. This function allows a liquidity provider to specify which token they want their liquidity withdrawn in.

The function takes the following inputs:

`token_amount`: This is the amount of LP shares the liquidity provider wishes to burn.
```javascript
token_amount: uint256,
```
`i`: This is the index of the coin that they want to withdraw their liquidity in.
```javascript
i: uint256,
```

Let's take a look at the function. First, the code calculates `A` and `gamma`.

```javascript
A_gamma: uint256[2] = self._A_gamma()
```

Next, the code initializes some variables:

```javascript
dy: uint256 = 0
D: uint256 = 0
p: uint256 = 0
xp: uint256[N_COINS] = empty(uint256[N_COINS])
approx_fee: uint256 = 0
```

Then, the internal function `claim_admin_fees()` is called.

```javascript
self._claim_admin_fees()
```

After that, the code calls `calc_withdraw_one_coin` to calculate the amount of token that will go out `dy`.
```javascript
dy, D, xp, approx_fee = self._calc_withdraw_one_coin(
            A_gamma,
            token_amount,
            i,
            (self.future_A_gamma_time > block.timestamp)
        )
```

The code then checks that `dy` is greater than or equal to the `min_amount`, which was specified by the caller.
```javascript
assert dy >= min_amount, "Slippage"
```

Next, the token balances are updated. Since only one token is exiting the pool, we only need to update the balance for the token that is going out.
```javascript
self.balances[i] -= dy
```

The code burns the LP tokens from the message sender for the amount of `token_amount`.
```javascript
self.burnFrom(msg.sender, token_amount)
```

The code transfers the token out.
```javascript
self._transfer_out(coins[i], dy, use_eth, receiver)
```
The code calls the internal function `tweak_price` to adjust prices.
```javascript
packed_price_scale: uint256 = self.tweak_price(A_gamma, xp, D, 0)
```

An event is logged, and the amount of token that was transferred out is returned.

```javascript
log RemoveLiquidityOne(
            msg.sender, token_amount, i, dy, approx_fee, packed_price_scale
        )
return dy
```
