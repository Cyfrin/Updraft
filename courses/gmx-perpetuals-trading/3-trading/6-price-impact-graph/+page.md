## Understanding the Price Impact Graph and Imbalance

This lesson explains how price impact is calculated and visualized using a graph, focusing on the relationship between open interest imbalance and price adjustments. We'll explore the concepts of "same side" and "crossover" scenarios using a practical visualization built with the Desmos graphing calculator.

## Decoding the Desmos Visualization

The visualization uses the Desmos graphing calculator to plot the relationship between market imbalance and the resulting price impact.

*   **Horizontal Axis (X-axis): Imbalance**
    *   This axis represents the 'Imbalance' in the market, defined as `Long Open Interest - Short Open Interest`.
    *   Units are measured in USD.
    *   `x = 0`: Indicates that Long Open Interest equals Short Open Interest.
    *   `x > 0`: Indicates that Long Open Interest is greater than Short Open Interest.
    *   `x < 0`: Indicates that Short Open Interest is greater than Long Open Interest.

*   **Vertical Axis (Y-axis): Price Impact**
    *   This axis represents the calculated 'Price Impact'.
    *   Units are also measured in USD.
    *   `y > 0`: Represents a positive price impact, generally indicating a favorable price adjustment for the protocol or liquidity pool.
    *   `y < 0`: Represents a negative price impact, generally indicating an unfavorable price adjustment for the protocol or liquidity pool.
    *   `y = 0`: Indicates no price impact arising from this specific imbalance mechanism (though other factors like a base spread might still apply).

*   **The Curve**
    *   The curve plotted on the graph illustrates the calculated price impact (`y`) for any given level of imbalance (`x`). Its specific shape is dictated by the underlying mathematical formula governing price impact.

*   **Points**
    *   Specific points plotted on the curve, represented as `(x, y)`, show the exact price impact (`y`) calculated for a specific imbalance value (`x`).

## Core Concepts: Imbalance and Price Impact

Understanding the following concepts is crucial for interpreting the graph:

1.  **Imbalance:** The fundamental input driving price impact, calculated as `Long Open Interest - Short Open Interest` (in USD). This value determines the position along the x-axis.
2.  **Initial Imbalance (`x₀`):** This represents the imbalance state *before* a specific trade or market event occurs. In the Desmos tool, this is often controlled by a slider.
3.  **Next Imbalance (`x₁`):** This represents the imbalance state *after* the trade or event has occurred. This is also typically controlled by a slider to simulate different scenarios.
4.  **Price Impact (`p(x)`):** The output, shown on the y-axis. It's the price adjustment calculated based primarily on the imbalance level. The calculation often involves a formula that considers the initial imbalance (`x₀`) and parameters like a 'Price impact exponent' (`a`). For instance, a partially revealed formula might look like `p(x) = f_p(x)|x₀|^a - f_n(x)`, where `f_p` and `f_n` are functions related to positive/negative impact factors, and `a` (e.g., `a = 2`) influences the curvature and sensitivity of the impact.

## Same Side vs. Crossover Scenarios

The relationship between the initial imbalance (`x₀`) and the next imbalance (`x₁`) defines two key scenarios:

1.  **Same Side:**
    *   A 'Same Side' scenario occurs when the *sign* of the imbalance does not change between the initial state (`x₀`) and the next state (`x₁`). It's crucial to note this refers to the sign of the imbalance (x-value), not necessarily the sign of the resulting price impact (y-value).
    *   If `x₀ ≥ 0` (initial state has more or equal longs than shorts), a same-side transition requires `x₁ ≥ 0`.
    *   If `x₀ ≤ 0` (initial state has more or equal shorts than longs), a same-side transition requires `x₁ ≤ 0`.
    *   Essentially, if longs were dominant, they remain dominant (or balanced); if shorts were dominant, they remain dominant (or balanced).

2.  **Crossover:**
    *   A 'Crossover' scenario occurs when the *sign* of the imbalance *flips* between the initial state (`x₀`) and the next state (`x₁`).
    *   If `x₀ > 0` (initially more longs), a crossover means `x₁ < 0` (ends with more shorts).
    *   If `x₀ < 0` (initially more shorts), a crossover means `x₁ > 0` (ends with more longs).
    *   This signifies a shift in market dominance between long and short positions.

## Illustrative Examples

Let's walk through examples based on the graph:

**Scenario 1: Starting with Positive Imbalance (`x₀ > 0`)**

*   Assume Initial Imbalance `x₀ = 2` USD (Longs exceed Shorts by 2 USD). The graph might show this starting point as `(2, 0)`.
*   **Same Side Example 1:** If a trade causes the Next Imbalance `x₁ = 1` USD. Since `x₁ > 0`, this is 'Same Side'. The graph might show the point `(1, 0.9)`, indicating a positive price impact of 0.9 USD.
*   **Same Side Example 2:** If `x₁ = 0.4` USD. Still 'Same Side' (`x₁ > 0`). The point could be `(0.4, 1.152)`.
*   **Same Side Example 3:** If `x₁ = 2.2` USD. Still 'Same Side' (`x₁ > 0`), even though the imbalance increased further from zero. This might lead to a *negative* price impact, e.g., `(2.2, -1.68)`. This highlights that "same side" refers only to the sign of `x`, not `y`.
*   **Crossover Example:** If a trade results in `x₁ = -0.3` USD. Since `x₁ < 0`, this is a 'Crossover'. The point could be `(-0.3, 1.02)`.

**Scenario 2: Starting with Negative Imbalance (`x₀ < 0`)**

*   Assume Initial Imbalance `x₀ = -2` USD (Shorts exceed Longs by 2 USD). The corresponding point might be `(-2, 0)`.
*   **Same Side Example 1:** If the Next Imbalance `x₁ = -1.3` USD. Since `x₁ < 0`, this is 'Same Side'. The point could be `(-1.3, 0.693)`.
*   **Same Side Example 2:** If `x₁ = -0.2` USD. Still 'Same Side' (`x₁ < 0`). The point might be `(-0.2, 1.188)`.
*   **Same Side Example 3:** If `x₁ = -2.2` USD. Still 'Same Side' (`x₁ < 0`). This might result in a negative impact, e.g., `(-2.2, -1.68)`.
*   **Crossover Example:** If the Next Imbalance `x₁ = 0.3` USD. Since `x₁ > 0`, this is a 'Crossover'. The point could be `(0.3, 1.02)`.

## Key Characteristics of the Price Impact Function

Observing the graph reveals important characteristics of how price impact behaves in this model:

1.  **Penalization of Negative Impacts:** The shape of the curve often shows that negative price impacts (`y < 0`) can increase sharply as the imbalance moves further away from a balanced or initial state. This suggests the system is designed to heavily penalize large imbalances or changes that result in unfavorable price adjustments for the pool/protocol.
2.  **Favoring Same Side Transitions:** The price impact calculation frequently results in more favorable outcomes (higher `y` values) for 'Same Side' transitions compared to 'Crossover' transitions, especially for changes of similar magnitude.
    *   *Example:* Starting at `x₀ = 2`. A transition to `x₁ = 0.8` (Same Side) might yield a price impact `y = 1.008`. In contrast, a transition to `x₁ = -0.8` (Crossover), which is the same distance from `x=0` but flips the sign, might yield a much lower or even negative impact, like `y = -0.08`. This structure can incentivize trades that maintain the current direction of market imbalance rather than flipping it.
3.  **Consistent Units:** Remember that all values discussed – Open Interest (Long and Short), Imbalance (`x`), and Price Impact (`y`) – are consistently represented in USD within this graphical context.