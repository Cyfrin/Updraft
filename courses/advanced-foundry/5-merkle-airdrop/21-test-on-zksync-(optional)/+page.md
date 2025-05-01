## Setting Up Your Merkle Airdrop Project with Foundry

This lesson guides you through the initial setup of a Foundry project designed to perform a token airdrop using Merkle proofs. We'll create the basic project structure, implement an example ERC20 token, and discuss why Merkle proofs are essential for efficient airdrops.

**Project Goal:** Our objective is to build a smart contract system capable of airdropping tokens to a large list of users in a gas-efficient manner. We will leverage Merkle proofs to verify recipient eligibility without storing the entire list on-chain, thereby avoiding prohibitive transaction costs.

## Initial Project Setup

First, we need to create our project directory and initialize a standard Foundry environment.

1.  **Create Project Directory:** Open your terminal and create a new directory for the project. We'll name it `merkle-airdrop` to reflect the core technology we'll be using.
    ```bash
    mkdir merkle-airdrop
    ```
2.  **Navigate into Directory:** Change into the newly created directory.
    ```bash
    cd merkle-airdrop
    ```
3.  **Ensure Foundry is Updated:** Verify you have the standard (non-ZK) version of Foundry installed and update it to the latest version.
    ```bash
    foundryup
    ```
4.  **Open in Code Editor:** Open the project directory in your preferred code editor, such as VS Code.
    ```bash
    code .
    ```
5.  **Initialize Foundry Project:** Use the `forge init` command to set up the standard Foundry project structure. This creates `src`, `test`, `lib`, `script` directories, and configuration files like `foundry.toml`.
    ```bash
    forge init
    ```
6.  **Clean Boilerplate:** The `forge init` command creates default `Counter.sol` files in `src` and `test`. We don't need these for our project, so you can delete them.

## Creating the Core Smart Contracts

We'll need two primary contracts: one for the token being airdropped and one for the airdrop logic itself.

1.  **Create `MerkleAirdrop.sol`:** In the `src` directory, create a new file named `MerkleAirdrop.sol`. Add the basic Solidity boilerplate. This contract will eventually contain the logic for verifying Merkle proofs and allowing users to claim tokens.
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.24;

    contract MerkleAirdrop {
        // Airdrop logic using Merkle proofs will be implemented here.
        // Conceptual Requirements:
        // - Store the Merkle root representing the airdrop list.
        // - Store the address of the ERC20 token being airdropped.
        // - Allow eligible users to claim their allocated tokens by providing a valid Merkle proof.
        // - Prevent double-claiming.
    }
    ```
2.  **Create `BagelToken.sol`:** Create another file in `src` named `BagelToken.sol`. This will be our example ERC20 token. We'll implement it using the standard OpenZeppelin libraries.
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.24;

    contract BagelToken {
        // Implementation using OpenZeppelin ERC20 and Ownable will go here.
    }
    ```

## Implementing the ERC20 Token (`BagelToken`)

Now, let's implement the `BagelToken` using OpenZeppelin's secure and audited contract templates.

1.  **Install OpenZeppelin Contracts:** Use Foundry's `forge install` command to add the OpenZeppelin library to your project. The `--no-commit` flag prevents Forge from automatically creating a git commit.
    ```bash
    forge install openzeppelin/openzeppelin-contracts --no-commit
    ```
2.  **Configure Remappings:** To use simpler import paths like `@openzeppelin/...`, we need to configure remappings in the `foundry.toml` file. Add the `remappings` section as shown below:
    ```toml
    [profile.default]
    src = "src"
    out = "out"
    libs = ["lib"]
    # See more config options https://github.com/foundry-rs/foundry/blob/master/crates/config/README.md#all-options

    # Add this remappings section:
    remappings = [
        '@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/'
    ]
    ```
