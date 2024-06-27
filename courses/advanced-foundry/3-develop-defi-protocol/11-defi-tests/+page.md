---
title: Tests
---

_Follow along the course with this video._



# Developing Unit Tests for Smart Contracts using Deploy Scripts

Hello, developers! In the process of writing our smart contracts, it's incredibly crucial that we have a comprehensive testing suite. Recently, I came across a method that could potentially streamline your testing process. By incorporating the use of deploy scripts into the creation of our unit tests, we can test as we write our code, thereby making the entire development process much smoother. Intrigued yet? Let's dive right in!

## Starting with Preliminaries: DSCEngine Test

Before we can begin testing, let's first establish why we are doing this in the first place. If you recall, our DSCEngine has a series of functions that we must validate. Functions such as `getUsdValue`, `getAccountCollateralValue` are crucial to check. Moreover, we also need to ensure that Minting, the constructor, and depositing work effectively.

As we embark on testing these functions, we will concurrently write tests and deploy scripts to ensure that glaring mistakes are spotted immediately—ideally reducing the need to refactor or rewrite code. The biggest advantage here is that an improved confidence in the correctness of your code can directly speed up your coding process.

We'll start by setting up the `DSCEngineTest.t.sol` contract.

```javascript
//SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
import {Test} from "forge-std/Test.sol";


Contract DSCEngineTest is Test {

}
```

In the function `setUp`, we'll need to deploy our contract. We do this by importing `DeployDSC` from the `DeployDSC.s.sol` file and then creating a new instance of `DeployDSC` called `deployer`. On top of that, we'll also need to import the `DecentralizedStableCoin` and `DSCEngine` contracts from their respective solidity files.

```javascript
//SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
import {Test} from "forge-std/Test.sol";
import {DeployDSC} from "../../script/DeployDSC.s.sol";
import {DSCEngine} from "../../src/DSCEngine.sol";
import {DecentralizedStableCoin} from "../../src/DecentralizedStableCoin.sol";
import {HelperConfig} from "../../script/HelperConfig.s.sol";


Contract DSCEngineTest is Test {
    DeployDSC deployer;
    DecentralizedStableCoin dsc;
    DSCEngine dsce;
    HelperConfig config;

    function setUp() public {
        deployer = new DeployDSC();
        (dsc, dsce, config) = deployer.run();
    }
}
```

Please note: It is pretty handy to use GitHub copilot or any AI that you prefer to assist in these scenarios.

## Establishing the First Test: Price Feeds

With our contract now set up, let's move on to creating the first actual test. Here, we want to validate our `getUsdValue` function.

```javascript
function testGetUsdValue() public {
    //Test goes here//
}
```

For this particular test, we need to pass a token address and an amount. We can easily fetch these tokens from our `helperConfig`. Also, let's handle the `ethUsdPriceFeed` and `weth` at this stage.

```javascript
Contract DSCEngineTest is Test {
    DeployDSC deployer;
    DecentralizedStableCoin dsc;
    DSCEngine dsce;
    HelperConfig config;
    address ethUsdPriceFeed;
    address weth;

    ...

}

```

In the `setUp` function, we'll get the `weth` and `ethUsdPriceFeed` addresses from the HelperConfig, like so:

```javascript
    (ethUsdPriceFeed,, weth,,) = config.activeNetworkConfig();
```

Next, let's calculate the expected USD value assuming that there are 15 ETH, each priced at $2,000. The calculation would be simple: `15ETH * $2000 per ETH = $30,000`. Afterward, we call the `getusdvalue` function on the DSC engine and compare the expected and actual USD amounts. The test function should look something like this:

```javascript
    function testGetUsdValue() public {
        uint256 ethAmount = 15e18;
        // 15e18 ETH * $2000/ETH = $30,000e18
        uint256 expectedUsd = 30000e18;
        uint256 usdValue = dsce.getUsdValue(weth, ethAmount);
        assertEq(usdValue, expectedUsd);
    }
```

We can run this test by using the following command in our terminal:

```bash
forge test -mt testGetUsdValue
```

...and if everything went smoothly, it should pass! Great work!

The previous section might appear as lots of steps for a single test, but I have found this approach of integrating my deploy scripts into my test suite from the beginning quite helpful. However, depending on your project needs, you may choose to use them as integration tests.

## Dealing with Depositing Collateral

With our first test written and running fine, let's shift our focus to the next critical function, `depositCollateral`. For this test, we'll imitate a user and deposit collateral. Here, we are taking advantage of the prank functionality to temporarily modify the global state.

```javascript
    function testRevertsIfCollateralZero() public {
        vm.startPrank(user);
        ERC20Mock(weth).approve(address(dsce), amountCollateral);

        vm.expectRevert(DSCEngine.DSCEngine__NeedsMoreThanZero.selector);
        dsce.depositCollateral(weth, 0);
        vm.stopPrank();
    }
```

Thinking about it, we may want to mint the user some weth. As this could be used in more than one test, it would be efficient to do this right in the setup. Doing this in the setup ensures that it won't have to be performed for every single test. Don't forget to import `ERC20Mock` from OpenZeppelin for this.

Import

```javascript
import { ERC20Mock } from "@openzeppelin/contracts/mocks/ERC20Mock.sol";
```

setUp

```javascript
    uint256 amountCollateral = 10 ether;
    uint256 public constant STARTING_USER_BALANCE = 10 ether;

    function setUp() external {
        DeployDSC deployer = new DeployDSC();
        (dsc, dsce, helperConfig) = deployer.run();
        (ethUsdPriceFeed, btcUsdPriceFeed, weth, wbtc, deployerKey) = helperConfig.activeNetworkConfig();

        ERC20Mock(weth).mint(user, STARTING_USER_BALANCE);
        ERC20Mock(wbtc).mint(user, STARTING_USER_BALANCE);
    }
```

For now, I am content with these tests. However, eventually, we will likely need a test for collateral being deposited into these data structures. Then again, testing is a continuous process. As you write your code, keep writing tests and _don't stop_. Remember, there isn't an absolute, singular process that works for all, but experimenting and finding what works for you is the key.

I hope you enjoyed this in-depth tutorial on writing unit tests for your smart contracts using deploy scripts. Incorporating these practices can significantly aid you in constructing robust, error-free smart contracts. Experience the difference today! Happy coding!

<img src="/foundry-defi/11-defi-tests/defi-tests1.PNG" style="width: 100%; height: auto;">
