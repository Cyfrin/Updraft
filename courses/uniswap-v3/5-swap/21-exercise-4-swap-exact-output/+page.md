# Exercise 4: Calling Exact Output

Okay, let's take a look at this exercise. We are going to be calling the `exactOutput` function on `swapRouter02`. We are going to be swapping a maximum of 1000 DAI to obtain exactly 0.01 WBTC. We will swap DAI to WETH and then from WETH to WBTC. We also need to send the WBTC back to this test contract. Also note that WBTC has 8 decimals.

Let's take a look at the function declaration `exactOutput`. Inside the interface for `swapRouter02` the function `exactOutput` takes a single parameter, which is a struct. So we need to prepare this struct to call `exactOutput`. 

The first parameter `path` will encode the tokens to swap and the pools to call. For `exactOutput`, the path must be encoded in the reverse order of the tokens. In this exercise, we will be swapping from DAI to WETH and then from WETH to WBTC. So the path will be WBTC, WETH, and then finally DAI.

The `recipient` parameter will be this test contract. The `amountOut` parameter will be 0.01 WBTC. And the `amountInMaximum` will be 1000 DAI.

That is the last exercise, to call the function `exactOutput` on `swapRouter02`.
