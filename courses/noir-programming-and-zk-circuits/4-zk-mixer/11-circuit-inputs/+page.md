## Defining ZK Circuit Inputs for a ZK-Mixer Deposit Proof

This lesson focuses on a critical step in developing a Zero-Knowledge (ZK) mixer: identifying and categorizing the inputs required for the ZK-SNARK circuit. Our objective is to design a circuit capable of generating a proof of deposit. This proof, verifiable by a smart contract, will allow users to demonstrate they made a deposit without revealing their identity or the specifics of that deposit, thereby ensuring privacy.

The core challenge is to determine what information the circuit needs to perform its computations and what parts of this information can be made public versus what must remain private to the prover.

### The Anatomy of a Privacy-Preserving Withdrawal Proof

To enable a user to withdraw their Ether (ETH) from the ZK-mixer, they must generate a ZK proof. This proof, typically created off-chain using a framework like Noir, serves as evidence that they legitimately deposited funds. Specifically, the proof must convincingly establish two key facts:

1.  **Knowledge of a Secret:** The user possesses a unique secret that corresponds to a commitment (a leaf node) present within the Merkle tree that records all deposits made to the mixer.
2.  **Unique Nullifier Revelation:** The user is revealing a unique nullifier, also tied to their secret. This nullifier is used to prevent the same deposit from being withdrawn multiple times (double-spending).

Let's break down how these requirements translate into concrete inputs for our ZK circuit.

### Calculating the Commitment: The Foundation of Privacy

At the heart of the deposit is a **commitment**. This commitment is a cryptographic hash derived from two pieces of information supplied by the depositor:
*   A **secret**: A random, private value known only to the depositor.
*   A **nullifier**: Another random, private value, also chosen by the depositor.

The formula is essentially: `commitment = hash(secret, nullifier)`.

This calculated commitment is what gets inserted as a leaf into the mixer's Merkle tree of deposits. Since the `secret` and `nullifier` are the foundational pieces of private data the user needs to prove knowledge of, they become our initial **private inputs** to the circuit.

### Proving Merkle Tree Membership: Is the Deposit Real?

The ZK proof must demonstrate that the commitment calculated from the user's private `secret` and `nullifier` actually exists within the deposit Merkle tree. This involves several components:

1.  **Proposed Root (Public Input):** The verifier (the smart contract) maintains knowledge of the current or a recent Merkle root of the deposit tree. The ZK proof must show that the user's commitment is part of a Merkle tree that correctly hashes up to this known `proposed_root`. This `proposed_root` is therefore a **public input** to the circuit.

2.  **Merkle Proof / Path (Private Input):** To reconstruct the path from the user's commitment (a leaf) up to the Merkle root, the circuit needs the sibling hashes at each level of the tree. This collection of sibling hashes is known as the `Merkle proof` or Merkle path. For instance, if a tree has 8 leaves (0-7) and the user's commitment is leaf 2, the proof would include:
    *   Leaf 3 (sibling of leaf 2)
    *   The hash of leaves 0 and 1 (sibling of `hash(leaf2, leaf3)`)
    *   The hash of `hash(leaves 0,1)` and `hash(leaves 2,3)` combined with the hash of `hash(leaves 4,5)` and `hash(leaves 6,7)`.
    These sibling hashes are specific to the user's deposit and its position in the tree, so they constitute a **private input**.

3.  **Path Indices / Directions (Private Input):** When reconstructing the Merkle root, the order of hashing matters. For any two nodes `A` and `B` being combined, the circuit needs to know whether to compute `hash(A, B)` or `hash(B, A)`. This is determined by the position (index) of the node derived from the user's path relative to its sibling from the Merkle proof.
    We provide this directional information as an array of booleans, typically indicating if the current node being processed (starting with the user's commitment, then the subsequent intermediate hashes) is a left child (e.g., has an even index relative to its sibling). For example:
    *   If leaf 2 (even index) is combined with sibling leaf 3, the hash is `H(leaf2, leaf3)`. The boolean would indicate "even index."
    *   If the resulting `H(leaf2, leaf3)` (say, at an odd index in the next level) is combined with its sibling `S_level1`, the hash is `H(S_level1, H(leaf2, leaf3))`. The boolean for this level would indicate "odd index."
    This sequence of booleans guiding the hashing order is also a **private input**.

### Nullifier Verification: Preventing Double Spending

To ensure a deposit cannot be withdrawn multiple times, we use the `nullifier`.

1.  **Nullifier (Private Input):** As established, the `nullifier` itself is a private value used in calculating the commitment. It remains a **private input** to the circuit.

2.  **Nullifier Hash (Public Input):** When a user successfully withdraws funds, a hash of their `nullifier` (the `nullifier_hash`) is made public and recorded by the smart contract. The ZK circuit must prove that the private `nullifier` it used to compute the commitment (and which is part of the secret knowledge) correctly hashes to this publicly declared `nullifier_hash`. This `nullifier_hash` serves as a public "spent" marker and is a crucial **public input**. The smart contract will check its list of revealed `nullifier_hash` values to ensure this one hasn't been used before.

### Summarizing the Circuit Inputs

Based on this derivation, we can now clearly define the inputs to our ZK-SNARK circuit:

**Private Inputs (Known only to the Prover):**

*   **Secret:** The unique, private value chosen by the depositor, used to form the commitment.
*   **Nullifier:** The second unique, private value chosen by the depositor, used for the commitment and to prevent double-spending.
*   **Merkle Proof (Intermediate Nodes):** The set of sibling hashes from the Merkle tree required to reconstruct the path from the user's commitment to the Merkle root.
*   **Path Indices (Boolean Array):** An array of booleans indicating, for each level of Merkle proof reconstruction, whether the node on the user's path is the left child (has an even index) relative to its sibling in the proof. This dictates the order of hashing.

**Public Inputs (Known to both Prover and Verifier):**

*   **Proposed Root:** The Merkle root of the deposit tree against which the user's commitment membership is being verified. The smart contract knows this value.
*   **Nullifier Hash:** The publicly revealed hash of the user's private nullifier. The circuit proves that the private nullifier it uses correctly hashes to this value. The smart contract uses this to mark the deposit as spent.

This methodical identification of inputs is essential. By precisely defining what data is private and what is public, we lay the groundwork for constructing a secure and effective ZK circuit. The circuit will take these inputs and, if all conditions are met (commitment correctly calculated, commitment present in the tree under the proposed root, and nullifier correctly hashes to the public nullifier hash), it will output a valid proof without revealing any of the private inputs.

With these inputs defined, the next logical step is to begin the actual implementation of the ZK circuit.