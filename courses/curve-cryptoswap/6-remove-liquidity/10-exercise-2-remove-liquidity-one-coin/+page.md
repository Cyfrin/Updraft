### Exercise 2: remove_liquidity_one_coin

For our second exercise on removing liquidity, we will call the `remove_liquidity_one_coin` function.

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

First, we will setup our contract with 1000 USDC as liquidity. Then, we will return all of the LP shares owned by the contract back to the pool contract. Finally, we will withdraw the liquidity in a single token, USDC.
