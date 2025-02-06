## Account Abstraction Lesson 15: Advanced Debugging

We left off of our previous lesson with a debugging challenge. If you weren't able to solve it, no worries, we are going to do it together in this lesson. If you were able to solve it, great work. You should still follow along with this lesson.

---

### Debug with Forge

Forge has some great debugging tools. Let's check them out. Run the following in your terminal.

```js
forge test --debug testEntryPointCanExecuteCommands -vvv
```

> ❗ **NOTE** If you aren't following along with the video, I highly recommend that you do so for this part of the lesson.

---

::image{src='/foundry-account-abstraction/15-advanced-debugging/forge-debug1.png' style='width: 100%; height: auto;'}

---

---

::image{src='/foundry-account-abstraction/15-advanced-debugging/forge-debug2.png' style='width: 100%; height: auto;'}
---

Simply hit shift G, and you will be taken to where the test reverted. You'll see that the line of code where the issue is highlighted.

---

::image{src='/foundry-account-abstraction/15-advanced-debugging/forge-debug3.png' style='width: 100%; height: auto;'}
---

We know that the issue is likely in the `handleOps`, as this is the part that we recently refactored in this line. Now we have to find the line in the `handleOps` code that actually failed. Start hitting the J to walk back through the code base. It may take a few seconds, but eventually you should see this:

---

::image{src='/foundry-account-abstraction/15-advanced-debugging/forge-debug4.png' style='width: 100%; height: auto;'}
---

### Getting the Correct Sender

Let's inspect this line a bit further.

---

```solidity
try IAccount(sender).validateUserOp{gas: verificationGasLimit}(op, opInfo.userOpHash, missingAccountFunds)
```

---

We already know that `validateUserOp` is fine because those tests have already passed. However, you may notice that `IAccount` takes on `sender`. This may be the issue we should be sending our account, `minimalAccount`.

Let's quit the debugger by pressing q and go back into `SendPackedUserOp.s.sol`. In the `generateSignedUserOperation` function, you'll notice `config.account` in a couple of places. Let's change this to `minimalAccount`.

- pass `address minimalAccount` to `generateSignedUserOp`
- change `config.account` to `minimalAccount` in `vm.getNonce`
- change `config.account` to `minimalAccount` in `_generateUnsignedUserOperation`

Our updated part of our function will look like this:

**<span style="color:red">SendPackedUserOp.s.sol</span>**

---

```solidity
function generateSignedUserOperation(
        bytes memory callData,
        HelperConfig.NetworkConfig memory config,
        address minimalAccount
    ) public view returns (PackedUserOperation memory) {
        // 1. Generate the unsigned data
        uint256 nonce = vm.getNonce(minimalAccount) - 1;
        PackedUserOperation memory userOp = _generateUnsignedUserOperation(callData, minimalAccount, nonce);


}
```

---

### Adjusting Our Tests

Because of our update, we'll have to make adjustments to any other test or function that used `generateSignedUserOperation`. Let's start with our tests. Add `address (minimalAccount)` to where necessary.

- `testEntryPointCanExecuteCommands`
- `testValidationOfUserOps`
- `testRecoverSignedOp`

Look in **Arrange** of the above test and make your change in `packedUserOp` Your updated line of code should resemble the one below.

**<span style="color:red">MinimalAccountTest.t.sol</span>**

---

```solidity
PackedUserOperation memory packedUserOp = sendPackedUserOp.generateSignedUserOperation(
    executeCallData, helperConfig.getConfig(), address(minimalAccount));
```

---

### Getting the Right Nonce

We'll need to make one more change in order for our test to pass. Go back to `SendPackedUserOp`. In the `generateSignedUserOperation`, We want getNonce to be decremented by 1 for the purpose of our test.

- `uint256 nonce = vm.getNonce(minimalAccount) - 1;`

This will give us the last successful transaction, rather than the next one in the sequence.

**<span style="color:red">SendPackedUserOp.s.sol</span>**

---

```solidity
function generateSignedUserOperation(
        bytes memory callData,
        HelperConfig.NetworkConfig memory config,
        address minimalAccount
    ) public view returns (PackedUserOperation memory) {
        // 1. Generate the unsigned data
        uint256 nonce = vm.getNonce(minimalAccount) - 1;
        PackedUserOperation memory userOp = _generateUnsignedUserOperation(callData, minimalAccount, nonce);

        //rest of code
}
```

---

Run the test again and it should pass.

```js
forge test --mt testEntryPointCanExecuteCommands -vvv
```

Before we move on, take a look at the review questions. Move on to the next lesson when you are ready.

---

### Questions for Review

<summary>1. Why was address minimalAccount added as a parameter to the generateSignedUserOperation function?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

    It was added to ensure that the correct account is used when generating the signed user operation. This change allows the function to specifically target the minimalAccount.

</details>


<summary>2. What modification was made to the vm.getNonce function in the generateSignedUserOperation function?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

It was modified to subtract 1 from the nonce value. This change ensures that the function retrieves the last successful transaction rather than the next one in the sequence.

</details>

