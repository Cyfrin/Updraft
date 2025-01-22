# Simulating Exponential Moving Average with Python

First, we need to have Jupyter Lab installed as well as the Jupyter extension.
The file we'll work with is located under `notebook/curve_v2_ema.ipynb`.

To start, let's start our Jupyter Server. In the terminal, we'll type:
```bash
jupyter lab
```

The server logs will indicate what URL to use to access the server. Copy the URL and connect our code editor to the Jupyter Server by selecting `Select Kernel` > `Select Another Kernel` > `Existing Jupyter Server` and paste in the copied URL. Finally, click `connect`.

Now we can select the version of python we want to use for our Jupyter session.

Now that we're connected, let�s install the Python libraries we�ll need for this example. These libraries are called `numpy` and `matplotlib`.

To do this we will enter the following into the code cell:
```python
!pip install numpy
!pip install matplotlib
```

Now that we have installed the necessary libraries, let�s write some code by clicking on the `+ Code` button to open up a new cell.

Let's import the installed libraries:
```python
import numpy as np
import matplotlib.pyplot as plt
```

Next, we�ll define a function that will calculate the exponential moving average for regular intervals. We will call this function `ema`. This function will take two inputs: the current price, and the previous exponential moving average. We'll also define a variable `a` equal to `0.1`.  Finally, we�ll return the exponential moving average. This all boils down to the following code:
```python
def ema(p, u):
    a = 0.1
    return a * p + (1 - a) * u
```

Now we are going to create 100 random points that represent the price of a token.
```python
N = 100
```
We'll set our initial price as 10:
```python
p0 = 10
```
Next, let�s create some random points that will represent the change in price:
```python
v = 2
delta_prices = np.random.normal(0, v, N)
```
Then, let�s see what the delta prices looks like by printing them out:
```python
delta_prices
```
We can see that these are a bunch of random numbers that deviate from 0.

Next, let�s create an array of prices:
```python
prices = []
```
Then, we'll set the current price to `p0`:
```python
p = p0
```
Now let's run a for loop and add the delta price to the current price and store this in the prices array, but make sure that the price never goes below zero:
```python
for dp in delta_prices:
  prices.append(p)
  p += dp
  if p < 0:
    p = 0
```

Now, let's plot these prices by adding the following code:
```python
plt.plot(prices)
plt.show()
```

Finally, we�ll calculate and plot the exponential moving average on the same graph.

First, create an array of the exponential moving averages:
```python
emas = []
```

Then initialize our exponential moving average variable `u` to the initial price:
```python
u = p0
```
Next let�s run a for loop and use our previously defined `ema` function to store and calculate the exponential moving average:
```python
for p in prices:
  emas.append(u)
  u = ema(p, u)
```
Finally, let�s plot the exponential moving average on the same graph and add a legend to distinguish the two:
```python
plt.plot(emas)
plt.legend(["price", "ema"])
plt.show()
```

Finally, we can play around with the `a` parameter. For example, if instead of `0.1`, we set it to `0.9`. we see the exponential moving average changes to follow the price more closely.
