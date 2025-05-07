## Crafting a Foundry Deployment Script for Your Merkle Airdrop

This lesson guides you through creating a robust deployment script in Foundry for a Merkle Airdrop system. We'll cover the deployment of both a `BagelToken` (an ERC20 token) and the `MerkleAirdrop` contract itself. Furthermore, we'll demonstrate how to integrate this script into your Foundry tests, enhancing their adaptability, especially when dealing with diverse blockchain environments like ZKsync.

### Creating the Deployment Script (`DeployMerkleAirdrop.s.sol`)

The foundation of our automated deployment is a Solidity script. This script will handle the instantiation and initial configuration of our contracts.

**1. File Creation**

First, create a new Solidity file named `DeployMerkleAirdrop.s.sol` within your project's `script` directory:
`script/DeployMerkleAirdrop.s.sol`

**2. Initial Setup**

Begin the script with the standard SPDX license identifier and pragma directive for the Solidity compiler version:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
```

**3. Import Statements**

To build our deployment script, we need to import several contracts and interfaces:

*   `Script` from `forge-std/script.sol`: This is the base contract provided by Foundry for writing deployment and interaction scripts.
*   `MerkleAirdrop` from `../src/MerkleAirdrop.sol`: The actual airdrop contract we intend to deploy.
*   `BagelToken` from `../src/BagelToken.sol`: The ERC20 token contract that will be distributed via the airdrop.
*   `IERC20` from `@openzeppelin/contracts/token/ERC20/IERC20.sol`: The standard interface for ERC20 tokens, used here for type casting.

```solidity
import { Script } from "forge-std/Script.sol";
import { MerkleAirdrop } from "../src/MerkleAirdrop.sol";
import { BagelToken } from "../src/BagelToken.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```
You might encounter an IDE error related to the `forge-std/Script.sol` import. If your compiler (e.g., `forge build`) runs without issues, this error can generally be ignored.

**4. Contract Definition**

Define a new contract, `DeployMerkleAirdrop`, that inherits from the imported `Script` contract:

```solidity
contract DeployMerkleAirdrop is Script {
    // Deployment logic will go here
}
```

**5. State Variables**

We'll define two private state variables within our script contract to hold crucial deployment parameters:

*   `s_merkleRoot`: This `bytes32` variable will store the root hash of the Merkle tree governing the airdrop. For this example, we'll use a hardcoded value, typically derived from a pre-generated `output.json` file from your Merkle tree generation process.
*   `s_amountToTransfer`: A `uint256` representing the total quantity of `BagelToken`s required to fund the airdrop contract. In this scenario, it's calculated for 4 users, each receiving 25 tokens, considering 18 decimal places for the token (`4 * 25 * 1e18`).

```solidity
contract DeployMerkleAirdrop is Script {
    bytes32 private s_merkleRoot = 0x47d94c58e37b1205fdb7bc6bccd046cf1907b9de3b7fb083f363c8ebfb;
    uint256 private s_amountToTransfer = 4 * 25 * 1e18; // 4 users, 25 tokens each

    // ...
}
```

**6. `run()` Function: The Script's Entry Point**

The `run()` function is the main external entry point that Foundry executes when the script is invoked. It will call our core deployment logic and return the instances of the deployed contracts.

```solidity
function run() external returns (MerkleAirdrop, BagelToken) {
    return deployMerkleAirdrop();
}
```

**7. `deployMerkleAirdrop()` Function: Core Deployment Logic**

This public function encapsulates the actual steps involved in deploying and configuring our contracts:

