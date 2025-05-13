## Understanding Market Swaps on GMX

This lesson explores the "Swap" functionality on the GMX decentralized exchange, focusing specifically on "Market Swaps." We'll examine how to perform these swaps through the user interface and delve into the underlying protocol mechanics, including market pools, associated fees, and the transaction execution process.

### GMX Trading Interface Context

When you navigate to the "Trade" page on the GMX application for a specific market, such as ETH/USD, you'll encounter several key terms:

*   **Index Token:** The primary asset whose price is being tracked (e.g., ETH).
*   **Long Token:** The token representing a long position on the index token (e.g., WETH - Wrapped Ether).
*   **Short Token:** The token representing a short position or used as collateral (e.g., USDC - USD Coin). The market pair is often displayed combining these, like `[WETH-USDC]`.
*   **Price Chart:** Visualizes the price movement of the index token relative to the short token (e.g., ETH price in USD).

GMX offers three main actions on the Trade page: Long, Short, and Swap. We will focus on the Swap function here.

### Market Swaps vs. Limit Swaps

Under the "Swap" tab, you can exchange one token for another. GMX provides two primary swap types:

1.  **Market Swap:** This executes your swap immediately at the best available market price determined by the GMX protocol at that moment. It's similar to placing a market order on a centralized exchange (CEX) or performing a standard swap on other decentralized exchanges (DEXs).
2.  **Limit Swap:** This option (visible as a separate tab) allows you to specify a target price. The swap will only execute if the market reaches your desired price level. (Limit swaps are not covered in detail in this lesson).

### The Role of Market Pools (GM Pools)

Swaps on GMX don't happen in a vacuum; they rely on liquidity provided within specific **Market Pools**, often referred to as **GM Pools**. You can view these pools under the "Earn" tab on the GMX platform.

*   **Market Specificity:** Each GM Pool corresponds to a particular trading market (e.g., the ETH/USD market uses the `[WETH-USDC]` pool, AAVE/USD uses its own pool, etc.).
*   **Liquidity Source:** These pools contain the necessary long and short tokens for their respective markets (e.g., the `[WETH-USDC]` pool holds WETH and USDC).
*   **Interaction:** When you execute a market swap, say from ETH (represented as WETH within the pool) to USDC, you are directly adding WETH to and removing USDC from the `[WETH-USDC]` GM Pool.
*   **Swap-Only Pools:** Some GM pools are designated as "Swap-Only," like the `[USDC-DAI]` pool example. In these pools, users can only swap the constituent tokens; opening perpetual long or short positions using these specific pools is not possible.

### Fees Associated with Market Swaps

Executing a market swap on GMX involves several potential fees displayed in the user interface:

1.  **Price Impact / Fees:** This is often shown as a combined figure in the UI and consists of:
    *   **Price Impact:** A dynamic adjustment based on how your swap affects the token balance within the GM pool. If your swap significantly increases the imbalance between the tokens (e.g., removing a large amount of the token that is already below its target weight), you might incur a higher price impact fee. Conversely, if your swap helps rebalance the pool (bringing token weights closer to their targets), you could receive a *rebate*. The specifics of pool balance and target weights influence this fee/rebate.
    *   **Swap Fee:** A standard percentage fee charged by the GMX protocol for facilitating the swap. This fee is usually deducted from the token you are swapping *from*. For example, a 0.070% fee might be applied to the ETH amount when swapping ETH for USDC.

2.  **Network Fee (Execution Fee):** This is a distinct fee specific to GMX's architecture. It is **not** the standard gas fee you pay from your wallet to initiate the transaction on the blockchain (e.g., on Arbitrum). Instead, this "Network Fee" is pre-paid *to the GMX protocol* as part of your initial transaction. It covers the estimated gas cost for the *second transaction*, which is executed by authorized GMX accounts (often called "keepers") to finalize your swap order on the blockchain.

### The Two-Transaction Order Execution Process

Market swaps, along with Long and Short orders on GMX, utilize a two-step transaction process for execution:

1.  **Transaction 1: Order Creation (User-Initiated)**
    *   You initiate the swap from the GMX interface.
    *   Your wallet sends a transaction to a GMX smart contract, often using a function like `multicall`.
    *   This transaction transfers your input token (e.g., the ETH you want to swap) *plus* an estimated amount of the native network token (e.g., ETH on Arbitrum) to cover the **Network Fee (Execution Fee)** for the second transaction.
    *   Crucially, this transaction creates a *pending swap order* within the GMX system but doesn't finalize the swap itself.

2.  **Transaction 2: Order Execution (Keeper-Initiated)**
    *   An authorized GMX keeper detects your pending order.
    *   The keeper initiates a *separate* transaction, calling a function like `executeOrder` on a specific GMX contract (the `OrderHandler` contract).
    *   This second transaction actually performs the swap logic, interacting with the GM pool.
    *   It consumes the necessary amount from the pre-paid Network Fee (from Transaction 1) to cover its own blockchain gas costs.

**Gas Refund Mechanism:**

Since the Network Fee paid in Transaction 1 is an *estimate* of the gas costs for Transaction 2, it might be higher than the actual cost incurred by the keeper. Any unused portion of this pre-paid Execution Fee is automatically refunded directly back to your wallet within Transaction 2. You can observe this refund on a blockchain explorer like Arbiscan.

### Example: Swapping ETH for USDC

Let's illustrate with an example:

1.  **User Intent:** Swap 0.001 ETH for USDC.
2.  **GMX UI:** Shows an estimated amount of USDC to receive (e.g., ~1.91 USDC) and displays the estimated Price Impact/Fees and the Network (Execution) Fee (e.g., ~0.000065 ETH).
3.  **Transaction 1 (User -> GMX):**
    *   User confirms the swap.
    *   Wallet sends a transaction calling `multicall`.
    *   The transaction transfers slightly more than 0.001 ETH (e.g., `0.0010658 ETH` = 0.001 ETH swap amount + 0.0000658 ETH execution fee estimate).
    *   A pending order is created.
4.  **Transaction 2 (Keeper -> GMX `OrderHandler`):**
    *   A keeper executes the order by calling `executeOrder`.
    *   This transaction accesses the `[WETH-USDC]` GM Pool.
    *   It consumes part of the execution fee (e.g., uses 0.000028 ETH worth of gas).
5.  **Outcome (Visible on Explorer for Tx2):**
    *   User receives the swapped USDC (e.g., `1.909169 USDC`).
    *   User receives a refund of the unused execution fee (e.g., `0.00003709 ETH` = 0.0000658 - 0.000028).

### Key Takeaways

*   Market Swaps on GMX provide immediate token exchanges at current protocol prices.
*   Swaps utilize liquidity from specific GM Market Pools tied to the trading pair.
*   Fees include a standard Swap Fee, a dynamic Price Impact (which can be a rebate), and a pre-paid Network (Execution) Fee.
*   The Network Fee covers the gas cost of a second transaction executed by GMX keepers to finalize the swap.
*   GMX employs a two-transaction system (Order Creation by user, Order Execution by keeper).
*   Any unused portion of the pre-paid Network Fee is refunded to the user in the second transaction.
*   Understanding this process helps clarify the fees and transaction flow when performing market swaps on GMX.