## How to Open a Short Position on GMX

This guide walks you through the process of initiating a short position on the GMX decentralized perpetual exchange, specifically targeting the ETH/USD market. Opening a short position means you are betting that the price of the underlying asset (in this case, ETH) will decrease relative to the quote asset (USD). We will use a Market order for immediate execution.

**1. Selecting the Order Type**

Navigate to the trading panel, typically located on the right side of the GMX interface.

*   Ensure the **"Short"** tab is selected. This indicates your intention to profit from a price decrease.
*   Verify that the order type is set to **"Market"**. A market order executes your trade immediately at the best currently available price on the platform. While other order types like Limit, Take Profit/Stop Loss (TP/SL), and Stop Market are available, we will focus on the Market order for this example.

**2. Configuring Your Trade Parameters**

Next, define the specifics of your short position:

*   **Pay (Collateral Amount):** In the "Pay" field, enter the amount of cryptocurrency you wish to use as collateral for this position. For this example, we will use `0.01 ETH`. The interface will display the approximate USD value of this collateral (e.g., `$19.15`).
*   **Collateral In (Collateral Asset):** This setting is crucial. It determines which asset backs your position.
    *   Since we are paying with ETH and want to use that ETH directly as collateral, select **"WETH"** (Wrapped ETH).
    *   *Important Note:* If you were to select "USDC" here while paying with ETH, GMX would first automatically swap your `0.01 ETH` into USDC, and that USDC would then serve as your collateral. Choose the asset that matches what you intend to use for collateralization.
*   **Leverage:** Use the leverage slider to choose your desired magnification level. For this example, select **2.00x leverage**.
*   **Position Size Calculation:** GMX automatically calculates the total size of your short position based on your collateral and chosen leverage. The formula is:
    *   `Position Size = (USD Value of Collateral) * Leverage`
    *   Using our example: `$19.15 * 2.00x = $38.30`. This calculated value will be displayed, indicating the total USD value of the short position you are opening.

**3. Understanding Key Pre-Trade Metrics**

Before executing, review the important metrics displayed:

*   **Liquidation Price:** This is the price threshold at which your position will be automatically closed by GMX to prevent losses exceeding your deposited collateral.
    *   *Behavior for Short Positions:* Unlike long positions where the liquidation price starts below entry and moves up with leverage, for short positions, the liquidation price starts *significantly above* the current market price. As you *increase* leverage on a short position, the liquidation price *decreases*, moving closer to your entry price from above. If the market price rises and hits this liquidation price, your position is liquidated. You can observe this effect by temporarily adjusting the leverage slider.
*   **Price Impact / Fees:** This section shows potential adjustments to your entry price and the fees associated with opening the position.
    *   *Price Impact:* You might see a positive percentage here (e.g., `+0.036%`). This occurs when the total value of open long positions (Long Open Interest or OI) is higher than the total value of open short positions (Short OI). By opening a short position, you help balance this OI. GMX incentivizes balancing trades by offering a slight price improvement (a rebate), effectively lowering your entry cost. Conversely, if your trade were to increase the imbalance, you would incur a small fee (negative price impact or slippage).
    *   *Open Fee:* This is a standard fee charged for opening any position, calculated as a percentage of your total position size (e.g., `-0.040%`, resulting in a fee like `-$0.01`).
    *   *Network Fee:* This is the estimated cost (gas fee) to execute the transaction on the underlying blockchain (e.g., Arbitrum One). GMX submits your trade request to the blockchain, and you pay the associated gas. This estimate is often slightly higher than the actual cost, and any unused portion is typically refunded to your wallet.

**4. Executing the Short Position**

Once you have reviewed and confirmed all parameters:

*   Click the **"Short ETH"** button.
*   Your connected wallet (e.g., Metamask) will prompt you to confirm the transaction. Review the details, including the estimated network fee, and approve the transaction.
*   GMX will display confirmation messages on the interface, such as "Increasing ETH Short: +$38.30", "Order request sent", and finally, "Order executed".

**5. Viewing Your Open Position**

After successful execution, your new short position will appear in the **"Positions"** tab, usually located at the bottom of the GMX interface. Here you can monitor its status, including:

*   **Pool:** The market pair (e.g., ETH/USD [WETH-USDC]).
*   **Size:** The total leveraged size of your position (e.g., $38.30).
*   **Net Value:** The current value of your collateral, considering profits or losses.
*   **PnL After Fees:** Your current profit or loss, accounting for fees and funding rates. It might start slightly positive due to a price impact rebate.
*   **Collateral:** The amount and type of collateral backing the position (e.g., $19.13 / 0.00999 WETH).
*   **Entry Price:** The price at which your short position was opened.
*   **Mark Price:** The current real-time market price used for PnL and liquidation calculations.
*   **Liq. Price:** The calculated liquidation price for your specific position.

You have now successfully opened a leveraged short position on GMX. Remember that leveraged trading involves significant risk, including the potential loss of your entire collateral if the market moves against your position and reaches the liquidation price.