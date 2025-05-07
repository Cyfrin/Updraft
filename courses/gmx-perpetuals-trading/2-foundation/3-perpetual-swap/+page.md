## What Are Perpetual Swaps? Betting on Crypto Price Direction

While technical definitions often describe perpetual swaps using terms like "derivatives," "futures contracts," and "margin requirements," these can be confusing if you're new to the concept, especially in the context of platforms like GMX. Let's explore a more intuitive way to understand them.

Fundamentally, a **Perpetual Swap** is a **bet on the *direction*** of a cryptocurrency's price. Will the price go up, or will it go down? That's the core question you're answering when you engage with a perpetual swap.

**How Profit and Loss Work**

The profit and loss mechanism is straightforward:

*   **Profit:** If the price moves in the **same direction** as your bet, you make a profit.
*   **Loss:** If the price moves in the **opposite direction** of your bet, you incur a loss.

**No Actual Tokens Are Traded**

This is a crucial point: when you use a perpetual swap, you are *only* betting on the price direction. **No underlying tokens are actually bought or sold** as part of the swap itself. This is different from a regular swap you might perform on a centralized exchange (CEX) or decentralized exchange (DEX), where you actively trade one token for another (e.g., swapping ETH for USDC).

The benefit here is that you can speculate on the price movement of an asset, like Bitcoin, without needing to own any Bitcoin tokens beforehand.

**From "Bets" to "Positions"**

In trading platforms like GMX, these "bets" on price direction aren't called bets; they are referred to as **positions**. Going forward, we'll use the term "position" to describe these directional speculations.

**Key Feature: Perpetual (No Expiry Date)**

Unlike traditional futures contracts that have a set expiration date, perpetual swap positions have **no expiry date**. This is why they are called "perpetual." You can keep your position open indefinitely, provided you meet one key condition.

**Key Feature: Collateral Requirement**

To **open a position** (i.e., make your bet), you must first deposit **collateral**. This collateral is usually another asset, such as a stablecoin (like USDC) or a major cryptocurrency (like ETH).

The primary **purpose of this collateral is to cover any potential losses** your position might incur if the price moves against your prediction.

**Closing Your Position**

There are two main ways a position can be closed:

1.  **Voluntary Closure:** You can choose to **close your position** at any time. When you do this, you either:
    *   Claim your accumulated **profit**.
    *   Realize your accumulated **loss**. Any losses incurred are **paid directly from the collateral** you deposited.

2.  **Forced Closure (Liquidation)**: You can keep your position open *as long as* your deposited **collateral is sufficient to cover your current unrealized losses**. However, if the price moves significantly against you and your **losses grow to be very close to the total value of your deposited collateral**, the platform (like GMX) will automatically and **forcefully close your position**. This process is known as **liquidation**. When liquidated, your accumulated losses are paid using your collateral, meaning you effectively lose the collateral that was securing that specific position.

**In Summary**

A perpetual swap allows you to speculate on whether a cryptocurrency's price will go up or down, without actually trading the cryptocurrency itself. These bets are called "positions," they don't expire (hence "perpetual"), and require you to deposit collateral. You profit if your prediction is correct and lose if it's incorrect, with losses being deducted from your collateral. You can close your position anytime, but if your losses become too large relative to your collateral, the platform will force a closure (liquidation).