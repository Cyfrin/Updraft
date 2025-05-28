# Liquidation Exercise

In this exercise, you'll learn how to liquidate an under-collateralized debt from Aave V3.

The starter code for this exercise is provided in `foundry/src/exercises/Liquidate.sol`

Solution is provided in `foundry/src/solutions/Liquidate.sol`

## Task 1 - Liquidate an under-collateralized loan

```solidity
function liquidate(address collateral, address borrowedToken, address user)
    public
{
    // Task 1.1 - Get the amount of borrowed token that the user owes to Aave V3

    // Task 1.2 - Transfer the full borrowed amount from msg.sender

    // Task 1.3 - Approve the pool contract to spend borrowed token from this contract

    // Task 1.4 - Call liquidate
}
```

Liquidate an under-collateralized debt

- `collateral` is the collateral token to receive
- `borrowedToken` is the token borrowed by `user`
- `user` is the account that has the under-collateralized debt

> Hints
>
> - Call `pool.getReserveData` to get the address of the variable debt token for `borrowedToken`
> - Get the debt of `user`
> - Call `pool.liquidationCall`

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/Liquidate.test.sol -vvv
```
