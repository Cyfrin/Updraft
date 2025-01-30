## Uniswap V3 Fee - Fee growth inside ticks

In the previous lesson, we explored a simple example of calculating the collected fees by multiplying liquidity and fee growth. However, this calculation gets more complex when we also consider the fee growth going outside the price range of a given position.

Let’s consider a liquidity position with a range of -3 to +3. As the price changes, sometimes the fee growth will go out of bounds, and at other times the fee growth is within the liquidity position. So, how do we calculate the fees that are collected? 

The main concept is to calculate the fee growth within the liquidity position's price range and then multiply by the liquidity amount.

To start, let's imagine a simple scenario where we have two ticks, `i_lower` and `i_upper`, representing our liquidity position. Let's assume that all fee growth will be within these two ticks. The fee growth inside these two ticks is simply equal to the fee growth. We can conceptualize the height of this fee growth, which is equal to the height of the orange line, as the fee growth inside the position.

Let's move on to a more complex scenario where we have a liquidity position with the same ticks, `i_lower` and `i_upper`, but the fee growth goes past `i_lower` and then eventually goes past `i_upper`. In this case, what is the fee growth inside the liquidity position? The fee growth inside this liquidity position is highlighted as a green rectangle between these two ticks. So, how do we calculate this fee growth inside?  We can do so by starting with the total fee growth, then subtracting the fee growth above `i_upper` as well as the fee growth below `i_lower`. Let's label the fee growth below `i_lower` as `f_b` (fee growth below) and the fee growth above `i_upper` as `f_a` (fee growth above).

To calculate the fee growth inside, we are interested in the length of the orange line or the height of the green rectangle. To do this we start with the current fee growth, `f_g`, then subtract the height of the red rectangle, `f_b`, and finally, subtract the height of the other red rectangle we called `f_a`. This will give us the height of the green rectangle. Thus, `f_g - f_b - f_a` is the fee growth inside.

Now, what if we have an even more complex case? What if the fee growth goes below `i_lower` and then returns and reenters the liquidity position?  What if it exits the liquidity position and then later comes back? In this case, we would sum all the heights of the green rectangles, this is the part of the fee growth that is within the two ticks. To calculate the fee growth inside, we take the current fee growth, and then subtract from that the fee growth below as well as the fee growth above. And this will give us the sum of the heights of the green rectangles, or the length of the orange line.

Now, we can generalize this idea to create an equation for the fee growth inside:

```javascript
f_b(i) = Fee growth below i
f_a(i) = Fee growth above i
f_r(i_l, i_u) = Fee growth inside i_l and i_u
                = f_g - f_b(i_l) - f_a(i_u)
```

We can define a function called `f_b(i)` to be equal to the fee growth below tick `i`. We can also define a function called `f_a` that takes in a tick as input, and this is defined to be the fee growth above tick `i`. We can define a function called `f_r` which takes in two inputs, tick lower and tick upper. This function is equal to the fee growth inside tick `i_lower` and `i_upper`. From the example, this is equal to the current fee growth minus the fee growth below tick `i_lower` minus the fee growth above tick `i_upper`.

This is a general equation for calculating the fee growth inside two ticks. Once we are able to come up with an explicit formula for the fee growth below tick `i` and the fee growth above tick `i`, then we will be able to calculate the fee growth inside the two ticks `i_lower` and `i_upper`. And after this calculation we multiply by the liquidity in order to calculate the amount of fees that can be collected by a liquidity position. Even if the fee growth goes out of bounds of `i_lower` and `i_upper` at times.
