---
title: UUPS Upgrade
---

_Follow along the course with this video._

---

### UUPS Upgrade

Let's keep our momentum from the last lesson and jump right into writing our UpgradeBox.s.sol script. The boilerplate for this will be as expected.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";

contract UpgradeBox is Script {
    function run() external returns (address){}
}
```

Alright, in order to reference our deployment of ERC1967Proxy, we're going to use our DevOps Tools library again to assist. Begin by installing it.

```bash
forge install Cyfrin/foundry-devops --no-commit
```

We can then import this and leverage the get_most_recent_deployment functionality to acquire our ERC1967Proxy address.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol";

contract UpgradeBox is Script {
    function run() external returns (address){
        address mostRecentDeployment = DevOpsTools.get_most_recent_deployment("ERC1967Proxy", block.chainid);
    }
}
```

Next, we'll need to import and deploy BoxV2!

```solidity
...
import {BoxV2} from "../src/BoxV2.sol";

contract UpgradeBox is Script{
    function run() external returns (address){
        address mostRecentDeployment = DevOpsTools.get_most_recent_deployment("ERC1967Proxy", block.chainid);

        vm.startBroadcast();
        BoxV2 newBox = new BoxV2();
        vm.stopBroadcast();
    }
}
```

In order to modularize things a bit for the tests we'll write in the next lesson, we'll write an `upgradeBox` function in which our proxy is called.

```solidity
function upgradeBox(address proxyAddress, address newBox) public returns (address) {
    vm.startBroadcast();
    BoxV1 proxy = BoxV1(proxyAddress);
    proxy.upgradeTo(address(newBox));
    vm.stopBroadcast();

    return address(proxy);
}
```

> ❗ **NOTE**
> We're unable to call a function on an address provided as a parameter here, but by wrapping the address in BoxV1 (which needs to be imported), we provide our function the ABI necessary to reference the upgradeTo function within the proxy address.

Now, we can add upgradeBox to our scripts run function.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol";
import {BoxV1} from "../src/BoxV1.sol";
import {BoxV2} from "../src/BoxV2.sol";

contract UpgradeBox is Script {
    function run() external returns (address) {
        address mostRecentDeployment = DevOpsTools.get_most_recent_deployment("ERC1967Proxy", block.chainid);

        vm.startBroadcast();
        BoxV2 newBox = new BoxV2();
        vm.stopBroadcast();

        address proxy = upgradeBox(mostRecentDeployment, address(newBox));
    }

    function upgradeBox(address proxyAddress, address newBox) public returns (address) {
        vm.startBroadcast();
        BoxV1 proxy = BoxV1(proxyAddress);
        proxy.upgradeTo(address(newBox));
        vm.stopBroadcast();

        return address(proxy);
    }
}
```

### Wrap Up

We now have the ability to programmatically upgrade our BoxV1 protocol to BoxV2!

In this UpgradeBox script, we are acquiring our most recent ERC1967 deployment by leveraging the DevOpsTools library. We're then deploying BoxV2 and then calling our upgradeBox function. This function passes our new BoxV2 address to our proxy, upgrading the protocol's implementation address!

In the next lesson we'll set up some tests to see this in action.

Let's gooooo!
