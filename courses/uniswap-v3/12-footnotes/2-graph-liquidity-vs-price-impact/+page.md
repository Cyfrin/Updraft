### Constant Product AMM: Liquidity and Price Impact

In a constant product AMM, higher liquidity results in a smaller price impact for traders. This means that for the same amount of tokens put in, traders will get more tokens out. We will demonstrate how higher liquidity leads to a lower price impact by comparing two constant product AMMs.

In this example, we have two constant product AMMs. The AMM on the right has higher liquidity than the one on the left. The equation for both AMMs are represented as:

```javascript
x * y = L^2
```

Where x represents token x, y represents token y, and L represents the liquidity. In the first AMM, `L^2` equals 20. In the second AMM, L equals 50, giving it higher liquidity.

We will compare a trade on both AMMs by putting in the same amount of tokens and looking at the final price, the amount of tokens received, and the execution price.

Both AMMs start with a price of 1. We then add 20 token X in each AMM. On the lower liquidity AMM, we receive 10 token Y in return and the new price becomes 0.25. 

On the higher liquidity AMM, we receive approximately 14 token Y in return and the new price becomes approximately 0.51.

By comparing the numbers we can observe that when we trade on the higher liquidity AMM, we get more token Y back. Additionally the price impact on the higher liquidity AMM is less. On the lower liquidity AMM, the price changes from 1 to 0.25, with a price difference of 0.75. On the higher liquidity AMM, the price changes from 1 to 0.51, with a difference of 0.49.

The execution price, which is the amount of token Y received divided by the amount of token X sent, is simply the exchange rate between the two tokens. On the lower liquidity AMM, the execution price is 0.5 (10 / 20). On the higher liquidity AMM, the execution price is approximately 0.71.

As traders we want a better exchange rate. In this case the better deal is the one with the higher execution price, swapping on the curve with the higher liquidity.

This illustrates how a constant product curve with higher liquidity results in less price impact and a better deal for a trader. Furthermore, if we increase the liquidity, we can see the execution price increases and the price impact decreases.
