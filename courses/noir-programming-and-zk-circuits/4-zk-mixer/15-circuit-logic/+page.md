## Setting Up Your ZK-Mixer Circuit Environment

To begin building the zero-knowledge circuit for our ZK-Mixer, we first need to establish a dedicated Noir project. This project will house all the logic for proving knowledge of a deposit without revealing its sensitive details.

If you have an existing project structure, for instance, a `contracts` directory for Solidity smart contracts, navigate outside of it. We'll create a new Noir project specifically for our circuits. Execute the following Nargo command in your terminal:

```bash
nargo new circuits
```

This command initializes a new Noir project named `circuits`. Inside this newly created `circuits` folder, you'll find a `src` subfolder containing a `main.nr` file (the entry point for our circuit logic) and a `Nargo.toml` file (for project configuration and dependencies).

Before we start scripting our circuit, open the `src/main.nr` file and clear its default content. This allows us to build our ZK-Mixer logic from a clean slate.

## Defining the Core Circuit: Inputs and Function Signature

The heart of our ZK-Mixer's privacy mechanism will be encapsulated within the `main` function in `main.nr`. This function will define the inputs required to generate a proof of a valid withdrawal. These inputs are categorized into public inputs (known to both the prover and verifier) and private inputs (known only to the prover).

Let's define the signature for our `main` function:

```noir
fn main(
    // Public Inputs
    root: pub Field,
    nullifier_hash: pub Field,
    recipient: pub Field, // Added to prevent front-running

    // Private Inputs
    nullifier: Field,
    secret: Field,
    merkle_proof: [Field; 20],
    is_even: [bool; 20]
) {
    // Circuit logic will be implemented here
}
```

Let's break down these inputs:

*   **Public Inputs:** These values are openly available on the blockchain or provided by the prover for verification.
    *   `root: pub Field`: This is the Merkle root of the tree that stores all deposit commitments. The `pub` keyword designates it as a public input. `Field` is Noir's native data type for representing large numbers, suitable for cryptographic hashes.
    *   `nullifier_hash: pub Field`: This is the publicly known hash of the nullifier. It's crucial for preventing a user from withdrawing the same deposit multiple times (double-spending).
    *   `recipient: pub Field`: The blockchain address of the intended recipient for the withdrawn funds. This input is critical for mitigating front-running attacks, ensuring the proof is tied to a specific withdrawal destination.

*   **Private Inputs:** These are the secret values known only to the user making the withdrawal (the prover). They are essential for constructing the proof but are never revealed publicly.
    *   `nullifier: Field`: A secret value, derived from the original deposit, used to generate the public `nullifier_hash`.
    *   `secret: Field`: Another secret value associated with the deposit. Together with the `nullifier`, it forms the basis of the commitment.
    *   `merkle_proof: [Field; 20]`: This is an array of `Field` elements representing the sibling nodes along the path from the user's commitment (leaf) to the Merkle root. The size `20` indicates our Merkle tree has a depth of 20, accommodating 2^20 leaves.
    *   `is_even: [bool; 20]`: An array of booleans. Each boolean `is_even[i]` indicates the position of the current hash being computed at level `i` of the Merkle path. If `is_even[i]` is `true`, it means the current hash is on the left (an even-indexed node at that level), and its sibling from `merkle_proof[i]` is on the right. If `false`, the current hash is on the right, and its sibling is on the left.
        *   **A Note on Path Encoding:** This `is_even` array serves a similar purpose to the `path_indices` used in systems like Tornado Cash. However, the interpretation of the boolean value can differ. In our implementation, `is_even[i] = true` signifies that the current working hash (derived from the leaf or a lower level hash) is the left-hand input for the next hash computation. Other implementations might use a different convention (e.g., the boolean indicating if the *proof element* is on the left or right). It's crucial to be consistent with the chosen interpretation within the Merkle proof verification logic.

## Computing the Deposit Commitment

The first computational step within our circuit is to reconstruct the deposit commitment using the private inputs provided by the prover. This commitment is what was originally stored in the Merkle tree.

The code to compute the commitment is as follows:

