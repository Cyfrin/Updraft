## Understanding Approximate Liquidation Prices

Calculating the precise liquidation price for a leveraged position on platforms like GMX can be complex. It involves tracking the fluctuating value of your collateral, the real-time profit or loss (PnL) of your position, various fees (opening, closing, borrowing), and platform-specific minimum collateral requirements. Performing this exact calculation quickly, especially for estimation, is often impractical.

This lesson simplifies the process by deriving easy-to-use approximate formulas. By making specific assumptions—primarily ignoring fees and minimum collateral buffers, and considering distinct collateral types—we can arrive at formulas that provide rapid estimates of your liquidation price. These approximations are useful for quickly assessing risk, especially when compared to the actual liquidation prices displayed on platforms like GMX.

## The Core Liquidation Condition

At its heart, liquidation occurs to prevent a position's losses from exceeding the value of the collateral securing it. The fundamental condition triggering liquidation can be expressed as:

`Liquidation occurs if: C_usd + P_usd - f < m`

Let's break down these terms:

*   **`C_usd`**: The current value of your deposited collateral in USD. This is calculated as `C0 * Pc`, where `C0` is the *amount* of collateral tokens you deposited, and `Pc` is the *current USD price* of each collateral token.
*   **`P_usd`**: The current Profit or Loss of your position in USD. This depends on whether you are long or short:
    *   **Long Position:** `P_usd = S0 * (PI - PI0)` (You profit if the current index price `PI` is higher than your entry index price `PI0`).
    *   **Short Position:** `P_usd = S0 * (PI0 - PI)` (You profit if the current index price `PI` is lower than your entry index price `PI0`).
    *   Here, `S0` is the size of your position expressed in the index asset (e.g., the amount of ETH your position represents), `PI` is the current USD price of the index asset, and `PI0` is the index asset's USD price when you entered the position.
*   **`f`**: Represents the sum of all applicable fees (opening, closing, borrowing/funding).
*   **`m`**: Represents the minimum required collateral buffer mandated by the platform, often a small fixed USD value.

To simplify, our approximations will assume `f = 0` and `m = 0`. This means we are looking for the point where the collateral value plus the PnL approaches zero:

`Simplified Liquidation Condition: C_usd + P_usd < 0`

## The Link Between Position Size and Collateral: Leverage

A key relationship connects your position size to your collateral: the leverage factor (`k`). At the time you enter the position:

*   Initial Position Value (USD): `S0 * PI0`
*   Initial Collateral Value (USD): `C0 * Pc0` (where `Pc0` is the collateral token price at entry)

Leverage `k` is defined as the ratio of the initial position value to the initial collateral value:

`k = (S0 * PI0) / (C0 * Pc0)`

Rearranging this gives us a way to express the position size `S0` in terms of collateral and leverage:

`S0 = (k * C0 * Pc0) / PI0`

This relationship is crucial for substituting `S0` in our liquidation condition derivation.

## Approximating the Liquidation Price for a Long Position

Let's derive the approximate liquidation price (`PI`) for a long position using our simplified condition (`C_usd + P_usd < 0`) and the leverage relationship, considering two common collateral types.

**Scenario 1: Long Position with Stablecoin Collateral (e.g., USDC)**

*   **Assumptions:** Collateral is a stablecoin, so its price is assumed to be constant at $1 (`Pc = 1`, `Pc0 = 1`). Fees and minimum collateral are ignored (`f = 0`, `m = 0`).
*   **Initial Liquidation Condition:** `(C0 * Pc) + (S0 * (PI - PI0)) < 0`
    *   Substituting `Pc = 1`: `C0 + S0 * (PI - PI0) < 0`
*   **Leverage Relationship:** `S0 = (k * C0 * 1) / PI0 = (k * C0) / PI0`
*   **Substitution and Simplification:**
    1.  Substitute `S0` into the condition: `C0 + ((k * C0) / PI0) * (PI - PI0) < 0`
    2.  Divide by `C0` (assuming `C0 > 0`): `1 + (k / PI0) * (PI - PI0) < 0`
    3.  Expand: `1 + (k * PI / PI0) - (k * PI0 / PI0) < 0`
    4.  Simplify: `1 + (k * PI / PI0) - k < 0`
    5.  Isolate the `PI` term: `(k * PI / PI0) < k - 1`
    6.  Solve for `PI`: `PI < ((k - 1) / k) * PI0`

*   **Approximate Formula (Long, Stablecoin Collateral):**
    `PI_liq ≈ ((k - 1) / k) * PI0`

**Scenario 2: Long Position with Index Asset as Collateral (e.g., WETH for an ETH Long)**

