## Understanding Concentrated Liquidity in Curve V2

In this lesson, we'll explore how Curve V2 enables concentrated liquidity by examining the relationship between token amounts and spot prices on various graphs.

Initially, viewing the Curve V2 equation as a curve can make it difficult to visualize how it facilitates concentrated liquidity. To better understand this, we need to view Curve V2's Automated Market Maker (AMM) equation with the token amount on the horizontal axis, and the price of the token on the vertical axis. We�ll consider a simplified scenario with just two tokens, X and Y, where token X is ETH and token Y is wETH.

When graphing the price and token amounts for different AMMs, we will begin with a constant sum AMM, where the two tokens are swapped at a 1:1 rate. For a constant sum AMM, the price is always equal to one, no matter the amount of ETH.

Next, let's analyze the constant product AMM. With a constant product AMM, the price is high when the amount of token X is low and the price decreases when the amount of token X increases.

Now, let�s take a look at Curve V1. When the amount of token in the pool is around the middle, the price is equal to one. As the amount of tokens either increases or decreases, it starts to look like the constant product AMM, curving at the top and the bottom.

Lastly, let's analyze the Curve V2 graph, graphed in green. Curve V2 is an interesting graph, since it shares characteristics with both Curve V1 and constant product AMMs. When the token amount is closer to the middle, the price is close to one.  But the pricing quickly becomes similar to the constant product. 

This is how Curve V2 achieves concentrated liquidity. For a narrow range of tokens, it prices the tokens close to one. Outside of this narrow range, the pricing quickly becomes similar to a constant product. In another lesson, we will discuss how to plot the spot prices of different AMMs.

```python
 plt.axhline(1, color = "grey")
 plt.plot(xs, ps_cp)
 #plt.plot(xs, ps_curve_v1)
 #plt.plot(xs, ps_curve_v2)
 plt.legend([
     "constant sum",
     "constant product",
     #"curve v1",
     #"curve v2"
 ])
 
 plt.xlim(2, 18)
 plt.ylim(0, 10)
 plt.grid(True)
 plt.show()
```