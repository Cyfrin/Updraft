## Deploying Your Cross-Chain Application to Testnets

This lesson guides you through deploying the smart contracts for our cross-chain rebase token application onto the Ethereum Sepolia and zkSync Sepolia testnets. We'll cover obtaining necessary testnet tokens, navigating deployment limitations on zkSync with Foundry, and executing a deployment script that orchestrates the entire process, culminating in initiating a cross-chain transfer using Chainlink CCIP.

## Prerequisites: Securing Testnet Funds

Before deploying, ensure your wallet possesses the necessary testnet assets on both networks:

1.  **Native Tokens:** You'll need Sepolia ETH (for gas on Ethereum Sepolia) and zkSync Sepolia ETH (for gas on zkSync Sepolia). We assume you've acquired these from relevant faucets in previous steps.
2.  **LINK Tokens:** Chainlink CCIP operations require LINK tokens for fee payments on the source chain. You must acquire testnet LINK on *both* Ethereum Sepolia and zkSync Sepolia.

**Obtaining Testnet LINK via Chainlink Faucet:**

1.  Navigate to the official Chainlink Faucet: `faucets.chain.link`.
2.  Select the "Link" tab.
3.  Choose "Ethereum Sepolia" from the network options and click the checkmark to confirm.
4.  Choose "ZkSync Sepolia" and click its checkmark.
5.  Click "Continue".
6.  Verify that the displayed wallet address is correct for receiving tokens on both networks.
7.  Click "Get tokens".
8.  A wallet signature request (e.g., from MetaMask) will appear to verify address ownership. Confirm the signature.
9.  The faucet interface will confirm that LINK tokens are being sent to your address on both selected testnets (e.g., 250 LINK for Sepolia, 25 LINK for zkSync Sepolia).

## Understanding Foundry and zkSync Deployment Limitations

While fork testing provides a good degree of confidence, deploying directly to zkSync testnets using standard Foundry *scripts* presents challenges at the time of writing.

Foundry scripts often rely heavily on cheatcodes like `vm.startBroadcast()` and `vm.stopBroadcast()` to manage deployments. However, zkSync's support for these Foundry cheatcodes is currently limited or unreliable, particularly for `vm.broadcast`. This mirrors the difficulties encountered when attempting direct fork testing of zkSync within Foundry.

**The Workaround: A Hybrid Bash Script Approach**

To overcome these limitations, we will not rely solely on Foundry scripts for the entire deployment. Instead, we'll use a Bash script (`bridgeToZkSync.sh`) that combines:

*   `forge create`: For deploying individual contracts, especially on zkSync.
*   `cast send`: For sending specific transactions (like configuration calls) to contracts.
*   `forge script`: For deploying and configuring contracts on Sepolia, where cheatcodes are well-supported.
*   Standard Bash commands (`source`, `echo`, `awk`): For environment setup, flow control, and output processing.

## Setting Up Your Deployment Environment

The Bash script requires specific environment variables and secure private key management.

**1. Configure RPC URLs:**

Create a `.env` file in the root directory of your project. This file will store your testnet RPC endpoint URLs. Add the following variables, replacing the placeholder with your actual Sepolia RPC URL (e.g., from Alchemy or Infura):

```bash
# .env
ZKSYNC_SEPOLIA_RPC_URL="https://sepolia.era.zksync.dev"
SEPOLIA_RPC_URL="YOUR_SEPOLIA_RPC_URL_HERE"
```

*Note:* At the time of recording the source video, the Alchemy zkSync Sepolia RPC endpoint exhibited issues, hence the use of the official `zksync.dev` URL.

**2. Secure Private Key Management with Foundry Keystore:**

**Crucial Security Note:** Never hardcode raw private keys directly into your `.env` file or scripts. Use a secure method like Foundry's Keystore.

*   **Import Your Private Key:** Use the `cast wallet import` command to securely store your deployment private key, encrypted with a password. Replace `<account_name>` with a memorable alias (e.g., `updraft`).
    ```bash
    cast wallet import --interactive updraft
    ```
    This command will prompt you to paste your private key and set a password for encryption.
*   **Using the Keystore Account:** Within the Bash script, commands that require signing transactions will use the `--account <account_name>` flag (e.g., `--account updraft`). When the script executes these commands, Foundry will prompt you for the password you set during the import process.

**3. Prepare the Bash Script for Execution:**

Make the deployment script executable:

```bash
chmod +x ./bridgeToZkSync.sh
```

## The Deployment Script: `bridgeToZkSync.sh` Explained

Let's break down the key sections of the `bridgeToZkSync.sh` script:

