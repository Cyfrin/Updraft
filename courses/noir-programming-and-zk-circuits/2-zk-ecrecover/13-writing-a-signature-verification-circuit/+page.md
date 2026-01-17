## Verifying ECDSA Signatures in Noir: A Practical Guide

Welcome to this lesson where we'll explore how to write an Elliptic Curve Digital Signature Algorithm (ECDSA) verification circuit using Noir, a specialized language for creating zero-knowledge proofs. We'll compare Noir's method with Solidity's familiar `ecrecover` precompile and then dive into a step-by-step implementation of a basic ECDSA verification circuit in Noir. This skill is crucial for building ZK-SNARK applications that need to verify off-chain signatures within a proof.

## ECDSA Verification: Solidity vs. Noir

Before we jump into Noir, let's briefly revisit how ECDSA signature verification is commonly handled in the Ethereum ecosystem, specifically within Solidity smart contracts.

### Solidity's `ecrecover` Precompile

Many developers are familiar with Solidity's `ecrecover` precompile. It's a built-in function that allows smart contracts to recover an Ethereum address from an ECDSA signature.
As per the official Solidity documentation (often found at `docs.soliditylang.org`), the `ecrecover` function typically takes the following parameters:

*   `bytes32 hash`: The Keccak256 hash of the message that was signed.
*   `uint8 v`: The recovery identifier component of the signature.
*   `bytes32 r`: The `r` component of the signature.
*   `bytes32 s`: The `s` component of the signature.

The function then attempts to recover the public key that produced the signature and, from that, derives and returns the corresponding Ethereum address. If the recovery fails, it returns the zero address.

### The Noir Approach: Using an `ecrecover` Library

Noir, being a language for ZK circuits, approaches this differently. Instead of a precompile, we typically rely on libraries or "crates" that provide specific functionalities. For ECDSA verification, a common choice might be a library like the one found in the `colinnielsen/ecrecover-noir` GitHub repository.

The function signature for `ecrecover` in such a Noir library might look like this (based on common implementations):

```noir
fn ecrecover(
    pub_key_x: [u8; 32],
    pub_key_y: [u8; 32],
    signature: [u8; 64],
    hashed_message: [u8; 32]
) -> Field
```

Let's break down these parameters:

*   `pub_key_x: [u8; 32]`: This is the x-coordinate of the public key, represented as an array of 32 unsigned 8-bit integers (`u8`).
*   `pub_key_y: [u8; 32]`: Similarly, this is the y-coordinate of the public key, also as an array of 32 `u8` values.
*   `signature: [u8; 64]`: This parameter holds the ECDSA signature. It's an array of 64 `u8` values, representing the concatenation of the `r` value (32 bytes) and the `s` value (32 bytes). Notably, this particular style of `ecrecover` function in Noir often does not explicitly take the `v` (recovery ID) component. The recovery process might infer it or require the public key to be fully specified.
*   `hashed_message: [u8; 32]`: This is the hash of the message that was signed, provided as an array of 32 `u8` values.

**Return Value:**

The Noir `ecrecover` function returns a `Field`. In the context of ZK-SNARKs and Noir, a `Field` is a fundamental data type representing an element of the underlying finite field used by the proof system. If the provided signature is valid for the given message and public key, this `Field` will represent the Ethereum address derived from that public key. The address itself is 160 bits, which can be comfortably represented within a `Field` element.

## Building Your ECDSA Verification Circuit in Noir

Now, let's construct a Noir circuit (`main.nr`) that uses an `ecrecover` library to verify an ECDSA signature.

```noir
// Import the ecrecover dependency
use dep::ecrecover;

// Define the main function for the circuit
fn main(
    pub_key_x: [u8; 32],       // Private input: x-coordinate of the public key
    pub_key_y: [u8; 32],       // Private input: y-coordinate of the public key
    signature: [u8; 64],       // Private input: ECDSA signature (r and s)
    hashed_message: [u8; 32],  // Private input: Hash of the message
    expected_address: Field    // Private input: The expected address of the signer
) {
    // Call the ecrecover function from the ecrecover package/crate
    // The function is ecrecover::ecrecover (package_name::function_name)
    let address: Field = ecrecover::ecrecover(pub_key_x, pub_key_y, signature, hashed_message);

    // Assert that the recovered address matches the expected address
    assert(address == expected_address, "Address does not match expected address");
}
```

Let's walk through the key steps in creating this circuit:

### Step 1: Importing Dependencies

```noir
use dep::ecrecover;
```

This line imports the `ecrecover` functionality. The `dep` keyword signifies that `ecrecover` is an external dependency, likely defined in your project's `Nargo.toml` file. `ecrecover` here refers to the name of the crate (Noir's term for a package or library). External Noir libraries, like the one we're hypothetically using for `ecrecover`, typically have a `Nargo.toml` file that specifies their type as `type = "lib"`.

### Step 2: Defining the Main Circuit Function

