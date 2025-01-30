### Uniswap V3 Liquidity Delta

Now that we know how to calculate liquidity, given the amount of token X and the amount of token Y, along with the current price and price ranges P sub a and P sub b, we can answer what is the amount of token X and token Y that must be added when we are adding liquidity. And likewise, we can answer what is the amount of token X and token Y that will be removed when we remove liquidity.

We will first define two variables, where L sub zero is equal to the liquidity before, and L sub one is equal to the liquidity after. L sub zero can be the liquidity before adding liquidity, and L sub one is the liquidity after adding liquidity, or it can be L sub zero being the liquidity before removing liquidity, and L sub one being after removing liquidity. We will define delta L to be equal to L sub one minus L sub zero, and this is just taking the difference of the liquidity.

In this video, we will answer the question, how much delta X and delta Y to add or remove if the liquidity changes by delta L between P sub a and P sub b? Let's start with the case where the current price P is less than or equal to the lower price P sub a.

In this video, we will be covering what happens to the liquidity when we add liquidity. The math for liquidity delta when we remove liquidity is exactly the same.

Let’s say that we have liquidity L sub zero, between the price ranges P sub a and P sub b, and in this price range we add some delta X, and the liquidity increases from L sub zero to L sub one. In this case, what is the equation for liquidity delta?

Remember that liquidity delta is defined as L sub one minus L sub zero. In a previous video, we have derived that liquidity is equal to x divided by one over the square root of P sub a, minus one over the square root of P sub b. For L sub one, we can apply the same equation, except the amount of token x will be different. Here, the amount of token x will be the amount of token x that was before adding liquidity, plus the amount that was added, delta x. We are now ready to answer what delta L is.

By definition, delta L is equal to L sub one minus L sub zero. When we subtract L sub one from L sub zero, on the numerator we are left with delta X, and the denominator is the same. We get that delta L is equal to delta x divided by one over the square root of P sub a, minus one over the square root of P sub b.

This is the equation for delta L when the current price P is less than or equal to the lower price P sub a. This equation tells us how much delta x we need if we were to change the liquidity by this much. Let's say you're adding liquidity to a price range that is above the current price P. In this case, current price P will be less than or equal to the lower price you set, P sub a. When we apply this equation, we can tell the change in liquidity, and also the amount of token x that we need, if we were to change liquidity by this amount. For example, we know the amount of token x to put in between price ranges P sub a and P sub b and that the current price P is less than or equal to P sub a, we can then calculate the change in liquidity. Another application is if we know the change in liquidity, we can calculate the amount of token x we need to put in.

Next we'll derive the equation for delta L, or liquidity delta, when the current price P is above or equal to the upper price P sub b. To begin with, we'll say that we started with liquidity L sub zero, and to this we add some amount of delta Y, and liquidity increases from L sub zero to L sub one.
Let's now calculate delta L. We'll start with L sub zero.

We apply the equation that we derived in a previous video. We will do the same for L sub one. For L sub one, the amount of token Y has changed. Since we added liquidity, we added this amount of token Y. The amount of token Y we put in as the numerator is the previous amount of token Y, plus the amount we added, delta Y.

Now that we know L sub one and L sub zero, we can calculate delta L.
Again by definition, this is equal to L sub one minus L sub zero.
Notice that the denominator for L sub zero and L sub one are the same. The only difference is the numerator. When we subtract the numerator of L sub one from the numerator of L sub zero, we are left with delta Y. The denominator is the same. So we get delta L is equal to delta Y divided by the square root of current price P sub b minus the square root of P sub a.

What does this equation tell us and how is it useful? It tells us the amount of token Y that we need, and the change in liquidity if we were to add liquidity below the current price P. If we know the amount of token Y we want to put in between price ranges P sub b and P sub a, and the current price P is greater than or equal to P sub b, then using the equation, we can calculate the change in liquidity. Another application is if we know the change in liquidity, we can figure out the amount of token Y we need to put in.

For the last case we will consider, when the current price P is between the lower price P sub a and the upper price P sub b. In this case, between the price ranges P sub a and P sub b, we have some amount of token X, and some amount of token Y. Let's say that we added a delta X amount of token X, and a delta Y amount of token Y, and the liquidity increased to L sub one.

In this case, what is the equation for delta L?
To answer this question, we first need to follow our rule that says that the liquidity between the price ranges P to P sub b, must be equal to the liquidity from P sub a to P. Let me say that again: The liquidity from the current price P to P sub b must be equal to the liquidity from P sub a to P.

With this in mind, let's calculate L sub zero and L sub one.
L sub zero is equal to this expression:
```javascript
L0 = x / (1/sqrt(P) - 1/sqrt(Pb))
L0 = y / (sqrt(P) - sqrt(Pa))
```
We know that L sub zero is equal to the liquidity from the current price P to P sub b, and this must be equal to the liquidity from P sub a to P. The liquidity from P sub a to P is given by:
```javascript
L0 = y / (sqrt(P) - sqrt(Pa))
```
So this is the equation that L sub zero satisfies. For L sub one, we will have similar equations:
```javascript
L1 = (x + delta x) / (1/sqrt(P) - 1/sqrt(Pb))
L1 = (y + delta y) / (sqrt(P) - sqrt(Pa))
```
Here's the liquidity between the price P and P sub b, and notice that since we added delta x, on the numerator we have the previous X plus delta X. This must be equal to the liquidity from P sub a to P. And also note that on the numerator, we have a delta Y, because we added some amount of token Y.
These two equations must be satisfied for L sub one.

Let’s now calculate delta L.
By definition, delta L is equal to L sub one minus L sub zero.
For L sub one minus L sub zero, if we look at this side of the equation, if we do L sub one minus L sub zero, we see the denominators are the same, and the numerator is X plus delta X, minus X. So evaluating that equation, we get delta L is equal to delta X divided by one over the square root of the current price P, minus one over the square root of P sub b.
```javascript
deltaL = delta x / (1/sqrt(P) - 1/sqrt(Pb))
deltaL = delta y / (sqrt(P) - sqrt(Pa))
```
Likewise, if we do the subtraction on this side we will have
```javascript
deltaL = delta y / (sqrt(P) - sqrt(Pa))
```
And again, what do these equations tell us? How is it useful?
It tells us that if we were to add liquidity by delta L, then this is the amount of token X that we need to put in, and this is the amount of token Y we need to put in. Another application is, let's say that we know the amount of token X that we want to add liquidity between the current price P and the upper price P sub b.
Then we have the question, what is the amount of token Y that we need to put in between the price P and P sub a?
Using this equation, we will be able to solve for delta Y, and answer that question.
