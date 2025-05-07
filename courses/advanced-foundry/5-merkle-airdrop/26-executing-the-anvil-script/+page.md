## Claiming Tokens from a Merkle Airdrop with Foundry Scripts on Anvil

This lesson guides you through the process of running a script to claim tokens from a Merkle Airdrop contract deployed on a local Anvil blockchain. We'll use Foundry's `forge script` to execute the claim and `cast` commands to verify the token transfer, addressing common errors encountered along the way.

The primary objective is to execute an `Interact.s.sol` script. This script will call the `claim` function on a pre-deployed `MerkleAirdrop` contract. The claim is for a specific `CLAIMING_ADDRESS` and `CLAIMING_AMOUNT`, utilizing pre-calculated Merkle proofs and a cryptographic signature. Finally, we'll verify that the `CLAIMING_ADDRESS` has successfully received the tokens.

## Setting Up and Running the Claim Script

We'll interact with our local Anvil blockchain, a development node provided by Foundry. Anvil offers pre-funded accounts with known private keys, which simplifies local development and testing.

The core of our interaction is a Foundry script, `Interact.s.sol`. Foundry scripts automate on-chain interactions. In our case, this script is designed to execute the token claim transaction.

**The `Interact.s.sol` Script:**

The script, named `ClaimAirdrop` within `script/Interact.s.sol`, is structured as follows:

```solidity
// script/Interact.s.sol
pragma solidity ^0.8.24; // Or your compatible version

import { Script } from "forge-std/Script.sol";
import { DevOpsTools } from "foundry-devops/src/DevOpsTools.sol"; // Utility for deployment lookups
import { MerkleAirdrop } from "../src/MerkleAirdrop.sol"; // Path to your MerkleAirdrop contract

contract ClaimAirdrop is Script {
    // Constants for the claim
    address CLAIMING_ADDRESS = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266; // Anvil's first default account
    uint256 CLAIMING_AMOUNT = 25 * 1e18; // 25 tokens, assuming 18 decimals
    bytes32 PROOF_ONE = 0xd14d5c931158119d0449ffcac3d47d028c8c359d34d664d95962b3b056ad; // Example Merkle proof element
    bytes32 PROOF_TWO = 0x5e5d0d1edb5478944ecab36d95a94c3bbdd218d75f624caa71d87896b57b; // Example Merkle proof element
    bytes32[] proof = [PROOF_ONE, PROOF_TWO];
    // Signature from CLAIMING_ADDRESS authorizing this claim
    bytes private SIGNATURE = hex"fbd2278ebf23fb5fe9248480c8f4be8a4e9b07f7c3ad01333c8d5b5dec511602a2a06c24085d807c838ba"; // Example signature

    function run() external {
        // Retrieve the address of the most recently deployed MerkleAirdrop contract
        address mostRecentlyDeployed = DevOpsTools.get_most_recent_deployment("MerkleAirdrop", block.chainid);
        MerkleAirdrop merkleAirdrop = MerkleAirdrop(mostRecentlyDeployed);

        // Begin broadcasting transactions to the network
        vm.startBroadcast();

        // Split the signature into its v, r, s components
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(SIGNATURE);

        // Call the claim function on the MerkleAirdrop contract
        merkleAirdrop.claim(CLAIMING_ADDRESS, CLAIMING_AMOUNT, proof, v, r, s);

        // Stop broadcasting transactions
        vm.stopBroadcast();
    }

    // Helper function to split a 65-byte signature into v, r, s
    function splitSignature(bytes memory sig) public pure returns (uint8 v, bytes32 r, bytes32 s) {
        require(sig.length == 65, "invalid signature length");
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }
}
```

**Executing the Script:**

To run this script, we use the `forge script` command:

```bash
forge script script/Interact.s.sol:ClaimAirdrop --rpc-url http://localhost:8545 --private-key <ANVIL_PRIVATE_KEY_FOR_GAS_PAYER> --broadcast
```

