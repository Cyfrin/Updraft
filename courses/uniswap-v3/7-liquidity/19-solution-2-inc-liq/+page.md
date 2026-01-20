### Exercise 2 Solution

To increase liquidity, we will call the function `increaseLiquidity` on the `Nonfungible Position Manager`. So in our code we will start with:
```javascript
manager.increaseLiquidity
```
We need to pass in a struct, which is defined inside the interface `INonfungiblePositionManager` as `IncreaseLiquidityParams`. We will copy the struct and include it in our code as:
```javascript
INonfungiblePositionManager.increaseLiquidityParams {
  tokenId,
  amount0Desired,
  amount1Desired,
  amount0Min,
  amount1Min,
  deadline
}
```
For the `tokenId`, we'll pass in the token id that is provided. For the `amount0Desired`, we'll pass in the DAI balance from the contract, but for simplicity, we will use a number:
```javascript
amount0Desired: 500 * 1e18,
```
For `amount1Desired` we can pass in:
```javascript
amount1Desired: 1e18,
```
For both `amount0Min` and `amount1Min` we will put 0, and for the `deadline` we will put:
```javascript
deadline: block.timestamp
```
This completes Exercise 2. We can execute this test with the command:
```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v3/exercises/UniswapV3Liquidity.test.sol --match-test test_increaseLiquidity -vvv
```
This runs our test and shows the console log. The test passes, and we added approximately 499 DAI, and 0.12 ETH.
