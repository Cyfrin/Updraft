## How to Create a Leveraged Long Position on GMX

This guide provides a step-by-step walkthrough for opening a leveraged long position on the GMX decentralized perpetual exchange, using the ETH/USD market as a practical example.

### Understanding Long Positions

Taking a "long" position means you are speculating that the price of an underlying asset will rise above your entry price. In this example, we will open a long position on ETH/USD, anticipating that the price of Ether (ETH) will increase relative to the US Dollar (USD).

### Initiating the Long Position

1.  **Navigate to Trading:** Access the main trading interface on the GMX platform.
2.  **Select Position Type:** Choose the "Long" tab to indicate you want to profit from a price increase.
3.  **Choose Order Type:** For this guide, we will use a "Market" order. This ensures your position opens immediately at the best currently available market price. Other order types like "Limit" or conditional orders ("TP/SL" - Take Profit / Stop Loss) are available but not covered here.
4.  **Enter Payment Amount:** In the "Pay" field, input the amount and type of token you wish to spend from your connected wallet to fund the position. For this example, we will enter `0.01 ETH`. The interface will typically display the approximate USD value of this amount based on the current market price (e.g., $19.15).

### Selecting Your Collateral

It's crucial to understand the difference between what you "Pay" and what GMX holds as "Collateral In":

*   **"Pay" Field:** Specifies the token and amount deducted from your wallet (e.g., 0.01 ETH).
*   **"Collateral In" Dropdown:** Determines which token GMX will hold internally as collateral for your position.

You have a choice here:

*   **Swap Scenario:** If you pay with ETH but select a different token like `USDC` in the "Collateral In" dropdown, GMX will automatically perform a swap behind the scenes. Your paid ETH will be exchanged for USDC, and that USDC will then be used as collateral.
*   **No Swap Scenario:** If you pay with ETH and select a corresponding asset like `WETH` (Wrapped ETH) as "Collateral In," your paid ETH is simply wrapped into WETH and used directly as collateral. This avoids an extra swap step and potential associated fees or slippage.

For this walkthrough, we will proceed by paying `0.01 ETH` and selecting `WETH` as the "Collateral In," meaning our collateral will be held in Wrapped Ether.

### Applying Leverage

Leverage allows you to open a position with a larger nominal value than the collateral you deposit. While this magnifies potential profits, it equally magnifies potential losses and increases the risk of liquidation.

*   **Leverage Slider:** Use the provided slider or input field to set your desired leverage level. GMX typically offers leverage from 1x up to 100x or more, depending on the asset.
*   **Liquidation Price:** Below the main settings, you'll see the "Liquidation Price." For a long position, if the market price of the asset drops to this level, your position will be automatically closed, and your collateral will be liquidated (sold) to cover the losses.
*   **Risk Impact:** Observe how the Liquidation Price changes as you adjust the leverage slider.
    *   *Lower Leverage (e.g., 1x):* The liquidation price will be significantly lower than your entry price, meaning the price needs to fall substantially before liquidation occurs.
    *   *Higher Leverage (e.g., 50x, 62.5x):* The liquidation price moves much closer to your entry price, indicating a smaller adverse price movement can trigger liquidation.
*   **Example Setting:** For this trade, we will set the leverage to **2.00x**. Notice how the Liquidation Price updates (e.g., to around $1,312 in the example scenario).

### Calculating Position Size

With leverage applied, the total size of your position will be larger than your initial collateral. The interface displays this under the "Long ETH/USD" label (or similar).

*   **Calculation:** Position Size (in USD) is approximately equal to the USD value of your deposited Collateral multiplied by your chosen Leverage.
*   **Example:** With 0.01 ETH collateral (worth ~$19.15) and 2.00x leverage, the resulting Position Size is approximately $38.30 ($19.15 * 2).

### Understanding Pool Dynamics and Associated Fees

GMX utilizes liquidity pools for trading. The specific pool you trade against influences certain fees.

