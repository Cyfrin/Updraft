## Signing an ERC-4337 PackedUserOperation with Foundry

This lesson details the process of correctly signing a `PackedUserOperation` struct according to the ERC-4337 standard, focusing on how the `EntryPoint` contract expects signatures to be generated and verified. We will use Foundry scripts and tests to demonstrate this, covering hash calculation, signature generation using `vm.sign`, and proper formatting.

## Understanding the Key Components

Before diving into the code, let's clarify the essential elements involved in signing a UserOperation:

1.  **`PackedUserOperation`:** The core data structure in ERC-4337. It bundles the user's intent (target address, call data, gas parameters, nonce) with metadata (the sender smart contract account) and requires a `signature` field to authorize the operation. Our goal is to correctly populate this `signature`.
2.  **`EntryPoint` Contract:** The central singleton contract defined by ERC-4337. It acts as the trusted orchestrator, verifying the `PackedUserOperation` (including its signature) and dispatching the execution call to the target smart contract account (the `sender`). Critically, the `EntryPoint` defines the precise method for calculating the hash that needs to be signed.
3.  **`userOpHash`:** This is the specific `bytes32` hash value that the user's signing key must sign to authorize the `PackedUserOperation`. It is *not* a direct hash of the entire struct. Instead, its calculation method is mandated by the `EntryPoint` contract to prevent various forms of replay attacks.
4.  **EIP-191 (Signed Data Standard):** A standard for signing arbitrary data in Ethereum. It helps distinguish signed messages from actual transaction data by prepending a specific string (`\x19Ethereum Signed Message:\n32`) to the hash *before* hashing it again. This final hash is often referred to as the `digest`. Libraries like OpenZeppelin's `MessageHashUtils` provide helpers (`toEthSignedMessageHash`) for this.
5.  **ECDSA Signature (v, r, s):** An Ethereum signature consists of three components derived from the Elliptic Curve Digital Signature Algorithm: `r` and `s` (representing points on the elliptic curve) and `v` (a recovery identifier used to derive the public key/address).
6.  **Foundry `vm.sign`:** A cheatcode provided by Foundry for generating ECDSA signatures within scripts and tests. It can take a private key directly, or importantly, it can take an *address* if that account has been "unlocked" by Foundry (e.g., via command-line flags like `--private-key` or `--account` when running scripts).
7.  **Signature Packing:** The `signature` field within the `PackedUserOperation` is typically the concatenation of the `r`, `s`, and `v` components, usually packed using `abi.encodePacked(r, s, v)`.

## Calculating the Correct Hash to Sign (`userOpHash`)

The most crucial step is generating the *exact* hash the `EntryPoint` expects. Simply hashing the `PackedUserOperation` struct is incorrect and will lead to signature verification failures. We must use the method defined within the `EntryPoint` contract itself.

Looking inside a standard `EntryPoint.sol` contract (like the one from `erc4337-account-abstraction/contracts/core/EntryPoint.sol`), we find the `getUserOpHash` function:

```solidity
// In EntryPoint.sol
/// @inheritdoc IEntryPoint
function getUserOpHash(PackedUserOperation calldata userOp)
    public
    view
    returns (bytes32)
{
    // Calculate hash of the PackedUserOperation struct itself (excluding signature)
    bytes32 userOpStructHash = userOp.hash();
    // Encode the struct hash, EntryPoint address, and chain ID, then hash the result
    return keccak256(abi.encode(userOpStructHash, address(this), block.chainId));
}
```

This function reveals the correct hashing process:

1.  It first computes an internal hash of the `PackedUserOperation` struct's fields (excluding the `signature` field itself). This is often achieved via a helper `userOp.hash()` method on the struct type.
2.  It then ABI-encodes the concatenation of:
    *   The `userOpStructHash` calculated above.
    *   The address of the `EntryPoint` contract (`address(this)`).
    *   The current blockchain's `chainId` (`block.chainId`).
3.  Finally, it computes the `keccak256` hash of this encoded data.

