# Code Walkthrough: `calc_withdraw_one_coin`

In this lesson, we will be covering the function `calc_withdraw_one_coin`. The function `remove_liquidity_one_coin` calls the internal function `calc_withdraw_one_coin` in order to calculate the amount of tokens to send back to a liquidity provider. Let's dive in.

First, let's take a look at the function definition:
```javascript
def calc_withdraw_one_coin(
        A_gamma: uint256[2],
        token_amount: uint256,
        i: uint256,
        update_D: bool,
    ) -> (uint256, uint256[N_COINS], uint256):
```
This function takes in `A_gamma` which is an array of `uint256` with a length of two, `token_amount` which is of type `uint256`, `i` which is also of type `uint256` and `update_D` which is a boolean. This function returns three values.

The function calculates the number of tokens that a liquidity provider will receive when burning their LP shares. The variable `i` specifies which token that the liquidity provider wants to receive.

Next, we grab the state variable `totalSupply`. This represents the total LP supply. We then perform some basic checks. The first check asserts that the `token_amount` is less than or equal to `token_supply`. The next check asserts that the index `i` is less than `N_COINS`.
```javascript
token_supply: uint256 = self.totalSupply
assert token_amount <= token_supply # dev: token amount more than supply
assert i < N_COINS # dev: coin out of range
```
The code then initializes some more variables:
```javascript
xx: uint256[N_COINS] = self.balances
precisions: uint256[N_COINS] = self._unpack(self.packed_precisions)
xp: uint256[N_COINS] = precisions
D0: uint256 = 0
```
`xx` is initialized with token balances. `precisions` is initialized by unpacking packed precisions and stored in an array. `xp` is a copy of `precisions`. `D0` is an integer initialized to `0`.

Next, we see some code that might be difficult to understand. Let's take a look at it step by step:
```javascript
price_scale_i: uint256 = PRECISION * precisions[0]
packed_prices: uint256 = self.price_scale_packed
xp[0] *= xx[0]

for k in range(1, N_COINS):
  p: uint256 = (packed_prices & PRICE_MASK)
  if i == k:
      price_scale_i = p * xp[i]
  # precision * balances[i] * price_scale[i] / PRECISION
  xp[k] = unsafe_div(xp[k] * xx[k] * p, PRECISION)
  packed_prices = packed_prices >> PRICE_SIZE
```
`price_scale_i` is initialized with `PRECISION` multiplied by `precisions` at index `0`. `packed_prices` is initialized with the value from the state variable `price_scale_packed`. `xp` at index `0` is multiplied by `xx` at index `0`.

Next, a for loop starts. It iterates from `k = 1` to `k < N_COINS`.

Inside the loop `p` is initialized with packed prices and `PRICE_MASK`. If `i == k` then `price_scale_i` is updated by `p * xp[i]`. The code comments show how `xp[k]` is being calculated. `xp` at index `k` gets updated with `xp[k] * xx[k] * p` divided by `PRECISION`. Then `packed_prices` is shifted right by the `PRICE_SIZE`. 

The code is setting the values in the `xp` array with transformed token balances. If `i == k` then `price_scale_i` is updated.

After the loop, `D0` is calculated with a conditional:
```javascript
if update_D:
    D0 = MATH.newton_D(A_gamma[0], A_gamma[1], xp, 0)
else:
    D0 = self.D
D: uint256 = D0
```
If `update_D` which is passed into the function is `true`, then `D0` is updated with `MATH.newton_D` function, otherwise the state variable `D` is used. Then the variable `D` is initialized to the value of `D0`.

After that, there is some fee calculation code that is important to cover:
```javascript
xp_imprecise: uint256[N_COINS] = xp
# balanced withdrawal = from xp[0] -> xp[0] * token_amount / token_supply
# from xp[1] -> xp[1] * token_amount / token_supply
# from xp[2] -> xp[2] * token_amount / token_supply

# imbalanced withdrawal
# assumes xp[0] ~= xp[1] ~= xp[2] -> xp[i] * N * token_amount / token_supply
xp_correction: uint256 = xp[i] * N_COINS * token_amount / token_supply
fee: uint256 = self._unpack(self.packed_fee_params)[1] # <- self.out_fee.

# Deduct xp[i] * N * token_amount / token_supply from xp[i] and calculate fee
if xp_correction < xp_imprecise[i]:
    xp_imprecise[i] -= xp_correction
fee = self._fee(xp_imprecise)

dd: uint256 = unsafe_div(token_amount * D, token_supply)
D_fee: uint256 = fee * dd / (2 * 10**10) + 1
D = (D - D_fee) # <- Charge fee on D
```
The code initializes `xp_imprecise` to a copy of `xp`. The comments above `xp_correction` explain the logic being implemented for both balanced and imbalanced withdrawals. `xp_correction` is updated using `xp[i]`, `N_COINS`, `token_amount` and `token_supply`. The `fee` is unpacked using the state variable `packed_fee_params`. Then if `xp_correction` is less than `xp_imprecise[i]` then we deduct `xp_correction` from `xp_imprecise[i]`. Then the `fee` is calculated. Next, `dd` which is the change in `D` is calculated and a `D_fee` is calculated using `fee * dd`. Finally, we subtract the fee from `D`.

The last portion of code is used to update `xp[i]` which is the token balances after calculating fees.

```javascript
y: uint256 = MATH.get_y(A_gamma[0], A_gamma[1], xp, D0, dd, i)[0]
dy: uint256 = (xp[i] - y) * PRECISION / price_scale_i
xp[i] = y
```
First, a new variable `y` is created with the help of `MATH.get_y`. `dy` is calculated using `xp[i]`, `y`, `PRECISION` and `price_scale_i`, and finally `xp[i]` is updated to equal `y`. The function returns `dy`, `xp`, and `approx_fee`.

```javascript
return dy, xp, approx_fee
```
That is it for the function `calc_withdraw_one_coin` . In the next lesson, we will cover other functions.
