In this lesson, we'll explore the code for `swapExactTokensForTokens` from Uniswap V2. This function allows us to swap tokens for other tokens. For instance, if we want to swap 1,000 DAI for the maximum possible amount of WETH, we'd use `swapExactTokensForTokens` for this purpose.

Let's review how this function works. The function uses a Uniswap V2 library function called `getAmountOut` to calculate an array of `uint` values. This array, called `amounts`, stores the amount of tokens exchanged during the swap process. The first element in the `amounts` array represents the input token amount. The last element holds the output token amount, while any intermediate elements correspond to amounts exchanged during multi-hop swaps.

The `swapExactTokensForTokens` function first transfers the input tokens to the pair contract. This pair contract is calculated using a function called `create2` based on the input and output token addresses provided in the `path` array. The `path` array contains the addresses of tokens involved in the swap. For instance, if we're swapping DAI to WETH and then to MKR, the `path` array would look like this:

```javascript
[DAI, WETH, MKR]
```

Inside the `swap` function, the function loops through the `path` array, iterating from index zero to `path.length - 1`.  Each iteration calculates the pair contract address,  and then executes the `swap` function on the pair contract.

We'll delve into the details of `getAmountOut` in a later lesson. 
