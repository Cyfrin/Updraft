---
title: Invariant Break Write up and PoC
---

---

### Invariant Break Write-up

This is the big one! Don't worry we _will_ go through the `proof of code` on this one together, we've already written most of the logic for this one.

We should be able to even re-run our test to remind ourselves of the issue:

```bash
forge test --mt statefulFuzz_constantProductFormulaStaysTheSameX
```

![invariant-break-write-up-and-poc1](/security-section-5/45-invariant-break-write-up-and-poc/invariant-break-write-up-and-poc1.png)

There it is. Let's get the `proof of code` out of the way first!

It's important to note when fuzz testing that we shouldn't just provide a sequence output or the fuzz test as a `proof of code/concept`. These can be difficult to understand and set up. We should be using the output of our fuzz tests to write our own PoC - often a unit test specifically stepping through a problematic sequence of executions.

I'll be modifying the `testDepositSwap` unit test provided by the TSwap protocol within `TSwapPool.T.sol`.

```js
function testDepositSwap() public {
    vm.startPrank(liquidityProvider);
    weth.approve(address(pool), 100e18);
    poolToken.approve(address(pool), 100e18);
    pool.deposit(100e18, 100e18, 100e18, uint64(block.timestamp));
    vm.stopPrank();

    vm.startPrank(user);
    poolToken.approve(address(pool), 10e18);
    uint256 expected = 9e18;

    pool.swapExactInput(poolToken, 10e18, weth, expected, uint64(block.timestamp));
    assert(weth.balanceOf(user) >= expected);
}
```

We know that the `fee on transfer` issue arises after 10 swaps, so our goal will be to recreate our fuzz sequence, replicating 10 swaps and resulting in our error.

Here's the underlying \_swap function for reference:

<details>
<summary>TSwapPool.sol::_swap</summary>

```js
function _swap(IERC20 inputToken, uint256 inputAmount, IERC20 outputToken, uint256 outputAmount) private {
    if (_isUnknown(inputToken) || _isUnknown(outputToken) || inputToken == outputToken) {
        revert TSwapPool__InvalidToken();
    }

    // @Audit-High - Breaks protocol invariant
    swap_count++;
    if (swap_count >= SWAP_COUNT_MAX) {
        swap_count = 0;
        outputToken.safeTransfer(msg.sender, 1_000_000_000_000_000_000);
    }
    emit Swap(msg.sender, inputToken, inputAmount, outputToken, outputAmount);

    inputToken.safeTransferFrom(msg.sender, address(this), inputAmount);
    outputToken.safeTransfer(msg.sender, outputAmount);
}
```

</details>


Alright, we can begin by giving the test a unique name. It looks like the first half of this function is handling deposits to add liquidity to the pool, we can keep that in.

```js
function testInvariantBroken() public {
    vm.startPrank(liquidityProvider);
    weth.approve(address(pool), 100e18);
    poolToken.approve(address(pool), 100e18);
    pool.deposit(100e18, 100e18, 100e18, uint64(block.timestamp));
    vm.stopPrank();
}
```

In the second half of this test we can now replicate what our handler was doing. We need to define starting values and expected changes for our token pools.

```js
function testInvariantBroken() public {
    vm.startPrank(liquidityProvider);
    weth.approve(address(pool), 100e18);
    poolToken.approve(address(pool), 100e18);
    pool.deposit(100e18, 100e18, 100e18, uint64(block.timestamp));
    vm.stopPrank();

    uint256 outputWeth = 1e17;
    int256 startingX = int256(weth.balanceOf(address(pool)));
    int256 expectedDeltaX = int256(outputWeth) * -1;
}
```

Our handler has an example we can now implement of a single swap being executed. Let's move that into our new unit test. Additionally, we can carry over our calculations for `endingX` and `actualDeltaX` as well as add our assert statement.

> **Note:** `TSwapPool.t.sol` uses `user` instead of `swapper` as we have in our handler.

```js
function testInvariantBroken() public {
    vm.startPrank(liquidityProvider);
    weth.approve(address(pool), 100e18);
    poolToken.approve(address(pool), 100e18);
    pool.deposit(100e18, 100e18, 100e18, uint64(block.timestamp));
    vm.stopPrank();

    uint256 outputWeth = 1e17;
    int256 startingX = int256(weth.balanceOf(address(pool)));
    int256 expectedDeltaX = int256(outputWeth) * -1;

    vm.startPrank(user);
    poolToken.approve(address(pool), type(uint256).max);
    pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
    vm.stopPrank();

    uint256 endingX = weth.balanceOf(address(pool));
    actualDeltaX = int256(endingX) - int256(startingX);

    assertEq(actualDeltaX, expectedDeltaX);
}
```

