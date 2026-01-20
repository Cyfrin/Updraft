### Exercise 3 Solution

Let's go over the solutions for how to call `exactOutputSingle` on the swap router v2 contract. First, we'll type
```javascript
router.exactOutputSingle
```
and then we'll check back in the interface to see what parameter we need to prepare to call the function `exactOutputSingle`. 

Okay, here is the function `exactOutputSingle`, and we need to prepare this parameter. We'll copy and paste that parameter.
```javascript
ISwapRouter.exactOutputSingleParams({
        tokenIn:
        tokenOut:
        fee:
        recipient:
        amountOut:
        amountInMaximum:
        sqrtPriceLimitX96:
    })
```
We'll need to import this struct called `exactOutputSingleParams`. This is from `ISwapRouter.exactOutputSingleParams`.
Token in will be DAI, token out will be WETH, and fee will be 3000. Or we can use the constant that is defined in this contract:
```javascript
POOL_FEE
```
Recipient will be this contract:
```javascript
address(this)
```
Amount out, in this exercise, we want to get out 0.1 WETH. WETH has 18 decimals, so 0.1 WETH will be 0.1 * 1e18.
```javascript
0.1 * 1e18
```
Amount in maximum, we are willing to spend up to 1000 DAI, so that is
```javascript
1000 * 1e18
```
and square root price limit X96 will be set to zero.
Okay, let's try executing the test.
Set the fork URL as an environment variable. Then execute the test:
```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v3/exercises/UniswapV3Swap.test.sol -vvv
```
Okay, and our test passed.
To get 0.1 WETH, we had to spend about 300 DAI.
