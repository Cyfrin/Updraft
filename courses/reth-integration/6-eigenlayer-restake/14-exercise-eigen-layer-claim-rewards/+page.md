# `EigenLayerRestake.claimRewards` exercise

Write your code inside the [`EigenLayerRestake` contract](../src/exercises/EigenLayerRestake.sol)

This exercise is design to implement a function that will claim restaking rewards from EigenLayer.

```solidity
 function claimRewards(IRewardsCoordinator.RewardsMerkleClaim memory claim)
     external
 {
     // Write your code here
 }
```

## Instructions

1. **Claim rewards**

   - Call `rewardsCoordinator.processClaim` to claim rewards.

   > **Hint:** Check the interface `IRewardsCoordinator` for how to call the function `processClaim`.

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-eigen-layer.sol --match-test test_claimRewards -vvv
```
