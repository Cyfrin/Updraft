# `GmxHelper` Exercises

`GmxHelper` is a contract that interacts with GMX to manage position size and fees.

You need to complete the implementation of the `GmxHelper.sol` contract.

## Task 1: Implement `getSizeDeltaUsd`

```solidity
function getSizeDeltaUsd(
    // Long token price from Chainlink (1e8 = 1 USD)
    uint256 longTokenPrice,
    // Current position size
    uint256 sizeInUsd,
    // Current collateral amount locked in the position
    uint256 collateralAmount,
    // Long token amount to add or remove
    uint256 longTokenAmount,
    // True for market increase
    bool isIncrease
) internal view returns (uint256 sizeDeltaUsd) {}
```

This function calculates the change in position size needed so that the new position size is the current collateral price times the new collateral amount.

Return `0` if `sizeDeltaUsd` is less than `0`.

## Task 2: Implement `createIncreaseShortPositionOrder`

```solidity
function createIncreaseShortPositionOrder(
    // Execution fee to send to the order vault
    uint256 executionFee,
    // Long token amount to add to the current position
    uint256 longTokenAmount
) internal returns (bytes32 orderKey) {}
```

This function creates a market increase order for a short position.

### Task 2.1: Calculate the position size delta

Call `getSizeDeltaUsd` to calculate the delta for the next position size.

> Hint:
>
> - Get `sizeInUsd` and `collateralAmount` from the current `position`

### Task 2.2: Create market increase order

Call `exchangeRouter` to create a market increase order for a short position.

## Task 3: Implement `createDecreaseShortPositionOrder`

```solidity
function createDecreaseShortPositionOrder(
    // Execution fee to send to the order vault
    uint256 executionFee,
    // Long token amount to remove from the current position
    uint256 longTokenAmount,
    // Receiver of long token
    address receiver,
    // Callback contract used to handle withdrawal from the vault
    address callbackContract,
    // Max gas to send to the callback contract
    uint256 callbackGasLimit
) internal returns (bytes32 orderKey) {}
```

This function creates a market decrease order for a short position.

### Task 3.1: Calculate the position size delta

Call `getSizeDeltaUsd` to calculate the delta for the next position size.

### Task 3.2: Create market decrease order

Call `exchangeRouter` to create a market decrease order for a short position.

> Hints:
>
> - Set `receiver`, `callbackContract` and `callbackGasLimit` from the inputs.
> - Set `decreasePositionSwapType` to `Order.DecreasePositionSwapType.SwapPnlTokenToCollateralToken`

## Task 4: Implement `cancelOrder`

```solidity
function cancelOrder(bytes32 orderKey) internal {}
```

This function cancels an order.

> Hint:
>
> - Call `exchangeRouter.cancelOrder`

## Task 5: Implement `claimFundingFees`

```solidity
function claimFundingFees() internal {}
```

This function claims funding fees.

> Hint:
>
> - You only need to claim funding fees for the long token since this is the only collateral used by this contract.
