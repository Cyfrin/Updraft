---
title: Handler Fuzz Tests
---

_Follow along the course with this video._

---

### Handler Fuzz Tests

Now that we've spent time investigating the types of tests available to us, and the strength of methodologies like fuzzing for protocols, we're going to build out our own `Stateful Fuzz Testing` suite for `DecentralizedStableCoin`.

Navigate to the [**Fuzz Testing section**](https://book.getfoundry.sh/forge/fuzz-testing) in the Foundry Docs to read more on advanced fuzz testing within this framework.

In our previous fuzz testing examples, we were demonstrating "open testing". This kinda gives control to the framework and allows it to call any functions in a contract randomly, in a random order.

More advanced fuzz tests implement [`handler based testing`](https://book.getfoundry.sh/forge/invariant-testing#handler-based-testing).

Larger protocols will have so many functions available to them that it's important to narrow the focus of our tests for a better chance to find our bugs. This is where handlers come in. They allow us to configure aspects of a contract's state before our tests are run, as well as set targets for the test functions to focus on.

In the example provided by the Foundry Docs, we can see how the functionality of the deposit function can be fine tuned to assure that approvals and mints always occur before deposit is actually called.

```solidity
function deposit(uint256 assets) public virtual {
    asset.mint(address(this), assets);

    asset.approve(address(token), assets);

    uint256 shares = token.deposit(assets, address(this));
}

```

To illustrate, as show in the Foundry Docs as well, open testing has our framework calling functions directly as defined in the contracts within scope.

![defi-handler-stateful-fuzz-tests1](/foundry-defi/19-defi-handler-stateful-fuzz-tests/defi-handler-stateful-fuzz-tests1.PNG)

Conversely, handler based tests route our frameworks function calls through our handler, allowing us to configure only the functions/behaviour we want it to perform, filtering out bad runs from our tests.

![defi-handler-stateful-fuzz-tests2](/foundry-defi/19-defi-handler-stateful-fuzz-tests/defi-handler-stateful-fuzz-tests2.png)

Let's finally start applying this methodology to our code base.

### Setup

The first thing we want to do to prepare our stateful fuzzing suite is to configure some of the fuzzer options in our `foundry.toml`.

```toml
[invariant]
runs = 128
depth = 128
fail_on_revert = false
```

Adding the above to our foundry.toml will configure our fuzz tests to attempt `128 runs` and make `128 calls` in each run (depth). We'll go over `fail_on_revert` in more detail soon.

Next, create the directory `test/fuzz`. We'll need to create 2 files within this folder, `InvariantsTest.t.sol` and `Handler.t.sol`.

`InvariantsTest.t.sol` will ultimately hold the tests and the invariants that we assert, while the handler will determine how the protocol functions are called. If our fuzzer makes a call to `depositCollateral` without having minted any collateral, it's kind of a wasted run. We can filter these with an adequate handler configuration.

Before writing a single line of our invariant tests we need to ask the question:

**_What are the invariants of my protocol?_**

We need to ascertain which properties of our system must always hold. What are some for `DecentralizedStableCoin`?

1. The total supply of DSC should be less than the total value of collateral
2. Getter view functions should never revert

I challenge you to think of more, but these are going to be the two simple invariants we work with here.

### InvariantsTest.t.sol

This file will be setup like any other test file to start, we've lots of practice here.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";

contract InvariantsTest is StdInvariant, Test {}
```

StdInvariant is quite important for our purposes, this is where we derive the ability to set a `targetContract` which we point to our Handler.

Again, just like the tests we've written so far, we're going to begin with a `setUp` function. In this setUp we'll perform our usual deployments of our needed contracts via our deployment script. We'll import our `HelperConfig` as well.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {DeployDSC} from "../../script/DeployDSC.s.sol";
import {DSCEngine} from "../../src/DSCEngine.sol";
import {DecentralizedStableCoin} from "../../src/DecentralizedStableCoin.sol";
import {HelperConfig} from "../../script/HelperConfig.s.sol";

contract InvariantsTest is StdInvariant, Test {
    DeployDSC deployer;
    DSCEngine dsce;
    DecentralizedStableCoin dsc;
    HelperConfig config;

    function setUp() external {
        deployer = new DeployDSC();
        (dsc, dsce, config) = deployer.run();
    }
}
```

From this point, it's very easy for us to wrap this up quickly with an Open Testing methodology. All we would need to do is set our `targetContract` to our `DSCEngine (dsce)`, and then declare an invariant in our test function.

In order to test the invariant that our collateral value must always be more than our total supply, we can leverage our `HelperConfig` to acquire the collateral addresses, and check the total balance of each collateral type within the protocol. That would look something like this (don't forget to import your `IERC20 interface` for these tokens):

```solidity
...
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
...
contract InvariantsTest is StdInvariant, Test {
    DeployDSC deployer;
    DSCEngine dsce;
    DecentralizedStableCoin dsc;
    HelperConfig config;
    address weth;
    address wbtc;

    function setUp() external {
        deployer = new DeployDSC();
        (dsc, dsce, config) = deployer.run();
        (,,weth, wbtc, ) = config.activeNetworkConfig();
        targetContract(address(dsce));
    }

    function invariant_protocolMustHaveMoreValueThanTotalSupply() public view {
        uint256 totalSupply = dsc.totalSupply();
        uint256 totalWethDeposited = IERC20(weth).balanceOf(address(dsce));
        uint256 totalWbtcDeposited = IERC20(wbtc).balanceOf(address(dsce));
    }
}
```

To this point our test function is only acquiring the balanced of our collateral tokens, we'll need to convert this to it's USD value for a sound comparison to our DSC total supply. We can do this with our `getUsdValue` function!

```solidity
function invariant_protocolMustHaveMoreValueThanTotalSupply() public view {
    uint256 totalSupply = dsc.totalSupply();
    uint256 totalWethDeposited = IERC20(weth).balanceOf(address(dsce));
    uint256 totalWbtcDeposited = IERC20(wbtc).balanceOf(address(dsce));

    uint256 wethValue = dsce.getUsdValue(weth, totalWethDeposited);
    uint256 wbtcValue = dsce.getUsdValue(wbtc, totalWbtcDeposited);
}
```

And now, all we would need to do is add our assertion.

```solidity
assert(wethValue + wbtcValue > totalSupply);
```

With this in place our open invariant test is ready! Try to run it.

> ❗ **PROTIP**
> Import `console` and add `console.log("Weth Value: ", wethValue)`, `console.log("Wbtc Value: ", wbtcValue)`, `console.log("Total Supply: ", totalSupply)` for more clear readouts from your test.

```bash
forge test --mt invariant_protocolMustHaveMoreValueThanTotalSupply -vvvv
```

![defi-handler-stateful-fuzz-tests3](/foundry-defi/19-defi-handler-stateful-fuzz-tests/defi-handler-stateful-fuzz-tests3.png)

Our test identified a break in our assertion immediately.. but it's because we have no tokens or collateral. We can adjust our assertion to be `>=`, but it's a little bit cheaty.

```solidity
assert(wethValue + wbtcValue >= totalSupply);
```

![defi-handler-stateful-fuzz-tests4](/foundry-defi/19-defi-handler-stateful-fuzz-tests/defi-handler-stateful-fuzz-tests4.png)

Things pass! We didn't find any issues. This is where we may want to bump up the number of runs we're performing, you can see in the image above our fuzzer executed `128 runs` and `16,384 function calls`. If we bump this up to `1000 runs`, our fuzz test will be more thorough, but will take much longer to run. Try it out!

![defi-handler-stateful-fuzz-tests5](/foundry-defi/19-defi-handler-stateful-fuzz-tests/defi-handler-stateful-fuzz-tests5.png)

Things pass again, but you can see how much more intense the test process was. There's a catch, however. In the image above, notice how many calls were made vs how many times a function call reverted. Every single call is reverting! This in essence means that our test wasn't able to _do_ anything. This is not a very reassuring test.

The reason our test is still passing, despite all these reverts is related to the `fail_on_revert` option we touched on in our `foundry.toml`. If we adjust this to `true` we'll see that our test fails right away.

**_Why are all the calls reverting?_**

Without any guidance, Foundry is going to throw truly random data at the function calls. For example, our `depositCollateral` function is only configured to accept the two authorized tokens for our protocol, wbtc and weth, the fuzzer could be calling this function with thousands of invalid addresses.

fail_on_revert can be great for quick testing and keeping things simple, but it can be difficult to narrow the validity of our runs when this is set to `false`.

Let's set this option to `true` and run our test once more.

![defi-handler-stateful-fuzz-tests6](/foundry-defi/19-defi-handler-stateful-fuzz-tests/defi-handler-stateful-fuzz-tests6.png)

We can see the first function being called by the fuzzer is `depositCollateral` and its passing a random `tokenAddress` argument causing our revert immediately.

![defi-handler-stateful-fuzz-tests7](/foundry-defi/19-defi-handler-stateful-fuzz-tests/defi-handler-stateful-fuzz-tests7.png)

### Wrap Up

We've just done a quick run down on Open Invariant tests for our `DecentralizedStableCoin` protocol, but we've seen some limitations of letting the fuzzer determine how to behave and which functions to call.

We can do better.

For now, rename `test/fuzz/InvariantsTest.t.sol` to `test/fuzz/OpenInvariantsTest.t.sol`, and comment the whole file out. Create a _new_ file `test/fuzz/Invariants.t.sol`. Copy over OpenInvariants.t.sol into this new file and uncomment. Rename the contract to `Invariants`. We'll be leveling this up soon.

In the next lesson, we'll go over how we can use our `Handler` as the target of our tests to focus which functions in our protocol are called and how. By guiding our tests in this way, we'll be able to assure fewer runs reverts and more valid function calls are made.

See you in the next one!
