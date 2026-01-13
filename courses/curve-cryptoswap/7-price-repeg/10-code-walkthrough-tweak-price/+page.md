## Code Walkthrough of the Function `tweak_price`

The function `tweak_price` is one of the most complex pieces of code in the contract `CurveTricryptoOptimizedWETH.vy`.  This function is called when the price may have changed, and the price scale might need to be re-pegged. 
The parameters that this function takes are: `A_gamma`, `_xp`, `new_D`, and `K0_prev`.
`A_gamma` is a parameter that contains `A` and `gamma`.
`_xp` will be the transformed balances.
`new_D` will be the new value for `D`.
`K0_prev` is a number that is used as an initial guess to calculate the new `D`.

Let's take a look at the function body. The first thing that it does is unpack some state variables:
```javascript
rebalancing_params: uint256[3] = self._unpack(
    self.packed_rebalancing_params
  )
```
```javascript
price_oracle: uint256[N_COINS - 1] = self._unpack_prices(
      self.price_oracle_packed
    )
```
```javascript
last_prices: uint256[N_COINS - 1] = self._unpack_prices(
      self.last_prices_packed
    )
```
```javascript
packed_price_scale: uint256 = self.price_scale_packed
  price_scale: uint256[N_COINS - 1] = self._unpack_prices(
      packed_price_scale
    )
```
These are the `rebalancing parameters`, the `price oracle`, which stores the exponential moving average, `last_prices`, `packed_price_scale` and the `price_scale`.
Then further down, it caches some state variables.
```javascript
total_supply: uint256 = self.TotalSupply
  old_xcp_profit: uint256 = self.xcp_profit
  old_virtual_price: uint256 = self.virtual_price
  last_prices_timestamp: uint256 = self.last_prices_timestamp
```
These are the `total_supply`, the `xcp_profit`, which represents the profit this pool has collected from fees, the `virtual_price` which will be the value of the LP shares, and the `last_prices_timestamp`. The value of the LP shares will increase when fees are collected. 

What�s the difference between `virtual_price` and `xcp_profit`?
`xcp_profit` only accounts for the growth from collected fees.  On the other hand, `virtual_price` also includes the fees, and it's affected by when re-pegging occurs. When the price scale updates, the `virtual_price` might go up or down.
Whereas `xcp_profit` is not affected by re-pegs.

Moving on, it also caches the `last_prices_timestamp`.

```javascript
if last_prices_timestamp < block.timestamp:
  # The moving average price oracle is calculated using the last_price
  # of the trade at the previous block, and the price oracle logged
  # before that trade. This can happen only once per block.
  
  alpha: uint256 = MATH.wad_exp(
      -convert(
          unsafe_div(
              block.timestamp - last_prices_timestamp,
              rebalancing_params[2]
          ),
          int256
      )
  )
```
If the `last_prices_timestamp` is less than now, then it will update the exponential moving average, and we can see the code here that will calculate the alpha. This was already discussed when we looked at the code for the price oracle. Then it will update for each token, the exponential moving average.

```javascript
for k in range(N_COINS - 1):
      # We cap state price that goes into the EMA with
      #     2 x price_scale.
      # new EMA = min(last_price, 2 * price_scale) * (1 - alpha) + old E
        price_oracle[k] = unsafe_div(
            min(last_prices[k], 2 * price_scale[k]) * (10**18 - alpha) + price_oracle[k] * alpha,
            10**18
        ) # Cap spot price into EMA.
```
Then we store the exponential moving average in the state variable `price_oracle_packed`, and update the `last_prices_timestamp`.

```javascript
self.price_oracle_packed = self._pack_prices(price_oracle)
  self.last_prices_timestamp = block.timestamp  # <----- Store timestamp
```

Next, it calculates the new value for D. First it initializes it as `new_D`, which is passed from the input. If the `new_D` is equal to zero, it will recalculate it.  This new D will be equal to zero when the function `exchange` is called.

