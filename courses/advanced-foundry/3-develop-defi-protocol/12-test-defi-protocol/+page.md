---
title: Tests
---

_Follow along the course with this video._

---

### Tests

Welcome back! We've added a tonne of functions to our `DSCEngine.sol`, so we're at the point where we want to perform a sanity check and assure everything is working as intended so far.

In the last lesson, we set up a deploy script as well as a `HelperConfig` to assist us in our tests. Let's get started!

Create `test/unit/DSCEngine.t.sol` and begin with the boilerplate we're used to. We know we'll have to import our deploy script as well as `Test`, `DecentralizedStableCoin.sol`, and `DSCEngine.sol`.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import { DeployDSC } from "../../script/DeployDSC.s.sol";
import { DSCEngine } from "../../src/DSCEngine.sol";
import { DecentralizedStableCoin } from "../../src/DecentralizedStableCoin.sol";
import { Test, console } from "forge-std/Test.sol";

contract DSCEngineTest is Test {

}
```

Declare our contract/script variables, then in our `setUp` function, we're going to need to deploy our contracts using our `DeployDSC` script.

```solidity
contract DSCEngineTest is Test {
    DeployDSC deployer;
    DecentralizedStableCoin dsc;
    DSCEngine dsce;

    function setUp() public {
        deployer = new DeployDSC();
        (dsc, dsce) = deployer.run();
    }
}
```

I think a good place to start will be checking some of our math in `DSCEngine`. We should verify that we're pulling data from our price feeds properly and that our USD calculations are correct.

```solidity
/////////////////
// Price Tests //
/////////////////

function testGetUsdValue() public {}
```

The `getUsdValue` function takes a token address and an amount as a parameter. We could import our mocks for reference here, but instead, let's adjust our `DeployDSC` script to also return our `HelperConfig`. We can acquire these token addresses from this in our test.

```solidity
contract DeployDSC is Script {
    ...

    function run() external returns (DecentralizedStableCoin, DSCEngine, HelperConfig) {
        HelperConfig config = new HelperConfig();

        (address wethUsdPriceFeed, address wbtcUsdPriceFeed, address weth, address wbtc, uint256 deployerKey) = config.activeNetworkConfig();

        tokenAddresses = [weth, wbtc];
        priceFeedAddresses = [wethUsdPriceFeed, wbtcUsdPriceFeed];

        vm.startBroadcast();
        DecentralizedStableCoin dsc = new DecentralizedStableCoin();
        DSCEngine engine = new DSCEngine(tokenAddresses, priceFeedAddresses, address(dsc));
        dsc.transferOwnership(address(engine));
        vm.stopBroadcast();
        return (dsc, engine, config);
    }
}
```

Now, back to our test. We'll need to do a few things in `DSCEngineTest.t.sol`.

- Import our `HelperConfig`
- Declare state variables for `HelperConfig`, weth and `ethUsdPriceFeed`
- Acquire the imported config from our `deployer.run` call
- Acquire `ethUsdPriceFeed` and weth from our `config`'s `activeNetworkConfig`

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import { DeployDSC } from "../../script/DeployDSC.s.sol";
import { DSCEngine } from "../../src/DSCEngine.sol";
import { DecentralizedStableCoin } from "../../src/DecentralizedStableCoin.sol";
import { HelperConfig } from "../../script/HelperConfig.s.sol";
import { Test, console } from "forge-std/Test.sol";

contract DSCEngineTest is Test {
    DeployDSC deployer;
    DecentralizedStableCoin dsc;
    DSCEngine dsce;
    HelperConfig config;
    address weth;
    address ethUsdPriceFeed;

    function setUp() public {
        deployer = new DeployDSC();
        (dsc, dsce, config) = deployer.run();
        (ethUsdPriceFeed, , weth, , ) = config.activeNetworkConfig();
    }
}
```

We're now ready to use some of these values in our test function. For our unit test, we'll be requesting the value of `15ETH`, or `15e18`. Our HelperConfig has the ETH/USD price configured at `$2000`. Thus we should expect `30000e18` as a return value from our getUsdValue function. Let's see if that's true.

```solidity
/////////////////
// Price Tests //
/////////////////

function testGetUsdValue() public {
    // 15e18 * 2,000/ETH = 30,000e18
    uint256 ethAmount = 15e18;
    uint256 expectedUsd = 30000e18;
    uint256 actualUsd = dsce.getUsdValue(weth, ethAmount);
    assertEq(expectedUsd, actualUsd);
}
```

When you're ready, let see how we've done!

```bash
forge test --mt testGetUsdValue
```

![defi-tests1](/foundry-defi/11-defi-tests/defi-tests1.PNG)

It works! We're clearly still on track. This is great. It's good practice to test things as you go to avoid getting too far down the rabbit-hole of compounding errors. Sanity checks along the way like this can save you time in having to refactor and change a bunch of code later.

Before moving on, we should write a test for our `depositCollateral` function as well. We'll need to import our `ERC20Mock` in order to test deposits, so let's do that now. We'll also need to declare a `USER` to call these functions with and amount for them to deposit.

```solidity
import {ERC20Mock} from "@openzeppelin/contracts/mocks/ERC20Mock.sol";

...

contract DSCEngineTest is Test {

    ...

    address public USER = makeAddr("user");
    uint256 public constant AMOUNT_COLLATERAL = 10 ether;

    ...

    /////////////////////////////
    // depositCollateral Tests //
    /////////////////////////////

    function testRevertsIfCollateralZero() public {}
}
```

Let's make sure our `USER` has some tokens minted to them in our `setUp`, they'll need them for several tests in our future.

```solidity
address public USER = makeAddr("user");
uint256 public constant AMOUNT_COLLATERAL = 10 ether;
uint256 public constant STARTING_ERC20_BALANCE = 10 ether;

function setUp public {
    deployer = new DeployDSC();
    (dsc, dsce, config) = deployer.run();
    (ethUsdPriceFeed, , weth, , ) = config.activeNetworkConfig();

    ERC20Mock(weth).mint(USER, STARTING_ERC20_BALANCE);
}
```

Our user is going to need to approve the `DSCEngine` contract to call `depositCollateral`. Despite this, we're going to deposit `0`. This _should_ cause our function call to revert with our custom error `DSCEngine__NeedsMoreThanZero`, which we'll account for with `vm.expectRevert`.

```solidity
 /////////////////////////////
// depositCollateral Tests //
/////////////////////////////

function testRevertsIfCollateralZero() public {
    vm.startPrank(USER);
    ERC20Mock(weth).approve(address(dsce), AMOUNT_COLLATERAL);

    vm.expectRevert(DSCEngine.DSCEngine__NeedsMoreThanZero.selector);
    dsce.depositCollateral(weth, 0);
    vm.stopPrank();
}
```

Let's run it!

```bash
forge test --mt testRevertsIfCollateralZero
```

![defi-tests2](/foundry-defi/11-defi-tests/defi-tests2.png)

### Wrap Up

I need to mention, there's no _correct_ way to write a contract. I personally am always writing test as I'm writing code. You don't have to write a deploy script for your tests right away either, I like to do this to set up my integration tests as early as possible.

It's important to find a process that works for you and stick to it.

These are some great basic tests to begin with, I'm content with these for now. In the next lesson we'll jump back into writing some more functions for our `DSCEngine.sol`.

See you soon!
