## Crafting Your Foundry Deployment Script for the Vault Contract

This lesson guides you through creating a deployer script using Foundry for a Solidity project, focusing on the deployment of a `Vault` contract. We'll cover setting up the script, structuring your deployment logic, and implementing the necessary functions to deploy the `Vault` and configure its initial permissions.

### Project Setup and Initial File Creation

The first step in automating your contract deployment is to create a dedicated script file within your Foundry project.

1.  **Create the Deployer Script File:**
    Navigate to the `script` directory of your project and create a new file named `Deployer.s.sol`. The `.s.sol` extension is crucial as it signals to Foundry that this file contains deployment or interaction scripts.

    ```
    // Project structure excerpt:
    // script/
    //   Deployer.s.sol  (newly created)
    ```

2.  **Basic Solidity Boilerplate:**
    Begin your `Deployer.s.sol` file with standard Solidity boilerplate:
    *   **SPDX License Identifier:** Specify the license under which your code is released.
        ```solidity
        // SPDX-License-Identifier: MIT
        ```
    *   **Pragma Solidity:** Define the Solidity compiler version(s) compatible with your script.
        ```solidity
        pragma solidity ^0.8.24;
        ```

### Purpose and Scope of the Deployer Script

This deployer script is designed to handle several key deployment tasks within our project:
1.  Deploy a `RebaseToken` contract.
2.  Deploy a `RebaseTokenPool` contract.
3.  Deploy a `Vault` contract.
4.  Configure all necessary permissions for Cross-Chain Interoperability Protocol (CCIP) integration.

While this lesson focuses primarily on the `Vault` deployment, understanding the broader scope helps in structuring the script effectively.

### Importing Foundry's Core `Script` Contract

To utilize Foundry's powerful scripting features, such as cheatcodes for broadcasting transactions and managing contract state during deployment, you need to import the base `Script` contract from the `forge-std` library.

```solidity
import {Script} from "forge-std/Script.sol";
```
By inheriting from `Script`, your deployer contracts gain access to a rich set of tools provided by Foundry.

### Structuring Deployer Contracts for Targeted Deployment

For this project, we'll define two separate deployer contracts within our `Deployer.s.sol` file to manage distinct deployment requirements:

1.  **`TokenAndPoolDeployer`:** This contract will be responsible for deploying the `RebaseToken` and `RebaseTokenPool` contracts. Its implementation will be covered separately.
    ```solidity
    contract TokenAndPoolDeployer is Script {
        // Implementation for RebaseToken and RebaseTokenPool deployment will be added here.
    }
    ```

2.  **`VaultDeployer`:** This contract will specifically handle the deployment of the `Vault` contract.
    ```solidity
    contract VaultDeployer is Script {
        // Implementation for Vault deployment will be detailed below.
    }
    ```

**Rationale for Separation:**
This separation is strategic due to the differing deployment needs of the contracts:
*   The **`Vault` contract** is intended for deployment *only on the source chain*. This is because core functionalities like deposits and redemptions are restricted to the source chain environment.
*   The **`RebaseToken` and `RebaseTokenPool` contracts**, on the other hand, need to be deployed on *both the source and destination chains* to facilitate cross-chain operations.

By splitting the deployment logic, we can execute each deployer script selectively on the appropriate chains.

### Implementing the `VaultDeployer` Contract

Let's focus on implementing the `VaultDeployer` contract, which is a more straightforward starting point.

1.  **Importing Necessary Contracts and Interfaces:**
    To deploy the `Vault` and interact with its dependencies, we need to import the relevant contract definitions and interfaces:
    *   The `Vault` contract itself, typically located in your project's `src` directory. *Note: The exact path (`../src/Vault.sol`) might vary based on your project's directory structure.*
        ```solidity
        import {Vault} from "../src/Vault.sol";
        ```
    *   The `IRebaseToken` interface. The `Vault` constructor requires an address conforming to this interface.
        ```solidity
        import {IRebaseToken} from "../src/interfaces/IRebaseToken.sol";
        ```

2.  **Defining the `run` Function:**
    The `run()` function is the main entry point for a Foundry script. Foundry executes this function when you invoke the script.
    *   It will take the address of the already deployed `_rebaseToken` as an argument, as the `Vault`'s constructor depends on it.
        ```solidity
        // Context from Vault.sol's constructor:
        // constructor(IRebaseToken _rebaseToken) {
        //     i_rebaseToken = _rebaseToken;
        // }
        ```
    *   Initially, we define it without a return type, which we'll refine later.
        ```solidity
        function run(address _rebaseToken) public {
            // Deployment logic will go here.
        }
        ```

