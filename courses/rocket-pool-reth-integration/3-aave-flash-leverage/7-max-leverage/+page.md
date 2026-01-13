## Max Leverage

In this lesson, we will derive an equation for max leverage and show how to calculate max leverage with an example.

In a previous video, we saw a simple example of creating a leveraged position. In this example, the flow was:
Deposit collateral -> borrow -> buy collateral

Let's say that instead of just holding on to the collateral and waiting for the price to go up so we can close the position, we take the collateral and repeat the process. This means we repeat the flow of deposit collateral -> borrow -> buy collateral over and over again to create infinite leverage.

However, for an over-collateralized loan, there is a limit to the leverage we can create. The max leverage equation is given by

```solidity
max leverage = 1/(1-L)
```

where L = loan to value ratio (LTV).

Equation

To derive the final equation of max leverage, let's start with some definitions.

```solidity
c = initial collateral amount
p = USD price of collateral
L = loan to value ratio (LTV)
```

To create a leverage position, we first borrow some amount of USD. The maximum amount that can be borrowed is the loan to value times the amount of collateral times the price of the collateral.

```solidity
Borrow = L * c * p USD
```

The next step is to buy more collateral. The amount of collateral that can be bought is the amount of USD we borrowed divided by the price of the collateral.

```solidity
buy = (L * c * p)/p = L * c collateral
```

The next step to close the loop is to deposit the L \* c amount of collateral again.

So to summarize, the three steps can be described as:
Deposit c amount of collateral -> buy L \* c amount of collateral.

Let's see what happens if we repeat this cycle many times. What is the limit as we repeat these three steps over and over again? Let's calculate the maximum amount of collateral that we can collect for a leveraged position. Initially, we start with c. This is the amount of collateral we have.

```solidity
max collateral = c
```

We borrow some stable coin, and the maximum amount of collateral that we get back is L \* c.

```solidity
max collateral = c + Lc
```

And now, we are going to deposit this collateral again.

```solidity
max collateral = c + Lc + L^2c
```

We started with L _ c, and to this we multiply by L, so we get L^2 _ c. We can do again so it is

```solidity
max collateral = c + Lc + L^2c + L^3c + ...
```

Since there is a c in every term, we can factor it out as

```solidity
max collateral = c(1 + L + L^2 + L^3 + ...)
```

Geometric series

The part of the equation inside the parenthesis is a well-known equation called the geometric series. There is an explicit formula for calculating the sum of all of these terms:

```solidity
sum from i=0 to n of (L^i) = (1-L^(n+1))/(1-L) <= 1/(1-L)
```

For L strictly less than 1, this converges to 1/(1-L). This tells us that the maximum leverage, the maximum amount of collateral that we can collect for our leveraged position, is c multiplied by this factor.

```solidity
c * 1/(1-L)

max leverage = 1/(1-L)
```

Example

Let's go through an example with numbers. Let's say that the LTV is equal to 0.8. Let's calculate the maximum leverage. This is given by 1/(1-L).

```solidity
max leverage = 1/(1-L)
```

Plug in the numbers, and this is equal to 1 / (1 - 0.8), which is equal to 5. This tells us that the maximum leverage position that we can create for our over-collateralized loan is 5 times the amount of collateral that we initially deposit.
