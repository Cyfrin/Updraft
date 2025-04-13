# How the `burn` Function Works in Uniswap V3

To add liquidity, the function `mint` is called inside the contract `Uniswapv3Pool`. To remove liquidity, we’ll need to call the function `burn`. This function is a low-level function, and a regular user will not be calling this function directly. Instead, you will call the contract `NonfungiblePositionManager`, which will call into the function `burn`. The function `burn` takes in three inputs:

- the two ticks, `tickLower` and `tickUpper`, to define the position
- the amount of liquidity to remove

The output of the `burn` function will return:

- the amount of liquidity that was removed
- `amount0`
- `amount1`

The `burn` function removes liquidity, but it does not transfer the tokens `amount0` and `amount1`. To actually transfer tokens, we will need to call another function called `collect`, which we will cover later. The `burn` function is used to remove liquidity.

Inside the function `burn` it first calls a function called `modifyPosition`. For the parameters of the `modifyPosition` function, it passes in:

- `msg.sender` for the owner
- `tickLower` and `tickUpper` for the ticks
- a negative amount for `liquidityDelta`
```javascript
- int256(amount)
```
Since we are removing liquidity, the `liquidityDelta` will be negative. We have already discussed how the `modifyPosition` function works when we covered the `mint` function. Therefore, we will omit the explanation here.

It is important to note that the position here is defined by the `msg.sender` and the two ticks. This means that only the owner will be able to remove liquidity from their position. Since the only position that they can remove liquidity from is the position that they own.

The function `modifyPosition` returns three outputs:

- the position
- the amount of token0
- the amount of token1

That must exit this pool when the liquidity in this position is updated by the `liquidityDelta`. These `amount0` and `amount1` will be negative.
```javascript
amount0 = uint256(-amount0Int)
amount1 = uint256(-amount1Int)
```
Here we cast the negative numbers into positive numbers. If either of these numbers are positive, then we update the position by incrementing `tokensOwed0` and `tokensOwed1`. Just by calling the function `burn`, no tokens are transferred out. To transfer tokens, we will need to call a function called `collect`.
