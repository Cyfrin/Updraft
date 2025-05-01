## Deploying CCIP Burn & Mint Tokens with Foundry Scripts

This lesson guides you through creating a Foundry deployment script (`Deployer.s.sol`) to deploy a custom `RebaseToken` and its associated `RebaseTokenPool`. This setup is specifically designed for Chainlink's Cross-Chain Interoperability Protocol (CCIP), adhering to the Burn & Mint token standard. We will cover deploying the contracts and performing the necessary CCIP configuration steps using a local simulator fork for accessing CCIP contract details.

Foundry scripts automate deployment and on-chain interactions. Our deployment logic will reside within a contract inheriting from Foundry's `Script` base contract. The main execution happens in the `run()` function. We wrap the deployment and configuration calls within `vm.startBroadcast()` and `vm.stopBroadcast()` to signal which transactions should be sent to the blockchain.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {RebaseToken} from "../src/RebaseToken.sol"; // Adjust path as needed
import {RebaseTokenPool} from "../src/RebaseTokenPool.sol"; // Adjust path as needed
import {CCIPLocalSimulatorFork, Register} from "@chainlink-local/src/ccip/CCIPLocalSimulatorFork.sol"; // Example import - Adjust path/source as needed
import {IERC20} from "@ccip/contracts/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol"; // Example import
import {RegistryModuleOwnerCustom} from "@ccip/contracts/src/v0.8/ccip/RegistryModuleOwnerCustom.sol"; // Example import
import {TokenAdminRegistry} from "@ccip/contracts/src/v0.8/ccip/token/TokenAdminRegistry.sol"; // Example import

contract Deployer is Script {
    function run() public returns (RebaseToken token, RebaseTokenPool pool) {
        vm.startBroadcast();

        // 1. Deploy RebaseToken
        token = new RebaseToken();

        // 2. Get CCIP Network Details (using local simulator fork)
        CCIPLocalSimulatorFork ccipLocalSimulatorFork = new CCIPLocalSimulatorFork();
        Register.NetworkDetails memory networkDetails = ccipLocalSimulatorFork.getNetworkDetails(block.chainid);

        // 3. Deploy RebaseTokenPool
        pool = new RebaseTokenPool(
            IERC20(address(token)),         // Token address
            new address[](0),             // Empty allowlist
            networkDetails.rmnProxyAddress, // RMN Proxy address from simulator
            networkDetails.routerAddress    // Router address from simulator
        );

        // 4. Grant Mint/Burn Role to Pool
        token.grantMintAndBurnRole(address(pool));

        // 5. Register Admin via Owner in CCIP Registry
        RegistryModuleOwnerCustom(networkDetails.registryModuleOwnerCustomAddress)
            .registerAdminViaOwner(address(token));

        // 6. Accept Admin Role in CCIP Token Admin Registry
        TokenAdminRegistry(networkDetails.tokenAdminRegistryAddress)
            .acceptAdminRole(address(token));

        // 7. Set the Pool for the Token in CCIP Token Admin Registry
        TokenAdminRegistry(networkDetails.tokenAdminRegistryAddress)
            .setPool(address(token), address(pool));

        vm.stopBroadcast();

        // Return deployed contract instances
        return (token, pool);
    }
}
```

### Breakdown of the Deployment Script

1.  **Deploy `RebaseToken`**:
    *   `token = new RebaseToken();`
    *   We deploy the `RebaseToken` first. In this specific example, the `RebaseToken` constructor might hardcode its name, symbol, and owner (`msg.sender`), meaning no arguments are needed during deployment within the script itself. Check your `RebaseToken`'s constructor implementation.

2.  **Retrieve CCIP Configuration**:
    *   `CCIPLocalSimulatorFork ccipLocalSimulatorFork = new CCIPLocalSimulatorFork();`
    *   `Register.NetworkDetails memory networkDetails = ccipLocalSimulatorFork.getNetworkDetails(block.chainid);`
    *   To interact with CCIP components, even in a local test environment, we need the addresses of core CCIP contracts (Router, RMN Proxy, Registries). Here, we assume the use of a `CCIPLocalSimulatorFork` contract which simulates this infrastructure locally.
    *   We instantiate it and call `getNetworkDetails()`, passing the current `block.chainid`, to retrieve a struct (`Register.NetworkDetails`) containing the necessary addresses. Note the use of the `memory` keyword for this function-local struct variable, which is required by Solidity.

3.  **Deploy `RebaseTokenPool`**:
    *   `pool = new RebaseTokenPool(...)`
    *   Next, we deploy the `RebaseTokenPool`. Its constructor requires specific arguments:
        *   The address of the `RebaseToken` deployed earlier (cast to the `IERC20` interface type).
        *   An allowlist for token transfers (an empty `address[]` array is used here, meaning no allowlist restrictions initially).
        *   The `rmnProxyAddress` obtained from `networkDetails`.
        *   The `routerAddress` obtained from `networkDetails`.

4.  **Grant Mint/Burn Role**:
    *   `token.grantMintAndBurnRole(address(pool));`
    *   The `RebaseTokenPool` needs permission to mint and burn the `RebaseToken` to facilitate cross-chain transfers under the CCIP Burn & Mint standard. We call the `grantMintAndBurnRole` function *on the token contract*, granting this permission *to the pool contract's address*.

5.  **Register Admin via Owner**:
    *   `RegistryModuleOwnerCustom(...).registerAdminViaOwner(address(token));`
    *   We need to register an administrator for the `RebaseToken` within the CCIP system. This step uses the `RegistryModuleOwnerCustom` contract (its address retrieved from `networkDetails`). Calling `registerAdminViaOwner` with the token's address registers the deployer (the script's executor, who is also the token's owner) as the CCIP admin for this token.

6.  **Accept Admin Role**:
    *   `TokenAdminRegistry(...).acceptAdminRole(address(token));`
    *   The admin role registration needs to be confirmed. This is done by interacting with the `TokenAdminRegistry` contract (address from `networkDetails`) and calling `acceptAdminRole`, again referencing the token's address.

7.  **Link Token to Pool**:
    *   `TokenAdminRegistry(...).setPool(address(token), address(pool));`
    *   Finally, we explicitly link the `RebaseToken` to its specific `RebaseTokenPool` within the CCIP `TokenAdminRegistry`. This informs the CCIP system which pool contract manages the burn and mint operations for this particular token.

### Compilation and Execution

After writing the script, ensure all necessary contract imports are correctly specified with their paths relative to your Foundry project structure. Compile the script using the Foundry command:

```bash
forge build
```

Address any compilation errors, such as typos (e.g., `rmnProxyAddress` vs `rmnProxyAdress`), missing `memory` keywords, or incorrect import paths. Once the script compiles successfully, it can be executed using `forge script` against your target network (like a local Anvil instance running a fork, a testnet, or mainnet). This script effectively automates the deployment and crucial initial configuration for using your custom token with Chainlink CCIP's Burn & Mint mechanism.