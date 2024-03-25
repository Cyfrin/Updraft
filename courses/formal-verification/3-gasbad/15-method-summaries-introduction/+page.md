---
title: mothod summaries introduction
---

#### A First Glimpse

So what's this talk of method summaries and method blocks all about? Well, let's take it from the top, shall we?

They are the Prover's breadcrumbs; paths carefully laid out to guide it towards the right conclusions without becoming ensnared in the labyrinth of a smart contract's logic.

#### Meet the Method Blocks

Every adventure starts with a map, and in the land of Certora, these maps are known as method blocks. At this point, we haven't set up a method block for our example yet, but the anticipation is as thick as morning fog. These blocks can be more valuable than a treasure chest of gold coins, as they help to chart the terrain of function testing.

But what exactly is a method block? Think of it as a mini-manual that tells the Prover how to interact with functions. It can just take them as they are—wild and untamed, fresh out of the codebase—or it can teach the Prover a different way to interpret them. This leads to the fascinating world of non-summary declarations and summary declarations.

### Non-Summary Declarations Unveiled

A non-summary declaration is the Prover's first instinct. It's like taking the `safeTransferFrom` feature for a spin right off the manufacturer's floor—no modifications, no training wheels. If the contract says jump, the Prover jumps as high as the contract dictates.

This is straightforward but potentially messy, especially if a function does backflips through fiery hoops, which in the programming world, translates to loops and complex calculations.

### The Magic of Summary Declarations

This is where the method summary steps onto the stage like a seasoned magician ready to astound the audience. Consider total supply, a case where complexity under the hood can hide a simple truth: it's always going to spin out a positive number.

"With summary declarations, we tell the Prover to forget everything it saw in the contract and follow our simplified script instead," the developer says with a knowing smile.

That's the beauty of a summary declaration—it's a shortcut, a hack that tells the Certora Prover, "Look no further, what you see is what you get."

### The Summary Types Showcase

Certora Prover offers a suite of summaries to cater to different needs:

- View summaries let you peek into the future state without changing it.
- Havoc summaries roll the dice, invoking maximum chaos to represent all possible outcomes.
- Dispatcher summaries are the conductors, directing traffic and ensuring the right summary is applied at the right time.
- Auto summaries are the autopilot option, helping simplify reasoning about loops.
- Last but not least, function summaries redefine the narrative of a function entirely.

It's crucial to tap into the documentation treasure trove, which is a veritable gold mine, describing how to master these declarations.

### Writing the Perfect Method Summary

Crafting method summaries is an art form. It's about looking at a `safeTransferFrom` and saying, "Yes, you can do anything, but for today's rehearsal, let's assume you can only do this one act."

### Conclusion: The Power of Summaries

By incorporating method summaries, developers have a potent tool at their disposal. Whether it's simplifying the Prover's journey to avoid an explosive combinatorial mess or reimagining a function's actions, summaries are a game-changer.

So, next time you're setting sail in the vast ocean of smart contract verification, remember that method summaries are your compass, your navigator, and sometimes, your lifeboat. Here's to steering clear of the rocks and finding the smoothest path to secure, tested contract code!

And remember, as much as summary declarations are an act of simplification, they are also an embodiment of strategic foresight—a developer's calculus to make the Prover's journey less about brute force and more about intellectual finesse.

H