Let's break down the command options:
*   `--rpc-url http://localhost:8545`: Specifies the RPC endpoint for our local Anvil node.
*   `--private-key <ANVIL_PRIVATE_KEY_FOR_GAS_PAYER>`: Provides the private key of the account that will sign and send the transaction, thus paying for the gas. For this demonstration, we'll use the private key of the *second* default Anvil account (`0x59c6995e998f97c53dc0061b03a92d461a7b4d034017663132d705a80ac2da`) as the gas payer. This is distinct from the `CLAIMING_ADDRESS` (Anvil's first account, `0xf39...92266`), which is the beneficiary of the airdrop. This separation highlights a common pattern where one account (gas payer) can submit a transaction on behalf of another (claimant), provided proper authorization (like the `SIGNATURE`) is in place.
*   `--broadcast`: This flag ensures the transaction is actually sent to the Anvil network. Without it, the script runs in a simulated environment.

Foundry cheatcodes like `vm.startBroadcast()` and `vm.stopBroadcast()` are used within the script to demarcate the transactions intended for broadcast. The `DevOpsTools.get_most_recent_deployment` function is a utility to conveniently fetch the address of our `MerkleAirdrop` contract based on its name and the current `block.chainid` (Anvil's default is 31337).

The `SIGNATURE` is crucial here. Since the gas payer is different from the `CLAIMING_ADDRESS`, the `MerkleAirdrop` contract's `claim` function likely verifies this signature to ensure that `CLAIMING_ADDRESS` has authorized this specific claim (address, amount, and proofs).

## Debugging Common Foundry Script Errors

During development, typos and configuration errors are common. Let's walk through a few that might occur when running the script initially.

**Error 1: `Member "endBroadcast" not found`**

If your script execution fails with:
```
CompilerError: Member "endBroadcast" not found or not visible after argument-dependent lookup in vm.
 --> script/Interact.s.sol:30:9:
  |
30 |         vm.endBroadcast();
  |         ^^^^^^^^^^^^^^^^^
```
This indicates a typo in the Foundry cheatcode.
*   **Cause:** The cheatcode to stop broadcasting transactions is `vm.stopBroadcast()`, not `vm.endBroadcast()`.
*   **Fix in `Interact.s.sol`:**
    ```diff
    -        vm.endBroadcast();
    +        vm.stopBroadcast();
    ```

**Error 2: `Member "chanId" not found`**

Another potential error might appear as:
```
CompilerError: Member "chanId" not found or not visible after argument-dependent lookup in block.
 --> script/Interact.s.sol:18:86:
  |
18 |         address mostRecentlyDeployed = DevOpsTools.get_most_recent_deployment("MerkleAirdrop", block.chanId);
  |                                                                                                      ^^^^^^^^^^
```
This points to a typo in a Solidity global variable.
*   **Cause:** The Solidity global variable for the current chain ID is `block.chainid` (all lowercase 'i').
*   **Fix in `Interact.s.sol` (within the `run` function or any helper using it):**
    ```diff
    -        address mostRecentlyDeployed = DevOpsTools.get_most_recent_deployment("MerkleAirdrop", block.chanId);
    +        address mostRecentlyDeployed = DevOpsTools.get_most_recent_deployment("MerkleAirdrop", block.chainid);
    ```

**Error 3: `Member "get_most_recent_deployement" not found`**

A subtle typo in a function name can also cause issues:
```
CompilerError: Member "get_most_recent_deployement" not found or not visible after argument-dependent lookup in type(library DevOpsTools).
 --> script/Interact.s.sol:18:40:
  |
18 |         address mostRecentlyDeployed = DevOpsTools.get_most_recent_deployement("MerkleAirdrop", block.chainid);
  |                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```
*   **Cause:** Typo in the function name `get_most_recent_deployement`. It should be `deployment`.
*   **Fix in `Interact.s.sol`:**
    ```diff
    -        address mostRecentlyDeployed = DevOpsTools.get_most_recent_deployement("MerkleAirdrop", block.chainid);
    +        address mostRecentlyDeployed = DevOpsTools.get_most_recent_deployment("MerkleAirdrop", block.chainid);
    ```

## Successful Script Execution

After correcting any typos, running the `forge script` command again should yield a successful execution:

```bash
forge script script/Interact.s.sol:ClaimAirdrop --rpc-url http://localhost:8545 --private-key 0x59c6995e998f97c53dc0061b03a92d461a7b4d034017663132d705a80ac2da --broadcast
```

The output should confirm the success:
```
[⠢] Compiling...
[⠒] Compiling 1 files with 0.8.24
[⠊] Solc 0.8.24 finished in 622.89ms
Compiler run successful!
Script ran successfully.

== Logs ==
  Transaction successfully sent!
  Transaction pétales:
    Tx hash: 0x...
    Gas used: 78258
  Contract address: <address_if_any_deployment>

ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.
Total Paid: 0.000078258 ETH (78258 gas * 1 gwei)
Transactions saved to: /path/to/your/project/merkle-airdrop/broadcast/Interact.s.sol/31337/run-latest.json
```
The important part is "ONCHAIN EXECUTION COMPLETE & SUCCESSFUL." The path provided shows where Foundry saves a JSON file containing details about the broadcasted transaction. The chain ID `31337` is the default for Anvil.

## Verifying the Token Claim

With the script executed successfully, the next step is to verify that the `CLAIMING_ADDRESS` (Anvil's first account: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`) has received the airdropped tokens. Let's assume our ERC20 token is named `BagelToken`.

**1. Obtain the Token Contract Address:**
You'll need the deployed address of your `BagelToken` contract. This address would typically be available from your deployment script's output (e.g., from a `DeployMerkleAirdrop.s.sol` script that also deploys the token). For this example, let's assume the `BagelToken` contract was deployed to: `0x5FbDB2315678afecb367f032d93F642f64180aa3` (a common default address in local development environments if it's one of the first contracts deployed).

**2. Query Token Balance using `cast call`:**
Foundry's `cast call` command allows us to make a read-only call to a contract function without sending a transaction (and thus without incurring gas fees). We'll use it to call the standard ERC20 `balanceOf(address)` function on our `BagelToken` contract.

```bash
cast call 0x5FbDB2315678afecb367f032d93F642f64180aa3 "balanceOf(address)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```
*   `0x5FbDB2315678afecb367f032d93F642f64180aa3`: Address of the `BagelToken` contract.
*   `"balanceOf(address)"`: The function signature we want to call.
*   `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`: The `CLAIMING_ADDRESS` whose balance we're checking.

This command will output the balance in hexadecimal format:
```
0x000000000000000000000000000000000000000000000000000000015af1d78b58c40000
```

**3. Convert Hexadecimal Balance to Decimal:**
The hexadecimal output isn't very human-readable. We can use `cast --to-dec` to convert it to its decimal representation.

```bash
cast --to-dec 0x000000000000000000000000000000000000000000000000000000015af1d78b58c40000
```

This command will output:
```
2500000000000000000000
```
This decimal value is `25 * 10^18`, confirming that the `CLAIMING_ADDRESS` successfully received 25 `BagelToken` (assuming 18 decimal places for the token), matching the `CLAIMING_AMOUNT` specified in our `Interact.s.sol` script.

## Conclusion and Key Learnings

We have successfully executed a script to claim tokens from a Merkle Airdrop contract on a local Anvil blockchain and verified the claim. This lesson demonstrated:

*   **Foundry Scripting (`forge script`):** Automating on-chain interactions for tasks like token claims.
*   **Anvil for Local Development:** Utilizing a local Ethereum node with pre-funded accounts.
*   **Key `forge script` Flags:** `--rpc-url`, `--private-key`, and `--broadcast`.
*   **Gas Payer vs. Claimant:** A common pattern where one account pays for gas while another benefits from the transaction, authorized via a signature.
*   **Foundry Cheatcodes:** Using `vm.startBroadcast()` and `vm.stopBroadcast()` in scripts.
*   **Debugging Script Errors:** Identifying and fixing common typos in cheatcodes, Solidity variables, and function names.
*   **State Verification with `cast call`:** Querying contract state (like token balances) without sending transactions.
*   **Utility `cast --to-dec`:** Converting hexadecimal outputs to decimal for easier interpretation.

This workflow is fundamental for developing and testing smart contract interactions, particularly for scenarios like airdrops where users or backend systems need to claim assets based on specific criteria and proofs.