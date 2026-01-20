# Swap Exercises

In this exercise, you'll learn how to swap tokens with the [`PoolManager`](https://github.com/Uniswap/v4-core/blob/main/src/PoolManager.sol) contract.

The starter code for this exercise is provided in [`foundry/src/exercises/Swap.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/exercises/Swap.sol)

Solution is in [`foundry/src/solutions/Swap.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/solutions/Swap.sol)

## Task 1 - Initiate a swap

```solidity
function swap(SwapExactInputSingleHop calldata params) external payable {
    // Write your code here
}
```

- Determine the currency to take from the caller and transfer it into the contract.
- Unlock the `PoolManager` contract.
- Refund any remaining currency that was taken from the caller.

## Task 2 - Unlock callback

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

- Swap currencies with the `PoolManager` contract.
- Revert if amount out is less than the minimum specified (`SwapExactInputSingleHop.amountOutMin`)

## Test

```shell
forge test --fork-url $FORK_URL --match-path test/Swap.test.sol -vvv
```
