### Increasing Liquidity

Once a position is created by calling the `mint` function on the `NonfungiblePositionManager`, and a user decides to increase liquidity to that position, the user will need to call the `increaseLiquidity` function on the `NonfungiblePositionManager` contract.

To increase liquidity to an existing position which is managed by the `NonfungiblePositionManager` contract, the user will first call the function `increaseLiquidity`.
```javascript
1. increaseLiquidity
```
The `NonfungiblePositionManager` will then call the function `mint` on the `UniswapV3Pool`.
```javascript
2. mint
```
`UniswapV3Pool` will calculate the amount of tokens that are needed, and then call a callback called `uniswapV3MintCallback`.
```javascript
3. uniswapV3MintCallback
```
Inside this callback, token zero and token one that are needed to increase liquidity, are transferred over from the user to the `UniswapV3Pool` contract.
```javascript
4. transfer token0 and token1
```
