## Deploying Your First Account Abstraction Contract with Foundry Scripts

This lesson guides you through setting up the essential deployment infrastructure for an Account Abstraction (AA) smart contract using Foundry. We'll focus on creating robust deployment scripts that handle configuration management across different blockchain networks, using the `MinimalAccount` contract as our example.

Our primary goal is to create Foundry scripts capable of deploying the `MinimalAccount` contract onto various chains, specifically addressing the configuration differences between networks like Sepolia and zkSync Sepolia.

### Understanding Foundry Scripts

Foundry provides powerful scripting capabilities (`forge script`) that allow us to automate contract deployments and interactions. These scripts are essentially Solidity contracts themselves, inheriting from `forge-std/Script.sol`.

Key features include:

*   **`run()` function:** The typical entry point for script execution.
*   **Cheatcodes:** Special functions accessed via the `vm` instance (e.g., `vm.startBroadcast()`, `vm.stopBroadcast()`) that allow interaction with the underlying EVM environment, like simulating transactions from specific accounts.

We will leverage these features to programmatically deploy our `MinimalAccount`.

### Managing Chain-Specific Configurations with Helper Contracts

A critical challenge in multi-chain deployment is managing network-specific parameters, such as the addresses of core infrastructure contracts. Hardcoding these addresses directly into deployment scripts makes them brittle and difficult to maintain.

To solve this, we employ the **Helper Contract pattern**. We'll create a dedicated contract, `HelperConfig.s.sol`, solely responsible for storing and providing configuration data based on the target chain ID.

**`HelperConfig.s.sol` Breakdown:**

This contract centralizes configuration management.

1.  **`NetworkConfig` Struct:** Defines the data structure to hold configuration for a single network.
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.19;

    contract HelperConfig {
        struct NetworkConfig {
            address entryPoint; // Address of the ERC-4337 EntryPoint contract
            address account;    // Address of the account to use for deployment (e.g., burner wallet)
        }
        // ... rest of the contract ...
    }
    ```

2.  **Constants:** Define chain IDs and other constants for clarity and maintainability. The `BURNER_WALLET` represents the Externally Owned Account (EOA) we'll use via `vm.startBroadcast` to simulate the deployment.
    ```solidity
    // Inside HelperConfig contract
    uint256 public constant ETH_SEPOLIA_CHAIN_ID = 11155111;
    uint256 public constant ZKSYNC_SEPOLIA_CHAIN_ID = 300;
    uint256 public constant LOCAL_CHAIN_ID = 31337; // For local Anvil node
    address public constant BURNER_WALLET = 0xYOUR_DEPLOYER_ADDRESS; // Replace with your EOA
    ```

3.  **Storage:** Use mappings to store `NetworkConfig` structs keyed by chain ID. A separate variable holds the config for local Anvil testing.
    ```solidity
    // Inside HelperConfig contract
    NetworkConfig public localNetworkConfig;
    mapping(uint256 chainId => NetworkConfig) public networkConfigs;
    ```

4.  **Constructor & Getters:** The constructor populates the initial configurations. Getter functions provide access to the configuration, either for the currently connected chain (`getConfig`) or a specific chain ID (`getConfigByChainId`).
    ```solidity
    // Inside HelperConfig contract
    constructor() {
        networkConfigs[ETH_SEPOLIA_CHAIN_ID] = getEthSepoliaConfig();
        networkConfigs[ZKSYNC_SEPOLIA_CHAIN_ID] = getZkSyncSepoliaConfig();
    }

    // Returns config for Ethereum Sepolia
    function getEthSepoliaConfig() public pure returns (NetworkConfig memory) {
        return NetworkConfig({
            entryPoint: 0x5FF137D4b0FDCD49DcA30C7CF57E578a026d2789, // Known Sepolia EntryPoint
            account: BURNER_WALLET
        });
    }

    // Returns config for zkSync Sepolia
    function getZkSyncSepoliaConfig() public pure returns (NetworkConfig memory) {
        // zkSync has native AA, potentially different EntryPoint mechanism
        return NetworkConfig({
            entryPoint: address(0), // Using address(0) as placeholder
            account: BURNER_WALLET
        });
    }

    // Gets config based on the currently connected chain ID
    function getConfig() public view returns (NetworkConfig memory) { // Changed to view
        return getConfigByChainId(block.chainid);
    }

    // Gets config for a specific chain ID, handling local Anvil case
    function getConfigByChainId(uint256 chainId) public view returns (NetworkConfig memory) { // Changed to view
        if (networkConfigs[chainId].account != address(0)) {
            return networkConfigs[chainId];
        }
        if (chainId == LOCAL_CHAIN_ID) {
            return getOrCreateAnvilEthConfig();
        }
        revert("HelperConfig__InvalidChainId()");
    }

    // Function for local Anvil testing (mock deployment logic needed)
    function getOrCreateAnvilEthConfig() public view returns (NetworkConfig memory) { // Changed to view
        if (localNetworkConfig.account != address(0)) {
            return localNetworkConfig;
        }
        // NOTE: For actual local testing, you'd deploy a mock EntryPoint here
        // and store its address in localNetworkConfig.
        // For now, we'll revert.
        revert("Mock Anvil EntryPoint deployment not implemented yet");
    }

    error HelperConfig__InvalidChainId(); // Custom error
    ```
    *Note: Getter functions are marked `view` as they only read state.*

**The `EntryPoint` Contract:**

In ERC-4337 Account Abstraction, the `EntryPoint` is a critical singleton contract responsible for orchestrating User Operations (`UserOps`). Our `MinimalAccount` needs to know the address of the `EntryPoint` on the target chain, which is why we store it in our `NetworkConfig`.

**zkSync Native Account Abstraction:**

It's worth noting that some chains, like zkSync, implement native account abstraction. This might mean the role or necessity of a specific ERC-4337 `EntryPoint` contract differs. In our `HelperConfig`, we use `address(0)` as a placeholder for the `entryPoint` on zkSync Sepolia, indicating that specific handling might be required later.

### Creating the Deployment Script: `DeployMinimal.s.sol`

This script uses the `HelperConfig` to deploy the `MinimalAccount` contract.

1.  **Imports & Setup:** Import necessary contracts, including `Script`, `MinimalAccount`, and our `HelperConfig`.
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.19;

    import {Script} from "forge-std/Script.sol";
    import {MinimalAccount} from "../src/ethereum/MinimalAccount.sol"; // Adjust path if needed
    import {HelperConfig} from "./HelperConfig.s.sol";

    contract DeployMinimal is Script {
        // ... deployment logic ...
    }
    ```

