### Exercise 2: Swapping Tokens using Exact Input

For the second exercise, we'll call the `exactInput` function on the swap router 02 contract. We’ll be swapping 1000 DAI for WETH, and then WETH for WBTC. This will be done in a single call to the swap router contract by calling the `exactInput` function.

The final token, WBTC, that comes out of this swap should be sent to this contract. Let's review the interface for swap router 02. We'll need to call the `exactInput` function, and prepare a struct called `ExactInputParams` which will be the input for the function call. The struct contains the following fields:

*   `path` which will encode the path from DAI to WETH, then from WETH to WBTC
*   `recipient` which is set to the test contract.
*   `amountIn` which will be set to 1000 DAI
*  `amountOutMinimum` which will be set to one or zero

Note that for this exercise, WBTC has 8 decimals.
