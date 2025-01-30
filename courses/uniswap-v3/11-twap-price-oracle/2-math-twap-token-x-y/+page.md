### Calculating TWAP for Token X and Token Y in Uniswap V3

In Uniswap V3, if we know the average price of token X, then we can easily calculate the average price of token Y. We would simply take the reciprocal of the average price of token X. However, this equation does not apply in Uniswap V2.

Let's define some terms:

Let's call P of X the spot price of token X, in terms of token Y. A easy way to remember is having token X equal to ETH and token Y equal to some stable coin, like USDC. We will label P of Y to be the spot price of token Y, in terms of token X. For spot price, both in Uniswap V2 and in Uniswap V3, this is true:
```
P_y = 1 / P_x
```
If we know the spot price of token X, then we can calculate the spot price of token Y to be equal to 1 over the spot price of token X. 

However, when we take the time weighted average price of token X and token Y, this is not true in Uniswap V2.

Let's label P of X average to be equal to the TWAP of token X, and P of Y average is the TWAP of token Y.  In Uniswap V2, the time weighted average price of token Y, P of Y average, is not equal to 1 over the time weighted average price of token X:
```
P_y avg != 1 / P_x avg
```
However, in Uniswap V3, this is true:
```
P_y avg = 1 / P_x avg
```
If we know the time weighted average price of one token, then if we just do 1 over that, we get the time weighted average price of the other token.

Let's go through an example of calculating the time weighted average price of both tokens, both in Uniswap V2 and in Uniswap V3. We'll start with Uniswap V2, and show that just because we know the time weighted average price of one token, it doesn't mean that if we take 1 over that, we'll get the time weighted average price of the other token.

Let's calculate the time weighted average price using a simple example. Let's say that at time 0, the price of token X was equal to 3000, and that from time 1 all the way up to time 3, the price was at 1000.

To calculate the time weighted average price of token X in Uniswap V2, all we have to do is, take the price at each second, add them all up, and then divide by the duration. From time 0 to 1 we have 3000, from time 1 to 2 we have 1000 and from time 2 to 3 we have 1000 again.
```
P_x avg = (3000 + 1000 + 1000) / 3
```
So on top we have 3000 plus 1000 plus 1000, and the whole duration is 3 seconds. So we divide the sum of the prices by 3.
```
P_x avg = 5000/3
```
And we get 5000 divided by 3. How about the time weighted average price of token Y? Given that the spot price of token X was 3000 from time 0 to 1, and then 1000 from time 1 to 3, the spot price of token Y can be calculated by taking 1 over this price.
This will use this equation from earlier in the lesson:
```
P_y = 1/P_x
```
So the spot price of token Y at each second is calculated by just taking 1 over the price of token X.  So the first one will be 1 over 3000, and the next two will be 1 over 1000. The whole duration is 3 seconds.
```
P_y avg = (1/3000 + 1/1000 + 1/1000) / 3
```
Simplify this and we get 7 over 9000.

And now let's compare the time weighted average price of token X with the time weighted average price of token Y. Let's start with the time weighted average price of token Y. We calculated this to be equal to 7 over 9000. Now, we want to compare this with this equation:
```
P_y avg != 1 / P_x avg
```
We want to double check that just because we know the time weighted average price of token Y, doesn't mean that we also know the time weighted average price of token X. What is 1 over the time weighted average price of token X? Well, this is equal to, we just flip the denominator and the numerator, and the 5000 goes to the bottom, and the three goes to the top.
```
1/P_x avg = 3 / 5000
```
As we can see, these two are not equal. So we have just shown that in Uniswap V2, just because we know the time weighted average price of one token, doesn't mean that we can simply calculate the time weighted average price of the other token by taking 1 over that time weighted average price.

So this is an example of Uniswap V2. How about in Uniswap V3? We said earlier that if we know the time weighted average price of one token, then we can easily calculate the time weighted average price of the other token. So let's go through a simple example using the same price over the same duration.

