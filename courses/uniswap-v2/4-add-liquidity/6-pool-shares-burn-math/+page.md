## Burn pool shares

This lesson will go over how to derive the equation to calculate how many USDC the user will receive for burning pool shares.

We will define the variables as follows:
* **T** = total shares
* **S** = shares to burn
* **L0** = value of pool before the token is sent back to the user
* **L1** = value of pool after the token is sent to the user

We can think about the value of the pool as being the amount of tokens inside the pool contract.

The decrease in the value of the pool from L0 to L1 is proportional to the decrease of the shares:

```
Decrease L0 to L1 proportional to decrease of shares
```

For example, if we burn S shares and this decreases the total shares by 10%, then the value of the pool from L0 to L1 will also decrease by 10%.

The decrease in shares is represented by the following equation:

$\frac{T-S}{T}$


We want this ratio to be equal to the ratio of the value of the pool after the tokens are withdrawn and the value of the pool before the tokens are withdrawn. 

1. $\frac{T-S}{T} = \frac{L_1}{L_0}$
2. $\frac{T-S}{T}L_0 = L_1$
3. $L_0 - \frac{S}{T}L_0 = L_1$

We can then rewrite this equation as follows:

$L_0 - L_1 = \frac{S}{T}L_0$

This equation tells us that L0 - L1 is equal to the percentage of shares that we're burning times the value of the pool before the tokens are withdrawn.  We can use this equation to calculate how many USDC the user will receive for burning S shares. 
