## Testing Gas-Paid Airdrop Claims with EIP-712 Signatures

This lesson explores how to enhance your Foundry tests for a Merkle Airdrop smart contract by integrating EIP-712 signatures. This modification enables a "gas payer" – a third-party address – to submit a claim transaction on behalf of a user, thereby abstracting gas fee responsibilities from the end-user and significantly improving their experience.

Our primary objective is to test the functionality where a user signs an off-chain message authorizing an airdrop claim, and a separate address (the gas payer) utilizes this signature to execute the claim on-chain, covering the associated gas costs.

## Modifying `MerkleAirdropTest.sol` for Signature-Based Claims

To accommodate the gas payer pattern, we need to make several adjustments to our test setup and logic within `MerkleAirdropTest.sol`.

### Introducing the Gas Payer Address

First, we introduce a new address variable to represent the gas payer and initialize it within our test contract's `setUp` function.

```solidity
// test/MerkleAirdrop.t.sol
contract MerkleAirdropTest is ZkSyncChainChecker, Test {
    MerkleAirdrop public airdrop;
    BagelToken public token;

    bytes32 public ROOT = 0x474d994c50e37b12085fdb7bc6bcc0d46cf1907d90de3b7f803cf3636c0ebfb;
    uint256 public AMOUNT_TO_SEND = 25 * 1e18; // Total amount to send to airdrop contract
    uint256 public AMOUNT_TO_CLAIM = 4 * 1e18; // Amount user is eligible for
    bytes32 proofOne = 0x0fd7cf30139bcce6f17499702bf9b3114ae9e066b51ba2c53abdf7b62966e00a;
    bytes32 proofTwo = 0x0d6f4c7c1c21e8a0e0349bedda51d2d02e1ec75b551d97a999d3edbafa5a1e2f;
    bytes32[] public PROOF = [proofOne, proofTwo];

    address user;
    uint256 userPrivKey; // Private key for the user to sign messages

    address public gasPayer; // The new address for the gas payer

    function setUp() public {
        if (!isZkSyncChain()) {
            // deploy with the script
            DeployMerkleAirdrop deployer = new DeployMerkleAirdrop();
            (airdrop, token) = deployer.deployMerkleAirdrop();
        } else {
            token = new BagelToken();
            airdrop = new MerkleAirdrop(ROOT, token);
            token.mint(token.owner(), AMOUNT_TO_SEND);
            token.transfer(address(airdrop), AMOUNT_TO_SEND);
        }
        (user, userPrivKey) = makeAddrAndKey("user"); // Create user with a private key
        gasPayer = makeAddr("gasPayer"); // Create gasPayer address
    }
    // ...
}
```
In this setup:
*   `gasPayer` is declared as a `public address`.
*   Inside the `setUp` function, `(user, userPrivKey) = makeAddrAndKey("user");` utilizes a Foundry cheatcode to create a new test account named "user" and crucially retrieves its private key (`userPrivKey`). This private key is essential for the user to sign messages.
*   `gasPayer = makeAddr("gasPayer");` employs another Foundry cheatcode to create a distinct test account, `gasPayer`, which will act as the transaction submitter and pay the gas fees.

### Updating `testUsersCanClaim()` for Signature-Based Claim Logic

The core test function, `testUsersCanClaim()`, needs to be refactored to simulate the new workflow: user signs, gas payer submits.

```solidity
// test/MerkleAirdrop.t.sol
function testUsersCanClaim() public {
    uint256 startingBalance = token.balanceOf(user);

    // 1. Get the message digest that the user needs to sign
    // This calls the getMessageHash function from the MerkleAirdrop contract
    bytes32 digest = airdrop.getMessageHash(user, AMOUNT_TO_CLAIM);

    // 2. User signs the digest using their private key
    // vm.sign is a Foundry cheatcode
    uint8 v;
    bytes32 r;
    bytes32 s;
    (v, r, s) = vm.sign(userPrivKey, digest);

    // 3. The gasPayer calls the claim function with the user's signature
    vm.prank(gasPayer); // Set the next msg.sender to be gasPayer
    airdrop.claim(user, AMOUNT_TO_CLAIM, PROOF, v, r, s);

    uint256 endingBalance = token.balanceOf(user);
    console.log("Ending Balance: ", endingBalance);
    assertEq(endingBalance, startingBalance + AMOUNT_TO_CLAIM);
}
```
Let's break down the key steps in this updated test:

