# `EigenLayerRestake.undelegate` exercise

Write your code inside the [`EigenLayerRestake` contract](../src/exercises/EigenLayerRestake.sol)

This exercise is design to implement a function that will undelegate from the current operator.

Undelegate will automatically queue a withdrawal.

```solidity
function undelegate()
  external
  auth
  returns (bytes32[] memory withdrawalRoot)
{
  // Write your code here
}
```

## Instructions

1. **Undelegate**

   - Call `delegationManager.undelegate` to undelegate from the current operator.

   > **Hint:** See the interface `IDelegateManager` for how to call `undelegate`.

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-eigen-layer.sol --match-test test_undelegate -vvv
```
