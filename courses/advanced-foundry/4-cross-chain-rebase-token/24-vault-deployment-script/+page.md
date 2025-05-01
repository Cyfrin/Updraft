## Creating a Vault Deployer Script with Forge

This lesson guides you through building a Solidity script using the Foundry/Forge framework to deploy a `Vault` smart contract. We'll focus on structuring the script, handling dependencies, using Forge cheatcodes, and managing necessary permissions, particularly in the context of a cross-chain deployment scenario.

### Setting Up the Deployment Script File

First, we need to create the file that will house our deployment logic. Within your Foundry project, create a new file in the `script/` directory:

```
script/Deployer.s.sol
```

Inside this file, start with the standard Solidity boilerplate, specifying the license and compiler version:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
```

Next, import the base `Script` contract from the Forge Standard Library (`forge-std`). This contract provides essential functionalities for scripting, including access to Forge's powerful cheatcodes via the `vm` instance.

```solidity
import {Script} from "forge-std/Script.sol";
```

### Structuring Deployment Logic for Cross-Chain Scenarios

In many Web3 applications, especially those involving cross-chain interactions like CCIP (Cross-Chain Interoperability Protocol), not all contracts are deployed to every chain. Some components might exist only on a source chain, while others are needed on both source and destination chains.

To handle this, it's good practice to separate deployment logic. In this example, we'll define two script contracts within our `Deployer.s.sol` file:

1.  `TokenAndPoolDeployer`: (Implementation not detailed here) This would handle deploying contracts like `RebaseToken` and `RebaseTokenPool`, which are assumed to exist on *both* source and destination chains.
2.  `VaultDeployer`: This will handle deploying the `Vault` contract, which, in our scenario, is intended *only* for the source chain (handling deposits and redemptions).

Both contracts will inherit from the `Script` contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
// Import other dependencies as needed...

contract TokenAndPoolDeployer is Script {
    // Logic for deploying token and pool (omitted for brevity)
}

contract VaultDeployer is Script {
    // Logic for deploying the Vault contract (detailed below)
}
```

This separation keeps the deployment process organized and adaptable to different chain requirements. We will now focus on implementing the `VaultDeployer`.

### Implementing the VaultDeployer Script

The `VaultDeployer` script needs to perform several tasks: deploy the `Vault` contract, provide its constructor arguments, and grant it necessary permissions on another contract (`RebaseToken`).

**1. Importing Dependencies:**

The script needs to know about the `Vault` contract it's deploying and the interface of the `RebaseToken` it interacts with. Add these imports within `Deployer.s.sol`:

```solidity
import {Vault} from "../src/Vault.sol";
import {IRebaseToken} from "../src/interfaces/IRebaseToken.sol";
```

**2. Defining the `run` Function:**

Forge scripts execute their logic within a `run` function. This function will orchestrate the deployment steps.

*   **Input Argument:** The `Vault` constructor requires the address of the associated `RebaseToken`. Therefore, our `run` function needs to accept this address as an input parameter (`address _rebaseToken`).
*   **Return Value:** We want the script to return the instance of the deployed `Vault` contract. We declare this using a named return variable `returns (Vault vault)`. Solidity allows for implicit returns when named return variables are assigned a value.
*   **Visibility:** The `run` function must be `public` or `external`.

```solidity
contract VaultDeployer is Script {
    // Imports Vault and IRebaseToken go here...

    function run(address _rebaseToken) public returns (Vault vault) {
        // Deployment logic will go here
    }
}
```

**3. Broadcasting Transactions:**

Any operation that changes the blockchain state (like deploying a contract or calling a function that modifies storage) must be broadcast as a transaction. Forge provides cheatcodes for this: `vm.startBroadcast()` and `vm.stopBroadcast()`. All state-changing calls between these two cheatcodes will be packaged and sent as transactions when the script is executed.

```solidity
    function run(address _rebaseToken) public returns (Vault vault) {
        vm.startBroadcast();

        // State-changing operations: Deployment & Role Granting

        vm.stopBroadcast();
        // Implicit return of 'vault' happens here
    }
```

