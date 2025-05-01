## Setting Up the Foundry Test Environment

To begin testing our `MinimalAccount.sol` smart contract, we first need to establish a dedicated testing environment using Foundry.

Navigate to your project's `test` directory. Inside this directory, create a new subdirectory named `ethereum`. Within `test/ethereum`, create a new file named `MinimalAccountTest.t.sol`. This file will house all the tests related to our `MinimalAccount` contract.

Inside `MinimalAccountTest.t.sol`, start with the standard Foundry test contract structure:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24; // Ensure this matches your contract's version

import {Test} from "forge-std/Test.sol"; // Foundry's core testing library
import {MinimalAccount} from "src/ethereum/MinimalAccount.sol"; // The contract under test
import {DeployMinimal} from "script/DeployMinimal.s.sol"; // Our deployment script
import {HelperConfig} from "script/HelperConfig.s.sol"; // Configuration used by the deployment script
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol"; // For mocking USDC

contract MinimalAccountTest is Test {
    // State variables will be declared here
    HelperConfig helperConfig;
    MinimalAccount minimalAccount;
    ERC20Mock usdc;

    // Constant for test amounts
    uint256 constant AMOUNT = 1e18; // Represents 1 token with 18 decimals

    function setUp() public {
        // Deployment and setup logic will go here
    }

    // Test functions will follow
}

```

We import the necessary contracts: `Test` for Foundry utilities, `MinimalAccount` (the contract we're testing), `DeployMinimal` and `HelperConfig` (our deployment infrastructure), and `ERC20Mock` from OpenZeppelin, which we'll use later to simulate USDC interactions. We also declare state variables `helperConfig`, `minimalAccount`, and `usdc` so they are accessible across all test functions within this contract. A constant `AMOUNT` is defined for convenience in testing token transfers.

## Implementing the `setUp` Function

The `setUp` function in Foundry is a special function that runs before each individual test function (`test...`). This ensures a clean and consistent state for every test execution.

We'll use the `setUp` function to deploy our `MinimalAccount` contract using the `DeployMinimal.s.sol` script we created previously. We also deploy our mock USDC contract here.

```solidity
    function setUp() public {
        // Deploy MinimalAccount and get HelperConfig using the deployment script
        DeployMinimal deployMinimal = new DeployMinimal();
        (helperConfig, minimalAccount) = deployMinimal.deployMinimalAccount();

        // Deploy the mock USDC contract
        usdc = new ERC20Mock();
    }
```

Inside `setUp`, we instantiate `DeployMinimal` and call its `deployMinimalAccount` function. This function returns the deployed `MinimalAccount` instance and the `HelperConfig` object, which we store in our state variables. We also deploy a new instance of `ERC20Mock` and assign it to the `usdc` state variable.

## Test 1: Verifying Owner Execution

Our ultimate goal is to test the full ERC-4337 account abstraction flow involving off-chain signatures, bundlers, and the EntryPoint contract. However, we'll start with a simpler, fundamental test: ensuring the designated *owner* of the `MinimalAccount` can directly call its `execute` function to perform actions. This bypasses the EntryPoint mechanism for now.

We'll test this by having the owner instruct the `MinimalAccount` to mint mock USDC tokens *to itself*.

Let's write the first test function, `testOwnerCanExecuteCommands`, following the Arrange-Act-Assert pattern:

```solidity
    function testOwnerCanExecuteCommands() public {
        // Arrange: Set up the conditions for the test
        address dest = address(usdc); // The target contract is our mock USDC
        uint256 value = 0; // We are not sending any ETH value
        // Encode the calldata for calling the 'mint' function on the mock USDC contract.
        // The MinimalAccount will mint 'AMOUNT' tokens to its own address.
        bytes memory functionData = abi.encodeWithSelector(
            ERC20Mock.mint.selector, // Function selector for mint(address, uint256)
            address(minimalAccount), // Recipient of the minted tokens (the account itself)
            AMOUNT                   // Amount of tokens to mint
        );

        // Assert initial state: Ensure the account starts with zero mock USDC
        assertEq(usdc.balanceOf(address(minimalAccount)), 0, "Initial balance should be zero");

        // Act: Perform the action being tested
        // Use vm.prank to simulate the call originating from the account's owner
        vm.prank(minimalAccount.owner());
        // Call the execute function on the MinimalAccount
        minimalAccount.execute(dest, value, functionData);

        // Assert: Verify the outcome
        // Check if the MinimalAccount now holds the minted mock USDC tokens
        assertEq(usdc.balanceOf(address(minimalAccount)), AMOUNT, "Final balance should match minted amount");
    }
