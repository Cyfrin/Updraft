## Time-Weighted Average Price (TWAP)

We're going to talk about the TWAP calculation, which can be useful when we want to have a more accurate representation of the average price of a token over a specified period.

The equation we'll be using is:


TWAP from $T_k$ to $T_{n+1} = \frac{C_{n+1}-C_k}{T_{n+1}-T_k}$


This is the TWAP from time $t_k$ to $t_n$.

## TWAP Example

Let's say we have a token that starts at 1000 at time t = 1, and the price changes as follows:

| Time | Price |
|---|---|
| 1 | 1000 |
| 3 | 1100 |
| 4 | 1300 |
| 7 | 1200 |
| 11 | 1500 |

Let's say that we want to find the TWAP from time t = 4 to time t = 11.

To calculate the TWAP, we can create a table to keep track of our calculations. We'll need four columns in the table:

| Time ($t_i$) | Price ($p_i$) | $Δt_i * p_i$ | Cumulative Price ($c_i$) |
|---|---|---|---|
| 1 | 1000 |  |  |
| 3 | 1100 |  |  |
| 4 | 1300 |  |  |
| 7 | 1200 |  |  |
| 11 | 1500 |  |  |

We can fill out the first two columns with the data from our price history.  

Next, we can calculate the delta of t * p_i for each time period. This is calculated by multiplying the price by the duration that the price remained at that level. For example, for time t = 1, the price was at 1000 for 2 seconds (from time t = 1 to time t = 3). So, the delta of t * p_i for this period is:

(3 - 1) * 1000 = 2000

We can fill out the table with the rest of our calculations:

| Time ($t_i$) | Price ($p_i$) | $Δt_i * p_i$ | Cumulative Price ($c_i$) |
|---|---|---|---|
| 1 | 1000 | 2000 | 2000 |
| 3 | 1100 | 1100 | 3100 |
| 4 | 1300 | 3900 | 7000 |
| 7 | 1200 | 4800 | 11800 |
| 11 | 1500 |  |  |

The cumulative price for each row is calculated by adding the $Δt_i * p_i$ for that row to the cumulative price of the previous row.

The final step is to use the equation to calculate the TWAP. The latest cumulative price, $c_n$, is 11,800. The cumulative price at time t = 4, $c_k$, is 3100. We are taking the TWAP from time t = 4 to time t = 11, so the values of $t_n$ and $t_k$ are 11 and 4, respectively.
This gives us the following calculation for TWAP:

(11,800 - 3,100) / (11 - 4) = 1242

The TWAP from time t = 4 to time t = 11 is approximately 1242.  We can see that this makes sense, as the price was at 1300 for 3 seconds and at 1200 for 4 seconds, making the TWAP a little less than 1250.

This is just a basic example of how to calculate TWAP. 
