## TWAP from tk to tn

In the last video, we derived an equation for calculating the Time-Weighted Average Price (TWAP) from time tk to tn. This equation requires us to know the price at each time ti and the duration, Δti, during this period.

To simplify the calculation, we can use a cumulative price. This is a state variable that represents the sum of price changes up to a certain time. We'll denote the cumulative price at time $T_j$ as $C_j$.

The equation for calculating the cumulative price is:

$C_j$ = cumulative price up to $T_j=\sum\limits_{i=0}^{j-1}{ΔT_iP_i}$


We can rewrite the TWAP equation using cumulative price. The top part of the equation is the sum of price changes from time tk to tn. By expanding the sum and subtracting the cumulative price up to time tk, we get:


$T_j=\sum\limits_{i=0}^{j-1}{ΔT_iP_i}=(ΔT_0 * P_0 + ... + ΔT_{k - 1} * P_{k - 1} + ΔT_k * P_k + ... + ΔT_{n - 1} * P_{n - 1}) - (ΔT_0 * P_0 + ... + ΔT_{k - 1} * P_{k - 1})$


This simplifies to $C_n - C_k$.

Therefore, the TWAP equation using cumulative price is:

TWAP from tk to tn $=\frac{C_n-C_k}{T_n-Tk}$


This equation is much simpler to implement because we only need to store the cumulative price as a state variable. We can then calculate the TWAP by taking the difference of the cumulative prices at time tn and tk, and dividing it by the duration.
