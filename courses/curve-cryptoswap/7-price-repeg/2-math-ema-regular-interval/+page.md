## Exponential Moving Average

In this lesson we will cover the exponential moving average. The Curve AMM has an internal price oracle that stores the exponential moving average of the prices. To understand how this is calculated and stored in the smart contract we first need to understand the math behind the exponential moving average.

The math involves two parts. The first part is understanding the exponential moving average for regular intervals. The second part is understanding the exponential moving average for irregular intervals.

Regular intervals means the price is updated at a regular interval, for example every one second. Irregular intervals means that there is no fixed duration for when the price is updated. This is the nature of the blockchain, there is no guarantee of when updates will happen.

Let's start by looking at the math for exponential moving average for regular intervals. Let's say we have a price of a token. On the horizontal axis we have the time. On the vertical axis we have the price of the token. We denote p of t to be the price at time t. The exponential moving average will be a smoothed out version of the price graph. Since the exponential moving average is taking some kind of average of the prices, the price given by the exponential moving average will lag behind the actual price.

To calculate the exponential moving average we first initialize m of zero to be equal to p of zero. The exponential moving average at time zero is initialized to be the price at time zero. For all values of t greater than zero, the exponential moving average will be defined as a weighted average of the current price, p of t, and the previous exponential moving average, m of t minus one. The weight is defined by a constant between zero and one. For example we could choose zero point five. We then multiply the current price p of t by a, and multiply the previous exponential moving average with one minus a. What's happening here is that it's taking a weighted average of the past and present prices.

Here is a summary of the algorithm:
```javascript
M0 = P0
Mt = aPt + (1-a)Mt-1
```
where 0 < a < 1.

Let's take a look at an example and it will also explain why this is called exponential moving average. To start let's calculate the exponential moving average at time t = 100. By definition this will be the current price, at time t = 100, added to the previous exponential moving average at time t = 99. To this we need to apply a weight. The exponential moving average at time 99 is equal to the constant, a, multiplied by the price at t=99, plus one minus a multiplied by the previous exponential moving average at t=98. The weight is defined to be a constant a. So to the current price we multiply it by a and to the previous exponential moving average we multiply it by 1 minus a.
```javascript
M100 = P100 + M99
M99 = aP99 + (1-a)M98
```
We can also expand m of 98 as
```javascript
M98 = aP98 + (1-a)M97
```
And this continues until we reach m of zero.

To see where the term exponential comes from we will expand m of 100.
```javascript
M100 = aP100 + (1-a)M99
```
We also know what m of 99 is, so let's unpack that
```javascript
M100 = aP100 + (1-a)(aP99 + (1-a)M98)
M100 = aP100 + (1-a)aP99 + (1-a)^2M98
```
And when we unpack m of 98
```javascript
M100 = aP100 + (1-a)aP99 + (1-a)^2(aP98 + (1-a)M97)
M100 = aP100 + (1-a)aP99 + (1-a)^2aP98 + (1-a)^3M97
```
We can check that when we expand all of the terms up to m of zero, we'll notice each term will have one minus a multiplied by a, and then multiplied by the price. And one minus a will be raised to some power. As we move to the right, the power that's being multiplied by 1 minus a will increase. Here we have 1 minus a to the power zero, here we have 1 minus a to the power 1, here we have 1 minus a to the power of two, and so on and at the end we will have one minus a to the power of 100. This is where the term exponential comes from. The prices in the past are multiplied by 1 minus a raised to some power. What is happening here is that prices in the past experience exponential decay.

So when we take the exponential moving average, the prices that contribute most to the average will be the prices that are close to the latest price.
