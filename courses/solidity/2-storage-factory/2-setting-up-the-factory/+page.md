---
title: Setting up
---

_You can follow along with the video course from here._

<a name="top"></a>
### Introduction
This is the setup part we'll explore what *composability* means and create the `StorageFactory` contract, that will deploy and interact with another `SimpleStorage` contract.

### StorageFactory setup
You can start going to the [Github repository of the previous section](https://github.com/cyfrin/remix-simple-storage-f23) and copying the contract `SimpleStorage` inside Remix.
This contract allows storing a favorite number, a list of people with their favorite number, a mapping and different functionalities to interact with them.
This lesson aims to create a **new contract** that can deploy and interact with `SimpleStorage`.

> 👀❗**IMPORTANT** <br>
One of the fundamental aspects of blockchain development is the seamless and permissionless interaction between contracts, known as **composability**. This is particularly crucial in decentralized finance (DeFi), where complex financial products interact effortlessly through common smart contract interfaces.

Let's set up the backbone of the code, that contains the function `createSimplestorageContract`. This function will deploy a `SimpleStorage` contract and save the result into a *storage variable*:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract StorageFactory {

    function createSimplestorageContract() public {
        //how does StorageFactory know what SimpleStorage looks like?
    }
}
```

We need to establish a connection between the two contracts, since `StorageFactory` needs to have a complete knowledge of `SimpleStorage`. One first approach could be copying the `SimpleStorage` contract above `StorageFactory`.

> 🗒️ **NOTE** <br>
It's allowed to have multiple contracts in the same file. As best practice, however, it's recommended to use only one file for each contract

> 💡 **TIP** <br>
You can avoid confusion by keeping open **only** the file(s) you're currently working on.

### Conclusion
In this setup, we'll delve into the concept of *composability* and develop the `StorageFactory` contract, which will be capable of deploying and interacting with a `SimpleStorage` contract.

### 🧑‍💻 Test yourself
1. 📕 What does *composability* mean?
2. 📕 How many contracts is possible to deploy inside one .sol file?

[Back to top](#top)