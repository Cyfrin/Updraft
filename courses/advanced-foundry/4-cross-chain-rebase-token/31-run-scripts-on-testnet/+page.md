## Deploying Your Cross-Chain Application to Testnets

This lesson guides you through deploying smart contracts to Ethereum Sepolia and ZKsync Sepolia testnets. We'll cover obtaining necessary testnet tokens, addressing specific challenges with ZKsync deployment using Foundry, and configuring your cross-chain setup. This process offers a more realistic testing environment compared to local fork testing.

## Preparing for Testnet Deployment: Acquiring Testnet Funds

Before deploying, ensure you have testnet Ether (ETH) on both Ethereum Sepolia and ZKsync Sepolia. This process is assumed to have been covered previously.

A critical requirement for Chainlink CCIP (Cross-Chain Interoperability Protocol) is testnet LINK tokens to pay for transaction fees. You can acquire these from the Chainlink Faucet:

1.  Navigate to `faucets.chain.link`.
2.  Select the "Link" tab (as opposed to "Native" or "All").
3.  Choose "Ethereum Sepolia" from the network options and request LINK tokens (e.g., the faucet might offer "Drips 250 LINK").
4.  Next, choose "ZKsync Sepolia" and request LINK tokens (e.g., "Drips 25 LINK").
5.  Click "Continue" after making your selections.
6.  Confirm the wallet address(es) to which the tokens will be sent.
7.  Click "Get tokens."
8.  Your wallet (e.g., MetaMask) will prompt you to sign a message. This signature proves ownership of your address and does not initiate a transaction. Sign the request.
9.  Wait for the faucet to process your request and send the LINK tokens to your wallet on both testnets.

## Navigating Testnet Deployment: Strategies and ZKsync Workarounds

Deploying to public testnets provides invaluable insights into how your application will behave in a live, decentralized environment. However, tooling support can vary between networks, especially for newer Layer 2 solutions.

**The Challenge with ZKsync Sepolia and Foundry Scripts:**
At the time of this lesson, Foundry scripts (`forge script`) and their associated cheatcodes (e.g., `vm.startBroadcast()`, `vm.stopBroadcast()`) do not function reliably on ZKsync Sepolia. This is due to incomplete cheatcode implementation within the Foundry ZKsync integration. Fork testing ZKsync also faces similar limitations.

**The Workaround: Bash Scripting with `forge create` and `cast send`:**
To overcome these limitations for ZKsync Sepolia, we will employ a Bash script (`bridgeToZksync.sh`). This script will utilize lower-level Foundry commands for deployment and contract interaction:
*   `forge create`: Used to deploy smart contracts.
*   `cast send`: Used to call functions on already deployed contracts (e.g., for setting permissions or configurations).

**Crucial Flags for ZKsync Interaction:** When using `forge create` and `cast send` with ZKsync Sepolia, you must include the `--legacy` and `--zksync` flags.
*   `--zksync`: Informs Foundry to use ZKsync-specific compilation and transaction formats.
*   `--legacy`: Indicates that legacy transaction types should be used. *Note: The ZKsync team may phase out the necessity of the `--legacy` flag in the future. Always consult the official ZKsync documentation for the latest recommendations.*

**Ethereum Sepolia Deployment:**
Fortunately, Ethereum Sepolia fully supports Foundry scripts. Therefore, our Bash script will leverage standard `forge script` commands for deploying and configuring contracts on the Sepolia testnet.

## Setting Up Your Deployment Environment

Proper environment configuration is essential for smooth deployment. This involves setting up a `.env` file for sensitive information and using Foundry's keystore for private key management.

**Environment Variables (`.env` file):**
The `bridgeToZksync.sh` script will source its configuration from a `.env` file located in your project root. This file should contain:

*   `ZKSYNC_SEPOLIA_RPC_URL`: The RPC endpoint for the ZKsync Sepolia testnet.
    *   **Pro Tip:** If you encounter issues with third-party RPC providers like Alchemy for ZKsync Sepolia, consider using the official RPC URL: `https://sepolia.era.zksync.dev`.
