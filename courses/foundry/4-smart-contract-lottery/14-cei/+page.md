---
title: Checks, Effects, and Interactions
---

_Follow along with this lesson and watch the video below:_



---

In this lesson, we'll explore a critical design pattern that every smart contract developer needs to know - the Checks-Effects-Interactions (CEI) pattern. By adhering to this pattern, you'll ensure your smart contracts are more secure and maintainable.

## Understanding the Checks-Effects-Interactions (CEI) Pattern

Coding smart contracts requires a particular style called Checks-Effects-Interactions or CEI. This is one of the several design patterns that smart contract developers need to maintain in their coding processes. Following the CEI pattern increases the overall security of your contracts.

The CEI pattern involves three detailed steps:

1. **Checks:** This is the initial step where you do all your validations or checks. An example could be your `requires` or `if-then` errors. Generally, it's more efficient to place these checks at the very beginning of your contract. The reason is they are more gas-efficient. In a situation where you need to revert, doing so at this stage will save more gas than performing other computations only to revert later.

   <img src="/foundry-lottery/12-cei/cei1.png" style="width: 100%; height: auto;">

2. **Effects:** In this step, you make changes or "effects" within your own contract.
3. **Interactions:** This final step involves interactions with other contracts. One crucial point to note here is it's best to interact with outside contracts last.

One of the reasons to follow this pattern is to avoid reentrancy attacks, a common vulnerability in smart contracts. Understanding and implementing the CEI pattern early on means you're proactively safeguarding your contracts from potential attacks.

## Effective Handling of External Interactions and Events

While discussing the third step of the CEI pattern – interactions, we should touch on the usage of events and their placement in the code. Emitting an event at the end might seem like an external interaction, but it's not. It would be best to move it before we have any interactions with external contracts.

<img src="/foundry-lottery/12-cei/cei2.png" style="width: 100%; height: auto;">

There can be a debate about the position of events. Some developers prefer positioning them after the interactions. However, if we take a look from the code review or audit perspective, it's usually recommended to place the event before the external interactions, largely because of several reasons that we'll cover in subsequent blog posts.

In conclusion, the Checks-Effects-Interactions (CEI) pattern is a cornerstone of secure, gas-efficient smart contract development. Remember this design pattern and apply it consistently when developing your smart contracts: always do your checks first, followed by the effects, and finally perform external interactions. Following this approach is a step in the right direction towards ensuring you're always delivering robust and secure smart contracts.
