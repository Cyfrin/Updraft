## Generating Your Merkle Tree and Proofs for Airdrop Testing

This lesson guides you through generating the necessary Merkle tree data, including the root hash and individual proofs, required to test a Solidity smart contract implementing a Merkle tree-based airdrop. We'll use Foundry for scripting and testing, along with the external "murky" library for Merkle tree computations.

## Preparing the Smart Contract for Testing

Before we can effectively test our `MerkleAirdrop.sol` contract, we need access to some of its internal state variables during our tests. Since these variables are often private for security reasons, we'll add simple public getter functions. These functions allow us to read values like the stored Merkle root and the airdrop token address from our test environment.

Add the following functions to your `MerkleAirdrop.sol` contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// ... existing contract code ...

// Allows reading the Merkle root stored in the contract
function getMerkleRoot() external view returns (bytes32) {
    // Assumes i_merkleRoot is the private state variable holding the root
    return i_merkleRoot;
}

// Allows reading the address of the airdrop token contract
function getAirdropToken() external view returns (IERC20) {
    // Assumes i_airdropToken is the private state variable for the token
    return i_airdropToken;
}

// ... rest of the contract code ...
```

These getters provide read-only access needed specifically for verification within our test suite.

## Setting Up the Foundry Test Environment

Foundry tests are written in Solidity and typically reside in the `test/` directory. We'll create a new test file for our `MerkleAirdrop` contract.

1.  **Create the Test File:** Create a file named `MerkleAirdrop.t.sol` inside the `test/` directory.
2.  **Initial Test Contract Code:** Add the basic structure for a Foundry test contract:

    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.24; // Use the appropriate Solidity version

    // Import the base Test contract from Foundry's standard library
    import { Test } from "forge-std/Test.sol";
    // Import your contract to be tested (adjust path if needed)
    import { MerkleAirdrop } from "../src/MerkleAirdrop.sol";
    // Import IERC20 if needed for token interactions
    import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

    // Define the test contract, inheriting from Test
    contract MerkleAirdropTest is Test {
        // Declare state variables for the contract instance, token, etc.
        MerkleAirdrop public merkleAirdrop;
        // MockERC20 public airdropToken; // Assuming a mock token will be used

        // setUp function runs before each test case
        function setUp() public {
            // Deployment and setup logic will go here
        }

        // Test functions will be added later, starting with `test` prefix
        // function testClaim() public { ... }
    }
    ```
3.  **Configure Remappings:** Foundry needs to know where to find imported libraries like `forge-std` and `@openzeppelin/contracts`. Update your `foundry.toml` file to include these remappings:

    ```toml
    [profile.default]
    src = "src"
    out = "out"
    libs = ["lib"]

    # Add or update the remappings section
    remappings = [
        '@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/',
        'forge-std/=lib/forge-std/src/' # Ensure this line exists
    ]

    # See more config options https://github.com/foundry-rs/foundry/blob/master/crates/config/README.md#all-options
    ```

This setup provides the basic framework for writing our Solidity-based tests using Foundry's capabilities.

## The Need for Off-Chain Merkle Tree Generation

Testing the core functionality of our `MerkleAirdrop` contract, specifically the `claim` function, presents a challenge. The `claim` function requires:

1.  The user's address.
2.  The amount they are eligible to claim.
3.  A **Merkle proof** validating that their specific allocation (address and amount) is part of the overall airdrop list represented by the **Merkle root** stored in the contract.

Furthermore, the `MerkleAirdrop` contract itself needs to be deployed with the correct Merkle root hash corresponding to the intended airdrop distribution.

This Merkle root and the individual proofs cannot be easily generated on-chain within the test setup. They must be computed **off-chain** based on the complete list of airdrop recipients and their amounts.

To solve this, we will create two Foundry scripts:

