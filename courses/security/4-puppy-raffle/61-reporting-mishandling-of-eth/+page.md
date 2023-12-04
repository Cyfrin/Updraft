---
title: Reporting - Mishandling of Eth
---

_Follow along with this video:_

## 

---

# Extracting Value in Smart Contracts: MEV, Mismanagement, and Griefing

Hey, there! Have you ever wondered about some nuisances involved when interacting with smart contracts, like Miner Extractable Value (MEV), mishandling of ETH, or griefing attacks? Well, you're in the right spot! In this blog, we'll explore these issues, which even though we've touched on already, warrant a deeper dive. Disclaimer: This post won't be a comprehensive guide on MEV, as that's a topic for another time.

![](https://cdn.videotap.com/NqCVyQXfwU8fKONZhudq-4.23.png)

## Miner Extractable Value (MEV): A Brief Introduction

First off, we need to understand that well-engineered smart contracts have provision for fees. These fees act as incentives for miners to prioritize transactions. But in scenarios where users compete for these fees, it gets trickier. Fees withdrawal can become challenging if there are active players. This is what we refer to as _Miner Extractable Value (MEV)_. It means that miners can choose transactions based on the fees they might earn from them, giving them significant power.

```markdown
Note: I'll provide a thorough write-up on MEV in a future post. So, stay tuned!
```

## ETH Mishandling: Unintended Barriers

Next, let's talk about ETH mishandling that often stems from imperfectly written smart contracts. Imagine a line of code in a smart contract that creates needless complications. We've got an example here to demonstrate what we mean.

In an (admittedly poor) implementation of a raffle system, if someone calls `enterRaffle`, a certain amount of ETH gets locked. The issue arises when the contract checks for exact equality; if the values aren't directly equal, the function will fail, making it incredibly hard for this person to withdraw fees.

Clearly, this makes for terrible user experience, as well as poor contract design. It's a glaring example of a line that needs to be pulled out to enhance the contract's reliability and usability.

## Griefing Attacks: Watch Out!

Users could also just be jerks and not let you withdraw your money. Just instantly enter the raffle every time a new raffle starts, right? That would suck. And you'd never be able to get your money out. So uncool.

All these issues become painfully obvious when thoroughly auditing a smart contract and with practice you'll get better at spotting them.

![](https://cdn.videotap.com/Zw8G2tXiZWXa0p4wmsR7-67.66.png)

## Wrapping Up

There you have it! A quick tour through some common problems you might encounter when working with smart contracts. Yes, the rabbit hole goes a lot deeper, but we've covered some good ground here. Keep the conversation going and share your experiences in the comments! Remember, we're in this together — let's turn those bug-infested lines of code into flawless protocols.

And don't forget, I'm prepping a dedicated MEV post — watch out for it soon. Thanks for reading!
