---
title: Handler - Deposit Collateral
---

_Follow along the course with this video._

---

### Handler - Redeeming Collateral

Ok! In this lesson we're going to adjust the code in our Invariants.t.sol such that our tests are more focused by being routed through a handler contract. In so doing, our tests will have a more sensible order of functions to call and more contextually relevant random data.

We'll start by creating the Handler.t.sol contract.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

import {Test} from "forge-std/Test.sol";

contract Handler is Test {}
```

So, what's one of the first things we want to ensure in our handler? How about we tell our framework not to call redeemCollateral unless there's collateral available to redeem. Sounds like a sensible condition.

Because our test function calls are being routed through our Handler, the first thing we should do is make sure our Handler has access to the contracts it'll need to call functions on. Let's import DSCEngine and DecentralizedStableCoin then set these up in our Handler's constructor

```solidity
// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

import {Test} from "forge-std/Test.sol";
import {DSCEngine} from "../../src/DSCEngine.sol";
import {DecentralizedStableCoin} from "../../src/DecentralizedStableCoin.sol";

contract Handler is Test {
    DSCEngine dsce;
    DecentralizedStableCoin dsc;

    constructor(DSCEngine _engine, DecentralizedStableCoin _dsc) {
        dsce = _engine;
        dsc = _dsc;
    }
}
```

We know that before `redeemCollateral` is a valid function call, collateral would need to be deposited, so let's begin with writing a `depositCollateral` function. This will work a little differently from our previous fuzz tests, but we're still able to pass arguments to this function which will be randomized by the fuzzer.

```solidity
function depositCollateral(uint256 collateral, uint256 amountCollateral) public {
    dsce.depositCollateral(collateral, amountCollateral);
}
```

Now, the function above is going to fail, and it's going to fail for the same reason our last fuzzing test failed, the `collateral` argument is going to be randomized to a bunch of unauthorized token addresses! In addition to this, `amountCollateral` could _also_ break, because `depositCollateral` reverts on zero!

Despite these issues, let's adjust our Invariants.t.sol and try this out.

Within Invariants.t.sol, import our new Handler contract, declare it, and then set our target to `address(handler)`. Now, if we run our test again, it's going to call only the functions available to our handler.

<details>
<summary>Invariants.t.sol</summary>

```solidity
// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

import {Test, console} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {DeployDSC} from "../../script/DeployDSC.s.sol";
import {DSCEngine} from "../../src/DSCEngine.sol";
import {DecentralizedStableCoin} from "../../src/DecentralizedStableCoin.sol";
import {HelperConfig} from "../../script/HelperConfig.s.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract InvariantsTest is StdInvariant Test {
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

        uint256 wethValue = dsce.getUsdValue(weth, totalWethDeposited);
        uint256 wbtcValue = dsce.getUsdValue(wbtc, totalWbtcDeposited);

        console.log("totalSupply: ", totalSupply);
        console.log("wethValue: ", wethValue);
        console.log("wbtcValue: ", wbtcValue);

        assert(wethValue + wbtcValue >= totalSupply);
    }
}
```

</details>


We can see this fails for the expected reasons below.

![defi-handler-redeem-collateral1](/foundry-defi/20-defi-handler-deposit-collateral/defi-handler-redeem-collateral1.png)

Let's use our Handler to ensure that only _valid_ collateral is deposited. Begin by importing ERC20Mock as we'll need this for our collateral types. In our constructor, we can leverage the getCollateralTokens function added to DSCEngine.sol.

```solidity
...
import {ERC20Mock} from "@openzeppelin/contracts/mocks/ERC20Mock.sol";

