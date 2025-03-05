## Flash Loan Amount

In this lesson, we'll derive a simple equation for determining the maximum borrow amount when creating a leveraged position via flash loans.

First, let’s define our variables:

- B = total borrowed USD
- C = total collateral USD
- C₀ = initial amount of collateral in USD deposited by user
- L = loan to value ratio (LTV)

So, the total borrowed divided by the total collateral must be less than or equal to the loan to value ratio.

```solidity
B/C ≤ L
```

Now, let's denote F as the flash loan USD amount. Then:

```solidity
B = F
```

Next, we will state that Cs is the USD amount of collateral swapped from a flash loan.

```solidity
Cs = F
```

This assumes zero slippage on the swap and zero swap fees.

Now, we'll rewrite Cs as a multiple of C₀ for some number k:

```solidity
Cs = k * C₀
```

From this point we can rewrite C as:

```solidity
C = C₀ + Cs
```

or

```solidity
C = C₀ + k*C₀ = (1 + k) * C₀
```

Now, we can combine all our expressions to solve for F, starting with:

```solidity
B/C ≤ L
```

Since B = F, we can rewrite the expression as:

```solidity
F/C ≤ L
```

Next, we'll replace the C:

```solidity
F/((1 + k) * C₀) ≤ L
```

Then we'll replace F:

```solidity
Cs/((1 + k) * C₀) ≤ L
```

Since Cs = k \* C₀, then:

```solidity
(k * C₀)/((1 + k) * C₀) ≤ L
```

The C₀ on the top and the bottom cancel out to give us:

```solidity
k/(1 + k) ≤ L
```

From there, we can solve for k:

```solidity
k ≤ L / (1 - L)
```

Finally, we can express F in terms of k:

```solidity
F = Cs ≤ k * C₀
```

or

```solidity
F ≤ (L / (1 - L)) * C₀
```

This expression gives us the maximum flash loan amount in terms of LTV and the initial collateral amount.
