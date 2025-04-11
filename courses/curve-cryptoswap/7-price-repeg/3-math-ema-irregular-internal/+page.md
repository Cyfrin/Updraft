### Exponential Moving Average for Irregular Intervals

In this lesson, we will explore how to calculate the exponential moving average for irregular intervals.  Let�s start by reviewing how to calculate the exponential moving average for regular intervals.

For regular intervals, such as taking a moving average every second, we define two variables.  First,  p of t, which is the price at time t, and second, m of t, which will be the moving average at time t.  The algorithm to calculate the moving average for regular intervals works like this:

First, we will define m sub zero, which is the moving average at time zero, to be equal to the price at time zero.  The moving average for time t, greater than zero is defined recursively, based on the moving average at the previous time. We specify a value �a�, that is greater than or equal to zero and less than or equal to one. This value is fixed and is used to calculate the moving average for all time. The exponential moving average at time t, greater than zero, is defined as:
```javascript
aP_t + (1-a)M_(t-1)
```
On the blockchain, updates do not necessarily happen at regular intervals. To find the exponential moving average, we need to calculate it for irregular intervals. An update might happen after one second, or maybe after two seconds, or even after one hour.

Let�s define the problem.  We have a price graph for a token. The horizontal axis will represent time, and time moves from left to right. The vertical axis represents the price of the token. The price of the token, as time passes, will go up and down.  Let�s say that we want to take the moving average at time t sub zero, t sub one, t sub two, and so on, up to t sub n. The time between any of these two points are irregular. We�ll start by taking the moving average at t sub zero.  The price at t sub zero, we will denote as p of t sub zero.  Then two seconds later, we recalculate at time t sub one. After ten seconds, we recalculate again at time t sub two.  This will continue all the way up to t sub n. The time between these points are irregular.

So, how do we calculate the moving average in this case? First, we will define a variable that represents the moving average for irregular time. Let�s call this m star of t, which is the moving average with irregular intervals at time t.

The algorithm to calculate the moving average for irregular intervals is similar to that for regular intervals. First, start by initializing the moving average to the price. If we want to take the irregular moving average at time t sub zero, m star of t sub zero is set equal to the price at time t sub zero.  To calculate the moving average for time greater than t sub zero, let�s call this m star of t sub i. This will be equal to:
```javascript
aP_ti + (1-a)M*_t_(i-1)
```
So far this looks like the equation for regular intervals. However, the difference here is that the value of �a� will not be a constant but a variable depending on the time.  We will denote this value a as a of t sub i. It will be different for each time, however, one property must still be true is that a of t sub i is greater than or equal to zero and less than or equal to one.

Now we will show what this equation looks like when we unpack all of the exponential moving averages for all time t sub i.  We will start by expanding the exponential moving average at time t sub i minus one.

We copy and paste the previous equation here, and then what is m star at time t sub i minus one equal to? We can apply the previous definition again. So we apply the previous definition for m star of t sub i minus one.
```javascript
a_ti P_ti + (1-a_ti)M*_t_(i-1)
```
Copy and paste it here, and simply replace i with i minus one:
```javascript
a_ti P_ti + (1-a_ti) (a_(ti-1) P_(ti-1) + (1-a_(ti-1)) M*_t_(i-2))
```
So now, what we need to do is simply replace i with i minus one. Then replace i minus one with i minus two.
```javascript
a_ti P_ti + (1-a_ti) (a_(ti-1) P_(ti-1) + (1-a_(ti-1)) M*_t_(i-2))
```
And this is what m star of t sub i minus one is equal to. And then we multiply this by one minus a of t sub i. So, the equation looks like this:
```javascript
a_ti P_ti + (1-a_ti)a_(ti-1) P_(ti-1) + (1-a_(ti))(1-a_(ti-1))M*_t_(i-2)
```
We can keep expanding this until the last term, m star sub zero.  The prices in the past will be multiplied by these terms one minus a of t sub i. The last term will be multiplied by one minus a of t sub i multiplied by one minus a of t sub i minus one, all the way up to one minus a of t sub one.

The equation for the exponential moving average for regular intervals looks like this:
```javascript
aP_t + (1-a)aP_(t-1) + (1-a)^2aP_(t-2) + ... + (1-a)^(T-1)aP_1 + (1-a)^TP_0
```
Each term, as it goes further back in the past, is multiplied by a power of one minus a. The last term is multiplied by one minus a to the power of time elapsed.

And you can check for yourself that the equation for irregular intervals will match the equation for the regular intervals when all of these a of t sub i�s are equal to each other. So this is what the equation will look like when we expand all of the terms out.

Next, we will explain how a of t sub i is picked. The value for a of t sub i is picked so that one minus a of t sub i will exponentially decay with the time between t sub i and t sub i minus one. For example, in Curve V2, the value of a of t sub i is picked so that one minus a of t sub i will half after every interval, let�s call that h. So when the time difference between the last time the exponential moving average was updated and the current time is equal to zero, then it will return a one.  After h seconds, this value will be 0.5. And after another h seconds, this value will return half of that.  So that would be 0.25, and so on. Every h interval, the value will half.

We can also write this as a math equation:
```javascript
1-a_ti = 0.5^(dt_i / H)
```
After zero seconds, this will be equal to one.
```javascript
1-a_ti = 0.5^(0/H) = 1
```
After h seconds, this will be equal to 0.5
```javascript
1-a_ti = 0.5^(H/H) = 0.5
```
After two times h seconds, this will be equal to:
```javascript
1-a_ti = 0.5^(2H/H) = 0.5^2
```
Which will be equal to 1/4 or 0.25. And after three times h seconds, this will be equal to:
```javascript
1-a_ti = 0.5^(3H/H) = 0.5^3
```
or 1/8, which will be equal to 0.125, and so on.  

Every h interval, the value will half. This is how one minus a of t is picked in Curve V2. We can also write this as a math equation. One minus a of t sub i is equal to the value will be half after every h seconds.
```javascript
1-a_ti = 0.5^(H)
```
After 0 seconds, this will be equal to one:
```javascript
1-a_ti = 0.5^(0/H) = 1
```
After h seconds, this will be equal to 0.5
```javascript
1-a_ti = 0.5^(H/H) = 0.5
```
And after two times h seconds, this will be equal to:
```javascript
1-a_ti = 0.5^(2H/H) = 0.5^2
```
Which is 0.25, and after three times h seconds:
```javascript
1-a_ti = 0.5^(3H/H) = 0.5^3
```
This will be equal to 0.125. And so on. So we can generalize this by saying that
```javascript
1-a_ti = 0.5^(dt_i / H)
```
This is equal to e to the natural log of 0.5 multiplied by the time elapsed divided by h.
```javascript
1-a_ti = 0.5^(dt_i / H) = e^(ln(0.5) * dt_i/H)
```
You�ll see this equation used in Curve V2 to calculate the value of one minus a of t sub i.
