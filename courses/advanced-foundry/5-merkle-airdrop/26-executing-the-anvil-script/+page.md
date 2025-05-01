## Deploying and Claiming a Merkle Airdrop on a zkSync Local Node Using Foundry

This lesson guides you through deploying the `BagelToken` and `MerkleAirdrop` smart contracts and subsequently claiming tokens using a zkSync Era local development node. This process utilizes the zkSync Foundry fork and a Bash script workaround due to limitations with standard Foundry scripts on zkSync local nodes at the time of writing.

**Note:** This section is optional. If you do not intend to develop or test specifically on zkSync Era, you can skip this lesson. This guide assumes you have completed previous steps involving setting up the Merkle Airdrop logic and potentially deploying on a standard EVM local node like Anvil.

### Setting Up the zkSync Development Environment

Before interacting with zkSync locally, you need the appropriate tooling and environment configuration.

1.  **Stop Previous Local Node:** If you have a standard EVM local node (like Anvil) running from a previous lesson, stop it now (usually by pressing `Ctrl+C` in its terminal window).
2.  **Install zkSync Foundry Fork:** To interact with zkSync using Foundry, you need the specialized zkSync fork. Open your terminal and run:
    ```bash
    foundryup -zksync
    ```
    This command installs the necessary versions of `forge` and `cast` that include zkSync compatibility.
3.  **Ensure Docker is Running:** The zkSync local development node relies on Docker. Make sure Docker Desktop (or your Docker daemon) is installed and running before proceeding.

### Understanding the zkSync Interaction Challenge

A key difference when working with zkSync Era local nodes compared to standard EVM nodes (like Anvil) is the compatibility with Foundry's Solidity scripting (`.s.sol` files executed via `forge script`). At the time of this guide's creation, directly using `forge script` for deployment and complex interactions on a zkSync local node is not fully supported.

To overcome this, we will use a pre-written Bash script (`interactZK.sh`). This script orchestrates the necessary deployment and interaction steps using a sequence of `forge` and `cast` commands directly from the terminal.

### The `interactZK.sh` Bash Script

Instead of typing numerous commands manually, we will use a Bash script containing the entire workflow.

1.  **Obtain the Script:** Copy the contents of the `interactZK.sh` script from the accompanying course materials or GitHub repository.
2.  **Create the File:** In the root directory of your project, create a new file named `interactZK.sh`.
3.  **Paste Content:** Paste the copied script content into the `interactZK.sh` file.

Let's break down the key sections of this script:

**1. Configuration Variables:**
The script begins by defining essential variables:

*   `DEFAULT_ZKSYNC_LOCAL_KEY`: The private key for the default funded account provided by the zkSync local node. This account will deploy contracts and pay for the gas of the `claim` transaction.
*   `DEFAULT_ZKSYNC_ADDRESS`: The public address corresponding to `DEFAULT_ZKSYNC_LOCAL_KEY`.
*   `DEFAULT_ANVIL_KEY`: The private key for the account intended to receive the airdrop (likely the default Anvil account used in previous EVM steps). This key is *only* used to sign the claim authorization message.
*   `DEFAULT_ANVIL_ADDRESS`: The public address corresponding to `DEFAULT_ANVIL_KEY`. This is the designated claimant address eligible for the airdrop.
*   `ROOT`: The Merkle root hash calculated previously for your airdrop distribution.
*   `PROOF_1`, `PROOF_2`, ...: The components of the Merkle proof required for the `DEFAULT_ANVIL_ADDRESS` to prove its eligibility.

**2. Start zkSync Local Node:**
The script uses the `zksync-cli` tool to start the local development node.

*   **Command:** `npx zksync-cli dev start`
*   **Purpose:** Initializes and runs the zkSync Era local node environment. Requires Docker.

**3. Deploy BagelToken Contract:**
Uses `forge create` with zkSync-specific flags to deploy the ERC20 token contract.

*   **Command:** `TOKEN_ADDRESS=$(forge create src/BagelToken.sol:BagelToken ... --private-key $DEFAULT_ZKSYNC_LOCAL_KEY --legacy --zksync | awk '/Deployed to:/{print $3}')` (Simplified structure)
*   **Flags:** `--zksync` enables zkSync deployment mode, and `--legacy` may be required depending on the zkSync node version for compatibility.
*   **Output:** Captures the deployed contract address into the `TOKEN_ADDRESS` variable.

**4. Deploy MerkleAirdrop Contract:**
Deploys the main airdrop contract, passing the Merkle root and token address as constructor arguments.

*   **Command:** `AIRDROP_ADDRESS=$(forge create src/MerkleAirdrop.sol:MerkleAirdrop ... --constructor-args $ROOT $TOKEN_ADDRESS --private-key $DEFAULT_ZKSYNC_LOCAL_KEY --legacy --zksync | awk '/Deployed to:/{print $3}')` (Simplified structure)
*   **Output:** Captures the deployed airdrop contract address into `AIRDROP_ADDRESS`.

**5. Get Message Hash for Signing:**
Calls the `getMessageHash` view function on the deployed `MerkleAirdrop` contract to retrieve the specific hash the claimant needs to sign.

*   **Command:** `MESSAGE_HASH=$(cast call $AIRDROP_ADDRESS "getMessageHash(address,uint256)" $DEFAULT_ANVIL_ADDRESS <CLAIM_AMOUNT> ...)` (Simplified structure)

**6. Sign the Message:**
Uses `cast wallet sign` with the *claimant's* private key (`DEFAULT_ANVIL_KEY`) to sign the retrieved message hash off-chain. The `0x` prefix is removed, and the raw signature is saved temporarily.

