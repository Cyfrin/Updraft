---
title: Introduction
---

*If you'd like, you can follow along with the course here.*

<iframe width="560" height="315" src="https://www.youtube.com/embed/umepbfKp5rI?&t=7842s" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


# Introduction

To get started, we want to open up <a href="https://remix.ethereum.org/" target="_blank" style="color: blue; text-decoration: underline;">remix</a>. When you open it up, you'll be greeted with a site that looks like this.

<img src="/solidity/remix/remix-screenshot.png" style="width: 100%; height: auto;">

You may select "Accept" or just ignore. 

## Setting Up

Before we dive into coding, it is essential that you have access to the code repository and educational resources provided.

1. Access the GitHub repository associated with this course. The repository contains all the code we will be working with, as well as a README file which includes important notes on working with the code.
2. If you face any issues or want to participate in discussions, use the discussions tab on GitHub instead of creating issues.

Also, I recommend creating accounts on the following platforms if you haven't already:
- GitHub
- Stack Exchange Ethereum
- Chat JBT (but remember it might not always provide accurate information)

## Asking Questions

In the questions section, we'll guide you on how to ask questions effectively. A well-framed question is more likely to be answered by the community, AI, or forum.

## Using Remix IDE

Remix IDE is a powerful tool used for developing smart contracts in Solidity. In this section, we will be creating our smart contract and deploying it on a blockchain.

1. Open Remix IDE by either searching on Google or visiting the link provided in the GitHub repository.
2. If it's your first time using Remix, it will provide you a tutorial walkthrough of its features. You can choose to go through it.
3. Clean the environment by right-clicking and deleting the existing folders (optional).
4. Create a new file by clicking on the "create new file" button and give it a name, e.g., SimpleStorage.sol. The `.sol` extension indicates it is a Solidity file.

```solidity
// Your first line in SimpleStorage.sol
pragma solidity ^0.8.0;
```

This line specifies the version of Solidity you are using. The caret (^) symbol specifies that the code is compatible with the mentioned version and any new version till (but not including) 0.9.0.

## SPDX License Identifier

It's a good practice to start your smart contract with an SPDX License Identifier. Though it's not mandatory, it helps in making licensing and sharing code easier from a legal perspective.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
```

MIT is known as one of the most permissive licenses which means anybody can use this code and pretty much do whatever they want with it.

## Writing the Smart Contract

Start by writing your contract using the keyword `contract`. Give it a name, e.g., SimpleStorage. Everything inside the curly brackets will be considered part of this contract.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {

}
```

## Compiling the Contract

1. In Remix IDE, select the Solidity Compiler.
2. Choose the version of the compiler that matches the version specified in your Solidity file.
3. Hit the `Compile` button.

Compiling your code means taking human-readable code and transforming it into computer-readable code or bytecode.

If you see a green checkmark, it means your compilation was successful. If there is any error, Remix will point out where the error is, and you can debug it accordingly.

## Conclusion

By the end of this lesson, you should have deployed your first smart contract, written your first bit of Solidity, and compiled it successfully. Make sure to follow along by coding as this will help ingrain the knowledge.