1.  **Get Message Digest:**
    `bytes32 digest = airdrop.getMessageHash(user, AMOUNT_TO_CLAIM);`
    This line calls the `getMessageHash` function (which must be `public` or `external`) on our `MerkleAirdrop` smart contract. This function is responsible for constructing the EIP-712 compliant typed data hash that the user will sign. The hash includes the user's address and the amount they intend to claim.

2.  **Sign the Digest:**
    `(v, r, s) = vm.sign(userPrivKey, digest);`
    Here, we use the Foundry cheatcode `vm.sign`. This powerful cheatcode takes the user's private key (`userPrivKey`) and the `digest` (message hash) generated in the previous step. It returns the three components of an ECDSA signature: `v`, `r`, and `s`. This simulates the user signing the message off-chain.

3.  **Prank as Gas Payer:**
    `vm.prank(gasPayer);`
    This Foundry cheatcode sets the `msg.sender` for the *very next contract call* to be `gasPayer`. This is how we simulate the gas payer submitting the transaction.

4.  **Call `claim` with Signature:**
    `airdrop.claim(user, AMOUNT_TO_CLAIM, PROOF, v, r, s);`
    The `claim` function on the `MerkleAirdrop` contract is now invoked. Notice that `msg.sender` for this call will be `gasPayer` (due to `vm.prank`). However, the function parameters include the actual `user`'s address, the `AMOUNT_TO_CLAIM`, the Merkle `PROOF`, and importantly, the signature components `v, r, s` obtained from the user. The `MerkleAirdrop.sol` contract's `claim` function itself must be updated to accept and verify these signature parameters.

## Required Modifications in `MerkleAirdrop.sol`

The changes in our test file imply corresponding modifications in the `MerkleAirdrop.sol` smart contract.

### Implementing the `getMessageHash` Function

The contract needs a function, `getMessageHash`, to construct the EIP-712 typed data hash. This function ensures that what the user signs off-chain matches what the contract expects on-chain.

