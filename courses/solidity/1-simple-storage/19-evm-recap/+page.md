---
title: Recap & Congratulations
---

_You can follow along with the video course from here._

### Introduction

In this section, we'll quickly summarize the lessons from 1 to 9 and learn about EVM and EVM-compatible blockchains.

### EVM

EVM stands for _Ethereum Virtual Machine_. It's a decentralized computational engine that executes smart contracts.
Any contract that it's written in Solidity, can be deployed to any EVM-compatible blockchain. Examples of such blockchains and Layer 2 solutions include **Ethereum**, **Polygon**, **Arbitrum**, **Optimism**, and **ZKsync**.

> 🚧 **WARNING**:br
> Although a blockchain like ZKsync may be EVM-compatible, it is essential to verify that all Solidity keywords are supported

### Contract Setup

Before writing any smart contract, always specify the Solidity version you intend to work with. Additionally, include the SPDX license identifier at the top of your file.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
```

Next, create a contract object. In Solidity, a `contract` is similar to a class in other programming languages. Everything within the curly brackets `{}` is part of the contract's scope.

### Types and Structures

Solidity supports various primitive types such as `uint256` and `bool`, allows the creation of custom types with `struct`, and supports arrays and mappings.

### Functions and Behavior

Functions in Solidity can modify the state of the blockchain and execute transactions. Functions that do not modify the blockchain’s state are declared with `view` or `pure` keywords.

### Data Locations and Memory

Solidity lets you specify different data locations for strings, structs, and array variables. The terms `calldata` and `memory` denote temporary variables that exist only for the duration of a function call. Conversely, `storage` variables are permanent and remain in the contract indefinitely. Function parameters cannot be `storage` variables, as they exist only for the duration of the function call.

When you compile your smart contract, the Solidity code is converted into EVM-compatible bytecode, which is machine-readable code.

### Conclusion

Mastering the fundamentals of Solidity, including contract setup, data management, and function behaviors, provides a robust foundation for developing powerful decentralized applications. This foundational knowledge is essential for navigating the complexities of blockchain technology and leveraging its full potential. Well done!

### 🧑‍💻 Test yourself

🏆 Attempt to answer all questions from lesson 1 and then go back again to complete all the coding tasks.
