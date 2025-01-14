## The CCT Standard

The CCT standard, or cross-chain token standard, enables developers to seamlessly and easily integrate their tokens with CCIP in a permissionless manner. Allowing them to keep complete custody and control of their tokens and their token pools.

We will explore the reasons the CCT standard was developed and how we can use it.

### Reasons for the CCT Standard

1. **Liquidity Fragmentation**

    - Assets are siloed to certain blockchains
    - Difficult for users and liquidity providers to access liquidity across different ecosystems

2. **Token Developer Autonomy**

    - Developers are not required to use a third party to integrate their token cross-chain
    - Developers can integrate their token with CCIP themselves

### Architectural Overview

- Token contract
- Token pool contract

    - The token contract has all of the ERC20 functionality logic inside.
    - The token pool contract contains the logic for sending cross-chain.

    - We will use either a lock and unlock or a mint and burn mechanism to transfer tokens cross-chain.

### Token Admin Registry

- Allows developers to self-register their token
- Associates the token with its token pool

###  How to Create and Register a Cross-Chain Token

We will create a burn and mint token and register it for CCIP using the provided starter repo. This repo is adapted from the Chainlink smart contract examples repo.

1. **Clone the Repo**

    ```bash
    git clone https://github.com/Cyfrin/ccjp-cct-starter.git
    ```

2. **Install Dependencies**

    ```bash
    forge install
    ```

3. **Set up Environment Variables**

    - Rename the .env.example file to .env
    -  Add a Sepolia RPC URL and an Arbitrum Sepolia RPC URL
    -  Optionally, add an Etherscan API key and an Arbiscan API key to verify contracts.

    ```bash
    source .env
    ```

4. **Deploy the Token Contracts**

    - Deploy the token contract on Sepolia

    ```bash
    forge script/DeployToken.s.sol --rpc-url $SEPOLIA_RPC_URL --account <your-keystore-name> --broadcast --sender <your-address>
    ```

    - Deploy the token contract on Arbitrum Sepolia

    ```bash
    forge script/DeployToken.s.sol --rpc-url $ARBITRUM_SEPOLIA_RPC_URL --account <your-keystore-name> --broadcast --sender <your-address>
    ```

5. **Deploy the Token Pools**

    - Deploy the burn and mint token pool on Sepolia

    ```bash
    forge script/DeployBurnMintTokenPools.s.sol --rpc-url $SEPOLIA_RPC_URL --account <your-keystore-name> --broadcast --sender <your-address>
    ```

    - Deploy the burn and mint token pool on Arbitrum Sepolia

    ```bash
    forge script/DeployBurnMintTokenPools.s.sol --rpc-url $ARBITRUM_SEPOLIA_RPC_URL --account <your-keystore-name> --broadcast --sender <your-address>
    ```

6. **Claim the CCIP Admin Role**

    - Claim the admin role for the token pool on Sepolia

    ```bash
    forge script/ClaimAdmin.s.sol --rpc-url $SEPOLIA_RPC_URL --account <your-keystore-name> --broadcast --sender <your-address>
    ```

    - Claim the admin role for the token pool on Arbitrum Sepolia

    ```bash
    forge script/ClaimAdmin.s.sol --rpc-url $ARBITRUM_SEPOLIA_RPC_URL --account <your-keystore-name> --broadcast --sender <your-address>
    ```

7. **Accept the CCIP Admin Role**

    - Accept the admin role for the token pool on Sepolia

    ```bash
    forge script/AcceptAdminRole.s.sol --rpc-url $SEPOLIA_RPC_URL --account <your-keystore-name> --broadcast --sender <your-address>
    ```

    - Accept the admin role for the token pool on Arbitrum Sepolia

    ```bash
    forge script/AcceptAdminRole.s.sol --rpc-url $ARBITRUM_SEPOLIA_RPC_URL --account <your-keystore-name> --broadcast --sender <your-address>
    ```

8. **Set the Pools Associated with the Tokens**

    - Link the token pool to the token on Sepolia

    ```bash
    forge script/SetPools.s.sol --rpc-url $SEPOLIA_RPC_URL --account <your-keystore-name> --broadcast --sender <your-address>
    ```

    - Link the token pool to the token on Arbitrum Sepolia

    ```bash
    forge script/SetPools.s.sol --rpc-url $ARBITRUM_SEPOLIA_RPC_URL --account <your-keystore-name> --broadcast --sender <your-address>
    ```

9. **Add the Remote Chain to the Token Pool**

    - Add the Arbitrum Sepolia chain to the Sepolia token pool.

    ```bash
    forge script/ApplyChainUpdates.s.sol --rpc-url $SEPOLIA_RPC_URL --account <your-keystore-name> --broadcast --sender <your-address>
    ```

    - Add the Sepolia chain to the Arbitrum Sepolia token pool.

    ```bash
    forge script/ApplyChainUpdates.s.sol --rpc-url $ARBITRUM_SEPOLIA_RPC_URL --account <your-keystore-name> --broadcast --sender <your-address>
    ```

10. **Mint Tokens**

    - Mint tokens for the Sepolia pool

    ```bash
    forge script/MintTokens.s.sol --rpc-url $SEPOLIA_RPC_URL --account <your-keystore-name> --broadcast --sender <your-address>
    ```

11. **Transfer Tokens Cross-Chain**

    - Send tokens from Sepolia to Arbitrum Sepolia

    ```bash
    forge script/TransferTokens.s.sol --rpc-url $SEPOLIA_RPC_URL --account <your-keystore-name> --broadcast <your-address>
    ```

12. **Check the Cross-Chain Transfer on CCIP Explorer**

    - Copy the transaction hash from the terminal output and paste it into the CCIP Explorer.

    - We will see the transaction details, including the origin, destination, and amount of tokens transferred.