```solidity
// src/MerkleAirdrop.sol
// ... (Ensure EIP712 imports and struct definitions are present)
// For example, you might have:
// import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
// bytes32 public constant MESSAGE_TYPEHASH = keccak256("AirdropClaim(address account,uint256 amount)");
// struct AirdropClaim {
//     address account;
//     uint256 amount;
// }

// Make sure your contract inherits EIP712 or implements its hashing logic.
// For example: contract MerkleAirdrop is EIP712, Ownable { ... }
// constructor(...) EIP712("MerkleAirdrop", "1") {} // EIP712 domain setup

function getMessageHash(address account, uint256 amount) public view returns (bytes32) {
    // Assuming EIP712 domain separator is handled, e.g., by inheriting OpenZeppelin's EIP712
    // and MESSAGE_TYPEHASH and AirdropClaim struct are defined.
    return _hashTypedDataV4(keccak256(abi.encode(
        MESSAGE_TYPEHASH, // Ensure this constant is defined for your struct
        AirdropClaim({account: account, amount: amount}) // Ensure this struct is defined
    )));
}
```
This function typically uses `_hashTypedDataV4` (often provided by libraries like OpenZeppelin's EIP712 implementation) to create a digest based on the EIP-712 domain separator, a type hash for the specific message structure (`AirdropClaim`), and the actual data (`account` and `amount`).

### Updating the `claim` Function for Signature Verification

The `claim` function in `MerkleAirdrop.sol` must be extended to accept the signature components (`v`, `r`, `s`) and perform signature verification.

```solidity
// src/MerkleAirdrop.sol
function claim(
    address account, // The account for whom the claim is being made
    uint256 amount,
    bytes32[] calldata merkleProof,
    uint8 v,        // Signature component
    bytes32 r,      // Signature component
    bytes32 s       // Signature component
) external {
    if (s_hasClaimed[account]) {
        revert MerkleAirdrop_AlreadyClaimed();
    }

    // 1. Reconstruct the digest that the user should have signed.
    bytes32 digest = getMessageHash(account, amount);

    // 2. Verify the signature.
    // The 'account' parameter (user on whose behalf claim is made) must be the signer.
    if (!_isValidSignature(account, digest, v, r, s)) {
        revert MerkleAirdrop_InvalidSignature(); // Custom error for invalid signature
    }

    // 3. Verify Merkle Proof (original logic)
    bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encodePacked(account, amount))));
    if (!MerkleProof.verify(merkleProof, i_merkleRoot, leaf)) {
        revert MerkleAirdrop_InvalidProof();
    }

    // 4. Mark as claimed and transfer tokens (original logic)
    s_hasClaimed[account] = true;
    emit Claim(account, amount);
    i_airdropToken.safeTransfer(account, amount);
}

// Helper function for signature verification
function _isValidSignature(address expectedSigner, bytes32 digest, uint8 v, bytes32 r, bytes32 s) internal pure returns (bool) {
    address actualSigner = ecrecover(digest, v, r, s);
    // Check if the recovered signer is not address(0) and matches the expected signer
    return actualSigner != address(0) && actualSigner == expectedSigner;
}
```
Key changes in the `claim` function:
*   **New Parameters:** It now accepts `uint8 v`, `bytes32 r`, and `bytes32 s`.
*   **Digest Reconstruction:** It calls `getMessageHash(account, amount)` internally to re-create the exact same digest that the user was supposed to sign. This is crucial for verification.
*   **Signature Verification:** It uses a helper function like `_isValidSignature`. This helper typically employs the Solidity precompile `ecrecover(digest, v, r, s)` to retrieve the address of the account that signed the `digest`. This recovered address (`actualSigner`) is then compared against the `account` parameter (the intended beneficiary of the claim). If they match, and the `actualSigner` is not the zero address, the signature is considered valid.

## Navigating Common Test Errors and Debugging

During development and testing, you might encounter issues. Here are a couple of common ones related to this pattern:

1.  **First Error Encountered: Undeclared Identifier for `getMessageHash`**
    *   **Issue:** A common mistake is a mismatch in function names. For example, if the `claim` function in `MerkleAirdrop.sol` internally attempts to call an old function name (e.g., `getMessage()`) after it has been renamed to `getMessageHash()` (both in its definition and in the test calls).
    *   **Fix:** Ensure consistency. Update the internal call within `MerkleAirdrop.sol`'s `claim` function to use the correct, current function name: `getMessageHash(account, amount)`.

2.  **Second Error Encountered: Cannot Overwrite Prank / Misunderstanding `vm.prank`**
    *   **Issue:** An initial test setup might incorrectly include `vm.prank(user);` *before* the `vm.sign(userPrivKey, digest);` line.
    *   **Explanation:** `vm.prank(address)` sets `msg.sender` specifically for the *next contract call*. The `vm.sign(...)` cheatcode, however, is not a contract call made *by* the `user` account within the EVM context of the test. It's a Foundry environment feature that simulates an off-chain signing action. Therefore, a `vm.prank(user)` before `vm.sign` serves no purpose for the signing itself and would be overwritten by any subsequent `vm.prank` (like `vm.prank(gasPayer);`) before an actual contract call is made.
    *   **Fix:** Remove the unnecessary `vm.prank(user);` line preceding `vm.sign()`. The `user`'s role here is to provide a signature, not to make an on-chain call themselves. The `gasPayer` is the one making the on-chain call.

## Key Concepts Reinforced

This lesson effectively demonstrates several important Web3 development concepts:

*   **Gas Payer (Relayer) Pattern:** A crucial pattern where a third-party entity (the `gasPayer` or relayer) submits a transaction on behalf of a user, paying the associated gas fees. The user's intent and authorization are conveyed through a cryptographic signature.
*   **EIP-712 Signatures:** A standard for signing typed structured data. EIP-712 makes signed messages more human-readable and less prone to phishing, as users can see what they are authorizing in a structured format.
*   **Foundry Cheat Codes:**
    *   `makeAddrAndKey(string name)`: Creates a new test account and returns its address and corresponding private key.
    *   `makeAddr(string name)`: Creates a new test account and returns its address.
    *   `vm.sign(uint256 privateKey, bytes32 digest)`: Simulates signing a data digest with a given private key, returning the signature components `(v, r, s)`.
    *   `vm.prank(address newSender)`: Sets the `msg.sender` for the immediate next smart contract call.
*   **Signature Verification On-Chain:** The use of `ecrecover(digest, v, r, s)` to derive the signer's address from a message digest and its signature. This recovered address is then compared to an expected address to validate the signature's authenticity.

## Conclusion: Advancing Your Smart Contract Testing

By successfully implementing and testing this gas-payer mechanism with EIP-712 signatures, you've taken a significant step towards building more user-friendly and advanced decentralized applications. This lesson highlights the importance of careful message construction for signing, the correct application of cryptographic signing and verification techniques, and the effective use of Foundry's cheatcodes for simulating complex interaction patterns. The iterative process of writing tests, encountering errors, and debugging them is a fundamental part of smart contract development, leading to more robust and secure code.