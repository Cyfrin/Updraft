## Writing Foundry Tests for Your Merkle Airdrop Contract

This lesson guides you through the process of writing robust unit tests for a Solidity-based Merkle Airdrop contract using the Foundry framework. We'll focus on verifying the core functionality: ensuring an eligible user, whose address is part of a pre-defined Merkle tree, can successfully claim their allocated tokens. We'll cover setting up the test environment, generating test user data, integrating Merkle proofs, and leveraging Foundry's powerful cheatcodes.

### Core Concepts Review

Before diving into the code, let's briefly touch upon the key concepts involved:

*   **Foundry Testing:** We'll use Foundry (`forge test`) to write and execute our tests. Tests are written in Solidity, typically inheriting from `forge-std/Test.sol`, allowing for seamless interaction with your smart contracts.
*   **Merkle Airdrop:** This contract design allows for efficient distribution of tokens to a large number of whitelisted addresses. Users prove their eligibility by submitting a Merkle proof, which verifies their inclusion in a list committed to by a single Merkle root stored on-chain.
*   **Merkle Root & Proof:** The `ROOT` is a cryptographic hash representing the entire set of eligible users and their claim amounts. It's stored in the airdrop contract. A `PROOF` (an array of `bytes32` hashes) is provided by the user, allowing the contract to verify their specific claim against the `ROOT`.
*   **ERC20 Tokens:** The airdrop typically distributes an ERC20-compliant token. We'll interact with standard token functions like `balanceOf`, `mint`, and `transfer`.

### Setting Up Your Test Environment

First, let's prepare our test file, `test/MerkleAirdrop.t.sol`.

1.  **Imports and Contract Definition:**
    We begin by importing the necessary contracts: the `Test` contract from `forge-std` for testing utilities, our `MerkleAirdrop` contract, and the `BagelToken` (our example ERC20 token).

    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.24;

    import { Test, console } from "forge-std/Test.sol";
    import { MerkleAirdrop } from "../src/MerkleAirdrop.sol";
    import { BagelToken } from "../src/BagelToken.sol";

    contract MerkleAirdropTest is Test {
        // State variables will be defined here
    }
    ```

2.  **State Variables:**
    We'll define public state variables to hold instances of our deployed contracts, the Merkle root, claim details, and test user information. This makes them accessible across different test functions and in the `setUp` function.

    ```solidity
    // Inside MerkleAirdropTest contract
    MerkleAirdrop public airdrop;
    BagelToken public token;

    // This ROOT value is derived from your Merkle tree generation script
    // It will be updated later in the process
    bytes32 public ROOT = 0x474d994c58e37b12085fdb7bc6bbc0d46cf1907b90de3b7fb883cf3636c8ebfb;
    uint256 public AMOUNT_TO_CLAIM = 25 * 1e18; // Example claim amount for the test user
    uint256 public AMOUNT_TO_SEND; // Total tokens to fund the airdrop contract

    // User-specific data
    address user;
    uint256 userPrivKey; // Private key for the test user

    // Merkle Proof for the test user
    // The structure (e.g., bytes32[2]) depends on your Merkle tree's depth
    // These specific values will be populated from your Merkle tree output
    bytes32 proofOne;
    bytes32 proofTwo;
    bytes32[2] public PROOF;
    ```
    *Note:* The `ROOT` and `PROOF` values are placeholders for now. We'll update them after generating our Merkle tree with the test user.

### The `setUp` Function: Initializing Your Test State

Foundry provides a special `setUp()` function that runs before each test function in the contract. It's ideal for deploying contracts and initializing any state required for the tests.

```solidity
// Inside MerkleAirdropTest contract

