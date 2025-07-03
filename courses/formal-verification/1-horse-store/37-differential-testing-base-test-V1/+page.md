---
title: Differential Testing - Base Test V1
---

_Follow along with this video:_

---

### Where We're At

Let's take a moment to consider where exactly we're at right now.  We've written our Huff contract, and we have our Solidity contract on which it was based. Looking at these two languages, it's clear to see we'd never want to write a whole contract op code by op code. It's incredibly tedious, sure you may be a little more gas efficient, but you're looking at 5x the effort to accomplish something a higher level language can achieve much more easily.

### Differential Testing

If we did decide the write it Huff however, we should be certain that our code is doing the same as we'd expect in Solidity. There's a great way to examine the accuracy of our Huff implementation via the use of `Differential Tests/Differential Fuzzing`. Once we've done that we'll break down what's happening in the Solidity code, op code by op code.

We can start by creating a new folder within our project's `test` directory. Name it `V1` and create a file within named `Base_TestV1.t.sol`. This test file will actually house all the tests for *both* our Huff and Solidity implementations.
We accomplish this by having our Huff and Solidity versions of our tests inherit Base_TestV1. This will assure that both versions of our tests are exactly the same.

Let's look at what our Base_TestV1 will look like.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {HorseStore} from "../../src/HorseStore.sol"
import {Test, console2} from "forge-std/Test.sol"

abstract contract Base_TestV1 is Test {
    HorseStore public horseStore

    function setUp() public virtual {
        horseStore = new HorseStore();
    }

    function  testReadValue() public {
        uint256 initialValue = horseStore.readNumberOfHorses();
        assertEq(initialValue, 0);
    }
}
```

This should look very familiar to you, with a few interesting changes over a normal test we'd write in Foundry.

Firstly you may notice that our test contract is `abstract`, this means our Solidity and Huff tests will need to inherit this contract for it to actually run. Similarly our `setUp()` function has been marked as `virtual`. Our Huff and Solidity test implementations will need to override this function as a result, keep this in mind!

At this point if we run `forge test` nothing will happen. Let's create a new file named `HorseStoreSolc.t.sol`  in the same folder and put this `Base_TestV1` to work.

```js
pragma solidity 0.8.20;

import {Base_TestV1} from "./BaseTest_V1.t.sol"

contract HorseStoreSolc is Base_TestV1 {}
```

That's it! Now that we no longer have only an abstract test contract, running `forge test` should run our tests successfully. This file pertains to our Solidity implementation. Create a new file named `HorseStoreHuff.t.sol`, in the same folder, and let's see what the Huff version looks like.

```js
pragma solidity 0.8.20;

import {Base_TestV1} from "./BaseTest_V1.t.sol"

contract HorseStoreHuff is Base_TestV1 {
    function setUp() public override{
        // horseStore = Huff Edition
    }
}
```

Again, our test file is very simple. The only noteworthy difference so far is that we've overridden our `setUp()` function. In the next lesson we'll add this logic to this function to point the test towards our Huff implementation!