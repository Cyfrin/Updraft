---
title: UUPS Deploy
---

_**Follow along with this video.**_

<iframe width="560" height="315" src="https://www.youtube.com/embed/Jl0NpeHVoww?si=2LA7SY8H0RVWZ-kU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---



In this blog post, I am going to give you a walkthrough on how to upgrade and deploy upgraded contracts using Solidity, more specifically, boxes. By the end of this guide, you'll be able to deploy an upgradeable box contract from the same address.

Here's the roadmap for this blog post:

1. Deploy Box v1
2. Get an address
3. Verify that functions work
4. Deploy Box v2
5. Point Proxy to Box v2

Ready? Let's make the magic happen!

### Deployment Script - `deployBox.sol`

First off, we'll create a script named `deployBox.sol`, which will be responsible for deploying our Box. Also, we'll create another one called `upgradeBox.sol` that will help to upgrade it later on. Here's what the `deployBox.sol` script looks like:

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {BoxV1} from "../src/BoxV1.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract DeployBox is Script {
    function run() external returns (address) {
        address proxy = deployBox();
        return proxy;
    }

    function deployBox() public returns (address) {
        vm.startBroadcast();
        BoxV1 box = new BoxV1();
        ERC1967Proxy proxy = new ERC1967Proxy(address(box), "");
        vm.stopBroadcast();
        return address(proxy);
    }
}
```

Please note that this SPX license and pragma version can differ based on your needs and project's requirements.

Here, the `DeployBox()` function creates a new instance of the `BoxV1` contract.


If everything is coded correctly, it should compile without any issues.

<img src="/upgrades/5-deploy/uup-deploy1.png" style="width: 100%; height: auto;">

### Now, let's see this in action...

This tutorial is not just about compiling code but also about making it work in real-time. The next steps will involve writing tests to facilitate execution and to ensure everything is working as expected. Stay tuned for the detailed rundown of those steps in the upcoming posts.

We'll be deploying `Boxv1`, get it's proxy address, and then we're going to upgrade it to `Boxv2`. All from the same address.

We'll cover that in the next blog post, so hang on tight!

There's more to Solidity and Proxy contracts than meets the eye, and with this proxy in particular, you're sure to upgrade your Solidity contracts with utmost efficiency.

