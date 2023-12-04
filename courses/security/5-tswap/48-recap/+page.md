---
title: Recap
---



---

# DeFi Security Auditing – A Recap

Hey there! If you've been with us from the start of our series on DeFi Security Auditing, congratulations on reaching this point! This is going to be a recap encompassing everything you've learned so far in the course. In case you missed out on something, don’t worry, let's walk through them again.

## Protocol Invariants – Your Secret Weapon

First and foremost, we realized that understanding protocol invariants is crucial in locating bugs hidden in our code bases. We don’t even need to explore the code base deeply or conduct a tedious manual review. We found how we can write an invariant or a stateful fuzzing test suite, which pointed out a bug in the swap function – a process without any manual review.

In essence, the tooling, particularly stateful fuzzing, is a powerful mechanism for bug detection.

## Unfolding the AMM Mystery

We touched upon the underlying fundamentals of an AMM, or Automated Market Maker, and what a DEX (Decentralised Exchange). Even though the T-Swap audit revolves around a fictitious protocol, its foundation is based on Uniswap and follows exactly the same X times Y equals K principle.

We learned that the AMM works without an order book. It simply uses token pools, and to extract tokens from one side, tokens need to be added to the other side, maintaining the balance. Everyone is on the lookout for a platform where every swap transaction means money in their purses.

## Understanding the Uniswap Protocol

Boiling down the core mechanisms of the Uniswap protocol, X multiplied by Y equals K is the mathematical model where K is a constant, ensuring the token ratio remains unchanged. Every time you wish to take a token, you need to provide an equivalent amount back.

Dealing with a protocol like an AMM where math is the crux of the system, the importance of invariants is highlighted.

## Identifying Client Requirements

Earlier, the absence of illustrative graphs and even the lacking of documentation for some functions made working somewhat daunting. But over time, we've learned that we need to function hand-in-hand with the protocol. They always have the inside story, and understanding their needs is indispensable.

Our comprehensive client onboarding document illustrates this point, particularly the section about T-SWAP having onboarded. We learned that onboarding our protocols and obtaining as much information as possible is of utmost importance.

A case in point would be their low test coverage, an issue we'd definitely want them to address. They churn out multiple ERC20s. And if you don't know by now, ERC20s are pretty wacky. Understanding this helps to architecturally protect the protocol from the peculiarities of these ERC20s.

We also learned that it's not advisable to work with any and every ERC20. Instead, a restriction list or documentation indicating potentially problematic tokens (like rebasing tokens, fiat transfer tokens, reentrancy tokens) is a good practice. Hence, an extensive onboarding document and deep client interaction can take you a long way.

## Keeping Invariants in Check

Our journey took us through understanding what protocol invariants are – they represent those attributes of the system that must always remain constant. We learned to write fuzzing or stable fuzzing tests to go hand in hand with them.

Referencing the Freepy model where protocol invariant checks are directly embedded into the system, Uniswap stands as a good example of such a system. In stark contrast was the Euler finance attack, where the absence of an invariant check led to their exploit. But people do differ on nomenclature, some prefer to call it CEI and pre and post-checks.

## Diving into DeFi

The constant product formula X \* Y = K, oft-used in many DeFi protocols, particularly AMMs, is a powerful tool. For more adventurous explorations into the realm of DeFi, DeFi Llama is a great resource.

Having said that, we were also introduced to other beneficial tools like stateful and stateless fuzzing, Echidna consensus, and other fuzzers. Although mutation or differential testing didn't make it onto the list, they're definitely on the cards for future lessons.

## Deciphering Solidit

Solidit presented itself enormously useful, allowing us to cross-check if an issue has been previously pointed out by someone else. It helps us to learn about new findings and also verify if we're on the right track.

## Welcome to A World Of Weirdness

No, we're not stepping into a horror movie. Welcome to the world of ERC20s, where weird is the new normal, and this trend doesn't seem to be fading. But not to worry – Trail of Bits has provided a handy checklist to make sure you're making the right choices. There's also a master list naming all the weird ERC20 tokens – a post-apocalyptic catalog if you'd wish to call it so.

## Concluding Thoughts

If you’ve accompanied us this far, give yourself a round of applause. It's remarkable progress considering the level of understanding you now hold. You've essentially audited the Uniswap codebase and are now fully equipped to delve into the world of security, undertake competitive audits, bug bounties, or even get hired!

Nevertheless, we recommend you complete the course to further enrich your learning. Pat yourself on the back for your achievement, take a well-deserved break, and get ready to tackle some challenges ahead.
