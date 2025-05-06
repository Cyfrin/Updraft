## Understanding Liquidation in Perpetual Swaps

Perpetual swap contracts offer a unique feature in the trading world: they lack an expiry date. This theoretically allows traders to keep their positions open indefinitely. However, this flexibility comes with a critical risk management mechanism known as **Liquidation**. Liquidation ensures that a trader's losses cannot spiral beyond the collateral they've deposited, thereby safeguarding the trading protocol (like GMX) and its liquidity providers from accruing bad debt.

Liquidation is the process by which a trading protocol **forcefully closes** a trader's open position. When this occurs, the **collateral** that was securing that position is **seized by the protocol**. This seized collateral is then used primarily to cover the trading losses incurred by the position up to the point of closure.

A position doesn't get liquidated randomly; it happens only when a specific condition is met. This condition assesses whether the remaining value backing the position, after accounting for market losses and associated fees, has fallen below a predetermined safety level.

The core condition that triggers liquidation can be represented as follows:

```
collateral - position loss - fees < min
```

When the calculated value on the left side of this inequality drops below the minimum threshold (`min`), the protocol flags the position for liquidation. Let's break down each component of this formula:

*   **`collateral`**: This represents the **current market value (in USD)** of the assets the trader deposited as collateral for their position. It's crucial to distinguish this from the value used for other calculations. While the *initial* USD value of the collateral (at the time the position was opened) is used to determine the maximum position size, the liquidation check uses the **current, fluctuating USD value**. This is particularly important if the collateral itself is a volatile asset, as its depreciation can bring a position closer to liquidation even without adverse price movement in the traded asset.

*   **`position loss`**: This is the unrealized loss currently sitting on the open position. It's calculated based on the difference between the price at which the position was entered and the current market price (often referred to as the index price). The calculation varies depending on whether the position is long or short:
    *   For a **Long Position** (betting the price will increase): A loss occurs if the `current index price` is *less than* the `index price at entry`.
    *   For a **Short Position** (betting the price will decrease): A loss occurs if the `current index price` is *greater than* the `index price at entry`.

*   **`fees`**: These are the accumulated costs associated with maintaining the position that are payable to the protocol (e.g., "fees to GMX"). These can include one-time fees incurred when opening or potentially closing the position, as well as ongoing fees accrued over the life of the position, such as funding fees or borrow fees. These fees effectively reduce the amount of collateral backing the position over time. A detailed breakdown of specific fees is often covered elsewhere but remember they contribute to the potential for liquidation.

*   **`min`**: This is a **minimum USD value threshold** set by the protocol (e.g., "minimum USD value of any position set by GMX"). It represents the lowest acceptable value the position can reach before being forcibly closed. This value acts as a critical safety buffer. By liquidating a position *before* its net value (collateral minus losses and fees) reaches zero or goes negative, the protocol ensures there's still enough value remaining to cover the closing process and prevent the system from incurring losses it cannot cover.

In summary, liquidation is triggered when the protection provided by your collateral is eroded by market movements against your position and accumulated fees. Specifically, when the `current USD value of your collateral`, less the calculated `position losses`, and less the total `fees` owed, falls below the `minimum threshold value (min)` defined by the protocol, your position will be automatically closed, and your remaining collateral forfeited. Understanding this mechanism is vital for managing risk when trading perpetual swaps.