## Deploying and Interacting with a Merkle Airdrop on zkSync Local Node

This lesson provides an optional, hands-on guide to deploying a Merkle Airdrop smart contract, along with its associated token contract, to a zkSync local development node. We'll also walk through the process of an eligible address claiming its tokens. Due to certain limitations with full Foundry script support on zkSync local nodes at the time of this guide's creation, we will utilize a bash script (`interactZK.sh`) to orchestrate a series of `cast` and `forge script` commands. This approach effectively automates the entire workflow from deployment to claiming.

## Initial Setup for zkSync Environment

Before diving into the deployment, let's prepare our local environment for zkSync development. This section is primarily for users who wish to follow along with zkSync-specific interactions.

1.  **Stop Existing Anvil Node:** If you have an Anvil node running from previous lessons or other development work, ensure it is stopped to prevent port conflicts and confusion. You can typically stop it by pressing `Ctrl+C` in the terminal where it's running.

2.  **Install or Update zkSync-Compatible Foundry:**
    The zkSync team maintains a fork of Foundry that includes compatibility for their network. To install or update to this version, run the following command in your terminal:
    ```bash
    foundryup -zksync
    ```
    This command ensures your `forge` and `cast` tools are equipped to interact with zkSync nodes.

## Introducing the `interactZK.sh` Automation Script

Given the current state of Foundry scripting on zkSync local nodes, a bash script provides a robust way to manage the multi-step process of contract deployment and interaction. This script, `interactZK.sh`, will automate calls to `forge`, `cast`, and the zkSync CLI.

You will need to obtain this script. The recommended way is to copy its contents from the official GitHub repository associated with this course.
1.  Create a new file named `interactZK.sh` in the root directory of your project.
2.  Paste the content from the repository's `interactZK.sh` file into your newly created local file.

## Dissecting the `interactZK.sh` Bash Script

The `interactZK.sh` script is designed to execute the entire workflow sequentially. Let's break down its components:

### Defining Essential Constants

The script begins by defining several constants crucial for its operation:

*   `DEFAULT_ZKSYNC_LOCAL_KEY`: This is the private key for the default rich account provided by the zkSync local development node. This account will act as the deployer for our smart contracts and will also pay the gas fees for transactions like the token claim.
    *   *Example (value will differ)*: `0x7726827caac94a7f9e1b160f7e80984ea8b0c5b371a87e8bf873508ae043d0`
*   `DEFAULT_ZKSYNC_ADDRESS`: The Ethereum address corresponding to the `DEFAULT_ZKSYNC_LOCAL_KEY`.
*   `DEFAULT_ANVIL_KEY`: This private key belongs to an account (presumably from a previous Anvil setup or a pre-determined list) that is eligible for the airdrop. This key will be used to sign a message, proving the account's eligibility.
    *   *Example*: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
*   `DEFAULT_ANVIL_ADDRESS`: The Ethereum address corresponding to `DEFAULT_ANVIL_KEY`. This is the address that will ultimately receive the airdropped tokens.
    *   *Example*: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
*   `ROOT`: The pre-calculated Merkle root for the airdrop. This root represents the cryptographic commitment to the set of all eligible addresses and their token amounts.
*   `PROOF_1`, `PROOF_2`: These are the Merkle proofs specific to `DEFAULT_ANVIL_ADDRESS`. The proofs, along with the `ROOT`, allow the smart contract to verify that `DEFAULT_ANVIL_ADDRESS` is indeed part of the airdrop distribution.

### Starting the zkSync Local Node

The script first ensures a zkSync local development node is running. It uses the `zksync-cli` for this purpose.
**Important:** Docker must be installed and running on your machine for this step to succeed.
```bash
echo "Creating zkSync local node..."
npx zksync-cli dev start
```

### Deploying the `BagelToken` Contract

