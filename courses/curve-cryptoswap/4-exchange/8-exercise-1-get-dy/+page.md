### Curve V2 Swap Exercise 1

Here is our first exercise for swapping with Curve V2 AMM. The exercise is located under the following path:
test > curve-v2 > exercises > Curve2Swap.test.sol

Okay, let's take a look at our first exercise.

For this exercise we're going to be using the Curve V2 pool, that has:
USDC
WBTC
WETH

So for our first exercise, we need to call get_dy, to calculate the amount of USDC for swapping one WETH to USDC. And we can write our code here:
```javascript
uint256 dy = 0;
```
