## Uniswap V3 Fee - Fee Growth

Previously, we looked at how to calculate fees for a liquidity position. We also mentioned that part of the equation is called fee growth. It is a state variable inside the code of Uniswap V3 that tracks the fee for each position.

In this lesson, we will dig a little deeper and explain more about fee growth.

We will begin by explicitly defining what fee growth is. Imagine the case that swap collects a fee of fᵢ of token Y in liquidity Lᵢ for i ranging from 0 to some number N.

We will define fee growth f_g to be equal to
```
f_0/L_0  + f_1/L_1 + ... + f_N/L_N
```
We will add up all the liquidity that was collected at a liquidity, and then divide by the liquidity.  For example, let’s say that a fee of f_0 was collected, and at that time the liquidity was L_0. Then we would do f_0 divided by L_0.

We add up all of this from i=0 to i=N.  We can write this in a concise way
```
∑ fᵢ/Lᵢ
i=0
```
Starting from i = 0 go all the way up to N, and for each i add the terms fᵢ divided by Lᵢ.  

We recall from a previous video, that when we multiply this number by the liquidity of a position, then we can calculate the fee that was collected by that liquidity position.

So this is fee growth.  Next, let’s give an example of how we can visualize fee growth.

We will use token Y for this example. The way we will think about fee growth is that on the horizontal access, we will think about the ticks, and we map the fee growth on the vertical axis. 

Let’s say that there was a swap of token Y to token X, and it collected a fee on token Y.  This is because token Y is token in, and in Uniswap V3 fees are collected on token in.  So, when there is a swap of token Y to token X, two things will happen on this graph.  The fee growth will increase and the current tick will move right.  The current tick moves right because there is a swap more token Y is coming in, and more token X is going out.  The fee growth will increase because we are collecting fee on token Y.

We can visualize this as a diagonal line that increases as the tick moves from left to right.  The tick moves from left to right because there was a swap, and the fee growth increases because we are collecting fees on token Y.  We do this simultaneously, and we get a diagonal line.

What happens when there is a swap from token X to token Y?
Here, we are just mapping out the fee growth of token Y. When there is a swap from token X to token Y, again, fee is collected on token in. In this case, token in is token X, so no fee is collected on token Y since it is token out. How would we map this on the graph on the left? Since there is no fee that is collected, the fee growth will remain the same.  However, since there was a swap from token X to token Y, the current tick will move left.

On the graph it will look like a straight line that moves from right to left. It moves from right to left because there was a swap that moved the tick from right to left, and this line is a flat line since there is no fee growth.  This pattern repeats every time there is a swap. The tip of this zig-zag will represent the current fee growth and the current tick. This is how we think about fee growth.

Now, for this example, we used fee growth on token Y. For token X, it is similar but slightly different. The difference is when there is a swap of token X to token Y then the fee growth on token X will increase. On the graph to the left, it will look something like this. The tick will move from right to left and since the fee growth increases on token X, we will have a diagonal line that increases as it moves toward the left. Similar to what we said about fee growth on token Y, when there is a swap from token X to token Y no fee is collected on token X. So there will be no fee growth, however, the tick will move from left to right. What it would look like on a graph is this flat orange line.  As the tick moves from left to right, there is no increase on the fee growth of token X, so it will be a flat line.