*   `SEPOLIA_RPC_URL`: The RPC endpoint for the Ethereum Sepolia testnet (e.g., obtained from Alchemy or Infura).

**Secure Private Key Handling (Foundry Keystore):**
**Critical Security Note:** Never paste your private keys directly into your `.env` file, scripts, or commit them to version control.

The recommended method for managing private keys with Foundry is to use a keystore. This lesson assumes you have already imported an account into Foundry (e.g., named `updraft`) using a command similar to `cast wallet import --interactive updraft`. The Bash script will then reference this account using the `--account updraft` flag in `forge create`, `cast send`, and `forge script` commands. When the script executes, Foundry will prompt you for the password associated with this keystore account, ensuring your private key remains secure.

## Executing the Deployment: A Step-by-Step Guide to the `bridgeToZksync.sh` Script

The `bridgeToZksync.sh` script automates the deployment and configuration process across both ZKsync Sepolia and Ethereum Sepolia, culminating in a cross-chain token bridge.

**Script Structure and Key Steps:**

1.  **Load Environment Variables:**
    ```bash
    source .env
    ```
    This command loads the `ZKSYNC_SEPOLIA_RPC_URL` and `SEPOLIA_RPC_URL` from your `.env` file.

2.  **Update Foundry for ZKsync:**
    ```bash
    foundryup -zksync
    ```
    Ensures your Foundry toolchain is updated with the latest ZKsync compatibility.

3.  **Compile Contracts for ZKsync:**
    ```bash
    forge build --zksync
    ```
    Compiles your smart contracts specifically for the ZKsync environment.

4.  **Deploy Contracts on ZKsync Sepolia:**
    Using `forge create ... --legacy --zksync --account updraft`:
    *   Deploy `RebaseToken.sol`.
    *   Deploy `RebaseTokenPool.sol`, passing the deployed `RebaseToken` address as a constructor argument.
    *   *Note: The script will capture the deployed contract addresses for subsequent steps.*

5.  **Set Permissions on ZKsync Sepolia Contracts:**
    Using `cast send <CONTRACT_ADDRESS> "<FUNCTION_SIGNATURE>(<ARGS>)" ... --account updraft --legacy --zksync`:
    *   Call `grantMintAndBurnRole` on the deployed ZKsync RebaseToken, granting the minting and burning role to the ZKsync RebaseTokenPool contract.
    *   Call `registerAdminViaOwner` on the ZKsync Registry Module.
    *   Call `acceptAdminRole` on the ZKsync Token Admin Registry.
    *   Call `setPool` on the ZKsync Token Admin Registry, linking the ZKsync RebaseToken and RebaseTokenPool addresses.

6.  **Deploy Contracts on Ethereum Sepolia:**
    Using `forge script ./script/Deployer.s.sol:<ScriptName> --rpc-url $SEPOLIA_RPC_URL --account updraft --broadcast`:
    *   Execute the `TokenAndPoolDeployer` script (e.g., `script/Deployer.s.sol:TokenAndPoolDeployer`) to deploy the RebaseToken and RebaseTokenPool contracts on Sepolia. The script will output the deployed addresses.
    *   Execute the `VaultDeployer` script (e.g., `script/Deployer.s.sol:VaultDeployer`) to deploy the Vault contract on Sepolia.

7.  **Set Permissions on Ethereum Sepolia Contracts:**
    Using `forge script ./script/Deployer.s.sol:<ScriptName> --rpc-url $SEPOLIA_RPC_URL --account updraft --broadcast --sig "<FUNCTION_SIGNATURE>(<ARGS>)" <ARG_VALUES>`:
    *   This step involves calling specific functions within a permission-setting script (e.g., `SetPermissions` in `Deployer.s.sol`) to grant roles and set CCIP admin configurations. *Details on potential script modifications for this step are covered in the "Troubleshooting Deployment" section.*