contract Handler is Test {
    DSCEngine dsce;
    DecentralizedStableCount dsc;

    ERC20Mock weth;
    ERC20Mock wbtc;

    constructor(DSCEngine _engine, DecentralizedStableCoin _dsc) {
        dsce = _engine;
        dsc = _dsc;

        address[] memory collateralTokens = dsce.getCollateralTokens();
        weth = ERC20Mock(collateralTokens[0]);
        wbtc = ERC20Mock(collateralTokens[1]);
    }
```

With these, instead of passing any address as collateral to our depositCollateral functional, we can instead pass a uint256 collateralSeed. We'll next write a function which picks a collateral to deposit from our valid options based on the seed our framework supplies.

```solidity
// Helper Functions
function _getCollateralFromSeed(uint256 collateralSeed) private view returns (ERC20Mock){
    if(collateralSeed % 2 == 0){
        return weth;
    }
    return wbtc;
}
```

Now, in our depositCollateral function, we can derive which collateral token should be used by calling this function and passing the random seed our framework supplies the test.

```solidity
function depositCollateral (uint256 collateralSeed, uint256 amountCollateral) public {
    ERC20Mock collateral = _getCollateralFromSeed(collateralSeed);
    dsce.depositCollateral(address(collateral), amountCollateral);
}
```

Now our test should only call this Handler function with valid collateral addresses! Let's run it and see what happens.

```bash
forge test --mt invariant_ProtocolTotalSupplyLessThanCollateralValue -vvvv
```

![defi-handler-redeem-collateral2](/foundry-defi/20-defi-handler-deposit-collateral/defi-handler-redeem-collateral2.png)

Look! Our address passed is valid, but we're getting a different error `DSCEngine__NeedsMoreThanZero()`. This is actually great progress and shows we've accounted for at least some of the causes of our reverts.

![defi-handler-redeem-collateral3](/foundry-defi/20-defi-handler-deposit-collateral/defi-handler-redeem-collateral3.png)

Let's keep narrowing the focus of our tests and the validity of our data.

> ❗ **IMPORTANT**
> Be careful when configuring fail*on_revert to be true \_or* false. Sometimes we risk narrowing our tests too much with our Handler that we miss edge cases.

In the same way we narrowed our test to provide a valid collateral type, we can bind the `amountCollateral` being passed to our function in order to ensure this is greater than 0 and avoid this error. StdUtils has a function we can use called `bound`.

```solidity
function depositCollateral (uint256 collateralSeed, uint256 amountCollateral) public {
    amountCollateral = bound(amountCollateral, 1, MAX_DEPOSIT_SIZE);
    ERC20Mock collateral = _getCollateralFromSeed(collateralSeed);
    dsce.depositCollateral(address(collateral), amountCollateral);
}
```

We can declare a MAX_DEPOSIT_SIZE constant at the top of our contract. I like to set this to something like type(uint96).max. This will provide a huge number without risking the overflow possible with uint256.

```solidity
uint256 MAX_DEPOSIT_SIZE = type(uint96).max;
```

![defi-handler-redeem-collateral4](/foundry-defi/20-defi-handler-deposit-collateral/defi-handler-redeem-collateral4.png)

Not a massive change, but we _have_ made progress on the number of reverts our function it hitting. Running the test again with `fail_on_revert` set to true should reveal what's causing our reverts now.

![defi-handler-redeem-collateral5](/foundry-defi/20-defi-handler-deposit-collateral/defi-handler-redeem-collateral5.png)

Well, of course this is going to revert! We haven't set an allowance on our tokens! Let's remedy this by leveraging vm.prank in our Handler to ensure appropriate addresses are approved for our deposit function.

```solidity
function depositCollateral(uint256 collateralSeed, uint256 amountCollateral) public {
    amountCollateral = bound(amountCollateral, 1, MAX_DEPOSIT_SIZE);
    ERC20Mock collateral = _getCollateralFromSeed(collateralSeed);

    // mint and approve!
    vm.startPrank(msg.sender);
    collateral.mint(msg.sender, amountCollateral);
    collateral.approve(address(engine), amountCollateral);

    engine.depositCollateral(address(collateral), amountCollateral);
    vm.stopPrank();
}
```

### Wrap Up

If we run our test now...

![defi-handler-redeem-collateral6](/foundry-defi/20-defi-handler-deposit-collateral/defi-handler-redeem-collateral6.png)

Woah! We eliminated **_all_** of the situations that were causing our test to revert! This means we're using our fuzz runs much more efficiently, and no matter how often depositCollateral is called, our totalCollateral will never be less than our totalSupply.

...now, obviously this is the case. We've not written any means for our Handler to mint DSC, so our totalSupply is always zero!

We're going to fix this in the next lesson. See you there!
