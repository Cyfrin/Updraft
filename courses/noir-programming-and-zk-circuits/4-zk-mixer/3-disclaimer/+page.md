## Disclaimer and Educational Purpose

Welcome to this lesson. Before we dive into the technical details, it's crucial to understand the context and purpose of the information being shared.

The content provided in this course is strictly for educational purposes. Our primary objective is to demonstrate how privacy-preserving smart contracts, such as mixers, operate internally using zero-knowledge proofs. This exploration is designed to enhance your understanding of the underlying technology.

It is important to state clearly that this course is not intended to promote or encourage the use of privacy tools for any illicit activity. We do not condone the violation of any laws or regulations. When building or deploying smart contracts, or engaging with blockchain technology in any capacity, please ensure you are in full compliance with your local laws and regulations.

By continuing with this course, you acknowledge that the code, concepts, and examples shared are for learning purposes only. You accept full responsibility for how you choose to use this information.

## Code Attribution and Source

The smart contract code we will be examining and adapting in this section is partially derived from the "Tornado Cash Core" GitHub repository. You can find this repository at `github.com/tornadocash/tornado-core`.

Specifically, we will be looking at adaptations from several Solidity (`.sol`) files within the `contracts` directory of the `tornado-core` repository. The primary files that have influenced the code in this course module are:

*   `MerkleTreeWithHistory.sol`
*   `Tornado.sol`
*   `ETHTornado.sol`

As a matter of good practice and proper attribution, the GitHub repository associated with this course will include links back to the original `tornado-core` repository. Furthermore, within our own code, we will be using `NatSpec` comments (Solidity's documentation format) to credit these resources at the end of the relevant contract files. This practice is highly encouraged when working with or adapting open-source code.

## Understanding Key Terminology: "Proof" vs. "Merkle Proof"

To ensure clarity and avoid potential confusion as we proceed, let's define some key terms, particularly around the word "proof."

When the term **"proof"** is used in a general sense throughout this course – for instance, in function names like `getProof` or in phrases such as "the proof required for withdrawal" – it will almost invariably refer to a **zero-knowledge proof (ZK proof)**. Zero-knowledge proofs are the cryptographic foundation of the privacy-preserving mechanisms we are studying. They allow one party (the prover) to demonstrate to another party (the verifier) that a specific statement is true, without revealing any underlying information beyond the validity of the statement itself. The ZK proofs we'll be discussing are typically generated using tools like Barretenberg.

However, if we are specifically discussing Merkle trees and use the term **"Merkle proof,"** this refers to something different. A Merkle proof consists of the **intermediate hash nodes** within a Merkle tree that are necessary to verify that a particular piece of data (a "leaf") is indeed part of that tree. It's a proof of membership within that specific data structure.

So, to reiterate the key distinction:

*   **"Proof" (general usage) or "ZK Proof":** Refers to a zero-knowledge proof, a cryptographic primitive enabling privacy.
*   **"Merkle Proof":** Refers to the set of intermediate hashes needed to validate an element's inclusion in a Merkle tree. This Merkle proof is often an *input* when generating a zero-knowledge proof in systems like mixers.

Understanding this distinction is vital as we explore how these components interact to create privacy-preserving smart contracts.

With these foundational points covered, let's continue.