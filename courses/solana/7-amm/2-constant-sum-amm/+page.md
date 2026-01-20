# The Mathematics of a Constant Sum AMM (CSAMM)

Automated Market Makers (AMMs) are the engines powering decentralized exchanges (DEXs). While the most famous AMM model is the "Constant Product" formula popularized by Uniswap V2, it is not the only way to facilitate trading.

To truly understand decentralized finance (DeFi) liquidity, one must understand the **Constant Sum AMM (CSAMM)**. This model offers a unique property: it maintains a fixed exchange rate regardless of the trade size or the quantity of tokens in the pool.

In this lesson, we will deconstruct the mathematics behind the Constant Sum AMM, visualize how liquidity works, and walk through specific trading scenarios to prove how the exchange rate remains stable.

## The Core Mathematical Equation

At the heart of any AMM is an invariant equation—a mathematical rule that the contract must satisfy before and after every trade. For a Constant Sum AMM, that equation is linear:

$$x + y = L$$

Here is what these variables represent:
*   **$x$**: The quantity of **Token X** held in the liquidity pool.
*   **$y$**: The quantity of **Token Y** held in the liquidity pool.
*   **$L$**: The **Invariant** (or Constant Sum). This number represents the total depth of the pool.

The defining characteristic of this model is that $L$ remains constant during a trade (swap). It only changes when a liquidity provider adds or removes tokens from the pool.

## Visualizing the Constant Sum Curve

If we plot this equation on a Cartesian plane—where the X-axis represents Token X and the Y-axis represents Token Y—the result is a **straight diagonal line**.

This linearity is significant. In calculus and geometry, the slope of the line represents the price relationship between the two assets. Because the line is straight, the slope never changes. Consequently, the price never changes.

*   **Current State:** The pool's status is represented by a specific point $(x_0, y_0)$ on this line.
*   **Swapping:** A trade involves sliding that point along the line.
*   **Liquidity:** Adding funds moves the entire line further from the origin (up and to the right), while removing funds moves it closer to the origin (down and to the left).

## How Liquidity Affects the Equation

To understand how $L$ functions, let us look at the mechanics of adding liquidity.

Imagine a pool that begins in an empty state or a state where we simply define the initial parameters.
1.  **Initial State:** A provider deposits 50 Token X and 0 Token Y.
    *   $50 + 0 = 50$. Therefore, $L = 50$.
2.  **Adding Liquidity:** A second provider adds 50 Token Y.
    *   The pool now holds 50 Token X and 50 Token Y.
    *   $50 + 50 = 100$.

The new invariant $L$ is now **100**. Visually, the graph describing the pool has shifted outward. The pool is now "deeper," meaning it can facilitate larger trades, but the price ratio (1:1) remains exactly the same.

## Execution of a Swap: The Math in Action

The primary difference between a Constant Sum AMM and other models is the lack of "price impact" or slippage. Whether you trade 1 token or 1,000 tokens, the exchange rate is fixed.

Let’s trace the math of a swap assuming our pool currently has **50 Token X** and **50 Token Y** ($L = 100$).

### Scenario 1: Swapping Token Y for Token X
Suppose a user wants to buy Token X. Specifically, they want to remove enough Token X to reduce the pool's reserves to 20.

1.  **The Goal:** The pool starts with 50 Token X. The user wants to leave the pool with 20 Token X.
2.  **The Output:** The user receives $50 - 20 = 30$ Token X.
3.  **The Requirement:** The equation $x + y = 100$ must remain true.
    *   If the new $x$ is 20, we solve for $y$: $20 + y = 100$.
    *   $y$ must equal 80.
4.  **The Input:** The pool started with 50 Token Y but now requires 80 Token Y. The user must provide the difference.
    *   $80 - 50 = 30$ Token Y.

**Result:** The user inputs **30 Token Y** and receives **30 Token X**. The exchange rate is exactly 1:1.

### Scenario 2: Swapping Token X for Token Y
Now, let’s reverse the trade. A user approaches the same pool ($x=50, y=50$) and wants to swap **30 Token X** for Token Y.

1.  **The Input:** The user adds 30 Token X to the pool.
2.  **New Reserve X:** The pool now has $50 + 30 = 80$ Token X.
3.  **The Requirement:** We must satisfy the invariant $80 + y = 100$.
    *   Solving for $y$, the new reserve must be 20.
4.  **The Output:** The pool currently holds 50 Token Y, but only needs to hold 20. The excess is sent to the user.
    *   $50 - 20 = 30$ Token Y.

**Result:** The user inputs **30 Token X** and receives **30 Token Y**.

## Comparison: Constant Sum vs. Constant Product

To fully appreciate the Constant Sum model, it is helpful to contrast it with the Constant Product model (used by Uniswap V2).

### Constant Product ($x \cdot y = k$)
In this model, the graph is a curve (a hyperbola). As you buy more of Token X, the supply decreases, and the price of Token X increases exponentially relative to Token Y. This creates **slippage**—the more you buy, the worse your price becomes.

### Constant Sum ($x + y = L$)
In this model, the graph is a straight line. There is **zero price impact**.
*   If you input 50 units, you get 50 units out.
*   If you input 28 units, you get 28 units out.

## Summary

The Constant Sum AMM is the simplest form of automated market making. By utilizing the linear formula $x + y = L$, it guarantees a fixed price ratio between two assets. While this model is ideal for assets that should always trade at parity (such as two stablecoins pegged to the same dollar), it relies entirely on the available liquidity ($L$) in the pool to facilitate trades. As long as the reserves exist, the price remains absolute.