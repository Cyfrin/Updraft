# Concentrated Liquidity

In this lesson, we’ll be discussing how Uniswap V3 differs from Uniswap V2.

Imagine a DAI/USDC pool in Uniswap V2 where we have 100 tokens each. At this point, the price of one DAI is equal to one USDC. Let’s say we swap one DAI for one USDC. We will then have 101 DAI and roughly 99 USDC. At this point, the price of one DAI is roughly 0.98 USDC.

If we want to have a DAI/USDC pool so that after swapping one token for the other, the price remains between 0.99 and 1.01, then we would need far more tokens inside this pool. To be able to swap one DAI for some amount of USDC so that the price remains above 0.99, or to swap one USDC for some amount of DAI so that the price remains below 1.01, we will need 200 tokens each. 

Graphing this out on a constant product curve, X * Y = L^2, we will have 200 DAI and 200 USDC, which would produce the curve with 0.99 and 1.01.

Let’s say the price 0.99 corresponds to a point on the curve, and the price 1.01 corresponds to another point on the curve. When the amount of DAI in the pool is 200, and the amount of USDC is also 200, then on this curve we can swap one token for the other, and then after the swap, the price will remain inside 0.99 and 1.01. For the price to remain in these two price ranges, we roughly need only one token. But to produce this curve, we need 200 tokens.

In other words, we need 200 DAI and 200 USDC so that after swapping one token for the other, the price remains inside 0.99 and 1.01.

Zooming in, we can see that starting from the current price, say over here, to move this price to 0.99, the amount of USDC that goes out is this part. So we only need this much amount of USDC to support the price change from the current price to 0.99.

And likewise, for the price to increase from one to 1.01, the amount of DAI we’d need is this much. So if you have this much amount of DAI, and this much amount of USDC, then we can create a constant product AMM so that when we swap one token for the other, it will still remain inside the price ranges of 0.99 and 1.01. And the rest of the token, the tokens over here, and the tokens over here are no longer needed. And this is the core idea of Uniswap V3.

This is called Concentrated Liquidity. Concentrated liquidity means liquidity bounded within some price range.

Going back to our previous example, let’s say we have 200 USDC and 200 DAI. What Uniswap V3 does is, using these real amounts of tokens, 200 USDC and 200 DAI, and given the price ranges 0.99 and 1.01, it can construct a larger constant product curve, so that all of the 200 USDC and 200 DAI will be utilized within the price ranges of 0.99 and 1.01.

For example, let’s say that the current price is equal to one. We can swap out all of the 200 DAI so that the price will increase to 1.01. Or we can start from the current price equal to one, and swap out all of the USDC so that after the swap the price will be 0.99.

On Uniswap V2, the maximum amount of tokens we can swap so that the price remains inside 0.99 and 1.01 was one token. However, by concentrating our liquidity inside the price ranges, in Uniswap V3 we are able to create a pool that can swap 200 tokens.

If we were to construct the same curve in Uniswap V2, then we would roughly need about 40,100 tokens each. However, in Uniswap V3, by concentrating our liquidity, we only need 200 DAI and 200 USDC.

This 200 DAI and 200 USDC that is actually needed in this price range is called the real reserves. These are the actual amount of tokens that we need in this price range to create this green curve. This 40,100 token of USDC and 40,100 of DAI is called the virtual reserves. This is the hypothetical amount of tokens that are needed to create this green curve.

Let’s make a comparison of how much more efficient this Uniswap V3 curve is compared to the Uniswap V2 curve. If we were to create this green curve on Uniswap V2, then we would need 40,100 tokens. In Uniswap V3, we can accomplish this only by having 200 tokens. Dividing 40,100 by 200, this is roughly equal to 200.

```
40100 / 200 ≈ 200
```

So, in our example, by using Uniswap V3, we can amplify our liquidity by roughly 200 times.
