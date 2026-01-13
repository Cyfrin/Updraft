### Code Outline of the `tweak_price` Function

In this lesson, we'll explore the function `tweak_price`. This function is called to re-peg the price scale. Before we dive into the code, let's take a moment to outline what the function does.

The function `tweak_price` takes in several inputs, but the two inputs we will highlight now are `_xp` and the new value for `D`. The first thing the function does is check if the last price that was updated is less than now. If this condition is true, then the code will update a state variable called `price_oracle`. This stores the exponential moving average of the tokens. Next the function will calculate and update `last_prices`. Then, an array called `xp` is initialized setting `xp[i]` to be equal to `D` over `N` times the `price_scale` at index `i`
```javascript
xp[i] = D / N * price_scale[i]
```
This number represents when all of the transformed token balances are equal to each other. It also represents the center of where liquidity is currently concentrated. The next step in the process is to initialize a variable called `xcp_profit` to be equal to `1`. The `xcp` can be thought of as `constant_product` and this represents the profit that this pool has made from collecting fees. Then a variable `virtual_price` is initialized and set to `1`. Next, the current virtual price that is stored in a state variable, labeled as `old_virtual_price` is retrieved.

If the `old_virtual_price` is greater than `0`, then first, a variable called `xcp` is calculated.
```javascript
xcp = (prod(xp))^(1/N)
```
`xcp` is equal to the product of `xp` (remember that this value is `D / N * price_scale[i]`), taken to the `Nth` root. This represents the pool value. This is exactly the equation for the pool value. 

Then the function calculates the new `virtual_price`.
```javascript
new virtual_price = xcp / total_supply
```
`virtual_price` is defined to be `xcp` divided by `total_supply`, where `total_supply` is the total supply of the LP tokens. So `virtual_price` will represent how much LP shares are worth.

Then the code updates `xcp_profit`.
```javascript
xcp_profit = old_xcp_profit * new virtual_price / old_virtual_price
```
It does this by taking the previous `xcp_profit` and taking the ratio of the new virtual price that was just calculated, and the current virtual price that is stored inside the state variable.

Remember that `xcp_profit` represents the profit that only comes from collecting fees, and this code makes sure that it represents that accurately.
Next the `xcp_profit` is updated. Then, if the `new virtual_price` is greater than half of `xcp_profit` plus some extra profit, (the extra profit is a setting inside the pool contract), then the code will try to make a decision whether it needs to re-peg or not.

It does this by first calculating the distance between the exponential moving average and the current price scale, which is the peg where the liquidity is currently concentrated. We call this distance `norm` which represents the distance between `price_oracle` and the `price_scale`. If `norm` is large enough, then the curve will decide if it needs to re-peg or to keep the peg the same.
To decide whether to re-peg or not, it needs to calculate the new peg. So it adjusts the current price scale to a new price scale which we will call `p_new`.
Then, the code updates `xp[i]`,
```javascript
update xp[i] = -xp[i] * p_new[i] / price_scale[i]
```
Then `xp[i]` is set to be equal to the token balances times the new `price_scale` which is stored as `p_new`, to cancel the previous `price_scale`, it is divided by the previous `price_scale`.

Then, using this new `xp[i]`, the code calculates a new value for `D`.
```javascript
store xp[i] = D / N * p_new[i]
```
The code calculates this new `D` and then stores it as `xp[i]`. This represents the new center where liquidity might be concentrated if the liquidity was to be concentrated at the new `price_scale`. Once this new `xp[i]` is calculated, the code calculates the new `virtual_price`. This is done using the same method as above, by first calculating the `xcp` by taking the product of `xp`, and taking it to the `Nth` root. Then using the `xcp` value calculated, the new `virtual_price` is calculated by dividing `xcp` by the `total_supply`. Finally the function returns. If the new `virtual_price` was not greater than one half of `xcp_profit` with the extra profit buffer, then it updates the value of `D` and the `virtual_price` and then ends execution of the function.
That concludes the outline of the `tweak_price` function.
