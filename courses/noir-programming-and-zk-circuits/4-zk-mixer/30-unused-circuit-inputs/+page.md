## Optimizing ZK-Proofs: Do Unused Public Inputs Need Dummy Calculations in Noir?

A common practice in Circom, when developing Zero-Knowledge (ZK) circuits, involves adding "dummy" calculations to ensure that public inputs crucial for security (like binding a proof to a specific recipient) are not optimized away by the compiler. This lesson investigates whether Noir, a newer language for ZK-SNARKs, exhibits similar behavior or if it handles such public inputs more inherently. We'll explore this within the context of a ZK-Mixer application.

## The ZK-Mixer Recipient Binding Problem

In a typical ZK-Mixer, a user deposits funds and later withdraws them anonymously. A key security feature is ensuring that the withdrawal proof, while not revealing the depositor, is tied to a specific recipient address. If this binding isn't enforced, an attacker could potentially intercept a valid proof and use it to withdraw funds to their own address.

Previously, to ensure a `recipient: pub Field` public input in our Noir circuit was not ignored by the compiler, a dummy calculation was introduced:

```noir
// In circuits/src/main.nr
fn main(
    // Public Inputs
    root: pub Field,
    nullifier_hash: pub Field,
    recipient: pub Field, // The input in question

    // Private Inputs
    nullifier: Field,
    secret: Field,
    merkle_proof: [Field; 20],
    is_even: [bool; 20]
) {
    // ... (other circuit logic) ...

    // Dummy calculation to "use" the recipient input
    let recipient_binding: Field = recipient * recipient;
    assert(recipient_binding == recipient * recipient);
}
```
This `assert` statement forces the `recipient` field to be part of the circuit's constraints. The question is: is this explicit "usage" truly necessary in Noir for the `recipient` to be integral to the proof's public statement and subsequent verification?

## Experiment: Testing Proof Binding Without Dummy Calculations

To answer this, we'll conduct an experiment involving a new Solidity test and modifications to our Noir circuit. The goal is to see if an attacker can misuse a proof if the dummy calculation for the `recipient` is removed from the Noir circuit.

### The Solidity Test: `testAnotherAddressSendProof`

We'll add a new test to our `Mixer.t.sol` Foundry test suite. This test simulates an attacker attempting to use a valid proof, generated for a legitimate recipient, to withdraw funds to their own (attacker's) address.

**Test Logic:**

1.  **Legitimate Deposit:** A user makes a deposit, generating a commitment that is added to the mixer's Merkle tree.
2.  **Proof Generation:** The same user generates a ZK-proof to withdraw funds. This proof is generated with their intended `recipient` address embedded as a public input.
3.  **Attack Attempt:** An `attacker` address is defined. Using `vm.prank(attacker)`, we simulate the withdrawal transaction being initiated by the attacker. The `mixer.withdraw` function is called with:
    *   The legitimate user's valid proof.
    *   The correct `root` and `nullifier_hash` from the proof's public inputs.
    *   Crucially, the `payable_recipient` argument is set to the `attacker_address`.
