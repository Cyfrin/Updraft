## Introduction: Your First Cross-Chain Test with Foundry and CCIP

Welcome to this guide on testing cross-chain functionality using Foundry and Chainlink's Cross-Chain Interoperability Protocol (CCIP). Building upon previous setup steps, we will now focus on writing and executing a Foundry test to verify a token bridging mechanism between two simulated blockchain environments: Sepolia and Arbitrum Sepolia. This involves simulating CCIP locally and testing the full round-trip bridging of tokens.

## Reviewing the Local Cross-Chain Test Environment

Before diving into the test itself, let's recap the essential setup performed to enable local cross-chain testing within the Foundry framework.

1.  **Blockchain Forking:** We initiated local forks of the Sepolia and Arbitrum Sepolia testnets. This was achieved using Foundry's cheatcodes `vm.createSelectFork` for the initial chain (Sepolia) and `vm.createFork` for the secondary chain (Arbitrum Sepolia), storing their identifiers (`sepoliaFork`, `arbSepoliaFork`).
2.  **CCIP Simulation:** The `CCIPLocalSimulatorFork` contract was instantiated. This crucial component simulates the behavior of the CCIP network locally, allowing us to test cross-chain interactions without deploying to actual testnets. We made it persistent using `vm.makePersistent` so its state persists across test runs.
3.  **Network Details Retrieval:** Using `ccipLocalSimulatorFork.getNetworkDetails`, we obtained simulated network configurations for both forks. This included vital information like the CCIP Router contract addresses, chain selectors (unique identifiers for each chain within CCIP), and the LINK token address for fee payments on each simulated network.
4.  **Contract Deployment and Core Configuration:**
    *   On both the Sepolia and Arbitrum Sepolia forks, we deployed our core contracts: `RebaseToken` and `RebaseTokenPool`.
    *   A `Vault` contract was deployed *only* on the Sepolia fork, designed to accept user deposits (in ETH) and mint `RebaseToken`.
    *   Necessary roles (e.g., minting, burning) were granted for the `RebaseToken` to the appropriate contract (Vault on Sepolia, TokenPool on Arbitrum Sepolia).
    *   Token administration was configured using `RegistryModuleOwnerCustom` and `TokenAdminRegistry` to link each `RebaseToken` instance to its corresponding `TokenPool` on that chain.
5.  **Inter-Pool Configuration (`configureTokenPool`):** A critical step was configuring each `TokenPool` contract to be aware of its counterpart on the *other* chain.
    *   This involved creating a `TokenPool.ChainUpdate` struct containing the remote chain's selector, the encoded address of the remote `TokenPool`, and the encoded address of the remote `RebaseToken`.
    *   Rate limit configurations (both inbound and outbound) were included in the struct but set to disabled (zero values) for this testing setup.
    *   The `applyChainUpdates` function was called on each `TokenPool`, passing an empty array for chains to remove and the populated `ChainUpdate` struct for the remote chain to add. This ensures bidirectional awareness between the pools.

## Understanding the Token Bridging Logic

To encapsulate the steps required for initiating a CCIP token transfer, a helper function, `bridgeTokens`, was developed. Let's break down its operation:

1.  **Select Source Fork:** The function begins by selecting the source chain's fork using `vm.selectFork`.
2.  **Construct CCIP Message:** A `Client.EVM2AnyMessage` struct is assembled. This struct defines the core parameters of the cross-chain message:
    *   `receiver`: The target address on the destination chain, encoded. In this case, it's the `user` address (`abi.encode(user)`).
    *   `data`: An optional data payload, left empty (`""`) for this simple token transfer.
    *   `tokenAmounts`: An array specifying which token(s) and amount(s) to bridge. Here, it contains one entry: `[Client.EVMTokenAmount({token: address(localToken), amount: amountToBridge})]`.
    *   `feeToken`: The address of the token used to pay CCIP fees, typically LINK (`localNetworkDetails.linkAddress`).
    *   `extraArgs`: Additional parameters encoded using `Client._argsToBytes`. Initially, this used `Client.EVMExtraArgsV1` with `gasLimit: 0`. Later, this was updated to `Client.EVMExtraArgsV2({gasLimit: 500_000, allowOutOfOrderExecution: false})`. The `gasLimit` specifies the gas allocated for the execution transaction on the *destination* chain. The `allowOutOfOrderExecution: false` flag ensures messages are processed sequentially.
3.  **Calculate Fees:** The required CCIP fee (in LINK) is determined by calling `getFee` on the source chain's CCIP Router contract (`localNetworkDetails.routerAddress`), passing the destination chain selector and the constructed message.
4.  **Fund Fees:** The necessary LINK tokens are obtained for the `user` using the simulator's faucet function: `ccipLocalSimulatorFork.requestLinkFromFaucet(user, fee)`.
5.  **Grant Approvals:** Before sending the message, the `user` must approve the source chain's CCIP Router contract to spend their tokens:
    *   Approve the calculated `fee` amount of LINK tokens.
    *   Approve the `amountToBridge` of the `localToken`.
    *   Foundry's `vm.prank(user)` cheatcode is used before each `approve` call to simulate the transaction being sent by the `user`.