```

**Arrange:** We define the parameters for the `minimalAccount.execute` call: the destination address (`dest` is the mock USDC contract), the ETH `value` (0), and the `functionData`. The `functionData` is created using `abi.encodeWithSelector`, specifying the `mint` function signature and providing the arguments: the `MinimalAccount`'s address as the recipient and the `AMOUNT` constant. We also add an initial assertion to confirm the account's USDC balance is zero before the action.

**Act:** This is where the core action happens. We use Foundry's `vm.prank(address)` cheatcode. `vm.prank(minimalAccount.owner())` makes the *next* contract call appear as if it originated from the `minimalAccount`'s owner address. Immediately following the `prank`, we call `minimalAccount.execute` with the arranged parameters.

**Assert:** Finally, we verify the result. We use `assertEq` to check if the mock USDC balance of the `minimalAccount` is now equal to `AMOUNT`, confirming the `execute` call successfully triggered the `mint` function on the USDC contract.

## Debugging and Initial Run Fixes

Running `forge test` at this stage might reveal some issues, which is a normal part of development.

**Failure 1: `OwnableInvalidOwner(address(0))`**

You might encounter this error during the `setUp` phase. It originates from the `DeployMinimal.s.sol` script attempting to transfer ownership of the `MinimalAccount` contract. The issue lies in our `HelperConfig.s.sol` for the local Anvil environment (`getOrCreateAnvilEthConfig`). If this function doesn't return a valid owner address in the `account` field of the `NetworkConfig` struct (e.g., returns `address(0)`), the `Ownable` contract within `MinimalAccount` will reject the ownership transfer.

**Fix:** Modify `HelperConfig.s.sol` to provide a default owner address for the local Anvil configuration. Foundry often uses a default sender address.

```solidity
// In HelperConfig.s.sol
contract HelperConfig is Script {
    // ... other code ...
    address constant FOUNDRY_DEFAULT_WALLET = 0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38; // Default Anvil sender

    // ... other code ...

    function getOrCreateAnvilEthConfig() public pure returns (NetworkConfig memory anvilNetworkConfig) {
        // Return config with the default wallet as the account owner
        return NetworkConfig({entryPoint: address(0), account: FOUNDRY_DEFAULT_WALLET});
        // Note: We set entryPoint to address(0) for now as it's not used in these initial tests.
    }
}
```
By setting `account: FOUNDRY_DEFAULT_WALLET`, we ensure the deployment script receives a valid owner address when running locally.

**Failure 2: `MinimalAccount__NotFromEntryPoint()` Revert**

After fixing the owner issue, running the test again might cause `testOwnerCanExecuteCommands` to fail with a revert reason like `MinimalAccount__NotFromEntryPoint()`. This happens because our `MinimalAccount.execute` function initially likely had a modifier restricting calls *only* to the `EntryPoint` contract. Our test simulates a call directly from the *owner*, which this modifier prevents.

**Fix:** Update the modifier on the `execute` function in `MinimalAccount.sol` to allow calls from *either* the EntryPoint *or* the owner. Assuming you have a modifier like `requireFromEntryPointOrOwner`, apply it:

```solidity
// In MinimalAccount.sol
contract MinimalAccount is /* ... */ {
    // ... other functions and variables ...

    modifier requireFromEntryPointOrOwner() {
        require(msg.sender == owner || msg.sender == ENTRY_POINT, "MinimalAccount__NotFromEntryPointOrOwner");
        _;
    }

    // Ensure execute uses the correct modifier
    function execute(address dest, uint256 value, bytes calldata func)
        external
        requireFromEntryPointOrOwner // Use the modifier allowing owner calls
    {
        // ... implementation ...
    }

    // ... rest of the contract ...
}

```
By changing the modifier on `execute` to `requireFromEntryPointOrOwner`, we allow the owner (simulated via `vm.prank`) to successfully call this function.

After applying these fixes, running `forge test` should show `testOwnerCanExecuteCommands` passing.

## Test 2: Preventing Non-Owner Execution

Now that we've confirmed the owner *can* execute commands, we need to ensure that an arbitrary address *cannot*. This test verifies the access control implemented by our `requireFromEntryPointOrOwner` modifier.

We'll create a test function `testNonOwnerCannotExecuteCommands` that attempts the same `execute` action, but simulates the call originating from a random address. We expect this call to be reverted.

```solidity
    function testNonOwnerCannotExecuteCommands() public {
        // Arrange: Similar setup as the first test for the action itself
        address dest = address(usdc);
        uint256 value = 0;
        bytes memory functionData = abi.encodeWithSelector(
            ERC20Mock.mint.selector,
            address(minimalAccount),
            AMOUNT
        );

        // Create a random address that is not the owner
        address randomUser = makeAddr("randomUser"); // Foundry cheatcode to generate a deterministic address

        // Act & Assert: Attempt the action and expect a specific revert
        // Simulate the call originating from the random user
        vm.prank(randomUser);
        // Expect the specific revert from our access control modifier
        vm.expectRevert(MinimalAccount.MinimalAccount__NotFromEntryPointOrOwner.selector);
        // Attempt to call execute - this call should trigger the expected revert
        minimalAccount.execute(dest, value, functionData);

        // Assertion is implicit: The test passes only if the expected revert occurs.
        // We can optionally add an assertion that the balance did NOT change.
        assertEq(usdc.balanceOf(address(minimalAccount)), 0, "Balance should remain zero after failed call");
    }
```

**Arrange:** We set up the `dest`, `value`, and `functionData` just like in the previous test. The key addition here is creating `randomUser` using Foundry's `makeAddr("some_label")` cheatcode, which generates a unique, deterministic address for testing purposes.

**Act & Assert:** We use `vm.prank(randomUser)` to simulate the call from this non-owner address. Crucially, *before* the call to `minimalAccount.execute`, we use `vm.expectRevert(bytes4 selector)`. This tells Foundry to expect the *next* external call to revert with the specified error selector. We provide the selector for our custom error `MinimalAccount__NotFromEntryPointOrOwner`. The subsequent call to `minimalAccount.execute` is then made. The test will only pass if this call reverts with exactly that error. We also add a final `assertEq` to double-check that the state (USDC balance) didn't change, confirming the execution was indeed blocked.

Running `forge test` again should now show both `testOwnerCanExecuteCommands` and `testNonOwnerCannotExecuteCommands` passing. This confirms that our `MinimalAccount` correctly allows execution by the owner while preventing unauthorized calls, establishing a solid foundation before testing more complex Account Abstraction interactions.