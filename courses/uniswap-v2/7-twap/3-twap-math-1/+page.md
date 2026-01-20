## UniSwap V2 TWAP

In this lesson, we will discuss the concept of Time Weighted Average Price (TWAP) in UniSwap V2.

TWAP is a method for calculating the average price of a token over a specific period of time. We can use TWAP to calculate the average price of a token over a specific period of time. 

Let's say we have a token X and token Y, and we want to calculate the average price of token X in terms of token Y. Let's say we have a price for each time stamp, and we can represent it as P of i. We can write the price in terms of the amount of token Y in the contract divided by the amount of token X in the contract.


$P_i=\frac{Y}{X}$



The time stamp can be represented as $T_i$.

$T_i$



The price P of i will only apply for a time period between T of i and less than $T_{i+1}$. 

If we model the time difference between T of i and the next one $T_{i+1}$. as $ΔT_i$ , this would be the time difference between the two time stamps.


$ΔT_i=T_{i+1}-T_i$



If we want to calculate the TWAP from T0 to Tn, we would need to take the average of P0, P1, P2 and so on all the way up to $P_{n - 1}$.

$P_0 + P_1 + P_2 + ... + P_{n-1}$



We would also need to calculate the duration of time for each price. The duration for P0 would be $T_1 - T_0$. We can write this concisely as $ΔT_0$.

$ΔT_0 = T_1 - T_0$



We would then divide by the whole duration which is $T_n - T_0$.

$\frac{ΔT_0}{T_n - T_0}$



This fraction is the percentage of time that the price was at P0 in the time between Tn and T0. We can use the same method to calculate the weights for each price, P1, P2, and so on.

To calculate the TWAP from Tk to Tn, we can use the same formula and modify the indices.

$\frac{ΔT_k}{T_n-T_k}P_k +$
$\frac{ΔT_{k+1}}{T_n-T_k}P_{k+1}+$
$\frac{ΔT_{k+2}}{T_n-T_k}P_{k+2}+$
$\frac{ΔT_{n-1}}{T_n-T_k}P_{n-1}$



We can simplify this equation further by pulling out $T_n-T_k$ from each term.

$\frac{ΔT_k}{T_n-T_k}P_k +$
$\frac{ΔT_{k+1}}{T_n-T_k}P_{k+1}+$
$\frac{ΔT_{k+2}}{T_n-T_k}P_{k+2}+$
$\frac{ΔT_{n-1}}{T_n-T_k}P_{n-1}$

$=\frac{ΔT_kP_k+ΔT_{k+1}P_{k+1}+ΔT_{k+2}P_{k+2}+...+ΔT_{n-1}P_{n-1}}{T_n-T_n}$


We can simplify this equation even further by using the summation symbol. 

$=\frac{\sum\limits_{i=k}^{n-1}{ΔT_iP_i}}{T_n-T_k}$


This equation will calculate the TWAP from Tk to Tn.


In the next lesson, we'll discuss the concept of cumulative price. We'll rewrite this equation using cumulative prices to make it even easier to calculate.

