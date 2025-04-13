# Uniswap V3 Contract Interactions

Okay, let's take a look at how the different contracts interact with each other, and what the important functions that we need to remember are.

We'll start from the `UniswapV3Factory` contract. This contract is used to deploy the `UniswapV3Pool` contract. To deploy a contract, the user will call a function called `createPool`. And inside the `UniswapV3Factory` contract, it will deploy the `UniswapV3Pool` contract.

Inside the `UniswapV3Pool` contract, the important functions that we need to remember are `mint`, `burn`, `collect`, `swap`, and `flash`.

`mint` and `burn` are used to add and remove liquidity. When the function `burn` is called inside the `UniswapV3Pool` contract, it doesn't actually send the tokens back. What it does is remove a position. To collect swap fees, and to actually remove the tokens, we need to call the function called `collect`.

There is also a low-level function called `swap`. If you want to get a flash loan, you can also call the function `flash`. Most of these functions are low level and when these functions are called, they will call back into the message sender. This usually means that to call these functions the caller must also be a smart contract.

For example, the function `mint` to add liquidity to the `UniswapV3Pool` contract will have a callback function that will call back into the message sender. Again, this means that the caller of the function `mint` must be a smart contract.

The easiest way to add liquidity to the `UniswapV3Pool` contract is to use the contract called `NonfungiblePositionManager`. This contract will call the function `mint` on the `UniswapV3Pool` contract, and the `UniswapV3Pool` contract will call back into this `NonfungiblePositionManager`. By using this contract, the liquidity that we add to the `UniswapV3Pool` contract will be represented as an ERC721.

To remove a position from a `UniswapV3Pool` contract, the `NonfungiblePositionManager` will also call the function `burn`. And to collect fees, the `NonfungiblePositionManager` will also call the function `collect` on the `UniswapV3Pool` contract.

The liquidity provider can call the functions `mint`, `increaseLiquidity`, `decreaseLiquidity`, `collect`, and `burn` on the contract `NonfungiblePositionManager`.

`mint` is called when a user wants to add liquidity to a position for the first time. If this user wanted to increase liquidity to the same position, then they would call the function `increaseLiquidity`. If they wanted to decrease the liquidity to the same position, they would call the function `decreaseLiquidity`.

Now, similar to the function `burn` inside the `UniswapV3Pool` contract that doesn't actually send the tokens back, it just removes the position, the function `decreaseLiquidity` behaves in a similar manner. When this function is called, it doesn't actually send the tokens back, what it does is decreases the liquidity from the position. To actually remove the tokens, and to also collect swap fees, we must call the function `collect`. And lastly, to burn this NFT, the user will call the function `burn`.

Okay, so there are two other low-level important functions inside the `UniswapV3Pool` contract. Let's start with `flash`. `flash` is used to get a flash loan from the `UniswapV3Pool` contract. Since the amount that is borrowed must be paid in the same transaction, this flash must also be a smart contract. This contract is not part of the UniswapV3 protocol. This is a contract that the developer writes and then deploys. To get a flash loan this smart contract will have to call the function `flash` on the `UniswapV3Pool` contract.

Okay, the last low-level function is `swap`. This is used to swap tokens. Remember that in Uniswap V2, when the low-level function `swap` is called on the Uniswap V2 pair contract, before the swap is done executing you have to manually send the tokens into the pair contract.

The function `swap` inside the `UniswapV3Pool` contract executes in a similar way. When this low-level function `swap` is called, it will call back into the message sender. And inside the call back, we’ll have to send the tokens to the `UniswapV3Pool` contract. So the only way that this low-level function `swap` can be called on the `UniswapV3Pool` contract is by another smart contract. There are several router contracts that can call into the `UniswapV3Pool` contract. The router contract we'll take a look at is called `SwapRouter02`. This router contract will call the low-level function `swap` on the `UniswapV3Pool` contract.

For a user to execute a swap on the `SwapRouter02` contract, they can call the functions `exactInputSingle`, `exactOutputSingle`, `exactInput`, and `exactOutput`.

`exactInputSingle` will swap with a single pool and it will try to swap all the tokens that the user sent. `exactOutputSingle` will also swap with a single pool contract. This function is called by the user when the user wants some exact amount of token out.

For example, let's say we have a DAI/WETH pool and the user wants exactly one WETH, and the maximum amount of DAI that they are willing to spend is 3,000 DAI, then they would call the function `exactOutputSingle` and tell the `SwapRouter02` contract that they want exactly one WETH, and they are willing to spend 3,000 DAI.

The functions `exactInput` and `exactOutput` work in a similar manner to the functions `exactInputSingle` and `exactOutputSingle`. The difference is that they swap between multiple pools. For example, if you wanted to trade from WETH to DAI, and then from DAI to MKR. That's a multi-hop swap so it would involve multiple UniswapV3 pool contracts. In this case, the user will call either `exactInput`, or `exactOutput`.
