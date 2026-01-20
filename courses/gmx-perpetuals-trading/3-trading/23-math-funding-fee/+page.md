## Understanding Funding Fee Calculation in Perpetual Swaps

Funding fees are a core mechanism in perpetual swap markets, designed to keep the contract's price aligned with the underlying asset's index price. This lesson explains the efficient method used to calculate these fees, drawing parallels to borrowing fee calculations often seen in DeFi lending protocols. The key lies in using cumulative tracking rather than iterating through historical data for every calculation.

**The Core Calculation Principle: Cumulative Tracking**

Similar to how some platforms calculate borrowing fees without checking every single second of a loan's history, funding fee calculations rely on global, cumulative values. The system tracks two main figures for each market:

1.  The *current* global cumulative funding fee accrued *per unit of position size*.
2.  The global cumulative funding fee per unit of position size *at the time a specific position was opened or last modified*.

Using these two values, the funding fee owed by (or claimable by) a specific position is determined simply:

`Funding Fee = Position Size * (Current Cumulative Fee Per Size - Entry Cumulative Fee Per Size)`

This formula efficiently calculates the total fee accrued during the period the position was held constant, based only on the change in the global cumulative metric.

**Market Dynamics and Payment Direction**

Funding fees facilitate payments *between* long and short position holders. Market conditions dictate the direction of payment:

*   Differences between the perpetual contract price and the underlying asset's index price.
*   The relative sizes of total long open interest versus total short open interest.

Sometimes longs pay shorts, and other times shorts pay longs. To simplify the initial explanation of the underlying math, we will temporarily assume a specific scenario: **the total size of long positions (long open interest) is always greater than the total size of short positions**. In this simplified case, **longs always pay funding fees to shorts**. We will revisit this assumption later to show the complete picture.

**A Robust Method: Handling Both Payment Directions**

The simplifying assumption (longs always pay shorts) doesn't hold true in real markets. The system needs a way to handle periods where shorts must pay longs. This is achieved by tracking *two separate* global cumulative funding fee metrics per unit of position size:

1.  **Cumulative Long Funding Fee Per Size:** Tracks fees relevant to long positions. Let's denote the *per-interval* fee contributing to this as `F_i`.
2.  **Cumulative Short Funding Fee (Claimable) Per Size:** Tracks fees relevant to short positions. Let's denote the *per-interval* fee contributing to this as `C_i`.

The update logic depends on which side is paying:

*   **When Longs Pay Shorts** (e.g., Funding Rate > 0): The *long* cumulative fee metric (`F_i`) is updated.
*   **When Shorts Pay Longs** (e.g., Funding Rate < 0): The *short* cumulative fee metric (`C_i`) is updated (though the interpretation might shift slightly, the principle of tracking separately remains).

This separation ensures that when calculating the fee for a specific position using the `Position Size * (Current Cumulative - Entry Cumulative)` formula, the correct cumulative fee stream (either the one relevant for longs or the one for shorts) is used based on the position's side.

**Detailed Calculation Steps and Formulas**

Let's break down how the per-unit fees are determined and how the cumulative approach simplifies the calculation, initially using our assumption that longs pay shorts.

**1. Funding Fee Per Unit Size (at time interval `i`)**

Imagine time progressing in discrete intervals (e.g., seconds or hours when funding is paid: t0, t1, t2...). At each interval `i`, a total funding amount is paid from the larger side (assumed longs) to the smaller side (assumed shorts). To use the cumulative method, we need this fee expressed *per unit* of position size for each side:

*   **For Longs (Paying):** Let `F_i` be the funding fee paid *per unit* of long position size at interval `i`.
    `F_i = (Total Funding Fee paid at interval i) / (Total Long Open Interest at interval i)`
*   **For Shorts (Claiming):** Let `C_i` be the funding fee claimed *per unit* of short position size at interval `i`.
    `C_i = (Total Funding Fee paid at interval i) / (Total Short Open Interest at interval i)`

