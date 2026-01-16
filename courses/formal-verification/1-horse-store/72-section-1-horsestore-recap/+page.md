---
title: Section 1 HorseStore Recap
---

_Follow along with this video:_
---

### HorseStore Recap

We've come a long way! It's hard to believe the breadth of topics we've covered in this section and frankly it's not easy stuff.
We've coded HorseStoreV1 _and_ and HorseStoreV2 contracts in Solidity, Huff, Yul - essentially bytecode level stuff. You should be incredibly proud of yourself.
What did we learn in this section?

### The Stack, Memory and Storage

We learnt how the stack, memory and storage work and how they interact with each other.

- Memory is temporary, this is the space in which we interact with data, this is cleared after execution
- Storage is permanent and data here will persist after execution.
  It was also covered that Solidity has something called a `free memory pointer` at `0x40`, the data at this location always points to the next free location in memory and must be updated any time memory is written to.

```js
PUSH1 0x80  // [0x80]
PUSH1 0x40  // [0x40, 0x80]
MSTORE      // []  // Memory: 0x40:0x80
```

### Breaking Down Solidity

Something else we covered was the process of breaking down a Solidity smart contract into it's opcodes and we walked through exactly how one of these contracts functions, code by code and learnt what every single opcode it contained does. [evm.codes](https://www.evm.codes) as a reference point for opcodes is an _invaluable_ resource, use it well.
In learning about opcodes we also introduced Huff as a low level programming language that allows developers the potential save a great deal of gas by optimizing the opcodes a smart contract uses.
In addition to Huff we touched briefly on Yul and how we can leverage Yul for inline assembly to allow granular control over smart contract functionality and gas costs directly in our Solidity smart contracts. While investigating Yul, we even wrote an entire smart contract in Yul! This isn't normal, but it sure was fun.

### Testing

We learnt how to set up our workspace for Differential Tests which allows us to perform the same tests across different code bases! We were able to perform the same tests on our Huff, Solidity and Yul contracts with very minimal changes to our tests.
This also allowed us to directly compare gas costs of each of these implementations!

### Foundry Debugger

Briefly we experimented with Foundry's Debugger which is accessed with
`forge --debug <testName>`
This will allow us to step through our test's execution, opcode by opcode, much like the [evm.codes playground](https://www.evm.codes/playground).

### Complex, Low Level Contracts

One of the biggest things we did in this section was write a complex contract all in Huff which included things like:

- imports
- ERC721s
- Mappings
  These are not simple concepts when working directly with opcodes and having mastered them here you'll be well prepared.
  During this process we learnt the value of libraries like `Huffmate` to do the heavy lifting when programming in low level code.

### Bytecode

We learnt that smart contracts when compiled can be broken into 3 distinct sections in their bytecode:

1. Contract Creation Code
2. Runtime Code
3. Metadata
   We now have the ability to translate these sections of bytecode into opcodes and derive what a smart contract is doing - whether or not it's been verified! This is an incredibly powerful skill in security research.

### Wrap Up

In closing, I'll say: if you still don't quite get this, or it's not clicking. That's ok. There aren't a lot of smart contracts written in Huff. There _are_ a lot of smart contracts which are written in assembly or leverage inline assemble, which is something we'll cover in more detail in Section 2 of this course.
However, in order to really understand the assembly, you really have to understand the opcodes and I think one of the best ways to become familiar with opcodes is to code in Huff. I encourage you to practice this!
With this, you've completed Section 1 of the EVM/Formal Verification Course! Go take a break, you've earned it!

🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴

Exercises:

1. Convert a Minimal Contract of your own into Huff or Yul

Section 1 NFT:

_Coming Soon_

🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴
