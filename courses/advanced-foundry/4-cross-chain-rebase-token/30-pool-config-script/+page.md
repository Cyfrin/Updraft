## Configure CCIP Token Pools Using a Foundry Script

This lesson demonstrates how to create and use a Foundry script (`ConfigurePools.s.sol`) to configure Chainlink CCIP (Cross-Chain Interoperability Protocol) Token Pools after they have been deployed. Configuration is a crucial step that links pools across different blockchains and establishes operational parameters like token transfer rate limits. This script automates the process, making it repeatable and less error-prone.

**Prerequisites:** Before running this configuration script, ensure that the CCIP Token Pool contracts have already been successfully deployed on both the source and destination chains you intend to link.

## Understanding the Key Concepts

Several core concepts underpin this configuration script:

1.  **Foundry Scripts (`.s.sol`):** Foundry provides a powerful scripting framework allowing developers to automate interactions with deployed smart contracts directly from Solidity. Scripts typically inherit from `forge-std/Script.sol` and execute logic within a `run()` function. They are ideal for deployment, configuration, and complex contract interactions.
2.  **CCIP Token Pool Configuration:** Once deployed, Token Pools are unaware of their counterparts on other chains. Configuration involves explicitly telling a local pool about a remote pool (its address and chain identifier) and defining the rules (rate limits) for transferring tokens between them.
3.  **`TokenPool.applyChainUpdates` Function:** This is the primary function on the `TokenPool` contract used for configuration. It accepts two arguments:
    *   `chainsToRemove`: An array of `uint64` chain selectors representing remote chains to remove configuration for.
    *   `chainsToAdd`: An array of `TokenPool.ChainUpdate` structs containing the configuration details for remote chains to add or update.
4.  **The `ChainUpdate` Struct:** Defined within `TokenPool.sol`, this struct bundles the necessary information to configure a link to *one* remote chain:
    *   `remoteChainSelector` (`uint64`): The unique identifier of the target blockchain.
    *   `remotePoolAddresses` (`bytes[]`): An array containing the ABI-encoded address(es) of the corresponding token pool(s) on the remote chain. Note the `bytes[]` type.
    *   `remoteTokenAddress` (`bytes`): The ABI-encoded address of the token contract on the remote chain. Note the `bytes` type.
    *   `outboundRateLimiterConfig` (`RateLimiter.Config`): Defines rate limits for tokens leaving the *local* pool *towards* this specific remote chain.
    *   `inboundRateLimiterConfig` (`RateLimiter.Config`): Defines rate limits for tokens entering the *local* pool *from* this specific remote chain.
5.  **The `RateLimiter.Config` Struct:** Defined in the `RateLimiter.sol` library, this struct specifies the parameters for rate limiting:
    *   `isEnabled` (`bool`): Toggles the rate limit on or off.
    *   `capacity` (`uint128`): The maximum number of tokens allowed in a burst transfer (token bucket capacity).
    *   `rate` (`uint128`): The number of tokens (in wei) refilled into the bucket per second, determining the sustained transfer rate.
6.  **ABI Encoding:** The `ChainUpdate` struct requires certain addresses (`remotePoolAddresses`, `remoteTokenAddress`) to be provided as `bytes` or `bytes[]`, not native `address` types. The script uses Solidity's built-in `abi.encode()` function to perform this conversion.
7.  **Foundry Cheatcodes:** The script utilizes `vm.startBroadcast()` and `vm.stopBroadcast()` to delineate which function calls should be packaged into transactions and sent to the target blockchain (or a local fork).

## Implementing the Configuration Script

Let's walk through the creation of the `ConfigurePools.s.sol` script.

**1. File Creation and Imports:**

Create a new file named `script/ConfigurePools.s.sol`. Begin with the necessary boilerplate and imports:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
// Import TokenPool to access its types (ChainUpdate) and functions (applyChainUpdates)
import {TokenPool} from "@ccip/contracts/src/v0.8/ccip/pools/TokenPool.sol";
// Import RateLimiter to access its Config struct
import {RateLimiter} from "@ccip/contracts/src/v0.8/ccip/libraries/RateLimiter.sol";
```

**2. Contract Definition:**

Define the script contract, inheriting from Foundry's `Script`:

```solidity
contract ConfigurePoolScript is Script {
    // Script logic will reside within the run function
}
```

**3. The `run` Function:**

The `run` function serves as the script's entry point. It accepts all necessary configuration details as parameters, making the script reusable for different pool pairs and rate limits.

```solidity
    function run(
        address localPool, // Address of the pool on the chain where the script runs
        uint64 remoteChainSelector, // Chain selector of the remote chain
        address remotePool, // Address of the pool on the remote chain
        address remoteToken, // Address of the token on the remote chain
        // Outbound rate limit parameters (local -> remote)
        bool outboundRateLimiterIsEnabled,
        uint128 outboundRateLimiterCapacity,
        uint128 outboundRateLimiterRate,
        // Inbound rate limit parameters (remote -> local)
        bool inboundRateLimiterIsEnabled,
        uint128 inboundRateLimiterCapacity,
        uint128 inboundRateLimiterRate
    ) public {
        // Implementation details follow...
    }
