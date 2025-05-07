## Crafting a Foundry Script for CCIP Token Bridging

This lesson guides you through creating the final Foundry script essential for executing a Chainlink Cross-Chain Interoperability Protocol (CCIP) token transfer. We will focus specifically on building `BridgeTokens.s.sol`, a script designed to send tokens from a source chain to a destination chain using the CCIP router.

While one might consider creating scripts for user interactions with custom contracts (like depositing into or redeeming from a `RebaseTokenPool`), this lesson prioritizes the core CCIP bridging mechanism. End-users are more likely to interact with such pool functionalities via direct `cast call` commands or a dedicated frontend user interface.

Our script will handle the scenario of sending *only tokens* via CCIP, without an accompanying data payload. It's important to understand that CCIP *can* transfer arbitrary data alongside tokens. However, if data is sent, the `receiver` on the destination chain *must* be a smart contract equipped with a `ccipReceive` function to process that data. Externally Owned Accounts (EOAs) cannot receive or act upon such data payloads. A common use case for sending data would be to trigger a function on the destination contract upon token arrival, such as automatically staking the received tokens.

### Setting Up the Bridging Script File

First, we'll create the script file and establish the basic Foundry script structure.

1.  Create a new file named `BridgeTokens.s.sol` within your Foundry project's `script` directory.
2.  Add the standard Solidity boilerplate:

    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.24;

    import {Script} from "forge-std/Script.sol";

    contract BridgeTokensScript is Script {
        function run() public {
            vm.startBroadcast();

            // Core bridging logic will be added here

            vm.stopBroadcast();
        }
    }
    ```
    The `vm.startBroadcast()` and `vm.stopBroadcast()` calls from Foundry's `Script` contract signify that the transactions executed between them should be sent to the network.

### Defining the Core Bridging Logic and Necessary Imports

The `run` function will orchestrate the CCIP token transfer. The key steps involved are:

1.  **Construct the CCIP Message:** Create an `EVM2AnyMessage` struct containing all details for the cross-chain transfer.
2.  **Approve Token to Send:** Grant the CCIP Router permission to spend the ERC20 tokens being bridged.
3.  **Calculate CCIP Fee:** Query the CCIP Router to determine the fee required for the transaction.
4.  **Approve Fee Token:** Grant the CCIP Router permission to spend the fee token (e.g., LINK).
5.  **Execute CCIP Send:** Call the `ccipSend` function on the CCIP Router to initiate the transfer.

To implement this logic, we need several interfaces and libraries:

*   **`IRouterClient`:** This interface is crucial for interacting with the CCIP Router, specifically for calling `getFee` and `ccipSend`.
    ```solidity
    import {IRouterClient} from "@ccip/contracts/src/v0.8/ccip/interfaces/IRouterClient.sol";
    ```
*   **`Client` Library:** This library from the CCIP contracts provides the `EVM2AnyMessage` struct definition and helper functions for constructing message components, particularly `extraArgs`.
    ```solidity
    import {Client} from "@ccip/contracts/src/v0.8/ccip/libraries/Client.sol";
    ```
*   **`IERC20`:** The standard ERC20 interface is required for approving token spending by the router.
    ```solidity
    import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
    ```

### Parameterizing the `run` Function

To make our script reusable for various bridging scenarios (different tokens, chains, and amounts), we'll parameterize the `run` function:

```solidity
function run(
    address receiverAddress,         // Address receiving tokens on the destination chain
    uint64 destinationChainSelector, // CCIP selector for the destination chain
    address tokenToSendAddress,      // Address of the ERC20 token being bridged
    uint256 amountToSend,            // Amount of the token to bridge
    address linkTokenAddress,        // Address of the LINK token (for fees) on the source chain
    address routerAddress            // Address of the CCIP Router on the source chain
) public {
    vm.startBroadcast();

    // ... bridging logic using these parameters ...

    vm.stopBroadcast();
}
```

### Constructing the `EVM2AnyMessage`

The `EVM2AnyMessage` struct is central to CCIP. It bundles all necessary information for the cross-chain operation.

First, prepare the `tokenAmounts` array. This array details which tokens and what amounts are being transferred. For our scenario of sending a single token type:

```solidity
// Inside the run function, before vm.startBroadcast() or just after for declaration
Client.EVMTokenAmount[] memory tokenAmounts = new Client.EVMTokenAmount[](1);
tokenAmounts[0] = Client.EVMTokenAmount({
    token: tokenToSendAddress, // The address of the token being sent
    amount: amountToSend       // The amount of the token to send
});
```

Now, construct the main message object:

```solidity
// Inside the run function
Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
    receiver: abi.encode(receiverAddress), // Receiver address MUST be abi.encode()'d
    data: "",                             // Empty bytes as we are sending no data payload
    tokenAmounts: tokenAmounts,           // The array of token transfers defined above
    feeToken: linkTokenAddress,           // Address of the token used for CCIP fees (LINK)
    extraArgs: Client._argsToBytes(Client.EVMExtraArgsV1({gasLimit: 0})) // Encoded extra arguments
});
```

Let's break down key fields in the `message`:

*   **`receiver`**: This is the address on the destination chain that will receive the tokens. It *must* be ABI-encoded into `bytes`.
*   **`data`**: This field is for an optional data payload. Since we are only sending tokens and not triggering any specific function on an intelligent receiver, we pass empty bytes (`""`).
*   **`tokenAmounts`**: The array we prepared earlier, specifying the token(s) and amount(s).
*   **`feeToken`**: The address of the token used to pay CCIP transaction fees. If `address(0)` is provided, fees are paid in the native currency of the source chain (e.g., ETH on Sepolia). Here, we specify `linkTokenAddress`.
*   **`extraArgs`**: This field allows passing additional parameters for the CCIP message execution on the destination chain. The `Client` library provides helper structs (`EVMExtraArgsV1`, `EVMExtraArgsV2`) and functions (`_argsToBytes`) to encode these.
    *   `EVMExtraArgsV1` contains only a `gasLimit` field.
    *   `EVMExtraArgsV2` includes `gasLimit` and a boolean `allowOutOfOrderExecution`.
    *   Since we are sending no `data` (`data: ""`), there's no callback function (like `ccipReceive`) that needs to be executed on the destination chain with a specific gas budget. Therefore, we can set `gasLimit: 0`. If `extraArgs` were left as empty bytes (`""`), CCIP typically defaults to a gas limit like 200,000, which is unnecessary here.
    *   The `allowOutOfOrderExecution` flag (in V2) can be important for some chains or scenarios, but for a simple token transfer without data, `EVMExtraArgsV1` with `gasLimit: 0` is sufficient.

### Obtaining the CCIP Fee

Before sending the message, we must determine the fee required by CCIP. The `IRouterClient` interface provides a `getFee` function for this:

```solidity
// Cast routerAddress to IRouterClient to call its functions
uint256 ccipFee = IRouterClient(routerAddress).getFee(destinationChainSelector, message);
```
This function takes the `destinationChainSelector` and the constructed `message` as input and returns the fee amount in terms of the `feeToken` specified in the message (LINK, in our case).

### Approving Token Spends

The CCIP Router needs permission to pull two types of tokens from the address executing this script:
1.  The `linkTokenAddress` for the calculated `ccipFee`.
2.  The `tokenToSendAddress` for the `amountToSend`.

We use the standard ERC20 `approve` function:

```solidity
// Approve the CCIP Router to spend the fee token (LINK)
IERC20(linkTokenAddress).approve(routerAddress, ccipFee);