```noir
// compute the commitment Poseidon(nullifier, secret)
let commitment: Field = poseidon2::Poseidon2::hash([nullifier, secret], 2);
```

**Explanation:**

*   We declare a new variable `commitment` of type `Field`.
*   This `commitment` is calculated by hashing the private `nullifier` and `secret` together.
*   We use the `poseidon2` hash function, specifically `poseidon2::Poseidon2::hash`. This function takes two arguments:
    1.  An array of `Field` elements to be hashed: `[nullifier, secret]`.
    2.  The number of elements in the array to hash: `2`.

To make the `poseidon2` hash function available, you would typically import it. The import statement depends on your Noir version and how `poseidon2` is packaged.

Initially, for older Noir versions, or if it were still part of the standard library as implied during some development phases, the import would be:
```noir
use std::hash::poseidon2;
```
However, a critical update has changed this, which we'll address next.

## Important Update: Handling the Poseidon2 Hash Function

The `poseidon2` hash function, essential for ZK-friendly computations, has undergone a packaging change in recent Noir versions. As of Noir version `1.0.0-beta.5` and later, `poseidon2` is no longer part of the Noir standard library (`std`). Instead, it's distributed as a separate package, or "crate."

To use `poseidon2` in these newer Noir versions, you must:

1.  **Add `poseidon` as a dependency in your `Nargo.toml` file:**
    Open your `Nargo.toml` file (located in the `circuits` project root) and add the following under the `[dependencies]` section. The example below uses a specific tag `v0.1.0` from the official `noir-lang/poseidon` repository:
    ```toml
    [dependencies]
    poseidon = { tag = "v0.1.0", git = "https://github.com/noir-lang/poseidon" }
    ```
    Always refer to the official Noir documentation or Poseidon repository for the latest recommended version and integration method.

2.  **Update the import statement in your `.nr` files:**
    Once the dependency is added, change the import statement in your Noir files (like `main.nr` and any other modules using it) from:
    ```noir
    // Old way (for versions before beta.5 or if std::hash::poseidon2 was used previously)
    // use std::hash::poseidon2;
    ```
    to the new way, referencing the imported crate:
    ```noir
    // New way (when imported as a dependency)
    use poseidon::poseidon2;
    ```
This lesson will continue using `poseidon2::Poseidon2::hash` in code examples, assuming the correct import (`use poseidon::poseidon2;` or `use std::hash::poseidon2;` depending on the Noir version context) is in place at the top of the respective Noir files.

## Ensuring Uniqueness: Verifying the Nullifier Hash

A core security feature of any mixer or private transaction system is preventing double-spends. This is achieved using nullifiers. The prover supplies a private `nullifier` and a public `nullifier_hash`. The circuit must verify that the provided private `nullifier` indeed hashes to the public `nullifier_hash`.

This verification is done as follows:

```noir
// check that the nullifier matches the nullifier hash
let computed_nullifier_hash: Field = poseidon2::Poseidon2::hash([nullifier], 1);
assert(computed_nullifier_hash == nullifier_hash);
```

**Explanation:**

*   A new variable `computed_nullifier_hash` is declared.
*   Its value is calculated by hashing the private `nullifier`. Since we are hashing a single field element, the input array is `[nullifier]` and the message size is `1`.
*   The `assert(computed_nullifier_hash == nullifier_hash);` statement is a crucial constraint. It checks if the `computed_nullifier_hash` (derived from the private input) is identical to the `nullifier_hash` (a public input). If these values do not match, the assertion fails, and the ZK proof generation will be unsuccessful, preventing an invalid withdrawal.

## Modularizing for Clarity: Introducing `merkle_tree.nr`

As our circuit logic grows, it's good practice to modularize it for better organization and readability. The Merkle tree root computation involves a specific iterative hashing process. We'll encapsulate this logic in a separate file.

In your `circuits/src` directory, create a new file named `merkle_tree.nr`.

To make the functions and structures defined in `merkle_tree.nr` accessible from our `main.nr` file, we need to import it as a module. Add the following line at the top of your `src/main.nr` file:

