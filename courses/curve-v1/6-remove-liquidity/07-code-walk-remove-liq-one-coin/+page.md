##  Removing Liquidity 

We can call a function to remove liquidity from the pool. If we want to remove liquidity in one coin, then we can call the `remove_liquidity_one_coin()` function. 

For example, inside the StableSwap3Pool.vy, the tokens are DAI, USDC, and USDT. If we call the function `remove_liquidity_one_coin()`, then it will give us back all three tokens.

Let's say that we wanted to just withdraw USDC. Then, we would call `remove_liquidity_one_coin()`, and then specify the token that we want to withdraw. 

For the inputs, it's going to take in the `token_amount`. This will be the LP token to be burnt. 

It's going to take in the `index` of the token to withdraw, and the minimum amount of token that you expect to receive. 

```javascript
def remove_liquidity_one_coin(token_amount: uint256, i: int128, min_amount: uint256):
```

Based on the token that we want to receive, it calculates `dy`. This will be the amount of the single token that you will receive. This calculation is done by an internal function called `calc_withdraw_one_coin()`. 

```javascript
dy: uint256 = 0
dy_fee: uint256 = 0
dy_fee = self.calc_withdraw_one_coin(token_amount, i)
assert dy >= min_amount, "Not enough coins removed"
```

It then checks that this `dy` is greater than or equal to the minimum amount specified by the user. It updates the token balances, minus `dy` from the current balance of tokens, and also a fraction of `dy_fee` is given to the AMM. 

```javascript
self.balances[i] -= (dy + dy_fee * self.admin_fee / FEE_DENOMINATOR)
self.token.burnFrom(msg.sender, token_amount) # dev: insufficient funds
```

Then, we burn the LP tokens, send the tokens by calling the `transfer()` function, and that completes the function `remove_liquidity_one_coin()`.

```javascript
_response: Bytes[32] = raw_call(
   self.coins[i],
   concat(
      method_id("transfer(address,uint256)"),
      convert(msg.sender, bytes32),
      convert(dy, bytes32),
   )
)
```

One thing to note here, is that remember that when we added liquidity, there was an imbalance fee. Now, we have this function called `remove_liquidity_one_coin()`, which will allow us to remove liquidity per one coin. 

So, if we do add liquidity with one coin and then remove liquidity with another coin, this is like swapping a token. And, if there wasn't any imbalance fee, then this is like swapping without any swap fees. So, that is why there is an imbalance fee when we add or remove liquidity in a way that makes the pool unbalanced. 
