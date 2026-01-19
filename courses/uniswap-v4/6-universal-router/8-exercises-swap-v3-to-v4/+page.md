# Swap V3 to V4 Exercises

In this exercise, you'll learn how to use the [`UniversalRouter`](https://github.com/Uniswap/universal-router/blob/main/contracts/UniversalRouter.sol) contract to execute a multi hop swap from V3 to V4.

The starter code for this exercise is provided in [`foundry/src/exercises/SwapV3ToV4.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/exercises/SwapV3ToV4.sol)

Solution is in [`foundry/src/solutions/SwapV3ToV4.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/solutions/SwapV3ToV4.sol)

## Task 1 - Swap

```solidity
function swap(V3Params calldata v3, V4Params calldata v4) external {}
```

Call `UniversalRouter` to swap token `A` to `B` on Uniswap V3 pool and then swap `B` to `C` on V4 pool.

- Transfer `v3.tokenIn` from `msg.sender` to the `UniversalRouter` contract.
- Call `UniverswalRouter.execute` with the commands `V3_SWAP_EXACT_IN`, `UNWRAP_WETH` (if `v3.tokenOut` is `WETH`) and then `V4_SWAP`.
- Withdraw swapped currency to `msg.sender`.

## Test

```shell
forge test --fork-url $FORK_URL --match-path test/SwapV3ToV4.test.sol -vvv
```
