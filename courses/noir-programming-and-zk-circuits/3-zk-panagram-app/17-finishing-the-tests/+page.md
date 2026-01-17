Welcome to this lesson on completing the test suite for our ZK-SNARK-based Panagram guessing game. We'll be using Foundry to write Solidity tests, focusing on ensuring fair play, addressing vulnerabilities, and verifying core contract logic.

## Testing NFT Minting for Sequential Correct Guesses

Our first goal is to verify that the smart contract correctly handles multiple winners, specifically that a second user making a correct guess receives the next available NFT (ID 1).

We'll start by creating a new test function, `testSecondGuessPasses`, basing it on our existing `testCorrectGuessPasses` function.

1.  **Introduce a Second User:**
    We define a new user address for our second guesser:
    ```solidity
    address user2 = makeAddr("user2");
    ```

2.  **First User's Guess:**
    The first user (`user`) proceeds to make a correct guess and, as per previous tests, should receive NFT 0.

3.  **Second User's Guess:**
    Next, we simulate `user2` making a transaction using `vm.prank(user2);`. Critically, in our initial setup, `user2` will attempt to use the *exact same proof* that `user` successfully used:
    ```solidity
    // After user1's successful guess
    vm.prank(user2);
    panagram.makeGuess(proof); // User2 uses the same proof as user1
    ```
    This highlights an important consideration: Is our proof uniquely tied to the guesser? We'll address this shortly.

4.  **Assertions for the Second User:**
    We assert that `user2` receives NFT with ID 1 and does not receive NFT 0:
    ```solidity
    vm.assertEqual(panagram.balanceOf(user2, 0), 0, "User2 should not get NFT 0");
    vm.assertEqual(panagram.balanceOf(user2, 1), 1, "User2 should get NFT 1");
    ```

**Debugging Notes:**
During development, a common mistake was an assertion error (`1 != 0`). This occurred because the assertions for `user2` were mistakenly checking `panagram.balanceOf(user, ...)` instead of `panagram.balanceOf(user2, ...)`. Correcting the address in the `balanceOf` call resolved this, and the test passed. This underscores the importance of careful variable use in tests.

The fact that `user2` could successfully use `user1`'s proof signifies a front-running vulnerability, which we must address.

## Securing Your ZK DApp: Making Proofs Address-Specific to Prevent Front-Running

The current ZK proof only validates that a submitted guess matches the secret answer. It does not verify *who* is making the guess. This allows any user to intercept a valid proof and submit it as their own, effectively stealing the reward – a classic front-running attack.

**The Solution: Address-Dependent Proofs**
To mitigate this, we need to make the ZK proof dependent on the guesser's address. This involves two key changes:
1.  The guesser's address will be passed as a public input to the Noir circuit during proof generation.
2.  The smart contract will include this address (`msg.sender`) when it calls the verifier contract.

**Modifying the Noir Circuit (`circuits/src/main.nr`)**
The `main` function in our Noir circuit needs to be updated to accept the `address` as a new public input:

```noir
fn main(guess_hash: Field, answer_hash: pub Field, address: pub Field) {
    assert(guess_hash == answer_hash);
    // The following constraint ensures 'address' is part of the proof computation.
    // While Noir ensures public inputs affect the proof statement, explicit constraints
    // can be added if specific logic involving the address is needed beyond just inclusion.
    let addr_pow: Field = address.pow_32(exponent: 2); // Example constraint
    assert(addr_pow == address.pow_32(exponent: 2));    // Verifies the constraint
}
```
Initially, a simple multiplication like `address * address` might be considered. However, Noir's `Field` type has specific methods for operations; here, `pow_32` (raising to a power, in this case, 2) is used as an example constraint.

**Important Clarification on Noir Public Inputs:**
In Noir, all declared public inputs (`pub Field`) are inherently part of the proof's public statement. If the value of a public input provided during verification (e.g., `msg.sender` from the smart contract) differs from the value used during proof generation (e.g., the original guesser's address), the proof verification **will fail**. This holds true even if that public input is not explicitly used in other constraints within the Noir circuit's logic (like the `addr_pow` example above).

Therefore, simply adding `address: pub Field` to the Noir function signature is sufficient to make the proof address-dependent. The dummy calculation (`addr_pow`) is only necessary if you intend to add specific, on-chain verifiable constraints *on* the address itself within the ZK circuit, beyond just ensuring it was the address used to generate the proof.

## Integrating Address-Aware Proofs: Updates to Noir, Solidity, and Test Infrastructure

