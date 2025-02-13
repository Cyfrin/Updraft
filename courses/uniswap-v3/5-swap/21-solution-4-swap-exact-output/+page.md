### Solution for Exercise 4 - Swap Exact Output

Let's go over the solution for the last exercise, to swap with Uniswap V3. In this exercise we need to swap from DAI to WETH, and then from WETH to WBTC. We want exactly 0.01 WBTC and we're willing to spend a maximum of 1000 DAI.

First, we need to prepare the parameters, which will be done using `abi.encodePacked()`. Remember that for `exactOutput` we need to list out the tokens, and the fees, in reverse order. Here we're swapping from DAI to WETH, and then from WETH to WBTC, so this order needs to be in reverse. So we'll start out with WBTC. The fee for WBTC and WETH will be 3000, so we'll add `uint24(3000)` followed by WETH. Next we encode the pool from DAI to WETH, with pool fee 3000, which is done with `uint24(3000)`, then DAI.

```javascript
bytes memory path = abi.encodePacked(WBTC, uint24(3000), WETH, uint24(3000), DAI);
```

Next we'll call the function `exactOutput` on the swap router V2 contract:

```javascript
router.exactOutput
```

Let's check the interface, and see what parameters we need to prepare. This is a struct that we need to prepare.

```javascript
struct ExactOutputParams{
    bytes path;
    address recipient;
    uint256 amountOut;
    uint256 amountInMaximum;
}
```

We need to prefix this with `ISwapRouter.ExactOutputParams`. The path is the parameter that we prepared above. Recipient will be this contract, `address(this)`. Amount out, for this exercise, we want exactly 0.01 WBTC, and WBTC has 8 decimals, so this will be 0.01 * 1e8. Amount in maximum is the maximum amount of DAI we are willing to spend, which is 1000 DAI, so 1000 * 1e18.

```javascript
ISwapRouter.ExactOutputParams({
    path: path,
    recipient: address(this),
    amountOut: 0.01 * 1e8,
    amountInMaximum: 1000 * 1e18
});
```

This completes the code for calling the function `exactOutput` on swap router V2. Let's try executing this test. We'll set the fork URL environment variable, and then execute the test:

```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v3/exercises/UniswapV3Swap.test.sol -vvv
```

Our test passed. To receive 0.01 WBTC, we had to spend roughly 605 DAI.
