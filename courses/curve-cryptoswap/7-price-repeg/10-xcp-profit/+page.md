# XCP Profit

When the `tweak_price` function is called, a state variable called `xcp_profit` is updated. The way it is updated is by taking the current `xcp_profit`, which is stored in a variable called `old_xcp_profit`. We multiply this by the `virtual_price` that was just calculated, and then we divide by the current `virtual_price` that is stored in the state variable, which is called `old_virtual_price`.

To understand how the `xcp_profit` keeps track of the growth or decrease in the pool, we will start by naming some variables.

Let's say that `v_state[i]` is the virtual price stored in the state variable at time `i` and `v_calc[i]` is the virtual price calculated at time `i`.

Now let's look at the equation:
```javascript
xcp_profit = old_xcp_profit * virtual_price / old_virtual_price
```
`old_xcp_profit` is initialized to `1`. So, with that said, let's rewrite what `xcp_profit` will be equal to on the first iteration. When the function `tweak_price` is called for the first time, `xcp_profit` will be equal to:
```javascript
xcp_profit = 1 * v_calc[0] / v_state[0]
```
The next time the function `tweak_price` is called, the old `xcp_profit` will store the previous `xcp_profit` which is equal to:
```javascript
1 * v_calc[0] / v_state[0]
```
Then we apply the calculation again. We multiply the previous `xcp_profit` by the current virtual price that was calculated at time `1`. We then divide by the virtual price stored in the state variable at time `1`:
```javascript
xcp_profit = 1 * v_calc[0] / v_state[0] * v_calc[1] / v_state[1]
```
We can keep going in this manner. Let's imagine that `xcp_profit` was updated n+1 times. The last update will multiply the previous `xcp_profit` by `v_calc[n]` divided by `v_state[n]`:
```javascript
xcp_profit = 1 * v_calc[0] / v_state[0] * v_calc[1] / v_state[1] * v_calc[2] / v_state[2] * v_calc[3] / v_state[3] * ... * v_calc[n] / v_state[n]
```
To get a better feeling of what the multiplications and divisions are doing, let's consider a simple case. Before doing that, let's mention that at the end of `tweak_price`, the virtual price state variable will be updated to be the current calculation:
```javascript
At the end of tweak_price
v_state[i] = v_calc[i]
```
We can represent this with our labels such that `v_state[i]` will be equal to `v_calc[i]`. This is only updated at the end of the function `tweak_price`. At the beginning, this may not be true.

The calculation for the virtual price at time `i` might not be equal to the virtual price state variable stored at time `i`. However, at the end of the calculation, the new state variable is updated to be equal to the calculation.

So, let's consider a simple case. Let's say that in between the function calls to `tweak_price` the state variable that is stored in the virtual price does not change.
```javascript
Assume in between calls to tweak_price
v_state[i] = v_state[i-1]
```
We can write this as before the function `tweak_price` is called, `v_state[i]` is equal to `v_state[i-1]`. However, we also mentioned that at the end of the function `tweak_price`, `v_state[i-1]` will hold the calculation of `v_calc[i-1]`.
```javascript
Assume in between calls to tweak_price
v_state[i] = v_state[i-1] = v_calc[i-1]
```
Putting these together, we can say that `v_state[i]` is equal to `v_calc[i-1]` right before the function `tweak_price` applies this update to the `xcp_profit`.

Now, when we assume that `v_state[i]` is equal to `v_calc[i-1]`, a lot of the numbers cancel out. The calculation made at time `0` will cancel out with the state at time `1`. The calculation made at time `1` will cancel out with the state variable at time `2`. The calculation made at time `2` will cancel out with the state variable at time `3`.

And so on, we go all the way down to the state variable at time n. All of these will cancel out and we are left with the calculation at time `n` and the state variable at time `0`:
```javascript
xcp_profit = 1 * v_calc[n] / v_state[0]
```
This reduces to a simple equation:
```javascript
xcp_profit = 1 * v_calc[n] / v_state[0]
```
`xcp_profit` is equal to the initial `xcp_profit`, which is 1, multiplied by the calculation made at time n, divided by the state variable stored at time 0. This equation looks like it represents the growth rate of virtual price calculated at time `n` comparing it with the virtual price at time `0`.

However, since the initial virtual price is equal to 1, you can think about it as this equation being multiplied by 1. We get that the `xcp_profit` represents the growth in virtual price from time 0, only accounting for the growth from collecting fees or the decrease in virtual price when the admin collects fees.

So, we looked at a simple example, but in practice almost all of the time, the state variable at time `i` will not be equal to the calculation made at time `i-1`. So, we get that `xcp_profit` is represented by the longer multiplication and divisions.
