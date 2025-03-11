# `SwapRocketPool.calcEthToReth` exercise

Write your code inside the [`SwapRocketPool` contract](../src/exercises/SwapRocketPool.sol)

This exercise is design to implement a function that will calculate the exchange rate from ETH to rETH minus the deposit fee.

```solidity
function calcEthToReth(uint256 ethAmount)
    external
    view
    returns (uint256 rEthAmount, uint256 fee)
{
    // Write your code here
}
```

## Instructions

1. **Calculate the ETH to rETH exchange rate**

   - Implement logic to compute the amount of rETH given `ethAmount`. `rEthAmount` must include the deposit fee.

   > **Hint:** Check the Rocket Pool contracts (`RocketDepositPool` and `RocketTokenRETH`) for how to fetch
   > data that are needed to calculate the exchange rate.

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-swap-rocket-pool.sol --match-test test_calcEthToReth -vvv
```
