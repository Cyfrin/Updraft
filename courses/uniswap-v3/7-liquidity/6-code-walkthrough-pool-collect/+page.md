### The Collect Function

In this lesson, we'll be going over the `collect` function, and we'll be covering how the collect function works in the Uniswap V3 contracts.

The `collect` function is used to collect fees on swaps and to transfer tokens out when removing liquidity. To remove liquidity, we'll first need to call the `burn` function to decrease the liquidity for a position, and to transfer the tokens out, we'll need to call the function `collect`. The inputs are going to be:
- The recipient, which is the address the tokens will be sent to.
- The tick lower and tick upper, which define a position.
- The amount of tokens to transfer out.
If these amounts are greater than the amount owed to a position, the maximum amount that will be transferred out will be the amount owed to the position. 

Inside the function, we'll first get the position that's defined by `msg.sender`, and the two ticks, tick lower and tick upper. 
```javascript
position = positions.get(msg.sender, tickLower, tickUpper);
```
Then, it calculates the actual amount of tokens that can be transferred out. If the amount requested is less than the amount of tokens that are owed, then the amount that will be transferred is the amount requested. In other words, the amount of tokens that will go out is the minimum between the tokens that are owed and the amount requested.

If there's any amount of tokens that can be transferred out, then the position will be updated. `tokensOwed` will be decreased, and the amount of tokens will be transferred out. We can see this for token 0:
```javascript
if (amount0 > 0) {
  position.tokensOwed0 -= amount0;
  TransferHelper.safeTransfer(token0, recipient, amount0);
}
```
And for token 1:
```javascript
if (amount1 > 0) {
 position.tokensOwed1 -= amount1;
 TransferHelper.safeTransfer(token1, recipient, amount1);
}
```
This ends our code walkthrough for the function `collect`.
