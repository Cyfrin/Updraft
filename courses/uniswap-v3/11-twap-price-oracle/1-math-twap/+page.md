## Uniswap V3 - TWAP

In Uniswap V3, the Time Weighted Average Price, or TWAP, is calculated using the geometric mean. This differs from Uniswap V2, where TWAP was determined by summing all prices for each second and dividing by the duration, which is effectively calculating the arithmetic mean. 

In Uniswap V3, the TWAP is calculated using the geometric mean of the prices. This is accomplished by multiplying all prices for each second, and if there are ‘n’ prices, we take the nth root of this product.

The geometric mean of a sequence of numbers a1, a2, a3, ... an can be expressed as:
```
a1 * a2 * a3 *.... * an
```
Since there are 'n' numbers we take the nth root of this.

To calculate the TWAP in Uniswap V3, we take the geometric mean of prices at each second. 
For example, say we have prices P(t1+1), P(t1+2), P(t1+3), up to P(t2), where these are the prices for each second in a time interval from t1+1 to t2.  To calculate the TWAP, we'll define the TWAP as 'P average':
```
TWAP = P avg
```
To calculate this we must first multiply all prices:
```
P(t1+1) * P(t1+2) * P(t1+3) ... P(t2)
```
Next, we take the n-th root of this multiplication. To determine the value of 'n', let's consider the number of terms between the start and end of our interval. For example, if we only have two prices t1+1 and t1+2, there are two terms. If we have three terms from t1+1 to t1+3, we can count that there are three terms. 

There is a mathematical equation to tell us how many terms there are within this range.  Starting from the last term t2, we subtract the first term t1+1:
```
t2 - (t1+1)
```
To include the first term we add a +1:
```
t2 - (t1 +1) + 1
```
When simplified, this yields:
```
t2 - t1
```
Which is the number of terms between our time interval.

Let’s consider the case where there are two prices, t1+1 and t1+2:
```
t1+2 - (t1 + 1) + 1
t1 + 2 - t1 - 1 + 1
= 2
```
This confirms our formula works.

Let’s look at another example with t1 + 1, t1 + 2 and t1 + 3, so where t2 = t1 + 3:
```
t1 + 3 - (t1 + 1) + 1
t1 + 3 - t1 -1 +1
= 3
```

Our equation correctly calculates how many terms there are within our range.

So to summarize, we multiply all the prices for a given interval, and then take the n-th root of that, which is equal to t2 - t1. 

Within a smart contract we don't want to multiply all of these prices as it is too expensive.  Uniswap V3 uses a state variable called ‘tick cumulative’. This tick cumulative, is an accumulator of all prices since the contract was deployed. We will first discuss ‘price’ and ‘tick’. We label ‘P’ as the ‘price’ which is the ratio of token Y over token X. So this gives us the price of token X in terms of token Y. We label 'T' as the 'tick' where the relationship between price and tick is:
```
P = 1.0001^T
```
Next, the price accumulator, labeled as a(t), where T(i) = tick at time i. So the price accumulator sums from i = 0 to i = t of all the ticks Ti. In other words, all the ticks from contract deployment.

Combining price accumulators and TWAP, we begin with our TWAP equation:
```
P avg =  (P(t1 + 1) * P(t1+2) * P(t1 + 3) ... P(t2)) ^ (1 / t2 -t1)
```
Now, we replace the prices with the ticks:
```
P avg =  ((1.0001^T(t1 + 1)) * (1.0001^T(t1+2)) * (1.0001^T(t1 + 3)) ... (1.0001^T(t2)) ^ (1 / t2 -t1)
```
Using properties of exponents:
```
P avg = (1.0001^(T(t1 + 1) + T(t1+2) + T(t1 + 3) ... + T(t2))) ^(1 / (t2- t1))
```
Notice how we’re summing a series of ticks, which is related to the price accumulator, so let’s rewrite our price and tick equations:
```
P = price
T = tick
P = 1.0001 ^ T
```
Also, let's label our ticks:
```
T(i) = tick at time i
```
Our price accumulator is written as:
```
price accumulator = a(t)
a(t) = SUM (Ti)    (from i = 0 to t)
```
Let's re-write our time-weighted average price equation:
```
P avg =  (P(t1 + 1) * P(t1+2) * P(t1 + 3) ... P(t2)) ^ (1 / t2 -t1)
```
Convert the prices to ticks:
```
P avg = (1.0001^T(t1 + 1) * 1.0001^T(t1 + 2) *  1.0001^T(t1 + 3) ...  1.0001^T(t2))^(1 / (t2- t1))
```
Using our exponent rules:
```
P avg = (1.0001^(T(t1 + 1) + T(t1 + 2) + T(t1 + 3) ... + T(t2))) ^(1 / (t2- t1))
```
Let's rewrite the exponentiation using the summation notation:
```
P avg = 1.0001 ^ (SUM(Ti)  from i = t1 + 1 to t2  ) / (t2 - t1)
```
Comparing this summation with the price accumulator, which sums from i = 0 to i = t:
```
a(t) =  SUM(Ti)    (from i = 0 to t)
```
We need to rewrite our summation to include terms from i = 0.

