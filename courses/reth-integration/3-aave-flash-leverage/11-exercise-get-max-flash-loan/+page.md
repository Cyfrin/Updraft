# `FlashLev.getMaxFlashLoanAmountUsd` exercise

Write your code inside the [`FlashLev` contract](../src/exercises/FlashLev.sol)

This exercise is designed to test your understanding of the math for how the max flash loan amount is calculated.

```solidity
 function getMaxFlashLoanAmountUsd(address collateral, uint256 baseColAmount)
     external
     view
     returns (uint256 max, uint256 price, uint256 ltv, uint256 maxLev)
 {
     // Write your code here
 }
```

## Instructions

1. **Calculate max flash loan amount in USD**

   - Implement logic to calculate the max flash loan amount in USD, given the collateral amount.

   > **Hint:** Look for comments inside `dataProvider` and `oracle` contracts to fetch relevant data.
   > These contracts are initialized inside `AaveHelper`.

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-aave-flash-lev.sol --match-test test_getMaxFlashLoanAmountUsd -vvv
```
