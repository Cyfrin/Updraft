# Uniswap V3 Swap Router 02 Contract - Exact Input Single Function

The Swap Router 02 contracts includes four functions that we can call to swap tokens: `exactInputSingle`, `exactInput`, `exactOutputSingle`, and `exactOutput`. Let's examine how each of these functions work. Before we do that, we're going to explain one of the internal parameters that is used when any of these functions are called.

When a function, `exactInputSingle` or `exactInput` is called, a internal function called `exactInputInternal` is called. When the function `exactOutputSingle` or `exactOutput` is called, an internal function called `exactOutputInternal` is called.

Inside the function `exactInputInternal`, there is a parameter called `path`:
```javascript
  (address tokenIn, address tokenOut, uint24 fee) = data.path.decodeFirstPool(
```
This parameter `path` includes the two tokens, and the fee which identify the pool to swap on.

Inside the function `exactOutputInternal`, we can also see the parameter `path`:
```javascript
 (address tokenOut, address tokenIn, uint24 fee) = data.path.decodeFirstPool(
```
This parameter name `path` encodes the tokens and the fee which identify the pool to swap on.

The data type of the parameter named `path` is bytes. The way that the tokens and fees are encoded is as follows: We start with some token, then next we encode the fee, followed by a token. These three parameters will identify a pool. If we wanted to do a swap between two pools, then we follow this by a fee and token. And these three parameters will identify the next pool.
```javascript
path = [token, fee, token, fee, token, fee, token, ... ]
```
For example, let's say that we wanted to swap from DAI to USDC on a pool with a fee 0.01%, then afterwards we want to swap USDC for WETH on the USDC/WETH pool with a 0.3% fee. In this case, the path will be encoded as the address of DAI, 100, the address of USDC, 3000, and then the address of WETH. These two numbers 100 and 3000 are scaled up by 10 to the 6th. So, if you divide 100 by 10 to the 6th, you’ll get 0.01%. If you divide 3000 by 10 to the 6th, then you’ll get 0.3%.

The path is encoded to include the tokens to swap and the pools to use for the swaps.

Next, lets take a look at how the function `exactInputSingle` inside the contract `SwapRouter02` works.

We have a user that is going to call the contract `SwapRouter02` and the `SwapRouter02` will call into the UniswapV3 pool contract.

Inside the `SwapRouter02` there is an internal function called `exactInputInternal`. And inside this function the path will be encoded as `token in`, `fee`, and then `token out`.
```javascript
path = [token in, fee, token out]
```
The user will first call the function `exactInputSingle`. This function is called when you want to swap a token with a single pool. If you wanted to swap with multiple pools, then you call another function called `exactInput`, which we will take a look at later.

The `SwapRouter02` will call into a function called `swap` on the Uniswap V3 pool contract.
The UniswapV3 pool will transfer the `token out` to the user.

Then next, it will call a callback called `UniswapV3SwapCallback` on the `SwapRouter02` contract. Inside the callback, the `SwapRouter02` will call `transferFrom` for the `token in`. Transfer from the user to the UniswapV3 pool contract.

Notice that the `token out` is transferred to the user, before the user has to pay the `token in`. This is the same pattern that we saw in UniswapV2.

Let's explain what functions are called, and how they are called. First the user calls the function `exactInputSingle` on `SwapRouter02`. This function will execute a internal function called `exactInputInternal`. The function `exactInputInternal` will call the function `swap` on the UniswapV3 pool. Among other things, the function `swap` will execute two things, transfer the token out to the recipient, in this case the recipient is the user. And then afterwards, it will execute the callback, `UniswapV3SwapCallback`. The callback is executed on the contract `SwapRouter02`.

Inside the callback of `SwapRouter02`, it will transfer the `token in` from the user to the UniswapV3 pool contract.
