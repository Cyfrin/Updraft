## Account Abstraction Lesson 13: Test Validate UserOps

In this lesson, we are going to write another test called `testValidationOfUserOps`. We want to be able to do three things here:

1. Sign `userOps`
2. Call validate `userOps`
3. Assert the return is correct

Let's get started!

---
### Arrange

In our test function, we can simply copy and paste the Arrange from `testRecoverSignedOp`. 

**<span style="color:red">MinimalAccountTest.t.sol</span>**
```solidity
function testValidationOfUserOps() public {
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
}
```
---
### Act

In our **Act**, we want to make sure that `validateUserOp` returns correctly. If you look back at this function in our `MinimalAccount`, you will notice that it can only be called by the `EntryPoint`. So, in our `vm.prank`, we are going to be the `EntryPoint`. 

You will also notice that it takes a  `userOp`, `userOpHash`, and `missingAccountFunds`. We'll need to set this to our `validationData`. We already have `packedUserOp` and `userOperationHash` in our **Arrange**. We will need to add `missingAccountFunds` there as well. Let's make it a `uint256` and set it to 1e18 **(to simulate the amount of funds that are missing from the account)**. Lastly, we remember that our `SIG_VALIDATION_SUCCESS` = 0. So, we'll assume this will be the case in this test. 

```solidity
uint256 missingAccountFunds = 1e18;

// Act
vm.prank(helperConfig.getConfig().entryPoint);
uint256 validationData = minimalAccount.validateUserOp(packedUserOp, userOperationHash, missingAccountFunds);
assertEq(validationData, 0);
```

With that, our function should now look like this.

```solidity
function testValidationOfUserOps() public {
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
    uint256 missingAccountFunds = 1e18;

    // Act
    vm.prank(helperConfig.getConfig().entryPoint);
    uint256 validationData = minimalAccount.validateUserOp(packedUserOp, userOperationHash, missingAccountFunds);
    assertEq(validationData, 0);
}
```

Let's test it. 

```js
forge test --mt testValidationOfUserOps -vvv
```

It passes! We are on a roll!

Now we know that we are getting the correct signatures and that our validation is working properly. Next, we get to see if our EntryPoint can execute commands. Before you move on, consider these review questions. 

---
### Questions for Review

<summary>1. What is the main objective of the testValidationOfUserOps?</summary> 

<details> 

**<summary><span style="color:red">Click for Answers</span></summary>**

    The main objective is to sign userOps, call validateUserOp, and assert that the return value is correct.
      
</details>

<summary>2. Why do we set missingAccountFunds to 1e18?</summary> 

<details> 

**<summary><span style="color:red">Click for Answers</span></summary>**

   It simulates the amount of funds that are missing from the account, which is required for the validateUserOp function.      
      
</details>

<summary>3. What does the assertEq(validationData, 0) statement check for?</summary> 

<details> 

**<summary><span style="color:red">Click for Answers</span></summary>**

   It checks that the validateUserOp function returns 0, indicating that the signature validation was successful.      
      
</details>


