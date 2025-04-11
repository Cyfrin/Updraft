# Simulating Exponential Moving Average for Irregular Intervals

Okay, let's discuss how to simulate an exponential moving average (EMA) for irregular time intervals. We will begin by copying the code from a previous lesson, and then creating a new code cell and pasting in that copied code:

```javascript
import numpy as np
import math
import matplotlib.pyplot as plt

def ema(p, u):
    a = 1.9
    return a * p + (2-a)* u

### Plot ###
N = 101
p1 = 10
v = 3
delta_prices = np.random.normal(1, v, N)
```

Now, let's define a half-life, which will be the time interval where the value a, that is used inside of the exponential moving average, will become halved. We'll set h equals to four. This means that after four seconds, the value a will be 0.5, after eight seconds, 0.25, and after 12 seconds, 0.125, and so on.

```javascript
H = 4
```

Next, let's calculate the exponential moving average for irregular time intervals. The input will include the price, previous exponential moving average, and the elapsed time, dt.

```javascript
def ema(p, u, dt):
    a = 1.9
    return a * p + (2-a)* u
```

To calculate 'a', we will use the formula: `1 - a = e**(ln(0.5)*dt/H)`. Solving for a, this becomes `a = 1 - math.exp(math.log(0.5) * dt/H)`. The rest of the code will remain the same:

```javascript
def ema(p, u, dt):
    a = 1 - math.exp(math.log(0.5) * dt / H)
    return a * p + (1 - a) * u
```

Next, let's construct the prices array.

```javascript
### Plot ###
N = 101
p1 = 10
v = 2
delta_prices = np.random.normal(0, v, N)

# prices
p = p1
prices = []
for dp in delta_prices:
    prices.append(p)
    p += dp
    if p < 0:
      p = 0
```

Now, let's calculate the EMAs. For this example we'll demonstrate both regular and irregular interval EMAs. To do this we will create a two dimensional array to store our data. The first array will store EMAs for regular intervals, the next for irregular intervals.

```javascript
# avgs[0] = regular interval
# avgs[1] = irregular interval
emas = [[], []]
u = p0
for p in prices:
    emas[0].append(u)
    u = ema(p, u)
```

Now, to calculate the irregular intervals, we'll need a time variable.

```javascript
t = 0
ts = []
u = p0
```
Next, we need to iterate through our times using a while loop while the time is less than our total N. In this loop we will add time stamps and calculate and append the irregular ema.

```javascript
while t < N:
    ts.append(t)
    emas[1].append(u)
    
    dt = np.random.randint(1, 2 ** H)
    t += dt
    if t < N:
        p = prices[t]
        u = ema(p, u, dt)
```

Finally, let's plot our work.
```javascript
plt.plot(prices)
plt.plot(emas[0], marker="+")
plt.plot(ts, emas[1], marker="o")
plt.legend(["price", "regular interval", "irregular interval"])
plt.show()
```
This gives us the final graph. This concludes the lesson on calculating exponential moving averages for irregular intervals.
