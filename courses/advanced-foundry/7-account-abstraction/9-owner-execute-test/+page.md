## Creating an Unsigned PackedUserOperation with a Foundry Script

This lesson focuses on constructing the foundational data structure needed for ERC-4337 interactions: the `PackedUserOperation`. Specifically, we'll build the *unsigned* version of this struct within a reusable Foundry script. This is a crucial preparatory step for testing the `validateUserOp` function of our smart contract account, which requires a valid `UserOperation` as input.

### Why Use a Foundry Script?

While we could construct the `PackedUserOperation` directly within our test file (`MinimalAccountTest.t.sol`), creating a dedicated Foundry script (`SendPackedUserOp.s.sol`) offers several advantages:

1.  **Reusability:** The logic for creating and eventually signing a `PackedUserOperation` isn't just for testing. You'll need the same capability to submit User Operations to Bundlers on testnets or mainnet. A script provides a reusable component for both scenarios.
2.  **Complexity Management:** Generating a `PackedUserOperation` involves populating numerous fields, including packed gas values. Encapsulating this logic in a dedicated script keeps our test files cleaner and more focused.
3.  **Realistic Environment:** Scripts allow for interactions closer to real-world usage, particularly when handling signing keys (which Foundry's scripting environment manages), making the process more robust.

### Understanding the PackedUserOperation Struct

The `PackedUserOperation` is the core data structure defined by ERC-4337. It bundles all the necessary information for an EntryPoint contract to execute an operation on behalf of a user's smart contract account. Let's look at its definition:

```solidity
// From lib/account-abstraction/contracts/interfaces/PackedUserOperation.sol
struct PackedUserOperation {
    address sender;           // The smart contract account initiating the operation
    uint256 nonce;            // Anti-replay protection nonce for the sender account
    bytes initCode;           // Code to deploy the account if it doesn't exist (used for counterfactual deployment)
    bytes callData;           // The actual action: target address, value, and function data to execute
    bytes32 accountGasLimits; // Packed verificationGasLimit and callGasLimit
    uint256 preVerificationGas; // Gas cost unrelated to execution, covering data and overhead
    bytes32 gasFees;          // Packed maxFeePerGas and maxPriorityFeePerGas
    bytes paymasterAndData; // Optional data for a Paymaster to sponsor the transaction
    bytes signature;          // Signature from the account owner authorizing the operation
}
```

Our goal in this lesson is to populate all fields *except* the `signature`.

### Setting Up the Script (`SendPackedUserOp.s.sol`)

We begin by creating a new script file, `SendPackedUserOp.s.sol`, with the basic Foundry script boilerplate and importing the necessary `PackedUserOperation` struct.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";
import {PackedUserOperation} from "lib/account-abstraction/contracts/interfaces/PackedUserOperation.sol";

contract SendPackedUserOp is Script {

    // The main entry point for running the script (implementation later)
    function run() public {
        // We will likely call generateSignedUserOperation from here eventually
    }

    // Public function to generate the complete, signed UserOperation
    function generateSignedUserOperation(bytes memory callData, address sender)
        public // Accessibility might change based on usage
        returns (PackedUserOperation memory)
    {
        // Step 1: Generate the unsigned UserOperation data
        // We need the current nonce for the sender account
        uint256 nonce = vm.getNonce(sender); // Foundry cheatcode to get nonce

        PackedUserOperation memory unsignedUserOp = _generateUnsignedUserOperation(callData, sender, nonce);

        // Step 2: Calculate userOpHash, sign it, and populate the signature field (Covered in the next lesson)
        // ... signing logic will go here ...

        // For now, we return the unsigned struct (placeholder)
        // In the next step, this will return the fully signed struct.
        return unsignedUserOp;
    }

    // Internal helper function to construct the unsigned UserOperation
    function _generateUnsignedUserOperation(bytes memory callData, address sender, uint256 nonce)
        internal // Keep helper internal
        pure // Doesn't read or modify state (uses cheatcode via caller)
        returns (PackedUserOperation memory userOp)
    {
        // Implementation follows below...
    }
}
```

We've structured the logic into two functions:
*   `generateSignedUserOperation`: The main function intended to be called externally or by the `run` function. It orchestrates the process, including getting the dynamic nonce using the Foundry cheatcode `vm.getNonce(sender)`.
*   `_generateUnsignedUserOperation`: An internal helper function responsible solely for populating the fields of the `PackedUserOperation` struct, excluding the signature.

### Populating the Unsigned PackedUserOperation

Now, let's implement the `_generateUnsignedUserOperation` function. This function takes the necessary dynamic data (`callData`, `sender`, `nonce`) and populates the struct fields.

```solidity
    function _generateUnsignedUserOperation(bytes memory callData, address sender, uint256 nonce)
        internal // Keep helper internal
        pure // Doesn't read or modify state
        returns (PackedUserOperation memory) // Return the struct
    {
        // Define gas values. These are simplified/hardcoded for now.
        // In a real-world scenario or complex tests, these might need careful calculation.
        uint128 verificationGasLimit = 300000; // Example: Sufficient gas for signature verification etc.
        uint128 callGasLimit = 500000;         // Example: Gas limit for the actual execution phase
        uint128 maxPriorityFeePerGas = 1e9;    // Example: 1 Gwei tip (EIP-1559)
        uint128 maxFeePerGas = 100e9;          // Example: 100 Gwei max total fee (EIP-1559)

        // Pack the gas limits: verificationGasLimit (high 128 bits) | callGasLimit (low 128 bits)
        bytes32 accountGasLimits = bytes32(uint256(verificationGasLimit) << 128 | uint256(callGasLimit));

        // Pack the gas fees: maxFeePerGas (high 128 bits) | maxPriorityFeePerGas (low 128 bits)
        bytes32 gasFees = bytes32(uint256(maxFeePerGas) << 128 | uint256(maxPriorityFeePerGas));

        // Define preVerificationGas. Often related to verificationGasLimit and UserOp size. Simplified here.
        uint256 preVerificationGas = 50000; // Example: Base cost + cost per byte for calldata etc.

        // Return the populated struct
        return PackedUserOperation({
            sender: sender,                           // Account sending the operation
            nonce: nonce,                             // Correct nonce obtained via vm.getNonce
            initCode: hex"",                          // Empty: We assume the account already exists
            callData: callData,                       // The execution data passed into the function
            accountGasLimits: accountGasLimits,       // Packed gas limits
            preVerificationGas: preVerificationGas,   // Gas cost before verification/execution
            gasFees: gasFees,                         // Packed gas fees
            paymasterAndData: hex"",                  // Empty: No paymaster used in this example
            signature: hex""                          // Empty: This is crucial - it's UNSIGNED
        });
    }
```

Key points about this implementation:

*   **Gas Values:** We've used example values for `verificationGasLimit`, `callGasLimit`, `maxPriorityFeePerGas`, and `maxFeePerGas`. These often need careful tuning based on the specific operation and network conditions.
*   **Gas Packing:** ERC-4337 saves calldata costs by packing pairs of `uint128` gas values into single `bytes32` slots. We achieve this using standard bitwise operations: left-shifting (`<< 128`) the first value and then performing a bitwise OR (`|`) with the second value.
*   **Ignored Fields:**
    *   `initCode` is empty (`hex""`) because we are assuming the `sender` account contract is already deployed. If we were creating the account via the UserOperation, this field would contain the factory address and creation bytecode.
    *   `paymasterAndData` is empty (`hex""`) as we are not using a Paymaster to sponsor the transaction fees in this example.
*   **Empty Signature:** The `signature` field is explicitly set to empty bytes (`hex""`). This function's sole purpose is to construct the data *that will be signed later*. The actual signature generation requires hashing this unsigned struct along with other data (like EntryPoint address and chain ID) and signing that hash.

### Next Steps

We have successfully created a Foundry script capable of generating an unsigned `PackedUserOperation` struct. It correctly populates fields like sender, nonce (dynamically retrieved), callData, and packed gas values, while leaving fields like `initCode`, `paymasterAndData`, and importantly, `signature`, empty as appropriate for this stage.

The next logical step is to implement the signing mechanism within the `generateSignedUserOperation` function. This involves calculating the `userOpHash` and using the sender's private key (managed by Foundry) to sign this hash, finally populating the `signature` field to create a complete, signed `PackedUserOperation` ready for use in testing `validateUserOp` or sending to an EntryPoint.