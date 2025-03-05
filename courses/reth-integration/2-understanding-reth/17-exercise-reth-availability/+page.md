# `SwapRocketPool.getAvailability` exercise

Write your code inside the [`SwapRocketPool` contract](../src/exercises/SwapRocketPool.sol)

The goal of this exercise is to learn how to get availability of minting rETH.

```solidity
function getAvailability() external view returns (bool, uint256) {
    // Write your code here
}
```

## Instructions

1. **Get deposit availability and max deposit amount**

   - Implement logic to fetch the deposit availability status and the max deposit amount.

   > **Hint:** Look for the relevant functions inside `protocolSettings` and `depositPool` contracts

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-swap-rocket-pool.sol --match-test test_getAvailability -vvv
```
