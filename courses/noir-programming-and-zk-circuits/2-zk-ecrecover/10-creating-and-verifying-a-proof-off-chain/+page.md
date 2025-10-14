This lesson provides a step-by-step guide on creating and verifying Zero-Knowledge (ZK) proofs entirely off-chain. We will utilize Noir, a specialized language for writing ZK circuits, and its accompanying command-line tools, along with the Barretenberg backend for proving and verification.

## Validating Your Noir Code with `nargo check`

The first step in ensuring your Noir circuit is well-constructed is using the `nargo check` command. This command performs static analysis on your Noir source code.

**Purpose:**
`nargo check` is designed to:
*   Verify the correct usage of variables and their types.
*   Check for syntactic correctness throughout your code.
*   Ensure that functions and circuits are well-formed.
*   Resolve and check dependencies.

**Benefit:**
This command offers a rapid way to identify potential issues early in the development cycle. By running `nargo check`, you can catch errors without needing to go through the more time-consuming processes of compiling the circuit, generating a proof, or attempting to verify it. This is especially beneficial after refactoring code or implementing changes.

**Important Note:**
It's crucial to understand that `nargo check` does *not* compile your Noir code into an Arithmetic Circuit Intermediate Representation (ACIR). Furthermore, it does not execute the circuit or generate any proofs. Its sole focus is static analysis.

**Command:**
To execute the check, navigate to your Noir project directory in your terminal and run:
```bash
nargo check
```

**Side Effect: `Prover.toml` Generation/Update**
When `nargo check` is executed, it has an important side effect concerning the `Prover.toml` file. If this file does not already exist in your project, or if the parameters defined in your main circuit file (e.g., `main.nr`) have changed since the last run, `nargo check` will either generate a new `Prover.toml` or update the existing one. This file serves as a template for specifying the inputs to your circuit.

## Specifying Circuit Inputs via `Prover.toml`

The `Prover.toml` file plays a critical role in the ZK proof workflow when using the Noir command-line interface.

