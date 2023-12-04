---
title: Deploy Script
---

_Follow along the course with this video._



---

## Coding Your Basic NFT

Ready your keyboards, it's time to get coding! We already looked on the the basic code for the NFT on previous lessons and today we will be writing the code for the deploy script.

## Basic Deployment

This function will serve a dual purpose; we're going to use it for our testing as well. What should it return? The answer is pretty straightforward - it should return our basic NFT.

Therefore, this is how the Deployment contract will look like:

```js
contract DeployBasicNft is Script {
    uint256 public DEFAULT_ANVIL_PRIVATE_KEY =
        0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
    uint256 public deployerKey;

    function run() external returns (BasicNft) {
        if (block.chainid == 31337) {
            deployerKey = DEFAULT_ANVIL_PRIVATE_KEY;
        } else {
            deployerKey = vm.envUint("PRIVATE_KEY");
        }
        vm.startBroadcast(deployerKey);
        BasicNft basicNft = new BasicNft();
        vm.stopBroadcast();
        return basicNft;
    }
}

```

This chunk of code initiates a broadcast to the EVM (Ethereum Virtual Machine), creates a new basic NFT and stops the broadcast, then returns our freshly created NFT.

Also don't forget we need to import the basic libraries we always use in our contracts, and of course the solidity version and the license.

```js
// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Script} from "forge-std/Script.sol";
import {BasicNft} from "../src/BasicNft.sol";
import {console} from "forge-std/console.sol";
```

After putting the finishing touches on your code, it’s time to compile.

## Time to Compile

To make sure everything is peachy, run a quick `forge compile`.

```shell
forge compile

```

Now watch as your console lights up with the wonderful message: "COMPILING SUCCESSFULLY!"

<img src="/foundry-nfts/6-deploy/deploy1.png" style="width: 100%; height: auto;">

And there you have it! You've just created and deployed a basic NFT. This experience should give you a taste of the powerful capabilities of Solidity for building and working with NFTs.

Stay tuned for more adventures in the world of decentralized applications. And remember, never stop exploring!

<img src="/foundry-nfts/6-deploy/deploy2.png" style="width: 100%; height: auto;">

Happy Coding!
