## Building a Minimal Ethereum AA Wallet: Initial Setup with Foundry

This lesson walks you through the initial steps of creating a basic ERC-4337 Account Abstraction (AA) wallet for Ethereum using the Foundry development framework. We'll set up the project, define our goals, explore the core concepts of ERC-4337, and create the basic structure for our smart contract account.

### Project Initialization and Environment Setup

We begin by setting up our development environment using Foundry. Ensure you have Foundry installed.

1.  **Navigate to Your Workspace:** Open your terminal and navigate to the directory where you want to create your project. Let's call the project directory `foundry-account-abstraction`.

2.  **Update Foundry:** It's good practice to ensure you have the latest version of Foundry (`forge`, `cast`, `anvil`, `chisel`). Run:
    ```bash
    foundryup
    ```

3.  **Initialize Foundry Project:** Inside the `foundry-account-abstraction` directory, initialize a new Foundry project:
    ```bash
    forge init
    ```
    This command creates the standard Foundry project structure, including `src`, `lib`, `script`, and `test` directories, along with configuration files.

4.  **Clean Up Default Files:** For a clean start, delete the default sample files created by `forge init`:
    *   `src/Counter.sol`
    *   `script/Counter.s.sol`
    *   `test/Counter.t.sol`

5.  **Organize Source Directory:** Create subdirectories within `src` to organize contracts for different chains if needed. For this project, we'll prepare for Ethereum and potentially zkSync later:
    ```bash
    mkdir src/ethereum
    mkdir src/zksync
    ```

### Defining Project Goals

It's helpful to outline the project's objectives. Update the `README.md` file with the following:

```markdown
# About

1. Create a basic AA on Ethereum
2. Create a basic AA on zkSync
3. Deploy, and send a userOp / transaction through them

Notes:
1. Not going to send an AA [transaction] to Ethereum mainnet/testnet via alt-mempool in this guide.
2. But we will send an AA tx to zkSync.
```

**Clarification:** While we will build the necessary contract logic for an Ethereum AA wallet (and test it locally), demonstrating the full off-chain UserOperation submission flow via the public alt-mempool for Ethereum is outside the scope of this initial guide. We will focus on demonstrating the transaction sending capabilities using the zkSync AA wallet later.

### Creating the Minimal Ethereum Account Contract

Let's create the file for our Ethereum smart contract wallet.