**Why include `EntryPoint` address and `chainId`?** This provides vital replay protection. Including the `chainId` prevents a signature generated for one chain (e.g., Goerli) from being replayed on another (e.g., Polygon). Including the `EntryPoint` address prevents a signature intended for one `EntryPoint` deployment from being misused with a different, potentially malicious, `EntryPoint`.

## Setting Up the Environment for Signing

To call `getUserOpHash` within our Foundry scripts or tests, we need access to a deployed `EntryPoint` contract instance. We can modify our `HelperConfig.s.sol` script to deploy a mock `EntryPoint` for local testing environments (like Anvil).

In the function responsible for setting up the local/Anvil configuration (`getOrCreateAnvilEthConfig` or similar):

```solidity
// In script/HelperConfig.s.sol
import {EntryPoint} from "lib/account-abstraction/contracts/core/EntryPoint.sol";
import "forge-std/console2.sol"; // Optional: for logging

// ... inside the setup function (e.g., getOrCreateAnvilEthConfig) ...

// Check if config already exists (avoids redeploying)
if (localNetworkConfig.account != address(0)) {
     return localNetworkConfig;
}

// Deploy mocks if not already done
console2.log("Deploying mocks..."); // Optional
vm.startBroadcast(FOUNDRY_DEFAULT_WALLET); // Use a default deployer address

// Deploy the EntryPoint contract
EntryPoint entryPoint = new EntryPoint();

vm.stopBroadcast();

// Store the deployed EntryPoint address in the configuration struct
return NetworkConfig({entryPoint: address(entryPoint), account: FOUNDRY_DEFAULT_WALLET});
```

This ensures that whenever we retrieve the configuration for our local network, it includes the address of a deployed `EntryPoint` contract that we can interact with.

## Implementing the Signing Logic in a Foundry Script

Let's create a Foundry script (e.g., `SendPackedUserOp.s.sol`) to encapsulate the process of creating and signing a `PackedUserOperation`. We'll define a function `generateSignedUserOperation`.

**1. Imports:**
Include necessary contracts and libraries.

```solidity
// In script/SendPackedUserOp.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {PackedUserOperation} from "lib/account-abstraction/contracts/interfaces/PackedUserOperation.sol";
import {HelperConfig, NetworkConfig} from "script/HelperConfig.s.sol"; // Our config script
import {IEntryPoint} from "lib/account-abstraction/contracts/interfaces/IEntryPoint.sol"; // Interface is sufficient
import {MessageHashUtils} from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol"; // For EIP-191

contract SendPackedUserOp is Script {
    using MessageHashUtils for bytes32; // Attach helper to bytes32 type

    // Function to generate the signed UserOperation
    function generateSignedUserOperation(bytes memory callData, NetworkConfig memory config)
        internal
        view
        returns (PackedUserOperation memory)
    {
        // ... implementation follows ...
    }

    // Helper function to populate the non-signature fields
    function _generateUnsignedUserOperation(bytes memory callData, address sender, uint256 nonce)
        internal
        pure
        returns (PackedUserOperation memory userOp)
    {
        // Populate userOp fields: sender, nonce, initCode (if needed), callData,
        // callGasLimit, verificationGasLimit, preVerificationGas, maxFeePerGas,
        // maxPriorityFeePerGas, paymasterAndData. Leave signature empty.
        userOp.sender = sender;
        userOp.nonce = nonce;
        userOp.callData = callData;
        // Set appropriate gas limits and fees (example values)
        userOp.callGasLimit = 210000;
        userOp.verificationGasLimit = 500000; // Higher due to verification logic
        userOp.preVerificationGas = 50000;
        userOp.maxFeePerGas = 10 gwei;
        userOp.maxPriorityFeePerGas = 2 gwei;
        userOp.paymasterAndData = bytes(""); // No paymaster initially
        userOp.signature = bytes(""); // Explicitly empty
        // NOTE: initCode might be needed for the first UserOperation of an account
    }

    // ... run() function etc. ...
}
```

**2. Generate Unsigned Data:**
First, populate the `PackedUserOperation` struct with all necessary information *except* the signature. This includes getting the correct `nonce` for the sender account.

