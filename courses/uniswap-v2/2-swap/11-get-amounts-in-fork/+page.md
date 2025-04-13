## Using `getAmountIn` with Foundry Tests

In this lesson, we'll run a test using the `getAmountIn` function from the Uniswap v2 library. We'll use Foundry to execute the test, which allows us to call smart contract functions and check the output.

First, we'll write a Foundry test that calls the `getAmountIn` function. We'll use the same path as our previous example: WETH, DAI, and MKR. 

```javascript
function test_getAmountIn() public {
    address[] memory path = new address[](3);
    path[0] = WETH;
    path[1] = DAI;
    path[2] = MKR;
    uint256 amountOut = 1e18;
    uint256[] memory amounts = router.getAmountIn(amountOut, path);
    console2.log("WETH", amounts[0]);
    console2.log("DAI", amounts[1]);
    console2.log("MKR", amounts[2]);
}
```

We need to set the `amountOut` and the `path` parameters for this function. Our `amountOut` will be 1 MKR, or 1e18. This function will return an array of `uint` values representing the amount of each token we'll need to get 1 MKR.

Next, we'll set up our environment by creating a `.env` file. 

```bash
FORK_URL=https://eth-mainnet.g.alchemy.com/v2/Kz7pzZcHojHs4Jn_0SgMzM4AJsJQ5Ok4
```

The `FORK_URL` variable is our connection to the Ethereum mainnet via Alchemy.  

Now we can run the test using the following command:

```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v2/UniswapV2SwapAmountsTest.sol --vvv
```

The output of the test will show us the amounts of WETH and DAI we'll need to swap to get 1 MKR. We'll be able to use these values to run an example in our UniswapV2 library. 
