## Reviewing Your Open Leveraged Position

Before taking any action, it's essential to understand the current state of your open position. Let's examine a sample scenario involving a leveraged long position on Ethereum (ETH).

In this example, the trader holds an **ETH/USD 2.00x Long** position. This means they are betting on the price of ETH increasing relative to USD, and their exposure is twice the value of their deposited collateral.

Key details visible on the trading platform interface include:

*   **Collateral:** The asset deposited to secure the position is WETH (Wrapped Ethereum).
*   **Pool:** The specific liquidity pool being used is ETH/USD [WETH-USDC].
*   **Size:** The total value of the position is $38.28. This includes the collateral and the borrowed funds due to leverage.
*   **Net Value:** This represents the current equity in the position, fluctuating around $19.09. It's roughly the collateral value adjusted by the unrealized Profit and Loss (PNL).
*   **Collateral Value:** The current market value of the deposited WETH, approximately $19.13 (equivalent to 0.0099880 WETH).
*   **Entry Price:** The price of ETH/USD when the position was opened: $1,917.50.
*   **Mark Price:** The current estimated fair market price of ETH/USD, used for PNL and liquidation calculations. It's fluctuating around $1,916.00.
*   **Liq. Price (Liquidation Price):** The critical price threshold. If the Mark Price drops to $1,312.31, the position will be automatically closed (liquidated) to prevent further losses exceeding the collateral.
*   **PNL After Fees:** The current unrealized profit or loss, accounting for accrued fees. In this instance, it shows approximately -$0.05 (-0.28%).

This negative PNL indicates that if the position were closed immediately, the trader would realize a small loss of about 5 cents.

## Understanding PNL and Market Timing

The Profit and Loss (PNL) figure is negative because the trader entered a *long* position (expecting the price to rise) at an Entry Price of $1,917.50. However, the current Mark Price is lower, around $1,916.00. Since the price has moved *against* the direction of the trade, the position shows an unrealized loss.

Observing the price chart might reveal short-term fluctuations. A trader might decide to wait momentarily, hoping for a price increase that could turn the PNL positive before closing. However, if the price doesn't recover sufficiently, the decision might be made to close the position at a small loss to prevent potentially larger losses or simply to exit the trade.

## Managing Collateral and Risk

Even without closing the position entirely, platforms often provide tools to manage risk actively. The "Edit Collateral" feature is a prime example.

*   **Depositing Collateral:** By adding more WETH (or the required collateral asset) to the open position:
    *   The effective leverage decreases (since the collateral base is larger relative to the position size).
    *   The Liquidation Price moves lower (further away from the current Mark Price), reducing the immediate risk of liquidation.
*   **Withdrawaling Collateral:** By removing some WETH from the position (only possible if sufficient equity exists):
    *   The effective leverage increases.
    *   The Liquidation Price moves higher (closer to the current Mark Price), increasing the risk of liquidation.

Using "Edit Collateral" allows traders to adjust their risk exposure based on market conditions or their changing risk tolerance without needing to fully close and reopen a position.

## Initiating the Position Close Process

To begin closing the trade, locate and select the "Close" option associated with the specific position. This typically opens a confirmation modal window, such as "Close Long ETH".

Within this modal, you specify how much of the position you wish to close. Selecting "MAX" indicates the intention to close the entire position size ($38.28 in this case).

## Understanding Close Options: Receiving Your Funds

The closing modal presents options for which token you receive back after the position is closed.

*   **Default Option (Collateral Token):** By default, the platform usually assumes you want to receive back the original collateral asset you deposited. In this scenario, that's WETH. The interface will show an estimated amount of WETH you'll receive (e.g., 0.00996 WETH, worth roughly $19.07), reflecting the initial collateral minus the realized PNL and all associated fees.
*   **Alternative Receive Token (e.g., USDC):** Many platforms allow you to select a different token to receive upon closing. For instance, you could search for and select USDC. If you choose an alternative token:
    1.  The platform first closes the long position, calculating the amount of WETH collateral to be returned.
    2.  It then automatically executes a **market swap** from that returned WETH into your selected token (USDC).
    *   **Important:** This secondary swap incurs additional swap fees and potential slippage, which will be reflected in the final amount received and the displayed fee breakdown ("Fees (Incl. Swap)").

For simplicity or if you prefer holding the original collateral asset, sticking with the default option (WETH) avoids the extra swap step and its associated costs.

## Analyzing Fees Associated with Closing a Position

Closing a position on a decentralized trading platform involves several types of fees that are deducted from your returned collateral. Understanding these is crucial for accurate profit/loss calculation.

*   **Network Fee:** Interacting with a decentralized exchange requires submitting transactions to the underlying blockchain (e.g., Ethereum, Arbitrum). Closing a position typically involves *two* separate blockchain transactions:
    1.  One transaction to *request* the closure order.
    2.  A second transaction for the platform's keepers or system to *execute* that order.
    Each transaction consumes gas, resulting in a Network Fee (e.g., -$0.07 in this example). This fee compensates blockchain validators/miners.
*   **Borrow Fee:** This is an ongoing fee accrued for the duration the position is open (e.g., `< -$0.01` accrued for this short duration). You pay this fee because leveraging involves borrowing assets from the platform's liquidity pool (managed by Liquidity Providers or LPs). The borrow fee compensates these LPs for providing the capital that enables leverage. It accrues continuously and incentivizes traders to not hold positions open indefinitely without cost, promoting market activity.
*   **Funding Fee:** This is a periodic fee exchanged between long and short position holders (e.g., `< -$0.01` accrued here). Its purpose is to keep the perpetual contract's price aligned with the underlying asset's index (spot) price. The direction of payment depends on the **Open Interest (OI)** imbalance:
    *   If there are more open long positions than short positions (Long OI > Short OI), longs pay shorts.
    *   If Short OI > Long OI, shorts pay longs.
    In this example, since long OI was higher, the long position holder paid a small funding fee.
*   **Close Fee:** A one-time fee charged specifically for the act of closing the position. This is often calculated as a percentage of the total position size (e.g., -$0.01, explicitly stated as 0.039% of the $38.28 position size).

These fees (Borrow, Funding, Close) are deducted directly from the collateral being returned, in addition to the blockchain Network Fees paid separately via your wallet.

## Finalizing the Position Closure

Once you have reviewed the closing details, the estimated received amount, and the fee breakdown in the confirmation modal, you proceed by clicking the final "Close" button.

This action will typically trigger a prompt from your connected web3 wallet (like MetaMask) asking you to approve the necessary blockchain transaction(s).

After confirming in your wallet, the platform's interface will usually display status updates, such as:

*   "Decreasing ETH Long: -$38.28"
*   "Order request sent"
*   "Fulfilling order request"
*   "Order executed"

Upon successful execution, the position will disappear from the list of open positions, confirming that the trade has been closed and the net proceeds (minus fees and PNL) have been returned to your wallet or are available within the platform balance in the chosen "Receive" token.