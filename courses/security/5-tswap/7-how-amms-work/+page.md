---
title: How AMMs Work Recap
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/p779dDo6tFs?si=3cmuPmVhnzDOiW6A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Understanding Automated Market Makers, T-SWAP and Uniswap

Cramming a ton of concepts into one learning session can be overwhelming. But let's decode the concepts of T-SWAP or Uniswap, and how Automated Market Makers (AMMs) operate and differ from traditional order books.

## Reviewing Traditional Order Books

In typical exchanges, a user may propose a trade, for instance, as wanting 1 ETH for 10 USDC. This proposal gets placed into an order book. Users are then able to propose their own trades or to accept others' proposals. This method is how a traditional centralized exchange operates, using the order book methodology.

Here's a basic example:

> \[ User1: TRADE PROPOSAL — 1 ETH for 10 USDC \]

However, a lot happens behind the scenes in this model. Orders are being matched, and with an extensive list of orders in their order books, this process can be highly gas-consuming, involving multiple transactions on the centralized exchange.

**IMAGES HERE**

The challenge with decentralized finance (DeFi) is this model's costs. If many transactions lead to significant gas spending and if you have to wait for someone to accept your trade, it could take quite a few blocks. So, the question is — how can we manage costs and keep trading to one transaction?

## Introducing Automated Market Makers (AMMs)

Enter AMMs, a solution to the above problems. Instead of an order book, we work with giant pools of money and utilize the ratio between these pools as the assets' price. To take money out of one pile, you need to put equivalent ratio into the other pile. This concept is known as the AMM, more specifically, the constant product market maker or constant product formula.

Also, each swap that users make on their smart contract collects an added fee. These fees incentive people to create and contribute to these money pools as liquidity providers actually make profit from these accumulated fees with more trades people make.

## Understanding T-swap and Uniswap

Both [Uniswap](https://uniswap.org/) and T-swap use the AMM model. Uniswap, for instance, has gone through several iterations (v1, v2, v3 with v4 currently in progress), each slightly different but fundamentally based on the AMM's principles.

When learning a protocol, consider taking a hands-on approach. Connect to the protocol through a secure wallet and test out transactions.

> **NOTE:** The 'Discussions' tab, Piranha IO, the Ethereum Stack Exchange, Discord, and Telegram are invaluable resources for understanding novel solutions that developers and protocol creators are cooking up. Get comfortable asking questions, especially when conducting a private audit.

With time, the process becomes more navigable, allowing you to understand the protocols and begin tinkering with the code.

## Building Context and Better Understanding AMMs

Let's explore further. If unclear, don't sweat it. It's okay to not get everything right away — continue to ask questions and gradually everything will fall into place.

Browse through the Git repo associated with the current section, go to the audit data branch, and take a good look at the accompanying diagrams. They will offer a good visual understanding of how these concepts interlock.

To better understand AMMs and keep up with the evolving world of DeFi, keep probing, keep asking questions, keep building context. No one method is a silver bullet — the best way to learn is the way that works for you.

> "The more you work with it, the more sense it'll make."
