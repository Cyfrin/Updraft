## Preparing for Testnet Deployment and Testing

Our goal now is to prepare the project codebase for deployment and rigorous testing on live blockchain test environments. Specifically, we'll target the Sepolia and zkSync Sepolia testnets. This involves ensuring our deployment scripts compile correctly and addressing any potential issues that might arise during testing, particularly those related to Foundry's configuration and time-sensitive logic.

The deployment plan is as follows:

1.  **Sepolia Testnet:** Deploy the core contracts: a Vault contract, a RebaseToken contract, and its associated TokenPool contract.
2.  **zkSync Sepolia Testnet:** Deploy the corresponding counterpart contracts: another Token contract and its TokenPool contract.
3.  **Testing Objective:** Once deployed, we need to verify the cross-chain bridging functionality works as expected by sending tokens from Sepolia to zkSync Sepolia using our deployed infrastructure.

## Building the Project and Resolving Compilation Errors

Before deploying, we must ensure the project, including our deployment scripts, compiles without errors. Let's start by running the standard Foundry build command:

```bash
forge build
```

Executing this reveals a compilation error originating from our deployment script:

*   **Error Message:** `Error (6651): Data location must be "storage", "memory" or "calldata" for variable, but none was given.`
*   **File:** `script/BridgeTokens.s.sol`
*   **Line:** 28

Looking at the problematic code around line 28 in `BridgeTokens.s.sol`, we find the declaration of a struct variable:

```solidity
// Error occurs here
Client.EVM2AnyMessage message = Client.EVM2AnyMessage({
    receiver: abi.encode(receiverAddress),
    data: "",
    tokenAmounts: tokenAmounts,
    feeToken: linkTokenAddress,
    extraArgs: Client._argsToBytes(Client.EVMExtraArgsV1({gasLimit: 0}))
});
```

The error message is explicit: Solidity requires complex types like structs, when declared inside a function and not intended for contract storage, to have their data location specified. In this case, the `message` struct is temporary and should reside in memory.

To fix this, we simply add the `memory` keyword to the variable declaration:

```solidity
// Corrected code
Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
    receiver: abi.encode(receiverAddress),
    data: "",
    tokenAmounts: tokenAmounts,
    feeToken: linkTokenAddress,
    extraArgs: Client._argsToBytes(Client.EVMExtraArgsV1({gasLimit: 0}))
});
```

After applying this fix, we run the build command again:

```bash
forge build
```

This time, the compilation succeeds, indicating our Solidity code is syntactically correct.

## Configuring Foundry and Handling RPC URLs

Foundry uses the `foundry.toml` file for project configuration, including specifying RPC endpoints for interacting with different networks. Your `foundry.toml` might look something like this:

```toml
[profile.default]
# ... other configurations ...
rpc_endpoints = { sepolia-eth = "https://eth-sepolia.g.alchemy.com/v2/mw...", arb-sepolia = "https://arb-sepolia.g.alchemy.com/v2/mw..." }
# ... other configurations ...
```

**Important Security Note:** The RPC URLs shown in examples or videos are often placeholders or temporary. **Do not use the specific URLs provided in any instructional material**, as they will likely be deactivated. Furthermore, **never commit your personal RPC URLs, especially those containing API keys, to public repositories like GitHub.** Exposing these URLs can lead to misuse, potential rate limiting on your account, or even incur costs if the service provider bills based on usage tied to the API key. Always use environment variables or secure secret management practices for sensitive data like RPC URLs.

## Addressing the Foundry `vm.warp` and `via_ir` Interaction Bug

When preparing for automated testing, especially within Continuous Integration (CI) environments like GitHub Actions, you might consider enabling Foundry's IR-based compiler pipeline (`via_ir`) in your `foundry.toml`. This can sometimes offer code optimizations:

```toml
[profile.default]
# ...
via_ir = true # Enables the IR pipeline
# ...
```

However, there's a known incompatibility between enabling `via_ir` and using the `vm.warp(timestamp)` cheatcode in Foundry tests. The `vm.warp()` cheatcode is essential for manipulating the block timestamp within tests, allowing us to simulate the passage of time, which is critical for testing features like interest accrual or time-locked functions.

**The Bug:** When `via_ir = true` is set in `foundry.toml`, `vm.warp()` does not function as expected. Tests relying on it may produce incorrect results or fail entirely. This behavior is documented in the Foundry GitHub repository, specifically under **Issue #8102**: `vm.warp() does not work as intended when via_ir = true` ([https://github.com/foundry-rs/foundry/issues/8102](https://github.com/foundry-rs/foundry/issues/8102)). Related linked issues provide further context.

