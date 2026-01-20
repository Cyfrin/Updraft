## Understanding Trading Fees on GMX Perpetuals

Trading perpetual contracts on platforms like GMX involves several types of fees that impact your overall profitability. Understanding these costs is crucial for effective trading. The fees can be categorized into three main groups: fees incurred when opening a position, fees incurred when closing a position, and ongoing fees for holding an open position.

**Fees for Opening a Position**

When you initiate a trade, such as going Long on ETH, several costs are applied upon execution:

1.  **Price Impact:** Your trade's size relative to the available market liquidity can cause the execution price to differ slightly from the current mark price. On the GMX interface, this is often displayed alongside potential positive slippage under a heading like "Positive Price Impact / Fees" (e.g., `+0.044% / -0.040%`). This component reflects how your trade moves the market price.
2.  **Open Fee:** GMX charges a specific, one-time fee for opening the position. This is typically calculated as a percentage of your total position size (e.g., `0.040% of position size`). The interface usually shows an estimated cost for this fee (e.g., `< -$0.01`).
3.  **Network Fee:** This is the standard blockchain transaction fee (often called gas fee) required to process your trade on the underlying network, such as Arbitrum or Avalanche. This fee is paid to the network validators/miners (e.g., `-$0.07`).

**Fees for Closing a Position**

Closing an open position incurs a similar set of fees as opening one:

1.  **Price Impact:** Similar to opening, closing your position can affect the execution price based on its size and market liquidity at that moment.
2.  **Closing Fee:** A one-time fee is charged for closing the position, typically calculated on the same percentage basis as the opening fee (e.g., 0.040% of position size).
3.  **Network Fee:** A blockchain transaction fee is required to process the closing trade on the network.

**Fees for Maintaining an Open Position (Holding Fees)**

Leveraged positions incur ongoing fees for as long as they remain open:

1.  **Borrowing Fee:** When you use leverage, you are essentially borrowing assets from the platform's liquidity pool (GLP on GMX) to create a larger position than your collateral alone would allow. A borrowing fee is charged periodically (often hourly) for the borrowed assets. This fee compensates the liquidity providers.
2.  **Funding Fee:** This is a crucial component unique to perpetual contracts. It's a periodic payment exchanged directly between traders holding long positions and traders holding short positions. The purpose of the funding fee is to keep the price of the perpetual contract closely anchored to the underlying asset's index price (spot price).
    *   The direction and rate of the funding fee depend heavily on market activity, specifically the skew between the total value of open long positions versus open short positions for that specific market.
    *   The fee rate changes continuously based on these market dynamics.
    *   Importantly, depending on whether you are long or short, and the prevailing market skew, you might either **pay** the funding fee or **receive** it. These payments or receipts directly increase or decrease your position's collateral over time.

The precise calculation mechanisms for Borrowing Fees and Funding Fees can be complex and depend on various real-time market factors. These specific fees will be explored in greater detail in subsequent lessons.