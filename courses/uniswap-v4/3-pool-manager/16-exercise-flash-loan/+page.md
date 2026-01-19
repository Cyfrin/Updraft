# Flash Exercises

In this exercise, you'll learn how to execute a flash loan from the [`PoolManager`](https://github.com/Uniswap/v4-core/blob/main/src/PoolManager.sol) contract.

The starter code for this exercise is provided in [`foundry/src/exercises/Flash.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/exercises/Flash.sol)

Solution is in [`foundry/src/solutions/Flash.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/solutions/Flash.sol)

## Task 1 - Initiate a flash loan

```solidity
function flash(address currency, uint256 amount) external {
    // Write your code here
}
```

- Unlock the `PoolManager` contract by calling `PoolManager.unlock`
- ABI encode or store the inputs (`currency` and `amount`) in storage.

## Task 1 - Unlock callback

```solidity
function unlockCallback(bytes calldata data)
    external
    onlyPoolManager
    returns (bytes memory)
{
    // Write your code here
    return "";
}
```

- Implement the `unlockCallback`
- Take out flash loan of `currency` for the `amount` specified when the function `flash` was called.
- Immediately after borrowing the `currency` from the `PoolManager` contract, call `tester.call("")`.
  This external call will check that the flash loan was taken out correctly.

## Test

```shell
forge test --fork-url $FORK_URL --match-path test/Flash.test.sol -vvv
```
