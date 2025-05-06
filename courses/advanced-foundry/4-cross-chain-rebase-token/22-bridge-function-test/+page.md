## Testing Cross-Chain Token Transfers with Chainlink CCIP and Foundry

This lesson guides you through building and testing a reusable Solidity function, `bridgeTokens`, within a Foundry test environment. The function facilitates cross-chain token transfers using Chainlink's Cross-Chain Interoperability Protocol (CCIP). We will specifically focus on transferring a custom rebase token between simulated Sepolia and Arbitrum Sepolia testnets, paying fees in LINK, and verifying the outcome using the Chainlink Local Simulator integrated into our Foundry tests.

## Key CCIP Concepts for Token Transfers

Before diving into the code, let's review the core Chainlink CCIP concepts involved:

1.  **Chainlink CCIP (Cross-Chain Interoperability Protocol):** The underlying technology enabling secure message and token transfers between different blockchains.
2.  **Cross-Chain Token Transfer:** The process where tokens are locked or burned on the source chain, and an equivalent amount is minted or unlocked on the destination chain, orchestrated by CCIP.
3.  **Router Contract:** A key CCIP smart contract deployed on each supported chain. It handles sending messages/tokens via the `ccipSend` function and provides fee calculation through `getFee`.
4.  **`Client.EVM2AnyMessage` Struct:** A data structure from the Chainlink `Client` library. It bundles all necessary information for a CCIP message, including:
    *   `receiver`: The target address on the destination chain (bytes).
    *   `data`: An optional payload for arbitrary data transfer (bytes).
    *   `tokenAmounts`: An array specifying the token(s) and amount(s) to transfer (`Client.EVMTokenAmount[]`).
    *   `feeToken`: The address of the token used to pay CCIP fees (e.g., LINK address on the source chain).
    *   `extraArgs`: Additional parameters for execution, like gas limits, encoded using `Client._argsToBytes`.
5.  **Chain Selector:** A unique `uint64` identifier representing each CCIP-supported blockchain, crucial for specifying the destination chain.
6.  **Fee Token (LINK):** CCIP transactions require fees paid on the source chain. This example uses LINK tokens.
7.  **ERC20 Approvals:** Standard token approvals are necessary before CCIP can move funds on behalf of the user:
    *   The user must approve the Router contract to spend the required LINK fee amount.
    *   The user must approve the Router contract to spend the tokens being bridged.

## Implementing the `bridgeTokens` Function

We will implement the `bridgeTokens` function within a Foundry test contract (`CrossChain.t.sol`). This function will encapsulate the logic for a single cross-chain transfer, making it reusable for testing transfers in either direction. It takes parameters defining the local (source) and remote (destination) forks, network details (like Router and LINK addresses), the token contracts, the user address, and the amount to bridge.

Here are the essential steps performed within the `bridgeTokens` function:

1.  **Select Source Fork Context:** Ensure Foundry's execution context is set to the source chain.
    ```solidity
    vm.selectFork(localFork);
    ```

2.  **Construct the CCIP Message:** Create and populate the `Client.EVM2AnyMessage` struct.
    ```solidity
    // Define the token amount structure
    Client.EVMTokenAmount[] memory tokenAmounts = new Client.EVMTokenAmount[](1);
    tokenAmounts[0] = Client.EVMTokenAmount({
        token: address(localToken), // Token address on the source chain
        amount: amountToBridge
    });

    // Define the main message struct
    Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
        receiver: abi.encode(user), // ABI-encode the recipient address
        data: "", // No additional data payload in this case
        tokenAmounts: tokenAmounts, // Array of tokens/amounts to send
        feeToken: localNetworkDetails.linkAddress, // LINK address on source chain
        extraArgs: Client._argsToBytes(Client.EVMExtraArgsV1({gasLimit: 0})) // Use default gas limit
    });
    ```
    *Note: Setting `gasLimit: 0` instructs CCIP to estimate and use a default gas limit for execution on the destination chain.*

3.  **Calculate the CCIP Fee:** Call the `getFee` function on the source chain's Router contract to determine the required LINK fee for the message.
    ```solidity
    // Cast router address to IRouterClient interface
    IRouterClient router = IRouterClient(localNetworkDetails.routerAddress);
    uint256 fee = router.getFee(
        remoteNetworkDetails.chainSelector, // Destination chain identifier
        message
    );
    ```

4.  **Fund User with LINK (Test Environment Only):** In our Foundry test using the local simulator, we need to provide the user address with enough LINK tokens to cover the fee.
    ```solidity
    // Assumes 'ccipLocalSimulatorFork' is an instance of the simulator contract
    ccipLocalSimulatorFork.requestLinkFromFaucet(user, fee);
    ```

5.  **Approve LINK Fee Payment:** The user must approve the Router contract to withdraw the calculated LINK fee from their balance. We simulate this using `vm.prank`.
    ```solidity
    vm.prank(user);
    // Cast LINK address to IERC20 interface
    IERC20(localNetworkDetails.linkAddress).approve(localNetworkDetails.routerAddress, fee);
    ```

