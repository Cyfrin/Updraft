# Deploying to Testnet

Before running our script, we need testnet Sepolia and zkSync. For this video, we will assume you already have some, as this has already been covered in Blockchain Basics.

Instead we will obtain Chainlink tokens on Sepolia and zkSync using the Chainlink faucet.
1. Search for `chainlink faucet` in your search engine
2. Navigate to the `Link` tab on the right
3. Select `Ethereum Sepolia`
4. Then select `ZkSync Sepolia`
5. Click `continue` and confirm the request
6. Then click `get tokens`.

Now that we have our testnet tokens, we will begin deploying on testnet.

Fork tests are a good way to be certain your code will work, but as of this recording, scripts do not work well on ZkSync, nor can you perform fork tests on ZkSync. The root of this issue is that cheat codes do not work well on ZkSync, and they are limited. `Vm.broadcast` is one of these cheat codes that does not work well.

In order to work around this, the instructor has created `bridgeToZkSync.sh`.

You will need to modify this to include a variable called `ZKSYNC_SEPOLIA_RPC_URL` and `SEPOLIA_RPC_URL`.
```bash
#!/bin/bash
# Define constants
AMOUNT=100000

DEFAULT_ZKSYNC_LOCAL_KEY="0x7726827caac94da7f9e1b160f7ea8191f72f7b6f9d2a97f992c38edeab02d4118"
DEFAULT_ZKSYNC_ADDRESS="0x36615c1f349af7f634489181e7ca7c72883f5dc049"

ZKSYNC_REGISTRY_MODULE_OWNER_CUSTOM="0x3139687ee9938422f57933c3cd83e21ee43c400f"
ZKSYNC_TOKEN_ADMIN_REGISTRY="0xc777f712258014866c677bd67900d07405b7df"
ZKSYNC_ROUTER="0xa1f8a8aa9a8c4945c45a03b64701f0707a0016"
ZKSYNC_RMM_PROXY_ADDRESS="0x3DA20f0308A8f8c1f1A5fDB3648147143608C467"
ZKSYNC_SEPOLIA_CHAIN_SELECTOR="6898391089055279247"
ZKSYNC_LINK_ADDRESS="0x23A1afD896c8c876af46a0c38521f443265d1e"

SEPOLIA_REGISTRY_MODULE_OWNER_CUSTOM="0x62e731218d047305aba28e3751e7ee9e5520790"
SEPOLIA_TOKEN_ADMIN_REGISTRY="0x95f29fee11c5c55d26ccff11d067720de953837882"
SEPOLIA_ROUTER="0x8f3de0ec502ea8a2834028eeB17ABfCeBaF363a59"
SEPOLIA_RMM_PROXY_ADDRESS="0xba3f6251de62d6E61F98590c82fD7fd6B71FB8991"
SEPOLIA_CHAIN_SELECTOR="16015286601757825753"
SEPOLIA_LINK_ADDRESS="0x779877a78009e60831690ddb0783e478b4624789"


# compile and deploy the Rebase Token contract
source .env
forge build --zkSync
echo "Compiling and deploying the Rebase Token contract on ZkSync..."
ZKSYNC_REBASE_TOKEN_ADDRESS=$(forge create src/RebaseToken.sol:RebaseToken --rpc-url ${ZKSYNC_SEPOLIA_RPC_URL} --account updraft --legacy --zkSync | awk '/Deployed to:/{print $3}')
echo "ZkSync rebase token address: $ZKSYNC_REBASE_TOKEN_ADDRESS"

# Compile and deploy the pool contract
echo "Compiling and deploying the pool contract on ZkSync..."
ZKSYNC_POOL_ADDRESS=$(forge create src/RebaseTokenPool.sol:RebaseTokenPool --rpc-url ${ZKSYNC_SEPOLIA_RPC_URL} --account updraft --legacy --zkSync | awk '/Pool address:/{print $3}')
echo "Pool address: $ZKSYNC_POOL_ADDRESS"
# Set the permissions for the pool contract
echo "Setting the permissions for the pool contract on ZkSync..."
cast send $ZKSYNC_REBASE_TOKEN_ADDRESS --rpc-url ${ZKSYNC_SEPOLIA_RPC_URL} --account updraft "grantMintAndBurnRole(address)" $ZKSYNC_POOL_ADDRESS
echo "Pool permissions set"
# Set the CCIP roles and permissions
echo "Setting the CCIP roles and permissions on ZkSync..."
cast send $ZKSYNC_REGISTRY_MODULE_OWNER_CUSTOM "registerAdminViaOwner(address)" $ZKSYNC_TOKEN_ADMIN_REGISTRY
cast send $ZKSYNC_TOKEN_ADMIN_REGISTRY "acceptAdminRole(address)" $ZKSYNC_REBASE_TOKEN_ADDRESS
cast send $ZKSYNC_TOKEN_ADMIN_REGISTRY "setPool(address, address)" $ZKSYNC_POOL_ADDRESS
echo "CCIP roles and permissions set"

# 2. On Sepolia!
echo "Running the script to deploy the contracts on Sepolia..."
output=$(forge script ./script/Deployer.s.sol:TokenAndPoolDeployer --rpc-url ${SEPOLIA_RPC_URL} --account updraft --broadcast)
echo "Contracts deployed and permission set on Sepolia"

# Extract the addresses from the output
SEPOLIA_REBASE_TOKEN_ADDRESS=$(echo "$output" | grep "token: contract RebaseToken" | awk '{print $4}')
SEPOLIA_POOL_ADDRESS=$(echo "$output" | grep "pool: contract RebaseTokenPool" | awk '{print $4}')

echo "Sepolia rebase token address: $SEPOLIA_REBASE_TOKEN_ADDRESS"
echo "Sepolia pool address: $SEPOLIA_POOL_ADDRESS"
```
and
```
SEPOLIA_RPC_URL=""
ZKSYNC_SEPOLIA_RPC_URL=""
```

Copy that file into the root of your project as `bridgeToZkSync.sh` where `.sh` is the file extension for a bash script.

Next we will create a `.env` file. **Important:** DO NOT paste private keys into this file, instead we will use an imported wallet. In our `.env` file add the following variables:
```
ZKSYNC_SEPOLIA_RPC_URL=""
SEPOLIA_RPC_URL=""
```
Then input these values. You will find that the Alchemy RPC URL for Sepolia will not work, so use the RPC endpoint they provide for the ZkSync network as well, it is `https://sepolia.era.zksync.dev`.

Now that you have an `.env` file and modified your `bridgeToZkSync.sh` file, we need to walk through what the `bridgeToZkSync.sh` script does.

The script is a compilation of bash commands that performs the following:
1. Runs `source .env`, which loads environment variables
2. Runs `forge build --zkSync` to compile files
3. Deploys the Rebase token on ZkSync
4. Deploys the Pool contract on ZkSync
5. Sets permissions on ZkSync
6. Sets CCIP admin roles and permissions on ZkSync
7. Runs a deployment script for Sepolia
8. Extracts the addresses of the deployed token and pool contract
9. Deploys a Vault contract to Sepolia
10. Configures the pool on Sepolia
11. Deposits funds to the Vault
12. Configures the pool on ZkSync
13.  Bridges funds from Sepolia to ZkSync
14. Displays the final balance of Sepolia

It also uses the legacy flag `--legacy` and `--zkSync` flags, and it uses a keystore to interact with our contracts.
