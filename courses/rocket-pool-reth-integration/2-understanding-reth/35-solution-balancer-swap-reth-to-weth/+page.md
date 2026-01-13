## Solution: Balancer Swap rETH to WETH

The solution for swapping rETH back to WETH using Balancer follows a similar pattern to when we swap from WETH to rETH.

First, copy the code and paste it into the code editor. Then, change WETH to rETH, since we're pulling rETH into this contract from the message sender and then approving the Vault contract to spend it.

```solidity
reth.transferFrom(msg.sender, address(this), wethAmountIn);
reth.approve(address(vault), wethAmountIn);
swap(
    WETH,
    RETH,
    wethAmountIn,
    rEthAmountOutMin,
    BALANCER_POOL_ID_RETH_WETH
);
```

Next, we're going to change the wethAmountIn to rEthAmountIn.

```solidity
reth.transferFrom(msg.sender, address(this), rEthAmountIn);
reth.approve(address(vault), rEthAmountIn);
swap(
    WETH,
    RETH,
    wethAmountIn,
    rEthAmountOutMin,
    BALANCER_POOL_ID_RETH_WETH
);
```

That's it, we'll change the parameters around when we're calling the internal function swap.

The token in will be rETH and token out will be WETH. The amount in will be rEthAmountIn and the minimum amount out will be wethAmountOutMin. The pool ID will be the same.

```solidity
reth.transferFrom(msg.sender, address(this), rEthAmountIn);
reth.approve(address(vault), rEthAmountIn);
swap(
    RETH,
    WETH,
    rEthAmountIn,
    wethAmountOutMin,
    BALANCER_POOL_ID_RETH_WETH
);
```

Now let's run the test:

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-swap-balancer-v2.sol --match-test test_swapRethToWeth -vvv
```

The test passed, so let's take a look at the logs. For swapping one rETH to WETH, we get approximately 1.12 WETH.
