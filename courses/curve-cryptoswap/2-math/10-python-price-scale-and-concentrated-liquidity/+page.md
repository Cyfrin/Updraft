# Python Simulation With And Without Price Scale

In this lesson, we will explain where the numbers we used in previous examples come from. We will do this using Python code that we write and execute. This will be an optional video.

The Python code we will use for this video is located under the notebook directory in the file called:
```
curve_v2_swap_price_scale.ipynb
```
This file is meant to be opened in a Jupiter Notebook. This code is written in Python. If you don't want to use a Jupiter Notebook, then you can copy and paste the Python code from this file and execute it yourself using Python. 

To use a Jupiter Lab, we will start in the root directory of our project and change directory to the notebook folder.
```bash
cd notebook/
```
From here, we can run the following command to initiate the Jupyter Lab:
```bash
jupyter lab
```
This will open Jupiter Lab in a browser. From here we can open our notebook file.

The goal is to simulate swapping with and without a price scale. For the example, we will swap Wrapped Bitcoin (WBTC) to USDC. We will declare `x` to represent USDC and `y` to represent WBTC. The market price of WBTC is set to 60,000. 

First, we will define curve v2 functions. We then will set up the ability to compare the curve v2 with a price scale equal to:
```
[1, 1] and [1, 6e4]
```
Next, we will calculate dx with actual balance, and then calculate dx with transformed balance.
To define the curve v2 function, we will start by declaring the function. 
```python
def f_curve_v2(x, y, a, d, g, p):
```
This function will take the following parameters:
- `x`, the balance of token x
- `y`, the balance of token y
- `a`, the amplification factor
- `d`, the liquidity parameter
- `g`, the gamma parameter
- `p`, the price scale parameters

First, we will define the transformed balances:
```python
    x = x * p[0]
    y = y * p[1]
```
Next we define k0, and k:
```python
    k0 = x * y / (d / 2)**2
    k = k0 * (g/(g + 1 - k0))**2
```
Next we return the function:
```python
    return x * y + a * d * (x + y) - (d / 2)**2 + a* k * d**2
```
Next, we define the `F(D)` function, and its parameters:
```python
def F(D, x, y, a, g, p):
    return f_curve_v2(x, y, a, D, g, p)
```
We will then set the following parameters:
```python
A = 10
g = 0.002
x0 = 6e6
y0 = 100
y1 = y0 + 1
```
The price scales are defined as:
```python
p = [1, 1]
```
With this information, we can then calculate the following:
```python
D = fsolve(F, x0 / 2, args = (x0, y0, A, g, p))[0]
print ("D", D)
print ("D/2", D/2)
x1 = fsolve(f_curve_v2, D / 2, args = (y1, A, D, g, p))[0]
print ("x1", x1)
print("dx", x0-x1)
```
With this, we can perform the calculations with actual balance. Then, we can do it with transformed balance. We can also set up initial variables and constants, such as the price scale, the amplification factor, gamma, and token amounts.
