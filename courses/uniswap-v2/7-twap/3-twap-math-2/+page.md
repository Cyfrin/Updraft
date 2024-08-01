## TWAP from tk to tn

In the last video, we derived an equation for calculating the Time-Weighted Average Price (TWAP) from time tk to tn. This equation requires us to know the price at each time ti and the duration, Δti, during this period.

To simplify the calculation, we can use a cumulative price. This is a state variable that represents the sum of price changes up to a certain time. We'll denote the cumulative price at time tj as Cj.

The equation for calculating the cumulative price is:

```
Cj = cumulative price up to tj = Σ(i = 0 to j - 1) Δti * pi
```

We can rewrite the TWAP equation using cumulative price. The top part of the equation is the sum of price changes from time tk to tn. By expanding the sum and subtracting the cumulative price up to time tk, we get:

```
Σ(i = k to n - 1) Δti * pi = (Δt0 * p0 + ... + Δtk - 1 * pk - 1 + Δtk * pk + ... + Δtn - 1 * pn - 1) - (Δt0 * p0 + ... + Δtk - 1 * pk - 1)
```

This simplifies to Cn - Ck.

Therefore, the TWAP equation using cumulative price is:

```
TWAP from tk to tn = (Cn - Ck) / (tn - tk)
```

This equation is much simpler to implement because we only need to store the cumulative price as a state variable. We can then calculate the TWAP by taking the difference of the cumulative prices at time tn and tk, and dividing it by the duration.

[Diagram of TWAP calculation using cumulative price]
