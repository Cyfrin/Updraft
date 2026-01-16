## Preparing Your Foundry Environment for Merkle Airdrop Testing

This lesson guides you through the essential preparatory steps for testing a Merkle Airdrop smart contract using Foundry. We'll cover enhancing your smart contract for testability, setting up your test file, and, crucially, generating the Merkle tree data (roots and proofs) required for comprehensive testing.

## Enhancing Smart Contract Accessibility for Testing

Before diving into writing tests for `MerkleAirdrop.sol`, we need to ensure that our test contract can access key pieces of information from the smart contract. Specifically, the `MerkleAirdrop.sol` contract contains private immutable state variables `i_merkleRoot` (a `bytes32`) and `i_airdropToken` (an `IERC20` token address). To make these values readable during tests, we'll add public getter functions.

**Getter Functions Added to `MerkleAirdrop.sol`:**

1.  **`getMerkleRoot()`**: This function will return the value of `i_merkleRoot`.
    ```solidity
    // In MerkleAirdrop.sol
    function getMerkleRoot() external view returns (bytes32) {
        return i_merkleRoot;
    }
    ```

2.  **`getAirdropToken()`**: This function will return the address of the `i_airdropToken`.
    ```solidity
    // In MerkleAirdrop.sol
    function getAirdropToken() external view returns (IERC20) {
        return i_airdropToken;
    }
    ```
These getters are vital for making assertions in our Foundry tests, allowing us to verify that the contract has been initialized with the correct Merkle root and airdrop token.

## Initializing the Foundry Test Environment

With our smart contract prepared, the next step is to set up the testing file and configure our Foundry project.

1.  **Create the Test File:**
    Navigate to your project's `test/` directory and create a new file named `MerkleAirdrop.t.sol`.

2.  **Initial Test File Setup:**
    Add the following boilerplate code to `MerkleAirdrop.t.sol`. This includes the SPDX license identifier, Solidity pragma version, and an import for Foundry's base `Test` contract.
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.24;

    import { Test } from "forge-std/Test.sol";
    // We will import the MerkleAirdrop contract itself later

    contract MerkleAirdropTest is Test {
        // Test functions will be implemented here
    }
    ```

3.  **Configure `foundry.toml` for `forge-std`:**
    To ensure Foundry can correctly locate the `forge-std/Test.sol` import, you need to add a remapping to your `foundry.toml` file. If the file doesn't exist at the root of your project, create it.
    ```toml
    # In foundry.toml
    remappings = [
        '@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/',
        'forge-std/=lib/forge-std/src/' // This line enables forge-std imports
    ]
    ```
    This configuration tells Foundry where to find the `forge-std` library, typically installed in `lib/forge-std/src/`.

## Understanding Merkle Trees and Proofs for Airdrop Testing

To effectively test the `claim` function of our `MerkleAirdrop.sol` contract, which internally uses `MerkleProof.verify` from OpenZeppelin, our tests require several key components:

*   A valid **Merkle root**: This is the single hash stored in the smart contract that represents the entirety of the airdrop distribution data.
*   A list of **addresses and their corresponding airdrop amounts**: This data forms the "leaves" of the Merkle tree.
*   A **Merkle proof** for each specific address/amount pair: This proof allows an individual user to demonstrate that their address and amount are part of the Merkle tree, without revealing the entire dataset.

**Introducing `murky` for Merkle Tree Generation:**
To generate these Merkle roots and proofs within our Foundry project, we'll utilize the `murky` library by `dmfxyz` (available on GitHub: `https://github.com/dmfxyz/murky`). This library provides tools for constructing Merkle trees and generating proofs directly within Foundry scripts.

**Data Structure for Merkle Tree Generation:**
We will use two JSON files to manage the Merkle tree data: `input.json` for the raw data and `output.json` for the generated tree information including proofs.

