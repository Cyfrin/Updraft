# Universal Router Exercises

In this exercise, you'll learn how to use the [`UniversalRouter`](https://github.com/Uniswap/universal-router/blob/main/contracts/UniversalRouter.sol) contract.

The starter code for this exercise is provided in [`foundry/src/exercises/UniversalRouter.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/exercises/UniversalRouter.sol)

Solution is in [`foundry/src/solutions/UniversalRouter.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/solutions/UniversalRouter.sol)

## Task 1 - Swap

```solidity
function swap(
    PoolKey calldata key,
    uint128 amountIn,
    uint128 amountOutMin,
    bool zeroForOne
) external payable {
    // Write your code here
}
```

Call `UniversalRouter` to swap currencies on Uniswap V4 pool.

- Transfer currency to swap from `msg.sender` into this contract.
- Grant `Permit2` approvals to `UniversalRouter`.
- Prepare the inputs to call `UniversalRouter.execute`.
  - The command to execute is `Commands.V4_SWAP`.
  - The input for this command encodes `actions` and `params`.
    - `actions` are `Actions.SWAP_EXACT_IN_SINGLE`, `Actions.SETTLE_ALL` and `Actions.TAKE_ALL`.
    - `params` are inputs corresponding to each action. See [`_handleAction`](https://github.com/Uniswap/v4-periphery/blob/60cd93803ac2b7fa65fd6cd351fd5fd4cc8c9db5/src/V4Router.sol#L32-L80) for the correct inputs.
- Call `UniverswalRouter.execute`
- Withdraw both currency 0 and 1 to `msg.sender`.

## Test

```shell
forge test --fork-url $FORK_URL --match-path test/UniversalRouter.test.sol -vvv
```
