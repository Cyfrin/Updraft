## Constructing the ZKsync Transaction Struct in Foundry Tests

When testing ZKsync account abstraction (AA) contracts using Foundry, interacting with your smart account differs significantly from the standard Ethereum AA approach. This lesson guides you through constructing the necessary ZKsync `Transaction` struct required for these interactions.

### From Ethereum AA's `execute` to ZKsync's `executeTransaction`

Recall our previous tests for a minimal Ethereum AA contract (`MinimalAccountTest.t.sol`). To initiate an action from the account, we directly called the `execute` function, passing the destination address, value, and calldata:

```solidity
// From MinimalAccountTest.t.sol (Ethereum AA Example)
function testOwnerCanExecuteCommands() public {
    // Arrange
    address dest = address(usdc);
    uint256 value = 0;
    bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(minimalAccount), AMOUNT);

    // Act
    vm.prank(minimalAccount.owner());
    // Direct call with simple parameters
    minimalAccount.execute(dest, value, functionData);

    // Assert
    assertEq(usdc.balanceOf(address(minimalAccount)), AMOUNT);
}
```

However, ZKsync AA contracts, like our `ZkMinimalAccount.sol` example, typically use an `executeTransaction` function. This function requires a more complex set of arguments, notably a `Transaction` struct, instead of simple, discrete parameters.

```solidity
// From ZkMinimalAccount.sol (ZKsync AA Contract)
function executeTransaction(bytes32, /*_txHash*/ bytes32, /*_suggestedSignedHash*/ Transaction memory _transaction)
    external
    payable
    requireFromBootloaderOrOwner // Note this modifier
{
    _executeTransaction(_transaction);
}
```

This `Transaction` struct encapsulates all the details of a ZKsync transaction, conceptually similar to the `UserOperation` struct in ERC-4337.

### Creating a Helper Function for the `Transaction` Struct

Unlike the Ethereum AA examples where we might use a separate script (like `SendPackedUserOp.s.sol`) to build `UserOperation` structs, we'll create a helper function directly within our ZKsync test file (`ZkMinimalAccountTest.t.sol`) to construct the `Transaction` struct dynamically during testing.

First, we need to import the definition of the `Transaction` struct. This struct is defined within the ZKsync Era Foundry contracts library. Add the following import statement to your `ZkMinimalAccountTest.t.sol`:

```solidity
import {Transaction} from "lib/foundry-era-contracts/src/system-contracts/contracts/libraries/MemoryTransactionHelper.sol";
```

The `Transaction` struct, defined in `MemoryTransactionHelper.sol`, contains numerous fields detailing a ZKsync transaction:

```solidity
// Located in lib/foundry-era-contracts/src/system-contracts/contracts/libraries/MemoryTransactionHelper.sol
struct Transaction {
    uint256 txType; // Type: Legacy, EIP2930, EIP1559, ZKsync native, etc.
    uint256 from; // Caller (as uint256)
    uint256 to; // Callee (as uint256)
    uint256 gasLimit;
    uint256 gasPerPubdataByteLimit; // Max gas per byte of pubdata sent to L1
    uint256 maxFeePerGas;
    uint256 maxPriorityFeePerGas;
    uint256 paymaster; // Address of the paymaster (0 if none)
    uint256 nonce;
    uint256 value;
    uint256[4] reserved; // Reserved for future use
    bytes data; // Calldata
    bytes signature; // Transaction signature
    bytes32[] factoryDeps; // Hashes of contract bytecodes to be deployed
    bytes paymasterInput; // Input data for the paymaster
    bytes reservedDynamic; // Reserved dynamic field
}
```

Now, let's implement the helper function `_createUnsignedTransaction` within `ZkMinimalAccountTest.t.sol`. This function will take basic parameters and populate a `Transaction` struct, leaving the signature field empty.

```solidity
/*//////////////////////////////////////////////////////////////
                         HELPERS
//////////////////////////////////////////////////////////////*/
function _createUnsignedTransaction(
    address from,
    uint8 transactionType,
    address to,
    uint256 value,
    bytes memory data
) internal view returns (Transaction memory) {
    // Fetch nonce using Foundry cheatcode (simplification for tests)
    uint256 nonce = vm.getNonce(address(minimalAccount));
    // Initialize empty factory dependencies array
    bytes32[] memory factoryDeps = new bytes32[](0);

    return Transaction({
        // Set transaction type (113 or 0x71 for ZKsync native AA)
        txType: transactionType,
        // Convert addresses to uint256 via uint160
        from: uint256(uint160(from)),
        to: uint256(uint160(to)),
        // Use hardcoded high gas values (sufficient for testing)
        gasLimit: 16777216,
        gasPerPubdataByteLimit: 16777216,
        maxFeePerGas: 16777216,
        maxPriorityFeePerGas: 16777216,
        // No paymaster used in this example
        paymaster: 0,
        // Use the fetched nonce
        nonce: nonce,
        // Use the provided value
        value: value,
        // Initialize reserved slots to zero
        reserved: [uint256(0), uint256(0), uint256(0), uint256(0)],
        // Use the provided calldata
        data: data,
        // Set empty signature as this is an unsigned transaction
        signature: hex"",
        // Use empty factory dependencies (no deployments in this tx)
        factoryDeps: factoryDeps,
        // Set empty paymaster input
        paymasterInput: hex"",
        // Set empty reserved dynamic field
        reservedDynamic: hex""
    });
}
```