*   **Assumptions:** Collateral is the same as the index asset, so its price moves with the index price (`Pc = PI`, `Pc0 = PI0`). Fees and minimum collateral are ignored (`f = 0`, `m = 0`).
*   **Initial Liquidation Condition:** `(C0 * Pc) + (S0 * (PI - PI0)) < 0`
    *   Substituting `Pc = PI`: `C0 * PI + S0 * (PI - PI0) < 0`
*   **Leverage Relationship:** `S0 = (k * C0 * Pc0) / PI0`
    *   Substituting `Pc0 = PI0`: `S0 = (k * C0 * PI0) / PI0 = k * C0`
*   **Substitution and Simplification:**
    1.  Substitute `S0` into the condition: `C0 * PI + (k * C0) * (PI - PI0) < 0`
    2.  Divide by `C0` (assuming `C0 > 0`): `PI + k * (PI - PI0) < 0`
    3.  Expand: `PI + k * PI - k * PI0 < 0`
    4.  Factor out `PI`: `PI * (1 + k) - k * PI0 < 0`
    5.  Isolate the `PI` term: `PI * (1 + k) < k * PI0`
    6.  Solve for `PI`: `PI < (k / (k + 1)) * PI0`

*   **Approximate Formula (Long, Index Asset Collateral):**
    `PI_liq ≈ (k / (k + 1)) * PI0`

## Approximate Liquidation Price Formulas for Short Positions

Following a similar derivation process (starting with `P_usd = S0 * (PI0 - PI)` and the simplified condition `C_usd + P_usd < 0`), we arrive at the approximate liquidation formulas for short positions:

*   **Short Position with Stablecoin Collateral (Pc=1):**
    `PI_liq ≈ ((k + 1) / k) * PI0`

*   **Short Position with Index Asset as Collateral (Pc=PI):**
    `PI_liq ≈ (k / (k - 1)) * PI0`
    *(Note: This formula implies leverage `k` must be greater than 1 for a valid liquidation price above the entry price).*

## Quick Reference: Approximate Liquidation Formulas

Here are the key formulas for quick estimation:

*   **Long, Stablecoin Collateral:** `PI_liq ≈ PI0 * (k - 1) / k`
*   **Long, Index Asset Collateral:** `PI_liq ≈ PI0 * k / (k + 1)`
*   **Short, Stablecoin Collateral:** `PI_liq ≈ PI0 * (k + 1) / k`
*   **Short, Index Asset Collateral:** `PI_liq ≈ PI0 * k / (k - 1)` (Requires `k > 1`)

Where:
*   `PI_liq` is the approximate index liquidation price.
*   `PI0` is the index price at entry.
*   `k` is the leverage factor (Initial Position Value / Initial Collateral Value).

## Accuracy and Practical Considerations

These formulas provide estimates, not exact values. Their accuracy depends on several factors:

*   **Fees and Buffers:** The formulas ignore fees (`f`) and minimum collateral (`m`). These ignored values mean the actual liquidation price will be slightly further from the entry price (lower for longs, higher for shorts) than the formula suggests.
*   **Leverage:** The impact of fixed fees and buffers (`f`, `m`) is proportionally smaller at higher leverage (`k`). Therefore, the approximations tend to be more accurate as leverage increases.
*   **Collateral Type:**
    *   When using the **index asset as collateral**, the approximation appears quite close to the actual liquidation price, even at lower leverage levels (like 1x). This is because the collateral value changes (`C_usd = C0 * PI`) in a way that partially counteracts the position's PnL within the liquidation condition.
    *   When using **stablecoin collateral**, the approximation can deviate more significantly at low leverage (e.g., 1x leverage might show a negative theoretical liquidation price while the platform shows a positive one due to `f` and `m`). Accuracy improves noticeably as leverage increases (e.g., 2x leverage and above).

**Example Comparison (Long ETH/USD, Entry PI0 ≈ $1980):**

*   **Stablecoin (USDC), 2x Leverage (k=2):**
    *   Formula: `PI_liq ≈ $1980 * (2 - 1) / 2 = $1980 * 0.5 = $990`
    *   Actual (GMX Example): ~$950 (The formula provides a reasonable ballpark estimate).
*   **Index Asset (WETH), 1x Leverage (k=1):**
    *   Formula: `PI_liq ≈ $1980 * 1 / (1 + 1) = $1980 * 0.5 = $990`
    *   Actual (GMX Example): ~$996 (The formula provides a very close estimate).

Use these formulas for quick mental checks and risk assessment, understanding they provide an approximation that gets closer to reality, particularly at higher leverage or when using the index asset as collateral. Always refer to the platform's displayed liquidation price for the most accurate figure.