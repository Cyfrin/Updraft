## Code Walkthrough - Price Oracle

We can examine the code inside of Curve v2 AMM to see how exponential moving average is implemented. There are two places where the logic for calculating the exponential moving average is used. One is the external function `price_oracle`, and the other is inside an internal function called `tweak_price`. In this lesson, we will focus on the `price_oracle` function.

The `price_oracle` function takes in one parameter, `k`. This input represents the index of the coin - 1. For example, if we want to find the exponential moving average of coin 1, then for `k`, we will pass in 0. If we wanted to find the exponential moving average of coin 2, then for `k` we would pass in 1. The output of the function is the exponential moving average of that particular coin. 

Let's look at the code. First, it unpacks some state variables:
```javascript
price_oracle: uint256 = self._unpack_prices(self.price_oracle_packed)[k]
price_scale: uint256 = self._unpack_prices(self.price_scale_packed)[k]
last_prices_timestamp: uint256 = self.last_prices_timestamp
```
Here, the `price_oracle` variable represents the exponential moving average, and we also have `price_scale` and `last_prices_timestamp`.

An if statement checks if `last_prices_timestamp` is less than the current block timestamp. If this is true, then it calculates the new exponential moving average.
```javascript
if last_prices_timestamp < block.timestamp:
```
It unpacks the last prices from a state variable called `last_prices_packed`. Then, it calculates the moving average time:
```javascript
last_prices: uint256 = self._unpack_prices(self.last_prices_packed)[k]
ma_time: uint256 = self._unpack(self.packed_rebalancing_params)[2]
# ma_time = half life / ln(2)
# alpha = e**(ln(0.5) * dt / H)
# ln(0.5) = ln(1/2) = -ln(2)
# e**(-dt / ma_time) = e**(-ln(2) * dt / half life)
```
Next, it calculates `alpha`. This is done by taking e raised to the power of time elapsed, divided by MA time. This variable is converted to a 256 bit integer:
```javascript
alpha: uint256 = MATH.wad_exp(
    -convert(
        (block.timestamp - last_prices_timestamp) * 10**18 / ma_time,
        int256
    )
)
```
We stated in math that alpha = e to the ln(0.5) * dt / H. We also note that ln(0.5) is a constant, and ln(0.5) = ln(1/2) = -ln(2), so this is included in the `ma_time` variable. The variable `ma_time` is equal to half life / ln(2).
There is a minus sign in this equation because ln(0.5) = -ln(2). The minus sign is added to cancel it out.
```javascript
# We cap state price that goes into the EMA with 2 x price_scale.
min(last_price, 2 * price_scale) * (1 - a) + a * ma
last_price != last trade price
return (
    min(last_prices, 2 * price_scale) * (10**18 - alpha) +
    price_oracle * alpha
) / 10**18
return price_oracle
```
The last step is to calculate the new exponential moving average. It takes the last price, multiplied by some scale, which is 1 - alpha, then to this, adds alpha multiplied by the previous exponential moving average. The code also has a check to make sure the last price does not change significantly from the price scale. 

We will see this code again inside of the function `tweak_price`.