**Key Points about the Helper Function Fields:**

*   **`txType`**: Set to the input `transactionType`. For ZKsync native AA transactions, use `113` (decimal) or `0x71` (hex). Other types like `0` (Legacy), `1` (EIP2930), `2` (EIP1559) exist for different transaction formats.
*   **`from` / `to`**: Crucially, these fields are `uint256`, not `address`. We convert the `address` inputs first to `uint160` and then cast to `uint256`. This conversion pattern is common in low-level interactions.
*   **Gas Fields (`gasLimit`, `gasPerPubdataByteLimit`, etc.)**: For simplicity in this test, we've hardcoded large values copied from reference examples. `gasPerPubdataByteLimit` relates specifically to the cost of publishing transaction data to the L1 chain.
*   **`paymaster`**: Set to `0` (the zero address) as we are not using a paymaster.
*   **`nonce`**: We use Foundry's `vm.getNonce(address)` cheatcode. **Important:** In a live ZKsync environment or more complex tests, you would typically query the account's nonce from the system's `NonceHolder` contract. Foundry's cheatcode provides a convenient shortcut here.
*   **`reserved`**: An array initialized with zeros, reserved for future protocol upgrades.
*   **`data`**: The calldata for the intended interaction (e.g., the encoded function call).
*   **`signature`**: Set to empty bytes (`hex""`) because this helper generates an *unsigned* transaction struct. We will address signature handling later.
*   **`factoryDeps`**: An empty `bytes32[]` array. This field is used to provide the bytecode of contracts that will be deployed by this transaction. Since we aren't deploying contracts here, it's empty.
*   **`paymasterInput`**: Empty bytes, as no paymaster is involved.
*   **`reservedDynamic`**: Empty bytes, reserved for future use.

### Using the Helper in Your Test

With the helper function defined, we can now use it within our test function (`testZkOwnerCanExecuteCommands`) to create the `Transaction` struct needed for the `executeTransaction` call.

```solidity
function testZkOwnerCanExecuteCommands() public {
    // Arrange
    address dest = address(usdc);
    uint256 value = 0;
    // Prepare calldata for the target function (e.g., minting USDC)
    bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(minimalAccount), AMOUNT);

    // Use the helper to create the unsigned transaction struct
    Transaction memory transaction = _createUnsignedTransaction(
        minimalAccount.owner(), // From the account owner
        113,                    // ZKsync native AA transaction type (0x71)
        dest,                   // Target contract (USDC)
        value,                  // ETH value (0)
        functionData            // Calldata for the mint function
    );

    // Define an empty bytes32 constant if not already present
    // bytes32 constant EMPTY_BYTES32 = bytes32(0);

    // Act
    // Prank as the owner to satisfy the requireFromBootloaderOrOwner modifier
    vm.prank(minimalAccount.owner());
    // Call executeTransaction, passing empty hashes and the transaction struct
    minimalAccount.executeTransaction(EMPTY_BYTES32, EMPTY_BYTES32, transaction);

    // Assert
    // Verify the intended action occurred (e.g., USDC balance increased)
    assertEq(usdc.balanceOf(address(minimalAccount)), AMOUNT);
}
```

### Understanding Signature Handling

You might wonder why we can pass a transaction with an empty `signature` field to `executeTransaction` and have it succeed. The key lies in the context of this specific test and the contract's modifier.

1.  **`vm.prank(minimalAccount.owner())`**: We explicitly set the `msg.sender` for the next call to be the owner of the `minimalAccount`.
2.  **`requireFromBootloaderOrOwner` Modifier**: The `executeTransaction` function has this modifier. It checks if the `msg.sender` is either the special ZKsync `Bootloader` address *or* the owner of the account.
3.  **Bypassing Signature Validation**: Because our call comes directly from the owner (`vm.prank`), the `requireFromBootloaderOrOwner` modifier check passes. The internal logic (`_executeTransaction`) likely proceeds without re-validating the signature field in the `Transaction` struct when the call is authorized directly by the owner via this entry point.

If the transaction were submitted through a different mechanism (e.g., via a relayer/bundler targeting a different entry point designed for external submission), signature validation *would* be strictly enforced based on the `signature` field within the `Transaction` struct.

By creating and utilizing the `_createUnsignedTransaction` helper, you can successfully construct the necessary `Transaction` struct and interact with your ZKsync AA contract within Foundry tests, leveraging `vm.prank` to simulate owner-initiated actions.