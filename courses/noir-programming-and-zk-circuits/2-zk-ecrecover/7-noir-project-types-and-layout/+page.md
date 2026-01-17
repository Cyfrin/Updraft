## Noir Project Types and Layout

When you begin working with a Noir project, your first step is often to open it in your preferred code editor. For instance, if you're in your project directory (e.g., `simple_circuit`) in the terminal, you can open it in Visual Studio Code (VS Code) using the command:
```bash
code ./
```
Upon opening, you'll immediately notice two primary items in your project's file explorer: a directory named `src` and a configuration file named `Nargo.toml`. These are the foundational pieces of any Noir project.

### The `Nargo.toml` Configuration File: Your Project's Blueprint
The `Nargo.toml` file is central to managing your Noir project. It's analogous to `foundry.toml` in the Foundry ecosystem for Solidity development or `Cargo.toml` in Rust. This file contains essential environment options, metadata, and dependency configurations for your Noir package.

Let's break down its typical structure:

**The `[package]` Section: Defining Your Crate**
This section holds metadata about your Noir package. Key fields include:

*   **`name`**: A string representing the name of your package. For example:
    ```toml
    name = "simple_circuit"
    ```
*   **`type`**: This field specifies the kind of crate you are building. Noir supports three main types:
    *   `"bin"` (binary): This type is for executable programs that compile down to an ACIR (Abstract Circuit Intermediate Representation) circuit. This is the most common type for building ZK circuits and will be our primary focus.
    *   `"lib"` (library): Used for creating reusable Noir code that can be shared across different projects. Libraries themselves do not compile to ACIR.
    *   `"contract"`: Specifically designed for smart contracts intended for deployment on networks like Aztec. These also compile to ACIR but have a different structural paradigm.
    For now, we will be working with `"bin"` type crates.
*   **`authors`**: An array of strings listing the package authors. Initially, it might be empty, but you can update it like so:
    ```toml
    authors = ["Ciara Nightingale"]
    ```
*   **Other Optional Fields**: The `[package]` section can also include other optional details such as the compiler version, a description of the package, the license, and specification of the main entry point (which defaults to the `src` directory).

An example `[package]` section might look like this after initialization and a slight modification:
```toml
[package]
name = "simple_circuit"
type = "bin"
authors = ["Ciara Nightingale"]
```

**The `[dependencies]` Section: Managing External Code**
Just like any modern programming language, Noir allows you to incorporate external libraries (or "crates") into your project. The `[dependencies]` section in `Nargo.toml` is where you declare these.

To understand how to add dependencies, the official Noir documentation is an excellent resource (specifically, the page on "Dependencies" at `noir-lang.org/docs/noir/modules_packages_crates/dependencies`).

For instance, if you needed to add a library for `ecrecover` functionality (useful for signature verification, similar to its use in Ethereum development, but here with the potential for privacy), the documentation would guide you to add something like this:
```toml
[dependencies]
ecrecover = { tag = "v0.8.0", git = "https://github.com/colinnielsen/ecrecover-noir" }
```
This specifies the dependency name (`ecrecover`), a version tag, and the Git repository URL. For a simple circuit, such a dependency might not be necessary and can be omitted. A project without external dependencies would simply have an empty `[dependencies]` section:
```toml
[dependencies]
# Dependencies will be listed here
```

### Enhancing Your Workflow: The Noir Language Support VS Code Extension
For a significantly improved development experience with Noir in Visual Studio Code, it's highly recommended to install the "Noir Language Support" extension. Published by `noir-lang`, this extension offers several benefits:

*   **Syntax Highlighting**: Makes your Noir code easier to read and understand.
*   **Compile Errors and Warnings**: Provides real-time feedback by showing errors and warnings directly in your editor when you save a file.
*   **Test Execution via Codelens**: Allows you to run tests with clickable links that appear above your test functions in the code.
*   **Useful Snippets**: Offers pre-defined code templates for common Noir patterns, speeding up development.
*   **Auto-Format on Save**: Automatically formats your code according to Noir conventions when you save, ensuring consistency.

Having this extension installed streamlines the development process considerably.

### The Heart of the Circuit: The `src` Directory and `main.nr` File
The `src` directory is where your actual Noir circuit logic resides. By convention, for a binary (`"bin"`) crate, the main entry point for your program is a file named `main.nr` located inside this `src` folder.

