## Calculating Position Size and Profit & Loss (PnL) in Trading

Understanding how to accurately calculate your position size and potential profit or loss (PnL) is fundamental to effective trading, particularly in leveraged environments common in Web3 protocols. This lesson breaks down the essential formulas and concepts.

Before diving into calculations, let's define the key variables we'll use:

*   `L`: Leverage applied to the position (e.g., 5x, 10x).
*   `C₀`: The initial USD value of the collateral deposited to open the position.
*   `I₀`: The index price of the underlying asset (e.g., ETH/USD) at the exact time the position is opened (entry price).
*   `I`: The *current* index price of the underlying asset.
*   `S₀`: Position Size calculated in USD at the time of entry.
*   `T₀`: Position Size calculated in terms of the underlying token quantity at the time of entry.
*   `P`: Profit and Loss of the position, measured in USD.

### Calculating Position Size

There are two crucial ways to measure the size of your position: in USD and in the underlying token quantity.

**1. Position Size in USD (`S₀`)**

This represents the total notional value of your position in USD when it's opened. It's determined by the collateral you provide and the leverage you choose.

*   **Formula:** `S₀ = L * C₀`
*   **Explanation:** Multiply the leverage (`L`) you've selected by the initial USD value of your collateral (`C₀`). This amplified value is your position's size in USD terms at entry.

**2. Position Size in Tokens (`T₀`)**

This represents the quantity of the underlying asset (e.g., how many ETH) your position is equivalent to at the entry price. It's derived from the USD position size and the asset's price at entry.

*   **Formula:** `T₀ = S₀ / I₀`
*   **Explanation:** Divide your Position Size in USD (`S₀`) by the index price of the asset at the time you opened the position (`I₀`). The result (`T₀`) is the amount of the underlying token your position represents. This token quantity remains constant for the duration of the trade (unless you add to or partially close the position).

*   **Example:**
    *   Suppose your Position Size in USD (`S₀`) is $10,000.
    *   You entered the position when the price of ETH (`I₀`) was $2,500 USD/ETH.
    *   Your Position Size in Tokens (`T₀`) would be: $10,000 / $2,500 = 4 ETH.
    *   This means your $10,000 position represents an exposure equivalent to 4 ETH at the entry price.

### Calculating Profit and Loss (PnL)

PnL (`P`) measures the financial gain or loss on your open position in USD terms. The calculation differs slightly depending on whether you are in a long or short position. The core idea is comparing the current value of the position (based on the fixed token amount `T₀` and the *current* price `I`) to its initial value (`S₀`).

**1. Long Position PnL**

A long position profits if the current asset price (`I`) increases relative to the entry price (`I₀`).

*   **Logic:** You profit if the current value of the tokens your position represents (`T₀ * I`) is greater than the initial USD value of your position (`S₀`).
*   **Derivation:** PnL is the current value minus the initial value. The initial value was `S₀`, and we know `S₀ = T₀ * I₀`. The current value is the fixed token amount (`T₀`) multiplied by the current price (`I`). So, `P = (T₀ * I) - (T₀ * I₀)`. Substituting `S₀` back gives the simplified formula.
*   **Formula:** `P = T₀ * I - S₀`
*   **Explanation:** Calculate the current USD value of your token position size (`T₀ * I`) and subtract the initial USD position size (`S₀`). A positive result is profit; a negative result is loss.

**2. Short Position PnL**

A short position profits if the current asset price (`I`) decreases relative to the entry price (`I₀`).

*   **Logic:** You profit if the initial USD value you effectively "sold" at (`S₀`) is greater than the current cost to "buy back" the equivalent token amount (`T₀ * I`).
*   **Derivation:** PnL is the initial value minus the current value needed to close. The initial value was `S₀` (equivalent to `T₀ * I₀`). The current cost to close (buy back the tokens) is `T₀ * I`. So, `P = (T₀ * I₀) - (T₀ * I)`. Substituting `S₀` back gives the simplified formula.
*   **Formula:** `P = S₀ - T₀ * I`
*   **Explanation:** Subtract the current USD value of your token position size (`T₀ * I`) from the initial USD position size (`S₀`). A positive result is profit; a negative result is loss.

By understanding how `S₀` (initial USD size set by leverage and collateral) and `T₀` (constant token quantity derived from `S₀` and entry price `I₀`) are calculated, you can accurately determine the PnL of both long and short positions as the market price (`I`) fluctuates. This is essential for managing risk and evaluating trade performance.