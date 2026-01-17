## Setting Up Your Foundry Project for ZK-SNARK Integration

This lesson will guide you through the initial setup of a Foundry project, specifically preparing it to integrate a ZK-SNARK verifier smart contract. We'll cover creating the project, organizing files, and understanding a critical workflow when dealing with ZK-SNARK circuit updates.

Our goal is to establish a clean and organized Solidity development environment within Foundry, ready for you to build smart contracts that can leverage zero-knowledge proofs.

### 1. Creating the Project Directory

First, we need a dedicated space for our Solidity contracts. Assuming you are in a parent directory, perhaps one that already contains your ZK-SNARK project (e.g., a `zk_panagram` directory with a `main.nr` Noir circuit file), we will create a new subdirectory for our Foundry project.

Open your terminal and execute the following commands:

```bash
mkdir contracts
cd contracts
```
This creates a new directory named `contracts` and then navigates your terminal session into it. This `contracts` directory will house our entire Foundry project.

### 2. Initializing the Foundry Project

Now, within the `contracts` directory, we'll initialize a new Foundry project. Foundry is a powerful toolkit for Ethereum application development, and its `forge init` command sets up a standard project structure.

Execute the command:

```bash
forge init
```

You'll see output in your terminal indicating that Foundry is installing `forge-std` (the standard library for Foundry) and setting up the project. Once completed, your `contracts` directory will now contain the standard Foundry project structure:

*   `.github`
*   `lib` (containing `forge-std`)
*   `script`
*   `src`
*   `test`
*   `.gitignore`
*   `.gitmodules`
*   `foundry.toml`
*   `README.md`

The `src` folder is where our Solidity source files will reside, `script` for deployment scripts, and `test` for our contract tests.

### 3. Cleaning Up Default Foundry Files

The `forge init` command creates some default example files: `Counter.s.sol` in `script`, `Counter.sol` in `src`, and `Counter.t.sol` in `test`. To start with a completely clean slate for our ZK-SNARK project, we will delete these default files.

Remove the following files from your project:

*   `contracts/script/Counter.s.sol`
*   `contracts/src/Counter.sol`
*   `contracts/test/Counter.t.sol`

This ensures we are not mixing example code with our specific application logic.

### 4. Relocating the ZK-SNARK Verifier Contract

A key component of an on-chain ZK-SNARK system is the verifier smart contract. This contract is typically auto-generated from your ZK-SNARK circuit compilation process (e.g., by tools like Nargo if you are using Noir).

You will likely find this verifier contract, often named `Verifier.sol`, within a `target` directory in your ZK-SNARK project (e.g., `zk_panagram/target/Verifier.sol`).

We need to move this `Verifier.sol` file into our Foundry project's source directory. Relocate `Verifier.sol` from its original location (e.g., `zk_panagram/target/Verifier.sol`) into the `contracts/src/` folder.

After this action, your `Verifier.sol` should now be located at `contracts/src/Verifier.sol`. This keeps all our smart contract source code neatly organized within the Foundry project.

### 5. Critical Workflow: Handling ZK-SNARK Circuit Changes

This is a fundamentally important step to understand when working with ZK-SNARKs and smart contracts:

**Anytime you modify your underlying ZK-SNARK circuit (e.g., the `main.nr` file), you must regenerate and update your verifier contract.**

The workflow is as follows:
1.  **Delete the old `target` folder** in your ZK-SNARK project directory. This folder contains the outdated compiled circuit artifacts.
2.  **Re-compile your ZK-SNARK circuit.**
3.  **Re-generate the verification key** for the updated circuit.
4.  **Re-generate the `Verifier.sol` smart contract** using the new circuit and verification key.
5.  **Move this newly generated `Verifier.sol`** back into your Foundry project's `contracts/src/` folder, replacing the old one.

Failure to follow these steps will result in your Solidity smart contract using an outdated verifier, which will not correctly verify proofs generated from your updated circuit. This dependency is crucial for the correctness of your ZK-SNARK integration.

### 6. Creating Your Main Application Contract

With the verifier contract in place, let's create a new Solidity file for our main application logic. This contract will likely interact with the `Verifier.sol` to verify proofs.

Inside the `contracts/src` directory, create a new file named `Panagram.sol`.

### 7. Adding Initial Code to `Panagram.sol`

We'll start `Panagram.sol` with the standard Solidity boilerplate: an SPDX license identifier and the pragma solidity version.

Open `Panagram.sol` and add the following lines:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;
```

The `SPDX-License-Identifier: MIT` declares the contract as open source under the MIT license. The `pragma solidity ^0.8.24;` line specifies that the contract is compatible with Solidity compiler versions 0.8.24 and any later patch versions up to, but not including, 0.9.0.

Your Foundry project is now set up, your verifier contract is integrated, and you have a new application contract ready for development. You understand the critical workflow for updating your verifier when your ZK-SNARK circuit changes. The next steps will involve writing the logic within `Panagram.sol` to interact with this verifier and implement your application's features.