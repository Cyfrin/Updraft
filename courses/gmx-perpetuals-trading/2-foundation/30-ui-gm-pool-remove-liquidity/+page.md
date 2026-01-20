## How to Remove Liquidity (Sell GM Tokens) from a GMX V2 GM Pool

This guide details the process for withdrawing your liquidity provider (LP) position from a GMX V2 Generalized Market (GM) pool by selling your GM tokens. We will use the `ETH/USD [WETH-USDC]` pool as an example.

### Initiating the Liquidity Removal

1.  Navigate to the "Select a GM Pool" section on the GMX interface.
2.  Locate the specific pool from which you wish to remove liquidity. In this example, find the row corresponding to the `ETH/USD [WETH-USDC]` pool.
3.  Click the "Sell" button associated with that pool row to begin the withdrawal process.

### Using the "Sell GM" Interface

Clicking "Sell" opens a dedicated interface titled `GM: ETH/USD [WETH-USDC]`. This interface provides context about the pool and allows you to specify the amount of liquidity you want to remove.

*   **Pool Composition Display:** The interface shows the current breakdown of assets within the pool. For instance, it might display:
    *   Long WETH: 14.827k (representing 50.55% of the pool's value)
    *   Short USDC: 28.128m (representing 49.45% of the pool's value)
*   **Specifying Amount:** To remove your entire position, click the "MAX" button next to the "Pay" input field. This automatically fills the field with your total balance of `GM: ETH/USD` tokens (e.g., `1.3982...` tokens).
*   **Estimated Receive Amounts:** Based on the amount of GM tokens you are selling and the current pool composition, the interface calculates the estimated amounts of the underlying assets you will receive. For example, selling `1.3982...` GM tokens might estimate:
    *   Receive: `~0.957...` USDC
    *   Receive: `~0.000504...` ETH

### Understanding Proportional Withdrawal

A key aspect of removing liquidity from GMX V2 GM pools is the proportional nature of the withdrawal.

*   **No Single-Token Withdrawal:** You cannot choose to receive only one of the underlying assets (e.g., only USDC or only ETH).
*   **Mechanism:** Selling GM tokens always results in receiving *both* constituent assets of the market (WETH and USDC in this case).
*   **Proportional Ratio:** The amount of each token you receive is directly proportional to the current weighting of those assets within the pool at the moment you initiate the withdrawal. If the pool is 50.55% WETH and 49.45% USDC by value, your withdrawn assets will reflect this ratio.

### Reviewing Fees

Several fees are associated with removing liquidity:

*   **Sell Fee:** A protocol fee charged for the action of selling GM tokens. This is typically a small percentage of the total value being withdrawn (e.g., 0.069%, potentially amounting to `<$0.01` on a small withdrawal).
*   **Fees and Price Impact:** This line item often combines the Sell Fee with any potential price impact/slippage cost.
*   **Network Fee:** The standard blockchain transaction fee (gas cost) required to process your transaction on the network (e.g., Arbitrum One). This fee pays the network validators (e.g., ~$0.04).

### Why Price Impact is Negligible

You might notice that the "Price Impact" component is zero or very close to it when removing liquidity, unlike when performing a swap.

*   **Reason:** Price impact occurs when an action changes the relative balance of assets in a pool, thus shifting the price. Because you are withdrawing assets *in proportion* to their existing weights in the pool (e.g., taking out WETH and USDC according to the ~50.5% / ~49.5% ratio), you are not altering the pool's relative balance or price curve.
*   **Example:** If you held $100 worth of GM tokens for this pool (50.55% WETH / 49.45% USDC), removing all liquidity would yield approximately $50.55 worth of WETH and $49.45 worth of USDC. Since the withdrawal mirrors the pool's composition, there is no associated price impact cost.

### The Two-Transaction Process

Removing liquidity (selling GM tokens) on GMX V2 typically involves two distinct blockchain transactions managed by the protocol:

1.  **Create Order:** Your initial action sends a request to the GMX system to sell your GM tokens. This creates the sell order.
2.  **Execute Order:** GMX's backend systems (keepers) then process this request and execute the order, performing the actual exchange of your GM tokens for the underlying pool assets.

This two-step mechanism helps manage transaction execution and gas costs effectively.

### Executing and Confirming the Transaction

1.  After reviewing the details and fees on the "Sell GM" interface, click the "Sell GM" button.
2.  Your connected wallet (e.g., MetaMask) will prompt you to confirm the transaction. Review the estimated gas fee.
3.  Click "Confirm" in your wallet to approve the first transaction (Create Order).

### Verifying Successful Removal

Once both transactions are processed by the network and GMX keepers:

1.  **Notifications:** The GMX interface will typically display success notifications, such as "Sell request sent" followed by "Sell order executed."
2.  **GM Token Balance Update:** Your balance of the specific GM tokens (`GM: ETH/USD` in this case) shown in the GMX interface will update to `0.0000`.
3.  **Wallet Balance Update:** Your wallet balances for the received assets (USDC and WETH) will increase accordingly.
4.  **Pool List Verification:** Navigate back to the main "Earn" page and view the "Select a GM Pool" list. The "Wallet" column for the `ETH/USD [WETH-USDC]` pool should now show `-` or `0`, confirming that you no longer hold GM tokens for this pool and the liquidity removal was successful.