```bash
#!/bin/bash

# Load environment variables (RPC URLs)
source .env

# Ensure zkSync-compatible Foundry is installed/updated
echo "Updating Foundry toolchain for zkSync..."
foundryup --tag nightly-2024-02-13-zksync # Or use foundryup -zksync if compatible with your setup

# Build contracts specifically for zkSync
echo "Building contracts for zkSync..."
forge build --zkSync

# Define constants (adjust as needed)
AMOUNT=100000 # Wei to deposit into Vault
CAST_WALLET_ADDRESS=$(cast wallet address --account updraft) # Get address from keystore

# --- zkSync Deployment & Configuration ---
echo "Deploying RebaseToken on zkSync Sepolia..."
ZKSYNC_REBASE_TOKEN_ADDRESS=$(forge create src/RebaseToken.sol:RebaseToken \
    --rpc-url $ZKSYNC_SEPOLIA_RPC_URL \
    --account updraft \
    --legacy \
    --zkSync \
    | awk '/Deployed to:/ { print $3 }')
echo "zkSync RebaseToken deployed at: $ZKSYNC_REBASE_TOKEN_ADDRESS"

echo "Deploying RebaseTokenPool on zkSync Sepolia..."
ZKSYNC_POOL_ADDRESS=$(forge create src/RebaseTokenPool.sol:RebaseTokenPool \
    --rpc-url $ZKSYNC_SEPOLIA_RPC_URL \
    --account updraft \
    --legacy \
    --zkSync \
    --constructor-args $ZKSYNC_REBASE_TOKEN_ADDRESS \
    | awk '/Deployed to:/ { print $3 }')
echo "zkSync RebaseTokenPool deployed at: $ZKSYNC_POOL_ADDRESS"

echo "Configuring roles and settings on zkSync contracts..."
# Grant mint/burn role on Token to Pool
cast send $ZKSYNC_REBASE_TOKEN_ADDRESS \
    --rpc-url $ZKSYNC_SEPOLIA_RPC_URL \
    --account updraft \
    "grantMintAndBurnRole(address)" $ZKSYNC_POOL_ADDRESS

# CCIP Admin configuration (assuming TokenAdminRegistry deployed separately or using mocks)
# ZKSYNC_TOKEN_ADMIN_REGISTRY_ADDRESS="YOUR_ZKSYNC_REGISTRY_ADDRESS"
# cast send $ZKSYNC_TOKEN_ADMIN_REGISTRY_ADDRESS --rpc-url $ZKSYNC_SEPOLIA_RPC_URL --account updraft "registerAdminViaOwner(address)" $ZKSYNC_REBASE_TOKEN_ADDRESS
# cast send $ZKSYNC_REBASE_TOKEN_ADDRESS --rpc-url $ZKSYNC_SEPOLIA_RPC_URL --account updraft "acceptAdminRole()"
# cast send $ZKSYNC_REBASE_TOKEN_ADDRESS --rpc-url $ZKSYNC_SEPOLIA_RPC_URL --account updraft "setPool(address)" $ZKSYNC_POOL_ADDRESS
# Note: Simplified CCIP admin steps here; adapt based on your actual TokenAdminRegistry setup.

# --- Sepolia Deployment & Configuration ---
echo "Deploying RebaseToken and RebaseTokenPool on Sepolia via Foundry Script..."
# Use separate script for deployment due to potential nonce issues if combined with permissions
output=$(forge script ./script/Deployer.s.sol:TokenAndPoolDeployer \
    --rpc-url $SEPOLIA_RPC_URL \
    --account updraft \
    --broadcast)
SEPOLIA_REBASE_TOKEN_ADDRESS=$(echo "$output" | grep 'token: contract RebaseToken' | awk '{print $4}')
SEPOLIA_POOL_ADDRESS=$(echo "$output" | grep 'pool: contract RebaseTokenPool' | awk '{print $4}')
echo "Sepolia RebaseToken deployed at: $SEPOLIA_REBASE_TOKEN_ADDRESS"
echo "Sepolia RebaseTokenPool deployed at: $SEPOLIA_POOL_ADDRESS"

echo "Setting permissions on Sepolia contracts via Foundry Script..."
# Use a separate script for setting permissions
forge script ./script/Deployer.s.sol:SetPermissions \
    --rpc-url $SEPOLIA_RPC_URL \
    --account updraft \
    --broadcast \
    --sig "run(address,address)" $SEPOLIA_REBASE_TOKEN_ADDRESS $SEPOLIA_POOL_ADDRESS

echo "Deploying Vault on Sepolia via Foundry Script..."
VAULT_ADDRESS=$(forge script ./script/Deployer.s.sol:VaultDeployer \
    --rpc-url $SEPOLIA_RPC_URL \
    --account updraft \
    --broadcast \
    --sig "run(address)" $SEPOLIA_REBASE_TOKEN_ADDRESS \
    | grep 'vault: contract Vault' | awk '{print $4}')
echo "Sepolia Vault deployed at: $VAULT_ADDRESS"

echo "Configuring Sepolia Pool via Foundry Script..."
forge script ./script/ConfigurePool.s.sol:ConfigurePoolScript \
    --rpc-url $SEPOLIA_RPC_URL \
    --account updraft \
    --broadcast \
    --sig "run(address,address)" $SEPOLIA_POOL_ADDRESS $ZKSYNC_POOL_ADDRESS

# --- Funding & Bridging ---
echo "Depositing ETH into Sepolia Vault to mint Rebase Tokens..."
cast send $VAULT_ADDRESS \
    --value ${AMOUNT} \
    --rpc-url $SEPOLIA_RPC_URL \
    --account updraft \
    "deposit()"

echo "Configuring zkSync Pool with Sepolia chain details..."
# Adapt arguments based on your actual `applyChainUpdates` function signature
# Example placeholder:
# cast send $ZKSYNC_POOL_ADDRESS \
#     --rpc-url $ZKSYNC_SEPOLIA_RPC_URL \
#     --account updraft \
#     "applyChainUpdates(uint64[],address[],address[])" "[SEPOLIA_CHAIN_SELECTOR]" "[$SEPOLIA_POOL_ADDRESS]" "[$SEPOLIA_REBASE_TOKEN_ADDRESS]"
# Replace SEPOLIA_CHAIN_SELECTOR with the actual CCIP selector for Sepolia

echo "Checking Sepolia RBT balance before bridging..."
SEPOLIA_BALANCE_BEFORE=$(cast balance $CAST_WALLET_ADDRESS --erc20 $SEPOLIA_REBASE_TOKEN_ADDRESS --rpc-url $SEPOLIA_RPC_URL)
echo "Balance before: $SEPOLIA_BALANCE_BEFORE"

echo "Bridging Rebase Tokens from Sepolia to zkSync Sepolia via Foundry Script..."
# Adapt arguments (chain selectors, addresses, amounts) as needed for BridgeTokensScript
# Example placeholder:
# ZKSYNC_CHAIN_SELECTOR="YOUR_ZKSYNC_CHAIN_SELECTOR"
# SEPOLIA_CCIP_ROUTER="SEPOLIA_ROUTER_ADDRESS"
# SEPOLIA_LINK_TOKEN="SEPOLIA_LINK_ADDRESS"
# BRIDGE_AMOUNT=$(($SEPOLIA_BALANCE_BEFORE / 2)) # Example: bridge half the balance

# forge script ./script/BridgeTokens.s.sol:BridgeTokensScript \
#     --rpc-url $SEPOLIA_RPC_URL \
#     --account updraft \
#     --broadcast \
#     --sig "run(address,uint64,address,uint256,address,address)" \
#     $SEPOLIA_REBASE_TOKEN_ADDRESS \
#     $ZKSYNC_CHAIN_SELECTOR \
#     $CAST_WALLET_ADDRESS \
#     $BRIDGE_AMOUNT \
#     $SEPOLIA_LINK_TOKEN \
#     $SEPOLIA_CCIP_ROUTER
# Note: Fill in actual values for selectors, router, LINK token, and desired amount.

echo "Checking Sepolia RBT balance after bridging attempt..."
SEPOLIA_BALANCE_AFTER=$(cast balance $CAST_WALLET_ADDRESS --erc20 $SEPOLIA_REBASE_TOKEN_ADDRESS --rpc-url $SEPOLIA_RPC_URL)
echo "Balance after: $SEPOLIA_BALANCE_AFTER"

echo "Deployment and bridging process initiated."
echo "Monitor the bridging transaction using the CCIP Explorer: https://ccip.chain.link/"

```

