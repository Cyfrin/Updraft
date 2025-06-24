## Uniswap V2: Swap Exact Tokens For Tokens

In this lesson, we'll explore the `swapExactTokensForTokens` function, which allows us to swap a specific amount of tokens for another token.

We'll start by simulating a transaction from a user. In our test, we'll use the `vm.prank` function to impersonate the user.

```javascript
vm.prank(user);
```

The user will call the `UniswapV2Router02` contract, which contains the `swapExactTokensForTokens` function.

We'll then specify the function to be called and assign the returned array of `uint` values to a variable.

```javascript
uint256[] memory amounts = router.swapExactTokensForTokens({
    amountIn: amountIn,
    amountOutMin: amountOutMin,
    path: path,
    to: user,
    deadline: block.timestamp
});
```

These `uint` values represent the amount of each token exchanged during the swap. We can console.log these values to visualize the intermediate steps of the swap:

```javascript
console2.log("WETH: %18e", amounts[0]);
console2.log("DAI: %18e", amounts[1]);
console2.log("MKR: %18e", amounts[2]);
```

Lastly, we'll assert that the user's balance of MKR is greater than or equal to the minimum output amount.

```javascript
assertGe(mkr.balanceOf(user), amountOutMin, "MKR balance of user");
```

In this test, we're simulating a swap of WETH to DAI and then from DAI to MKR. This test also demonstrates how to use the `swapExactTokensForTokens` function in a practical scenario.

To execute this test, we need to run `forge` with the correct fork URL and path.

```bash
forge test --fork-url $FORK_URL --mp test/uniswap-v2/exercises/UniswapV2Swap.test.sol -vvv
```

This will run the test on a mainnet fork and provide verbose logging.

This concludes our introduction to the `swapExactTokensForTokens` function. In future lessons, we'll delve deeper into the function's workings and explore additional use cases. 
