## Introduction to Testing Cross-Chain Bridging

This lesson guides you through the process of testing a cross-chain rebase token system using Foundry and the Chainlink CCIP Local Simulator. We'll focus on verifying the `bridgeTokens` functionality, which involves sending tokens from a simulated Sepolia fork to an Arbitrum Sepolia fork and then back. This process includes significant setup, interaction with Foundry cheat codes, handling `payable` function calls, configuring CCIP parameters, and debugging common testing hurdles. While the setup is extensive, mastering these techniques is crucial for robust cross-chain application development.

## Core Setup for Cross-Chain Testing

A comprehensive testing environment is paramount for simulating cross-chain interactions. The following setup steps are prerequisites:

1.  **Local Fork Creation:**
    *   We begin by creating local forks of our target blockchains. For this example, we'll use Sepolia and Arbitrum Sepolia.
    *   `vm.createSelectFork("sepolia_rpc_url")` creates and selects the Sepolia fork (`sepoliaFork`).
    *   `vm.createFork("arbitrum_sepolia_rpc_url")` creates the Arbitrum Sepolia fork (`arbSepoliaFork`).

2.  **Chainlink CCIP Local Simulator:**
    *   The `CCIPLocalSimulatorFork` contract is instantiated. This powerful tool simulates CCIP functionalities locally, enabling testing without deploying to live testnets for every iteration.
    *   `vm.makePersistent(address(ccipLocalSimulatorFork))` ensures the simulator's state persists across different test function calls within the same test contract execution.

3.  **Network Details Acquisition:**
    *   Chain-specific details necessary for CCIP interaction are fetched from the simulator:
        *   `sepoliaNetworkDetails = ccipLocalSimulatorFork.getNetworkDetails(SEPOLIA_CHAIN_SELECTOR);`
        *   `arbSepoliaNetworkDetails = ccipLocalSimulatorFork.getNetworkDetails(ARB_SEPOLIA_CHAIN_SELECTOR);`
    *   These details include router addresses, LINK token addresses, and chain selectors.

4.  **Contract Deployment (Sepolia Fork):**
    *   On the `sepoliaFork`:
        *   Deploy the `RebaseToken` contract (e.g., `sepoliaToken`).
        *   Deploy the `RebaseTokenPool` contract (e.g., `sepoliaPool`).
        *   Deploy the `Vault` contract (this specific vault is deployed only on Sepolia in this scenario).

5.  **Role Management:**
    *   Appropriate permissions are granted. For instance, the `sepoliaPool` and `Vault` contracts are granted minting and burning roles for the `sepoliaToken`.

6.  **CCIP Admin Registration:**
    *   The deployer (owner) is registered as an admin for CCIP configuration using a `RegistryModuleOwnerCustom` contract instance. This typically involves calling `ccipConfig.setCcipConfig(...)`.

7.  **Token Admin Registry Configuration:**
    *   The owner accepts the admin role for the token.
    *   The deployed `sepoliaPool` address is set in the `TokenAdminRegistry` for the `sepoliaToken`, linking the token to its managing pool for CCIP operations.

8.  **Contract Deployment (Arbitrum Sepolia Fork):**
    *   Similar deployment and configuration steps are repeated on the `arbSepoliaFork`:
        *   Deploy `RebaseToken` (`arbSepoliaToken`).
        *   Deploy `RebaseTokenPool` (`arbSepoliaPool`).
        *   Grant roles and configure the `TokenAdminRegistry` for Arbitrum Sepolia.

