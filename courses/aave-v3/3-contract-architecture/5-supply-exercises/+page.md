# Supply Exercises

In this exercise, you'll learn how to supply tokens into Aave V3.

The starter code for this exercise is provided in `foundry/src/exercises/Supply.sol`

Solution is provided in `foundry/src/solutions/Supply.sol`

## Task 1 - Supply token to Aave V3 pool

```solidity
function supply(address token, uint256 amount) public {
    // Task 1.1 - Transfer token from msg.sender
    // Task 1.2 - Approve the pool contract to spend token
    // Task 1.3 - Supply token to the pool
}
```

Implement the `supply` function to deposit `token` into Aave V3.

- `token` is the token to deposit
- `amount` is the amount of `token` to deposit

> Hint - Call `pool.supply`

## Task 2 - Get supply balance

```solidity
function getSupplyBalance(address token) public view returns (uint256) {
    // Balance of the token that can be withdrawn is the balance of aToken
    // Task 2.1 - Get the aToken address
    // Task 2.2 - Get the balance of aToken for this contract
}
```

Implement the `getSupplyBalance` function. This function must return the balance of supplied token with interest.

> Hints
>
> - Query the AToken for `token` to get the balance of supplied token.
> - Call `pool.getReserveData` to get the address of AToken

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/Supply.test.sol -vvv
```
