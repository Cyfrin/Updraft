## Project Initialization and Setup for Your Merkle Airdrop

This lesson guides you through setting up a Foundry project to build a Merkle Airdrop system. Our objective is to design a smart contract capable of efficiently airdropping ERC20 tokens to a predefined list of users. The "Merkle" aspect of the airdrop is key to its efficiency, and we will explore its significance in detail later.

First, create a new directory for your project. We'll name it `merkle-airdrop`:
```bash
mkdir merkle-airdrop
cd merkle-airdrop
```

Before proceeding, ensure your Foundry installation is up to date. Run `foundryup` to fetch the latest or standard version:
```bash
foundryup
```
Upon successful execution, you should see confirmation that `forge`, `cast`, `anvil`, and `chisel` are installed or updated.

Next, open the project directory in your preferred code editor, such as Visual Studio Code:
```bash
code .
```

Within the VS Code integrated terminal (or any terminal in your project directory), initialize a new Foundry project:
```bash
forge init
```
This command populates your directory with the standard Foundry project structure, including `src`, `lib`, `test`, and `script` folders, along with configuration files like `foundry.toml`, `.gitignore`, and a `README.md`.

Foundry creates default example files, `Counter.sol` in the `src` folder and `Counter.t.sol` in the `test` folder. These are not required for our Merkle Airdrop project, so you can safely delete them.

## Crafting the Core Smart Contracts: `MerkleAirdrop.sol` and `BagelToken.sol`

We will develop two primary smart contracts:
1.  `MerkleAirdrop.sol`: This contract will orchestrate the airdrop logic.
2.  `BagelToken.sol`: This will be the ERC20 token distributed via the airdrop.

Let's begin by creating these files.

**a. `MerkleAirdrop.sol`**

Create a new file named `MerkleAirdrop.sol` inside the `src` folder. Add the initial boilerplate code:
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MerkleAirdrop {
    // Purpose:
    // 1. Manage a list of addresses and corresponding token amounts eligible for the airdrop.
    // 2. Provide a mechanism for eligible users to claim their allocated tokens.
}
```
This contract will eventually interact with a dataset of eligible addresses and their respective token allocations, enabling them to claim their share.

**b. `BagelToken.sol` (ERC20 Token)**

Create another new file named `BagelToken.sol` in the `src` folder. This will serve as our example ERC20 token.
Add the initial boilerplate:
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BagelToken {
    // This contract will implement the ERC20 token standard.
}
```

## Integrating OpenZeppelin for Robust Smart Contracts

To simplify the implementation of standard functionalities like ERC20 tokens and access control (e.g., ownership), we will leverage the widely-used OpenZeppelin Contracts library.

Install OpenZeppelin Contracts into your project using Forge:
```bash
forge install openzeppelin/openzeppelin-contracts --no-commit
```
The `--no-commit` flag is used here to prevent Git commit hooks from running or to avoid immediately updating Git submodules, streamlining the installation process within the context of this setup.

To enable cleaner and more readable imports of OpenZeppelin contracts in your Solidity files, configure remappings in your `foundry.toml` file. Open `foundry.toml` and add or modify the `remappings` section:
```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
remappings = [
    "@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/"
]
# See more config options https://github.com/foundry-rs/foundry/blob/master/crates/config/README.md#all-options
```
Save the `foundry.toml` file. This remapping allows you to import OpenZeppelin contracts using a path like `import "@openzeppelin/contracts/token/ERC20/ERC20.sol";`.

## Implementing the `BagelToken.sol` ERC20 Contract

