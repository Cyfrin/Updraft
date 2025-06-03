---
title: Stateful Fuzzing Method 2
---

_Follow along with the video:_

---

### Handler-based Stateful Fuzzing

Now that we've a `Handle` on stateful fuzzing, let's look at how we can use a `Handler` contract to make our tests more effective.

We use a `Handler` to narrow the potentially limitless inputs a fuzzer can provide, this allows us to test more realistic scenarios increasing the likelihood of identifying a vulnerability.

Start by creating two new files `test/invariant-break/handler/Handler.t.sol` and `test/invariant-break/handler/Invariant.t.sol`.

Assure `fail_on_revert = true` in our `foundry.toml`. This will give us the best insight into how effective our code and tests are.

### Handler.t.sol

We'll start with writing our `Handler` as a way to constrain how our fuzzer behaves. You can think of a `Handler` as wrapper around our contract that the invariant test suite interacts with in a sensible way.

```js
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {HandlerStatefulFuzzCatches} from "src/invariant-break/HandlerStatefulFuzzCatches.sol";
import {Test} from "forge-std/Test.sol";


contract Handler is Test {
    HandlerStatefulFuzzCatches handlerstatefulFuzzCatches;
}
```

The beginning of our `Handler` is very standard. We import and inherit `Test` as well as our contract, we then instantiate the `HandlerStatefulFuzzCatches` contract we'll be "wrapping" in our `Handler`.

Next, we'll need a constructor as we expect to be passing our `HandlerStatefulFuzzCatches` address, once deployed, to our `Handler`.

```js
constructor(HandlerStatefulFuzzCatches _handlerStatefulFuzzCatches){
    handlerstatefulFuzzCatches = _handlerStatefulFuzzCatches
}
```

So, if this Handler is how our invariant test suite interactions with the protocol, we have to ask ourselves _what do we want our invariant test suite to do?_.

We want it to:

- call `depositToken` only on _supported_ tokens.
- call `withdrawToken` only on _supported_ tokens.

Lets employ a way for our Handler to determine which tokens are supported. We'll start by importing `YieldERC20` and `MockUSDC`. These are going to need to be input parameters for our constructor as well. Our setup so far should look something like this:

```js
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {HandlerStatefulFuzzCatches} from "src/invariant-break/HandlerStatefulFuzzCatches.sol";
import {Test} from "forge-std/Test.sol";
import {MockUSDC} from "test/mocks/MockUSDC.sol";
import {YieldERC20} from "test/mocks/YieldERC20.sol";

contract Handler is Test {
    HandlerStatefulFuzzCatches handlerStatefulFuzzCatches;
    MockUSDC mockUSDC;
    YieldERC20 yieldERC20;
    address user;

    constructor (HandlerStatefulFuzzCatches _handlerStatefulFuzzCatches, MockUSDC _mockUSDC, YieldERC20 _yieldERC20, address _user) {
        handlerStatefulFuzzCatches = _handlerStatefulFuzzCatches;
        mockUSDC = _mockUSDC;
        yieldERC20 = _yieldERC20;
        user = _user;
    }
}
```

We've also added a user with whom to call the functions of our contract! Now we can finally get to actually restricting how our fuzzer behaves and how it tests our contract.

Starting with `depositToken`, a way we can tell our fuzzer to only use supported tokens would be to make a function to deposit for each token we have.

```js
 function depositYieldERC20(uint256 _amount) public {
        uint256 amount = bound(_amount, 0, yieldERC20.balanceOf(user));
        vm.startPrank(user);
        yieldERC20.approve(address(handlerStatefulFuzzCatches), amount);
        handlerStatefulFuzzCatches.depositToken(yieldERC20, amount);
        vm.stopPrank();
    }

function depositMockUSDC(uint256 _amount) public {
    uint256 amount = bound(_amount, 0, mockUSDC.balanceOf(user));
    vm.startPrank(user);
    mockUSDC.approve(address(handlerStatefulFuzzCatches), amount);
    handlerStatefulFuzzCatches.depositToken(mockUSDC, amount);
    vm.stopPrank();
}
```

By having our fuzzer directed to these functions specifically, we're able to assure a number of things:

1. The amount deposited is never more than the user has and is always a positive number
2. The token deposited is always approved for the amount being deposited
3. The only tokens deposited are those that are supported - YieldERC20 & MockUSDC

Great! We're also going to want to try withdrawing. Let's see what those functions look like.

```js
function withdrawYieldERC20() public {
    vm.startPrank(user);
    handlerStatefulFuzzCatches.withdrawToken(yieldERC20);
    vm.stopPrank();
}

function withdrawMockUSDC() public {
    vm.startPrank(user);
    handlerStatefulFuzzCatches.withdrawToken(mockUSDC);
    vm.stopPrank();
}
```

And that's all there is to it, we just want to make sure our fuzzer is attempting to withdraw supported tokens. No need for anything clever.

Here's the entire `Handler.t.sol` for reference.

<details>
<summary>Handler.t.sol</summary>

