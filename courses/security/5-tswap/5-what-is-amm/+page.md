---
title: What is an AMM & How AMM works?
---

_Follow along with this video:_



---

# Understanding Automated Market Makers: A Deep Dive into Decentralized Finance

Decentralized finance is gaining popularity as the world turns towards blockchain technologies for secure, transparent financial transactions. Central to DeFi's attraction is the Automated Market Maker (AMM), a unique trading model that is reshaping our understanding of trading mechanisms. However, to grasp this concept effectively, let's first refresh our understanding of the traditional order book style of exchange.

## The Traditional Order Book Style of Exchange

Imagine that you want to trade on Coinbase or Robinhood. Here's what that process might look like:

1. You come to the exchange and say, "Hey, I want one WETH (Wrapped Ethereum) for ten USDC.”
2. You place an order that goes onto what's known as an 'order book.'
3. Another user sees your trade and decides they're interested.

If the other user has one WETH and zero USDC, they might think your trade is reasonable and decide to take it. The system identifies these matched orders and facilitates the exchange. User A gives ten USDC to the system, which gives it to User B, and vice versa.

This model is commonly used by large, centralized exchanges; however, it does present a few challenges:

- Every exchange transaction using Ethereum costs 'gas' (i.e., the cost of computation). This can rack up significant costs for users and could potentially deter people from using the platform.
- With this style of exchange, a lot of computation work occurs behind the scenes. This complexity can hinder its full implementation on a decentralized platform like Ethereum.

So, knowing these limitations, Ethereum decided on an alternate approach.

![](https://cdn.videotap.com/e4EULmEIKYejqgjYxvO4-189.76.png)

## Enter the Automated Market Maker

Rather than placing orders and matching them as in an order book exchange, an AMM operates on the principle of liquidity pools.

Let's visualize this using an example:

1. Assume two giant pools of money or 'liquidity pools' exist — one with 100 WETH and the other with 1000 USDC.
2. User A wishes to buy one WETH with his ten USDC.

At this stage, a specific mathematical function comes into play:

- The system calculates the ratio of WETH to USDC in the pools which is 1000 USDC / 100 WETH = 10.
- So, the 'mock price,' as we are calling it, is 1 WETH = 10 USDC.

Now, if User A wants to take one WETH out of the pool, he must ensure the correct ratio is maintained. So he puts ten USDC into the USDC pool, and only then can he take out one WETH.

![](https://cdn.videotap.com/NDFbEb030FC4DlLUCFdR-355.8.png)

This alters the ratio in the pools. There are now 1010 USDC and 99 WETH. Recalculating, we see the ratio is now 1010/99 = 10.2. One WETH now amounts to 10.2 USDC - an increase of 0.2 USDC from the last transaction. By simply completing the transaction, User A has managed to move the market and change the price of WETH. This essentially resembles market dynamics breath the concept of supply and demand; as demand for an asset increases, so does its price, and vice versa.

![](https://cdn.videotap.com/csLNwV1pl8cFQGODANry-379.52.png)

This same principle applies when User B wants to trade. They can keep changing the ratios by adding or subtracting amounts in these pools to trade their preferred amount, given that the ratio always is maintained. This AMM model is known as a 'constant product market maker,' a type of AMM that maintains a constant product of the quantities of the two assets.

The following code block presents an example of how this might be implemented programmatically:

This demonstrates how an AMM operates in a simple and efficient manner, bypassing the traditional challenges of an order book model. But, it is important to remember that this simple example doesn't capture the complexity and potential risks associated with real-world AMMs.

AMMs are just one aspect of DeFi that is pushing the boundaries of what is possible in finance, allowing individuals to gain control over their financial interactions. However, it’s crucial to understand that, like any financial system, it comes with its own set of risks and challenges. Remember, your capital is always at risk when investing.

_“The fascination of DeFi lies in the infinite possibilities it brings to the world of finance, pushing boundaries and creating opportunities.”_
