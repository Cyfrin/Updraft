---
title: Stateless Fuzzing
---

_Follow along with the video:_

---

### Stateless Fuzzing

Stateless Fuzzing - Stateless fuzzing (often known as just "fuzzing") is when you provide random data to a function to get some invariant or property to break.

It is "stateless" because after every fuzz run, it resets the state, or it starts over.

Check out the [**invariant-break README**](https://github.com/Cyfrin/sc-exploits-minimized/blob/main/src/invariant-break/README.md#1-stateless-fuzzing---open) for information and examples.

Let's start with opening `invariant-break/StatelessFuzzCatches.sol`

We see a very simple contract with a clearly defined invariant, similar to what we've seen before.

```js
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

// INVARIANT: doMath should never return 0
contract StatelessFuzzCatches {
    /*
     * @dev Should never return 0
     */
    function doMath(uint128 myNumber) public pure returns (uint256) {
        if (myNumber == 2) {
            return 0;
        }
        return 1;
    }
}
```

**Remember, in a sufficiently complex code base the flaw won't be so clear, but the concepts you learn here will still apply**

### Writing the Test

Now we can start to recreate the folder we deleted, one step at a time.

Create the `test/invariant-break` folder and within create a file titled `StatelessFuzzCatchesTest.t.sol` and we can start writing the test that will catch our bug for us.

```js
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {StatelessFuzzCatches} from "src/invariant-break/StatelessFuzzCatches.sol";
import {Test} from "forge-std/Test.sol";

contract StateLessFuzzCatchesTest is Test {
    StatelessFuzzCatches sfc;

    function setUp() public {
        sfc = new StatelessFuzzCatches();
    }

    function testFuzzCatchesStateless(uint128 randomNumber) public view {
        assert(sfc.doMath(randomNumber) != 0);
    }
}
```

Fairly simple!

We begin by importing our `StatelessFuzzCatches.sol` contract and `Test.sol`, remembering to inherit `Test`.

Next, in our `setUp` function we create a new instance of our contract to test.

Finally, our test. We pass `uint128 randomNumber` to our test which uses this for our `doMath` function in `StatelessFuzzCatches`. We're asserting that this function call never returns 0 in accordance with our given invariant.

```js
/*
* @dev Should never return 0
*/
function doMath(uint128 myNumber) public pure returns (uint256) {...}
```

Before we run the test, remember that Fuzz tests can be configured in our `foundry.toml` with a whole breadth of available options (check them out [**here**](https://book.getfoundry.sh/reference/config/testing?highlight=%5Bfuzz%5D#fuzz)).

For this test, assure our [Fuzz] in `foundry.toml` is configured for `256 runs` and a seed of `0x2`. Knowing how to configure runs is important to assure a thorough test.

```toml
[fuzz]
runs = 256
seed = '0x2'
```

**Runs** - How many times the function will be called with random data

**Seed** - An input used to initialize/influence a pseudorandom number generator

If things have been set up well we should be able to run the following command to run our test:

```bash
forge test --mt testFuzzCatchesStateless -vvvv
```

![stateless-fuzzing1](/security-section-5/12-stateless-fuzzing/stateless-fuzzing1.png)

We can see it doesn't take much for Foundry's Fuzzer to catch our edge case! When the argument `2` is passed, our function returns `0` _breaking our invariant_.

### Pros and Cons

Fuzzing is obviously incredibly powerful, it can catch breaks in protocol invariants that we could never hope to catch manually (despite our example being a little simple). They aren't without drawbacks however.

- Stateless Fuzzing is unable to catch broken invariants that result from multiple function calls
- You can never be 100% sure of security as the input is random. Even using 1,000,000 random numbers, the 1,000,001 could break everything.

In the next lesson we'll look more closely at circumstances which cause the stateless fuzzing approach to fail. On to Level 2!
