---
title: Handler.t.sol - Swapping
---

---

### Swapping

Alright! Let's remind ourselves of our core invariant in TSwap again.

```
∆x = (β/(1-β)) * x
```

Recall that our term `β` was set equal to `∆y/y` and we've already worked out `∆y`, this was our `wethAmount`, the output of our swap.

Now, we need to determine `∆x`. We could work the math out ourselves, but we'll cheat a little bit again and I'll mention that TSwapPool.sol has another useful function for us - `getInputAmountBaseOnOutput`. This function will ultimately return the poolToken amount that our user needs to input for the swap. This is our `∆y`! Let's take a look at `getInputAmountBaseOnOutput` and walk through how the math is derived for practice and a deeper understanding of the protocol.

### getInputAmountBaseOnOutput: The Math

```js
function getInputAmountBasedOnOutput(
    uint256 outputAmount,
    uint256 inputReserves,
    uint256 outputReserves
)
    public
    pure
    revertIfZero(outputAmount)
    revertIfZero(outputReserves)
    returns (uint256 inputAmount)
{
    return ((inputReserves * outputAmount) * 10000) / ((outputReserves - outputAmount) * 997);
}
```

First, let's begin with the formula our invariant was derived from `x * y = (x + ∆x) * (y - ∆y)`, we can substitute `∆y` for outputAmount since this will reflect by how much our poolToken is changing:

::image{src='/security-section-5/23-handler-swap-function/handler-swap-function1.png' style='width: 100%; height: auto;'}

From the equation `x*outputAmount  = ∆x(y - outputAmount)` we just need to substitute a few known variables.

- `x` is going to be `inputReserves`, reflecting total poolTokens.
- `∆x` is going to be the `inputAmount` as discussed earlier, the input of poolTokens to get the desired output in `weth`.
- `y` will be our `outputReserves`, just as x was a reflection of total poolTokens, this will be a reflection of total `weth` tokens.

::image{src='/security-section-5/23-handler-swap-function/handler-swap-function2.png' style='width: 100%; height: auto;'}

Our resulting formula is remarkably similar to what's returned by the `getInputAmountBasedOnOutput`function (10000 and 997 are related to fees, we can ignore them for now):

```
Our formula:

inputAmount = (inputReserves * outputAmount) / (outputReserves - outputAmount)

getInputAmountBasedOnOutput:

return ((inputReserves * outputAmount) * 10000) / ((outputReserves - outputAmount) * 997);
```

And with that we managed to use math to calculate our expected input (poolTokens) based on a desired output (`weth`).

With this contextual understanding, let's head back to `Handler.t.sol` and get started on our function to test swaps that will be leveraging `getInputAmountBasedOnOutput`.

### Swapping In Our Handler

Ok, we'll begin by setting up a function to test swapping which intakes a desired outputWeth. We'll be binding this input to a reasonable amount and assuring that the outputWeth doesn't drain the entire pool. The setup should look something like this:

```js
function swapPoolTokenForWethBasedOnOutputWeth(uint256 outputWeth) public {
    outputWeth = bound(outputWeth, 0, type(uint64).max);
    if (outputWeth >= weth.balanceOf(address(pool))) {
        return;
    }
}
```

We'll next use our `outputWeth` parameter to calculate our input amount using `getInputAmountBasedOnOutput`. `getInputAmountBasedOnOutput` takes 3 parameters, the `outputWeth` amount and the reserves of `weth` and `poolToken`.

```js
function swapPoolTokenForWethBasedOnOutputWeth(uint256 outputWeth) public {
    outputWeth = bound(outputWeth, 0, type(uint64).max);
    if (outputWeth >= weth.balanceOf(address(pool))) {
        return;
    }
    uint256 poolTokenAmount = pool.getInputAmountBasedOnOutput(outputWeth, poolToken.balanceOf(address(pool)), weth.balanceOf(address(pool)));

    if (poolTokenAmount >= type(uint64).max){
        return;
    }
}
```

We of course return if the poolTokenAmount is too high.

Now that we have `poolTokenAmount` which represents our `∆x` we can update our `startingX` and `startingY` values as well as our expected change based on the tests provided `outputWeth` param. Note that `expectedDeltaY` is multiplied by `-1` since the amount should represent _losing_ `weth`.

```js
function swapPoolTokenForWethBasedOnOutputWeth(uint256 outputWeth) public {
    outputWeth = bound(outputWeth, 0, type(uint64).max);
    if (outputWeth >= weth.balanceOf(address(pool))) {
        return;
    }
    uint256 poolTokenAmount = pool.getInputAmountBasedOnOutput(outputWeth, poolToken.balanceOf(address(pool)), weth.balanceOf(address(pool)));

    if (poolTokenAmount >= type(uint64).max){
        return;
    }

    startingY = int256(weth.balanceOf(address(this)));
    startingX = int256(poolToken.balanceOf(address(this)));
    expectedDeltaX = int256(-1) * int256(outputWeth);
    expectedDeltaY = int256(pool.getPoolTokensToDepositBasedOnWeth(poolTokenAmount));
}
```

We're almost read to swap! This is really exciting. We'll need to create a new address to do our swapping and mint them the appropriate number of tokens for their test swap. Our test is going to make sure the swapper has the requires number of poolTokens by minting them any time the swapper is short.

```js
if (poolToken.balanceOf(swapper) < poolTokenAmount) {
  poolToken.mint(swapper, poolTokenAmount - poolToken.balanceOf(swapper) + 1);
}
```

And finally the swap!

```js
vm.startPrank(swapper);
poolToken.approve(address(pool), type(uint256).max);
pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
vm.stopPrank();
```

Now that the swap of tokens has presumably been performed, here's where we need to calculate our ending amounts and the `actualDeltaX` and `actualDeltaY`. We can grab this right from our deposit function.

```js
uint256 endingY = poolToken.balanceOf(address(this));
uint256 endingY = weth.balanceOf(address(this));

actualDeltaY = int256(endingY) - int256(startingY);
actualDeltaX = int256(endingX) - int256(startingX);
```

### Wrap Up

Alright! Here's our completed `Handler` for reference:

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
        wethAmount = bound(wethAmount, 0, weth.balanceOf(address(pool)));

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
        outputWeth = bound(outputWeth, pool.getMinimumWethDepositAmount(), type(uint64).max);
        if (outputWeth >= weth.balanceOf(address(pool))) {
            return;
        }
        uint256 poolTokenAmount = pool.getInputAmountBasedOnOutput(
            outputWeth, poolToken.balanceOf(address(pool)), type(uint64).max);

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

</details>

The math and working out these invariants **_can_** be quite difficult, but it's important to keep in mind what we're trying to do.

This function must hold:
`∆x = (β/(1-β)) * x`

We used one of the functions in `TSwapPool` to determine our expected `∆x`, but we performed our due diligence and verified mathematically that `getInputAmountBasedOnOutput` returned what we wanted.

Our `Handler` has been written such that it will calculate both our expected and actual changes, or deltas of our token pool balances.

Our next step will be comparing our expected and actual values in an assertion. First we've got a few small tweaks to make in the next lesson before running our test.

Let's go!
