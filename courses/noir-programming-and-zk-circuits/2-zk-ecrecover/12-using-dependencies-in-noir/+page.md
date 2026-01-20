## Understanding the Goal: Off-Chain Signature Verification with Privacy

This lesson explores how to leverage dependencies within a Noir project to build a circuit for off-chain signature verification. The primary objective is to create a system where a signature can be verified against a message (or its hash) and a public key, without revealing the signer's actual address on-chain. This technique is invaluable for privacy-preserving applications, such as enabling users to claim airdrops privately or prove their membership in a whitelist without publicly disclosing their identity.

The core of this approach lies in structuring the Noir circuit so that while the verifier learns that the signature is valid, sensitive inputs like the signing address can remain private to the prover if designed as such within the circuit's logic.

## Setting Up Your Noir Development Environment

To begin building our Noir circuit, we first need to create a new project. Noir uses the `nargo` command-line tool for project management.

Execute the following command in your terminal to initialize a new project:

```bash
nargo new <project_name>
```

**Important Naming Convention:** Noir project names have a specific constraint: they cannot contain hyphens (`-`). If you need to separate words in your project name, use underscores (`_`) instead.

For instance, attempting to create a project named `zk-ecdsa` will result in an error:

```bash
# This command will fail
nargo new zk-ecdsa
```

The correct way to name this project would be:

```bash
# This command will succeed
nargo new zk_ecdsa
```

Once the project is successfully created, navigate into the newly generated project directory:

```bash
cd zk_ecdsa
```

You can then open this directory in your preferred code editor. For example, if you're using Visual Studio Code, you can use:

```bash
code .
```

## Demystifying Nargo.toml: The Noir Project Manifest

Inside your Noir project directory, you'll find a crucial file named `Nargo.toml`. This file serves as the manifest for your project, analogous to `Cargo.toml` in Rust projects or `package.json` in Node.js projects. It contains essential metadata about your project and, significantly, lists its dependencies.

Let's examine the typical structure of a `Nargo.toml` file:

```toml
[package]
name = "zk_ecdsa"
type = "bin"
authors = ["Your Name"]
# compiler_version = "0.27.0" # Optional: specify compiler version

[dependencies]
# Dependencies will be listed here
```

The `[package]` section includes:
*   `name`: The name of your package (e.g., `"zk_ecdsa"`). This name is also used for generated artifacts like the circuit's bytecode.
*   `type`: Specifies the type of crate. For an executable circuit that can be compiled and proven, this is set to `"bin"`. For libraries intended to be used by other Noir projects, it would be `"lib"`.
*   `authors`: A list of the project's authors.
*   `compiler_version` (optional): You can specify a Noir compiler version to ensure compatibility.

The `[dependencies]` section is where we declare any external libraries (crates) that our project needs to function.

## Adding External Dependencies: The ecrecover Library

To perform Elliptic Curve Digital Signature Algorithm (ECDSA) signature verification, specifically the `ecrecover` operation which recovers a public key (and thus an address) from a signature and message hash, we'll use an external Noir library. For this lesson, we'll integrate the `ecrecover-noir` library.

**Finding and Specifying Dependencies:**
The official Noir documentation (accessible at `noir-lang.org/docs/`) provides guidance on how to manage dependencies under the "Modules, Packages, and Crates" section, specifically within "Dependencies." Noir allows dependencies to be fetched directly from Git repositories.

The general format for specifying a Git dependency in `Nargo.toml` is:

```toml
[dependencies]
dependency_name = { tag = "version_tag", git = "repository_url" }
```

**Adding `ecrecover-noir`:**
Based on an example, we might initially add the `ecrecover-noir` dependency to our `Nargo.toml` like this:

```toml
# In Nargo.toml, under [dependencies]
ecrecover = { tag = "v0.8.0", git = "https://github.com/colinnielsen/ecrecover-noir" }
```

**Crucial Step: Verifying Dependency Versions and Warnings:**
Before proceeding, it is **critical** to check the source repository of any dependency for the latest recommended version, known vulnerabilities, and audit status. This is especially true in the rapidly evolving landscape of zero-knowledge cryptography.

Let's navigate to the `ecrecover-noir` GitHub repository: `https://github.com/colinnielsen/ecrecover-noir`.

Upon reviewing the repository's README, we encounter important advisories:

1.  **Version Warning**: The README explicitly states: "DO NOT use versions of this library < v0.30.0." This is due to a critical vulnerability found in earlier versions. The initial example we used specified `v0.8.0`, which is outdated and unsafe.
    *   **Action**: We must update the `tag` in our `Nargo.toml` to a safe and recommended version. For this lesson, we'll use `v0.30.0` as indicated by the library's documentation at the time of writing.

    Updated `Nargo.toml` entry:
    ```toml
    # In Nargo.toml (updated)
    [dependencies]
    ecrecover = { tag = "v0.30.0", git = "https://github.com/colinnielsen/ecrecover-noir" }
    ```

2.  **Audit Status Warning**: The repository also includes a disclaimer: "This software is unaudited and should not be used in production. Use at your own risk." This highlights that while the library is functional for development and educational purposes, it has not undergone a formal security audit.

**Always prioritize security**: Thoroughly vet dependencies before incorporating them into production systems. For educational contexts like this lesson, we proceed with the understanding of these warnings.

After adding or updating dependencies in `Nargo.toml`, `nargo` will automatically fetch them the next time you build or compile your project (e.g., with `nargo check` or `nargo compile`).

## Integrating Dependencies into Your Noir Circuit

Once a dependency is correctly declared in `Nargo.toml` and fetched by `nargo`, you can import and use its functionalities within your Noir source code, typically located in `src/main.nr`.

The `use` keyword is employed for importing modules from dependencies. To import our `ecrecover` library, we preface the dependency name (as defined in `Nargo.toml`) with `dep::`.

Here's how you would import the `ecrecover` library at the top of your `src/main.nr` file:

```rust
// In src/main.nr

// Import the ecrecover library from our dependencies
use dep::ecrecover; // Semicolon is required

// Default main function (can be modified for our ecrecover logic)
fn main(x: Field, y: pub Field) {
    // Example assertion, will be replaced with ecrecover logic later
    assert(x != y);
}

// Default test function (can be commented out or modified)
// #[test]
// fn test_main() {
//     main(1, 2);
//     // Uncomment to make test fail
//     // main(1, 1);
// }
```

The `dep::` prefix signals to the Noir compiler that `ecrecover` is an external dependency managed by `nargo`. Ensure the `use` statement ends with a semicolon.

With the `ecrecover` library imported, you now have access to its functions and types, allowing you to proceed with implementing the signature verification logic within your `main` function or other helper functions in your circuit. This setup forms the foundation for building more complex, privacy-preserving applications using Noir.

## Essential Resources

For further information and to stay updated, refer to the following resources:

*   **Noir Language Documentation**: `https://noir-lang.org/docs/` (Especially the sections on "Modules, Packages, and Crates" for dependency management).
*   **`ecrecover-noir` GitHub Repository**: `https://github.com/colinnielsen/ecrecover-noir` (For the latest version, issues, and usage guidance for the `ecrecover` library).