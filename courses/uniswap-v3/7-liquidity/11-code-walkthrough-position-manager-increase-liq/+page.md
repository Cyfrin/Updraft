# Code Walkthrough: Nonfungible Position Manager Increase Liquidity

The `increaseLiquidity` function inside the `NonfungiblePositionManager` contract is used to increase the liquidity for a position. The position must have been created by calling the `mint` function on the `NonfungiblePositionManager`. 

The input is defined in the `INonfungiblePositionManager` interface. Here are the inputs that must be passed to the `increaseLiquidity` function:
```javascript
struct IncreaseLiquidityParams {
    uint256 tokenId;
    uint256 amount0Desired;
    uint256 amount1Desired;
    uint256 amount0Min;
    uint256 amount1Min;
    uint256 deadline;
}
```
`tokenId` will be the ID of the NFT that was minted. The next two inputs, `amount0Desired` and `amount1Desired`, are the amount of tokens that the user wishes to add. The two inputs after those, `amount0Min` and `amount1Min`, are the minimum amounts of tokens that must be added. And lastly, `deadline` is the timestamp of when the `increaseLiquidity` function must be executed, or else it will revert.

Let's go back to the `increaseLiquidity` function inside the `NonfungiblePositionManager` contract. When the `increaseLiquidity` function is executed, it will first check if the `deadline` has not expired. For the outputs, it's going to return the amount of liquidity that was added and the amount of tokens that were transferred into the pool contract.

Inside the function, it first gets the position, which is identified by the `tokenId`. This is the NFT token ID. Next, it gets the `poolKey`. The `poolKey` stores 3 pieces of data: the address of token 0, token 1, and the fee. It then calls the function `addLiquidity`. `addLiquidity` will call the function mint on the Uniswap V3 pool contract. It then transfers the tokens from the message sender over to the pool contract. The function returns the amount of liquidity that was added, and the amount of token 0, and token 1, that was transferred from the caller to the pool contract.

Next, it calculates the `positionKey`, which is computed by taking the address of this contract and the two ticks. And then it gets the position that is managed by this `NonfungiblePositionManager` by calling the function `pool.positions`. This is done to fetch the latest `feeGrowthInside0LastX128` and `feeGrowthInside1LastX128`. These two variables are used to calculate the amount of fees that were collected by this position.

To calculate the fees, we take the latest `feeGrowthInside0LastX128` and then minus it from the previous one, which is stored inside `position.feeGrowthInside0LastX128`. We take this difference, multiply it by the previous liquidity, and then divide by 2^128. This will calculate the amount of fee that was collected by this position.
```javascript
FixedPoint128.Q128
```
We will discuss how this math works in a later video. Moving on, it does the same for token 1, calculating the amount of fees that were collected by this position. Next, it updates the `feeGrowthInside0LastX128` and `feeGrowthInside1LastX128` to the latest values, and then increments the liquidity.

That completes the walkthrough of the `increaseLiquidity` function.