1.  `GenerateInput.s.sol`: This script will generate a structured JSON file (`input.json`) containing the raw airdrop data (list of addresses and corresponding amounts).
2.  `MakeMerkle.s.sol`: This script will read `input.json`, compute the Merkle tree using an external library, and output another JSON file (`output.json`) containing the crucial data needed for testing: the overall Merkle root, and for each entry, its leaf hash and its unique Merkle proof.

## Understanding the Input and Output Data Structures

The scripts rely on specific JSON formats for input and output.

**1. `input.json` (Airdrop Allocation Data)**

This file serves as the input for the Merkle tree generation process. It defines the data that will form the leaves of the tree.

*   **Structure:**
    *   `types`: An array of strings specifying the data types for each element within a leaf node (e.g., `["address", "uint"]`).
    *   `count`: An integer indicating the total number of leaf nodes (claimants).
    *   `values`: An array of arrays. Each inner array represents one leaf node and contains the data corresponding to the `types` definition.
*   **Example Snippet:**
    ```json
    {
      "types": ["address", "uint"],
      "count": 4,
      "values": [
        ["0xAddress1...", "25000000000000000000"],
        ["0xAddress2...", "25000000000000000000"],
        ["0xAddress3...", "25000000000000000000"],
        ["0xAddress4...", "25000000000000000000"]
      ]
    }
    ```
*   **Purpose:** Defines precisely who is eligible for the airdrop and the specific amount allocated to each address. This data forms the basis for the Merkle tree.

**2. `output.json` (Merkle Tree Dump)**

This file contains the results of the Merkle tree generation, providing the data needed for contract deployment and claim verification during tests. It's structured as an array of objects, one for each entry in `input.json`.

*   **Structure (Array of Objects):**
    *   `inputs`: An array containing the original input values (e.g., address string, amount string) for that specific leaf.
    *   `proof`: An array of `bytes32` strings, representing the sibling hashes needed to reconstruct the Merkle path from this leaf to the root. This is the Merkle proof.
    *   `root`: A `bytes32` string representing the single Merkle root hash for the *entire* tree. This value will be the same in every object within the array.
    *   `leaf`: A `bytes32` string representing the hash of this specific leaf node's data (e.g., hash of the ABI-encoded address and amount).
*   **Example Snippet (One entry):**
    ```json
    [
      {
        "inputs": ["0xAddress1...", "25000000000000000000"],
        "proof": ["0xProofHash1...", "0xProofHash2..."],
        "root": "0xRootHashForAllEntries...",
        "leaf": "0xLeafHashForAddress1..."
      },
      // ... more entries ...
    ]
    ```
*   **Purpose:**
    *   The `root` value is used when deploying the `MerkleAirdrop` contract.
    *   For testing a specific claim, the claimant's `leaf` hash and their corresponding `proof` array are passed to the `claim` function for on-chain verification against the contract's stored `root`.

## Introducing and Installing the Murky Library

To handle the complex Merkle tree calculations within our Solidity scripts, we'll use the "murky" library.

