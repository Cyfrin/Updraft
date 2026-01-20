## Uniswap V2 Contracts

We're going to look at the Uniswap V2 contracts that work behind the scenes to make the AMM function. We have three main contracts to understand. The first is the factory contract.

The factory contract is a simple contract that's used to deploy the pair contracts. Pair contracts are used to lock up the tokens we want to trade.  For example, we can have a pair contract of ETH/USDT, or DAI/ETH, or DAI/MKR. The factory contract allows us to create these pairs. 

We can also interact with the pair contracts directly, to add or remove liquidity or to swap tokens.  This is a bit error-prone so we also have the router contract.

The router contract is used as an intermediary to add or remove liquidity from the pairs and also to swap tokens. If we swap DAI to ETH the router will interact with the DAI/ETH pair contract. If we want to swap ETH for MKR the router will swap ETH to DAI, then DAI to MKR, then send the MKR over to us. 

The user can interact with the factory contract directly to deploy a pair contract, but the user can also interact with the router, which will then call the factory to deploy the pair contract. 

This completes our overview of the Uniswap V2 contracts.  We will use these contracts to create, add and remove liquidity to the pairs, and to swap tokens. 
