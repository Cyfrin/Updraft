---
title: Stateful Fuzzing Where Method 1 (open) Fails
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/Rw3xyAHeB10?si=_Ea06oU64TEq83I2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Welcome back fellow learners! We are on this exciting journey together to lay the foundation of Smart Contract Security Testing. What have we learned thus far?

## Stateless Fuzzing vs Stateful Fuzzing

We discovered that stateless fuzzing was not effective in detecting bugs in functions which require more complexity, such as `changeValue` - a function which updates a contract's state.

```js
function changeValue(uint256 _value, uint256 _multiplier) public {
    value = _value * _multiplier;
}
```

In this case, we employed a mechanism known as stateful fuzzing. With this method, we can catch much more subtle and nuanced bugs by accounting for contract state changes during fuzzing.

However, we encountered a hiccup when we were dealing with an integer overflow issue. We had to set the `failOnRevert` to `false` for our fuzzing test to work! That's because `myValue` could be a huge number, larger than a `uint256` can hold, causing an overflow.

Despite these hurdles, we soldiered on and made it this far. Now, it's time to graduate to an even more complex scenario - fuzzing a vault contract!

## Breaking The Invariant With Stateful Fuzzing

So, let's start by attempting to break this invariant using stateful fuzzing.

Firstly, we'll set up the test contract and import our dependencies, including the token mocks that will be used.

Next, we'll create a token array and launch the tokens to be supported by our token vault. We will then set up the user who'll be interacting with the vault and provide them with a starting amount of tokens.

Finally, we compose the fuzzing test itself. We begin by pranking the user, effectively manipulating their available tokens. We then perform the withdrawal operation of both types of tokens from the vault. Eventually, we assert that the user's token balance has not changed after the deposit and withdrawal operations.

The critical learning here is that we should always be able to withdraw the same amount we've deposited - this assertion must not fail!

## All That Glitters Is Not Gold

Alas, it appears that we celebrate too soon. On running this test, it's clear that we've run into an issue - our deposit function fails!

When this happens, a good practice is to turn on the verbose logs ( -vvv flag) to see what's happening beneath the hood. We quickly detect the root cause - our fuzzer was making deposit attempts with unsupported tokens.

Too much randomness in fuzzing can be just as detrimental as not enough randomness. We also notice that we never made the approve call for the ERC20 tokens, which was necessary for a deposit operation. Our fuzz test was essentially doomed from the start!

## TL;DR

In this blog post, we discussed the progression from stateless to stateful fuzzing for smart contract testing. While stateless fuzzing is fantastic for catching some easy bugs, it falls short in detecting bugs in the case of more complex functions.

Stateful fuzzing overcomes these limitations, but it comes with its own set of challenges, like dealing with integer overflows. The takeaway here is the importance of finding the goldilocks zone of randomness while fuzzing - too little or too much can skew our test results!
