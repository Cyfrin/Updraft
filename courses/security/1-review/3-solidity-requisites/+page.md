---
title: Solidity Pre-requisites
---

_Follow along with this video_

---

Alright! All of the pre-requisites I've mentioned so far, and those mentioned here can be found in the Foundry Full Course ([Fundamentals](https://updraft.cyfrin.io/courses/foundry) _and_ [Advanced](https://updraft.cyfrin.io/courses/advanced-foundry))

## The Prerequisites: Solidity Basics

To keep up with this course, you should be familiar with all the basic functions of [Remix](https://remix.ethereum.org). This includes `compiling`, and `deploying` to both local and testnet blockchains.

All of the basic Solidity, variable types, contract structure etc should be second nature.

## Foundry Familiarity

You should also be familiar with the working environments of Foundry, or your framework of choice. You should understand how to initialize a project in your framework and navigate it's working tree.

![block fee](/security-section-1/2-solidity-req/solidity-prerequisites1.PNG)

Commands like these should ring lots of bells.

```shell
forge init
forge build
forge test
```

The basic code seen in the Foundry example contracts should be things you recognize as well.

```js
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}
```

---

## Testing

The Foundry example test setup contains two distinct test types, a regular test and a fuzz test. These distinctions you should be a little familiar with, but we'll definitely go more indepth throughout this course.

### Exploring Test Types: Regular Test and Fuzz Test

In the regular test, we merely incept the counter contract and increment it, ensuring the counter number equals one. The Fuzz test, however, involves passing a random number into our test.

As you may recall, we run this test with a certain number of runs, using different random numbers. No matter the chosen value for X, the test will always hold.

How do we change the number of fuzz runs? Simply browse to Foundry's TOML file and copy the variable.

```md
[fuzz]
runs = 256
max_test_rejects = 65536
seed = "0x3e8"
dictionary_weight = 40
include_storage = true
include_push_bytes = true
```

In the TOML file, you have the ability to set the number of runs. For instance, we could change it from 256 to 600.

```shell
$ forge test
```

Voila! You'll see that the test Fuzz ran 600 times. This indicates that the test ran with 600 different random numbers.

```bash
Running 1 test for test/Counter.t.sol:CounterTest
[PASS] testFuzz_SetNumber(uint256) (runs: 600, μ: 27398, ~: 28409)
Test result: ok. 1 passed; 0 failed; 0 skipped; finished in 14.63ms

Ran 1 test suites: 1 tests passed, 0 failed, 0 skipped (1 total tests)
```

## Advanced Fuzzing: Stateful Fuzzing and Invariant Tests

On to the next level – **stateful fuzzing**, also popular as invariant tests in the Foundry universe. This aspect of coding might not be your forte yet, but no worries, that's what we're here for.

Let's look more closely at fuzzing and invariant testing in our next lesson.
