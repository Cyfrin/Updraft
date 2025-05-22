## Analyzing GMX Short Position Creation: Deep Dive into `ExchangeRouter` Parameters

This lesson dissects the process of creating a short perpetual position on GMX, specifically focusing on the parameters passed to the `ExchangeRouter` contract. We'll use a real transaction example viewed through the Tenderly debugger, where a user shorts 0.01 ETH with 1x leverage, using the native ETH as initial collateral.

**Understanding the Transaction Flow**

When a user initiates an action like opening a position on GMX, especially when using native ETH, the interaction typically involves multiple steps batched into a single transaction using the `multicall` function of the `ExchangeRouter`.

1.  **Entry Point: `ExchangeRouter.multicall(...)`**
    The user's wallet sends a transaction to the `ExchangeRouter` contract, calling its `multicall` function. This function allows executing several internal function calls sequentially within one atomic transaction, improving efficiency and user experience.

2.  **Handling Native ETH: `ExchangeRouter.sendWnt(receiver, amount)`**
    Since our example uses native ETH as collateral, the first call within `multicall` is often `sendWnt`.
    *   **Purpose:** This function handles the receipt of native ETH.
    *   **Action:** It takes the incoming ETH, wraps it into WETH (Wrapped Ether, an ERC-20 compliant token), and then forwards this WETH to an internal contract address (the `receiver`).
    *   **Important Note:** The `amount` parameter passed to `sendWnt` includes *both* the user's intended collateral (0.01 ETH in this case) *and* the execution fee required for the subsequent operations, also paid in ETH.

3.  **Creating the Order: `ExchangeRouter.createOrder(params)`**
    This is the core function responsible for creating both swaps and perpetual position orders (increase/decrease). While used for market swaps previously, here we focus on its role in initiating a short perpetual position. The critical information is contained within the `params` struct passed to this function.

**Dissecting the `createOrder` Parameters via Tenderly**

By inspecting the transaction in Tenderly, we can examine the specific inputs provided within the `params` struct for our 0.01 ETH short position example.

**`params.addresses` Struct:** This struct holds the relevant contract and user addresses.

*   `receiver`: `0xd24...f49e` - The user's wallet address. This is who will ultimately own the perpetual position NFT representing the short.
*   `market`: `0x70d...6336` - The unique address identifying the specific GMX perpetuals market contract being traded. In this example, this market uses ETH as the index token, WETH as the long token, and USDC as the short token. This address tells the system which price feed and liquidity pool to use.
*   `initialCollateralToken`: `0x82a...bab1` - The address of the ERC-20 token used as collateral *at the moment the order is created*. Here, it's the address for WETH. Even though the user sent native ETH, the preceding `sendWnt` call wrapped it, so WETH is the token the `createOrder` function sees as the initial collateral.
*   `swapPath`: `[ 0x0cc...5813c ]` - An array of market addresses defining a swap route.
    *   **Purpose:** If populated, this instructs the router to swap the `initialCollateralToken` into a *different* token *before* opening the position. The final token resulting from the swap becomes the actual collateral for the position.
    *   **Example Specific Issue:** In the analyzed transaction, this path specified a WETH/USDC market. This was an *unintended* instruction. The user meant to use WETH directly as collateral. Providing this path forces the system to swap the initial 0.01 WETH collateral into USDC first, and then use that USDC as the collateral for the short ETH position.
    *   **Key Tip:** To use the `initialCollateralToken` (WETH in this case) directly as the position's collateral, the `swapPath` array must be left empty (`[]`).

**`params.numbers` Struct:** This struct contains the quantitative details defining the order.

*   `sizeDeltaUsd`: `34192530496159612075846441500000`
    *   **Concept:** The desired change in the position's size, denominated in USD with **30 decimals of precision**. For opening a new position, this represents the total intended size.
    *   **Calculation:** `34192530496159612075846441500000 / 1e30 ≈ 34.19 USD`. This is the target notional value of the short position.