4.  **Expected Outcome:** The transaction should revert. The on-chain `Verifier.sol` contract (generated from our Noir circuit) should compare the public inputs embedded within the proof (which includes the original `recipient`) against the parameters provided to the `withdraw` function. Since the `payable_recipient` (attacker's address) will not match the `recipient` field the proof was generated for, verification should fail.

Here's the Solidity test code:

```solidity
// In contracts/test/Mixer.t.sol
function testAnotherAddressSendProof() public {
    // 1. Make a deposit (by the original user/sender)
    (bytes32 _commitment, bytes32 _nullifier, bytes32 _secret) = _getCommitment();
    // For brevity, console logs and event emission are omitted here
    mixer.deposit{value: mixer.DENOMINATION()}(_commitment);

    // 2. Create a proof (for the original recipient)
    bytes32[] memory leaves = new bytes32[](1);
    leaves[0] = _commitment;
    // 'recipient' here is the original intended recipient (e.g., user.address)
    // for whom the proof is generated.
    (bytes memory _proof, bytes32[] memory _publicInputs) = _getProof(_nullifier, _secret, recipient, leaves);
    
    // Optional: Verify the proof is initially valid against its own public inputs
    assertTrue(verifier.verify(_proof, _publicInputs));

    // 3. Make a withdrawal - Attacker tries to use the proof for their own address
    address attacker_address = makeAddr("attacker"); // Create a new attacker address
    vm.prank(attacker_address); // Simulate the call coming from the attacker

    // Expect the withdrawal to revert
    // _publicInputs[0] is root, _publicInputs[1] is nullifierHash
    // The last argument is the recipient address for the withdrawal
    vm.expectRevert(); // General revert expectation
    mixer.withdraw(_proof, _publicInputs[0], _publicInputs[1], payable(attacker_address));
}
```
The `mixer.withdraw` function in our smart contract will internally call the `Verifier.sol` contract's `verify` function. This verifier expects the proof and an array of public inputs. The crucial part is that the `Verifier.sol` contract (generated by the `bb` tool) uses the public inputs that were set *during proof generation*. If the `payable_recipient` passed to `mixer.withdraw` doesn't align with the `recipient` public input embedded in the proof, the verification should fail.

### Modifying the Noir Circuit

Next, we modify the `main.nr` file in our Noir circuit by commenting out the dummy calculation for `recipient_binding`:

```noir
// In circuits/src/main.nr
fn main(
    // Public Inputs
    root: pub Field,
    nullifier_hash: pub Field,
    recipient: pub Field, // Recipient input remains a public input

    // Private Inputs
    nullifier: Field,
    secret: Field,
    merkle_proof: [Field; 20],
    is_even: [bool; 20]
) {
    // Verify the Merkle proof
    assert(check_merkle_proof(root, merkle_proof, secret + nullifier, is_even));

    // Verify the nullifier hash
    let computed_nullifier_hash = Sha256::digest([nullifier]);
    assert(from_bytes32(computed_nullifier_hash) == nullifier_hash);

    // Dummy calculation REMOVED (commented out)
    // let recipient_binding: Field = recipient * recipient;
    // assert(recipient_binding == recipient * recipient);
}
```
The `recipient: pub Field` declaration remains, but it's no longer explicitly used in an `assert` or any other calculation within the `main` function's logic.

### Recompiling and Regenerating the Verifier

With the Noir circuit modified, we need to recompile it and regenerate the Solidity verifier contract:

1.  **Clean Build:** Delete the `circuits/target` folder to ensure no stale artifacts are used.
    ```bash
    rm -rf circuits/target
    ```
2.  **Compile Noir Circuit:** Navigate to the `circuits` directory and compile.
    ```bash
    cd circuits
    nargo compile
    ```
    During this step, the Noir compiler (`nargo`) issues a warning:
    `warning: unused variable recipient src/main.nr:7:5 unused variable`
    This warning confirms that, from the perspective of the Noir circuit's explicit logic, the `recipient` variable is indeed unused. This is key to our investigation.
3.  **Generate Verification Key (VK):**
    ```bash
    bb write_vk --oracle_hash keccak -b ./target/circuits.json -o ./target/vk
    ```
4.  **Generate Solidity Verifier:**
    ```bash
    bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
    ```
5.  **Update Verifier Contract:** Rename the old `Verifier.sol` in `contracts/src` (e.g., to `OldVerifier.sol` or delete it) and move the newly generated `Verifier.sol` from `circuits/target/Verifier.sol` to `contracts/src/Verifier.sol`.

### Running the Test and Analyzing Results

Now, we run the `testAnotherAddressSendProof` test using Foundry:

```bash
forge test --mt testAnotherAddressSendProof -vv
```

The test **passes**. This means the `mixer.withdraw` call, when attempted by the attacker with their own address but using the original proof, reverted as expected.

To understand the exact cause of the revert, we can temporarily remove `vm.expectRevert()` from the Solidity test and run it again. The test then fails with a specific error: `FAIL: SumcheckFailed()`. This error originates from the `Verifier.sol` contract, indicating that the proof verification itself failed. This occurs because the public inputs provided during the withdrawal attempt (specifically, the `recipient` which is implicitly part of the public inputs checked by the verifier) do not match the public inputs the proof was originally generated with.

## Key Findings: Noir's Robust Public Input Handling

The experiment demonstrates a significant behavior in Noir: **dummy calculations are not necessarily required for public inputs to ensure they are part of the proof's public statement and contribute to its binding properties.**

The declaration `recipient: pub Field` in Noir ensures that:
1.  When a proof is generated, the value provided for `recipient` becomes an integral part of the public inputs that the proof attests to.
2.  The `Verifier.sol` contract, generated by `bb`, is designed to check the submitted proof against *all* declared public inputs, including `recipient`.

In our ZK-Mixer, when `mixer.withdraw` is called, it passes the proof and the public inputs (root, nullifier hash, and the *intended recipient for this specific transaction*) to the `Verifier.sol`. The verifier contract inherently uses the `recipient` value that was committed to during proof generation. If the `payable_recipient` in the `withdraw` call (e.g., the attacker's address) doesn't align with the `recipient` value embedded within the proof's public inputs, the verifier will correctly reject the proof, causing the transaction to revert.

The "unused variable" warning from `nargo` simply means the variable isn't used in any *explicit constraints or calculations within the Noir `main` function*. However, its declaration as `pub` ensures it's part of the public interface of the circuit and thus crucial for the verifier.

## Implications for Noir Developers

This finding has positive implications for Noir developers:

*   **Potentially Cheaper Proofs:** By removing unnecessary dummy calculations, circuits can have fewer constraints. Fewer constraints generally lead to faster proof generation times and can contribute to lower gas costs for on-chain verification, especially concerning how public inputs are handled and passed.
*   **Cleaner Circuit Code:** Circuits become cleaner and easier to understand without superfluous logic solely intended to appease a compiler.
*   **Understanding Noir's Toolchain:** It highlights that Noir's toolchain (`nargo` for compilation and `bb` for backend operations like verifier generation) correctly handles the integrity of declared public inputs. They are bound to the proof and checked by the corresponding verifier contract, even without explicit use in `assert` statements within the circuit's `main` function.

In conclusion, for use cases like binding a ZK-proof to a specific recipient, Noir's default behavior appears robust. As long as the public input is declared as `pub` in the Noir circuit and the on-chain verifier contract (and the calling smart contract) utilize these public inputs correctly during the verification process, explicit "dummy usage" within the circuit code itself is not required to prevent misuse. This contrasts with common assumptions and practices inherited from older ZK DSLs like Circom, streamlining development and potentially optimizing proof systems built with Noir.