// Approve the CCIP Router to spend the token being bridged
IERC20(tokenToSendAddress).approve(routerAddress, amountToSend);
```
These approvals are critical and must be done *before* calling `ccipSend`.

### Executing the Cross-Chain Transfer with `ccipSend`

With the message constructed, fee calculated, and tokens approved, the final step is to initiate the cross-chain transfer by calling `ccipSend` on the router:

```solidity
// Call ccipSend on the router
IRouterClient(routerAddress).ccipSend(destinationChainSelector, message);
```
This function takes the `destinationChainSelector` and our fully prepared `message`. Although `ccipSend` is a `payable` function, we are not sending any native currency (`msg.value`) with this call because we've specified `linkTokenAddress` as the `feeToken` in our message and have approved the LINK tokens. If `feeToken` were `address(0)`, we would need to send the `ccipFee` amount as `msg.value`.

### Conclusion and Next Steps

The `BridgeTokens.s.sol` script is now complete. It encapsulates the logic required to send ERC20 tokens cross-chain using Chainlink CCIP, taking all necessary parameters dynamically.

The subsequent steps in a typical CCIP project would involve:

1.  **Deploying Contracts:** Deploying all necessary smart contracts (e.g., your custom token, token pool, vault) to the source and destination testnets (such as Sepolia and zkSync Sepolia).
2.  **Configuring Contracts:** Running any configuration scripts (like a `ConfigurePools` script) to set up roles, permissions, and links between your deployed contracts.
3.  **Executing the Bridge Script:** Running this `BridgeTokens.s.sol` script with the appropriate parameters to perform an actual cross-chain token transfer.
4.  **Verification:** Observing the token balances on both chains. For custom tokens, this often involves adding the token contract address to a wallet like MetaMask to see the balance update on the destination chain, potentially reflecting rebasing mechanisms if applicable.

This script provides a robust foundation for automating CCIP token bridging operations within a Foundry development environment.