9.  **Token Pool Configuration (`configureTokenPool`):**
    *   A helper function, `configureTokenPool`, is crucial for setting up communication pathways between the token pools on different chains. It's called twice:
        *   Once on the Sepolia fork, configuring `sepoliaPool` to communicate with `arbSepoliaPool`.
        *   Once on the Arbitrum Sepolia fork, configuring `arbSepoliaPool` to communicate with `sepoliaPool`.
    *   **Inside `configureTokenPool(localPool, localToken, remoteChainSelector, remotePoolAddress, remoteTokenAddress)`:**
        *   This function constructs an array of `TokenPool.ChainUpdate` structs. Each struct contains:
            *   `remoteChainSelector`: The CCIP chain selector of the destination chain.
            *   `remotePoolAddress`: The address of the token pool on the destination chain.
            *   `remoteTokenAddress`: The address of the token on the destination chain, ABI encoded.
            *   Rate limiter configurations (often disabled for initial local testing).
        *   It then calls `localPool.applyChainUpdates(new uint64[](0), chainsToAdd)`. The first argument (an empty array `new uint64[](0)`) indicates that no existing chain configurations are being removed, only new ones added.

## Implementing the Token Bridging Logic

The core of our cross-chain interaction is encapsulated in a `bridgeTokens` helper function. This function handles the steps required to send tokens from a source fork to a destination fork via CCIP.

```solidity
function bridgeTokens(
    uint256 localForkId,
    uint256 remoteForkId,
    address user,
    RebaseToken localToken,
    RebaseToken remoteToken,
    uint256 amountToBridge,
    NetworkDetails memory localNetworkDetails,
    NetworkDetails memory remoteNetworkDetails
) internal {
    // 1. Select Source Fork
    vm.selectFork(localForkId);

    // 2. Construct CCIP Message
    Client.EVMTokenAmount[] memory tokenAmounts = new Client.EVMTokenAmount[](1);
    tokenAmounts[0] = Client.EVMTokenAmount({
        token: address(localToken),
        amount: amountToBridge
    });

    // Note: gasLimit initially set to 0, later adjusted to prevent OutOfGas
    bytes memory extraArgs = Client._argsToBytes(
        Client.EVMExtraArgsV1({gasLimit: 100_000, strict: false}) // gasLimit: 0 may cause issues with simulator
    );

    Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
        receiver: abi.encode(user), // Tokens sent to the same user address on the remote chain
        data: "", // No extra calldata for the receiver in this example
        tokenAmounts: tokenAmounts,
        feeToken: localNetworkDetails.linkAddress, // Pay CCIP fees in LINK
        extraArgs: extraArgs
    });

    // 3. Calculate CCIP Fee
    uint256 fee = IRouterClient(localNetworkDetails.routerAddress).getFee(
        remoteNetworkDetails.chainSelector,
        message
    );

    // 4. Fund User with Fee Token (LINK)
    // In a real scenario, the user would have LINK. The simulator provides a faucet.
    ccipLocalSimulatorFork.requestLinkFromFaucet(user, fee);

    // 5. User Approvals
    vm.startPrank(user);
    IERC20(localNetworkDetails.linkAddress).approve(localNetworkDetails.routerAddress, fee);
    IERC20(address(localToken)).approve(localNetworkDetails.routerAddress, amountToBridge);
    vm.stopPrank();

    // 6. Send CCIP Message
    // Note: This call might require msg.value if feeToken is address(0)
    // For LINK, no msg.value is needed here if feeToken is LINK address.
    vm.prank(user); // User initiates the ccipSend
    bytes32 messageId = IRouterClient(localNetworkDetails.routerAddress).ccipSend(
        remoteNetworkDetails.chainSelector,
        message
    );
    vm.stopPrank();

    // 7. Local Assertions (Post-Send)
    assertEq(localToken.balanceOf(user), /* initial balance - amountToBridge */, "Local balance incorrect after send");
    // Assert interest rate on local token remained unchanged if applicable

    // 8. Simulate Message Delivery on Remote Fork
    vm.selectFork(remoteForkId);
    vm.warp(block.timestamp + 20 minutes); // Simulate network latency
    ccipLocalSimulatorFork.switchChainAndRouteMessage(remoteForkId); // Trigger simulator to process message

    // 9. Remote Assertions (Post-Receive)
    assertEq(remoteToken.balanceOf(user), amountToBridge, "Remote balance incorrect after receive");
    // Assert interest rate on remote token matches original local rate if applicable
}
```