2.  **Deployment Function:** The core logic resides here.
    ```solidity
    // Inside DeployMinimal contract
    function deployMinimalAccount() public returns (HelperConfig, MinimalAccount) {
        // 1. Instantiate HelperConfig (this actually deploys a temporary HelperConfig
        //    instance during the script run to access its configuration logic).
        //    Note: It's often better to pass a pre-deployed HelperConfig address
        //    if you plan to reuse it, but instantiating here is simpler for this example.
        HelperConfig helperConfig = new HelperConfig();

        // 2. Get the configuration for the current chain.
        HelperConfig.NetworkConfig memory config = helperConfig.getConfig();

        // 3. Start broadcasting transactions from the deployer account specified in the config.
        vm.startBroadcast(config.account);

        // 4. Deploy the MinimalAccount, passing the chain-specific EntryPoint address.
        MinimalAccount minimalAccount = new MinimalAccount(config.entryPoint);

        // 5. Stop broadcasting. All transactions between start and stop are sent
        //    from config.account.
        vm.stopBroadcast();

        // 6. Return the HelperConfig instance (for potential later use) and the deployed contract.
        return (helperConfig, minimalAccount);
    }

    // The main entry point for `forge script`
    function run() external returns (HelperConfig, MinimalAccount) {
       return deployMinimalAccount();
    }
    ```

### Connecting the Pieces

*   `DeployMinimal.s.sol` orchestrates the deployment.
*   It instantiates and queries `HelperConfig.s.sol` to fetch the correct `EntryPoint` address and the `account` (deployer) for the target chain.
*   It uses Foundry's `vm.startBroadcast` and `vm.stopBroadcast` to execute the deployment transaction (`new MinimalAccount(...)`) from the specified deployer account.
*   The `MinimalAccount` contract receives the correct `EntryPoint` address during its construction.

### Placeholder for User Operations: `SendPackedUserOp.s.sol`

We've also created an empty script file, `script/SendPackedUserOp.s.sol`. This is a placeholder for the next significant step: implementing the logic to create, sign, and send **Packed User Operations (`UserOps`)**. This is the core mechanism of ERC-4337 AA, allowing users to interact with the blockchain through their smart contract accounts. Implementing this will involve more complex cryptographic operations and data structuring.

### Key Takeaways and Best Practices

*   **Use Helper Contracts:** Abstract chain-specific configuration (`EntryPoint` addresses, deployer accounts) into a `HelperConfig` contract for maintainable and flexible deployments.
*   **Foundry Scripting:** Leverage `forge script`, `Script` inheritance, and `vm` cheatcodes for automated deployments.
*   **Constants:** Use constants for chain IDs and key addresses.
*   **Broadcasting:** Understand `vm.startBroadcast(sender)` to control which account executes deployment transactions.
*   **Local Testing:** Plan for mocking external dependencies (like `EntryPoint`) when running scripts against local nodes like Anvil. The `getOrCreateAnvilEthConfig` function structure anticipates this.
*   **Chain Differences:** Be mindful of variations like zkSync's native AA when designing configuration.

### Next Steps

1.  **Implement `SendPackedUserOp.s.sol`:** Tackle the creation, signing, and submission of `UserOps`.
2.  **Local Mock Deployment:** Add logic to `getOrCreateAnvilEthConfig` in `HelperConfig.s.sol` to deploy a mock `EntryPoint` for local Anvil testing.
3.  **Testing:** Write comprehensive tests (`forge test`) to verify both the deployment scripts and the functionality of the deployed contracts, including UserOp handling.

By following this structure, you create a robust foundation for deploying and interacting with your Account Abstraction contracts across multiple networks using Foundry.