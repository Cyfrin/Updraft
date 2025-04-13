### Exercise 1 Solution

Let's go over the solution for the first exercise. First, we'll need to call the function `mint` on the contract `nonFungiblePositionManager`. The interface for `nonFungiblePositionManager` contains the `mint` function that we will call.

The struct `MintParams` is what we'll need to pass in to call the function `mint`.
```javascript
struct MintParams {
    address token0;
    address token1;
    uint24 fee;
    int24 tickLower;
    int24 tickUpper;
    uint256 amount0Desired;
    uint256 amount1Desired;
    uint256 amount0Min;
    uint256 amount1Min;
    address recipient;
    uint256 deadline;
}
```
Back inside the exercise, we'll paste this struct into our code:
```javascript
struct MintParams {
    address token0;
    address token1;
    uint24 fee;
    int24 tickLower;
    int24 tickUpper;
    uint256 amount0Desired;
    uint256 amount1Desired;
    uint256 amount0Min;
    uint256 amount1Min;
    address recipient;
    uint256 deadline;
}
```
The contract that we need to call is called `nonFungiblePositionManager`. This contract inside this exercise is initialized as `manager`. We'll call the function `mint`, and then we'll need to pass in the struct. This will be called as:
```javascript
manager.mint
```
We'll need to pass in the struct `nonFungiblePositionManager.MintParams`
```javascript
nonFungiblePositionManager.MintParams
```
Then, we need to pass in the parameters. For token zero, we'll pass in `DAI`, and for token one, we'll pass in `WETH`.

The pool fee for this DAI/WETH pool is 0.3%, so, we'll pass in `3000`.
`tickLower` and `tickUpper` represent the price range that we are going to put liquidity into, and for this exercise it doesn't matter what we put in here as long as the `tickLower` and `tickUpper` are multiples of the tick spacing of the pool.

The `tick_spacing` for this pool is 60. And we will use `max_tick` and `min_tick`, then round it to a multiple of `tick_spacing`.
```javascript
int24 tickLower = MIN_TICK / TICK_SPACING * TICK_SPACING;
int24 tickUpper = MAX_TICK / TICK_SPACING * TICK_SPACING;
```
When we divide `min_tick` by `tick_spacing` solidity division cuts off the remaining decimal parts, so we'll get a number that's a multiple of the `tick_spacing`, and then we'll multiply this number by the `tick_spacing` again.

We'll do the same thing for `tickUpper`:
```javascript
int24 tickUpper = MAX_TICK / TICK_SPACING * TICK_SPACING;
```
Then pass it as a parameter here:
```javascript
tickLower: tickLower,
tickUpper: tickUpper,
```
For amount zero desired, that's `DAI`, and for this exercise we were given `3000 DAI`. For here, I'll put `1000 DAI`, which is:
```javascript
amount0Desired: 1000 * 1e18,
```
And token one will be `WETH`, and we were given `3 WETH`, so I will put `1 WETH` here, which is:
```javascript
amount1Desired: 1e18,
```
Then amount zero min, we will set to zero, for simplicity:
```javascript
amount0Min: 0,
amount1Min: 0,
```
The recipient of this NFT, which represents this position, for this exercise, we will set it to this contract. This is done by:
```javascript
recipient: address(this),
```
The deadline, we will set to the block timestamp:
```javascript
deadline: block.timestamp
```
Now, let's execute exercise one.
Inside the terminal we'll set the fork URL as an environment variable. To execute the test, we'll type:
```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v3/exercises/UniswapV3Liquidity.test.sol
```
Furthermore, inside this contract, we have several exercises, and I only want to execute this test called `test_mint`. So I'll pass in an extra parameter called `--match-test`:
```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v3/exercises/UniswapV3Liquidity.test.sol --match-test test_mint
```
Okay, and our test passed!
