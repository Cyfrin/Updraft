## Implementing Your First CCIP Cross-Chain Test in Foundry

This lesson guides you through implementing and running your first cross-chain test for a rebase token using Chainlink's Cross-Chain Interoperability Protocol (CCIP) within the Foundry testing framework. We will simulate bridging tokens from a Sepolia fork to an Arbitrum Sepolia fork and back, leveraging a local CCIP simulator for efficient testing without deploying to live testnets.

**Prerequisites Recap**

Before diving into the test logic, ensure the following setup (covered previously) is complete within your Foundry test environment:

*   Local forks of Sepolia and Arbitrum Sepolia created using `vm.createFork`.
*   An instance of `CCIPLocalSimulatorFork` deployed and made persistent (`vm.makePersistent`).
*   Network details (router addresses, chain selectors, LINK token addresses) fetched from the simulator for both chains.
*   On both the Sepolia and Arbitrum Sepolia forks:
    *   `RebaseToken` contract deployed.
    *   `RebaseTokenPool` contract deployed.
    *   `Vault` contract deployed (Sepolia only, for initial minting).
    *   Appropriate mint/burn roles granted from the token to the respective pool/vault.
    *   Token admin registered via `RegistryModuleOwnerCustom`.
    *   Admin role accepted in `TokenAdminRegistry`.
    *   Pool address set in `TokenAdminRegistry`.
*   Each `RebaseTokenPool` configured to recognize the other chain via `configureTokenPool` (which uses `applyChainUpdates`), enabling cross-chain interaction. This involves setting the remote chain selector, pool address, and token address.

**The `bridgeTokens` Helper Function: Core Bridging Logic**

To streamline our tests, we use a helper function, `bridgeTokens`, which encapsulates the logic for sending tokens from a source chain to a destination chain via CCIP.

Here's a breakdown of its steps:

1.  **Select Source Fork:** Use `vm.selectFork` to switch Foundry's context to the source chain.
2.  **Construct CCIP Message:** Create the `Client.EVM2AnyMessage` struct. This includes:
    *   `receiver`: The address receiving the tokens on the destination chain (encoded).
    *   `data`: Any additional data to send (empty in this case).
    *   `tokenAmounts`: An array specifying the token address and amount to bridge.
    *   `feeToken`: The address of the token used for paying CCIP fees (LINK in this test).
    *   `extraArgs`: Additional parameters for CCIP execution. Crucially, when using the `CCIPLocalSimulatorFork`, you may need to provide a non-zero `gasLimit` here (e.g., 500,000), even if not strictly required by the destination function, due to a simulator quirk. We use `Client.EVMExtraArgsV2` for this.
3.  **Calculate Fee:** Call `getFee` on the source chain's CCIP Router contract (`IRouterClient`) to determine the required fee in LINK.
4.  **Simulate LINK Faucet:** Use the `ccipLocalSimulatorFork.requestLinkFromFaucet` function to grant the sending address (`user`) the necessary LINK tokens for the fee (this simulates obtaining testnet LINK).
5.  **Grant Approvals:** The `user` must approve the source CCIP Router to spend both the LINK fee and the rebase tokens being bridged. This requires `vm.prank` calls.
6.  **Send CCIP Message:** Call `ccipSend` on the source CCIP Router, passing the destination chain selector and the constructed message. Use `vm.prank` to execute as the `user`.
7.  **Assert Source Chain State:** Verify that the user's token balance on the source chain has decreased by the bridged amount. You can also check other relevant states like interest rates.
8.  **Switch to Destination Fork:** Use `vm.selectFork` to change context to the destination chain.
9.  **Simulate Time and Finality:** Use `vm.warp` to advance the block timestamp on the destination fork, simulating the time required for cross-chain message finality (e.g., `block.timestamp + 20 minutes`).
10. **Simulate Message Routing:** Call `ccipLocalSimulatorFork.switchChainAndRouteMessage`, passing the destination fork ID. This tells the simulator to process and deliver the pending CCIP message on the currently selected destination fork.
11. **Assert Destination Chain State:** Verify that the user's token balance on the destination chain has increased by the bridged amount (assuming a 1:1 transfer rate). Check other relevant states if necessary.

