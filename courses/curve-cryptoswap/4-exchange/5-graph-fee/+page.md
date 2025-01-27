# Graphing Dynamic Fees

In this lesson, we will explore how the dynamic fee changes as we change the parameters for mid fee, out fee, and fee gamma, graphically.

We can begin by defining the parameters.
```javascript
f_mid=0.03
```
The first parameter we define is f of mid, which is equal to 0.03. This will be 3%.
```javascript
f_out=0.5
```
Next, we define f of out, which is the maximum fee, and set it to 0.5. This will be 50%.
```javascript
f_gamma=0.1
```
Lastly, we define f of gamma and set it to 0.1 to start.

Next, let's recreate the equation for the reduction coefficient. We'll name this r of k, and recall from the code that k is the product of all the token balances, divided by the arithmetic mean of the token balances, and then taken to the nth power. If we want to be precise, instead of passing in k we need to pass in all of the token balances, but k will range from 0 to 1. So we'll do that here, where on the horizontal axis we'll map the value of k from 0 to 1, and on the vertical axis, we will map the fee multiplier. So, r of k is:
```javascript
r(K)=f_gamma/(f_gamma+1-K)
```
This function calculates the reduction coefficient.

Now, let's recreate the function that calculates the fee multiplier. We'll call this F of K.
```javascript
F(K)=f_mid*r(K)+f_out*(1-r(K))
```
This is the graph that we get for the fee multiplier, where the horizontal axis will map the value of k, and the vertical axis will map the fee multiplier. The maximum fee multiplier will be 0.5, and the minimum will be 0.03. The fee multiplier f of k will change dynamically as k changes. K will range from 0 to 1, so we do not need to consider the rest of the graph.

Let's see where the mid fee and out fee are. We can define a y to equal f of mid, and another y to equal f of out:
```javascript
y=f_mid
y=f_out
```
Now we can see both mid fee and out fee represented on the graph. Next, what we can do is show f of k for k ranging from -infinity to infinity. This is what we will see with the dotted lines. Then we can show f of k for k between 0 and 1.

When k is equal to 0, this means the pool is extremely imbalanced. The fee that will be charged is closer to the maximum fee. When the pool is perfectly balanced, k will equal 1, so the fee that will be charged will be the minimum fee. So that's what's going on with the fee multiplier function.

Finally, we'll see what happens to this graph as we change the parameter for fee gamma. When we increase fee gamma, we can see that the fee multiplier graph becomes slanted, like a line. If we decrease this parameter, we can see that the pink graph bends more quickly. So we can see from here that when fee gamma is small, the fee multiplier will quickly increase from mid fee to out fee. However, when fee gamma is large, the fee gamma is slow to increase from mid fee to out fee.