**4. Deploying the Vault Contract:**

Inside the broadcast block, we deploy the `Vault` contract using the `new` keyword. We must pass the required constructor arguments. The `Vault` constructor expects an instance of `IRebaseToken`, but our `run` function receives an `address`. We need to cast the `_rebaseToken` address to the `IRebaseToken` interface type. The result of the deployment (the contract instance) is assigned to our named return variable `vault`.

```solidity
        vm.startBroadcast();

        // Deploy the Vault, passing the RebaseToken address cast to the interface type
        vault = new Vault(IRebaseToken(_rebaseToken));

        // Role granting logic comes next...

        vm.stopBroadcast();
```

**5. Granting Permissions (Role-Based Access Control):**

Our `Vault` contract needs permission to mint and burn the `RebaseToken` to function correctly. Assuming the `RebaseToken` uses role-based access control, it likely has a function like `grantMintAndBurnRole(address _account)` to grant these permissions.

We need to call this function on the `RebaseToken` instance, granting the role to our newly deployed `vault`.

*   We already have the `RebaseToken` address (`_rebaseToken`), which we can cast to `IRebaseToken` to call its functions.
*   The `grantMintAndBurnRole` function expects an `address`, but we have the `vault` contract instance. We need to cast the `vault` instance to its `address`.

```solidity
        vm.startBroadcast();

        vault = new Vault(IRebaseToken(_rebaseToken));

        // Grant the deployed Vault the necessary role on the RebaseToken
        IRebaseToken(_rebaseToken).grantMintAndBurnRole(address(vault));

        vm.stopBroadcast();
```

**6. Ensuring the Interface is Up-to-Date:**

For the script to compile and successfully call `grantMintAndBurnRole` on the `IRebaseToken` type, the function signature must exist in the interface definition file (`src/interfaces/IRebaseToken.sol`). Make sure the interface includes this function:

```solidity
// In src/interfaces/IRebaseToken.sol
interface IRebaseToken {
    // ... other functions like mint, burn, balanceof, etc.

    // Ensure this function signature is present
    function grantMintAndBurnRole(address _account) external;
}
```

If you add this function to the interface after initially writing the script code that calls it, your IDE or linter might sometimes show a persistent error. A common workaround is to cut the line causing the error in your script (`IRebaseToken(_rebaseToken).grantMintAndBurnRole(...)`), save the file, and then paste the line back in. This often forces the linter to re-evaluate based on the updated interface.

### Final `VaultDeployer` Script

Putting it all together, the `VaultDeployer` contract within `script/Deployer.s.sol` looks like this:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {Vault} from "../src/Vault.sol";
import {IRebaseToken} from "../src/interfaces/IRebaseToken.sol";

// Contract TokenAndPoolDeployer would typically be defined here as well

contract VaultDeployer is Script {
    /**
     * @notice Deploys the Vault contract and grants it mint/burn role on the RebaseToken.
     * @param _rebaseToken The address of the already deployed RebaseToken contract.
     * @return vault The instance of the newly deployed Vault contract.
     */
    function run(address _rebaseToken) public returns (Vault vault) {
        // Start broadcasting transactions to the network
        vm.startBroadcast();

        // 1. Deploy the Vault contract, providing the RebaseToken address
        //    (cast to the required IRebaseToken interface type) as the constructor argument.
        vault = new Vault(IRebaseToken(_rebaseToken));

        // 2. Grant the newly deployed Vault contract the permission to mint and burn
        //    tokens by calling grantMintAndBurnRole on the RebaseToken contract.
        //    The Vault instance needs to be cast to an address for the function argument.
        IRebaseToken(_rebaseToken).grantMintAndBurnRole(address(vault));

        // Stop broadcasting transactions
        vm.stopBroadcast();

        // The 'vault' variable is implicitly returned because it's a named return variable
        // and has been assigned a value within the function body.
    }
}
```

This script effectively deploys the `Vault` contract, configures it with the necessary `RebaseToken` address during construction, and grants the required permissions for its operation, all automated through Forge scripting. Remember that executing this script requires providing the address of an already deployed `RebaseToken` contract.