Key aspects of this function:
*   **Fork Selection:** `vm.selectFork(localForkId)` switches Foundry's execution context to the source chain.
*   **CCIP Message Construction:** The `Client.EVM2AnyMessage` struct is populated.
    *   `receiver`: ABI encoded address of the recipient on the destination chain.
    *   `data`: Optional calldata for the receiver contract.
    *   `tokenAmounts`: An array specifying tokens and amounts to bridge.
    *   `feeToken`: Address of the token used for CCIP fees (LINK in this case).
    *   `extraArgs`: Contains parameters like `gasLimit` for the execution on the receiver. Critically, for the CCIP Local Simulator, `gasLimit` often needs to be a non-zero value (e.g., `100_000`) to avoid "OutOfGas" errors, even if `0` (auto) would work on a live network.
*   **Fee Calculation & Funding:** `getFee` is called on the CCIP Router to determine the cost. The simulator's `requestLinkFromFaucet` provides the user with test LINK.
*   **Approvals:** The user (`vm.prank(user)`) must approve the CCIP Router to spend their LINK (for fees) and the token being bridged.
*   **`ccipSend`:** The `ccipSend` function on the source chain's CCIP Router initiates the cross-chain message.
*   **Message Simulation:** After sending, context is switched to the `remoteForkId`. `vm.warp` advances time to simulate network delay, and `ccipLocalSimulatorFork.switchChainAndRouteMessage` triggers the simulator to process and deliver the message to the destination chain.
*   **Assertions:** Balances and other relevant state (like interest rates for rebase tokens) are checked on both the source chain (after sending) and the destination chain (after simulated delivery).

## Writing the End-to-End Bridge Test

With the setup and `bridgeTokens` helper in place, we can write the actual test function. This test will simulate a user depositing assets into a vault on Sepolia, bridging those assets to Arbitrum Sepolia, and then bridging them all back to Sepolia.

```solidity
// Test state variables declared at contract level:
// Sepolia setup
uint256 sepoliaFork;
RebaseToken sepoliaToken;
RebaseTokenPool sepoliaPool;
Vault vault; // Assuming Vault is only on Sepolia
NetworkDetails sepoliaNetworkDetails;

// Arbitrum Sepolia setup
uint256 arbSepoliaFork;
RebaseToken arbSepoliaToken;
RebaseTokenPool arbSepoliaPool;
NetworkDetails arbSepoliaNetworkDetails;

// Shared
CCIPLocalSimulatorFork ccipLocalSimulatorFork;
address user = makeAddr("user"); // Example user address

// ... (setup function populates these variables) ...

function testBridgeAllTokens() public {
    uint256 DEPOSIT_AMOUNT = 1e5; // Using a small, fixed amount for clarity

    // 1. Deposit into Vault on Sepolia
    vm.selectFork(sepoliaFork);
    vm.deal(user, DEPOSIT_AMOUNT); // Give user some ETH to deposit

    vm.prank(user);
    // To send ETH (msg.value) with a contract call in Foundry:
    // Cast contract instance to address, then to payable, then back to contract type.
    Vault(payable(address(vault))).deposit{value: DEPOSIT_AMOUNT}();

    assertEq(sepoliaToken.balanceOf(user), DEPOSIT_AMOUNT, "User Sepolia token balance after deposit incorrect");

    // 2. Bridge Tokens: Sepolia -> Arbitrum Sepolia
    bridgeTokens(
        sepoliaFork,
        arbSepoliaFork,
        user,
        sepoliaToken,
        arbSepoliaToken,
        DEPOSIT_AMOUNT,
        sepoliaNetworkDetails,
        arbSepoliaNetworkDetails
    );

    // Assertions for this step are within bridgeTokens

    // 3. Bridge All Tokens Back: Arbitrum Sepolia -> Sepolia
    vm.selectFork(arbSepoliaFork);
    vm.warp(block.timestamp + 20 minutes); // Advance time on Arbitrum Sepolia before bridging back

    uint256 arbBalanceToBridgeBack = arbSepoliaToken.balanceOf(user);
    assertTrue(arbBalanceToBridgeBack > 0, "User Arbitrum balance should be non-zero before bridging back");

    bridgeTokens(
        arbSepoliaFork,
        sepoliaFork,
        user,
        arbSepoliaToken,
        sepoliaToken,
        arbBalanceToBridgeBack,
        arbSepoliaNetworkDetails,
        sepoliaNetworkDetails
    );

    // Final state check: User on Sepolia should have their initial deposit back
    // (minus any very small precision differences if applicable to tokenomics, or fees not covered by faucet)
    vm.selectFork(sepoliaFork);
    // Note: Exact final balance might depend on tokenomics if any fees were burnt from principal.
    // For this example, assume full amount returns.
    assertEq(sepoliaToken.balanceOf(user), DEPOSIT_AMOUNT, "User Sepolia token balance after bridging back incorrect");
}

```
This test is not designed as a fuzz test due to the simulation time involved with `vm.warp` and CCIP message routing.

