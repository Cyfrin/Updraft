## Understanding Leverage and Position Size on GMX

When trading on decentralized perpetual platforms like GMX, the term "leverage" might seem familiar from traditional finance, where it often means borrowing funds to increase exposure. However, within the GMX ecosystem, it's crucial to understand a specific operational definition.

In the context of GMX, leverage refers to the act of opening a trading position whose total value, known as the "position size," is a specific multiple (let's call it `x`) of the USD value of the collateral you deposit to initiate that position. The key relationship is:

**Open a position that is `x` times the USD value of collateral.**

This means the leverage you select directly determines how large your trade is relative to the capital you initially commit.

Let's illustrate this with practical examples. Assume you decide to provide `1000 USDC` as collateral for your trade. We'll also assume, for simplicity, that 1 USDC is approximately equal to $1 USD, making the initial USD value of your collateral around `$1000`.

**Example 1: Using 2x Leverage**

If you choose to open a position with `2x leverage` using your $1000 worth of collateral, what does this signify? It means the total size of the position you are opening will be two times the USD value of your deposited collateral.

*   **Calculation:** `Position Size = 2 * (USD value of 1000 USDC)`
*   **Result:** `Position Size ≈ 2 * $1000 = $2000`

So, with $1000 collateral and 2x leverage, you control a position worth $2000.

**Example 2: Using 5x Leverage**

Now, let's consider using `5x leverage` with the same $1000 collateral. Following the GMX definition, this means you are opening a position whose size is five times the USD value of your collateral.

*   **Calculation:** `Position Size = 5 * (USD value of 1000 USDC)`
*   **Result:** `Position Size ≈ 5 * $1000 = $5000`

In this case, your $1000 collateral allows you to establish a position valued at $5000.

**The Core Formula**

This relationship between leverage, collateral, and position size can be formalized into a key equation used within GMX's mechanics:

`position size = leverage x USD value of collateral when this position is created`

A critical point to remember is that the "USD value of collateral" used in this calculation is specifically its value *at the exact moment the position is opened*. This initial value locks in the starting size of your position. Subsequent fluctuations in the collateral's price do not change this initial calculated position size, although they will affect your margin and liquidation risk.

Understanding how to calculate your position size based on your chosen leverage and the initial USD value of your collateral is fundamental. This calculated position size is the basis upon which your future profit and loss (PnL) for that trade will be determined.