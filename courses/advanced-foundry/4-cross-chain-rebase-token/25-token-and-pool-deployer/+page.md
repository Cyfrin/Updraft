## Deploying Rebase Tokens and CCIP Pools with Foundry

This lesson guides you through creating a Foundry deployment script (`Deployer.sol`) to deploy both a custom `RebaseToken` contract and its associated `RebaseTokenPool` contract. Crucially, this script also handles the necessary Chainlink Cross-Chain Interoperability Protocol (CCIP) configuration steps to enable the token for cross-chain transfers using the Burn & Mint mechanism.

We will follow the principles outlined in the official Chainlink CCIP documentation for registering tokens from an Externally Owned Account (EOA) using the Burn & Mint standard, specifically focusing on the Foundry implementation path found typically under `docs.chain.link` -> CCIP -> Guides -> Cross-Chain Token Standard.

The key steps derived from the documentation that our script will automate include:

1.  Deploying the custom `RebaseToken`.
2.  Deploying the `RebaseTokenPool`.
3.  Granting the Mint and Burn role for the token to the pool contract.
4.  Registering the deployer as the token admin via the `RegistryModuleOwnerCustom` contract.
5.  Accepting the admin role via the `TokenAdminRegistry` contract.
6.  Linking the deployed token to its corresponding pool via the `TokenAdminRegistry`.

While the Chainlink documentation also covers subsequent steps like configuring pool rate limits, minting initial tokens, and initiating transfers, this script focuses specifically on the deployment and initial CCIP registration phase.

### Creating the Deployment Script: `TokenAndPoolDeployer`

We begin by creating a new Foundry script contract within the `script/Deployer.sol` file. This contract will contain the logic for deploying our contracts and performing the CCIP setup.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
// ... other imports will be added below

contract TokenAndPoolDeployer is Script {
    // Deployment and setup logic will go inside the run() function
    function run() public returns (RebaseToken token, RebaseTokenPool pool) {
        // ... Implementation ...
    }
}
```

The contract inherits from Foundry's standard `Script` contract, providing access to cheatcodes and a standard execution entry point (`run` function). The goal is to deploy the `RebaseToken` and `RebaseTokenPool` and return their instances.

### Required Imports

To interact with Foundry scripting utilities, Chainlink CCIP contracts, and our project's contracts, we need several imports at the top of `Deployer.sol`:

```solidity
// Foundry Scripting
import {Script} from "forge-std/Script.sol";

// CCIP Local Simulator & Registration Contracts/Structs
// Note: @chainlink-local/ points to local tooling for fetching addresses
import {CCIPLocalSimulatorFork, Register} from "@chainlink-local/src/ccip/CCIPLocalSimulatorFork.sol";
// Note: @ccip/ points to the actual CCIP protocol contracts
import {RegistryModuleOwnerCustom} from "@ccip/contracts/src/v0.8/ccip/RegistryModuleOwnerCustom.sol";
import {TokenAdminRegistry} from "@ccip/contracts/src/v0.8/ccip/token/TokenAdminRegistry/TokenAdminRegistry.sol";

// Project Contracts & Interfaces
import {RebaseToken} from "../src/RebaseToken.sol";
import {RebaseTokenPool} from "../src/RebaseTokenPool.sol";
import {IRebaseToken} from "../interfaces/IRebaseToken.sol"; // Interface for type safety

// Standard Interfaces
import {IERC20} from "@ccip/contracts/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";

