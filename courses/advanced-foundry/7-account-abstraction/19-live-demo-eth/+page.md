## Introduction to zkSync Native Account Abstraction

Welcome to this lesson on Native Account Abstraction (AA) within the zkSync Era ecosystem. Unlike Ethereum's ERC-4337 standard, which adds AA capabilities *on top* of the existing Externally Owned Account (EOA) and smart contract distinction, zkSync integrates Account Abstraction directly into its core protocol layer. This native approach offers a potentially simpler and more streamlined experience for developers and users. We'll explore how zkSync's AA works, contrast it with ERC-4337, and walk through the initial setup using Foundry to build our own basic account contract.

## Understanding the zkSync AA Flow

The core difference in zkSync's native AA lies in its simplified transaction flow. When a user initiates an action intended for an account contract (like executing a function in a dapp):

1.  The user signs a specific transaction type (TxType 113).
2.  This signed transaction is sent directly to the standard zkSync Mempool, just like any other transaction.
3.  The zkSync network routes the transaction directly to the target Account Contract (`Your Account`).
4.  The Account Contract validates the transaction (e.g., checks the signature) and, if valid, executes the requested action, potentially interacting with other dapp contracts (`Dapp.sol`).

This contrasts sharply with ERC-4337 on Ethereum, which involves:

1.  Users creating `UserOperations` instead of standard transactions.
2.  Bundlers collecting these `UserOperations` from a separate, alternative mempool ("alt-mempool").
3.  Bundlers sending batches of `UserOperations` to a global `EntryPoint.sol` contract.
4.  The `EntryPoint.sol` contract orchestrating calls to individual account contracts for validation and execution.

zkSync's native model eliminates the need for the separate alt-mempool and the global `EntryPoint.sol` contract, simplifying the architecture for developers building AA features. Optional components like Signature Aggregators (for batching signature verifications) and Paymasters (for sponsoring gas fees) can still interact directly with the user's account contract within this flow.

## Transaction Type 113 and Gas Payments

A key indicator of zkSync's native AA in action is the user experience in wallets like Metamask. When interacting with a system utilizing zkSync AA (for instance, deploying an AA contract), Metamask will often present a "Signature request" prompt instead of a typical transaction confirmation screen.

If you inspect the transaction details, you'll notice `TxType: 113`. This specific transaction type signals to the zkSync network that it should be processed according to the native AA rules. Crucially, the user *signs* the transaction data at this stage but doesn't immediately pay gas fees upfront as they would in a standard Ethereum transaction.

The gas payment model is handled implicitly by the zkSync protocol:

1.  User signs the TxType 113 transaction data.
2.  The transaction is processed by the zkSync network nodes (bootloader/operator).
3.  After successful processing and validation by the account contract, the network "automagically" deducts the required gas fees from the user's account balance.

This "sign first, pay later" model is a distinct feature of zkSync's native AA compared to the traditional Ethereum transaction lifecycle.

## The Unified Account Model: All Accounts are Contracts

Perhaps the most fundamental concept in zkSync Era is its unified account model. On zkSync, *all* accounts are fundamentally smart contracts under the hood. This includes addresses you typically think of as EOAs, like your Metamask wallet address when used on the zkSync network.

What appears to be an EOA is actually an instance of a special system contract, often referred to as `DefaultAccount.sol` (or a contract with equivalent bytecode). This system contract is designed to mimic the familiar behavior of an EOA (specifically, validating transactions based on ECDSA signatures).

The significant benefit of this unified model is the removal of the rigid distinction between EOAs and smart contracts that exists on Ethereum L1. Every account on zkSync adheres to a common standard, simplifying interactions and enabling features like AA universally.

Interestingly, the zkSync Block Explorer is designed to recognize addresses using the `DefaultAccount` bytecode. For user-friendliness, it presents these addresses in the familiar EOA style (without showing a "Contract" tab), even though they are technically smart contracts deployed on the network. This is a deliberate UI choice to avoid confusing users accustomed to the EOA paradigm.

## The `IAccount` Interface: The Core Standard

Since all accounts on zkSync are contracts, they need a common standard to ensure they can interact correctly with the protocol's native AA features. This standard is defined by the `IAccount` interface.

Every account contract on zkSync, including the `DefaultAccount.sol` that mimics EOAs, *must* implement the `IAccount` interface. This interface specifies the core functions required for an account to validate transactions, execute them, handle gas payments, and interact with paymasters.

Key functions defined in `IAccount.sol` include:

