# Chainlink CCIP - Tokens

## Blockchain Interoperability

Blockchain interoperability represents the critical capability for separate blockchain networks to communicate and interact with each other. At its core, this functionality is enabled by cross-chain messaging protocols—specialized infrastructure that allows one blockchain to read data from and write data to other blockchains.

This capability enables the development of [cross-chain decentralized applications (dApps)](https://blog.chain.link/cross-chain-smart-contracts/) that function cohesively across multiple blockchains. Unlike multi-chain applications that deploy isolated, identical versions across different networks, cross-chain dApps maintain state awareness and functional connectivity between their various blockchain components.

## Token Bridging

Token bridges allow assets to be moved across blockchains, increasing token utility by making cross-chain liquidity possible. Token bridges involve locking or burning tokens via a smart contract on a source chain and unlocking or minting tokens via a separate smart contract on the destination chain.

### Token Bridging Mechanisms

There are three main token-bridging mechanisms:

1. **Lock and mint**: 
    - **Source Chain -> Destination Chain**: Tokens are sent to and held in a secure smart contract on the source chain. This is known as "locking" the tokens. Equivalent "wrapped" tokens are minted as representations on the destination chain. Wrapped tokens are 1:1 backed representations of the original asset that allow it to be used on a blockchain different from its native one. You can think of it like an IOU.
    - **Destination Chain -> Source Chain**: Wrapped tokens are burned on the destination chain to release the original tokens by unlocking them on the source chain.

    ::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/lock-mint.png' style='width: 100%; height: auto;' alt='lock-mint'}

2. **Burn and mint**: 
    - **Source chain**: Tokens are permanently destroyed (burned).
    - **Destination chain**: Equivalent tokens are newly minted.
    - This process is the same for the return journey.
    - This approach is particularly suitable for native tokens with minting authority.

    ::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/burn-mint.png' style='width: 100%; height: auto;' alt='burn-mint'}

3. **Lock and unlock**:
    - **Source chain**: Tokens are locked in a smart contract.
    - **Destination chain**: Equivalent tokens are released from an existing liquidity pool
    - This process is the same for the return journey.
    - This mechanism requires sufficient liquidity on both sides; typically, liquidity providers are incentivized through revenue sharing or yield opportunities.

    ::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/lock-unlock.png' style='width: 100%; height: auto;' alt='lock-unlock'}
    
4. **Burn and Unlock**:
    - **Source chain**: Tokens are permanently burned
    - **Destination chain**: Equivalent tokens are unlocked from a reserve pool, requiring liquidity providers.
    - This approach combines the finality of burning with the need for pre-existing liquidity on the destination chain.

    ::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/burn-unlock.png' style='width: 100%; height: auto;' alt='burn-unlock'}

## Cross-chain Messaging

Cross-chain messaging allows blockchains to communicate by sending data between chains. This enables more complex interactions beyond simple token transfers, such as:

- Synchronizing protocol states (like interest rates or governance decisions).
- Triggering functions on destination chains based on source chain events.

Cross-chain messaging protocols typically handle message verification, delivery confirmation, and proper execution on destination chains. This infrastructure is essential for building truly interconnected blockchain applications that can leverage the unique strengths of different networks while maintaining coherent application logic.

## Security Considerations

Cross-chain operations introduce fundamental security challenges not present in single-chain environments. Cross-chain systems must make tradeoffs between three critical properties:

- **Security**: Resistance to attacks and manipulation.
- **Trust assumptions**: The degree of trust required in external validators or oracles (when using Chainlink, this is minimized).
- **Configuration flexibility**: Adaptability to different blockchain architectures.

Unlike single-chain systems, cross-chain systems must carefully navigate these tradeoffs. This means that security models for cross-chain applications require more rigorous design considerations and often involve different assumptions than their single-chain counterparts.