*   **Resource:** [github.com/dmfxyz/murky](https://github.com/dmfxyz/murky)
*   **Installation:** Use Foundry's package manager to install it as a project dependency. Run the following command in your terminal at the root of your Foundry project:

    ```bash
    forge install dmfxyz/murky --no-commit
    ```
*   **Result:** This command downloads the murky library code into the `lib/murky/` directory within your project. Foundry can now access its contracts and libraries.

## Setting Up the Scripting Environment

We need a dedicated place to run our scripts and store the generated JSON files.

1.  **Create Directories:** Ensure you have a `script/` directory in your project root. Inside `script/`, create a `target/` subdirectory.
    ```
    your-project-root/
    ├── script/
    │   └── target/  <-- Generated JSON files will go here
    ├── src/
    ├── test/
    ├── lib/
    └── foundry.toml
    ```
2.  **Create Script Files:** Create two empty files within the `script/` directory:
    *   `script/GenerateInput.s.sol`
    *   `script/MakeMerkle.s.sol`

These scripts will populate the `script/target/` directory with `input.json` and `output.json`.

## Script 1: Generating the Airdrop Input Data (GenerateInput.s.sol)

This script programmatically constructs the `input.json` file based on a predefined list of addresses and a standard airdrop amount.

1.  **Code for `GenerateInput.s.sol`:**

    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.24;

    import { Script } from "forge-std/Script.sol";
    import { console } from "forge-std/console.sol";

    contract GenerateInput is Script {
        // --- Configuration ---
        // Airdrop amount (e.g., 25 tokens with 18 decimals)
        uint256 private constant AIRDROP_AMOUNT = 25 * 1e18;
        // Data types for each leaf entry
        string[] private types = ["address", "uint"];
        // List of whitelisted addresses (replace with your actual addresses)
        address[] private whitelist = [
            0x70997970C51812dc3A010C7d01b50e0d17dc79C8, // Example Address 1
            0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC, // Example Address 2
            0x90F79bf6EB2c4f870365E785982E1f101E93b906, // Example Address 3
            0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65  // Example Address 4
            // Add more addresses as needed
        ];
        // Path relative to project root where input.json will be saved
        string private constant INPUT_JSON_PATH = "script/target/input.json";
        // --- End Configuration ---

        function run() public view {
            // Start building the JSON string
            string memory json = "{";

            // Add types array
            json = string.concat(json, '"types": ["', types[0], '", "', types[1], '"],');

            // Add count
            uint256 count = whitelist.length;
            json = string.concat(json, '"count": ', vm.toString(count), ',');

            // Add values array
            json = string.concat(json, '"values": [');
            for (uint256 i = 0; i < count; ) {
                json = string.concat(
                    json,
                    '["',
                    vm.toString(whitelist[i]), // Address as string
                    '", "',
                    vm.toString(AIRDROP_AMOUNT), // Amount as string
                    '"]'
                );
                unchecked { ++i; } // Use unchecked increment inside loop
                if (i < count) {
                    json = string.concat(json, ','); // Add comma if not the last element
                }
            }
            json = string.concat(json, ']'); // Close values array

            json = string.concat(json, '}'); // Close JSON object

            // Write the generated JSON string to the file
            string memory filePath = string.concat(vm.projectRoot(), "/", INPUT_JSON_PATH);
            vm.writeFile(filePath, json);

            console.log("DONE: Input JSON generated at %s", INPUT_JSON_PATH);
        }
    }
    ```

2.  **Grant Filesystem Permissions:** Foundry scripts require explicit permission to write files. Add the following `fs_permissions` section to your `foundry.toml` file (usually placed near the top or before `remappings`):

    ```toml
    # Grant read-write access to the current directory and subdirectories
    fs_permissions = [{ access = "read-write", path = "./"}]

    [profile.default]
    # ... rest of your profile ...

    remappings = [
        # ... your remappings ...
    ]
    ```
    *Note: Ensure the syntax is correct (`path = "./"`). A missing equals sign can cause errors.*

3.  **Run the Script:** Execute the script using the following command in your terminal:

    ```bash
    forge script script/GenerateInput.s.sol:GenerateInput --rpc-url localhost --broadcast
    ```
    *(Note: `--rpc-url` and `--broadcast` might not be strictly necessary if the script only performs view operations and file writing, but are often included)*

    If successful, you will see the "DONE" message, and the `script/target/input.json` file will be created with the airdrop data.

## Script 2: Generating the Merkle Tree and Proofs (MakeMerkle.s.sol)

This script reads `input.json`, utilizes the "murky" library to compute the Merkle tree, root, and proofs, and then writes the results to `output.json`.

1.  **Add Murky Remapping:** Ensure Foundry can find the murky library by adding its remapping to `foundry.toml`:

    ```toml
    # In foundry.toml
    fs_permissions = [{ access = "read-write", path = "./"}]

    [profile.default]
    # ... rest of profile ...

    remappings = [
        '@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/',
        'forge-std/=lib/forge-std/src/',
        'murky/=lib/murky/src/' # Add remapping for murky library
    ]
    ```
    *Run `forge build` after adding the remapping to confirm it works. VS Code might sometimes show errors for imports even if the build is successful.*

2.  **Code for `MakeMerkle.s.sol`:**

    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.24;

    // Foundry imports
    import { Script } from "forge-std/Script.sol";
    import { console } from "forge-std/console.sol";
    import { stdJson } from "forge-std/StdJson.sol";

    // Murky library imports
    import { Merkle } from "murky/Merkle.sol";
    // Import helper functions often found with murky examples or create your own
    // Assuming helpers like bytes32ArrayToString, stringArrayToString exist
    // import { ScriptHelper } from "./ScriptHelper.sol"; // Or similar

    contract MakeMerkle is Script { // Potentially inherit helpers: is Script, ScriptHelper
        using stdJson for string; // Attach stdJson functions to string type

        // --- Configuration ---
        string private constant INPUT_JSON_PATH = "script/target/input.json";
        string private constant OUTPUT_JSON_PATH = "script/target/output.json";
        // --- End Configuration ---

        Merkle private m = new Merkle(); // Instance of Murky's Merkle contract

        function run() public {
            // 1. Read the input JSON file
            string memory inputJson = vm.readFile(string.concat(vm.projectRoot(), "/", INPUT_JSON_PATH));

            // 2. Parse input JSON data
            string[] memory types = inputJson.readStringArray(".types");
            uint256 count = inputJson.readUint(".count");

            // Arrays to store processed data
            bytes32[] memory leafs = new bytes32[](count); // To store calculated leaf hashes
            string[] memory jsonOutputs = new string[](count); // To store JSON string for each output entry

            // 3. Process each entry to calculate leaf hashes
            console.log("Calculating %s leaf hashes...", vm.toString(count));
            for (uint256 i = 0; i < count; ) {
                bytes memory encodedData; // Will hold ABI encoded data for the leaf

                // Dynamically build the encoded data based on types
                // This example assumes ["address", "uint"] as per GenerateInput.s.sol
                if (compareStrings(types[0], "address") && compareStrings(types[1], "uint")) {
                    string memory keyPathAddress = string.concat(".values[", vm.toString(i), "][0]");
                    string memory keyPathUint = string.concat(".values[", vm.toString(i), "][1]");

                    address addr = inputJson.readAddress(keyPathAddress);
                    uint256 amount = vm.parseUint(inputJson.readString(keyPathUint)); // Read as string, then parse

                    // ABI encode the address and amount tightly packed
                    encodedData = abi.encodePacked(addr, amount);
                } else {
                    // Add handling for other type combinations if necessary
                    revert("Unsupported type combination in input.json");
                }

                // Calculate the leaf hash: keccak256(encodedData)
                // Note: Some implementations might double-hash or use specific encoding.
                // Murky's standard approach is often keccak256(abi.encodePacked(...))
                leafs[i] = keccak256(encodedData);

                unchecked { ++i; }
            }

            // 4. Generate the Merkle root
            bytes32 root = m.getRoot(leafs);
            console.log("Calculated Merkle Root: %s", vm.toString(root));

            // 5. Generate output JSON data (proofs, etc.) for each leaf
            console.log("Generating proofs and output JSON entries...");
            string memory rootString = vm.toString(root); // Convert root to string once

            for (uint256 i = 0; i < count; ) {
                // Get the proof for the current leaf
                bytes32[] memory proof = m.getProof(leafs, i);

                // Get original input values as strings for the output JSON
                string memory keyPathAddress = string.concat(".values[", vm.toString(i), "][0]");
                string memory keyPathUint = string.concat(".values[", vm.toString(i), "][1]");
                string memory inputAddrStr = inputJson.readString(keyPathAddress); // Already a string
                string memory inputAmountStr = inputJson.readString(keyPathUint); // Already a string

                // Convert leaf and proof elements to strings
                string memory leafString = vm.toString(leafs[i]);
                string memory proofString = bytes32ArrayToString(proof); // Requires helper function

                // Construct the JSON object string for this entry
                jsonOutputs[i] = string.concat(
                    '{"inputs": ["', inputAddrStr, '", "', inputAmountStr, '"],',
                    '"proof": ', proofString, ',', // proofString should be a JSON array string "[\"0x...\",...]"
                    '"root": "', rootString, '",',
                    '"leaf": "', leafString, '"}'
                );

                unchecked { ++i; }
            }

            // 6. Combine all entry strings into a single JSON array and write to output.json
            string memory finalOutputJson = string.concat("[", stringArrayToString(jsonOutputs), "]"); // Requires helper
            string memory filePath = string.concat(vm.projectRoot(), "/", OUTPUT_JSON_PATH);
            vm.writeFile(filePath, finalOutputJson);

            console.log("DONE: Output JSON with Merkle data generated at %s", OUTPUT_JSON_PATH);
        }

        // --- Helper Functions ---
        // (Need implementations for these, potentially from a helper library or defined here)

        // Compares two strings (Solidity <0.8.12 doesn't have direct ==)
        function compareStrings(string memory a, string memory b) internal pure returns (bool) {
            return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
        }

        // Converts bytes32 array to a JSON array string: "[\"0x...\", \"0x...\"]"
        function bytes32ArrayToString(bytes32[] memory arr) internal view returns (string memory) {
            string memory result = "[";
            for (uint i = 0; i < arr.length; ) {
                result = string.concat(result, '"', vm.toString(arr[i]), '"');
                unchecked { ++i; }
                if (i < arr.length) {
                    result = string.concat(result, ",");
                }
            }
            result = string.concat(result, "]");
            return result;
        }

        // Joins an array of strings with commas: "str1,str2,str3"
        function stringArrayToString(string[] memory arr) internal pure returns (string memory) {
            string memory result = "";
            for (uint i = 0; i < arr.length; ) {
                result = string.concat(result, arr[i]);
                unchecked { ++i; }
                if (i < arr.length) {
                    result = string.concat(result, ",");
                }
            }
            return result;
        }
    }
    ```
    *Note: The leaf calculation `keccak256(abi.encodePacked(addr, amount))` is a common standard. Ensure this matches how your `MerkleAirdrop.sol` contract verifies proofs. The summary mentioned double hashing (`keccak256(bytes.concat(keccak256(ltrim64(abi.encode(data)))))`) which might be specific to a different murky version or usage pattern; adapt the hashing here if necessary to match your contract's verification logic.*
    *Also Note: Helper functions like `bytes32ArrayToString` and `stringArrayToString` are essential and provided as basic examples above.*

3.  **Run the Script:** Execute the script:

    ```bash
    forge script script/MakeMerkle.s.sol:MakeMerkle --rpc-url localhost --broadcast
    ```

    Upon successful execution, the `script/target/output.json` file will be created. This file contains the Merkle root and the individual proofs and leaf hashes corresponding to each entry in `input.json`.

## Conclusion and Next Steps

You have now successfully:

1.  Prepared the target smart contract (`MerkleAirdrop.sol`) with getter functions for easier testing.
2.  Set up the basic Foundry test file (`MerkleAirdrop.t.sol`) and configuration (`foundry.toml`).
3.  Understood the necessity of off-chain Merkle data generation.
4.  Installed the "murky" library for Merkle tree computations.
5.  Created and executed `GenerateInput.s.sol` to produce the structured airdrop allocation data (`input.json`).
6.  Created and executed `MakeMerkle.s.sol` to read the input, compute the Merkle tree using "murky", and generate the vital `output.json` containing the Merkle root, leaf hashes, and proofs.

With `output.json` generated, you possess the necessary off-chain data (the single Merkle root for deployment, and individual proofs/leaves for claim testing) to proceed with writing comprehensive unit and integration tests for your `MerkleAirdrop` contract within `MerkleAirdrop.t.sol`. You can now parse `output.json` (either manually or using Foundry's file reading/JSON cheatcodes within your tests) to retrieve the root for deployment and the proofs needed for testing the `claim` function.