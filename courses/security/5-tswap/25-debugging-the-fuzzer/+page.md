---
title: Debugging the Fuzzer
---

---

### Debugging the Fuzzer

You might notice this lesson isn't called "Successful Test, Hurray We're Done".

The first time we run our fuzz test, it's going to fail. Test suites rarely will work the way you expect, the first time you run them, so in this lesson we're going to walk through how to handle and debug some of the errors that I've planted in our process.

> **Note:** Add `seed = "0x1"` under [Fuzz] in our foundry.toml to assure some consistency in the runs we're debugging.

Begin by running our test, passing the verbose flag to acquire a trace in our output.

```bash
forge test --mt statefulFuzz_constantProductFormulaStaysTheSameY --vvvv
```

![debugging-the-fuzzer1](/security-section-5/25-debugging-the-fuzzer/debugging-the-fuzzer1.png)

Fail, as expected. This output tells us the exception occurring during a call of the `deposit` function, but we can scroll up in the trace output to gain more information.

![debugging-the-fuzzer2](/security-section-5/25-debugging-the-fuzzer/debugging-the-fuzzer2.png)

Ok, this gives us more detail to assess. It's clear that we're receiving a custom error when calling deposit, this is due to passing `0` as an argument:

```
TSwapPool___MustBeMoreThanZero()
```

Let's look at how we're handling this function in `Handler.t.sol`.

```js
function deposit(uint256 wethAmount) public {
    wethAmount = bound(wethAmount, 0, type(uint64).max);
    ...
}

function swapPoolTokenForWethBasedOnOutputWeth(uint256 outputWeth) public {
    outputWeth = bound(outputWeth, 0, type(uint64).max);
    ...
}
```

Well of course this is going to throw `TSwapPool___MustBeMoreThanZero()`, our binding includes 0 in both of these `Handler` functions! Fortunately TSwapPool has a function to help us.

```js
function getMinimumWethDepositAmount() external pure returns (uint256) {
    return MINIMUM_WETH_LIQUIDITY;
}
```

Let's substitute this function call for the lower bounds of our value to avoid this custom error from TSwap.

```js
function deposit(uint256 wethAmount) public {
    wethAmount = bound(wethAmount, 0, type(uint64).max);
    ...
}

function swapPoolTokenForWethBasedOnOutputWeth(uint256 outputWeth) public {
    outputWeth = bound(outputWeth, pool.getMinimumWethDepositAmount(), type(uint64).max);
    ...
}
```

Now we can try our test again.

![debugging-the-fuzzer3](/security-section-5/25-debugging-the-fuzzer/debugging-the-fuzzer3.png)

Ok, a new error! New errors mean progress. If we scroll up on this one, we can see that our assertion is actually acting strangely!

For some reason our actual changes for weth and poolToken (∆y and ∆x respectively) are returning 0. Let's look at the test function to determine why.

```js
function swapPoolTokenForWethBasedOnOutputWeth(uint256 outputWeth) public {
    outputWeth = bound(outputWeth, pool.getMinimumWethDepositAmount(), type(uint64).max);
    if (outputWeth >= weth.balanceOf(address(pool))) {
        return;
    }
    ...

        uint256 endingY = poolToken.balanceOf(address(this));
        uint256 endingY = weth.balanceOf(address(this));

        actualDeltaY = int256(endingY) - int256(startingY);
        actualDeltaX = int256(endingX) - int256(startingX);
}
```

This above is how we're calculating our `actualDeltaY` and `actualDeltaX` in our Handler's swap function. If we look more closely at `endingY`, `endingX`, `startingY` and `startingX`, we'll notice that we erroneously have these variables tracking the changes of balance in `address(this)`. We'll that's wrong! We need to track the balances of each token in our pool.

Adjust the assignments in our `Handler.t.sol` like so:

```js
startingY = int256(weth.balanceOf(address(pool)));
startingX = int256(poolToken.balanceOf(address(pool)));

uint256 endingY = poolToken.balanceOf(address(pool));
uint256 endingY = weth.balanceOf(address(pool));
```

