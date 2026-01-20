---
title: Setting Up Your First Contract
---

_Follow along with this video:_

---

### Introduction

In this lesson, you'll discover the basics of Remix and how to create and compile your first contract.

### Remix IDE

Open this link [to get started](https://remix.ethereum.org/)

This is an IDE (Integrated Development Environment), a powerful tool used to build and develop smart contracts in Solidity. It helps to easily visualize and interact with our smart contracts. It contains a file explorer that hosts all the files, a Solidity compiler and a tab where you can deploy your contracts.

1. 🧹 Remove all the existing files and folders by right-clicking on them (optional).
2. ✨ Create a new file, e.g., `SimpleStorage.sol`. The `.sol` extension tells the compiler that this is a Solidity file.

### Compiler directive

The `pragma` directive specifies the _version_ of the Solidity compiler that you want to use to build your source file. When the compiler encounters this line, it will check its version against the one you specified here. If the compiler version is different, Remix will automatically adjust accordingly to your specifications.

You can specify the compiler version(s) in the following ways:

1 use exactly **one** version

```solidity
pragma solidity 0.8.19; // use only version 0.8.19
```

2 use versions that fall **within** a lower and upper range

```solidity
// use versions between 0.8.19 and 0.9.0 (excluded)
pragma solidity ^0.8.19;
pragma solidity >=0.8.19 <0.9.0;
```

> 🗒️ **NOTE**:br
> Remember to write comments in your code for you to refer to later on.

### SPDX License Identifier

It's a good practice (even not mandatory) to start your smart contract with an SPDX License Identifier. It helps in making licensing and sharing code easier from a legal perspective.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
```

The MIT license is recognized as one of the most permissive, granting anyone the freedom to use the following code and essentially use it as they see fit.

### Writing the Smart Contract

You can start writing your contract using the keyword `contract` followed by a name, e.g., `SimpleStorage`. All the code inside the curly brackets will be considered part of this contract.

If you are familiar with Object Oriented Programming languages, you can think of a _contract_ as a concept similar to a _class_.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleStorage {
    //this is where we'll place the content of the contract
}
```

### Compiling

1. In Remix IDE, select the Solidity Compiler.
2. Choose the version of the compiler that matches the version specified in your Solidity file.
3. Hit the `Compile` button.

Compiling your code means taking **human-readable code** and transforming it into **computer-readable code** or **bytecode**.

If you see a green checkmark, it means your compilation was successful. If there is any error, Remix will point out where the error is, and you can debug it accordingly.

### Conclusion

Well done! You just created and compiled your first smart contract in Solidity.

### 🧑‍💻 Test yourself

1. 📕 What does IDE mean and what are Remix main features?
2. 📕 What's the keyword `pragma` used for?
3. 📕 Explain what compiling a contract means.
4. 🧑‍💻 Write an empty contract that contains a SPDX License Identifier and compiles with version 0.8.11 or 0.8.13.