1.  **`input.json` (Raw Airdrop Data):**
    This file serves as the input for our Merkle tree generation script. It defines the structure and values for each leaf node.
    *   `types`: An array specifying the data types for each component of a leaf node (e.g., `["address", "uint"]` for an address and its corresponding airdrop amount).
    *   `count`: The total number of leaf nodes (i.e., airdrop recipients).
    *   `values`: An object where keys are zero-based indices. Each value is an object representing the components of a leaf. For types `["address", "uint"]`, the inner object would have keys `"0"` for the address and `"1"` for the amount.

    Example snippet of `input.json`:
    ```json
    {
      "types": [
        "address",
        "uint"
      ],
      "count": 4,
      "values": {
        "0": {
          "0": "0x6CA6d1e2D5347Bfab1d91e883F1915560e891290",
          "1": "2500000000000000000"
        },
        "1": {
          "0": "0xAnotherAddress...",
          "1": "1000000000000000000"
        }
        // ... other values up to count-1
      }
    }
    ```

2.  **`output.json` (Generated Merkle Tree Data):**
    This file will be produced by our script after processing `input.json`. It contains the complete Merkle tree information, including the root and individual proofs. Each entry in the JSON array corresponds to a leaf.
    *   `inputs`: The original data for the leaf (e.g., `["address_value", "amount_value"]`).
    *   `proof`: An array of `bytes32` hashes representing the Merkle proof required to verify this leaf against the root.
    *   `root`: The `bytes32` Merkle root of the entire tree. This value will be the same for all entries.
    *   `leaf`: The `bytes32` hash of this specific leaf's data.

    Example snippet of an entry in `output.json`:
    ```json
    {
      "inputs": [
        "0x6CA6d1e2D5347Bfab1d91e883F1915560e891290",
        "2500000000000000000"
      ],
      "proof": [
        "0xfd7c981d30bece61f7499702bf5903114a0e06b51ba2c53abdf7b62986c00aef",
        "0x46f4c7c1c21e8a0c03949be8a51d2d02d1ec75b55d97a9993c3dbaf3a5a1e2f4"
      ],
      "root": "0x474d994c59e37b12805fd7bcbbcd046cf1907b90de3b7fb083cf3636c0ebfb1a",
      "leaf": "0xd1445c931158119d00449ffcac3c947d828c359c34a6646b995962b35b5c6adc"
    }
    // This structure is repeated for each leaf in the airdrop.
    ```

## Scripting Merkle Tree Generation with Foundry and Murky

Now, let's create the Foundry scripts to generate `input.json` and then use `murky` to produce `output.json`.

1.  **Install the `murky` Library:**
    Use Foundry's package manager, `forge`, to install `murky`:
    ```bash
    forge install dmfxyz/murky --no-commit
    ```
    The `--no-commit` flag prevents `forge` from creating a new commit for this installation if your project is a git repository.

2.  **Directory Setup for Scripts and Data:**
    *   Create a `script/` folder at the root of your Foundry project if it doesn't already exist.
    *   Inside `script/`, create a `target/` folder. This `script/target/` directory will store our `input.json` and `output.json` files.

