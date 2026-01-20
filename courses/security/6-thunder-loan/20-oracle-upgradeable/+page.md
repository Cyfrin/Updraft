---
title: OracleUpgradeable.sol
---

---

### OracleUpgradeable.sol

The first _real_ contract we're going to scope out is `OracleUpgradeable.sol` and it has a couple interesting properties to consider.

<details>
<summary>OracleUpgradeable.sol</summary>

```solidity
// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.20;

import { ITSwapPool } from "../interfaces/ITSwapPool.sol";
import { IPoolFactory } from "../interfaces/IPoolFactory.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract OracleUpgradeable is Initializable {
    address private s_poolFactory;

    function __Oracle_init(address poolFactoryAddress) internal onlyInitializing {
        __Oracle_init_unchained(poolFactoryAddress);
    }

    function __Oracle_init_unchained(address poolFactoryAddress) internal onlyInitializing {
        s_poolFactory = poolFactoryAddress;
    }

    function getPriceInWeth(address token) public view returns (uint256) {
        address swapPoolOfToken = IPoolFactory(s_poolFactory).getPool(token);
        return ITSwapPool(swapPoolOfToken).getPriceOfOnePoolTokenInWeth();
    }

    function getPrice(address token) external view returns (uint256) {
        return getPriceInWeth(token);
    }

    function getPoolFactoryAddress() external view returns (address) {
        return s_poolFactory;
    }
}

```

</details>


Starting from the top, we can verify that our 3 imports `ITSwapPool`, `IPoolFactory` and `Initializable` are being utilized, and they are.

```solidity
// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.20;

import { ITSwapPool } from "../interfaces/ITSwapPool.sol";
import { IPoolFactory } from "../interfaces/IPoolFactory.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract OracleUpgradeable is Initializable {...}
```

`Initializable` stands out to me however. This import pertains to the upgradeability of this protocol and how proxies are handled. It will be important to gain a deeper familiarity with `Initializable` before moving on.

### Initializable

`ctrl + left-click` (`cmd + left-click` on mac) on the `Initializable` import should bring you to this contract to consider.

There are a lot of comments and text in this contract. I encourage you to pause and read through much of it before continuing for additional context.

[**Initializable.sol**](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/utils/Initializable.sol)

What makes this contract so important regarding upgradeable protocols? Well, **upgradeable contracts can't have constructors**.

This is the case due to how storage is handled in a proxy pattern.

Storage -> Proxy

Logic -> Implementation

So if our constructor does something with storage, such as initializing a variable, it's not going to matter!
`Initializable.sol` assists in initializing proxies with storage.

It does these through `initializer` functions which can often be identified by the naming conventions `__init` and `__init_unchained`. We can see these function implemented within `OracleUpgradeable.sol`

```js
function __Oracle_init(address poolFactoryAddress) internal onlyInitializing {
    __Oracle_init_unchained(poolFactoryAddress);
}

function __Oracle_init_unchained(address poolFactoryAddress) internal onlyInitializing {
    s_poolFactory = poolFactoryAddress;
}
```

> **Protip:** For more information on the differences between **init and **init_unchained, check out this [**forum post**](https://forum.openzeppelin.com/t/difference-between-init-and-init-unchained/25255) on OpenZeppelin.

What are these functions in `OracleUpgradeable` doing? Let's dive into them a bit.

Experience tells me that this `OracleUpgradeable` contract is likely being inherited by `ThunderLoan.sol`. There should an initializer function which sets this up for the protocol. We can see their absolutely is and that's passing `tswapAddress` as a parameter.

```js
function initialize(address tswapAddress) external initializer {
    __Ownable_init(msg.sender);
    __UUPSUpgradeable_init();
    __Oracle_init(tswapAddress);
    s_feePrecision = 1e18;
    s_flashLoanFee = 3e15; // 0.3% ETH fee
}
```

I would likely call out this parameter name as an informational. Best practice would have it match the expected parameter name of the function being called `poolFactoryAddress`. This will assist in coherence and readability.

```js
// @Audit-Informational: Change parameter name to `poolFactoryAddress` for consistency with OracleUpgradeable.sol::__Oracle_init
function initialize(address tswapAddress) external initializer {...}
```

> **Note:** Both `__Oracle_init` and `__Oracle_init_unchained` implement the `onlyInitializing` modifier. This modifier assures that something can only be initialized a single time!

### Wrap Up

To summarize, our `__init` and `__init_unchained` functions serve as initializers to our upgradeable smart contract. These two functions together effectively replace the use of a constructor given the limitation of storage being managed by the proxy contract.

The use of initializers allows us to still set starting values for items in storage without impacting how storage on the implementation contract is maintained!
