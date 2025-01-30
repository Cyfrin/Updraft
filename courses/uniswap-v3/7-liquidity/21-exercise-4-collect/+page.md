### Exercise 4: Removing Liquidity and Transferring Tokens

In this exercise, we will be covering how to remove all liquidity from a position. To transfer tokens out, we must first call the function `decreaseLiquidity` and then call the function `collect`. Both of these functions are inside of the `INonfungiblePositionManager`. The parameters for the `collect` function are:
```javascript
tokenId
recipient
amount0Max
amount1Max
```

In this exercise, a position is minted and the `tokenId` is assigned to a variable of the same name. The liquidity for this position is stored inside a struct called `position`.

To remove the liquidity and transfer the tokens out, we need to call the function `decreaseLiquidity` on the `INonfungiblePositionManager` and then call the function `collect` on the position manager.
