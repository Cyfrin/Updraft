## Uniswap V2 TWAP

In this lesson, we'll discuss the concept of Time Weighted Average Price (TWAP) within the context of Uniswap V2.

### What is TWAP?
The Time Weighted Average Price (TWAP) is the average price of a token (X) in terms of another token (Y). This is calculated over a specific time period (t<sub>i</sub> ≤ t < t<sub>i + 1</sub>) where Δt is the duration of the price. 

### Calculating TWAP
To calculate the TWAP, we'll use the concept of cumulative price and a specific formula.

The cumulative price (c<sub>j</sub>) up to time t<sub>j</sub> is calculated as the sum of the price for each time period:

```javascript
c<sub>j</sub> = cumulative price up to t<sub>j</sub> = ∑<sub>i = 0</sub><sup>j-1</sup> Δt<sub>i</sub>.p<sub>i</sub>
```

We can then expand the formula for the cumulative price from time t<sub>k</sub> to t<sub>n</sub> as:

```javascript
∑<sub>i = k</sub><sup>n-1</sup> Δt<sub>i</sub>.p<sub>i</sub> = Δt<sub>k</sub>.p<sub>k</sub> + ... + Δt<sub>n-1</sub>.p<sub>n-1</sub>
```

This can be further simplified as:

```javascript
∑<sub>i = k</sub><sup>n-1</sup> Δt<sub>i</sub>.p<sub>i</sub> = (Δt<sub>0</sub>.p<sub>0</sub> + ... + Δt<sub>k-1</sub>.p<sub>k-1</sub> + Δt<sub>k</sub>.p<sub>k</sub> + ... + Δt<sub>n-1</sub>.p<sub>n-1</sub>) - (Δt<sub>0</sub>.p<sub>0</sub> + ... + Δt<sub>k-1</sub>.p<sub>k-1</sub>)
```

This then becomes:

```javascript
∑<sub>i = k</sub><sup>n-1</sup> Δt<sub>i</sub>.p<sub>i</sub> = c<sub>n</sub> - c<sub>k</sub>
```

Therefore, the TWAP from time t<sub>k</sub> to t<sub>n</sub> can be calculated as:

```javascript
TWAP from t<sub>k</sub> to t<sub>n</sub> = (c<sub>n</sub> - c<sub>k</sub>) / (t<sub>n</sub> - t<sub>k</sub>)
```

### TWAP to Current Time
We cannot directly calculate the TWAP from a specific time (t<sub>k</sub>) to the current time (t), as we do not know how long the current price will remain at its current value.

To solve this, we can use a technique which sets the current time (t) to t<sub>n + 1</sub>, and the current price (p) to p<sub>n</sub>, which results in:

```javascript
∑<sub>i = k</sub><sup>n</sup> Δt<sub>i</sub>.p<sub>i</sub> = ∑<sub>i = k</sub><sup>n-1</sup> Δt<sub>i</sub>.p<sub>i</sub> + Δt<sub>n</sub>.p<sub>n</sub> = c<sub>n</sub> + (t - t<sub>n</sub>).p
```

Using this, we can then calculate the TWAP from time t<sub>k</sub> to t<sub>n + 1</sub> using the formula:

```javascript
TWAP from t<sub>k</sub> to t<sub>n + 1</sub> = (c<sub>n</sub> + (t - t<sub>n</sub>).p - c<sub>k</sub>) / (t<sub>n + 1</sub> - t<sub>k</sub>)
```

This formula will allow us to estimate the TWAP up to the current time.

### Example

**Diagram:**
[Diagram of a simple example with time and price data points]

We have the following price and timestamp data:

| t<sub>i</sub> | p<sub>i</sub> | Δt<sub>i</sub>.p<sub>i</sub> | c<sub>i</sub> |
|---|---|---|---|
| 1 | 1000 | - | - |
| 3 | 100 | (3 - 1)1000 = 2000 | 2000 |
| 4 | 1300 | (4 - 3)100 = 100 | 3100 |
| 7 | 1200 | (7 - 4)1300 = 3900 | 7000 |
| 11 | 1500 | (11 - 7)1200 = 4800 | 11800 |

We want to calculate the TWAP from time 4 to 11:

```javascript
TWAP from 4 to 11 = (c<sub>11</sub> - c<sub>4</sub>) / (t<sub>11</sub> - t<sub>4</sub>) = (11800 - 3100) / (11 - 4)
```

This gives us:

```javascript
TWAP from 4 to 11 = 1271.43
```

This demonstrates how we can calculate the TWAP up to the current time. 
