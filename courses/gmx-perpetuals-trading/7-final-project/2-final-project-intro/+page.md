## Implementing a Delta-Neutral Funding Fee Farming Strategy on Perpetuals

This lesson outlines the core strategy for the final project: building a vault designed to systematically earn funding fees from a decentralized perpetuals exchange. The strategy focuses on creating a position that is neutral to price movements, allowing the capture of yield primarily through funding payments.

### The Core Funding Fee Farming Strategy

The specific strategy we will implement involves **shorting Ethereum (ETH) while simultaneously using ETH as the collateral for that short position**. This approach is designed to isolate funding fees as the main source of potential profit.

### Understanding the Payoff: Achieving Price Neutrality

Recall our previous analysis of payoff diagrams for perpetual positions. While standard long or short positions with stablecoin collateral result in payoffs sensitive to price changes, a unique situation arises when shorting an asset using that same asset as collateral.

Specifically, when you short ETH using ETH as collateral, the resulting payoff profile becomes essentially a **flat line**. This means that whether the price of ETH increases or decreases, the value of your position, measured relative to your initial ETH collateral, remains largely unchanged. Your position is **price-neutral**, often referred to as **delta-neutral**.

Because the position's value isn't significantly affected by ETH price fluctuations, this strategy is not about speculating on market direction. Instead, it targets a different source of yield available in perpetual futures markets.

### The Profit Engine: Capturing Funding Fees

The primary goal of this delta-neutral strategy is to earn **funding fees**. Funding fees are periodic payments exchanged between long and short positions on perpetual contracts. They serve as a mechanism to keep the perpetual contract's price aligned with the underlying asset's spot price.

Crucially, **short positions receive funding fees when the open interest on the long side exceeds the open interest on the short side**. In this market condition, longs pay shorts.

Our vault's objective is to enter and maintain the price-neutral "short ETH with ETH collateral" position *specifically during periods when these funding fees are positive for shorts* (i.e., when longs are paying shorts). This isolates the funding fee as the intended yield stream.

### Practical Execution Example

Let's illustrate how this strategy is executed on a typical decentralized perpetuals exchange interface (similar to GMX):

1.  **Entry Condition:** The primary condition for initiating the strategy is when the funding rate favors shorts (e.g., total long open interest is greater than total short open interest). Wait for this condition to be met.
2.  **Select Position Type:** Navigate to the trading interface and select the **Short** option.
3.  **Specify Collateral ("Pay"):** Deposit **ETH** as your collateral. For example, you might deposit `0.01 ETH`.
4.  **Define Position Size ("Short"):** Enter the size of the ETH/USD short position you wish to open.
5.  **Set Leverage:** Crucially, set the leverage to **1x**. This ensures the value of your short position closely matches the value of your ETH collateral, which is essential for achieving the desired price-neutral payoff.
6.  **Confirm Collateral Asset:** Double-check that the collateral type selected is indeed **WETH** (Wrapped ETH) or the native ETH representation used by the specific exchange.

Executing these steps correctly establishes the delta-neutral short position. The value of your position (in ETH terms) should remain stable regardless of ETH price movements.

### Claiming Profits and Important Cost Considerations

Over time, assuming the funding rate remains positive for shorts, funding fees will accrue to your position. These earned fees typically become visible and claimable within the exchange's interface, often listed under your open positions as "Accrued Funding Fees" or similar.

However, it's vital to understand that the gross funding fee earned is not the net profit. Several other costs impact the overall profitability (P&L) of the strategy:

*   **Borrowing Fees:** When shorting, you are effectively borrowing the asset (ETH in this case, often from a liquidity pool like GLP on GMX). Fees are charged for this borrowing, typically based on utilization rates.
*   **Price Impact Fees:** Opening and closing positions, especially larger ones, can slightly move the price within the exchange's liquidity pool. This slippage incurs a price impact fee.

For the vault strategy to be truly profitable, the **accumulated positive funding fees received must exceed the sum of the borrowing fees and any price impact fees** incurred during the position's lifetime. Careful monitoring of all associated costs is essential.

### Summary: The Vault's Task

Your project involves building a system – the vault – that automates or systematically manages this delta-neutral strategy. The vault should aim to:

1.  Identify periods when funding rates favor short positions (longs pay shorts).
2.  Open a 1x leveraged short ETH position using ETH as collateral.
3.  Monitor the position and accrued fees.
4.  Account for borrowing and price impact costs to assess net profitability.
5.  Potentially manage position closing when conditions are no longer favorable.