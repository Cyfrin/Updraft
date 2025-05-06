## Understanding GMX V2 GM Pool Liquidity Fees

GMX V2 introduces GM (GMX Market) tokens, which represent shares in specific liquidity pools. These tokens allow holders to gain exposure to the underlying assets (like WETH and USDC in the ETH/USD pool example) and automatically accrue fees generated from leverage trading and swaps within that market. Providing liquidity involves depositing assets to buy GM tokens, and exiting involves selling GM tokens to withdraw the underlying assets. Both actions incur specific fees. This lesson breaks down the costs associated with depositing and withdrawing liquidity from a GMX V2 GM pool, using the GM: ETH/USD [WETH-USDC] pool as an example.

## Fees for Depositing Liquidity (Buying GM Tokens)

When you deposit assets into a GMX V2 GM pool to acquire GM tokens, you will encounter several potential fees. These are outlined below based on an example deposit of WETH and USDC:

*   **Price Impact:** This fee quantifies how much your specific deposit transaction affects the price of assets within the pool relative to the current market price. Larger deposits relative to the pool's depth generally result in higher price impact. In the example transaction ($40.20 total value), the price impact was minimal (less than -$0.01, or 0.001% of the buy amount). This is often bundled visually with other fees in the interface.
*   **Buy Fee (One-time Deposit Fee):** GMX charges a specific, one-time percentage-based fee for the service of minting new GM tokens when you deposit liquidity. In the provided example, this fee was 0.070% of the total deposit amount, equating to -$0.03.
*   **Network Fee (Execution Fee):** This is the standard transaction fee required by the underlying blockchain network (e.g., Arbitrum) to process and confirm your deposit transaction. It is paid to network validators/miners, not to GMX itself. The GMX interface clarifies: "Maximum network fee paid to the network. This fee is a blockchain cost not specific to GMX, and it does not impact your collateral." In the example, this was estimated at -$0.05.
*   **UI Fee:** Although not always explicitly itemized in the main fee breakdown section, a separate UI fee may also apply when using the official GMX user interface to perform the transaction.

Therefore, the total cost of depositing includes the Price Impact, the Buy Fee, the Network Fee, and potentially a UI Fee.

## Fees for Withdrawing Liquidity (Selling GM Tokens)

Similarly, when you decide to withdraw your liquidity by selling your GM tokens back to the pool, certain fees apply. Based on an example withdrawal of GM tokens ($40.20 value):

*   **Sell Fee (One-time Withdrawal Fee):** GMX charges a one-time, percentage-based fee for redeeming (burning) GM tokens when you withdraw your liquidity. Similar to the Buy Fee, the example showed this fee was 0.070% of the total withdrawal amount, resulting in a cost of -$0.03.
*   **Network Fee (Execution Fee):** Just like depositing, withdrawing liquidity requires a blockchain transaction, which incurs a network fee paid to the blockchain validators/miners. This fee is external to GMX. The tooltip explanation remains the same as for depositing. In the withdrawal example, this was estimated at -$0.05.
*   **Price Impact:** Notably, in the specific withdrawal example observed, a separate "Price Impact" line item was *not* displayed in the fee breakdown. The total "Fees and Price Impact" shown (-$0.03) directly corresponded only to the Sell Fee, suggesting price impact was negligible or not applied as a separate charge in this instance for withdrawal.
*   **UI Fee:** As with depositing, using the GMX user interface for withdrawal likely incurs a UI fee.

In summary, withdrawing liquidity typically involves paying the Sell Fee, the Network Fee, and potentially a UI Fee. Based on the example, a distinct Price Impact fee wasn't itemized for the withdrawal process shown.