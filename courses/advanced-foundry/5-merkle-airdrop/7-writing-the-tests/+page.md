## Creating a Foundry Deployment Script for Your Merkle Airdrop

Automating the deployment of smart contracts ensures consistency and reduces manual effort. This lesson guides you through creating a deployment script using Foundry (`forge script`) for a common Web3 pattern: an ERC20 token (`BagelToken`) and a `MerkleAirdrop` contract that distributes it. We'll cover deploying both contracts, passing necessary constructor arguments, minting tokens, and funding the airdrop contract. Additionally, we'll address how to integrate this script into your Foundry tests, including a strategy for handling ZKsync compatibility.

## Setting Up the Deployment Script File

First, we need to create the script file and set up its basic structure.

1.  **Create the File:** In your Foundry project, navigate to the `script` directory and create a new file named `DeployMerkleAirdrop.s.sol`.

2.  **Define Strategy:** While you could create a script that only deploys the `MerkleAirdrop` contract (assuming the `BagelToken` already exists at a known address), this example demonstrates deploying *both* contracts within the same script. This is often simpler for tightly coupled contracts.

3.  **Add Boilerplate and Imports:** Start with the SPDX license identifier, pragma directive, and necessary imports:

    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.24;

    import { Script } from "forge-std/Script.sol"; // Base contract for Foundry scripts
    import { MerkleAirdrop } from "../src/MerkleAirdrop.sol"; // Your Airdrop contract
    import { BagelToken } from "../src/BagelToken.sol"; // Your Token contract
    import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol"; // Interface for token interaction
    ```
    *Note: If your IDE shows an error for the `forge-std/Script.sol` import, it can often be ignored if `forge build` and `forge test` succeed.*

    We import `IERC20` because the script needs to call standard ERC20 functions like `mint` and `transfer` on the deployed `BagelToken`.

4.  **Define the Script Contract:** Create a contract that inherits from Foundry's `Script` contract. The standard entry point for a script is the `run` function. We'll use a helper function `deployMerkleAirdrop` to encapsulate the main logic.

    ```solidity
    contract DeployMerkleAirdrop is Script {

        // State variables for configuration will be added here

        function run() external returns (MerkleAirdrop, BagelToken) {
            // The run function calls our main deployment logic
            return deployMerkleAirdrop();
        }

        function deployMerkleAirdrop() public returns (MerkleAirdrop, BagelToken) {
            // Deployment steps will go here
            // ...
        }
    }
    ```

## Implementing the Deployment Logic

Now, let's fill in the `deployMerkleAirdrop` function with the steps needed to deploy and configure our contracts.

1.  **Define Configuration Variables:** Add state variables to hold essential configuration data, such as the Merkle root for the airdrop and the total amount of tokens to be distributed.

    ```solidity
    contract DeployMerkleAirdrop is Script {

        // Replace with the actual Merkle root from your generated tree
        bytes32 private s_merkleRoot = 0x474d994c58e37b12085fdb7bc6bccd046cf1907b90de3b7fb083cf3636c8ebfb;

        // Example: 4 users receiving 25 tokens each (assuming 18 decimals)
        uint256 private constant NUM_USERS = 4;
        uint256 private constant AMOUNT_PER_USER = 25 ether; // Using 'ether' keyword for 1e18
        uint256 private s_amountToTransfer = NUM_USERS * AMOUNT_PER_USER;

        // ... run() and deployMerkleAirdrop() functions ...
    }
    ```
    Ensure `s_merkleRoot` matches the root generated from your airdrop recipients list. Calculate `s_amountToTransfer` based on your specific airdrop parameters (number of recipients and amount per recipient).

2.  **Broadcast Transactions:** Wrap the deployment and interaction steps within `vm.startBroadcast()` and `vm.stopBroadcast()`. This tells Foundry which transactions should actually be sent to the blockchain (or simulated environment).

3.  **Deploy Contracts:** Inside the broadcast block, deploy the `BagelToken` first, then the `MerkleAirdrop`, passing the required constructor arguments (Merkle root and the token's address).

4.  **Mint and Fund:** Mint the total required `s_amountToTransfer` of `BagelToken`s to the deployer address (which `token.owner()` conveniently provides in a Foundry script context). Then, transfer these tokens from the deployer to the newly deployed `MerkleAirdrop` contract address.

5.  **Return Instances:** Return the contract instances for potential use in tests or other scripts.

Here's the complete `deployMerkleAirdrop` function:

```solidity
function deployMerkleAirdrop() public returns (MerkleAirdrop, BagelToken) {
    vm.startBroadcast();

    // 1. Deploy the BagelToken
    BagelToken token = new BagelToken();

    // 2. Deploy the MerkleAirdrop, passing the root and token address
    MerkleAirdrop airdrop = new MerkleAirdrop(s_merkleRoot, IERC20(address(token)));

    // 3. Mint the total supply needed for the airdrop to the deployer
    // token.owner() in a script context refers to the deployer address
    token.mint(token.owner(), s_amountToTransfer);

    // 4. Transfer the minted tokens to the MerkleAirdrop contract
    token.transfer(address(airdrop), s_amountToTransfer);

    vm.stopBroadcast();

    // 5. Return the deployed contract instances
    return (airdrop, token);
}
```

## Integrating the Script into Foundry Tests

Foundry deployment scripts (`.s.sol`) offer an efficient way to set up contract state for testing. However, as of this writing, they may have compatibility limitations with ZKsync chains. To ensure tests can run on both standard EVM chains and ZKsync, we can use conditional logic in the test's `setUp` function.

1.  **Install `foundry-devops`:** This library provides utilities, including a way to check if the current execution chain is ZKsync. Install it:
    ```bash
    forge install cyfrin/foundry-devops --no-commit
    ```

2.  **Modify Test File (`MerkleAirdrop.t.sol`):**
    *   **Import necessary contracts:** Add imports for the `ZkSyncChainChecker` utility and your newly created deployment script.
        ```solidity
        import { Test, console } from "forge-std/Test.sol";
        import { MerkleAirdrop } from "../src/MerkleAirdrop.sol";
        import { BagelToken } from "../src/BagelToken.sol";
        import { MerkleProof } from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
        import { stdStorage, StdStorage } from "forge-std/StdStorage.sol";
        // New imports:
        import { ZkSyncChainChecker } from "lib/foundry-devops/src/ZkSyncChainChecker.sol";
        import { DeployMerkleAirdrop } from "script/DeployMerkleAirdrop.s.sol";
        ```
    *   **Inherit from `ZkSyncChainChecker`:** Modify your test contract declaration.
        ```solidity
        contract MerkleAirdropTest is ZkSyncChainChecker, Test {
            // Existing test state variables (ROOT, token, airdrop, user, etc.)
            MerkleAirdrop airdrop;
            BagelToken token;
            // ... other variables like ROOT, user, userPrivKey ...
        }
        ```
    *   **Implement Conditional `setUp`:** Modify the `setUp` function to check the chain type. If *not* ZKsync, use the deployment script. If it *is* ZKsync, deploy the contracts directly using `new`, replicating the necessary minting and funding logic within the `setUp` function itself.

        ```solidity
        function setUp() public {
            // Check if the current chain is ZKsync
            if (!isZkSyncChain()) {
                // Standard EVM: Use the deployment script
                DeployMerkleAirdrop deployer = new DeployMerkleAirdrop();
                (airdrop, token) = deployer.deployMerkleAirdrop();

                // Setup user(s) needed for tests (if applicable)
                (user, userPrivKey) = makeAddrAndKey("user");
                // ... setup other users if needed ...

            } else {
                // ZKsync: Deploy contracts directly using 'new'
                token = new BagelToken();
                // Ensure ROOT constant is defined in your test contract
                airdrop = new MerkleAirdrop(ROOT, IERC20(address(token)));

                // Replicate minting and funding logic for ZKsync tests
                // Calculate amount based on test needs (might differ from script's total)
                uint256 amountToSendInTest = 100 * 1e18; // Example total for tests
                token.mint(address(this), amountToSendInTest); // Mint to test contract itself
                token.transfer(address(airdrop), amountToSendInTest); // Fund the airdrop

                // Setup user(s) needed for tests (if applicable)
                (user, userPrivKey) = makeAddrAndKey("user");
                 // ... setup other users if needed ...
            }

            // Any common setup logic can go here, outside the if/else
        }
        ```

    *   **Simplification Note:** If you do *not* need ZKsync compatibility, you can omit the `foundry-devops` dependency, the `ZkSyncChainChecker` inheritance, and the `if/else` block. The `setUp` function can simply use the `DeployMerkleAirdrop` script directly:
        ```solidity
        // Simplified setUp without ZKsync check
        function setUp() public {
            DeployMerkleAirdrop deployer = new DeployMerkleAirdrop();
            (airdrop, token) = deployer.deployMerkleAirdrop();
            (user, userPrivKey) = makeAddrAndKey("user");
        }
        ```

## Running Tests with the Deployment Script

With the deployment script created and integrated into the test `setUp` function, you can run your tests as usual.

```bash
forge test -vv
```

When running against the default Foundry Anvil environment (or another standard EVM chain), the `if (!isZkSyncChain())` block will execute, utilizing your `DeployMerkleAirdrop.s.sol` script to set up the testing environment. If configured to run against a ZKsync environment, the `else` block will handle the deployment directly. Your tests should pass in either scenario if the logic is implemented correctly.

This approach provides an automated, repeatable deployment process via Foundry scripts while maintaining compatibility for testing across different EVM-compatible environments, including those like ZKsync with specific scripting considerations.