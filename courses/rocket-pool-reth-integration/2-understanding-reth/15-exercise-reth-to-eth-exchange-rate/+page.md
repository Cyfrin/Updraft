# `SwapRocketPool.calcRethToEth` exercise

Write your code inside the [`SwapRocketPool` contract](../src/exercises/SwapRocketPool.sol)

This exercise is design to implement a function that will calculate the exchange rate from rETH to ETH.

```solidity
function calcRethToEth(uint256 rEthAmount)
    external
    view
    returns (uint256 ethAmount)
{
    // Write your code here
}
```

## Instructions

1. **Calculate the rETH to ETH exchange rate**

   - Implement logic to compute the amount of ETH given `rEthAmount`.

   > **Hint:** Check the Rocket Pool contracts (`RocketDepositPool` and `RocketTokenRETH`) for how to fetch
   > data that are needed to calculate the exchange rate.

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-swap-rocket-pool.sol --match-test test_calcRethToEth -vvv
```
