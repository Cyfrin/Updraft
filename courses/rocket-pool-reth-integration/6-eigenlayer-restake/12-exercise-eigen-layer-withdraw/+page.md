# `EigenLayerRestake.withdraw` exercise

Write your code inside the [`EigenLayerRestake` contract](https://github.com/Cyfrin/defi-reth/blob/main/foundry/src/exercises/EigenLayerRestake.sol)

This exercise is design to implement a function that will withdraw rETH from EigenLayer.

```solidity
function withdraw(address operator, uint256 shares, uint32 startBlockNum)
  external
  auth
{
  // Write your code here
}
```

## Instructions

1. **Withdraw**

   - Call `delegationManager.completeQueuedWithdrawal` to withdraw rETH from EigenLayer.
   - Set `IDelegationManager.Withdrawal.nonce` to 0.

   > **Hint:** See the interface `IDelegateManager`.

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-eigen-layer.sol --match-test test_withdraw -vvv
```