function setUp() public {
    // 1. Deploy the ERC20 Token
    token = new BagelToken();

    // 2. Generate a Deterministic Test User
    // `makeAddrAndKey` creates a predictable address and private key.
    // This is crucial because we need to know the user's address *before*
    // generating the Merkle tree that includes them.
    (user, userPrivKey) = makeAddrAndKey("testUser");

    // 3. Deploy the MerkleAirdrop Contract
    // Pass the Merkle ROOT and the address of the token contract.
    airdrop = new MerkleAirdrop(ROOT, address(token));

    // 4. Fund the Airdrop Contract (Critical Step!)
    // The airdrop contract needs tokens to distribute.
    // Let's assume our test airdrop is for 4 users, each claiming AMOUNT_TO_CLAIM.
    AMOUNT_TO_SEND = AMOUNT_TO_CLAIM * 4;

    // The test contract itself is the owner of the BagelToken by default upon deployment.
    address owner = address(this); // or token.owner() if explicitly set elsewhere

    // Mint tokens to the owner (the test contract).
    token.mint(owner, AMOUNT_TO_SEND);

    // Transfer the minted tokens to the airdrop contract.
    // Note the explicit cast of `airdrop` (contract instance) to `address`.
    token.transfer(address(airdrop), AMOUNT_TO_SEND);
}
```
**Key Point:** A common pitfall is forgetting to fund the airdrop contract. If the `MerkleAirdrop` contract holds no tokens, claim attempts will naturally fail.

### Integrating Off-Chain Merkle Tree Data

Our Merkle Airdrop relies on a Merkle tree generated off-chain. The `ROOT` of this tree is stored in the contract, and users provide `PROOF`s to claim. For testing, we need to ensure our test user is part of this tree.

1.  **Generate Test User Address:** After writing the initial `setUp` function, run `forge test -vvv`. This will execute `setUp`, and you can use `console.log(user);` within `setUp` to print the generated `user` address.

2.  **Update Merkle Tree Generation Scripts:**
    *   You'll typically have scripts (e.g., `script/GenerateInput.s.sol` using Foundry scripting, or external scripts) that create a list of whitelisted addresses and amounts (e.g., in an `input.json` file).
    *   Add the `user` address obtained in the previous step to this whitelist in your input generation script, associating it with `AMOUNT_TO_CLAIM`.
    *   Run your script to regenerate the input file (e.g., `forge script script/GenerateInput.s.sol`).

3.  **Generate New Merkle Tree and Proofs:**
    *   Run the script that processes your input file to build the Merkle tree and output the new `ROOT` and individual proofs (e.g., `script/MakeMerkle.s.sol`, which might output an `output.json`).

4.  **Update Test File with New Merkle Data:**
    *   **`ROOT`:** Copy the new Merkle `ROOT` from your `output.json` (or equivalent output) and update the `ROOT` state variable in `MerkleAirdropTest.t.sol`.
    *   **`PROOF`:** Locate the Merkle proof specific to your `user` address in `output.json`. This will be an array of `bytes32` hashes.
        *   Copy these hash values into the `proofOne`, `proofTwo`, etc., intermediate state variables you defined earlier.
        *   Then, initialize the `PROOF` array:
            ```solidity
            // Inside MerkleAirdropTest, update these after generating the new Merkle tree
            // Example values:
            // ROOT = 0xNEW_ROOT_HASH_FROM_OUTPUT_JSON;
            // proofOne = 0xPROOF_HASH_1_FOR_USER;
            // proofTwo = 0xPROOF_HASH_2_FOR_USER;

            // In setUp() or as part of state variable initialization:
            // PROOF = [proofOne, proofTwo];
            ```
            This method of using intermediate variables helps avoid potential type conversion errors when directly initializing the `bytes32[]` array.

Now, your `setUp` function will deploy the `MerkleAirdrop` contract with the correct `ROOT` that includes your test `user`.

### Crafting the Claim Test: `testUsersCanClaim`

With the setup complete, we can write the actual test logic to verify the claim functionality.

```solidity
// Inside MerkleAirdropTest contract

