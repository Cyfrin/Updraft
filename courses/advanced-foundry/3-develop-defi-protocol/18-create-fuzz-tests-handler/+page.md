---
title: Handler Fuzz Tests
---

_Follow along the course with this video._

---

### Handler Fuzz Tests

Ok, welcome back! I hope you had a chance to take a break, and I _also_ hope you took the time to try to write your own tests. Hopefully your `forge coverage` is outputting something closer to this:

![defi-handler-fuzz-tests1](/foundry-defi/18-defi-handler-fuzz-tests/defi-handler-fuzz-tests1.png)

If not...I **_strongly_** encourage you to pause the video and practice writing some tests.

Otherwise, let's continue!

So that we're all on the same page, I suggest taking a look at the GitHub Repo for this course to see what's been added to my contracts and test suite. Quite a bit of refactoring has happened since last lesson.

- [**DSCEngineTest.t.sol**](https://github.com/Cyfrin/foundry-defi-stablecoin-f23/blob/main/test/unit/DSCEngineTest.t.sol)
- [**DSCEngine.sol**](https://github.com/Cyfrin/foundry-defi-stablecoin-f23/blob/main/src/DSCEngine.sol)

One example of an addition made is the internal \_calculateHealthFactor function and the public equivalent calculateHealthFactor. These functions allow us to access expected Health Factors in our tests.

```solidity
uint256 expectedHealthFactor =
dsce.calculateHealthFactor(amountToMint, dsce.getUsdValue(weth, amountCollateral));
vm.expectRevert(abi.encodeWithSelector(DSCEngine.DSCEngine__BreaksHealthFactor.selector, expectedHealthFactor));
```

### The Bug

In the previous lesson I alluded to there being a severe bug, one of the changes made in the code base since then is mitigating this bug.

Did you find it?

The issue was found in how we calculated our Health Factor originally.

```solidity
function _healthFactor(address user) private view returns(uint256){
    (uint256 totalDscMinted, uint256 collateralValueInUsd) = _getAccountInformation(user);

    uint256 collateralAdjustedForThreshold = (collateralValueInUsd * LIQUIDATION_THRESHOLD) / LIQUIDATION_PRECISION;

    return (collateralAdjustedForThreshold * PRECISION) / totalDscMinted;
}
```

In the above, we need to account for when a user has deposited collateral, but hasn't minted DSC. In this circumstance our return value is going to be dividing by zero! Obviously not good, so what we do is account for this with a conditional, if a user's minted DSC == 0, we just set their Health Factor to a massive positive number and return that.

```solidity
function _calculateHealthFactor(uint256 totalDscMinted, uint256 collateralValueInUsd)
    internal
    pure
    returns (uint256)
{
    if (totalDscMinted == 0) return type(uint256).max;
    uint256 collateralAdjustedForThreshold = (collateralValueInUsd * LIQUIDATION_THRESHOLD) / LIQUIDATION_PRECISION;
    return (collateralAdjustedForThreshold * PRECISION) / totalDscMinted;
}
```

### Change 3

The last major change in the repo since our last lesson is the addition to a number of view/getter functions in DSCEngine.sol. This is just to make it easier to interact with the protocol overall.

<details>
<summary>View Functions</summary>

```solidity
function getPrecision() external pure returns (uint256) {
    return PRECISION;
}

function getAdditionalFeedPrecision() external pure returns (uint256) {
    return ADDITIONAL_FEED_PRECISION;
}

function getLiquidationThreshold() external pure returns (uint256) {
    return LIQUIDATION_THRESHOLD;
}

function getLiquidationBonus() external pure returns (uint256) {
    return LIQUIDATION_BONUS;
}

function getLiquidationPrecision() external pure returns (uint256) {
    return LIQUIDATION_PRECISION;
}

function getMinHealthFactor() external pure returns (uint256) {
    return MIN_HEALTH_FACTOR;
}

function getCollateralTokens() external view returns (address[] memory) {
    return s_collateralTokens;
}

function getDsc() external view returns (address) {
    return address(i_dsc);
}

function getCollateralTokenPriceFeed(address token) external view returns (address) {
    return s_priceFeeds[token];
}

function getHealthFactor(address user) external view returns (uint256) {
    return _healthFactor(user);
}
```

</details>


If you managed to improve your coverage, even if not to this extent, you should be proud of getting this far. This code base is hard to write tests for and a lot of it comes with experience, practice and familiarity.

> ❗ **PROTIP**
> Repetition is the mother of skill.

### Fuzzing

With all this being said, we're not done yet. We're going to really take a security minded focus and build out a thorough fuzz testing suite as well. While developing a protocol and writing tests, we should always be thinking **"What are my protocol invariants?"**. Having these clearly defined will make advanced testing easier for us to configure.

Let's detail Fuzz Testing at a high-level before diving into it's application.

Fuzz Testing is when you supply random data to a system in an attempt to break it. If you recall the example used in a previous lesson:

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    uint256 public shouldAlwaysBeZero = 0;
    uint256 hiddenValue = 0;

    function doStuff(uint256 data) public {
        if (data == 2){
            shouldAlwaysBeZero = 1;
        }
    }
}
```

In the above `shouldAlwaysBeZero` == 0 is our `invariant`, the property of our system that should always hold. By fuzz testing this code, our test supplies our function with random data until it finds a way to break the function, in this case if 2 was passed as an argument our invariant would break. This is a very simple example, but you could imagine the complexity scaling quickly.

Simple unit test for the above might look something like:

```solidity
function testIAlwaysGetZero() public {
    uint256 data = 0;
    myContract.doStuff(data);
    assert(myContract.shouldAlwaysBeZero() == 0);
}
```

The limitation of the above should be clear, we would have the assign data to every value of uin256 in order to assure our invariant is broken... That's too much.

Instead we invoke fuzz testing by making a few small changes to the test syntax.

```solidity
function testIAlwaysGetZero(uint256 data) public {
    myContract.doStuff(data);
    assert(myContract.shouldAlwaysBeZero() == 0);
}
```

That's it. Now, if we run this test with Foundry, it'll throw random data at our function as many times as we tell it to (we'll discuss runs soon), until it breaks our assertion.

![defi-handler-fuzz-tests2](/foundry-defi/18-defi-handler-fuzz-tests/defi-handler-fuzz-tests2.png)

I'll mention now that the fuzzer isn't using _truly_ random data, it's pseudo-random, and how your fuzzing tool chooses its data matters! Echidna and Foundry are both solid choices in this regard, but I encourage you to research the differences on your own.

Important properties of the fuzz tests we configure are its `runs` and `depth`.

**Runs:** How many random inputs are provided to our test

In our example, the fuzz tester took 18 random inputs to find our edge case.

![defi-handler-fuzz-tests3](/foundry-defi/18-defi-handler-fuzz-tests/defi-handler-fuzz-tests3.png)

However, we can customize how many attempts the fuzzer makes within our foundry.toml by adding a section like:

```toml
[fuzz]
runs = 1000
```

Now, if we adjust our example function...

```solidity
function doStuff(uint256 data) public {
    // if (data == 2){
    //     shouldAlwaysBeZero = 1;
    // }
}
```

... and run the fuzzer again...

![defi-handler-fuzz-tests4](/foundry-defi/18-defi-handler-fuzz-tests/defi-handler-fuzz-tests4.png)

We can see it will run all .. 1001 runs (I guess zero counts 😅).

Let's look at an example where the fuzz testing we've discussed so far will fail to catch our issue.

### Stateful Fuzz Testing

Take the following contract for example:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CaughtWithTest {
    uint256 public shouldAlwaysBeZero = 0;
    uint256 private hiddenValue = 0;

    function doStuff(uint256 data) public {
        // if (data == 2) {
        //     shouldAlwaysBeZero = 1;
        // }
        if (hiddenValue == 7) {
            shouldAlwaysBeZero = 1;
        }
        hiddenValue = data;
    }
}
```

In this situation, even if we mitigate the previous issue spotted by our fuzz tester, another remains. We can see in this simple example that if hiddenValue == 7, then our invariant is going to be broken. The problem however is that two subsequent function calls must be made for this to be the case. First, the function must be called wherein data == 7, this will assign 7 to hiddenValue. Then the function must be called again in order for the conditional to break our invariant.

What this is describing is the need for our test to account for changes in the state of our contract. This is known as `Stateful Fuzzing`. Our fuzz tests til now have been `Stateless`, which means the state of a run is discarded with each new run.

Stateful Fuzzing allows us to configure tests wherein the ending state of one run is the starting state of the next.

### Stateful Fuzz Test Setup

In order to run stateful fuzz testing in Foundry, it requires a little bit of setup. First, we need to import StdInvariant.sol and have our contract inherit this.

```solidity
// SPDX-License-Identifier: None
pragma solidity ^0.8.13;

import {CaughtWithTest} from "src/MyContract.sol";
import {console, Test} from "forge-std/Test.sol";
import{StdInvariant} from "forge-std/StdInvariant.sol";

contract MyContractTest is StdInvariant, Test {
    CaughtWithTest myContract;

    function setUp() public {
        myContract = new CaughtWithTest();
    }
}
```

The next step is, we need to set a target contract. This will be the contract Foundry calls random functions on. We can do this by calling targetContract in our setUp function.

```solidity
contract NFT721Test is StdInvariant, Test {
    CaughtWithTest myContract;

    function setUp() public {
        myContract = new CaughtWithTest();
        targetContract(address(myContract));
    }
}
```

Finally, we just need to write our invariant, we must use the keywords invariant, or fuzz to begin this function name, but otherwise, we only need to declare our assertion, super simple.

```solidity
function invariant_testAlwaysReturnsZero() public view {
    assert(myContract.shouldAlwaysBeZero() == 0);
}
```

Now, if our fuzzer ever calls our doStuff function with a value of 7, hiddenValue will be assigned 7 and the next time doStuff is called, our invariant should break. Let's run it.

![defi-handler-fuzz-tests5](/foundry-defi/18-defi-handler-fuzz-tests/defi-handler-fuzz-tests5.png)

We can see in the output the two subsequent function calls that lead to our invariant breaking. First doStuff was called with the argument of `7`, then it was called with `429288169336124586202452331323751966569421912`, but it doesn't matter what it was called with next, we knew our invariant was going to break.

### Wrap Up

In a real smart contract scenario, the invariant may actually be the most difficult thing to determine. It's unlikely to be something as simple as x shouldn't be zero, it might be something like

- `newTokensMinted < inflation rate`
- A lottery should only have 1 winner
- A user can only withdraw what they deposit

Practice and experience will lend themselves to identifying protocol invariants in time, but this is something you should keep in the back of your mind throughout development.

Stateful/Invariant testing should be the new bare minimum in Web3 security.

In the next lesson we're applying these concepts to our DecentralizedStableCoin protocol.

Get ready, see you soon.