Then run it again!

> **Note:** debugging our fuzz sequences is a truly iterative process. The errors you receive, and how many of them, may actually be different if you have different errors in your code. Use the steps and skills shown here to debug any error you receive the same way.

![debugging-the-fuzzer4](/security-section-5/25-debugging-the-fuzzer/debugging-the-fuzzer4.png)

Boom.

Don't be discouraged if you run into more errors, or different errors. This can be one of the hardest parts of this process.

Here's my fully tweaked `Handler` for reference:

<details>
<summary>Handler.t.sol</summary>

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

    address liquidityProvider = makeAddr("lp");
    address swapper = makeAddr("swapper");

    // Ghost Variables - variables that only exist in our Handler
    int256 public actualDeltaY;
    int256 public expectedDeltaY;

    int256 public actualDeltaX;
    int256 public expectedDeltaX;

    int256 public startingX;
    int256 public startingY;

    constructor(TSwapPool _pool) {
        pool = _pool;
        weth = ERC20Mock(_pool.getWeth());
        poolToken = ERC20Mock(_pool.getPoolToken());
    }

    function deposit(uint256 wethAmount) public {
        wethAmount = bound(wethAmount, pool.getMinimumWethDepositAmount(), weth.balanceOf(address(pool)));

        startingY = int256(poolToken.balanceOf(address(pool)));
        startingX = int256(weth.balanceOf(address(pool)));

        expectedDeltaX = int256(wethAmount);
        expectedDeltaY = int256(pool.getPoolTokensToDepositBasedOnWeth(wethAmount));

        vm.startPrank(liquidityProvider);
        weth.mint(liquidityProvider, wethAmount);
        poolToken.mint(liquidityProvider, uint256(expectedDeltaX));
        weth.approve(address(pool), type(uint256).max);
        poolToken.approve(address(pool), type(uint256).max);

        // Deposit
        pool.deposit(wethAmount, 0, uint256(expectedDeltaX), uint64(block.timestamp));
        vm.stopPrank();

        uint256 endingX = poolToken.balanceOf(address(pool));
        uint256 endingY = weth.balanceOf(address(pool));

        // sell tokens == x == poolTokens
        actualDeltaY = int256(endingX) - int256(startingY);
        actualDeltaX = int256(endingY) - int256(startingX);
    }

    function swapPoolTokenForWethBasedOnOutputWeth(uint256 outputWeth) public {
        if (weth.balanceOf(address(pool)) <= pool.getMinimumWethDepositAmount()) {
            return;
        }
        outputWeth = bound(outputWeth, pool.getMinimumWethDepositAmount(), weth.balanceOf(address(pool)));
        if (outputWeth >= weth.balanceOf(address(pool))) {
            return;
        }
        uint256 poolTokenAmount = pool.getInputAmountBasedOnOutput(
            outputWeth, poolToken.balanceOf(address(pool)), weth.balanceOf(address(pool))
        );

        startingY = int256(poolToken.balanceOf(address(pool)));
        startingX = int256(weth.balanceOf(address(pool)));

        expectedDeltaX = int256(-1) * int256(outputWeth);
        expectedDeltaY = int256(poolTokenAmount);

        if (poolToken.balanceOf(swapper) < poolTokenAmount) {
            poolToken.mint(swapper, poolTokenAmount - poolToken.balanceOf(swapper) + 1);
        }
        vm.startPrank(swapper);
        poolToken.approve(address(pool), type(uint256).max);
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        vm.stopPrank();

        uint256 endingY = poolToken.balanceOf(address(pool));
        uint256 endingX = weth.balanceOf(address(pool));

        actualDeltaY = int256(endingY) - int256(startingY);
        actualDeltaX = int256(endingX) - int256(startingX);
    }
}

```

<details>

We didn't find any bugs with this test ... let's keep looking.
