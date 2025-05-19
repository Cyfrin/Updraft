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

This is the implementation process of the `getAmountsIn` function.

```js
    // performs chained getAmountIn calculations on any number of pairs
    function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;

        // --- Inputs ---
        // amountOut = 1e18
        // path = [WETH, DAI, MKR]
        // --- Outputs ---
        // WETH     804555560756014274 (0.8045... * 1e18)
        // DAI  2011892163724115442026 (2011.892... * 1e18)
        // MKR     1000000000000000000 (1 * 1e18)

        // --- Execution ---
        // amounts = [0, 0, 0]
        // amounts = [0, 0, 1000000000000000000]

        // For loop
        // i = 2
        // path[i - 1] = DAI, path[i] = MKR
        // amounts[i] = 1000000000000000000
        // amounts[i - 1] = 2011892163724115442026
        // amounts = [0, 2011892163724115442026, 1000000000000000000]

        // i = 1
        // path[i - 1] = WETH, path[i] = DAI
        // amounts[i] = 2011892163724115442026
        // amounts[i - 1] = 804555560756014274
        // amounts = [804555560756014274, 2011892163724115442026, 1000000000000000000]

        // NOTE:
        // i     | output amount  | input amount
        // n - 1 | amounts[n - 1] | amounts[n - 2]
        // n - 2 | amounts[n - 2] | amounts[n - 3]
        // ...
        // 2     | amounts[2]     | amounts[1] 
        // 1     | amounts[1]     | amounts[0]
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }
```
