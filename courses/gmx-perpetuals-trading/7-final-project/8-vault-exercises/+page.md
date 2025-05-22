# `Vault` Exercises

`Vault` is a contract that users deposit and withdraw WETH from.

Authorized accounts will be able to transfer WETH in this contract into the strategy by calling `transfer`.

You need to complete the implementation of the `Vault.sol` contract.

## Task 1: Implement `totalValueInToken`

```solidity
function totalValueInToken() public view returns (uint256) {}
```

Return the amount of WETH in this contract plus the amount of WETH managed by the strategy.

> Hint:
>
> - `strategy.totalValueInToken()` returns the total amount of WETH managed by the strategy.

## Task 2: Implement `deposit`

```solidity
function deposit(uint256 wethAmount)
    external
    guard
    returns (uint256 shares)
{}
```

This function will deposit WETH from `msg.sender` and mint shares.

- Call the function `strategy.claim` to claim funding fees
- Calculate the shares to mint and then transfer `WETH` from `msg.sender`.

> Hints
>
> - Call `_convertToShares` to calculate the amount of shares to mint

## Task 3: Implement `withdraw`

```solidity
function withdraw(uint256 shares)
    external
    payable
    guard
    returns (uint256 wethSent, bytes32 withdrawOrderKey)
{}
```

This function will withdraw WETH to `msg.sender`. If not enough WETH can be withdrawn this function will create a market decrease order.

- Call the function `strategy.claim` to claim funding fees
- Calculate the amount of WETH to withdraw by calling `_convertToWeth`
- If there are enough WETH in vault or strategy
  - Send the appropriate amount of WETH to `msg.sender`
  - Burn `shares`
  - Refund ETH if `msg.value` is greater than 0.
- If there are not enough WETH in vault and strategy
  - Withdraw all of WETH from the vault and the strategy to `msg.sender`
  - Calculate and burn the appropriate amount of shares
  - Lock the rest of the shares by calling `_lock`
  - Make sure that `withdrawCallback` is a contract.
  - Call `strategy.decrease` to create a withdraw order. Send `msg.value` as execution fee.
  - Store `WithdrawOrder`

## Task 4: Implement `cancelWithdrawOrder`

```solidity
function cancelWithdrawOrder(bytes32 key) external guard {}
```

This function allows users to cancel their withdraw order.

- Check that only the user that created the withdraw order can cancel their own order.
- Make sure that `withdrawCallback` is a contract.
- Call `strategy.cancel` to cancel the order.

## Task 5: Implement `removeWithdrawOrder`

```solidity
function removeWithdrawOrder(bytes32 key, bool ok) external auth {}
```

This function is called by `WithdrawCallback` to remove the withdraw order in 2 situations.

1. Withdraw order executed successfully. `ok` will be `true`.
2. There was an error executing the order or the order was cancelled. `ok` will be `false`.

- Get the withdraw order stored in the mapping `withdrawOrders`.
- Unlock the shares of the user who created the withdraw order.
- If `ok` is `true`, burn the remaining shares.
- Delete the withdraw order.

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/app/Vault.test.sol -vvv
```

## Integration test

Test all contracts (`Vault`, `Strategy` and `WithdrawCallback`).

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/app/VaultAndStrategy.test.sol -vvv
```
