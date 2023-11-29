---
title: Recon (continued)
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/fTi9rI6qWlQ?si=t4Ir8p4WtT_HQloZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Understanding the Thunder Loan Protocol: A Comprehensive Review

Welcome to another intriguing blog post where we'll dive deep into the world of cryptocurrencies, specifically focusing on the Thunder Loan protocol. This post is rooted in our continued commitment to simplify complex subjects in decentralized finance for you.

## Contextualizing the Thunder Loan Protocol

Thunder Loan protocol, like many other DeFi (Decentralized Finance) protocols, is based on borrowing, lending, and flash loans. To fully grasp how this protocol operates, one must first comprehend how flash loans and borrowing/lending processes work.

> _"Sometimes when you're doing security reviews, you got to look up stuff that might not seem related."_

I recommend learning more about these protocols by exploring [Aave](https://aave.com) and [Compound](https://compound.finance). You could also watch related deep-dive videos to get more context.

## Breaking Down Flash Loans and Liquidity

So, what is a flash loan? In essence, flash loans involve users borrowing substantial sums, completing arbitrage trades, then returning the borrowed sum in the same transaction. They are rapid transactions that thoroughly leverage the capabilities of smart contracts.

Users, also known as liquidity providers, deposit their funds into the protocol. In exchange, they receive asset tokens, representing their stake in the protocol. Users also need to pay a small fee to the protocol, which depends on the borrowed sum.

One might be curious: how is this fee calculated?

Enter the **on-chain Tswap price oracle**.

## The Critical Role of the Tswap Price Oracle

Price oracles play a crucial role in crypto trading platforms. They act as a bridge, bringing external real-world data or computation on-chain.

> _"An Oracle is going to be a device that takes external real-world data or computation and brings it on-chain."_

For instance, a price oracle could determine the price of Ethereum – a concept forgotten by the material world. It's fascinating to note that the Thunder Loan protocol uses TSwap's Dex that we reviewed in our previous section as a price oracle.

Now, one might wonder: why would the protocol need a price oracle?

Let's dig in further.

## The Thunder Loan Protocol Upgrade

We have one more puzzling detail. Thunder Loan Protocol is planning to upgrade their current contract to the Thunder Loan upgraded contract.

This upgrade is a crucial element to be considered under the scope of our security review. The Thunder Loan seems to be an upgradable smart contract, following the Ownable Upgradable, UUPS Upgradable and Oracle Upgradable paths.

## Wrapping Up

Finally, we've learned how the protocol sheds light on flash loans, arbitrage, and provides various opportunities for liquidity providers apart from their usual asset token interest.

We've also noticed some unique features like the TSwap Price Oracle embedded into the protocol's ecosystem, contributing prominently to its functionality.

This post should have given you a thorough overview of the Thunder Loan protocol. Now would be an ideal time for you to reach out to the protocol or prepare their diagrams, detailing how their whole system actually works.

Remember to have fun, stay curious, and keep exploring!
