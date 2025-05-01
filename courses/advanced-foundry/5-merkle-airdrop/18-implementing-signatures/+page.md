## Testing Gasless Claims via Signatures in Your Merkle Airdrop

In this lesson, we'll enhance our Foundry test suite for the `MerkleAirdrop` contract. Our goal is to test a common and user-friendly pattern: allowing a third party, often called a "gas payer," to submit the claim transaction on behalf of the eligible user. This enables users to receive their airdropped tokens without needing native currency (like ETH) to pay for gas, resembling a meta-transaction flow. Authorization is achieved through a digital signature provided by the user.

We will modify the existing `MerkleAirdrop.t.sol` test file to implement and verify this functionality.

**Core Concepts: Gas Payers and Digital Signatures**

The central idea is to separate the transaction *authorization* from the transaction *submission*.

1.  **Authorization (Off-Chain):** The eligible user (`user`) signs a message containing the details of their claim (their address and the amount). This signature proves they consent to the claim.
2.  **Submission (On-Chain):** A different entity (`gasPayer`) takes the user's signed message and submits it to the `claim` function of the `MerkleAirdrop` contract. The `gasPayer` pays the necessary gas fees.
3.  **Verification (On-Chain):** The `MerkleAirdrop` contract verifies the signature against the claim details. If the signature is valid and matches the user's address, the contract proceeds with the claim, transferring tokens to the `user`, even though the `msg.sender` was the `gasPayer`.

This process relies heavily on **Digital Signatures (ECDSA)**. The user signs a specific message digest using their private key, producing `v`, `r`, and `s` components. Our contract uses `ECDSA.recover` (within the `_isValidSignature` function, which itself relies on `getMessageHash`) to reconstruct the signer's address from the digest and the signature components. If the recovered address matches the `user` address provided in the claim, the signature is valid. The structure of the message being signed follows EIP-712 standards, as implemented in our `getMessageHash` function.

**Modifying the Test Setup (`MerkleAirdrop.t.sol`)**

First, we need an address to represent our gas payer in the test environment.

1.  **Declare `gasPayer` State Variable:**
    Add a state variable to your test contract to store the gas payer's address. Making it `public` allows easy inspection if needed.

    ```solidity
    // test/MerkleAirdrop.t.sol
    import "forge-std/Test.sol";
    import "../src/MerkleAirdrop.sol";
    import "../src/mocks/MockERC20.sol";
    import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
    import "forge-std/console.sol";

    contract MerkleAirdropTest is Test {
        // ... (existing variables like token, airdrop, user, userPrivKey, etc.)

        address public gasPayer; // Added: Address for the gas payer

        // ... (rest of contract variables)
    }
    ```

2.  **Initialize `gasPayer` in `setUp`:**
    Inside the `setUp` function, use the Foundry cheatcode `makeAddr` to create a deterministic address for the `gasPayer`. We use `makeAddr` instead of `makeAddrAndKey` because we only need the address to simulate *calling* the contract; we don't need its private key for signing in this specific test scenario.

    ```solidity
    // test/MerkleAirdrop.t.sol
    function setUp() public {
        // Initialize the token
        token = new MockERC20("Test Token", "TKN");

        // ... (existing setup for root, airdrop deployment, minting tokens) ...

        // Create the user address and private key
        (user, userPrivKey) = makeAddrAndKey("user"); // Existing

        // Create the gas payer address
        gasPayer = makeAddr("gasPayer"); // Added: Initialize gasPayer address

        // ... (transfer tokens to airdrop contract) ...
    }
    ```

**Updating the Claim Test (`testUsersCanClaim`)**

Now, we modify the `testUsersCanClaim` function to simulate the gas payer submitting the claim with the user's signature.

1.  **Get the Message Digest:** Before anyone can sign, we need the exact data *to be* signed. We call the `getMessageHash` function (which we previously made `public` in the `MerkleAirdrop` contract) to get the EIP-712 compliant digest representing the claim action for the specific user and amount.

    ```solidity
    // test/MerkleAirdrop.t.sol
    function testUsersCanClaim() public {
        uint256 startingBalance = token.balanceOf(user);
        console.log("Starting Balance: ", startingBalance);

        // 1. Get the digest the user would sign
        // Requires getMessageHash to be public in MerkleAirdrop.sol
        bytes32 digest = airdrop.getMessageHash(user, AMOUNT_TO_CLAIM);
    ```

2.  **Simulate User Signing:** Use the Foundry cheatcode `vm.sign(privateKey, digest)` to simulate the user signing the `digest` with their private key (`userPrivKey`). This cheatcode conveniently returns the `v`, `r`, and `s` components of the resulting ECDSA signature.

    ```solidity
        // 2. Sign the digest using the user's private key (simulated)
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(userPrivKey, digest);
    ```

