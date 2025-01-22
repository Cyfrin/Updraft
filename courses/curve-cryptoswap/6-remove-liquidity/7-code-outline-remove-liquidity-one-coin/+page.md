### Code Outline For remove_liquidity_one_coin Function

In this lesson, we'll be discussing the function `remove_liquidity_one_coin`.

First, `remove_liquidity_one_coin` will calculate A and gamma.
```javascript
calculate A and gamma
```
Next, the internal function, `claim_admin_fees` is called.
```javascript
claim_admin_fees
```
After that, another internal function will be called in order to calculate dy, D, and fee. Dy will represent the amount of token that will come out, D is the new value for D and fee is the fee charged for removing liquidity in only one coin.
```javascript
calculate dy, D and fee
```
Then, the token out balance is updated
```javascript
update token out balance
```
After that, the LP shares will be burned.
```javascript
burn LP shares
```
The token is then transferred out.
```javascript
transfer token out
```
Finally, the internal function `tweak_price` is called.
```javascript
tweak_price
```