Next, the script deploys the `BagelToken.sol` ERC20 token contract to the zkSync local node.
*   The deployment is performed using `forge create`.
*   The `--rpc-url http://127.0.0.1:8011` flag points to the default RPC endpoint for the zkSync local node.
*   The `--private-key $DEFAULT_ZKSYNC_LOCAL_KEY` specifies the deployer account.
*   The `--legacy` flag is used for compatibility, and `--zksync` enables zkSync-specific deployment features.
*   The deployed contract address is captured using `awk` and stored in the `TOKEN_ADDRESS` variable.

```bash
echo "Deploying token contract..."
TOKEN_ADDRESS=$(forge create src/BagelToken.sol:BagelToken --rpc-url http://127.0.0.1:8011 --private-key $DEFAULT_ZKSYNC_LOCAL_KEY --legacy --zksync | awk '/Deployed to:/{print $3}')
echo "Token contract deployed at: $TOKEN_ADDRESS"
```

### Deploying the `MerkleAirdrop` Contract

With the token contract deployed, the script deploys the `MerkleAirdrop.sol` contract.
*   This deployment also uses `forge create` with similar flags.
*   Crucially, it passes the `ROOT` (Merkle root) and `TOKEN_ADDRESS` (address of the deployed BagelToken contract) as constructor arguments using `--constructor-args`.
*   The deployer is again `DEFAULT_ZKSYNC_LOCAL_KEY`.
*   The deployed airdrop contract address is extracted and stored in `AIRDROP_ADDRESS`.

```bash
echo "Deploying MerkleAirdrop contract..."
AIRDROP_ADDRESS=$(forge create src/MerkleAirdrop.sol:MerkleAirdrop --rpc-url http://127.0.0.1:8011 --private-key $DEFAULT_ZKSYNC_LOCAL_KEY --constructor-args $ROOT $TOKEN_ADDRESS --legacy --zksync | awk '/Deployed to:/{print $3}')
echo "MerkleAirdrop contract deployed at: $AIRDROP_ADDRESS"
```

### Retrieving the Message Hash for Signing

To authorize the claim, our airdrop contract requires a signed message. The script first fetches the specific message hash that needs to be signed. This is done by calling the `getMessageHash` view function on the `MerkleAirdrop` contract.
*   `cast call` is used to invoke this read-only function.
*   Arguments passed to `getMessageHash` are the claimant's address (`DEFAULT_ANVIL_ADDRESS`) and the amount they are eligible for (e.g., `2500000000000000000000`).

```bash
echo "Get message hash"
MESSAGE_HASH=$(cast call $AIRDROP_ADDRESS "getMessageHash(address,uint256)" $DEFAULT_ANVIL_ADDRESS 2500000000000000000000 --rpc-url http://127.0.0.1:8011)
```

### Signing the Message

The `DEFAULT_ANVIL_KEY` (the private key of the airdrop recipient) is used to sign the `MESSAGE_HASH` obtained in the previous step.
*   `cast wallet sign` performs the signing operation.
*   The `--no-hash` flag is important here because `getMessageHash` on the contract already returns a hash ready for signing (as per EIP-712 or similar personal_sign conventions where the message is pre-hashed).

```bash
echo "Signing message..."
SIGNATURE=$(cast wallet sign --private-key $DEFAULT_ANVIL_KEY --no-hash $MESSAGE_HASH)
```

### Cleaning the Signature

The signature obtained from `cast wallet sign` typically includes a "0x" prefix. This prefix needs to be removed before further processing.
*   `sed 's/^0x//'` removes the leading "0x".
*   The cleaned signature is then saved to a temporary file named `signature.txt`. This file will be accessed by a Foundry script in the next step.

```bash
CLEAN_SIGNATURE=$(echo "$SIGNATURE" | sed 's/^0x//')
echo -n "$CLEAN_SIGNATURE" > signature.txt
```

### Splitting the Signature using `SplitSignature.s.sol`

The `claim` function in the `MerkleAirdrop` contract expects the signature to be provided as three separate components: `v`, `r`, and `s`. To achieve this, we use a small Foundry script named `SplitSignature.s.sol`.

First, the bash script executes this Foundry script:
```bash
SIGN_OUTPUT=$(forge script script/SplitSignature.s.sol:SplitSignature --rpc-url http://127.0.0.1:8011)
```

