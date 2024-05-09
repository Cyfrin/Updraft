---
title: Setting Up Your First Contract
---

_You can follow along with the video course from here._




# Introduction 
In this lesson you are going to learn how to use Remix, and how to create and compile your first contract.

## The IDE: Remix

Open <a href="https://remix.ethereum.org/" target="_blank" style="color: blue; text-decoration: underline;">Remix</a> to get started. 

Remix it's a powerful tool used to build and develop smart contracts in Solidity. It's and IDE (Integrated Development Environment), which means that has a lot of features that can help the deployment process. 
As a professional, you want to be able to also use a local environment, but It's used to quickly check out code.

It helps visualizing what contracts do and facilitates the interact with them.
1. It has a File explorer: Clean the environment by right-clicking and deleting the existing folders (optional). A clean environment cleans up your mind.
2. We can create a new file, e.g., SimpleStorage.sol. The `.sol` extension tells the compiler that this is a Solidity file.

<!--TODO: Add Support for Solidity on svelte-->

## Compiler directive

The `pragma` directive specifies the version of Solidity you want to use. When the compiler encounters this line, it will check its version against the one specified. If the compiler is outside the specified range, it will generate an error. 

You can specify the compiler version in 3 ways:

1. Using exactly one compiler version to build the current contract
```js
pragma solidity 0.8.19; // use only version 0.8.19
```

2. Use versions that are between a lower and upper range

```js
pragma solidity ^0.8.19; // use only versions included from 0.8.19 til 0.9 (excluded)
pragma solidity  >=0.8.19 < 0.9.0; //use only the complier versions between 0.8.15 and 0.8.18 included to build this contract (no upper limit)
```

> [!NOTE]
You should write comments in your own code for you to refer later on

## SPDX License Identifier

It's a good practice to start your smart contract with an SPDX License Identifier. Though it's not mandatory, it helps in making licensing and sharing code easier from a legal perspective.

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
```

MIT is known as one of the most permissive licenses which means anybody can use this code and pretty much do whatever they want with it.

## Writing the Smart Contract

Start by writing your contract using the keyword `contract`. Give it a name, e.g., SimpleStorage. Everything inside the curly brackets will be considered part of this contract.

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SimpleStorage {

}
```

## Compiling the Contract

1. In Remix IDE, select the Solidity Compiler.
2. Choose the version of the compiler that matches the version specified in your Solidity file.
3. Hit the `Compile` button.

Compiling your code means taking human-readable code and transforming it into computer-readable code or bytecode.

If you see a green checkmark, it means your compilation was successful. If there is any error, Remix will point out where the error is, and you can debug it accordingly.

## Congratulations

Technically, you just drafted your first Smart Contract. It's a straightforward operation and the script doesn't do anything yet. However, we're well on our way.

