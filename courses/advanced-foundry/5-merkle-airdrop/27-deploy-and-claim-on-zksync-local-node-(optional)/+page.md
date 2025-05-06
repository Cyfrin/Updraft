## Deploying a Merkle Airdrop to zkSync Sepolia Manually with Foundry CLI

This lesson guides you through the process of deploying and interacting with a Merkle Airdrop smart contract system on the zkSync Sepolia testnet. We will use Foundry's command-line interface (CLI) tools (`forge` and `cast`) for manual deployment and interaction. While Foundry scripts (`forge script`) are often preferred for deployment, this manual approach is demonstrated because, at the time of this writing, Foundry's scripting capabilities may have limitations with zkSync Era.

The process involves deploying an ERC20 token contract and the Merkle Airdrop contract itself. We'll then demonstrate how a user can claim their airdrop by signing a message off-chain, which is then relayed on-chain by a separate account that pays the transaction fees. This showcases secure key management using Foundry's keystores and highlights important zkSync-specific considerations.

## Prerequisites and Setup

Before starting, ensure you have the following:

*   **Foundry Installed:** You need `forge` and `cast` CLI tools. Follow the official Foundry installation guide if you haven't already.
*   **Project Structure:** A project containing:
    *   `src/BagelToken.sol`: A standard ERC20 token contract with a `mint` function.
    *   `src/MerkleAirdrop.sol`: The airdrop contract with `getMessageHash` and `claim` functions, verifying claims against a Merkle root using proofs and signature verification (`ecrecover`).
    *   `script/SplitSignature.s.sol`: A local Foundry script to help split a signature into V, R, S components.
    *   `input.json`: A file listing recipient addresses and their corresponding airdrop amounts.
    *   `output.json`: A file generated (e.g., using `make merkle` or a similar script) containing the Merkle root and individual proofs for each recipient based on `input.json`.
*   **Foundry Keystores:** Set up at least two accounts using Foundry's encrypted keystore management. Avoid using raw private keys. We'll refer to these accounts by aliases:
    *   `updraft`: The deployer account, also used to fund the airdrop and pay gas for the claim transaction.
    *   `updraft-2`: The claimant account, which will sign the claim message off-chain but will *not* send the final transaction.
*   **Environment Variables:** Create a `.env` file in your project root with the zkSync Sepolia RPC URL:
    ```bash
    ZKSYNC_SEPOLIA_RPC_URL=https://sepolia.era.zksync.dev
    ```
    Source this file in your terminal session:
    ```bash
    source .env
    ```

## Deploying the ERC20 Token (BagelToken)

First, we deploy the ERC20 token contract (`BagelToken.sol`). We use `forge create` with the `--zksync` flag for zkSync compatibility and the `--legacy` flag to specify a Type 0 transaction, which might be necessary depending on your Foundry and zkSync versions. We'll use the `updraft` account to deploy.

```bash
forge create src/BagelToken.sol:BagelToken \
  --rpc-url ${ZKSYNC_SEPOLIA_RPC_URL} \
  --account updraft \
  --legacy \
  --zksync
```

You will be prompted for the password for your `updraft` keystore. Upon successful deployment, Foundry will output the deployed contract address. Save this address to an environment variable for later use:

```bash
export TOKEN_ADDRESS=<deployed_token_address>
# Example: export TOKEN_ADDRESS=0x123...abc
```

## Deploying the Merkle Airdrop Contract

Next, deploy the `MerkleAirdrop.sol` contract. This contract requires the Merkle root and the address of the ERC20 token as constructor arguments.

1.  **Get the Merkle Root:** Find the correct Merkle root hash in your `output.json` file. This hash represents the entire airdrop distribution list.
2.  **Set Environment Variable:** Save the root hash (ensure it has the `0x` prefix) to an environment variable.
    ```bash
    export ROOT_HASH=<correct_root_hash_from_output.json>
    # Example: export ROOT_HASH=0xabc...123
    ```
3.  **Deploy the Contract:** Use `forge create` again, providing the root hash and token address as constructor arguments. **Crucially, ensure the argument order matches your contract's constructor (e.g., `_merkleRoot` first, then `_token`).**

    ```bash
    forge create src/MerkleAirdrop.sol:MerkleAirdrop \
      --constructor-args ${ROOT_HASH} ${TOKEN_ADDRESS} \
      --rpc-url ${ZKSYNC_SEPOLIA_RPC_URL} \
      --account updraft \
      --legacy \
      --zksync
    ```

Enter the password for the `updraft` account when prompted. Save the deployed airdrop contract address:

```bash
export AIRDROP_ADDRESS=<deployed_airdrop_address>
# Example: export AIRDROP_ADDRESS=0xdef...456
```

## Preparing the Claim Data