6.  **Approve Token Transfer:** Similarly, the user must approve the Router contract to withdraw the tokens being bridged.
    ```solidity
    vm.prank(user);
    // Cast local token address to IERC20 interface
    IERC20(address(localToken)).approve(localNetworkDetails.routerAddress, amountToBridge);
    ```
    *Note: When casting a specific contract type (like `RebaseToken`) to an interface (`IERC20`) it doesn't directly implement, you often need an intermediate cast to `address`.*

7.  **Send the CCIP Message:** Finally, call `ccipSend` on the Router contract to initiate the cross-chain transfer.
    ```solidity
    vm.prank(user);
    router.ccipSend(remoteNetworkDetails.chainSelector, message);
    ```

## Testing the Bridge Function in Foundry

After implementing `bridgeTokens`, we need robust tests to verify its correctness. Our test case involves these steps:

1.  **Record Initial State:**
    *   Get the user's balance of the `localToken` on the source fork (`localBalanceBefore`).
    *   Switch to the destination fork: `vm.selectFork(remoteFork);`
    *   Get the user's balance of the `remoteToken` on the destination fork (`remoteBalanceBefore`).
    *   (Optional but useful for rebase tokens): Record any relevant state, like the user's interest rate on the local chain: `uint256 localUserInterestRate = localToken.getUserInterestRate(user);`

2.  **Execute the Bridge:** Call the `bridgeTokens` function with the appropriate parameters for the source-to-destination transfer.

3.  **Simulate Cross-Chain Message Processing:**
    *   Advance block time using `vm.warp` to simulate network latency: `vm.warp(block.timestamp + 20 minutes);`
    *   Instruct the Chainlink Local Simulator to process the pending message on the destination fork. This helper function also conveniently switches the `vm.selectFork` context back to the destination chain.
    ```solidity
    ccipLocalSimulatorFork.switchChainAndRouteMessage(remoteFork);
    ```

4.  **Record Final State:**
    *   Get the user's balance of the `remoteToken` on the destination fork *after* the message has been processed (`remoteBalanceAfter`).
    *   (Optional): Get the user's interest rate on the remote chain: `uint256 remoteUserInterestRate = remoteToken.getUserInterestRate(user);`
    *   Switch back to the source fork: `vm.selectFork(localFork);`
    *   Get the user's final balance of the `localToken` (`localBalanceAfter`).

5.  **Assert Correctness:** Use Foundry's `assertEq` to verify the expected changes:
    *   **Local Balance:** `assertEq(localBalanceAfter, localBalanceBefore - amountToBridge, "Local balance mismatch");`
    *   **Remote Balance:** `assertEq(remoteBalanceAfter, remoteBalanceBefore + amountToBridge, "Remote balance mismatch");`
    *   **State Propagation (e.g., Interest Rate):** `assertEq(remoteUserInterestRate, localUserInterestRate, "Interest rate mismatch");`

## Essential Foundry Cheatcodes

Several Foundry `vm` cheatcodes are crucial for this testing setup:

*   **`vm.selectFork(forkId)`:** Switches the execution context of the test to a previously created fork, simulating interaction with that specific chain.
*   **`vm.prank(address)` / `vm.startPrank(address)` / `vm.stopPrank()`:** Executes subsequent call(s) as if they originated from the specified address. `vm.prank` is used for single calls, while `start/stopPrank` wraps multiple calls.
*   **`vm.warp(timestamp)`:** Sets the block timestamp for the current fork context, useful for simulating the passage of time.
*   **`assertEq(value1, value2)` / `assertEq(value1, value2, string message)`:** Asserts that two values are equal. If they are not, the test fails, optionally printing the provided message.

## Troubleshooting and Best Practices

*   **`vm.prank` vs. `vm.startPrank` with Simulator:** Be aware that using `vm.startPrank`/`vm.stopPrank` might interfere with helper functions from tools like the Chainlink Local Simulator (e.g., `requestLinkFromFaucet`). If you encounter issues, try using single-line `vm.prank` before each call requiring impersonation (`approve`, `ccipSend`).
*   **Interface Casting:** Always ensure you cast contract addresses to the correct interface (`IRouterClient`, `IERC20`) before calling functions defined in that interface. Remember the `address` intermediate cast if converting between specific contract types and interfaces they don't explicitly inherit.
*   **"Stack Too Deep" Error:** This Solidity compiler error indicates too many local variables or complex operations exceeding the EVM's stack limit (typically 16 slots).
    *   **Solution 1:** Refactor your code to use fewer local variables (e.g., inline simple calculations).
    *   **Solution 2:** Use the `--via-ir` compiler flag in Foundry (`foundry.toml` or command line). This enables the Yul Intermediate Representation pipeline, which performs more advanced optimizations and often resolves stack depth issues by managing stack slots more effectively. Understanding Yul and the Solidity compiler internals (e.g., via the Cyfrin Updraft "Assembly & Formal Verification" course) can provide deeper insight.

By following these steps, you can effectively implement and test cross-chain token transfers using Chainlink CCIP within your Foundry development workflow, leveraging the power of local simulation for rapid iteration and verification.