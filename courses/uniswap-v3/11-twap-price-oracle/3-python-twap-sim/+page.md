### Time-Weighted Average Price in Uniswap v2 and v3

In this lesson, we will examine how the time-weighted average price in Uniswap v2 and v3 reacts to sudden price changes. We'll be utilizing Python to run a simulation that visualizes these reactions through a graph.

The Python script calculates the time-weighted average price in both Uniswap v2 and v3, and then graphs these averages against the spot price over time.
In our initial simulation, we assume that the price is initially at 1,000, but suddenly drops to 1, and remains at 1 for the remainder of the simulation. This sudden drop represents the spot price.
To simulate this, we begin with:
```javascript
prices = [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1, 1, 1, 1, 1, 1, 1]
```
This code defines the spot prices that will be used during the simulation. 
To calculate the time weighted averages, we will also define empty lists:
```javascript
uni_v2_cumulative_prices = []
uni_v3_cumulative_ticks = []
```
And also set their initial states to zero.
```javascript
uni_v2_cumulative_price = 0
uni_v3_cumulative_tick = 0
```

Next, we'll iterate through the prices and calculate the cumulative price for v2 and cumulative ticks for v3. The cumulative ticks for v3 will be calculated using a custom function.

```javascript
def price_to_tick(p):
  return math.log(p) / math.log(1.0001)
```
Then, we use a for loop:
```javascript
for p in prices:
  uni_v2_cumulative_price += p
  uni_v3_cumulative_tick += price_to_tick(p)
```

Next, we calculate the time weighted average price for both v2 and v3. We can accomplish this with another set of loops, storing the results in lists:
```javascript
uni_v2_twaps = []
uni_v3_twaps = []
```

```javascript
for i in range(twap_duration):
  uni_v2_twaps.append(p0)
  uni_v3_twaps.append(p0)
```
Finally we plot the spot price and the time-weighted average prices on the graph:
```javascript
plt.plot(prices)
plt.plot(uni_v2_twaps)
plt.plot(uni_v3_twaps)
plt.legend(["spot", "uni v2 TWAP", "uni v3 TWAP"])
plt.show()
```
This will show the spot price dropping from 1000 to 1, and the time weighted average price of Uniswap v2 lagging behind the change, and the average price of Uniswap v3 tracking the change more quickly.

In the second simulation, the price starts at 1 and then suddenly spikes to 1,000. This is shown using the below code:
```javascript
prices = [1, 1, 1, 1, 1, 1, 1, 1, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]
```
The time-weighted average price of Uniswap v3 again lags behind the price increase, while the average price of Uniswap v2 immediately tracks the increase in spot price.
