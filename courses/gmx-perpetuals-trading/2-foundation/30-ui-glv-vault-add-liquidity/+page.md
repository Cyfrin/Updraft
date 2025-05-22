## Adding Liquidity to GMX V2 GLV Vaults: A Step-by-Step Guide

This lesson details the process of adding liquidity to a GMX V2 GMX Liquidity Vault (GLV), specifically using a single token like USDC. We will contrast GLV Vaults with GM Pools and explain the mechanics involved.

**Understanding GM Pools vs. GLV Vaults**

Before proceeding, it's crucial to understand the distinction between GM Pools and GLV Vaults within the GMX V2 ecosystem:

*   **GM Pools:** These are liquidity pools designed to facilitate trading for a *single* market (e.g., ETH/USD, BTC/USD). The tokens backing a specific GM Pool are typically listed alongside its name (e.g., [BTC-USDC]). Users providing liquidity directly to a GM Pool receive GM tokens representing their share of that specific pool.
*   **GLV Vaults:** These are yield-optimized vaults that enable trading across *multiple* markets simultaneously. A GLV Vault essentially acts as a curated "basket of GM tokens" from various underlying GM Pools, as defined by the GMX protocol. Examples include GLV [BTC-USDC] or GLV [WETH-USDC].

**Key Relationship & Implications:**

Depositing into a GLV Vault means you are gaining exposure to the collection of underlying GM Pool tokens held within that vault. Consequently, depositors earn fees and yield generated from the underlying pools *but are also exposed to potential losses* incurred within those same pools. The GLV Vault diversifies exposure across multiple markets but also aggregates the risk from them.

**Prerequisites:**

*   A connected web3 wallet (e.g., MetaMask).
*   The token you wish to deposit (in this example, USDC) available in your wallet.

**Step-by-Step: Adding Single-Token Liquidity to a GLV Vault**

Let's walk through adding USDC liquidity to the GLV (BTC-USDC) Vault:

1.  **Navigate and Select Vault:** Go to the GMX V2 interface section displaying available liquidity options (often labeled "Earn" or similar). Locate the "Select a GLV Vault" section. Identify the target vault, for instance, GLV (BTC-USDC). Click the "Buy" or "Deposit" button associated with this vault.

2.  **Understand the Vault Interface:** You will be directed to the dedicated page for the selected GLV Vault (e.g., GLV [BTC-USDC] GMX Liquidity Vault).
    *   **Composition:** Note the "Composition" section. This area lists the various underlying GM markets/pools that the GLV Vault holds liquidity in (e.g., DOT/USD, HYPE/USD, ICP/USD, BTC/USD), along with their respective Total Value Locked (TVL) and percentage weight within the vault. This visually confirms the "basket" nature of the GLV Vault.

3.  **Initiate Single Token Deposit:**
    *   Locate the deposit interface, often presenting options like "Single" and "Pair". Select the "Single" option.
    *   From the "Pay" or "Deposit" dropdown menu, select the token you wish to add. In this case, select USDC. Your available balance will typically be displayed.
    *   Enter the amount of the token you want to deposit. You can manually enter a value or use a "MAX" button if available.

4.  **Select the Target Underlying Pool (Crucial Step):**
    *   After selecting the token and amount for a single-token deposit, a "Pool" or "Target Pool" dropdown menu will appear.
    *   **Mechanism:** When depositing a single token (like USDC) into a multi-asset GLV Vault, you must specify *which* underlying GM Pool within the vault's composition this liquidity should be added to. The system does not automatically distribute a single token deposit across all underlying pools.
    *   **Action:** Use the dropdown to search for and select the specific underlying GM Pool you want your USDC to enter. For the GLV (BTC-USDC) vault, if your goal is to provide USDC liquidity against Bitcoin, you would select the **BTC/USD [BTC-USDC]** pool.
    *   **Outcome:** By selecting BTC/USD, your deposited USDC will be added specifically to the BTC/USD GM Pool. In return, a corresponding BTC/USD market token (GM token) is minted. The GLV (BTC-USDC) Vault takes ownership of this newly minted GM token, effectively adding your liquidity contribution (via that specific market token) to its overall basket.

5.  **Execute and Confirm Transaction:**
    *   Click the "Buy GLV" or "Deposit" button.
    *   Your connected wallet (e.g., MetaMask) will prompt you to confirm the transaction. Review the details and approve it.
    *   Wait for the transaction to be confirmed on the blockchain. You should see confirmation messages on the GMX interface (e.g., "Buy request sent," "Buy order executed").

6.  **Verify the Result:**
    *   Navigate back to the main page listing the GLV Vaults.
    *   Locate the GLV Vault you deposited into (e.g., GLV [BTC-USDC]).
    *   Check the "Wallet" or "Your Balance" column. It should now reflect an increased amount of GLV tokens, representing your newly added liquidity share in the vault.

**Key Takeaways:**

*   GLV Vaults offer diversified exposure to multiple GMX V2 markets by holding a basket of underlying GM Pool tokens.
*   Depositing into a GLV Vault exposes you to both the profits and losses of the underlying GM Pools it holds.
*   When performing a *single-token* deposit into a GLV Vault, you must explicitly select the target underlying GM Pool for your funds.
*   The GLV Vault manages the underlying GM tokens generated from deposits; users receive GLV tokens representing their overall share in the vault.