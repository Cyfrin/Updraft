## Account Abstraction Lesson 10: Unsigned `PackedUserOperation` Test

Welcome to our 10th lesson on **Account Abstraction**. In the previous lesson, we tested the `execute` function of our `MinimalAccount`. Now we need to set up the test for `validateUserOp`, which includes:

- `PackedUserOperation`
- `userOpHash`
- `missingAccountFunds`

But before we can do any of this, we will need to write another script. This lesson will allow us to do this by:

- setting up our essential code layout.
- beginning the code for two important functions:
  - `generateSignedUserOperation`
  - `_generateUnsignedUserOperation`

---

### Writing Our SendPackedUserOp Script

First, we are going to write a script that will help us generate the data for the `PackedUserOperation` and sign it. We can do this directly in our `MinimalAccountTest.t.sol`. However, it would be more beneficial to create in our `SendPackedUserOp` script. Let's set up the essential code and also comment some steps for further building.

**<span style="color:red">SendPackedUserOp.s.sol</span>**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";
import {PackedUserOperation} from "lib/account-abstraction/contracts/interfaces/PackedUserOperation.sol";

contract SendPackedUserOp is Script {
    function run() public {}

    function generateSignedUserOperation(bytes memory callData)
    public view returns (PackedUserOperation memory) {
        // Step 1. Generate the unsigned data
        // Step 2. Sign and return it
    }
}
```

For step 1, we are going to create a separate function called `_generateUnsignedUserOperation`. It will take `bytes memory calldata`, `address sender`, and `uint256 nonce`. It will populate all the fields of the `PackedUserOperation` except for the signature. We will also need some variables for gas limits.

```solidity
function _generateUnsignedUserOperation(bytes memory callData)
    internal pure returns (PackedUserOperation memory) {

    uint128 verificationGasLimit = 16777216;
    uint128 callGasLimit = verificationGasLimit;
    uint128 maxPriorityFeePerGas = 256;
    uint128 maxFeePerGas = maxPriorityFeePerGas;

        return PackedUserOperation({
        sender: sender,
        nonce: nonce,
        initCode: hex"",
        callData: callData,
        accountGasLimits: bytes32(uint256(verificationGasLimit) << 128 | callGasLimit),
        preVerificationGas: verificationGasLimit,
        gasFees: bytes32(uint256(maxPriorityFeePerGas) << 128 | maxFeePerGas),
        paymasterAndData: hex"",
        signature: hex""
    });
}
```

> ❗ **NOTE** Gas fees and limits don't have to make sense at this point.

Now we can use our `_generateUnsignedUserOperation` function for step 1 of our `generateSignedUserOperation` function.

```solidity
function generateSignedUserOperation(bytes memory callData, address sender)
    public view returns (PackedUserOperation memory) {
        // Step 1. Generate the unsigned data
        uint256 nonce = vm.getNonce(sender);
        PackedUserOperation memory unsignedUserOp = _generateUnsignedUserOperation(callData, sender, nonce);

        // Step 2. Sign and return it
}
```

That's a wrap for this lesson, but we aren't done with our script yet. Take a moment to go reflect on what we've done so far. Move on to the next lesson when you are ready.
