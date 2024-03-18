---
title: ghost and hooks
---

## What Exactly Are Ghost Variables?

Alright, first things first! Ghost variables, despite their spooky moniker, are actually super helpful in smart contract verification. Picture them as the hidden helpers that let you monitor and check the inner workings of your contracts during the verification process. These variables can communicate crucial info between rules and, you guessed it, hooks—which by the way, we'll explore in just a moment.

Think of ghost variables as your contract's secret diary, keeping tabs on what's going on under the hood. So, in Sartora-land, we give these special variables the name "ghost" to signal their role in tracking and verification processes.

This line of code is like enlisting a silent guardian watching over your contract's variables, ensuring everything's on the up-and-up.

## Tracking State Changes with Ghosts

Let's get our hands dirty, shall we? Suppose you want to track every time a mapping is updated in your contract, and of course, emit an event when it happens. Tracking updates sounds tricky, but fear not—it's feasible with a little ingenuity and the right tools.

Imagine we have a mapping like `s_listings` in our contract. To keep an eye on its updates, we might use a ghost variable with a bit more muscle than a uint256—let's call in the big guns, the `mathint`:

With this line, we're crafting a counter specifically designed to monitor `s_listings` every time there's an update. A nifty trick, right?

## Hanging on Every Change: Enter Hooks

Enter the world of hooks—Sartora's way to attach actions to our smart contract's operations like a trained falcon grips its perch. We can create hooks to listen for specific activities, like a storage slot being updated, and then... do stuff! Yes, it's as cool as it sounds.

Consider the above piece as the conductor of an orchestra, ensuring every instrument (or in our case, contract storage operation) plays its part precisely at the right moment. By declaring a hook, we're setting up a sort of tripwire that, whenever our `s_listings` mapping updates, it springs into action, adjusting our `listing_updates_count` by one, like a vigilant abacus.

## Ensuring Event and State Parity

Our ultimate magic trick? Making sure that the tally of emitted events is in perfect harmony with the number of state changes. This balance is a cornerstone of smart contract integrity, akin to a high-wire act gracefully performed without a safety net. Here's where our ghost variable shines, as it allows us to match the count of changes (`listing_updates_count`) with the events erupted from our smart contract's eventful volcano.

What we have here is a simple parity check. It's the equivalent of double-checking that you've turned off the stove when you leave the house—a healthy practice to prevent your smart contract kitchen from catching fire.

## A Look at Event-Related Hooks

Our journey through the foggy path of verification continues with another set of hooks that focus on events. Remember when we spoke about the `log4` operation? We can apply the same counting strategy to track emitted events.

This hook flies into action whenever `log4` operation (a type of event emission in EVM) is invoked. Inside it, we do a similar dance step—incrementing the counter, `log4_count`, to keep pace with the emitted events.

## Why You Should Care About Ghosts and Hooks

By now, you might be thinking, "Neat story, but why should this matter to me?" Well, here's your golden nugget of wisdom: a well-monitored smart contract is like a fortress. With these spectral tools, we can build a verification suite that ensures our contracts behave as expected, leaving no stone unturned or event unlogged.

Every smart contract—yours, mine, and the next Satoshi Nakamoto's—should implement this level of meticulous oversight. Because in the end, it's not just about writing code; it's about writing code that's as trustworthy as a Swiss bank.

## Crafting a Smarter Future with Ghosts and Hooks

In this post, we've opened up the arcane tomes to a world where ghost variables and hooks play pivotal roles in smart contract verification. As we forge ahead, crafting more complex and capable contracts, these tools become invaluable allies.

Whether you are a code conjurer or a blockchain believer, understanding this spooktacular side of Sartora and EVM gives you the power to craft smarter and more reliable contracts. The future of blockchain relies on the solidity (pun intended) of smart contracts, and with ghosts and hooks in your arsenal, you're well-equipped to contribute to a robust and secure decentralized landscape.

So, to all coders and creators out there, it's time to harness the power of these ethereal entities. Experiment, explore, and let your smart contracts embody the highest standards of reliability and transparency, one ghost variable and hook at a time.
