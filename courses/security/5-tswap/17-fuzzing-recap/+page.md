---
title: Fuzzing Recap
---

---

### Fuzzing Recap

So, what all did we just cover? There's been a lot.

We learnt about `stateless fuzzing` and how powerful it can be at expanding the coverage of our tests beyond single case unit tests by bombarding our functions with random data!

This lesson also touched on `foundry.toml` configurations for our fuzz testing with key attributes like `runs`, `depth` and `seed` allowing us to configure how thoroughly our fuzzing is performed.

- Runs - How many times your test suite will run with random data
- Depth - How many functions your test suite will call each run
- Seed - An input value for a pseudorandom number generator can be recalled/reused for 'reliable randomness'

`stateless fuzzing` has a weakness however! We learnt how vulnerabilities that arise as a product of contract state changes cannot be caught be `stateless fuzzing` and thus introduced `open stateful fuzzing`

`Open stateful fuzzing` allowed us to retain our contract state from one run to the next. Tracking these state changes between runs allows our fuzzing test suite to catch even deeper vulnerabilities.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

// INVARIANT: doMoreMathAgain should never return 0
contract StatefulFuzzCatches {
    uint256 public myValue = 1;
    uint256 public storedValue = 100;

    /*
     * @dev Should never return 0
     */
    function doMoreMathAgain(uint128 myNumber) public returns (uint256) {
        uint256 response = (uint256(myNumber) / 1) + myValue;
        storedValue = response;
        return response;
    }

    function changeValue(uint256 newValue) public {
        myValue = newValue;
    }
}
```

It was here that we noticed that our fuzz tests were reverting a lot and not behaving very efficiently. We introduced `Handlers` and `handler-based stateful fuzz testing` which allowed us to constrain the data being tested with as well as focus our function calls such they they were being called in a meaningful way and a sensible order.

Our `Handler` essentially serves as a proxy or a wrapper to the contract we're testing and focuses our test suite.

These adjustments ultimately allow our fuzz testing suite to run in the most efficient and effective way possible.

The last thing we teased was the `Weird ERC20` exploit, which we'll dive into next. You've just been buried in new information though. Now's a great time to take a break.

See you in the next lesson!

In this blog post, we're going to dive into the exciting world of `fuzzing`. Hang in there and get ready to uncover the intricacies of stateless fuzzing, explore the intriguing concept of stateful fuzzing, programmatically exploit the Weird ERC 20, and navigate the maze of manual bug finding in your codebase.

## A Quick Recap: All About Stateless Fuzzing

So, what did we just uncover? We got to grips with the powerful tool called `stateless fuzzing`. Stateless fuzzing offers invaluable aid to developers as it tests a system with a series of random inputs, shreds through layers of errors, helps to uncover bugs in a codebase, and optimizes system performance.

However, stateless fuzzing does have a downside. Its efficiency falls abruptly when it comes to `stateful fuzzing`. Why? Because stateful fuzzing isn't just about pounding a codebase with random inputs. It's more like a well-choreographed dance sequence, requiring precise steps and accurate timing.

_"Stateless and stateful fuzzing holds the same end goal: to identify and fix bugs and vulnerabilities in a codebase. However, they approach this goal from different perspectives."_

## The Handler Method: Bridging the Gap between Stateless and Stateful Fuzzing

But here's the shimmering light at the end of the tunnel: the handler method. This handy little method functions as a proxy that enables us to call our contract and achieve a more nuanced stateful fuzzing strategy, especially when dealing with complex contracts.

In simple terms, the handler method allows us to make our randomness `less random`. This directed randomness enables stateful fuzzing to probe more effectively into a codebase's vulnerabilities.

It helps the fuzzer go down paths that make sense, ensuring a more efficient and targeted fuzzer run.

![](https://cdn.videotap.com/imecUt1GioVaw6WCZCUs-33.1.png)

## Teasing the Weird ERC 20 Exploits

Next, we dipped our toes into the Weird ERC 20 exploit. While we didn’t dive deep into this topic, consider it your cliffhanger, your incentive to keep learning! We’ll be exploring the Weird ERC 20 in detail soon enough. It's an exploit you definitely don’t want to miss because it is a crucial tool to test more advanced code contracts.

_"In the world of coding and security breaches, the 'weird ERC 20' presents itself as a fascinating challenge and a riveting exploit that aids in uncovering deeper vulnerabilities within the code."_

## Looking Forward: The Road Ahead with TSWAP and Manual Review

With this newly acquired knowledge, next on our agenda is to apply these techniques to `TSWAP` and run stateful fuzzing tests. After we've done that, we'll dive headlong into the fascinating world of manual reviews.

The manual review process can seem tedious, especially since it involves hunting down bugs without any automation. But rest assured, it’s an amazing learning journey that adds tremendous value to your skillset as a developer.

## Take-A-Break Strategy

After this whirlwind tour of fuzzing, exploit, and reviews, you’ve made it so far and gained quite a bit of expertise! Peeling back layers of codes, vulnerabilities, and in-depth testing strategies can be mentally taxing, which is why it's important to give your brain some downtime.

_"Learning is a marathon, not a sprint; don't forget to hydrate, take breaks, and recharge yourself."_

Feel free to take a short break, stretch a bit, go for a walk or do anything you find relaxing. When you’re ready, we'll reconvene and continue our descent into the rabbit hole of coding exploits and vulnerabilities, enriched, refreshed, and ready for more.

Until then, congratulations once again and see you after your well-deserved break!

Stay tuned for more fuzzing and coding action in the next blog entry!
