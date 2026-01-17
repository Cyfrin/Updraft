## Executing a Precise Trade: Using GMX V2 Limit Swaps

This lesson explains how to use the Limit Swap feature on the GMX V2 platform. Unlike a standard Market Swap, which executes immediately at the current market price, a Limit Swap allows you to set a specific price condition for your trade to occur. We'll walk through an example where we want to swap USDC back into ETH, but only if the price of ETH drops to a desired level.

### Understanding Limit Swaps vs. Market Swaps

Before proceeding, let's clarify the difference. A **Market Swap** is executed instantly at the best available price GMX can find at that moment. It prioritizes speed of execution.

A **Limit Swap**, however, lets you define a target price.
*   If you are **buying** an asset (like buying ETH with USDC), you set a **Limit Price** representing the *maximum* price you're willing to pay. Your swap will only execute if the market price of the asset drops to your Limit Price *or lower*.
*   If you are **selling** an asset, you set a Limit Price representing the *minimum* price you're willing to accept. Your swap would only execute if the market price rises to your Limit Price *or higher*.

This gives you more control over your entry or exit price but doesn't guarantee execution if the market never reaches your specified level.

### Setting Up a Limit Buy Order for ETH

Let's assume we previously swapped some ETH for USDC and now want to swap that USDC back into ETH, anticipating a potential dip in ETH's price.

1.  **Navigate to GMX V2:** Go to the GMX platform and access the V2 interface. Select the "Swap" functionality.
2.  **Choose Order Type:** Ensure the "Limit" tab is selected, not "Market".
3.  **Select Assets:**
    *   In the "Pay" field, select USDC and enter the amount you wish to swap (e.g., 1.909169 USDC).
    *   In the "Receive" field, select ETH. The interface will estimate the amount of ETH you might receive.
4.  **Check the Market Price:** Observe the current "Mark Price" displayed on the interface. This is GMX's reference price for ETH/USD, aggregated from various exchanges. Let's say it's currently fluctuating around 1915-1916 USDC per ETH.
5.  **Define Your Limit Price:** Since we are buying ETH and want a better price than the current market, we need to set a Limit Price *below* the current Mark Price. For example, if the Mark Price is ~1915 USDC, we might decide we only want to buy if the price drops to 1913 USDC per ETH or lower. Enter `1913` into the "Price" field (ensuring it's set per ETH in terms of USDC).
6.  **Review the Order:** Double-check your inputs: paying USDC, receiving ETH, the amount, and the specified Limit Price (1913 USDC per ETH).
7.  **Create the Order:** Click the "Create Trigger order" button.

### Creating the Order on the Blockchain

After clicking "Create Trigger order", your connected wallet (e.g., MetaMask) will prompt you to confirm a transaction. This transaction doesn't execute the swap itself; instead, it registers your limit order instructions with the GMX smart contracts on the blockchain (e.g., Arbitrum).

*   **Action:** This transaction typically involves interacting with the GMX contract to set up the order parameters (assets, amounts, limit price).
*   **Collateral:** It also transfers the asset you are paying (USDC in our example) from your wallet to the GMX protocol. This USDC is held by GMX as collateral, ready to be used if your order triggers. You might notice your USDC balance temporarily decrease or show as insufficient in the GMX interface immediately after submitting the transaction, as these funds are now committed to the pending order.
*   **Gas Fees:** You will pay network gas fees for this creation transaction.

You can view this transaction on a block explorer like Arbiscan. You would see the transfer of your USDC to GMX and the interaction with the GMX contract.

### Order Execution: The GMX Keepers

Your limit order is now active and waiting for the price condition to be met. You don't need to do anything further or stay online. GMX uses automated systems called "Keepers" to monitor market prices (specifically, the Mark Price).

*   **Monitoring:** Keepers constantly check the Mark Price against all active limit orders.
*   **Triggering:** If the Mark Price for ETH/USD drops to or below your specified Limit Price (1913 USDC in our example), a Keeper will trigger the execution of your order.
*   **Execution Transaction:** The Keeper initiates a *second* blockchain transaction to perform the actual swap. This transaction uses the USDC collateral you provided earlier to buy ETH at the prevailing market price (which, at the moment of triggering, meets your limit condition). The resulting ETH (or WETH - Wrapped Ether) is then sent directly to your wallet.
*   **Gas Fees:** The gas fees for this *execution* transaction are typically covered by the GMX system or incorporated into the overall transaction economics, not directly paid by you at the time of execution.

You can also find this execution transaction on a block explorer. Key details would include:
*   The transaction being initiated by an authorized GMX Keeper address.
*   The function called (e.g., `Execute Order`).
*   The transfer of the received asset (ETH/WETH) *to* your wallet.

### Summary: The Power of Limit Orders

By using a GMX Limit Swap, we successfully set up an order to buy ETH with USDC, but only if the ETH price reached our desired level of 1913 USDC or lower. The process involved two main steps on the blockchain:
1.  **Order Creation:** Initiated by the user, setting the conditions and locking the collateral (USDC).
2.  **Order Execution:** Initiated by a GMX Keeper when the price condition was met, performing the swap and sending the resulting asset (ETH) to the user.

Limit orders provide a powerful way to automate trading strategies and enter or exit positions at specific price points without needing constant market monitoring, leveraging the decentralized infrastructure of GMX.