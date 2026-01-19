# Counter Hooks Exercises

In this exercise, you'll learn how to write a custom hooks contract.

The starter code for this exercise is provided in [`foundry/src/exercises/CounterHook.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/exercises/CounterHook.sol)

Solution is in [`foundry/src/solutions/CounterHook.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/solutions/CounterHook.sol)

## Task 1 - Configure hook permissions

```solidity
function getHookPermissions()
    public
    pure
    returns (Hooks.Permissions memory)
{
    return Hooks.Permissions({
        beforeInitialize: false,
        afterInitialize: false,
        beforeAddLiquidity: false,
        afterAddLiquidity: false,
        beforeRemoveLiquidity: false,
        afterRemoveLiquidity: false,
        beforeSwap: false,
        afterSwap: false,
        beforeDonate: false,
        afterDonate: false,
        beforeSwapReturnDelta: false,
        afterSwapReturnDelta: false,
        afterAddLiquidityReturnDelta: false,
        afterRemoveLiquidityReturnDelta: false
    });
}
```

Set `beforeAddLiquidity`, `beforeRemoveLiquidity`, `beforeSwap` and `afterSwap` to `true`.

## Task 2 - Increment counts

For each hook functions above, increment the state variable `counts`.

`counts` is a nested mapping from `PoolId`, name of the function, to the number of times the function was called.

For example the current count of `afterSwap` is

```solidity
counts[key.toId()]["beforeSwap"]
```

## Test

1. Find the value of `salt` needed to deploy the hooks contract at a valid address.

```shell
forge test --match-path test/FindHookAddr.sol -vvv
```

2. Export the salt printed to your terminal from executing the command in the previous step.

```shell
export SALT=YOUR_SALT
forge test --fork-url $FORK_URL --match-path test/CounterHook.test.sol -vvv
```
