---
title: evm.codes playground
---

---

# Demystifying Bitwise Operations in Ethereum Smart Contracts with a Hands-On Example

Hey there, fellow code wranglers and Ethereum enthusiasts! Have you ever found yourself scratching your head, trying to make sure your mental arithmetic checks out, especially when you’re knee-deep in smart contract opcodes? Well, you’re not alone. Today, we're going to have a little bit of fun in the coding playground as we dissect a practical example to see if our brainpower stacks up against the actual code. So roll up your sleeves, and let's get cracking!

First up, let's set the stage. Picture this: we've got ourselves a `Zero X` value in the wild, and we're itching to push it by four. We did some quick mental math and arrived at the number 16. But hey, we're meticulous folks, right? We need to confirm our findings. That's where our even codes playground comes into play.

## Understanding the Playground

For those who aren't familiar, within the playground, there's this super handy tab where you can switch between playing with yul, solidity bytecodes, and yes – you guessed it – opcodes as well. It’s like the Swiss Army knife of the Ethereum coding world. Since we're going to be dealing with opcodes, let's head over to the Mnemonic section.

Here's where it gets interesting. The `shr` (right shift) opcode needs two things: a value and a shift amount. Remember, in the world of stacks, the shift amount should be seating pretty at the top.

```solidity
PUSH1 0x10
// Push the first value onto the stackPUSH1 0x4
// Now push the shift amount (4) onto the stackSHR
// Perform the right shift operation
```

Let's run through that one more time, shall we? Imagine loading your stack with a `Zero X 10` value. Next, you throw in `Zero X 4` on top. Once you've summoned the `shr` opcode, it will shimmy that first value to the right by four. And voilà, you should be greeted with the shiny result of the operation.

![Performing the shift operation](https://cdn.videotap.com/618/screenshots/dtFNPZhcAMPofgnUwOFP-110.81.png)

But where's the proof, you ask? Let's roll up our sleeves and dive into the playground, taking this step by step. Bear in mind, the opcodes live up top, and down below you’ll find the stack state after each step.

So, here goes nothing: first, we push `0x10` onto the stack.

![Pushing 0x10 onto the stack](https://cdn.videotap.com/618/screenshots/eHiAf3ZCcXHQFONnHTS4-97.51.png)

Peek at the stack section – `0x10` is comfortably lounging there. Next up, let's queue in our `0x4`. With a swift click and a scroll, we see our shift amount perched on top, all set and ready to go.

Now for the grand move – stepping through `shr`. Drum roll, please:

![Seeing the result on the stack](https://cdn.videotap.com/618/screenshots/dtFNPZhcAMPofgnUwOFP-110.81.png)

There it is, sitting pretty on the stack: `0x10`. If we translate that from hex to decimal like we’d tell a five-year-old, we land on the sweet spot: 16.

> "Math in the mind is good, but math on the stack is better."

Yup, we called it – our earlier math has been vindicated! It's like watching a magic trick unravel, except it's all bits and logic, and you're the one in the magician's hat.

## Key Takeaways

To wrap this up in a neat little bow, what did we learn from this jaunt in the park of code?

- Bitwise operations, while they may seem like mathematical gymnastics, are incredibly powerful tools. They're at the heart of many operations underpinning Ethereum smart contracts—and when used wisely, they can make your code both elegant and gas-efficient.
- The playground is a valuable resource for validating mental models. By stepping through the operations opcode-by-opcode, you can confirm your understanding.
- Stacks and opcodes form the basic building blocks of EVM interactions. Getting comfortable playing with them is crucial.

That's all for now, fellow pioneers of the virtual machine frontier. Until next time, happy shifting, and may your stacks always overflow with just the right values.

---

Remember, the playground we discussed is but a mere digital sandbox for you to test your mettle against the wiles of EVM opcodes. So whenever you feel the need to validate your mental calisthenics, just hop back in and let the stack be your guide.

Keep coding, and keep it playful!
