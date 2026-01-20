### Exercise 2 Solution

To execute the function `exactInput` on a swap router V2 contract, we first need to encode the path. For this exercise, we're going to swap from DAI to WETH and then from WETH to WBTC. The path will be equal to:
```javascript
abi.encodePacked(DAI, uint24(3000), WETH, uint24(3000), WBTC)
```
This will be the first swap. The second swap will start from WETH, so WETH will now be the token in.

The pool fee is again `uint24(3000)` and then token out will be WBTC. Next, we call the function `exactInput` on the router contract:
```javascript
router.exactInput()
```
Now looking at the interface, we'll need to prepare this parameter:
```javascript
struct ExactInputParams {
    bytes path;
    address recipient;
    uint256 amountIn;
    uint256 amountOutMinimum;
}
```
The struct `ExactInputParams` is not declared inside of this contract, so it must be imported from `ISwapRouter`:
```javascript
ISwapRouter.ExactInputParams
```
The path will be the path that we prepared above. The recipient will be this contract. The amount in will be 1,000 DAI:
```javascript
1000 * 1e18
```
The amount out minimum, we can set it to one. This completes the code to execute the function `exactInput` on swap router V2.
```javascript
path: path,
recipient: address(this),
amountIn: 1000 * 1e18,
amountOutMinimum: 1
```
Let's try executing the test. Inside my terminal, I'll first set the environment variable for fork URL:
```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v3/exercises/UniswapV3Swap.test.sol -vvv
```
And the test executed successfully. We put in 1000 DAI, WBTC has eight decimals. So we got back around `0.0166` WBTC.
