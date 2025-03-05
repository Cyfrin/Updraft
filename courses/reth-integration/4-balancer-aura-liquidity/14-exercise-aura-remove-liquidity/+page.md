# `AuraLiquidity.exit` exercise

Write your code inside the [`AuraLiquidity` contract](../src/exercises/AuraLiquidity.sol)

This exercise is design for you to gain experience removing liquidity from Aura.

```solidity
function exit(uint256 shares, uint256 minRethAmountOut) external auth {
  // Write your code here
}
```

## Instructions

1. **Withdraw BPT from Aura**

   - Withdraw BPT from Aura by calling `rewardPool.withdrawAndUnwrap`.
   - Check that `withdrawAndUnwrap` returns `true`.

2. **Get BPT balance**

   - Get BPT balance of this contract.

3. **Remove liquidity from Balancer**

   - Withdraw liquidity all in rETH from Balancer to `msg.sender`.

   > **Hint:** - See exercise on Balancer to see how to prepare parameters to remove liquidity.

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-aura.sol --match-test test_depositAndExit -vvv
```
