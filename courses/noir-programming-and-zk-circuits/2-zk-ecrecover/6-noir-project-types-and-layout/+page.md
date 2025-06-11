## Understanding Your Noir Project Layout

When you embark on a new Noir project, for instance, one named `simple_circuit`, and open it in your preferred code editor like VS Code, you'll encounter a standard file structure. This structure is fundamental to how Noir organizes and builds your zero-knowledge proof programs. The two primary components you'll see are:

*   An `src` folder: This directory is the home for all your Noir source code files (`.nr` files). It's where you'll define the logic of your circuits.
*   A `Nargo.toml` file: This file acts as the manifest for your Noir project. Think of it as the counterpart to `foundry.toml` in Foundry or `Cargo.toml` in Rust. It contains crucial metadata, environment options, and configuration settings for your project.

Understanding these two elements is the first step in mastering Noir development.

## Decoding the `Nargo.toml` Manifest File

The `Nargo.toml` file is central to managing your Noir project's settings and dependencies. It's written in TOML (Tom's Obvious, Minimal Language) format and is typically divided into sections, each serving a distinct purpose.

### The `[package]` Section: Defining Your Project

This section holds metadata about your Noir package. Key fields include:

*   `name`: A string representing the name of your package (e.g., `"simple_circuit"`).
*   `type`: This critical field specifies the type of crate your project is. It dictates how the compiler treats your code and what kind of output it produces. There are three main types:
    *   `"bin"` (binary): This is the default for many examples. Binary crates are designed to be executable programs. They compile into an ACIR (Abstract Circuit Intermediate Representation), which is then used for proof generation. A binary crate **must** contain a `main` function that serves as its entry point.
    *   `"lib"` (library): Library crates are used for creating reusable Noir code. They are not compiled directly into ACIR and do not have a `main` function. Instead, they provide functions, types, and other constructs that can be imported and used by other Noir crates (both binary and library).
    *   `"contract"`: This type is specifically for projects intended for deployment to networks like Aztec. Contract crates also compile to ACIR and can be proven. However, they are structured as a collection of callable functions rather than having a single `main` entry point. (Note: Contract crates are an advanced topic not covered in this introductory course).
*   `authors`: An array of strings listing the project authors (e.g., `["Ciara Nightingale"]`).

Other optional fields you might encounter or use include `compiler_version` (to specify a Noir compiler version), `description`, `main` (to specify an alternative entry point file, which defaults to `src/main.nr`), and `license`.

Here's an example of what the `[package]` section might look like:

```toml
[package]
name = "simple_circuit"
type = "bin"
authors = ["Ciara Nightingale"]
# compiler_version = "0.19.0"
# description = "A simple example Noir circuit."
# license = "Apache-2.0"
```

### The `[dependencies]` Section: Managing External Code

As your Noir projects grow in complexity, you'll often want to leverage external libraries or packages created by others or by yourself. The `[dependencies]` section is where you declare these.

Dependencies are typically specified with a source, most commonly a Git repository, along with a specific tag, branch, or commit hash to ensure version consistency.

For comprehensive details on how to specify various types of dependencies, refer to the official Noir documentation at `noir-lang.org/docs/noir/modules_packages_crates/dependencies`.

**Example: Adding an `ecrecover` Dependency**

Imagine you need to incorporate functionality for `ecrecover` (a cryptographic operation often used for verifying signatures without revealing the signer's private key, similar to features found in advanced Foundry development). You would add this dependency to your `Nargo.toml` file like so:

```toml
[dependencies]
ecrecover = { tag = "v0.8.0", git = "https://github.com/colinnielsen/ecrecover-noir" }
```
This example demonstrates fetching the `ecrecover-noir` library from a GitHub repository, specifically using the version tagged `v0.8.0`. Nargo will then fetch and compile this dependency for use in your project.

## Inside the `src` Directory: Your Noir Code

The `src` directory is where the magic happens – it houses all your Noir source code files (files with the `.nr` extension). The structure and content of these files depend heavily on the `type` specified in your `Nargo.toml`.

For a **binary crate** (i.e., when `type = "bin"` in `Nargo.toml`), your `src` directory must contain an entry point file. By default, this file is named `main.nr`.

### The `main.nr` File: Entry Point for Binary Crates

The `main.nr` file (or an alternative file specified in `Nargo.toml`) serves as the primary entry point for your Noir program if it's a binary crate. Its most crucial requirement is that it **must contain a `main` function**. This `main` function is special: it defines the circuit whose satisfiability you intend to prove. All computations and constraints that form your ZK-SNARK circuit are typically rooted in this function.

A simple `main.nr` file might look like this upon project creation:

```noir
// src/main.nr
fn main(x: Field, y: pub Field) {
    // Constraint: x must not be equal to y
    assert(x != y);
}

// A simple test case for the main function
#[test]
fn test_main() {
    // Call main with x = 1 (private) and y = 2 (public)
    main(x: 1, y: 2);

    // To see a test fail due to the assertion, uncomment the following:
    // main(x: 1, y: 1);
}
```
In this example, the `main` function takes two inputs: `x`, a private input of type `Field`, and `y`, a public input also of type `Field`. The core logic of this circuit is the `assert(x != y);` statement, which constrains the circuit such that `x` and `y` must be different for a valid proof to be generated. The file also includes a basic test function, `test_main`, to verify the circuit's logic.

## Understanding Noir Crates and Their Purpose

In Noir, a **crate** is the smallest unit of code that the compiler processes at one time. A crate typically corresponds to the contents of your `src` directory and any dependencies it pulls in. Crates can contain modules (which we'll discuss shortly) to help organize code. The `type` field in `Nargo.toml` determines the kind of crate you are building.

### Binary Crate (`type = "bin"`)

*   **Purpose:** Designed to be compiled into an executable form, specifically an **ACIR circuit**.
*   **Output:** ACIR, from which proofs can be generated and subsequently verified.
*   **Requirement:** **Must** have a `main` function that serves as the entry point for the circuit logic.
*   **Usage:** This is the primary type of crate you will work with when developing circuits for proving specific computations. This course will focus heavily on binary crates.

### Library Crate (`type = "lib"`)

*   **Purpose:** Intended for creating reusable code—collections of functions, custom types, constants, etc.—that can be shared across multiple Noir projects.
*   **Output:** Does **not** compile directly to ACIR and cannot be proven on its own.
*   **Requirement:** Does **not** have a `main` function.
*   **Usage:** Ideal for abstracting common functionalities into a shareable package. For example, you might create a library of common cryptographic primitives or data structures. Other binary or library crates can then import and use this library.

### Contract Crate (`type = "contract"`)

*   **Purpose:** Specifically designed for Noir programs that will be deployed as smart contracts on blockchain environments like the Aztec Network.
*   **Output:** Compiles to ACIR, and proofs can be generated for its functions.
*   **Requirement:** Does **not** have a single `main` function. Instead, it's structured as a collection of public functions that can be called individually.
*   **Usage:** Used for on-chain applications where different functions of the contract represent different provable operations.
*   **Note:** This crate type involves concepts beyond the scope of an introductory Noir course and will not be covered in detail here.

## Organizing Code with Modules in Noir

Noir provides a module system, similar to Rust's, for organizing your codebase. As your projects grow, you'll likely want to split your code into multiple `.nr` files to keep things manageable and group related functionalities.

*   Modules allow you to define distinct namespaces and control the visibility of items (functions, types, etc.).
*   This significantly improves code organization, readability, and maintainability, especially for larger and more complex circuits.
*   Even when your code is distributed across several modules and files within the `src` directory, it's all compiled together as part of the single crate defined by your `Nargo.toml`.
*   For binary crates, the `main` function in your entry point file (`main.nr` by default) remains the ultimate starting point for the circuit, even if it calls functions from other modules.

The specifics of creating and using modules, including how to import items from one module into another, will be covered in more detail in a later lesson.

## Key Principles for Noir Project Development

To effectively develop Noir programs, keep these core concepts and their relationships in mind:

*   **`Nargo.toml` is Your Control Panel:** This file defines your project's identity, its type (which is crucial), and its dependencies. Always start here when setting up or understanding a Noir project.
*   **Crate Type Dictates Behavior:** The `type` field (`"bin"`, `"lib"`, or `"contract"`) in `Nargo.toml` fundamentally changes how Noir compiles and treats your code.
    *   For circuits you want to prove, you'll almost always use `type = "bin"`.
    *   For reusable code, `type = "lib"` is the way to go.
*   **`main` Function is King for Binary Crates:** If you're building a `bin` crate, the `main` function within your `src/main.nr` (or specified entry point) is non-negotiable. It defines the entire circuit to be proven.
*   **Modules for Sanity:** As projects grow, use modules to organize your code logically within a crate.
*   **ACIR is the Goal for Proving:** Noir code (specifically from binary and contract crates) compiles down to ACIR (Abstract Circuit Intermediate Representation). This ACIR is what proof systems use to generate actual zero-knowledge proofs.

**Important Considerations for This Course:**

*   Our primary focus throughout this course will be on developing **binary crates** (`type = "bin"`). These are the crates that directly result in provable circuits.
*   Any Noir code representing the logic you intend to prove must eventually be part of a binary crate's compilation, typically originating from or being called by its `main` function.
*   To ensure the Noir compiler treats your project as an executable circuit ready for proving, always set `type = "bin"` in your `Nargo.toml` file.

By understanding these foundational aspects of Noir project structure, configuration, and code organization, you're well-equipped to start writing your own zero-knowledge circuits.