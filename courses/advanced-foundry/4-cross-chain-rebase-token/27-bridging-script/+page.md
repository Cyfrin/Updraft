## Creating a CCIP Token Bridging Script

This lesson focuses on building the final Foundry script required for our CCIP Rebase Token project: `BridgeTokens.s.sol`. This script orchestrates the cross-chain transfer of our custom rebase tokens using Chainlink's Cross-Chain Interoperability Protocol (CCIP).

It's important to note that this is the concluding script for this tutorial series. We deliberately omit scripts for standard protocol interactions like `deposit` or `redeem`. End-users typically perform these actions using command-line tools (like `cast call`) or through a dedicated front-end application, making dedicated Foundry scripts less practical for routine use.

The primary objective of *this* script is to demonstrate how to construct and send a CCIP message specifically for bridging tokens from one blockchain to another. We will focus exclusively on the *token-only transfer* use case offered by CCIP. While CCIP *does* support sending arbitrary data alongside tokens, that requires the receiving address to be a smart contract capable of processing the data via a `ccipReceive` function. Since our example targets sending tokens to a standard Externally Owned Account (EOA), which cannot execute code, the data payload will remain empty.

## Setting Up the Bridging Script

First, create a new file named `BridgeTokens.s.sol` within your project's `script/` directory.

Begin with the standard Solidity boilerplate:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
```

Next, import the necessary contracts and libraries. These are crucial for interacting with Foundry scripting tools and the Chainlink CCIP protocol:

```solidity
// Foundry's base Script contract
import {Script} from "forge-std/Script.sol";

// CCIP Router interface - defines functions like ccipSend and getFee
import {IRouterClient} from "@ccip/contracts/src/v0.8/ccip/interfaces/IRouterClient.sol";

// CCIP Client library - provides structs (EVM2AnyMessage, etc.) and helpers
import {Client} from "@ccip/contracts/src/v0.8/ccip/libraries/Client.sol";

// Standard ERC20 interface - needed for token approvals
import {IERC20} from "@ccip/contracts/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";
```

*Note: The import paths (`@ccip/contracts/...`) assume you have the Chainlink CCIP library installed (e.g., via npm/yarn) and potentially configured path remappings in your `foundry.toml` file.*

## Structuring the Script Contract

Define the script contract, inheriting from Foundry's `Script` base contract:

```solidity
contract BridgeTokensScript is Script {
    // Script logic will go here
}
```

The core logic resides within the `run` function. This function requires several parameters because the details of a bridge transfer (chains, amounts, addresses) vary with each execution:

```solidity
contract BridgeTokensScript is Script {
    function run(
        address receiverAddress, // Destination address on the target chain
        uint64 destinationChainSelector, // CCIP identifier for the target chain
        address tokenToSendAddress, // Address of the rebase token contract
        uint256 amountToSend, // Amount of rebase tokens to bridge
        address linkTokenAddress, // Address of the LINK token (or fee token) on the source chain
        address routerAddress // Address of the CCIP Router on the source chain
    ) public {
        // Start broadcasting transactions to the network
        vm.startBroadcast();

        // --- Bridging Logic (detailed below) ---

        // Stop broadcasting transactions
        vm.stopBroadcast();
    }
}

```

The `public` visibility allows the function to be called externally. We wrap the state-changing operations (approvals and the CCIP send) within `vm.startBroadcast()` and `vm.stopBroadcast()` to ensure they are executed as actual transactions when the script runs against a live or test network.

## Implementing the Bridging Logic

Inside the `run` function, between the `startBroadcast` and `stopBroadcast` calls, we implement the steps required to initiate the CCIP transfer.

**1. Construct the CCIP Message**

We need to assemble the details of our cross-chain message using the `Client.EVM2AnyMessage` struct provided by the CCIP Client library.

```solidity
// Define the structure for token details within the message
// struct EVMTokenAmount {
//     address token; // Address of the token contract
//     uint256 amount; // Amount of tokens to transfer
// }

// Prepare the token amount details
Client.EVMTokenAmount[] memory tokenAmounts = new Client.EVMTokenAmount[](1);
tokenAmounts[0] = Client.EVMTokenAmount({
    token: tokenToSendAddress, // The rebase token address passed in
    amount: amountToSend      // The amount to bridge passed in
});

// Define the structure for V1 extra arguments (just gas limit)
// struct EVMExtraArgsV1 {
//     uint256 gasLimit; // Gas limit for destination execution
// }

