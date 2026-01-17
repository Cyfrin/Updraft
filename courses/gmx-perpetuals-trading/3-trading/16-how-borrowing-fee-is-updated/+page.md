## Updating Borrowing Fees for Position Size Changes

In decentralized trading systems, calculating borrowing fees seems straightforward when a position's size remains constant. However, traders frequently adjust their positions by increasing or decreasing their size. This dynamic requires a robust mechanism to ensure borrowing fees are calculated and charged accurately, reflecting the position's size *before* any modification occurs. This lesson explains the process used to handle fee updates when a position's size changes.

The fundamental principle is to calculate and settle any accrued borrowing fees based on the *existing position size* immediately *before* that size is modified. This ensures fair and precise fee accounting irrespective of whether the trader is adding to or reducing their position.

## The Fee Settlement Process Before Position Modification

When a trader initiates an action to increase or decrease their position size, the system executes a specific sequence of operations *before* applying the size change. This sequence ensures that borrowing fees accrued up to that exact moment are accounted for correctly:

1.  **Update Market State:** The system first updates the global `cumulativeBorrowingFactor` for the relevant market. This factor aggregates borrowing costs over time and needs to be current before any position-specific calculations occur.
2.  **Calculate Fee Owed by Position:** Using the *current* size of the specific position being modified, the system calculates the borrowing fees accrued since its last fee settlement. This calculation relies on the difference between the newly updated market `cumulativeBorrowingFactor` and the `borrowingFactor` previously recorded for that specific position.
3.  **Settle Accrued Fee:** The calculated borrowing fee amount is deducted directly from the collateral associated with the position.
4.  **Synchronize Position State:** The position's individual `borrowingFactor` is updated to match the current market `cumulativeBorrowingFactor`. This effectively marks the position as having settled its fees up to this point in time.
5.  **Modify Position Size:** Only *after* these fee settlement steps are completed does the system proceed to apply the requested increase or decrease to the position's size.

This strict order of operations is crucial for accuracy. It ensures that fees are always based on the position size that was actually held during the accrual period.

## Key Concepts and Components

Understanding this process involves several key components:

*   **Cumulative Borrowing Factor (Market Level):** This is a market-wide variable (`cumulativeBorrowingFactor`) that continuously accumulates based on the prevailing borrowing rates over time. It represents the total borrowing cost rate up to a specific point. Functions like `MarketUtils.updateCumulativeBorrowingFactor` update this value, while `MarketUtils.getCumulativeBorrowingFactor` retrieves its current state.
*   **Borrowing Factor (Position Level):** Each individual position stores its own `borrowingFactor`. This value represents the state of the market's `cumulativeBorrowingFactor` the *last time* borrowing fees were calculated and settled for this specific position. It's updated using functions like `params.position.setBorrowingFactor`.
*   **Borrowing Fee Calculation:** The fee owed by a specific position over a period is determined by its size during that period multiplied by the change in the borrowing factor (i.e., the current market `cumulativeBorrowingFactor` minus the position's stored `borrowingFactor`). Functions like `PositionPricingUtils.getPositionFees` or `MarketUtils.getBorrowingFees` perform this calculation.
*   **Collateral:** This represents the assets deposited by the trader to secure the position. Borrowing fees are directly debited from this collateral balance. Functions like `params.position.setCollateralAmount` update the recorded collateral value after deduction, and `MarketUtils.applyDeltaToPoolAmount` might handle the actual transfer or accounting of the fee amount.

## Implementation Flow: Increasing and Decreasing Positions

The fee settlement logic is consistently applied whether a position is increased or decreased. The system typically follows a structured function call pattern:

**General Flow (`ExecuteOrderUtils.executeOrder`):**

1.  **Update Market Factors:** A high-level function like `PositionUtils.updateFundingAndBorrowingState` is called first. This ensures the market's `cumulativeBorrowingFactor` is brought up-to-date via an internal call (e.g., to `MarketUtils.updateCumulativeBorrowingFactor`).
2.  **Process Order (Increase or Decrease):** The logic then branches depending on the order type.

**Increasing a Position (`IncreaseOrderUtils.processOrder` -> `IncreasePositionUtils.increasePosition`):**

*   Within the position increase logic, a specific function (e.g., `IncreasePositionUtils.processCollateral`) handles the fee settlement *before* the size increase:
    *   Calculates fees owed using the *current* size and factor difference (`PositionPricingUtils.getPositionFees` -> `MarketUtils.getBorrowingFees`).
    *   Applies the fee deduction to collateral (`MarketUtils.applyDeltaToPoolAmount`, `params.position.setCollateralAmount`).
    *   Retrieves the latest market factor (`MarketUtils.getCumulativeBorrowingFactor`).
    *   Updates the position's `borrowingFactor` to match the market (`params.position.setBorrowingFactor`).
*   *After* this collateral processing (which includes fee settlement), the logic to actually increase the position's size and potentially update collateral based on the new funds added is executed.

**Decreasing a Position (`DecreaseOrderUtils.processOrder` -> `DecreasePositionUtils.decreasePosition`):**

*   Similarly, within the position decrease logic, a function (e.g., `DecreasePositionCollateralUtils.processCollateral`) handles fee settlement *before* the size decrease:
    *   Calculates fees owed using the *current* size and factor difference (`PositionPricingUtils.getPositionFees` -> `MarketUtils.getBorrowingFees`).
    *   Applies the fee deduction to collateral (`MarketUtils.applyDeltaToPoolAmount`, `params.position.setCollateralAmount`).
    *   Retrieves the latest market factor (`MarketUtils.getCumulativeBorrowingFactor`).
    *   Updates the position's `borrowingFactor` to match the market (`params.position.setBorrowingFactor`).
*   *After* this fee settlement, the logic to decrease the position's size and manage the release of collateral is executed.

## Ensuring Accurate Fee Accounting

The critical takeaway is the consistent application of the fee settlement process *prior* to any change in position size. By first updating the market's borrowing state, then calculating and settling the fees owed by the position based on its size *before* the change, and finally synchronizing the position's borrowing state, the system ensures that borrowing fees are always accounted for accurately, reflecting the actual capital borrowed over the relevant period. This mechanism is essential for the financial integrity of leveraged trading systems in Web3.