*   **Command 1:** `SIGNATURE=$(cast wallet sign --private-key $DEFAULT_ANVIL_KEY --no-hash $MESSAGE_HASH)`
*   **Command 2:** `CLEAN_SIGNATURE=$(echo "$SIGNATURE" | sed 's/^0x//')`
*   **Command 3:** `echo -n "$CLEAN_SIGNATURE" > signature.txt`

**7. Split Signature into V, R, S Components:**
Because the `claim` function requires the signature components (V, R, S) separately, and standard Foundry scripting isn't used, a helper Foundry script (`SplitSignature.s.sol`) is invoked.

*   **Command:** `SIGN_OUTPUT=$(forge script script/SplitSignature.s.sol:SplitSignature)`
*   **Purpose:** Executes the helper script which reads `signature.txt`, splits the signature, and logs V, R, and S to the console.
*   **Parsing:** Subsequent `grep`, `tail`, and `xargs` commands within the Bash script parse this console output to capture V, R, and S into Bash variables.

**8. Fund the Airdrop Contract:**
The deployer account (`DEFAULT_ZKSYNC_ADDRESS`) first mints the necessary `BagelToken` supply to itself and then transfers the required amount to the `MerkleAirdrop` contract.

*   **Command 1 (Mint):** `cast send $TOKEN_ADDRESS "mint(address,uint256)" $DEFAULT_ZKSYNC_ADDRESS <TOTAL_SUPPLY> --private-key $DEFAULT_ZKSYNC_LOCAL_KEY ...`
*   **Command 2 (Transfer):** `cast send $TOKEN_ADDRESS "transfer(address,uint256)" $AIRDROP_ADDRESS <AIRDROP_AMOUNT> --private-key $DEFAULT_ZKSYNC_LOCAL_KEY ...`

**9. Claim Airdrop Tokens:**
Executes the `claim` function on the `MerkleAirdrop` contract. This transaction is sent using the zkSync deployer's key (`DEFAULT_ZKSYNC_LOCAL_KEY`) because this account pays the transaction fees on the zkSync local node.

*   **Command:** `cast send $AIRDROP_ADDRESS "claim(address,uint256,bytes32[],uint8,bytes32,bytes32)" $DEFAULT_ANVIL_ADDRESS <CLAIM_AMOUNT> "[$PROOF_1, $PROOF_2]" $V $R $S --private-key $DEFAULT_ZKSYNC_LOCAL_KEY ...` (Simplified structure)
*   **Parameters:** Passes the claimant's address, claim amount, Merkle proof array, and the extracted V, R, S signature components.

**10. Verify Claimant Balance:**
Calls the `balanceOf` function on the `BagelToken` contract to check the claimant's balance after the claim transaction. The result is converted from hex to decimal for readability.

*   **Command 1:** `HEX_BALANCE=$(cast call $TOKEN_ADDRESS "balanceOf(address)" $DEFAULT_ANVIL_ADDRESS ...)`
*   **Command 2:** `echo "Balance of claimant... $(cast --to-dec $HEX_BALANCE)"`

**11. Cleanup:**
Removes the temporary signature file.

*   **Command:** `rm signature.txt`

### The `SplitSignature.s.sol` Helper Script

As mentioned, standard Foundry scripts face limitations on zkSync local nodes for complex interactions. However, a simple script can be used for specific, isolated tasks like processing the signature.

1.  **Obtain the Script:** Copy the content for `SplitSignature.s.sol` from the course repository.
2.  **Create the File:** Create a new file named `SplitSignature.s.sol` inside the `script/` directory of your project.
3.  **Paste Content:** Paste the copied code into this file.

**Functionality:**
This script (`SplitSignature.s.sol`) performs a single function:
*   It inherits from `forge-std/Script.sol`.
*   Its `run()` function reads the raw signature hex string from the `signature.txt` file created by the Bash script.
*   It uses the `vm.parseBytes()` cheatcode to convert the hex string into `bytes`.
*   It utilizes an internal `splitSignature` assembly function (similar to ones used in previous lessons) to separate the `bytes` signature into its `uint8 v`, `bytes32 r`, and `bytes32 s` components.
*   Finally, it uses `console.log` to print these V, R, and S values to the standard output (the terminal). The Bash script then captures this output.

### Running the zkSync Interaction Script

With both `interactZK.sh` and `script/SplitSignature.s.sol` in place, you can execute the entire process:

1.  **Make Executable:** Open your terminal in the project root and make the Bash script executable:
    ```bash
    chmod +x interactZK.sh
    ```
2.  **Run the Script:** Execute the script:
    ```bash
    ./interactZK.sh
    ```

You should see output in your terminal corresponding to the steps outlined above:
*   Messages indicating the zkSync local node is starting.
*   Deployment confirmations for `BagelToken` and `MerkleAirdrop`, including their addresses.
*   Logs from the `SplitSignature.s.sol` script showing the V, R, and S values.
*   Transaction confirmations for funding the airdrop contract.
*   Transaction confirmation for the `claim` function call.
*   Finally, the output showing the `BagelToken` balance of the claimant address (`DEFAULT_ANVIL_ADDRESS`), confirming the airdrop tokens were successfully claimed.

### Conclusion

You have successfully deployed the Merkle Airdrop contracts and claimed tokens on a zkSync Era local development node using Foundry's zkSync fork and a Bash script workaround. This demonstrates how to adapt interaction methods for L2 environments like zkSync, even when facing tooling limitations. The next logical step would be to adapt this process for deployment to a live zkSync test network, such as zkSync Sepolia.