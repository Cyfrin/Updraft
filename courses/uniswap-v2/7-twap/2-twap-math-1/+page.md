## UniSwap V2 TWAP

In this lesson, we will discuss the concept of Time Weighted Average Price (TWAP) in UniSwap V2.

TWAP is a method for calculating the average price of a token over a specific period of time. We can use TWAP to calculate the average price of a token over a specific period of time. 

Let's say we have a token X and token Y, and we want to calculate the average price of token X in terms of token Y. Let's say we have a price for each time stamp, and we can represent it as P of i. We can write the price in terms of the amount of token Y in the contract divided by the amount of token X in the contract.

```
P of i = Y / X
```

The time stamp can be represented as T of i.

```
T of i 
```

The price P of i will only apply for a time period between T of i and less than T of i + 1. 

If we model the time difference between T of i and the next one T of i + 1 as Δ of T of i, this would be the time difference between the two time stamps.

```
Δ of T of i = T of i + 1 - T of i
```

If we want to calculate the TWAP from T0 to Tn, we would need to take the average of P0, P1, P2 and so on all the way up to P to the n - 1.

```
P0 + P1 + P2 + ... + P to the n - 1
```

We would also need to calculate the duration of time for each price. The duration for P0 would be T1 - T0. We can write this concisely as Δ of T0.

```
Δ of T0 = T1 - T0
```

We would then divide by the whole duration which is Tn - T0.

```
Δ of T0 / Tn - T0
```

This fraction is the percentage of time that the price was at P0 in the time between Tn and T0. We can use the same method to calculate the weights for each price, P1, P2, and so on.

To calculate the TWAP from Tk to Tn, we can use the same formula and modify the indices.

```
Δ of Tk / Tn - Tk * Pk + 
Δ of Tk + 1 / Tn - Tk * Pk + 1 +
Δ of Tk + 2 / Tn - Tk * Pk + 2 + ... + 
Δ of Tn - 1 / Tn - Tk * P to the n - 1
```

We can simplify this equation further by pulling out Tn - Tk from each term.

```
Δ of Tk / Tn - Tk * Pk + 
Δ of Tk + 1 / Tn - Tk * Pk + 1 +
Δ of Tk + 2 / Tn - Tk * Pk + 2 + ... + 
Δ of Tn - 1 / Tn - Tk * P to the n - 1

= (Δ of Tk * Pk + Δ of Tk + 1 * Pk + 1 + Δ of Tk + 2 * Pk + 2 + ... + Δ of Tn - 1 * P to the n - 1) / Tn - Tk
```

We can simplify this equation even further by using the summation symbol. 

```
= Σ( i = k to n - 1 ) Δ of Ti * Pi / Tn - Tk
```

This equation will calculate the TWAP from Tk to Tn.

[Diagram]

In the next lesson, we'll discuss the concept of cumulative price. We'll rewrite this equation using cumulative prices to make it even easier to calculate.