Now, if we run this test, performing a single swap, we would expect this to pass. Try it now.

```bash
forge test --mt testInvariantBroken
```

![invariant-break-write-up-and-poc2](/security-section-5/45-invariant-break-write-up-and-poc/invariant-break-write-up-and-poc2.png)

Of course this would pass, we need 10 swaps in order for our invariant to break. Let's implement that logic next.

All we really need to do is make sure our user has enough `poolToken` for the swaps and perform a bunch of them in a row. We can adjust the assignments for our startingX and expectedDeltaX variables to just before the final swap.

```js
function testInvariantBroken() public {
    vm.startPrank(liquidityProvider);
    weth.approve(address(pool), 100e18);
    poolToken.approve(address(pool), 100e18);
    pool.deposit(100e18, 100e18, 100e18, uint64(block.timestamp));
    vm.stopPrank();

    uint256 outputWeth = 1e17;

    vm.startPrank(user);
    poolToken.approve(address(pool), type(uint256).max);
    poolToken.mint(user, 100e18);
    pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
    pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
    pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
    pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
    pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
    pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
    pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
    pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
    pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));

    int256 startingX = int256(weth.balanceOf(address(pool)));
    int256 expectedDeltaX = int256(outputWeth) * -1;

    pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
    vm.stopPrank();

    int256 endingX = int256(weth.balanceOf(address(pool)));
    int256 actualDeltaX = int256(endingX) - int256(startingX);

    assertEq(actualDeltaX, expectedDeltaX);
}
```

If we run this unit test now...

```bash
forge test --mt testInvariantBroken -vvvv
```

![invariant-break-write-up-and-poc3](/security-section-5/45-invariant-break-write-up-and-poc/invariant-break-write-up-and-poc3.png)

Boom! We have our PoC which can be pasted into our report, which I've written below. Challenge yourself to write the other portions of this write-up and then compare to my included example:

<details>
<summary>[H-4] In TSwapPool::_swap the extra tokens given to users after every swapCount breaks the protocol invariant of x * y = k</summary>

### [H-4] In `TSwapPool::_swap` the extra tokens given to users after every `swapCount` breaks the protocol invariant of `x * y = k`

**Description:** The protocol follows a strict invariant of `x * y = k`. Where:

- `x`: The balance of the pool token
- `y`: The balance of WETH
- `k`: The constant product of the two balances

This means, that whenever the balances change in the protocol, the ratio between the two amounts should remain constant, hence the `k`. However, this is broken due to the extra incentive in the `_swap` function. Meaning that over time the protocol funds will be drained.

The follow block of code is responsible for the issue.

```javascript
swap_count++;
if (swap_count >= SWAP_COUNT_MAX) {
  swap_count = 0;
  outputToken.safeTransfer(msg.sender, 1_000_000_000_000_000_000);
}
```

**Impact:** A user could maliciously drain the protocol of funds by doing a lot of swaps and collecting the extra incentive given out by the protocol.

Most simply put, the protocol's core invariant is broken.

**Proof of Concept:**

1. A user swaps 10 times, and collects the extra incentive of `1_000_000_000_000_000_000` tokens
2. That user continues to swap until all the protocol funds are drained

<details>
<summary>Proof Of Code</summary>

Place the following into `TSwapPool.t.sol`.

```javascript

    function testInvariantBroken() public {
        vm.startPrank(liquidityProvider);
        weth.approve(address(pool), 100e18);
        poolToken.approve(address(pool), 100e18);
        pool.deposit(100e18, 100e18, 100e18, uint64(block.timestamp));
        vm.stopPrank();

        uint256 outputWeth = 1e17;

        vm.startPrank(user);
        poolToken.approve(address(pool), type(uint256).max);
        poolToken.mint(user, 100e18);
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));

        int256 startingY = int256(weth.balanceOf(address(pool)));
        int256 expectedDeltaY = int256(-1) * int256(outputWeth);

        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        vm.stopPrank();

        uint256 endingY = weth.balanceOf(address(pool));
        int256 actualDeltaY = int256(endingY) - int256(startingY);
        assertEq(actualDeltaY, expectedDeltaY);
    }
```

</details>

**Recommended Mitigation:** Remove the extra incentive mechanism. If you want to keep this in, we should account for the change in the x \* y = k protocol invariant. Or, we should set aside tokens in the same way we do with fees.

```diff
-        swap_count++;
-        // Fee-on-transfer
-        if (swap_count >= SWAP_COUNT_MAX) {
-            swap_count = 0;
-            outputToken.safeTransfer(msg.sender, 1_000_000_000_000_000_000);
-        }
```

</details>


### Wrap Up

We did it! Great work, we're almost done. Let's finish our report up with our final write-ups in the next lesson!
