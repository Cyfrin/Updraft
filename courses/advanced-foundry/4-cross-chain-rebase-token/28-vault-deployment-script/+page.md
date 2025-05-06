## Creating a Foundry Deployment Script for Your Vault Contract

This lesson guides you through creating a Solidity deployment script using the Foundry framework. We'll focus specifically on writing a script to deploy a `Vault` contract, which requires interaction with a pre-existing `RebaseToken` contract. This process involves setting up the script file, defining the deployment logic, and handling necessary contract interactions like granting permissions.

## Setting Up Your Foundry Script File

Foundry scripts are Solidity files used to automate contract deployment and on-chain interactions. To begin, create a new file specifically for your deployment logic within your Foundry project's `script` directory.

1.  **Create the File:** Name the file `Deployer.s.sol`. The `.s.sol` extension signals to Foundry that this is a script file.
2.  **Add Boilerplate:** Start with standard Solidity boilerplate to ensure compatibility and define licensing:
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.24;
    ```
3.  **Import Foundry's Script Contract:** Your deployer script needs to inherit functionality from Foundry's standard library. Import the base `Script` contract:
    ```solidity
    import {Script} from "forge-std/Script.sol";
    ```
    Inheriting from `Script` grants access to helpful utilities and cheatcodes, including those needed for broadcasting transactions.

## Structuring Deployment Logic for Different Chains

When deploying contracts for complex applications, especially those involving cross-chain interactions, thoughtful structuring of deployment scripts is crucial. In this example, we anticipate deploying different contracts to different chains.

*   The `Vault` contract is needed only on the **source chain**.
*   The `RebaseToken` and an associated `RebaseTokenPool` are needed on **both the source and destination chains**.

To manage this, we define separate script contracts within the same `Deployer.s.sol` file:

```solidity
contract TokenAndPoolDeployer is Script {
    // Logic for deploying RebaseToken and RebaseTokenPool
    // (Implementation not covered here)
}

contract VaultDeployer is Script {
    // Logic for deploying the Vault (Focus of this lesson)
}
```

This separation allows you to execute specific deployment logic targeted at the appropriate blockchain network. This lesson focuses on implementing the `VaultDeployer`.

## Implementing the VaultDeployer Script

The `VaultDeployer` script handles the deployment of the `Vault` contract and its initial setup.

1.  **Import Necessary Contracts and Interfaces:** The script needs to know the structure of the `Vault` it's deploying and the `IRebaseToken` interface it interacts with. Add the following import statements, adjusting paths as necessary relative to your `script` directory:
    ```solidity
    import {Vault} from "../src/Vault.sol";
    import {IRebaseToken} from "../src/interfaces/IRebaseToken.sol";
    ```
2.  **Define the `run` Function:** The `run` function is the main entry point executed by Foundry when you run the script.
    *   **Signature:** The `Vault` constructor requires the address of the `RebaseToken`. Therefore, the `run` function accepts this address (`_rebaseToken`) as an argument. It's declared `public` and specifies that it will return the deployed `Vault` instance.
    *   **Broadcast Transactions:** Use Foundry's cheatcodes `vm.startBroadcast()` and `vm.stopBroadcast()` to wrap the deployment and interaction logic. Any state-changing calls made between these two cheatcodes will be packaged into transactions, signed using the private key you provide when running the script, and broadcast to the target network.
    *   **Deploy the Vault:** Inside the broadcast block, deploy the `Vault` using the `new` keyword. Pass the required `RebaseToken` address to the constructor. Since the constructor likely expects an `IRebaseToken` type, cast the input `address` accordingly.
    *   **Grant Permissions:** After deployment, the `Vault` needs permission to mint and burn the `RebaseToken`. Call the `grantMintAndBurnRole` function on the `RebaseToken` contract. Cast the `_rebaseToken` address to the `IRebaseToken` interface to access the function, and cast the deployed `vault` contract instance to an `address` to pass as the argument.
    *   **Return Value:** By naming the return variable (`Vault vault`) in the function signature and assigning the result of the deployment to it (`vault = new Vault(...)`), Solidity handles the return implicitly. No explicit `return vault;` statement is needed at the end.

Here's the complete `VaultDeployer` implementation:

```solidity
contract VaultDeployer is Script {
    function run(address _rebaseToken) public returns (Vault vault) {
        // Start broadcasting transactions to the target network
        vm.startBroadcast();

        // Deploy the Vault, passing the RebaseToken address (cast to interface)
        vault = new Vault(IRebaseToken(_rebaseToken));

        // Grant the deployed Vault permission to mint/burn the RebaseToken
        IRebaseToken(_rebaseToken).grantMintAndBurnRole(address(vault));

        // Stop broadcasting transactions
        vm.stopBroadcast();

        // Implicit return of the 'vault' variable
    }
}
```

## Updating the Rebase Token Interface

For the `VaultDeployer` script to compile and run correctly, the `IRebaseToken` interface must declare the `grantMintAndBurnRole` function. If it's missing, you'll encounter compilation errors.

Ensure your `IRebaseToken.sol` file (or equivalent interface file) includes the function signature:

```solidity
interface IRebaseToken {
    // ... other function signatures (e.g., mint, burn, balance) ...

    /**
     * @notice Grants the minting and burning role to an account.
     * @param _account The address to grant the role to.
     */
    function grantMintAndBurnRole(address _account) external;
}
```

Adding this signature allows other contracts and scripts (like our `VaultDeployer`) to correctly call this function on any contract implementing the `IRebaseToken` interface. *Note:* If you encounter persistent linter or compiler errors related to this function even after updating the interface, try refreshing your IDE's cache or restarting the language server. Sometimes, simply re-typing or pasting the line causing the error can resolve temporary tooling glitches.

## Key Concepts and Best Practices Review

This lesson demonstrated several important concepts for writing Foundry deployment scripts:

*   **Foundry Scripts:** Use files inheriting from `forge-std/Script.sol` with a `.s.sol` extension to automate deployment and interactions.
*   **`run` Function:** The standard entry point for script execution.
*   **Cheatcodes (`vm.startBroadcast`/`vm.stopBroadcast`):** Essential for delineating which operations should become on-chain transactions signed by the deployer.
*   **Contract Deployment (`new`):** Standard Solidity syntax used within scripts to deploy new contract instances. Remember to pass required constructor arguments.
*   **Interfaces (`IRebaseToken`):** Crucial for defining interaction points with contracts without needing their full source code, enabling modularity and interaction between different components.
*   **Access Control:** Post-deployment steps often involve setting permissions. Here, `grantMintAndBurnRole` exemplifies granting necessary capabilities to a newly deployed contract.
*   **Type Casting:** Converting between types like `address` and interfaces (`IRebaseToken(_rebaseToken)`) or contract instances and `address` (`address(vault)`) is frequently needed when interacting with different contract functions.
*   **Deployment Strategy:** Separating deployment logic into distinct script contracts (`VaultDeployer`, `TokenAndPoolDeployer`) based on where contracts are needed (e.g., source vs. destination chain) is a robust pattern, particularly for multi-chain or cross-chain applications.
*   **Visibility & Returns:** Ensure the `run` function has `public` or `external` visibility. Utilize named return variables for cleaner code and implicit returns.