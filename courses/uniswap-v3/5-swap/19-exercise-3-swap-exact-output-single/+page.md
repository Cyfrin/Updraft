### Exercise 3: Calling the Exact Output Single Function

For exercise 3, we want to call the `exactOutputSingle` function on the swap router contract. In this exercise, we want to call the `exactOutputSingle` function to swap a maximum of 1000 DAI to obtain exactly 0.1 WETH. The WETH that comes out from the swap should be sent to this test contract.

The function that we will need to call is `exactOutputSingle`. Let's take a look at the interface for `exactOutputSingle`.

```javascript
function exactOutputSingle(ExactOutputSingleParams calldata params) external payable returns (uint256 amountIn);
```

`exactOutputSingle` will be this function. Then we'll need to prepare this parameter to pass to this function:

```javascript
struct ExactOutputSingleParams {
    address tokenIn;
    address tokenOut;
    uint24 fee;
    address recipient;
    uint256 amountOut;
    uint256 amountInMaximum;
    uint160 sqrtPriceLimitX96;
}
```

`tokenIn`, `tokenOut`, and `fee` will determine the pool to swap on. `recipient` will be this test contract. `amountOut` will be 0.1 WETH. `amountInMaximum` will be 1000 DAI. Here we are saying that we're willing to spend a maximum of 1000 DAI and we want exactly 0.1 WETH. For `sqrtPriceLimitX96`, we will keep it simple and set it to 0. So that is exercise 3. We will call the function `exactOutputSingle`.
