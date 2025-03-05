# `SwapRocketPool.getLastDepositBlock` exercise

Write your code inside the [`SwapRocketPool` contract](../src/exercises/SwapRocketPool.sol)

The goal of this exercise is to learn how to directly get data from the `RocketStorage` contract.

```solidity
function getLastDepositBlock(address user) public view returns (uint256) {
    // Write your code here
}
```

## Instructions

1. **Get last deposit block**

   - Implement logic to get the last deposit block of a given user

   > **Hint:** Look for how this is done inside `RocketTokenRETH._beforeTokenTranser`

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-swap-rocket-pool.sol --match-test test_getLastDepositBlock -vvv
```
