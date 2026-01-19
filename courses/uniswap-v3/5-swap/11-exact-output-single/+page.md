## Exact Output Single

If we want to get a specific amount of a token from a swap, and the swap only involves one pool, then we would call the function `exactOutputSingle`.
Inside the `SwapRouter02` contract, when the internal function `exactOutputInternal` is called, the path is encoded as:
```
path = [token out, fee, token in]
```
The `token out` and `token in` parameters will identify the pool to swap on.  For `exactInputSingle`, the path is encoded as `token in`, `fee`, and `token out`. For `exactOutputSingle`, this is the opposite. The path starts with `token out`, followed by `fee`, and ends with `token in`.

The user will call `exactOutputSingle` on the `SwapRouter02` contract. Then `SwapRouter02` will call the function `swap` on the `UniswapV3Pool` contract. From `UniswapV3Pool`, the `token out` is transferred to the user. Next, the `UniswapV3Pool` contract will call `uniswapV3SwapCallback` on `SwapRouter02`. Inside of this callback, the `token in` will be transferred from the user to the pool contract.

Let's take a look at the call trace when the function `exactOutputSingle` is called. When the user calls the function `exactOutputSingle` on the `SwapRouter02` contract, the `exactOutputSingle` function will first call an internal function called `exactOutputInternal`.
The `exactOutputInternal` function will call the function `swap` on the `UniswapV3Pool` contract.
Inside of the function `swap`, it will execute a lot of code. Two of the significant actions will be to transfer the `token out` to the user, and call the callback `uniswapV3SwapCallback`. Inside of the `uniswapV3SwapCallback`, the `token in` will be transferred from the user to the pool.
