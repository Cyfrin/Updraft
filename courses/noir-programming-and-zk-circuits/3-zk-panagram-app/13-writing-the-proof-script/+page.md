## Generating Zero-Knowledge Proofs with Noir and TypeScript for Foundry Tests

This lesson details the creation of a TypeScript script, `generateProof.ts`, designed to generate zero-knowledge proofs from a Noir circuit. These proofs can then be seamlessly integrated into testing environments like Foundry, enabling verification of smart contract interactions involving ZK proofs.

## Retrieving Circuit Bytecode with Robust File Pathing

The foundational step in our script is to access the compiled Noir circuit's bytecode. This bytecode is typically stored in a JSON file, for instance, `zk_panagram.json`, located within the `circuits/target/` directory post-compilation.

A critical consideration here is the use of *absolute* file paths. Our `generateProof.ts` script might be executed from various locations within the project (e.g., the project root, or the `contracts` directory when invoked by Foundry via Foreign Function Interface - FFI). Relative paths are brittle in such scenarios, as their resolution depends on the current working directory, which can change. Using absolute paths ensures the script can reliably locate the circuit JSON file regardless of where it's executed from.

## Constructing the Absolute Path to Circuit Data

To robustly determine the absolute path to our circuit's JSON file (`zk_panagram.json`), we'll leverage several Node.js modules and ES module features:

1.  **`import.meta.url`**: This meta-property, available in ES modules, provides the URL of the current module file. For `generateProof.ts` located at `project/contracts/js-scripts/generateProof.ts`, this would yield something like `file:///path/to/your/project/contracts/js-scripts/generateProof.ts`.
2.  **`fileURLToPath` (from `url` module)**: This utility function converts a `file:` URL into a standard operating system file path.
3.  **`path.dirname()` (from `path` module)**: This function extracts the directory name from a given file path. Applying it to the path of `generateProof.ts` would give us `/path/to/your/project/contracts/js-scripts/`.
4.  **`path.resolve()` (from `path` module)**: This function resolves a sequence of paths or path segments into an absolute path. It intelligently handles `../` segments, making it ideal for navigating from our script's directory to the circuit JSON.

The following TypeScript code demonstrates how to derive the absolute path:

```typescript
// At the top of generateProof.ts
import path from "path";
import { fileURLToPath } from "url";
// ... other necessary imports

// Inside your script's logic:

// Step 1: Get the directory of the current script.
const currentScriptDir = path.dirname(fileURLToPath(import.meta.url));

// Step 2: Define the relative path from the current script's directory to the circuit JSON.
// Assuming generateProof.ts is in contracts/js-scripts/,
// and zk_panagram.json is in circuits/target/
const relativeCircuitPath = "../../circuits/target/zk_panagram.json";

// Step 3: Resolve the absolute path to the circuit JSON.
const circuitPath = path.resolve(currentScriptDir, relativeCircuitPath);

// Alternatively, a more condensed form:
const circuitPathAlternate = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)), // Directory of the current script
  "../../circuits/target/zk_panagram.json"       // Relative path to the circuit JSON
);
```
While `__dirname` is available in CommonJS modules for getting the current directory, `import.meta.url` combined with `fileURLToPath` and `path.dirname` is the standard and more versatile approach in ES modules.

## Reading and Parsing the Circuit JSON

Once the `circuitPath` (the absolute path to `zk_panagram.json`) is established, the script reads and parses this file:

1.  **Read File Content**: The `fs.readFileSync()` method from Node.js's built-in `fs` (file system) module is used to read the file's content. Specifying `'utf8'` encoding ensures the content is interpreted as a string.
2.  **Parse JSON String**: The retrieved string is then parsed into a JavaScript object using `JSON.parse()`. This object, which we'll call `circuit`, provides access to the circuit's properties, most importantly `circuit.bytecode`.

```typescript
import fs from "fs";
// ... other imports
// const circuitPath = ... (derived as shown above)

// Read the circuit JSON file
const circuitFileContent = fs.readFileSync(circuitPath, "utf8");

// Parse the JSON content
const circuit = JSON.parse(circuitFileContent);

// Now, circuit.bytecode is accessible
// console.log(circuit.bytecode); // For verification
```

## Crafting the `generateProof` Asynchronous Function

