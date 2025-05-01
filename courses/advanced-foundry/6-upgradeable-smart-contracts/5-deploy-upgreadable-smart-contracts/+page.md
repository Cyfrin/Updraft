---
title: UUPS Deploy
---

_Follow along the course with this video._

---

### UUPS Deploy

At this point we're buried in context and it's time to see this in action. Here's how we're going to accomplish this, we're going to:

1. Deploy BoxV1
2. Get an address
3. Deploy Proxy with BoxV1 address
4. Verify that everything works
5. Deploy BoxV2
6. Point Proxy to BoxV2

We'll begin by creating two scripts, `script/DeployBox.s.sol` and `script/UpgradeBox.s.sol`

Our deployment script should be very familiar to us by now!

> ❗ **PROTIP**
> Repetition is the mother of skill.

```solidity
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {BoxV1} from "../src/BoxV1.sol";

contract DeployBox is Script {
    function run() external returns(address) {
        address proxy = deployBox();
        return proxy;
    }

    function deployBox() public returns(address) {
        vm.startBroadcast();
        BoxV1 box = new BoxV1(); // Implementation
        vm.stopBroadcast();
    }
}
```

At this point we'll want to import and deploy our proxy. The proxy we're going to use is ERC1967. Feel free to read more about its specifics in the [**OpenZeppelin Documentation**](https://docs.openzeppelin.com/contracts/4.x/api/proxy) or [**Ethereum Improvement Proposals**](https://eips.ethereum.org/EIPS/eip-1967).

In order to access OpenZeppelin's ERC1967 implementation, we'll need to install our standard OpenZeppelin/Contracts library and import it into our deploy script.

```bash
forge install OpenZeppelin/openzeppelin-contracts --no-commit
```

```solidity
import { ERC1967Proxy } from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
```

We'll also need to add this remapping to our `foundry.toml`.

```solidity
remappings = [
  "@openzeppelin/contracts=lib/openzeppelin-contracts/contracts",
  "@openzeppelin/contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/contracts",
]
```

Finally, we can add the deployment of our proxy to our deploy script. The ERC1967Proxy contract _does_ have a constructor we need to consider.

```solidity
constructor(address implementation, bytes memory _data) payable {
    ERC1967Utils.upgradeToAndCall(implementation, _data);
}
```

This constructor is expecting two arguments to be passed, the first is our implementation contract, as to be expected. The second is `_data`. This data parameter can be used to pass function call data to be executed after deployment ie - calling an initializer function. We won't be employing this functionality, so our data parameter is going to be empty.

```solidity
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {BoxV1} from "../src/BoxV1.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract DeployBox is Script {
    function run() external returns(address) {
        address proxy = deployBox();
        return proxy;
    }

    function deployBox() public returns(address) {
        vm.startBroadcast();
        BoxV1 box = new BoxV1(); // Implementation
        ERC1967Proxy proxy = new ERC1967Proxy(address(box), "");
        BoxV1(address(proxy)).initialize();
        vm.stopBroadcast();
        return address(proxy);
    }
}
```

### Wrap Up

Things are looking great! At this point we should be able to run `forge build` to ensure things are compiling as expected.

In the next lesson we'll configure our script to upgrade our BoxV1 protocol to BoxV2.

See you there!
