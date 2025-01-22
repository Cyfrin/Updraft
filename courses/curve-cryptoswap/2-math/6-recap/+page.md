# Curve V2's Equation Recap

Alright, let's recap what we've learned about Curve V2's equation.

The secret sauce that enables concentrated liquidity in Curve V2 is this component called `K`. This `K` is actually two parts: `K0` and `G`.
```javascript
K = K0G
```
`K0` is a component present in Curve V1's equation.
```javascript
K0 = xy/((D/2)^2)
```
For Curve V2, we multiply this `K0` by another component here named `G`.
```javascript
G = ((γ) / (γ + 1 - K0))^2
```
Next, we looked at the 3D graph for `K0` and `G`. We turned the 3D graph so the Z-axis will point up, the X-axis will point to the right, and the Y-axis will point to the left. Here, `D/2` represents when both the token balances of `X` and `Y` are exactly equal to `D/2`. Both in Curve V1 and V2, `D` has a special meaning, it represents liquidity. For a pool with `N` tokens, when the pool is perfectly balanced, each token will have `D/N` tokens. Here we are looking at an example with two tokens, hence `D/2`.

We first looked at the `K0` function, and saw that it peaked exactly at `D/2`. At `D/2` it was equal to 1, and as the token balances went further away from `D/2`, we saw that the function `K0` gradually decreased to 0. We observed a similar behavior for the function `G`. When the tokens are perfectly balanced, `G` is equal to 1. As the token balances go further away from `D/2`, this function will gradually decrease, but it does not decrease to zero. Since `K0` will decrease to zero, the function `G` will decrease to gamma over gamma plus 1 raised to the power of 2. But what I want to highlight is that the function `G` has a smaller range where it's close to one. When the token balances are both close to `D/2`, it is equal to 1. However, move a little bit to the right or left and it will quickly decrease. Compare this to the `K0` function where it gradually decreases to 0. Now let's see what happens to `K`. Remember that `K` is the component that is inside Curve V2's equation, and it's defined to be `K0` multiplied by `G`.
```javascript
K = K0G
```
Actually, to get the graph for K it's really simple. For each value of x and y, we take the value of `K0`, and then we take the value of `G`. By definition, we multiply this, and the resulting height on the z-axis is the value for `K`. We do this for all points `x` and `y` on Curve V2's AMM curve.

And again, notice that this component, `K`, peaks when both the token balances are exactly equal to `D/2`. Similar to function `K0`, this function `K` decreases to zero as both token balances go further away from `D/2`. However, since `K` is a multiplication of `K0` and `G`, we can see that `K` has a smaller range where it's close to 1, compared to `G` and `K0`.

Now what these curves here represent are how much weight to apply to constant sum AMM and constant product AMM. When the graphs that you see are close to the peak at 1, it means that the resulting AMM will behave more like the constant sum AMM. And when the curves that you see are closer to 0, it means that the resulting AMM will behave more like the constant product AMM.

Let me give you two visual examples of Curve V1 and Curve V2. So here we have the graph of constant sum and constant product. And let's start with Curve V1. On the bottom, you see the graph of `K0`. And again, the way to read this graph is when it is close to 1, it behaves more like the constant sum, and when it's close to 0, it behaves more like the constant product AMM.

On the top right, we have the graph of Curve V1. The way to visualize this is that we apply a weight to the constant sum AMM. The amount of weight to apply is defined by the graph below, which is the function of `K0`.

Now, when the token `X` and token `Y` balances are exactly equal to `D/2`, on the bottom it says we need to apply all of constant sum AMM, so at this point, the resulting curve, Curve V1's curve, will behave exactly like the constant sum AMM. And as the token balances go further away from `D/2`, it will behave more like the constant product AMM.

We can visualize Curve V2's graph in a similar manner. We first look at the function K, which tells us how much weight to apply for constant sum and constant product. What you'll notice from the green graph is that it has a narrow range where it acts like the constant sum AMM. Otherwise, it behaves more like the constant product AMM. As we sweep through the points of the constant sum, constant product, and then apply the weights that are defined on the bottom, we get a resulting graph for Curve V2, which can be seen on the top right shown in green. What you'll notice here is that the Curve V2 graph has a smaller range where it's flat like a constant product, compared to Curve V1's graph.

Finally, I'm going to show you another angle when we are comparing different AMMs. On the horizontal axis, we map the token balance. Here it is labeled as `X`. You can think about this `X` as being the balance of ETH in the AMM. And on the vertical axis, we map the price of `X`. For example, the price of ETH.

Now what's interesting is what's going to happen to the price of token X when the token balance of X is exactly equal to `D/2`, or close to `D/2`. Let's start with constant sum. The constant sum AMM will swap two tokens one to one. So the price of token `X` is exactly equal to 1 no matter what the token balance is. For example, let's say that token `X` is ETH, and token `Y` is WETH, the constant sum AMM with WETH and ETH will swap WETH for ETH, or ETH for WETH one to one no matter what the token balance is.

Next, we have the pricing for constant product. A good example to understand what this graph is doing is think token `x` equal to ETH again, and for token `y`, let's say it's a token like USDC or DAI. As you would expect, when the ETH balance of this pool - let's say ETH-USDC - when this ETH balance is low, the price of ETH will be high. On the other hand, when the token balance of ETH is high, this AMM will calculate the price of ETH to be low.
And here's the graph of the price for Curve V1. For this example, let's again say that token X is ETH, and let's say that token Y is stETH. These tokens have a similar price, so it makes sense to have a Curve V1 pool with these two tokens. When the token `x` and token `y` balances are exactly equal to `D/2`, on the bottom it says we need to apply all of constant sum AMM.

And now here is the price of Curve V2.
Notice that for Curve V2, it also has a flat region when token `X` balance is close to `D/2`. However, outside the narrow range, you can see that it quickly behaves like the constant product AMM.

So in summary, the K0 component in Curve V1 creates a large region where it acts like the constant sum AMM. However, in Curve V2, because this K0 is multiplied by another component called G, it results in a narrow range where it will act like the constant sum AMM. Outside of this range, it will act like the constant product AMM.

And that is how the K component in Curve V2's equation enables concentrated liquidity.
However, notice that this small region where it acts like the constant sum AMM, the price of token `X` is given as 1, or close to 1. However, this would be a terrible AMM if token `X` was ETH and token `Y` was USDC. This basically means that when ETH is close to D/2, that AMM will price ETH as equal to 1 USDC. But if you look at Curve V2's AMM in production, you'll see that it's doing well.
So how is it able to concentrate liquidity when the price of token x should not be equal to 1. For example, for ETH let's say the price should be 2000. How does Curve V2's AMM concentrate liquidity around the price of 2000? The way Curve V2 concentrates liquidity for a price other than equal to 1 is by what Curve V2 calls Price Scale. And this will be a topic for the next video.