3.  **Using Foundry Cheatcodes for Deployment:**
    Foundry provides "cheatcodes" (accessible via the `vm` instance inherited from `Script`) to interact with the blockchain environment during script execution.
    *   `vm.startBroadcast();`: This crucial cheatcode tells Foundry to start broadcasting all subsequent state-changing calls (like contract deployments or function calls that modify state) as actual transactions to the specified network.
    *   `vm.stopBroadcast();`: This signals Foundry to stop broadcasting transactions. All deployments and state changes should occur between these two calls.

4.  **Deploying the `Vault` Contract:**
    Inside the `run` function, between `vm.startBroadcast()` and `vm.stopBroadcast()`, use the `new` keyword to deploy an instance of the `Vault` contract. Pass the `_rebaseToken` address, appropriately cast to the `IRebaseToken` type, to its constructor.
    ```solidity
    vm.startBroadcast();
    Vault vault = new Vault(IRebaseToken(_rebaseToken));
    // Permissions granting logic will follow here.
    vm.stopBroadcast();
    ```

5.  **Granting Mint and Burn Role to the Vault:**
    After deploying the `Vault`, it typically needs specific permissions on other contracts. In this case, the `Vault` requires the ability to mint and burn `RebaseToken`s. This is achieved by calling a `grantMintAndBurnRole` function on the `rebaseToken` contract instance, passing the address of the newly deployed `vault`.
    ```solidity
    // Inside the run function, after vault deployment and before vm.stopBroadcast():
    IRebaseToken(_rebaseToken).grantMintAndBurnRole(address(vault));
    ```

    *   **Interface Update for `grantMintAndBurnRole`:**
        You might encounter a linter or compiler error if the `grantMintAndBurnRole` function is not defined in your `IRebaseToken` interface. To resolve this, navigate to your `src/interfaces/IRebaseToken.sol` file (or wherever it's defined) and add the function signature:
        ```solidity
        // In IRebaseToken.sol
        interface IRebaseToken {
            // ... other function signatures
            function grantMintAndBurnRole(address _account) external;
        }
        ```
        This update ensures that your script can correctly call the function on an `IRebaseToken` instance.
    *   **Tip for Lingering Linter Errors:** Sometimes, Solidity linters in IDEs might not immediately pick up changes in imported files. If an error persists after you've correctly updated an interface, try cutting and pasting the problematic line of code back into your script; this can often force the linter to re-evaluate.

6.  **Returning the Deployed Vault Instance:**
    To make the address (and instance) of the deployed `Vault` contract easily accessible to other scripts or for verification after the script runs, modify the `run` function to return the `Vault` instance.
    *   Foundry scripts offer a convenient feature: they can implicitly return the last assigned variable if the `returns` clause of the function matches its type and name.
    *   Update the `run` function signature to declare `Vault vault` as a return variable.
    *   Remove the `Vault` type declaration for the `vault` variable inside the function body, as it's now declared in the `returns` clause and will be assigned directly.

    The final `VaultDeployer` contract with the `run` function looks like this:
    ```solidity
    contract VaultDeployer is Script {
        // Imports for Vault and IRebaseToken should be above this contract definition

        function run(address _rebaseToken) public returns (Vault vault) {
            vm.startBroadcast();
            vault = new Vault(IRebaseToken(_rebaseToken)); // 'vault' is now assigned to the return variable
            IRebaseToken(_rebaseToken).grantMintAndBurnRole(address(vault));
            vm.stopBroadcast();
            // Foundry implicitly returns the 'vault' instance here
        }
    }
    ```

### Summary of the `VaultDeployer` Script

At this stage, your `VaultDeployer` script is configured to perform the following actions:
1.  Accept the address of a pre-deployed `RebaseToken` contract as an input parameter.
2.  Deploy a new instance of the `Vault` contract, correctly initializing it by passing the `RebaseToken` address to its constructor.
3.  Grant the newly deployed `Vault` contract the necessary `MintAndBurnRole` on the provided `RebaseToken` contract.
4.  Return the instance of the successfully deployed `Vault` contract, making its address and methods available for subsequent operations or verification.

This segment has demonstrated a foundational approach to creating a targeted deployment script in Foundry, encompassing constructor argument handling, interaction with contract interfaces, essential permission management, and leveraging Foundry's implicit return capabilities for deployed contract instances.