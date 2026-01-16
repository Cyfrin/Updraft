## Determining Collateral Liquidation Amounts in DeFi

When a borrower's position in a DeFi lending protocol becomes undercollateralized, a liquidation event is triggered. A critical aspect of this process is determining precisely how much of the borrower's collateral is seized. This lesson breaks down the mechanics behind this calculation, including the core equation and the role of liquidation bonuses and protocol fees.

## The Core Equation: Matching Debt Value to Collateral Value

The fundamental principle in calculating the amount of collateral to liquidate is to ensure that the U.S. dollar (USD) value of the debt being repaid by the liquidator matches the USD value of the collateral being seized from the borrower (before accounting for any bonuses).

This relationship is expressed by the following equation:

`debt to cover * debt price = collateral to liquidate * collateral price`

Let's define each component:

*   **Debt to cover:** This is the quantity of the borrowed asset that the liquidator is repaying on behalf of the unhealthy position. For example, if a user borrowed DAI, this would be the amount of DAI being repaid.
*   **Debt price:** This is the current market price of the borrowed asset, expressed in USD. For example, if DAI is the debt, its price is typically $1.
*   **Collateral to liquidate:** This is the quantity of the collateral asset that will be taken from the borrower and given to the liquidator (or partly to the protocol). This is the variable we often need to solve for.
*   **Collateral price:** This is the current market price of the collateral asset, expressed in USD. For example, if ETH is the collateral, this would be the current USD price of ETH.

Within the smart contract code of DeFi protocols, this equation is typically rearranged to directly solve for the "collateral to liquidate":

`collateral to liquidate = (debt to cover * debt price) / collateral price`

Understanding this basic formula is key to grasping how protocols determine the initial amount of collateral required to cover the portion of debt being liquidated.

## Incorporating Liquidation Bonuses and Protocol Fees

The actual amount of collateral taken from the borrower often exceeds the amount strictly necessary to cover the repaid debt. This is because protocols incentivize liquidators and may also collect a fee. The "total collateral to liquidate" can be visualized as comprising three distinct parts:

1.  **Collateral to Cover Debt:** This is the base amount calculated using the core equation described above. Its value directly corresponds to the value of the debt being repaid by the liquidator.
2.  **Liquidation Bonus:** To incentivize third-party liquidators to monitor and close unhealthy positions, protocols offer a bonus. This bonus is an additional amount of collateral awarded to the liquidator, calculated as a percentage of the "collateral to cover debt."
    *   For instance, if the "collateral to cover debt" is determined to be 1 ETH and the liquidation bonus is 5%, the liquidator is entitled to an additional 0.05 ETH (5% of 1 ETH).
3.  **Protocol Fee:** Often, a portion of the liquidation bonus is retained by the protocol itself as a fee. This fee is effectively subtracted from the gross liquidation bonus that would otherwise go entirely to the liquidator.

Therefore, the borrower loses collateral equivalent to the debt covered, plus the full bonus amount, part of which then goes to the protocol.

## Distribution of Seized Collateral

Following a liquidation event, the seized collateral is distributed as follows:

*   The **liquidator** receives:
    *   The "collateral to cover debt."
    *   The "liquidation bonus," *after* the protocol fee has been deducted from it.
*   The **protocol** (or its treasury/DAO) receives:
    *   The "protocol fee," which is a portion of the liquidation bonus.

## Example: Calculating Total Collateral Seized

Let's walk through a simplified scenario:

1.  **Collateral to Cover Debt:** Assume, after applying the core formula, that 1 ETH worth of collateral is needed to cover the portion of debt being repaid.
2.  **Liquidation Bonus:** If the protocol offers a 5% liquidation bonus, this amounts to an additional 0.05 ETH (5% of 1 ETH).
3.  **Total Collateral (Before Protocol Fee Deduction from Bonus):** The sum is 1 ETH (for debt coverage) + 0.05 ETH (for bonus) = 1.05 ETH. This is the total amount of collateral taken from the borrower.
4.  **Protocol Fee:** A specific portion of the 0.05 ETH bonus is designated as the protocol fee. For example, if the protocol takes 10% of the bonus as its fee, then 0.005 ETH (10% of 0.05 ETH) goes to the protocol.
    *   The liquidator would then receive 1 ETH + (0.05 ETH - 0.005 ETH) = 1.045 ETH.
    *   The protocol would receive 0.005 ETH.
    *   The borrower loses a total of 1.05 ETH.

## Edge Case: Insufficient Collateral for the Full Bonus

A critical edge case arises when a borrower's total available collateral is less than the sum of the "collateral to cover debt" and the full "liquidation bonus" that would typically be applied.

Consider this scenario:

*   User's total available collateral: 1 ETH.
*   Calculated "collateral to cover debt" (based on the debt portion being liquidated): 1 ETH.
*   Liquidation bonus percentage: 5%.

If we strictly calculate the bonus on the 1 ETH "collateral to cover debt," the total collateral needed would be 1.05 ETH (1 ETH + 0.05 ETH). However, the user only possesses 1 ETH.

In such situations, the protocol's priority is typically to liquidate *all* of the user's available collateral while still providing an incentive to the liquidator. The mechanism to achieve this involves ensuring the total collateral seized does not exceed what the user has. This might mean that the actual amount of "debt to cover" by the liquidator is slightly reduced, such that the value of the user's total available collateral (1 ETH in this example) is sufficient to cover this adjusted (slightly smaller) debt repayment *plus* a liquidation bonus. The key is that the liquidator is still incentivized, and the unhealthy position is maximally cleared of its collateral.

## Summary: Key Components of Liquidated Collateral

In summary, the total collateral liquidated from a borrower in a DeFi protocol is a composite figure. It starts with the foundational calculation of collateral needed to match the value of the debt being covered. To this, a liquidation bonus is added to incentivize liquidators. Finally, a portion of this bonus is often directed to the protocol as a fee. Understanding these components and their interplay is crucial for comprehending the full impact of liquidation events in DeFi lending markets.