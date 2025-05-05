## Account Abstraction Lesson 9: Owner Execute Test

Alright! We've got our scripts written and are now ready to move on to the next step, testing. In this lesson, we will be:

- testing the `execute` function from `MinimalAccount`
- importing `ERC20Mock` to use the `mint` function
- testing if owner can execute commands
- testing that non-owner cannot execute commands

---

> ❗ **PROTIP** Buckle up! This is a big one! Good learning inbound!

---

### Setting Up Test

Now that we've got some scripts written, we need to do some testing. Let's create our first one in the test folder. Name it `MinimalAccountTest.t.sol`. Then we can go ahead and set up some essentials:

- license and pragma
- import `Test`, `MinimalAccount`, `DeployMinimal`, and `HelperConfig`
- contract `MinimalAccountTest`
- state variables for `HelperConfig` and `MinimalAccount`
- `setUp` function that will:
  - create a new instance of `DeployMinimal` contract
  - call deployMinimalAccount that returns state variables mentioned above
  - assigns values to the returned variables

**<span style="color:red">MinimalAccountTest.t.sol</span>**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test} from "forge-std/Test.sol";
import {MinimalAccount} from "src/ethereum/MinimalAccount.sol";
import {DeployMinimal} from "script/DeployMinimal.s.sol";
import {HelperConfig} from "script/HelperConfig.s.sol";

contract MinimalAccountTest is Test {
    HelperConfig helperConfig;
    MinimalAccount minimalAccount;

    function setUp() public {
        DeployMinimal deployMinimal = new DeployMinimal();
        (helperConfig, minimalAccount) = deployMinimal.deployMinimalAccount();
    }
}
```

---

### What to Test

Now that we've got the essentials of our test ready, let's decide what we exactly want to test.

1. someone can sign data
2. go through mempool
3. go through EntryPoint
4. then have our contract do something

In our test, we should include:

- USDC Mint
- `msg.sender` should be our `MinimalAccount`
- should approve some amount
- USDC contract
- should come from `EntryPoint`

In a nutshell, we are going to simulate being the alt-mempool. To get started, we are going to set up a function to test our the basic functionality or our contract. But first, let's take a look at our `execute` function from `MinimalAccount.sol`.

**<span style="color:red">MinimalAccount.sol</span>**

```solidity
function execute(address dest, uint256 value, bytes calldata functionData) external requireFromEntryPointOrOwner {
    (bool success, bytes memory result) = dest.call{value: value}(functionData);
    if (!success) {
        revert MinimalAccount__CallFailed(result);
    }
}
```

The owner should be able to call this function and send a transaction.

---

::image{src='/foundry-account-abstraction/9-owner-execute-test/basic-account-flow.png' style='width: 100%; height: auto;'}
---

### Test if Owner Can Execute Commands

Let's write our test and call it `testOwnerCanExecuteCommands`. Set it up with **Arrange**, **Act**, and **Assert** comments.

```solidity
function testOwnerCanExecuteCommands() public {
    //Arrange

    //Act

    //Assert
}
```

The first thing we will need now is a mock ERC20. Let's import this from **OpenZeppelin**.

```solidity
import { ERC20Mock } from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";
```

Next, create another state variable `ERC20Mock usdc` , and assign `new ERC20Mock()` to usdc in the `setUp` function.

```solidity
contract MinimalAccountTest is Test {
    HelperConfig helperConfig;
    MinimalAccount minimalAccount;
     ERC20Mock usdc;

    function setUp() public {
        DeployMinimal deployMinimal = new DeployMinimal();
        (helperConfig, minimalAccount) = deployMinimal.deployMinimalAccount();
        usdc = new ERC20Mock();
    }
}
```

With that, we can move back to our test and do a **USDC Mint**. If you go into ERC20Mock, you will see a mint function.

**<span style="color:red">ERC20Mock.sol</span>**

```solidity
function mint(address account, uint256 amount) external {
    _mint(account, amount);
}
```

Let's add what we need from our `execute` function and `ERC20Mock mint` to **Assert** in our `testOwnerCanExecuteCommands` test. Remember that execute takes `address dest`, `uint256 value`, and `bytes calldata functionData`

- `dest` will be USDC contract
- `value` will be 0
- `functionData` will be `mint`

**<span style="color:red">MinimalAccountTest.t.sol</span>**

```solidity
//Assert
assertEq(usdc.balanceOf(address(minimalAccount)), 0);
    address dest = address(usdc);
    uint256 value = 0;
    bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector);
