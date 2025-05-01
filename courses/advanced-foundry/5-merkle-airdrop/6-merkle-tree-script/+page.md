## Testing a Merkle Airdrop Contract with Foundry

This lesson walks you through writing tests for a Solidity-based Merkle Airdrop contract using the Foundry testing framework. We'll focus specifically on testing the crucial `claim` functionality, ensuring eligible users can successfully receive their tokens. We will utilize Foundry's cheat codes to generate predictable user addresses and simulate interactions.

## Understanding the Merkle Airdrop

Before diving into testing, let's briefly recap the Merkle Airdrop concept. It's an efficient method for distributing tokens (like an ERC20) to many recipients. Instead of storing every eligible address and amount on-chain (which is expensive), we construct a Merkle tree off-chain.

Each leaf in this tree represents a user's claim (typically hashing their address and token amount). The smart contract only needs to store the final Merkle root hash. When a user wants to claim their tokens, they provide their claim details (address, amount) and a Merkle proof (a set of sibling hashes) to the contract. The contract verifies if, using the provided details and proof, it can reconstruct the stored Merkle root. If the verification passes, the user is eligible, and the contract transfers the tokens. This significantly saves gas compared to storing all eligibility data on-chain.

## Structuring the Foundry Test Contract

We'll create a test contract that inherits from Foundry's `Test` utility. This provides access to testing helpers and EVM cheat codes via the `vm` instance.

First, set up the basic contract structure and necessary imports:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Import Foundry's testing utilities and console for logging
import { Test, console } from "forge-std/Test.sol";
// Import the contracts we are testing
import { MerkleAirdrop } from "../src/MerkleAirdrop.sol";
import { BagelToken } from "../src/BagelToken.sol";

contract MerkleAirdropTest is Test {
    // State variables and test functions will go here
}
```

Next, declare the state variables needed for our tests. These will hold instances of our deployed contracts, configuration data from our Merkle tree generation, and information about our test user.

```solidity
contract MerkleAirdropTest is Test {
    MerkleAirdrop public airdrop;
    BagelToken public token;

    // Pre-calculated Merkle root from our generation script output
    bytes32 public ROOT = 0x474d994c58e37b12085fdb7bc6bbc0d46cf1907b90de3b7fb883cf3636c8ebfb;
    // Amount each eligible user can claim
    uint256 public AMOUNT_TO_CLAIM = 25 * 1e18;
    // Total amount needed to fund the airdrop (example: 4 users)
    uint256 public AMOUNT_TO_SEND = AMOUNT_TO_CLAIM * 4;

    // Merkle proof for our specific test user (from generation script output)
    // Note: Direct literal assignment to public arrays can cause type issues.
    // Initialize via intermediate variables as a workaround.
    bytes32 proofOne = 0x0fd7c981d39bece61f7499702bf59b3114a00e66b51ba2c53abdf7b62986c00a;
    bytes32 proofTwo = 0x46f4c7c1c21e8a0c83949beda51d2d02d1ec75b55d97a999d3edbafa5a1e2f;
    bytes32[] public PROOF = [proofOne, proofTwo];

    // Variables to hold our predictable test user's address and private key
    address user;
    uint256 userPrivKey;

    // setUp function and test functions follow
}
```

## Initializing State with the `setUp` Function

Foundry executes the `setUp()` function before each test function (any function starting with `test`). This is the ideal place to deploy contracts and set up the initial state needed for testing.

```solidity
    function setUp() public {
        // Deploy the ERC20 token contract
        token = new BagelToken();

        // Deploy the MerkleAirdrop contract, passing the Merkle root
        // and the deployed token's address to its constructor.
        airdrop = new MerkleAirdrop(ROOT, address(token)); // Ensure token address is passed

        // Generate a predictable address and private key for our test user
        // using a label ("user"). This address needs to be included
        // in the Merkle tree generation process (see coordination section below).
        (user, userPrivKey) = makeAddrAndKey("user");

        // The MerkleAirdrop contract needs tokens to distribute.
        // 1. Mint the total supply needed for the airdrop to the
        //    test contract (which is the default owner/deployer).
        //    The owner() is implicitly msg.sender here, which is the test contract address.
        token.mint(address(this), AMOUNT_TO_SEND);

        // 2. Transfer the total supply from the test contract to the
        //    MerkleAirdrop contract's address so it can fulfil claims.
        //    We must cast the 'airdrop' contract instance to 'address'.
        token.transfer(address(airdrop), AMOUNT_TO_SEND);
    }
```
**Key `setUp` Actions:**
1.  Deploy `BagelToken`.
2.  Deploy `MerkleAirdrop`, providing the correct `ROOT` and token contract address.
3.  Use `makeAddrAndKey("user")` to create a deterministic test user address (`user`) and its corresponding private key (`userPrivKey`).
4.  **Crucially:** Fund the `airdrop` contract. We mint the total required tokens (`AMOUNT_TO_SEND`) to the test contract itself (the token deployer/owner) and then transfer these tokens *to* the `MerkleAirdrop` contract's address. Without this, the `airdrop` contract would have no tokens to send during a `claim`.

## Writing the `claim` Test Case

Now, let's write the actual test function to verify the `claim` process for our predictable `user`.

```solidity
    function testUsersCanClaim() public {
        // Optional: Verify the starting balance of the user (should be 0)
        uint256 startingBalance = token.balanceOf(user);
        assertEq(startingBalance, 0);

        // Use vm.prank to make the *next* external contract call
        // appear as if it's coming from the 'user' address.
        vm.prank(user);

        // Call the claim function on the airdrop contract, impersonating 'user'.
        // Provide the user's address, the amount they claim, and their specific proof.
        airdrop.claim(user, AMOUNT_TO_CLAIM, PROOF);

        // Get the user's token balance *after* the claim attempt.
        uint256 endingBalance = token.balanceOf(user);

        // Optional: Log the ending balance for debugging
        // To see logs, run tests with increased verbosity: forge test -vv
        // console.log("Ending Balance: %d", endingBalance);

        // Assert that the user's final balance equals the amount they claimed.
        // Since the starting balance was 0, the ending balance should be exactly AMOUNT_TO_CLAIM.
        assertEq(endingBalance, AMOUNT_TO_CLAIM);

        // Alternatively, assert the difference:
        // assertEq(endingBalance - startingBalance, AMOUNT_TO_CLAIM);
    }
