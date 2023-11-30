---
title: DAOs & Governance Intro
---

_Follow along with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/SHk-0QWvXzs?si=EV9kL54A7sVqHVu2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Welcome back to yet another session in the series, today we're pacing up to lesson 14 of the topic "Foundry DaoGovernance." All the code that we'll be using during the tutorial has been shared on the Github repository. So, make sure to check it out.

## Closer Look at DAOs

Before we dive into how to build a DAO, it's crucial to solidify our understanding of DAOs. DAO stands for Decentralized Autonomous Organization, which can be somewhat confusing due to its broad definition. It essentially refers to any group operated by a clear set of rules embedded within a blockchain or smart contract.

## How DAOs Work: An Overview

In simplest terms, imagine if all users of Google were given voting power on Google's future plans. Instead of decisions being privately made behind closed doors, the process is public, decentralized, and transparent. This innovative concept empowers users and eliminates trust issues, making DAOs a revolutionary area of exploration.

Let’s dive deeper into DAOs by watching a few videos I have created in the past. After viewing these videos, we will shift focus to the practical aspect of coding a DAO.

<img src="/daos/1-intro/dao-intro1.png" alt="Dao Image" style="width: 100%; height: auto;">

## Understanding DAO's Through Compound Protocol

Compound protocol is a stellar example that can help us understand the intricacies of DAOs. It's a borrowing and lending application constructed with smart contracts. Navigating through the protocol, we discover a governance section that offers an interface showing all the proposals and ballots. Here, the proposals to change aspects of the protocol such as adding new tokens, adjusting APY parameters, or blocking certain coins, etc. are enlisted.

This governance process is required since the contracts used often have access controls where only their owners, in this case, the governance DAO, can call certain functions.

<img src="/daos/1-intro/dao-intro2.png" alt="Dao Image" style="width: 100%; height: auto;">

A DAO do not limit its functionality to proposals and voting only. It also incorporates the feature of discussion forums where community members can deliberate on proposals, justifying their pros and cons before going ahead with the voting process.

## Building a DAO: Architecture and Tools

After understanding the basic workflow of DAO, let’s now talk about the architecture and tools that go into building DAO. First and foremost is the voting mechanism. One thing to keep in mind is to ensure that the voting mechanism is transparent and provides a fair way for participants to engage.

DAO uses three main mechanisms for voting:

1. ERC-20 or NFT Token as voting power: This approach is inherintly biased toward those who can afford to purchase more tokens, leading to a skewed representation of interests.
2. Skin in The Game: Based on an article by Vitalik Buterin, he suggests that voters accountable for their choices. In this approach, people who vote for a decision that leads to negative outcomes will have their tokens taken away or reduced. Deciding which outcomes are bad is the tricky part.
3. Proof of Personhood or Participation: This is where everyone in the community gets a single vote, regardless of how many wallets or tokens they have. This method is the most fair, but also the most difficult to implement due to the problem of civil resistance.

On chain and off chain are the two ways to implement voting in a DAO:

- Onchain voting is simple to implement and transparent, but gas fees can add up quickly for large communities.
- Offchain voting saves on gas fees and provides a more efficient way to vote, but presenting challenges in regards to centralised intermediaries.

### Tools for Building a DAO

There are several no-code solutions and more tech-focused tools to help you build a DAO, including:

- DAOstack
- Aragon
- Colony
- DaoHouse
- Snapshot
- Zodiac
- Tally
- Gnosis safe
- OpenZeppelin contracts

Before wrapping up, it's essential to touch briefly on the legal aspects of DAOs. DAOs are in a gray area operationally, with the state of Wyoming in the United States being the only state where a DAO can be legally recognized. Read up on the legal implications before you dive into creating your DAO!

Remember, as an engineer, you have the power to build and shape the future of DAOs. So dive in and get building!

Stay tuned for our next sublesson, where we will guide you through the process of building a DAO from scratch. Remember to hit the like and subscribe button for more engineering-first content on smart contracts. Happy coding!