With the Noir circuit modified, we now need to update our Solidity contracts, test helper functions, and the TypeScript proof generation script.

1.  **Modifying `_getProof` in `PanagramTest.sol`:**
    Our test helper function `_getProof` must now accept the `sender` address and pass it to the proof generation script. The number of arguments (`NUM_ARGS`) for the `vm.ffi` call also increases.

    ```solidity
    // In PanagramTest.sol
    uint256 NUM_ARGS = 6; // Updated from 5

    function _getProof(bytes32 guess, bytes32 correctAnswer, address sender) internal returns (bytes memory _proof) {
        string[] memory inputs = new string[](NUM_ARGS);
        inputs[0] = "npx";
        inputs[1] = "tsx";
        inputs[2] = "js-scripts/generateProof.ts";
        inputs[3] = vm.toString(guess);
        inputs[4] = vm.toString(correctAnswer);
        inputs[5] = vm.toString(sender); // New: sender address
        
        bytes memory result = vm.ffi(inputs);
        (_proof) = abi.decode(result, (bytes));
        return _proof;
    }
    ```

2.  **Updating `generateProof.ts`:**
    The TypeScript script responsible for interfacing with Noir's CLI tools (like `nargo prove`) needs to expect the sender's address as an input. It will be the third element (index 2) in the `inputsArray` received from the `vm.ffi` call.

    ```typescript
    // In js-scripts/generateProof.ts
    // ... (assuming inputsArray is populated from process.argv or similar)
    const inputs = {
        guess_hash: inputsArray[0],  // Private input: hash of the user's guess
        answer_hash: inputsArray[1], // Public input: hash of the correct answer
        address: inputsArray[2],     // Public input: sender's address
    };
    // ... rest of the script uses these inputs to generate the proof
    ```

3.  **Updating Test Calls to `_getProof`:**
    All invocations of `_getProof` within our test functions must now pass the relevant user's address. For `testSecondGuessPasses`, this means `user2` needs their own proof generated with their address:

    ```solidity
    // In testSecondGuessPasses
    // User1's proof
    bytes memory proofUser1 = _getProof(ANSWER, ANSWER, user); 
    vm.prank(user);
    panagram.makeGuess(proofUser1);
    // ... assertions for user1 ...

    // User2's proof, generated with user2's address
    bytes memory proofUser2 = _getProof(ANSWER, ANSWER, user2); 
    vm.prank(user2);
    panagram.makeGuess(proofUser2); // User2 now uses their own, address-specific proof
    // ... assertions for user2 ...
    ```
    With this change, `user2` can no longer use `proofUser1`.

4.  **Recompiling Noir Circuit and Regenerating Verifier Contract:**
    Since we've modified the Noir circuit (`main.nr`), we need to recompile it and regenerate the Solidity verifier contract.
    First, ensure a clean build by deleting existing artifacts:
    *   `rm -rf circuits/target`
    *   `rm -f contracts/src/Verifier.sol`

    Then, navigate to the `circuits` directory and execute the following commands:
    *   `nargo compile` (Compiles the Noir code)
    *   `bb write_vk --oracle_hash keccak -b ./target/zk_panagram.json -o ./target/vk` (Generates the verification key using Barretenberg, specifying keccak for oracle hash compatibility if needed)
    *   `bb write_solidity_verifier -k ./target/vk -o ../contracts/src/Verifier.sol` (Generates the `Verifier.sol` contract from the verification key)

5.  **Modifying `Panagram.sol` (Main Smart Contract):**
    The `makeGuess` function in our main `Panagram.sol` contract must now provide `msg.sender` as the second public input to the `s_verifier.verify` call. Noir `Field` inputs are typically treated as `bytes32` on the Solidity side, so we need to cast `msg.sender` appropriately.

    ```solidity
    // In Panagram.sol, function makeGuess(bytes memory _proof)
    // ...
    bytes32[] memory publicInputs = new bytes32[](2); // Array size is now 2
    publicInputs[0] = s_answer; // The hash of the correct answer
    publicInputs[1] = bytes32(uint256(uint160(msg.sender))); // Add msg.sender, cast to bytes32
    
    bool proofResult = s_verifier.verify(_proof, publicInputs);
    require(proofResult, "Panagram_InvalidProof");
    // ... rest of the logic ...
    ```
    The `publicInputs` array now expects two elements: the answer hash and the sender's address.

After implementing these changes across the Noir circuit, TypeScript script, test files, and the main smart contract, all tests should be re-run. They should pass, confirming that our address-specific proof mechanism is working correctly and the front-running vulnerability is mitigated.

