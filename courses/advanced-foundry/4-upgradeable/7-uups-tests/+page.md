---
title: UUPS Tests
---

_**Follow along with this video.**_



---

Welcome back friend we just created, deployed and upgraded our Box contract on previous lessons, today we are going to delve on good old tests to be sure everything works as expected.

## Setting up Our Testing Environment

We will be creating a new Sol file where we will write some initial tests called `DeployAndUpgradeTest`, to demonstrate the true power of smart contract upgrades. As we are working with Solidity 0.8.18, we’ll be importing a test from Forge's standard test.sol file. And the Standard imports as always, Code-wise, it will look something like this:

```js
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {DeployBox} from "../script/DepolyBox.s.sol";
import {UpgradeBox} from "../script/UpgradeBox.s.sol";
import {Test, console} from "forge-std/Test.sol";
import {StdCheats} from "forge-std/StdCheats.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import {BoxV1} from "../src/BoxV1.sol";
import {BoxV2} from "../src/BoxV2.sol";

contract DeployAndUpgradeTest is StdCheats, Test {}
```

<img src="/upgrades/7-tests/test1.png" style="width: 100%; height: auto;">


## Setting Up the Contract and Initial Tests

Next, we proceed with creating a function setup. This function will aim to prepare the environment for testing. In this setup function we will define a *deployBox*, *upgradeBox*, and an owner address.

```js
 function setUp() public {
        deployBox = new DeployBox();
        upgradeBox = new UpgradeBox();
    }
```

Now let's dive on the most basic test, check if the Box Works:

```js
function testBoxWorks() public {
        address proxyAddress = deployBox.deployBox();
        uint256 expectedValue = 1;
        assertEq(expectedValue, BoxV1(proxyAddress).version());
    }
```

## Implementing the Upgrade

In doing this, we will first define our *boxV2* and then proceed to upgrade *boxV1* to *boxV2* using our upgrade functionality. We will use assertions for these tests and validate whether the upgraded proxy now points to *boxV2*.

```js
  function testUpgradeWorks() public {
        address proxyAddress = deployBox.deployBox();

        BoxV2 box2 = new BoxV2();

        vm.prank(BoxV1(proxyAddress).owner());
        BoxV1(proxyAddress).transferOwnership(msg.sender);

        address proxy = upgradeBox.upgradeBox(proxyAddress, address(box2));

        uint256 expectedValue = 2;
        assertEq(expectedValue, BoxV2(proxy).version());

        BoxV2(proxy).setValue(expectedValue);
        assertEq(expectedValue, BoxV2(proxy).getValue());
    }
```

In the code above, we first deploy our new `boxV2` contract, then upgrade our `boxV1` to `boxV2` by pointing the existing proxy to `boxV2`. We then validate this through the `assertEqual` function.

Further, we also test whether functions that are unique to `boxV2` such as `setNumber` can be called on the updated `boxV2` through the proxy.

<img src="/upgrades/7-tests/test2.png" style="width: 100%; height: auto;">


Lastly, it's worth mentioning that we should add a function to ensure that proxy starts as `boxV1`. This function will be set to revert with the previous setup. As a result, when attempting to run the `setNumber` function on the proxy, it should fail.

Now that we have all our tests in place, let's run these one at a time using `forge test`.

<img src="/upgrades/7-tests/test3.png" style="width: 100%; height: auto;">


And voila! We can see that proxy has been successfully upgraded from `boxV1` to `boxV2`. Such upgrades are a crucial part of smart contract development, as they allow you to deploy new features, fix bugs and more, all while preserving the addresses that interact with your contract.

With the above guide, you now have a better understanding of how smart contract upgrades work. Good luck with crafting your own upgrades!

