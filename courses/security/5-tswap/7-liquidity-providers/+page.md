---
title: Liquidity Providers - Why AMMs have Fees?
---

---

### Liquidity Providers - Why AMMs have Fees?

In the previous lesson we detailed a high level overview of how an AMM works, hopefully we'll come away with an even deeper understanding of things in this lesson.

Let's break down an AMM a little further.

The first question that probably comes to mind is **_"Where did these pools of tokens (liquidity pools) come from?"_**

This is where `liquidity providers` come in. `Liquidity providers` add their tokens to liquidity pools to fund the trading by users. In exchange a liquidity provider will often receive an LPToken (liquidity provider token) at the ratio of what they've contributed to the total pool.

![liquidity-providers1](/security-section-5/6-liquidity-providers/liquidity-providers1.png)

The next questions you're probably asking are **_"Why would anyone do that? What's an LP Token?"_**

This is where `fees` come in. Let's look at a slightly adjusted diagram:

![liquidity-providers2](/security-section-5/6-liquidity-providers/liquidity-providers2.png)

Each transaction in a DEX like TSwap or Uniswap incurs a fee (we've used 0.3% as an example). This fee is typically added to the respective liquidity pool.

The LPToken that `liquidity providers` hold affords them claim to a set ratio of tokens in the pool, which means as fees are collected their total claim value goes up! This is where `liquidity providers` make profit from this system.

### Wrap Up

Alright! We should now have a better understanding of what financially powers these AMMs and the incentives liquidity providers have to contribute to these pools.

Let's go though a review from the top down of how AMMs work, in the next lesson!
