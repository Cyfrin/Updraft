## Slippage

Slippage is the difference between the price you expect to receive when trading on a decentralized exchange (DEX) and the price you actually receive. It is caused by the way DEXs, such as Uniswap, calculate the amount of tokens traded.

Let's look at an example. Suppose we want to swap DAI for ETH. We check the current price on the DEX, which is 1 ETH = 2000 DAI. If we send 2000 DAI to the DEX, we expect to receive 1 ETH in return.

However, let's say that another trader, Bob, simultaneously sends 2000 DAI to the DEX to buy ETH. Since Bob's trade is also executed, the price of ETH changes. The DEX recalculates the price of ETH, and it is now 0.99 ETH = 2000 DAI.

In this situation, Bob gets 0.99 ETH, while we get 1 ETH. The difference is because of the slippage.

The slippage will vary depending on a number of factors such as:

- **The size of your trade:** Larger trades will result in more slippage.
- **The liquidity of the trading pair:** Less liquid trading pairs will result in more slippage.
- **Market volatility:** If the market is volatile, there will be more slippage.

We can visualize slippage using an AMM curve.

This curve represents the relationship between the amount of DAI and ETH in the liquidity pool. As we trade on the DEX, the curve shifts. The amount of ETH we receive is represented by the length of the blue line on the curve. The length of the blue line for Bob's trade is shorter than the length of the blue line for our trade.

Because of the way the AMM curve is curved, the amount of ETH we receive diminishes with each trade.

### As shown in the diagram.

![Pasted image 20250416081726](https://github.com/user-attachments/assets/47ff14b9-aaa0-4b29-84cf-98169327b47c)
