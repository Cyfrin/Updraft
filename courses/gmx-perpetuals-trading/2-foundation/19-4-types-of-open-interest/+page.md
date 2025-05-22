## Understanding the Four Types of Open Interest on GMX

Open interest (OI) is a fundamental concept in derivatives trading, representing the total number or value of outstanding contracts that haven't been settled. On decentralized perpetual exchanges like GMX, understanding the composition of open interest provides valuable insights into market sentiment and potential risks. GMX uniquely categorizes open interest into four distinct types based on two key factors: the direction of the trade (long or short) and the type of collateral used to back the position (the designated "long token" or "short token" for that market).

Let's break down the core concepts before diving into the four specific types:

*   **Open Interest (OI):** The total value of all unsettled perpetual futures positions (long and short) on a GMX market.
*   **GMX Protocol:** The decentralized exchange platform where these perpetual contracts are traded and the open interest is tracked.
*   **Long Position:** A trade betting that the price of the underlying asset (index token) will increase.
*   **Short Position:** A trade betting that the price of the underlying asset (index token) will decrease.
*   **Collateral:** The assets a trader deposits to open and maintain a leveraged position. This acts as a guarantee against losses.
*   **Index Token:** The underlying asset whose price movements the perpetual contract tracks (e.g., ETH, BTC).
*   **Long Token (Collateral):** In a specific GMX market (e.g., ETH WETH/USDC), this is the asset designated as the "long" collateral option. Typically, it's the index token itself or a closely related derivative (like WETH for ETH). Its value tends to move in correlation with the index token's price.
*   **Short Token (Collateral):** In the same GMX market, this is the asset designated as the "short" collateral option. It's usually a stablecoin (like USDC, USDT) whose value remains relatively stable regardless of the index token's price movements.

GMX tracks open interest based on these collateral types because the risk profile differs significantly. For example, a long position backed by the volatile long token behaves differently and poses different risks to the protocol's liquidity pool (GLP) compared to a long position backed by a stable short token.

**The Four Categories of GMX Open Interest**

By combining the position direction (Long/Short) with the collateral type used (Long Token/Short Token), GMX arrives at these four classifications:

1.  **Long Open Interest with Long Token Collateral:**
    *   **Position:** Long (betting on price increase).
    *   **Collateral:** The designated long token for the market.
    *   **Example (ETH WETH/USDC Market):** A trader opens a long ETH position using WETH as collateral.

2.  **Long Open Interest with Short Token Collateral:**
    *   **Position:** Long (betting on price increase).
    *   **Collateral:** The designated short token (usually a stablecoin) for the market.
    *   **Example (ETH WETH/USDC Market):** A trader opens a long ETH position using USDC as collateral.

3.  **Short Open Interest with Long Token Collateral:**
    *   **Position:** Short (betting on price decrease).
    *   **Collateral:** The designated long token for the market.
    *   **Example (ETH WETH/USDC Market):** A trader opens a short ETH position using WETH as collateral. This is sometimes referred to as a "wrong-way" collateralization for shorts, as the collateral value moves opposite to the desired trade outcome.

4.  **Short Open Interest with Short Token Collateral:**
    *   **Position:** Short (betting on price decrease).
    *   **Collateral:** The designated short token (usually a stablecoin) for the market.
    *   **Example (ETH WETH/USDC Market):** A trader opens a short ETH position using USDC as collateral.

Understanding this four-way classification is key to analyzing market dynamics, risk exposure for liquidity providers, and overall sentiment within the GMX ecosystem for any given perpetual market. By tracking not just the total OI, but *how* that OI is collateralized and positioned, GMX provides a more granular view of the underlying trading activity.