## Calculating Profit and Loss (P&L) for Leveraged Positions: Step-by-Step Examples

This lesson demonstrates how to calculate the Profit and Loss (P&L) in USD for both long and short leveraged positions. We will use a defined set of parameters and walk through the calculations step-by-step.

**Input Parameters**

For these examples, we will use the following predefined values:

*   **Leverage (L):** 5
*   **Initial Collateral Value (C₀):** $1000 USD
*   **Initial Index Price (I₀):** $2000 USD (Price when the position was opened)
*   **Current Index Price (I):** $3000 USD (Price used for P&L calculation)

**Core Concepts and Formulas**

Before calculating the P&L, we need to understand a few key concepts and establish the initial position sizes.

1.  **Initial Position Size (USD - S₀):** This is the total notional value of your position in USD when it was opened. It's calculated by multiplying your initial collateral by the leverage.
    *   **Formula:** `S₀ = L * C₀`

2.  **Initial Position Size (Tokens - T₀):** This represents the quantity of the underlying asset (e.g., BTC) equivalent to the initial USD position size, based on the price when the position was opened.
    *   **Formula:** `T₀ = S₀ / I₀`

3.  **Profit and Loss (P):** This is the calculated gain or loss on the position in USD. The formula differs for long and short positions.

    *   **Long Position P&L (P_long):** A long position profits if the current price (I) is higher than the initial price (I₀). The P&L is the difference between the current value of the notionally held tokens and the initial USD position value.
        *   **Formula:** `P_long = (T₀ * I) - S₀`

    *   **Short Position P&L (P_short):** A short position profits if the current price (I) is lower than the initial price (I₀). The P&L is the difference between the initial USD position value (representing the value borrowed/sold) and the current cost to buy back the notionally held tokens.
        *   **Formula:** `P_short = S₀ - (T₀ * I)`

**Price Movement Expectation**

Given our parameters, the current price (`I = $3000`) is higher than the initial price (`I₀ = $2000`). Therefore, we expect:
*   The **long position** to show a profit (positive P&L).
*   The **short position** to show a loss (negative P&L).

**Step-by-Step P&L Calculation**

Let's proceed with the calculations using the defined parameters and formulas.

**Step 1: Calculate Initial Position Size in USD (S₀)**

*   Using the formula: `S₀ = L * C₀`
*   Substitute the values: `S₀ = 5 * $1000`
*   **Result:** `S₀ = $5000`
    *   *This means the total value of the leveraged position at the start was $5000 USD.*

**Step 2: Calculate Initial Position Size in Tokens (T₀)**

*   Using the formula: `T₀ = S₀ / I₀`
*   Substitute the values: `T₀ = $5000 / $2000`
*   **Result:** `T₀ = 2.5`
    *   *This means the position is equivalent to holding 2.5 units of the underlying asset (e.g., 2.5 BTC if the index was BTC/USD).*

**Step 3: Calculate P&L for a Long Position (P_long)**

*   Using the formula: `P_long = (T₀ * I) - S₀`
*   Substitute the values: `P_long = (2.5 * $3000) - $5000`
*   Calculate the current value of tokens: `2.5 * $3000 = $7500`
*   Calculate the P&L: `P_long = $7500 - $5000`
*   **Result:** `P_long = $2500`
    *   *The long position has resulted in a profit of $2500 USD, as expected due to the price increase.*

**Step 4: Calculate P&L for a Short Position (P_short)**

*   Using the formula: `P_short = S₀ - (T₀ * I)`
*   Substitute the values: `P_short = $5000 - (2.5 * $3000)`
*   Calculate the current value of tokens (cost to buy back): `2.5 * $3000 = $7500`
*   Calculate the P&L: `P_short = $5000 - $7500`
*   **Result:** `P_short = -$2500`
    *   *The short position has resulted in a loss of $2500 USD, as expected due to the price increase.*

**Summary of Results**

Based on the initial parameters (Leverage=5, Collateral=$1000, Initial Price=$2000, Current Price=$3000):

*   The **Long Position** yields a **Profit of $2500 USD**.
*   The **Short Position** yields a **Loss of $2500 USD** (P&L = -$2500).

These calculations demonstrate how to determine the P&L for leveraged positions by first calculating the initial position sizes in both USD and the underlying asset's tokens, and then applying the appropriate formula based on whether the position is long or short relative to the current market price.