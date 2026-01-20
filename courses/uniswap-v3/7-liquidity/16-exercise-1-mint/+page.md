### Exercise 1: Managing Liquidity with Uniswap V3

In this lesson, we will be learning how to manage liquidity using Uniswap V3. The contract for the exercises is located in the following directory:
```
foundry/test/uniswap-v3/exercises
```
The contract is named, "UniswapV3Liquidity.test.sol". Let's examine the setup of the contract. In these exercises, you'll be managing liquidity with the WETH-DAI pool, with a 0.3% swap fee. The WETH, DAI, and Non-Fungible position manager are all initialized in the setup section of the contract.

The following constants may be helpful to complete these exercises:
- MIN_TICK
- MAX_TICK
- DAI/WETH 3000
- POOL_FEE = 3000
- TICK_SPACING = 60

The contract is provided with 3000 DAI and 3 WETH. The contract approves the Non-Fungible Position Manager to spend all of the WETH and DAI.

The contract also has the following helper functions:
- mint: used to mint liquidity
```javascript
function mint( ) private returns (uint256 tokenId) {
}
```
- getPosition: used to retrieve the position based on the token ID
```javascript
function getPosition(uint256 tokenId) public {
}
```

The first exercise is to mint a new position by adding liquidity to the DAI-WETH pool with a 0.3% fee. You can choose the price range and the lower and upper ticks must be divisible by the tick spacing of the pool. Again, the contract is given 3000 DAI and 3 WETH, and you can put any amount of tokens to create a new position. The Non-Fungible Position Manager will mint an NFT. This NFT will represent ownership of the position. We can write our code to perform this mint in the function "test_mint" below the comment:
```
// Write your code here
```
That concludes our introduction to the first exercise.
