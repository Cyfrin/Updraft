## Curve B1's AMM Curve

We are going to cover the Uniswap V2 AMM curve, specifically the B1 curve. The equation for a constant product curve is:

```
x * y = k
```

We can also graph the constant sum curve using the equation:

```
x + y = d
```

In this case, instead of using _k_, we will use _d / 2�_.

The B1 curve equation is a combination of the constant product and constant sum curves. The equation is as follows:

```
xy + A(x + y) * (d / 2)� = (d / 2)� + AD�
```

The parameter _A_ defines how flat the curve is. As _A_ increases, the curve becomes more flat and looks like the constant sum curve. If _A_ decreases, the curve behaves more like the constant product curve.

We can also see this by multiplying the constant sum equation by _x_ and _y_:

```
xy + A(x + y) * (d / 2)� = (d / 2)� + AD�
```

We can further adjust the equation by dividing by _d / 2�_:

```
xy / (d / 2)� + A(x + y) = 1 + AD� / (d / 2)�
```

We can see that if _x_ and _y_ are equal to _d / 2_, the term _xy / (d / 2)�_ is equal to 1. Conversely, if _x_ and _y_ are not equal to _d / 2_, the term approaches zero.

When _x_ and _y_ are balanced, the curve behaves like the constant sum curve. However, when _x_ and _y_ are imbalanced, the curve behaves more like the constant product curve.

In summary, the B1 curve is a combination of constant product and constant sum curves. This gives the curve the ability to behave like either curve depending on the balance of the tokens.