contract TokenAndPoolDeployer is Script {
    // ... run function implementation ...
}
```

Key imports include:
*   `Script`: Base contract for Foundry scripts.
*   `CCIPLocalSimulatorFork`: A helper contract (part of local development tooling) to dynamically fetch CCIP contract addresses based on the target chain ID. This avoids hardcoding addresses.
*   `RegistryModuleOwnerCustom` & `TokenAdminRegistry`: Core CCIP contracts used for registering and managing token administration for cross-chain functionality.
*   `RebaseToken` & `RebaseTokenPool`: Our custom contracts to be deployed.
*   `IERC20` & `IRebaseToken`: Interfaces for type casting and interaction.

### Implementing the `run` Function

The core deployment and setup logic resides in the `run` function. It returns the deployed `token` and `pool` contract instances.

```solidity
function run() public returns (RebaseToken token, RebaseTokenPool pool) {
    // 1. Setup: Get CCIP Network Details
    CCIPLocalSimulatorFork ccipLocalSimulatorFork = new CCIPLocalSimulatorFork();
    // Fetch chain-specific CCIP addresses (Router, RMN Proxy, Registries)
    Register.NetworkDetails memory networkDetails = ccipLocalSimulatorFork.getNetworkDetails(block.chainid);
    // Note: 'memory' keyword is required for struct variable declaration here.

    // Start broadcasting transactions to the network/fork
    vm.startBroadcast();

    // 2. Deploy Contracts
    // Deploy the RebaseToken (constructor takes no external arguments)
    token = new RebaseToken();
    // Deploy the RebaseTokenPool, providing necessary addresses
    pool = new RebaseTokenPool(
        IERC20(address(token)),         // The token this pool manages (cast to IERC20)
        new address[](0),             // Initial allowlist (empty)
        networkDetails.rmnProxyAddress, // CCIP Risk Management Network Proxy address
        networkDetails.routerAddress    // CCIP Router address
    );

    // 3. Configure Permissions: Grant Pool Mint/Burn Role
    // Allow the pool contract to mint/burn the token for CCIP transfers
    token.grantMintAndBurnRole(address(pool));

    // 4. CCIP Registration Steps
    // Step 4.1: Register Admin (via RegistryModuleOwnerCustom)
    // Get an instance of the RegistryModuleOwnerCustom contract
    RegistryModuleOwnerCustom registryModuleOwnerCustom = RegistryModuleOwnerCustom(
        networkDetails.registryModuleOwnerCustomAddress
    );
    // The deployer registers itself as the admin for the deployed token
    registryModuleOwnerCustom.registerAdminViaOwner(address(token));

    // Step 4.2: Accept Admin Role (via TokenAdminRegistry)
    // Get an instance of the TokenAdminRegistry contract
    TokenAdminRegistry tokenAdminRegistry = TokenAdminRegistry(
        networkDetails.tokenAdminRegistryAddress
    );
    // The deployer (now pending admin) accepts the admin role for the token
    tokenAdminRegistry.acceptAdminRole(address(token));

    // Step 4.3: Set Pool for Token (via TokenAdminRegistry)
    // The deployer (now confirmed admin) links the token to its pool contract
    tokenAdminRegistry.setPool(address(token), address(pool));

    // Stop broadcasting transactions
    vm.stopBroadcast();

    // Return the deployed contract instances
    // Implicit return handled by named return variables 'token' and 'pool'
}
```

**Explanation of `run` function steps:**

1.  **CCIP Local Simulator Setup:** We instantiate `CCIPLocalSimulatorFork` and call `getNetworkDetails(block.chainid)` to retrieve a struct containing essential CCIP contract addresses (like the Router, RMN Proxy, `RegistryModuleOwnerCustom`, and `TokenAdminRegistry`) specific to the chain the script is running on. This dynamic fetching is crucial for deploying to different networks without manual address changes. The `networkDetails` struct must be declared with the `memory` data location.
2.  **Broadcast:** `vm.startBroadcast()` tells Foundry that subsequent state-changing calls (deployments, contract interactions) should be executed as transactions on the target network or fork. `vm.stopBroadcast()` concludes this block.
3.  **Deploy `RebaseToken`:** A new instance of `RebaseToken` is deployed. Its constructor (`constructor() ERC20("Rebase Token", "RBT") Ownable(msg.sender) {}`) internally handles `ERC20` and `Ownable` initialization without requiring external arguments during deployment in this script.
4.  **Deploy `RebaseTokenPool`:** A new instance of `RebaseTokenPool` is deployed. Its constructor requires:
    *   The address of the `RebaseToken` it will manage (cast to `IERC20`).
    *   An initial allowlist (we provide an empty array `new address[](0)`).
    *   The RMN Proxy address for the chain, fetched from `networkDetails`.
    *   The CCIP Router address for the chain, fetched from `networkDetails`.
5.  **Grant Mint/Burn Role:** We call `token.grantMintAndBurnRole(address(pool))`. This assumes the `RebaseToken` implements an access control mechanism (like OpenZeppelin's `AccessControl`) with a specific role (e.g., `MINT_AND_BURN_ROLE`). Granting this role to the `RebaseTokenPool` contract is essential, as the pool needs permission to mint new tokens when they arrive from another chain and burn tokens when they are sent off-chain via CCIP's Burn & Mint mechanism.
6.  **CCIP Registration:** This multi-step process registers the token with the CCIP system:
    *   **Register Admin:** We interact with the `RegistryModuleOwnerCustom` contract (address obtained from `networkDetails`) and call `registerAdminViaOwner(address(token))`. This action, performed by the token owner (the deployer), designates the deployer as the proposed administrator for this token within the CCIP registry framework.
    *   **Accept Admin Role:** Next, we interact with the `TokenAdminRegistry` contract (address obtained from `networkDetails`) and call `acceptAdminRole(address(token))`. The deployer, having been proposed as admin in the previous step, now confirms and accepts this administrative role.
    *   **Set Pool:** Finally, still interacting with the `TokenAdminRegistry` and acting as the confirmed admin, we call `setPool(address(token), address(pool))`. This crucial step links the `RebaseToken` address to its specific `RebaseTokenPool` address within the CCIP registry. This tells the CCIP infrastructure which pool contract is responsible for handling cross-chain transfers for this particular token.

*(Note: A separate `VaultDeployer` script might exist in the project, potentially deploying a `Vault` contract that also interacts with the `RebaseToken` and requires mint/burn roles, possibly for staking or yield mechanisms distinct from the CCIP pool. However, the `TokenAndPoolDeployer` script detailed here focuses solely on deploying the token, its CCIP pool, and performing the necessary CCIP registration.)*

### Compilation

After writing the script, compile it using Foundry:

```bash
forge build
```

During development, you might encounter compilation errors. Common issues include:

*   Forgetting the `memory` keyword for local struct variables like `networkDetails`.
*   Typos or incorrect member names when accessing fields within the `networkDetails` struct (e.g., using `rmnProxyAdress` instead of `rmnProxyAddress`).

Correcting these issues should lead to a successful compilation, possibly with warnings about unused variables if other unused elements exist in the file or project.

### Conclusion

You have now created a comprehensive Foundry deployment script, `TokenAndPoolDeployer`, that reliably deploys a custom `RebaseToken` and its corresponding `RebaseTokenPool`. More importantly, it automates the essential Chainlink CCIP configuration steps required for the Burn & Mint token standard: granting the pool the necessary permissions on the token and registering the token and its pool with the CCIP `TokenAdminRegistry`. This script provides a solid foundation for integrating your custom token with Chainlink CCIP and is ready to be executed using Foundry commands like `forge script`.