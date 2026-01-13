## Concentrated Liquidity in Curve V2 AMMs

In this lesson, we will be revisiting the previous concept of concentrated liquidity in Curve V2 AMMs. In the previous video, we learned that Curve V2 AMMs concentrated liquidity by creating a narrow range where the price of tokens was equal to one.

As a recap, we mapped the amount of token X in the pool on the horizontal axis and the price of this token on the vertical axis. When the amount of token X is low, the price of token X is high, and when there are a lot of token X in the pool, the price decreases. We have the price for constant product AMMs, Curve V2 AMMs, and Curve V1 AMMs all on one graph. Curve V1 AMMs have a wide range where the price of token X is close to one. However, Curve V2 has a narrow range where the price is equal to or very close to one. This is shown in green. 

The "magic sauce" that enables Curve V2 to have concentrated liquidity is part of the equation. The equation is shown here:
```
K = AK0 * (g^2 / (g+1-K0)^2) 
```
This component is multiplied by two other components called `A` and `K0`.

`A` is the amplification parameter that controls how flat the curve is.

`K0` is a parameter that comes from the Curve V1 equation, and it is defined to be:
```
K0 = xy / (D/2)^2
```

`A` and `K0` are components that are present in the Curve V1 equation.

In Curve V2, this `AK0` is multiplied by the new component:
```
g^2 / (g + 1 - K0)^2
```
To understand what�s going on here, we will graph this part of the equation in a 3D graph. Since `K0` involves two parameters, `x` and `y`, this component takes in two parameters and the output will be another parameter. This will be mapped to the `z` axis. We will be using a 3D graph because the equation uses x and y as input, and therefore we need the z axis to map the output.  

We will map the equation:
```
g^2 / (g+1-K0) 
```
where:
```
K0 = xy / (D/2)^2
```
The equation will be mapped for points on different AMMs. If we take all the x and y points that are equal to `D/2` squared, this represents the equation of a constant product on a 2D graph.

By plugging all x and y points from the constant product equation into our equation, we can see what the 3D graph will look like.  What we can see in our 3D graph is an x and y axis and also a z axis that is facing us.

Now, we are looking at the curve from the perspective of someone in the Z dimension, but we will rotate the Z axis so that we can properly view it.

Now we have a view of our three dimensions. The X dimension is to the right, the Y to the left, and Z is going up and down.  

We can see some height to the graphs that we were originally looking at. When I make the graph "flat" by showing the Z axis pointing up, we have the horizontal X and Y, and the Z is going vertical. And when we rotate this slightly to the right we can see all three dimensions.

The point when `x` and `y` and `z` equal `D/2, D/2, and 1` is shown as a green dot. We can see that all the graphs go through this point. For all of the constant product points, when we evaluate the function `G`, what we get back is a line that looks like a constant product. Since we are taking all the points from a constant product and evaluating them through our function we can see that we get a line that appears as a constant product.

Curve V1�s K0 function is shown here in orange. Instead of showing you the output for G of x and y, we are showing you the outputs for K0.

Curve V1�s equation is equal to one when x and y are equal to `D/2`. Otherwise, it will decrease to 0. 

The function G decreases to 0 much quicker than K0. We can play around with the g parameter to see how this G function behaves. As we increase the g parameter we can see the purple curve becomes wider. And as we decrease it, we can see that the part that is not equal to 0 becomes more narrow. This is how the component `g^2/(g+1-K0)^2` that enables concentrated liquidity in Curve V2 looks on a 3D graph. 

What we should remember is that this component behaves like the K0 component but decreases to 0 more quickly.