The core logic for generating the zero-knowledge proof is encapsulated within an asynchronous function, `generateProof`. Asynchronicity is necessary because several underlying operations, such as initializing the Noir instance and the backend, are promise-based.

```typescript
import { Noir } from "@noir-lang/noir_js";
import { UltraHonkBackend } from "@aztec/bb.js"; // Or your chosen backend
import { ethers } from "ethers"; // For ABI encoding
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// (Absolute path derivation and circuit parsing logic from above should be here or accessible)
// For clarity, assume 'circuit' (parsed JSON) is available in this scope.
// e.g., const circuit = JSON.parse(fs.readFileSync(path.resolve(...), "utf8"));

export default async function generateProof() {
  // Derive absolute path and parse circuit JSON
  const circuitPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../circuits/target/zk_panagram.json"
  );
  const circuitFileContent = fs.readFileSync(circuitPath, "utf8");
  const circuitData = JSON.parse(circuitFileContent); // Renamed to avoid conflict

  // Retrieve command-line arguments, skipping 'node' and script path
  const inputsArray = process.argv.slice(2);

  try {
    // 1. Initialize Noir with the circuit definition
    const noir = new Noir(circuitData); // Use the parsed JSON object
    await noir.init();

    // 2. Initialize the backend (e.g., UltraHonkBackend) with the circuit bytecode
    // The { threads: 1 } option configures the backend for single-threaded operation.
    const backend = new UltraHonkBackend(circuitData.bytecode, { threads: 1 });

    // 3. Prepare the inputs for the circuit
    // This structure must match the InputMap defined in your Noir circuit (Nargo.toml or main.nr)
    // Example: Taking inputs from command-line arguments
    const inputs = {
      guess_hash: inputsArray[0],  // First CLI argument
      answer_hash: inputsArray[1] // Second CLI argument
      // Add other inputs as required by your circuit
    };

    // 4. Execute the circuit with the inputs to generate the witness
    // noir.execute returns an object { witness, returnValue }
    const { witness } = await noir.execute(inputs);

    // 5. Temporarily suppress console.log from the backend during proof generation
    // Some backends might produce verbose logs. This ensures clean output for FFI.
    const originalLog = console.log;
    console.log = () => {}; // Override with an empty function

    // 6. Generate the proof using the backend and the witness
    // The { keccak: true } option may be required if your verifier contract uses Keccak.
    const { proof } = await backend.generateProof(witness, { keccak: true });

    // 7. Restore the original console.log function
    console.log = originalLog;

    // 8. ABI encode the proof for smart contract consumption
    // The proof (typically a Uint8Array) needs to be encoded as 'bytes' (a hex string).
    const proofEncoded = ethers.AbiCoder.defaultAbiCoder().encode(
      ["bytes"], // The Solidity type to encode as
      [proof]    // The value to encode (must be wrapped in an array)
    );

    return proofEncoded;

  } catch (error) {
    // Log the error for debugging
    console.error("Error during proof generation:", error);
    // Re-throw the error to be caught by the calling IIFE, signaling failure
    throw error;
  }
}
```

## Executing the Script via IIFE for Command-Line Use

To make `generateProof.ts` executable directly from the command line and to ensure its output is suitable for Foundry's FFI, we use an Immediately Invoked Function Expression (IIFE) at the end of the script. This IIFE calls our `generateProof` function and handles its resolution or rejection.

```typescript
// (IIFE at the end of generateProof.ts)
(async () => {
  try {
    const proof = await generateProof();
    // Write the ABI-encoded proof to standard output for FFI consumption
    // process.stdout.write ensures no extra formatting (like newlines from console.log)
    process.stdout.write(proof);
    // Exit with code 0 to indicate successful execution
    process.exit(0);
  } catch (error) {
    // Error is already logged within generateProof, but we can log a generic message here too.
    // console.error("Script execution failed."); // Redundant if generateProof logs
    // Exit with code 1 to indicate failure
    process.exit(1);
  }
})();
```
Using `process.stdout.write(proof)` is crucial for FFI, as `console.log` might append newlines or other formatting that could corrupt the data expected by `vm.ffi` in Foundry. `process.exit(0)` signals success, while `process.exit(1)` indicates an error.

## Integration with Foundry Smart Contract Tests

