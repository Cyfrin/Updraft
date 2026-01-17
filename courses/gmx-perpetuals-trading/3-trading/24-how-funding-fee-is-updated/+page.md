## Understanding How Funding Fees Are Updated for Positions

This lesson explores the technical process by which funding fees are calculated and applied to a trader's open position within a decentralized finance (DeFi) protocol, specifically focusing on perpetual futures markets. This mechanism is triggered whenever a trader modifies their position, either by increasing or decreasing its size. Notably, the underlying logic shares similarities with how borrowing fees are updated for position holders.

At the heart of this process lies the concept of a "cumulative funding fee per size." This is typically a market-wide value that aggregates the funding rate applied over time, normalized by position size. Each individual position stores the value of this cumulative rate as it was *the last time the position's fees were updated*. A similar cumulative metric exists for tracking claimable funding amounts per size.

The update process unfolds in two distinct stages whenever a position is modified:

1.  **Global State Synchronization:** The protocol first updates the *global* cumulative funding fee metrics to reflect the current time, incorporating any funding rate changes that have occurred since the last global update.
2.  **Position-Specific Calculation and Update:** Using the newly synchronized global cumulative rates, the protocol calculates the specific funding fee adjustment for the trader's position. This calculation is based on the *difference* between the current global cumulative rate and the rate previously recorded by that specific position, multiplied by the position's size over the relevant period. Payable fees are deducted from collateral, claimable fees are accrued, and the position's recorded cumulative rates are updated to match the latest global values.

Let's examine the sequence of operations for both increasing and decreasing a position, often initiated through a function like `ExecuteOrderUtils.executeOrder`.

**Scenario 1: Increasing Position Size**

When a trader increases their position, the following steps typically occur within functions like `IncreaseOrderUtils.processOrder`:

1.  **Update Global State:** The process begins by calling `PositionUtils.updateFundingAndBorrowingState`, which in turn triggers `MarketUtils.updateFundingState`. This crucial step ensures the market's global `cumulativeFundingFeePerSize` and related metrics are current before any position-specific calculations happen.
2.  **Process Position Increase (`IncreasePositionUtils.increasePosition`):**
    *   **Initialization (New Positions):** If this is the first time the position is being opened (`position.sizeInUsd == 0`), its internal funding fee tracking variables (e.g., `fundingFeeAmountPerSize`, `longTokenClaimableFundingAmountPerSize`, `shortTokenClaimableFundingAmountPerSize`) are set to the current, up-to-date global cumulative values.
    *   **Calculate Position Fees (`PositionPricingUtils.getPositionFees`):** This function calculates the specific fees owed or receivable by this particular position *before* the size increase is applied.
        *   It fetches the latest global cumulative rates.
        *   It calls an internal function, often named like `getFundingFees`, to determine the actual funding fee amount. This function calculates the fee based on the position's size and the *change* (delta) between the current global cumulative rate and the rate stored previously on the position. It may use a helper like `MarketUtils.getFundingAmount` for the core calculation.
    *   **Apply Payable Fees:** Any calculated funding fees *owed* by the trader are deducted directly from the position's collateral via a function like `position.setCollateralAmount`.
    *   **Accrue Claimable Fees:** Any funding fees *receivable* by the trader are calculated and added to the position's claimable balance using functions like `PositionUtils.incrementClaimableFundingAmount`. Updates might also occur at the market level (`MarketUtils.incrementClaimableFundingAmount`).
    *   **Update Position State:** Finally, the position's internal record of the cumulative rates is updated to reflect the current global state. This is done using setters like `position.setFundingFeeAmountPerSize`, `position.setLongTokenClaimableFundingAmountPerSize`, and `position.setShortTokenClaimableFundingAmountPerSize`. This synchronizes the position's baseline for future fee calculations.

**Scenario 2: Decreasing Position Size**

Decreasing a position follows a very similar pattern, typically handled within functions like `DecreaseOrderUtils.processOrder`:

1.  **Update Global State:** Just as with increasing a position, `PositionUtils.updateFundingAndBorrowingState` calls `MarketUtils.updateFundingState` first to synchronize the global cumulative funding metrics.
2.  **Process Position Decrease (`DecreasePositionUtils.decreasePosition`):**
    *   **Fee Calculation Trigger:** The fee calculation process is often initiated within a collateral handling function like `DecreasePositionCollateralUtils.processCollateral`.
    *   **Calculate Position Fees (`PositionPricingUtils.getPositionFees`):** This function calculates the funding fees payable or claimable for the position based on its size *before* the reduction occurs. The logic mirrors the increase scenario, using the delta between current global rates and the position's last recorded rates.
    *   **Apply Payable Fees:** Owed funding fees are deducted from the position's collateral (`position.setCollateralAmount`).
    *   **Accrue Claimable Fees:** Receivable funding fees are added to the position's claimable balance (`PositionUtils.incrementClaimableFundingAmount`).
    *   **Update Position State:** Crucially, the position's internal cumulative rate records (`position.setFundingFeeAmountPerSize`, etc.) are updated to the latest global values *before* the position size is reduced. This ensures fees are settled based on the size held during the relevant period.

**Key Functions Involved:**

*   `MarketUtils.updateFundingState`: Updates the global cumulative funding fee metrics based on elapsed time and current funding rates.
*   `PositionPricingUtils.getPositionFees` (and its internal logic like `getFundingFees`): Calculates the specific funding fees (payable/claimable) for an individual position using the difference between current global cumulative rates and the position's last recorded rates.
*   `MarketUtils.getFundingAmount`: Often used within fee calculations to determine the fee amount based on position size and the rate delta.
*   `position.setCollateralAmount`: Modifies the position's collateral balance, used here to deduct payable funding fees.
*   `PositionUtils.incrementClaimableFundingAmount`: Increases the amount of funding fees accrued by the position that can be claimed.
*   `position.setFundingFeeAmountPerSize` / `setLongTokenClaimableFundingAmountPerSize` / `setShortTokenClaimableFundingAmountPerSize`: Updates the position's internal state to store the latest global cumulative rate values, setting a new baseline for future calculations.

In essence, the funding fee update process ensures that fees are accurately accounted for whenever a position's state changes. It relies on synchronizing a global cumulative rate and then applying the change in that rate since the position's last update to calculate and settle fees for that specific position, updating the position's state afterward.