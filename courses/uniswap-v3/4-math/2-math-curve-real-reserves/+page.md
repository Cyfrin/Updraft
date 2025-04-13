## Deriving the Equation for the Curve of Real Reserves

First, we need to understand the importance of the equation for the curve of real reserves. It will allow us to answer questions about the amounts of token X and Y needed for specific liquidity ranges, such as between price ranges P sub A and P sub B. For example, If we want to know how much token Y is needed when we know the amount of token X to provide liquidity between price ranges P sub A and P sub B, we need the equation for the curve of real reserves.

We will look at how to derive this equation.

The curve of the virtual reserve, in green, is a constant product curve for concentrated liquidity:
```
x * y = L^2
```
The curve of the real reserve, in orange, is derived from the curve of the virtual reserve, and is obtained by shifting the green curve over to the left and down. The curve of the real reserves is described by the following equation:
```
(x_r + (L / sqrt(P_b) ) * (y_r + L * sqrt(P_a)))= L^2
```

The virtual curve in green is simply a constant product curve:
```
x * y = L^2
```

In concentrated liquidity between price ranges P sub A and P sub B, the amount of token X and the amount of token Y are split into two parts. For token X we have a real amount of the token x sub r, and the virtual amount x sub v. Similarly, for the amount of token Y, this is the real amount of the token y sub r, and the virtual amount y sub v. These can be written mathematically as:
```
x = x_r + x_v
y = y_r + y_v
```

Therefore we can rewrite x * y = L^2 as
```
(x_r + x_v) * (y_r + y_v) = L^2
```

To find the curve of the real reserves, we need to find what x sub v and y sub v are equal to. We will begin by finding x sub v. To make the problem simpler, we can consider the case when x sub r is equal to zero:
```
when x_r = 0
```
We still need to satisfy the constant product equation x*y = L^2. The point x,y is on the virtual curve. When x sub r is zero, x equals the virtual part x sub v.
To find the value of x sub v, we use the equation:
```
x = L / sqrt(P)
```
So, x sub v will be the amount we get when we plug in the price as P sub b
```
x_v = L / sqrt(P_b)
```

The other approach is to use the algebraic method. We take the equation
```
(x_r + x_v) * (y_r + y_v) = L^2
```
and set x sub r to 0 and we get:
```
x_v * (y_r + y_v) = L^2
```
Dividing by y sub r plus y sub v on both sides gives us:
```
x_v = L^2 / (y_r + y_v)
```
We can then use the equation:
```
y = L * sqrt(P)
```
and replace y sub r + y sub v with:
```
L * sqrt(P_b)
```
This makes:
```
x_v = L^2 / (L * sqrt(P_b) )
```
which simplifies to
```
x_v = L / sqrt(P_b)
```
as before.

Now, let's find y sub v. We will do something similar, considering the case when the real amount of token y, y sub r, is zero. This will give:
```
when y_r = 0
```
Since y sub r is zero, we are left with only the virtual part of the token y.
We know that on the curve of the virtual reserve, the point x,y still needs to satisfy the constant product equation x * y = L^2. In this case, the point x,y would be at x sub v and y sub b. We can again use the geometric approach, and use the following to define y sub v:
```
y = L * sqrt(P)
```
y sub v will be:
```
y_v = L * sqrt(P_a)
```

We can find y sub v using the algebraic approach by starting with the equation:
```
(x_r + x_v) * (y_r + y_v) = L^2
```
and setting y sub r to 0 which gives:
```
(x_r + x_v) * y_v = L^2
```
Then we divide by x sub r + x sub v and get:
```
y_v = L^2 / (x_r + x_v)
```
And using the equation for x:
```
x = L / sqrt(P)
```
and noting that x sub r is 0 at this point we can replace x sub r + x sub v to get:
```
y_v = L^2 / ( L / sqrt(P_a) )
```
which can be simplified to:
```
y_v = L * sqrt(P_a)
```
as before.
We now have a method of obtaining the equation for the real reserve curve.

Next, we will be adding these together.

To draw the curve of real reserve shown in orange, we move the virtual curve shown in green to the left and bottom.  The amount we slide to the left is x sub v, and the amount we slide down is y sub v.  By sliding the virtual curve, we will get the real curve.
