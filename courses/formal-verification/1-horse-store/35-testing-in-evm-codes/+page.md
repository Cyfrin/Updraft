---
title: Testing in evm.codes
---

---

# Diving Into Smart Contract Data Reading: A How-To Guide

Dabbling in the world of smart contracts can be a thrilling experience, especially when you finally get to see your code come to life and interact with data. Today, we're going to pop the hood and tinker in our coding playground, walking through an example that demystifies the process of reading data from smart contracts. Let's roll up our sleeves and see end-to-end how this fascinating tech works.

## Setting the Stage for Smart Contract Reading

![Setting the stage screenshot](https://cdn.videotap.com/618/screenshots/pP2lkcgtX1piDA8xMgQH-35.14.png)

Initially, we might be inclined to use a `set number of horses function selector` when dealing with smart contracts. This time, however, our goals are different. We're focused on reading, not writing. This means we need to work with the `read number of horses function selector`.

Unlike when we're setting values, reading data is simpler; we don't need any additional call data beyond the read function because our code base for reading operations never accesses extra call data outside of what the function selector itself provides.

> "Understanding the function selector is the key to unlocking the power of reading data in smart contracts."

Let’s get our hands dirty and punch that code into the editor. I'm going to walk you through this, and if you feel like taking a peek at the slots and how they change as we progress, feel free to scroll along.

## Function Dispatching: Where the Magic Happens

We begin by scrubbing past the beginner topics to where the real action happens. An `shr` assembly language instruction hints we're in the function dispatching section of our code. This is where we determine if the input matches the intended function based on its unique signature.

Here's where it gets exciting. We hit an `equals` followed by a `jump` instruction. If we don't need to jump, that means our input didn't match, and we compare it to the next available selector. Another `jump` waits in the wings, and if we've called the wrong function selector, we'll face a `revert`. This is our code's safeguard, ensuring that only the correct operations proceed. The correct input will take us on a leap straight to the designated code section to handle our read operation.

## Making the Jump and Reading from Storage

Alright! We've made the jump down. What's next on the agenda? Our opcodes line up like diligent soldiers ready for command. The `push zero` opcode sets the stage, and then with `s load`, we lift our desired value from storage into the spotlight.

Now's a good moment to take a glance down. If you're a seasoned player in our playground, you might see a familiar "7" lined up on the stack, snug from the last run. But for first-timers, expect a pristine "0" waiting for you. Either way, that value needs to move from stack to memory. Watch closely as I execute `m store` and step into the magic.

```assembly
mstorepush 20push 0return
```

With `m store` done, a quick scroll reveals memory now cradling our "7". We're almost at the finish line. A few more opcodes, a `push 20` and `push 0` prepare us for the grand finale.

## The Curtain Call: Returning the Data

It’s showtime for our final act! The `return` opcode takes center stage, gracefully commanding the start from zero in memory and delivering all 20 bytes—a full house of 32 bytes, or `0x20` in the hexadecimal world.

And just like that, our data-reading performance reaches its crescendo. With a bow to the audience, the desired information makes its way to the caller, showcasing the elegance and precision of interacting with data in a smart contract environment.

## Conclusion: The Symphony of Smart Contracts

In the intricate ballet of smart contracts, every step, every jump, and every return plays a critical part in the overall harmony. From the casual discussions around function selectors to the nitty-gritty of assembly language, you've witnessed the behind-the-scenes movements of data reading—a subtle, yet powerful, demonstration of the EVM at work.

Remember, while the transcript illuminates just a slice of the smart contract ecosystem, it underscores the importance of understanding smart contract internals for any blockchain developer. As we've seen, executing these operations requires a blend of precision, knowledge, and a touch of coding artistry.

Keep experimenting, keep challenging the boundaries, and most importantly, keep enjoying the exhilarating ride through the playground of smart contract development!
