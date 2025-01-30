### Exercise Solution

Let's go over the solution for the first exercise.

The first exercise is to call `exactInputSingle` on the `swapRouter02` contract. Here is the initial code:
```javascript
router.exactInputSingle
```
We need to pass in a parameter. Navigating to the `ISwapRouter` interface, we see this is the struct parameter that we need to prepare:
```javascript
struct ExactInputSingleParams {
    address tokenIn;
    address tokenOut;
    uint24 fee;
    address recipient;
    uint256 amountIn;
    uint256 amountOutMinimum;
    uint160 sqrtPriceLimitX96;
}
```
We'll copy this and paste it in. Inside this test file, the struct `ExactInputSingleParams` is not defined. It is imported as `ISwapRouter`, so we need to correct this:
```javascript
ISwapRouter.ExactInputSingleParams
```
`tokenIn` will be `DAI`, and `tokenOut` will be `WETH`.
```javascript
tokenIn: DAI,
tokenOut: WETH,
```
The `fee` is the pool fee that determines the pool. We are swapping on the `DAI/WETH` pool with a 0.3% fee. The fee is defined as `POOL_FEE`.
```javascript
fee: POOL_FEE,
```
`recipient` will be the address that will receive the token out. In this case, it will be this contract.
```javascript
recipient: address(this),
```
For `amountIn` we will send 1000 `DAI`.
```javascript
amountIn: 1000 * 1e18,
```
`amountOutMinimum` we will set to 1, and `sqrtPriceLimitX96` we will set to 0.
```javascript
amountOutMinimum: 1,
sqrtPriceLimitX96: 0,
```
That completes exercise 1. Let's try executing this test. We will execute this test against the main network, so first we'll set up the fork URL.
```bash
forge test --fork-url https://eth-mainnet.g.alchemy.com/v2/...
```
Then we will execute the test by typing:
```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v3/exercises/UniswapV3Swap.test.sol -vvv
```
Our test passed. For putting in 1000 `DAI`, we get about 0.332 `WETH`.
