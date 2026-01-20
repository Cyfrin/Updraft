# Reader Exercise

In this exercise, you'll learn how to read transient storage from the [`PoolManager`](https://github.com/Uniswap/v4-core/blob/main/src/PoolManager.sol) contract.

The starter code for this exercise is provided in [`foundry/src/exercises/Reader.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/exercises/Reader.sol)

Solution is in [`foundry/src/solutions/Reader.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/solutions/Reader.sol)

## Task 1 - Get currency delta

```solidity
function getCurrencyDelta(address target, address currency)
    public
    view
    returns (int256 delta)
{
    // Write your code here
}
```

Get the currency delta identified by `target` and `currency`.

The test will take tokens from the `PoolManager` contract to check the currency delta store in the `PoolManager` with the value returned from your code.

## Test

```shell
forge test --fork-url $FORK_URL --match-path test/Reader.test.sol -vvv
```