This can be done using the price accumulator:
```
SUM(Ti) from i=t1+1 to i=t2 = a(t2) - a(t1)
```
The a(t2) summation starts from i=0 and goes to t2, a(t1) also starts from 0, all the way to t1.  Subtracting these two leaves behind the necessary terms for the TWAP.  Let’s substitute this to write:
```
P avg = 1.0001 ^ (a(t2) - a(t1)) / (t2 - t1)
```
We can rewrite this using exponent rules to achieve:
```
P avg = 1.0001 ^ ( (a(t2) - a(t1)) / (t2 - t1) )
```
This is now a time weighted average of the ticks.

We have rewritten the TWAP to use the price accumulator to save on gas, while avoiding costly multiplication within the smart contract and still obtaining a time weighted average price.

Now we can rewrite this to show how they relate together:
```
  P avg =  (P(t1 + 1) * P(t1+2) * P(t1 + 3) ... P(t2)) ^ (1 / t2 -t1)
```
And we rewrite the inner prices using the ticks:
```
P avg = ((1.0001^T(t1 + 1)) * (1.0001^T(t1+2)) * (1.0001^T(t1 + 3)) ... (1.0001^T(t2))) ^ (1 / t2 -t1)
```
Then apply exponent properties:
```
P avg = (1.0001^(T(t1 + 1) + T(t1+2) + T(t1 + 3) ... + T(t2))) ^(1 / (t2- t1))
```
Also, as a reminder
```
P = price
T = tick
P = 1.0001 ^ T
```
Also:
```
T(i) = tick at time i
```
Also:
```
price accumulator = a(t)
a(t) = SUM (Ti)    (from i = 0 to t)
```
Again, let's rewrite using the summation
```
P avg = 1.0001 ^ (SUM(Ti)  from i = t1 + 1 to t2  ) / (t2 - t1)
```
```
SUM(Ti) from i=t1+1 to i=t2 = a(t2) - a(t1)
```
```
P avg = 1.0001 ^ ( (a(t2) - a(t1)) / (t2 - t1) )
```

This allows us to find the time weighted average using the price accumulator.

To combine these we begin with the equation for the time weighted average price between the time intervals t1 + 1 to t2, and we'll work our way down.  Our first step is to replace each price using the ticks:
```
P avg = (1.0001^T(t1 + 1) * 1.0001^T(t1 + 2) *  1.0001^T(t1 + 3) ... 1.0001^T(t2)) ^ (1 / t2 -t1)
```
Next we'll combine our bases:
```
P avg = (1.0001^(T(t1+1) + T(t1+2) + T(t1+3) ... + T(t2))) ^ (1 / t2-t1)
```
If you recall from high school math, you know that when you multiply same bases you add the exponents together. So we can rewrite this n-th root by using an exponent and a fraction, like so:
```
P avg =  (1.0001^(T(t1 + 1) + T(t1+2) + T(t1 + 3) ... + T(t2))) ^ (1 / t2 -t1)
```
Next, we'll rewrite the summation using the summation notation:
```
P avg =  1.0001^(  SUM(Ti) from i = t1 + 1 to t2  / t2- t1 )
```
Next we'll bring our attention to the price accumulator which we defined earlier:
```
price accumulator = a(t)
a(t) = SUM (Ti)    (from i = 0 to t)
```
Notice that we have something like a price accumulator, our summation goes from t1+1 to t2.

We need the summation from zero, so, we’ll first take the price accumulator up to time t2:
```
a(t2)
```
and then subtract from this, the price accumulator from 0 to t1:
```
a(t1)
```
This can then be written as:
```
SUM(Ti) from i=t1+1 to i=t2 = a(t2) - a(t1)
```
Which can then be added to our previous equation:
```
P avg = 1.0001 ^ ( (a(t2) - a(t1)) / (t2 - t1) )
```
This is now how we calculate the TWAP in Uniswap V3.

If we remember our price accumulator definition we can replace this sum in the exponent with price accumulators:
```
price accumulator = a(t)
a(t) = SUM (Ti)    (from i = 0 to t)
```
Let's compare this new equation to our price accumulator. 
Our price accumulator starts from i = 0.  In the current expression however we have i starting from t1 + 1. There are extra terms starting from i=0 up until t1. To compensate for this we can rewrite this using the price accumulator as:
```
a(t2) - a(t1)
```
So by subtracting this, this is what we have:

```
P avg = 1.0001 ^ ( (a(t2) - a(t1)) / (t2 - t1) )
```
This (a(t2) - a(t1)) / (t2 - t1) is called the time weighted average tick.  This is the equation used to calculate time-weighted average price in Uniswap V3.
