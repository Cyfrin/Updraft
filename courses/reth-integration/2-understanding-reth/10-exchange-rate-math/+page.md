## Calculating the rETH/ETH Exchange Rate

To calculate the rETH/ETH exchange rate, we will use a formula to determine the relative value of rETH compared to ETH within the Rocket Pool protocol.

Let's define the following variables:

- E = total ETH
- R = total rETH
- r = rETH amount
- e = ETH amount

With these variables, the equation to determine the ETH amount (e) for a given rETH amount (r) is:

```
e = (r / R) * E
```

To help explain this further, let’s go through an example.

Given the total amount of rETH is 5000 and the total amount of ETH locked into the Rocket Pool protocol is 6000, how much ETH can we get for 1 rETH?

To find the ETH amount for 1 rETH, apply the equation:

```
e = (r / R) * E
```

Given that `R = 5000`, `E = 6000`, and we want to find the ETH for 1 rETH, therefore `r = 1`.

```
e = (1 / 5000) * 6000
```

Solving this we get:

```
e = 1.2 ETH
```

Given that the Rocket Pool protocol holds 5000 rETH with 6000 ETH locked up, redeeming 1 rETH will give us 1.2 ETH.

What if we need to solve the equation in reverse, how much rETH would we receive if we deposited 1 ETH?

We start with the same equation:

```
e = (r / R) * E
```

And solve for r, which would be:

```
r = (e * R) / E
```

Given that we know the values of `e`, `R`, and `E` we can plug those values into the equation. Therefore:

```
r = (1 * 5000) / 6000
```

Solving for `r` we get:

```
r = 0.8333 rETH
```

Given our original values, if we were to deposit 1 ETH we would receive 0.8333 rETH.
