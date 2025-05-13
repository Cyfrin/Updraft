## Building an Advanced Merkle Airdrop with Foundry and Digital Signatures

Welcome! In this lesson, we'll explore the fascinating world of Merkle trees and digital signatures to construct a sophisticated airdrop smart contract using Foundry. Our goal is to build an efficient system for token distribution that allows for eligibility verification via Merkle proofs and authorized, potentially gasless, claims using cryptographic signatures.

### What is an Airdrop?

In the blockchain ecosystem, an **airdrop** refers to the process where a token development team distributes their tokens to a multitude of different wallet addresses. This is a common strategy with several key purposes:

*   **Bootstrapping a Project:** Airdrops can help kickstart a new project by getting its tokens into the hands of a wide user base.
*   **Rewarding Early Users:** They serve as a way to acknowledge and reward early adopters, community members, or contributors.
*   **Increasing Token Distribution:** A wider distribution can lead to a more decentralized and robust token economy.

Airdrops can involve various token types, including ERC20 (fungible tokens), ERC721 (non-fungible tokens, or NFTs), and ERC1155 (multi-token standard). For this project, our focus will be on an **ERC20 airdrop**.

Typically, these tokens are gifted for free to eligible recipients. The only cost users might incur is the gas fee required to claim their tokens, a problem we aim to address. Eligibility for an airdrop is usually determined by specific criteria, such as being a developer on the protocol, an active community participant, or having interacted with a particular dApp. The core mechanism involves a list of addresses deemed eligible to claim a predetermined amount of tokens.

### Codebase Overview

Our project is housed in the `Cyfrin/foundry-merkle-airdrop-cu` repository on GitHub. You can find it at: `https://github.com/Cyfrin/foundry-merkle-airdrop-cu`.

Let's take a look at the key contracts and scripts involved.

#### `src/BagelToken.sol`