```noir
fn main(
    pub_key_x: [u8; 32],
    pub_key_y: [u8; 32],
    signature: [u8; 64],
    hashed_message: [u8; 32],
    expected_address: Field
) {
    // ... circuit logic ...
}
```
The `main` function is the entry point for our Noir circuit. It declares its inputs:
*   `pub_key_x`, `pub_key_y`: The x and y coordinates of the public key.
*   `signature`: The concatenated `r` and `s` values of the signature.
*   `hashed_message`: The hash of the message being verified.
*   `expected_address`: The Ethereum address we anticipate recovering if the signature is valid.

In Noir, all function inputs are **private** by default. This means they are known only to the prover generating the zero-knowledge proof. If an input needs to be public (known to both prover and verifier), it must be explicitly marked with the `pub` keyword. For this example, all inputs are kept private.

### Step 3: Understanding Noir Data Types

Noir uses specific data types, crucial for defining circuit inputs and variables:

*   **Arrays:** Defined with the syntax `[type; size]`, for example, `[u8; 32]`. A key characteristic of Noir is that arrays must be **statically sized**; their length must be known at compile time.
*   `u8`: Represents an unsigned 8-bit integer, commonly used for byte arrays.
*   `Field`: A fundamental data type in Noir, representing an element of the prime finite field over which the ZK-SNARK's arithmetic is performed. Values like Ethereum addresses (which are 160-bit numbers) can be represented as `Field` elements.
*   `signature: [u8; 64]`: This specific array type is for the 64-byte signature, formed by concatenating the 32-byte `r` value and the 32-byte `s` value. Standard ECDSA signatures often include a 65th byte for the recovery ID (`v`), but as noted, this particular library function expects only `r` and `s`.

### Step 4: Calling the `ecrecover` Function

```noir
let address: Field = ecrecover::ecrecover(pub_key_x, pub_key_y, signature, hashed_message);
```
This line is where the core logic happens. We call the `ecrecover` function from the imported `ecrecover` crate (using the namespace `ecrecover::ecrecover` which translates to `package_name::function_name`). We pass in the public key coordinates, the signature, and the hashed message. The function returns a `Field` element, which we store in the `address` variable. This `address` should be the Ethereum address derived from the public key if the signature is valid.

### Step 5: Constraining the Output

```noir
assert(address == expected_address, "Address does not match expected address");
```
The `assert` statement is fundamental to Noir circuits. It defines a constraint that must hold true for a valid proof to be generated. Here, we assert that the `address` recovered by the `ecrecover` function is equal to the `expected_address` that was provided as an input to our circuit. If these two values do not match, the proof generation process will fail. This is precisely how our circuit verifies that the provided signature corresponds to the expected signer for the given message.

## Key Noir Concepts for ECDSA Circuits

Let's reiterate a couple of important Noir concepts highlighted in this example:

*   **Public vs. Private Inputs:** By default, inputs to a Noir circuit are private, known only to the prover. If an input needs to be part of the public statement verified by the verifier, it must be declared with `pub`. The choice between public and private inputs depends on the specific use case of your ZK circuit.
*   **Static Sizing:** Noir enforces static sizing for arrays. This means the length of any array must be a compile-time constant. This is a common requirement in languages designed for generating arithmetic circuits, as the circuit's structure must be fixed.

## Advanced Considerations: Signature Malleability

While our basic circuit demonstrates `ecrecover` usage, robust ECDSA signature verification in production systems often requires additional checks to prevent **signature malleability**. Signature malleability refers to the possibility that someone could alter a valid signature (`r`, `s`, `v`) into another valid signature for the same message and public key, without knowing the private key. This can sometimes lead to unexpected behavior in protocols.

Common checks to mitigate malleability include:

*   **Verifying the `v` component (recovery ID):** Ensuring `v` corresponds to a specific range (e.g., 27 or 28, or 0 or 1, depending on the convention) or that the `s` value is in the lower half of the elliptic curve's order. Since our Noir `ecrecover` function doesn't explicitly take `v`, these checks would either need to be handled internally by the `ecrecover-noir` library or by how `pub_key_y` is derived and used in conjunction with `r` and `s`.
*   **Checking for a non-zero recovered address:** The `ecrecover` function might return a zero address on failure, so checking that the recovered address is not `0x0` is a good practice.

These checks are similar to those found in battle-tested libraries like OpenZeppelin's ECDSA contracts for Solidity.

**Challenge to the reader:** Can you think about how you might modify this Noir circuit, or what would be required from the `ecrecover-noir` library, to incorporate these malleability checks?

## Conclusion and Next Steps

In this lesson, we've covered the fundamentals of performing ECDSA signature verification within a Noir circuit. We contrasted Solidity's `ecrecover` precompile with the library-based approach in Noir, walked through the implementation of a verification circuit using an external `ecrecover` crate, and touched upon important considerations like signature malleability.

You now have a foundational understanding of how to integrate cryptographic signature schemes into your zero-knowledge proofs using Noir.

**Resources Mentioned:**

*   **Solidity Documentation:** `docs.soliditylang.org` (for information on `ecrecover`)
*   **`ecrecover-noir` GitHub Repository (Example):** `github.com/colinnielsen/ecrecover-noir` (or similar repositories providing Noir ECDSA utilities)

We encourage you to experiment with this circuit, explore the `ecrecover-noir` library further, and consider how you can build more complex ZK applications leveraging this powerful capability.