## Verifying Game Progression: Testing the New Round Functionality

A key feature of our Panagram game is the ability to start new rounds. We need a test, `testStartSecondRound()`, to ensure this mechanism works as expected.

1.  **Test Setup:**
    *   A user (`user`) successfully makes a correct guess in the current round.
    *   We simulate the passage of time to meet the minimum duration requirement for starting a new round:
        ```solidity
        vm.warp(panagram.MIN_DURATION() + 1);
        ```
    *   Define a new answer for the upcoming round. Remember to hash it and take the modulus with `FIELD_MODULUS` (a constant usually defined in your test contract for Noir field compatibility):
        ```solidity
        // Assuming FIELD_MODULUS is defined in the test contract
        bytes32 NEW_ANSWER = bytes32(uint256(keccak256(abi.encodePacked("outnumber"))) % FIELD_MODULUS);
        ```
    *   The contract owner (implicitly `user` in tests set up with `user` as the deployer/default caller) initiates the new round:
        ```solidity
        panagram.newRound(NEW_ANSWER);
        ```

2.  **Assertions:**
    We verify that the contract state updates correctly:
    *   The current round number should increment:
        ```solidity
        vm.assertEqual(panagram.s_currentRound(), 2, "Round should be 2");
        ```
    *   The winner of the previous round should be reset for the new round:
        ```solidity
        vm.assertEqual(panagram.s_currentRoundWinner(), address(0), "Winner should be reset");
        ```
    *   The secret answer for the current round should be updated to `NEW_ANSWER`:
        ```solidity
        vm.assertEqual(panagram.s_answer(), NEW_ANSWER, "New answer not set correctly");
        ```

**Debugging Notes:**
Common issues encountered during this test's development include:
*   Typographical errors, such as calling `panagram.MIN_DURATION` instead of `panagram.MIN_DURATION()` if it's a function.
*   Incorrectly referencing state variables, e.g., `currentRound` instead of `s_currentRound` if that's the declared name.
*   Ensuring constants like `FIELD_MODULUS` are correctly defined and used. For instance, if `FIELD_MODULUS` is a constant within your test contract, you'd use it directly, not as `panagram.FIELD_MODULUS`.

After corrections, this test should pass, confirming the new round logic.

## Ensuring Proof Integrity: Testing Rejection of Incorrect Guesses

It's crucial to test that the system rejects proofs generated with an incorrect guess, even if the claimed answer hash and sender address in the proof inputs are correct. This ensures the integrity of the ZK proof verification.

We'll create a test function `testIncorrectGuessFails()`.

1.  **Test Steps:**
    *   Generate a hash for an incorrect guess. This guess should differ from the actual `ANSWER`.
        ```solidity
        // Assuming ANSWER and FIELD_MODULUS are defined
        bytes32 incorrectGuessHash = bytes32(uint256(keccak256(abi.encodePacked("wrongguess"))) % FIELD_MODULUS);
        ```
    *   Generate a proof using this `incorrectGuessHash`, but with the correct `ANSWER` (as the claimed `answer_hash` public input for the circuit) and a valid `user` address. This simulates an attempt to cheat by providing a valid answer hash to the circuit while using a different, incorrect actual guess to generate the private part of the proof.
        ```solidity
        bytes memory incorrectProof = _getProof(incorrectGuessHash, ANSWER, user);
        ```
    *   Simulate the transaction being sent by `user`:
        ```solidity
        vm.prank(user);
        ```
    *   We expect the `makeGuess` function to revert, specifically with our custom error `Panagram_InvalidProof`. Foundry's `vm.expectRevert` cheatcode is used for this:
        ```solidity
        vm.expectRevert(Panagram.Panagram_InvalidProof.selector);
        panagram.makeGuess(incorrectProof);
        ```

This test, when run (e.g., `forge test --mt testIncorrectGuessFails -vvv` for verbose output on a specific test), should pass. This confirms that the `assert(guess_hash == answer_hash);` line (or equivalent logic) in our Noir circuit is effective, and the verifier contract correctly identifies the mismatch when an invalid proof is submitted.

Running all tests (`forge test`) should now show all (e.g., four) tests passing, indicating a well-tested Panagram contract with robust ZK proof verification.

This concludes our intensive testing phase. By systematically addressing potential vulnerabilities like front-running and ensuring all core game mechanics function as expected, we've significantly increased the reliability and security of our ZK Panagram smart contract.