**Impact:** Our test suite includes `CrossChain.t.sol`, which tests the bridging functionality. This test likely uses `vm.warp()` to simulate time passing to verify that features like the user interest rate update correctly after bridging or over time. If `via_ir` were enabled globally, these tests would fail due to the bug.

**Workaround Investigation:** Some suggested workarounds in the GitHub issue (like using `vm.getBlockTimestamp()` or storing values in state before warping) were attempted but did not reliably resolve the issue within our specific test structure.

**Chosen Workaround Strategy:** To ensure our tests pass reliably both locally and potentially in future CI setups (which might try to enable `via_ir`), we will implement the following:

1.  **Disable `via_ir` Globally (For Now):** Remove or comment out `via_ir = true` from the `[profile.default]` section in `foundry.toml`. This prevents the bug from affecting our current test runs.
    ```toml
    [profile.default]
    # ...
    # via_ir = true # Commented out or removed
    # ...
    ```
2.  **Refactor Test Logic (`CrossChain.t.sol`):** The core issue arises when `vm.warp` is called *within* a function (like our `bridgeTokens` test helper) where we are also trying to assert state changes based on that time warp. Because `vm.warp`'s behavior is unreliable under `via_ir`, we need to restructure the test to isolate the time manipulation.
    *   **Remove Time-Dependent Assertions from Helper:** Inside the `bridgeTokens` helper function within `CrossChain.t.sol`, remove any local variable declarations and assertions that check state directly affected by a `vm.warp` call *within that same helper*. For example, lines checking `localToken.getUserInterestRate(user)` before and after an internal `vm.warp` are removed from the helper.
        ```solidity
        // Inside bridgeTokens test helper - REMOVE lines similar to these:
        // uint256 localUserInterestRate = localToken.getUserInterestRate(user); // REMOVE
        // ... vm.warp(...) ... // Keep warp if needed for function logic, but don't assert based on it HERE
        // assertEq(remoteToken.getUserInterestRate(user), localUserInterestRate); // REMOVE assertion here
        ```
    *   **Move Assertions to Main Test Function:** Relocate the checks for time-dependent state (like the user interest rate) to the main test function (e.g., `testBridgeAllTokens`). The pattern becomes:
        1.  In the main test, capture the initial state (e.g., source chain interest rate) *before* calling the helper function.
        2.  Call the `bridgeTokens` helper function.
        3.  In the main test, *after* the helper returns, call `vm.warp()` to simulate the necessary time passage.
        4.  In the main test, assert the *final* state (e.g., destination chain interest rate) against the expected value (which might be the initial state captured in step 1, depending on the logic).
        ```solidity
         // In main test function (e.g., testBridgeAllTokens)
         // Capture initial state if needed
         uint256 initialSourceInterestRate = localToken.getUserInterestRate(user);

         // Call the helper function (which might still internally warp time for its own logic if necessary)
         bridgeTokens(...);

         // Warp time *in the main test scope* AFTER the helper returns
         vm.warp(block.timestamp + 1 hours); // Example

         // Assert final state in the main test scope
         assertEq(remoteToken.getUserInterestRate(user), initialSourceInterestRate); // Example assertion
        ```
3.  **Code Cleanup (Optional):** As a minor refinement, redundant local variables within the test helpers can be removed. For instance, if a `fee` variable is calculated using `routerClient.getFee(...)` and only used immediately as arguments to other functions, the function call can be passed directly:
    ```solidity
    // Instead of:
    // uint256 fee = routerClient.getFee(...);
    // ccipLocalSimulatorFork.requestLinkFromFaucet(..., fee);
    // IERC20(localToken).approve(..., fee);

    // Use directly:
    uint256 fee = routerClient.getFee(...); // Keep calculation if needed multiple times or for clarity
    ccipLocalSimulatorFork.requestLinkFromFaucet(..., fee);
    IERC20(localToken).approve(..., /* Use fee variable or recalculate/pass directly */);
    // Or if only needed once per call:
    // ccipLocalSimulatorFork.requestLinkFromFaucet(..., routerClient.getFee(...));
    // IERC20(localToken).approve(..., routerClient.getFee(...)); // Adjust based on exact logic
    ```
    This cleanup improves readability slightly but isn't directly related to the `vm.warp` bug fix.

## Final Build Confirmation

After implementing the fix for the `memory` keyword and applying the workaround for the `vm.warp`/`via_ir` bug by refactoring the test logic and ensuring `via_ir` is disabled in `foundry.toml`, we run the build command one last time:

```bash
forge build
```

The command executes successfully, confirming that our project's contracts and scripts compile without errors and that our test setup avoids the known Foundry bug related to `vm.warp`. The project is now better prepared for deployment and testing on the Sepolia and zkSync Sepolia testnets.