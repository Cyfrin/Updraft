---
title: Open Fuzz Tests
---

_Follow along the course with this video._



# Unit Testing and Refactoring: Building Better and Secure DApps

Hello everyone! Welcome back, if you have been following along, you would remember that in our previous section, we had taken a dive into the world of bugs and test cases. We looked at how to identify bugs and, more importantly, how to build a comprehensive battery of test cases. 'Now, are your tests similar to the one I provided? Better? Worse? The point is to have high test coverage for all logical branches in our code. It’s an awesome feeling when we can identify and fix bugs proactively through high-quality tests.

<img src="/foundry-defi/17-defi-open-fuzz-tests/defi-open-fuzz-tests1.png" style="width: 100%; height: auto;">

## Enhancing The Health Factor Function

During this testing, I found a need to refactor some code. One significant change was the introduction of a `_calculateHealthFactor()` function. Why did I introduce it? This new function allowed me to create a similar `public` function which provided a great deal of clarity in calculating our service’s health factor. This indirectly turned out to be a very useful tool in our tests, enabling us to get an expected health factor. Consequently, it allowed easy handling of any errors if the actual and expected health factors didn’t match – especially in our test cases when we expected certain events.

```js
...
contract DSCEngine is ReentrancyGuard {
    ...
    function _calculateHealthFactor(uint256 totalDscMinted, uint256 collateralValueInUsd)
        internal
        pure
        returns (uint256)
    {
        if (totalDscMinted == 0) return type(uint256).max;
        uint256 collateralAdjustedForThreshold = (collateralValueInUsd * LIQUIDATION_THRESHOLD) / 100;
        return (collateralAdjustedForThreshold * 1e18) / totalDscMinted;
    }
    ...
    function calculateHealthFactor(uint256 totalDscMinted, uint256 collateralValueInUsd)
        external
        pure
        returns (uint256)
    {
        return _calculateHealthFactor(totalDscMinted, collateralValueInUsd);
    }
    ...
}
```

This refactoring served a double purpose – a much cleaner code and better visibility of our health factor calculation. In fact, by making this function `public`, the users of our service can play around with it to see how their changes impact the health factor.

## Bug Hunting

In the debugging exercise, the main point of interest was the `Health Factor` functionality. The `_calculateHealthFactor()` function worked by fetching the account information and then appling the health factor calculation. Here, I found a bug relating to `totalDscMinted`. My fix included a new checker that would detect if the `totalDsdMinted` was zero. If it was indeed zero, we capped the health factor to a maximum (e.g., 256).

```js
    ...
    if (totalDscMinted == 0) return type(uint256).max;
    ...
```

Why was this checker important? Well, let’s consider a scenario. What if a user deposits a massive amount of collateral, but doesn't have any DSC Minted? The health factor calculation would divide by zero, causing the system to crash. We have to consider all edge cases to ensure our system is fail-proof.

## Essential External Functions

Additionally, I added a lot of `external view functions` which would make it easier to interact with our protocol. This eased readability and made our protocol user-friendly.

Of course, with every refactoring, there was an expanded library of test cases to cover all possible scenarios and close all loopholes. Nothing new here, as you’re already well-versed with writing robust test cases. And if your test coverage is around something like 90% – kudos, my friend! You’ve mastered the art of diligent testing in a complex project.

## But...Are We Done Yet?

I’m sure you’re beaming with pride on your accomplishments, and rightly so. But, I have to break it to you – we’re not done yet! We’re now taking up the gauntlet to write the most epic, mind-blowingly awesome code there ever is!

<img src="/foundry-defi/17-defi-open-fuzz-tests/defi-open-fuzz-tests2.png" style="width: 100%; height: auto;">

Right off the bat, the question that you need to repeatedly ask yourself is, ‘What are our invariants properties?’ If you can answer this question correctly, you can write stateful and stateless fuzz tests for your code and harden your application against unforeseen edge cases.

## Understanding Fuzz Testing

In the world of programming, regardless of how hard you try, it’s almost guaranteed that you will miss a certain edge case scenario. This is where an advanced form of testing called `Fuzz Testing` comes into play.

<img src="/foundry-defi/17-defi-open-fuzz-tests/defi-open-fuzz-tests3.PNG" style="width: 100%; height: auto;">

As we look at Fuzz Testing, we'll be exploring both stateful and stateless variants.

## Stateless versus Stateful Fuzz Testing

To put it simply, the previous state doesn't impact the next run in stateless fuzzing. On the other hand, stateful fuzzing uses the state of the previous test run as the starting point for the next one. Here's an example of stateless fuzz testing:

Our Contract:

```js
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    uint256 public shouldAlwaysBeZero = 0;
    uint256 hiddenValue = 0;

    function doStuff(uint256 data) public {
        if (data ==2){
            shouldAlwaysBeZero = 1;
        }
        if (hiddenValue == 7){
            shouldAlwaysBeZero = 1;
        }
        hiddenValue = data;
    }
}
```

Our Test:

```js
    ...
    function testIAlwaysGetZeroFuzz(uint256 data) public {
        exampleContract.doStuff(data);
        assert(exampleContract.shouldAlwaysBeZero() == 0);
    }
```

In the above example, the `doStuff` function should always return zero. The fuzz test will pass varying random arguments to our function, attempting to break this function. Here's a stateful fuzz test:

```js
...
import {StdInvariant} from "forge-std/StdInvariant.sol";

contract MyContractTest is StdInvariant, Test {
    MyContract exampleContract;

    function setUp() public {
        exampleContract = new MyContact();
        targetContract(address(exampleContract));
    }

    function invariant_testAlwaysReturnsZero() public {
        assert(exampleContract.shouldAlwaysBeZero() == 0);
    }
}

```

The above example is going to call the functions of `MyContract` randomly, with random data.

This functionality doesn't stop at the basics. If you're interested in exploring more advanced fuzzing strategies - stay tuned! We'll be diving deeper into this topic in our future posts.

## Wrap Up

Let's have a quick wrap-up of what we discussed today.

- Unit testing is crucial in identifying and fixing bugs.
- Refactoring not only yields cleaner code but also makes the system easier to understand and interact with.
- Stateless and stateful fuzz testing is crucial in securing your smart contract.

Overall, enhancements to your testing strategies can significantly increase the resilience and robustness of your platform. In conclusion, I urge you to keep those invariants in mind, keep writing those functions, and don’t let anyone undervalue your tests!

Until then – happy coding!