3.  **Generating `input.json` with `GenerateInput.s.sol`:**
    This script will programmatically create the `input.json` file containing our airdrop recipient addresses and amounts.

    *   **Location:** `script/GenerateInput.s.sol`
    *   **Purpose:** To automate the creation of the `input.json` file based on a predefined whitelist and amount.
    *   **Implementation:**
        ```solidity
        // SPDX-License-Identifier: MIT
        pragma solidity ^0.8.24;

        import { Script } from "forge-std/Script.sol";
        import { console } from "forge-std/console.sol";

        contract GenerateInput is Script {
            string constant FILE_PATH = "script/target/input.json";

            function run() external {
                // Define airdrop data
                string[] memory types = new string[](2);
                types[0] = "address";
                types[1] = "uint";

                uint256 amount = 2500 * 1e18; // Example amount

                address[] memory whitelist = new address[](4);
                whitelist[0] = 0x6CA6d1e2D5347Bfab1d91e883F1915560e891290;
                whitelist[1] = 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B; // Example addresses
                whitelist[2] = 0x1Db3439a222C519ab44bb1144fC28167b4Fa6EE6;
                whitelist[3] = 0x0E466e7519A469F20168796A0807B758A2339791;

                string memory json = createJSON(types, whitelist, amount);
                vm.writeFile(FILE_PATH, json);
                console.log("Successfully wrote input.json to %s", FILE_PATH);
            }

            function createJSON(
                string[] memory types,
                address[] memory whitelist,
                uint256 amount
            ) internal pure returns (string memory) {
                string memory json = "{";

                // Add types
                json = string.concat(json, "\"types\": [");
                for (uint i = 0; i < types.length; i++) {
                    json = string.concat(json, "\"", types[i], "\"");
                    if (i < types.length - 1) {
                        json = string.concat(json, ", ");
                    }
                }
                json = string.concat(json, "], ");

                // Add count
                json = string.concat(
                    json,
                    "\"count\": ",
                    vm.toString(whitelist.length),
                    ", "
                );

                // Add values
                json = string.concat(json, "\"values\": {");
                for (uint i = 0; i < whitelist.length; i++) {
                    json = string.concat(
                        json,
                        "\"",
                        vm.toString(i),
                        "\": {",
                        "\"0\": \"",
                        vm.toString(whitelist[i]),
                        "\", ",
                        "\"1\": \"",
                        vm.toString(amount),
                        "\"}"
                    );
                    if (i < whitelist.length - 1) {
                        json = string.concat(json, ", ");
                    }
                }
                json = string.concat(json, "}}");
                return json;
            }
        }
        ```

    *   **File System Permissions Fix:**
        When you first try to run a script that writes files using `vm.writeFile()`, you might encounter an error like: "path script/target/input.json is not allowed to be accessed for write operations." To resolve this, you must grant file system permissions in your `foundry.toml` file. Add the `fs_permissions` key:
        ```toml
        # In foundry.toml
        fs_permissions = [{ access = "read-write", path = "./"}]

        # Ensure this is above or correctly placed with other configurations like remappings
        remappings = [
            '@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/',
            'forge-std/=lib/forge-std/src/'
        ]
        ```
        This configuration allows Foundry scripts to read and write files within the project directory.

    *   **Running the `GenerateInput.s.sol` script:**
        Execute the following command in your terminal from the project root:
        ```bash
        forge script script/GenerateInput.s.sol:GenerateInput
        ```
        After successful execution, you will find `input.json` populated in the `script/target/` directory.

