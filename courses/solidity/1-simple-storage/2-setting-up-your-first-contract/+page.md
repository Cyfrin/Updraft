---
title: Setting Up Your First Contract
---

_You can follow along with the video course from here._




## Introduction 
In this lesson you are going to learn the basics on how to use Remix, and how to create and compile your first contract.

## The IDE: Remix

Open <a href="https://remix.ethereum.org/" target="_blank" style="color: blue; text-decoration: underline;">Remix</a> to get started. 

This is a powerful tool used to build and develop smart contracts in Solidity. It's and IDE (Integrated Development Environment), which means that it contains a lot of features that can help in the deployment process: it helps visualising contracts behaviour and facilitate their interaction.

1. 🧹 Remove all the existing files and folders by right-clicking on them. Cleaning up your space leads to cleaning up your mind.
2. ✨ Create a new file, e.g., `SimpleStorage.sol`. The `.sol` extension tells the compiler that this is a Solidity file.

<!--TODO: Add Support for Solidity on svelte-->

## Compiler directive

The `pragma` directive specifies the version of Solidity you want to use to compile your source file. When the compiler encounters this line, it will check its own version against the one you specified here. If the compiler version is different, Remix will automatically adjust accordingly to your specification. 

You can specify the compiler version(s) in the following ways:

1. Using exactly **one** compiler version to build the current contract
```js
pragma solidity 0.8.19; // use only version 0.8.19
```

1. Use versions that are in **between** a lower and upper range

```js
pragma solidity ^0.8.19; // use versions in between 0.8.19 and 0.9 (excluded)
pragma solidity  >=0.8.19 < 0.9.0; //use only the complier versions between 0.8.15 and 0.8.18 included to build this contract (no upper limit)
```

> [!NOTE]
You should write comments in your own code for you to refer later on.

## SPDX License Identifier

It's a good practice (even not mandatory) to start your smart contract with an SPDX License Identifier. It helps in making licensing and sharing code easier from a legal perspective.

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
```

MIT is known as one of the most permissive licenses which means anybody can use this code and pretty much do whatever they want with it.

## Writing the Smart Contract

Start by writing your contract using the keyword `contract`. Give it a name, e.g., `SimpleStorage`. All the code inside the curly brackets will be considered part of this contract.

If you are familiar with Object Oriented Programming Languages, you can think a *contract* as a concept similar to a *class*.

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SimpleStorage {
    //here we'll place the contract content
}
```

## Compiling the Contract

1. In Remix IDE, select the Solidity Compiler.
2. Choose the version of the compiler that matches the version specified in your Solidity file.
3. Hit the `Compile` button.

Compiling your code means taking human-readable code and transforming it into computer-readable code or bytecode.

If you see a green checkmark, it means your compilation was successful. If there is any error, Remix will point out where the error is, and you can debug it accordingly.

## Congratulations

🏆 You created your first contract. It does not perform any operation but it's complete enough to be transformed in bytecode. TODO

