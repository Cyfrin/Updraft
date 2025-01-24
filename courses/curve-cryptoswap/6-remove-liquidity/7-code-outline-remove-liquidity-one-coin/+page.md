`remove_liquidity_one_coin` Function Outline

Let's explore the process of the `remove_liquidity_one_coin` function.

```python
@external
@nonreentrant('lock')
def remove_liquidity_one_coin(_token_amount: uint256, i: int128, min_amount: uint256):
    """
    Remove _amount of liquidity all in a form of coin i
    """
    assert not self.is_killed  # dev: is killed

    dy: uint256 = 0
    dy_fee: uint256 = 0
    dy, dy_fee = self._calc_withdraw_one_coin(_token_amount, i)
    assert dy >= min_amount, "Not enough coins removed"

    self.balances[i] -= (dy + dy_fee * self.admin_fee / FEE_DENOMINATOR)
    self.token.burnFrom(msg.sender, _token_amount)  # dev: insufficient funds

    # "safeTransfer" which works for ERC20s which return bool or not
    _response: Bytes[32] = raw_call(
        self.coins[i],
        concat(
            method_id("transfer(address,uint256)"),
            convert(msg.sender, bytes32),
            convert(dy, bytes32),
        ),
        max_outsize=32,
    )  # dev: failed transfer
    if len(_response) > 0:
        assert convert(_response, bool)  # dev: failed transfer

    log RemoveLiquidityOne(msg.sender, _token_amount, dy)
```

First, we calculate `A` and `gamma`. Then, we call the internal function `claim_admin_fees`.

After that, we call another internal function to calculate `dy`, `D`, and `fee`.  `dy` represents the amount of token that will be returned, `D` is the new value, and `fee` is the fee charged for removing liquidity from one coin.

Next we update the `token out` balance and then `burn LP shares`.

Finally, we `transfer token out` and invoke another internal function, `tweak_price`.