4.  **Generating `output.json` with `MakeMerkle.s.sol`:**
    This script reads `input.json`, utilizes the `murky` library to compute the Merkle root and proofs for each entry, and then writes this comprehensive data to `output.json`.

    *   **Purpose:** To process the raw airdrop data and generate the necessary Merkle tree components (root, leaves, proofs).
    *   **Location:** `script/MakeMerkle.s.sol`
    *   **Key Imports from `murky`:**
        ```solidity
        // At the top of MakeMerkle.s.sol
        import { Merkle } from "murky/src/Merkle.sol";
        import { ScriptHelper } from "murky/script/common/ScriptHelper.sol"; // Contains ltrim64
        import { stdJson } from "forge-std/StdJson.sol";
        import { Script } from "forge-std/Script.sol";
        import { console } from "forge-std/console.sol";
        ```

    *   **Remapping for `murky` in `foundry.toml`:**
        Add a remapping for the `murky` library in your `foundry.toml` file if it's not already present from the install step (though `forge install` usually handles this).
        ```toml
        # In foundry.toml (add to existing remappings)
        remappings = [
            '@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/',
            'forge-std/=lib/forge-std/src/',
            'murky/=lib/murky/' // Added for murky library
        ]
        ```

    *   **Logic Overview (Conceptual - actual code can be adapted from `murky` examples or course repositories):**
        The `MakeMerkle.s.sol` script performs the following main operations:
        1.  **Read and Parse `input.json`**: Uses `vm.readFile()` to load the content of `script/target/input.json`. Then, it uses `stdJson` cheatcodes (e.g., `stdJson.readStringArray(json, ".types")`, `stdJson.readUint(json, ".count")`) to parse the JSON data into Solidity variables.
        2.  **Process Each Leaf Entry**:
            *   Iterates `count` times (once for each leaf defined in `input.json`).
            *   For each leaf, it reads the constituent parts (e.g., address and amount) based on the `types` array.
            *   **Address to `bytes32` Conversion**: Ethereum addresses are 20 bytes. For cryptographic hashing within the Merkle tree, they need to be converted to `bytes32`. This is typically done by casting: `address` -> `uint160` -> `uint256` -> `bytes32`. The amount (`uint`) is also cast to `bytes32`.
            *   These `bytes32` values are stored temporarily for the current leaf.
        3.  **Leaf Hash Calculation**:
            *   The `bytes32` representations of the leaf's data (e.g., address and amount) are ABI-encoded together: `abi.encode(data_part1_bytes32, data_part2_bytes32, ...)`.
            *   **Trimming ABI Encoding**: The `ScriptHelper.ltrim64()` function from `murky` is used. When dynamic types (like arrays) are declared in memory and then ABI-encoded, the encoding includes offsets and lengths. `ltrim64` removes these, providing the tightly packed data bytes suitable for hashing.
            *   **Double Hashing**: The trimmed, ABI-encoded data is then hashed, typically twice: `keccak256(bytes.concat(keccak256(trimmed_encoded_data)))`. This double hashing is a common practice in Merkle tree implementations to mitigate potential vulnerabilities like second-preimage attacks, especially if parts of the tree structure might be known or manipulated.
            *   The resulting `bytes32` hash is the leaf hash for the current entry and is stored in an array of `leaves`.
        4.  **Generate Merkle Root and Proofs**:
            *   After all leaf hashes are computed and collected in the `leaves` array:
            *   An instance of `murky`'s `Merkle` library is used.
            *   For each leaf `i`:
                *   `merkleInstance.getProof(leaves, i)`: Retrieves the Merkle proof for the `i`-th leaf.
                *   `merkleInstance.getRoot(leaves)`: Retrieves the Merkle root of the entire tree (this will be the same for all leaves).
        5.  **Construct and Write `output.json`**:
            *   For each leaf, the script gathers its original input values (as strings), its computed `leaf` hash, its `proof`, and the common `root`.
            *   This information is formatted into a JSON object structure as described earlier for `output.json`.
            *   All these individual JSON entry strings are collected and combined into a single valid JSON array string.
            *   `vm.writeFile("script/target/output.json", finalJsonString)` saves the complete Merkle tree data.

    *   **Running the `MakeMerkle.s.sol` script:**
        (Assuming your `MakeMerkle.s.sol` contract is named `MakeMerkle` and has a `run()` function)
        ```bash
        forge script script/MakeMerkle.s.sol:MakeMerkle
        ```
        Upon successful execution, `script/target/output.json` will be created, containing all the data necessary for your tests.

## Recap: The Merkle Data Generation Pipeline

To summarize the process of generating the data required for testing our Merkle Airdrop:

1.  **`GenerateInput.s.sol` Execution:** This script creates `script/target/input.json`, which lists all airdrop recipients (addresses) and their corresponding token amounts.
2.  **`MakeMerkle.s.sol` Reads Input:** This script ingests the `input.json` file.
3.  **Leaf Hash Calculation:** For each address/amount pair from `input.json`:
    *   The address and amount are ABI-encoded (after necessary type conversions to `bytes32`).
    *   The ABI-encoded data is trimmed (e.g., using `ltrim64`) to remove encoding overhead.
    *   This trimmed data is then double-hashed (`keccak256(bytes.concat(keccak256(trimmed_data)))`) to produce the final `bytes32` leaf hash.
4.  **Merkle Tree Construction with `murky`:** `MakeMerkle.s.sol` uses the `murky` library, providing it with all the generated leaf hashes. `murky` then:
    *   Calculates the single Merkle `root` for the entire dataset.
    *   Generates the unique Merkle `proof` for each individual `leaf`.
5.  **`output.json` Generation:** All the generated data—original inputs, the proof for each leaf, the common Merkle root, and each leaf's hash—is written to `script/target/output.json`.

With both `input.json` and `output.json` successfully generated, you are now fully equipped with the necessary data fixtures to proceed with writing comprehensive unit and integration tests for your `MerkleAirdrop.sol` smart contract in `MerkleAirdrop.t.sol`.