**Key Script Sections Explained:**

*   **Initialization:** Sets up the environment by loading RPC URLs, ensuring the zkSync-compatible Foundry toolchain (`foundryup --tag ...` or `foundryup -zksync`) is active, and compiling contracts specifically for zkSync (`forge build --zkSync`).
*   **zkSync Deployment (`forge create`):** Deploys `RebaseToken` and `RebaseTokenPool` using `forge create`.
    *   `--rpc-url`: Specifies the target network.
    *   `--account updraft`: Uses the configured keystore account (will prompt for password).
    *   `--legacy`: A necessary flag for zkSync deployments with current Foundry versions.
    *   `--zkSync`: Signals deployment to zkSync.
    *   `| awk ...`: Extracts the deployed contract address from the command's output.
*   **zkSync Configuration (`cast send`):** Uses `cast send` to call specific functions (`grantMintAndBurnRole`, CCIP admin functions, `setPool`) on the deployed zkSync contracts, configuring necessary permissions and settings.
*   **Sepolia Deployment (`forge script`):** Executes Foundry scripts (`Deployer.s.sol:TokenAndPoolDeployer`, `Deployer.s.sol:VaultDeployer`) on Sepolia. These scripts use standard Foundry cheatcodes (`vm.startBroadcast()`) for deployment. Output containing addresses is captured.
*   **Sepolia Configuration (`forge script`):** Executes separate Foundry scripts (`Deployer.s.sol:SetPermissions`, `ConfigurePool.s.sol:ConfigurePoolScript`) to set roles and link the Sepolia pool to the zkSync pool.
    *   **Split Scripts:** Note that deployment and permission setting on Sepolia are split into separate scripts (`TokenAndPoolDeployer` and `SetPermissions`). This is a workaround for potential nonce issues or network congestion that could cause errors if combined in a single broadcast transaction. The `SetPermissions` script requires token and pool addresses passed via the `--sig` argument.
