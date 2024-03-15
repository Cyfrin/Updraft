---
title: Spotting the bug with a memory demonstration
---

---

## What's Up with Memory?

Before we throw any `M stores` into the mix, you'd expect our memory to be this pristine blank slate, right? We've been doing some operations on the stack—think `moles`, `greater thans` and the like—but hey, no `m stores` yet. So, all clear on the memory front.

### A Visual Inspection

![](https://cdn.videotap.com/618/screenshots/0S8lLan5934lkUe3Pcfd-118.37.png)Imagine a visual representation of our first 32 bytes of memory. Picture each block as a byte and let's take a tour using hexadecimal addresses as our guide:

- `0x00` to `0x20` (0 to 32): Just zeros, a whole lot of nothing.
- `0x21` to `0x40` (33 to 64): More of the same, all zeros.
- `0x41` to `0x60` (65 to 96): Yep, you guessed it, still nothing.

At this point, our memory is like an empty canvas waiting for the artist's touch.

## M store, You Store, We All Store for Memory

Now, here's where we roll up our sleeves. We call `M store` with the intention to tuck a value snugly into memory at position `0x40`. You might assume it's as simple as putting a stamp on an envelope. But hold your horses, it’s not quite that simple.

Here's the kicker: every two hexadecimal digits represent a byte. So, if `0x40` is our target address, we are looking to fill it with bytes like this:

- For the address `0x40`: b
- For `0x41`: a
- For `0x42`: c
- For `0x43`: 6

Seems straightforward, right? But the truth is trickier than that.

### Debugger's Insight

Here's where things get enthralling. Picture this:

1. You’ve got values lined up on the stack.
2. `M store` is poised and ready to commit the value to memory.

As we step through the debugger, we observe that indeed, our value is pushed to `0x40`, but it's nudged all the way to the end of a 32-byte block—almost like the last guest arriving at a party and taking the only remaining seat.

In essence, `m store` pads our memory, ensuring each chunk of 32 bytes culminates with our value. If we were to look at a snapshot of our memory post-operation, it'd be a vast expanse of zeros terminating in our four-byte value at the far edge.

So, if you ever need to extract that value, remember you’ve got a field of zeros to leap over first.

### Wait, A Plot Twist with `0x40`

During our hands-on debug session, we stumble upon a revelation. `0x40` is a familiar number—it often serves as the free memory pointer, a sort of 'starting line' for where we can safely store new data without overwriting anything important.

And then it dawns on us. Our debug exercise has led us to a valuable insight: overriding `0x40` is actually problematic. It's like we've just barged into memory and overwritten the note that tells us where the next free spot is!

## Auditing Our Code

Through our exploration, we've effectively conducted an on-the-fly audit, identifying a low-severity issue. If our code contains an `M store` operation that cavalierly overwrites the free memory pointer, it’s bad practice, even if the result is just a revert with a blank message.

For those eager for extra credit, consider crafting a `testMoleRevert()` that doesn't just await a revert but demands it mirrors the actual code. It’s this level of thoroughness that separates good code from great.

## Wrapping Up the Debug Journey

We journeyed through the landscape of memory, uncovering the subtle behaviors of `M store` operations that aren't immediately apparent. From understanding the need for padding to recognizing the potential pitfalls of misusing key memory addresses, this deep dive arms us with the keen awareness needed to debug like a pro.

Remember, the world of code is filled with such intricacies that can sometimes only be revealed through curiosity and a debugger's keen eye. So stay inquisitive, keep testing, and most importantly, never stop learning!