**Handling `msg.value` in Tests:**
When a function (like `vault.deposit()`) is `payable` and expects ETH, Foundry tests must explicitly send this value. The syntax is: `ContractType(payable(address(contractInstance))).functionName{value: amountToSend}(arguments);`. This involves:
1.  Getting the `address` of the contract instance.
2.  Casting this `address` to `payable`.
3.  Casting this `payable address` back to the `ContractType` to access its functions.
4.  Appending `{value: amountToSend}` before the function arguments.

## Navigating Common Foundry and CCIP Simulator Issues

Testing complex systems, especially cross-chain ones, often involves debugging. Here are some common issues and their resolutions:

1.  **Error: Stack too deep:**
    *   This can occur during `forge build`, especially with complex contracts or deep inheritance.
    *   **Potential Cause:** Solidity compiler struggling with complexity.
    *   **Potential Fix:** Ensure your `foundry.toml` includes `via_ir = true` or you compile with the `--via-ir` flag. This enables the IR-based compilation pipeline which can handle more complex code. Sometimes, simply recompiling or minor refactoring resolves this.

2.  **Error: Prank Override (`vm.prank: cannot override an ongoing prank... use vm.startPrank`)**
    *   **Cause:** This typically happens when `vm.prank(actor)` is called while a `vm.startPrank(anotherActorOrSameActor)` is already active from an outer scope (e.g., the main `setUp` function) without a corresponding `vm.stopPrank()`. Nested `vm.prank` calls are not allowed; `vm.startPrank` / `vm.stopPrank` should be used to define broader scopes of impersonation.
    *   **Fix:** Review your prank usage. If a prank is started in `setUp` (e.g., `vm.startPrank(owner)`), ensure it's stopped (`vm.stopPrank()`) before helper functions that might also use `vm.prank(owner)` are called, or refactor the helper to not assume it needs to initiate the prank if one might already be active. A common pattern is to use `vm.startPrank` at the beginning of `setUp` for owner actions and `vm.stopPrank` at the end, and within tests or helpers, use `vm.prank` for specific user actions, ensuring scopes don't improperly overlap. For instance, if `setUp` uses `vm.startPrank(owner)` for deployments, and a helper function like `configureTokenPool` also needs to act as `owner`, ensure the `setUp`'s prank scope is managed correctly (e.g., by calling `vm.stopPrank()` before such helpers if they manage their own pranks, or by passing the `owner` context implicitly).

3.  **Error: OutOfGas (`EvmError: OutOfGas` during `ccipSend` or message execution)**
    *   **Cause (with CCIP Local Simulator):** When constructing the `Client.EVMExtraArgsV1` (or `V2`) for the `Client.EVM2AnyMessage`, setting `gasLimit: 0` can lead to out-of-gas errors during the *simulated execution on the receiver contract*. While `0` often means "use as much gas as needed" in real CCIP, the local simulator may require an explicit, non-zero gas limit for the target function call.
    *   **Fix:** In the `EVMExtraArgsV1` struct within your `bridgeTokens` function (or wherever the CCIP message is constructed), set `gasLimit` to a reasonable non-zero value (e.g., `100_000` or `200_000`). This value is for the gas provided to the receiver contract on the destination chain to execute the logic triggered by the CCIP message.
        ```solidity
        // Inside bridgeTokens, when creating EVM2AnyMessage:
        bytes memory extraArgs = Client._argsToBytes(
            Client.EVMExtraArgsV1({gasLimit: 100_000, strict: false}) // Changed from 0
        );
        ```
    *   **`EVMExtraArgsV2`:** You might also use `EVMExtraArgsV2`, which allows specifying `allowOutOfOrderExecution`. The `gasLimit` consideration remains similar.

