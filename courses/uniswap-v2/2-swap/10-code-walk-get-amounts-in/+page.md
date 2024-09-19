We will be examining the function `getAmountIn` within the UniSwapV2Library. This function is used to calculate the amount of tokens needed for a swap. The input is the desired amount out, the reserves, and a path. 

We can understand how this function works by looking at a table. Let's say we have a list of amounts and the length of this list is some number N. We will start by listing out the indexes of this array, starting from N-1. The for loop runs from N-1 down to 1. In each iteration, the function `getAmountIn` is called. The input of the function is the current amount out, along with the reserves. 

The first iteration of the for loop will assign the amount out to the last element of the array, `amounts[N-1]`. The output of `getAmountIn` is then assigned to `amounts[N-2]`, effectively working its way backward down the list of amounts. 

The function `getAmountIn` uses an equation we derive from the Uniswap swap. 

```javascript
amountOut = numerator / denominator
```

The denominator in this equation is:

```javascript
denominator = reserveOut - amountOut * 997 / 1000
```

This equation is derived from the Uniswap swap equation where we solve for `dy`. 

```javascript
dy =  reserveOut * amountOut * 997 / (amountOut * 997 + reserveIn * 1000) 
```

The numerator in this equation is:

```javascript
numerator = reserveIn * amountOut * 1000 / (amountOut * 997 + reserveIn * 1000)
```

The result of this calculation is then stored in the amounts array. 

We will keep looping through the array until we get to `amounts[0]`, which will contain the amount of tokens that are needed to execute the swap. This entire process is performed inside the for loop. 
