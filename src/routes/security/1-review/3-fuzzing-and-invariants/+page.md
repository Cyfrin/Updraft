---
title: Stateless Fuzzing, Stateful Fuzzing And Invariants/Properties
---

_Follow along the video_

---

You might be looking at your code, wondering, "Is it time for my code to be deployed?" Only to realize you're prone to flash loan attacks. In such moments, don't panic, _adjust_. This might involve returning to the drawing board to rethink and tweak your contract. Often, hacks result from scenarios you didn't anticipate or consider for testing. But what if you could write a test that checks for every possible scenario, not just one? Welcome to the world of **Fuzz testing**.

## What Is Fuzz Testing?

Also known as _fuzzing_, this is all about supplying random data to your system in an attempt to break it. Imagine your code is an indestructible balloon. Fuzzing involves you doing random things (like poking, squeezing, or even kicking) to the balloon with the sole intention of breaking it.

This makes it a useful technique for unearthing unexpected application failures. This blog aims to walk you through the concept and practical application of fuzz testing.

### The Fundamental Principle: Testing Invariants

Each system, from a function to an entire program, has an integral property, often referred to as the _invariant_. This property must always hold true. For instance, you could have a function called `doStuff` that should always return zero, regardless of the value of the input. In such a case, returning zero would be the invariant of that function.

Let's dark dive deeper into what such a function could look like. Here's an example of a unit test:

```js
function doStuff(uint256 data) public {
    if (data == 2){
        shouldAlwaysBezero = 1;
    }
    if(hiddenValue == 7) {
        shouldalwaysBeZero = 1;
    }
    hiddenValue = data;
}
```

From the function above, you can expect that `should_always_be_zero` is always zero, regardless of the `data` value. But wait, what happens if our input is `2`? We get `should_always_be_zero` as `1`. That violates our invariant!

Of course, this is a pretty straightforward example. But what if we have a function that looks a bit more complicated? Writing a test case for every scenario in such a function could be tedious. We need to adopt a more programmatic approach to identify such cases.

## Introducing Fuzz Tests and Invariant Tests

There are two popular methodologies when dealing with edge cases: using _fuzz tests_, _invariant tests_, or **symbolic execution** (which we'll save for another day).

> "Fuzz testing and Invariant testing are great tools to assess the robustness of your code."

Let's consider an example of a fuzz test in Foundry. Here, we set our data right in the test parameter, allowing Foundry to automate the process of providing random input data during tests.

```js
function testIAlwaysGetZeroFuzz(uint256 data) public {
    // uint256 data = 0;
    exampleContract.doStuff(data);
    assert(exampleContract.shouldAlwaysBeZero() == 0);
}
```

Foundry would automatically randomize data and use numerous examples to run through the test script. This method handles testing cases if data equals zero, data equals one, and other randomly chosen data values.

Notably, this pseudo-random mechanism is not exhaustive. It won't provide a scenario for every single possible data input. That's why further understanding of how the Fuzzer generates random data is crucial.

## Stateless Fuzzing versus Stateful Fuzzing

Having performed stateless fuzzing, it's valuable to understand **stateful fuzzing**, where the ending state of the previous run is the starting point for the following run.For example, a single stateless fuzz test involves triggering a `doStuff` function with a data input of `7`, igniting the contract, and then calling another function on it.

A stateful fuzz test would instead utilize the same contract we just triggered and call another function on it, creating an interlocking sequence of functions throughout a single run. Achieving this in Foundry requires using the `invariant` keyword and a bit of setup:

```js
function testIAlwaysGetZeroStateful() public {
    uint256 data = 7;
    exampleContract.doStuff(data);
    assert(exampleContract.shouldAlwaysBeZero() == 0);
    // Use the same contract!
    data = 0;
    exampleContract.doStuff(data);
    assert(exampleContract.shouldAlwaysBeZero() == 0);
}
```

With the instructions above, Foundry can call the `doStuff` function multiple times with random data inputs, tracking any violations of our invariant.

<img src="/security-section-1/3-fuzz-test/fuzz1.png" style="width: 100%; height: auto;" alt="block fee">

## In Summary

To put it all to point, fuzz testing involves mainly understanding your system's invariants and writing tests that can execute numerous scenarios. This is either achieved through stateless fuzzing, which provides random data alone, or stateful fuzzing, allowing both random data and random function calls. This is the new standard for web3 security.

Going forward, aim to fully understand the invariants in systems you're working on, write functions that can execute them, and most importantly, do not leave these traces to auditors only. Make fuzz tests a foundational part of your process.

> "Fuzz testing is a technique that some of the top protocols are yet to adopt, yet it can aid in discovering high severity vulnerabilities in smart contracts." - Alex Rohn, co-founder at Cyfrin.

To equip yourself with advanced fuzzing strategies, I highly recommend you look out for our next blog post. Together, let's enhance web3 security one test at a time. Until then, keep learning and testing!
