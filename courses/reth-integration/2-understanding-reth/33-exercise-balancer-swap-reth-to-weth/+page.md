# `SwapBalancerV2.swapRethToWeth` exercise

Write your code inside the [`SwapBalancerV2` contract](../src/exercises/SwapBalancerV2.sol)

This exercise is designed to swap rETH to WETH on Balancer V2.

```solidity
function swapRethToWeth(uint256 wethAmountIn, uint256 rEthAmountOutMin)
    external
{
    // Write your code inside here
}
```

## Instructions

1. **Swap rETH to WETH**

   - Implement logic to swap rETH to WETH on Balancer V2

   > **Hint:** Call the internal function `swap`

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-swap-balancer-v2.sol --match-test test_swapRethToWeth -vvv
```
