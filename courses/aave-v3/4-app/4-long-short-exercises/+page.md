# Long and Short Exercises

In this exercise, you'll learn how to create a long and short position with Aave V3.

The starter code for this exercise is provided in `foundry/src/exercises/LongShort.sol`

Solution is provided in `foundry/src/solutions/LongShort.sol`

## Task 1 - Open a long or a short position

```solidity
function open(OpenParams memory params)
    public
    returns (uint256 collateralAmountOut)
{
    // Task 1.1 - Check that params.minHealthFactor is greater than 1e18

    // Task 1.2 - Transfer collateral from msg.sender

    // Task 1.3
    // - Approve and supply collateral to Aave
    // - Send aToken to msg.sender

    // Task 1.4
    // - Borrow token from Aave
    // - Borrow on behalf of msg.sender

    // Task 1.5 - Check that health factor of msg.sender is > params.minHealthFactor

    // Task 1.6
    // - Swap borrowed token to collateral token
    // - Send swapped token to msg.sender
}
```

Implement the `open` function which will deposit the collateral token into Aave, borrow another token and then swap it for more collateral token.

> Hints:
>
> - Call functions inside `Aave` and `Swap` contracts

## Task 2 - Close a long or a short position

```solidity
function close(CloseParams memory params)
    public
    returns (
        uint256 collateralWithdrawn,
        uint256 debtRepaidFromMsgSender,
        uint256 borrowedLeftover
    )
{
    // Task 2.1 - Transfer collateral from msg.sender into this contract

    // Task 2.2 - Swap collateral to borrowed token

    // Task 2.3
    // - Repay borrowed token
    // - Amount to repay is the minimum of current debt and params.maxDebtToRepay
    // - If the amount to repay is greater that the amount swapped,
    //   then transfer the difference from msg.sender

    // Task 2.4 - Withdraw collateral to msg.sender

    // Task 2.5 - Transfer profit = swapped amount - repaid amount

    // Task 2.6 - Return amount of collateral withdrawn,
    //            debt repaid and profit from closing this position
}
```

Implement the `close` function which will transfer the collateral token from `msg.sender`, swap it with the borrowed token, repay debt to Aave and withdraw the collateral and profit from this strategy.

> Hints:
>
> - Call functions inside `Aave` and `Swap` contracts

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/LongShort.test.sol -vvv
```
