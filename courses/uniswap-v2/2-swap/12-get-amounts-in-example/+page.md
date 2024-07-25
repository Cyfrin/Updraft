In this lesson, we'll be looking at the `getAmountsIn` function inside of the UniswapV2Library contract.

We'll be using Foundry's main network and the actual outputs from calling this function to help us walk through an example of the code.

The `amounts` array is first initialized as a uint array. For our example, we'll set the path to be three tokens long: WETH, DAI, MKR.

The `amounts` array is initialized as all zeros with a length of three.

Next, we initialize the last element of the `amounts` array to `amountOut`. For our example, `amountOut` will be 1 MKR, represented as 1e18.

This results in the following `amounts` array:

```javascript
amounts = [0, 0, 1e18]
```

The next step is to walk through the for loop.

This for loop will iterate over the `amounts` array, starting with the last element (`i` equals path length - 1).

The path length is three, so the loop will begin with `i` equals two. 

On the first iteration of the loop, the function accesses the path of `i` (MKR) and the path of `i - 1` (DAI). 

It then stores the value of `amounts` of `i` (1e18) into `amounts` of `i - 1`.

In essence, this is telling us that to get 1 MKR, we need approximately 2011 DAI.

At this point in the loop, the `amounts` array will look like this:

```javascript
amounts = [0, 2011, 1e18]
```

The next iteration of the loop will be `i` equals 1.

On this iteration, the function accesses the path of `i` (DAI) and the path of `i - 1` (WETH). 

The function will then call the `getReserves` function to determine the amount of WETH needed to obtain 2011 DAI.

```javascript
getReserves(factory, path[i - 1], path[i])
```

The output from the `getReserves` function is then passed into the `getAmountIn` function:

```javascript
getAmountIn(amounts[i], reserveIn, reserveOut)
```

This function calculates the amount of WETH needed to obtain 2011 DAI and stores the result in `amounts` of `i - 1`.

The final `amounts` array will look like this:

```javascript
amounts = [0.8, 2011, 1e18]
```

This demonstrates how the `getAmountsIn` function uses a loop to determine the amount of each token needed to obtain a specified amount of a target token.