*   `validateTransaction(...)`: Checks if a transaction intended for this account is valid (e.g., verifies the signature, checks nonces).
*   `executeTransaction(...)`: Executes the logic of a transaction *after* it has been validated.
*   `executeTransactionFromOutside(...)`: Handles transactions initiated externally (potentially different validation logic).
*   `payForTransaction(...)`: Contains the logic for the account to pay its own transaction fees.
*   `prepareForPaymaster(...)`: Includes logic needed when a Paymaster is involved in sponsoring the transaction fees.

Understanding `IAccount` is crucial for developing custom account contracts on zkSync.

## Setting Up Your zkSync AA Development Environment

To start building our own zkSync account contract, we'll use the Foundry development toolkit. The first step is to install the necessary zkSync system contracts and interfaces. For this course, we'll use a specific, modified version of the official zkSync Era contracts maintained by Cyfrin, which simplifies certain aspects for learning.

Open your terminal in your Foundry project directory and run the following command:

```bash
forge install Cyfrin/foundry-era-contracts@0.0.3 --no-commit
```

This command installs version `0.0.3` of the `cyfrin/foundry-era-contracts` repository into your `lib/` directory. The `--no-commit` flag prevents Foundry from automatically adding the changes to your git staging area.

Inside the newly installed `lib/foundry-era-contracts` directory, you'll find several important files, particularly within `src/system-contracts/contracts/`:

*   `interfaces/IAccount.sol`: The core interface we need to implement.
*   `DefaultAccount.sol`: The implementation used for EOA-like accounts on zkSync.
*   `libraries/MemoryTransactionHelper.sol`: Contains the definition for the `Transaction` struct used within the `IAccount` functions.

## Creating Your First zkSync Account Contract

Now, let's create the basic file structure for our custom account contract. Create a new file, for example, at `src/zksync/ZkMinimalAccount.sol`.

The initial goal is to create a contract that inherits from `IAccount` and includes stubs for all the required functions. This will satisfy the Solidity compiler, allowing us to progressively implement the logic later.

Here is the basic code structure:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; // Use a compatible Solidity version

// Import the core interface we need to implement
import {IAccount} from "lib/foundry-era-contracts/src/system-contracts/contracts/interfaces/IAccount.sol";
// Import the Transaction struct required by IAccount functions
import {Transaction} from "lib/foundry-era-contracts/src/system-contracts/contracts/libraries/MemoryTransactionHelper.sol";

contract ZkMinimalAccount is IAccount {

    // Implement the functions defined in the IAccount interface.
    // We'll leave the bodies empty for now.

    function validateTransaction(
        bytes32 _txHash,
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) external payable virtual override returns (bytes4 magic) {
        // TODO: Implement validation logic
        // For now, return the success magic value for IAccount
        return IAccount.validateTransaction.selector;
    }

    function executeTransaction(
        bytes32 _txHash,
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) external payable virtual override {
        // TODO: Implement execution logic
    }

    // Note: executeTransactionFromOutside is NOT part of the core IAccount interface in newer versions,
    // but might be needed depending on the exact system contract interactions you build.
    // Check the specific IAccount.sol version you are using.
    // If present in your IAccount.sol, include it:
    /*
    function executeTransactionFromOutside(
        Transaction calldata _transaction
    ) external payable virtual override {
        // TODO: Implement external execution logic if needed
    }
    */

    function payForTransaction(
        bytes32 _txHash,
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) external payable virtual override {
        // TODO: Implement gas payment logic
    }

    function prepareForPaymaster(
        bytes32 _txHash,
        bytes32 _possibleSignedHash,
        Transaction calldata _transaction
    ) external payable virtual override {
        // TODO: Implement paymaster interaction logic
    }
}

```

This code imports `IAccount` and the necessary `Transaction` struct. It declares `ZkMinimalAccount` inheriting from `IAccount` and provides empty implementations for the required functions (`validateTransaction`, `executeTransaction`, `payForTransaction`, `prepareForPaymaster`). Note the use of `virtual` and `override` keywords as required by Solidity inheritance rules. The `validateTransaction` function returns the expected magic value (`IAccount.validateTransaction.selector`) to signal successful validation placeholder.

## Key Takeaways

*   zkSync Era features **Native Account Abstraction**, built into the protocol layer, simplifying the flow compared to ERC-4337.
*   Transactions (TxType 113) are signed first, sent to the standard mempool, processed directly by the account contract, and gas is paid implicitly afterwards.
*   **All accounts are contracts** on zkSync, including EOAs (which use `DefaultAccount.sol`).
*   The **`IAccount` interface** is the standard that all zkSync accounts must implement.
*   Foundry and the specified `cyfrin/foundry-era-contracts` repository (version `0.0.3`) are used for setting up the development environment for this course.

With this basic structure in place, you are now ready to start implementing the specific validation, execution, and gas payment logic for your custom zkSync account contract in the upcoming lessons.