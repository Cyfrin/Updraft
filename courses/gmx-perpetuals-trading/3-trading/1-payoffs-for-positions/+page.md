## Understanding GMX Collateral Choices: WETH vs. USDC Payoff Analysis for ETH/USD

This lesson explores the critical decision of choosing collateral when trading leveraged perpetual contracts on the GMX decentralized exchange, specifically focusing on the ETH/USD market. We will analyze how using Wrapped Ether (WETH) versus a stablecoin (USDC) impacts the potential Profit and Loss (PnL) of both long and short positions. To achieve this, we will utilize the concept of payoff diagrams, visualizing how different strategies perform under varying market conditions.

## Core Concepts for Payoff Analysis

Before diving into specific strategies, let's define the fundamental concepts underpinning this analysis:

1.  **Collateral Choice on GMX:** When opening a leveraged position on GMX, you must deposit collateral. For the ETH/USD market, common choices include WETH and USDC. This choice is not merely procedural; it fundamentally alters the risk and reward profile of your overall position, as the collateral itself can fluctuate in value (in the case of WETH) or remain stable (in the case of USDC).
2.  **Payoff Diagram:** This is a graphical tool used to visualize the financial outcome of a trading strategy.
    *   **Axes:** The horizontal axis (x-axis) represents the price of the underlying asset (ETH price, denoted as 'x'). The vertical axis (y-axis) represents the Profit and Loss (PnL) of the entire strategy, typically measured in USD.
    *   **Purpose:** Payoff diagrams allow for a clear, visual understanding of how PnL changes as the underlying asset price moves, revealing breakeven points, maximum profit/loss potential, and overall risk exposure.
3.  **Leverage:** Leverage allows traders to control a position size larger than their deposited collateral. It magnifies both potential profits and potential losses. In the context of payoff diagrams, leverage directly influences the *slope* of the payoff line. Higher leverage results in a steeper slope, meaning PnL changes more dramatically for smaller changes in the underlying asset price.
4.  **Delta Neutrality:** A position or strategy is considered delta neutral if its overall value does not change significantly with small fluctuations in the price of the underlying asset. On a payoff diagram, a perfectly delta-neutral strategy (ignoring fees) is represented by a flat, horizontal line (slope = 0), indicating that PnL is insensitive to price movements within a certain range.

## Simulation Parameters and Assumptions

To illustrate the payoff characteristics, we will use a specific set of parameters and assumptions, similar to those used in a graphical simulation (like one performed in Desmos). Note that these are simplified for clarity:

*   **Zero Fees:** We assume **all** GMX fees (opening/closing fees, swap fees, borrowing fees, funding rates) are zero. This is a significant simplification, as real-world fees will impact actual PnL.
*   **Entry Price of Index (`I₀`):** The ETH/USD price at which the long or short position is opened. Set to `I₀ = 100 USD`.
*   **Price ETH Collateral Was Bought (`P₀`):** The price at which the WETH used as collateral was initially acquired. Set to `P₀ = 50 USD`. This is crucial because the collateral itself carries a PnL based on its acquisition cost.
*   **Amount of ETH Collateral (`e₀`):** The quantity of WETH deposited as collateral. Set to `e₀ = 1 ETH`.
*   **Amount of USDC Collateral (`c₀`):** The quantity of USDC deposited as collateral. Set to `c₀ = 30 USDC` (assumed equivalent to 30 USD).
*   **Position Size (`E`):** The notional size of the long or short position, denominated in the base asset (ETH). Set to `E = 1 ETH`. (Note: On GMX, leverage is typically calculated based on collateral *value*, but for analyzing the payoff structure, defining `E` this way simplifies understanding the interaction with ETH price).

## Analyzing Individual Payoff Components

To understand the combined strategies, let's first examine the payoff profile of each individual component:

1.  **Long Position Payoff (`P_long(x)`):** Represents the PnL from a basic long ETH position, ignoring collateral.
    *   Equation: `P_long(x) = E * (x - I₀)`
    *   Calculation: Profit equals Position Size multiplied by the difference between the current ETH price (`x`) and the entry price (`I₀`).
    *   Payoff Profile: A line with a positive slope (`E`). PnL is zero at the entry price (`x = I₀`). Profit occurs when `x > I₀`, and loss occurs when `x < I₀`.

2.  **Short Position Payoff (`P_short(x)`):** Represents the PnL from a basic short ETH position, ignoring collateral.
    *   Equation: `P_short(x) = E * (I₀ - x)`
    *   Calculation: Profit equals Position Size multiplied by the difference between the entry price (`I₀`) and the current ETH price (`x`).
    *   Payoff Profile: A line with a negative slope (`-E`). PnL is zero at the entry price (`x = I₀`). Profit occurs when `x < I₀`, and loss occurs when `x > I₀`. Potential loss is theoretically unlimited as ETH price can rise indefinitely.

3.  **Cash (USDC) Collateral Payoff (`P_cash(x)`):** Represents the "PnL" contribution of holding stablecoin collateral.
    *   Equation: `P_cash(x) = c₀`
    *   Calculation: The value of the USDC collateral is constant in USD terms, regardless of the ETH price (`x`).
    *   Payoff Profile: A flat, horizontal line at `PnL = c₀` (e.g., 30 USD).

4.  **ETH Collateral Payoff (`P_eth(x)`):** Represents the PnL generated by holding the WETH collateral itself, relative to its acquisition price (`P₀`).
    *   Equation: `P_eth(x) = e₀ * (x - p₀)`
    *   Calculation: Profit equals the amount of ETH collateral multiplied by the difference between the current ETH price (`x`) and the price at which the ETH was acquired (`p₀`).
    *   Payoff Profile: A line with a positive slope (`e₀`). PnL is zero when the current ETH price equals the acquisition price (`x = p₀`).