*   `acceptablePrice`: `3419299764127575`
    *   **Concept:** Primarily used for slippage control in limit orders. In market orders like this, it often reflects an approximation of the asset's market price at the time of transaction submission, used for validation checks. This value uses **12 decimals of precision**.
    *   **Calculation:** `3419299764127575 / 1e12 ≈ 3419.30 USD`. This approximates the price of ETH used for the order calculations.
*   `executionFee`: `11746051451534400` (approx. 0.0034 ETH based on price)
    *   **Concept:** The fee paid (in wei, sourced from the ETH sent initially) to cover the gas costs of executing the order by GMX keepers.
*   `orderType`: `2`
    *   **Concept:** An enum indicating the type of order being placed. This likely maps to an `OrderType` enum defined in GMX's contracts (e.g., `Order.sol`).
    *   **Interpretation:**
        *   `0`: `MarketSwap`
        *   `1`: `LimitSwap`
        *   `2`: `MarketIncrease` (Increase position size or open a new position at the current market price)
        *   `3`: `LimitIncrease`
        *   `4`: `MarketDecrease`
        *   ... etc.
    *   **Conclusion:** `orderType 2` confirms this is an order to open (or increase) a position at the prevailing market price.
*   `isLong`: `false`
    *   **Concept:** A boolean flag specifying the position's direction.
    *   **Conclusion:** `false` explicitly indicates that this is a **short** position being created.

**Calculating and Confirming Leverage**

Leverage in GMX perpetuals is determined implicitly by the ratio of the position size to the collateral value.

1.  **Approximate Collateral Value (USD):** Using the approximate ETH price and the collateral amount:
    `Approx ETH Price * ETH Collateral Amount = 3419.30 USD/ETH * 0.01 ETH ≈ 34.19 USD`
2.  **Position Size (USD):** Derived directly from `sizeDeltaUsd`:
    `34.19 USD`
3.  **Implied Leverage:**
    `Leverage = Position Size (USD) / Collateral Value (USD)`
    `Leverage ≈ 34.19 USD / 34.19 USD ≈ 1`

This calculation confirms the intended 1x leverage. If the user had aimed for 10x leverage with the same 0.01 ETH collateral, the `sizeDeltaUsd` parameter would have needed to represent approximately `10 * 34.19 USD = 341.90 USD`. Similarly, 100x leverage would require a `sizeDeltaUsd` corresponding to `100 * 34.19 USD = 3419.00 USD`.

**Key Concepts Recap**

*   **Multicall:** Enables batching multiple contract calls into one transaction.
*   **Native Token Handling (`sendWnt`):** Wraps native ETH into WETH for use within the ERC-20 based system.
*   **Order Creation (`createOrder`):** The central function for initiating swaps and managing perpetual positions.
*   **Market Identification (`market`):** Specifies the exact trading pair and liquidity pool.
*   **Collateral Specification (`initialCollateralToken`, `swapPath`):** Defines the asset used for margin, with an optional swap before opening the position.
*   **Position Sizing (`sizeDeltaUsd`):** Sets the notional value of the position in USD (30 decimals).
*   **Order Type (`orderType`):** Determines execution logic (market/limit, increase/decrease).
*   **Position Direction (`isLong`):** Boolean flag for long (`true`) or short (`false`).
*   **Leverage:** Implicitly set by the ratio of `sizeDeltaUsd` to the collateral's USD value.

**Important Notes & Tips**

*   **`swapPath` Caution:** Double-check the `swapPath` parameter. If you intend to use the `initialCollateralToken` directly for your position, ensure this array is empty (`[]`). Providing an unintended path will trigger a collateral swap you might not want.
*   **Decimal Precision:** Remember the different decimal precisions: `sizeDeltaUsd` uses 30 decimals, while `acceptablePrice` (and often price feeds) uses 12 decimals.
*   **Calculation Tools:** Using tools like Python is highly recommended for accurately handling the large integer values and varying decimal places involved in these contract interactions.