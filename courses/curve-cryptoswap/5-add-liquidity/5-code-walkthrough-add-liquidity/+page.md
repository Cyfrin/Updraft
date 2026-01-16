### Code Walkthrough: add_liquidity Function

Let's begin our code walk-through for the function `add_liquidity`. This is a function that liquidity providers will call to add tokens into Curve v2's AMM.

This function takes four inputs:
- `amounts`: Representing the amounts of each coin to add.
- `min_mint_amount`: Representing the minimum LP tokens the liquidity provider wishes to receive.
- `use_eth`: A boolean which will be set to True if the liquidity provider is sending ETH, or set to False otherwise.
- `receiver`:  The recipient of the LP token. This defaults to `msg.sender`.

The function will return a `uint256` which represents the amount of LP tokens that were minted.
```javascript
@notice Adds liquidity into the pool.
@param amounts Amounts of each coin to add.
@param min_mint_amount Minimum amount of LP to mint.
@param use_eth True if native token is being added to the pool.
@param receiver Address to send the LP tokens to. Default is msg.sender
@return uint256 Amount of LP tokens received by the `receiver`
```

Scrolling down, the first step calculates A and gamma.
```javascript
A_gamma: uint256[2] = self._A_gamma()
```

Next, it initializes an array called `xp`, and copies the state variable `balances` which holds the token balances.
```javascript
xp: uint256[N_COINS] = self.balances
```
Later on, we'll see that this `xp` will represent the transformed balances. Then we have a variable called `amountsp`. This is initialized to be a `uint256` array of size `N_COINS`.
```javascript
amountsp: uint256[N_COINS] = empty(uint256[N_COINS])
```
Later on, this `amountsp` will be equal to `xp` minus `xp_old`, where `xp` represents transformed balances after adding liquidity and `xp_old` represents the transformed balances before adding liquidity.

Then, it initializes a few more variables: `xx`, `d_token`, `d_token_fee`, and `old_D`. We'll skip these explanations for now, and figure them out as we go along.

The first check in the code is to assert that the sum of tokens to add as liquidity is greater than zero.
```javascript
assert amounts[0] + amounts[1] + amounts[2] > 0
```

Next, it unpacks some of the packed state variables including `precisions`, `packed_price_scale`, and `price_scale`.
```javascript
precisions: uint256[N_COINS] = self._unpack(self.packed_precisions)
packed_price_scale: uint256 = self.price_scale_packed
price_scale: uint256[N_COINS-1] = self._unpack_prices(packed_price_scale)
```

The code then updates the state variable `balances`.
```javascript
for i in range(N_COINS):
    bal: uint256 = xp[i] + amounts[i]
    xp[i] = bal
    self.balances[i] = bal
```
`balances[i]` will be equal to `bal` where `bal` is equal to `xp[i] + amounts[i]`. Remember that at the beginning of this function, `xp[i]` was initialized to `self.balances`. In other words, a copy of token balances. And `amounts[i]` is the amount of tokens that the user is going to put in. Therefore `xp[i] + amounts[i]` will be the new token balance.

The next part of the code calculates the transformed balances, `xp` and `xp_old`. `xp` will be the new transformed balances after adding liquidity and `xp_old` will be the old transformed balances.
```javascript
xp_old: uint256[N_COINS] = xp
for i in range(N_COINS):
    bal: uint256 = xp[i] + amounts[i]
    xp[i] = bal
    self.balances[i] = bal
xx = xp
```
Next, the code transfers tokens into the pool.
```javascript
for i in range(N_COINS):
    if amounts[i] > 0:
        if coins[i] == WETH20:
            self._transfer_in(
                coins[i],
                amounts[i],
                0,
                ,
                msg.value,
                empty(address),
                empty(bytes32),
                msg.sender,
                empty(address),
                use_eth
            )
        else:
             self._transfer_in(
                coins[i],
                amounts[i],
                0,
                0,
                empty(address),
                empty(bytes32),
                msg.sender,
                empty(address),
                False
            )
```
Then `amountsp` is set to be equal to `xp[i]` minus `xp_old[i]`. This will represent the transformed amount of tokens that came in.
```javascript
amountsp[i] = xp[i] - xp_old[i]
```

Finally, it calculates LP tokens to mint: First, if `future_A_gamma_time` is greater than the `block.timestamp`, then A and gamma are going to update. This code calculates the new value of `D` with the current `A` gamma parameters. Otherwise, it will just use the old value of `D`.
```javascript
if self.future_A_gamma_time > block.timestamp:
            old_D = MATH.newton_D(A_gamma[0], A_gamma[1], xp_old, 0)
        else:
            old_D = self.D
```
The new D, after token balance updates, is calculated with the same code and it is stored in the variable D.
```javascript
D: uint256 = MATH.newton_D(A_gamma[0], A_gamma[1], xp, 0)
```
Then a conditional is used to calculate the LP tokens to mint. If `old_D` is greater than zero, we assume the liquidity was previously added to the pool. The LP tokens are calculated by taking the current token supply, multiplying it by the ratio of change in the value D (D / old_D), then subtracting that value from the current token supply. If the condition is false, the code assumes it is the first time liquidity was added, and the LP tokens to mint is calculated by getting the pool value.
```javascript
if old_D > 0:
   d_token = token_supply * D / old_D - token_supply
else:
     d_token = self.get_xcp(D)
```
Before returning the amount of LP tokens that were minted, the code checks if the amount of LP tokens to mint is greater than zero, and it calculates a fee on deposit which will be called `d_token_fee`. It then mints the LP tokens, logs the `addLiquidity` event and calls the function `claim_admin_fees`, and finally returns `d_token`, representing the amount of LP tokens that were minted.
```javascript
 assert d_token > 0
 d_token_fee = self._calc_token_fee(amountsp, xp) * d_token / 10 ** 10 + 1
 d_token -= d_token_fee
 token_supply += d_token
 self.mint(receiver, d_token)
 packed_price_scale = self.tweak_price(A_gamma, xp, D, 0)
 self._claim_admin_fees()
 return d_token
```
