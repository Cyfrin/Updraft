---
title: Runtime code Introduction
---

---

## Understanding Runtime Code

If you've played around with Solidity, you might've noticed it being kind enough to sprinkle little invalid opcodes to mark the boundaries between sections of code. And if you've been scratching your head at the excess of these opcodes at some points, don't worry—we’ll get to that in a moment.

When we previously built with Huff, we defined this handy `main` function as our starting point. Solidity does things a bit differently; the entry point here is going to be whatever opcodes are deployed on the blockchain. Essentially, whatever we put on the chain becomes the guardian gate to the rest of our smart contract's code.

![Runtime code entry point](https://cdn.videotap.com/618/screenshots/ruIT0QzAgQf3DzNhJXLj-55.4.png)

This section—our code copy—is what Solidity will use as our runtime code going forward. It's the proverbial front door where every call will knock before entering. So now, armed with just a tad more insight into Solidity’s workings, we're prepared for a déjà vu moment. Here, we can see outlines of familiar concepts, such as the free memory pointer, which preps us to work with memory.

## Opcode Breakdown

Let's not just skim the surface; we're going deep. Opcode by opcode, we’ll excavate to discover the magic beneath. We've seen before how call value nabs the message value, and, yes, a dupe quickly follows.

Next, we encounter an `is zero` operation and there's a sudden realization: this mirrors what we've seen in contract creation code! It checks if the message value is empty and moves on to a new operation—`push 0x0e`.

Now comes the 'jump if' dance. Remember, the counter is the program counter we're aiming for, while 'b' holds whether or not we’ll make that leap. The stage is set: if the message value stands at zero, we peek at `0x0e`. If something more, we stay put and signal an immediate `revert`.

![Jump if opcode check](https://cdn.videotap.com/618/screenshots/UaHRYR4kMLJaIJKOF0Kn-166.2.png)

And there we have it: a Solidity smarty, calculating that if no functions could possibly be payable, any incoming transactions tagged with a value must promptly be turned away. The elegance lies in the preemptive check for a zero value—a smart contract's very own bouncer, if you will.

![Jump if continue](https://cdn.videotap.com/618/screenshots/jGJjTv2AnNpTdNbZuvcE-200.83.png)

Our stack's starting point was the message value, which dictates our narrative from then on out.

## The Power of Solidity Optimizations

This routine you're witnessing is Solidity flaunting one of its many optimizations. It meticulously analyzes every function, scanning for the ones labeled payable. Finding none worthy of the title, Solidity crisply decides: any value-laced transaction gets shot down.

> "Solidity is like a smart bouncer, promptly turning away any transactions that don't meet the strict no-value-attached policy."

So, there's an implied message here: senders, don’t attach a value unless you're ready to face the Solidity music.

## Wrapping It Up

It's not a stretch to say this Solidity journey's been an eye-opener. It’s like getting a front-row seat to a cerebral game of chess, where each opcode plays its part with precision, and Solidity sits as the grandmaster, overseeing it all.

Now that you've got an understanding of the runtime code and witnessed the brilliance of some Solidity optimisations, you can look at a smart contract and decode the performance like a seasoned champ. So go ahead, dive into some actual codes, play around with functions, and see if you can spot the cool tricks Solidity pulls right before your eyes. It's just another day in the fabulous world of smart contract development!