```solidity
// Inside generateSignedUserOperation function

// 1. Generate the unsigned data
// Get the nonce for the account that will sign (owner of the smart account)
// Note: In AA, the nonce is associated with the sender *smart account*, often managed via the EntryPoint.
// For simplicity here, we use vm.getNonce on the config.account (assuming it's the EOA owner for now).
// A real implementation would typically query the EntryPoint: IEntryPoint(config.entryPoint).getNonce(senderAddress, nonceKey);
uint256 nonce = vm.getNonce(config.account);

// Populate the UserOperation struct using a helper
PackedUserOperation memory userOp = _generateUnsignedUserOperation(callData, config.account, nonce); // Using config.account as sender for simplicity now
```
*Note:* Correct nonce management in ERC-4337 involves a nonce key, often 0, and querying the `EntryPoint`'s `getNonce(sender, key)` function. The example uses `vm.getNonce` for brevity, assuming the `config.account` is acting as the sender directly for this illustration.

**3. Get the `userOpHash` and EIP-191 Digest:**
Use the deployed `EntryPoint` address (from the `config`) to call `getUserOpHash`. Then, convert this hash into the EIP-191 compliant digest.

```solidity
// Inside generateSignedUserOperation function (continued)

// 2. Get the userOp Hash from the EntryPoint and prepare the digest
bytes32 userOpHash = IEntryPoint(config.entryPoint).getUserOpHash(userOp);
bytes32 digest = userOpHash.toEthSignedMessageHash(); // Apply EIP-191 formatting
```

**4. Sign and Encode Signature:**
Use Foundry's `vm.sign` cheatcode. Crucially, when running this function within a script executed with `forge script --account <alias>` or `--private-key <key>`, Foundry unlocks the specified account. This allows `vm.sign` to work by passing the *address* of the unlocked account (`config.account`) instead of the raw private key. Finally, pack the resulting `v, r, s` components into the `userOp.signature` field in the correct order (`r, s, v`).

```solidity
// Inside generateSignedUserOperation function (continued)

// 3. Sign the digest using the unlocked account's address
(uint8 v, bytes32 r, bytes32 s) = vm.sign(config.account, digest);

// 4. Pack the signature components (r, s, v) into the userOp.signature field
userOp.signature = abi.encodePacked(r, s, v); // Standard order for ERC-4337

return userOp;
```

Now, the `generateSignedUserOperation` function returns a fully populated and signed `PackedUserOperation` struct, ready to be sent to the `EntryPoint`.

## Verifying the Signature in Foundry Tests

We can verify our signing logic works correctly within a Foundry test (`forge test`). We'll create a test that:
1.  Generates a signed `PackedUserOperation` using the script function.
2.  Recalculates the `userOpHash` and `digest` independently.
3.  Uses `ECDSA.recover` to derive the signer's address from the digest and the signature.
4.  Asserts that the recovered address matches the expected signer address.

