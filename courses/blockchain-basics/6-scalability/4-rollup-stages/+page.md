## Understanding Rollup Stages: A Framework for L2 Maturity

Layer 2 scaling solutions, commonly known as rollups, are critical to Ethereum's future. To help users and developers navigate this complex ecosystem, a framework known as "Rollup Stages" was developed. Proposed by Ethereum co-founder Vitalik Buterin and implemented by the analysis platform L2BEAT, this system categorizes rollups based on their level of maturity and decentralization.

It is crucial to understand that these stages are not a direct measure of a rollup's security. Instead, they serve as a roadmap, tracking a project's progress from a centrally managed system with "training wheels" to a fully trustless, decentralized protocol governed entirely by on-chain smart contracts. You can track the stages of various projects on the L2BEAT scaling summary page.

### Stage 0: Full Training Wheels

Stage 0 represents the earliest and most centralized phase of a rollup's lifecycle. At this stage, the project relies heavily on a trusted team of operators and a Security Council—a committee of trusted individuals who can intervene to fix bugs, resolve issues, and push upgrades.

To qualify for Stage 0, a project must meet two key criteria:

*   **Open-Source Data Reconstruction:** The rollup's software must be open-source, allowing anyone to use the data published on the Layer 1 (L1) chain to reconstruct the rollup's state. This ensures transparency and the ability to independently verify the chain's integrity.
*   **Limited User Exit:** In the event of an unwanted upgrade or system failure, users have a short window (typically less than 7 days) to exit the system and withdraw their funds. This process often requires the cooperation of the centralized operator.

### Stage 1: Enhanced Rollup Governance

A rollup graduates to Stage 1 when it makes significant strides towards decentralization, shifting key functions from a trusted team to on-chain smart contracts. The Security Council may still exist, but its role is often reduced to handling emergency bug fixes.

The defining features of a Stage 1 rollup include:

*   **Operational Proof System:** The rollup has a fully functional and decentralized fraud-proof or validity-proof system. This allows any participant to permissionlessly challenge or verify the correctness of state transitions on-chain.
*   **Permissionless User Exit:** The user exit process is improved. Users are given a longer window (more than 7 days) to withdraw their funds in response to an unwanted upgrade. Crucially, they can do so without needing permission or coordination from the rollup's operator.

### Stage 2: No Training Wheels

Stage 2 is the final destination, representing a fully mature, decentralized, and trust-minimized rollup. At this stage, the "training wheels" have been removed, and the system operates almost entirely through autonomous, on-chain smart contracts.

A Stage 2 rollup is characterized by the following:

*   **Full Smart Contract Governance:** The rollup is completely managed by its on-chain smart contracts, removing reliance on any centralized operator.
*   **Permissionless Proof System:** The fraud or validity proof system is fully permissionless, allowing anyone to participate in validating the chain.
*   **Limited Security Council:** If a Security Council still exists, its powers are strictly limited to addressing errors that are adjudicated on-chain. This provides robust protection against potential governance attacks that could harm users.
*   **Ample Exit Window:** Users are provided with a substantial amount of time to exit the system before any proposed upgrade is executed, ensuring they can safely withdraw their assets if they disagree with a change.

### A Practical Analysis: zkSync Era's Stage 0 Risks

To see how this framework applies in practice, we can analyze **zkSync Era**, a prominent rollup currently at Stage 0, using the detailed risk analysis on L2BEAT. The site uses a color-coded pie chart to visualize five key risk vectors: green (low risk), yellow (medium risk), and red (high risk).

**Data Availability (Green):**
The state of zkSync Era can be fully reconstructed from data published on L1. The rollup posts state differences ("state diffs") to Ethereum, which contains all the necessary information for anyone to construct proofs and verify the chain's state.

**State Validation (Green):**
zkSync Era uses a ZK (Zero-Knowledge) proof system to ensure the integrity of its state transitions. Specifically, it employs the PLONK proof system with KZG commitments to cryptographically prove the validity of every transaction batch submitted to L1.

**Sequencer Failure (Yellow):**
The Sequencer is the entity responsible for ordering transactions. If the zkSync Era Sequencer goes offline or censors users, the entire system halts. While users can submit transactions to an L1 queue, they cannot force the Sequencer to process them, effectively freezing all activity and withdrawals. This is a medium risk because while it freezes funds, it does not allow for theft and affects all users equally.

**Proposer Failure (Red):**
The Proposer is responsible for submitting new state roots to the L1. On zkSync Era, this role is permissioned and managed by a whitelist. If these whitelisted Proposers fail or go offline, no new state roots can be published, and user withdrawals become frozen. This is considered a high risk because it directly prevents users from accessing their funds.

**Exit Window (Red):**
zkSync Era's smart contracts are instantly upgradable by its governing entity. This means there is no delay or "exit window" for users to react to an unwanted or malicious upgrade. Since users have no time to withdraw their funds before a change takes effect, this presents a high risk.