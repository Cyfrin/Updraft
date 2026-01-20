In this lesson, we'll walk through how the `getAmountOut` function in the UniswapV2 library calculates the amount of tokens coming out of a swap.

Let's start by looking at the `getAmountOut` function.

```javascript
// given an input amount of an asset and pair reserves, returns an equivalent amount of the other asset
function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
    require(amountIn > 0 && reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
    // NOTE: 
    // x = token in
    // y = token out
    // dx = amountIn * 997 / 1000
    // dy = dx * 997 / 1000 * yo
    // ---------- 
    // xo * 1000 + dx * 997
    // NOTE: dx * 997
    uint amountInWithFee = amountIn.mul(997);
    // NOTE: dx * 997 * yo 
    uint numerator = amountInWithFee.mul(reserveOut);
    // NOTE: xo * 1000
    uint denominator = reserveIn.mul(1000).add(amountInWithFee);
    // NOTE:
    // dy = dx * 997 / 1000 * yo
    // ---------- 
    // xo * 1000 + dx * 997
    amountOut = numerator / denominator;
}
```

In this function, we calculate the amount out, `amountOut`, using a formula that we previously derived. We denote `amountIn` as `dx` and `reserveOut` as `yo`, the amount of tokens that are coming out of the swap. We calculate the `amountInWithFee` by multiplying `amountIn` by 997 and dividing by 1000.

We also have the numerator, which is `amountInWithFee` multiplied by `reserveOut` or `dx * 997 * yo`.

The denominator is `reserveIn` multiplied by 1000 added to `amountInWithFee`.
```javascript
// NOTE: xo * 1000
uint denominator = reserveIn.mul(1000).add(amountInWithFee);
```

We denote `reserveIn` as `xo`, the current reserve for the token going into the swap.

The denominator translates to `xo * 1000 + dx * 997`. 

The `amountOut` is then calculated as the `numerator` divided by the `denominator`. 
```javascript
amountOut = numerator / denominator;
```

We can see that the code reflects the equation we derived:
```javascript
// dx * 997 / 1000 * yo 
// ---------- 
// xo * 1000 + dx * 997
```

We'll cover the rest of the code in our next lesson.