---
title: Checking if calldata is big enough to contain a uint256
---

---

# Unpacking Ethereum Stack Operations: A Deep Dive into Solving the Jump Number Puzzle

Hey there, fellow coders and Ethereum enthusiasts! Today, we're going to take a deep dive into some intriguing stack operations as we analyze jump number two in our Solidity journey. We're coming from what might seem like a maze of code up top, and now we're parsing through our current stack situation.

Imagine you're looking at a stack that's kind of all over the place. You see a bunch of pushes that, at first glance, don’t make much sense. But, no worries! Let's roll up our sleeves and dive into what's happening.

We start simple: we're pushing zero, followed by `0x20` onto the stack. Now, onto something more interesting - the `DUP3` operation.

## Understanding DUP3 and DUP5

For those scratching their heads, `DUP3` is about to become your new friend. It's pretty straightforward: we just duplicate the third item on the stack—ignoring the top two—and pop that duplicate right on top. Picture it like a magic trick with numbers. So if we have \[top, second, third\], we end up with \[third, top, second, third\] post-DUP3.

![](https://cdn.videotap.com/618/screenshots/4iDjujjkVxRHdh8J2ZMf-98.81.png)

Now, let's say our stack is starting to resemble a skyscraper, and next up is `DUP5`. It's the same song, just a different verse. We seek out the fifth item in our stack, lift it, and wham, slam it on top. It's like we have an infinite supply of our favorite numbers. Remember though, the stack order matters!

## Demystifying SUB and SLT Operations

But wait, what's this? Time to toggle off `word raf` and say hello to a new opcode: `SUB`. If `SUB` is a new addition to your coding dictionary, here's the deal: it stands for subtraction. We'll subtract the second value from the top of the stack. If you've got your `CALDATASIZE` and a `0x4` at the ready, you're going to see some action—like `CALDATASIZE - 0x4`. If the math checks out to zero, your `CALDATASIZE` was just a pipsqueak, precisely four bytes. If it's more, well, that's another story entirely.

```solidity
// Quick example of the subtraction operationresult = CALLDATASIZE - 0x4;
```

Coming in hot is yet another new friend: `SLT` or signed less than comparison. It's like the battle of the numbers; if `A` is the underdog compared to `B`, we'll flag it with a big fat '1'. If not, `A` struts around with a '0' instead.

So, let's clone our previous logic and replace that comma with an elegant comparison. We're now asking the million-dollar question: is there more call data than just the function selector? It's a fascinating scenario because `0x20`, which is 32 in English, is our line in the sand. If `CALDATASIZE` equals four bytes, aka the size of a function selector, then we've got more unanswered questions. But if there's additional data, like a lovely `bytes32` number, then we know we've hit the jackpot.

> "Is there more call data than just the function selector? That's the key question we're after."

## The Mysterious PUSH 68 Opcode

And for our next trick: `PUSH 68`! Okay, we've been pushing more things to the stack than we care to remember. But soon, we'll uncover the grand plan behind these mysterious pushes.

Prepare yourself for the dominos effect with `JUMPI` operations. It's a rollercoaster with Solidity sometimes. So many jumps, so many pushes—it's like being in a maze within a maze. But have faith; there's logic hidden in this seeming chaos.

Here's the skinny: if we've got more call data beyond the function selector, hinted by `0x68`, we'll jump. Otherwise, the show is over. We're going home. Well, technically, we're sending our code to the `REVERT` operation, as there isn't enough call data. It's just Solidity's way of keeping us honest. And trust me, it does more than you think under the hood; it's got our backs, ensuring we've got the right amount of call data to proceed without a hitch.

![](https://cdn.videotap.com/618/screenshots/94dzPRsof30qHwFKrznX-324.65.png)

For now, I'll leave you with this piece of the puzzle. If you're excited to unpack more of these coding enigmas, stick around. There's plenty more where that came from!

## Decoding Jump Destination Three

Let's now hone in on jump destination three; and I know you're curious. We're skipping ahead—yeah, I peeked. Buckle up as we venture right into the aftermath of a potential revert operation.

Jump destination three is the next chapter of our story—it's actually hiding right after our dear friend `REVERT`. What secrets does it hold? Well, that my friend, is a tale for another line of code.

In the world of smart contracts, understanding these moves is crucial. It's like learning the secret language of Ethereum. Each opcode, each push, each logic dance, is part of the grand choreography of making data come alive.

Stay tuned for the next post where we decode the rest of jump destination three and unravel the mysteries of Solidity's wizardry. Happy coding!
