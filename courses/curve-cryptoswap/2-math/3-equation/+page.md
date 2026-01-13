# Curve V1 and V2 Equations

At first glance, the Curve V2 AMM equations can appear daunting. However, there are only three equations we need to understand. If we understand Curve V1's equation, we will see that it doesn't take much effort to understand Curve V2's equation. Let's start by reviewing Curve V1's equation.

Curve V1's equation is a combination of constant sum and constant product. Starting with the constant sum, we add all token balances, and the total is denoted as "D."

```
∑{i=1}^{N} xᵢ=D
```

Next, we add constant product to the equation. We multiply all of the token balances, which must be equal to D/N, raised to the nth power.

```
∑{i=1}^{N} xᵢ + ∏{i=1}^{N} xᵢ = D + (D/N)^N
```

Then, we multiply by D to the n minus one power on the constant sum portion of the equation to match D to the N power on the constant product side of the equation.

```
D^{N-1}∑{i=1}^{N} xᵢ + ∏{i=1}^{N} xᵢ = D^{N} + (D/N)^N
```

Next, we add another component to the constant sum part of the equation, which controls the flatness of Curve V1's curve.

```
AK₀D^{N-1}∑{i=1}^{N} xᵢ + ∏{i=1}^{N} xᵢ = AK₀D^{N} + (D/N)^N
```

A is simply just a number, and K₀ is a function of the token balances.

```
K₀ = ∏{i=1}^{N} xᵢ / (D/N)^N
```

This function, K₀, is equal to one when all of the token balances are equal to D over N. The function goes to zero when any of the token balances goes further away from D over N. This equation is Curve V1's equation.

Curve V2's equation extends the K₀ function. We define a new variable called K. We multiply K₀ by a new component introduced in Curve V2.

```
K = K₀ (γ/ (γ + 1 - K₀))²
```

Notice that the K₀ component from Curve V1 appears in two places. The new component introduces a new variable, γ, which is being multiplied by K₀. This is the "magic sauce" that enables Curve V2's AMM to have concentrated liquidity. 

Finally, we replace Curve V1's K₀ component with the new component, K.

```
AKD^{N-1}∑{i=1}^{N} xᵢ + ∏{i=1}^{N} xᵢ = AKD^{N} + (D/N)^N
```

This is Curve V2's equation.

The only difference between Curve V1 and V2 is this extra component called gamma, which is being multiplied by K₀. K₀ controls how flat the curve is, and γ controls the concentration of liquidity.
