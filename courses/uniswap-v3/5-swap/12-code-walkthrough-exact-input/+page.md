# Code Walkthrough of Exact Input and Exact Input Single Functions

In this lesson, we are going to perform a code walkthrough for the contract, `SwapRouter02.sol`. The contract, `SwapRouter02.sol` is used to swap tokens for Uniswap V2 pools. This contract is located under the repo called `swap-router-contracts`.

The contract, `SwapRouter02.sol`, inherits two contracts, `V2SwapRouter` and `V3SwapRouter`. To swap with Uniswap V3, we will look at the contract `V3SwapRouter.sol`. Inside of the `V3SwapRouter` contract, there are several functions. The functions that we are going to take a look at are:
*   `exactInputSingle`
*   `exactInput`
*   `exactOutputSingle`
*   `exactOutput`

Let’s start with `exactInputSingle`. The function, `exactInputSingle`, is used to swap a specific amount of token in for some amount of token out. The amount of token that the user desires to put inside of the pool is specified by the user. The amount that comes out will be calculated by the Uniswap V3 pool. This function is called `exactInputSingle` because it will only swap with a single pool. To swap with multiple pools, you need to call the function `exactInput`. We'll take a look at that later.

The function first checks whether to swap the token using the balance of the token in inside the contract or to pull the token in from the caller. For simplicity, we'll say that the token in will come from the caller, so, `hasAlreadyPaid`, will be set to false.
```javascript
bool hasAlreadyPaid;
if (params.amountIn == Constants.CONTRACT_BALANCE) {
    hasAlreadyPaid = true;
    params.amountIn = IERC20(params.tokenIn).balanceOf(address(this));
}
```
Then it’s going to call an internal function called `exactInputInternal`. The function, `exactInputInternal` is called by both the function `exactInputSingle` and `exactInput`. We said in a previous lesson that `path` encodes the tokens and the fees which will identify the pool. The order in which the tokens are encoded will tell us which is token in, and which is token out. For example:
```javascript
[A, fee, B]
```
Then token in will be A and token out will be B. If we had it the other way around:
```javascript
[B, fee, A]
```
Then token in will be B and token out will be A. For example, let’s say that we wanted to swap from DAI to USDC on the DAI/USDC pool with 0.1% fee, and then from USDC to WETH in the pool with a 0.3% fee. Then path must be encoded like this:
```javascript
[DAI, 100, USDC, 3000, WETH]
```
Token in will be DAI, then token out will be USDC. In the next swap, USDC will be token in, and WETH will be token out.

Next, it checks if the swap is 0 for 1 by comparing the address of token in and token out. It calls the swap function on the Uniswap V3 pool which is computed by taking in the token in, token out, and the fee.
```javascript
getPool(tokenIn, tokenOut, fee).swap(
                recipient,
                zeroForOne,
                amountIn.toInt256(),
                sqrtPriceLimitX96,
                abi.encode(data)
            );
```
When this swap function is called, inside of the Uniswap V3 Pool contract, it will call this function:
```javascript
function swap(
        address recipient,
        bool zeroForOne,
        int256 amountSpecified,
        uint160 sqrtPriceLimitX96,
        bytes calldata data
    ) external override noDelegateCall returns (int256 amount0, int256 amount1)
```
We have said in a previous lesson that at the end it will transfer the tokens, then it’s going to call a callback called `UniswapV3SwapCallback`. This callback is executed back inside the `V3SwapRouter` contract. Inside of that function, this is an example of exact input, so it will execute this part of the code:
```javascript
pay(tokenIn, data.payer, msg.sender, amountToPay);
```
Pay token in from the payer, who will be the caller of the function `exactInputSingle`, to `msg.sender`. This function was called by the Uniswap V3 pool so, `msg.sender` will be the Uniswap V3 pool. Pay from the caller, to the Uniswap V3 pool, for `amountToPay`. That completes the execution to the function `UniswapV3SwapCallback`. Then this swap function will return to the `exactInputInternal` function.

Moving on, let’s take a look at the function, `exactInput`. The function `exactInput` is similar to the function `exactInputSingle`. The caller will specify the amount of tokens that they want to put inside Uniswap V3, and Uniswap V3 will calculate the amount of tokens that will go out. The difference between `exactInput` and `exactInputSingle` is that `exactInputSingle` will only call swap with a single pool. On the other hand, `exactInput` will execute swaps with multiple pools. For example, if we wanted to swap from DAI to USDC, and then from USDC to WETH, then we will need to call the function `exactInput`.

Again, the first part of this code will check whether to swap with tokens that is inside this contract or not. For simplicity, we'll assume that token in will come from the caller to this function. So, we'll assume that `hasAlreadyPaid` is set to false.
```javascript
    bool hasAlreadyPaid;
    if (params.amountIn == Constants.CONTRACT_BALANCE) {
        hasAlreadyPaid = true;
        params.amountIn = IERC20(params.tokenIn).balanceOf(address(this));
    }

    address payer = hasAlreadyPaid ? address(this) : msg.sender;
```
Next, we have a while loop. In each iteration of the while loop, it will call the function `exactInputInternal`, and execute this part of the code:
```javascript
  while (true) {
        if (hasMultiplePools = params.path.hasMultiplePools()) {
            params.amountIn = exactInputInternal(
                params.amountIn,
                params.recipient,
                sqrtPriceLimitX96,
                SwapCallbackData(path, params.tokenIn, params.fee, params.tokenOut),
                0
            );
            payer = address(this);
            params.path = params.path.skipToken();
        } else {
          amountOut = params.amountIn;
          break;
        }
    }
```
If there are multiple pools left, this parameter is queried by calling the function, `hasMultiplePools`, on the input path. If `hasMultiplePools` returns true, then `payer` will be set to this contract. Then, from the current path, it will remove the first token that is encoded into path.

As an example, imagine that path is encoded as token A, fee, token B, fee, token C, fee, and token D. On the first iteration, it will remove token A and fee. On the next iteration, it would remove token B and fee. And, on the last iteration, the path no longer has multiple pools. So we'll be executing this part of the code:
```javascript
    } else {
      amountOut = params.amountIn;
      break;
    }
```
It will set the amount out, and break from the while loop. So, this is how the while loop works inside of the function, `exactInput`.

On each iteration, it will call the function, `exactInputInternal`, to swap the tokens with a single pool of the Uniswap V3 pool contract, and after the swap it will remove a token and fee from the path. When the path no longer has multiple pools, the while loop will exit and we’ll move onto the next part of the code. Which ends the execution for the function, `exactInput`.

Next, I want to go a little bit deeper into how `exactInputInternal` is called inside of this while loop. In the first iteration, notice that the payer is set to `msg.sender`. And the recipient of the first token is set to `address(this)`. So, when there are multiple pools to swap, the initial payer will be `msg.sender`, and the recipient of token out will be this router contract. In the last iteration of this while loop, this boolean, `hasMultiplePools`, will be false. So the recipient of the last token will be the `params.recipient` set inside the parameter and the payer will, inside the while loop, payer is set to this contract:
```javascript
 payer = address(this);
```
So, for the last iteration of this while loop, token in will come from the router contract, and token out will be sent to the `params.recipient`.

That completes the code walkthrough for the functions, `exactInput`, and `exactInputSingle`.