To claim tokens, the recipient (`updraft-2` in our case) needs to sign a message off-chain. This message proves their entitlement.

1.  **Identify Claimant Details:** From your `input.json` or `output.json`, find the claimant's address (e.g., the address associated with the `updraft-2` keystore) and their corresponding airdrop amount (remember to include decimals, e.g., `25 * 10^18`). Let's assume `updraft-2` corresponds to address `0x2ea3970E82D5b30e821FAaD4A731D35964F7dd` and is eligible for 25 tokens (represented as `25000000000000000000` wei).

    ```bash
    export CLAIMANT_ADDRESS=0x2ea3970E82D5b30e821FAaD4A731D35964F7dd
    export CLAIM_AMOUNT=25000000000000000000
    ```

2.  **Generate the Message Hash:** The `MerkleAirdrop` contract typically includes a function (e.g., `getMessageHash`) that constructs the EIP-712 compatible hash that needs to be signed. Use `cast call` to invoke this function on-chain (this is a read operation, so it doesn't cost gas beyond the RPC call).

    ```bash
    cast call ${AIRDROP_ADDRESS} "getMessageHash(address,uint256)" ${CLAIMANT_ADDRESS} ${CLAIM_AMOUNT} \
      --rpc-url ${ZKSYNC_SEPOLIA_RPC_URL}
    ```
    This command will output the `bytes32` message hash. Save it:

    ```bash
    export MESSAGE_HASH=<output_message_hash_from_cast_call>
    # Example: export MESSAGE_HASH=0xghi...789
    ```

3.  **Sign the Message Hash Off-Chain:** Use `cast wallet sign` with the claimant's account (`updraft-2`). **Crucially, use the `--no-hash` flag** because the `MESSAGE_HASH` we obtained from the contract is *already* the final hash to be signed.

    ```bash
    cast wallet sign --no-hash ${MESSAGE_HASH} --account updraft-2
    ```
    Enter the password for the `updraft-2` keystore. This command outputs the 65-byte signature (prefixed with `0x`).

4.  **Split the Signature:** The `claim` function on the contract requires the signature components (V, R, S) separately. We use the `SplitSignature.s.sol` helper script for this.
    *   Create a temporary file named `signature.txt`.
    *   Paste the full signature output from the previous step into `signature.txt`, **removing the leading `0x` prefix**.
    *   Run the script:
        ```bash
        forge script script/SplitSignature.s.sol:SplitSignature
        ```
    *   The script will output the V (uint8), R (bytes32), and S (bytes32) values. Save these:
        ```bash
        export V=<v_value>
        export R=<r_value_with_0x>
        export S=<s_value_with_0x>
        # Example: export V=28
        # Example: export R=0x...
        # Example: export S=0x...
        ```

## Funding the Airdrop Contract

The `MerkleAirdrop` contract needs to hold enough `BagelToken` to cover all claims.

1.  **Mint Tokens:** First, mint the total required supply (e.g., 100 tokens) to the deployer account (`updraft`). Find the deployer's address if you don't have it handy:
    ```bash
    export DEPLOYER_ADDRESS=$(cast wallet address updraft)
    ```
    Now, mint the tokens (adjust the amount `100000000000000000000` based on your token's decimals and total airdrop amount):
    ```bash
    cast send ${TOKEN_ADDRESS} "mint(address,uint256)" ${DEPLOYER_ADDRESS} 100000000000000000000 \
      --account updraft \
      --rpc-url ${ZKSYNC_SEPOLIA_RPC_URL} \
      --zksync
      # Note: Adding --zksync flag here as well for consistency, although may not be strictly needed for send if RPC URL implies it.
    ```
    Enter the password for `updraft`.

2.  **Transfer Tokens to Airdrop Contract:** Transfer the minted tokens from the deployer (`updraft`) to the `MerkleAirdrop` contract address.
    ```bash
    cast send ${TOKEN_ADDRESS} "transfer(address,uint256)" ${AIRDROP_ADDRESS} 100000000000000000000 \
      --account updraft \
      --rpc-url ${ZKSYNC_SEPOLIA_RPC_URL} \
      --zksync
    ```
    Enter the password for `updraft`. Wait for the transaction to be confirmed.

## Executing the Claim

Now, anyone can trigger the `claim` function on behalf of the claimant (`updraft-2`), provided they supply the correct parameters, including the claimant's address, amount, Merkle proof, and the valid signature (V, R, S). The account sending the transaction (`updraft` in this case) pays the gas fee.

1.  **Get Merkle Proof:** Find the Merkle proof array specific to the `CLAIMANT_ADDRESS` in your `output.json` file. Export each element.
    ```bash
    # Example proof elements for CLAIMANT_ADDRESS from output.json
    export PROOF_ELEMENT_1=0x4fd31feee0e75780cd67704fbc43cae70fddcaa43631e2e1bc9fb233fada2394
    export PROOF_ELEMENT_2=0x81f8e530b5687f2d6fc3e10f887380423063f0407e21cef901b8aeb0a25e5e2
    ```

2.  **Call `claim`:** Use `cast send` to call the `claim` function. Provide all the required arguments: claimant address, amount, the proof array (formatted as `"[element1,element2,...]"`), and the V, R, S signature components. The transaction is sent using the `updraft` account.

    ```bash
    cast send ${AIRDROP_ADDRESS} "claim(address,uint256,bytes32[],uint8,bytes32,bytes32)" \
      ${CLAIMANT_ADDRESS} \
      ${CLAIM_AMOUNT} \
      "[${PROOF_ELEMENT_1},${PROOF_ELEMENT_2}]" \
      ${V} \
      ${R} \
      ${S} \
      --account updraft \
      --rpc-url ${ZKSYNC_SEPOLIA_RPC_URL} \
      --zksync
    ```
    Enter the password for `updraft`. Wait for the transaction confirmation.

## Verifying the Claim

Finally, verify that the claimant (`updraft-2`) received their tokens.

1.  **Check Balance On-Chain:** Use `cast call` to check the `BagelToken` balance of the `CLAIMANT_ADDRESS`.
    ```bash
    cast call ${TOKEN_ADDRESS} "balanceOf(address)" ${CLAIMANT_ADDRESS} \
      --rpc-url ${ZKSYNC_SEPOLIA_RPC_URL}
    ```
    This will return the balance in hexadecimal format. Convert it to decimal:
    ```bash
    cast --to-dec <hex_balance_output>
    ```
    The output should match the `CLAIM_AMOUNT` (e.g., `25000000000000000000`).

2.  **Check Block Explorer:** Visit the zkSync Sepolia Block Explorer (`https://sepolia.explorer.zksync.io/`) and search for the `claim` transaction hash or the `AIRDROP_ADDRESS`. You should see the successful transaction and the corresponding `ERC20 Transfer` event showing tokens moving from the `AIRDROP_ADDRESS` to the `CLAIMANT_ADDRESS`.

## Key Concepts Explained

*   **Merkle Airdrops:** A gas-efficient method for distributing tokens. Only a single `bytes32` hash (the Merkle Root) representing the entire list of recipients and amounts is stored on-chain. Users provide their individual data and a cryptographic proof (Merkle Proof) off-chain, which the contract verifies against the root. This avoids storing large arrays of recipients on-chain.
*   **Off-Chain Signing (EIP-712):** The claimant authorizes the transaction without sending it themselves. They sign a structured message (hashed according to EIP-712 standards, often via a contract helper function like `getMessageHash`) using their private key. This signature is then submitted to the contract by someone else.
*   **Signature Verification (`ecrecover`):** The `claim` function uses the built-in `ecrecover(hash, v, r, s)` function. It takes the message hash and the signature components (V, R, S) and returns the public address of the key that signed the message. The contract checks if this recovered address matches the `claimantAddress` parameter passed to the function. If they match, the signature is valid, proving the claimant authorized this specific claim.
*   **Gas Relaying / Meta-Transactions:** The pattern where one account (the claimant, `updraft-2`) signs a message authorizing an action, and another account (the relayer, `updraft`) submits the transaction and pays the gas fee. This is useful when claimants might not have ETH for gas on the target network.

## zkSync Specific Considerations

*   **`--zksync` Flag:** This flag is mandatory when interacting with zkSync Era networks using `forge` and `cast` to ensure correct transaction formatting and handling.
*   **`--legacy` Flag:** For `forge create`, this flag forces the use of pre-EIP-1559 legacy transactions (Type 0). This was sometimes necessary for compatibility between Foundry and early versions or specific configurations of zkSync Era. Check if it's still required for your setup.
*   **RPC URL:** Use the official public RPC endpoint (`https://sepolia.era.zksync.dev`). Third-party RPC providers might sometimes have synchronization or compatibility issues.
*   **`ecrecover` and Account Abstraction:** zkSync natively supports Account Abstraction (AA). Be aware that `ecrecover` relies on standard Externally Owned Account (EOA) ECDSA signatures. If the signing account (`updraft-2` in this example) were a smart contract wallet implementing different signature validation logic, or if it used a non-standard signature scheme, `ecrecover` might fail or behave unexpectedly. zkSync documentation provides details on handling signatures with AA.

You have now successfully deployed a Merkle Airdrop system to zkSync Sepolia, funded it, and executed a claim using off-chain signing and Foundry's CLI tools, while navigating zkSync-specific requirements.