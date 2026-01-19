## Swap Fees in Uniswap V2

Let's talk about swap fees in Uniswap V2. We'll discuss how swap fees are calculated and how we can factor them into our calculations when determining how much of a token we'll receive when we swap. 

A swap fee is charged on the token that is inputted into the liquidity pool.  To make our discussion concrete, let's say we are swapping DX for DY. We can represent the swap fee as a fraction of the input token DX. We'll call this fraction *F*. The swap fee rate *F* is a number between zero and one. One would mean that the entire input is taken as a fee, while zero would mean there are no fees.

We can calculate the swap fee by multiplying the swap fee rate *F* by the amount of DX inputted, *dx*.

```javascript
swap fee = f * dx 
```

For example, if the swap fee rate *F* is 0.5, then the swap fee would be half of the input amount of *dx*. 

Now, let's determine how to calculate the output amount of DY, *dy*, when we factor in swap fees. We can start by looking at the formula to calculate DY without considering any fees:


$dy = \frac{dx * y_0} {(x_0 + dx)}$


In this formula, *dx* represents the amount of DX we are inputting, $y_0$ is the amount of DY in the liquidity pool, and $x_0$ is the amount of DX in the liquidity pool.

In Uniswap V2, when a swap occurs, a fraction of *dx* is taken out as a fee. As we mentioned before, this swap fee can be expressed as $f * dx$.  We can modify our equation for DY to account for this swap fee by subtracting it from *dx* in the numerator and denominator.


$dy = \frac{dx(1 - f) * y_0} {x_0 + dx(1 - f)}$


In essence, we are multiplying *dx* by $1 - f$ in both the numerator and denominator to reflect the fact that a fraction of the input *dx* is taken out as a swap fee.

Let's go through an example of how to calculate DY, accounting for swap fees. Let's say we have a liquidity pool with 6,000,000 DAI and 3000 ETH. Uniswap V2 has a swap fee rate of 0.3%, or 0.003. If we are inputting *dx* of 1000 DAI, we can plug our values into our formula:

$dy = \frac{1000 * (1 - 0.003) * 3000}{6000000 + 1000 * (1 - 0.003)}$

$dy = \frac{1000 * 0.997 * 3000} {6000000 + 1000 * 0.997}$



We can now use a calculator to determine the value of *dy*, which would be approximately 0.498341 ETH. 
