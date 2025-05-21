---
title: Stateful Fuzzing Where Method 1 (open) Fails
---

---

Let's ramp things up to a much more robust contract `HandlerStatefulFuzzCatches.sol`. This contract will be much closer to what we can expect to see in TSwap and represents a vault for ERC20 tokens.

<details>
<summary>HandlerStatefulFuzzCatches.sol</summary>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/*
 * This contract represents a vault for ERC20 tokens.
 *
 * INVARIANT: Users must always be able to withdraw the exact balance amount.
 */
contract HandlerStatefulFuzzCatches {
    error HandlerStatefulFuzzCatches__UnsupportedToken();

    using SafeERC20 for IERC20;

    mapping(IERC20 => bool) public tokenIsSupported;
    mapping(address user => mapping(IERC20 token => uint256 balance)) public tokenBalances;

    modifier requireSupportedToken(IERC20 token) {
        if (!tokenIsSupported[token]) revert HandlerStatefulFuzzCatches__UnsupportedToken();
        _;
    }

    constructor(IERC20[] memory _supportedTokens) {
        for (uint256 i; i < _supportedTokens.length; i++) {
            tokenIsSupported[_supportedTokens[i]] = true;
        }
    }

    function depositToken(IERC20 token, uint256 amount) external requireSupportedToken(token) {
        tokenBalances[msg.sender][token] += amount;
        token.safeTransferFrom(msg.sender, address(this), amount);
    }

    function withdrawToken(IERC20 token) external requireSupportedToken(token) {
        uint256 currentBalance = tokenBalances[msg.sender][token];
        tokenBalances[msg.sender][token] = 0;
        token.safeTransfer(msg.sender, currentBalance);
    }
}
```

</details>

The invariant the protocol has provided is:

```js
/*
 * INVARIANT: Users must always be able to withdraw the exact balance amount out.
 */
```

A little context gathering of this contract is going to tell us that these are the two main functions of the protocol:

```js
function depositToken(IERC20 token, uint256 amount) external requireSupportedToken(token) {
    tokenBalances[msg.sender][token] += amount;
    token.safeTransferFrom(msg.sender, address(this), amount);
}