```noir
mod merkle_tree;
```
(Ensure this `mod` declaration comes before any `use` statements that might refer to items from this module, or place it logically with other module declarations).

## Proving Inclusion: Merkle Root Computation and Verification

The next critical step is to verify that the `commitment` (recalculated from the user's private `nullifier` and `secret`) is indeed a member of the set of all valid deposits. This is done by proving its inclusion in the Merkle tree whose `root` is a public input. The prover supplies the `commitment` (implicitly, as it's derived from `nullifier` and `secret`), the `merkle_proof` (sibling hashes), and the `is_even` path indicators.

**In `main.nr`:**

We will call a function from our `merkle_tree` module to compute the root and then assert its correctness.

```noir
// check that the commitment is in the Merkle tree
let computed_root: Field = merkle_tree::compute_merkle_root(commitment, merkle_proof, is_even);
assert(computed_root == root);
```

**Explanation:**

*   A new variable `computed_root` is declared.
*   Its value is obtained by calling the `compute_merkle_root` function, which we will define in our `merkle_tree` module.
*   This function takes the `commitment` (which serves as the leaf of the Merkle path being verified), the `merkle_proof` array, and the `is_even` array as inputs.
*   The `assert(computed_root == root);` statement checks if the Merkle root calculated using the private inputs and proof path matches the publicly known `root`. If they don't match, the proof generation fails.

**In `merkle_tree.nr`:**

Now, let's define the `compute_merkle_root` function within `src/merkle_tree.nr`.

```noir
// Import poseidon2 (adjust based on your Noir version and Nargo.toml)
// Assuming 'use poseidon::poseidon2;' or 'use std::hash::poseidon2;' is at the top of this file
use poseidon::poseidon2; // Or use std::hash::poseidon2;

// Function to compute the Merkle root from a leaf, proof, and path element positions
pub fn compute_merkle_root(leaf: Field, proof: [Field; 20], is_even: [bool; 20]) -> Field {
    // Temporary variable to store the hash for the current level we are working on.
    // Initialize with the leaf (the user's commitment).
    let mut current_hash: Field = leaf;

    // Iterate through the levels of the Merkle tree.
    // For a depth-20 tree, we perform 20 hashing operations.
    for i in 0..20 { // Loop from i = 0 to 19
        // Determine the order of hashing based on is_even[i]
        // If is_even[i] is true, current_hash is the left element.
        // If is_even[i] is false, current_hash is the right element.
        let (left_input, right_input): (Field, Field) = if is_even[i] {
            (current_hash, proof[i])
        } else {
            (proof[i], current_hash)
        };

        // Compute the hash for the current level
        current_hash = poseidon2::Poseidon2::hash([left_input, right_input], 2);
    }

    // After iterating through all levels, current_hash holds the computed Merkle root.
    current_hash // Implicitly return the computed root
}
```

**Explanation of `compute_merkle_root`:**

