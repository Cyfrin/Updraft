## Calculating Fee Growth Inside a Position

In this lesson, we'll discuss how to calculate fee growth inside of a position.

First, we define a function called $f_r$ that takes two inputs, `i_lower` and `i_upper`. This function represents the fee growth inside the range defined by the two ticks.

```
f_r(i_lower, i_upper) = Fee growth inside i_lower and i_upper
```

This is equivalent to the current fee growth ($f_g$), minus the fee growth below `i_lower` ($f_b(i_lower)$), minus the fee growth above `i_upper` ($f_a(i_upper)$).

```
= f_g - f_b(i_lower) - f_a(i_upper)
```

The current fee growth is a state variable stored within the Uniswap V3 contract. We also know how to calculate fee growth below and above any given tick.

Now, let's consider fee growth inside a position. While the overall fee growth is initialized upon contract deployment, a liquidity position can be created and removed at any time. Therefore, to calculate the fee growth inside a specific position, we need to consider two specific points in time. First, the fee growth at the time the position is created. Second, the fee growth at the time the fee is collected. The difference between these two fee growths will give us the correct fee growth inside for the liquidity position.

Let's assume a position is created at time $t_0$, and the fee is claimed at time $t_1$. At time $t_0$, we need to calculate fee growth inside, which we will denote as $F_0$.

```
F0 = f_r(i_lower, i_upper) at time t0
```

Then, at time $t_1$, when the fees are collected, we recalculate the fee growth inside, and call it $F_1$.

```
F1 = f_r(i_lower, i_upper) at time t1
```
The fee growth inside a position can then be calculated using the following formula.
```
Fee growth inside for a position = F1 - F0
```
It's important to take a snapshot of the fee growth inside when the liquidity position is created, then recalculate the fee growth inside when fees are claimed.

Next, let's consider how we calculate the actual fee for a position. Let S represent the liquidity for a position between the tick lower and tick upper:
```
S = Liquidity for a position between i_lower and i_upper
```
Assume that S remains constant over time. In this case, the fee that can be collected for a liquidity position is calculated using the following equation:

```
Fee for position = S(F1 - F0)
```

This is the liquidity, S, multiplied by the difference between $F_1$ and $F_0$. As a reminder, $F_0$ represents the fee growth inside when the liquidity was created, and $F_1$ represents the fee growth inside when the fee was claimed. This calculation determines the fee that can be collected for a given liquidity position.
