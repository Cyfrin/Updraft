# `AuraLiquidity.deposit` exercise

Write your code inside the [`AuraLiquidity` contract](../src/exercises/AuraLiquidity.sol)

This exercise is design for you to gain experience adding liquidity to Aura.

```solidity
function deposit(uint256 rethAmount) external returns (uint256 shares) {
  // Write your code here
}
```

## Instructions

1. **Transfer rETH from msg.sender**

   - Transfer rETH from `msg.sender`.
   - Approve Aura (`address(depositWrapper)`) to spend rETH.

2. **Add liquidity**

   - Call `depositWrapper.depositSingle` to add liquidity.

   > **Hint:**
   >
   > - See `IRewardPoolDepostiWrapper` for how to call `depositSingle`.
   > - See exercise on Balancer to see how to prepare parameters to add liquidity.

3. **Refund**

   - Send any left over rETH in this contract to `msg.sender`.

4. **Return shares**

   - Fetch and return the amount of shares this contract holds by calling `rewardPool.balanceOf`.
