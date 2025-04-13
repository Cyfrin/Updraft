Let's say that we define the value of the pool of a constant product AMM to be equal to the square root of *x* times *y*. Where *x* and *y* are the amount of tokens in this AMM. 

We can use this to calculate the change in liquidity when removing liquidity from the AMM. We will denote the initial liquidity as *L*0 and the liquidity after removing *dx* and *dy* tokens as *L*1. The change in liquidity is the difference between these two values divided by the initial liquidity.

To calculate this we can use the following equation:

```
L0 - L1 / L0
```

The value of the pool is equal to the function *f*, defined as:

```
f(x,y) = √(xy)
```

*L*0 is equal to the function *f* of *x*0 and *y*0:

```
L0 = f(x0,y0)
```

*L*1 is equal to the function *f* of *x*0 - *dx* and *y*0 - *dy*, where *dx* and *dy* are the amounts of token *x* and token *y* that we're removing:

```
L1 = f(x0 - dx, y0 - dy)
```

Let's substitute these expressions for *L*0 and *L*1 back into the first equation:

```
f(x0,y0) - f(x0 - dx, y0 - dy) / f(x0,y0)
```

We know that when removing liquidity from the AMM, the price of the assets must stay the same. This means that *dy* must be equal to the spot price multiplied by *dx*:

```
dy = y0 / x0 * dx
```

We can substitute this expression for *dy* back into the previous equation, which gives us:

```
√(x0 * y0) - √((x0 - dx) * (y0 - (y0 / x0 * dx))) / √(x0 * y0)
```

Let's simplify this expression. We can multiply the top and bottom of this equation by the square root of *x*0. This will cancel out the square root of *x*0 in the denominator and give us:

```
√(x0 * y0) - √((x0 - dx) * (y0 - (y0 / x0 * dx))) * √(x0) / √(x0 * y0) * √(x0) 
```

And then this can be further simplified to:

```
x0 * √(y0) - √((x0 - dx) * (x0 - dx) * y0) / x0 * √(y0)
```

We can now pull the square root of *y*0 out of the denominator and simplify this to:

```
x0 * √(y0) - √((x0 - dx) * (x0 - dx) * y0) / x0 * √(y0)
```

We can cancel out the square root of *y*0 in the denominator and simplify this to:

```
x0 - √((x0 - dx) * (x0 - dx)) / x0
```

We can further simplify this by pulling out the (x0 - dx) term outside of the square root, which gives us:

```
x0 - (x0 - dx) / x0 
```

The *x*0 terms will cancel out, leaving us with:

```
dx / x0
```

We also know that the spot price is equal to *y*0 divided by *x*0. Rearranging the equation to solve for *dx* gives us:

```
dx = x0 / y0 * dy
```

We can substitute this expression for *dx* into the previous equation, which gives us:

```
(x0 / y0 * dy) / x0
```

This equation simplifies to:

```
dy / y0
```

So, we have shown that the change in liquidity is equal to the change in token *x* divided by the initial amount of token *x*. It is also equal to the change in token *y* divided by the initial amount of token *y*. 

We can therefore write the following equation to represent this:

```
L0 - L1 / L0 = dx / x0 = dy / y0
```

This equation is very important because it allows us to calculate the change in liquidity when removing liquidity from an AMM. 

