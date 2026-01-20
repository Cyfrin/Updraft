## Understanding Price Impact Calculation

Price impact is a crucial factor in decentralized finance (DeFi), representing the effect an individual trade or position change has on the market price within a liquidity pool or trading venue. Accurately calculating this impact is essential for users to understand the true cost of their actions. The calculation method depends fundamentally on how an action affects the balance between long and short sides within the system.

To determine the price impact, we first need to understand two key states: "Same Side" and "Cross Over".

### Prerequisite Concepts: Same Side vs. Cross Over

These concepts describe whether the direction of the market imbalance (i.e., whether longs or shorts are dominant) remains consistent or flips after a user action like a swap or adjusting a position.

**1. Same Side**

The "Same Side" condition occurs when the directional imbalance *before* an action is the same as the directional imbalance *after* the action.

*   **Definition:** The larger side (long or short) remains the larger side after the transaction completes.
*   **Conditions:**
    *   The initial long value is less than the initial short value, **AND** the next long value is less than the next short value.
    *   **OR**
    *   The initial long value is greater than or equal to the initial short value, **AND** the next long value is greater than or equal to the next short value.
*   **Context:**
    *   **For Swaps:** "long" and "short" refer to the total USD value of the long and short tokens in the pool, respectively.
    *   **For Positions:** "long" and "short" refer to the total long open interest and short open interest in USD, respectively.

**Example:** If a pool initially has $1M in long tokens and $1.2M in short tokens (imbalance towards shorts), and after a swap, it has $1.1M in longs and $1.3M in shorts, the imbalance remains towards shorts. This is a "Same Side" scenario.

**2. Cross Over**

The "Cross Over" condition is the opposite of "Same Side". It occurs when an action causes the direction of the imbalance to flip.

*   **Definition:** The side that was initially smaller becomes the larger side after the transaction, or vice-versa.
*   **Formula:** `cross over = NOT same side`

**Example:** If a pool initially has $1M longs and $1.2M shorts (imbalance towards shorts), and a large swap results in the pool having $1.5M longs and $1.3M shorts, the imbalance has flipped to favor longs. This is a "Cross Over" scenario.

### Calculating Price Impact: The Formulas

The specific formula used to calculate the price impact depends on whether the action resulted in a "Same Side" or "Cross Over" state change.

**Variables Used:**

*   `d0`: The initial absolute imbalance in USD before the action (`abs(long_value - short_value)`).
*   `d1`: The next absolute imbalance in USD after the action (`abs(next_long_value - next_short_value)`).
*   `e`: An exponent factor applied to the imbalance values.
*   `f`: An impact factor used in the "Same Side" calculation. The specific value of `f` depends on whether the *magnitude* of the imbalance increased or decreased (determined by the sign of `d0 - d1`).
*   `p`: The positive impact factor used in the "Cross Over" calculation.
*   `n`: The negative impact factor used in the "Cross Over" calculation.

**Calculation Logic:**

The system first determines if the state change is "Same Side" or "Cross Over" and then applies the corresponding formula.

**1. "Same Side" Price Impact Calculation**

This formula applies when the imbalance remains on the same side (longs dominant vs. shorts dominant) before and after the action.

*   **Condition:** `same side = true`
*   **Impact Factor (`f`):** The value of `f` used is determined by whether the action *decreased* the imbalance (`d0 - d1 > 0`) or *increased* the imbalance (`d0 - d1 < 0`). While potentially representing different underlying parameters (positive or negative impact factors), the formula structure uses a single variable `f` whose value is context-dependent.
*   **Formula:**
    ```
    same side price impact = (d0 ^ e * f) - (d1 ^ e * f)
    ```
    This calculates the difference between the impact contribution of the initial imbalance and the final imbalance, using the appropriate impact factor `f` based on the change.

**2. "Cross Over" Price Impact Calculation**

This formula applies when the action causes the imbalance to flip sides.

*   **Condition:** `cross over = true` (or `same side = false`)
*   **Impact Factors:** This calculation uses two distinct factors: `p` (positive impact factor) and `n` (negative impact factor).
*   **Formula:**
    ```
    cross over price impact = (d0 ^ e * p) - (d1 ^ e * n)
    ```
    Here, the initial imbalance term (`d0`) is multiplied by the positive impact factor `p`, and the next imbalance term (`d1`) is multiplied by the negative impact factor `n`. This reflects the different dynamics involved when the imbalance direction flips.

### Code Implementation References

The logic described above is implemented within specific utility functions in the codebase. Developers looking to understand the precise implementation can refer to:

*   `SwapPricingUtils.getPriceImpactUsd`
*   `PositionPricingUtils.getPriceImpactUsd`
*   `PricingUtils.getPriceImpactUsdForSameSideRebalance`
*   `PricingUtils.getPriceImpactUsdForCrossoverRebalance`

By understanding the distinction between "Same Side" and "Cross Over" scenarios and applying the correct corresponding formula, the system accurately calculates the price impact of user actions, providing crucial information for traders and liquidity providers.