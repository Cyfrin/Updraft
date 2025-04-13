# Uniswap V3 Just In Time Liquidity

In this lesson, we will explore `Just In Time Liquidity` on Uniswap V3.

First, let's say that Alice is a liquidity provider, and her position is in the current price, which we have illustrated in purple.

Next, Bob swaps tokens, which moves the price from P0 to P1. From this trade, Alice earns swap fees, and is happy. This is how a typical liquidity provider earns some fees.

Now, let’s look at how Just In Time Liquidity will change how liquidity providers earn fees.

Again, let's say that Alice is a liquidity provider, and her position is at the current price. Bob submits a transaction to swap tokens. However, here's where things get different. Justin sees Bob's transaction in the mempool, and front-runs Bob's transaction to add liquidity.

Let's say that this is the transaction mempool, and inside it, there are some pending transactions. Inside, Bob submits his transaction to swap tokens. Justin sees that Bob has submitted a transaction to swap tokens, and then Justin submits a transaction to add liquidity. Justin makes sure that his gas price is higher than Bob's, so that Justin's transaction to add liquidity comes before Bob's transaction to swap tokens. 

Justin's transaction to add liquidity is processed, and then next Bob's transaction to trade tokens is processed. Let's say that this moves the price from P0 to P\*1.

Let's take a look at what this looks like on a graph. Before Bob submits his transaction, the current price is at P0. Justin sees that Bob submitted a transaction, and then front runs Bob’s transaction. Let’s say that Justin adds a lot of liquidity in a narrow price range including the current price. We have shown Justin's liquidity in red. Close to the current price of P0, Alice has provided about this much liquidity, while in the same price range, Justin has provided this much liquidity, a lot more than Alice.

This means when a trade executes between this price range, Justin will earn the majority of the fees. Bob’s trade is processed, and the price moves from P0 to P\*1. Take a note here that the price change from P0 to P\*1 is less than the price change from P0 to P1. Here, there is less liquidity, so the price moves a lot. Whereas over here, there’s a lot of liquidity around the current price range, so the price moves very little. This is called Just In Time Liquidity.

Justin sees that Bob has submitted a transaction to do a trade, and front runs the transaction to add liquidity, so that Justin can earn a lot of the trading fees.

With Just in Time Liquidity, Alice earns very little fees, which is bad news for her. Justin on the other hand earned most of the fees, which is good news for him. Also, Bob got a great price for his trade, which is good news for him too.

Why is that? This is because, when there is more liquidity, there is less price change.

To put this in math:
```
P*1 - P0 < P1 - P0
```
Where the left side of the inequality is the price change from P0 to P\*1, when Justin added liquidity. The right side is the price change when Bob traded on Alice's liquidity, without Justin adding his liquidity.

So in summary, Just in Time Liquidity is bad news for Alice, good news for Justin, and good news for the trader Bob.