```solidity
// In test/MinimalAccountTest.t.sol (example test contract)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import {HelperConfig, NetworkConfig} from "script/HelperConfig.s.sol";
import {SendPackedUserOp, PackedUserOperation} from "script/SendPackedUserOp.s.sol"; // Import script
import {IEntryPoint} from "lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol"; // For signature recovery
import {MessageHashUtils} from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol"; // For digest creation
// Import other necessary contracts (MinimalAccount, ERC20Mock etc.)

contract MinimalAccountTest is Test {
    using MessageHashUtils for bytes32; // Attach helper

    HelperConfig helperConfig;
    NetworkConfig config;
    SendPackedUserOp sendPackedUserOp; // Instance of our signing script contract
    address owner; // Expected signer (EOA owner of the minimalAccount)
    // ... other state variables (minimalAccount, usdc, etc.)

    function setUp() public {
        helperConfig = new HelperConfig();
        // Deploy mocks & get config (which deploys EntryPoint as per our HelperConfig modification)
        config = helperConfig.getOrCreateAnvilEthConfig();
        owner = config.account; // The default Foundry account used in HelperConfig

        // Deploy other necessary contracts (MinimalAccount, target contracts)
        // ... setup initial state ...

        // Instantiate the script contract to access its functions
        sendPackedUserOp = new SendPackedUserOp();
    }

    function testRecoverSignedOp() public {
        // Arrange
        // 1. Define the action the user wants to perform via the smart account
        address dest = address(usdc); // Example: Target contract is USDC
        uint256 value = 0;
        uint256 amountToMint = 100 ether;
        // Encode the low-level call data (e.g., minting USDC to the smart account)
        bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(minimalAccount), amountToMint);
        // Encode the call to the smart account's execute function, passing the low-level call
        bytes memory executeCallData = abi.encodeWithSelector(minimalAccount.execute.selector, dest, value, functionData);

        // 2. Generate the signed UserOperation using our script's logic
        // We pass the executeCallData and the network config (containing EntryPoint address and owner address)
        PackedUserOperation memory packedUserOp = sendPackedUserOp.generateSignedUserOperation(executeCallData, config);

        // 3. Recalculate the hash that *should* have been signed
        bytes32 userOperationHash = IEntryPoint(config.entryPoint).getUserOpHash(packedUserOp);
        bytes32 digest = userOperationHash.toEthSignedMessageHash(); // Prepare the digest for recovery

        // Act
        // 4. Recover the signer's address from the digest and the signature stored in the UserOperation
        address actualSigner = ECDSA.recover(digest, packedUserOp.signature);

        // Assert
        // 5. Check if the recovered signer is the expected owner address
        assertEq(actualSigner, owner, "Recovered signer does not match expected owner");
        // Can also check against minimalAccount.owner() if it's set correctly
        assertEq(actualSigner, minimalAccount.owner(), "Recovered signer does not match minimal account owner");
    }
}
```

**Important Note on `vm.sign` in Tests:** By default, `forge test` does *not* automatically unlock the default Anvil/Foundry accounts (like `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`). Therefore, running the `generateSignedUserOperation` function (which uses `vm.sign(config.account, digest)`) directly within a standard `forge test` execution might fail with an error like `[FAIL. Reason: no wallets are available]`. The script works when run via `forge script` because the `--account` or `--private-key` flag explicitly unlocks the necessary wallet. Testing signature recovery logic often involves either providing a known private key directly to `vm.sign(privateKey, digest)` within the test or mocking the signing process. However, the recovery logic using `ECDSA.recover` itself is perfectly testable as shown above, assuming you have a correctly signed `PackedUserOperation` (perhaps generated via a script run first, or using a known private key for signing within the test setup).

## Key Considerations

*   **Hashing Consistency:** *Always* use the `EntryPoint`'s `getUserOpHash` function or meticulously replicate its logic (`keccak256(abi.encode(userOp.hash(), address(entryPoint), block.chainId))`) to generate the hash for signing. Any deviation will cause signature validation failure at the `EntryPoint`.
*   **EIP-191 Digest:** Remember to apply the EIP-191 prefix (`toEthSignedMessageHash()`) to the `userOpHash` *before* signing and *before* attempting recovery with `ECDSA.recover`.
*   **Signature Packing Order:** The standard packing order for the `signature` field is `abi.encodePacked(r, s, v)`. Ensure you use this order when constructing the signature bytes from the `v, r, s` components returned by `vm.sign`.
*   **Nested Call Data:** Understand that the `callData` field in the `PackedUserOperation` typically contains the ABI-encoded call to the smart contract account's execution function (e.g., `MinimalAccount.execute(...)`). This execution function then internally performs the actual low-level call (e.g., `usdc.mint(...)`) specified within its arguments.
*   **`vm.sign` Context:** Be aware that `vm.sign(address, digest)` relies on an unlocked account, which is common in `forge script` runs using specific flags but usually requires explicit private key handling or alternative approaches in standard `forge test` environments.

By following these steps and considerations, you can reliably sign `PackedUserOperation` structs using Foundry in a way that is compliant with the ERC-4337 standard and verifiable by the `EntryPoint` contract.