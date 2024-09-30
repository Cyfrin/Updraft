The function that we will use to calculate the amount of tokens we will receive from a swap with a Curve B1 AMM is called `get_dy`. There is another function called `get_dy_underlying` that has the same purpose but behaves differently. 

The difference between these two functions makes sense when the tokens inside the pool contract are yield bearing. 

For example, for a three pool, the tokens are DAI, USDC, and USDT. If you were to hold these tokens, they would not give you any yield. In this case, calling the functions `get_dy` and `get_dy_underlying` will give you back the exact same amounts. 

Now, let's consider the case when the tokens inside the pool earn some kind of yield.  For example, let's say we have the tokens DAI and cUSDC. The token cUSDC is a token that you get for depositing USDC into Compound.  This token is yield bearing. If you were to hold on to this cUSDC over time, you will earn some interest. 

Let's say you wanted to find out how much USDC you will get for putting in DAI. The pool tokens are DAI and cUSDC. In this case, to answer the question of how much USDC we will get for putting in DAI, we will call the function `get_dy_underlying`. This function will calculate how much USDC we will get if we were to put in DAI. 

For a stable swap three pool, the tokens are DAI, USDC, and USDT.  The functions `get_dy_underlying` and `get_dy` are the same. 

Let's take a look at the function `get_dy`. As input, it's going to take the index of the token in and the index of the token out, and the amount of tokens you are going to put in, dx. Then, it calculates the amount of tokens that the AMM will give you back.

First, it gets the rates. Remember for this stable swap three pool, the rates are a fixed number of 1e18, 1e30, and 1e30. Next, it gets the token balances, which are normalized to all have 18 decimals. The tokens are DAI, USDC, and USDT.  DAI has 18 decimals, but USDC and USDT have six decimals. By calling this function, all of the token balances are normalized with 18 decimals.

The next part of the code calculates the amount of tokens that will come out, and the fees on tokens out. 

```javascript
def get_dy(i: int128, j: int128, dx: uint256) -> uint256:
    # dx and dy in c-units
    rates: uint256[N_COINS] = RATES
    xp: uint256[N_COINS] = self.xp()
    x: uint256 = xp[i] + (dx * rates[i]) // PRECISION
    y: uint256 = self.get_y(i, j, x, xp)
    dy: uint256 = (xp[j] - y - 1) * PRECISION // rates[j]
    _fee: uint256 = self.fee * dy // FEE_DENOMINATOR
    return dy - _fee
```

The first part is adding the amount of token in to the current balance of token in, inside this pool. 

```javascript
x: uint256 = xp[i] + (dx * rates[i]) // PRECISION
```

This part normalizes the amount of token in to have 18 decimals. Next, it calculates the pool balance of token out, if we were to put in the dx amount of tokens into this pool.  Remember that this function uses the Newton's method to calculate the new balance of token out. 

```javascript
y: uint256 = self.get_y(i, j, x, xp)
```

Since token is coming in, the balance of token out will decrease. Taking the difference of the current balance of token out, and the new balance of token out, accounting for rounding errors, we also minus one.  Basically, this difference of the old balance of token out, minus the new balance of token out, is the calculation for the amount of token that will come out. This is named dy. 

```javascript
dy: uint256 = (xp[j] - y - 1) * PRECISION // rates[j]
```

A fraction of this dy will be kept inside the pool as swap fee. And this is calculated by taking some fraction of dy.

```javascript
_fee: uint256 = self.fee * dy // FEE_DENOMINATOR
```

The actual amount of tokens that will come out is dy minus the fee. 

```javascript
return dy - _fee
```

So, that's the function `get_dy`. 