The `SplitSignature.s.sol` script (which you should create in `script/SplitSignature.s.sol`) contains the following Solidity code:
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Script, console } from "forge-std/Script.sol";

contract SplitSignature is Script {
    error SplitSignatureScript_InvalidSignatureLength();

    function splitSignature(bytes memory sig)
        internal
        pure
        returns (uint8 v, bytes32 r, bytes32 s)
    {
        // Signatures are 65 bytes long (32 bytes for r, 32 bytes for s, 1 byte for v)
        if (sig.length != 65) {
            revert SplitSignatureScript_InvalidSignatureLength();
        }
        assembly {
            r := mload(add(sig, 32)) // First 32 bytes from the start of sig data
            s := mload(add(sig, 64)) // Next 32 bytes
            v := byte(0, mload(add(sig, 96))) // Final byte (the 65th byte)
        }
    }

    function run() external {
        // Read the cleaned signature from the temporary file
        string memory sigString = vm.readFile("signature.txt");
        bytes memory sigBytes = vm.parseBytes(sigString); // Convert hex string to bytes

        (uint8 v, bytes32 r, bytes32 s) = splitSignature(sigBytes);

        // Log v, r, and s to standard output for the bash script to capture
        console.log("v value:");
        console.log(v);
        console.log("r value:");
        console.logBytes32(r);
        console.log("s value:");
        console.logBytes32(s);
    }
}
```
This Solidity script reads the signature from `signature.txt`, uses assembly to split it into `v`, `r`, and `s`, and then prints these values to the console.

The bash script then parses the `SIGN_OUTPUT` (the standard output from the `forge script` command) to extract the `v`, `r`, and `s` values using `grep`, `tail`, and `xargs`:
```bash
V=$(echo "$SIGN_OUTPUT" | grep -A 1 "v value:" | tail -n 1 | xargs)
R=$(echo "$SIGN_OUTPUT" | grep -A 1 "r value:" | tail -n 1 | xargs)
S=$(echo "$SIGN_OUTPUT" | grep -A 1 "s value:" | tail -n 1 | xargs)
```

### Funding the Airdrop Contract

Before tokens can be claimed, the `MerkleAirdrop` contract must possess enough `BagelToken`s to distribute. This involves two steps:

1.  **Minting tokens to the deployer:** The `DEFAULT_ZKSYNC_ADDRESS` (our contract deployer) first mints a supply of `BagelToken`s to itself.
    ```bash
    echo "Sending tokens to the token contract owner..."
    cast send $TOKEN_ADDRESS "mint(address,uint256)" $DEFAULT_ZKSYNC_ADDRESS 1000000000000000000000 --private-key $DEFAULT_ZKSYNC_LOCAL_KEY --rpc-url http://127.0.0.1:8011 > /dev/null
    ```
    *(Note: `> /dev/null` suppresses the transaction hash output for brevity.)*

2.  **Transferring tokens to the Airdrop contract:** The deployer then transfers the required amount of `BagelToken`s to the `AIRDROP_ADDRESS` (the MerkleAirdrop contract).
    ```bash
    echo "Sending tokens to the airdrop contract..."
    cast send $TOKEN_ADDRESS "transfer(address,uint256)" $AIRDROP_ADDRESS 1000000000000000000000 --private-key $DEFAULT_ZKSYNC_LOCAL_KEY --rpc-url http://127.0.0.1:8011 > /dev/null
    ```

### Claiming the Airdrop

Now, the eligible address (`DEFAULT_ANVIL_ADDRESS`) can claim its tokens.
*   The `claim` function on the `MerkleAirdrop` contract is called using `cast send`.
*   The transaction is sent by `DEFAULT_ZKSYNC_LOCAL_KEY`, which pays for the gas.
*   The arguments to the `claim` function are:
    *   `DEFAULT_ANVIL_ADDRESS`: The address for whom the claim is being made.
    *   `2500000000000000000000`: The amount of tokens being claimed.
    *   `[\"$PROOF_1\",\"$PROOF_2\"]`: The array of Merkle proofs for `DEFAULT_ANVIL_ADDRESS`.
    *   `"$V"`, `"$R"`, `"$S"`: The split signature components.

```bash
echo "Claiming tokens on behalf of $DEFAULT_ANVIL_ADDRESS..."
cast send $AIRDROP_ADDRESS "claim(address,uint256,bytes32[],uint8,bytes32,bytes32)" $DEFAULT_ANVIL_ADDRESS 2500000000000000000000 "[\"$PROOF_1\",\"$PROOF_2\"]" "$V" "$R" "$S" --private-key $DEFAULT_ZKSYNC_LOCAL_KEY --rpc-url http://127.0.0.1:8011
```

### Verifying the Token Balance

To confirm the airdrop was successful, the script checks the `BagelToken` balance of the `DEFAULT_ANVIL_ADDRESS`.
*   `cast call` is used to invoke the `balanceOf` function on the `BagelToken` contract.
*   `cast --to-dec` converts the returned hexadecimal balance to a decimal representation for easier reading.

```bash
HEX_BALANCE=$(cast call $TOKEN_ADDRESS "balanceOf(address)" $DEFAULT_ANVIL_ADDRESS --rpc-url http://127.0.0.1:8011)
echo "Balance of the claiming address ($DEFAULT_ANVIL_ADDRESS): $(cast --to-dec $HEX_BALANCE)"
```

### Cleaning Up

Finally, the script removes the temporary `signature.txt` file.
```bash
echo "Clean up"
rm signature.txt
```

## Executing the `interactZK.sh` Script

To run the entire automated process:

1.  Make the script executable:
    ```bash
    chmod +x interactZK.sh
    ```
2.  Execute the script:
    ```bash
    ./interactZK.sh
    ```

You should observe output in your terminal corresponding to each step defined in the script:
*   Messages indicating the start of the zkSync local node (you might see Docker-related logs).
*   Deployment confirmation for the `BagelToken` contract, including its address.
*   Deployment confirmation for the `MerkleAirdrop` contract, including its address.
*   Logs from the `SplitSignature.s.sol` script, showing the derived `v`, `r`, and `s` values.
*   Messages about tokens being sent (minted and transferred).
*   A transaction hash for the claim operation.
*   Finally, the script will display the `BagelToken` balance of the `DEFAULT_ANVIL_ADDRESS`, which should reflect the successfully claimed amount (e.g., `2500000000000000000000`).

## Key Takeaways and Resources

This lesson demonstrated a comprehensive workflow for interacting with smart contracts on a zkSync local node using a combination of shell scripting and Foundry tools.

*   **zkSync Local Development:** We saw how to use `zksync-cli` (with Docker) to spin up a local zkSync environment.
*   **Foundry for zkSync:** The zkSync-compatible version of Foundry (`foundryup -zksync`) allows using `forge create --zksync` for deployments and `cast` commands targeting the zkSync local RPC (`http://127.0.0.1:8011`).
*   **Signature Splitting in Solidity:** The `SplitSignature.s.sol` script provided a practical example of how to read a signature (e.g., from a file via `vm.readFile`) and split it into its `v`, `r`, and `s` components using inline assembly. This is a common pattern when working with signatures in smart contracts.
*   **Bash Scripting for Automation:** Bash scripts are invaluable for orchestrating complex sequences of command-line operations, especially when native scripting support in a specific framework or environment has limitations.
*   **GitHub Repository:** The `interactZK.sh` and `SplitSignature.s.sol` scripts are available in the course's GitHub repository, serving as a direct reference.

## Outcome and Next Steps

By following this lesson and successfully running the `interactZK.sh` script, you will have deployed both the `BagelToken` and `MerkleAirdrop` contracts to your zkSync local node. Furthermore, an eligible address will have successfully claimed its airdropped tokens, with the final balance check confirming the operation's success.

This local demonstration sets the stage for deploying and interacting with these contracts on a live testnet, such as zkSync Sepolia, which will be covered in subsequent lessons.