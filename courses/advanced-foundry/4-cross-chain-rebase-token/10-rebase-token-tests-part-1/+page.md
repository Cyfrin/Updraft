## Setting Up Rebase Token Tests

This lesson focuses on writing initial tests for the `Vault` and `RebaseToken` contracts using the Foundry testing framework. We'll set up the test environment and begin writing our first test to verify core functionality before integrating cross-chain features.

## Creating the Test File and Boilerplate

First, we need a dedicated file for our tests within the project's `test` directory.

1.  Create a new file named `RebaseToken.t.sol`. Foundry recognizes files ending with `.t.sol` as test files.

2.  Add the standard Solidity license identifier and pragma statement:

    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.24;
    ```

3.  Import necessary components from the Foundry Standard Library (`forge-std`). We need `Test` for the testing framework and cheatcodes, and `console` for potential logging during test execution.

    ```solidity
    import { Test, console } from "forge-std/Test.sol";
    ```

4.  Import the contracts we intend to test (`RebaseToken`, `Vault`) from the `src` directory. Use relative paths.

    ```solidity
    import { RebaseToken } from "../src/RebaseToken.sol";
    import { Vault } from "../src/Vault.sol";
    ```

5.  Import the `IRebaseToken` interface. The `Vault` constructor requires an argument of this type.

    ```solidity
    import { IRebaseToken } from "../src/interfaces/IRebaseToken.sol";
    ```

## Defining the Test Contract

Now, define the test contract itself. It should inherit from Foundry's `Test` contract to gain access to testing utilities and cheatcodes.

```solidity
contract RebaseTokenTest is Test {
    // Test setup, state variables, and test functions will go here
}
```

## Implementing the Setup Function

Foundry provides a special function named `setup` which is automatically executed before each test function (functions starting with `test...`). This is ideal for deploying contracts and setting up a consistent initial state for tests.

1.  **Declare State Variables:** Define state variables within `RebaseTokenTest` to hold instances of the deployed contracts and other necessary values like user addresses. Making them `private` or `internal` is common unless needed externally.

    ```solidity
    contract RebaseTokenTest is Test {
        RebaseToken private rebaseToken;
        Vault private vault;
        address public owner;
        address public user;

        // Setup function and test functions follow
    }
    ```

2.  **Define the `setup` Function:** Create the `setup` function, marking it `public`.

    ```solidity
    function setup() public {
        // Deployment and configuration logic
    }
    ```

3.  **Create Addresses:** Inside `setup`, generate deterministic addresses for the contract owner (deployer) and a test user using Foundry's `makeAddr` cheatcode.

    ```solidity
    // Inside setup()
    owner = makeAddr("owner");
    user = makeAddr("user");
    ```

4.  **Prank as Owner for Deployment:** Many contracts, especially those using ownership patterns like OpenZeppelin's `Ownable`, require specific setup actions to be performed by the deployer (owner). To simulate this, use Foundry's `vm.startPrank(address)` cheatcode *before* deploying the contracts and performing owner-restricted actions. Remember to call `vm.stopPrank()` afterwards.

    ```solidity
    // Inside setup()
    owner = makeAddr("owner");
    user = makeAddr("user");

    vm.startPrank(owner); // Set msg.sender to owner for subsequent calls

    // --- Owner-specific actions start ---

    // Deploy RebaseToken
    rebaseToken = new RebaseToken();

    // Deploy Vault (Requires IRebaseToken interface)
    // Direct casting 'IRebaseToken(rebaseToken)' fails.
    // Cast to address first, then to the interface.
    vault = new Vault(IRebaseToken(address(rebaseToken)));

    // Grant Mint/Burn Role to Vault
    // The grantMintAndBurnRole function expects an address, not the contract instance.
    rebaseToken.grantMintAndBurnRole(address(vault));

    // Add Initial Rewards (ETH) to Vault
    // Use a low-level call to send ETH to the Vault's receive() function.
    // 1e18 represents 1 ETH in wei.
    (bool success, ) = payable(address(vault)).call{value: 1e18}("");
    // In tests, an unsuccessful call typically reverts the test.
    // In production, 'success' MUST be checked.
    require(success, "Failed to send initial ETH to Vault"); // Optional but good practice even in tests

    // --- Owner-specific actions end ---

    vm.stopPrank(); // Reset msg.sender
    ```

    *   **Type Conversion Note:** When passing a contract instance (`rebaseToken`) to a constructor or function expecting an interface type (`IRebaseToken`), Solidity requires an explicit intermediate cast to `address`: `IRebaseToken(address(rebaseToken))`. Similarly, when a function expects an `address` argument but you have the contract instance (`vault`), use `address(vault)`.

    *   **NatSpec Fix (Informational):** During development, `forge build` might reveal documentation comment (NatSpec) errors. For instance, if a `@return` tag is missing the variable name it describes, the build will fail. Ensure NatSpec comments are correctly formatted (e.g., `@return variableName Description`).

5.  **Setup Simplification Note:** Manually sending ETH to the `Vault` using `.call` in the `setup` function is a simplification for this tutorial. In a real-world DeFi application, the `Vault`'s balance would typically accumulate organically through protocol mechanisms (e.g., interest payments, fees). The interest rates themselves would likely be dynamic based on market conditions or protocol state, not fixed as they might be initially in our contracts. Our current focus is on testing the rebase and cross-chain mechanics.

## Writing the First Test: Linear Deposit Growth

Our first test, `testDepositLinear`, aims to verify that the balance increase due to interest accrual is linear over time for a user who deposits into the `Vault`.

**Strategy:**

1.  A user deposits a certain amount into the `Vault`.
2.  Record the user's initial `RebaseToken` balance (Balance 1).
3.  Advance time by a specific interval (e.g., 1 day) using `vm.warp`.
4.  Record the user's balance after the first interval (Balance 2).
5.  Advance time by the *exact same* interval again.
6.  Record the user's final balance (Balance 3).
7.  Assert that the balance increase during the second interval (`Balance 3 - Balance 2`) is equal to the increase during the first interval (`Balance 2 - Balance 1`).

**Implementation Steps:**

1.  **Define Test Function with Fuzzing:** Create the test function. To test with various deposit amounts, make the `amount` a parameter. This turns the function into a fuzz test, where Foundry will run it multiple times with different generated values for `amount`.

    ```solidity
    function testDepositLinear(uint256 amount) public {
        // Test logic will go here
    }
    ```

2.  **Bound the Fuzzed Input:** The fuzzer might generate amounts that are too small (e.g., 0 or 1 wei, leading to negligible interest) or unrealistically large. Use Foundry's `bound` cheatcode to constrain the `amount` to a reasonable range. Here, we set a minimum of 100,000 wei (`1e5`) and a maximum of `type(uint96).max` (a large but somewhat arbitrary upper limit). Apply the bound *before* using the `amount`.

    ```solidity
    function testDepositLinear(uint256 amount) public {
        // Bound the fuzzed amount to a reasonable range
        amount = bound(amount, 1e5, type(uint96).max);

        // ... rest of the test logic ...
    }
    ```

3.  **Prepare the User:** The deposit action must be performed by the `user`.
    *   Use `vm.startPrank(user)` before the user actions.
    *   The `user` needs ETH to deposit into the `Vault`. Use Foundry's `vm.deal` cheatcode to give the `user` address the (bounded) `amount` of ETH.

    ```solidity
    function testDepositLinear(uint256 amount) public {
        // Bound the fuzzed amount
        amount = bound(amount, 1e5, type(uint96).max);

        // Start pranking as the user
        vm.startPrank(user);

        // Give the user the ETH needed for the deposit
        vm.deal(user, amount);

        // --- User actions (deposit, balance checks, time warps) will follow ---

        // Remember to stop pranking at the end of user actions
        // vm.stopPrank(); // To be added later
    }
    ```

The setup for `testDepositLinear` is now partially complete. We have bounded the fuzzed input, set the context to the `user`, and provided the necessary ETH for the upcoming deposit action. The next steps involve performing the deposit, checking balances, warping time, and adding the final assertions.