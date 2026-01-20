## Managing and Closing an Unprofitable Leveraged Short Position on GMX

This lesson walks through the process of monitoring and closing an unprofitable leveraged short position on the GMX decentralized exchange. We will observe how market movements affect the position's Profit and Loss (PnL) and the steps involved in closing the trade to manage losses.

**Initial Position Overview**

We begin by examining an open short position on the ETH/USD pair. Here are the key details:

*   **Asset Pair:** ETH/USD
*   **Position Type:** Short (Betting the price will go down)
*   **Leverage:** 1.99x
*   **Liquidity Pool:** ETH/USD [WETH-USDC]
*   **Entry Price:** $1,915.78 (Price when the position was opened)
*   **Mark Price (Current Price):** ~$1,916.10 (Fluctuating)
*   **Position Size:** $38.27 (Total value including leverage)
*   **Collateral:** $19.14 (0.0099920 WETH initially)
*   **Net Value:** ~$19.11 (Collateral adjusted by PnL)
*   **PnL After Fees:** -$0.02 (-0.15%) (Slight unrealized loss)
*   **Liquidation Price:** $3,730.56 (Price at which the position would be automatically closed)

**Understanding the Short Position and Market Dynamics**

A short position aims to profit from a decrease in the asset's price. In this case, the position was opened expecting ETH's price to fall below the entry price of $1,915.78.

However, the current Mark Price is slightly *above* the entry price. Because the market has moved against the short bet (price increased instead of decreased), the position shows a small negative PnL, indicating an unrealized loss. Closing the position at this moment would result in realizing this small loss.

As we continue to monitor, the price of ETH increases further, reaching approximately $1,918 - $1,919. This upward movement further exacerbates the loss on the short position. The PnL deteriorates, moving from -$0.03 to -$0.07, and then to -$0.08 (-0.43%). This clearly demonstrates the core risk of a short position: when the price goes up, the position loses value.

**Executing the Position Closure**

Faced with an increasing unrealized loss due to the adverse price movement, the decision is made to close the position to prevent further losses. The following steps are taken within the GMX interface:

1.  **Initiate Closure:** Click the "Close" button associated with the open ETH/USD short position.
2.  **Configure Closure:** A "Close Short ETH" pop-up window appears.
    *   The default closure type is "Market," meaning the position will be closed at the best available current market price.
    *   "Max" is selected to close the entire position size ($38.27).
    *   The modal provides estimates just before execution:
        *   Estimated Receive Amount: 0.0099278 ETH (This is slightly less than the initial WETH collateral due to the realized loss and fees).
        *   PnL: -$0.08 (-0.43%)
        *   Estimated Execution Price: ~$1,920.80
        *   Fees (Execution): -$0.02
        *   Network Fee (Gas): -$0.08
3.  **Confirm Closure:** Click the final "Close" button within the modal to submit the order.

**Confirmation and Final State**

Once the transaction is processed on the blockchain, confirmation notifications appear:

*   "Decreasing ETH Short: -$38.27" (Confirms closing the specified position size)
*   "Order request sent"
*   "Order executed"

After successful execution, the "Positions" section of the interface updates to show "No open positions," verifying that the trade has been fully closed. The loss of approximately $0.08 (plus fees) has been realized and deducted from the initial collateral.

**Key Concepts Demonstrated**

This process illustrated several important concepts in decentralized leveraged trading:

*   **Short Selling:** Taking a position that profits if the asset price falls.
*   **Leverage:** Using borrowed funds (in this case, nearly 2x) to increase position size, which amplifies both potential profits and losses.
*   **Entry Price vs. Mark Price:** The relationship determining PnL. For shorts, Mark Price > Entry Price results in a loss.
*   **PnL (Profit and Loss):** The running calculation of gain or loss on an open trade.
*   **Collateral:** The capital securing the leveraged position, from which losses are deducted.
*   **Liquidation Price:** The critical price threshold where the platform automatically closes the position to protect the protocol and lender.
*   **Closing a Position:** The act of exiting a trade. For a short, this involves buying back the asset at the current market price.
*   **Fees:** Costs associated with trading, including platform execution fees and blockchain network fees (gas).