```solidity
 function bridgeTokens(
     uint256 amountToBridge,
     uint256 localFork,
     uint256 remoteFork,
     Register.NetworkDetails memory localNetworkDetails,
     Register.NetworkDetails memory remoteNetworkDetails,
     RebaseToken localToken,
     RebaseToken remoteToken
 ) public {
     vm.selectFork(localFork);

     // 1. Construct the message
     Client.EVMTokenAmount[] memory tokenAmounts = new Client.EVMTokenAmount[](1);
     tokenAmounts[0] = Client.EVMTokenAmount({token: address(localToken), amount: amountToBridge});

     // Using EVMExtraArgsV2 (simulator might require gasLimit)
     bytes memory extraArgs = Client._argsToBytes(
         Client.EVMExtraArgsV2({gasLimit: 500_000, allowOutOfOrderExecution: false})
     );

     Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
         receiver: abi.encode(user), // Send to self on dest chain
         data: "", // No extra data
         tokenAmounts: tokenAmounts,
         feeToken: localNetworkDetails.linkAddress, // Pay fee in LINK
         extraArgs: extraArgs
     });

     // 2. Get Fee
     uint256 fee = IRouterClient(localNetworkDetails.routerAddress).getFee(remoteNetworkDetails.chainSelector, message);

     // 3. Get LINK from Faucet (simulation)
     ccipLocalSimulatorFork.requestLinkFromFaucet(user, fee);

     // 4. Approvals (as user)
     vm.prank(user);
     IERC20(localNetworkDetails.linkAddress).approve(localNetworkDetails.routerAddress, fee);
     vm.prank(user);
     IERC20(address(localToken)).approve(localNetworkDetails.routerAddress, amountToBridge);

     // Balance checks before sending
     uint256 localBalanceBefore = localToken.balanceOf(user);
     // ... (optional: interest rate check before) ...

     // 5. Send CCIP Message
     vm.prank(user);
     IRouterClient(localNetworkDetails.routerAddress).ccipSend(remoteNetworkDetails.chainSelector, message);

     // 6. Assertions on Source Chain
     uint256 localBalanceAfter = localToken.balanceOf(user);
     assertEq(localBalanceAfter, localBalanceBefore - amountToBridge);
     // ... (optional: interest rate check after) ...

     // 7. Switch to Destination Fork
     vm.selectFork(remoteFork);
     vm.warp(block.timestamp + 20 minutes); // Simulate finality time

     // Balance checks before receiving
     uint256 remoteBalanceBefore = remoteToken.balanceOf(user);
     // ... (optional: remote interest rate check before) ...

     // 8. Simulate Message Routing
     ccipLocalSimulatorFork.switchChainAndRouteMessage(remoteFork);

     // 9. Assertions on Destination Chain
     uint256 remoteBalanceAfter = remoteToken.balanceOf(user);
     assertEq(remoteBalanceAfter, remoteBalanceBefore + amountToBridge); // Assuming 1:1 transfer rate
     // ... (optional: remote interest rate check after) ...
 }
```

**Implementing the `testBridgeAllTokens` Test Case**

Now, let's create the actual Foundry test function (`testBridgeAllTokens`) that utilizes our setup and the `bridgeTokens` helper to perform a round trip:

1.  **Initial Setup (Source Chain):**
    *   Select the `sepoliaFork`.
    *   Use `vm.deal` to give the `user` some ETH to deposit.
    *   Use `vm.prank(user)`.
    *   Call the `vault.deposit` function. **Important:** Since `deposit` is likely `payable`, you must cast the contract address to `payable` and use the `{value: amount}` syntax: `Vault(payable(address(vault))).deposit{value: SEND_VALUE}();`.
    *   Assert that the `user` received the correct initial amount of `sepoliaToken`.
2.  **Bridge (Source -> Destination):**
    *   Call the `bridgeTokens` helper function, providing all necessary parameters (amount, forks, network details, token instances) to bridge the full balance from Sepolia to Arbitrum Sepolia.
3.  **Bridge Back (Destination -> Source):**
    *   Select the `arbSepoliaFork`.
    *   Use `vm.warp` again to simulate some time passing on Arbitrum Sepolia before bridging back.
    *   Get the user's current `arbSepoliaToken` balance.
    *   Assert this balance matches the initially bridged amount.
    *   Call the `bridgeTokens` helper function again, swapping the local/remote parameters to bridge the full balance from Arbitrum Sepolia *back* to Sepolia.
