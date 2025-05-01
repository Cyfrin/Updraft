## Automating Token Bridging with Forge and Chainlink CCIP

This lesson walks through creating a basic Solidity script using the Forge framework to automate the process of bridging tokens between blockchains via Chainlink's Cross-Chain Interoperability Protocol (CCIP). We will focus specifically on the `ccipSend` operation, which initiates the cross-chain transfer.

While users might interact with a bridging protocol through tools like `cast call` or a dedicated frontend application for actions like depositing into or redeeming from associated liquidity pools, a Forge script is well-suited for automating the core bridging transaction itself. This script, `BridgeTokens.s.sol`, will handle the necessary steps to send tokens from one chain to another.

### Setting Up the Forge Script File

First, we create the script file within our Forge project, typically in the `script` directory.

**`script/BridgeTokens.s.sol`:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {IRouterClient} from "@ccip/contracts/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@ccip/contracts/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BridgeTokensScript is Script {

    // The run function will contain our bridging logic
    function run(
        address receiverAddress,
        uint64 destinationChainSelector,
        address tokenToSendAddress,
        uint256 amountToSend,
        address linkTokenAddress, // Address of the token used for CCIP fees (e.g., LINK)
        address routerAddress      // Chain-specific CCIP Router address
    ) public {
        // Script logic goes here
    }
}
```

This sets up the basic structure:
1.  SPDX license identifier and Solidity version pragma.
2.  Imports:
    *   `Script` from `forge-std` for Forge scripting capabilities.
    *   `IRouterClient` from the CCIP contracts package to interact with the CCIP Router.
    *   `Client` library from the CCIP contracts package for CCIP message structures and helpers.
    *   `IERC20` from OpenZeppelin to interact with ERC20 tokens for approvals.
3.  A contract `BridgeTokensScript` inheriting from `Script`.
4.  A public `run` function, which is the entry point Forge executes. We define parameters to make the script reusable: the receiver's address on the destination chain, the destination chain's CCIP selector, the address and amount of the token to bridge, the address of the token used for fees (LINK in this case), and the address of the CCIP Router contract on the source chain.

### Constructing the CCIP Message

The core of the `ccipSend` operation is the message payload. CCIP uses a specific struct, `Client.EVM2AnyMessage`, to define the cross-chain message.

Inside the `run` function, we construct this message:

```solidity
    // ... inside run function ...

    // 1. Define the token(s) and amount(s) to send
    Client.EVMTokenAmount[] memory tokenAmounts = new Client.EVMTokenAmount[](1);
    tokenAmounts[0] = Client.EVMTokenAmount({
        token: tokenToSendAddress,
        amount: amountToSend
    });

    // 2. Define extra arguments for CCIP - using V1 for simple token transfer
    // EVMExtraArgsV1 allows specifying gasLimit. Set to 0 for simple token sends.
    // Use EVMExtraArgsV2 if you need to allow out-of-order execution (chain dependent).
    bytes memory extraArgs = Client._argsToBytes(
        Client.EVMExtraArgsV1({gasLimit: 0})
    );

    // 3. Construct the main CCIP message
    Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
        receiver: abi.encode(receiverAddress), // Must be abi-encoded
        data: "", // Empty bytes, as we are only sending tokens, not arbitrary data
        tokenAmounts: tokenAmounts, // Array of tokens/amounts
        feeToken: linkTokenAddress, // Address of the token for paying fees (e.g., LINK)
                                     // Use address(0) to pay with native currency (requires msg.value)
        extraArgs: extraArgs // Encoded extra arguments (gasLimit, etc.)
    });
