# `BalancerLiquidity.join` exercise

Write your code inside the [`BalancerLiquidity` contract](../src/exercises/BalancerLiquidity.sol)

This exercise is design for you to gain experience adding liquidity to Balancer.

```solidity
function join(uint256 rethAmount, uint256 wethAmount) external {
  // Write your code here
}
```

## Instructions

1. **Transfer rETH and WETH from msg.sender**

   - Transfer rETH and WETH from `msg.sender`
   - Approve Balancer (`address(vault)`) to spend these tokens

2. **Add liquidity**

   - Call internal function `_join` to add liquidity.
   - Prepare parameters `assets` and `maxAmountsIn`. Token addresses and max amounts in must be ordered as rETH and then WETH.
   - Set the recipient of LP token (BPT) to `msg.sender`.

3. **Refund**

   - Send any left over rETH and WETH in this contract to `msg.sender`.

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-balancer.sol --match-test test_join -vvv
```
