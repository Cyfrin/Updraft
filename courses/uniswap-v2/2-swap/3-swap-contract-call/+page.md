We're going to cover how swaps work in Uniswap V2, specifically the contracts and functions involved.  

We'll look at both single-hop and multi-hop swaps.  A single-hop swap uses just one pair contract to swap between two tokens.  A multi-hop swap requires two or more pair contracts, in a series, to swap two tokens.

Let's start with a single-hop swap.  In this example, we'll swap WETH for DAI.

The user first calls the `swapExactTokensForTokens` function on the Router contract.  This function takes the amount of WETH the user wants to swap and the address of the DAI token.  

The Router then transfers the WETH to the DAI/WETH pair contract.  

Once the WETH is transferred to the pair contract, the Router calls the `swap` function on the pair contract.  This function swaps the WETH for DAI, and the Router then transfers the DAI back to the user. 

We can use the Router to swap other tokens, too.  For instance, if the user wanted to swap ETH for DAI, they would call the `swapExactETHForTokens` function instead.  

Next, let's look at a multi-hop swap.  

We'll swap WETH for MKR.  

Here, we see that there is no direct WETH/MKR pair contract.  Instead, we have a DAI/WETH pair and a DAI/MKR pair.

In this case, the user calls the `swapExactTokensForTokens` function on the Router to swap WETH for MKR.  

The Router transfers the WETH to the DAI/WETH pair and calls the `swap` function.  The WETH is swapped for DAI.

The Router then transfers the DAI to the DAI/MKR pair contract and calls the `swap` function.  The DAI is swapped for MKR.  

Finally, the Router transfers the MKR back to the user.

This example is of a multi-hop swap: the Router swaps WETH to DAI, and then DAI to MKR. 
