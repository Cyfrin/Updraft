---
title: What are Opcodes
---

---

Smart contracts have revolutionized the way we interact with the blockchain, providing the means to automate and secure intricate processes without the need for intermediaries. When interacting with any smart contract, whether during its creation or subsequent transactions, there's an essential component at play—call data. It's the raw bytes or raw data that you're sending to the blockchain, the lifeblood of the contract's functionality.

### What Exactly Is Call Data?

Call data is the string of information that you send alongside a transaction to instruct the smart contract on the blockchain. It's similar to input parameters passed to a function in traditional programming, telling the smart contract what action you want it to take.

Imagine we're sending a transaction; the accompanying call data is just a blip in the vast sea of blockchain information, yet it holds significant importance. It could represent anything from a simple fund transfer instruction to a complex smart contract operation. Essentially, smart contracts are programmed to decode this data, to execute actions as instructed by their underlying code.

### The Anatomy of a Smart Contract

When you delve into a smart contract, especially towards the end of the code, you're likely to encounter a seemingly indecipherable series of characters. This "random data" or hexadecimal (hex) code is anything but arbitrary. It's responsible for processing the call data mentioned earlier and dictates the contract's operations.

Let's visualize this - each byte, which corresponds to two hex characters, represents an opcode—or operational code—that the Ethereum Virtual Machine (EVM) recognizes. Opcodes are the machine-readable instructions that detail how the EVM should manipulate data.

![](https://cdn.videotap.com/618/screenshots/Bnl5GSCXxDbiFb2382AP-179.29.png)

These opcodes enumerating the contract's bytecode run the gambit from simple to complex, comprising the core logic that defines a smart contract's ability to function.

### The Challenge of Understanding Opcodes

As humans, we're not wired to effortlessly comprehend machine-code or binary—the language of zeros and ones. Wrestling with thousands of transistors just isn't our cup of tea. Because of this, we turn to higher-level programming languages like Solidity that are far more digestible for our organic processors—our brains.

However, it's crucial to remember that the EVM doesn't understand Solidity; it operates at the lowest level of code. It's a machine that needs explicit instructions to work with data, whether storing it, memorizing it, or stacking it. These instructions are the aforementioned opcodes.

### The Ethereum Virtual Machine: A Closer Look

The mystical-sounding Ethereum Virtual Machine is, put simply, a state machine that emulates the computational environment of the Ethereum network on your own computer. When you hear about sending data to the blockchain or transacting Ethereum, picture the EVM diligently converting those tasks into smaller, machine-executable instructions—opcodes.

For example, if we're instructing our contract to store the number seven at a particular storage location, a specific sequence of opcodes will facilitate that operation. It's this collection of opcodes that embodies the EVM—a universally accepted set of commands that carry out predefined activities.

![](https://cdn.videotap.com/618/screenshots/BmFVQiP5TQnz0CRV3MSr-268.94.png)

> _Don't stress too much about not grasping it straight away, it is complex stuff._

### Diving Into Code Examples

To illustrate further, each pair of hex digits in the smart contract reflects a single opcode. But there are instances, such as when larger values are 'pushed' onto the stack, that the pattern alters a bit. Regardless, the crux is that these opcodes—whether signifying `PUSH1` or `MSTORE` (for memory storage)—orchestrate the execution of call data instructions.

### The Evolution of Opcodes

The beauty of Ethereum is its adaptability. Opcodes aren't set in stone; they evolve through Ethereum Improvement Proposals (EIPs). Recently, a new opcode, `PUSH0`, made its debut, expanding the EVM's vocabulary.

Remember, the essence of a smart contract is the synergy of opcodes composing executable contract code—each opcode taking a transformative journey from a mere hex digit to a commanding force in the blockchain realm.

Don't be overwhelmed if opcodes seem alien today. Like most things in the tech world, it's all about layering knowledge, one byte at a time.

In conclusion, smart contracts are a linchpin in the world of blockchain, and opcodes are the life force that drives their actions. While the intricate details might seem daunting at first, comprehending these building blocks is a journey worth embarking on for anyone involved in blockchain development. As we continue to push the boundaries of this technology, who knows what exciting developments the future holds for opcodes and smart contracts?
