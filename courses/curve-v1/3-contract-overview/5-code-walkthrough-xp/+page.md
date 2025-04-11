## Introduction to the _xp Function

In Curve.fi AMMs, token balances are converted to have 18 decimals before any calculations. We can see this in a contract for DAI, USDC, and USDT. 

DAI has 18 decimals, so no conversion is necessary. USDC and USDT both have six decimals, so they must be converted to have 18 decimals.

This is done by an internal function called `_xp`. The naming convention of this function can be remembered as "X" for the token balances and "P" for precision.

The _xp function converts the token balances within a contract to have 18 decimals. 

Let's take a look at the code:

```javascript
def _xp(balances: uint256(N_COINS)) -> uint256(N_COINS):
    result: uint256(N_COINS) = RATES
    for i in range(N_COINS):
        # DAI = 1e18 * dai balance / 1e18 = 18 decimals
        # USDC = 1e30 * usdc balance / 1e18 = 18 decimals
        # USDT = 1e30 * usdt balance / 1e18 = 18 decimals
        result[i] = result[i] * self.balances[i] / LENDING_PRECISION
    return result
```

The first line of the function creates an array called `result`. It initializes the array to the value of `RATES`.

```javascript
result: uint256(N_COINS) = RATES
```

The function then uses a for loop to iterate through each coin in the contract. 

```javascript
for i in range(N_COINS):
```

The _xp function is used to normalize the token balances in the contract. We can see this in the function, where it takes each balance, multiplies it by the corresponding rate, and divides by `LENDING_PRECISION`. 

```javascript
result[i] = result[i] * self.balances[i] / LENDING_PRECISION
```

We'll go over how the calculation works step by step:

The first iteration of the loop, `result` will hold the value of `1e18`, which is the rate for DAI. The function then multiplies this by the DAI balance in the contract. DAI has 18 decimals, so this will not change the number of decimals. The result is then divided by `LENDING_PRECISION`, which is 10^18. This results in the DAI balance with 18 decimals.

The second iteration of the loop, `result` will hold the value of `1e30`, which is the rate for USDC. The function then multiplies this by the USDC balance in the contract. USDC has six decimals, so multiplying by `1e30` will result in 36 decimals. The result is then divided by `LENDING_PRECISION`, which is 10^18. This results in the USDC balance with 18 decimals.

The third iteration of the loop, `result` will hold the value of `1e30`, which is the rate for USDT. The function then multiplies this by the USDT balance in the contract. USDT has six decimals, so multiplying by `1e30` will result in 36 decimals. The result is then divided by `LENDING_PRECISION`, which is 10^18. This results in the USDT balance with 18 decimals.

The final line of the function returns the `result` array.

```javascript
return result
```

**Note**: It's important to remember that the _xp function is only used internally. When you interact with the Curve.fi AMM contract, you will not need to call this function. The contract will handle the conversion of token balances automatically.

## Summary

In summary, the _xp function takes the token balances in the contract and normalizes them to have 18 decimals. This is done by multiplying each balance by the corresponding rate and dividing by `LENDING_PRECISION`. 
