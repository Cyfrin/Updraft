We will use Python to calculate partial derivatives for the curve's equation. The library we will use is called `sympy`.

First we need to import `sympy`:

```python
from sympy import symbols, diff, simplify, init_printing
init_printing()
```

Next, we need to define the curve's equation:

```python
x, y, D, A = symbols('x y D A')
k = A*x*y*(D**2) / (2*(D**2) + k*D**2)
f = k*x*y + k*x*y * D / 2
display(f)
```

To get the partial derivative of this function with respect to `D` and with respect to `y`, we need to call a function that is provided by the `sympy` library called `diff`. Here we will tell `diff` to differentiate the function `f` with respect to `D`:

```python
df_dD = diff(f, D)
```

Likewise, we will differentiate the function `f` with respect to `y`:

```python
df_dy = diff(f, y)
```

We can then print the results of our differentiation:

```python
print('df / dD')
print(df_dD)
print('df / dy')
print(df_dy)
```

Next, we will discuss a method called Newton's method to solve for `y`:

```python
y_n = y - f / df_dy
```

This is the end of this introductory lesson on partial derivatives. 
