---
title: Stateful and Stateless Fuzzing to Test Invariants
---

---

### Stateful and Stateless Fuzzing to Test Invariants

Ah, contracts written, tests conducted — time to ship your code, right?

Wrong.

Often times exploits are going to arise from situations you haven't accounted for, or a circumstance you haven't thought of.

Fuzz Testing is a way to bombard your protocol with random data in an attempt to break it, it comes in two forms:

- Stateless Fuzzing - Each test run starts with a fresh instance of the protocol or a new state. A test suite will call a function with random data -> start over -> call a function with random data -> start over etc.

- Stateful Fuzzing - Each run remembers the state of the previous run. Function is called with random data -> another function is called with random data etc

Let's take a look at a simple contract with a simple invariant to get a sense of how powerful fuzz testing can be.

```js
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    uint256 public shouldAlwaysBeZero = 0;

    function doStuff(uint256 data) public {
        if(data == 2){
            shouldAlwaysBeZero = 1;
        }
    }
}
```

In the above, `shouldAlwaysBeZero` is our `invariant`. This is a property of our protocol which must always be true.

A normal unit test for our contract may look something like:

```js
MyContract exampleContract;
function testIAlwaysGetZero() public {
    uint256 data = 0;
    exampleContract.doStuff(data);
    assert(exampleContract.shouldAlwaysBeZero() == 0);
}
```

While the above test might give us peace of mind for that specific scenario, a close look at our contract tells us if `data == 2` then our invariant will break because `shouldAlwaysBeZero` will become `1`.

This contract is a very transparent example of an invariant breaking condition, but you could imagine a much more complex function being tested and results of our passed data being less obvious.

Fortunately, configuring our test to perform fuzzing is very easy. All we need to do is pass the variable we want to fuzz to our function and remove the assignment of that variable we had earlier.

```js
MyContract exampleContract;
function testIAlwaysGetZero(uint256 data) public {
    exampleContract.doStuff(data);
    assert(exampleContract.shouldAlwaysBeZero() == 0);
}
```

Instead of using a unit test to assess a single situation, we can leverage fuzz testing to test a wide range of scenarios for us. When we run this test now with `forge test --mt testIAlwaysGetZero` We can see that we do actually catch the broken invariant when `2` is passed as data to our function!

![stateful-and-stateless-fuzzing1](/security-section-5/10-stateful-and-stateless-fuzzing/stateful-and-stateless-fuzzing1.png)

Great job, Foundry!

I do need to mention that it's not technically choosing random data it's `semi-random data` being passed to our function and the way your fuzzer chooses its random data _matters_. This is a separate advanced concept though, I suggest diving into these differences on your own.

### Runs

Now, an important concept to understand when running fuzz tests is that of `runs`.

![stateful-and-stateless-fuzzing2](/security-section-5/10-stateful-and-stateless-fuzzing/stateful-and-stateless-fuzzing2.png)

In the successful test above, I've highlighted the number of runs the fuzzer performed. This represents the number of times random inputs were passed to our test function.

We can adjust the number of runs foundry performs in our `foundry.toml`.

```toml
[fuzz]
runs=1000
```

The resulting test:

![stateful-and-stateless-fuzzing3](/security-section-5/10-stateful-and-stateless-fuzzing/stateful-and-stateless-fuzzing3.png)

Higher runs will take longer to run, but will give your functions a more thorough coverage of potential cases. That's all there is to stateless fuzzing!

Let's look at a situation where stateless fuzzing is going to fail us though and how we can resolve that.

### Stateful Fuzzing

```js
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    uint256 public shouldAlwaysBeZero = 0;

    uint256 private hiddenValue = 0;

    function doStuff(uint256 data) public {
        // if (data == 2) {
        //     shouldAlwaysBeZero = 1;
        // }
        if (hiddenValue == 0) {
            shouldAlwaysBeZero = 1;
        }
        hiddenValue = data;
    }
}
```

Take a look at the adjusted contract above (we've commented out the line that was breaking our invariant previously). With these changes, by running stateless fuzz tests everything looks fine and will pass.

This is deceiving however.

We can see that if our `hiddenValue` constant is ever `7` then our invariant will break, but `hiddenValue` is only ever changed after a function is called. We need our test to remember how our `hiddenValue` variable changes with each run in order to catch this vulnerability. This is what is meant by `stateful fuzzing`. `Stateful fuzzing is a means to fuzz test our contracts while retaining changes of state across each run.

Stateful Fuzz Testing requires a little bit of set up, but let's see what that looks like. We first need to import `StdInvariant` fom `forge-std` and inherit it with our test contract.

```js
import {StdInvariant} from "forge-std/StdInvariant.sol";

contract MyContractTest is StdInvariant, Test {
    exampleContract = new MyContract();
}
```

We then need to set a `target contract` which tells foundry which contract random functions should be called on.

```js
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0

import {MyContract} from "../src/MyContract.sol";
import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";

contract MyContractTest is StdInvariant, Test {
    MyContract exampleContract;

    function setUp() public {
        exampleContract = new MyContract();
        targetContract(address(exampleContract));
    }
}
```

Now we can write the invariant test.

> **Note:** Stateful Fuzz tests must always start with the `fuzz` or `invariant` keywords.

```js
function invariant_testAlwaysReturnsZero() public {
    assert(exampleContract.shouldAlwaysBeZero() == 0);
}
```

And that's all that's required. Now Foundry will pass data to random functions (in this case our single function) over and over again while carrying state changes over from each run.

![stateful-and-stateless-fuzzing4](/security-section-5/10-stateful-and-stateless-fuzzing/stateful-and-stateless-fuzzing4.png)

In the screenshot above, the Foundry Fuzzer is passing 7 to our `doStuff` function (this is actually a coincidence lol), this is setting our `hiddenValue` to `7` because of:

```js
hiddenValue == data;
```

We're then calling `doStuff` a second time (passing an absurd random number), but because `hiddenValue` is `7`, and state is remembered from our last run, we get caught by:

```js
if (hiddenValue == 7) {
  shouldAlwaysBeZero = 1;
}
```

Boom invariant broken in our second run.

### Wrap Up

In a real smart contract, invariant will be harder to define and functions will be much more complex. The general principles learnt here will still hold true however.

Congrats, you've just learnt the basics of fuzzing, both stateless and stateful and you should be incredible proud. Let's look at how we can practice these new skills in the next lesson.
