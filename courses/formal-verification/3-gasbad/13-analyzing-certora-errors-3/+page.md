---
title: analyzing certora errors 3
---

## Analyzing Certora Errors: A Deep Dive into Smart Contract Validations

As we navigate through the complex landscape of smart contracts, encountering errors is as inevitable as the code they are made of. In our journey today, we're sprinting through the specificity and significance of Certora Prover errors, those hurdles that make us pause, ponder, and perfect our smart contract formulations.

### A Casual Affair with Code

The tone, let me tell you, is decisively casual. It's more like a conversation between developer buddies than a stiff lecture from a robed academician. That being said, don't let the approachability fool you. Underneath this laid-back dialogue lies a substantial layer of complex jargon and concepts that are undoubtedly sophisticated.

Now, who's this for? If you're here for a light read on gardening or the best pizzas in town, you might find yourself out of place. This exploration is head over keyboards for developers engrossed in the world of Ethereum and NFT marketplaces. But worry not, even if words like `Certora` and `havoc` sound alien to you; we'll march through this together!

### The Intricacies Unveiled

We expected a clean slate, but alas! Errors crept up like it's their party and we're uninvited. And not just any errors; it appears to be an all-you-can-find error buffet. Our contracts for the NFT marketplace are waving red flags instead of the expected green lights.

### The Call Trace: Following the Digital Bread Crumbs

Let's get our digital magnifying glasses out and inspect the call trace. It's revealing an unsettling trend of violations across the NFT marketplace functions: buy item, list item, cancel item, withdraw proceeds... you name it.

The transcripts speak clear: something's amiss, resulting in storage updates sans the essential logs. In blockchain, that's not a mere whoopsie, it's a 'code red'.

### The Plot Thickens: Ghost States and Havoc Variables

We dive deeper, uncovering that the `list item` is a particular source of concern. Event emissions are key to smart contract interactions, and it seems like we're skimping on them.

#### Ghost State Mayhem

Leaning into the technicalities, we encounter the term `havoc`. What the heck is that, right? Well, in the grand scheme of Certora's language, `havoc` is the equivalent of shrugging your shoulders when asked what went wrong.

The `havoc` happens because our contract has possibly interacted with other, untrusted contracts, and now anything could have changed. The Prover's solution? Assume the worst and check if our code can handle it.

### Listing Laments

When we closely examine the `list item` operation through the call trace, we see our ghost states start at zero, as they should. But then, Certora Prover throws in a twist, simulating conditions where other contract functions mess with these values.

![](https://cdn.videotap.com/618/screenshots/wlvGq0oOmD0zQGTFlUcJ-294.3.png)

Can you visualize it? The ghost states, which are non-persistent variables, are now up for grabs, susceptible to any kind of alteration. The code walkthrough shows us that an event was indeed emitted (phew!), but now we're baffled by the invariant break.

### Unraveling Invariants and Havocs

At the heart of this conundrum is what Certora calls `default havoc`. This concept encapsulates the notion that certain function calls, like `transferFrom` in an NFT contract, can lead to any sort of changes in balances - opening Pandora's box of arbitrary possibilities.

So here we are, gazing at our computer screens, glaring at the possibility that `listing updates count` could exceed `log four count`, thanks to `safeTransferFrom` acting on its whims.

### The Takeaway: Safety in Havoc

Despite the errors, there's something incredibly reassuring about Certora's approach. By expecting the unexpected, our smart contracts are put through the gauntlet, ensuring they emerge robust and attack-resistant.

### Converting Clarifications into Code

How do we go from theory to code, you ask? Spoiler alert: it's all about considering these external interaction intricacies and tweaking our codebase to ensure that every storage update falls in line with an event emission.

### Our Roadmap to Error-Free Contracts

So, there you have it. A walkthrough of Certora errors that feels less like a dry academic paper and more like a developer diary. Complex vocabulary, casual tone, and a specific audience all suggest we're in for some serious coding storytime.

Let's embrace the havoc that Certora throws at us, knowing that it's all for the greater good — making bulletproof smart contracts. In this blog, we've tackled the theoretical side, but remember, true mastery comes from rolling up your sleeves and diving into the code.

Until next time, code safely, and may your contracts be free of unwelcome surprizes.
