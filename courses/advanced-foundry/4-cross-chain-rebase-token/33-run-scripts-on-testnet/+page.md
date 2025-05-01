## Deploying Your Cross-Chain Rebase Token to Testnets

This lesson guides you through deploying the cross-chain rebase token project onto the Sepolia (Ethereum L1) and ZkSync Sepolia (L2) test networks. We'll cover acquiring necessary testnet tokens, configuring your environment, executing the deployment using a combination of Foundry and bash scripting, and navigating specific challenges related to ZkSync deployment tooling.

## Preparing for Testnet Deployment

Before initiating the deployment, ensure you have the necessary prerequisites and configurations in place. This lesson assumes you are already familiar with obtaining basic testnet ETH for both Sepolia and ZkSync Sepolia from previous steps.

**Required Testnet Tokens:**

Beyond testnet ETH, this deployment requires Chainlink (LINK) tokens on both networks to facilitate cross-chain communication via the Chainlink Cross-Chain Interoperability Protocol (CCIP).

1.  **Navigate to the Chainlink Faucet:** Visit `faucets.chain.link`.
2.  **Select LINK Tokens:** Ensure you are on the "Link" tab (not "Native" or "All").
3.  **Request Sepolia LINK:** Choose "Ethereum Sepolia" from the network dropdown, connect your wallet, sign the confirmation message, and request LINK tokens (e.g., 250 LINK).
4.  **Request ZkSync Sepolia LINK:** Switch the network to "ZkSync Sepolia", connect your wallet (if needed), sign, and request LINK tokens (e.g., 25 LINK).

**Environment Variable Setup:**

Your project requires a `.env` file in the root directory to store sensitive information like RPC URLs. Create or update this file with the following variables:

```bash
# .env
ZKSYNC_SEPOLIA_RPC_URL="https://sepolia.era.zksync.dev"
SEPOLIA_RPC_URL="<your_sepolia_rpc_url>" # e.g., Your Alchemy or Infura Sepolia RPC URL
```

*Note:* It's recommended to use the official ZkSync RPC URL (`https://sepolia.era.zksync.dev`) as specified above, as third-party providers might occasionally have compatibility issues with certain deployment tools for ZkSync.

**Foundry Keystore Account:**

For enhanced security, avoid embedding private keys directly in scripts or environment variables. Instead, we utilize Foundry's keystore feature. If you haven't already, create a named keystore account (e.g., `updraft`):

1.  Run the following command in your terminal:
    ```bash
    cast wallet import --interactive updraft
    ```
2.  Follow the prompts to paste your private key and set a secure password. This password will be required whenever you perform actions using this account via Foundry commands.

## Navigating ZkSync Deployment Challenges with Foundry

A key challenge when deploying to ZkSync using Foundry involves the limitations of standard Foundry scripts (`.s.sol` files).

*   **The Problem:** Foundry scripts typically rely on cheat codes like `vm.startBroadcast()` and `vm.stopBroadcast()` to sign and send transactions. However, the `foundry-zksync` toolchain, at the time of writing, does not fully support the `vm.broadcast` cheat code for ZkSync networks. This also impacts the ability to perform fork testing directly against ZkSync within Foundry.
*   **The Workaround:** To overcome this limitation, we will employ a hybrid approach. We'll use standard Foundry scripts for deployment and configuration on the Sepolia network (where `vm.broadcast` works as expected). For ZkSync, we will use a Bash script (`.sh` file) that directly invokes lower-level Foundry commands like `forge create` (for deployment) and `cast send` (for contract interactions and configuration).

## Executing Deployment with a Bash Script

We'll use a Bash script named `bridgeToZkSync.sh` to orchestrate the entire deployment process across both Sepolia and ZkSync Sepolia. This script automates the steps, ensuring correct sequencing. Here's a breakdown of its key operations:

**Initialization and ZkSync Compilation:**

The script begins by setting up the environment and compiling contracts specifically for ZkSync:

```bash
#!/bin/bash
source .env # Load RPC URLs
foundryup -zksync # Ensure ZkSync tooling is installed/active
forge build --zksync # Compile contracts for ZkSync
```