## Key Foundry Cheat Codes and Techniques

Foundry provides powerful cheat codes for fine-grained control during testing:

*   **`vm.prank(address)` / `vm.startPrank(address)` / `vm.stopPrank()`:** Simulate transactions as if they were sent from a specific address. `startPrank` and `stopPrank` define a scope for multiple calls from the same address.
*   **`vm.deal(address, uint256 balance)`:** Sets the ETH balance of an address.
*   **`vm.warp(uint256 timestamp)`:** Sets the `block.timestamp` to a specific value, useful for testing time-dependent logic or simulating network latency.
*   **`vm.selectFork(uint256 forkId)`:** Switches the current EVM execution context to a previously created fork.
*   **`vm.createFork(string memory rpcUrl)` / `vm.createSelectFork(string memory rpcUrl)`:** Creates a new fork from a live network state. `createSelectFork` also immediately selects it.
*   **`vm.makePersistent(address contractAddress)`:** Makes the state of the specified contract(s) persist across multiple test function calls within the same test contract execution. Useful for shared fixtures like the CCIP simulator.
*   **Sending `msg.value`:** Use the `{value: amount}` syntax after the function name and before arguments: `payableContract.payableFunction{value: ethAmount}(arg1, arg2);`. Remember the casting: `ContractType(payable(address(instance))).function{value: v}();`.
*   **Debugging:** Use `forge test -vvvv` (or more `v`s) for increased verbosity and detailed execution traces when diagnosing reverts or unexpected behavior.

## Understanding CCIP Local Simulator Interactions

The `CCIPLocalSimulatorFork` contract is central to local cross-chain testing:

*   **`requestLinkFromFaucet(address recipient, uint256 amount)`:** Simulates a LINK faucet, providing test LINK tokens to an address for paying CCIP fees.
*   **`switchChainAndRouteMessage(uint256 forkId)`:** This function is called on the destination fork. It tells the simulator to process any pending CCIP messages targeted for that `forkId` (chain), effectively simulating the off-chain routing and on-chain delivery of the message.
*   **`getNetworkDetails(uint64 chainSelector)`:** Provides essential network parameters like the CCIP router address and native LINK token address for a given chain.
*   **`Client.EVM2AnyMessage` Structure:** This struct is the core payload for `ccipSend`. Key fields include:
    *   `receiver`: The target contract address on the destination chain (ABI encoded).
    *   `data`: Arbitrary calldata to be executed by the `receiver`.
    *   `tokenAmounts`: An array of `Client.EVMTokenAmount` specifying tokens and amounts to transfer.
    *   `feeToken`: Address of the token used to pay CCIP fees (e.g., LINK address). If `address(0)`, native currency is implied for fees.
    *   `extraArgs`: Additional parameters for message execution, notably `gasLimit`.
*   **CCIP Fees:** Fees are crucial for CCIP. The `IRouterClient.getFee()` function is used to determine the cost of sending a message, which must then be paid using the specified `feeToken`.

## Conclusion and Further Testing

By following these steps, you can successfully test cross-chain token bridging logic from Sepolia to Arbitrum Sepolia and back, verifying critical state changes like token balances and interest rates. The `bridgeTokens` helper function provides a reusable pattern for these interactions.

This forms a solid foundation. Consider extending your test suite with scenarios like:
*   Bridging partial amounts of tokens.
*   Multiple consecutive bridge operations in both directions.
*   Testing failure cases (e.g., insufficient fees, invalid receiver).
*   Interactions with different users.

Thorough testing, especially with local simulation tools like the Chainlink CCIP Local Simulator, is essential for building secure and reliable Web3 applications.