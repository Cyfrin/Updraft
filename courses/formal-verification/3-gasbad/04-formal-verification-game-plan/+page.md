---
title: formal verification game plan
---

## Warming Up with a Walkthrough

Before jumping into the deep end, let's limber up with a walkthrough of the smart contract code base. Feel free to spend as much time as you like getting familiar with it, because, as in any good adventure, the terrain of code can be both exciting and challenging to navigate. The goal here is not just to understand the code but to prepare to build a rigorous formal verification protocol.

## Building Our Game Plan

Down to business! I'm going to lay out our game plan right in the readme — and yes, I'm actually scrolling to the top! Here's what we have on our exciting agenda:

1. First, we’ll get our feet wet by verifying some stats of our NFT mock. 2. Next up, we're going to tackle formal verification for the "gas bad NFT marketplace".

### Focusing on Events Verification

As part of our formal verification, we want to zero in on events. These are crucial, as we aim for our smart contract to behave predictably and transparently. Here are our targets:

- **Event Emittance Upon Mapping Update**: Our mission is to guarantee that every time there's an update to mappings like `s_listings` or `s_proceeds`, an event is emitted, no exceptions. This is our way of ensuring the assembly functions like a well-oiled machine. Can we mess this up? Maybe — but can we formally verify that we haven't? Absolutely.
- **State Consistency Across Marketplaces**: We need to ensure that any function called on both the gas bad marketplace and the NFT marketplace results in the same end state, barring gas cost variations. This equivalence test adds a layer of robustness by checking for consistency. And you guessed it, we can formally verify this too.

These two verification goals are just the beginning, but through them, we stand to learn heaps about Certora and the magic of constructing a formal verification pipeline. The knowledge is invaluable, especially for projects that maintain a Solidity reference and a gas-optimized assembly or huff reference.

## Practicing With Certora

But wait! Before we deep-dive into the complexities of the NFT marketplace, let's warm up with our NFT mock. Why? Because repetition is the mother of skill, and we're here to make you skillful in the art of formal verification with Certora.

For our NFT mock exercise, we have a trifecta of objectives:

1. Ensure the total supply is consistently non-negative.
2. Verify that the mint function always creates exactly one mock.
3. Run sanity checks to solidify our understanding and skills.

These exercises are foundational, setting us up nicely for the complex verifications ahead.

## Implementing Formal Verification

Formal verification might sound daunting, but it's essentially a systematic approach to prove or disprove the correctness of algorithms underlying a system with respect to a certain formal specification or property. Employing formal verification methods robustly secures our smart contracts against unforeseen scenarios and potential exploits.

![](https://cdn.videotap.com/618/screenshots/taly7zYK8TdVHwMQwq4j-112.86.png)

### Step into the World of Smart Contracts

Now then, let's take a closer look at our `NFT mock.sol` and prepare to verify the set objectives. With formal verification, attention to detail is key. Our aim is to reach a level of confidence in our smart contracts that’s as concrete as the mathematics backing them.

### The Total Supply Check

Our total supply should always stay in the positive domain — negative NFTs make about as much sense as a fish riding a bicycle. We'll draft assertions that confirm, after any function execution, the total supply has not dipped below zero.

### Precise Minting

As for minting, NFTs are not a print-run of collectible stickers; we can’t have duplicates. When we mint, it must be one — and only one — NFT. We'll code our formal verification to reflect this precision, guaranteeing no duplication or oversight.

### Sanity Checks

Lastly, the sanity checks are there to make sure that in our zeal to innovate, we haven't overlooked the basics. It's like checking if your car has wheels before raving about its horsepower.

## The Bigger Picture

Once you grasp the formal verification of the NFT mock, it's time to apply this knowledge to the more complex NFT marketplace scenario. The steps you've mastered will lay the foundation for a broader understanding of how Certora can be harnessed to ensure smart contract reliability.

And remember, while we're battling the technical dragons, let's not forget the grace. The code is poetry, and its symphony is in the state transitions meticulously crafted and checked.

## Conclusion and Takeaways

Formal verification might have seemed a peak too high to summit, but with the right preparation — warming up with our NFT mock — and a clear game plan, it's well within our reach. By the end of this session, you'll not only be able to verify that mappings emit events or that states remain consistent, but you'll also be equipped with a robust understanding of Certora and formal verification as a whole.

Step by step, assertion by assertion, we solidify our smart contracts and thereby the trust in the digital agreements that govern NFT transactions. It's a commitment to excellence, to trust through transparency, and to the assurance that blockchain promises.

It's time to roll up your sleeves, sharpen your mind, and join me on this journey of learning and verification. Your skillset and the integrity of your future smart contracts will thank you.

Happy coding and verifying, everyone!
