---
title: What is an AMM & How does an AMM work?
---

_Follow along with this video:_

---

### What is an AMM & How does an AMM work?

AMMs or Automated Market Makers differ greatly from a classical `order book` style exchange.

Before we better detail an AMM, we should first understand how `order book` exchanges work.

### Order Book Exchanges

An order book exchange is fundamentally very simple, it will track desired buy and sell orders and effectively try to match them.

![what-is-an-amm1](/security-section-5/5-what-is-an-amm/what-is-an-amm1.png)

Order book exchanges come with a fatal flaw in a blockchain ecosystem though - cost.

Any time a user posts an order, buy or sell, this is going to be a transaction, matching them will be a transaction, the tracking and managing of that data for the exchange has an overhead cost.

An order book exchange on ethereum can rapidly become slow and expensive.

This is where Automated Market Makers come in!

### Automated Market Makers

An AMM functions by leveraging asset pools with the goal of maintaining the ratio of assets traded with the pool.

![what-is-an-amm2](/security-section-5/5-what-is-an-amm/what-is-an-amm2.png)

As we can see, as orders are placed against the liquidity pools the ratio between the two assets traded changes, this drives the price of the asset pair for the next trade when executed.

When structured this way, any given user only needs to trade with the liquidity pool, in a single transaction to execute their trade.

This is much less gas and computationally expensive in an environment like Ethereum.

In the next lesson we'll look more closely at liquidity providers and where these pools come from.
