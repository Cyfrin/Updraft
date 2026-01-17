## Understanding GMX Synthetics Liquidations: The `isPositionLiquidatable` Function

This lesson delves into the core logic that determines when a perpetual futures position becomes eligible for liquidation within the GMX Synthetics protocol. We will examine the `isPositionLiquidatable` function found in the `PositionUtils.sol` smart contract, breaking down the conditions and calculations involved.

### The `isPositionLiquidatable` Function: Gateway to Liquidation

The primary mechanism for checking if a position needs to be liquidated resides in the `isPositionLiquidatable` function.

*   **Location:** `gmx-synthetics/contracts/position/PositionUtils.sol`
*   **Purpose:** This public view function evaluates a specific position against current market conditions and protocol parameters to determine if it meets the criteria for liquidation.
*   **Signature:**
    ```solidity
    // Located in PositionUtils.sol
    // ~Line 307
    function isPositionLiquidatable(
        DataStore dataStore,
        IReferralStorage referralStorage,
        Position.Props memory position,
        Market.Props memory market,
        MarketUtils.MarketPrices memory prices,
        bool shouldValidateMinCollateralUsd // Flag to check against absolute min collateral
    ) public view returns (bool, string memory, IsPositionLiquidatableInfo memory) {
        // ... function body ...
    }
    ```
*   **Output:** While it returns multiple values, the key output for determining liquidation status is the first boolean value. If `true`, the position is liquidatable; if `false`, it is not.

### Core Liquidation Conditions

Within the `isPositionLiquidatable` function, after performing numerous calculations to determine the current state and value of the position, the logic culminates in three specific checks. If any of these conditions are met, the function returns `true`, signaling that the position can be liquidated.

1.  **Absolute Minimum Collateral Check:**
    *   **Concept:** A position can be liquidated if its remaining collateral value in USD drops below a globally configured minimum threshold. This acts as a safety net, preventing positions from existing with negligible collateral value. This check can be bypassed based on the `shouldValidateMinCollateralUsd` input flag.
    *   **Code:**
        ```solidity
        // ~Line 411
        if (shouldValidateMinCollateralUsd) {
            if (info.remainingCollateralUsd < info.minCollateralUsd) {
                return (true, "min collateral", info);
            }
        }
        ```
    *   **Key Variables:**
        *   `info.remainingCollateralUsd`: The calculated USD value of the collateral remaining after accounting for PnL and estimated closing costs (fees, price impact).
        *   `info.minCollateralUsd`: The absolute minimum collateral required in USD, fetched from the `DataStore` contract (specifically `Keys.MIN_COLLATERAL_USD`), set by GMX governance.

2.  **Zero or Negative Collateral Check:**
    *   **Concept:** If, after accounting for PnL and all costs, the calculated remaining collateral is zero or less, the position is insolvent and must be liquidated.
    *   **Code:**
        ```solidity
        // ~Line 416
        if (info.remainingCollateralUsd <= 0) {
            return (true, "< 0", info);
        }
        ```
    *   **Key Variable:**
        *   `info.remainingCollateralUsd`: The net USD value remaining in the position's collateral.

3.  **Leverage-Based Minimum Collateral Check:**
    *   **Concept:** This condition ensures that a position maintains a minimum amount of collateral relative to its size (notional value). It prevents positions from becoming excessively leveraged beyond protocol limits.
    *   **Code:**
        ```solidity
        // ~Line 419
        if (info.remainingCollateralUsd < info.minCollateralUsdForLeverage) {
            return (true, "min collateral for leverage", info);
        }
        ```
    *   **Key Variables:**
        *   `info.remainingCollateralUsd`: The net USD value remaining in the position's collateral.
        *   `info.minCollateralUsdForLeverage`: A dynamic threshold calculated based on the position's size and the market's minimum collateral factor.

### Calculating `minCollateralUsdForLeverage`

The threshold used in the third liquidation condition (`minCollateralUsdForLeverage`) is calculated earlier in the function. It ties the minimum required collateral directly to the position's notional size.

*   **Concept:** This value represents the minimum USD collateral required for the current position size, based on the maximum allowable leverage for the market.
*   **Code:**
    ```solidity
    // ~Line 407
    info.minCollateralUsdForLeverage = Precision.applyFactor(position.sizeInUsd(), cache.minCollateralFactor).toInt256();
    ```
*   **Components:**
    *   `position.sizeInUsd()`: The total notional value of the position in USD (often calculated conceptually as Initial Collateral * Leverage).
    *   `cache.minCollateralFactor`: A factor retrieved via `MarketUtils.getMinCollateralFactor`. This factor typically represents the inverse of the maximum allowed leverage (e.g., 1 / Max Leverage). Applying this factor to the position size determines the minimum collateral required to sustain that size.

### Understanding `remainingCollateralUsd`: The Deciding Factor

All three liquidation conditions rely on the `remainingCollateralUsd` value. Understanding its calculation is crucial.

