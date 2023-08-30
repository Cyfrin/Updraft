---
title: Handler Fuzz Tests
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://youtube.com/embed/CUKJ2Fxu0As" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Decoding the Magic of Fuzz Testing in Foundry

Chances are, you're here because you've heard about the magic that is **fuzz testing** or **invariant testing**. As developers, it's absolutely crucial for us to gain confidence that our code works as intended, especially when it comes to complex projects.

And trust me, there's no better way to do this than by writing robust invariant tests.

## Fuzz Testing - An Overview

Fuzz testing, also known as fuzzing, is a software testing technique that involves providing invalid, unexpected, or random data as inputs to a computer program. The program is then monitored for exceptions such as crashes, failing built-in code assertions, or potential memory leaks.

<img src="/foundry-defi/18-defi-handler-fuzz-tests/defi-handler-fuzz-tests1.png" style="width: 100%; height: auto;">

It's like throwing a wrench into a machine and watching to see if and how the machine breaks, giving you a better understanding of the machine's robustness, and how it might break in the future.

We could compare fuzz testing to an open basketball court where you get to shoot from anywhere you like. It's a fun way to get warmed up and get a feel for the game, especially at the beginning. But the problem is, you could be wasting valuable shots from improbable distances or awkward angles. Instead, you might want to focus on the three-point line or the free-throw line, which hold a higher value in an actual game scenario.

That's where targeted invariants and fuzz testing with handlers come in!

## Fuzz Testing Vs Invariant Testing

To clarify, invariant testing is simply a type of fuzz testing. 'Invariant' just means stateful, or persistent.

The basic methodology, like we saw in the previous video, works okay. But as we start building more complex systems, we begin to see its limitations. Suffice to say, it represents an "open" targeted fuzz testing where all functions in a contract are called in any order, attempting to break the invariants.

Enter **invariant testing with handlers**, the more advanced sibling, which curtails these seemingly random efforts with more focused techniques, and is what we'll be focusing more on in this piece.

## Let's Get To Testing!

Enough explanation, let's get our hands dirty! We are about to create some very detailed invariant tests to increase your confidence in your code.

### Setting Up Your Environment

<img src="/foundry-defi/18-defi-handler-fuzz-tests/defi-handler-fuzz-tests2.png" style="width: 100%; height: auto;">

For our testing purposes, we're going to be using Foundry, a core framework which has a built-in test runner with invariants and handlers.

To set up your test, create a new test directory within your contract's root directory and add two test files; an invariants test file ( `InvariantsTest.t.sol` ) and a handlers file ( `Handlers.t.sol` ).

In your invariants test file, you will specify the properties of your system that should remain unaltered or invariant. Handlers, on the other hand, will ensure that these properties are observed in an orderly manner without wastage.

### Invariants and Handlers Uncovered

Let's take a deeper dive into our two new scripts — the invariants and handlers.

Your invariants test file should look something like this:

```js
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {DeployDSC} from "../../script/DeployDSC.s.sol";
import {DSCEngine} from "../../src/DSCEngine.sol";
import {DecentralizedStableCoin} from "../../src/DecentralizedStableCoin.sol";
import {HelperConfig} from "../../script/HelperConfig.s.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract OpenInvariantsTest is StdInvariant, Test {
    DeployDSC deployer;
    DSCEngine dsce;
    HelperConfig config;
    address weth;
    address wbtc;

    function setUp() external {
        deployer = new DeployDSC();
        (dsc,dsc,config) = deployer.run();
        (,, weth, wbtc,) = config.activeNetworkConfig();
        targetContract(address(dsce));
    }

    function invariant_protocolMustHaveMoreValueThanTotalSupply() public view{
        //get the value of all the collateral in the protocol
        //compare it to all the debt (dsc)
        uint256 totalSupply = dsc.totalSupply();
        uint256 totalWethDeposited = IERC20(weth).balanceOf(address(dsce));
        uint256 totalBtcDeposited = IERC20(wbtc).balanceOf(address(dsce));

        uint256 wethValue = dsce.getUsdValue(weth, totalWethDeposited);
        uint256 wbtcValue = dsce.getUsdValue(wbtc, totalBtcDeposited);

        assert(wethValue + wbtcValue > totalSupply);
    }
```

Here, `totalSupply()` represents one such property that should always hold, geared towards maintaining the total supply of tokens.

Now, let's move on to the handlers file. The handlers help you make efficient test runs and avoid wastage, by ensuring the invariants are checked in a specific order.

For instance, if you want to test the deposit of a token, the handlers ensure that the token is approved before depositing; this helps to avoid a wasted test run.

### Using Invariant in Foundry

In the Foundry docs, we can see, the [invariant](https://book.getfoundry.sh/forge/invariant-testing) section allows you to

- set the total number of `runs` for a test.
- specify `depth`, representing the number of calls in a single run.
- use `fail_on_revert`, to indicate whether the test should fail upon encountering a revert.

We can include the following in our `foundry.toml`:

```js
[invariant];
runs = 128;
depth = 128;
fail_on_revert = true;
```

Let's dissect the `fail_on_revert` keyword a bit further. By setting it to false, the test runner tolerates transaction reverts without causing the entire test run to fail. This is useful when you're first getting started or dealing with larger and more complex systems, where not all calls might make sense. This aligns better with the spirit of fuzz testing, where the tests can make wild attempts at breaking the invariants and those that fail with a revert are quietly ignored.

On the other hand, if set to true, any transaction that reverts is immediately flagged as a test failure. This is useful when you want a stricter assertion of behavioral norms and to quickly identify the condition that’s causing the revert.

Here's some free advice for you: don't get overly excited if your tests pass initially. Instead, aim to find issues, by increasing the number of runs and depth, thus giving our fuzz testing more opportunities to find any hidden bugs.

You're also likely to find calls that reverted in the process, which should ring some alarm bells and prompt you to look into what could have caused these to fail. This is a easier job with `fail_on_revert: true`.

The reason for most reverts is that the fuzz may have tested a function with random values that didn't make sense in that context. To prevent such erroneous testing, this is where handlers come knocking once more, as they ensure your functions are called with values in the correct order and format.

## In Conclusion, Invariance and Handlers are Your Allies

The benefit of working with handlers is that they guide the testing process in a way that makes sense within the context of your protocol, unlike traditional fuzz testing which can end up causing a multitude of function calls in random and improbable combinations.

So, one of our key takeaways from this deep dive into advanced testing practices is the utility and effectiveness of invariant testing with handlers. As our contract systems become more complex, traditional methods of fuzz testing become increasingly inefficient and can lead to significantly wastage.

So let's embrace the utility of handlers and tailor our testing specifically to the nuances of our contracts to get the most out of the process and shine a light on any hidden bugs that may be lurking in the shadows.

I hope this guide sheds some light on fuzz and invariant testing, their upsides, and downsides, and how to get started writing such tests. I’ll love to hear how implementing these testing strategies work out for you. Keep coding!
