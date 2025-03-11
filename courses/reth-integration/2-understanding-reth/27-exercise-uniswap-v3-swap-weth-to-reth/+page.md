# `SwapUniswapV3.swapRethToWeth` exercise

Write your code inside the [`SwapUniswapV3` contract](../src/exercises/SwapUniswapV3.sol)

This exercise is designed to swap rETH to WETH on Uniswap V3.

```solidity
function swapRethToWeth(uint256 wethAmountIn, uint256 rEthAmountOutMin)
    external
{
    // Write your code inside here
}
```

## Instructions

1. **Swap rETH to WETH**

   - Implement logic to swap rETH to WETH on Uniswap V3

   > **Hint:** Call the internal function `swap`

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-swap-uniswap-v3.sol --match-test test_swapRethToWeth -vvv
```