function withdrawToken(IERC20 token) external requireSupportedToken(token) {
    uint256 currentBalance = tokenBalances[msg.sender][token];
    tokenBalances[msg.sender][token] = 0;
    token.safeTransfer(msg.sender, currentBalance);
}
```

This contract ultimately allows users to deposit tokens, the amount per user is tracked internally via mappings, and the user is then able to withdraw their allotted tokens.

### Attempting Open Stateful Fuzzing

Let's first try the methodology we learnt in the last lesson and see if it's able to spot any vulnerabilities.

Create a new folder in our `test/invariant-break` folder named `handler`. Within this new folder create a file named `AttemptedBreakTest.t.sol`.

There's going to be a lot to this, so let's break down this test set up one step at a time. First, we're going to need to import `HandlerStatefulFuzzCatches.sol` as well as `Test` and `StdInvariant` just as before. This contract takes an array of `supportedTokens` in it's constructor, so we'll need to import some tokens - the repo has provided mocks in `test/mocks` for use! Finally, be sure to import the IERC20 interface.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {HandlerStatefulFuzzCatches} from "src/invariant-break/HandlerStatefulFuzzCatches.sol";
import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {MockUSDC} from "test/mocks/MockUSDC.sol";
import {YieldERC20} from "test/mocks/YieldERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

We'll next need to instantiate these things in our test contract and make a user - this user will be the entity interacting with the protocol and whose balance we'll be checking.

```js
contract AttemptedBreakTest is StdInvariant, Test {
    HandlerStatefulFuzzCatches
    handlerstatefulFuzzCatches;
    MockUSDC mockUSDC;
    YieldERC20 yieldERC20;
    IERC20[] supportedTokens;

    address user = makeAddr("user");
```

And now, our `setUp` function. A few things to consider here:

1. Mocks need to be deployed
2. Mocks need to be added to our `supportedTokens` array
3. Our `user` needs to have a balance of YieldERC20 and/or MockUSDC
4. Our `HandlerStatefulFuzzCatches.sol` contract needs to be deployed with our `supportedTokens` argument
5. `HandlerStatefulFuzzCatches.sol` needs to be set as our fuzzer's `targetContract`

What's this `setUp` function look like?

```js
function setUp() public {
        vm.startPrank(user);
        mockUSDC = new MockUSDC();
        yieldERC20 = new YieldERC20();
        mockUSDC.mint(user, yieldERC20.INITIAL_SUPPLY());
        vm.stopPrank();

        supportedTokens.push(IERC20(address(yieldERC20)));
        supportedTokens.push(IERC20(address(mockUSDC)));
        handlerstatefulFuzzCatches = new HandlerStatefulFuzzCatches(supportedTokens);
        targetContract(address(handlerstatefulFuzzCatches));
    }
```

In the above we're pranking our `user` and then deploying and minting the tokens the `user` needs. `supportedTokens` then has both `mockUSDC` and `yieldERC20` pushed to it and our `HandlerStatefulFuzzCatches.sol` contract is deployed and set as our `targetContract`. Nailed it!

Let's now consider what our invariant might look like. We know _Users must always be able to withdraw the exact balance amount out_.

Sounds like we might need to compare some balance changes of our `user`. Let's create a `startingAmount` variable and set it to the value of each token the `user` begins with (these should be the same for both tokens).

```js
contract AttemptedBreakTest is StdInvariant, Test {
    ...
    uint256 startingAmount;
    ...
    function setUp() public {
        vm.startPrank(user);
        mockUSDC = new MockUSDC();
        yieldERC20 = new YieldERC20();
        startingAmount = yieldERC20.INITIAL_SUPPLY();
        mockUSDC.mint(user, startingAmount);
        vm.stopPrank();
        ...
    }
```

With a little refactoring we can now reference the `startingAmount` of our `user` in our test. We can even write a little test to assure the `startingAmount` is being set properly.

```js
function testStartingAmount() public view {
    assert(startingAmount == mockUSDC.balanceOf(user));
    assert(startingAmount == yieldERC20.balanceOf(user));
}
```

::image{src='/security-section-5/14-fuzzing-where-method-1-fails/fuzzing-where-method-1-fails1.png' style='width: 100%; height: auto;'}

Perfect!

Now, if the `user` deposits and then withdraws everything, their startingAmount and what they end with, should be the same. This is going to be the invariant we're testing.

```js
function statefulFuzz_TestInvariantBreaks() public {
    vm.startPrank(user);
    handlerstatefulFuzzCatches.withdrawToken(IERC20(address(mockUSDC)));
    handlerstatefulFuzzCatches.withdrawToken(IERC20(address(yieldERC20)));
    vm.stopPrank();

    assert(handlerstatefulFuzzCatches.tokenBalances(user, IERC20(address(mockUSDC))) == 0);
    assert(handlerstatefulFuzzCatches.tokenBalances(user, IERC20(address(yieldERC20))) == 0);
    assert(mockUSDC.balanceOf(user) == startingAmount);
    assert(yieldERC20.balanceOf(user) == startingAmount);
}
```

In this function, we're assuring the fuzz tests will end with our `user` withdrawing both types of tokens from the protocol. We're then asserting a number of things

1. `user`'s deposit balance of MockUSDC is reset to 0
2. `user`'s deposit balance of YieldERC20 is reset to 0
3. `user`'s balance of MockUSDC returns to the startingAmount
4. `user`'s balance of YieldERC20 returns to the startingAmount

Let's run it with `forge test --mt statefulFuzz_TestInvariantBreaks`

::image{src='/security-section-5/14-fuzzing-where-method-1-fails/fuzzing-where-method-1-fails2.png' style='width: 100%; height: auto;'}

It passes! Boom, safe and secure, right? Wrong.

Look closely and we see `2048` calls were made by our test, but `2048` of them reverted. Something's going on here.

If we navigate back to our `foundry.toml` and set `fail_on_revert` to `true`, we can run our test again as `forge test --mt statefulFuzz_TestInvariantBreaks -vvvv` to gain some insight.

::image{src='/security-section-5/14-fuzzing-where-method-1-fails/fuzzing-where-method-1-fails3.png' style='width: 100%; height: auto;'}

Ah! It's reverting with the error `HandlerStatefulFuzzCatches__UnsupportedToken()`. Of course! Our fuzz test is calling `depositToken` with random addresses, but we only have 2 supported tokens!

Our test isn't being precise enough, and this is a perfect example of why it's important not to default to `fail_on_revert = false`.

This is one of the cons we saw with `open stateful fuzzing` in our [**invariant-break README**](https://github.com/Cyfrin/sc-exploits-minimized/blob/main/src/invariant-break/README.md#2-stateful-fuzzing---open)

Namely, you can run into "path explosion" where there are too many possible paths, and the fuzzer finds nothing.

We need to find a way to confine or restrict our fuzz paths. The opposite risk that we need to watch out for is being _too_ restrictive and missing bugs as a result.

### Wrap Up

We've learnt so much so far! We've covered `stateless` and `open stateful fuzzing` and learnt how they are valuable in passing random data to our test suites.

We learnt about the limitations of stateless fuzzing and how many vulnerabilities only arise through an evolving contract state and we're currently investigating a means to focus our tests and avoid unnecessary reverts making our fuzz suit more reliable and robust.

There are a few problems with our test so far. For example - we're only testing a single user's ability to deposit and withdraw. We should probably be fuzzing users in our tests. Additionally, we neglected to _approve_ any of our tokens before attempting to deposit, so even if the tokens were supported we likely would have reverted again.

In the next lesson, let's clean things up and look at a methodology which allows us to narrow down the focus of our fuzz testing leveraging a handler. See you there!
