# Exercise 1: Swapping with exactInputSingle

This lesson covers four exercises for swapping using the Uniswap V3 swap router 02 contract. Let's begin by explaining the setup.

The setup includes the following: WETH, DAI, WBTC, and the router contract, which is the swap router 02 contract. The interface can be found in `src > interfaces > uniswap-v3 > SwapRouter.sol`.

This is the interface that you will use to call the functions to swap with Uniswap V3. The four exercises will involve calling the following functions: `exactInputSingle`, `exactInput`, `exactOutputSingle`, and `exactOutput`.

Let's start with the first exercise, which is calling the `exactInputSingle` function.

In the test file, the setup shows that this contract will be allocated 1000 DAI. We will be swapping this DAI for WETH and also for WBTC. The test contract has already approved the router contract to spend DAI that is locked inside this contract.

The first exercise is to swap 1000 DAI, which is locked in this contract, for WETH on the DAI/WETH pool with a 0.3% fee. Feel free to swap DAI for WETH in a pool with a different swap fee. For convenience, we have included a constant called `POOL_FEE` which is set to 3000.

```javascript
uint24 private constant POOL_FEE = 3000;
```

This `POOL_FEE` is the pool fee for a 0.3% fee.

So, the first exercise is to call the `exactInputSingle` function to swap 1000 DAI for WETH.

To call the `exactInputSingle` function, we need to refer to the `ISwapRouter` interface. The function `exactInputSingle` requires a parameter called `ExactInputSingleParams`. The struct is defined as:

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

The `tokenIn`, `tokenOut`, and `fee` parameters will determine the pool to swap on. `tokenIn` will be DAI, and `tokenOut` will be WETH. The recipient should be set to the test contract. The `amountIn` should be 1000 DAI, and the `amountOutMinimum` can be set to zero or one for simplicity. For `sqrtPriceLimitX96`, we'll keep it simple and set it to zero.

That is the first exercise.