3.  **Implement `BagelToken.sol`:** Edit `src/BagelToken.sol` to import and inherit from OpenZeppelin's `ERC20` and `Ownable` contracts.

    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.24;

    import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
    import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

    contract BagelToken is ERC20, Ownable {
        /**
         * @dev Constructor initializes the ERC20 token with a name and symbol.
         * It also sets the deployer as the initial owner using Ownable.
         */
        constructor() ERC20("BAGEL", "BGL") Ownable(msg.sender) {
            // The initial owner (deployer) is set via Ownable(msg.sender).
            // No tokens are minted at deployment; the owner can mint them later.
        }

        /**
         * @dev Allows the owner to mint new tokens and send them to a specified address.
         * This is essential for funding the airdrop contract.
         * Requirements:
         * - Only the owner (initially the deployer) can call this function.
         */
        function mint(address to, uint256 amount) external onlyOwner {
            _mint(to, amount);
        }
    }
    ```
    *   **`ERC20`:** Provides the standard functionality for a fungible token (transfer, balance inquiries, etc.).
    *   **`Ownable`:** Implements access control, designating an `owner` address (initially the contract deployer) with special permissions. Here, it restricts the `mint` function to only the owner.
    *   **Constructor:** Sets the token name ("BAGEL"), symbol ("BGL"), and designates the deployer (`msg.sender`) as the owner.
    *   **`mint` Function:** Allows the owner to create new tokens. This function will be used later to provide the `MerkleAirdrop` contract with the necessary tokens for distribution.

## The Challenge: Gas Costs of On-Chain Airdrop Lists

Before diving into the `MerkleAirdrop` implementation, let's understand the problem we're solving. A naive approach to an airdrop might involve storing the list of eligible addresses and their corresponding token amounts directly within the smart contract, perhaps using arrays or mappings.

Consider this hypothetical (and inefficient) structure:

```solidity
// --- THIS IS INEFFICIENT - DO NOT USE FOR LARGE LISTS ---
contract NaiveAirdrop {
    IERC20 public token;
    address[] public claimants;
    mapping(address => uint256) public claimAmounts;
    mapping(address => bool) public hasClaimed;

    // ... constructor ...

    function claim() external {
        bool found = false;
        // Loop through the entire list to find the caller
        for (uint i = 0; i < claimants.length; i++) {
            if (claimants[i] == msg.sender) {
                require(!hasClaimed[msg.sender], "Already claimed");
                uint256 amount = claimAmounts[msg.sender];
                require(amount > 0, "No amount allocated");

                hasClaimed[msg.sender] = true;
                token.transfer(msg.sender, amount);
                found = true;
                break;
            }
        }
        require(found, "Not eligible for airdrop");
    }
}
// --- END INEFFICIENT EXAMPLE ---
```

This approach suffers from severe drawbacks:

1.  **Extremely High Gas Costs:** The `claim` function requires iterating through the `claimants` array. The gas cost increases linearly with the number of recipients. For an airdrop with thousands or millions of addresses, the gas required to find a claimant within the loop would make the transaction prohibitively expensive.
2.  **Scalability Limits:** Blockchains have a block gas limit (the maximum amount of gas that can be consumed by all transactions in a single block). If the airdrop list is large enough, the gas required to loop through it could exceed this limit, making it *impossible* for anyone to claim, regardless of their willingness to pay high fees. This leads to a potential Denial of Service (DoS) scenario.
3.  **High Deployment Cost:** Storing large arrays directly in contract storage during deployment is also very expensive.

## Merkle Proofs: The Gas-Efficient Solution for Airdrops

To overcome these limitations, we use Merkle proofs.

*   **Concept:** A Merkle proof allows us to cryptographically verify that a specific piece of data (e.g., a combination of a user's address and their airdrop amount) is part of a larger dataset *without* needing the entire dataset on-chain.
*   **Mechanism (High-Level):**
    1.  **Off-Chain:** The full list of airdrop recipients and amounts is processed off-chain to build a Merkle Tree. This tree structure efficiently summarizes the entire dataset into a single 32-byte hash called the **Merkle Root**.
    2.  **On-Chain:** Only this single **Merkle Root** hash is stored in the `MerkleAirdrop` smart contract.
    3.  **Claiming:** When a user wants to claim their tokens, they provide their address, their allocated amount, and a **Merkle Proof** (a small set of intermediary hashes from the tree, also generated off-chain).
    4.  **Verification:** The `MerkleAirdrop` contract's `claim` function uses the user-provided data (address, amount), the Merkle Proof, and the stored Merkle Root to perform a mathematical verification. This process confirms that the user's data was indeed part of the original dataset used to generate the root, without ever seeing or iterating through the full list.
*   **Benefits:**
    *   **Low Gas Cost:** Verification using a Merkle proof requires a computation complexity that is typically logarithmic (or near-constant) relative to the size of the original list, making it vastly cheaper than iterating through an array.
    *   **Scalability:** Handles potentially millions of recipients without hitting block gas limits during the claim process.
    *   **Lower Deployment Cost:** Only a single hash (the Merkle Root) needs to be stored on-chain representing the entire dataset.

## Next Steps

We have successfully set up our Foundry project and created the basic structure for our `MerkleAirdrop` contract and the `BagelToken` ERC20 contract. We've also identified the gas cost challenges associated with naive airdrop implementations and introduced Merkle proofs as the efficient solution.

The next logical step, which will be covered in subsequent lessons, is to delve deeper into the theory of how Merkle Trees and Merkle Proofs work. Once we understand the underlying cryptography, we will implement the `MerkleAirdrop.sol` contract logic to store the Merkle root and verify the proofs provided by claimants. We will also design the contract to accept the address of any ERC20 token during deployment, making it reusable beyond just `BagelToken`.