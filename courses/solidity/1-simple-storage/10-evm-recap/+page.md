---
title: Recap & Congratulations
---

*Follow along with the course here.*




<!-- <img src="/solidity/remix/lesson-2/deploying/deploying1.png" style="width: 100%; height: auto;"> -->

## Working with Ethereum Virtual Machine (EVM)

One term that frequently comes up when talking about deploying code onto a blockchain network is "EVM," which stands for `Ethereum Virtual Machine`. Now, the EVM might seem like a complex term, but essentially it's a standard for how to compile and deploy smart contracts to a blockchain.

For anyone interacting with the blockchain space, particularly those deploying smart contracts, understanding the basic functioning and application of the Ethereum virtual machine is invaluable.



## EVM Compatible Blockchains

Any smart contract or solidity code you write can be deployed to any blockchain that is compatible with the EVM. Prime examples of such blockchains and Layer 2 solutions include **Ethereum**, **Polygon**, **Arbitram**, **Optimism**, and **Zksync**. Even though a blockchain, such as Zksync, might be EVM-compatible, it's critical to ensure that all keywords are compatible as some do not work with every EVM-compatible blockchain.

<img src="/solidity/remix/lesson-2/evm/evm1.png" style="width: 100%; height: auto;">


Now that we've understood the basics of EVM and its deployment, let's dive into the nitty-gritty of writing your solidity code for smart contracts.

## Writing Your First Smart Contract

At the start of any smart contract or Solidity code you write, always mention the version you want to work with. Right above the version, insert the SPDX license Identifier. If you're unsure about the version to use, you can default to the *MIT license* for the time being.

Here's an example:

```js
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;[...]
```

Next, you need to create what is known as a contract object. This contract object constitutes the basic structure of your smart contract. A `contract` in Solidity is somewhat similar to a class in other programming languages, where anything inside the curly brackets `{'{'}...{'}'}` forms part of that contract.

## Types and Structures

Solidity supports multiple types like `uint256`, `string`, `boolean`, `int`, and others. Further, Solidity also allows for the creation of custom types using a feature known as a `struct`.

Though this language might seem foreign, take solace in the fact that Solidity, like other programming languages, supports the creation of arrays (or lists), and mappings (akin to dictionaries or hash tables). As a quick reference, if you provide a key to your mapping, you'll receive the variable associated with that key.

## Functions and Behavior

The real magic happens when we start creating functions in Solidity that can modify the state of the blockchain. In addition, we can create functions that are "read-only", meaning they don’t modify the blockchain’s state - these are known as `view` and `pure` functions.

## Data Locations and Memory

We can specify different data locations in our parameters. Notice that this only applies to particular types like strings, structs, and arrays. The terms `calldata` and `memory` are used to denote temporary variables that exist only for the duration of a function call. On the other hand, `storage` variables are permanent and remain in the contract forever.

An important caveat is that function parameters can't be `storage` variables, as they will only exist for the duration of the function call.

## Conclusion

When we compile our smart contract, it essentially compiles our Solidity code down to EVM-compatible bytecode (machine-readable code). We will delve into these specifications in later posts.

But for now, congratulations on making your first step toward creating a contract on the blockchain! Go reward yourself with some ice-cream, an extra cup of coffee, or anything else you fancy. Happy coding!
