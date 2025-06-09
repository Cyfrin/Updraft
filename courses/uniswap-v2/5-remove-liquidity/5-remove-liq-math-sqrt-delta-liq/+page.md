Let's say that we define the value of the pool of a constant product AMM to be equal to the square root of *x* times *y*. Where *x* and *y* are the amount of tokens in this AMM. 

We can use this to calculate the change in liquidity when removing liquidity from the AMM. We will denote the initial liquidity as *L*0 and the liquidity after removing *dx* and *dy* tokens as *L*1. The change in liquidity is the difference between these two values divided by the initial liquidity.

To calculate this we can use the following equation:

$\frac{L_0 - L_1}{L_0}$


The value of the pool is equal to the function *f*, defined as:

$f(x, y) = \sqrt{xy}$


*L*0 is equal to the function *f* of $x_0$ and $y_0$:

$L_0 = f(x_0, y_0)$


*L*1 is equal to the function *f* of $x_0$ - *dx* and $y_0$ - *dy*, where *dx* and *dy* are the amounts of token *x* and token *y* that we're removing:

$L_1 = f(x_0 - dx, y_0 - dy)$


Let's substitute these expressions for *L*0 and *L*1 back into the first equation:

$\frac{f(x_0, y_0) - f(x_0 - dx, y_0 - dy)}{f(x_0, y_0)}$


We know that when removing liquidity from the AMM, the price of the assets must stay the same. This means that *dy* must be equal to the spot price multiplied by *dx*:

$dy = \frac{y_0}{x_0}dx$


We can substitute this expression for *dy* back into the previous equation, which gives us:


$\frac{\sqrt{x_0y_0} - \sqrt{(x_0-dx)(y_0-\frac{y_0}{x_0}dx)}}{\sqrt{x_0y_0}}$



Let's simplify this expression. We can multiply the top and bottom of this equation by the square root of $x_0$. This will cancel out the square root of $x_0$ in the denominator and give us:


$\frac{\sqrt{x_0}}{\sqrt{x_0}}\frac{\sqrt{x_0y_0} - \sqrt{(x_0-dx)(y_0-\frac{y_0}{x_0}dx)}}{\sqrt{x_0y_0}}$


And then this can be further simplified to:


$\frac{x_0\sqrt{y_0} - \sqrt{(x_0-dx)(x_0-dx)y_0}}{x_0\sqrt{y_0}}$


We can now pull the square root of $y_0$ out of the denominator and simplify this to:


$\frac{x_0\sqrt{y_0} - (x_0 - dx)\sqrt{y_0} }{x_0\sqrt{y_0}}$



We can cancel out the square root of $y_0$ in the denominator and simplify this to:

$\frac{x_0 - \sqrt{(x_0 - d_x) * (x_0 - d_x)}}{x_0}$


We can further simplify this by pulling out the (x0 - dx) term outside of the square root, which gives us:

$\frac{x_0 - (x_0 - dx)}{x_0}$


The $x_0$ terms will cancel out, leaving us with:

$\frac{dx}{x_0}$


We also know that the spot price is equal to $y_0$ divided by $x_0$. Rearranging the equation to solve for *dx* gives us:

$dx = \frac{x_0}{y_0}dy$


We can substitute this expression for *dx* into the previous equation, which gives us:

$\frac{\frac{x_0}{y_0}dy}{x_0}$


This equation simplifies to:

$\frac{dy}{y_0}$


So, we have shown that the change in liquidity is equal to the change in token *x* divided by the initial amount of token *x*. It is also equal to the change in token *y* divided by the initial amount of token *y*. 

We can therefore write the following equation to represent this:

$\frac{L_0 - L_1}{L_0} = \frac{dx}{x_0} = \frac{dy}{y_0}$


This equation is very important because it allows us to calculate the change in liquidity when removing liquidity from an AMM. 
