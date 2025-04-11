## Code Walkthrough: remove_liquidity Function

In this lesson, we are discussing the `remove_liquidity` function, which allows a liquidity provider to withdraw tokens by burning their LP shares.

The inputs are:

*   `_amount` which is the amount of LP shares that the liquidity provider is going to burn
*   `min_amounts` is the minimum amount of tokens in the pool that the liquidity provider wishes to get back
*   `use_eth` is a boolean to indicate if we should withdraw ETH
*   `receiver` which is the address to send the withdrawn tokens to
*  `claim_admin_fees` is a boolean for whether to call `self._claim_admin_fees()`. Default is true.

The function returns `uint256[3]`, the amount of pool tokens received by the receiver.

Now, let�s take a look inside the function body. First, several variables are initialized:

```javascript
amount: uint256 = _amount
balances: uint256[N_COINS] = self.balances
d_balances: uint256[N_COINS] = empty(uint256[N_COINS])
```

The `balances` variable holds the amount of tokens in the pool from the state variable `self.balances`. Then, an empty array of `d_balances` is created to track the tokens that are to be withdrawn.

Next, there is an if conditional, which states:

```javascript
if claim_admin_fees:
    self._claim_admin_fees()
```

Which calls the `claim_admin_fees` function if the input `claim_admin_fees` is true. After this, the total supply is stored in a local variable `total_supply`.

```javascript
total_supply: uint256 = self.totalSupply
```

Then, we call `self.burnFrom()` to burn the LP shares from the message sender.

```javascript
self.burnFrom(msg.sender, _amount)
```

There are two cases for withdrawing tokens from the pool.

Case 1: The withdrawal does not empty the pool. In this case, D, or the invariant, is adjusted proportional to the amount of LP tokens burnt. ERC20 tokens transferred is proportional to the formula: (AMM balance \* LP tokens in) / LP token total supply.

Case 2: The withdrawal empties the pool. In this situation, all tokens are withdrawn, and the invariant is reset.

```javascript
if amount == total_supply:
    for i in range(N_COINS):
        d_balances[i] = balances[i]
        self.balances[i] = 0
```

If the amount to burn is the total supply, then set the amount to withdraw `d_balances` as the current token balances, then set the token balance in the pool to 0. Otherwise, if it doesn�t empty the pool, then:

```javascript
else:
    amount -= 1
    for i in range(N_COINS):
        d_balances[i] = balances[i] * amount / total_supply
        assert d_balances[i] >= min_amounts[i]
        self.balances[i] = balances[i] - d_balances[i]
```

We minus one from the input `amount` to favor the pool contract and to prevent rounding errors. The array `d_balances` is then calculated as the current balance multiplied by the amount to burn, divided by the total supply. It then asserts that `d_balances` is greater than or equal to the provided `min_amounts`, then it updates the internal state variable token balance in the pool.

```javascript
balances[i] = d_balances[i]
```

Now we calculate the new invariant `D`:

```javascript
D: uint256 = self.D
self.D = D - unsafe_div(D * amount, total_supply)
```

Next, it loops through each token balance and transfers out that balance to the liquidity provider.

```javascript
for i in range(N_COINS):
        self._transfer_out(coins[i], d_balances[i], use_eth, receiver)
```

Finally, we log the event and return the `d_balances`.

```javascript
log RemoveLiquidity(msg.sender, balances, total_supply, _amount)
return d_balances
```
