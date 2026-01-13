### Creating a graph of a curve�s equation

On the right of the display, we can see a graph consisting of the constant sum, constant product, and curve v1 equations. In this lesson, we'll explore what the graph of the curve v2�s equation looks like.

To start, we'll first copy the equation of curve v1, then paste it in the curve v2 equation input.
```
AK0D(x + y) + xy = AK0D^2 + (D / 2)^2{x >= 0}{y >= 0}
```
Next, we'll modify the K0 parameter. Curve v2 introduces a new component called K, which extends K0. We'll change K0 to K. Next, we need to make the change in the equation as well. We'll replace the K0 with K here
```
AKD(x + y) + xy = AKD^2 + (D / 2)^2{x >= 0}
```
and here.
```
AKD(x + y) + xy = AKD^2 + (D / 2)^2{x >= 0}
```
Now,
```
K = K0()
```
We need to multiply by an expression that involves gamma.
```
K = K0(g / g + 1 - K0)^2
```
Now we must define what the parameter gamma is.
```
g = 1
```
Gamma will be a number between 0 and 1. In the real world, gamma is a small number, so we'll adjust the slider to reflect this.

So this is what the curve v2's equation looks like compared to curve v1.

The graph of curve v2 looks more like the constant product curve than the graph of curve v1's equation.

Looking at the graph, it is not obvious how concentrated liquidity is enabled.

Another question is, how does this graph handle volatile tokens? In the next lesson, we'll answer this question, and how this graph enables concentrated liquidity. Later on in another video, we�ll talk about price scales, which enable curve v2 to support volatile tokens.
