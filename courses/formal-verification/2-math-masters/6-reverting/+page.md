---
title: Reverting - Why are we pulling from 0x1c?
---

---

## The Art of the Revert

Typically, when we mention "reverts," we're dancing around a pretty crucial aspect of smart contract development. Simply put, a "revert" is an operation that undoes all changes made to the state during a transaction if a condition isn't met or when an error occurs. It's like a safe word for smart contracts—to prevent disasters when things don't go as planned.

But let's get more technical. We're checking two things here: is our variable `y` zero, and is `x` something that can fit into its own lane without stepping on `uint256`'s toes when you divide `uint256 max` by `y`? If any of those raise a flag, we pull the emergency brake and `revert`.

## M is for Memory, S is for Syntax

But wait—what's this `mstore` magic? You see, in Solidity, the language of Ethereum contracts, `mstore` is quite the character. Fear not; I shall be your translator.

Consider `p` your position and `v` your value. Now, while you might think we're merely scribbling down some notes, what's actually happening is akin to a meticulous librarian putting a book in just the right spot on the shelf. The syntax—which one might call "oddball" or "quirky"—is our librarian's precise instructions.

`mstore`, for all intents and purposes, acts like an opcode—an operation code that's part of the Ethereum Virtual Machine (EVM) assembly language. So when we say `p` and `v`, it's as if we're placing these values onto an invisible stack of data. The following snippet would take our value `v` and store it at position `p` within the contract's memory.

```assembly
mstore(p, v)
```

Simple, right? But here's the kicker. When you see `mstore(0x40, v)` in the wild, it's not just scribbling `v` at memory location `0x40`—it's elegant and precise. Here it is, in full glory:

Our `mstore` act isn't just about putting `v` in `p`'s seat; it's about guarding `p` for a full 32 bytes in memory—like a ceremonial procession from `p` to `p + 32`. If you picture memory as a long hallway, we're not just tucking `v` into a corner; we're laying down a red carpet that stretches out for 32-byte royalty.

## The Revert Plot Twist

Now, when we get to reverting with a message, things get twisty. You thought we were at memory `0x40`, right? Wrong! The plot thickens when we say `revert` with values set to begin at `0x1c`. That's like telling someone to start reading from chapter five when the book begins at chapter one—it just doesn't add up.

```js
revert(0x1c, 4); // What sorcery is this?
```

Here's what's going on behind the curtain: we start at `p`, but cover the ground up to `p + 32`. It's not only assigning the value `v` but also zero-padding the rest, so we get 32 bytes of space, nicely filled up, starting from `p`. Our error message? It's not just sent out willy-nilly. It has its own special spot, 32 bytes from the start.

But `0x1c` still seems like we got our wires crossed, right? Let's get our detective hats on and decode this. Imagine you have a data block. To snag the last four bytes of a 32-byte data block, you'd start at the 28th byte—this is what `0x1c` is alluding to.

## Recap: Why Smart Contracts Have Mood Swings

The world of smart contracts might seem bonkers at times, full of redirects, mstores, and other cryptic incantations. Remember, whenever you see a `revert`, you're witnessing a spell that undoes any mischief that might have occurred during the transaction—a reset button, if you will.

On the flip side, `mstore` is your meticulous scribe, ensuring that values are not only written in memory but are done so with a flourish befitting of 32 bytes—never less, always exact. And when we talk that `0x1c` talk, keep in mind that it's just a cryptic way of saying, "This is where the final act begins, at the tail end of our 32-byte saga."

So there you have it. We've come full circle and unlocked the mysteries of `revert` and `mstore` in the grand library of Ethereum smart contracts. It's a byte-sized mix of precision and peculiarity that makes the solidity world revolve—or should I say, revert?

Do you feel the gears turning? The bytes aligning? Fantastic! That's the sound of enlightenment, and as long as you're here for the cryptocurrency coding saga, I'm here to be your guide.

Until next time, happy coding!