This contract defines the ERC20 token that will be distributed through our airdrop. It's a very minimal ERC20 implementation, similar to what you might have encountered previously.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract BagelToken is ERC20, Ownable {
    constructor() ERC20("Bagel Token", "BT") Ownable(msg.sender) {}

    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }
}
```

**Key features of `BagelToken.sol`:**

*   **Imports:** It utilizes OpenZeppelin's battle-tested `ERC20` contract for standard token functionality and `Ownable` for access control, restricting certain functions (like minting) to the contract owner.
*   **Constructor:** Initializes the token with the name "Bagel Token", the symbol "BT", and sets the deployer (`msg.sender`) as the owner.
*   **`mint` function:** An `onlyOwner` function that allows the contract owner to create new Bagel Tokens and assign them to a specified `account`.

#### `src/MerkleAirdrop.sol`

This is the heart of our project – the main contract responsible for managing the airdrop. Its primary functionalities include:

1.  **Merkle Proof Verification:** It uses Merkle proofs to efficiently verify if a given address is on the eligibility list without storing the entire list on-chain. This significantly saves gas and storage.
2.  **`claim` Function:** Provides the mechanism for eligible users to claim their allotted tokens.
3.  **Gasless Claims (for the recipient):** A crucial feature is allowing *anyone* to call the `claim` function on behalf of an eligible address. This means the recipient doesn't necessarily have to pay gas for the claim transaction if a third-party (often called a relayer) submits it.
4.  **Signature Verification:** To ensure that claims are authorized by the rightful owner of the eligible address, even if submitted by a third party, the contract implements digital signature verification. It checks the V, R, and S components of an ECDSA signature. This prevents unauthorized claims or individuals receiving tokens they might not want (e.g., for tax implications or to avoid spam tokens).

We will delve deeper into how to validate and create these signatures, and what the V, R, and S components represent.

#### `script/` Directory

This directory contains several Foundry scripts to facilitate various development and interaction tasks:

*   **`GenerateInput.s.sol`:** Likely used for preparing the data (list of eligible addresses and amounts) that will be used to generate the Merkle tree.
*   **`MakeMerkle.s.sol`:** This script will be responsible for constructing the Merkle tree from the input data, generating the individual Merkle proofs for each eligible address, and computing the Merkle root hash (which will be stored in the `MerkleAirdrop.sol` contract).
*   **`DeployMerkleAirdrop.s.sol`:** A deployment script for the `MerkleAirdrop.sol` contract.
*   **`Interact.s.sol`:** Used for interacting with the deployed airdrop contract, primarily for making claims.
*   **`SplitSignature.s.sol`:** A helper script or contract, possibly for dissecting a packed signature into its V, R, and S components for use in the smart contract.

#### Upcoming Technical Deep Dives

Before we fully build out the `MerkleAirdrop.sol` contract, we'll take a necessary detour to understand the core cryptographic concepts that underpin its functionality. This "big one" will cover:

*   **Merkle Trees and Merkle Proofs:** How they work and why they're essential for efficient data verification.
*   **Digital Signatures:** The principles behind them and their role in authentication and authorization.
*   **ECDSA (Elliptic Curve Digital Signature Algorithm):** The specific algorithm used by Ethereum for generating and verifying signatures.
*   **Transaction Types:** Understanding different Ethereum transaction types can be relevant, especially when considering relayers.

### Demo of the Final Product

To give you a preview of what we're building, let's look at a demonstration of the completed airdrop system. (Note: This demo was run on a local zkSync node using Docker. You are *not* expected to replicate this zkSync setup; we'll primarily use standard Foundry environments like Anvil. The zkSync demo is purely to showcase the end functionality.)

The demo utilizes a script (`interactZK.sh`) to automate the following steps:

1.  **Initialize zkSync Local Node:** The script starts the local zkSync development environment.
2.  **Deploy `BagelToken.sol`:** The ERC20 token contract is deployed.
3.  **Deploy `MerkleAirdrop.sol`:** The main airdrop contract is deployed. The Merkle root (pre-calculated from the eligibility list) would have been set during its deployment.
4.  **Sign Message:** The owner of the `CLAIMING_ADDRESS` (the address eligible for the airdrop) signs a message. This signature cryptographically authorizes a third party to claim the airdrop on their behalf.

    The `Interact.s.sol` script demonstrates how this signature is used. Here's a relevant snippet:
    ```solidity
    // ... imports ...
    contract ClaimAirdrop is Script {
        // Address eligible for the airdrop
        address CLAIMING_ADDRESS = 0x39Fd6e51aadD88F6F4ceAB082779cFFf92b2266;
        // Amount to be claimed (25 tokens with 18 decimals)
        uint256 CLAIMING_AMOUNT = 25 * 1e18;
        // Example Merkle proof components
        bytes32 PROOF_ONE = 0xd1443c59150119b00449fffacac3c947d028c20c359c34d66d95936b2b3b5c6ad;
        bytes32 PROOF_TWO = 0x0e5ebe811e55b47d44eabdca36b954ac3d088216975c6524fa7a1d8789657fc;
        bytes32[] proof = [PROOF_ONE, PROOF_TWO];
        // The signature generated by CLAIMING_ADDRESS owner
        bytes private SIGNATURE = hex"fb2278e6f23fb5fe248480cf9f4be8a9e4bd77c3d0133133ccf005debc611602a06c24085d07c038b34ba0aec33664c346caea3570afec06"; // Example signature

        function claimAirdrop(address airdropContractAddress) public {
            vm.startBroadcast(); // Foundry command to send transactions
            // Split the signature into v, r, s components
            (uint8 v, bytes32 r, bytes32 s) = splitSignature(SIGNATURE);
            // Call the claim function on the MerkleAirdrop contract
            MerkleAirdrop(airdropContractAddress).claim(
                CLAIMING_ADDRESS,
                CLAIMING_AMOUNT,
                proof, // The Merkle proof for CLAIMING_ADDRESS
                v,
                r,
                s
            );
            vm.stopBroadcast();
        }

        // Helper function to split signature (implementation not shown here)
        function splitSignature(bytes memory sig) internal pure returns (uint8 v, bytes32 r, bytes32 s) {
            // ... logic to parse v, r, s from sig ...
            // Example for a common 65-byte signature (r, s, v)
            assembly {
                r := mload(add(sig, 0x20))
                s := mload(add(sig, 0x40))
                v := byte(0, mload(add(sig, 0x60)))
            }
            if (v < 27) {
                v += 27;
            }
        }
    }
    ```
5.  **Fund Contracts:**
    *   An initial supply of BagelTokens is minted by the `BagelToken` contract owner (the deployer).
    *   A portion of these tokens is then transferred from the owner to the `MerkleAirdrop.sol` contract. This contract now holds the tokens to be distributed.
6.  **Claim Tokens:** The script, acting as a relayer, calls the `claim` function on the `MerkleAirdrop.sol` contract. This call is made *on behalf of* the `CLAIMING_ADDRESS`. The transaction includes the `CLAIMING_ADDRESS`, the `CLAIMING_AMOUNT`, the Merkle `proof` for that address and amount, and the `v, r, s` components of the signature. The `MerkleAirdrop` contract will:
    *   Verify the Merkle proof against its stored Merkle root.
    *   Recover the signer's address from the message hash (implicitly constructed from claim parameters) and the provided signature (v,r,s).
    *   Check if the recovered signer matches `CLAIMING_ADDRESS`.
    *   If all checks pass, transfer the tokens.
7.  **Verify Balance:** The demo concludes by showing that the `CLAIMING_ADDRESS` now has a balance of `25000000000000000000` Bagel Tokens (which is 25 tokens, considering 18 decimal places), successfully claimed without `CLAIMING_ADDRESS` itself initiating the transaction.

### Looking Ahead

This introduction might present many new concepts, especially around Merkle trees and digital signatures. Don't worry if it seems a bit overwhelming at first. As we progressively walk through each component, build the code, and explore the underlying cryptographic principles, everything will become much clearer.

The core takeaways are the power of **Merkle proofs** for efficient on-chain data verification and **digital signatures (ECDSA)** for secure, off-chain authorization, enabling features like **gasless claims** for the end-user. We'll be leveraging OpenZeppelin libraries extensively for robust implementations of `ERC20`, `Ownable`, `MerkleProof`, and `ECDSA` utilities.

Get ready to dive deep into building a truly advanced and practical airdrop mechanism!