*   **Pool Selection:** You can often choose the specific liquidity pool (e.g., WETH-USDC, WETH-WETH). The default pool is usually displayed. The tokens in the pool name (e.g., WETH and USDC) represent the assets used within that pool to balance long and short exposures.
*   **Open Interest (OI):** Look for the Open Interest figures, often displayed as a percentage split (e.g., "Open Interest (51%/49%)"). This shows the current balance between the total value locked in long positions versus short positions within that specific pool.
    *   *Example (WETH-USDC Pool):* If OI is 51% Long / 49% Short, there is slightly more value betting on ETH price increases than decreases within this pool.
    *   *Example (WETH-WETH Pool):* If OI is 42% Long / 58% Short, there is more value betting on ETH price decreases.
*   **Impact Fees:** These fees (or potential rebates) are applied based on how your trade affects the pool's OI balance.
    *   *Paying Impact Fees:* If you open a position that *increases* the imbalance (i.e., you trade *with* the majority side), you will typically pay an impact fee (displayed as a negative percentage, e.g., -0.10%). In the WETH-USDC pool example (51% Long), opening another Long position increases the long majority, incurring this fee.
    *   *Receiving Rebates:* If your trade helps *balance* the pool (i.e., you trade *against* the majority), you might receive a rebate.
*   **Funding Fees (Net Rate):** These are periodic fees exchanged between long and short positions, determined by the OI imbalance. The side with the larger OI pays the side with the smaller OI to incentivize balance. The rate is usually displayed per hour (e.g., `/ 1h`).
    *   *Paying Funding:* If you are on the side with the *larger* OI, you will pay the funding fee (indicated by a negative rate, e.g., -0.0023%/h in the WETH-USDC pool example where Longs > Shorts).
    *   *Receiving Funding:* If you are on the side with the *smaller* OI, you will receive the funding fee (indicated by a positive rate, e.g., +0.0058%/h in the WETH-WETH pool example where Shorts > Longs; opening a long here would earn funding).

### Reviewing Other Settings and Fees

Before finalizing, review the remaining parameters and estimated costs:

*   **Take Profit / Stop Loss:** While options exist to pre-set price levels for automatically closing your position (either in profit or to limit losses), these are *not* being configured in this basic walkthrough.
*   **Open Fee:** A one-time fee charged by GMX for opening the position. This fee is calculated as a percentage (e.g., 0.060%) of your total *Position Size*, not just your collateral. For our ~$38.30 position size, this fee might be around $0.02.
*   **Network Fee:** An estimate of the blockchain transaction fee (gas cost) required to submit and execute your trade request on-chain (e.g., ~$0.07). This fee goes to network validators/miners, not GMX.

### The Transaction Process

Opening a position on GMX (and most on-chain perpetual platforms) typically involves two distinct transaction steps:

1.  **Order Request Submission:** You submit your desired trade parameters (asset, long/short, collateral, leverage, etc.) to the GMX smart contracts. This requires signing a transaction in your wallet and paying the network fee.
2.  **Trade Execution:** An authorized keeper network monitors submitted requests and executes the trade on the blockchain, using reliable price feeds to determine the exact entry price. This step usually happens automatically shortly after your request is confirmed.

### Executing and Monitoring the Position

1.  **Confirm Trade:** Click the "Long ETH" (or similar) button on the GMX interface.
2.  **Wallet Confirmation:** Your connected wallet (e.g., MetaMask) will prompt you to confirm the initial transaction (the order request). Review the details, including the estimated network fee, and approve it.
3.  **Position Appears:** Once your request transaction is confirmed on the blockchain and the keeper executes the trade, your new position will appear in the "Positions" section of the GMX interface.

Review the details of your active position:

*   **Asset/Pair:** e.g., ETH/USD
*   **Leverage & Direction:** e.g., 2.00x Long
*   **Pool:** e.g., ETH/USD [WETH-USDC]
*   **Size:** Total USD value of the position (e.g., $38.28)
*   **Net Value:** Current estimated value (Collateral +/- Unrealized PnL)
*   **PnL After Fees:** Your current profit or loss, accounting for accrued fees (will start slightly negative due to the open fee).
*   **Collateral:** The amount and type of collateral held (e.g., $19.13 / 0.0099880 WETH).
*   **Entry Price:** The exact price at which your position was opened (e.g., $1,917.50).
*   **Mark Price:** The current real-time market price used for PnL and liquidation checks (e.g., $1,916.24).
*   **Liq. Price:** The calculated liquidation price for this specific position (e.g., $1,312.31).

You have now successfully opened a leveraged long position on GMX. Remember to monitor your position, manage your risk, and understand the ongoing funding fees.