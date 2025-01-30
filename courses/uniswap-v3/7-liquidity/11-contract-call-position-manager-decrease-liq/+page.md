### Decrease Liquidity

Once a user has a position created by the NonfungiblePositionManager, if they decide to decrease liquidity, they will call the function `decreaseLiquidity`.
```javascript
decreaseLiquidity
```
This function will be called on the NonfungiblePositionManager. Next, the NonfungiblePositionManager will call the function `burn` on the UniswapV3Pool contract.
```javascript
burn
```
When the function `burn` is called on UniswapV3Pool, it decreases liquidity, but doesn't transfer the tokens.  When the user calls the `decreaseLiquidity` function, which calls the `burn` function, no token is transferred over to the user. To actually transfer the tokens, the user will call another function called `collect`.
```javascript
collect
```