To calculate the time weighted average price in Uniswap V3, we first need to calculate the time weighted average tick. Let's call T of X avg to be equal to the average tick of the price of token X, and lets name T of Y average to be equal to the average tick of the price of token Y. Once we figure out the average ticks, to calculate the average price, we would take 1.0001 raised to these average ticks.

Okay, let's start by calculating the average tick of token X. From the previous example, we had the price equal to 3000 for the first second and 1000 for the next two seconds. To calculate the tick given the price, we would need to take the log of 1.0001, for each of the prices.
```
T_x avg = (log_1.0001(3000) + log_1.0001(1000) + log_1.0001(1000) )/3
```
The duration is three.
This turns out to be roughly equal to 72743.

Okay next, let's calculate the time weighted average tick for token Y. Given that the spot price of token X was 3000, 1000, and 1000, the spot price of token Y would be taking 1 over this price.
```
T_y avg = (log_1.0001(1/3000) + log_1.0001(1/1000) + log_1.0001(1/1000)) / 3
```
The whole duration is 3 seconds.
Now, although these two equations don't look similar, here's the interesting part. This 1 over 3000, we can convert it to minus log of 1.0001 of 3000, and the same for the next two terms.
```
T_y avg = (-log_1.0001(3000) - log_1.0001(1000) - log_1.0001(1000)) / 3
```
Now, notice that the first term for the time weighted average tick of token X is equal to the time weighted average tick of token Y, except we have a minus here. So this is roughly equal to -72743.

Let's now calculate the time weighted average price in Uniswap V3. This is given by the equation of 1.0001 raised to the time weighted average tick of token Y. We calculated this time weighted average tick of token Y to be roughly equal to -72743.
```
P_y avg = 1.0001^T_y avg  
= 1.0001^-72743
```
Now notice this part, this is roughly equal to 1.0001 raised to the time weighted average tick of token X.
```
P_y avg = 1 / 1.0001^T_x avg  
= 1 / P_x avg
```
So we showed here that in Uniswap V3, if we know the time weighted average price of one token, then we can easily calculate the time weighted average price of the other token by taking 1 over that.

So now let's go through the math to see why that the time weighted average price of one token is equal to 1 over the time weighted average price of the other token.

We'll name T sub i to be equal to the tick at time i. And let's say that P sub x sub i, is the price of token X at time i, and this is equal to 1.0001 to the tick sub i. To calculate the spot price of token Y at time i, we would take 1 over the spot price of token X at time i.
```
P_y i = 1 / P_x i
```
From this equation, we can derive a useful equation that we'll use later. The right part of this equation is equal to 1 over 1.0001 to the tick sub i. But this is equal to 1.0001 to the minus tick sub i. Now, let's say that we wanted to calculate the time weighted average tick of token X over some time interval, where the duration is equal to n.
```
T_x avg =  SUM(T_i) / n
```
Then the equation is given by this formula.
Add all of the ticks from time T1 plus 1, all the way to T1 plus N, and since there are n terms, divide this by n. Okay, and to calculate the time weighted average tick of token Y, we will need to do something similar except what will be the tick for token Y at time i. We can take a look at this equation to figure out what the tick is for token Y. At time i, the tick is given by -T sub i.
```
T_y avg =  SUM(-T_i) / n
```
So the average tick over the same duration n, will be equal to the summation from i equals to t1 plus 1 to t1 plus n and we sum up all of the minus T sub i and then there are n terms, so we divide by n.

The difference between the time weighted average tick of token X, and the time weighted average tick of token Y is that here, we have a minus, and here, we don't have a minus.
So rewriting T sub Y average, we can just simply put minus T sub X average. And this is equal to 1 over the time weighted average price of token X.
```
P_y avg = 1.0001 ^ T_y avg 
= 1.0001 ^ -T_x avg
= 1 / P_x avg
```
