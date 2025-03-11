# `SwapRocketPool.swapEthToReth` exercise

Write your code inside the [`SwapRocketPool` contract](../src/exercises/SwapRocketPool.sol)

This exercise is designed to gain experience minting rETH.

```solidity
function swapEthToReth() external payable {
    // Write your code here
}
```

## Instructions

1. **Swap ETH to rETH**

   - Implement logic to mint rETH from ETH.

   > **Hint:** Look for how this is done inside `RocketDepositPool.deposit`

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-swap-rocket-pool.sol --match-test test_swapEthToReth -vvv
```