```

**4. Broadcasting Transactions:**

Wrap the contract interaction logic within `vm.startBroadcast()` and `vm.stopBroadcast()`:

```solidity
    function run(...) public {
        vm.startBroadcast();

        // --- Configuration logic starts ---

        // --- Configuration logic ends ---

        vm.stopBroadcast(); // Ensure transactions are sent
    }
```

**5. Preparing Input Data for `applyChainUpdates`:**

Inside the `run` function, before calling `applyChainUpdates`, prepare the required data structures:

*   **`remotePoolAddresses`:** The `applyChainUpdates` function expects an array of `bytes`. Even if configuring only one remote pool, create a single-element array and ABI-encode the address.

    ```solidity
    bytes[] memory remotePoolAddresses = new bytes[](1);
    remotePoolAddresses[0] = abi.encode(remotePool);
    ```

*   **`chainsToAdd`:** Create an array to hold the `ChainUpdate` structs. In this case, we configure one remote chain, so the array size is 1. Populate the struct using the function parameters and the prepared `bytes` values.

    ```solidity
    // Create an array for chain update configurations
    TokenPool.ChainUpdate[] memory chainsToAdd = new TokenPool.ChainUpdate[](1);

    // Populate the configuration for the single remote chain
    chainsToAdd[0] = TokenPool.ChainUpdate({
        remoteChainSelector: remoteChainSelector, // Use the input parameter
        remotePoolAddresses: remotePoolAddresses, // Use the ABI-encoded bytes array
        remoteTokenAddress: abi.encode(remoteToken), // ABI-encode the remote token address
        // Set outbound rate limiter config from parameters
        outboundRateLimiterConfig: RateLimiter.Config({
            isEnabled: outboundRateLimiterIsEnabled,
            capacity: outboundRateLimiterCapacity,
            rate: outboundRateLimiterRate
        }),
        // Set inbound rate limiter config from parameters
        inboundRateLimiterConfig: RateLimiter.Config({
            isEnabled: inboundRateLimiterIsEnabled,
            capacity: inboundRateLimiterCapacity,
            rate: inboundRateLimiterRate
        })
    });
    ```

*   **`chainsToRemove`:** Since we are only adding/updating a configuration, create an empty array of `uint64` for the chains to remove.

    ```solidity
    uint64[] memory chainsToRemove = new uint64[](0); // Empty array signifies no removals
    ```

**6. Executing the Configuration:**

Call the `applyChainUpdates` function on the `localPool` contract. Cast the `localPool` address variable to the `TokenPool` type to enable the function call.

```solidity
    // Cast the local pool address to the TokenPool contract type and call the function
    TokenPool(localPool).applyChainUpdates(chainsToRemove, chainsToAdd);
```

## Compiling the Script

To compile the script using Foundry, run the build command. In complex projects, you might encounter "Stack too deep" errors, which can often be resolved by enabling the IR pipeline (`--via-ir`):

```bash
forge build --via-ir
```

Successful compilation indicates the script is syntactically correct and ready for execution (using `forge script`).

## Important Considerations

*   **Execution Order:** This script *must* be run after the Token Pool contracts are deployed on both chains involved.
*   **Two-Way Configuration:** To establish a fully functional, bi-directional link between pools on Chain A and Chain B, you need to:
    *   Run this script on Chain A, configuring it with Chain B's details.
    *   Run this script on Chain B, configuring it with Chain A's details.
*   **Parameterization:** Using function parameters for addresses, chain selectors, and rate limits makes the script highly reusable compared to hardcoding these values.
*   **Data Type Precision:** Pay close attention to the required data types in the `ChainUpdate` struct, particularly the use of `bytes` and `bytes[]` for addresses, necessitating `abi.encode()`.
*   **`--via-ir` Flag:** Remember this flag if you encounter compilation errors related to stack depth, common in projects with complex inheritance or large contracts/structs.

## Next Steps

With the Token Pools deployed and configured using this script, the CCIP lane is prepared for use. The next logical step involves creating a script or application logic to initiate actual cross-chain token transfers by interacting with the configured Router or Token Pool contracts to send CCIP messages.