---
title: What are Opcodes?
---

_Follow along with this video:_

---

In the previous lesson we got a glimpse of a contract's `bytecode`. When interacting with any smart contract, whether during its creation or subsequent transactions, there's an essential component at play—`calldata`. It's the raw bytes or raw data that you're sending to the blockchain.

### What Exactly Is Call Data?

Call data is the string of information that you send alongside a transaction to instruct the smart contract on the blockchain. It's similar to input parameters passed to a function in traditional programming, telling the smart contract what action you want it to take.

Let's visualize this - pull up any transaction in Etherscan and scroll to the bottom. You should see a bunch of hex data.

Each byte, which corresponds to two hex characters, essentially represents an opcode—or operational code—that the Ethereum Virtual Machine (EVM) recognizes (there are some exceptions, but we'll talk about that later!). Opcodes are the machine-readable instructions that detail how the EVM should manipulate data.

### Understanding Opcodes

As humans, we're not wired to effortlessly comprehend machine-code or binary. Manually instructing thousands of transistors is just not something we're good at. Because of this, we turn to higher-level programming languages like Solidity that are easier for humans to understand!

However, it's crucial to remember that the EVM doesn't understand Solidity; it operates at the lowest level of code. It's a machine that needs explicit instructions to work with data, whether storing it, memorizing it, or stacking it. These instructions are the aforementioned opcodes.

### The Ethereum Virtual Machine

The Ethereum Virtual Machine is, put simply, a state machine that emulates the computational environment of the Ethereum network on your own computer. When you hear about sending data to the blockchain or transacting Ethereum, picture the EVM diligently converting those tasks into smaller, machine-executable instructions—opcodes.

For example, if we're instructing our contract to store the number seven at a particular storage location, a specific sequence of opcodes will facilitate that operation. It's this collection of opcodes that embodies the EVM—a universally accepted set of commands that carry out predefined activities.

> _Don't stress too much about not grasping it straight away, it is complex stuff._

### Diving Into Code Examples

To illustrate further, each pair of hex digits in the smart contract reflects a single opcode. But there are instances, such as when larger values are 'pushed' onto the stack, that the pattern alters a bit. Regardless, the crux is that these opcodes—whether signifying `PUSH1` or `MSTORE` (for memory storage)—orchestrate the execution of calldata instructions.

### The Evolution of Opcodes

The beauty of Ethereum is its adaptability. Opcodes aren't set in stone; they evolve through Ethereum Improvement Proposals (EIPs). Recently, a new opcode, `PUSH0`, made its debut, expanding the EVM's vocabulary.

Remember, the essence of a smart contract is the synergy of opcodes composing executable contract code—each opcode taking a transformative journey from a mere hex digit to a commanding force in the blockchain realm.

Don't be overwhelmed if opcodes seem alien today. Like most things in the tech world, it's all about layering knowledge, one byte at a time.
