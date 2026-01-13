## Balancer WETH to rETH Swap

Let's swap WETH to rETH using Balancer. The solution will be simple since there is already an internal function that will handle the swap between Balancer. So, all we have to do is make sure that we pass in the correct parameters: token in, token out, amount in, amount out min, and the pool ID that identifies the pool. This pool ID is also imported at the top of the file, and it is called `BALANCER_POOL_ID_RETH_WETH`.

To swap WETH to rETH, we first need to pull in WETH, approve Balancer to spend this WETH, and then we will call the internal function swap.

```solidity
weth.transferFrom(msg.sender, address(this), wethAmountIn);
weth.approve(address(vault), wethAmountIn);
swap(
  WETH,
  RETH,
  wethAmountIn,
  rEthAmountOutMin,
  BALANCER_POOL_ID_RETH_WETH
);
```

Next, we execute the test. Inside the terminal, this is the test command that we will execute. The file is called `exercise-swap-balancer-v2.sol` and the name of the function that we are going to execute is called `test_swapWethToReth`.

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-swap-balancer-v2.sol --match-test test_swapWethToReth -vvvv
```

The test has passed and this is the amount of rETH that you will get for putting in one ETH.
