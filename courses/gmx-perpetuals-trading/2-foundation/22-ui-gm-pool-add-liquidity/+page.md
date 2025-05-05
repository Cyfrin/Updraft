## Understanding Liquidity Provision on GMX V2

On the GMX platform, traders open long and short positions, speculating on asset price movements. The profits earned by successful traders are paid out from a pool of assets, while the losses incurred by unsuccessful traders are absorbed back into that same pool. These asset pools are funded by users known as Liquidity Providers (LPs). To become an LP, you contribute your tokens to a specific market pool, enabling trading activity and potentially earning fees in return.

## Accessing Liquidity Provision Features

To begin the process of providing liquidity on GMX, navigate to the main GMX interface. Locate and click on the "Earn" tab. This section houses the options for participating as a liquidity provider.

## GLV Vaults vs. GM Pools: Choosing Your Path

Scrolling down the "Earn" page reveals two primary methods for providing liquidity: "Select a GLV Vault" and "Select a GM Pool". Both allow you to contribute assets to the GMX ecosystem, but they function differently:

*   **GM Pool:** This is the more direct method. You choose a *single*, specific market (e.g., ETH/USD) and provide one or both of the assets required for trading within that market.
*   **GLV Vault:** This offers a more diversified approach. A GLV vault holds a basket of different GM Pool tokens, effectively spreading your liquidity across multiple markets automatically through a yield-optimized strategy.

For foundational understanding, this guide focuses on **GM Pools**, as they represent the core building blocks of GMX V2 liquidity.

## Diving Deeper: How GM Pools Work

GM Pools (where "GM" represents GMX Market tokens) facilitate trading for individual markets. Each pool listed corresponds to a specific trading pair and specifies the assets used for collateral.

Consider these examples:

*   **LDO/USD [WETH-USDC]:**
    *   **Market:** Traders bet on Lido DAO (LDO) token price against USD.
    *   **Long Token:** Wrapped Ether (WETH) is used as collateral for long positions.
    *   **Short Token:** USD Coin (USDC) is used as collateral for short positions.
    *   **LP Role:** To provide liquidity here, you would deposit WETH, USDC, or a combination of both into this specific pool.

*   **BTC/USD [BTC-USDC]:**
    *   **Market:** Traders bet on Bitcoin (BTC) price against USD.
    *   **Long Token:** Wrapped Bitcoin (WBTC) is used as collateral for long positions.
    *   **Short Token:** USD Coin (USDC) is used as collateral for short positions.
    *   **LP Role:** To provide liquidity here, you would deposit WBTC, USDC, or a combination of both.

## Step-by-Step: Adding Liquidity to an ETH/USD GM Pool

Let's walk through adding liquidity to the `ETH/USD [WETH-USDC]` pool. This pool allows trading ETH against USD, uses WETH for long collateral, and USDC for short collateral. We'll assume you have ETH in your connected wallet that you wish to use.

1.  Locate the `ETH/USD [WETH-USDC]` row within the "Select a GM Pool" section on the "Earn" page.
2.  Click the "Buy" button associated with this pool row.

## Navigating the 'Buy GM' Interface

Clicking "Buy" opens the interface specifically for adding liquidity to the selected GM Pool (in this case, `V2 Pools - GM:ETH/USD`). Here’s a breakdown of the key sections:

*   **Composition:** This displays the current balance of assets within the pool. For instance, it might show Long (WETH) comprising 50.55% (e.g., 14.827k WETH) and Short (USDC) comprising 49.45% (e.g., 28.128m USDC). GMX aims for an ideal balance close to 50% for each side.
*   **Buy/Sell/Shift GM Tabs:** While other options exist for managing liquidity, our focus is on the "Buy GM" tab to add new liquidity.
*   **Single vs. Pair Tabs:** You have two main ways to contribute:
    *   **Single:** Deposit using only *one* of the pool's constituent tokens (either the long token, WETH, or the short token, USDC). If you deposit an asset that needs to be partially converted to maintain the pool's target ratio, the protocol handles the necessary swap automatically behind the scenes. This may incur swap fees and price impact.
    *   **Pair:** Deposit *both* required tokens (WETH and USDC) simultaneously. This method often allows you to deposit closer to the pool's current composition, potentially minimizing fees and price impact compared to a large single-token deposit.
*   **Input Selection & Amount:** Choose the token you wish to deposit. For this example, select "Single" and choose ETH from the "Pay with" dropdown. Enter the amount you wish to deposit (e.g., `0.001 ETH`).
*   **Receive Amount:** The interface estimates the quantity of GM tokens you will receive in exchange for your deposit. These tokens (e.g., `GM: ETH/USD`) represent your proportional share of this specific liquidity pool. For 0.001 ETH, you might receive approximately `1.398 GM` tokens.
*   **Pool Selection Dropdown:** This allows you to quickly switch to other GM pools that involve one of your input assets (e.g., if paying with ETH, you might see options for WETH-USDC, WETH-WETH pools if available). We will remain with the `ETH/USD [WETH-USDC]` pool.
*   **Fees and Price Impact Section:** This details the costs associated with your deposit:
    *   **Price Impact:** This functions as an incentive mechanism to help maintain the pool's balance.
        *   If your deposit helps move the pool's composition *closer* to the ideal 50/50 split, you might receive a small bonus (displayed as a positive value or discount).
        *   If your deposit pushes the pool *further* from balance, you will incur a small fee (displayed as a negative value or premium, e.g., `<-$0.01 (0.037% of buy amount)`). This fee discourages actions that imbalance the pool.
    *   **Buy Fee:** A standard percentage-based fee charged on your deposit amount for entering the pool (e.g., `<-$0.01 (0.070% of buy amount)`).
    *   **Network Fee:** The estimated cost to execute the required transactions on the underlying blockchain (e.g., Arbitrum, Avalanche). This covers the gas fees (e.g., `~$0.05`).

## Understanding the Two-Step Transaction Process

Similar to placing trades on GMX V2, providing liquidity involves a two-step transaction process managed by the GMX system:

1.  **User Transaction (Request):** When you confirm the action in your wallet, you are signing a transaction that creates an *order* or *request* to add liquidity. This request is submitted to the GMX backend.
2.  **GMX Backend Transaction (Execution):** GMX's automated keeper system detects your request. It then executes a second transaction on the blockchain to finalize the deposit, actually moving your funds into the pool and minting the corresponding GM tokens to your wallet. The "Network Fee" you see covers the gas cost for this second execution step performed by the GMX system.

## Executing and Confirming Your Liquidity Deposit

1.  After reviewing the details in the "Buy GM" interface, click the "Buy GM" button.
2.  Your connected wallet (e.g., MetaMask) will prompt you to confirm the first transaction – the request to add liquidity. Review the details and confirm.
3.  The GMX interface will typically display notifications indicating the progress, such as "Buy request sent" followed by "Buy order executed".

To verify your liquidity has been added successfully:

1.  Navigate back to the main "Earn" page.
2.  Scroll down to the "Select a GM Pool" section.
3.  Find the row for the pool you deposited into (`ETH/USD [WETH-USDC]` in this example).
4.  Look at the "Wallet" column for that row. You should now see a balance reflecting the GM tokens you received (e.g., `1.3982 ($1.93)`), confirming your successful deposit and your ownership stake in that pool.