# `SwapBalancerV2.swapWethToReth` exercise

Write your code inside the [`SwapBalancerV2` contract](../src/exercises/SwapBalancerV2.sol)

This exercise is designed to swap WETH to rETH on Balancer V2.

```solidity
function swapWethToReth(uint256 wethAmountIn, uint256 rEthAmountOutMin)
    external
{
    // Write your code inside here
}
```

## Instructions

1. **Swap WETH to rETH**

   - Implement logic to swap WETH to rETH on Balancer V2.

   > **Hint:** Call the internal function `swap`

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-swap-balancer-v2.sol --match-test test_swapWethToReth -vvv
```
