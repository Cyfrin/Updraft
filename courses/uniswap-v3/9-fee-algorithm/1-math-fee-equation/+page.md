### Uniswap V3 Fee Calculation

In this lesson we will cover how fees for liquidity providers are calculated on Uniswap V3. We will begin by working through a simple example and then expand to the general case. 

In our simple example, we have a liquidity pool that has some liquidity in a histogram shape. In this pool, Alice has 'S' liquidity between a price range. The active liquidity will be labeled as 'L0'. Bob then comes along and swaps 'dy' of token Y for 'dx' of token X. This swap moves the current active tick over to the right of the histogram. Let’s say that the active liquidity changed from 'L0' to 'L1'. Remember that fees are collected on the token in, which in this case is token 'Y'. We’ll label f0 as the amount of fee that was collected on liquidity L0, and f1 as the fee that was collected on liquidity L1.

From this example, we can calculate the fees that Alice collects for providing liquidity. We will label the total fees earned by Alice as 'F'. 'F' is equal to the fee collected on liquidity 'L0', and Alice will earn a percentage of f0. We can consider an easier case to understand the percentage, let's say Alice provides all of L0. In that case, the percentage she can earn from this liquidity is 100%, or f0. However, in this case, Alice provided 'S' amount of liquidity out of L0. So, the percentage of f0 that Alice can earn is f0 times S/L0. This is just one fee, so we must also account for f1. So, f1 is a total amount of fee that was collected in liquidity L1. The total amount of liquidity in L1 is L1. Alice provided 'S' so S/L1 will give the percentage of f1 that Alice can collect.

So, in this example, Alice provided S amount of liquidity in a liquidity pool, and in a single swap the active liquidity swapped from L0 to L1 collecting the fees f0 and f1. In this case, the total amount of fee that Alice collected in the swap is:
```javascript
f = f0 * (S/L0) + f1 * (S/L1)
```

Let’s now consider a general case where Alice has 'S' amount of liquidity for some time and during that time there are multiple swaps. Additionally the liquidity might change over time, but Alice does not add or remove liquidity, and so 'S' remains constant. We’ll label 'fi' to be the fee collected on token Y collected at liquidity Li. The value of i ranges from 0 to some number 'N'. Again we will say that f is total fees of token y earned by Alice. The equation is the same for token x, but for these examples, we will use token Y.
Let’s say the first fee collected was f0, then the amount Alice can collect is:
```javascript
f = f0 * (S/L0)
```
The next fee will be:
```javascript
f = f0 * (S/L0) + f1 * (S/L1)
```
We repeat this pattern until some value 'n'. We can write this more concisely as:
```javascript
f = sum (i=0 to n) S * fi / Li
```
In this equation, 'S' is a constant so we can pull it out:
```javascript
f = S * sum (i=0 to n) fi / Li
```
This is important because Uniswap V3 uses a state variable called 'fee growth' which is based on this equation.

Let's look at an example of this equation. Let’s say at time t=0, the liquidity pool looks like a histogram, and Alice has provided 'S' amount of liquidity. Let’s say there was a swap of token 'Y' for token 'X'. The active liquidity changed from L0 to L1, and this swap collected f0 amount of token Y from liquidity L0 and f1 amount of token Y from liquidity L1. Let’s say some time has passed, and at t=1, notice that the shape of liquidity has changed, however the amount of liquidity Alice provided remains the same. There was a swap from token X to token Y. The active liquidity started at L2 and moved to L5. Since Uniswap V3, fees are collected on token in, no fees were collected on token 'Y', so f2, f3, f4, and f5 are all equal to 0. Once again, let's say some time has passed and t=2, and once again the shape of the liquidity has changed, but the amount of liquidity Alice has provided remains the same. Let’s say there was a swap of token 'Y' for token 'X'. The active liquidity changed from L6 to L8. Along the way it collected f6, f7, and f8. With this, let's calculate the amount of fee that Alice has collected:
```javascript
f = f0 * (S/L0) + f1 * (S/L1)
```
The percentages of fee she collected on f0 was s/L0 and on f1 it is S/L1. For f2 it's s/L2, and since f2, f3, f4 and f5 were 0, we ignore them.
```javascript
f = f0 * (S/L0) + f1 * (S/L1) +  f6 * (S/L6) + f7 * (S/L7) + f8 * (S/L8)
```
That’s it for the introduction of this lesson.
