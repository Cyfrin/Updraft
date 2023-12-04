---
title: Reentrancy - Recap
---

_Follow along with this video:_

## 

---

# Unraveling Reentrancy Attacks in Ethereum Smart Contracts

Reentrancy Attacks within the blockchain ecosystem have become a considerable concern. These attacks exploit a vulnerability found predominantly in Ethereum smart contracts, causing significant damage and financial loss. This blog post hones in what a reentrancy attack is, how to identify one, and, most crucially, what you can do to effectively protect your smart contracts from falling victim to such an attack.

![](https://cdn.videotap.com/fLgSr8bv86FfH9PCnTAk-12.55.png)

## Understanding Reentrancy Attacks

At its most basic, a reentrancy attack appears as follows. An attacker begins by calling a victim's contract, which in turn calls some external contract. This external contract then circles back and calls the victim contract - repeating the process continuously. The critical flaw that makes this possible is a state change that isn't made before calling this external contract. This diagram provides a more nuanced view of the situation.

![](https://cdn.videotap.com/bUHtSEcSIcBowtKkMcSw-31.36.png)

The victim deposits and immediately the attacker launches an attack, which calls back to the attack contract. This callback triggers a withdrawal, leading back to the attack contract, provoking another withdrawal, and so on. This recurring action is only possible because we neglect to update the state until the very end - instead of carrying out this crucial step before initiating any external calls.

## Catching Reentrancy Attacks

Being a common attack vector, reentrancy attacks can be reproduced quite effortlessly. There are a multitude of tools that can help in detecting such risks, one of them being [Remix](http://remix.ethereum.org/), a powerful tool for Solidity programming. You'll find that it's quite straightforward to test and simulate reentrancy attacks using this platform. Static analysis tools such as [Slither](https://github.com/crytic/slither) are similarly handy in identifying these threats. Slither steps in when manual auditors make a slip — this is why static analysis tools are so invaluable. However, bear in mind to only rely on powerful static analysis tools capable of catching Reentrancy issues.

> "If we screw up as manual auditors, Slither or some other static analysis tool can catch this."

## Ways to Block Reentrancy Attacks

Defense against reentrancy attacks can be approached in two ways. Firstly, you can use checks, effects, interactions to conduct the state change prior to making any external calls.

![](https://cdn.videotap.com/T6NG2ok8Y9Hcf4Jmh3Kv-87.82.png)

Alternatively, OpenZeppelin's non-Reentrant modifier can be used or some type of modifier (e.g., `if, locked`) which is also identified as a mutex lock in computer science.

## Summing Up

This disturbing streak of reentrancy attacks that still plagues us today extends back to June 2016 with the Dow hack. It is distressing to note that 14% of all ETH in existence was threatened at the time, as evidenced by [this repo](https://github.com/pcaversaccio/reentrancy-attacks) managed by Pascal.

However, despite the sobering reality, we are far better equipped today to detect and prevent these attacks. We have the knowledge, the tools, and the power to prevent the further plundering of Ethereum assets. Here's to a more secure future, where you'll never miss a Reentrancy attack ever again!

> "Really important attack. Glad you got it."