```

Let's break down the message construction:

1.  **`tokenAmounts`**: An array of `Client.EVMTokenAmount` structs. Each struct specifies a token address and the amount to bridge. Here, we're bridging only one type of token.
2.  **`extraArgs`**: Encoded additional parameters. The `Client` library provides helpers like `_argsToBytes`. We use `Client.EVMExtraArgsV1`, which only contains `gasLimit`. Since we are not sending any data that requires execution on the destination chain, a `gasLimit` of 0 is appropriate. If we needed features like out-of-order execution (useful on certain chains like Arbitrum, but not required for Sepolia -> zkSync Sepolia as targeted in the original video), we would use `EVMExtraArgsV2`.
3.  **`message`**: The final `Client.EVM2AnyMessage` struct:
    *   `receiver`: The recipient address on the destination chain, ABI-encoded using `abi.encode()`.
    *   `data`: An arbitrary data payload (bytes). This is left empty (`""`) because we are only sending tokens. If data were included, the `receiver` *must* be a smart contract implementing the `ccipReceive` function to process it. Externally Owned Accounts (EOAs) cannot process data payloads.
    *   `tokenAmounts`: The array we prepared earlier.
    *   `feeToken`: The address of the token used to pay CCIP fees. This is passed as a parameter (`linkTokenAddress`). Alternatively, `address(0)` could be used to pay fees with the native chain currency (e.g., ETH on Sepolia), which would require sending the fee amount as `msg.value` when calling `ccipSend`.
    *   `extraArgs`: The encoded `gasLimit` information.

### Calculating Fees and Approving Tokens

Before calling `ccipSend`, we need to determine the required fee and approve the CCIP Router contract to spend both the tokens being bridged and the fee tokens on our behalf.

```solidity
    // ... inside run function, after message construction ...

    // 4. Get the required fee from the Router
    uint256 ccipFee = IRouterClient(routerAddress).getFee(
        destinationChainSelector,
        message
    );

    // Start broadcasting transactions: fee calculation is view, approvals/send are state-changing
    vm.startBroadcast();

    // 5. Approve the Router to spend the fee token (LINK)
    IERC20(linkTokenAddress).approve(routerAddress, ccipFee);

    // 6. Approve the Router to spend the token being bridged
    IERC20(tokenToSendAddress).approve(routerAddress, amountToSend);

    // ... ccipSend call follows ...
```

1.  **`getFee`**: We call the `getFee` function on the `IRouterClient` instance, passing the destination chain selector and the message we constructed. This returns the amount of `feeToken` required for the CCIP transaction.
2.  **`vm.startBroadcast()`**: We initiate a transaction broadcast block using Forge's cheatcodes. All subsequent state-changing calls (like `approve` and `ccipSend`) until `vm.stopBroadcast()` will be sent as actual transactions when the script is executed.
3.  **Approvals**: Two standard ERC20 `approve` calls are made:
    *   Approve the `routerAddress` to spend the calculated `ccipFee` amount of the `linkTokenAddress`.
    *   Approve the `routerAddress` to spend the `amountToSend` of the `tokenToSendAddress`.

**Crucially, these approvals must be completed *before* calling `ccipSend`.**

### Executing the Cross-Chain Transfer

With the message prepared and approvals granted, the final step is to call `ccipSend` on the Router contract.

```solidity
    // ... inside run function, within vm.startBroadcast() block, after approvals ...

    // 7. Call ccipSend on the Router
    IRouterClient(routerAddress).ccipSend(destinationChainSelector, message);

    // Stop broadcasting transactions
    vm.stopBroadcast();
} // End of run function
```

1.  **`ccipSend`**: We call the `ccipSend` function on the `IRouterClient` instance, providing the `destinationChainSelector` and the prepared `message`. This initiates the CCIP process. The router will pull the approved tokens (`tokenToSendAddress` and `linkTokenAddress`) and dispatch the message across the Chainlink network to the destination chain.
2.  **`vm.stopBroadcast()`**: We close the transaction broadcast block.

### Summary and Considerations

This Forge script (`BridgeTokens.s.sol`) provides a reusable way to automate the core `ccipSend` action for bridging tokens using Chainlink CCIP. By parameterizing addresses and amounts, it can be easily adapted for different tokens, chains, and receivers.

Key takeaways:

*   **Scripts for Automation:** Forge scripts excel at automating specific on-chain actions like deployment, configuration, or, as shown here, initiating a CCIP transfer. Complex user interactions might be better handled via other tools.
*   **Message Structure is Key:** Correctly formatting the `Client.EVM2AnyMessage` (including receiver encoding, token amounts, fee token choice, and appropriate `extraArgs`) is essential.
*   **Data vs. No Data:** Sending only tokens allows the receiver to be an EOA or a contract. Sending data requires the receiver to be a contract implementing `ccipReceive`.
*   **Fees and Approvals:** Always calculate the fee using `getFee` and ensure the router has sufficient ERC20 allowance for *both* the bridged tokens and the fee token *before* calling `ccipSend`.
*   **Parameterization:** Avoid hardcoding addresses (router, tokens) and chain selectors; pass them as arguments for flexibility.

This script serves as a foundation for programmatically interacting with CCIP for token bridging scenarios. Remember to use the correct contract addresses (Router, Tokens) and chain selectors corresponding to the specific source and destination networks you are targeting (e.g., Sepolia, Arbitrum Sepolia, zkSync Sepolia).