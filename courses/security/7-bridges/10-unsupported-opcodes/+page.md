---
title: Exploit - Unsupported Opcodes
---



---

# Deep Dive into Assembly Blocks in Solidity

Welcome to another exciting episode in our exploration of Solidity! Today, we're going to be deep-diving into an intriguing aspect of Solidity: Assembly Blocks. So get your coding gloves on and let's start this journey!

## The Assembly Block: An Introduction

Assembly blocks in Solidity offer us lower access level to the Ethereum Virtual Machine (EVM). Though not super low-level as there exists some level of abstraction in assembly (also known as Yul), assembly blocks provide a closer approach to working with EVM opcodes.

![](https://cdn.videotap.com/kygHboewjVz29gEvJnFB-57.14.png)

> "Assembly in Solidity allows us closer access to the EVM, letting us perform opcodes that could potentially be unsafe."

In the course of this blog, we will be examining the use case of the `Create` opcode in assembly. The `Create` opcode in Yul can be researched further in the [Solidity documentation](https://docs.soliditylang.org/en/v0.8.9/yul.html).

## Diving Into the Code: Exploring `Create` Opcode

On executing the `Create` opcode, it consumes a value of VPN. To understand the essence of VPN, we actually have to examine the columns at the beginning of the documentation. The explanation column reveals that our `Create` opcode will form a new contract with the specified code and consequently dispatch `Vwei` and return the fresh address. In the event that an error occurs, it returns zero.

Let's now delve more into the assembly block where this opcode is being used. Within this block, the opcode is saying that the contract bytecode. Secondly, it will load the contract bytecode into memory and then proceed to instantiate a contract.

In programming using Solidity within the EVM, it's commonplace that almost any time you undertake something with contract deployment or variables or even literary reading, it's always necessary to load it into memory first.

## The Nitty-Gritty Details: Loading into Memory

So how do we go about loading into memory? Fundamentally, you have to specify how much memory to load, from where, and to where. And anytime you're dealing with memory, you have to be very precise about your details.

![](https://cdn.videotap.com/bZJqzJb0Ba8wN3UXX2mL-214.29.png)

In light of the specifications, it's safe to say that the first chunk of assembly we encounter returns an address. The purpose of the whole block is to create a contract and return the corresponding address.

## The TokenFactory: Its Role and Significance

Delving further, we discover that the token factory keeps track of all tokens it broadcasts. It also emits a token upon being deployed—an interesting feature! A function, `getTokenAddressFromSymbol`, is also present, but it doesn't seem to be used anywhere within the rest of the code.

```js
function getTokenAddressFromSymbol(string memory _symbol) public view returns (address){
    return s_TokenToAddress[_symbol];
    }
```

Considering its lack of usage, this function could have likely been more effectively designated as external rather than public.

## Launching a Check on the Opcode: The Checklist Approach

And now we arrive at an essential checkpoint: the opcode checklist. By utilizing this checklist, one can discover fascinating things about the opcode. A surprisingly interesting question you might find is whether the `push0` Opcode is supported for Solidity versions above `0.8.20`.

Another question that pops up is the compatibility of EVM Opcodes and the protocol's operations across all target chains. It brings to mind the compatibility of the `Create` opcode with all our working chains.

![](https://cdn.videotap.com/aypb7Nern5qzvXGaDMLH-385.71.png)

To unravel this puzzle, a practical step is to utilize the Solidity compiler, Solk, and see what we get after building the contracts and inspecting them. Sure enough, upon exploring the contracts, we will find the `Create` Opcode, which confirms its presence.

## Checking Compatibility Levels: The Ethereum Mainnet and Zksync

As we've identified the opcode, we have to be sure about its compatibility with our working chains. Ethereum's mainnet is an assured pass, but what about Zksync?

A quick dive into the [`Zksync documentation`](https://zksync.io/) clarifies things a lot. They have a comprehensive FAQ segment that explicates the difference between being 'EVM Compatible' and 'EVM Equivalent'.

> "EVM Equivalent means a given protocol supports every Opcode of the Ethereum EVM down to the bytecode. EVM Compatible means a percentage of the Ethereum EVM's Opcodes are supported."

Zksync is optimized to be EVM compatible and not EVM equivalent for a variety of reasons. However, this doesn't clarify the compatibility of the `Create` OpCode.

Delving deeper, it becomes apparent that the EVM constructions `Create` and `Create2` on Zksync only work when the compiler is aware of the contract's bytecode beforehand. If the contract isn't aware of the bytecode prior to deployment, it will fail. This approach is strikingly similar to our example code—confirming its potential failure on Zksync.

## Concluding Remarks: The Importance of Compatibility Checks

This discovery underscores the importance of thorough opcode compatibility checks across all working chains. In fact, there was a well-documented instance of 921 ETH being stuck in a Zksync contract because the transfer function failed.

Just a little foresight to check compatibility would have saved this massive loss! This real-life scenario serves as a solemn reminder of how vital it is always to consider EVM compatibility in our code implementations.

In conclusion, whenever you embark on security reviews or contract deployments, always remember to refer to your safety checklist. Going through such a checklist not only helps you find hidden oddities but also ensures you're on the safer side of things.

In all, remember that the devil is in the details. Happy programming!
