---
title: UUPS
---

_Follow along the course with this video._

---

### UUPS

Now that we have a better understanding of upgradeability and how delegateCall empowers proxies, let's build out our own upgradeable smart contract protocol to see this first hand. All the code we go over will be available on the course's [**GitHub Repo**](https://github.com/Cyfrin/foundry-upgrades-f23) as usual.

We can begin by creating a new directory with our Foundry Full Course folder and opening it within VSCode. We'll then initialize the Foundry project.

```bash
mkdir foundry-upgrades-f23
code foundry-upgrades-f23
```

In the new VSCode window's terminal:

```bash
forge init
```

We'd gone over a few different variations of proxies that are used in Web3, but the version we'll be focusing on is the Universal Upgradeable Proxy Standard (UUPS). In this flavour of proxy, the upgrade functionality is handled by the implementation contract and _can_ eventually be removed. This really affords developers an opportunity to lock things in and not upgrade anymore, which is going to better adhere to our blockchain values!

Go ahead and delete the placeholder/example contracts in our new Foundry project, `script/Counter.s.sol`, `src/Counter.sol`, and `test/Counter.t.sol`.

We'll begin with creating a minimalistic contract that we're going to upgrade. Create `src/BoxV1.sol` and start with our boilerplate.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract BoxV1 {}
```

Again, because we're going to be employing UUPS, all of the upgradeability logic is going to be contained within this BoxV1 implementation contract.

Our BoxV1 is going to be very simple, we'll have two functions, one which returns a number, and another which returns our protocol version.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract BoxV1 {
    uint256 internal number;

    function getNumber() external view returns (uint256) {
        return number;
    }

    function version() external pure returns (uint256) {
        return 1;
    }
}
```

Looks great, except...oh no! We didn't include a function to _set_ our number. Let's create a BoxV2.sol which addresses this and updated our version number.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract BoxV2 {
    uint256 internal number;

    function setNumber(uint256 _number) external {
        number = _number;
    }

    function getNumber() external view returns (uint256) {
        return number;
    }

    function version() external pure returns (uint256) {
        return 2;
    }
}
```

In order to implement the UUPS functionality, we're going to leverage an OpenZeppelin library. This one is actually different from the OpenZeppelin/Contracts we're used to and is tailored specifically for upgradeability. Let's install this library.

```bash
forge install OpenZeppelin/openzeppelin-contracts-upgradeable@v4.9.6 --no-commit
```

Once installed we can add our remappings to our `foundry.toml`

```toml
remappings = [
  "@openzeppelin/contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/contracts",
]
```

And now, we can import UUPSUpgradeable into BoxV1.sol and break down how it's applied.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract BoxV1 {
    uint256 internal number;

    function getNumber() external view returns (uint256) {
        return number;
    }

    function version() external pure returns (uint256) {
        return 1;
    }
}
```

Let's open up UUPSUpgradeable to take a look at some of it's important/applicable functionality.

> ❗ **PROTIP**
> You can ctrl + left-click, or cmd + left-click the file name in our import to open it up.

Within UUPSUpgradeable we can see the main function we'll need to leverage upgradeToAndCall. This will allow us to upgrade the implementation address of our protocol. We'll need to inherit UUPSUpgradeable with BoxV1.

> ❗ **NOTE**
> Later versions of the UUPSUpgradeable library have removed upgradeTo in favour of just using upgradeToAndCall.

Once inherited, we'll see a compiler warning advising that BoxV1 should be marked as abstract.

![UUPS1](/foundry-upgrades/4-UUPS/UUPS1.png)

We receive this error because we don't have all the necessary functions defined in BoxV1 as required by UUPSUpgradeable which is an abstract contract.

Abstract contracts have some of their functions defined, and others undefined. These contracts expect their child classes to implement the undefined functions.

An example of an undefined function within UUPSUpgradeable would be \_authorizeUpgrade.

````solidity
/**
 * @dev Function that should revert when `msg.sender` is not authorized to upgrade the contract. Called by
 * {upgradeToAndCall}.
 *
 * Normally, this function will use an xref:access.adoc[access control] modifier such as {Ownable-onlyOwner}.
 *
 * ```solidity
 * function _authorizeUpgrade(address) internal onlyOwner {}
 * ```
 */
function _authorizeUpgrade(address newImplementation) internal virtual;
````

This is a function we'll need to define within our protocol with the logic to denote how an upgrade is authorized, perhaps limitations on who can upgrade with a check on msg.sender, for example. Let's go ahead and implement this override function in BoxV1.sol now.

```solidity
function _authorizeUpgrade(address newImplementation) internal override {}
```

This line is actually all that's needed. For our example, we're not going to implement any further authorization, but you could easily image how this function would be used to implement a check on the address calling the upgrade.

### Storage Gaps

In older implementations of UUPSUpgradeable, you may see a line that I wanted to draw special attention to.

```solidity
/*
 * @dev This empty reserved space is put in place to allow future versions to add new variables without shifting down storage in the inheritance chain.
 * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
 */
uint256[50] private __gap;
```

![UUPS2](/foundry-upgrades/4-UUPS/UUPS2.png)

If you recall to previous lessons, when values are assigned by a function, the variable name doesn't ultimately matter as the value is assigned to a storage slot. We saw that storage clashes were possible when an upgraded implementation contract made changes to the order of storage variable assignments, leading to some funky behaviours.

Storage gaps are an effort to get ahead of this problem by pre-allocating an array of slots to account for future protocol changes. This effectively creates a buffer of available storage slots to be used by subsequent implementation contracts for new variables and functionality.

### Initializer

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract BoxV1 is UUPSUpgradeable {
    uint256 internal number;

    function getNumber() external view returns (uint256) {
        return number;
    }

    function version() external pure returns (uint256) {
        return 1;
    }

    function _authorizeUpgrade(address newImplementation) internal override{}
}
```

BoxV1 as written above is deployable and could be upgraded, BoxV2 can't be upgraded, but we'll cross that bridge later. If you look at the examples of OpenZeppelin UUPS contract on their Contract Wizard, you'll see that they are importing far more than we are however. One of which is the Initializable.sol library. Let's import this into BoxV1 and discuss it's importance here.

```solidity
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
```

If we open Intializable.sol, there's a lot of valuable insight to be gained about what's happening and how it works.

![UUPS3](/foundry-upgrades/4-UUPS/UUPS3.png)

This line of the documentation really gets to the heart of what the purpose of the initializer is.

Because storage for a proxied protocol is stored in the proxy, any initial set up needs to be done after an implementation contract's deployment. This is handled through this initializer functionality. Any setup that would be handled in a constructor, on deployment of an implementation contract, won't have those storage values passed to the proxy as necessary.

This is such a concern that common practice is to include a constructor within an implementation contract which _explicitly_ disables initialization functions, assuring that this needs to be done through the proxy.

```solidity

constructor() {
    _disableInitializers();
}
```

If we add this to our BoxV1, we'll then need to add initialization logic to it as well.

```solidity
function initialize() public initializer {}
```

It's within this initialize function that we would include the logic that we would normally have within a constructor. If we wanted our BoxV1 protocol to be ownable, for example, we would import OwnableUpgradeable and Initializable and then define the above functions like so:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract BoxV1 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    uint256 internal number;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
    }

    function getNumber() external view returns (uint256) {
        return number;
    }

    function version() external pure returns (uint256) {
        return 1;
    }

    function _authorizeUpgrade(address newImplementation) internal override {}
}
```

> ❗ **NOTE**
> Recent updates to the OwnableUpgradeable library now require an argument to be passed to the \_\_Ownable_init function.

Common convention is to prepend initializer functions with a double-underscore `__`.

`initializer` is a modifier applied to an implementation contracts initialize function which ensures it can only be called once.

We can give BoxV2 the same treatment.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract BoxV2 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    uint256 internal number;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
    }

    function setNumber(uint256 _number) external {
        number = _number;
    }

    function getNumber() external view returns (uint256) {
        return number;
    }

    function version() external pure returns (uint256) {
        return 2;
    }

    function _authorizeUpgrade(address newImplementation) internal override {}
}
```

### Wrap Up

Whew we've learnt a lot about UUPS implementations in this lesson including:

- Proxied implementation contracts don't use constructors

Constructors, by their nature, initialize storage variables on a contract on deployment. Storage needs to be tracked on the proxy contract in an upgradeable protocol and for this reason constructors aren't used.

- Initializer functions are used instead of constructors

In lieu of constructors, the initialization design pattern is used whereby initializer functions are added to the implementation contract and called via the proxy contract post deployment.

Now that we have things built out, let's look at a deploy script in the next lesson. I'm excited to get testing!