```
**Test Logic Breakdown:**
1.  Record the user's initial `BagelToken` balance (expected to be 0).
2.  Use `vm.prank(user)`: This Foundry cheat code makes the very next external call originate from the `user` address, simulating the user initiating the transaction.
3.  Call `airdrop.claim()`: Pass the claimant's address (`user`), the correct claim amount (`AMOUNT_TO_CLAIM`), and the valid Merkle `PROOF` associated with that user and amount.
4.  Record the user's final `BagelToken` balance.
5.  Use `assertEq()`: Verify that the `endingBalance` is equal to the `AMOUNT_TO_CLAIM`. This confirms the claim was successful and the correct amount was transferred.

## Using Predictable Addresses with `makeAddrAndKey`

Using `vm.makeAddrAndKey("some_label")` is powerful because it generates the *same* address and private key every time the tests run with the same label. This allows us to know an eligible address *before* running the full test suite. However, this requires coordination with your Merkle tree generation process:

1.  **Generate Address in Test:** Add `(user, ) = makeAddrAndKey("user");` to your `setUp` function.
2.  **Log the Address:** Temporarily add `console.log("Test User Address:", user);` in `setUp`.
3.  **Run Test to Get Address:** Execute `forge test -vv` (or higher verbosity) to see the console output, which will include the generated address.
4.  **Copy Address:** Copy the logged hexadecimal address for `user`.
5.  **Update Whitelist/Input Data:** Paste this copied address into the list of addresses used by your Merkle tree generation script (e.g., into the `whitelist` array in a `GenerateInput.s.sol` script). Ensure it's associated with the correct `AMOUNT_TO_CLAIM`.
6.  **Regenerate Merkle Input:** Run the script that creates the input file for your Merkle tree library (e.g., `forge script script/GenerateInput.s.sol`).
7.  **Regenerate Merkle Proofs/Root:** Run the script or tool that processes the input file to generate the Merkle tree, proofs for each leaf, and the final Merkle root. This typically outputs a JSON file (e.g., `output.json`).
8.  **Update Test File:**
    *   Copy the new Merkle `root` from the `output.json` file and update the `ROOT` state variable in your `MerkleAirdropTest.sol` file.
    *   Find the entry for the test `user` address in `output.json` and copy its corresponding `proof` array. Update the `PROOF` state variable (using the intermediate variable workaround if necessary) in your test file.
9.  **Remove Logging:** Remove the temporary `console.log` statement from `setUp`.
10. **Run Final Test:** Execute `forge test`. The test should now pass, as the predictable `user` is included in the Merkle tree, and the test uses the correct `ROOT` and `PROOF`.

## Debugging Common Merkle Airdrop Test Issues

During development, you might encounter several common errors:

1.  **Error:** `Type uint256[N] memory is not implicitly convertible to expected type bytes32[] storage ref.` (or similar type conversion error for the `PROOF` array).
    *   **Cause:** Assigning an array literal directly (`[...]`) to a `public` state variable (which resides in storage) can cause type conflicts.
    *   **Fix:** Declare intermediate `bytes32` variables in the contract scope for each element of the proof, and then initialize the `public bytes32[] PROOF` using these variables: `bytes32 proofOne = ...; bytes32 proofTwo = ...; bytes32[] public PROOF = [proofOne, proofTwo];`.
2.  **Error:** `[FAIL. Reason: ERC20: insufficient balance ...]` (or similar token balance error during `claim`).
    *   **Cause:** The `MerkleAirdrop` contract is trying to `transfer` tokens during the `claim` call, but it doesn't hold any `BagelToken` itself.
    *   **Fix:** Ensure the `setUp` function mints the *total* required token supply (`AMOUNT_TO_SEND`) and then *transfers* it to the `airdrop` contract's address (`token.transfer(address(airdrop), AMOUNT_TO_SEND);`).
3.  **Error:** `Undeclared identifier.`
    *   **Cause:** A simple typo or using an old variable name after renaming it (e.g., using `AMOUNT` when it was renamed to `AMOUNT_TO_CLAIM`).
    *   **Fix:** Carefully check variable names used in declarations and function calls. Ensure consistency.
4.  **Error:** `Invalid type for argument in function call. Invalid implicit conversion from contract MerkleAirdrop to address requested.`
    *   **Cause:** Passing a contract instance (e.g., `airdrop`) directly to a function expecting an `address` type (like `token.transfer`).
    *   **Fix:** Explicitly cast the contract instance to its address: `address(airdrop)`.

## Conclusion

You have now learned how to write a Foundry test for a `MerkleAirdrop` contract's `claim` function. Key takeaways include structuring the test contract, using the `setUp` function for initialization, leveraging `vm.makeAddrAndKey` for predictable test users, employing `vm.prank` to simulate user calls, ensuring the airdrop contract is funded with tokens, and coordinating test addresses with off-chain Merkle tree generation. Debugging common errors related to type conversions and token balances is also a crucial part of the process. This foundation allows you to build more comprehensive test suites for your web3 applications.