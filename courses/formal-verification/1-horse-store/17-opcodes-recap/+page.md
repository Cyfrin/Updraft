---
title: Opcodes and Stack Machine Introduction Recap
---

---

# Demystifying the Ethereum Virtual Machine (EVM) and Solidity Smart Contracts

Great work on keeping up with the intricacies of blockchain development! It's about time we do a recap of all the fascinating things we've discovered so far about the Ethereum Virtual Machine (EVM) and how it interacts with our Solidity smart contracts.

## Understanding the EVM and Data Structures

The Ethereum Virtual Machine, or EVM for short, is quite the centerpiece in the Ethereum blockchain. It’s where all the magic happens, where smart contracts are run, and where countless transactions get processed. So, let’s start peeling the layers of this complex system.

![EVM Diagram](https://cdn.videotap.com/618/screenshots/EC0dft2PIz7mTgAk4a2d-65.1.png)

One of the key things to understand is the different types of storage and data manipulation methods available. Our primary toolbox contains:

- **The Stack**: Think of it as a pile of plates where you only have access to the topmost plate. In programming terms, it's where temporary variables are stored, and it's the main data structure for manipulating data in the EVM.
- **Memory**: This is a temporary place to store data. It's volatile, meaning the data is lost when a transaction finishes.
- **Storage**: The EVM's version of a hard drive. It's persistent and is used to store data across transactions.
- **Gas**: Not to be confused with the fuel you pump into your car, this gas is the fee for executing operations on the Ethereum network.

In a whimsical sense, you could liken the EVM to a workshop with all these tools at your disposal. And in this workshop, the stack is the workbench where most of the action takes place.

The stack, memory, storage, and gas each serve important and distinct purposes within the EVM architecture. Having a solid grasp of how they function and interact empowers developers to build efficient smart contracts that make optimal use of available resources.

For example, understanding that data stored only in memory will not persist across transactions could influence a developer to store critical data in storage instead. And knowing that complex operations burn more gas motivates developers to streamline logic to reduce fees.

## The Role of Opcodes

If you're new to low-level programming, opcodes might sound like the language of robots, and you wouldn't be entirely wrong. These are the operations that tell the EVM what to do: push data onto the stack, pop data off it, modifying memory and storage, and more.

In the EVM, each opcode performs a specific operation, and together they form the underpinning of the more human-readable Solidity smart contracts.

```js
PUSH1 0x60PUSH1 0x40MSTORE
```

Here's an example of opcodes in action, where we push data onto the stack and store it into memory.

Opcodes are the nuts and bolts of EVM programming. Just as words form sentences that convey meaning in human languages, opcodes sequence together into operations that perform work.

Though cryptic at first glance, opcodes contain a certain poetic logic. Once you grasp what each one does, reading raw EVM bytecode becomes far less daunting.

For instance, MSTORE clearly stores something into memory. PUSH1 pushes a 1-byte value onto the stack. So by sequencing MSTORE after two PUSH1 opcodes, we can see how data gets pushed onto the stack before getting written into memory.

Building an intuition for opcode functions unlocks the ability to dissect bytecode to understand smart contract behavior. This skill proves invaluable for security analysis, optimization, and diagnosing errors.

## Solidity and Call Data

Now, when it comes to Solidity, the beloved language many of us use to write smart contracts, there's a special way data gets sent to a smart contract known as "call data." This is essentially the information you're calling a function with:

Solidity, being the clever compiler that it is, turns all this into opcodes that the EVM can understand. The first order of business once call data is received is to decipher what function you're trying to call, thanks to the "function selector."

> "The function selector is like the doorman, guiding the call data to the right function room."

The interface between Solidity and the EVM relies on some translational magic. When a smart contract function gets called, the compiler neatly packages parameters into a bundle of call data perfectly formatted for EVM consumption.

This call data bundle contains a special 4-byte header called the function selector that maps incoming requests to the appropriate smart contract function.

You can imagine the EVM like a building with rooms representing functions. The function selector acts as the doorman, checking call data for the right header value and redirecting it to the matching room.

This system enables a single smart contract to handle multiple functions elegantly. Without function selectors, all function calls would land in one jumbled pile for the code to sort through!

## Getting Hands-On with Huff

Time to get our hands dirty! If you're a brave soul and want to delve into writing opcodes manually, you might want to play around with **Huff**, a low-level language for Ethereum smart contracts.

After compiling, you get bytecode, and here’s where things can get a bit daunting. Half of this is the contract creation code, with the runtime code kicking off right after the `CODECOPY (0x39)` opcode.

If you're eager to revel in the raw beauty of your creations, the EVM Codes Playground is the place to be. You can drop your bytecode there or tinker with mnemonics and opcodes to your heart's desire. The playground allows you to step through your creation line by line and unveil the workings of the EVM in action.

![EVM Playground](https://cdn.videotap.com/618/screenshots/Py4MeOgjRmnrYbTZKWVB-205.59.png)

Remember, if you're copying and pasting the bytecode:

1. Look for the `RETURN (0xF3)` opcode to find where your runtime code begins.
2. Ensure you get rid of those spaces to avoid syntax issues.
3. Hit "run" and watch the function selector appear on the stack as you step through the operations.

And there you have it—a dive into the heart of the EVM and the basics of creating Solidity smart contracts with opcodes. Whether you're a seasoned programmer or a curious enthusiast, the call to blockchain mastery is an exciting challenge worth accepting. Happy coding!
