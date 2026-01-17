---
title: TSwap Manual Review - PoolFactory
---

---

### TSwap Manual Review - PoolFactory

We've got 2 contract to apply our manual review to here, `TSwapPool.sol` and `PoolFactory.sol`. Let's apply the `Tincho` method beginning with `PoolFactory`.

`PoolFactory`, we know serves as the protocol starting point. `PoolFactory` is deployed and it is then used to create `TSwapPools`.

<details>
<summary>PoolFactory.sol</summary>

```js
/**
 * /-\|/-\|/-\|/-\|/-\|/-\|/-\|/-\|/-\|/-\
 * |                                     |
 * \ _____    ____                       /
 * -|_   _|  / ___|_      ____ _ _ __    -
 * /  | |____\___ \ \ /\ / / _` | '_ \   \
 * |  | |_____|__) \ V  V / (_| | |_) |  |
 * \  |_|    |____/ \_/\_/ \__,_| .__/   /
 * -                            |_|      -
 * /                                     \
 * |                                     |
 * \-/|\-/|\-/|\-/|\-/|\-/|\-/|\-/|\-/|\-/
 */
// SPDX-License-Identifier: GNU General Public License v3.0
pragma solidity 0.8.20;

import { TSwapPool } from "./TSwapPool.sol";
import { IERC20 } from "forge-std/interfaces/IERC20.sol";

contract PoolFactory {
    error PoolFactory__PoolAlreadyExists(address tokenAddress);
    error PoolFactory__PoolDoesNotExist(address tokenAddress);

    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/
    mapping(address token => address pool) private s_pools;
    mapping(address pool => address token) private s_tokens;

    address private immutable i_wethToken;

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/
    event PoolCreated(address tokenAddress, address poolAddress);

    /*//////////////////////////////////////////////////////////////
                               FUNCTIONS
    //////////////////////////////////////////////////////////////*/
    constructor(address wethToken) {
        i_wethToken = wethToken;
    }

    /*//////////////////////////////////////////////////////////////
                           EXTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/
    function createPool(address tokenAddress) external returns (address) {
        if (s_pools[tokenAddress] != address(0)) {
            revert PoolFactory__PoolAlreadyExists(tokenAddress);
        }
        string memory liquidityTokenName = string.concat("T-Swap ", IERC20(tokenAddress).name());
        string memory liquidityTokenSymbol = string.concat("ts", IERC20(tokenAddress).name());
        TSwapPool tPool = new TSwapPool(tokenAddress, i_wethToken, liquidityTokenName, liquidityTokenSymbol);
        s_pools[tokenAddress] = address(tPool);
        s_tokens[address(tPool)] = tokenAddress;
        emit PoolCreated(tokenAddress, address(tPool));
        return address(tPool);
    }

    /*//////////////////////////////////////////////////////////////
                   EXTERNAL AND PUBLIC VIEW AND PURE
    //////////////////////////////////////////////////////////////*/
    function getPool(address tokenAddress) external view returns (address) {
        return s_pools[tokenAddress];
    }

    function getToken(address pool) external view returns (address) {
        return s_tokens[pool];
    }

    function getWethToken() external view returns (address) {
        return i_wethToken;
    }
}
```

</details>


### Imports and Errors

Starting from the top, imports look good. I'm not very familiar with the `forge` implementation of the IERC20 Interface, so I may look into that, but things here are fine.

The first thing the contract itself does is declare 2 custom errors. Let's look at what they're doing.

```js
error PoolFactory__PoolAlreadyExists(address tokenAddress);
error PoolFactory__PoolDoesNotExist(address tokenAddress);
```

Searching for our first error, `PoolFactory__PoolAlreadyExists` should yield that it's being used in a conditional within `createPool`. This makes total sense, no problems here.

If we search for the second error however ... `PoolFactory__PoolDoesNotExist` isn't actually used anywhere! Definitely an informational finding we should make note of.

```js
error PoolFactory__PoolAlreadyExists(address tokenAddress);
//@Audit-Informational: Error is not used, can be removed.
error PoolFactory__PoolDoesNotExist(address tokenAddress);
```

### State Variables and Events

Great, we got one already. Let's keep going. Next, in PoolFactory.sol, we have some state variable declarations. It looks as though we're creating two mappings - `poolToken -> Pool` and `Pool -> poolToken`. We can verify that these are adjusted in the `createPool` function and they seem good.

```js
mapping(address token => address pool) private s_pools;
mapping(address pool => address token) private s_tokens;

address private immutable i_wethToken;
```

`PoolFactory` is also declaring an immutable variable for `i_wethToken`, which makes sense since any ERC20 in the protocol is meant to be paired with `weth`. Ultimately our variables look good.

We've only got 1 event in this contract. If you want to report non-indexed parameters, you can. I'm going to stick to my guns and judge this as ok/preferred over the alternative.

```js
event PoolCreated(address tokenAddress, address poolAddress);
```

### Functions - createPool

We can finally dive into the main function of this contract, `createPool`.

The function opens with a conditional statement requiring that a pool mapped to the provided token address doesn't already exist. Great practice.

```js
function createPool(address tokenAddress) external returns (address) {
        if (s_pools[tokenAddress] != address(0)) {
            revert PoolFactory__PoolAlreadyExists(tokenAddress);
        }
        ...
}
```

The function is then declaring the name and symbol for the pool's liquidity token. It does this by appending `T-Swap ` to the provided token's name ie `T-Swap Wrapped Bitcoin`. This would be a good point that we could ask ourselves something like **_What if the name function reverts?_**

We spot an issue in the case of the liquidityTokenSymbol however.

```js
string memory liquidityTokenName = string.concat("T-Swap ", IERC20(tokenAddress).name());
string memory liquidityTokenSymbol = string.concat("ts", IERC20(tokenAddress).name());
```

This is _also_ using the provided token's name, which could result in a long or incompatible token symbol. We should definitely make note of this.

```js
//@Audit-Informational: should use .symbol() not .name().
string memory liquidityTokenSymbol = string.concat("ts", IERC20(tokenAddress).name());
```

Next createPool actually creates a pool, verify that the parameters being passed match what the function call is expecting and in the correct order.

```js
TSwapPool(tokenAddress, i_wethToken, liquidityTokenName, liquidityTokenSymbol);
```

Looks good to me. The function wraps up with our mappings being updated, an event being emitted and the pool being returned. These at things we looked at early. Looks great!

```js
  s_pools[tokenAddress] = address(tPool);
  s_tokens[address(tPool)] = tokenAddress;
  emit PoolCreated(tokenAddress, address(tPool));
  return address(tPool);
}
```

### External and View Functions

The remainder of `PoolFactory.sol` is comprised of getters/external view functions and these are very simple and good. No problems here whatsoever.

```js
function getPool(address tokenAddress) external view returns (address) {
        return s_pools[tokenAddress];
    }

function getToken(address pool) external view returns (address) {
    return s_tokens[pool];
}

function getWethToken() external view returns (address) {
    return i_wethToken;
}
```

### Wrap Up

Ok! We found a couple informational findings here but by and large this contract looks pretty good. We can move onto `TSwapPool.sol` next and check this one off as done.
