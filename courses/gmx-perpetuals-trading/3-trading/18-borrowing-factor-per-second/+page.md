## Calculating the GMX Synthetics Borrowing Fee Rate

Understanding the borrowing fee mechanism is crucial for interacting with GMX Synthetics, as it directly impacts the cost of maintaining leveraged positions. This lesson delves into the calculation of the `borrowingFactorPerSecond` within the `MarketUtils.sol` contract, a core component determining the dynamic borrowing rate. The calculation is intricate, relying on several prerequisite concepts and conditional logic based on market utilization.

### Prerequisite Concept: Reserved USD

Before calculating the borrowing rate, the protocol needs to assess the potential stress on the liquidity pool. This is achieved through the `getReservedUsd` function, which calculates the total USD amount required to pay out all positions on *one side* (either all longs or all shorts) if they were closed simultaneously under current market conditions. It essentially represents the maximum potential profit payout the pool might need to cover for that side.

The calculation differs based on whether we are considering long or short positions:

1.  **For Long Positions:**
    *   The function retrieves the total `openInterestInTokens` for the long side.
    *   This token amount is multiplied by the current maximum index token price (`prices.indexTokenPrice.max`).
    *   Conceptually, this represents the total USD value longs would receive if they all closed at the current maximum price, signifying the maximum potential payout needed for longs.

2.  **For Short Positions:**
    *   The function uses the `openInterest` value directly (which, for shorts, is already denominated in USD).
    *   Conceptually, this represents the maximum profit shorts could realize, which occurs if the underlying asset's price goes to zero. The open interest USD reflects the total collateral value initially posted, which would become the payout in this scenario.

### Prerequisite Concept: Usage Factor

The `getUsageFactor` function provides a crucial measure of how utilized the pool's liquidity is. It considers both the potential payout stress (Reserved USD) and the current open interest relative to their configured maximums.

The calculation determines the *higher* of two specific utilization ratios:

1.  **Reserve Usage Factor:** This is calculated as `reserved USD / max reserve`.
    *   `reserved USD` is the value obtained from the `getReservedUsd` function described above.
    *   `max reserve` is a configurable limit, typically calculated as `reserve factor * pool usd`, where `pool usd` is the total USD value of tokens in the pool, and `reserve factor` is a safety parameter. This ratio measures how close the potential payout requirement is to its allowed maximum.

2.  **Open Interest Usage Factor:** This is calculated as `open interest / max open interest`.
    *   `open interest` is the current USD value of open positions for the side being considered.
    *   `max open interest` is a configurable limit on the total size of open positions allowed for that market. This ratio measures how close the current market size is to its maximum allowed size.

The final `usage factor` is the maximum of these two ratios, providing a single metric that reflects the pool's utilization pressure from both potential payouts and current position sizes.

### Calculating the Borrowing Factor Per Second

The core function, `getBorrowingFactorPerSecond`, uses the previously discussed concepts (`reserved USD` feeding into `usage factor`) along with several configurable parameters to determine the final borrowing rate. The calculation follows one of two distinct paths, switched by the value of the `optimal usage factor` parameter. This parameter represents the target utilization level for the pool.

**Path 1: Optimal Usage Factor is Zero (`optimal usage factor == 0`)**

If the `optimal usage factor` is set to zero, the protocol employs an exponential borrowing rate model.

*   **Formula:** The borrowing factor is calculated based on the formula conceptually represented as `(r / P)^e * b`, where:
    *   `r` is the `reserved USD`.
    *   `P` is the total `pool USD` (total value of liquidity).
    *   `e` is the `borrowing exponent factor`, a parameter controlling the curvature of the rate increase.
    *   `b` is the base `borrowing factor`, another configurable parameter.
*   **Behavior:** In this model, the borrowing rate increases exponentially as the ratio of reserved USD (`r`) to total pool liquidity (`P`) increases. This means the cost of borrowing ramps up very quickly as potential pool stress (represented by `r`) becomes a larger fraction of the available liquidity (`P`).

**Path 2: Optimal Usage Factor is Non-Zero (`optimal usage factor != 0`)**

When a non-zero `optimal usage factor` is configured, the protocol uses a "kinked" interest rate model, similar to those found in lending protocols like Aave V3. This model results in a piecewise linear borrowing rate curve. The calculation is handled by the `getKinkBorrowingFactor` function.

*   **Inputs:**
    *   `u`: The `usage factor` calculated earlier.
    *   `u_o`: The `optimal usage factor` (the configured target utilization / kink point).
    *   `b0`: The `base borrowing factor`, representing the rate's slope *below* the optimal usage.
    *   `b1`: The `above optimal usage borrowing factor`, related to the rate's slope *above* the optimal usage.
*   **Calculation Logic & Behavior:**
    *   **If `u <= u_o` (Usage is at or below optimal):** The borrowing factor increases linearly with usage. The formula is essentially `borrowing factor = b0 * u`. The rate increases relatively gently as utilization climbs towards the optimal point.
    *   **If `u > u_o` (Usage exceeds optimal):** The borrowing rate continues to increase linearly, but at a steeper slope. The rate at any point `u` above `u_o` is calculated as the rate *at* the kink (`b0 * u_o`) plus an additional amount. This additional amount increases linearly based on how far `u` exceeds `u_o`, scaled by the difference between `b1` and `b0`. The formula for the *additional* rate increase component above the kink is `max(b1 - b0, 0) * (u - u_o) / (1 - u_o)`. This "kink" sharply increases the cost of borrowing once utilization surpasses the target level, creating a strong incentive for users to take actions (like closing positions or adding liquidity) that bring utilization back below the optimal threshold.

In summary, the GMX Synthetics borrowing fee rate is a dynamic value carefully calculated based on the current state of market utilization. It uses either an exponential or a kinked linear model, determined by the `optimal usage factor` setting, to adjust borrowing costs in response to potential pool stress (`reserved USD`) and overall liquidity usage (`usage factor`), ultimately aiming to maintain pool solvency and stability.