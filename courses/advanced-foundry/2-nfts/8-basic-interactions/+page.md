---
title: Basic NFT Interactions
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/kSiLlUxdEzs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Introduction

Everyone who is interested in the fascinating world of NFTs (Non-fungible tokens), most likely knows the basic line - how to mint a token. However, have you ever thought about creating a dedicated tool to mint your token programmatically, instead of using a traditional casting procedure? Well, you're in luck! We'll be discussing exactly how to achieve this with Solidity in this post. Buckle up!

## The Code

Typically, we'd define a Solidity contract with all the necessary imports. For this instance, we're going to name ours `MintBasicNft`. This is going to be on `Interactions.s.sol`, let's get started:

```js
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract MintBasicNft is Script {}
```

Right out of the gate, it's safe to say you already know the drill—defining a simple contract! We'll increase the complexity over the course of this tutorial.

### Importing Necessary Libraries

Next, we've got to bring in our scripts from Forge’s Script.sol. This is quite straightforward:

```js
import {Script, console} from "forge-std/Script.sol";
```

Now, we'll start to shape up our contract. Next, we need to create an external function `run()` which is going to mint our NFT.

```js
function run() external {}
```

To ensure that we're always working with the most recently deployed NFT, we'll need a fantastic tool from `foundry-devops-package`. It's time to install this package. Copy the URL and run it in your terminal:

```shell
forge install ChainAccelOrg/foundry-devops --no-commit
```

Close the terminal and write a code line to get the recently deployed address:

```js


address mostRecentlyDeployed = 
        DevOpsTools.get_most_recent_deployment("BasicNFT", block.chainid);
```

Here, we have a function called `get_most_recent_deployment` from `DevOpsTools` that fetches the most recent deployment.

For this to work, remember to bring your DevOps tools into the contract:

```js
import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol";

```

### The Mint Function

Here comes the grand part, writing the function that mints your NFT on the contract. For this, pass in the `mostRecentlyDeployed`:

```js
mintNFTOnContract(mostRecentlyDeployed);
```

And the function `mintNFTOnContract` takes an address, starts broadcasting, mints an NFT, and stops broadcasting:

```js
function mintNftOnContract(address contractAdress) public {
    vm.startBroadcast();
    BasicNft(basicNftAddress).mintNft(PUG);
    vm.stopBroadcast();
}
```

At the end of the function, you can pass your pug string (it’s unique, I promise). Don’t forget to import your basic NFT:

```js
import {BasicNft} from "../src/BasicNft.sol";
```

## Conclusion

Congratulations! You now have an effective way to programmatically deploy and mint your NFTs!

<img src="/foundry-nfts/8-interaction/interaction1.png" style="width: 100%; height: auto;">

With this custom-made tool, you are no more confined to the traditional casting process. This tool gives you the flexibility to programmatically mint your NFTs with ease, anytime you want.

With this added skill in your NFT arsenal, you're a step closer to mastering the fascinating world of non-fungible tokens.

**Happy Coding!**