1.  **Create File:** Create a new file: `src/ethereum/MinimalAccount.sol`.
2.  **Initial Code:** Add the basic contract structure:

    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity 0.8.24;

    contract MinimalAccount {
        // TODO: Implement ERC-4337 requirements
        // entrypoint -> this contract
    }
    ```

Now, the core question is: what code is required within `MinimalAccount.sol` to make it a valid ERC-4337 compatible smart contract account?

### Understanding ERC-4337 Core Concepts

To answer the question above, we need to understand the ERC-4337 standard. You can find the full specification at EIP-4337.

**The ERC-4337 Flow:**

1.  **UserOperation (UserOp):** A user (or their application) creates a data structure called a `UserOperation`. This contains details like the target account (`sender`), the action to perform (`callData`), gas limits, nonce, and potentially paymaster information. Crucially, it also includes a `signature`.
2.  **Off-Chain Signing:** The user signs the *hash* of the UserOperation (excluding the signature field itself) using their desired authentication method (could be a standard private key, multi-sig, etc.).
3.  **Alt-Mempool:** The signed `UserOperation` is sent to a separate, off-chain mempool (the "alternative mempool") monitored by **Bundlers**.
4.  **Bundlers:** These actors pick UserOps from the alt-mempool, bundle them together, and submit them as a single standard Ethereum transaction to a globally deployed singleton contract called the **EntryPoint**.
5.  **EntryPoint Contract:** This core contract orchestrates the process on-chain. For each UserOp in a bundle, it performs verification and execution steps. A key step involves calling back to the user's smart contract account (`MinimalAccount.sol` in our case) to validate the UserOp.
6.  **Account Validation:** The `EntryPoint` calls a specific function on the target account (`MinimalAccount.sol`) asking, "Is this UserOperation valid according to your rules?". The account performs its custom validation logic (e.g., checking the signature).
7.  **Execution:** If validation succeeds, the `EntryPoint` proceeds to execute the `callData` specified in the UserOp, interacting with other contracts as requested.

**The EntryPoint Contract:**

The official EntryPoint contract (v0.7.0 at the time of writing) is deployed on various networks. On Ethereum Mainnet, its address is `0x0000000071727De22E5E9d8BAf0edAc6f37da032`. Bundlers interact primarily with its `handleOps` function, passing an array of `PackedUserOperation` structs.

### The Account Contract Interface (IAccount)

The EIP-4337 specification defines a mandatory interface that all compliant smart contract accounts must implement: `IAccount`.

The most critical function within this interface is `validateUserOp`:

```solidity
interface IAccount {
    function validateUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external returns (uint256 validationData);
}
```

**`validateUserOp` Breakdown:**

*   **Purpose:** This function is called by the `EntryPoint` contract during the verification phase. It's where the smart contract account implements its custom validation logic, replacing the fixed ECDSA signature check used by Externally Owned Accounts (EOAs).
*   **`userOp`:** The packed `UserOperation` data structure containing all transaction details submitted by the Bundler.
*   **`userOpHash`:** The hash of the `userOp` data (calculated according to EIP-4337 rules). This is the hash that the user signed off-chain. The `validateUserOp` function must verify the `userOp.signature` against this `userOpHash`.
*   **`missingAccountFunds`:** Indicates how much ETH the account needs to pay the `EntryPoint` if it's covering its own gas costs (i.e., not using a Paymaster and having insufficient deposit in the EntryPoint).
*   **`validationData`:** A packed `uint256` value returned to the `EntryPoint`. It encodes validation success/failure and optionally specifies time validity bounds (valid after/until timestamps). A return value of `0` signifies successful validation with no time bounds.

### Installing Dependencies and Importing Interfaces

Instead of defining the `IAccount` interface and `PackedUserOperation` struct manually, we can use the official `eth-infinitism/account-abstraction` reference implementation library. We'll use version `0.7.0` for compatibility with the deployed EntryPoint.

1.  **Install Dependency:** Use Forge to install the library:
    ```bash
    forge install eth-infinitism/account-abstraction@v0.7.0 --no-commit
    ```
    This downloads the library into the `lib/account-abstraction` directory. The `--no-commit` flag prevents Forge from automatically creating a Git commit for this change.

2.  **Update Contract Imports:** Modify `src/ethereum/MinimalAccount.sol` to import the necessary components and inherit from `IAccount`:

    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity 0.8.24;

    import {IAccount} from "lib/account-abstraction/contracts/interfaces/IAccount.sol";
    import {PackedUserOperation} from "lib/account-abstraction/contracts/interfaces/PackedUserOperation.sol";

    contract MinimalAccount is IAccount {
        // EntryPoint will call validateUserOp on this contract

        // TODO: Implement validateUserOp logic
    }
    ```

### Implementing the `validateUserOp` Stub

Because our `MinimalAccount` contract now inherits from the `IAccount` interface, the Solidity compiler requires us to implement all functions defined in that interface. Let's add the `validateUserOp` function signature to satisfy this requirement.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IAccount} from "lib/account-abstraction/contracts/interfaces/IAccount.sol";
import {PackedUserOperation} from "lib/account-abstraction/contracts/interfaces/PackedUserOperation.sol";

contract MinimalAccount is IAccount {
    // EntryPoint will call validateUserOp on this contract

    /**
     * @notice Validate a user operation. Called by the entry point.
     * @param userOp The user operation to validate.
     * @param userOpHash The hash of the user operation (calculated by the entry point).
     * @param missingAccountFunds The amount of funds missing from the account's deposit to pay for the operation.
     * @return validationData Packed validation data for the entry point. 0 for success, 1 for failure.
     *         Specific formats defined in ERC-4337 for signature aggregation and time validity.
     */
    function validateUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external returns (uint256 validationData) {
        // TODO: Implement actual signature validation logic here!
        // This is where the account enforces its rules based on userOp.signature and userOpHash.

        // For now, we leave it empty. Returning 0 signifies success by default (incorrect for production!).
        return 0;
    }
}
```

At this point, we have successfully set up our Foundry project, defined our goals, imported the necessary ERC-4337 interfaces, and created the basic structure for our `MinimalAccount` contract, including the essential `validateUserOp` function stub. The next step involves implementing the actual validation logic within this function.