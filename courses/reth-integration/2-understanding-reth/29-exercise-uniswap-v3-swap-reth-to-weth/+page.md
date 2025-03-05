# `SwapUniswapV3.swapWethToReth` exercise

Write your code inside the [`SwapUniswapV3` contract](../src/exercises/SwapUniswapV3.sol)

This exercise is designed to swap WETH to rETH on Uniswap V3.

```solidity
function swapWethToReth(uint256 wethAmountIn, uint256 rEthAmountOutMin)
    external
{
    // Write your code inside here
}
```

## Instructions

1. **Swap WETH to rETH**

   - Implement logic to swap WETH to rETH on Uniswap V3

   > **Hint:** Call the internal function `swap`

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-swap-uniswap-v3.sol --match-test test_swapWethToReth -vvv
```
