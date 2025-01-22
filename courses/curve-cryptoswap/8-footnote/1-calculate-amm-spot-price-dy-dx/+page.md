# Calculate AMM Spot Price Using dy/dx

The spot price of an automated market maker (AMM) can be calculated by taking the derivative of their curves. Once we calculate the derivative, we can calculate the spot price by feeding in the token amount into the derivative. This is the relationship between token x in the pool and the spot price of token x.

For the constant sum AMM, the price is always equal to 1. The spot price of the constant product AMM is shown in blue. Curve B1 is shown in orange, and curve B2 is shown in green.

We can use the equation of the constant product AMM to illustrate how the derivative of an AMM represents the spot price. In orange, we see the curve of a constant product AMM. The blue line represents the derivative of the constant product at that point. Let's say that we do a trade for some amount of token x, put in token x, and get back out token y. The resulting token balance is represented here. When we take the difference dy / dx, this will give us the exchange rate of the trade. The spot price of the AMM is simply the exchange rate when we make this dx really small. 

As we decrease the amount of token x that is swapped in, we can see that the slope of the line approaches the slope of the blue curve, which represents the derivative at this point. So this is the intuition of why taking the derivative of the AMM will give us the spot price. The spot price basically tells us that if we were to do a small trade, what is the exchange rate? This is calculated by taking the derivative of the AMM.

The derivative of the constant sum and constant product are easy to calculate. This is because we can isolate the variable y from the equation. For example, from the equation of the constant product AMM:
```
x * y = d / 2 ^2
```
We can solve for y by bringing the x over to the right. Then, taking the derivative will give us the spot price of the constant product AMM. This is not the case for curve B1 and curve B2.

Take a look at the equation for curve B1.
```
AK_0D(x + y) + xy = AK_0D^2 + (D/2)^2
```
The equation is complex, and there is no easy way to bring y over to one side of the equation and everything else to the other side. These equations are called implicit functions. However, we can still find the derivative of these complex equations.

The technique used to calculate the derivative of an AMM is called implicit differentiation. The derivative of an AMM is given as:
```
dy / dx
```
Under certain conditions, we can calculate this derivative by taking the partial derivative with respect to x and dividing it by the partial derivative with respect to y. If the function was:
```
x * y = L^2
```
Then, taking the partial derivative with respect to x you will get y. Taking the partial derivative with respect to y you will get x. The spot price of the constant product is:
```
- y / x
```
Which agrees with what we saw in the example.

Now, back to the graph, in this video, we're going to quickly explain how we used Python to calculate the derivatives of curve B1 and curve B2.

The file we will show you is called amm_dy_dx.ipynb. First, we will need to install all of the Python dependencies.
```bash
pip install sympy
pip install numpy
pip install matplotlib
pip install scipy
```
Sympy is used to calculate partial derivatives. Numpy is used for math calculations. Matplotlib is used to graph the curves. Scipy is also used for calculations of the AMMs. The first thing that we did was to use Sympy to construct the equation for curve B1. Once the equation is constructed, we use Sympy to calculate the partial derivative of the curve B1 equation, with respect to x and with respect to y. Then, using implicit differentiation, the derivative of the AMM is given by:
```
-dfdx / dfdy
```
Printing this out, you'll get this equation:
```
-4Axy(x+y)/D + D^2 / 4 / ((A*4D + A*4x + 8y + A)y)
```
Then we did the same for the curve B2 equation, construct the curve B2 equation using Sympy, calculate the derivative, and then print it out. You can see here that curve B2's derivative is complex and long.
```
y*(32*A**2*g**2*(D - x) + 4*A*g**2*x*y)*x*(32*A**2*g**2*(D - y) + 4*A*g**2*x*y*y + (g+1 - k0)**2)
```
Next, we will take these equations which represents the derivative of the AMM and then we'll plot them. 

Here, we defined some functions for the constant product, the derivative of the constant product, curve B1, the derivative of curve B1, curve B2, and the derivative of curve B2. Next, we created some points on the x axis. This will represent the token balance of token x. For each x, we calculate the y value for each AMM. For a constant product, there is an explicit formula to calculate y given x. However, for curve B1 and curve B2, there is no explicit formula. So here we use an advanced math library, fsolve from Scipy. This function will approximate the value of y given x. So we get the points x and y for each AMM. Then next, taking these x and y, we calculate the derivative. The derivative of constant product, curve B1, and curve B2. Once we have the derivative, we plot this, and this is the graph that you get which represents the value of the derivative for each x. What the derivative represents is the spot price of the AMM.