1.  **Start Broadcast (`vm.startBroadcast()`):** This Foundry cheatcode instructs the local node (or the targeted network if a private key is provided) that subsequent state-changing calls should be packaged and broadcast as actual transactions.
2.  **Deploy `BagelToken`:** A new instance of the `BagelToken` contract is created.
3.  **Deploy `MerkleAirdrop`:** A new `MerkleAirdrop` contract is deployed. Its constructor requires the `s_merkleRoot` and the address of the `BagelToken` contract (casted to `IERC20`).
4.  **Mint Tokens:** The `s_amountToTransfer` of `BagelToken`s are minted. These tokens are minted to `token.owner()`. In the context of a script execution within `vm.startBroadcast()`, `token.owner()` (the deployer of `BagelToken`) will be the address executing the script (the script deployer).
5.  **Transfer Tokens to Airdrop Contract:** The newly minted tokens are then transferred from the script deployer's address to the deployed `MerkleAirdrop` contract, effectively funding it.
6.  **Stop Broadcast (`vm.stopBroadcast()`):** This cheatcode signals the end of the transaction broadcasting block.
7.  **Return Deployed Contracts:** The function returns the instances of the deployed `MerkleAirdrop` and `BagelToken` contracts.

```solidity
function deployMerkleAirdrop() public returns (MerkleAirdrop, BagelToken) {
    vm.startBroadcast();

    BagelToken token = new BagelToken();
    MerkleAirdrop airdrop = new MerkleAirdrop(s_merkleRoot, IERC20(address(token)));

    // Mint tokens to the deployer (owner of the token contract by default)
    token.mint(token.owner(), s_amountToTransfer);
    // Transfer tokens from the deployer to the airdrop contract
    token.transfer(address(airdrop), s_amountToTransfer);

    vm.stopBroadcast();
    return (airdrop, token);
}
```

With these steps, `DeployMerkleAirdrop.s.sol` is now a fully functional Foundry script capable of deploying and initializing your Merkle airdrop system.

## Integrating the Deployment Script into Foundry Tests (`MerkleAirdrop.t.sol`)

To make our test setups cleaner and more adaptable, especially for different blockchain environments, we can integrate the `DeployMerkleAirdrop.s.sol` script into our `MerkleAirdrop.t.sol` test file.

**1. Install `foundry-devops` (Optional but Recommended for Multi-Chain)**

For handling potential differences in deployment mechanisms across chains (e.g., ZKsync, where script-based deployments might behave differently), the `foundry-devops` library by Cyfrin can be helpful.
*   **Resource:** `github.com/cyfrin/foundry-devops`
*   **Installation Command:**
    ```bash
    forge install cyfrin/foundry-devops --no-commit
    ```

**2. Import Helper and Deployment Script in Test File**

In your `MerkleAirdrop.t.sol` test file, import the `ZkSyncChainChecker` from `foundry-devops` (if installed) and your newly created `DeployMerkleAirdrop` script:

```solidity
import { ZkSyncChainChecker } from "lib/foundry-devops/src/ZkSyncChainChecker.sol"; // If using foundry-devops
import { DeployMerkleAirdrop } from "../../script/DeployMerkleAirdrop.s.sol";
import { Test } from "forge-std/Test.sol"; // Assuming Test is already imported
import { MerkleAirdrop } from "../src/MerkleAirdrop.sol"; // Assuming MerkleAirdrop is already imported
import { BagelToken } from "../src/BagelToken.sol"; // Assuming BagelToken is already imported
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol"; // Assuming IERC20 is already imported
```

**3. Inherit `ZkSyncChainChecker` in Test Contract**

Modify your test contract `MerkleAirdropTest` to inherit from `ZkSyncChainChecker` (if using it) in addition to `Test`:

```solidity
contract MerkleAirdropTest is ZkSyncChainChecker, Test { // Or just "is Test" if not using ZkSyncChainChecker
    MerkleAirdrop public airdrop;
    BagelToken public token;
    // ... other state variables like ROOT, AMOUNT_TO_SEND, user, userPrivKey
}
```

**4. Modify `setUp()` Function for Conditional Deployment**

The `setUp()` function in your test file is responsible for initializing the state before each test runs. We'll update it to use our deployment script for standard EVM environments and fall back to manual deployment for ZKsync chains (or other specific conditions).

