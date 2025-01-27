### Pool Value

For a pool with N tokens, the pool value is defined as:

```
(D/Np0 * D/Np1 ... D/Npn-1)^1/N
```

This equation is used in two ways: first, to calculate the amount of liquidity shares to mint to a liquidity provider, and second, to calculate the pool value with different price scales when the Curve B2 AMM decides to re-peg. The transformed balance is defined as:

```
x'i = pi * xi
```

Where x'i is the transformed balance, pi is the price scale, and xi is the actual token balance. At equilibrium, the transformed balances are equal to each other and are defined as:

```
At equilibrium x'i = D/N
```

However, is this a useful measurement? The Curve B2 AMM whitepaper doesn't explain how this equation was derived. We will explain our thoughts on why this is a useful measurement for the pool value.

First, we'll derive the equation. To construct the equation, we start with the parameters A, gamma, and the price scales. Since we know the price scales, we can calculate the transformed balances. Once we know the transformed balances, we can calculate D using the Curve B2 AMM�s equation. To construct the equation, we begin with a constant product AMM equation:

```
x'0x'1...x'n-1 = D/N * D/N ... D/N
```

On the left side, we multiply all transformed balances.  On the right, we multiply D/N, n times. Since the transformed balances are the actual token balances multiplied by the price scale, let's unpack them:

```
x0p0x1p1...xn-1pn-1 = D/N * D/N ... D/N
```

Next, we'll bring the price scales from the left to the right by dividing by the price scale of the first token:

```
x0 x1p1...xn-1pn-1 =  D/Np0 * D/N ... D/N
```

Repeat for all tokens:

```
x0 x1 ...xn-1 =  D/Np0 * D/Np1 ... D/Npn-1
```

The resulting equation looks like a constant product, but not quite.

Next, we'll compare the resulting equation with a constant product equation.  The constant product equation for n tokens is that we multiply all of the token balances, and this is equal to L to the power of n.

```
x0x1...xn-1 = L^n
```

Where L represents the liquidity of a constant product AMM. In both equations, the left sides multiply the token balances.  The right side of the constant product AMM equation equals  L to the power of n. If we take the nth root of this equation we have:

```
(L^n)^1/n = L
```

If we do the same for our equation for the pool value, we get:

```
(D/Np0 * D/Np1 ... D/Npn-1)^1/N
```

This gives us the pool value defined for the Curve B2 AMM.  The equation represents the value L in a constant product AMM.

We can ask two questions at this point:
  1. Why is the pool value constructed from the equation of a constant product AMM, instead of the constant sum or Curve B1 AMMs?
  2. Why is the pool value evaluated where the transformed balances are equal to D/N?

Let's start by addressing question #2. Curve B2 concentrates liquidity. The point where transformed balances are equal to D/N represents the center of concentrated liquidity. This is because it represents the equilibrium of the pool where token balances are expected to stay. As the market price moves away from the concentrated liquidity center, Curve B2 must decide whether to re-peg to that new price scale or to keep it at the current equilibrium. To decide this, it must compare what would happen if the current token balances were to come back to the concentrated liquidity center. 

Now, let's address question #1.  At equilibrium, the curves for constant sum AMM, Curve B2 AMM, and constant product AMM all intersect. To measure the pool value we have at least two equations we could use: the constant sum and the constant product. Comparing the liquidity for a constant product AMM is simple. The curve with higher liquidity is to the right and above another curve. Therefore, for a constant product AMM, it�s easy to compare liquidities. This makes it a good equation to use to construct the pool value for Curve B2 AMM. The value for gamma is a small number. When gamma is small, the curve for Curve B2 AMM will look more like a constant product AMM than a constant sum AMM, which further explains this choice. This remains true for different price scales.

