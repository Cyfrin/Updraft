---
title: Write up Weird ERC20s
---

---

### Weird ERC20s

One very important thing we've yet to discuss about TSwap is it's vulnerability to `Weird ERC20s`.

A Weird ERC20 is an ERC20 token which doesn't behave in a standardized way and may include unintended or unusual functionality.

There's a great repository of Weird ERC20 tokens available on GitHub [**here**](https://github.com/d-xo/weird-erc20). I encourage you to familiarize yourself with common examples!

We identified a `fee on transfer` issue within TSwapPool::\_swap that outlined a critical consideration - situations where extra tokens are sent will break the protocol invariant. Well, this can be the case with certain ERC20s (among other weird situations).

We saw an example of this when building our first stateful fuzz test suite where the YieldERC20 token was sending 10% of a transaction value as a fee every 10 transfers.

```js
function statefulFuzz_testInvariantBreakHandler() public {
    vm.startPrank(owner);
    handlerStatefulFuzzCatches.withdrawToken(mockUSDC);
    handlerStatefulFuzzCatches.withdrawToken(yieldERC20);
    vm.stopPrank();

    assert(mockUSDC.balanceOf(address(handlerStatefulFuzzCatches)) == 0);
    assert(yieldERC20.balanceOf(address(handlerStatefulFuzzCatches)) == 0);
    assert(mockUSDC.balanceOf(owner) == startingAmount);
    assert(yieldERC20.balanceOf(owner) == startingAmount);
}
```

`Weird ERC20s` and things like `fee on transfer` are unfortunately _very_ common in DeFi. In fact, Uniswap V1 when audited had a similar vulnerability wherein a certain token would allow re-entrancy. I encourage you to read about it [**here**](https://github.com/Consensys/Uniswap-audit-report-2018-12?tab=readme-ov-file#31-liquidity-pool-can-be-stolen-in-some-tokens-eg-erc-777-29).

Now, we're not going to go through a write-up for this TSwap Vulnerability together, but of course I encourage you to before moving on. We've created example tests and mock token contracts earlier in this course that you can use to help you.

Here's a title to get started with.

### [M-3] Rebase, fee-on-transfer, and ERC-777 tokens break protocol invariant

When you're done, I'll see you in the next lesson to create our PDF report!
