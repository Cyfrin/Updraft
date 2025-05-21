## Understanding GMX Synthetics Price Impact

GMX Synthetics employs a "price impact" mechanism to maintain balance within its liquidity pools and markets. This system incentivizes users to perform actions that reduce imbalances and penalizes actions that increase them. The way price impact is calculated and applied differs depending on whether you are swapping tokens, managing long/short positions, or providing liquidity.

## Price Impact During Swaps

When performing a swap on GMX, price impact is determined by the balance between the long and short tokens within the specific liquidity pool.

**Pool Imbalance Calculation (Swap):**
The imbalance is the absolute difference between the total USD value of tokens designated as "long" in the pool and the total USD value of tokens designated as "short".
`Imbalance = | USD value of long pool tokens - USD value of short pool tokens |`

**Effects of Price Impact (Swap):**
The system evaluates whether your swap helps or hurts the pool's balance relative to its target weights.

*   **Positive Impact (Balancing Swap):** If your swap moves the pool closer to its ideal balance (e.g., you swap out an overweighted token or swap in an underweighted token), you receive a *bonus*. This bonus is added directly to the `amount out` you receive, meaning you get more output tokens than a simple price conversion would indicate.
*   **Negative Impact (Imbalancing Swap):** If your swap increases the pool's imbalance (e.g., you swap out an already underweighted token or swap in an overweighted token), you incur a *fee*. This fee is deducted from your `amount in` *before* the swap calculation occurs. Effectively, you pay more input tokens for the same output amount, or receive fewer output tokens for your initial input.

**Code Implementation (Swap):**
The core logic resides in the `_swap` internal function within the `SwapUtils.sol` contract. It utilizes `SwapPricingUtils.getPriceImpactUsd` to calculate the price impact in USD (`priceImpactUsd`).

1.  The `_swap` function calculates `priceImpactUsd`.
2.  If `priceImpactUsd` is positive:
    *   It calculates the equivalent bonus amount in terms of the output token (`priceImpactAmount`).
    *   This `priceImpactAmount` is added to the base calculated `amountOut`.
3.  If `priceImpactUsd` is negative:
    *   It calculates the equivalent fee amount in terms of the input token (`priceImpactAmount`).
    *   This `priceImpactAmount` (as a positive value representing the fee) is subtracted from the input amount (`fees.amountAfterFees`, which is the user's input after standard swap fees).

## Price Impact on Long and Short Positions

For opening and closing leveraged positions, price impact is determined by the balance of open interest in the specific market (e.g., ETH/USD).

**Market Imbalance Calculation (Positions):**
The imbalance is the absolute difference between the total USD value of open long positions and the total USD value of open short positions for that market.
`Imbalance = | Total long open interest (USD) - Total short open interest (USD) |`

**Effects of Price Impact (Open Position):**
When opening a position, price impact adjusts the *size of your position in tokens* (`size delta in tokens`) relative to the size you specified in USD (`size delta in USD`). This effectively changes your entry price (execution price).

*   **Opening a Long Position:**
    *   *Positive Impact (Helps Balance - e.g., Long OI < Short OI):* Increases `size delta in tokens`. This means you get a larger position size for your collateral, resulting in a *lower (better) execution price*.
    *   *Negative Impact (Increases Imbalance - e.g., Long OI > Short OI):* Decreases `size delta in tokens`. You get a smaller position size, resulting in a *higher (worse) execution price*.
*   **Opening a Short Position:**
    *   *Positive Impact (Helps Balance - e.g., Short OI < Long OI):* Decreases `size delta in tokens` (mathematically, subtracting a negative impact amount increases the effective size for a short, or subtracting a positive impact amount decreases it). This results in a *higher (better) execution price* for a short seller.
    *   *Negative Impact (Increases Imbalance - e.g., Short OI > Long OI):* Increases `size delta in tokens`. This results in a *lower (worse) execution price* for a short seller.

**Effects of Price Impact (Close Position):**
When closing a position, the impact manifests differently:

*   **Positive Impact (Helps Balance):** You receive *bonus tokens*. These tokens can be the collateral token or the PnL token, depending on the transaction specifics.
*   **Negative Impact (Increases Imbalance):** You *pay a fee* deducted directly from your position's collateral.

**Code Implementation (Positions):**

*   **Opening:** The `PositionUtils.getExecutionPriceForIncrease` function calculates the adjusted position size.
    1.  It calculates `priceImpactUsd` using `PositionPricingUtils.getPriceImpactUsd`.
    2.  It converts `priceImpactUsd` into a token amount adjustment (`priceImpactAmount`).
    3.  For longs, `sizeDeltaInTokens = baseSizeDeltaInTokens + priceImpactAmount`.
    4.  For shorts, `sizeDeltaInTokens = baseSizeDeltaInTokens - priceImpactAmount`.
    5.  This adjusted `sizeDeltaInTokens` is used to determine the final position size and, consequently, the execution price. The Profit and Loss (PnL) calculation, found in functions like `PositionUtils.getPositionPnlUsd`, depends on this adjusted size (`position.sizeInTokens`), thereby reflecting the price impact.
*   **Closing:** The `DecreasePositionCollateralUtils.processCollateral` function handles the fee or bonus application.
    1.  It retrieves the `priceImpactUsd` (calculated during the closing price determination, e.g., via `getExecutionPriceForDecrease`).
    2.  If `priceImpactUsd` is positive:
        *   A bonus amount (`deductionAmountForPool`) is calculated.
        *   This bonus is added to the user's output tokens (either primary or secondary output).
    3.  If `priceImpactUsd` is negative:
        *   The absolute value of `priceImpactUsd` is passed to an internal `payForCost` function, which deducts the fee from the user's collateral.

## Price Impact When Depositing Liquidity

When adding liquidity to a GMX market pool (minting GM tokens), price impact works similarly to swaps, based on the pool's token balance.

**Pool Imbalance Calculation (Deposit):**
Same as swaps:
`Imbalance = | USD value of long pool tokens - USD value of short pool tokens |`

**Effects of Price Impact (Deposit):**

*   **Positive Impact (Helps Balance):** If your deposit provides tokens that the pool needs relative to its target weights, you are rewarded with *additional market tokens (GM tokens)*. You essentially get more LP tokens than your deposited value would normally mint.
*   **Negative Impact (Increases Imbalance):** If your deposit adds more of an already overweighted token, you are penalized. A *fee* is deducted from your deposited amounts *before* the system calculates how many market tokens to mint for you.

**Code Implementation (Deposit):**
The logic is handled within the `_executeDeposit` internal function in `ExecuteDepositUtils.sol`, which is called for both the long and short token portions of a deposit.

1.  The function receives the relevant `priceImpactUsd` for the token being deposited.
2.  If `priceImpactUsd` is positive:
    *   A `positiveImpactAmount` is calculated.
    *   The equivalent value of this impact in market tokens is calculated and *added* to the `mintAmount`.
3.  If `priceImpactUsd` is negative:
    *   A `negativeImpactAmount` is calculated.
    *   This `negativeImpactAmount` (as a positive value) is *subtracted* from the deposit amount (`fees.amountAfterFees`) *before* it's used to calculate the number of market tokens to mint.

In summary, GMX's price impact mechanism dynamically adjusts outcomes for swaps, position management, and liquidity provision based on pool and market imbalances. By rewarding balancing actions and penalizing imbalancing ones, it encourages users to contribute to the overall health and stability of the protocol.