*   **Concept:** This variable represents the net USD value of the collateral that would remain if the position were closed at the current market prices, after accounting for profits/losses and all associated closing costs.
*   **Code:**
    ```solidity
    // ~Line 396
    info.remainingCollateralUsd = cache.collateralUsd.toInt256() // Current value of collateral in USD
        + cache.positionPnlUsd            // Current PnL of the position in USD
        + cache.priceImpactUsd            // Estimated price impact cost if closed (USD)
        - collateralCostUsd.toInt256();    // Total fees cost in USD
    ```
*   **Calculation:**
    1.  Start with the current USD value of the deposited collateral (`cache.collateralUsd`).
    2.  Add the position's current unrealized profit or loss (`cache.positionPnlUsd`). PnL can be positive or negative.
    3.  Add the estimated negative price impact (slippage cost) of closing the position (`cache.priceImpactUsd`). This is typically a negative value or zero.
    4.  *Subtract* the total estimated fees required to close the position, converted to USD (`collateralCostUsd`).

### Deconstructing `collateralCostUsd`: Total Fees in USD

The total cost of fees, subtracted during the `remainingCollateralUsd` calculation, needs to be converted from the collateral token units into USD.

*   **Concept:** Calculates the USD value of all fees associated with closing the position.
*   **Code:**
    ```solidity
    // ~Line 391
    uint256 collateralCostUsd = fees.totalCostAmount * cache.collateralTokenPrice.min;
    ```
*   **Components:**
    *   `fees.totalCostAmount`: The sum of all applicable closing fees, calculated in the native units of the *collateral token*. This value comes from the `PositionFees` struct.
    *   `cache.collateralTokenPrice.min`: The current minimum oracle price of the collateral token. Using the minimum price provides a conservative (higher) estimate of the fee cost in USD, ensuring sufficient collateral is accounted for.

### Fee Calculation Delegation: `PositionPricingUtils.sol`

The actual computation of the individual fee components that make up `fees.totalCostAmount` is delegated to a different contract/library.

*   **Source of `fees`:** The `fees` variable (type `PositionFees`) used above is populated by calling the `getPositionFees` function from the `PositionPricingUtils` library.
    ```solidity
    // ~Line 386 in PositionUtils.sol
    PositionFees memory fees = PositionPricingUtils.getPositionFees(getPositionFeesParams);
    ```
*   **Location:** `gmx-synthetics/contracts/pricing/PositionPricingUtils.sol`
*   **Function:** `getPositionFees` calculates various fees associated with a position action (in this case, implicitly closing for liquidation check) and returns them in a structured format (`PositionFees`).

### Breakdown of `fees.totalCostAmount`

Inside `PositionPricingUtils.sol`, within the `getPositionFees` function, the `totalCostAmount` (denominated in the collateral token) is calculated as follows:

1.  **Total Cost = Non-Funding Costs + Funding Fee**
    ```solidity
    // ~Line 392 in PositionPricingUtils.sol
    fees.totalCostAmount = fees.totalCostAmountExcludingFunding
                         + fees.funding.fundingFeeAmount;
    ```

2.  **Non-Funding Costs = Sum of Various Fees - Discounts**
    ```solidity
    // ~Line 385 in PositionPricingUtils.sol
    fees.totalCostAmountExcludingFunding = fees.positionFeeAmount       // Closing fee
                                         + fees.borrowing.borrowingFeeAmount // Accrued borrow fee
                                         + fees.liquidation.liquidationFeeAmount // Added during liquidation
                                         + fees.ui.uiFeeAmount             // Optional UI fee
                                         - fees.totalDiscountAmount;     // Referral discounts
    ```
    *   **Included Fees (in collateral token units):**
        *   `positionFeeAmount`: The fee for closing the position.
        *   `borrowingFeeAmount`: Accrued fees for leveraging the position (borrowing from the pool).
        *   `liquidationFeeAmount`: An additional fee applied specifically when a position is being liquidated.
        *   `uiFeeAmount`: An optional fee directed to a referring UI.
        *   `fundingFeeAmount`: Accrued funding fees.
        *   `totalDiscountAmount`: Any applicable discounts (e.g., from referrals) are subtracted.

### Summary of Liquidation Logic

In essence, a position in GMX Synthetics is flagged for liquidation by the `isPositionLiquidatable` function if its potential remaining collateral value (`remainingCollateralUsd`) falls below critical thresholds. This remaining value is carefully calculated as:

`Current Collateral Value (USD) + PnL (USD) + Price Impact (USD) - Total Closing Fees (USD)`

The Total Closing Fees (USD) incorporates the USD value of position closing fees, accrued borrowing fees, funding fees, potential UI fees, and a specific liquidation fee, minus any referral discounts.

This calculated `remainingCollateralUsd` is then compared against three potential floors:
1.  The absolute minimum collateral value defined by governance (`minCollateralUsd`).
2.  Zero.
3.  A dynamic minimum required based on the position's size and market's max leverage (`minCollateralUsdForLeverage`).

If `remainingCollateralUsd` is less than *any* of these applicable thresholds, the function returns `true`, marking the position as liquidatable.