**ZkSync Deployments (`forge create`):**

The script uses `forge create` to deploy contracts directly to ZkSync Sepolia. Notice the specific flags used:

```bash
# Deploy RebaseToken on ZkSync Sepolia
ZKSYNC_REBASE_TOKEN_ADDRESS=$(forge create src/RebaseToken.sol:RebaseToken \
    --rpc-url $ZKSYNC_SEPOLIA_RPC_URL \
    --account updraft \
    --legacy \
    --zksync \
    | awk '/Deployed to:/ { print $3 }')
echo "ZkSync rebase token address: $ZKSYNC_REBASE_TOKEN_ADDRESS"

# Deploy RebaseTokenPool on ZkSync Sepolia (similar command with --constructor-args)
# ... (command to deploy pool) ...
echo "ZkSync pool address: $ZKSYNC_POOL_ADDRESS"
```

*   `--rpc-url`: Points to the ZkSync Sepolia testnet.
*   `--account updraft`: Uses the configured keystore account (will prompt for password).
*   `--legacy`: A required flag for ZkSync deployments with current tooling.
*   `--zksync`: Indicates the target network is ZkSync.
*   `awk ...`: A utility to parse the command output and extract the deployed contract address.

**ZkSync Configuration (`cast send`):**

Since `vm.broadcast` is unavailable in scripts for ZkSync, the script uses `cast send` to interact with the deployed contracts and configure permissions:

```bash
# Grant Mint/Burn Role from Token to Pool on ZkSync
cast send $ZKSYNC_REBASE_TOKEN_ADDRESS --rpc-url $ZKSYNC_SEPOLIA_RPC_URL --account updraft "grantMintAndBurnRole(address)" $ZKSYNC_POOL_ADDRESS

# Set CCIP Permissions via TokenAdminRegistry on ZkSync
# ... (multiple cast send calls to registerAdminViaOwner, acceptAdminRole, setPool) ...
```

**Sepolia Deployments & Configuration (`forge script`):**

For Sepolia, standard Foundry scripts are used:

```bash
# Deploy Token and Pool on Sepolia
output=$(forge script ./script/Deployer.s.sol:TokenAndPoolDeployer --rpc-url $SEPOLIA_RPC_URL --account updraft --broadcast)
# ... (parse output using grep/awk to get SEPOLIA_TOKEN_ADDRESS and SEPOLIA_POOL_ADDRESS) ...

# Set Permissions on Sepolia (using a separate script - see note below)
forge script ./script/SetPermissions.s.sol:SetPermissions --rpc-url $SEPOLIA_RPC_URL --account updraft --broadcast

# Deploy Vault on Sepolia
forge script ./script/VaultDeployer.s.sol:VaultDeployer --rpc-url $SEPOLIA_RPC_URL --account updraft --broadcast
# ... (parse output to get VAULT_ADDRESS) ...

# Configure Sepolia Pool
forge script ./script/ConfigurePoolScript.s.sol:ConfigurePoolScript --rpc-url $SEPOLIA_RPC_URL --account updraft --broadcast --sig "run(...)" <arguments...>
```

**Deposit and Bridge:**

The script handles depositing funds into the Sepolia vault and initiating the cross-chain bridge:

```bash
# Deposit ETH into Sepolia Vault
AMOUNT=0.001ether # Example amount
cast send $VAULT_ADDRESS --value $AMOUNT --rpc-url $SEPOLIA_RPC_URL --account updraft "deposit()"

# Configure ZkSync Pool with Sepolia details
cast send $ZKSYNC_POOL_ADDRESS --rpc-url $ZKSYNC_SEPOLIA_RPC_URL --account updraft "applyChainUpdates(...)" <arguments...>

# Initiate Bridge from Sepolia to ZkSync via CCIP
forge script ./script/BridgeTokens.s.sol:BridgeTokensScript --rpc-url $SEPOLIA_RPC_URL --account updraft --broadcast --sig "run(...)" <arguments...>
```

**Verification:**

The script concludes by checking token balances using `cast` calls to verify the deployment and bridging steps.

## Running the Deployment and Observing the Process

