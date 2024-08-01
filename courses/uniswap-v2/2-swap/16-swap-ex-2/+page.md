We looked at the function `swapExactTokensForTokens` on the Uniswap V2 contract. This function will try to swap all of your token in, and then give as much as possible of token out. There's another function in the Uniswap V2 contract called `swapTokensForExactTokens`. This function will try to spend the minimum amount of token in to give the user some amount that the user specified.

So if you look at the inputs: `amountOut` will be the amount of token that the user wants. `amountInMax` will be the maximum amount of token in that the user is willing to spend. `path` will be the tokens. If we're only dealing with one pair contract, this path will contain the addresses of the two tokens. If the swap involves two pair contracts, then this path would contain three token addresses: two will be the receiver of the token out, and that last one will be the last timestamp that this swap is valid.

And this function will return `amounts`. The first element of this array will contain the amount of token that went in. And the last element will contain the amount of token that was sent over to the two addresses.

As an exercise, we want you to write some code that will call `swapTokensForExactTokens`. So here I have the exercise setup.

```javascript
function testSwapTokensForExactTokens() public {
    address[] memory path = new address[](3);
    path[0] = WETH;
    path[1] = DAI;
    path[2] = MKR;
    uint amountOut = 0.1 * 1e18;
    uint amountInMax = 1e18;
    assertEq(mkr.balanceOf(user), amountOut, "MKR balance of user"); 
}
```
Again for this exercise we will swap from WETH to DAI, and then from DAI to MKR. And we'll say that the amount of MKR that we want is 0.1 * 1e18. MKR has 18 decimals. The amount of WETH that we're willing to spend is one WETH.

So here I want you to write a code that will simulate the user calling `swapTokensForExactTokens`. 
