## Mint pool shares

When a user adds liquidity to a Uniswap V2 pool, they receive pool shares that represent their ownership of the liquidity. The amount of pool shares they receive is proportional to the value of the liquidity they contribute. 

To calculate the amount of pool shares that a user will receive when they add liquidity, we use the following equation:

```
S = (L1 - L0) / L0 * T
```

Where:

* **S** is the amount of shares to mint
* **L0** is the value of the pool before the user adds liquidity
* **L1** is the value of the pool after the user adds liquidity
* **T** is the total number of pool shares outstanding

Let's break down this equation. 

### Math

We'll start by defining our variables. 

* **T** = total shares
* **S** = shares to mint
* **L0** = value of the pool before the user adds liquidity
* **L1** = value of the pool after the user adds liquidity

We can then express the increase in the pool's value as:

```
L1 / L0
```

This tells us how much the pool's value increased after the user added liquidity. We can then say that the shares to mint are proportional to this increase, as follows:

```
(T + S) / T = L1 / L0
```

In this equation, we are expressing the increase in shares. Before the user added liquidity, there were *T* total shares. After the user adds liquidity, the total shares are *T + S*. We are saying that the ratio of these two values is proportional to the increase in the pool's value. 

We can solve this equation for *S*, the amount of shares to mint:

1. $\frac{(T + S)}{T}=\frac{L_1}{L_0}$
2. $T + S=\frac{L_1}{L_0}T$
3. $S=\frac{L_1}{L_0}T - T$
4. $S=\frac{L_1 - L_0}{L_0}T$

Therefore, the equation we use to calculate the amount of shares to mint is:

$S=\frac{L_1 - L_0}{L_0}T$

When we apply this equation to a practical example, we'll see that the user receives shares in proportion to the liquidity they contribute. This means the user's ownership of the pool accurately reflects their contribution. 
