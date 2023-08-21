---
title: ERC20 Deploy Script
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://youtube.com/embed/V-Hqnq-VcH8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Deploying Our Token: A Step By Step Guide

If you've ever wondered how to deploy a token, and more importantly, test it and write scripts to deploy it - then you've come to the right place. Buckle up, because we're about to journey through this process. Let's get started!

## Initiating the Deployment

<img src="/foundry-erc20s/erc20-deploy-script/erc20-deploy-script1.PNG" style="width: 100%; height: auto;">

To initiate this, we're going to deploy OurToken.sol. Now, you might be asking why we don't need a helper config here - what about those special contracts that we would need to interact with? Well, this deployment is unlike any other because our token will be identical across all chains. No special contracts or config will be needed!

Let's start with a simple script to keep things light and compact:

```javascript
SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";

contract DeployOurToken is Script {

}
```

## Creating a Function Run

We'll need to import our token like so:

```javascript
import { Script } from "forge-std/Script.sol";
```

Next, let's create a function, run, that will be external. Within the run function, we’ll do `vm.startBroadcast()`. In our run function, we need to initiate the VM broadcast as shown, we'll need to give it an initial supply too, say 1000 ether. That’s right, our token needs an initial amount to start with and finally, we'll want to return OurToken, for use later:

```javascript
SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {OurToken} from "../src/OurToken.sol";

contract DeployOurToken is Script {
    uint256 public constant INITIAL_SUPPLY = 1000 ether;

    function run() external return(OurToken){
        vm.startBroadcast();
        OurToken ot = new OurToken(INITIAL_SUPPLY);
        vm.stopBroadcast();

        return ot;
    };
}

```

Following this, we'll deploy our token using the initial supply because, remember, our token requires an initial supply. We then stop the VM broadcast, and voila, our script is ready!

## Adding the Final Touches

<img src="/foundry-erc20s/erc20-deploy-script/erc20-deploy-script2.PNG" style="width: 100%; height: auto;">

For the final touches, we can use a nifty trick. We can borrow from our previous projects or directly from the git repo that corresponds with this tutorial. We'll generate a Makefile for this. Create this new file in your project's root directory. We'll visit foundry-erc20-f23 and just put everything into this Makefile. Guess what, we can just copy the whole thing!

Find the Makefile to copy [here:](https://github.com/Cyfrin/foundry-erc20-f23/blob/main/Makefile)

Once you’ve copied over the Makefile, you can simply run the command `make deploy`. If you encounter any errors, just create a new anvil using `make anvil` and once again run `make deploy`.

The compiler should now run successfully and your token is officially deployed to your anvil chain. Congratulations, you have just deployed your token!

<img src="/foundry-erc20s/erc20-deploy-script/erc20-deploy-script3.PNG" style="width: 100%; height: auto;">

By following these steps, you have simplified the process of deploying and testing a token. Who'd have thought it could be this straightforward and efficient?
