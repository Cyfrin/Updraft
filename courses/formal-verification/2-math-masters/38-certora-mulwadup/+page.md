---
title: Certora - mulWadup
---

---


### Setting Up Certora for Formal Verification

In this lesson, we'll explore how to use Certora for formal verification, focusing on setting up the environment and preparing our verification files. We'll begin by organizing our project structure and then delve into creating necessary files for our verification process.

### Organizing the Project Structure

Inside the repository associated with this course, you'll find a `Certora` folder located within the `tests` directory. It's common practice to create a new folder directly in the root directory for specific files related to formal verification. We will follow a similar approach by setting up a dedicated directory for our Certora files.

### Creating Configuration and Specification Files

The next step involves creating two essential files:
1. **MulWadUp.conf:** This file contains the configuration settings for our verification process. To save time and ensure consistency, we'll reuse and modify an existing configuration file of SC exploits minimizd. We simply copy and paste the existing configuration and make necessary adjustments specific to our project.

2. **MulWapUp.spec:** This is where we write the formal verification specifications. Starting with a template or a previously used spec file can streamline this process. We'll initially clear out the contents and prepare to input our specific verification rules. 


### Writing the Verification Specification

In our specification file, we begin with a brief Natspec comment at the top, describing the purpose of the file: `verification of MulWadUp for MathMasters`. Then, we convert the existing functions from our Foundry project into Certora’s format. While Certora uses its own Certora Verification Language (CVL), much of the foundational work can be adapted from our existing Solidity code.

### Rule Definition
We transform a typical Solidity function into a Certora rule, removing modifiers like `public` or `pure`, which are not necessary in CVL. Instead, we focus on defining the inputs and outputs, ensuring that they match the intended logic.

### Dealing with Internal Functions
A significant challenge arises when dealing with internal functions, which cannot be directly verified. To circumvent this, we introduce a "harness contract." This contract acts as a wrapper around our library, exposing internal functions as external ones that Certora can interact with for verification purposes.

### Harness Contract
We create a new Solidity file, possibly named `CompactCodeBase.sol` or simply `harness.sol`. This contract imports `MathMasters.sol` and includes a function that mimics the internal function we wish to verify, but as an external function.

### Compiling and Verifying the Harness Contract
Once our harness contract is ready, we compile it to ensure there are no syntax errors. If the compilation is successful, we proceed to verify this harness contract instead of the original `MathMasters.sol`. This approach allows us to formally verify the behavior of internal functions within a controlled environment.

