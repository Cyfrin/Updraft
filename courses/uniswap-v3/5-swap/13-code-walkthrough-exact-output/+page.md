### Code Walkthrough: exactOutputSingle and exactOutput

Let's begin with a code walkthrough for the function `exactOutputSingle`. The function `exactOutputSingle` is called when a user wants a specific amount of tokens from a single Uniswap V3 pool contract. The Uniswap V3 pool contract will calculate the amount of tokens that must come in and then pull that amount of tokens in.

This function calls an internal function called `exactOutputInternal`. The function `exactOutputInternal` from the input path will decode the token out, token in, and the fee.

I want to show you how the path is encoded when the function `exactOutputSingle` is called. You can see here that the path is encoded as token out, fee, and token in. This is the reverse order of how the path is encoded compared to `exactInputSingle`.

In `exactInputSingle` the path will be encoded as token in, fee, then token out. However, for `exactOutputSingle`, the path is encoded as token out first, then fee and then token in.

Let's go back to the internal function `exactOutputInternal`, it will get the token out, token in, and fees, and then calculate `zeroForOne` by comparing token in and token out.

Next, it would call the function `swap` on the Uniswap V3 pool contract. Again the Uniswap V3 pool contract will execute the function swap and at the end of the swap, it will call a callback called `uniswapV3SwapCallback`. This callback is again executed inside the swap router contract. 

Inside here since this call is an exact output, this part of the code will execute:

```javascript
// note that because exact output swaps are executed in reverse order, tokenOut is actually
pay(tokenOut, data.payer, msg.sender, amountToPay)
```
Also for `exactOutputSingle` we don't have multiple pools, so this part of the code will execute:
```javascript
// note that because exact output swaps are executed in reverse order, tokenOut is actually
pay(tokenOut, data.payer, msg.sender, amountToPay)
```

What this does is ask the payer, which is the caller of the function `exactOutputSingle`, to pay the Uniswap V3 pool for `amountToPay`. Okay, that's `exactOutputSingle`.

Next, let's take a look at the function `exactOutput`. The function `exactOutput` is the most difficult function to understand in this contract. The reason why it's difficult is because `exactOutput` will make recursive calls to `exactOutputInternal`. This function is similar to `exactOutputSingle`. Users specify the amount of token that they want to take out of Uniswap V3 and Uniswap V3 will tell the user how much token that must come in.

The difference between `exactOutputSingle` and `exactOutput` is that `exactOutputSingle` will only call swap with a single pool. `exactOutput` will swap with multiple pools. For example, if you wanted 1 WETH from the USDC/WETH pool, you would call `exactOutputSingle`. On the other hand, let's say you wanted 1 WETH but you only had DAI, one way to get WETH from DAI is to first swap DAI for USDC and then USDC for WETH.

In this case, the user would call the function `exactOutput`. Continuing with our example of swapping from DAI to USDC and then from USDC to WETH, for `exactOutput`, the order of the swaps will be in the reverse order. First, it will swap from USDC to WETH. This WETH will be sent over to the caller. Now, this USDC/WETH pool still needs USDC to come in to complete the swap. So the swap router contract will next execute a swap between the DAI/USDC pool, send the USDC over to the USDC/WETH pool, and then pull the DAI from the caller. So you can see that it first swapped with the USDC/WETH pool and then next swapped with the DAI/USDC pool.

Let's take a look at the function `exactOutputInternal`. Inside the function `exactOutputInternal`, the parameter path is encoded as token out, fee, and then token in. For example, if we're swapping from DAI to USDC and then from USDC to WETH, the path will be encoded as WETH, 3000, this is the pool fee, USDC, 100, and then DAI. This part of the code will get the first pool, in our example this would be WETH 3000 and USDC. Token out will be WETH and token in will be USDC. 

Moving on, it will call the function swap on the Uniswap V3 pool. The Uniswap V3 pool will call back into a callback, `uniswapV3SwapCallback`. From here this will be a swap with `exactOutput`, so this part of the code will execute:

```javascript
// note that because exact output swaps are executed in reverse order, tokenOut is actually
  pay(tokenOut, data.payer, msg.sender, amountToPay);
```
and for our example it also has multiple pools so this part of the code will execute:
```javascript
 data.path = data.path.skipToken();
 exactOutputInternal(amountToPay, msg.sender, 0, data);
```
Now, notice that to get to this part of the code, the function `exactOutputInternal` was called, which called the function swap on Uniswap V3, and the function swap called back into this function `uniswapV3SwapCallback`.

From here, we're calling back into this internal function called `exactOutputInternal`. The function `exactOutputInternal` calls back into the function `exactOutputInternal` when there are multiple pools. It is making a recursive call. This part of the code is what makes the function `exactOutput` difficult to understand.

So, assuming that there are multiple pools, let's see what happens over here:
```javascript
data.path = data.path.skipToken();
```
First it will remove the first token from the path. For example, if the path was WETH, USDC, and DAI, it would remove the first token, so it would remove WETH and fee. This new path will be passed to the function `exactOutputInternal`.

Imagine that when this part of the code is executed, there are two pools to swap with. When this part of the code is executed:
```javascript
 data.path = data.path.skipToken();
```
It will remove one pool so we're only left with one pool. It's going to call `exactOutputInternal` again. Going back to `exactOutputInternal`, notice that this parameter `recipient` is now set to the pool that called into the `uniswapV3SwapCallback`. The recipient for the next swap is set to the previous pool contract. And it's going to call the function swap again. If we started out with WETH, 3000, USDC, 100, and DAI, in this iteration, the path will be USDC, 100, and DAI. And it's going to call the function swap on the pool, USDC/DAI. And again this function swap will call back into the callback, `uniswapV3SwapCallback`.
This is still an exact output, so this part of the code will execute:

```javascript
  // note that because exact output swaps are executed in reverse order, tokenOut is actually
    pay(tokenOut, data.payer, msg.sender, amountToPay);
```
However, at this point, let's say the path is USDC, 100, and DAI, it no longer has multiple pools. So this part of the code will execute:
```javascript
  // note that because exact output swaps are executed in reverse order, tokenOut is actually
    pay(tokenOut, data.payer, msg.sender, amountToPay);
```
And in this case, it will transfer the token in from the payer, and the payer here will be the caller to the function `exactOutput` to msg.sender, so to the first pool in our example, this would be the USDC/DAI pool for `amountToPay`. And this part of the code will end the execution to the recursive calls to the function `exactOutputInternal`.

And that completes the code walkthrough for the function `exactOutput` and the function `exactOutputSingle`.
