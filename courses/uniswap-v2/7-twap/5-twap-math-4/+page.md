## Uniswap V2 TWAP

In this lesson, we'll discuss the concept of Time Weighted Average Price (TWAP) within the context of Uniswap V2.

### What is TWAP?
The Time Weighted Average Price (TWAP) is the average price of a token (X) in terms of another token (Y). This is calculated over a specific time period ($t_i ≤ t < t_{i + 1}$) where Δt is the duration of the price. 

### Calculating TWAP
To calculate the TWAP, we'll use the concept of cumulative price and a specific formula.

The cumulative price ($c_j$) up to time $t_j$ is calculated as the sum of the price for each time period:

$C_j$ = cumulative price up to $T_j=\sum\limits_{i=0}^{j-1}{ΔT_iP_i}$

We can then expand the formula for the cumulative price from time t_k to t_n as:

$\sum\limits_{i=k}^{n-1}{ΔT_iP_i=ΔT_kP_l+...+ΔT_{n-1}P_{n-1}}$


This can be further simplified as:

$\sum\limits_{i=k}^{n-1}{ΔT_iP_i=(ΔT_0P_0+...+ΔT_{k-1}P_{k-1}+ΔT_kP_k+...+ΔT_{n-1}P_{n-1})-(ΔT_0P_0+...+ΔT_{k-1}P_{k-1})}$


This then becomes:

$\sum\limits_{i=k}^{n-1}{ΔT_iP_i}=C_n-C_k$


Therefore, the TWAP from time t_k to t_n can be calculated as:

TWAP from $t_k$ to $t_n = \frac{c_n - c_k}{t_n - t_k}$

### TWAP to Current Time
We cannot directly calculate the TWAP from a specific time ($t_k$) to the current time (t), as we do not know how long the current price will remain at its current value.

To solve this, we can use a technique which sets the current time (t) to $t_{n + 1}$, and the current price (p) to $p_n$, which results in:

$\sum\limits_{i=k}^{n}{ΔT_iP_i}=\sum\limits_{i=k}^{n-1}{ΔT_iP_i+ΔT_nP_n}=C_n+(T-T_n)P$


Using this, we can then calculate the TWAP from time t_k to t_n + 1 using the formula:

TWAP from $t_k$ to $t_{n + 1} = \frac{c_n+(t-t_n)P-c_k}{t_{n + 1} - t_k}$

This formula will allow us to estimate the TWAP up to the current time.

### Example

**Diagram:**
[Diagram of a simple example with time and price data points]

We have the following price and timestamp data:

| $t_i$ | $p_i$ | $Δt_ip_i$ | $c_i$ |
|---|---|---|---|
| 1 | 1000 | - | - |
| 3 | 100 | (3 - 1)1000 = 2000 | 2000 |
| 4 | 1300 | (4 - 3)100 = 100 | 3100 |
| 7 | 1200 | (7 - 4)1300 = 3900 | 7000 |
| 11 | 1500 | (11 - 7)1200 = 4800 | 11800 |

We want to calculate the TWAP from time 4 to 11:

TWAP from 4 to 11 = $\frac{c_11 - c_4}{t_11 - t_4}=\frac{11800 - 3100}{11 - 4}$


This gives us:

TWAP from 4 to 11 = $1271.43$

This demonstrates how we can calculate the TWAP up to the current time. 
