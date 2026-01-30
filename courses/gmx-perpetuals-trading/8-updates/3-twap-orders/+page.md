# TWAP Orders

TWAP (Time-Weighted Average Price) orders are a specialized order type on GMX that allow traders to break down large orders (positions and swaps) into smaller, evenly distributed executions over a specified time period. The primary goal is to reduce price impact and slippage for large orders.

## Purpose and Benefits

**Reduce Price Impact**: By splitting a large order into smaller chunks executed over time, TWAP orders minimize the market impact that would occur from executing the entire order at once.

**Network Fee Protection**: Network fees are paid once upfront when the TWAP order is created. If network fees increase during the execution period, GMX covers the extra costs, protecting traders from unexpected fee spikes.

## How to Create

1. Select the "Long", "Short", or "Swap" from the trading side menu.
2. Under the tab, select "TWAP"
3. Proceed with setting up TWAP duration

![GMX TWAP](https://github.com/Cyfrin/defi-gmx-v2/blob/updates/notes/twap.png?raw=true)