**Purpose:**
This TOML (Tom's Obvious, Minimal Language) file is where you define the concrete input values—both private and public—that will be fed into your circuit during execution and proof generation.

**Example Content:**
Initially, after `nargo check` generates it for a circuit with inputs `x` and `y`, `Prover.toml` might look like this:
```toml
x = ""
y = ""
```

Consider a simple example circuit defined in `src/main.nr` that asserts two inputs, `x` (private) and `y` (public), are not equal:
```noir
// src/main.nr
fn main(x: Field, y: pub Field) { // y is a public input
    assert(x != y);
}
```
To provide valid inputs for this circuit, you would modify `Prover.toml` as follows:
```toml
// Prover.toml
x = "2"
y = "3"
```
In this configuration, `x` will be treated as the private input with a value of `2`, and `y` will be the public input with a value of `3`.

## Compiling and Executing Your Circuit with `nargo execute`

Once your Noir code is validated and inputs are defined, the `nargo execute` command comes into play.

**Purpose:**
`nargo execute` performs two primary functions:
1.  **Compilation:** It compiles your Noir circuit source code into an Arithmetic Circuit Intermediate Representation (ACIR). ACIR is a low-level representation of your circuit's logic.
2.  **Execution & Witness Generation:** It then executes this compiled ACIR using the input values specified in your `Prover.toml` file. This execution generates a **witness**.

**Witness:**
The witness is a crucial piece of data. It comprises all the intermediate values and variable assignments within the circuit that collectively satisfy all of its constraints, given the specific inputs you provided.

**Note on `nargo compile`:**
While Noir offers a `nargo compile` command, you do not need to run it separately if your goal is to use `nargo execute`. The compilation step is inherently part of `nargo execute`. However, `nargo compile` can be used independently if you only require the ACIR (e.g., for tasks like generating a Solidity verifier contract) without needing to execute the circuit or generate a proof at that moment.

**Command:**
To compile and execute your circuit, run:
```bash
nargo execute
```

**Output:**
Upon successful execution, this command creates a `target` directory in your project. Inside this directory, you will find:
*   `your_circuit_name.json` (e.g., `simple_circuit.json`): This JSON file contains the compiled ACIR, which includes the circuit's bytecode and its Application Binary Interface (ABI).
*   `your_circuit_name.gz` (e.g., `simple_circuit.gz`): This is a compressed file containing the generated witness.

The terminal will also provide confirmation, similar to this:
```
[simple_circuit] Circuit witness successfully solved
[simple_circuit] Witness saved to /path/to/your/project/target/simple_circuit.gz
```

## Generating Zero-Knowledge Proofs with `bb prove`

With the compiled circuit (ACIR) and the witness generated, you can now produce an actual Zero-Knowledge proof. This is done using the `bb prove` command, which leverages Barretenberg as the proving backend.

**Purpose:**
The `bb prove` command takes the ACIR and the witness as inputs and constructs a ZK proof that cryptographically demonstrates the circuit's constraints were satisfied for the given inputs, without revealing any private inputs.

**Command:**
The command structure is as follows:
```bash
bb prove -b ./target/your_circuit_name.json -w ./target/your_circuit_name.gz -o ./target/proof
```
*   `-b`: Specifies the path to the compiled circuit bytecode (the `.json` ACIR file).
*   `-w`: Specifies the path to the witness file (the `.gz` file).
*   `-o`: Specifies the output path where the generated proof file will be saved. The command will create a file typically named `proof`.

**Output:**
A file named `proof` (or as specified by the `-o` flag) is created in the `./target/` directory. The terminal output will also provide details about the proving process, such as the proving scheme used (e.g., `ultra_honk` for UltraPlonk) and the circuit size.

## Creating a Verification Key using `bb write_vk`

Before any ZK proof can be verified, a Verification Key (VK) specific to that circuit must be generated.

**Purpose:**
The Verification Key is a compact cryptographic object. It enables a verifier to check the validity of a proof for a particular circuit without needing access to the full circuit logic or the private witness data.

**Note:**
The VK is generated once from the compiled circuit's ACIR. It is inherently dependent on the circuit's structure; if you modify the circuit's logic, the VK must be regenerated.

**Role Separation:**
In a typical ZK system, the prover generates the proof. The verifier, on the other hand, would either generate or already possess the VK corresponding to the specific circuit for which they expect to receive proofs.

**Command:**
To generate the Verification Key:
```bash
bb write_vk -b ./target/your_circuit_name.json -o ./target/vk
```
*   `-b`: Path to the compiled circuit bytecode (the `.json` ACIR file).
*   `-o`: Output path where the verification key will be saved. This command will create a file named `vk` (or as specified) in the target directory (e.g., `./target/`).

**Output:**
A file named `vk` is created in the `./target/` directory.

## Verifying Proofs Off-Chain with `bb verify`

The final step in this off-chain workflow is to verify the generated proof.

**Purpose:**
The `bb verify` command checks whether a given proof is valid for a specific circuit. This verification is performed using the circuit's previously generated Verification Key.

**Command:**
To verify a proof:
```bash
bb verify -k ./target/vk -p ./target/proof
```
*   `-k`: Specifies the path to the Verification Key file.
*   `-p`: Specifies the path to the proof file you want to verify.

**Output:**
If the proof is valid and corresponds correctly to the circuit represented by the VK, the terminal will display a success message:
```
Proof verified successfully
```

## Key Workflow Considerations and Best Practices

To ensure a smooth and error-free development experience with Noir and Barretenberg, keep the following tips in mind:

*   **Deleting the `target` Directory:** If you make any modifications to your Noir circuit in `main.nr` (or other source files) or change the input values in `Prover.toml`, it is highly recommended to delete the entire `target` directory. This action forces all subsequent commands (`nargo execute`, `bb prove`, `bb write_vk`) to use freshly generated artifacts (ACIR, witness, proof, VK), preventing issues caused by stale or mismatched components.
*   **Regenerating `Prover.toml`:** If you alter your circuit's parameters in `main.nr`—for instance, by adding, removing, or renaming inputs—you should delete the existing `Prover.toml` file. Afterward, run `nargo check` again. This will generate a new `Prover.toml` template that accurately reflects the updated circuit definition, which you can then populate with new input values.
*   **Understanding Prover vs. Verifier Roles:** While this lesson guides you through performing all steps (proving and verifying), in a real-world distributed application:
    *   The **Prover** entity would possess the circuit definition and their private inputs. They would run `nargo execute` (or an equivalent process) to generate the witness and then `bb prove` to create the ZK proof.
    *   The **Verifier** entity would have access to the compiled circuit's ACIR (or, more minimally, just the Verification Key derived from it). If they don't already have the VK, they might run `bb write_vk` once. Their primary role is to execute `bb verify` using the proof received from the prover and their copy of the VK.

## Handling Circuit and Input Modifications

Let's illustrate how the workflow adapts to changes. Suppose you modify your circuit's assertion. For example, changing the assertion in `main.nr` from `assert(x != y);` to `assert(x == y);`.

To make this new circuit provable, you would also need to update your `Prover.toml` file to provide inputs that satisfy this new condition. For instance:
```toml
// Prover.toml
x = "3"
y = "3"
```
After making these changes to both `main.nr` and `Prover.toml` (and, ideally, deleting the `target` directory to ensure a clean slate), you would repeat the standard workflow:
1.  `nargo execute` (which implicitly runs `nargo check` if `Prover.toml` needed regeneration based on parameter changes in `main.nr`, then compiles and generates the witness).
2.  `bb prove` (to generate a new proof based on the new circuit and witness).
3.  `bb write_vk` (to generate a new verification key for the modified circuit).
4.  `bb verify` (to verify the new proof against the new verification key).

If the inputs correctly satisfy the new circuit logic, the proof will still verify successfully.

## Sharing Your Success and Advancing Your Noir Journey

Successfully creating and verifying your first ZK proof off-chain is a significant milestone. You are encouraged to share your experience and progress, for example, on platforms like Twitter/X. For those following structured courses, resources such as associated GitHub repositories (e.g., [`github.com/Cyfrin/noir-programming-and-zk-circuits-cu`](https://github.com/Cyfrin/noir-programming-and-zk-circuits-cu) under a section like "Creating and Verifying a Proof Off-chain") may provide links or guidance for sharing.

**Next Steps:**
This comprehensive off-chain process provides a robust development and testing environment. Future lessons will build upon this foundation, exploring topics such as:
1.  Utilizing dependencies within Noir to perform more complex operations, like verifying a digital signature off-chain using a ZK proof.
2.  Demonstrating how to verify a ZK proof on-chain by generating and interacting with a Solidity verifier smart contract produced by Noir.

By mastering these off-chain tools and workflows, you are well-equipped to develop, test, and debug ZK circuits efficiently before considering on-chain deployment and verification.
