## Code Walkthrough: calc_token_fee

Next, we are going to take a look at the internal function called `calc_token_fee`. This function calculates the percentage of fee to charge. 
For the input, it will take in `amounts` and `xp`. The `amounts` will be the transformed amounts of tokens that came in, and `xp` will be the transformed token balances. First, it calculates the fee multiplier:
```javascript
fee: uint256 = unsafe_div(
    unsafe_mul(self._fee(xp), N_COINS),
    unsafe_mul(4, unsafe_sub(N_COINS, 1))
)
```
It calls the internal function `fee` which is responsible for calculating the fee multiplier dynamically based on `xp`. Then it's going to multiply by `N_COINS`, and then divide by `4 * (N_COINS - 1)`. 

So, this `fee` will turn out to be this equation:
```javascript
fee = N / (4 * (N - 1))
```
The part of the equation `N / (4 * (N - 1))` seems to come out of nowhere. However, if you learned curve v1, you will see the same code. This number is derived from making sure that the imbalance fee for adding liquidity and then removing liquidity is the same as the swap fees. More information will be provided in the GitHub repo.

Moving on, next it calculates the sum of the amounts of tokens that came in:
```javascript
S: uint256 = 0
for _x in amounts:
    S += _x
```
Next, it calculates the average of `S`, `S / N_COINS`:
```javascript
avg: uint256 = unsafe_div(S, N_COINS)
```
Then, the next part of the code will sum up the difference between the average and the actual amount of tokens that came in:
```javascript
Sdiff: uint256 = 0
for _x in amounts:
    if _x > avg:
        Sdiff += unsafe_sub(_x, avg)
    else:
        Sdiff += unsafe_sub(avg, _x)
```
What's going on is that it's summing `amounts[i]` comparing this with the average of amounts, and then summing all of this.
```javascript
fee = sum(amounts[i] - avg(amounts)) * fee / sum(amounts)
```
Inside this code, it's taking the sum, multiplying by fee and then dividing by the sum of amounts, plus what's called noise fee:
```javascript
return fee * Sdiff / S + NOISE_FEE
```
When the transformed amounts are all equal to each other, then the average will be equal to this number as well. Taking the difference of amount by with the average of amounts will always be equal to 0. This part will be equal to zero, multiplying zero by another number will be zero. And the resulting fee will be equal to zero plus noise fee.
That ends the code walkthrough for the function `calc_token_fee`.