8.  **Configure Pool on Ethereum Sepolia:**
    Using `forge script ./script/ConfigurePools.sol:ConfigurePoolScript --rpc-url $SEPOLIA_RPC_URL --account updraft --broadcast`:
    *   Run a script (e.g., `ConfigurePoolScript`) to configure the deployed Sepolia RebaseTokenPool for cross-chain interaction with the ZKsync deployment. This typically involves setting the destination chain selector and target contract addresses.

9.  **Deposit Funds into Sepolia Vault:**
    Using `cast send $SEPOLIA_VAULT_ADDRESS "deposit()" --value $AMOUNT --rpc-url $SEPOLIA_RPC_URL --account updraft`:
    *   Send a specified amount of ETH (defined by an `$AMOUNT` variable in the script) to the `deposit()` function of the deployed Vault contract on Sepolia.

10. **Configure Pool on ZKsync Sepolia:**
    Using `cast send $ZKSYNC_POOL_ADDRESS "applyChainUpdates((address,address,uint64,bool)[])" "[[$SEPOLIA_REBASE_TOKEN_ADDRESS, $SEPOLIA_POOL_ADDRESS, $ETHEREUM_SEPOLIA_CHAIN_SELECTOR, true]]" --rpc-url $ZKSYNC_SEPOLIA_RPC_URL --account updraft --legacy --zksync`:
    *   Call `applyChainUpdates` on the ZKsync RebaseTokenPool. This function takes an array of structs containing configuration data for each supported source chain. Here, it's configured with the Sepolia RebaseToken address, Sepolia Pool address, and the Ethereum Sepolia chain selector.

11. **Bridge Funds from Sepolia to ZKsync:**
    Using `forge script ./script/BridgeTokens.s.sol:BridgeTokensScript --rpc-url $SEPOLIA_RPC_URL --account updraft --broadcast`:
    *   Execute a script (e.g., `BridgeTokensScript`) to initiate the CCIP transfer of tokens from the Sepolia Vault to the ZKsync RebaseTokenPool. This script will interact with the CCIP Router contract.

## Troubleshooting Deployment: Handling Errors and Script Refinements

Testnet deployments can sometimes encounter issues due to network congestion, gas price fluctuations, or nonce management complexities.

**Error Encountered: "future transaction tries to replace pending"**
During an initial execution of the Bash script, you might encounter an error like `Context: server returned an error response: error code -32000: future transaction tries to replace pending`. This typically occurs when deploying to Sepolia using `forge script`.

**Reasoning:**
This error often points to nonce management issues. When a Foundry script executes multiple transactions within a single `vm.startBroadcast()` / `vm.stopBroadcast()` block, or if multiple script executions happen in rapid succession, the underlying transaction nonces might conflict, especially on a busy testnet like Sepolia. High gas fees or general network congestion can exacerbate this.

**Solution: Splitting Script Logic for Robustness:**
To mitigate nonce-related issues on Sepolia, it's advisable to break down complex Foundry scripts that perform multiple state-changing operations into smaller, more granular script calls.

1.  **Refactor Solidity Script (`Deployer.s.sol`):**
    Instead of having a single function in your `SetPermissions` script contract that performs multiple permissioning calls, split it into distinct public functions. For example:

    ```solidity
    // In script/Deployer.s.sol
    // SPDX-License-Identifier: UNLICENSED
    pragma solidity ^0.8.13;

    import "forge-std/Script.sol";
    import {IRelayToken} from "../src/token/RelayToken.sol"; // Adjust path as needed
    // ... other necessary imports ...

    contract SetPermissions is Script {
        // ... (Helper functions to get network details, private key, etc.) ...

        function grantRole(address token, address pool) public {
            // ... (Get network details for Sepolia) ...
            uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY"); // Or use keystore logic
            vm.startBroadcast(deployerPrivateKey);

            IRelayToken(token).grantMintAndBurnRole(address(pool));

            vm.stopBroadcast();
        }

        function setAdminAndPool(address token, address pool) public { // Renamed for clarity
            // ... (Get network details for Sepolia) ...
            uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY"); // Or use keystore logic
            vm.startBroadcast(deployerPrivateKey);

            // Example: Replace with your actual CCIP admin and pool setting logic
            // IRegistryModuleOwnerCustom(REGISTRY_MODULE_OWNER_CUSTOM_ADDRESS).registerAdminViaOwner(TOKEN_ADMIN_REGISTRY_ADDRESS);
            // ITokenAdminRegistry(TOKEN_ADMIN_REGISTRY_ADDRESS).acceptAdminRole();
            // ITokenAdminRegistry(TOKEN_ADMIN_REGISTRY_ADDRESS).setPool(token, pool);

            vm.stopBroadcast();
        }
    }
    ```