```javascript
D_unadjusted: uint256 = new_D
 if new_D == 0:
      D_unadjusted = MATH.newton_D(A_gamma[0], A_gamma[1], _xp, K0_prev)
```
Once we have this `D_unadjusted` the next thing it does is calculate the `last_prices` by calling a function called `get_p` inside the math library contract.

```javascript
last_prices = MATH.get_p(_xp, D_unadjusted, A_gamma)
```
Then next it stores the `last_prices`.
```javascript
for k in range(N_COINS - 1):
      last_prices[k] = unsafe_div(last_prices[k] * price_scale[k], 10**18)
    self.last_prices_packed = self._pack_prices(last_prices)
```
Moving on, the next part of the code will calculate D divided by n times the price scale. 
First, it initializes the array called `xp`:
```javascript
xp: uint256[N_COINS] = empty(uint256[N_COINS])
  xp[0] = unsafe_div(D_unadjusted, N_COINS)
```
For the first token, the price scale is always equal to one, so `xp[0]` will simply be D divided by N. And for the rest of the token, we calculate D divided by N times the price scale.
```javascript
for k in range(N_COINS - 1):
        xp[k + 1] = D_unadjusted * 10**18 / (N_COINS * price_scale[k])
```
The next part of the code deals with updating the `xcp_profit`.
```javascript
xcp_profit: uint256 = 10**18
virtual_price: uint256 = 10**18
```
First it initializes `xcp_profit` to equal to one, and `virtual_price` to equal to one.
```javascript
if old_virtual_price > 0:
        xcp: uint256 = MATH.geometric_mean(xp)
        virtual_price = 10**18 * xcp / total_supply
```
If the `old_virtual_price` is greater than 0, then it will first calculate `xcp` by taking the geometric mean of `xp`.  The `xp` will be an array of these values, and the geometric mean will multiply all of these elements and then take the nth root.  So, this `xcp` will be the calculation of the pool value. Take the pool value divided by the total supply, and that will give us the virtual price.
```javascript
xcp_profit = initial virtual price * (accumulated profit / loss rate of virtual price before repeg)
    initial virtual price = 1

    v_old[i] = virtual price stored in state variable at time i
    v_new[i] = virtual price calculated at time i
    v_old[0] = 1
```
Then the next part of the code is to update the `xcp_profit`.
```javascript
xcp_profit = 1 * (v_new[0] / v_old[0]) * (v_new[1] / v_old[1]) * (v_new[n] / v_old[n])
 xcp_profit = unsafe_div(
        old_xcp_profit * virtual_price,
        old_virtual_price
      ) # Safu to do unsafe_div as old_virtual_price > 0.
```
`Xcp_profit` is defined to be the old `xcp_profit` multiplied by the `virtual_price` that was calculated just now, divided by the virtual price that is stored in the state variable.

Consider the ratio `virtual_price` and `old_virtual_price`. This will give us the ratio of how the virtual price either increased or decreased.  The `old_xcp_profit` will also hold the previous accumulated rate of `virtual_price` growth or loss, so what this is doing is accumulating all of the increase or decrease in the ratio of virtual prices, and when we multiply this by the initial virtual price which is equal to 1, this will give us the growth in virtual price from the initial virtual price. We�ll look at how the xcp profit works in more detail in the next video. 

Moving on,
```javascript
# If A and gamma are not undergoing ramps (t < block.timestamp),
#  ensure new virtual_price is not less than old virtual_price,
#  else the pool suffers a loss.
    if self.future_A_gamma_time < block.timestamp:
      assert virtual_price > old_virtual_price, "Loss"
```
If A and gamma are not undergoing ramps, then ensure the new virtual price is not less than the old virtual price, otherwise the pool suffers a loss.
```javascript
self.xcp_profit = xcp_profit
```
Finally we update the xcp_profit.
```javascript
# Rebalance liquidity if there's enough profits to adjust it.
    when allowed_extra_profit = 0:
      virtual_price > (1 + xcp_profit) / 2
```
The next part of the code says that if `allowed_extra_profit` equals zero. 
```javascript
if virtual_price > (1 + xcp_profit) / 2 * 10**18 + 2 * rebalancing_params[0]:
      # allowed_extra_profit
```
If the virtual price multiplied by some number is greater than some expression over here.