The generated ABI-encoded proof can be utilized within Foundry tests. The Solidity test file (e.g., `Panagram.t.sol`) needs to be updated to call the `generateProof.ts` script using `vm.ffi` and then decode the returned proof.

Consider a helper function `_getProof` in your Solidity test:

```solidity
// In your Foundry test file (e.g., Panagram.t.sol)
// pragma solidity ^0.8.0;
// import "forge-std/Test.sol";
// import "forge-std/console.sol";

contract PanagramTest is Test {
    // ... other test setup ...
    uint256 constant NUM_SCRIPT_ARGS = 5; // npx, tsx, script_path, input1, input2

    // Example Panagram contract interface
    // interface IPanagram {
    //     function makeGuess(bytes memory _proof) external;
    //     function balanceOf(address account, uint256 id) external view returns (uint256);
    // }
    // IPanagram panagram; // Your contract instance

    function _getProof(bytes32 guess, bytes32 correctAnswer) internal returns (bytes memory _proof) {
        string[] memory inputs = new string[](NUM_SCRIPT_ARGS);
        inputs[0] = "npx"; // Or node, yarn, pnpm etc.
        inputs[1] = "tsx"; // Transpiler/runner for TypeScript
        inputs[2] = "js-scripts/generateProof.ts"; // Relative path to your script from project root
        inputs[3] = vm.toString(uint256(guess));       // Pass guess_hash as string
        inputs[4] = vm.toString(uint256(correctAnswer)); // Pass answer_hash as string

        // vm.ffi executes the script and returns its stdout as bytes
        bytes memory encodedProof = vm.ffi(inputs);

        // Decode the ABI-encoded proof (which was encoded as 'bytes')
        (_proof) = abi.decode(encodedProof, (bytes));

        console.log("Decoded proof for contract:");
        console.logBytes(_proof);
        return _proof;
    }

    // Example test using the proof
    // function testMakeCorrectGuess() public {
    //     address user = address(0x123);
    //     bytes32 guessHash = keccak256("noir");
    //     bytes32 answerHash = keccak256("noir"); // Assuming correct answer
    //
    //     vm.prank(user);
    //     bytes memory proof = _getProof(guessHash, answerHash);
    //
    //     panagram.makeGuess(proof);
    //
    //     // Assertions
    //     vm.assertEq(panagram.balanceOf(user, 0), 1, "Winner NFT not minted"); // ID 0 for winner
    //     vm.assertEq(panagram.balanceOf(user, 1), 0, "Runner-up NFT wrongly minted for winner");
    //
    //     // Test double spending/guessing
    //     vm.expectRevert(); // Or specific revert message
    //     vm.prank(user);
    //     panagram.makeGuess(proof);
    // }
}
```
In this setup, `vm.ffi` calls `generateProof.ts`. The script outputs the ABI-encoded proof as a hex string to `stdout`. `vm.ffi` captures this as `bytes memory encodedProof`. We then use `abi.decode(encodedProof, (bytes))` to retrieve the original `bytes memory _proof` that the smart contract's `makeGuess` function expects.

## Running the Tests and Verifying Integration

With the `generateProof.ts` script and the updated Foundry tests in place, you can execute your tests using the `forge test` command (optionally with verbosity flags like `-vvv`). A successful test run confirms that the TypeScript script is correctly generating proofs and that these proofs are valid for your smart contract logic.

## Summary of Key Dependencies

The `generateProof.ts` script relies on several key Node.js modules and Web3 libraries:

*   **`@noir-lang/noir_js`**: The official Noir JavaScript library for interacting with Noir circuits (compiling, executing, proving).
*   **`@aztec/bb.js`** (or chosen backend): The backend library responsible for cryptographic operations like proof generation and verification (UltraHonkBackend is used in this example).
*   **`ethers`**: A comprehensive Ethereum JavaScript library, used here primarily for ABI encoding.
*   **`url` (Node.js built-in)**: Provides utilities for URL resolution and parsing, specifically `fileURLToPath`.
*   **`path` (Node.js built-in)**: Offers utilities for working with file and directory paths, like `dirname` and `resolve`.
*   **`fs` (Node.js built-in)**: The file system module, used for reading file contents (`readFileSync`).

This `generateProof.ts` script provides a robust and automatable way to generate zero-knowledge proofs, significantly enhancing the development and testing workflow for Web3 projects utilizing Noir circuits.