# `RethNav.getExchangeRate` exercise

Write your code inside the [`RethNav` contract](../src/exercises/RethNav.sol)

This exercise is design to implement a function that will calculate the exchange rate of 1 rETH into ETH.

```solidity
function getExchangeRate() external view returns (uint256) {
    // Returns 18 decimals
}
```

## Instructions

1. **Calculate the rETH to ETH exchange rate**

   - Implement logic to compute the amount of ETH given 1 rETH.

   > **Hint:** Check the Rocket Pool contracts (`RocketTokenRETH`) for how to fetch the exchange rate.

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-reth-nav.sol --match-test test_nav -vvv
```