**2. The Naive (Inefficient) Calculation**

Without the cumulative trick, calculating the total funding fee for a user `u` over a period from time `k` to `N` would involve summing the fees accrued at each interval, considering their position size at that specific moment.

*   **Notation:**
    *   `L_{u,i}`: Long position size of user `u` at time `i`.
    *   `S_{u,i}`: Short position size of user `u` at time `i`.
*   **Total Long Funding Fee (Paid by User `u`):**
    `Total Long Fee = Sum_{i=k}^{N-1} (L_{u,i} * F_i)`
    This sums the product of the user's long size and the per-unit long fee for each interval `i` from `k` up to (but not including) `N`.
*   **Total Short Claimable Funding Fee (Received by User `u`):**
    `Total Short Claimable Fee = Sum_{i=k}^{N-1} (S_{u,i} * C_i)`
    This sums the product of the user's short size and the per-unit short claimable fee for each interval `i` from `k` up to `N-1`.

These summations are computationally expensive, especially for long durations or frequent updates.

**3. Simplification via Cumulative Factors**

To avoid the costly summation, we use the cumulative approach. This requires an assumption: the user's position size remains **constant** between the time they open/modify the position (time `k`) and the time the fee is calculated (time `N`).

*   **Simplification for Long Positions:**
    *   Assume user `u` holds a constant long position `L` from time `k` to `N` (i.e., `L_{u,i} = L` for all `i` such that `k <= i < N`).
    *   The sum becomes: `Sum_{i=k}^{N-1} (L * F_i)`
    *   Factor out the constant size `L`: `L * Sum_{i=k}^{N-1} F_i`
    *   The sum over the interval `[k, N-1]` can be expressed as the difference between two cumulative sums starting from time 0:
        `Sum_{i=k}^{N-1} F_i = (Sum_{i=0}^{N-1} F_i) - (Sum_{i=0}^{k-1} F_i)`
    *   Let `Cumulative_F(t)` represent `Sum_{i=0}^{t} F_i`. The formula becomes:
        `Funding Fee = L * (Cumulative_F(N-1) - Cumulative_F(k-1))`
    *   This is exactly the `Position Size * (Current Cumulative Fee Per Size - Entry Cumulative Fee Per Size)` form mentioned earlier. `Cumulative_F(N-1)` is the global cumulative long fee per size at the *current* time, and `Cumulative_F(k-1)` is the value recorded when the position was opened/last updated at time `k`.

*   **Simplification for Short Positions:**
    *   Assume user `u` holds a constant short position `S` from time `k` to `N` (i.e., `S_{u,i} = S` for `k <= i < N`).
    *   The sum becomes: `Sum_{i=k}^{N-1} (S * C_i)`
    *   Factor out `S`: `S * Sum_{i=k}^{N-1} C_i`
    *   Express as a difference of cumulative sums:
        `Sum_{i=k}^{N-1} C_i = (Sum_{i=0}^{N-1} C_i) - (Sum_{i=0}^{k-1} C_i)`
    *   Let `Cumulative_C(t)` represent `Sum_{i=0}^{t} C_i`. The formula becomes:
        `Claimable Fee = S * (Cumulative_C(N-1) - Cumulative_C(k-1))`
    *   Again, this matches the principle: `Position Size * (Current Cumulative Fee Per Size - Entry Cumulative Fee Per Size)`, using the appropriate cumulative metric for short positions.

**Implementation in Practice**

These simplified formulas, derived by assuming constant position size between updates and using the difference of global cumulative sums, are computationally efficient. They represent the method typically implemented in the codebase of platforms like GMX for calculating funding fees when users interact with their positions (open, close, modify size, claim fees). The system updates the global cumulative factors (`Cumulative_F` and `Cumulative_C`) periodically, and individual position fees are calculated based on the *change* in these factors since the position's last interaction point.