This `main.nr` file typically contains a `main` function, which defines the core logic of your circuit. Let's examine a simple `main.nr` example:

```noir
fn main(x: Field, y: pub Field) {
    assert(x != y);
}

#[test]
fn test_main() {
    main(x: 1, y: 2);

    // Uncomment the line below to see the test fail
    // main(1, 1);
}
```

Let's break this down:
*   `fn main(x: Field, y: pub Field)`: This declares the main function of our circuit.
    *   `x: Field`: This is a private input to the circuit. Its value will be known to the prover but not necessarily to the verifier or the public. `Field` represents an element in the finite field underlying the ZK-SNARK.
    *   `y: pub Field`: This is a public input to the circuit. Its value is known to both the prover and the verifier. The `pub` keyword designates it as such.
    *   `assert(x != y);`: This line defines a constraint within the circuit. It asserts that the private input `x` must not be equal to the public input `y`. If this condition is not met for a given set of inputs, proof generation will fail.

*   `#[test] fn test_main() { ... }`: This is a test function, annotated with `#[test]`. Noir has a built-in testing framework.
    *   `main(x: 1, y: 2);`: This line calls the `main` function with `x` set to `1` and `y` set to `2`. Since `1 != 2`, the `assert` condition passes, and this test case would succeed.
    *   The commented-out line, `// main(1, 1);`, demonstrates a failing case. If uncommented, `x` and `y` would both be `1`, causing the `assert(x != y)` to fail.

### Noir Crate Types Explained in More Detail
We've touched upon crate types in the `Nargo.toml` section, but let's delve deeper. A **crate** in Noir is the smallest unit of code that the Noir compiler considers at a time. It's a package that can contain various modules (which we'll discuss shortly) and compiles into either an executable circuit or a reusable library.

*   **Binary Crates (`bin`)**:
    *   These are designed to be compiled into an ACIR (Abstract Circuit Intermediate Representation). ACIR is the format from which zero-knowledge proofs can be generated.
    *   A binary crate *must* contain a `main` function, typically located in `src/main.nr`. This function serves as the entry point for the circuit.
    *   All circuit files and logic that you intend to prove must be accessible from this main entry point.
    *   This course will primarily focus on building binary crates.

*   **Library Crates (`lib`)**:
    *   Libraries are collections of reusable Noir code. They do *not* have a `main` function and, consequently, do not compile directly into ACIR.
    *   Their purpose is to provide functionalities that can be imported and used by other Noir crates (both binary and other library crates).
    *   Think of them as similar to libraries in Solidity or other programming languages, allowing you to modularize your code and promote reusability.

*   **Contract Crates (`contract`)**:
    *   This is the third type of crate, specialized for developing smart contracts, particularly for deployment on the Aztec Network.
    *   Like binary crates, contract crates compile down to ACIR.
    *   However, instead of a single `main` function, they typically consist of a collection of functions that define the contract's interface and logic.
    *   *Note: Contract crates are an advanced topic and will not be covered in this particular course.*

### Organizing Your Code: An Introduction to Modules
As your Noir projects grow in complexity, you'll want ways to organize your code beyond a single `main.nr` file. Noir provides a module system, which closely mirrors Rust's module system.

Modules allow you to:
*   Group related functionalities into separate files (e.g., `utils.nr`, `parsers.nr`).
*   Control the visibility and scope of items (functions, structs, etc.).
*   Improve code maintainability and readability.

Even if you split your code into multiple `.nr` files (modules), these modules would typically be imported and utilized within the file containing the `main` function (for binary crates) to ensure they are part of the circuit being compiled. We will explore the practical use of modules as we progress to more complex examples.

### Recap: Tying It All Together
To summarize, the `simple_circuit` project we've examined is a **binary crate**. This is explicitly defined by the `type = "bin"` setting in its `Nargo.toml` file.

Key characteristics of this setup include:
*   A `main` function located in `src/main.nr`, which serves as the entry point for the circuit logic.
*   The entire project is designed to compile down to ACIR, which is the necessary intermediate step for generating zero-knowledge proofs.

This structure—a binary crate with a `main.nr` file—is fundamental for writing Noir programs that you intend to compile into provable circuits. Understanding this layout is the first step towards building powerful ZK applications with Noir.