6.  **Initiate Bridge:** The cross-chain transfer is triggered by calling `ccipSend` on the source chain's CCIP Router contract, providing the destination chain selector and the `message`. This call is also pranked as the `user`.
7.  **Verify Source Chain State:** Assertions are made on the source chain to confirm the `user`'s `localToken` balance has decreased by `amountToBridge`.
8.  **Simulate Destination Chain Execution:**
    *   Switch context to the destination chain's fork using `vm.selectFork(remoteFork)`.
    *   Simulate the passage of time required for CCIP message finality using `vm.warp(block.timestamp + 20 minutes)`.
    *   Trigger the simulated delivery and execution of the message on the destination chain using `ccipLocalSimulatorFork.switchChainAndRouteMessage(remoteFork)`.
9.  **Verify Destination Chain State:** Assertions are made on the destination chain to confirm the `user`'s `remoteToken` balance has increased by `amountToBridge`.

## Writing the Foundry Test: Bridging Tokens End-to-End

With the setup reviewed and the bridging logic understood, we created the `testBridgeAllTokens` function:

1.  **Select Initial Fork:** Start on the Sepolia fork (`vm.selectFork(sepoliaFork)`).
2.  **Fund User:** Provide the test `user` with some ETH using `vm.deal(user, SEND_VALUE)`, where `SEND_VALUE` is a predefined amount (e.g., `1e5`).
3.  **Deposit into Vault:** Simulate the user depositing ETH into the `Vault` contract to receive `RebaseToken` (shares).
    *   Use `vm.prank(user)` to act as the user.
    *   Call the `deposit` function while sending ETH. This requires specific Foundry syntax: `payable(address(vault)).deposit{value: SEND_VALUE}()`. You must cast the vault instance to `address` and then to `payable` to use the `{value: ...}` syntax.
    *   Assert that the user received the expected amount of `sepoliaToken` after depositing.
4.  **Execute First Bridge (Sepolia -> Arbitrum Sepolia):** Call the `bridgeTokens` helper function, providing `SEND_VALUE` as the amount and the appropriate fork identifiers, network details, and token contract instances for the Sepolia-to-Arbitrum Sepolia direction.

## Debugging Common Foundry and CCIP Local Issues

During testing, several common issues arose, requiring debugging:

1.  **Stack Too Deep Error:** Initial execution with `forge test` failed due to complex contract interactions exceeding the default EVM stack limit.
    *   **Solution:** Add the `--via-ir` flag to the test command (`forge test --mc Cross --via-ir`). This enables Foundry's Intermediate Representation pipeline during compilation, which optimizes code and often resolves stack issues.
2.  **Prank Override Error:** The test failed with `vm.prank: cannot override an ongoing prank`. This happened because the `setup` function called `configureTokenPool`, which internally used `vm.prank`, conflicting with pranks potentially active from the main `setUp` scope.
    *   **Solution:** Ensure `vm.stopPrank()` is called within the `setUp` function *before* calling any helper functions (like `configureTokenPool`) that might initiate their own pranks. Alternatively, use `vm.startPrank` which *can* override existing pranks if needed, though `vm.stopPrank` is often cleaner.
3.  **OutOfGas Error on Destination:** The test failed with an `OutOfGas` error during the simulated message execution (`switchChainAndRouteMessage`) on the destination chain.
    *   **Reason:** When using `chainlink-local`, setting `gasLimit: 0` in the `EVMExtraArgs` struct (intended to mean "use default gas limit" in real CCIP) causes issues with the local simulator.
    *   **Solution:** Modify the `extraArgs` construction in the `bridgeTokens` function to provide a non-zero `gasLimit`. Experimentally, `100_000` was insufficient, but `500_000` allowed the simulated transaction to succeed. Remember this is specific to `chainlink-local`; production CCIP handles `gasLimit: 0` correctly.
    *   **Update:** The code was further updated to use `Client.EVMExtraArgsV2`, explicitly setting `allowOutOfOrderExecution: false` alongside the non-zero `gasLimit`.

## Testing the Reverse Bridge

To ensure full bidirectional functionality, the test was extended to bridge tokens back from Arbitrum Sepolia to Sepolia:

1.  **Select Destination Fork:** Switch the context to the Arbitrum Sepolia fork (`vm.selectFork(arbSepoliaFork)`).
2.  **Simulate Time:** Advance time again using `vm.warp(block.timestamp + 20 minutes)`. This is relevant for rebase tokens, allowing potential interest accrual or balance changes to occur before bridging back.
3.  **Execute Reverse Bridge (Arbitrum Sepolia -> Sepolia):** Call the `bridgeTokens` function again. This time:
    *   Swap the "local" and "remote" arguments (forks, network details, tokens).
    *   Bridge the user's *entire current balance* on Arbitrum Sepolia, obtained via `arbSepoliaToken.balanceOf(user)`.

## Conclusion: Successful Bidirectional Bridging

Executing the complete test suite using `forge test --mc Cross --via-ir -vvvv` (with increased verbosity) confirmed that the test `testBridgeAllTokens` passed. This demonstrates that:

*   The local Foundry environment with forking and the `CCIPLocalSimulatorFork` was correctly configured.
*   Tokens could be successfully bridged from Sepolia to Arbitrum Sepolia using the simulated CCIP mechanism.
*   Tokens could be successfully bridged back from Arbitrum Sepolia to Sepolia.
*   Common testing hurdles like stack limits, prank conflicts, and simulator-specific gas limits were identified and resolved.

While further tests could explore partial bridges or multiple consecutive bridges, this end-to-end test provides strong confidence in the core cross-chain bridging logic. The next logical step would be to develop deployment scripts for deploying these contracts to actual testnets or mainnet.