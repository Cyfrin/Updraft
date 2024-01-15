---
title: UUPS Upgrade
---

_**Follow along with this video.**_



---

On this sublesson we are going to write the script to upgrade the Box contract we made on past sublessons using a new contract called `UpgradeBox.s.sol`.

##  Write and Deploy an Upgrade Box Script

Having installed the DevOps tool, let's move to the meat and potatoes: the upgrade box script creation.

We'll start by defining our pragma and importing the necessary dependencies

```js
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {BoxV1} from "../src/BoxV1.sol";
import {BoxV2} from "../src/BoxV2.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol";
```

Define a function, `run`, which will return the proxy

```js
function run() external returns (address) {
        address mostRecentlyDeployedProxy = DevOpsTools
            .get_most_recent_deployment("ERC1967Proxy", block.chainid);

        vm.startBroadcast();
        BoxV2 newBox = new BoxV2();
        vm.stopBroadcast();
        address proxy = upgradeBox(mostRecentlyDeployedProxy, address(newBox));
        return proxy;
    }
```



## Upgrade the Box


Initializing a proxy upgrade, we'll create a new function `upgradeBox`. This function will take in two parameters: the address of our deployed proxy and the address of our newly deployed Box v2. We will then return the proxy address.

```js
 function upgradeBox(
        address proxyAddress,
        address newBox
    ) public returns (address) {
        vm.startBroadcast();
        BoxV1 proxy = BoxV1(payable(proxyAddress));
        proxy.upgradeTo(address(newBox));
        vm.stopBroadcast();
        return address(proxy);
    }
```


So if the journey was a bit challenging, let's summarize what's actually happening in layman's terms.

<img src="/upgrades/6-upgrade/up1.png" style="width: 100%; height: auto;">

Simple, right? Don't believe it yet? It's alright, let's prove it with a test!

For now, happy coding!

