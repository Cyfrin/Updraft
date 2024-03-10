---
title: Exploit - Failure to Initialize - Case Study
---

# Failure to Initialize: A Lesson from Smart Contract Exploits

If you've ever dabbled in the realm of smart contracts, you may be familiar with an infamous exploit called "Failure to Initialize." This notorious event unfolded in the Web Three Ethereum Ecosystem, involving a GitHub issue that potentially devastated the contract behind the Parity Wallet. It serves as a harsh reminder to all smart contract developers to initialize their contracts properly, or risk catastrophic failure.

In this blog post, we'll dissect the event and analyze the lessons learned. This way, we aim to prevent a similar misstep from reoccurring in our own projects or those of others.

## The Initial Issue

![](https://cdn.videotap.com/OY6Xn3YTnnAcgF4AnFtX-17.09.png)The tale starts with an innocent-looking [Git issue](https://github.com/paritytech/parity-ethereum/issues/6995) submitted to the Parity Wallet. Someone had unintentionally "killed" the contract - a possibility they were unaware of until it happened. This shocking event triggered a cascade of errors that brought to light a serious vulnerability in the smart contract.

The Etherscan transaction associated with it confirms the event. When we navigate down to the transaction details, click "Show more," and decode the input data, we can see the parameters they entered when they accidentally invoked the contract's kill function.

The user was merely experimenting with the contract — not anticipating that their "play" would cause such devastation. They had overlooked a significant precaution in the preparation: initializing their initializer function.

Tragically, the initializer, which was initially neglected, was later invoked. This act inadvertently caused the breakdown of a contract hosting a considerable sum. It's a tale that triggers despair among developers and serves as a potent reminder: **Never forget to initialize your contracts**.

> "Initialize your initializers. This might seem like a simple step, but one oversight can cause catastrophic consequences for your contracts."

## Lessons You Should Carry

What enlightenment can we glean from this unfortunate event? Well, it screams out the need for initialization. It also raises questions about potential methods to ensure initialization is never omitted, like incorporating it into a deployment script or implementing a parameter that blocks the rest of the system from interacting until initialization has occurred.

While we are discussing potential solutions, it is crucial to note that merely attaching a “onlyInitialized” modifier to functions won’t cut it. This strategy is often ignored by developers who are looking to save on gas fees. However, the primary concern here is to guarantee initialization, irrespective of how it is achieved.

In the dissected smart contract, there were no blockers placed to prevent interaction with the contract until initialization was complete. This absence is a glaring shortfall needing rectification.

Remember, **initialization can be front-run**. It's vital you put mechanisms in place to prevent such actions from happening, which might wreak havoc akin to the Parity Wallet incident.

## Remember This Tale

This event, classified under the infamous hack, is widely known as "Failure to Initialize". To avoid facing this unfortunate situation, get familiar with the case study, and make sure to initialize your initializers appropriately.

With the constant evolution of the Ethereum ecosystem, it's crucial to learn from our predecessors' missteps. Let this serve as a lesson to you: Pay attention to initializations, or you might accidentally "kill" something you didn't intend to.

The dark tale of this smart contract mishap should remain a beacon guiding you away from similar pitfalls. It's a call to ensure attentive and thorough development processes, bearing in mind that one small oversight can lead to the interruption of an entire system.

> "Even the smallest oversight in a contract can lead to the destruction of the entire protocol. Understanding the importance of the initialization steps is critical. Remember, don't let a similar fate befall your contracts."

And lastly, let the grim tale of "Failure to Initialize" remind you: it's wiser to prevent than lament.
