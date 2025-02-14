## Account Abstraction Lesson 14: Test EntryPoint

Alright, we've got one more test to write. Then we will get to see how all this works on a real network. Along the way, we will:

- pay back the alt-mempool for covering our costs
- get a random user to send our transaction
- implement `handleUserOps()`
- Complete a debugging challenge.

Let's get into it!

---

### Pay Back Alt-mempool

Let's start by setting up our `testEntryPointCanExecuteCommands` function with **Arrange**, **Act** and **Assert**.

**<span style="color:red">MinimalAccountTest.t.sol</span>**

```solidity
function testEntryPointCanExecuteCommands() public {
    // Arrange

    // Act

    // Assert
}
```

---

For starters, we can simply grab all of **Assert** from `testValidationOfUserOps`, except for the last line - `uint256 missingAccountFunds = 1e18;`.

```solidity
// Arrange
assertEq(usdc.balanceOf(address(minimalAccount)), 0);
address dest = address(usdc);
uint256 value = 0;
bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(minimalAccount), AMOUNT);
bytes memory executeCallData =
    abi.encodeWithSelector(MinimalAccount.execute.selector, dest, value, functionData);
PackedUserOperation memory packedUserOp = sendPackedUserOp.generateSignedUserOperation(
    executeCallData, helperConfig.getConfig());
bytes32 userOperationHash = IEntryPoint(helperConfig.getConfig().entryPoint).getUserOpHash(packedUserOp);
```

---

In the previous lesson, we added `missingAccountfunds` to simulate the amount of funds that are missing from the account. We know that the alt-mempool initially covers these costs. Now we need to pay them back. To do this, we will use `vm.deal(address(minimalAccount), 1e18);`.

```solidity
// Arrange
assertEq(usdc.balanceOf(address(minimalAccount)), 0);
address dest = address(usdc);
uint256 value = 0;
bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(minimalAccount), AMOUNT);
bytes memory executeCallData =
    abi.encodeWithSelector(MinimalAccount.execute.selector, dest, value, functionData);
PackedUserOperation memory packedUserOp = sendPackedUserOp.generateSignedUserOperation(
    executeCallData, helperConfig.getConfig());
bytes32 userOperationHash = IEntryPoint(helperConfig.getConfig().entryPoint).getUserOpHash(packedUserOp);
vm.deal(address(minimalAccount), 1e18);
```

---

### Have Random User Send Transaction

In our **Act**, we will use vm.prank to be a random user. This means that anyone can send our transaction as long as we sign it.

```solidity
// Act
vm.prank(randomuser);
```

---

Additionally, if you go into `handleOps` or the `EntryPoint` you'll see that it takes a `PackedUserOperation[] calldata ops` array and `payable beneficiary`.

**<span style="color:red">EntryPoint.sol</span>**

```solidity
/// @inheritdoc IEntryPoint
function handleOps(
    PackedUserOperation[] calldata ops,
    address payable beneficiary
)
```

---

In our case, the beneficiary will be the `randomuser`. This means that we will be paying a random person to send our transaction. To do all of this, we'll need to set the `PackedUserOperation` array from `handleOps` in **Arrange**. Also in **Arrange**, copy `IEntryPoint(helperConfig.getConfig().entryPoint).getUserOpHash(packedUserOp)` and refactor it for `handleOps()` instead of `getUserOpHash()`. Then add it to our **Act**.

**<span style="color:red">MinimalAccountTest.t.sol</span>**

```solidity
PackedUserOperation[] memory ops = new PackedUserOperation[](1);
ops[0] = packedUserOp;

// Act
vm.prank(randomuser);
IEntryPoint(helperConfig.getConfig().entryPoint).handleOps(ops, payable(randomuser));
```

---

> ❗ **NOTE** We no longer need userOperationHash in our Assert because in our handleUserOps. You can comment it out.

Now we can move on to our Assert, which is exactly the same as in `testOwnerCanExecuteCommands`. Just copy and paste it.

```solidity
assertEq(usdc.balanceOf(address(minimalAccount)), AMOUNT);
```

---

**Our completed code should look like this: **

```solidity
function testEntryPointCanExecuteCommands() public {
    // Arrange
    assertEq(usdc.balanceOf(address(minimalAccount)), 0);
    address dest = address(usdc);
    uint256 value = 0;
    bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(minimalAccount), AMOUNT);
    bytes memory executeCallData =
        abi.encodeWithSelector(MinimalAccount.execute.selector, dest, value, functionData);
    PackedUserOperation memory packedUserOp = sendPackedUserOp.generateSignedUserOperation(
        executeCallData, helperConfig.getConfig());
    //bytes32 userOperationHash = IEntryPoint(helperConfig.getConfig().entryPoint).getUserOpHash(packedUserOp);
    vm.deal(address(minimalAccount), 1e18);

    PackedUserOperation[] memory ops = new PackedUserOperation[](1);
    ops[0] = packedUserOp;

    // Act
    vm.prank(randomuser);
    IEntryPoint(helperConfig.getConfig().entryPoint).handleOps(ops, payable(randomuser));

    // Assert
    assertEq(usdc.balanceOf(address(minimalAccount)), AMOUNT);
}
```

---

Let's test it!

```js
forge test --mt testEntryPointCanExecuteCommands -vvv
```

And..... It failed. No worries, we need some debugging practice anyway.

---

### CHALLENGE TIME!

We are going to tackle this together. But first, try it out yourself. Use the debugging skills that we have learned and used throughout the course. When you get ready, move on to the next lesson.

> ❗ **PROTIP** ChatGPT is likely not the answer.