3.  **Set `msg.sender` to `gasPayer`:** Use the `vm.prank(address)` cheatcode. This powerful cheatcode tells Foundry that the *very next* external contract call should originate from the specified address (`gasPayer` in this case), effectively setting `msg.sender` for that call.

    ```solidity
        // 3. Set the next transaction's sender to be the gasPayer
        vm.prank(gasPayer);
    ```

4.  **Call `claim` as `gasPayer` with Signature:** Now, execute the `airdrop.claim` function. Crucially, we pass the `user`'s address (the beneficiary), the `amount`, the Merkle `proof`, *and* the signature components (`v`, `r`, `s`) obtained in step 2. Because of the preceding `vm.prank`, the `msg.sender` inside this `claim` call will be the `gasPayer`'s address.

    ```solidity
        // 4. GasPayer calls claim, providing the user's signature
        // msg.sender will be gasPayer due to vm.prank
        // The contract verifies the signature against the 'user' address passed in
        airdrop.claim(user, AMOUNT_TO_CLAIM, PROOF, v, r, s);
    ```

5.  **Verify Outcome:** The assertions remain unchanged. We still check that the `user` (not the `gasPayer`) received the correct amount of tokens. This confirms the core logic: the gas payer facilitated the transaction, but the user benefited as authorized by their signature.

    ```solidity
        // 5. Check the user's balance increased
        uint256 endingBalance = token.balanceOf(user);
        console.log("Ending Balance: ", endingBalance);
        assertEq(endingBalance - startingBalance, AMOUNT_TO_CLAIM); // Verify user received tokens
    }
    ```

**Contract Adjustments (`MerkleAirdrop.sol`)**

A minor but necessary adjustment was made in the main `MerkleAirdrop.sol` contract code shown in the video:

1.  **Function Rename:** The helper function responsible for generating the EIP-712 digest was renamed from `getMessage` to `getMessageHash` for better clarity. Ensure this rename is reflected both in the function definition and where it's called inside the `claim` function.

    ```solidity
    // src/MerkleAirdrop.sol

    // Inside the claim function's signature check:
    // ...
    // --- Ensure this call uses the new name ---
    if (!_isValidSignature(account, getMessageHash(account, amount), v, r, s)) {
        revert MerkleAirdrop_InvalidSignature();
    }
    // ...

    // --- Ensure the function definition is renamed ---
    function getMessageHash(address account, uint256 amount) public view returns (bytes32) {
        // ... (EIP-712 hashing logic) ...
    }
    ```

    *(Reminder: This function was also made `public` in a previous step to allow calling it directly from the test.)*

**Running and Debugging the Test**

Use `forge test` (or `forge test -vv` for more detail) to run your test suite.

*   **Common Pitfall 1 (Compilation):** If you rename `getMessageHash` in the contract but forget to update the call site within the `claim` function, your contract won't compile.
*   **Common Pitfall 2 (Prank Misuse):** A `vm.prank` applies *only* to the immediately following external call. You cannot place other cheatcodes or multiple pranks between the `vm.prank` and the call it's intended for. For instance, placing a `vm.prank(user)` *before* the `vm.sign` call is incorrect and unnecessary, as `vm.sign` uses the private key directly and doesn't involve a simulated `msg.sender`. Doing so might lead to a "cannot overwrite a prank" error if another prank is used later before the first one is consumed by a call.

**Key Takeaways & Use Case**

*   **Foundry Cheatcodes:** `vm.sign` is essential for simulating user signatures, while `vm.prank` is crucial for simulating calls from different addresses (like our `gasPayer`). `makeAddrAndKey` provides the private key needed for `vm.sign`, while `makeAddr` suffices when only an address is required.
*   **Test Helpers:** Making internal helper functions like `getMessageHash` `public` significantly simplifies testing signature schemes by allowing direct calculation of the expected digest within the test script.
*   **Meta-Transaction Pattern:** This test validates a practical implementation of a meta-transaction-like system. It's particularly useful for airdrops where target users might lack the native gas token (e.g., ETH on Ethereum or a Layer 2) to claim their ERC20 rewards. By allowing a gas payer (like the project team or a dedicated service) to submit the transaction using the user's signature, you drastically improve the user experience and reduce friction for claimers.

By implementing and testing this signature-based claim mechanism, you ensure your airdrop contract can support more flexible and user-friendly distribution methods. Remember to take breaks when working through complex concepts like cryptographic signatures and Merkle proofs – letting the information "marinate" often helps solidify understanding.