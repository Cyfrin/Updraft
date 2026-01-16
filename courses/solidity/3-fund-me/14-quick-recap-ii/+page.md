---
title: Quick Recap II
---

_You can follow along with the video course from here._

### Introduction

In this recap, we'll review how to interact with an external contract and utilize its functions, understand Chainlink Price Feeds, perform Solidity math, and explore global properties.

### Interacting with an External Contract

To interact with any external contract, you need the contract's _address_ and _ABI_ (Application Binary Interface). Think of the `address` as a _house number_ that identifies the specific contract on the blockchain, while the `ABI` serves as a _manual_ that explains how to interact with the contract.

To obtain the contract ABI, you can compile a Solidity **interface** that the target contract implements. Then, create a new instance of the interface pointing to the specific address of the deployed contract.

### Chainlink Price Feeds

[Chainlink Price Feeds](https://docs.chain.link/docs/using-chainlink-reference-contracts/) provide a reliable way to access real-world data, such as pricing data, and inject it into smart contracts. This is particularly useful for executing mathematical operations in Solidity and the Ethereum Virtual Machine (EVM), where floating-point numbers are not used.

### Solidity Global Properties

The [Solidity documentation](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties) provides several global properties that are essential for interacting with the Ethereum blockchain. Here are two key properties:

- `msg.sender`: this property refers to the address of the account that **initiated the current function call**
- `msg.value`: this property represents the **amount of Wei** sent with a function call

```js
function updateValue() public payable {
    require(msg.value >= 1 ether, "Not enough Ether provided.");
}
```

By understanding these concepts, you can effectively interact with external contracts, leverage Chainlink Price Feeds for real-world data, and utilize Solidity's global properties for more robust smart contract development.

### 🧑‍💻 Test yourself

1. 🏆 Attempt to answer all the theoretical questions from lessons 1 through 12, and then go back again to complete all the coding tasks.