// Construct the main CCIP message struct
Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
    // Receiver address, ABI-encoded
    receiver: abi.encode(receiverAddress),
    // Arbitrary data payload - empty for token-only transfer
    data: bytes(""),
    // Array of tokens and amounts to transfer
    tokenAmounts: tokenAmounts,
    // Address of the token used for paying CCIP fees (LINK in this case)
    feeToken: linkTokenAddress,
    // Additional arguments (like gas limits) encoded.
    // We use V1 with gasLimit=0 as no data execution is needed on the destination.
    extraArgs: Client._argsToBytes(Client.EVMExtraArgsV1({gasLimit: 0}))
});
```

Key points about the message construction:
*   `receiver`: Must be ABI encoded.
*   `data`: Kept as `bytes("")` because we are not sending any executable data, only tokens.
*   `tokenAmounts`: An array holding structs, each defining a token address and amount. Here, it contains only our single rebase token.
*   `feeToken`: Specifies the ERC20 token used for fees (LINK). If paying with native gas, this would be `address(0)`.
*   `extraArgs`: Encodes additional parameters. Since no `data` is sent, there's no `ccipReceive` function call on the destination requiring a specific gas limit. Therefore, we use the simpler `EVMExtraArgsV1` and set `gasLimit` to `0`. The `Client._argsToBytes` helper function handles the encoding.

**2. Calculate CCIP Fees**

Before sending the message, query the CCIP Router on the source chain to determine the required fee. This fee is denominated in the `feeToken` (LINK).

```solidity
// Get the fee required by CCIP for this specific message and destination
uint256 ccipFee = IRouterClient(routerAddress).getFee(
    destinationChainSelector,
    message
);
```

**3. Approve Token Transfers**

Now, inside the `vm.startBroadcast()` block, we grant the CCIP Router contract permission to transfer tokens on our behalf. Two approvals are needed:

```solidity
// This code goes *inside* vm.startBroadcast()

// 1. Approve the Router to spend the calculated CCIP fee (LINK tokens)
IERC20(linkTokenAddress).approve(routerAddress, ccipFee);

// 2. Approve the Router to spend the rebase tokens being bridged
IERC20(tokenToSendAddress).approve(routerAddress, amountToSend);
```

**4. Send the CCIP Message**

With the message constructed, fees calculated, and approvals granted, call the `ccipSend` function on the source chain's CCIP Router. This initiates the cross-chain transfer process.

```solidity
// This code also goes *inside* vm.startBroadcast(), after approvals

// Call ccipSend on the router, passing the destination and the message
// No msg.value is needed as the fee is paid via approved LINK tokens
IRouterClient(routerAddress).ccipSend(destinationChainSelector, message);
```

Since the fee is being paid using an approved ERC20 token (LINK), we don't need to send any native currency (`msg.value`) with the `ccipSend` call.

**5. End Broadcast**

Finally, after the `ccipSend` call, `vm.stopBroadcast();` concludes the transaction block.

## Key Concepts Review

This script utilizes several core CCIP and Foundry concepts:

*   **`Client.EVM2AnyMessage`:** The fundamental struct for packaging cross-chain message details (receiver, data, tokens, fee token, extra args).
*   **`IRouterClient`:** The interface to the main CCIP contract on each chain, providing `ccipSend` for initiating transfers and `getFee` for fee calculation.
*   **Chain Selectors:** Unique `uint64` identifiers representing specific CCIP-enabled blockchains.
*   **CCIP Fees:** Cross-chain operations incur fees, payable in a designated ERC20 token (like LINK) or the chain's native currency. This script uses LINK, requiring an `approve` call.
*   **ERC20 Approvals:** Standard `approve` mechanism is necessary to authorize the CCIP Router contract to pull both the fee tokens and the tokens being bridged from the sender's address (the script runner).
*   **`extraArgs`:** Encoded field for advanced parameters. `EVMExtraArgsV1` contains only `gasLimit`. `EVMExtraArgsV2` adds `allowOutOfOrderExecution`. Setting `gasLimit` to `0` is appropriate for token-only transfers to EOAs where no destination contract execution is triggered by the `data` payload.
*   **Foundry Scripts:** Leverage the `Script` contract, the `run` function for execution logic, and `vm.startBroadcast()` / `vm.stopBroadcast()` for sending transactions. Script parameters allow for flexible execution.

## Next Steps

With the `BridgeTokensScript` created, the subsequent steps typically involve:

1.  Deploying the rebase token contracts and configuring the necessary CCIP token pools on the chosen testnets (e.g., Sepolia and zkSync Sepolia).
2.  Executing this `BridgeTokensScript` using Foundry, providing the appropriate parameters (deployed addresses, chain selectors, amount) to transfer tokens from the source (e.g., Sepolia) to the destination (e.g., zkSync Sepolia).
3.  Adding the deployed rebase token contract address to a wallet (like MetaMask) connected to the destination network (e.g., zkSync Sepolia) to observe the bridged balance and its subsequent increase due to the token's rebase mechanism.