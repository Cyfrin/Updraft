---
title: SHR on CALLDATALOAD
---

---

## Why the Right Shift Matters

First, what exactly is the motivation behind this operation? Essentially, it's about clearing away the clutter to laser focus on what's essential.

Imagine you have a chunk of call data jam-packed with information. But perhaps you're only interested in the function selector—that unique 4-byte identifier indicating which function should execute.

```solidity
// Our call data may look something like this
// [functionSelector][...otherData]
// We want to extract just the functionSelector
```

_So how do we slice and dice this data to pinpoint that one critical piece?_ **Enter the right shift.**

![Ethereum stack visualization](https://cdn.videotap.com/618/screenshots/QkOa4j7lYD2ksNXcPJZB-83.54.png)

## Understanding Ethereum's Stack

To grasp why this operation is so powerful, we first need to understand Ethereum's stack. The Ethereum Virtual Machine (EVM) utilizes a last-in, first-out data structure called the **stack**.

You can conceptualize this as a tall stack of pancakes. New data gets added to the top, and data is removed from the top.

The stack allows for efficient pushing and popping of data inside the EVM. And our right shift leverages this structure beautifully.

## Setting the Stage: Putting Call Data on Stack

The first step is to load our call data onto the stack, positioning it below where our shift operation will happen.

We use the `CALLDATALOAD` opcode to accomplish this:

```solidity
// After CALLDATALOAD, call data is now on the stack
```

Our call data is now situated on the stack, ready for transformation.

## Determining the Shift Amount

Next, we need to calculate the number of bits to shift by.

The key pieces of information here are:

- We want to preserve the **first 32 bytes** of call data (the function selector)
- There are 8 bits in 1 byte
- So 32 bytes = 256 bits

Our full call data takes up more than 32 bytes. To isolate those first 32 bytes, we must right shift the remaining length of bytes.

Let's break this down:

```
Count of bytes in call data:1... 8... 16... 24... 32... (and beyond)
```

We've reached 32 bytes, our cutoff point.

Now we can subtract to get the shift amount:

- Full call data length: 56 bytes
- We want to preserve: 32 bytes
- So need to shift remaining: 56 - 32 = 24 bytes
- With 8 bits per byte, that's: 24 \* 8 = 224 bits

Therefore, we need to right shift **224 bits** to slice away all but the first 32 bytes.

## Constructing the Shift Amount

Next, we need to get this shift amount onto the stack, positioned above our call data.

Converting 224 to hex gives us `0xe0`:

```solidity
PUSH1 0xe0 // 0xe0 now on stack
```

Here is the stack visualization:

```
[Shift amount (0xe0)][Call data]
```

We're now set up to execute the operation.

## Executing the Right Shift

This is where the magic happens!

We invoke the `SHR` (shift right) EVM opcode, which pops those top two stack items, shifts the lower value right by the upper value, and pushes the result back.

Let's glimpse this sublime moment:

> "With a flutter of bits, the call data transforms before your eyes, shedding all unnecessary bytes and emerging with the function selector newly preserved at its crown."

And there we have it—the selector sits sole and proud, ready to guide our function dispatching.

## From Selector to Dispatcher

With function selector finally isolated on the stack:

We can map it to our smart contract functions and send that call data soaring to its destination.

Perhaps it triggers a token transfer, a vote in a DAO, or an NFT mint. The function selector unlocks our contract's capabilities.

So in this short ceremony of stack manipulations—`CALLDATALOAD`, `PUSH1 0xe0`, `SHR`—we prepare our call data for streamlined dispatching powered by that special 4-byte function identifier.

## Conclusion

We've explored right shifting from theory to practice, seeing how this one simple opcode dance extracts what's essential.

Remember, in coding—as in life—sometimes we progress not by adding complexity but by stripping away the superfluous. Through the lens of the EVM, problems reformat to reveal underlying harmony.

Join me again soon as we dive deeper into Ethereum opcodes and unlock the secrets of the world's most vibrant compute engine!
