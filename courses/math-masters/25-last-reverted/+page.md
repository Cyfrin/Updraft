---
title: lastReverted
---

---

## Stepping Up Invariant Assertions in Solidity with Certora: Dive Into the `lastReverted` Keyword

In today's fast-paced world of blockchain development, writing smart contracts that perform impeccably under all circumstances has never been more imperative. Enter the scene—Certora. A powerful tool designed to keep our smart contracts in check. But it's not just about checking for variables; it dives deeper into the heart of Solidity, ensuring that our contracts are robust and, frankly, non-reverting.

### The Tone and Vocabulary of Solidity Assertions

Before we delve into the nitty-gritty of assertions in Solidity and Certora, let's set the stage. The tone here is key; it's like having a casual conversation with that colleague who knows their stuff but isn't going to overwhelm you with jargon. It's all about keeping it chill, but educational.

As for the audience, we’re talking to you, developers and tech aficionados, who love to sink your teeth into a bit of coding but don't want to get lost in verbosity. You appreciate the simpler explanations of complex concepts, right? So, let's walk through this with that same vibe.

### Asserting Invariants: The What and The Why

Imagine an invariant as the guard of your contract's logic, ensuring that certain conditions always hold true. It's that one rule that says, "Hey, look here, no matter what happens, this condition must remain unbroken."

Simple, right? But we’re not setting the bar so low here. We're aiming for a tad more ambitious invariant: "Thou shalt not revert!"

### Crafting the Non-Reverting Invariant

The pursuit of our invariant narrative takes a twist. Instead of looking at static numbers, we crank up the stakes. Our `healthunk` function must flaunt its resilience by never reverting, no matter the input it digests. Here’s how we stand our ground:

```js
healthunkAtWithRevert(number);
assert(lastReverted == false);
```

Boom! Just like that, we've leaped from checking straightforward conditions to embracing dynamism where reversion becomes the foe we never wish to encounter.

### Enter `lastReverted`: The Certora Sentinel

Certora isn't your average Joe when it comes to smart contract analysis—it stays on top of every Solidity function call like a hawk. And here's the real kicker: the keyword `lastReverted`. This little gem is updated every time a Solidity function makes its performance in the Certora arena.

It records whether the function call threw in the towel or stood tall. So, with our invariant mission being that `healthunk` should be the Herculean function that never reverts, we assert precisely that!

### The Moment of Truth: Running `healthunkWithRevert`

It's pretty straightforward from here. We invoke our `healthunkWithRevert` and watch it face the trial by fire. Our premise is crystal clear: "Don't you dare revert on me!"

If Certora's mathematical gears keep grinding without throwing any tantrums, we've nailed it. Our smart contract sits on its throne, unyielding in the face of potential reversion.

### Certora, Work Your Math Magic!

As developers, turning code into an impenetrable fortress is a kind of art—and Certora plays a significant role in that. It's the rigorous companion that takes our code and fortifies it with the veneer of mathematics, ensuring it's not just a mere script, but a mathematical certainty.

We've walked through a delightful snippet of smart contract assurance with Certora by our side.

![](https://cdn.videotap.com/618/screenshots/c5CvjIntTo5JeU4NaL1m-57.91.png)

This is the era of bulletproof development, and as we sculpt our Solidity contracts, let's engrave this assertion saga with `lastReverted` into the blockchain lore.

> "In a world dictated by deterministic code, letting your smart contracts dance with the specter of reversion is not just reckless—it’s an open invitation for chaos. Asserting with Certora is not just prudent; it’s mandatory for the vigilant coder."

With assertions laid bare and Certora flexing its mathematical muscles, we hand over the baton to our beloved blockchain. Go ahead, run those contracts, watch them soar unfettered by reversion, and relish the symphony of Solidity as it's meant to be orchestrated.

Valiant coder, may your functions always execute with grace, and may your assertions hold as steadfast guardians of your immutable realm. Remember, coding not merely about building—it’s about crafting legacies in the etherspace.

Certora, our sentinel, we beckon—you’ve got the blueprint; now turn it into the mathematical masterpiece that defies reversion. It’s not just about the assertion; it’s about the audacious claim of perfection in the unforgiving theater of smart contracts.

Now, let's not just stop here—this is but one foray into the vast expanse of smart contract validation. Take this wisdom, apply it, and continue to explore how Certora can be your guide through the labyrinth that is blockchain development. Keep asserting, keep innovating, and, most importantly, code on.
