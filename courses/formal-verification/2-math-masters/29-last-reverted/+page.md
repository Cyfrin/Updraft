---
title: lastReverted
---

---


### Understanding hellFunc Function Behavior

In this section, we will explore the use of the `hellFunc` function and how we can implement a simple invariant to ensure the function behaves as expected within our program.

#### Calling the hellFunc Function

Initially, you can invoke the `hellFunc` function by passing a numerical value, and expect a `uint256` response from it. This call is illustrated in the example:

```js
hellFunc(number);
```

Here, the function should return a `uint256` response which we can then check against our invariant.

#### Asserting an Invariant

If our invariant condition stipulates that the response must always be zero, we can use the assert statement to enforce this rule. The code snippet would look something like this:

```js
assert(response == 0);
```

This asserts that the response from `hellFunc` should always equal zero, forming a simple invariant for the function's expected behavior.

#### Handling Reversions

However, the primary invariant we are focusing on is ensuring that the `hellFunc` function does not revert under any circumstances. To test this, we use a modified function call:

```js
hellFunc!@withrevert(number);
```

Alongside this function call, we implement an assertion to check that the function does not cause a revert:

```js
assert(lastReverted == false);
```

Here, `lastReverted` acts as a keyword in Certora, a tool we are using. It updates to reflect whether the last executed Solidity function caused a revert or not.

#### Ensuring No Reverts

Given our invariant—that `hellFunc` must never revert—we structure our testing to confirm this behavior reliably. By monitoring the `lastReverted` keyword after invoking the function, we can assure that our condition is met.


Now, it's time for Certora to perform its analysis and transform our invariant checking into a rigorous mathematical verification.