Now, let's implement the `BagelToken.sol` contract. It will inherit from OpenZeppelin's `ERC20` and `Ownable` contracts. Update `src/BagelToken.sol` as follows:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BagelToken is ERC20, Ownable {
    constructor() ERC20("Bagel", "BAGEL") Ownable(msg.sender) {
        // The initial supply will be managed by the owner minting tokens as needed,
        // rather than minting a fixed supply at deployment.
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
```

**Constructor Breakdown:**
*   `ERC20("Bagel", "BAGEL")`: Initializes the ERC20 token with the name "Bagel" and the symbol "BAGEL".
*   `Ownable(msg.sender)`: Sets the deployer of the contract (`msg.sender`) as the initial owner. This is a common pattern for administrative control.

**`mint` Function:**
*   This `external` function is restricted to the `onlyOwner` (the deployer, initially).
*   It allows the owner to create new `BagelToken`s and assign them to any specified `to` address in the desired `amount`. This function is crucial for supplying the `MerkleAirdrop` contract with tokens or for pre-funding specific addresses.
*   Note that we are not minting any tokens in the constructor. This provides greater flexibility, allowing the owner to mint tokens on demand.

## The Pitfalls of a Naive Airdrop Implementation

Before diving into the Merkle-based solution, let's consider a straightforward but flawed approach to implementing the airdrop logic within `MerkleAirdrop.sol`.

A naive strategy might involve storing an array of all claimant addresses directly within the smart contract. The `claim` function would then iterate through this array to verify if a user is eligible.

Conceptually, this might look like:
```solidity
// In MerkleAirdrop.sol (illustrative, not the recommended approach)
// address[] public claimants;
// mapping(address => uint256) public claimAmounts; // Storing amounts
// mapping(address => bool) public hasClaimed;

// function claim() external {
//     bool isEligible = false;
//     // This loop is problematic
//     for (uint i = 0; i < claimants.length; i++) {
//         if (claimants[i] == msg.sender) {
//             isEligible = true;
//             break;
//         }
//     }
//     require(isEligible, "Not eligible for airdrop");
//     require(!hasClaimed[msg.sender], "Already claimed");

//     uint256 amount = claimAmounts[msg.sender];
//     hasClaimed[msg.sender] = true;
//     // Transfer ERC20 tokens (e.g., bagelToken.transfer(msg.sender, amount));
// }
```

This approach suffers from significant drawbacks:

*   **High Gas Costs:** Iterating through an array on-chain (e.g., `for (uint i = 0; i < claimants.length; i++)`) consumes a large amount of gas. The cost scales linearly with the number of claimants. For airdrops with hundreds or thousands of participants, this becomes prohibitively expensive for users trying to claim.
*   **Potential for Denial of Service (DoS):** If the `claimants` array is sufficiently large, the gas required to execute the loop within the `claim` function could exceed the Ethereum block gas limit. This would render the `claim` function unusable for *all* participants, effectively causing a denial of service.

These issues make the naive array-based approach unsuitable for large-scale airdrops.

## Merkle Trees and Proofs: The Scalable Airdrop Solution

To overcome the high gas costs and scalability limitations of the naive approach, we introduce **Merkle Trees** and **Merkle Proofs**. This cryptographic technique allows for efficient verification of data inclusion without storing the entire dataset on-chain.

**Core Idea:**
Instead of embedding the complete list of eligible addresses and their airdrop amounts directly into the smart contract, we perform the following:
1.  **Off-Chain Construction:** A Merkle tree is constructed off-chain using the airdrop data (e.g., lists of `[address, amount]` pairs).
2.  **On-Chain Root:** Only the **Merkle root** – a single 32-byte hash that uniquely represents the entire dataset – is stored on the smart contract.

**Verification Process for Claiming:**
When a user wishes to claim their tokens:
1.  They submit their claim details (e.g., their address, the amount they are eligible for) to the smart contract.
2.  Crucially, they also provide a **Merkle proof**. This proof consists of a small set of hashes from the Merkle tree.
3.  The smart contract uses the user's submitted data and the provided Merkle proof to recalculate a Merkle root.
4.  If this recalculated root matches the Merkle root stored in the contract, it cryptographically proves that the user's data (address and amount) was part of the original dataset used to generate the tree. This verification occurs without iterating through any lists on-chain.

**Benefits of Using Merkle Proofs for Airdrops:**
*   **Significant Gas Efficiency:** Verifying a Merkle proof is vastly cheaper than iterating through an array. The gas cost is typically logarithmic (O(log N)) with respect to the number of items in the dataset, rather than linear (O(N)).
*   **Enhanced Scalability:** This efficiency allows airdrops to be conducted for a very large number of recipients without hitting gas limits or incurring prohibitive transaction fees for claimants.

By employing Merkle proofs, the `MerkleAirdrop.sol` contract will store the Merkle root of the airdrop distribution and the address of the `BagelToken`. Its `claim` function will then accept the claimant's details along with a Merkle proof to verify eligibility before transferring tokens.

This lesson has established the foundational project setup and highlighted the problem of efficient airdrops, introducing Merkle trees as the robust solution. Subsequent lessons will delve into the specifics of Merkle tree construction, proof generation, and the implementation of the `claim` function using these proofs within our `MerkleAirdrop.sol` contract.