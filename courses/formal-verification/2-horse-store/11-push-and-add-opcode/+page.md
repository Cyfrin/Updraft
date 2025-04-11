---
title: PUSH1 and ADD Opcode Example
---

_Follow along with this video:_

---

### Understanding Stack Operations in Programming

Let's look at a practical example of how the stack operates with two common op codes `PUSH1` and `ADD`.

To recap what we saw in a previous lesson, the `ADD` op code takes the top two items on the stack and returns the sum of these items - placing this sum on the top of the stack.

You may be asking **"How does data get added to the stack to begin with?"**. This is where `PUSH` comes in. By navigating to [**evm.codes**](https://www.evm.codes/?fork=shanghai) we can see that there is a different `PUSH` code, pending the byte size of the data we're adding to the stack!

### Understanding PUSH and ADD

We'll start by considering how to add a 1 byte object to the stack, for this we'd use the `PUSH1` op code.

::image{src='/formal-verification-1/11-push-and-add-opcodes/push-and-add-opcodes-1.png' style='width: 75%; height: auto;'}

If we were then to call the `ADD` op code, it's going to take the top 2 items on our stack, sum them and add this sum back to the top of our stack.

::image{src='/formal-verification-1/11-push-and-add-opcodes/push-and-add-opcodes-2.png' style='width: 75%; height: auto;'}

> **Remember:** Were there _three_ items in our stack, the `ADD` op code would only sum the top two items, the result would be pushed to the top of the stack, leaving the first item in our stack untouched.

### Wrap Up

Here we've seen an example of two very common op codes.

- PUSH - adds items to the stack
- ADD - removes the top two items from the stack, and adds their sum to the top of the stack

I encourage you to familiarize yourself with more of the stack input/outputs on evm.codes. In later lessons we'll look more closely at op codes such as MSTORE and SSTORE which remove things from the stack and write them to memory!
