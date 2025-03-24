# `SwapRocketPool.swapRethToEth` exercise

Write your code inside the [`SwapRocketPool` contract](https://github.com/Cyfrin/defi-reth/blob/main/foundry/src/exercises/SwapRocketPool.sol)

This exercise is designed to gain experience redeeming ETH from rETH.

```solidity
function swapRethToEth(uint256 rEthAmount) external {
    // Write your code here
}
```

## Instructions

1. **Swap rETH to ETH**

   - Implement logic to burn rETH and redeem ETH.
   - This contract will be given approval to pull rETH from `msg.sender`.
   - Don't forget to declare a payable `receive` function to be able to receive ETH.

   > **Hint:** Call the function `reth.burn` to burn rETH.

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-swap-rocket-pool.sol --match-test test_swapRethToEth -vvv
```