Follow these steps to execute the deployment:

1.  **Make Script Executable:** If you haven't already, give the bash script execution permissions:
    ```bash
    chmod +x ./bridgeToZkSync.sh
    ```
2.  **Run the Script:** Execute the script from your project's root directory:
    ```bash
    ./bridgeToZkSync.sh
    ```
3.  **Enter Keystore Password:** You will be prompted to enter the password for your Foundry keystore account (`updraft` in this example) multiple times throughout the execution, specifically whenever a transaction needs signing (`forge create`, `cast send`, `forge script --broadcast`).
4.  **Monitor Output:** Observe the terminal output. The script will print status messages, deployed contract addresses, and transaction hashes.

**Handling Potential Transaction Ordering Issues:**

Testnets like Sepolia can sometimes experience congestion or process transactions slightly out of order, especially when multiple transactions are submitted rapidly within a single `forge script --broadcast` call. This might lead to errors like `Error: failed to send transaction: server returned an error response: error code -32000: future transaction tries to replace pending`.

*   **Solution:** If you encounter such errors, consider splitting complex Foundry scripts. For instance, the initial deployment logic (`Deployer.s.sol`) might be separated from subsequent configuration or permission-setting logic (`SetPermissions.s.sol`). The controlling bash script (`bridgeToZkSync.sh`) would then execute these smaller scripts sequentially, ensuring one broadcast completes before the next begins. This increases the likelihood of transactions being processed in the intended order.

## Verifying Deployment and Tracking Cross-Chain Transactions

After the script successfully completes, you can verify the deployment and monitor the cross-chain bridging process.

**Import Token to MetaMask:**

1.  Copy the deployed `RebaseToken` address on Sepolia from the script's terminal output.
2.  Open MetaMask and ensure it's connected to the Sepolia network.
3.  Navigate to the "Tokens" tab and click "Import tokens".
4.  Select "Custom token", paste the contract address. MetaMask should auto-detect the symbol (e.g., RBT) and decimals (18).
5.  Import the token. You should see a small balance reflecting the initial deposit into the vault, potentially already slightly increased due to the rebasing mechanism.

**Track the CCIP Transaction:**

1.  Find the transaction hash output by the `forge script BridgeTokens.s.sol...` command in your terminal. This is the hash of the transaction that initiated the CCIP bridge on Sepolia.
2.  Go to the Chainlink CCIP Explorer: `ccip.chain.link`.
3.  Paste the transaction hash into the search bar.
4.  The explorer will display the message details, including:
    *   Source and Destination Chains (Ethereum Sepolia -> ZkSync Sepolia)
    *   Current Status (e.g., "Waiting for finality", "Delivered")
    *   Estimated Time (Bridging Sepolia <-> ZkSync Sepolia typically takes around 20 minutes due to finality requirements).
    *   Fees Paid (in LINK).

This explorer is crucial for monitoring the progress and debugging any potential issues with your cross-chain interactions.

## Key Takeaways for Testnet Deployment

Deploying to testnets is a critical step before mainnet launch. This process highlights several important concepts:

*   **Toolchain Nuances:** Be aware that tools like Foundry might have varying levels of support or require specific workarounds (like using `forge create`/`cast send` instead of `vm.broadcast`) for different L2 networks like ZkSync. Always consult the latest documentation.
*   **Bash Scripting for Orchestration:** Using bash scripts to combine `forge` and `cast` commands provides flexibility, especially when overcoming tool limitations or managing complex deployment sequences.
*   **Testnet Faucets:** Secure the necessary testnet tokens (ETH and protocol-specific tokens like LINK for CCIP fees) from official faucets.
*   **Secure Key Management:** Employ Foundry's keystore (`--account`) instead of exposing private keys directly.
*   **CCIP Essentials:** Understand that protocols like CCIP enable cross-chain operations but involve fees (LINK) and inherent latency due to block finality requirements. Use the CCIP Explorer for monitoring.
*   **Transaction Ordering on Testnets:** On busy or slower testnets, splitting complex deployment/configuration logic into smaller, sequentially executed scripts can mitigate nonce and transaction ordering issues.