*   **If not on a ZKsync chain (or by default if not checking):** An instance of the `DeployMerkleAirdrop` script is created. Its `deployMerkleAirdrop()` public function is then called directly to deploy the contracts. (Note: While `run()` is the script's external entry, public functions within the script can be called from other contracts in the same project context).
*   **If on a ZKsync chain (conditional block):** The original manual deployment logic (creating `BagelToken`, then `MerkleAirdrop`, minting tokens, and transferring them) is executed.

```solidity
function setUp() public {
    // Constants previously defined in the test, ensure they align with script values if consistency is desired.
    // bytes32 ROOT = 0x...; // Should match s_merkleRoot from the script
    // uint256 AMOUNT_TO_CLAIM = 25 * 1e18;
    // uint256 AMOUNT_TO_SEND = AMOUNT_TO_CLAIM * 4; // Should match s_amountToTransfer from the script

    if (!isZkSyncChain()) { // This check is from ZkSyncChainChecker
        // Deploy with the script
        DeployMerkleAirdrop deployer = new DeployMerkleAirdrop();
        (airdrop, token) = deployer.deployMerkleAirdrop();
    } else {
        // Original manual deployment for ZKsync environments (or other specific cases)
        token = new BagelToken();
        // Ensure 'ROOT' here is consistent with s_merkleRoot in the script
        airdrop = new MerkleAirdrop(ROOT, IERC20(address(token)));
        // Ensure 'AMOUNT_TO_SEND' here is consistent with s_amountToTransfer in the script
        token.mint(address(this), AMOUNT_TO_SEND);
        token.transfer(address(airdrop), AMOUNT_TO_SEND);
    }

    (user, userPrivKey) = makeAddrAndKey("user");
    // ... any other setup logic
}
```
**Important Considerations for Consistency:**
When using conditional deployment logic as shown above, ensure that the constants used in the `else` block (e.g., `ROOT`, `AMOUNT_TO_SEND`) are consistent with the values defined in your deployment script (`s_merkleRoot`, `s_amountToTransfer`). This guarantees that your tests are running against a contract state that accurately reflects what the script would deploy.

### Key Concepts Revisited

This lesson touched upon several important concepts in smart contract development with Foundry:

*   **Foundry Deployment Scripts:** These are powerful tools for codifying and automating the deployment of smart contracts. They inherit from `forge-std/Script.sol` and typically use a `run()` function as their main entry point.
*   **`vm.startBroadcast()` & `vm.stopBroadcast()`:** Essential Foundry cheatcodes within scripts that define the block of operations to be sent as actual on-chain transactions.
*   **Conditional Logic in Tests:** Utilizing helper contracts or functions (like `ZkSyncChainChecker`) allows for adaptive test setups, crucial when targeting multiple blockchain environments with potentially different characteristics.
*   **ERC20 Token Operations:** The deployment involved standard ERC20 actions: `new` for contract instantiation, `mint` for creating new tokens, and `transfer` for moving tokens between addresses.
*   **Merkle Airdrop System:** We focused on deploying a system where token claims are validated using Merkle proofs. The `MerkleAirdrop` contract requires the Merkle root and the airdropped token's contract address upon deployment.
*   **Modularity and Reusability:** By encapsulating deployment logic in a script, you create a reusable, manageable, and version-controllable process, beneficial for various deployment scenarios and CI/CD integration.

### Important Note on ZKsync Compatibility

It's worth noting that Foundry script functionalities, particularly for deployments, might have limitations or behave differently on specialized Layer 2 environments like ZKsync, especially at certain points in their development lifecycle. The conditional logic (`isZkSyncChain()`) in the test setup serves as a practical workaround, allowing the use of scripts for standard EVM environments while falling back to manual deployment methods for ZKsync. If your project exclusively targets standard EVM-compatible chains, this conditional logic might not be necessary, and the deployment script can be used directly in all test setups.

By following these steps, you have successfully created a Foundry deployment script for a Merkle Airdrop system and integrated it into your testing workflow, making your development process more efficient and adaptable.