4.  **(Optional) Final Assertion:** You could add a final check on the Sepolia fork to ensure the user's balance is restored (minus any potential interest accrual differences or fees not accounted for in this simple test).

```solidity
 function testBridgeAllTokens() public {
     uint256 SEND_VALUE = 1 ether; // Example deposit amount

     // --- Deposit Phase ---
     vm.selectFork(sepoliaFork);
     vm.deal(user, SEND_VALUE); // Give user ETH
     vm.prank(user);
     // Correct way to call payable function with value
     Vault(payable(address(vault))).deposit{value: SEND_VALUE}();
     assertEq(sepoliaToken.balanceOf(user), SEND_VALUE); // Check token mint

     // --- Bridge Sepolia -> Arb Sepolia ---
     bridgeTokens(
         SEND_VALUE, // amountToBridge
         sepoliaFork, // localFork
         arbSepoliaFork, // remoteFork
         sepoliaNetworkDetails, // localNetworkDetails
         arbSepoliaNetworkDetails, // remoteNetworkDetails
         sepoliaToken, // localToken
         arbSepoliaToken // remoteToken
     );

     // --- Bridge Arb Sepolia -> Sepolia ---
     vm.selectFork(arbSepoliaFork);
     vm.warp(block.timestamp + 20 minutes); // Warp time on Arbitrum fork
     uint256 arbBalance = arbSepoliaToken.balanceOf(user);
     assertEq(arbBalance, SEND_VALUE); // Check balance before bridging back

     bridgeTokens(
         arbBalance, // amountToBridge (all tokens back)
         arbSepoliaFork, // localFork (now Arbitrum)
         sepoliaFork, // remoteFork (back to Sepolia)
         arbSepoliaNetworkDetails, // localNetworkDetails
         sepoliaNetworkDetails, // remoteNetworkDetails
         arbSepoliaToken, // localToken
         sepoliaToken // remoteToken
     );

     // --- Optional: Final Assertion on Sepolia ---
     // vm.selectFork(sepoliaFork);
     // vm.warp(block.timestamp + 20 minutes);
     // uint256 finalSepoliaBalance = sepoliaToken.balanceOf(user);
     // assertEq(finalSepoliaBalance, SEND_VALUE); // Or account for interest/fees
 }
```

**Debugging Insights and Common Issues**

During development and testing, you might encounter issues similar to these:

1.  **Stack Too Deep Error:** Complex contracts, especially those involving libraries like CCIP, might exceed Solidity's default stack limit during compilation.
    *   **Solution:** Compile using the IR pipeline by adding the `--via-ir` flag to your `forge build` and `forge test` commands.
2.  **Prank Override Error (`vm.prank: cannot override an ongoing prank...`):** This happens if you start a `vm.prank` while another one is already active without `vm.stopPrank` or specific `vm.startPrank/vm.stopPrank` usage. It often occurs when calling helper functions that also use `vm.prank` from within a setup or test function that hasn't stopped its own prank.
    *   **Solution:** Ensure `vm.stopPrank()` is called before invoking helper functions that manage their own pranks, or structure code to avoid nested single pranks. For instance, ensure your main `setUp` function calls `vm.stopPrank()` *before* calling configuration helpers like `configureTokenPool` if those helpers start with `vm.prank(owner)`.
3.  **OutOfGas Error (During `ccipSend` with Simulator):** The `ccipSend` call might unexpectedly run out of gas when interacting with the `CCIPLocalSimulatorFork`.
    *   **Solution:** As mentioned earlier, provide a non-zero `gasLimit` (e.g., 100,000 - 500,000) within the `extraArgs` (`Client.EVMExtraArgsV2`) field of the `Client.EVM2AnyMessage` struct. This seems necessary for the local simulator to process the message correctly.

**Conclusion and Further Testing**

You have successfully implemented and tested an end-to-end cross-chain token bridge using Chainlink CCIP and Foundry's fork testing capabilities, all simulated locally. This powerful setup allows for rapid iteration and debugging of complex cross-chain interactions.

Consider exploring further test cases:

*   Bridging partial amounts instead of the full balance.
*   Initiating a second bridge before the first one completes.
*   Bridging back only a portion of the received tokens.
*   Testing edge cases around fee calculation or specific token behaviors during bridging.