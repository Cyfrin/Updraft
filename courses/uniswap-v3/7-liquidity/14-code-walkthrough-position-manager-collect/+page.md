## Code Walkthrough: Collect Function

To collect fees or to remove tokens after decreasing liquidity, we'll need to call the function `collect`. This function takes a single input, a struct called `CollectParams`. This struct is defined inside the interface `INonfungiblePositionManager`. The inputs are as follows:

*   `tokenID` - The ID of the NFT.
*   `recipient` - The address that will be receiving the tokens.
*   `amount0Max` and `amount1Max` - The maximum amount of tokens to transfer.

The function first checks that the input `amount0Max` is greater than 0 or that `amount1Max` is greater than 0.

```javascript
require(params.amount0Max > 0 || params.amount1Max > 0);
```

Then, it sets the address for the recipient. If the recipient is not set, then the recipient will be set to this contract.

```javascript
address recipient = params.recipient == address(0) ? address(this) : params.recipient;
```

Otherwise, it will use the recipient specified by the input. Next, we'll get the position that is stored inside of the contract.

```javascript
Position storage position = _positions[params.tokenId];
```

Then the `poolKey` is retrieved and finally, the `uniswapV3Pool` contract.

```javascript
PoolAddress.PoolKey memory poolKey = _poolIdToPoolKey[position.poolId];
IUniswapV3Pool pool = IUniswapV3Pool(PoolAddress.computeAddress(factory, poolKey));
```

The variables `tokensOwed0` and `tokensOwed1` are cached.

```javascript
uint128 tokensOwed0;
uint128 tokensOwed1;
```

These values are stored in `position.tokensOwed0` and `position.tokensOwed1`. If this position has any liquidity, then it calls the function `burn` on the `uniswapV3Pool` contract. This is done to update the `feeGrowthInside0LastX128` and `feeGrowthInside1LastX128` that is stored inside the pool contract.

```javascript
if (position.liquidity > 0) {
            pool.burn(position.tickLower, position.tickUpper, 0);
            (, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128, ) =
                pool.positions(PositionKey.compute(address(this), position.tickLower, position.tickUpper));
        }
```

Then, it calculates the amount of the fees that were collected for this position, and adds them to the variables `tokensOwed0` and `tokensOwed1`.

```javascript
tokensOwed0 += uint128(
                FullMath.mulDiv(
                    feeGrowthInside0LastX128 - position.feeGrowthInside0LastX128,
                    position.liquidity,
                    FixedPoint128.Q128
                )
            );
        tokensOwed1 += uint128(
                FullMath.mulDiv(
                    feeGrowthInside1LastX128 - position.feeGrowthInside1LastX128,
                    position.liquidity,
                    FixedPoint128.Q128
                )
            );

        position.feeGrowthInside0LastX128 = feeGrowthInside0LastX128;
        position.feeGrowthInside1LastX128 = feeGrowthInside1LastX128;
```

Since the fees that can be claimed are now up to date, the code will update `feeGrowthInside0LastX128` and `feeGrowthInside1LastX128` to their latest values. Next it will calculate the amount of tokens that can be transferred out.

If the amount that was specified by the input is greater than the actual amount of tokens that are owed, then the amount of tokens to transfer is the amount of tokens that is owed. Otherwise, the amount that was specified by the input will be transferred over.

In other words, the amount to be transferred is the minimum of the input `amount0Max` and the amount of tokens that are owed. This is done for both `token0` and `token1`.

To actually transfer the tokens, it will call the function `collect` on the contract `uniswapV3Pool`.

```javascript
 (amount0, amount1) = pool.collect(
            recipient,
            position.tickLower,
            position.tickUpper,
            amount0Collect,
            amount1Collect
        );
```

After the tokens are transferred, we update the position that is stored in the contract. The tokens that are owed are stored in the variables `tokensOwed0` and `tokensOwed1`. When the function collect was called, `amount0Collect` and `amount1Collect` was transferred out. The current amount of tokens that are owed are the difference between `tokensOwed0` - `amount0Collect` and `tokensOwed1` - `amount1Collect`.

```javascript
 position.tokensOwed0 = (tokensOwed0 - amount0Collect);
 position.tokensOwed1 = (tokensOwed1 - amount1Collect);
```

The new values are stored inside `position.tokensOwed0` and `position.tokensOwed1`. And that ends the code walkthrough for the function `collect`.
