---
title: OracleUpgradeable.sol (Continued)
---

### OracleUpgradeable.sol (Continued)

Ok, we've delved pretty thoroughly into the importance of initialization, but we've got the rest of OracleUpgradeable.sol to review.

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


```js
function getPriceInWeth(address token) public view returns (uint256) {
    address swapPoolOfToken = IPoolFactory(s_poolFactory).getPool(token);
    return ITSwapPool(swapPoolOfToken).getPriceOfOnePoolTokenInWeth();
}
```

This is our next function and it comes with it some interesting considerations.

We've just reviewed the TSwap protocol, which we see is being leveraged as a oracle here, and we _know_ it has issues, but with respect to the scope of the Thunder Loan audit - it's out of scope.

**_What do we do?_**

As a general rule, I recommend at least investigating and gaining context for how TSwap (or any external call) touches the in-scope contract. What affects are there if the external protocol isn't behaving as expected? These are important questions that we, as security researchers, should bring to the attention of our client.

So as far as our `recon` step is concerned, this function raises a bunch of questions in me that we should consider in the future:

```js
// What if the price is manipulated?
// Can I manipulate the price?
// Reentrancy?
```

In addition to the above, when I see external calls I often wonder how tests are set up. If a protocol being audited relies on a live protocol in some way, it can often be preferred to use `forked tests` over `mocks`, to assure the most accurate behavior in testing.

I can tell you right now, `Thunder Loan` is using `mocks`. And spoiler - we're going to find a big bug here soon. I may even report this as an informational.

```js
// @ Audit-Informational: Forked tests are preferred when testing reliance on live code
```

Let's look at the remaining functions of `OracleUpgradeable.sol`

```js
function getPrice(address token) external view returns (uint256) {
    return getPriceInWeth(token);
}

function getPoolFactoryAddress() external view returns (address) {
    return s_poolFactory;
}
```

These are pretty basic getters. The `getPrice` function is a little redundant with our last function, but no big deal. These functions look just fine.

### Wrap Up

Awesome! We've finished our recon of `OracleUpgradeable.sol`! That's one more contract checked off our first pass list. We managed to find a low severity bug in our risks associated with initialization and we asked lots of good follow up questions to come back to for the `getPriceInWeth` function.

Let's mark this first pass done for now and move on to `AssetToken.sol` in the next lesson!

![oracle-upgradeable-continued1](/security-section-6/23-oracle-upgradeable-continued/oracle-upgradeable-continued1.png)
