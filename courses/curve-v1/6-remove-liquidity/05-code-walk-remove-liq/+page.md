## Removing Liquidity from a Curve AMM

Let's discuss the function for removing liquidity from a Curve AMM. 

There are several options when it comes to removing liquidity from Curve's AMM. 

* If you want to remove liquidity in a balanced way, you will be returned all of the tokens in the pool, proportional to your LP tokens.
* You can also remove liquidity by specifying the amount of tokens to remove.
* Lastly, you can remove only one coin as liquidity.

The function we'll look at first is called `removeLiquidity()`. It's going to take in `amount`, which will be the amount of LP tokens to burn, and `minAmounts`, which will be the minimum amounts of tokens to return.

```javascript
@external
@nonreentrant('lock')
def remove_liquidity(amount: uint256, min_amounts: uint256[N_COINS]):
```

First, it caches the state variable `total_supply`. This will be the total supply of LP tokens.

```javascript
total_supply: uint256 = self.token.totalSupply()
```

Next, it initializes an array called `amounts` and `fees`. 

```javascript
amounts: uint256[N_COINS] = empty(uint256[N_COINS])
fees: uint256[N_COINS] = empty(uint256[N_COINS])  # Fees are unused but we've got them historically in events
```

When we remove liquidity by calling this function, there is no imbalance fee, since all of the tokens will be removed in proportion to the LP tokens.

Inside the for loop, we can see that it calculates each `value` to be sent by taking the balance of the coins, multiplying by the LP tokens to be burned, and dividing by `total_supply`.

```javascript
for i in range(N_COINS):
    value: uint256 = self.balances[i] * amount / total_supply
    assert value >= min_amounts[i], "Withdrawal resulted in fewer coins than expected"
```

Then it checks that the `value` to be sent to the caller is greater than or equal to the minimum amount specified by the caller.

```javascript
    self.balances[i] -= value
    amounts[i] = value
```

It updates the balance, then stores the `value` to be sent in an array called `amounts`.

```javascript
_response: Bytes[32] = raw_call(
    self.coins[i],
    concat(
        method_id("transfer(address,uint256)"),
        convert(msg.sender, bytes32),
        convert(value, bytes32),
    ),
    max_outsize=32,
)
```

The next part of the code actually transfers the tokens to the message sender for the amount `value` that was calculated earlier. It also emits an event called `RemoveLiquidity`.

```javascript
    assert convert(_response, bool), "dev: failed transfer
self.token.burnFrom(msg.sender, amount)  # dev: insufficient funds
log RemoveLiquidity(msg.sender, amounts, fees, total_supply, amount)
```

This function is called if you want to burn your LP tokens and in return, receive all of the tokens inside the pool in the ratio of LP tokens that you burned. 
