### Collect Function on NonfungiblePositionManager Contract

The `collect` function within the `NonfungiblePositionManager` contract can be invoked in two distinct scenarios.

The first scenario involves collecting swap fees that have been accrued from providing liquidity. The second scenario involves removing liquidity from a pool.

When removing liquidity, the user will first call the `decreaseLiquidity` function on the `NonfungiblePositionManager` contract. Then, to actually transfer the tokens out, the user will next call the `collect` function, again on the `NonfungiblePositionManager` contract.

Whether the user intends to collect fees or remove tokens after decreasing liquidity, they will call the `collect` function on the `NonfungiblePositionManager` contract.

After the `collect` function on the `NonfungiblePositionManager` contract is invoked, the contract then interacts with the `UniswapV3Pool` contract, making two calls.

First, it invokes the `burn` function. This function calculates and updates the amount of collectable fees for the `NonfungiblePositionManager` contract. 

Next, the `collect` function is called on the `UniswapV3Pool` contract. This step transfers the tokens from the `UniswapV3Pool` to the user.
