---
title: SLOAD - MSTORE & RETURN
---

---

# Demystifying Smart Contract Development: Reading and Returning Data with Huff

Howdy, developers! I hope you're all doing fantastic. Let's keep our learning spree rolling. Today, we're tackling the last piece of our smart contract puzzle. Our quest? Figuring out how to read the number of horses we have stashed in a storage slot. We'll also dive into writing some tests and peek into the art of debugging smart contracts—trust me, it's much simpler than the run-of-the-mill copy-paste routine in your playground.

## Reading the Number of Horses: Breaking it Down

So, what's the game plan? We need to retrieve the number of horses from that nifty storage slot we've been working with. Follow these three steps:

1. Get the storage slot.
2. Load the slot's value into memory.
3. Return the data to the caller.

Seems straightforward, right? Let's dive deeper into these steps and uncover the magic behind them.

### Step 1: Lay Your Hands on the Storage Slot

First up, we need to identify the storage slot that holds our data. Think of this like a treasure hunt—each slot is a chest, and we've marked ours with a big red "X".

### Step 2: The S Load Operation

We now bring two powerful opcodes into the limelight: `SLOAD` and `RETURN`. If you're seasoned in the realm of Ethereum smart contracts, you've definitely come across `SLOAD` before. This opcode is notorious for being gas-hungry, but it's a necessary beast when we want to read from storage.

```
// Top of the stack before `SLOAD`[32 byte key in storage]
// After `SLOAD`, the value from storage is now on the stack[value stored in slot]
```

Think of the Ethereum Virtual Machine (EVM) as a curious creature peeking into slot `0` and finding out how many horses we've got. It then places this number neatly on top of the stack for us to work with.

> "The `SLOAD` opcode transforms our storage key into the value we've been looking for. It's like revealing the number of horses in the paddock with a single whisper to the EVM."

### Step 3: Returning Data with a Flourish

`RETURN` is our other star performer. Unlike `STOP`, it not only halts execution but also serves up the data on a silver platter. But remember, it dishes out data from memory, not the stack. So, we must first move our value into memory using `MSTORE`, akin to setting the table before serving the meal.

```
// Using `MSTORE` to add data to memory[location] [value]
```

Think of memory as a fleeting thought that vanishes at the end of the conversation—it only sticks around for the transaction's duration.

![EVM Diagram](https://cdn.videotap.com/618/screenshots/FGxPiZpNxGEKV0pyK7rV-113.14.png)

## Storing Charms: Mstore and Its Vital Role

When we talk about `MSTORE`, imagine it as `SSTORE`'s cousin, but with a penchant for short-term memory. Both deal with storage, but one deals with lasting records while the other handles ephemeral data. It's the difference between carving into stone and writing in the sand.

## The Final Return: Wrapping Things Up

Armed with these insights, we're crisp and clear on how to read and return the number of horses in our contract. But wait, there's more! It's not enough to know these steps; it's time to put this knowledge into practice. Let's roll up our sleeves, punch in some code, and witness our smart contract come alive.

In the upcoming sections, we'll craft some snug test cases and unveil a debugging process that'll make your development journey feel like a walk in the park. So, stay tuned, and let's turn these concepts into code!

---

There you have it—our little adventure in smart contract development, with a playful tone matching our casual yet insightful conversation. As always, stay curious and keep experimenting. By embracing these ops and embracing some tests, you're on your way to becoming a smart contract superhero in the ever-exciting blockchain realm. Catch you on the flip side!
