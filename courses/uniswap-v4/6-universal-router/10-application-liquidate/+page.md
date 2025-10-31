# Liquidation Exercises

In this exercise, you'll write a contract that will

1. Get a flash loan from Aave V3.
2. Liquidate an under-collateralized loan on Aave V3.
3. Use the [`UniversalRouter`](https://github.com/Uniswap/universal-router/blob/main/contracts/UniversalRouter.sol) contract to swap collateral received from liquidation into the token that was borrowed.
4. Repay the flash loan and send profit to `msg.sender`.

The starter code for this exercise is provided in [`foundry/src/exercises/Liquidate.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/exercises/Liquidate.sol)

Solution is in [`foundry/src/solutions/Liquidate.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/solutions/Liquidate.sol)

> **Note**  
> This exercise uses a flash loan from **Aave V3** because it’s not possible to obtain a flash loan from **Uniswap V4** and then perform a swap on Uniswap V4 via the `UniversalRouter`.  
> When you get a flash loan from Uniswap V4, the `PoolManager` contract becomes locked, which prevents the `UniversalRouter` from acquiring a lock.  
> In practice, a more efficient approach would be to take the flash loan directly from Uniswap V4 (since its flash loan fee is **0**) and perform the swap directly through the `PoolManager` contract.  
> However, in this exercise, the focus is on learning how to interact with the `UniversalRouter` contract.

## Task 1 - Initiate liquidation

```solidity
function liquidate(
    // Token to flash loan
    address tokenToRepay,
    // User to liquidate
    address user,
    // V4 pool to swap collateral
    PoolKey calldata key
) external {}
```

This function initiates a liquidation by obtaining a flash loan.

- Call `liquidator.getDebt` to get the amount of the token needed to repay the under-collateralized loan.
- Call `flash.flash` to obtain a flash loan. `IFlash` will call back into the `flashCallback` function.
- Refund any excess `tokenToRepay` to `msg.sender`.

## Task 2 - Liquidate, swap and repay

```solidity
function flashCallback(
    address tokenToRepay,
    uint256 amount,
    uint256 fee,
    bytes calldata data
) external {
    // Write your code here
}
```

This function performs the liquidation, swaps the collateral received into the repayment token, and repays the flash loan.

- Call `liquidator.liquidate` to liquidate the under-collateralized loan of `user`.
- Call `swap` to convert the collateral into the token needed to repay the flash loan.
- Repay the flash loan.

## Test

```shell
forge test --fork-url $FORK_URL --match-path test/Liquidate.test.sol -vvv
```
