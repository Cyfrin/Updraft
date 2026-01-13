### Code Walkthrough of _exchange Function

In this lesson, we'll be explaining the code inside the function `_exchange`.

Let's start with the inputs. 

First, there is the `sender` which is an `address`.

Next, there is a variable named `mvalue`, which is of type `uint256`.
```javascript
mvalue: uint256
```
`mvalue` refers to the message value.

Next, we have the index for `token in` and `token out`.
```javascript
i: uint256
j: uint256
```
`i` is going to be `token in` and `j` will be `token out`.

`dx` will be the amount of token in. `min_dy` will be the minimum amount of token out that the user wishes to get back.
```javascript
dx: uint256
min_dy: uint256
```

Next, there is the input `use_eth`, which is a boolean.
```javascript
use_eth: bool
```
If this is true, then either `token in` or `token out` is `eth`, so an extra step will be involved to convert from `eth` to `weth` or `weth` to `eth`.

Then, we have the receiver of token out.
```javascript
receiver: address
```
Then we have two other parameters called `callbacker` and `callback_sig`.
```javascript
callbacker: address
callback_sig: bytes32
```
These last two inputs are not important to understand the algorithm for the exchange, and we can address these later as needed.

Going down, the code first checks that `i` is not equal to `j`. This means that the index of the `token in` is not equal to the index of `token out`.

```javascript
assert i != j # dev: coin index out of range
```

Next, it checks that the amount of token in is greater than 0.
```javascript
assert dx > 0 # dev: do not exchange 0 coins
```
After that, it calculates the current `A_gamma`. It returns a `uint256` array of size 2. The first element contains the parameter for A, and the second will contain the parameter for gamma.
```javascript
A_gamma: uint256[2] = self._A_gamma()
```

On the next line, it copies the token balances into an array called `xp`. We�ll see later on that `xp` will transform into the transformed balances. The current token balances will be normalized to all have 18 decimals, and then multiplied by the price scales.
```javascript
xp: uint256[N_COINS] = self.balances
```

Next, it creates a `uint256` array of size 3 called `precisions`. What it is going to do is unpack the packed precisions. Precision is packed into a single `uint256` state variable. Here it's unpacking into an array of type `uint256` of size 3.

```javascript
precisions: uint256[N_COINS] = self._unpack(self.packed_precisions)
```
These precisions are multiplied by the token balances to normalize all the token balances to have 18 decimals. It then initializes a local variable called `dy` to zero. Eventually, this will be the amount of token that will go out.
```javascript
dy: uint256 = 0
```
Then, onto the next line. The code copies the current token balances, where `y` will be `xp[j]` and `x0` the current token imbalance will be `xp[i]`. Since `dx` is coming in, it's going to update this `xp[i]` to be the current token balance plus `dx`.
```javascript
y: uint256 = xp[j] # <-------- if j > N_COINS, this will revert.
x0: uint256 = xp[i] # <-------- if i > N_COINS, this will revert.
xp[i] = x0 + dx
self.balances[i] = xp[i]
```
It also copies the state variable, `price scale packed`, into memory called `packed_price_scale` and then unpacks the price scale. Notice that this array called `price scale` has a size `N_COINS` - 1. If there are three tokens in the pool, then `N_COINS` will be 3. 3 - 1 will be 2. For a pool with three tokens, the reason this array is of size 2 is because we don't need to store the price scale for the first token.

```javascript
packed_price_scale: uint256 = self.price_scale_packed
price_scale: uint256[N_COINS - 1] = self._unpack_prices(packed_price_scale)
```
The price scale of the first token will always equal 1. Therefore, we only need to store the price scale of the other two tokens.

The code continues to calculate the transform balances. It takes the token balance, multiplies it by the price scale, multiplies it by the precision, and then divides by the precisions. Basically it's calculating the transformed balances. We need to be careful of the precisions. When we multiply the token balance by the precision, it's going to have 18 decimals. The price scale also has 18 decimals. So, at this point, we've multiplied 18 decimals by 18 decimals, which leaves us with 36 decimals. To cancel out one set of those 18 decimals, we divide by the precision, which is equal to 10 to the 18th.

```javascript
transformed balance = token balance * price scale * precision / PRECISION
```
Let's take a look at the for loop. Since the price scale of token 0 is equal to 1, we don't need to actually execute this code. We can simply normalize the token balance to have 18 decimals, which is what is seen here:

```javascript
xp[0] *= precisions[0]
for k in range(1, N_COINS):
    xp[k] = unsafe_div(
      xp[k] * price_scale[k-1] * precisions[k],
        PRECISION
    )
```
For token 1 and beyond, we'll need to multiply by the price scale, and then by the precisions. Then we'll divide by a precision of 10 to the 18th.
Then, the code copies the precision for `token in` and it gets the future `A_gamma time`. This is a timestamp that represents when `A` and `gamma` will stop updating. If this update is in the future, then it recalculates the value for `D`.

```javascript
prec_i: uint256 = precisions[i]
t: uint256 = self.future_A_gamma_time
if t > block.timestamp:
        x0 *= prec_i

if i > 0:
    x0 = unsafe_div(x0 * price_scale[i-1], PRECISION)

x1: uint256 = xp[i]
xp[i] = x0
self.D = MATH.newton_D(A_gamma[0], A_gamma[1], xp, 0)
xp[i] = x1 # and restore.

```

Afterwards, the code gets the value for D, and it also copies the precisions for token out.

```javascript
D: uint256 = self.D
prec_j: uint256 = precisions[j]
```
Next, it calculates the amount of token that will go out, called `dy`. On the first line it calls a function called `math.get_y`, This calculates the new token out balance, given the inputs.

```javascript
y_out: uint256[2] = MATH.get_y(A_gamma[0], A_gamma[1], xp, D, j)
xp[j] -= dy
dy -= 1
```
We're taking the difference of the previous `token j` balance with the new `token j` balance to get the amount of transformed `token j` that must go out. This is named `dy`. Then it updates the transform token balance for token out. We minus 1 from the transform balance of the token that's going out to account for rounding errors.

Next, the code converts the transformed token out back into actual token amounts.

```javascript
if j > 0:
    dy = dy * PRECISION / price_scale[j-1]
dy /= prec_j
```
If the index for token out is greater than zero, we'll need to undo the precisions and price scales. In the beginning, we also normalized all the token balances to have 18 decimals. We'll need to undo that process as well.

Next, the code calculates the fee. Here, it's calculating a dynamic fee by calling an internal function called `fee`.

```javascript
fee: uint256 = unsafe_div(self.fee(xp) * dy, 10**10)
```
It then subtracts the fee from the outgoing amount. It then makes sure that `dy` is greater than or equal to `min_dy`.
```javascript
dy -= fee
assert dy >= min_dy, "Slippage"
```

Next, it updates the pool balance of the outgoing coin.

```javascript
# y = y - (dy - fee)
y -= dy
self.balances[j] = y
```
Then, it transfers the token in, and for transferring the token in, it passes the address for the callbacker and callback sig.

```javascript
self._transfer_in(coins[i], dx, dy, mvalue, callbacker, callback_sig,  sender, receiver, use_eth)
```
You can check for yourself that when this internal function is called, it will call into the address called the callbacker, specified by the address.

Then it transfers the token out, and next it calls another internal function called `tweak prices`. What this is doing is it�s going to repack the price, if the difference in the price from the exponential moving average is big enough.
```javascript
packed_price_scale = self.tweak_price(A_gamma, xp, 0, y_out[1])
```
And, that completes the code block for the function `exchange`.
```javascript
return dy
```
