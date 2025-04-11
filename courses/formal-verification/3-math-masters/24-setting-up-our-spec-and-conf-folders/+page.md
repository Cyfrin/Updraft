---
title: Setting up our spec and conf folders
---

---

### Getting Started with Certora Verification

Now that we have our API key, we're ready to dive into writing our first formal verification proof using Certora's Verification Language (CVL). We'll start with a minimal example to understand the basics of the Certora Prover, focusing initially on a function called `hellFunc`. Our goal is to demonstrate how to set up and use Certora to detect potential bugs, similar to what we might find in a square root function. Let's get started with setting up the necessary environment and files for our Certora formal verification.

### Creating the Environment for Certora Formal Verification

1. **Project Folder Structure**:
   - Navigate to the root of your project directory.
   - Create a new folder named `Certora` to house our verification files. Normally, this would be at the root, but for our example, we'll place it under an `invariant break` folder.
   - Inside the `Certora` folder, create another folder called `specs` where we will store our specification files.

2. **Writing Specifications**:
   - In the `specs` folder, create a new file named `FvcatchesSpec`. This file will contain the rules and invariants needed for verification.
   - If using Visual Studio Code, consider installing the Certora Verification Language extension for better syntax highlighting and file formatting.

### Defining Rules and Invariants in CVL

1. **Introduction to CVL**:
   - CVL, or Certora Verification Language, is a domain-specific language used in formal verification, similar to Solidity but with additional features tailored for formal methods.

2. **Specifying Invariants and Rules**:
   - Start by defining an invariant for our `hellFunc` function. The invariant might be something like "hellFunc must never revert," which asserts that under no conditions should the function revert.
   - Write this specification directly in the `FvcatchesSpec` file, using CVL syntax to outline the expected behavior and constraints.

3. **Understanding the Difference Between Rules and Invariants**:
   - **Rules**: These are sequences of commands simulated during verification to test specific conditions or sequences of actions. They can be described as procedural checks, such as "If X and Y occur, then Z must hold."
   - **Invariants**: These describe a state or property of the system that must always hold true, regardless of the system's state or the actions performed.

### Configuring the Verification Environment

1. **Setup Configuration File**:
   - Create another folder within `Certora` named `comp` and add a configuration file, typically named something like `fvches.com`.
   - This configuration file includes parameters and settings for the Certora Prover, specifying the files to be verified and any other necessary flags or commands.

2. **Running the Prover**:
   - The actual command to run the Certora Prover would be `certoraRun`, which will use the details specified in your configuration file.
   - The setup in `fvches.com` will detail the files to include, the specific contracts to verify, and the specifications to use for this verification.

