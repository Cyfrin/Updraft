---
title: Manual Review - ITSwapPool.sol
---

---

### ITSwapPool.sol

ITSwapPool.sol is up next in our climb towards more complex code bases to review in Thunder Loan.

```solidity
// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.20;

interface ITSwapPool {
    function getPriceOfOnePoolTokenInWeth() external view returns (uint256);
}

```

This looks like another simple interface with a TSwap contract. We can assure it's being executed correctly by comparing things like parameters required and return values types with the underlying function.

Have a peek at this function within TSwapPool quickly.

```js
function getPriceOfOnePoolTokenInWeth() external view returns (uint256) {
        return getOutputAmountBasedOnInput(
            1e18, i_poolToken.balanceOf(address(this)), i_wethToken.balanceOf(address(this))
        );
    }
```

We can see this takes no parameters and returns a uint256 as described by our interface. Things look great here.

One question we may have for the Thunder Loan team:

```js
// @Audit-Question: Why are we only using the price of a pool token in weth?
```

The limited nature of tokens being used may raise questions pertaining to the protocol's intent, we should always ask when unsure!

### Wrap Up

Wow, another quick one down, we're flying through these quick wins. Thanks Tincho Method!

::image{src='/security-section-6/16-itswappool/itswappool1.png' style='width: 100%; height: auto;'}
