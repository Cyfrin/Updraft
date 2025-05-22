# Withdraw Exercises

In this exercise, you'll learn how to withdraw tokens that was supplied either as liquidity or collateral from Aave V3.

The starter code for this exercise is provided in `foundry/src/exercises/Withdraw.sol`

Solution is provided in `foundry/src/solutions/Withdraw.sol`

## Task 1 - Get aToken balance of this contract

```solidity
// The aToken balance is the amount of underlying token that this contract
// can withdraw
function getSupplyBalance(address token) public view returns (uint256) {
    // Task 1.1 - Get the aToken address from the pool contract
    // Task 1.2 - Get the balance of aToken that this contract has
}
```

Get the aToken balance of this contract

> Hints
>
> - Call `pool.getReserveData` to get the address of AToken
> - Call balance of AToken this contract has

## Task 2 - Withdraw all of underlying token from Aave V3

```solidity
function withdraw(address token) public returns (uint256) {
    // Task 2.1 - Withdraw all of underlying token from Aave V3
    // Task 2.2 - Return the amount that was withdrawn
}
```

Withdraw `token` from Aave V3

- `token` is the token withdraw

> Hints
>
> - Specify `type(uint256).max` for amount to withdraw to withdraw all underlying token
> - Call `pool.withdraw` to withdraw

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/Withdraw.test.sol -vvv
```
