---
title: Introduction
---



---

# Deep Dive into Security Testing with the Thunder Loan Audit

Welcome back to your favorite security course repository! I trust you've spent some time on that fuzzing exercise because this lesson is going to be a _real deep dive_ into security testing. We've already learned tons of tools and skills, and now it's time to really apply and hone those skills as we dig into _Section Six: Thunder Loan Audit._

## The Context: Thunder Loan Protocol

Let's begin by git-cloning this lesson's code fro Github.

![](https://cdn.videotap.com/iLoskdCcOE28WEUkiXTF-68.76.png)

This richly detailed protocol we'll be auditing has a fantastic logo - a frog with a thunder bolt on its chest standing over a pile of money. However, beneath this cool exterior, there lies a multitude of bugs waiting to be smoked out. This protocol also gives us a detailed experience of two of the most important DeFi protocols in the world, _Aave and Compound_, as it's majorly based on these.

## DeFi, Borrowing, and Lending

These protocols are the crux of DeFi borrowing and lending, a fundamental financial concept in the DeFi universe. Whilst auditing the Thunder Loan protocol, we'll naturally delve a bit into understanding Aave and Compound.

## Pricing Information and Oracles

We had a touch on this in the Puppy Raffle exercise. However, here we delve deep into the significance of sourcing accurate pricing information for assets and how to ace this process effectively as we interact with Oracles.

> "A lot of people use \[upgradable contracts\]. We need to know how to keep them secure."

## Upgradable Contracts

For the first time, we'll be interfacing with an upgradable contract, a common feature in the wild world of Web 3. Now, whether or not these contracts are optimum is up for debate, but their usage is indeed undeniable.

## Multifaceted Proxies

We are not going to be delving deep into the multifaceted proxy, also known as _the diamond standard_, but we're definitely going to talk a bit about its functionalities and distinctive features.

![](https://cdn.videotap.com/bnzGy4zQOk9RwQjEXVOh-189.08.png)

Moreover, we'll be learning about another brilliant tool called the **Upgrade Hub**. This tool comes in handy for discerning which contracts have been upgraded and which upgrades might be construed as rug pulls. By inserting a contract address, you'll be able to view its complete upgrade history, appearing similarly to git diffs.

> "Upgrades are highly sensitive in the Web 3 world. This \[Upgrade Hub\] is a great place to learn about and work with proxies and view their history."

## Centralization and Defi Security Audits

Our previous interactions with the T-SWAP or Uniswap audit only scratched the surface, introducing us to DEXes, invariants, and important DeFi protocols. With Thunder Loan, we’re moving to a new level.

This protocol’s code base has many common DeFi bugs, which make this one of the most important audits you can learn from. In addition to these security flaws, it introduces the concept of flash loans—a "monster" tool with an enormous amount of information to explore.

By the time you've audited this code base, which consists of multiple folders and contracts and guides you through a more advanced protocol, you'll significantly enhance your understanding of DeFi security audits.

## Price Oracle Manipulations

According to the curriculum, price oracle manipulation was the principal attack for the first half of 2023. So as we audit the Thunder Loan protocol, we'll be learning how to tackle this risk head-on.

> "This course provides an extensive and comprehensive walk-through of the protocol that’s packed with so many common DeFi bugs that you will learn plenty along the way.”

To wrap it up, the full report and notes on how to generate the audit report are waiting in the Thunder Loan git repo’s `audit-data` branch as usual. Brace yourself and get ready to unearth a treasure trove of bugs and become a better security tester while we audit the Thunder Loan protocol!
