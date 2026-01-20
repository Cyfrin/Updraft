# Router Exercises

In this exercise, you'll learn how to swap tokens with the [`PoolManager`](https://github.com/Uniswap/v4-core/blob/main/src/PoolManager.sol) contract.

The starter code for this exercise is provided in [`foundry/src/exercises/Router.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/exercises/Router.sol)

Solution is in [`foundry/src/solutions/Router.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/solutions/Router.sol)

## Task 1 - Single hop swap exact input

```solidity
function swapExactInputSingle(ExactInputSingleParams calldata params)
    external
    payable
    setAction(SWAP_EXACT_IN_SINGLE)
    returns (uint256 amountOut)
{
    // Write your code here
}
```

Implement this function so it performs a swap against a single pool in the `PoolManager` contract.

- Swap the full amount of the input currency specified by `ExactInputSingleParams.amountIn` for the maximum possible amount of the other currency in the pool.

- Revert if the received output amount is less than `ExactInputSingleParams.amountOutMin`.

- Return any unused tokens back to the caller.

- Return the amount of currency out (`amountOut`).

## Task 2 - Single hop swap exact output

```solidity
function swapExactOutputSingle(ExactOutputSingleParams calldata params)
    external
    payable
    setAction(SWAP_EXACT_OUT_SINGLE)
    returns (uint256 amountIn)
{
    // Write your code here
}
```

Implement this function so it performs a swap against a single pool in the `PoolManager` contract.

- Swap the minimum amount of the input currency for the exact amount of output specified by `ExactOutputSingleParams.amountOut` of the other currency in the pool.

- Revert if the input amount is greater than `ExactOutputSingleParams.amountInMax`.

- Return any unused tokens back to the caller.

- Return the amount of currency in (`amountIn`)

## Task 3 - Multi hops swap exact input

```solidity
function swapExactInput(ExactInputParams calldata params)
    external
    payable
    setAction(SWAP_EXACT_IN)
    returns (uint256 amountOut)
{
    // Write your code here
}
```

Implement this function so it performs a swap against multiple pools in the `PoolManager` contract.

- Swap the full amount of the input currency specified by `ExactInputParams.amountIn` for the maximum possible amount of the final currency specified in the last element of `ExactInputParams.path`.

- Revert if the received output amount is less than `ExactInputParams.amountOutMin`.

- Return any unused tokens back to the caller.

- Return the amount of currency out (`amountOut`).

## Task 4 - Multi hops swap exact output

```solidity
function swapExactOutput(ExactOutputParams calldata params)
    external
    payable
    setAction(SWAP_EXACT_OUT)
    returns (uint256 amountIn)
{
    // Write your code here
}
```

Implement this function so it performs a swap against multiple pools in the `PoolManager` contract.

- Swap the minimum amount of the input currency for the exact amount of output specified by `ExactOutputParams.amountOut` of the final currency specified in `ExactOutputParams.currencyOut`.

- Revert if the input amount is greater than `ExactOutputParams.amountInMax`.

- Return any unused tokens back to the caller.

- Return the amount of currency in (`amountIn`)

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/Router.test.sol -vvv
```
