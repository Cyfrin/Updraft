# Curve V1 vs V2

In this lesson, we explored Curve, an Automated Market Maker (AMM) suitable for tokens such as DAI, USDC, and USDT. These are stable coins, pegged to one dollar. Curve V1 gives a better trade for tokens that are like this, in comparison to Uniswap V2. Curve V1 is not built for tokens where the price is usually different, such as USDC and ETH. USDC is pegged to one dollar, while the price of ETH fluctuates significantly.

Until Curve V2, which is an AMM that supports volatile tokens, this was the case. We see token pairs like USDC, WBTC, and ETH. Similar to Curve V1, you can add and remove liquidity in a single token you specify. For example, in this pool with three tokens, USDC, WBTC, and ETH, we can add liquidity only in USDC and later, take out the liquidity only in ETH. This feature was already present in Curve V1.

Now, you might wonder what makes Curve V2 special compared to Uniswap V2. Curve V2 algorithmically concentrates liquidity to the exponential moving average that is tracked inside the contract. Concentrated liquidity means that as a liquidity provider, you set a price range, and you are willing to buy and sell tokens inside of that range. This was introduced by Uniswap V3. For example, in the ETH/USDC pool of Uniswap V3, you can set a price range to add liquidity. For the higher price range, we'll set it to 2452.866, and for the lower price range, we'll set it to 2450.414. By concentrating liquidity, you earn more swap fees, if the market price moves around this range. If the market price goes out of range, you'll be left with only one of the tokens.

The problem with Uniswap V3 is that you need to actively manage your liquidity. If the current market price goes out of the price range of your liquidity position, then you have to remove and reposition your liquidity closer to the market price. This costs gas and you may lose tokens in the process.

In Curve V2, liquidity is automatically concentrated based on the exponential moving average. Curve V2 has an internal price oracle that tracks the exponential moving average of the prices. By being aware of the exponential moving average, Curve V2 can programmatically decide where to concentrate liquidity. The other big difference between Curve V1 and V2 is the fee structure. In Curve V1, the percentage of the swap fee is fixed inside the contract. However, in Curve V2, the swap fee is dynamic. And this is based on the amount of tokens that are inside the contract.

```
a = 2 ^ ( -t / T_1/2 )
p* = p_last(1-a) + ap*_prev
g = gamma_fee / gamma_fee + 1 - (PI x_i / (SUM x_i / N)^N)
f = g f_mid + (1-g) f_out
```
