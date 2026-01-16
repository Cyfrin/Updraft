# Borrow Exercises

In this exercise, you'll learn how to borrow tokens from Aave V3.

The starter code for this exercise is provided in `foundry/src/exercises/Borrow.sol`

Solution is provided in `foundry/src/solutions/Borrow.sol`

## Task 1 - Approximate the maximum amount of token that can be borrowed

```solidity
function approxMaxBorrow(address token) public view returns (uint256) {
    // Task 1.1 - Get asset price from the oracle.
    // The price is returned with 8 decimals (1e8 = 1 USD)

    // Task 1.2 - Get the decimals of token

    // Task 1.3 - Get the USD amount that can be borrowed from Aave V3

    // Task 1.4 - Calculate the amount of token that can be borrowed
}
```

Implement the `approxMaxBorrow(` function. This function will approximate the maximum amount of token that you can borrow.

- `token` is the token to borrow

> Hints
>
> - Call `oracle.getAssetPrice` to get the USD price of `token`
> - Call `pool.getUserAccountData` to get the maximum USD amount that can be borrowed from Aave
> - Approximate amount of `token` that can be borrowed is the max USD value that can be borrowed divide by the price of `token`

## Task 2 - Get the health factor of this contract

```solidity
function getHealthFactor() public view returns (uint256) {}
```

Get the health factor of this contract

> Hint - Call `pool.getUserAccountData`

## Task 3 - Borrow token from Aave V3

```solidity
function borrow(address token, uint256 amount) public {}
```

Borrow `token` from Aave V3

- `token` is the token to borrow
- `amount` is the amount of `token` to borrow

> Hint - Call `pool.borrow`

## Task 4 - Get variable debt balance of this contract

```solidity
function getVariableDebt(address token) public view returns (uint256) {
    // Task 4.1 - Get the variable debt token address from the pool contract

    // Task 4.2 - Get the balance of the variable debt token for this contract.
    // Balance of the variable debt token is the amount of token that this
    // contract must repay to Aave V3.
}
```

Get variable debt balance of this contract.

> Hints
>
> - Call `pool.getReserveData` to get the address of variable debt token
> - Query the balance of variable debt token for this contract to get the current debt that this contract owes to Aave

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/Borrow.test.sol -vvv
```
