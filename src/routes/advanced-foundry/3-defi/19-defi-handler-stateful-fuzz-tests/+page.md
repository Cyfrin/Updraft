---
title: Handler Fuzz Tests
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://youtube.com/embed/FVYrIeMcCVY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Smart Contract Fuzz Testing: Crafting Handlers for Optimized Valid Calls

Software fuzz testing employs a variety of techniques, one of which is handling functions in a manner to ensure valid calls. This section takes you on a comprehensive examination on how to create handlers for smart contracts that will allow you to make valid calls and scan for potential vulnerabilities in your contracts.

## Establishing the Groundwork

In simple terms, handlers are scripts we create that handle the way we make calls to the Decentralized Stablecoin Engine (`dsce`) - only enabling calls under the condition that the required variables or functions for the call are available and valid.

This minimizes the chance of wasted function calls which attempt to execute tasks with no valid foundation.

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test} from "forge-std/Test.sol";
import {DSCEngine} from "../../src/DSCEngine.sol";
import {DecentralizedStableCoin} from "../../src/DecentralizedStableCoin.sol";

contract Handler is Test {
    DSCEngine dsce;
    DecentralizedStablecoin dsc;

    constructor(DSCEngine _dscEngine, DecentralizedStablecoin _dsc) {
        dsce = _dsce;
        dsc = _dsc;
        }
}
```

To make sure we generate valid calls, we consider several factors. For instance, there's no logic in calling the 'redeemCollateral' function when there is no collateral to redeem. The handler-script becomes a fail-safe mechanism to avoid such redundancies.

## Handling Function Calls

To guard against invalid random calls, we define how to make function calls in the handler. For example, the `depositCollateral` function should first validate the collateral before calling it.

```js
...
contract Handler is Test {
    ...
    function depositCollateral(address collateral, uint256 amountCollateral) public {
        dsce.depositCollateral(collateral, amountCollateral);
    }
}
```

We need to adjust our `Invariants.t.sol` script to leverage the handler contract we're creating. To do this, we change the target contract the test script is referencing for it's fuzz testing:

```js
...
import {Handler} from "./Handler.t.sol";
...
contract OpenInvariantsTest is StdInvariant, Test {
    DeployDSC deployer;
    DSCEngine dsce;
    HelperConfig config;
    address weth;
    address wbtc;
    Handler handler;

    function setUp() external {
        deployer = new DeployDSC();
        (dsc,dsc,config) = deployer.run();
        (,, weth, wbtc,) = config.activeNetworkConfig();
        handler = new Handler(dsce,dsc);
        targetContract(address(handler));
    }
...
```

Now, when we run our invariant tests, they will target our `Handler` and only call the functions we've specified within the `Handler` contract, in this case `depositCollateral`. However, the function is still being called randomly, with random data and we can do better. We know that random data for the collateral addresses is going to fail, so we can mitigate unnecessary calls be providing our function with seed addresses:

```js
...
import {ERC20Mock} from "@openzeppelin/contracts/mocks/ERC20Mock.sol";
...
contract Handler is Test {
    ...
    ERC20Mock weth;
    ERC20Mock wbtc;
    ...
    constructor (DSCEngine _dscEngine, DecentralizedStableCoin _dsc){
        dsce = _dsce;
        dsc = _dsc;

        address[] memory collateralTokens = dsce.getCollateralTokens();
        weth = ERC20Mock(collateralTokens[0]);
        wbtc = ERC20Mock(collateralToken[1]);
    }

    function depositCollateral(uint256 collateralSeed, uint256 amountCollateral) public {
        ERC20Mock collateral = _getCollateralFromSeed(collateralSeed)
        dsce.depositCollateral(address(collateral), amountCollateral);
    }

    // Helper Functions
    function _getCollateralFromSeed(uint256 collateralSeed) private view returns (ERC20Mock){
        if (collateralSeed % 2 == 0){
            return weth;
        }
        return wbtc;
    }
}
```

Whew, that's a lot! Now when we call the tests in our handler, the `depositCollateral` functon will only use valid addressed for collateral provided by our `_getCollateralFromSeed()` function

## Improving Efficiency

The key to handling function calls is efficiency. Unnecessary or invalid function calls increase iteration loops, resulting in performance issues.

As you gradually cut down on unnecessary calls, monitor your error reports. Configuring the `failOnRevert` parameter to `true` helps you identify why a test is failing.

Lastly, remember not to artificially narrow down your handler function to a state where valid edge cases get overlooked.

<img src="/foundry-defi/19-defi-handler-stateful-fuzz-tests/defi-handler-stateful-fuzz-tests1.PNG" style="width: 100%; height: auto;">

## Wrapping Up

In conclusion, the vital role of handler-functions in making valid calls during fuzz testing is to optimize performance and catch potential vulnerabilities in the smart contracts. The process demands a continuous balance between weeding out invalid calls and maintaining allowance for valid edge cases.

However, always aim for a minimal rejection rate i.e., the `failOnRevert` parameter set to `false`. A perfect handler function will maximize successful runs and reduce reverts to zero.

You may need to adjust the deposit size to a feasible limit to prevent an overflow when depositing collateral. Ideally, the collateral deposited is lower than the maximum valid deposit size. After completion, every function call should pass successfully, signifying a well-secured contract with high potential for longevity.

Happy testing!
