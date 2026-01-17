---
title: Stateless Fuzzing, Stateful Fuzzing And Invariants/Properties
---

_Follow along the video_

---

## Testing the Unknown

Often, hacks result from scenarios you didn't anticipate or consider for testing. But what if you could write a test that checks for every possible scenario, not just one? Welcome to the world of **Fuzz testing**.

## What Is Fuzz Testing?

Also known as _fuzzing_, this is all about supplying random data to your system in an attempt to break it. Imagine your code is an indestructible balloon. Fuzzing involves you doing random things (like poking, squeezing, or even kicking) to the balloon with the sole intention of breaking it.

This makes it a useful technique for unearthing unexpected application failures. This lesson aims to walk you through the concept and practical application of fuzz testing.

### The Fundamental Principle: Testing Invariants

Each system, from a function to an entire program, has an integral property, often referred to as the _invariant_. This property must always hold true. For instance, you could have a function called `doStuff` that should always return zero, regardless of the value of the input. In such a case, returning zero would be the invariant of that function.

Let's dark dive deeper into what such a function could look like:

```js
function doStuff(uint256 data) public {
    if (data == 2){
        shouldAlwaysBeZero = 1;
    }
    if(hiddenValue == 7) {
        shouldAlwaysBeZero = 1;
    }
    hiddenValue = data;
}
```

A unit test for this function would look something like this:

```js
function testIsAlwaysGetZero() public {
    uint256 data = 0;
    exampleContract.doStuff(data);
    assert(exampleContract.shouldAlwaysBeZero() == 0);
}
```

The above test is going to pass because in that specific situation (where `data == 0`), our invariant isn't broken.

From the function above, you can expect that `should_always_be_zero` is always zero, regardless of the `data` value. But wait, what happens if our input is `2`? We get `should_always_be_zero` as `1`. That violates our invariant!

Of course, this is a pretty straightforward example. But what if we have a function that looks a bit more complicated? Writing a test case for every scenario could be tedious or impossible. We need to adopt a more programmatic approach to test these cases en masse.

## Introducing Fuzz Tests and Invariant Tests

There are two popular methodologies when dealing with edge cases: using _fuzz tests/invariant tests_, or _symbolic execution_ (which we'll save for another day).

> "Fuzz testing and Invariant testing are great tools to assess the robustness of your code."

Let's consider an example of a fuzz test in Foundry. Here, we set our data right in the test parameter, allowing Foundry to automate the process of providing random input data during tests.

```js
function testIsAlwaysGetZeroFuzz(uint256 data) public {
    exampleContract.doStuff(data);
    assert(exampleContract.shouldAlwaysBeZero() == 0);
}
```

Foundry will automatically randomize data and use numerous examples to run through the test script. This test will be supplied random data from 0 to uint256.max(), as many times as you've configured runs.

> Reminder: You can configure the number of runs in your foundry.toml under the [fuzz] variable

Notably, this pseudo-random mechanism is not exhaustive. It won't provide a scenario for every single possible data input. That's why further understanding of how the Fuzzer generates random data is crucial.

## Stateless Fuzzing versus Stateful Fuzzing

Fuzzing also comes in flavours, the above being an example of `stateless fuzzing`. Another that is valuable to understand is `stateful fuzzing`. `Stateful fuzzing`, instead of resetting the contract state for each new run, will use the ending state of your previous run as the starting state of your next.

This is important for situations like our `doStuff` function

![block fee](/security-section-1/3-fuzz-test/fuzz2.png)

A stateful fuzz test would instead utilize the same contract we just triggered and call another function on it, creating an interlocking sequence of functions throughout a single run. Achieving this in Foundry requires using the `invariant` keyword and a bit of setup:

First, we need to import `StdInvariant` from `forge-std` and inherit it in our test contract.

```js
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0

import {StdInvariant} from "forge-std/StdInvariant.sol";

contract MyContractTest is StdInvariant, Test {...}
```

Then, in the setup of our test contract, we need to tell Foundry, which contract we'll be calling random functions on.

```js
function setUp() public {
    exampleContract = new MyContract();
    targetContract(address(exampleContract));
}
```

Now our `stateful fuzz` test is going to look something like this:

```js
function invariant_testAlwaysReturnsZero() public {
    assert(exampleContract.shouldAlwaysBeZero() == 0);
}
```

With the above test, Foundry is going to call random functions on the `targetContract` (in our case `doStuff` repeatedly, but were there other functions, they would be called in a random order) and pass those functions random data.

## In Summary

Fuzz testing involves mainly understanding your system's invariants and writing tests that can execute numerous scenarios. This is either achieved through `stateless fuzzing`, which provides random data alone with each run independent of the last, or `stateful fuzzing`, allowing both random data and random function calls subsequently on the same contract. This is the new standard for web3 security.

Going forward, aim to fully understand the invariants in systems you're working on, and write fuzz tests to ensure they are not broken

> "Fuzz testing is a technique that some of the top protocols are yet to adopt, yet it can aid in discovering high severity vulnerabilities in smart contracts." - Alex Rohn, co-founder at Cyfrin.

Next lesson we're going to talk about common Ethereum Improvement Proposals (EIPs)!
