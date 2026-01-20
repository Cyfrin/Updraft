# Repay Exercise

In this exercise, you'll learn how to repay tokens to Aave V3.

The starter code for this exercise is provided in `foundry/src/exercises/Repay.sol`

Solution is provided in `foundry/src/solutions/Repay.sol`

## Task 1 - Repay all the debt owed to Aave V3

```solidity
function repay(address token) public returns (uint256) {
    // Task 1.1
    // msg.sender will pay for the interest on borrow.
    // Transfer the difference (debt - balance in this contract)

    // Task 1.2 - Approve the pool contract to transfer debt from this contract

    // Task 1.3 - Repay all the debt to Aave V3
    // All the debt can be repaid by setting the amount to repay to a number
    // greater than or equal to the current debt

    // Task 1.4 - Return the amount that was repaid
}
```

Implement the `repay` function to repay `token` to Aave.

- `token` is the token to repay
- Pay all of debt that this contract owes to Aave

> Hint - Call `pool.repay`

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/Repay.test.sol -vvv
```
