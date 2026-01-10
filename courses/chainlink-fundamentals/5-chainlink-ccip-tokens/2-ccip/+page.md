# Chainlink Cross-Chain Interoperability Protocol (CCIP)

Chainlink CCIP is a cross-chain messaging solution that enables developers to build secure cross-chain applications capable of transferring tokens, sending arbitrary messages (data), or executing programmable token transfers between different blockchains.
Given the inherent security challenges of cross-chain operations, CCIP implements a [defense-in-depth security](https://blog.chain.link/ccip-risk-management-network/) approach powered by Chainlink's industry-leading decentralized oracle networks (DONs), which have securely facilitated over $15 trillion in transaction value.

## Core Capabilities

CCIP offers three primary capabilities that form the foundation of cross-chain development:

- **Arbitrary messaging**: Send any data to smart contracts on different blockchains. For example:
    - Encode custom instructions or parameters as needed.
    - Trigger specific actions on receiving contracts (rebalancing indices, minting NFTs, etc.)
    - Bundle multiple instructions within a single message to orchestrate complex multi-chain tasks.
- **Token transfers**: Move tokens securely across blockchain networks:
    - Transfer to smart contracts or directly to user wallets (EOAs).
    - Benefit from configurable rate-limiting for enhanced risk management.
    - Improve token composability with dApps and bridges using CCIP's standardized interface.
- **Programmable token transfers (data and tokens)**: Combine token transfers with execution instructions in a single transaction:
    - Send tokens with specific instructions on how they should be used.
    - Create cross-chain DeFi interactions (lending, swapping, staking).
    - Execute complex financial operations in a unified transaction.

## Core Security Features

CCIP's security features include:

- **Multiple independent nodes** run by independent key holders.
- **Three decentralized oracle networks (DONs)** commit, execute, and verify cross-chain transactions.
- **Separation of responsibilities** via a distinct set of Chainlink node operators, wherein nodes are not shared between the transactional DONs and the [Risk Management Network (RMN)](https://docs.chain.link/ccip/concepts#risk-management-network).
- **Increased decentralization**, with two separate codebases across two different implementations written in different languages to create a diversity of software clients.
- **Novel risk management system**, with [level-5 security](https://blog.chain.link/five-levels-cross-chain-security/#level_5__defense-in-depth) that can adapt to emergent risks or attacks in cross-chain messaging.

## CCIP Architecture

CCIP enables a sender on a source blockchain to send a message to a receiver on a destination blockchain.

CCIP consists of the following components to facilitate cross-chain communication:

- **Router**: The primary user-facing smart contract deployed on each blockchain. The Router:
    - Initiates cross-chain interactions.
    - Manages token approvals for transfers.
    - Routes instructions to the appropriate destination-specific [OnRamp](https://docs.chain.link/ccip/architecture#onramp).
    - Delivers tokens to user accounts or messages to the receiver contracts on destination chains.

- **Sender**: An EOA (externally owned account) or smart contract that initiates the CCIP transaction. Both initiators can send tokens, messages, or tokens and messages.

- **Receiver**: An EOA or smart contract that receives the cross-chain transaction. The receiver may differ from the sender depending on the specific use case, such as sending assets to another user on a different chain. Only smart contracts can receive data.

![ccip-architecture](/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/ccip-architecture.png)

## Fee-Handling

When using CCIP, there is an associated fee when sending a cross-chain message (either data, tokens, or both). The CCIP billing model uses a `feeToken` specified in the cross-chain message that users will send. This fee token can be either the blockchain's native token (including wrapped versions) or LINK. This fee is a **single fee on the source chain**, where CCIP takes care of the execution on the destination chain. 

The fee is calculated using the following formula:

```
fee = blockchain fee + network fee
```

### Fee

The `fee` is the total CCIP fee for sending the message. This fee amount is accessible on the Router contract via the `getFee` function.

### Blockchain Fee

The `blockchain fee` represents an estimation of the gas cost the Chainlink node operators will pay to deliver the CCIP message to the destination blockchain. It is calculated using the following formula:

```
blockchain fee = execution cost + data availability cost
```

**Execution Cost**: The `execution cost` directly correlates with the estimated gas usage to execute the transaction on the destination blockchain. It is calculated using the following formula:

```
execution cost = gas price * gas usage * gas multiplier
```

Where:

- `gas price`: This is the gas on the destination chain.
- `gas usage`: This is calculated using the following formula:

```
gas usage = gas limit + destination gas overhead + destination gas per payload + gas for token transfers
```

Where:

- `gas limit`: The maximum amount of gas CCIP can consume to execute `ccipReceive` on the receiver contract, located on the destination blockchain. Users set the gas limit in the extra argument field of the CCIP message. Any unspent gas from this user-set limit is _not_ refunded.
        - **Warning**: unspent gas is NOT refunded, so be sure to carefully estimate the `gasLimit` that you set for your destination contract so CCIP can have sufficient gas to execute `ccipReceive`.
- `destination gas overhead`: Fixed gas cost incurred on the destination blockchain by CCIP DONs.
- `destination gas per payload`: This depends on the length of the data being sent cross-chain in the CCIP message. If there is no payload (CCIP is used to transfer tokens and no data), the value is `0`.
- `gas for token transfers`: Cost for transferring tokens to the destination blockchain. If there are no token transfers, the value is `0`.
- `gas multiplier`: Scaling factor for _Smart Execution_. _Smart Execution_ is a multiplier that ensures the reliable execution of transactions regardless of gas spikes on the destination chain. This means you can simply pay on the source blockchain and CCIP will take care of execution on the destination blockchain.

**Data Availability Cost**: Relevant if the destination chain is an L2 rollup. Some L2s charge fees for data availability. This is because many rollups process the transactions off-chain and post the transaction data to the L1 as `calldata`, which costs additional gas.

## Network Fee

The `network fee` is the fee for CCIP service providers such as the DON nodes (e.g., Committing DON, Executing DON, or the RMN nodes).

The `network fee` depends on the bridging mechanism (mint and burn, lock and unlock, etc.) and whether the cross-chain message sends tokens, data, or both. The Chainlink CCIP documentation includes a calculator for calculating the [`network fee`](https://docs.chain.link/ccip/billing#network-fee).

## CCIP transaction lifecycle

**Message Initiation**: A sender, either a smart contract or an Externally Owned Account (EOA), initiates a CCIP message on the source blockchain. This message can include arbitrary data, tokens, or both.​ For token transfers, the corresponding token pool contracts handle the burning or locking of tokens on the source chain. ​

**Source Chain Finality**: The transaction must achieve finality on the source blockchain after initiation. Finality refers to the point at which a transaction is considered irreversible and permanently on the blockchain. The time to reach finality varies among blockchains; for instance, some may have deterministic finality, while others might require waiting for a certain number of block confirmations to mitigate the risk of reorganization. ​

**Committing DON Actions**: Once finality is achieved, the Decentralized Oracle Network (DON) responsible for committing transactions (Committing DON) observes the finalized transaction. It then aggregates multiple finalized CCIP transactions into a batch, computes a Merkle root for this batch, and records it onto the `CommitStore` contract on the destination blockchain. ​

**Risk Management Network Blessing**: The Risk Management Network reviews the committed Merkle root to ensure the integrity and security of the batched transactions. It "blesses" the Merkle root upon verification, signaling that the transactions are authenticated and can proceed. ​

**Execution on Destination Chain**: Following the blessing, the Executing DON initiates the transaction's execution on the destination blockchain. This involves delivering the message to the intended receiver. For token transfers, the corresponding token pool contracts handle the minting or unlocking of tokens on the destination chain. ​

**Smart Execution and Gas Management**: CCIP incorporates a Smart Execution mechanism to ensure reliable transaction delivery. This system monitors network conditions and adjusts gas prices as needed to facilitate successful execution within a specified time window, typically around 8 hours. [Manual execution](https://docs.chain.link/ccip/concepts/manual-execution) may be required to complete the process if the transaction cannot be executed within this window due to network congestion or insufficient gas limits. ​

Visit the [Chainlink Documentation](https://docs.chain.link/ccip/concepts/ccip-execution-latency#overview) for more information on the CCIP transaction lifecycle and how the DON determines finality.

### The Token Pool Contracts

Chainlink CCIP introduces the concept of a **Token Pool** contract. We'll revisit this later when discussing Chainlink's Cross-Chain Token standard, but for now, here’s the core idea:

- In the context of CCIP, Token Pool contracts are responsible for **managing token supply** across the source and destination chains. Token Pool is the term used by Chainlink to refer to the smart contract responsible for controlling the transfer of tokens, regardless of the bridging mechanism.

- Each token on each chain has its own associated Token Pool contract, regardless of whether the bridging mechanism involves **minting and burning** or **locking and unlocking**.

- Traditionally, token pools serve as vaults—used to lock tokens from liquidity providers or to store tokens that have been bridged.

- In Chainlink’s terminology, a Token Pool is the contract that either calls `mint`/`burn` on the token contract or manages token custody for lock/unlock-style bridging.

### Importance of Finality in CCIP

Finality is a critical aspect of the CCIP transaction lifecycle, as it determines the point at which a transaction is considered irreversible and permanently recorded on the blockchain. Different blockchains have varying notions of finality. For instance, some blockchains achieve deterministic finality quickly, while others may require waiting for multiple block confirmations to ensure the transaction is unlikely to be reverted. CCIP considers these differences by waiting for the appropriate finality on the source blockchain before proceeding with cross-chain transactions, thereby ensuring the integrity and reliability of the protocol. ​View the [Chainlink Documentation](https://docs.chain.link/ccip/concepts/ccip-execution-latency#finality-on-l2s) to see the finality times on different blockchains.