function testUsersCanClaim() public {
    // 1. Get the user's starting token balance
    uint256 startingBalance = token.balanceOf(user);

    // 2. Simulate the claim transaction from the user's address
    // `vm.prank(address)` sets `msg.sender` for the *next* external call only.
    vm.prank(user);

    // 3. Call the claim function on the airdrop contract
    airdrop.claim(user, AMOUNT_TO_CLAIM, PROOF);

    // 4. Get the user's ending token balance
    uint256 endingBalance = token.balanceOf(user);

    // For debugging, you can log the ending balance:
    console.log("User's Ending Balance: ", endingBalance);

    // 5. Assert that the balance increased by the expected claim amount
    assertEq(endingBalance - startingBalance, AMOUNT_TO_CLAIM, "User did not receive the correct amount of tokens");
}
```

### Common Pitfalls and Debugging Strategies

*   **Insufficient Airdrop Contract Balance:**
    *   **Symptom:** Claim transactions revert, often with an error indicating insufficient funds or a failed transfer.
    *   **Fix:** Ensure you mint tokens and transfer them to the `MerkleAirdrop` contract's address within your `setUp` function, as demonstrated.

*   **Type Errors with Merkle Proof:**
    *   **Symptom:** Compiler errors like `Type uint256[N] memory is not implicitly convertible to expected type bytes32[N] memory.`
    *   **Fix:** When initializing your `PROOF` array (e.g., `bytes32[2] public PROOF;`), if you're copying hex strings directly from a JSON file, ensure they are valid `bytes32` values. Using intermediate `bytes32` state variables for each element of the proof and then constructing the array from these variables can often resolve these issues:
        ```solidity
        // At contract level
        bytes32 proofElementOne = 0x...; // from output.json
        bytes32 proofElementTwo = 0x...; // from output.json
        bytes32[2] public PROOF = [proofElementOne, proofElementTwo];
        ```

*   **Incorrect `msg.sender` / `vm.prank` Usage:**
    *   **Symptom:** Access control errors or claims failing because the contract thinks the wrong address is initiating the claim.
    *   **Fix:** Remember that `vm.prank(address)` sets `msg.sender` *only for the immediately following external contract call*. If you have multiple calls that need to be from `user`, you'll need multiple `vm.prank` calls.

*   **Type Conversion for Contract Addresses:**
    *   **Symptom:** Compiler error like `Invalid implicit conversion from contract MerkleAirdrop to address payable`.
    *   **Fix:** When a function expects an `address` (e.g., `token.transfer(address recipient, ...)`), and you have a contract instance, you must explicitly cast it: `token.transfer(address(airdrop), AMOUNT_TO_SEND)`.

*   **Debugging with `console.log`:**
    *   Use `console.log` (imported from `forge-std/Test.sol`) liberally within your tests and `setUp` function to inspect variable values like addresses, balances, and roots.
    *   Run tests with increased verbosity to see these logs: `forge test -vv`, `forge test -vvv`, or even `forge test -vvvv`.

### Key Foundry Cheatcodes and Best Practices

*   **`vm.prank(address)`:** Simulates a transaction from a specific `msg.sender`. Essential for testing functions with access control or user-specific logic.
*   **`makeAddrAndKey(string memory name)`:** Generates a deterministic address and private key. Invaluable when you need to know an address *before* test execution (e.g., for inclusion in a pre-generated Merkle tree).
*   **`assertEq(actual, expected, "error message")`:** The cornerstone of Foundry testing. Verifies that two values are equal. Always include a descriptive error message.
*   **Named State Variables:** Avoid "magic numbers." Use clearly named state variables for values like `ROOT`, `AMOUNT_TO_CLAIM`, and proof elements. This improves readability and maintainability.
*   **Isolate Test Logic:** Keep your `setUp` function focused on initialization. Each `test...` function should ideally test a single piece of functionality or scenario.
*   **Incremental Development:** Write your `setUp`, then incorporate Merkle data, then write the test logic. Test frequently at each step to catch errors early.

By following these steps and understanding the interplay between your contracts, Foundry's testing tools, and off-chain data generation, you can effectively test your Merkle Airdrop contracts, ensuring they function securely and as intended.