---
title: Final Invariant & Tweaks
---

---

### Final Invariant & Tweaks

A reminder of where Invariant.t.sol sits currently:

<details>
<summary>Invariant.t.sol</summary>

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Test } from "forge-std/Test.sol";
import { StdInvariant } from "forge-std/StdInvariant.sol";
import { ERC20Mock } from "test/mocks/ERC20Mock.sol";
import { PoolFactory } from "../../src/PoolFactory.sol";
import { TSwapPool } from "../../src/TSwapPool.sol";

contract Invariant is StdInvariant, Test {
    ERC20Mock poolToken;
    ERC20Mock weth;

    PoolFactory factory;
    TSwapPool pool; // poolToken, weth
    int256 public constant STARTING_X = 100e18;
    int256 public constant STARTING_Y = 50e18;

    function setUp() public {
        poolToken = new ERC20Mock();
        weth = new ERC20Mock();
        factory = new PoolFactory(address(weth));
        pool = TSwapPool(factory.createPool(address(poolToken)));

        poolToken.mint(address(this), uint256(STARTING_X));
        weth.mint(address(this), uint256(STARTING_Y));

        poolToken.approve(address(pool), type(uint256).max);
        weth.approve(address(pool), type(uint256).max);

        // Deposit Into Pool
        pool.deposit(uint256(STARTING_Y), uint256(STARTING_Y), uint256(STARTING_X), uint64(block.timestamp));
    }

}
```

</details>

Now that we have everything set up in our `Handler` we can come back to our `Invariant.t.sol`. Our actual test at this point is going to be surprisingly basic because of all the set up we've done!

```js
function statefulFuzz_constantProductFormulaStaysTheSameY() public {
    assertEq(handler.actualDeltaY(), handler.expectedDeltaY());
}
```

That's literally it. We call `assertEq` and compare our actuals and expecteds for changes in `poolToken` amounts, we'll do one token at a time starting with poolToken.

We just need to set up our `Handler` as our target contract now. We'll also set up target function selectors, just like we saw previously.

```js
...
import {Handler} from "./Handler.t.sol";

contract Invariant is StdInvariant, Test {
    ...
    Handler handler;
    ...
    function setUp(){
        ...
        handler = new Handler(pool);
        bytes4[] memory selectors = new bytes4[](2);
        selectors[0] = handler.deposit.selector;
        selectors[1] = handler.swapPoolTokenForWethBasedOnOutputWeth.selector;
        targetSelector(FuzzSelector({ addr: address(handler), selectors: selectors }));
        targetContract(address(handler));
    }
}
```

### Wrap Up

Here's Invariant.t.sol all together before we finally run our test, in the next lesson.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Test } from "forge-std/Test.sol";
import { StdInvariant } from "forge-std/StdInvariant.sol";
import { ERC20Mock } from "test/mocks/ERC20Mock.sol";
import { PoolFactory } from "../../src/PoolFactory.sol";
import { TSwapPool } from "../../src/TSwapPool.sol";
import { Handler } from "./Handler.t.sol";

contract Invariant is StdInvariant, Test {
    ERC20Mock poolToken;
    ERC20Mock weth;

    PoolFactory factory;
    TSwapPool pool; // poolToken, weth
    int256 public constant STARTING_X = 100e18;
    int256 public constant STARTING_Y = 50e18;

    Handler handler;

    function setUp() public {
        poolToken = new ERC20Mock();
        weth = new ERC20Mock();
        factory = new PoolFactory(address(weth));
        pool = TSwapPool(factory.createPool(address(poolToken)));

        poolToken.mint(address(this), uint256(STARTING_X));
        weth.mint(address(this), uint256(STARTING_Y));

        poolToken.approve(address(pool), type(uint256).max);
        weth.approve(address(pool), type(uint256).max);

        // Deposit Into Pool
        pool.deposit(uint256(STARTING_Y), uint256(STARTING_Y), uint256(STARTING_X), uint64(block.timestamp));

        handler = new Handler(pool);
        bytes4[] memory selectors = new bytes4[](2);
        selectors[0] = handler.deposit.selector;
        selectors[1] = handler.swapPoolTokenForWethBasedOnOutputWeth.selector;
        targetSelector(FuzzSelector({ addr: address(handler), selectors: selectors }));
        targetContract(address(handler));
    }

    function statefulFuzz_constantProductFormulaStaysTheSameY() public {
        assertEq(handler.actualDeltaY(), handler.expectedDeltaY());
    }
}

```
