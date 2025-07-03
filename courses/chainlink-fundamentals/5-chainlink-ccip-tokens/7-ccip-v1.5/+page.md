# CCIP v1.5: The Cross-Chain Token Standard

Chainlink's Cross-Chain Interoperability Protocol (CCIP) version 1.5 introduces the Cross-Chain Token (CCT) standard, enabling a streamlined and decentralized approach to **enabling tokens** for CCIP. This allows developers to independently deploy and manage their own cross-chain tokens using CCIP without requiring Chainlink to manually integrate each token. Projects can now create composable cross-chain tokens with full autonomy and ownership, significantly accelerating the development of multi-chain applications.

## CCT Standard Motivations

The CCT standard addresses two primary challenges in the blockchain ecosystem:

1. **Liquidity Fragmentation**: With numerous blockchains operating independently, liquidity becomes siloed, making it difficult for users and developers to access assets across different ecosystems. This fragmentation poses challenges for token developers in choosing the optimal blockchain for deployment without compromising liquidity or facing trust issues on newer chains.

2. **Developer Autonomy**: Previously, enabling tokens for cross-chain required manual processes and reliance on third parties, leading to inefficiencies. The CCT standard empowers token developers with a **self-service model**, allowing them to autonomously deploy, configure, and manage their token pools within CCIP.

## CCT Benefits 

- **Self-service**: The CCT standard enables token developers to launch a cross-chain token or enable an existing token for CCIP in a self-service manner within minutes. 
- **Developer control**: Token developers retain full control and ownership of their contracts, including the tokens, pools and implementation logic, including configurable rate limits, 
- **Defense-in-depth security**: The CCT standard leverages Chainlink's industry-standard Oracle networks. Additional layers of protection, such as the Risk Management Network and configurable transfer rate limits, further enhance security.
- **Programmable token transfers**: Cross-Chain Token (CCT) supports the simultaneous transfer of tokens and messages in a single transaction automatically on every transfer. This is enabled through custom token pools that can pass data directly.
- **Audited token pools**: Chainlink provides a fully audited `TokenPool` contracts, which simplifies cross-chain management. For mint/burn approaches, these contracts eliminate the need for traditional liquidity pools by burning tokens on the source chain and minting them on the destination chain. For lock/unlock approaches, the `TokenPool` contracts still require existing liquidity on the destination chain. The advantage is that these pre-built contracts handle the complex cross-chain operations securely, whether they're managing token locking, burning, minting, or unlocking operations.
- **Zero-slippage**: The exact amount of tokens sent to the CCIP OnRamp on the source chain is always the exact amount of tokens received on the CCIP OffRamp on the destination chain
- **Integrate existing ERC20s**: The CCT standard enables token developers to enable existing ERC-20 tokens for CCIP, avoiding the complexities associated with traditional bridging solutions.

## How the CCT Standard Works

The CCT standard facilitates cross-chain token transfers through the following components:

### Token Owner

The entity (contract or EOA) that owns the token contract. The token owner has the authority to manage the token contract, including upgrading the contract, changing the token administrator, or transferring ownership to another address.

### CCIP Admin

Like a token owner, the CCIP admin is the entity (contract or EOA) that can change the token administrator or transfer ownership to another address.

ERC-20 contracts are required to have _either_ a token owner or CCIP admin.

### Token Administrator

A role assigned to manage cross-chain operations of a token. The token administrator is responsible for mapping a token to a token pool in the `TokenAdminRegistry`. The token administrator can be the token owner, the CCIP amin (depending on the function implemented on the token contract), or another designated entity assigned by a token owner.

### Token Pools

Token pools are smart contracts that manage the minting, burning, locking, and releasing (depending on the implemented mechanism) of tokens across different blockchains. **They do not necessarily hold tokens** but ensure that the token supply remains consistent and prevent liquidity fragmentation. The CCT standard offers pre-audited token pool contracts, enabling zero-slippage cross-chain transfers. Developers can deploy these contracts to make any ERC20-compatible token cross-chain transferable or create custom token pool contracts for specific use cases.

**Note**: In Chainlink CCIP, the term "Token Pool" might be slightly confusing. Unlike traditional liquidity pools that hold tokens, a CCIP `TokenPool` is actually more like a coordinator contract that manages cross-chain token operations (minting, burning, locking, or unlocking). Even in mint/burn scenarios where no actual pooling of assets occurs, CCIP still requires a `TokenPool` contract for each token on each chain. This contract doesn't store tokens itself but instead orchestrates the token's cross-chain behavior.

#### CCIP Token Pool Mechanisms

The CCIP CCT Standard supports the following types of bridging mechanisms (remember, when using CCIP, all tokens need an associated Token Pool contract that is responsible for managing the token supply, regardless of the mechanism being used):
- Mint and burn

![ccip-burn-mint](/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/ccip-burn-mint.png)

- Mint and unlock

![ccip-lock-mint](/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/ccip-lock-mint.png)

- Burn and unlock

![ccip-burn-unlock](/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/ccip-burn-unlock.png)

- Lock and unlock

![ccip-lock-unlock](/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/ccip-lock-unlock.png)

## How to Use the CCT Standard

To implement the CCT standard:

1. **Deploy the tokens**: Token developers either take an existing token or deploy one on every chain they want to enable their token. This token must implement with an `owner` function or `getCCIPAdmin` to return either the contract owner or CCIP admin respectively. 

2. **Deploy Token Pools**: A token pool must be deployed on all enabled chains. These pools can be custom or Chainlink-written and audited. 

2. **Configure Token Pools**: Set parameters such as rate limits to manage cross-chain token transfers.

3. **Register Tokens**: Register the token administrator (either a CCIP admin or owner, depending on which function the ERC-20 token implemented) using the `RegistryOwnerModuleCustom`. Link the deployed token pools with the token contracts on the `TokenAdminRegistry`. 

Refer to the [Chainlink documentation](https://docs.chain.link/ccip/concepts/cross-chain-tokens) for detailed tutorials on deploying and registering cross-chain tokens.
