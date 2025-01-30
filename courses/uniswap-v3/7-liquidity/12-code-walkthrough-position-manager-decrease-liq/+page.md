### Code Walkthrough - Position Manager Decrease Liquidity

The function `decreaseLiquidity` will decrease the liquidity for a position. The function doesn’t actually transfer any tokens, it will take in a struct called `DecreaseLiquidityParams` which is defined inside the interface `INonfungiblePositionManager`. Inside the struct are parameters that need to be passed. 

```javascript
    struct DecreaseLiquidityParams {
        uint256 tokenId;
        uint128 liquidity;
        uint256 amount0Min;
        uint256 amount1Min;
        uint256 deadline;
    }
```

`tokenId` will be the ID of the NFT that was minted, which represents a position. The `liquidity` will be the amount of liquidity to decrease by. `amount0Min` and `amount1Min` are minimum amount of tokens that will be deducted when we decrease liquidity. `deadline` is the last timestamp that the call to the function is valid.

Lets go back to the function `decreaseLiquidity` inside the contract `NonfungiblePositionManager`. There are two modifiers for this function.  The first modifier is `checkDeadline` which ensures that the `deadline` is not expired, and the second modifier is `isAuthorizedForToken` which checks the authorization of `msg.sender` for the `tokenId`. Then the function will return two outputs `amount0` and `amount1` which is the amount of tokens that were deducted for decreasing liquidity. 

First, it checks that the liquidity from the input is greater than zero, and gets the position identified by the `tokenId`. Next it checks that the liquidity of this position is greater than or equal to the liquidity that was passed from the input. Then it gets the pool key, gets the Uniswap v3 pool contract from the pool key, and calls the function `burn` on the Uniswap v3 pool. Calling the function `burn` on the Uniswap v3 pool does not transfer tokens, it only decreases the liquidity, and tells us how much tokens we can deduct. 

Next we get the latest `feeGrowthInside0LastX128` and `feeGrowthInside1LastX128` which is stored in `pool.positions` for the position key. The position key is computed by the address of this contract and two ticks `tickLower` and `tickUpper`. Next it updates the position that is stored in the contract by adding the amount of tokens that were deducted for decreasing liquidity. Then it adds the amount of fees that was collected for this position. It then does the same for token 1.  The fees for the position is calculated by taking the difference of the latest fee growth inside and the fee growth inside that was stored in the position.  After calculating the amount of fee that can be claimed, it updates the `feeGrowthInside0LastX128`, and `feeGrowthInside1LastX128`, to the latest fee growth inside, which was fetched over here:
```javascript
    pool.positions(positionKey)
```

Finally, it updates the liquidity for this position by decreasing this liquidity by the amount that was specified by the input. That completes the code walk through for the function `decreaseLiquidity`.