```javascript
# Calculate the vector distance between price_scale and
    # price_oracle.
    norm: uint256 = 0
    ratio: uint256 = 0
    for k in range(N_COINS - 1):
      ratio = unsafe_div(price_oracle[k] * 10**18, price_scale[k])
      # unsafe_div because we did safediv before
      if ratio > 10**18:
        ratio = unsafe_sub(ratio, 10**18)
      else:
        ratio = unsafe_sub(10**18, ratio)
      norm = unsafe_add(norm, ratio**2)
```
Then we check to calculate the distance between the current price scale and the exponential moving average, and this will be stored in the variable called norm. 
```javascript
    # norm = sqrt(sum(|1 - r|)), r = price oracle / price scale
    norm = isqrt(norm) # isqrt is not in base 1e18
    adjustment_step: uint256 = max(
        rebalancing_params[1],
        unsafe_div(norm, 5)
    ) # adjustment_step
```
Then we create a variable called `adjustment_step`. And if this `norm` is greater than `adjustment_step`, then curvev2 will try to update the price scale.

```javascript
if norm > adjustment_step:
        # We only adjust prices if the
        # vector distance between price_oracle and price_scale is
        # large enough. This check ensures that no rebalancing
        # occurs if the distance is low i.e. the pool prices are
        # pegged to the oracle prices.

        p_new: uint256[N_COINS - 1] = empty(uint256[N_COINS - 1])
        for k in range(N_COINS - 1):
          # p_new = price_scale * (norm - adj_step) + adj_step * EMA)
          # p_new = price_scale * (1 - adj_step / norm )  + adj_step * EMA / 10**18
          p_new[k] = unsafe_div(
            price_scale[k] * unsafe_sub(norm, adjustment_step) + adjustment_step * price_oracle[k],
            norm
          )
```
In other words it would try to re-peg. To re-peg it first creates a new price scale which it might re-peg to. After it calculates the new price scale to re-peg to, it then uses the array `xp` to store the new transformed balances at the new price scale.
```javascript
xp = _xp
for k in range(N_COINS - 1):
  _xp[k+1] = unsafe_div(_xp[k + 1] * p_new[k], price_scale[k]) # unsafe_div because we did safediv before
```
And then after calculating these new transformed balances, it will calculate the new value for D.
```javascript
D: uint256 = MATH.newton_D(A_gamma[0], A_gamma[1], xp, 0)
    for k in range(N_COINS - 1):
      frac: uint256 = xp[k] * 10**18 / D  # <------ Check validity of
      assert (frac > 10**16 - 1) and (frac < 10**20 + 1) # p_new,
    xp[0] = D / N_COINS
      for k in range(N_COINS - 1):
        xp[k + 1] = D * 10**18 / (N_COINS * p_new[k]) # <----- Convert xp to real prices.
```
It does some checks, and it reuses the xp array to mean something else. This time it will mean `D / N * price_scale`. It calculates the new virtual price using new xp and D, and reuses old virtual price.
```javascript
old_virtual_price = unsafe_div(
          10**18 * MATH.geometric_mean(xp), total_supply
        ) # <-----
        # if (old_virtual_price > 10**18 and
        #      2 * old_virtual_price > 10**18 + xcp_profit):
        packed_price_scale = self._pack_prices(p_new)
        self.D = D
        # virtual_price = xcp / total_supply, xcp calculated with new
        self.virtual_price = old_virtual_price
        self.price_scale_packed = packed_price_scale
      return packed_price_scale
```
And if this new virtual price that was calculated using a new price scale satisfies this condition, it will store the new D that was calculated into the state variable, and the new virtual price, and it will store the new price scale and return the packed price scale.

Otherwise:
```javascript
self.D = D_unadjusted
      # virtual_price = xcp / total_supply, xcp calculated with new
      self.virtual_price = virtual_price
      return packed_price_scale
```
It will just update the value of D, update the virtual price, and return the packed price scale. And then that ends the code walkthrough for the function tweak price.
