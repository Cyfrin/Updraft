# `WithdrawCallback` Exercises

`WithdrawCallback` is the contract that is called by GMX when the vault creates a order to withdraw WETH from the position managed by the strategy.

The callback functions are all executed after GMX executes the order.

One of the 3 functions below will be called first by GMX.

- `afterOrderExecution`
- `afterOrderCancellation`
- `afterOrderFrozen`

Afterwards execution fee refund is sent to `refundExecutionFee`

You need to complete the implementation of the `WithdrawCallback.sol` contract.

## Task 1: Implement `refundExecutionFee`

```solidity
function refundExecutionFee(
    // Order key
    bytes32 key,
    EventUtils.EventLogData memory eventData
) external payable onlyGmx {}
```

This function will refund execution fee to the account that created the order to withdraw.

- Check that `refunds[key]` is not `address(0)`. `refunds` is a mapping from the order key to the account to refund execution fee to.
- Delete `refunds` for `key`.
- Send all ETH in this contract to the address stored in `refunds[key]`.

## Task 2: Implement `afterOrderExecution`

```solidity
function afterOrderExecution(
    // Order key
    bytes32 key,
    Order.Props memory order,
    EventUtils.EventLogData memory eventData
) external onlyGmx {}
```

This function is called by GMX after an order is successfully executed.

- Check that the order type is a market decrease.
- Get the withdraw order from the vault by calling `getWithdrawOrder`
- Set `refunds` for `key` to the account stored in the withdraw order
- Remove the withdraw order by calling `vault.removeWithdrawOrder`. Burn all remaining shares of this user.
- Transfer at most the amount of WETH stored in the withdraw order to the account that is associated with this withdraw order. Send remaining WETH to the vault.

## Task 3: Implement `afterOrderCancellation`

```solidity
function afterOrderCancellation(
    // Order key
    bytes32 key,
    Order.Props memory order,
    EventUtils.EventLogData memory eventData
) external onlyGmx {}
```

This function is called by GMX after an order is cancelled.

- Check that the order type is a market decrease.
- Get the withdraw order from the vault by calling `getWithdrawOrder`
- Set `refunds` for `key` to the account stored in the withdraw order.
- Remove the withdraw order by calling `vault.removeWithdrawOrder`. Unlock the shares that are locked for this user.

## Task 4: Implement `afterOrderFrozen`

```solidity
function afterOrderFrozen(
    // Order key
    bytes32 key,
    Order.Props memory order,
    EventUtils.EventLogData memory eventData
) external onlyGmx {}
```

This function is called by GMX after an order is frozen.

- Check that the order type is a market decrease.
- Get the withdraw order from the vault by calling `getWithdrawOrder`
- Set `refunds` for `key` to the account stored in the withdraw order
- Remove the withdraw order by calling `vault.removeWithdrawOrder`. Unlock the shares that are locked for this user.

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/app/WithdrawCallback.test.sol -vvv
```
