The code for the Uniswap V2 protocol is split into two repos, V2 core and V2 periphery. V2 periphery contains the router contract, which we'll take a look at later. We'll use the router contract to add and remove liquidity, as well as swap tokens. 

The actual contract that handles liquidity and token swaps is in V2 core. We can open this repo and navigate to contracts, where we'll find the contract `UniswapV2Pair`.

You might be wondering why Uniswap V2 is split into two repos rather than having a single contract for the AMM. 

One reason is that they have different responsibilities. The main purpose of the `UniswapV2Pair` contract is to manage token pairs and swap tokens. 

If we want to perform multiple swaps, we'll need another contract beyond the `UniswapV2Pair` contract, which is where the router contract comes in. It's useful for multi-hop swaps.

Another reason we have a router contract is for utility. We can use the `UniswapV2Pair` contract to add and remove liquidity and swap tokens. However, this contract is not intended for direct user interaction. 

If we directly interacted with the `UniswapV2Pair` contract, we could make mistakes and lose tokens. The router contract automates function calls to the `UniswapV2Pair` contract, helping us swap tokens without making errors.

These are some of the reasons why the Uniswap V2 protocol is split into two repos. 
