---
title: Installing Certora and solc-select
---

---

### Writing Your First Rule with Certora

**Creating the Rule**
- Begin by using the `rule` keyword.
- Establish the invariant: `hellFunc must never revert`, irrespective of the input parameters.
- Just like in foundry testing, specify parameters akin to those used in fuzzing.
**Understanding the Verification Process**
- Unlike typical testing that inputs random numbers, formal verification transforms these numbers into symbolic expressions.
- The transformation involves converting the code into a mathematical format (e.g., `x + y = z`).

**Using the Assert Command**
- To check for reverts, use the `assert` command.
- Example: Typing `assert true;` should always pass as it's a basic truth check.
- This simple assertion serves as the foundational rule for initial testing.

### Setting Up Certora CLI

**Installation Steps**
1. **Accessing the Required Tools**:
   - Ensure Python and pip (preferably pip3) are installed since Certora is a Python package.
   - Although `pipx` is recommended for a more isolated installation, `pip3` can also be used based on personal preference.

2. **Installing Certora Prover Package**:
   - Use the command `pip install certora-cli` (link available in the associated GitHub repo).
   - Alternative for a more isolated setup: `pipx install certora-cli`.

3. **Configuring the Environment**:
   - Export your Certora key as an environment variable using: `export certora_key=<your_key>`.
   - Ensure the environment supports this setup (e.g., WSL, macOS, Linux).
   - Maintain the key by re-exporting it every time the shell is restarted.

4. **Utilizing Certora CLI**:
   - Confirm the CLI is correctly installed by running commands like `certora run help` or `certora run version` to get detailed outputs and version information.

### Managing Solidity Versions with solc-select

**Installation and Configuration**
- Install `solc-select` via `pipx` to manage different versions of the Solidity compiler.
- Use commands like `solc-select use 0.8.7` to switch between installed versions as needed.
- If a version is not installed, install it using `solc-select install <version>`.

**Operational Tips**
- Running `solc-select help` provides guidance and confirms the current setup.
- Always ensure the appropriate Solidity version is active for your projects by checking with `solc version`.
