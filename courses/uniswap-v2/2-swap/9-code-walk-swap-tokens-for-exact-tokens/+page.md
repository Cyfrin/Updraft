Let's walk through the code for the function, `swapTokensForExactTokens`.

We are going to swap the minimum input for some specified output.  

For example, let's say we're willing to spend a maximum of 3,000 DAI and we want to get out exactly 1 WETH, then we would call this function. 

If getting 1 WETH would result in spending more than 3,000 DAI, this function will revert.

Let's take a look at the code.

First, we call a function called `getAmountsIn`. The last element in this `amounts` array will contain the amount of token that came out. This will be the `amountOut` specified by the user.  And the first element will contain the amount of token that is needed to get the `amountOut`. 

We can see this check over here, `amounts[0]` must be less than or equal to `amountInMax`. The rest of the elements in this array will contain the amounts of tokens for the intermediate trades. 

Next, we transfer the input token, `path[0]` to the first pair contract, which is calculated by calling the function `pairFor` and passing `path[0]` and `path[1]`. The amount to transfer is stored in `amounts[0]`. 

Again, it might be surprising that we directly transfer the tokens before calling the `swap` function on the Uniswap V2 pair contract.

Next, we call the internal function `swap`. 

What this function will do is for each pair contract, it will call the function `swap`.  Inside the `for` loop, the last swap will send the output token to this `to` address. All other intermediate swaps will send the output token over to the next pair contract to call the function `swap`.

So, this is the function for `swapTokensForExactTokens`. 

```js
    // NOTE: swap min input for specified output
    // max in = 3000 DAI
    // out =  1 WETH
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
        // NOTE: calculates amounts based on the desired amountOut
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        // NOTE: checks if the amounts is less than or equal to the user's max input
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        // NOTE: transfers the user's input token to the first pair contract for trading
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        // NOTE: performs the swap in the loop, traversing through all pairs in the path
        _swap(amounts, path, to);
    }
```
