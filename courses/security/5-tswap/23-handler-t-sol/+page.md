---
title: Handler.t.sol
---

---

### Handler.t.sol

This point in a good time to pause. If things aren't making perfect sense, that's ok. We're covering several advanced concepts here. Just keep going and follow along as you can. Remember that practice makes perfect.

The boilerplate of our handler is going to be very similar to what we saw in our previous examples. This will be our starting point.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Test, console2 } from "forge-std/Test.sol";
import { TSwapPool } from "../../src/TSwapPool.sol";

contract Handler is Test {
    TSwapPool pool;
    constructor(TSwapPool _pool) {
        pool = _pool;
    }
}
```

Let's remind ourselves of the invariant we're testing:

```
∆x = (β/(1-β)) * x
```

Having a skim through the TSwapPool.sol code there are a few functions that stand out as potentially important.

- deposit
- withdraw
- swapExactOutput
- swapExactInput

You may notice that `swapExactInput` doesn't have any documentation! This makes is incredibly difficult to gain any insight into what this function is meant to do without reading the code. Fortunately `swapExactOutput` has some NATSPEC, so we should start there.

```js
/*
 * @notice figures out how much you need to input based on how much
 * output you want to receive.
 *
 * Example: You say "I want 10 output WETH, and my input is DAI"
 * The function will figure out how much DAI you need to input to get 10 WETH
 * And then execute the swap
 * @param inputToken ERC20 token to pull from caller
 * @param outputToken ERC20 token to send to caller
 * @param outputAmount The exact amount of tokens to send to caller
 */
```

Effectively this function is meant to determine what input value is necessary in order to receive a specified output amount.

The parameters for this function are pretty explicit:

- **inputToken** - what the user wants to put in

- **outputToken** - what the user wants to take out

- **outputAmount** - how much the user wants to take out

- **deadline** - don't worry about this for the purposes of this course, we'll be using `block.timestamp`.

> **Protip:** The NATSPEC here is missing the `deadline` parameter. This informational finding might be worth pointing out in a private audit!

### Back to the Handler

Alright, with a little more context we have some idea of what functions will need to be tested. Remember that being able to write a fuzzing test suite for a protocol is already going to provide a tonne of value for them.

Let's start small with the `deposit` function.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Test, console2 } from "forge-std/Test.sol";
import { TSwapPool } from "../../src/TSwapPool.sol";
import { ERC20Mock } from "../mocks/ERC20Mock.sol";

contract Handler is Test {
    TSwapPool pool;
    ERC20Mock weth;
    ERC20Mock poolToken;

    constructor(TSwapPool _pool) {
        pool = _pool;
        weth = ERC20Mock(_pool.getWeth());
        poolToken = ERC20Mock(_pool.getPoolToken());
    }

    function deposit(uint256 wethAmount) public {
        wethAmount = bound(wethAmount, 0, type(uint64).max);
    }
}
```

All that we've done so far is import our `ERC20Mock` contract and initialize variables for `weth` and `poolToken`.

In our constructor we're using the `getWeth` and `getPoolToken` functions of `TSwapPool` to assure we're using the correct tokens ascribed to the pool our Handler is linked to.

Within the `deposit` function we're binding the amount of `weth` to deposit between `0` and `uint64.max`. This might be a little too restrictive at ~18.5 ETH, but we'll run with it.

> **Protip:** You can use `chisel` and the command `type(uint64).max` to confirm the value of this number, remember 18 decimal places!

Now, if we're meant to validate `∆x`, `∆x` needs to be defined. In the case of our TSwap example, wethAmount is _actually_ going to be our `∆y` based on our earlier assignments in `Invariant.t.sol`.

```js
int256 constant STARTING_X = 100e18 // starting ERC20 / poolToken
int256 constant STARTING_Y = 50e18 // starting WETH
```

With that in mind, let's define startingX and startingY as well as _expectedDeltaX_ and _expectedDeltaY_ values for these tokens in our test.

> **Note:** We're going to cheat a little bit here and I'm going to tell you there's a function in `TSwapPool.sol` which allows us calculate the amount of poolTokens required in a deposit based on weth requested - `getPoolTokensToDepositBasedOnWeth`.

A closer look at this function reveals that it's effectively returning the result of the pool's token ratio.

```js
function getPoolTokensToDepositBasedOnWeth(
        uint256 wethToDeposit
    ) public view returns (uint256) {
        uint256 poolTokenReserves = i_poolToken.balanceOf(address(this));
        uint256 wethReserves = i_wethToken.balanceOf(address(this));
        return (wethToDeposit * poolTokenReserves) / wethReserves;
    }
```

Here's what our `Handler` looks like now.

```js
contract Handler is Test {
    TSwapPool pool;
    ERC20Mock weth;
    ERC20Mock poolToken;

    // Ghost Variables - variables that only exist in our Handler
    int256 public expectedDeltaY;
    int256 public expectedDeltaX;
    int256 startingY;
    int256 startingX;
    int256 public actualDeltaX;
    int256 public actualDeltaY;

    constructor(TSwapPool _pool) {
        pool = _pool;
        weth = ERC20Mock(_pool.getWeth());
        poolToken = ERC20Mock(_pool.getPoolToken());
    }

    function deposit(uint256 wethAmount) public {
        wethAmount = bound(wethAmount, 0, type(uint64).max);
        startingY = int256(weth.balanceOf(address(this)));
        startingX = int256(poolToken.balanceOf(address(this)));
        expectedDeltaX = int256(wethAmount);
        expectedDeltaY = int256(pool.getPoolTokensToDepositBasedOnWeth(wethAmount));
    }
}
```

With our starting points configured we're ready to call deposit and track the change of our token values.

```js
function deposit(uint256 wethAmount) public {
    wethAmount = bound(wethAmount, 0, type(uint64).max);
    startingY = int256(weth.balanceOf(address(this)));
    startingX = int256(poolToken.balanceOf(address(this)));
    expectedDeltaX = int256(wethAmount);
    expectedDeltaY = int256(pool.getPoolTokensToDepositBasedOnWeth(wethAmount));

    // Pranking LP and minting tokens/approving the pool
    vm.startPrank(liquidityProvider);
    weth.mint(liquidityProvider, wethAmount);
    poolToken.mint(liquidityProvider, uint256(expectedDeltaX));
    weth.approve(address(pool), type(uint256).max);
    poolToken.approve(address(pool), type(uint256).max);

    // Deposit
    pool.deposit(wethAmount, 0, uint256(expectedDeltaX), uint64(block.timestamp));
    vm.stopPrank();
}
```

Now that `deposit` has been called, we can check what the ending balances are of our tokens!

```js
// Deposit
pool.deposit(wethAmount, 0, uint256(expectedDeltaX), uint64(block.timestamp));
vm.stopPrank();

// Check Actual Deltas
uint256 endingY = poolToken.balanceOf(address(this));
uint256 endingY = weth.balanceOf(address(this));

actualDeltaY = int256(endingY) - int256(startingY);
actualDeltaX = int256(endingX) - int256(startingX);
```

### Wrap Up

Whew, this lesson has been a lot already. Again, don't worry if it's not all clicking, follow along as best you can and I promise it'll make sense by the end.

Believe it or not, this has all mostly been set up. We need to deposit tokens before we're able to check TSwap's core invariant during its `swapExactInput` and `swapExactOutput` functions.

We've got great momentum. Let's tackle the swap function in the next lesson!
