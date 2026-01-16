# Curve v2 AMM Fee Calculation

In this lesson, we will examine how the Curve v2 AMM fee is calculated dynamically based on token balances.

Inside the function named `_exchange`, the dynamic fee is calculated by calling an internal function named `_fee`.

We will be examining the code in this `_fee` function. In the next lesson we'll provide a graphical representation.

The first thing the `_fee` function does is unpack a state variable named `packed_fee_params`. This is a state variable that packs fee parameters.

The fee parameters are an array of size 3, which contains `mid_fee`, `out_fee`, and `fee_gamma`.

`mid_fee` represents the minimum fee multiplier. `out_fee` represents the maximum fee multiplier. `fee_gamma` sets how quickly the `mid_fee` increases to the `out_fee`.

Next, the math library is called to use a function called `reduction_coefficient`, passing in the token balances, `xp`, and `fee_params` up to 2. `fee_params` of 2 is the `fee_gamma`.

The function returns a variable called `f`, which is the fee multiplier to be applied to the equation. The next equation is:

```javascript
fee_params[0] * f + fee_params[1] * (10**18-f), 
10**18
```

The function `reduction_coefficient` calculates a value `f`.
```javascript
f = fee_gamma / (fee_gamma + 1 - K)
```
K is equal to:
```javascript
K = x[0] * ... x[N-1] / ((x[0] + ... + x[N-1]) / N)**N
```

When looking at the equation for K, the numerator `x[0] * ... x[N-1]` represents a geometric mean. The denominator `(x[0] + ... + x[N-1]) / N` represents an arithmetic mean. The value of K will be between 0 and 1.

Since K is a number between 0 and 1, we can calculate the upper and lower bound for f.

f will be smallest when the denominator is the largest, and the denominator is largest when K=0. When K=0, then f will be equal to `fee_gamma / (fee_gamma + 1)`.

f will be largest when the denominator is smallest. When K=1 then `fee_gamma / fee_gamma` or 1.

So the lower bound of f will be `fee_gamma / (fee_gamma + 1)` and the upper bound will be 1.

The function `reduction_coefficient` is located in the contract called `CurveTricryptoMathOptimized`. Inside the `CurveTricryptoMathOptimized` contract, the `reduction_coefficient` function first calculates:
```javascript
S = x[0] + x[1] + x[2]
```
It next calculates the value of K as:
```javascript
K = 10**18 * N_COINS * x[0] / S
```

```javascript
K = unsafe_div(K * N_COINS * x[1], S)
K = unsafe_div(K * N_COINS * x[2], S)
```
If `fee_gamma` is greater than 0, K is calculated as:
```javascript
K = fee_gamma * 10**18 / (fee_gamma + 10**18 -K)
```
It will then return K.

Going back to the main function we were looking at in `CurveTricryptoOptimizedWETH`, we can see that the fee multiplier is the weighted average between the `mid_fee` and the `out_fee`.

```javascript
mid_fee * f + out_fee * (1-f)
```

When f is equal to 1, then the code will return the `mid_fee`. When f is equal to 0, then the code will return `out_fee`.

When the pools are balanced then k=1, and f=1, which means the fee will equal the `mid_fee`.

When the pools are extremely imbalanced, k will be close to 0, f will be close to  `fee_gamma / (fee_gamma + 1)`, and the fee will be close to `out_fee`.