*   The function is declared `pub` (public) making it callable from other modules, like `main.nr`.
*   `let mut current_hash: Field = leaf;`: A mutable variable `current_hash` is initialized with the `leaf` value (the user's `commitment`). This `current_hash` will be updated as we move up the tree.
*   `for i in 0..20`: The loop iterates 20 times, corresponding to the depth of our Merkle tree. The range `0..20` means `i` will take values from 0 to 19.
*   `let (left_input, right_input): (Field, Field) = if is_even[i] { ... };`: This block determines the order of inputs for the hash function at the current level `i`.
    *   If `is_even[i]` is `true`, it means `current_hash` (the hash from the previous level, or the leaf itself at the start) is the left-hand element, and the corresponding sibling node `proof[i]` from the `merkle_proof` array is the right-hand element.
    *   If `is_even[i]` is `false`, `proof[i]` is the left-hand element, and `current_hash` is the right-hand element.
*   `current_hash = poseidon2::Poseidon2::hash([left_input, right_input], 2);`: The `left_input` and `right_input` are hashed together using `poseidon2`. The result updates `current_hash`, becoming the input for the next level up the tree.
*   `current_hash`: After the loop completes, `current_hash` will contain the calculated Merkle root based on the provided leaf and proof path. This value is then returned by the function.

## Preventing Theft: Addressing Front-Running Vulnerabilities

A critical security consideration in systems like ZK-Mixers is the potential for front-running or relay attacks. In the circuit's current state (before adding the `recipient` input to the `main` function), a malicious actor could exploit a vulnerability.

**The Problem:**
If a legitimate user broadcasts a withdrawal transaction, the ZK proof bytes (`_proof` in a typical Solidity contract interaction) are publicly visible in the transaction mempool. Since this proof, as constructed so far, isn't tied to a specific recipient, a malicious actor could:
1.  Observe the legitimate transaction in the mempool.
2.  Copy the `_proof` bytes.
3.  Submit their own transaction to the mixer's `withdraw` function, using the *stolen proof* but specifying *their own address* as the recipient.
If successful, the attacker would steal the funds intended for the legitimate user.

**The Solution:**
To mitigate this, we must tie the ZK proof to the intended recipient. This is achieved by including the recipient's address as a public input to the circuit itself. This approach is also used in established systems like Tornado Cash.

**Implementation Steps:**

1.  **Modify `main.nr`:** As we've already done in the "Defining the Core Circuit" section, add `recipient: pub Field` to the public inputs of the `main` function in `main.nr`.

    ```noir
    fn main(
        root: pub Field,
        nullifier_hash: pub Field,
        recipient: pub Field, // This is the crucial addition
        // ... other private inputs ...
    ) { // ... }
    ```

2.  **Update Solidity Contract (`Mixer.sol`):** The corresponding `withdraw` function in your Solidity smart contract (e.g., `Mixer.sol`) must also be updated. It should now accept the recipient's address as a parameter, for example, `address payable _recipient`. This `_recipient` address, provided by the user initiating the withdrawal, will then be passed as a public input to the verifier contract when it checks the ZK proof.

3.  **Verifier Contract Interaction:** The verifier contract (which Nargo generates from your Noir circuit) will now expect the `recipient` field as one of the public inputs. The Solidity `withdraw` function must supply this `_recipient` value when calling the verifier's `verify` function. This ensures that the proof is only valid if it's being used for a withdrawal to the specific `_recipient` address that was part of the proof's public inputs.

**Binding the `recipient` Input in Noir:**
Noir compilers are smart and might optimize away inputs that aren't actively used in computations or assertions. To ensure the `recipient` public input is integral to the circuit and not discarded, we need to "bind" it by using it in a constraint or calculation.

A simple way to do this is to include it in a computation, for example:
```noir
// In main.nr, after other assertions:
// Ensure the recipient public input is constrained.
// A common practice is to assert it's non-zero or use it in a dummy computation.
// For example, ensuring it's used:
let _recipient_binding = recipient * recipient; // Or recipient + 0;
// A more robust check might be:
// assert(recipient != 0); // If 0 is an invalid recipient address.
```
The primary goal here is to make the `recipient` field "active" within the circuit's constraints. If `recipient` were, for instance, hashed along with other public parameters and this hash was constrained, that would also serve the purpose. The `_recipient_binding = recipient * recipient;` line ensures `recipient` is read and used, preventing its optimization if it weren't otherwise part of an assertion that contributes to the final proof. A more direct constraint like `assert(recipient != 0);` (assuming address 0 is invalid) is often preferred for clarity and directness.

## Finalizing and Preparing for Compilation

With the inclusion of the `recipient` public input and its binding, along with the core logic for commitment calculation, nullifier verification, and Merkle proof validation, our ZK-Mixer circuit's fundamental structure is largely complete.

The next step in the development workflow would be to compile this circuit. Navigate to your `circuits` project directory in the terminal if you aren't already there:

```bash
cd circuits
```

From here, you would typically run the Nargo compile command (e.g., `nargo compile`). This command processes your Noir code (`.nr` files), performs type checking, constraint generation, and ultimately outputs an ACIR (Abstract Circuit Intermediate Representation) and, importantly for on-chain verification, a Solidity verifier contract.

This verifier contract can then be deployed to the blockchain and used by your main ZK-Mixer smart contract to verify the proofs generated by users for private withdrawals.