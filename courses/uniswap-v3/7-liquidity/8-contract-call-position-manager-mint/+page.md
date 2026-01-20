### Managing Liquidity with NonfungiblePositionManager

The most common way to manage liquidity for a Uniswap V3 pool is to interact with a smart contract called `NonfungiblePositionManager`. There are four functions that we can call on this contract: `mint`, `increase liquidity`, `decrease liquidity`, and `collect`. In this lesson, we'll go over an overview of how the `NonfungiblePositionManager` contract and the `Uniswap V3` pool contract interact when a user calls the `mint` function.

Let's say that a user wants to create a new position in a `Uniswap V3` pool. To do this, using the contract `NonfungiblePositionManager`, the user will call the function `mint`, specifying the price range that they want to add liquidity to, and the amount of tokens that they want to add.

Next, the `NonfungiblePositionManager` will call the function `mint` on the `Uniswap V3` Pool. The pool contract will calculate the amount of tokens that the user must send and then call a callback called `uniswapV3MintCallback`.

Inside the callback, tokens `token0` and `token1` are transferred from the user to the contract `UniswapV3Pool`.
