## Calculating Price From Tick

We will go over some examples of calculating the price given that we know the tick. For our first example, we will use the tick that was retrieved from the WETH/USDT pool. In this contract, WETH is token 0 (token x) and USDT is token 1 (token y). To get the price, which we will call p, we will use the following formula:
```javascript
1.0001 ** tick
```
Here is a print of the value of p:
```javascript
print(p)
```
The result is:
```
3.5319103213169284e-09
```
Notice that this number is equal to 3.53 and so on, multiplied by 10 to the negative 9. We are getting the price of WETH in terms of USDT.
Currently, the price of ETH is around 3500 USD.
The reason this number is so small is because we haven’t done the decimal conversion yet. To review, we said that P is equal to the ratio y/x, and this is the price of token x in terms of token y.

In our case, we said that token x is WETH and token y is USDT. WETH has 18 decimals, so one WETH is represented by 1e18 or 10 to the 18. And 1 USDT has 6 decimals, or 1e6, or 10 to the 6. Now, if we look at the ratio of:
```javascript
p = y/x
```
This is going to be the ratio of USDT divided by WETH. USDT has 6 decimals, so the numerator will also have 6 decimals for the ratio of P. The denominator is WETH, so that will be 18 decimals. This whole ratio will have a decimal of 1e-12.

That’s why we are getting such a small number, because we are multiplying the price of WETH in terms of USDT by this number 1e-12. If we remove these decimals from the price, then we’ll get a number that is closer to the market price. So from p, p is multiplied by 1e6 and then divided by 1e18. To cancel out the first 1e6, we’ll divide by 1e6:
```javascript
print(p / 1e6)
```
and to cancel out the 1e18, we’ll multiply by 1e18:
```javascript
print(p / 1e6 * 1e18)
```
When we print this we get 3531, and this shows that the price of one WETH in terms of USDT is roughly 3531.

## Calculating Price From Tick with Different Tokens

Next, let’s look at another example of calculating the price from a tick. This time we’ll use the USDC/WETH pool. In this pool, USDC is token 0 (token x) and WETH will be token 1 (token y).

In the last example, the pool was WETH for token 0 and USDT for token 1, but in this example, USDC will be token 0 and WETH will be token 1. Remember that the ratio p is equal to y/x, and this is the price of token x in terms of token y. For example, if we replace x with USDC and y with WETH we get that p will represent the price of USDC in terms of WETH. This number might be something like one USDC equals 0.0001 WETH. This number is a little bit harder to comprehend, because when we think about the price of WETH, we think about it in the opposite terms - the price of WETH in terms of some stable coin like USDC or USDT. So to get the price of WETH in terms of USDC, we’ll need to flip the p. One divided by p will be equal to the ratio x/y.

Here is the tick that I fetched from the pool USDC/WETH:
```
194609
```
The price p will again be equal to:
```javascript
1.0001 ** tick
```
Let’s print this out and see what the value is:
```javascript
print(p)
```
The result is:
```
282708536.8770063
```
And this is very large number. The current price of ETH in terms of USD is around 3000 to 3500, so this number is way off. As we mentioned, to get the price of WETH in terms of USDC, we will do 1/p:
```javascript
print(1/p)
```
And this will be equal to 3.53, which is a very small number. Again, this is due to us not having done the decimal conversion. So let's work through this. 1 WETH has 18 decimals, or 1e18, and 1 USDC has 6 decimals, or 1e6. We said that 1/p is the price of WETH in terms of USDC, and this ratio is given by x/y. In this pool, token x is USDC and token y is WETH. 1/p is equal to the ratio USDC divided by WETH. That would be 1e6 divided by 1e18, which is 1e-12. To remove this decimal, what we’ll need to do is take 1/p, then we’ll cancel out 1e6 by dividing by 1e6, and cancel out 1e18 by multiplying by 1e18:
```javascript
print(1 / p / 1e6 * 1e18)
```
And this gives us 3537, which is the correct price of WETH in terms of USDC.