```js
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {HandlerStatefulFuzzCatches} from "src/invariant-break/HandlerStatefulFuzzCatches.sol";
import {Test} from "forge-std/Test.sol";
import {MockUSDC} from "test/mocks/MockUSDC.sol";
import {YieldERC20} from "test/mocks/YieldERC20.sol";

contract Handler is Test {
    HandlerStatefulFuzzCatches handlerStatefulFuzzCatches;
    MockUSDC mockUSDC;
    YieldERC20 yieldERC20;
    address user;

    constructor(
        HandlerStatefulFuzzCatches _handlerStatefulFuzzCatches,
        MockUSDC _mockUSDC,
        YieldERC20 _yieldERC20,
        address _user
    ) {
        handlerStatefulFuzzCatches = _handlerStatefulFuzzCatches;
        mockUSDC = _mockUSDC;
        yieldERC20 = _yieldERC20;
        user = _user;
    }

    function depositYieldERC20(uint256 _amount) public {
        uint256 amount = bound(_amount, 0, yieldERC20.balanceOf(user));
        vm.startPrank(user);
        yieldERC20.approve(address(handlerStatefulFuzzCatches), amount);
        handlerStatefulFuzzCatches.depositToken(yieldERC20, amount);
        vm.stopPrank();
    }

    function depositMockUSDC(uint256 _amount) public {
        uint256 amount = bound(_amount, 0, mockUSDC.balanceOf(user));
        vm.startPrank(user);
        mockUSDC.approve(address(handlerStatefulFuzzCatches), amount);
        handlerStatefulFuzzCatches.depositToken(mockUSDC, amount);
        vm.stopPrank();
    }

    function withdrawYieldERC20() public {
        vm.startPrank(user);
        handlerStatefulFuzzCatches.withdrawToken(yieldERC20);
        vm.stopPrank();
    }

    function withdrawMockUSDC() public {
        vm.startPrank(user);
        handlerStatefulFuzzCatches.withdrawToken(mockUSDC);
        vm.stopPrank();
    }
}

```

</details>

Now we can begin writing our tests in `Invariant.t.sol`!

### Invariant.t.sol

This file is going to look really similar to our `AttemptedBreakTest.t.sol` except it's going to be scoped to work with our `Handler` instead of `HandlerStateFulFuzzCatches.sol` directly.

```js
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {HandlerStatefulFuzzCatches} from "src/invariant-break/HandlerStatefulFuzzCatches.sol";
import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {MockUSDC} from "test/mocks/MockUSDC.sol";
import {YieldERC20} from "test/mocks/YieldERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Handler} from "test/invariant-break/handler/Handler.t.sol"; // HANDLER IMPORTED

contract AttemptedBreakTest is StdInvariant, Test {
    HandlerStatefulFuzzCatches handlerstatefulFuzzCatches;
    MockUSDC mockUSDC;
    YieldERC20 yieldERC20;
    IERC20[] supportedTokens;
    uint256 startingAmount;

    address user = makeAddr("user");

    Handler handler; // HANDLER DECLARED

    function setUp() public {
        vm.startPrank(user);
        mockUSDC = new MockUSDC();
        yieldERC20 = new YieldERC20();
        startingAmount = yieldERC20.INITIAL_SUPPLY();
        mockUSDC.mint(user, startingAmount);
        vm.stopPrank();
        supportedTokens.push(IERC20(address(yieldERC20)));
        supportedTokens.push(IERC20(address(mockUSDC)));
        handlerstatefulFuzzCatches = new HandlerStatefulFuzzCatches(supportedTokens);
        handler = new Handler(handlerstatefulFuzzCatches, mockUSDC, yieldERC20, user); // HANDLER INITIALIZED

        bytes4[] memory selectors = new bytes4[](4); // SPECIFY SELECTORS TO FUZZ
        selectors[0] = handler.depositYieldERC20.selector;
        selectors[1] = handler.depositMockUSDC.selector;
        selectors[2] = handler.withdrawYieldERC20.selector;
        selectors[3] = handler.withdrawMockUSDC.selector;

        targetSelector(FuzzSelector({addr: address(handler), selectors: selectors})); // SET TARGET SELECTORS
    }
}

```

The only differences between this test contract and our previous `AttemptedBreakTest.t.sol` I've commented in the above.

Essentially we're importing our handler, and deploying/initializing it while passing handlerstatefulFuzzCatches, mockUSDC, yieldERC20 and the user as constructor parameters.

From there we are adding the specific function selectors from our handler to an array and then setting our handler address and those selectors as our target through:

```js
targetSelector(FuzzSelector({ addr: address(handler), selectors: selectors }));
```

By running our tests through our handler we're able to trade randomness for much more sensible testing scenarios which don't revert.

![stateful-fuzzing-method-21](/security-section-5/15-stateful-fuzzing-method-2/stateful-fuzzing-method-21.png)

### The Test

What makes this especially cool, is that we can reuse the previous fuzz test we wrote as all of the logic there still applies, we're just constraining the data being passed and pointing it to a different target.

```js
function statefulFuzz_testInvariantBreaksHandler() public {
    vm.startPrank(user);
    handlerStatefulFuzzCatches.withdrawToken(mockUSDC);
    handlerStatefulFuzzCatches.withdrawToken(yieldERC20);
    vm.stopPrank();

    assert(mockUSDC.balanceOf(address(handlerStatefulFuzzCatches)) == 0);
    assert(yieldERC20.balanceOf(address(handlerStatefulFuzzCatches)) == 0);
    assert(mockUSDC.balanceOf(user) == startingAmount);
    assert(yieldERC20.balanceOf(user) == startingAmount);
}
```

Remember, our invariant hasn't changed: **_users must always be able to withdraw the exact balance amount_**.

Let's see if our test works in the next lesson!
