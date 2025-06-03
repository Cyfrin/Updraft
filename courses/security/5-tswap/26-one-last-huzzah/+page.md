---
title: One Last Huzzah
---

---

### One Last Huzzah

Alright, we can't let the test passing deceive us. If you recall from a couple lessons ago our `statefulFuzz_constantProductFormulaStaysTheSameY` test is only checking one side of our pool, the change in poolToken amounts.

```js
function statefulFuzz_constantProductFormulaStaysTheSameY() public {
    assertEq(handler.actualDeltaY(), handler.expectedDeltaY());
}
```

Let's write another function to test our `weth` swaps as well, it's going to look _basically_ the same, just swap out our `actualDeltaY`s for `actualDeltaX`s

```js
function statefulFuzz_constantProductFormulaStaysTheSameX() public {
    assertEq(handler.actualDeltaX(), handler.expectedDeltaX());
}
```

Run the test and let's see what we get.

```bash
forge test --mt statefulFuzz_constantProductFormulaStaysTheSameX -vvvv
```

![one-last-huzzah1](/security-section-5/26-one-last-huzzah/one-last-huzzah1.png)

It errors! We can see that our expectedDeltaX and our actualDeltaX are wildly different. _What could possibly be going on here?_

> **Protip:** Rather than scrolling through all the function calls in our test's trace, often the steps that lead to our issue can be found in the most recent function execution near the bottom.

![one-last-huzzah2](/security-section-5/26-one-last-huzzah/one-last-huzzah2.png)

I've highlighted the most recent execution in the image above. We notice immediately that the function being called is `swapPoolTokenForWethBasedOnOutputWeth`. Things seems fairly unremarkable until we reach the actual swap of tokens when `swapExactOutput` is called. We would expect this function to execute two transfers, one from the `swapper` to `TSwapPool` and another from `TSwapPool` to the `swapper`.

For some reason our function is calling transfer _three times_.

This is the point where we would need to step into the code base and understand what exactly is being done within `swapExactOutput`. For some reason we're getting transfers called when we don't expect them. Let's look at that function within TSwapPool.sol.

```js
function swapExactOutput(
        IERC20 inputToken,
        IERC20 outputToken,
        uint256 outputAmount,
        uint64 deadline
    )
        public
        revertIfZero(outputAmount)
        revertIfDeadlinePassed(deadline)
        returns (uint256 inputAmount)
    {
    uint256 inputReserves = inputToken.balanceOf(address(this));
    uint256 outputReserves = outputToken.balanceOf(address(this));

    inputAmount = getInputAmountBasedOnOutput(outputAmount, inputReserves, outputReserves);

    _swap(inputToken, inputAmount, outputToken, outputAmount);
}
```

It looks like it's calling an internal `_swap` function, let's go there.

```js
function _swap(IERC20 inputToken, uint256 inputAmount, IERC20 outputToken, uint256 outputAmount) private {
    if (_isUnknown(inputToken) || _isUnknown(outputToken) || inputToken == outputToken) {
        revert TSwapPool__InvalidToken();
    }

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

BINGO! TSwap is transferring extra tokens! This is similar to our `fee on transfer` issue seen earlier and in fact, `fee on transfer` tokens would break this protocol as well.

```js
/*
 * @dev Every 10 swaps, we give the caller an extra token as an extra incentive to keep trading on T-Swap.
 */
```

This is breaking our invariant!

### Wrap Up

This was a lot of work to find this bug, there's no denying that, but fuzz test suites are so incredibly powerful, mastering them is worth putting the time in for given the advantages they bring to this process when a code base is very complex, such as automation.

As I've mentioned a few times, it's _ok_ if you don't get this immediately. These are advanced concepts. I encourage you to become comfortable at least in so far as the examples of fuzzing provided in [**sc-exploits-minimized**](https://github.com/Cyfrin/sc-exploits-minimized/tree/main/src/invariant-break)

We've learnt a tonne so far about `invariants` and `Weird ERC20s` and it's easy to see how important checking for these tokens can be. Hopefully this fuzzing exercise has showing you the power that comes with properly understanding a protocol's core `invariants` and trying to break them through this methodology.

There's a great article on [**Nascent.xyz**](https://www.nascent.xyz/idea/youre-writing-require-statements-wrong) I encourage you to read. It covers the concept of having an invariant baked into the protocol design directly (sometimes called `FREI-PI`) and is actually something later versions of Uniswap actually do.