```

Next, in **Act**, we will prank the owner.

```solidity
// Act
vm.prank(minimalAccount.owner());
minimalAccount.execute(dest, value, functionData);
```

So far, our test function should mint some mock ERC20 to our `minimalAccount`. Before we go any further, be sure to set a constant state variable for AMOUNT - `uint256 constant AMOUNT = 1e18;`.

```solidity
// Assert
assertEq(usdc.balanceOf(address(minimalAccount)), AMOUNT);
```

Let's go back and pass the following in abi.encodeWithSelector(ERC20Mock.mint.selector) of the **Assert** section - `address(minimalAccount), AMOUNT `. Our completed function should now look like this:

```solidity
function testOwnerCanExecuteCommands() public skipZkSync {
    // Arrange
    assertEq(usdc.balanceOf(address(minimalAccount)), 0);
    address dest = address(usdc);
    uint256 value = 0;
    bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(minimalAccount), AMOUNT);
    // Act
    vm.prank(minimalAccount.owner());
    minimalAccount.execute(dest, value, functionData);

    // Assert
    assertEq(usdc.balanceOf(address(minimalAccount)), AMOUNT);
}
```

**Drum Roll!** Let's run our test now. Run the following command in your terminal.

```bash
forge test --mt testOwnerCanExecuteCommands -vvv
```

---

**Ooops!** Our test failed. It looks we forgot to set up our **mock entry point contract** over in our `HelperConfig`. Go to the `getOrCreateAnvilEthConfig` function.

**<span style="color:red">HelperConfig.sol</span>**

```solidity
function getOrCreateAnvilEthConfig() public returns (NetworkConfig memory) {
    if (localNetworkConfig.account != address(0)) {
        return localNetworkConfig;
    }

    // deploy mocks
}
```

First, add a new constant variable, `FOUNDRY_DEFAULT_WALLET`, to the state variables.

```solidity
address constant FOUNDRY_DEFAULT_WALLET = 0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38;
```

> ❗ **IMPORTANT** Be sure that your MinimalAccount.sol contract uses the right modifier in the execute function. It should look like this:

`requireFromEntryPointOrOwner`

**<span style="color:red">MinimalAccount.sol**

```solidity
function execute(address dest, uint256 value, bytes calldata functionData) external requireFromEntryPointOrOwner {
    (bool success, bytes memory result) = dest.call{value: value}(functionData);
    if (!success) {
        revert MinimalAccount__CallFailed(result);
    }
}
```

Back over in the `HelperConfig`, insert the following code into our function.

**<span style="color:red">HelperConfig.sol</span>**

```solidity
// deploy mocks

return NetworkConfig({
  entryPoint: address(0),
  account: FOUNDRY_DEFAULT_WALLET,
});
```

Let's see where we are now.

```bash
forge test --mt testOwnerCanExecuteCommands -vvv
```

**Boom!** Our test is now passing. We do have a few warnings, but that's just because we haven't finished setting up our `getOrCreateAnvilEthConfig` function yet.

---

### Test if Non-Owner Cannot Execute Commands

The good news is that we know our `execute` function can do the basic, traditional transaction. However, we want to do more and to be Account Abstraction.

Before we do that, let's make sure that if you are not the owner you can not execute commands.

Let's create a makeAddr() first. Add the following to your state variables in the `MinimalAccountTest` contract.

<span style="color:red">**MinimalAccountTest.t.sol**</span>

```solidity
address randomuser = makeAddr("randomUser");
```

Now we are ready to write our next test - `testNonOwnerCannotExecuteCommands`. The **Arrange** will be the same as the previous test, but we won't have an **Assert**. The biggest change will be in our **Act**. Instead of `minimalAccount.owner`, we will use `randomuser` in `vm.prank`. Additionally, we will add `vm.expectRevert` as our contract is expected to revert if not the owner.

```solidity
function testNonOwnerCannotExecuteCommands() public {
    // Arrange
    assertEq(usdc.balanceOf(address(minimalAccount)), 0);
    address dest = address(usdc);
    uint256 value = 0;
    bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(minimalAccount), AMOUNT);
    // Act
    vm.prank(randomuser);
    vm.expectRevert(MinimalAccount.MinimalAccount__NotFromEntryPointOrOwner.selector);
    minimalAccount.execute(dest, value, functionData);
}
```

Run forge test again and it should pass.

```bash
forge test --mt testOwnerCanExecuteCommands -vvv
```

**Congratulations!** You've put in some amazing work to get to this point. Before moving on, taking a moment to do these review questions. See you in the next lesson whenever you are ready.

---

### Questions for Review

<summary>1. In `testOwnerCanExecuteCommands`, what does the execute function require to pass? What parameters does it take?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

It requires the msg.sender to be either the owner or the entry point, and it takes parameters for address dest, uint256 value, and bytes calldata functionData.

</details>


<summary>2. What is the expected behavior of the testNonOwnerCannotExecuteCommands test?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

The test should revert if a non-owner (a random user) attempts to execute commands using the execute function.

</details>