## Payoff Analysis of Combined GMX Strategies

Now, let's combine these components to analyze the four primary strategies available on GMX for the ETH/USD market:

1.  **Long ETH with USDC Collateral (`P_longethusdc(x)`):**
    *   Combination: `P_long(x) + P_cash(x) = E(x - I₀) + c₀`
    *   Analysis: The total PnL is the sum of the long position's PnL and the fixed value of the USDC collateral.
    *   Payoff Profile: A line parallel to the basic long payoff (`P_long`) but shifted *vertically upwards* by the amount of cash collateral (`c₀`). The slope is determined solely by the position size `E`. Because of the upward shift, the *breakeven price* (where total PnL = 0) is lower than the entry price `I₀`. Using our example values: `1(x - 100) + 30 = 0` => `x - 100 = -30` => `x = 70`.

2.  **Long ETH with ETH Collateral (`P_longetheth(x)`):**
    *   Combination: `P_long(x) + P_eth(x) = E(x - I₀) + e₀(x - p₀)`
    *   Analysis: The total PnL includes gains/losses from the long position *and* gains/losses from the ETH collateral itself. Both components gain value when ETH price (`x`) increases and lose value when it decreases.
    *   Payoff Profile: A line with a positive slope equal to `(E + e₀)`. Since both `E` and `e₀` are positive, this slope is *steeper* than either the basic long position (`E`) or just holding the ETH collateral (`e₀`). This strategy amplifies exposure to ETH price movements – gains are larger when the price rises, but losses are also larger when the price falls, compared to using USDC collateral or just holding spot ETH.

3.  **Short ETH with USDC Collateral (`P_shortethusdc(x)`):**
    *   Combination: `P_short(x) + P_cash(x) = E(I₀ - x) + c₀`
    *   Analysis: The total PnL is the sum of the short position's PnL and the fixed value of the USDC collateral.
    *   Payoff Profile: A line parallel to the basic short payoff (`P_short`) but shifted *vertically upwards* by the amount of cash collateral (`c₀`). The slope is negative (`-E`). Because of the upward shift, the *breakeven price* (where total PnL = 0) is higher than the entry price `I₀`. Using our example values: `1(100 - x) + 30 = 0` => `100 - x = -30` => `x = 130`.

4.  **Short ETH with ETH Collateral (`P_shortetheth(x)`):**
    *   Combination: `P_short(x) + P_eth(x) = E(I₀ - x) + e₀(x - p₀)`
    *   Analysis: This strategy combines a short position on ETH with holding ETH as collateral. The short position profits when ETH price falls (`-Ex`), while the collateral profits when ETH price rises (`+e₀x`). These opposing exposures to ETH price movement can lead to hedging.
    *   Payoff Profile (Delta Neutrality): If the position size `E` is equal to the amount of ETH collateral `e₀` (i.e., `E = e₀ = 1` in our example), the terms involving `x` cancel out: `1(I₀ - x) + 1(x - p₀) = I₀ - x + x - p₀ = I₀ - p₀`. The resulting PnL is constant and does not depend on the current ETH price `x`. This is a **Delta Neutral** position.
        *   **Case 1: `p₀ = I₀`** (ETH collateral acquired at the same price as short entry). The payoff becomes `I₀ - I₀ = 0`. The payoff diagram is a flat horizontal line at `PnL = 0`. The position is perfectly hedged against price movements (ignoring fees).
        *   **Case 2: `p₀ < I₀`** (ETH collateral acquired *before* the short entry, at a lower price, e.g., `p₀=50`, `I₀=100`). The payoff becomes `I₀ - p₀ = 100 - 50 = 50`. The payoff diagram is a flat horizontal line at `PnL = 50`. The position is still delta neutral (insensitive to price changes), but it starts with a locked-in profit equal to the unrealized gain on the collateral at the time the short was opened.
    *   This strategy effectively hedges your ETH holdings against price declines while potentially earning fees (though fees are ignored in this simplified analysis).

## Key Takeaways on Collateral Choice

*   **Collateral Choice is Crucial:** Selecting between WETH and USDC as collateral on GMX significantly alters the risk/reward profile and price sensitivity of your leveraged position.
*   **USDC Collateral:** Provides a "purer" directional bet. The PnL profile mirrors the basic long or short payoff but is shifted vertically by the collateral amount, impacting the breakeven price but not the sensitivity (slope) to ETH price changes.
*   **WETH Collateral (Long Position):** Creates amplified exposure to ETH price. Both the position and the collateral gain or lose value together, resulting in a steeper payoff slope and greater PnL swings.
*   **WETH Collateral (Short Position):** Can create a delta-neutral (price-hedged) position, particularly if the position size (`E`) matches the collateral amount (`e₀`). The PnL becomes constant, insensitive to ETH price changes. The level of this constant PnL depends on the difference between the short entry price (`I₀`) and the collateral acquisition price (`p₀`). This is a common strategy for hedging spot ETH holdings.

## Important Considerations: Simplifications

It is essential to remember that this analysis relies on a significant simplification: **zero fees**. In reality, GMX charges fees for opening/closing positions, swaps, and imposes borrowing fees or funding rates. These costs will negatively impact the actual PnL of all strategies, generally shifting the payoff diagrams downwards. Funding and borrowing fees accrue over time and can slightly alter the effective slope or PnL level, especially for longer-held positions. Always factor in real-world costs when evaluating these strategies.