2.  **Modify Bash Script (`bridgeToZksync.sh`):**
    Update the Bash script to call these new, specific functions individually using the `--sig` flag in `forge script`. This ensures each logical permissioning step is a separate on-chain transaction, reducing the chance of nonce conflicts.

    ```bash
    # Example modification for Sepolia permission setting in bridgeToZksync.sh
    # (Assuming SEPOLIA_REBASE_TOKEN_ADDRESS and SEPOLIA_POOL_ADDRESS are set)

    echo "Granting MintAndBurn role on Sepolia RebaseToken to Pool..."
    forge script ./script/Deployer.s.sol:SetPermissions \
        --rpc-url $SEPOLIA_RPC_URL \
        --account updraft \
        --broadcast \
        --sig "grantRole(address,address)" \
        $SEPOLIA_REBASE_TOKEN_ADDRESS $SEPOLIA_POOL_ADDRESS

    echo "Setting Admin and Pool on Sepolia TokenAdminRegistry..."
    forge script ./script/Deployer.s.sol:SetPermissions \
        --rpc-url $SEPOLIA_RPC_URL \
        --account updraft \
        --broadcast \
        --sig "setAdminAndPool(address,address)" \
        $SEPOLIA_REBASE_TOKEN_ADDRESS $SEPOLIA_POOL_ADDRESS
    ```
    This approach provides more control and makes troubleshooting easier if one specific step fails.

## Verifying Your Deployment: Monitoring Contracts and Cross-Chain Transactions

After the `bridgeToZksync.sh` script completes, it's important to verify the deployment and monitor the cross-chain transaction.

**MetaMask Token Import:**
1.  Open MetaMask and ensure you are connected to the Ethereum Sepolia network.
2.  Find the deployed `RebaseToken` contract address on Sepolia (this should be output by your deployment script or can be found in the transaction history).
3.  In MetaMask, click "Import tokens," paste the contract address. The token symbol (e.g., RBT) and decimals (typically 18) should auto-populate.
4.  After the `deposit()` function call to the Vault, you should see a small balance of your RebaseToken in your wallet on Sepolia.

**CCIP Explorer for Cross-Chain Monitoring:**
The `BridgeTokensScript` initiates a CCIP message. You can track its progress using the CCIP Explorer:

1.  **Resource:** Navigate to `ccip.chain.link`.
2.  **Find Transaction Hash:** When the `BridgeTokensScript` executes on Sepolia, `forge script` will output the transaction hash for the CCIP `sendMessage` call (or similar CCIP interaction). Copy this source transaction hash.
3.  **Search in Explorer:** Paste the source transaction hash into the search bar on the CCIP Explorer.
4.  **Monitor Status:** The explorer will display the details of your CCIP message, showing the source chain (Ethereum Sepolia) and destination chain (ZKsync Sepolia).
    *   Initially, the status will likely be "Waiting for finality" on the source chain.
    *   **Finality Time:** Be patient. The entire cross-chain transfer process, including source chain finality, message relay, and execution on the destination chain, can take approximately 20 minutes or more, depending on network conditions.

By following these steps, you can successfully deploy your smart contracts to testnets, manage environment-specific challenges, and verify the functionality of your cross-chain application. This hands-on experience is crucial for preparing your application for a mainnet launch.