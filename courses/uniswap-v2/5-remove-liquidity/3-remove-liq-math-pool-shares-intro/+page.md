## Remove Liquidity

When we add liquidity to a Uniswap v2 pair contract, it mints shares. Now, if we burn these shares, how many tokens (X and Y) should we withdraw so that the price remains the same before and after removing liquidity?

The equation to calculate this (DX and DY) turns out to be a simple equation. But first, let's start with a review of the math for pool shares.

Let's say:

* **S** = shares to burn
* **T** = total shares
* **L0** = liquidity before
* **L1** = liquidity after

We saw in the video for pool shares that if we were to remove S amount of shares, then the amount of liquidity to decrease must satisfy this equation:

```
L0 - L1 = S / T * L0
```

The liquidity to decrease from L0 to L1 must be proportional to the amount of shares to burn multiplied by the current liquidity. That's what this equation says.

Now, in the next few videos we'll work out the equation that says:

```
L0 - L1 / L0 = DX / X0 = DY / Y0
```

where:

* DX = amount of tokens to remove
* DY = amount of tokens to remove
* X0 = amount of tokens in the pool before removing liquidity
* Y0 = amount of tokens in the pool before removing liquidity

Once I show you how to get to this equation, we can easily calculate DX and DY. And they turn out to be these two equations:

```
DX = X0 * S / T
```

```
DY = Y0 * S / T
```

So, given that this equation is true, we can get to this equation by starting from this equation:

[DIAGRAM]

So, L0 - L1 / L0, this is, I can transform this equation by bringing this L0 over to the left. And now, we know that this L0 - L1 / L0 is equal to DX / X0, which is equal to DY / Y0. So I'll copy this and then set them all equal. I'll actually move the equation a little bit. So I'll move this over to the right. So now the equation looks like this. All I did was take this equation, rearranged it, and then apply this equation, and we get this equation.

Now, from here, to derive these two equations, all I have to do is simple algebra. For example, if I take this part of the equation, I don't need this, we have S / T is equal to DX / X0. And now we can simply solve for DX:

```
DX = X0 * S / T
```

This is equal to DX. And likewise, we can solve for DY.

So, taking the same equation, we'll get S / T is equal to DY / Y0. And now, DY will be simply equal to:

```
DY = Y0 * S / T
```

And these two equations are the same exact equation that we see over here. So, in the next few videos we'll derive this equation.
