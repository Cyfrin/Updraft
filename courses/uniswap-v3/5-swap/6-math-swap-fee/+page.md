# Uniswap V3 - Swap Fee

The function `computeSwapStep` inside the library contract `SwapMath` computes the amount of tokens to come in, tokens to come out, and fees given the price ranges and the liquidity. This function is called inside the function swap of the Uniswap V3 Pool contract and returns the next square root price X96, amount in, amount out, and fees. The way the fee is calculated inside this function can be a little bit confusing. So in this lesson, we will go over the math of how the swap fee is calculated.

The swap fee is charged from the amount in. In this lesson, we'll say that the token coming in is token X and the token going out is token Y. F is equal to the swap fee percentage and this value will be between 0 and 1. Capital A is equal to the amount in before the swap fee, and the fee is equal to A * F. The swap fee is charged on the amount of tokens that come in so we can say that the fee is equal to A * F. A is the amount in before the swap fee and F is the swap fee percentage.

The lowercase a in represents the amount in after the swap fee. Since A is the amount in before the swap fee and we already have an expression for the fee we can rewrite a in, which is the amount in after the swap fee to be equal to A - fee. This amount must be less than or equal to the maximum amount in. The maximum amount in this case is the amount of token X that can come into this liquidity until the current price reaches the lower price P sub A.

We can imagine that as more token X comes in and more token Y leaves this liquidity, then the price will shift over to the left and the amount of token X inside this liquidity will increase. And at this point where the current price P is equal to P sub A, the liquidity is all in token X. And the maximum amount of token in is the amount of token X that can come in until the current price reaches the lower price, P sub A.

And A sub out represents the amount out. A sub out must be less than or equal to the maximum amount out. In this case, the maximum amount out is the amount of token Y that can leave this liquidity until the current price reaches the lower price, P sub A. We can imagine that as the current price shifts over to the left, the amount of token Y in this pool will decrease until the current price reaches the lower price P sub A. So the maximum amount of token Y that can leave the pool is the amount of token Y between the price ranges P and P sub A.

With these variables defined, let's now derive the equation for the fee. There are two cases to consider, exact out and exact in. Exact out means that the caller specifies the amount of tokens to leave the pool, and Uniswap V3 will calculate the amount of tokens that must come in. Exact in means the caller specifies the amount of tokens to come in, and Uniswap V3 will calculate the amount of token that will go out.

For exact out, we first need to find the maximum amount out from P to P sub A, or in other words, from the current price to the lower price. Let’s go back up to where we had the diagram. In this case the maximum amount of token that can come out is the amount of token Y over here. This will be the maximum amount of token out. We first need to calculate what the maximum amount out is between the price ranges, and we will calculate a sub out. Once we calculate the maximum amount of token out we can calculate the amount in and from that we can calculate the fee. So we have:
```
Find max amount out from P to Pa -> calculate a out -> calculate a in -> calculate fee
```

To calculate the fees we'll use the equation that we derived earlier. At this point we know what a in is. Using the following equation, we'll work our way backwards to calculate the fee. We said that:
```
a_in = amount in after swap fee
a_in = A - fee
```
And
```
fee = A * F
```
So
```
a_in = A - A * F
a_in = A * (1-F)
```
If we divide both sides by 1 - F we get:
```
a_in / (1-F) = A
```
And we said that:
```
fee = A * F
```
So we can substitute the formula for A and we get:
```
fee = (a_in / (1-F)) * F
```
For exact in, it turns out there are two cases to consider:
```
a_in = max amount in
a_in < max amount in
```
We’ll start with the case where `a_in` equals max amount in. This is when the token in is token X, and the token out is token Y. When the current price decreases, the first step is to find the maximum amount in from P to P sub A. In this diagram, the maximum amount of token that can come in is the amount of token X over here. So this will be our `a_in`. Once we calculate the maximum amount in we can calculate amount out, and then we can calculate the fee. So we have:

```
Find max amount in from P to Pa -> calculate a in -> calculate a out -> calculate fee
```
We said previously that the amount in after swap fee is equal to A minus fee. And:
```
fee = A * F
```
We're using the following equation. The swap fee is equal to the amount in before swap fee times the swap fee percentage. We can replace the fee using A * F. So a in is equal to A - fee which is equal to A * (1-f). We found out that A sub in is a * (1-f), so we divided both sides of the equation by (1-F) which gave us a sub in by 1 minus f is equal to A.
```
a_in / (1-F) = A
```
And
```
fee = A * F
fee = (a_in / (1-F)) * F
```
For exact in, we can use the following when a in is equal to max amount in. In this case token X will come into this liquidity and it will swap all the token Y for token X. At the end, we’ll have the current price equal to the lower price P sub A and all the liquidity will be token X. In this case, the fee is the same as the other fee. So:
```
fee = (a_in / (1-F)) * F
```
However if a in is less than max amount in, the amount of token X will come in and some amount of token Y will leave the liquidity. So the current price will shift to the left, however, it will not reach the lower price P sub A. In this case, we can calculate the fee as:
```
fee = A - a_in
```
and
```
a_in = A - fee
```
So
```
fee = A - (A - fee)
fee = fee
```
A is the amount of token in before the swap fee is deducted and `a_in` is the amount of token that will come in which includes the swap fee. And if we take the difference we get the fee back. This equation comes out to:
```
fee = A - a_in
```
Going back to the function `computeSwapStep`, if we look at where the fee is calculated we can see the code. The way it calculates the fee is it takes the amount remaining and subtracts the amount in. This amount in that you see over here is the amount in we saw in the math equation.

```javascript
function computeSwapStep(
    uint160 sqrtRatioCurrentX96,
    uint160 sqrtRatioTargetX96,
    uint128 liquidity,
    int256 amountRemaining,
    uint24 feePips
)
internal
pure
returns (
    uint160 sqrtRatioNextX96,
    int256 amountIn,
    int256 amountOut,
    uint256 feeAmount
)
{

```

```javascript
    if (exactIn && sqrtRatioNextX96 == sqrtRatioTargetX96) {
            // we didn't reach the target, so take the remainder of the maximum input as fee
            feeAmount = uint256(amountRemaining) - amountIn;
        } else {
            feeAmount = FullMath.mulDivRoundingUp(amountIn, feePips, 1e6 - feePips);
        }

```
So that is an explanation of how the swap fees are calculated.
