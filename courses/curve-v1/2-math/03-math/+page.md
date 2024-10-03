## Curve V1 Equation

We'll cover the Curve V1 equation, which can be found in the Curve whitepaper. 

The general equation for *n* tokens is shown below.  *n* represents the number of tokens, which can be greater than or equal to 2. 

```
kai * sum all of the token balances from i = 1 to i = n + multiply all of the token balances from i = 1 to i = n = kai * (D + (D / n) raised to the power of n)
```
This equation is a combination of the constant sum and constant product. 

We can substitute the *kai* symbol with its corresponding terms, which is *A* multiplied by all of the token balances, divided by *D* / *n*, and then raised to the power of *n*.

```
A * sum all of the token balances from i = 1 to i = n / (D / n) raised to the power of n * sum all of the token balances from i = 1 to i = n + multiply all of the token balances from i = 1 to i = n = A * (D + (D / n) raised to the power of n)
```

The whitepaper also contains an alternative form of the Curve V1 equation. The form is shown below:

```
A * n raised to the power of n * sum all of the token balances from i = 1 to i = n + D = A * D * n raised to the power of n + D raised to the power of n + 1 / product of all coins from i = 1 to i = n
```
We can derive this alternative form from the general form by dividing both sides of the equation by *D* divided by the product of all the tokens. 

Let's simplify the left side of the equation first:

```
A * n raised to the power of n / (D / n) raised to the power of n * sum all of the token balances from i = 1 to i = n + D
```
*A* and the product of all of the tokens will cancel out on both the top and the bottom. *D* raised to the power of *n* will cancel out with *D* raised to the power of *n - 1* multiplied by *D*. 

This will leave us with:

```
A * n raised to the power of n * sum all of the token balances from i = 1 to i = n + D
```

Now, let's simplify the right side of the equation:

```
A * (D + (D / n) raised to the power of n) / (D / product of all coins from i = 1 to i = n)
```
The product of all the coins cancels out on both the top and the bottom. *D* raised to the power of *n* will cancel out with *D* raised to the power of *n - 1* multiplied by *D*.

This will leave us with:

```
A * D * n raised to the power of n + D raised to the power of n + 1 / product of all coins from i = 1 to i = n
```

Putting the left and right side together, we get:

```
A * n raised to the power of n * sum all of the token balances from i = 1 to i = n + D = A * D * n raised to the power of n + D raised to the power of n + 1 / product of all coins from i = 1 to i = n
```
This is the alternative form of the Curve V1 equation. 
