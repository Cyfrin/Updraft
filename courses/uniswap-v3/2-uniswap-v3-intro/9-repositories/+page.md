### Uniswap V3 Contracts

There are a few important contracts that we need to know to interact with Uniswap V3. These contracts are split into several repositories, specifically:
* v3-periphery
* v3-core
* swap-router-contracts
* universal-router

Within the v3-periphery repository, the most important contract to remember is called the NonfungiblePositionManager. This contract will manage our position when we add and remove liquidity and to collect fees.

Two important contracts inside the v3-core repository are:
* UniswapV3Factory contract
* UniswapV3Pool contract

The UniswapV3Factory will deploy the UniswapV3Pool contract, which will hold two tokens, add and remove liquidity, and where we will be able to call swaps on. Similar to Uniswap V2, the pool contract is a low-level contract. To interact with it we will need another contract. Similar to Uniswap V2, we had the Uniswap V2 Pair and Router contracts; in Uniswap V3 we also have a pool and router contract.

The main router contract that we will be using is called SwapRouter02. This contract is inside the swap-router-contracts repository. This contract has been upgraded to another contract inside the universal-router repository: the universal-router contract. The universal-router contract is a more comprehensive contract that will allow us to swap between Uniswap V2, V3 and some NFTs. However, for this course we won't touch on this universal-router contract and will instead look at the SwapRouter02 contract.
