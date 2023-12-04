---
title: UUPS Setup
---

_**Follow along with this video.**_



---

## Building an Upgradable Solidity Contract with Delegate Call

In today's sublesson, we are going to delve into the depths of Solidity; we're going to write an upgradable contract utilizing the power of the delegate call function. We will not only cover the theory but also offer a full example and walk you through it step by step.


## Let's Get Started

First, we are going to create a new directory for our project called `foundry-upgrades-f23`.

```shell
mkdir foundry-upgrades-f23
cd foundry-upgrades-f23
```

Now, remember we recently mentioned the Transparent Proxy pattern and the UUPS Proxy pattern. Today, we will primarily focus on the latter. UUPS Proxy is a more robust pattern which allows upgrades to be handled by the contract implementation and can be removed eventually. This is immensely crucial if we want to make our contract upgrade as seldom as possible staying as close as possible to complete immutability.

Now, let's initialize our project with:

```shell
forge init
```

After setup, we will delete the unnecessary files and start to build our very own minimal contracts: `BoxV1.sol` and `BoxV2.sol`.

### BoxV1

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract BoxV1 is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    uint256 internal value;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function getValue() public view returns (uint256) {
        return value;
    }

    function version() public pure returns (uint256) {
        return 1;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
```

### BoxV2

```js
/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract BoxV2 is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    uint256 internal value;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function setValue(uint256 newValue) public {
        value = newValue;
    }

    function getValue() public view returns (uint256) {
        return value;
    }

    function version() public pure returns (uint256) {
        return 2;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
```

In `V2`, we introduce another function — `setNumber()`. We have prepared the `BoxV1` contract initially, and will upgrade it to `V2` after deployment.



## Implementing UUPS Upgradable Contract

Next, we need to define our `UUPSUpgradable` contract.

Remember we don't want to use a constructor in our implementation because the Proxy doesn't call the constructor when a contract is initialized. Instead, we need to utilize an **initializer function** to replace the constructor logic.

A function marked with the `initializer` modifier can be initialized **only once**. It's a way to define a constructor for contracts that are meant to be used via Proxy, without the typical Solidity constructor's downside.

```javascript
function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
```

The authorize upgrade function will give us control over who can upgrade the contract. You can replace it based on your authorization scheme. For simplicity, we'll leave it blank here, implying that anyone can upgrade the contract.

Another crucial detail to consider is the Proxy storage. **Proxies only point to storage slots, not variable names**. This behavior could lead to collisions when new storage slots are added. For example, say you upgrade from `V1` to `V2`. If `V1` has the variable `number` at storage slot `0`, and you add another variable `otherNumber` to `V2` also at storage `slot`, the old `number` variable will be overwritten by `otherNumber`.


And that's it. We created an initial contract `Box V1` and a simple upgrade version of it `Box V2`. Of course, these are basic contracts, and real-world contracts will need more thorough authorization and verification processes when it comes to upgradeability.

**Remember**, when you upgrade contracts, you change the contract address and all calls are redirected to the new contract. Your users need to trust you, or the decentralized governance scheme, with the upgrade. After all, a rogue implementation can ruin a well-designed contract and its users.

So, as a developer, you need to execute upgrades judiciously and sparingly, always focusing on creating well-tested and audited contracts.

Stay tuned for more posts about Solidity development and best practices!

