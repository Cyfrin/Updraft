## Open-Based Fuzz (Invariant) Tests

Alright, let's delve into writing some stateful fuzz tests, also known as invariant tests, in Foundry. This is a way to add more confidence that our code will do what we want it to do.

We can use the Foundry docs for help. Under tests, we can go all the way to invariant testing to have a more advanced way to do the fuzz tests.

The most basic methodology is something called "Open Testing". To work with fuzz or invariant tests in our foundry.toml file, we can add the code:
```toml
[invariant]
runs = 128
depth = 128
fail_on_revert = false
```
We'll explore target contracts a bit later, but first we have some settings in our toml file such as number of runs which is how many times a sequence of function calls is generated. We can also set the depth or amount of function calls in a single run. And finally, we can tell Foundry whether or not to `fail_on_revert`.

To do this, we create a new folder under the `test` folder. We'll call this folder `fuzz`. Inside we can create two new solidity files called `InvariantsTest.t.sol` and `Handler.t.sol`.

Inside of `InvariantsTest.t.sol`, we will keep our properties, and the Handler will narrow down the way we call the functions to prevent wasted runs.

We can start with:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";

contract InvariantsTest is StdInvariant, Test {
    
}
```

To create some invariant tests, let's create a new folder called "fuzz".

Within this folder, we're going to need to create two different solidity files. We're going to call `InvariantsTest.t.sol` and `Handler.t.sol`. Let's have our invariants, AKA properties, hold true for all times.

A handler is going to narrow down the way we call functions so that we don't waste runs.

First we'll open `InvariantsTest.t.sol` and include the following:

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

contract OpenInvariantsTest is StdInvariant, Test {
    DeployDSC deployer;
    DSCEngine dsce;
    DecentralizedStableCoin dsc;
    HelperConfig config;

    function setUp() external {
        deployer = new DeployDSC();
        (dsc, dsce, config) = deployer.run();

        (, address weth,, address wbtc,) = config.activeNetworkConfig();

        IERC20(weth);
        IERC20(wbtc);
        
        vm.label(address(dsce), "DSCEngine");
        vm.label(address(dsc), "DecentralizedStableCoin");

    }

    // Have our invariant aka properties hold true for all time
    function invariant_protocolMustHaveMoreValueThanTotalSupply() public view {
        // get the value of all the collateral in the protocol
        // compare it to all the debt (DSC)
        uint256 totalSupply = dsc.totalSupply();
        
        uint256 wethValue = dsce.getUsdValue(weth, IERC20(weth).balanceOf(address(dsce)));
        uint256 wbtcValue = dsce.getUsdValue(wbtc, IERC20(wbtc).balanceOf(address(dsce)));

        uint256 totalValue = wethValue + wbtcValue;

        console.log("weth value: ", wethValue);
        console.log("wbtc value: ", wbtcValue);
        console.log("total supply: ", totalSupply);
        assert(wethValue + wbtcValue >= totalSupply);
    }
}
```

```bash
forge test -m invariant_protocolMustHaveMoreValueThanTotalSupply -vv
```

```bash
forge test -m Invariant_protocolMustHaveMoreValueThanTotalSupply -vv
```

If we set the `fail_on_revert` to `true`, this may give us some piece of mind, but can create other issues. With `fail_on_revert = false`, we can quickly write an invariant test, however it becomes hard to make sure all the calls we're making actually make sense. So for more simple contracts, the `fail_on_revert` may make sense, but not as much for more complex contracts.