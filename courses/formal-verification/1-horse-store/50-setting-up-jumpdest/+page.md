---
title: Setting up JUMPDEST program counters
---

---

# Exploring The Fascinating World of Function Dispatch in EVM Code Analysis

Welcome back to our deep dive into the Ethereum Virtual Machine (EVM) and the intricate workings of smart contracts. Today, we'll be exploring another jump desk position—which, simply put, is a spot in the code we end up at after the function dispatch has performed its magic. If you're already enticed by the world of smart contracts, hold on tight as we unravel more secrets of these digital agreements.

## Understanding the Jump Destination in Smart Contracts

When we're investigating the jump desk, we're looking at one of the possible destinations that a function selector could target. I know you're probably wondering, "Which function selector got us here?" Well, let's do one better and analyze what's happening at this position to get our answer.

```
// Jump desk position
CALLDATASIZE
PUSH1 0x3FPUSH1 0x43
```

Here we are, standing on the shoulders of a function selector, equipped with an esoteric combination of hexadecimal digits `0x43` and `0x3F`. And, as we've done before, let's use `CALLDATASIZE`, which, for those needing a quick refresher, measures the size of the data received by our call in bytes.

![Understanding CALLDATASIZE](https://cdn.videotap.com/618/screenshots/eymTOjHtQk7LlBZnMedy-69.96.png)

> "The joy is in the journey of discovery, where every push and call opens a door to understanding the mechanics of a smart contract."

At this stage, the reason for these pushes might resemble a cryptography enthusiast's enigma; nevertheless, it's part of the code's orchestration. Trust the process, as they say—we'll get to the bottom of it.

Next, we encounter a "raw jump," a maneuver we haven't executed before. But fear not—it's merely a leap to a specific point in the code determined by the last program counter we stacked.

## The Leap Into Unknown Code Territories

Now that we have stacked our mysterious numbers, the raw jump takes us directly to program counter `0x59`. This palindromic number isn't just any number; it leads us down, way down in the code, revealing that we're executing part of the "update horse number" operation—ah, the things you encounter in EVM code!

![Navigating the raw jump](https://cdn.videotap.com/618/screenshots/vt7OPSMdxa9yyLzUXjgm-126.47.png)

## From One Jump Desk to Another: The Update Horse Number Odyssey

Here's a little confession: I may have done some homework before our session. The program counters are laid out, and I've peeked at them to make our analysis smoother (cheating, you might say, but I prefer the term "efficient learning").

We start at one jump desk, our assembly of digits and calls at the ready, and then propel ourselves to another:

For the visual learners, imagine mapping your course in an adventurous video game—you can see the destination on the horizon, and every action taken moves you forward to that goal.

![Navigating jump desks](https://cdn.videotap.com/618/screenshots/vt7OPSMdxa9yyLzUXjgm-126.47.png)

By now, if you have some experience with solidity or you are getting into EVM bytecode, you'll appreciate the cleverness of jump desks and function selectors. These are not just abstract concepts but are the cogs and wheels that keep the smart contract running smoothly.

_Happy coding!_
