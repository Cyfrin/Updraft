---
title: Where Stateless Fuzzing Fails
---

---

### Open Stateful Fuzzing

Welcome to Level 2! In this lesson we'll be employing **_stateful_** fuzzing, the defining characteristic of which is that the result of each run is an input for the next run.

This methodology will allow us to utilize a fuzz testing approach while considering an ever changing contract state - as would be the case with a deployed protocol, in a live scenario.

Let's look at a different contract in our repo now, `StatefulFuzzCatches.sol`. Stateless fuzz catching would have been unable to find vulnerabilities in this situation:

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

_What makes this contract so difficult for stateless fuzzing?_

Well, let's write a stateless fuzz test for this contract and see what happens, create a file `test/StatefulFuzzCatches.t.sol`...

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {StatefulFuzzCatches} from "src/invariant-break/StatefulFuzzCatches.sol";
import {Test} from "forge-std/Test.sol";

contract StatefulFuzzCatchesTest is Test {
    StatefulFuzzCatches statefulFuzzCatches;

    function setUp() public {
        statefulFuzzCatches = new StatefulFuzzCatches();
    }

    function testDoMoreMathAgain(uint128 data) public {
        assert(statefulFuzzCatches.doMoreMathAgain(data) != 0);
    }
}
```

A set up just like before, no curveballs. Let's see if it can catch the bug.

::image{src='/security-section-5/13-where-stateless-fuzzing-fails/where-stateless-fuzzing-fails1.png' style='width: 100%; height: auto;'}

No such luck.

Even if we ran the test 100,000 times, the bug wouldn't be found. The reason is that the vulnerability within `StatefulFuzzCatches.sol` requires multiple functions to be called in sequence, adjusting the contract state, to be exploited.

Let's set up a **stateful** fuzz test now to see how it stacks up.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {StatefulFuzzCatches} from "src/invariant-break/StatefulFuzzCatches.sol";
import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";

contract StatefulFuzzCatchesTest is StdInvariant, Test {
    StatefulFuzzCatches statefulFuzzCatches;

    function setUp() public {
        statefulFuzzCatches = new StatefulFuzzCatches();
        targetContract(address(statefulFuzzCatches));
    }

    function statefulFuzz_catchesInvariant() public view {
        assert(statefulFuzzCatches.storedValue() != 0);
    }
}
```

In this new **stateful** test, we've imported `StdInvariant` and inherited it. We then need to set the target contract of our fuzz test though `targetContract()`. This tells Foundry which address to call random functions on.

Now, the test itself - it's important to note that stateful fuzz tests **must** begin with the key words `statefulFuzz_` or `invariant_`. This is how Foundry determines how to administer the test.

Before running this test, I want to look at `foundry.toml` again. You should see a section called `[invariant]`.

```toml
[invariant]
runs = 64
depth = 32
fail_on_revert = true
```

It's important to understand these few settings we're using here.

- runs - how many fuzz tests will be performed with random data
- depth - how many random functions will be called per run
- fail_on_revert - this value determines if a test will fail as a product of reverted transactions. We'll go into more detail soon.

Remember you can always reference the [**Foundry Book**](https://book.getfoundry.sh/reference/config/testing?highlight=%5Binvariant%5D#invariant) for an exhaustive list of these configurations.

Let's run the test.

```bash
forge test --mt statefulFuzz_catchesInvariant
```

::image{src='/security-section-5/13-where-stateless-fuzzing-fails/where-stateless-fuzzing-fails2.png' style='width: 100%; height: auto;'}

Well, it catches something... but a closer look at the trace output reveals that it's actually reverting due to `arithmetic underflow or overflow (0x11)]`. This is good to know, but it's not actually breaking our invariant. This is where `fail_on_revert` comes into play.

If we configure `fail_on_revert` in our `foundry.toml`, to be `false`, this will allow our tests to ignore errors like this and focus on our invariant. Let's try it.

```toml
[invariant]
runs = 64
depth = 32
fail_on_revert = false
```

::image{src='/security-section-5/13-where-stateless-fuzzing-fails/where-stateless-fuzzing-fails3.png' style='width: 100%; height: auto;'}

In this case our stateful fuzz test works perfectly! The trace indicates that our fuzzer passed `0` to the `changeValue` function, and then subsequently passed `0` to `doMoreMathAgain` resulting in a return of `0`, breaking our invariant!
