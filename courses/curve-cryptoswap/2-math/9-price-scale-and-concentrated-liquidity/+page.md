# Curve v2 price scale and AMM equation

Let�s explore some more information about curve v2. So far, we have looked at price scales and transformed balances, and we have also looked at the curve v2 AMM from another angle.

On the horizontal axis we mapped the amount of tokens, and on the vertical axis, we mapped the price of the token. When we did this, it revealed that curve v2 has a small region where the price of the token is close to one, but if you have a pool where one of the tokens has high volatility, like WBTC, and then we pair that with a stable coin, like USDC, then we don't want to concentrate our liquidity where the price of the volatile token will be equal to or close to one.

So, how does curve v2 enable concentrated liquidity, when you want to concentrate your liquidity other than the price at one? For example, if we have USDC and WBTC and the market price of WBTC is 60,000 USDC, how can curve v2 concentrate liquidity around the price of 60,000 instead of a price equal to 1?

The answer to this is price scales and transformed balances.

The big idea for price scale is that by setting a suitable price scale, we will be able to concentrate liquidity around these transformed token balances. For example, instead of applying the actual token balances to the curve v2 equation, we will apply the transformed balances to the curve v2 equation. When we do this, the transformed balance will be close to d/2. Remember that for a pool with two tokens, d/2 will represent the amount of tokens for each token, when the pool is perfectly balanced, and notice that around d/2, liquidity is concentrated.

On the other hand, if we used this graph directly with the actual token balances, since in this example the WBTC balance is 100, then 100 will be somewhere over here. The price of WBTC will be determined by the graph, and it will be somewhere up over here.

However, the liquidity is concentrated over here. So, if we were to use the actual balance, then the liquidity would not be concentrated.

However, by using the transformed balances, we can swap in a small region where the liquidity is concentrated. Let's go through two examples.

In the first example we will swap one WBTC for USDC without transformed balances. The pricing of WBTC and the amount of USDC we will get back for swapping one WBTC will be defined by the green curve. Again, on the horizontal axis, we map the token balance of WBTC and on the vertical access, we map the price of WBTC. For a pool with two tokens, curve v2 concentrates the liquidity around d/2. Again, this represents the amount of tokens when the pool is perfectly balanced. For a pool with 100 WBTC and 6 million USDC, this d/2 turns out to be 27,985. How did I get this number? We will show this in the next video. For now, let's say we have 100 WBTC before this one WBTC comes in.

The amount of tokens that comes in is 1 WBTC. We're swapping 1 WBTC for some amount of USDC. Then the amount out will be 54,346 USDC. Again, we'll explain in the next video how I got those numbers. What I want you to remember here is that if you were to swap with the actual amount of tokens and then apply the curve v2 equation, the swap doesn't happen around here where the liquidity is concentrated. So for putting in 1 WBTC we will get about 54,346 USDC. For this and the next example, let's say that the current market price of WBTC is 60,000 USDC. With that in mind, let's move onto the next example with transformed balances.

Okay, this time we swap 1 WBTC to USDC with transformed balances. Again, the graph on the left will determine the price of WBTC. The liquidity is concentrated around here which is equal to d/2. And this time, instead of using the actual token balances, we use the transformed token balances and apply the curve v2 equation. Let's ask what is the d/2 value.

If we scroll back up, we said that d/2 represents the amount of tokens, when both token balances are exactly equal. In this example it turns out that both USDC and WBTC transformed balances are equal to 6 million, the token balances here are equal. This means the pool is perfectly balanced.

Going back now, d/2 is equal to 6 million. This says that the current transformed balance of WBTC is exactly equal to 6 million. So, if we were to do some kind of swap then we would get the benefit of concentrated liquidity. Again, let�s just give you the numbers. Amount in is 1 WBTC. Here, this is the actual amount of WBTC that came in. The amount out turns out to be 59,968 USDC.

If you compare this number, 1 WBTC and we get back 59,968 USDC, this is when we apply the curve v2 equation with the transformed balances.
If you compare with when we apply the curve v2 equation without transformed balances, the actual token balances, then putting 1 WBTC we get back 54,346 USDC. There is a difference of roughly 5000 USDC.

You can see here, by just looking at these numbers, that with this swap, we get the benefit of concentrated liquidity.

What we just did was swap near d/2, and when we did that since the liquidity is concentrated around here and the pricing behaves like a constant sum, if we put in one token, we are going to get exactly one of the other token back. Over here this is curve v2 acting like a constant sum. On a constant sum, if you put in one token, you get one of the other token back.

Over here, curve v2 acts like a constant sum, if we put in 1 WBTC, apply the price scale and this turns out to be 60,000 and we get the equivalent amount of USDC back. 1 WBTC, we need to transform it into the transformed amount in, we need to apply the price scale of 60,000.
```
1 x 60000
```
 and we get the transformed amount in as 60,000 and, since transformed amount in around here is approximately equal to the transformed amount out, and what we get back is that transformed amount out will be close to 60,000. The actual amount of transformed amount out by definition is equal to the change in the transformed balance of USDC. The balance of USDC before swapping minus the balance of USDC after swapping. And this is approximately equal to, we will use this part of the equation.

We're going to solve for the change in B0. Taking this 60,000 to get change in B0 we need to divide by P0.
```
60000 / P0
```
divide this number by P0. Since the price scale of USDC is equal to 1, this is equal to
```
60000 / 1
```
which is equal to 60000. This 60000 represents the transformed balance. The 60000 over here represents the actual balance of USDC.

So the summary here is that we did some simple math, and we said that when we swap around this d/2 the amount out should approximate 60,000 USDC, and the actual amount of USDC we got back is 59,968. The reason we were able to swap 1 WBTC for this amount of USDC is because we swapped near d/2, around d/2 liquidity is concentrated, and the price scale determines where liquidity is concentrated.
