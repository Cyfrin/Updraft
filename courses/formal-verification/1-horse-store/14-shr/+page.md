---
title: SHR (Right Shift)
---

---

## Lopping Off Bits: Slicing Down to the Function Selector

When dealing with Ethereum smart contracts in languages like Solidity, you often encounter a rather large "thing" known as call data. Within this infinite galaxy that seems to store a universe of information, lies an important little asteroid—the function selector. The question is, how on Earth (or in the Ethereum blockchain) do we isolate this?

We have this mammoth call data, but we want to zoom in and crop it down to the function selector alone. Now, one might think it's a job for a seasoned coder, armed with a plethora of opcodes at their disposal. And yes, you guessed it—there **is** an opcode that makes our lives easier!

## The 'shr' Opcode: Your Bitwise Scissors

One of the best tools for this job is – drumroll, please – the `shr` opcode. This nifty operation is our bitwise right shifter. It's kind of like we're tidying up our call data by sweeping the unwanted bits right off the edge, keeping only the essential part we're interested in.

To make `shr` work its magic, we need to supply it with two ingredients:

1. The number of bits to shift.
2. The 32-byte value permitting the shift.

Let's imagine our call data is wearing a hexadecimal disguise as `0x100:21`. In bytes, this would look like two pairs of characters — of course, we understand each pair is a byte. Thus, `0x100:21` is essentially two bytes in hex format.

If each byte is equivalent to eight bits, we then ask our `shr` opcode: could you kindly shift these bytes to the right?

> "In binary, every shift is a step towards the simplicity of our data."
>
> — Anonymous Crypto Philosopher

So, if we want to envision this in binary, we could use a conversion tool like `cast` to transform our hex values into a string of bits. Upon converting to binary, each pair of hex digits blossoms into eight bits. For example, our function selector would be birthed from the first part of our binary string.

Suppose we go wild and swap out our hex pair with `f1`, creating `0xf10:2`. Suddenly, our seemingly benign pair of digits becomes a roaring chain of eight fully-activated bits—like flipping all the lights on in a room.

Experiment with this yourself, toggling between binary (`bin`), decimal (`dec`), and hexadecimal (`hex`) values to see these transformations.

## A Shift to the Right: The Binary Ballet

When we instruct our `shr` opcode to shift right by two bits, it takes a pair of digits and quietly guides them off-stage. Whatever remains takes a graceful step to the right. Poking around with `cast` to see what we get, you'll find that the resulting hex and decimal numbers reflect our dutiful shift job.

Consider shifting over by four bits now—that's two sets of digits escorted away. What remains is a smaller, disciplined line of data ready for action. After all, in programming, sometimes less really is more.

![Visualization of hexadecimal conversion to binary, and the effect of shifting](https://cdn.videotap.com/618/screenshots/WayICY9fq3zTfHSyVlYd-187.43.png)

_Visualization of hexadecimal conversion to binary, and the effect of shifting_

As plain as it is, the result we're after is a beautifully trimmed version of our original value. Just by moving everything over bit by bit, we tidy up until only the essential data remains.

## Wrapping Up the Bitwise Puzzle

In conclusion, that's how we make use of the `shr` opcode to refine our call data down to the function selector. We equipped ourselves with a logical way to shear away the surplus data, leaving us with the quintessence of our smart contract's instruction set.

Using this bitwise technique blends simplicity with efficiency, and it's a glimpse into the elegant choreography hidden within the realm of smart contract development.

Remember, practice and experimentation are your friends here. Play with these concepts, toggle between the different bases, and you'll soon find the obscure becoming clearer, one bit shift at a time.

If all of this seemed like a wild rollercoaster ride through the cybernetic park, congrats! You're on track to mastering one of the many sorceries of smart contract wizardry.

Until our next endeavor into the arcane arts of code, happy shifting!

---

_yours truly,_

_A Fellow Bitwise Magician_

P.S. For those curious about further exploring the intricacies of Solidity and Ethereum's virtual machine, check out the documentation and keep playing with the code. There's a universe to discover, and it's all beneath your fingertips.

_This post was created with the invaluable aid of Foundry's `cast` tool and a dash of hexadecimal imagination._
