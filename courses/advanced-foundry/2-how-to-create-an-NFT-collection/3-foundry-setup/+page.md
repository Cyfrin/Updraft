---
title: Foundry Setup
---

_Follow along the course with this video._



---

Hello, coders! Now that we have an idea about NFTs, we're all set to start coding our first-ever Non-fungible tokens. If you want to follow along, feel free to pass by the course materials where the GIT code associated with this lesson is located.

## Setting Up the Environment

First, as usual, we create a new directory for our project.

```shell
mkdir foundry-nft-f23
```

Then, let's switch to our newly created directory.

```shell
cd foundry-nft-f23
```

Next, we'll launch our text editor (I'm using the popular Visual Studio Code in this case) from the terminal.

```shell
code foundry-nft-f23
```

Before anything else, let's fire up the terminal, close the explorer and initiate our working directory to clean any residual files.

```shell
forge init
```

Check if the '.env' file exists and also add 'broadcast.'

## Creating Our Basic NFT

The NFT we are about to create is a token standard, similar to the ERC 20. The best part about this is that we don't need to walk through all the functions. We can save some time using our trusty package `OpenZeppelin`.

Looking at the Open Zeppelin contracts, there's a token folder that hosts an ERC721.sol contract. This contract has almost all the functionality that we need for our NFT.

```shell
forge install OpenZeppelin/openzeppelin-contracts
```

By now, already you know that SPDX license identifier, MIT, and Pragma, solidity version are mandatory elements in a solidity file. Here's how we're defining our 'basicNFT.sol' file –

```js
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
contract BasicNFT {...}
```

We'll import the OpenZeppelin contracts package, point to the ERC 721 protobuf file, and declare our basic NFT contract.

```js
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
```

Voila, our basic NFT ecosystem is ready for use, and its name will be dog and symbol as doggy.

```shell
 constructor() ERC721("Dogie", "DOG") {}
```

But are we done yet? No. Now, we need to define the appearance of our NFTs and define how to obtain these tokens.

## Token Standard and Counter

Looking at the ERC 20 token standard, it has a balanceOf function. But in NFTs, the 'amount' of tokens doesn't matter as each of them is unique and thus can have distinct values. Here, the 'ownerOf' function is used to give each token a unique ID.

The unique NFT is denoted by a combination of the contract's address that represents the entire collection and the token's ID. So, we are going to use a 'token counter' to keep track of each token's unique ID.

```shell
uint256 private s_tokenCounter;
```

Our token counter's initial value will be zero, and it will increase as we mint new 'dog' tokens.

<img src="/foundry-nfts/3-setup/setup1.png" style="width: 100%; height: auto;">

## Minting the Puppy NFT

The minting function that we're about to define will allow us to produce our puppy tokens. This function is very crucial in the EIP721, the tokenUri. Although initially considered an optional parameter, the tokenUri, which stands for Token Uniform Resource Identifier, returns an API endpoint containing the NFT's metadata.

<img src="/foundry-nfts/3-setup/setup2.png" style="width: 100%; height: auto;">

This metadata outlines the appearance of our NFT, including a title, a type, properties, and an image. The Uri points to the object that dictates the NFT's looks.

```shell
function tokenURI(uint256 tokenId) public view override returns (string memory) {}
```

Here we override the base’s tokenUri method with our custom method. Notice that whenever we want to look at what an NFT looks like, we call this function. The NFT’s look is determined by the image that this function returns.

## Deploying Images for NFT

Our puppy NFTs are ready to be brought to life. In our GitHub repository, we have the NFT images you can use for your first NFT. Once you select and download your desired puppy, let’s save it to the 'img' folder that we created in the project's directory.

<img src="/foundry-nfts/3-setup/setup3.png" style="width: 100%; height: auto;">

Wow! It was a smooth journey, and we have successfully prepared our NFT images which are ready to be deployed using IPFS. Stay tuned for the next section where we will delve deeper into IPFS and how we can use it.