*   **Funding & Bridging:**
    *   `cast send ... deposit()`: Sends native Sepolia ETH to the `Vault` contract's `deposit` function, triggering the minting of initial rebase tokens.
    *   `cast send ... applyChainUpdates()`: Configures the zkSync pool with details about the Sepolia chain (requires adaptation based on your specific function signature).
    *   `cast balance`: Checks the deployer's rebase token balance on Sepolia before and after bridging.
    *   `forge script ... BridgeTokensScript`: Executes the script responsible for initiating the CCIP cross-chain transfer from Sepolia to zkSync. This script requires several arguments passed via `--sig`, including destination chain selector, receiver address, token details, amount, fee token (LINK), and the CCIP Router address.

## Executing the Deployment Script

To run the entire deployment and bridging process:

1.  Ensure your `.env` file is correctly populated.
2.  Ensure you have imported your private key using `cast wallet import`.
3.  Ensure the script has execute permissions (`chmod +x ./bridgeToZkSync.sh`).
4.  Execute the script from your project's root directory:
    ```bash
    ./bridgeToZkSync.sh
    ```
5.  Foundry will prompt you for the password associated with your keystore account (`updraft` in this example) multiple times as it signs transactions for both Sepolia and zkSync Sepolia. Enter the password each time it's requested.

The script will output logs indicating its progress, including deployed contract addresses and transaction hashes.

## Monitoring Your Cross-Chain Transaction with CCIP Explorer

Once the `BridgeTokensScript` executes on Sepolia, a cross-chain message is sent via Chainlink CCIP. You can monitor its progress:

1.  **Find the Source Transaction Hash:** Locate the transaction hash output by the `BridgeTokensScript` execution in your terminal. This is the hash from the *Sepolia* network.
2.  **Go to CCIP Explorer:** Navigate to `ccip.chain.link`.
3.  **Search:** Paste the Sepolia transaction hash into the search bar.
4.  **Review Status:** The explorer will display details about your CCIP message:
    *   Message ID
    *   Source and Destination Transaction Hashes (Destination hash appears once the message is processed on zkSync)
    *   Current Status (e.g., "Waiting for finality", "Processing", "Success")
    *   Timestamps and Estimated Completion Time (Sepolia -> zkSync Sepolia typically takes around 20 minutes)
    *   Source and Destination Chain information
    *   Sender/Receiver Addresses
    *   Transferred Token and Amount
    *   Fee paid (in LINK)

You can also import the deployed Sepolia Rebase Token address into your MetaMask wallet to observe the balance decrease after initiating the bridge. The corresponding balance increase on zkSync Sepolia will occur once the CCIP message is successfully processed.

## Conclusion

You have successfully deployed your cross-chain rebase token application to both Ethereum Sepolia and zkSync Sepolia testnets using a hybrid approach that accommodates current Foundry tooling limitations on zkSync. By combining `forge create`, `cast send`, and `forge script` within a Bash script, you orchestrated contract deployments, configuration, funding, and initiated a Chainlink CCIP token transfer, which you can monitor using the CCIP Explorer. This process provides a practical template for deploying complex applications across different blockchain environments.