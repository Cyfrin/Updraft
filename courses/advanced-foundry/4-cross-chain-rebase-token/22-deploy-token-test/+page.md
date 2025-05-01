## Setting Up Your Test Environment: Deploying Tokens and Vault

This lesson focuses on the initial contract deployment phase required for testing cross-chain token transfers using Chainlink CCIP within a Foundry test environment. We will deploy a custom `RebaseToken` on both source (Sepolia fork) and destination (Arbitrum Sepolia fork) chains, and a `Vault` contract on the source chain. This setup leverages Foundry's cheat codes and a local Chainlink simulator.

## Prerequisites and Test Setup Context

Before deploying contracts, ensure your Foundry project (`ccip-rebase-token`) is set up correctly. The core logic resides within a test file, likely `test/CrossChain.t.sol`, and the test contract (`CrossChainTest`) should inherit from Foundry's `Test`.

The foundational setup, typically within the `setUp` function, should include:

1.  **Fork Creation:** Creating local forks of the required testnets using `vm.createSelectFork("sepolia")` (for the source chain, initially selected) and `vm.createFork("arb-sepolia")` (for the destination chain). Store the returned fork IDs (e.g., in `sepoliaFork` and `arbSepoliaFork` variables).
2.  **CCIP Simulator:** Instantiating a `CCIPLocalSimulatorFork` and ensuring its address persists across different fork contexts using `vm.makePersistent`.

This lesson follows the deployment steps outlined in the Chainlink CCIP documentation for enabling tokens via the Burn & Mint standard using Foundry.

## Deploying the RebaseToken on Both Chains

Our first step is deploying the `RebaseToken` contract, which represents the asset we want to move cross-chain. It needs to exist on both the source and destination networks.

1.  **Declare Storage Variables:**
    Inside your `CrossChainTest` contract, declare state variables to hold the deployed token instances:
    ```solidity
    RebaseToken sepoliaToken;
    RebaseToken arbSepoliaToken;
    ```

2.  **Define Owner Address:**
    Contract deployment and configuration often require an owner address. We'll use Foundry's `makeAddr` cheat code to generate a deterministic address for testing purposes. This address will act as the `msg.sender` for deployments and later administrative actions.
    ```solidity
    // Note: 'makeAddr' generates the address at runtime during test execution,
    // so this variable cannot be declared 'constant'.
    address owner = makeAddr("owner");
    ```

3.  **Deploy on Sepolia (Source Chain):**
    Your `setUp` function likely already selected the Sepolia fork (`vm.createSelectFork`). Use `vm.startPrank` to impersonate the `owner` address for the deployment. Deploy the `RebaseToken` using the `new` keyword. Immediately follow with `vm.stopPrank` to revert `msg.sender` to the default test address.
    ```solidity
    // Within setUp function or a specific test function after setUp

    // 1. Deploy and configure on Sepolia
    vm.startPrank(owner);
    sepoliaToken = new RebaseToken();
    // Vault deployment will be added here later
    vm.stopPrank();
    ```

4.  **Deploy on Arbitrum Sepolia (Destination Chain):**
    Switch the execution context to the Arbitrum Sepolia fork using `vm.selectFork()` and its stored fork ID (`arbSepoliaFork`). Repeat the deployment process using `vm.startPrank` to deploy the token as the `owner` on this chain.
    ```solidity
    // Following the Sepolia deployment code

    // 2. Deploy and configure on Arbitrum Sepolia
    vm.selectFork(arbSepoliaFork);
    vm.startPrank(owner);
    arbSepoliaToken = new RebaseToken();
    vm.stopPrank();
    ```

## Deploying the Vault Contract on the Source Chain

The `Vault` contract facilitates user interaction on the source chain, allowing deposits of underlying assets (like ETH) in exchange for minted `RebaseToken`s, and vice versa for redemptions. It is only needed on the source chain (Sepolia in this case).

1.  **Declare Storage Variable:**
    Add a state variable for the `Vault` instance in your `CrossChainTest` contract:
    ```solidity
    Vault vault;
    ```

2.  **Deploy within Sepolia Context:**
    The Vault needs to be deployed on the Sepolia fork by the `owner`. Add the deployment logic within the same `vm.startPrank(owner)` / `vm.stopPrank()` block used for deploying `sepoliaToken`.

3.  **Provide Constructor Argument:**
    The `Vault` constructor requires the address of the `RebaseToken` it will manage, specified as type `IRbaseToken`. Ensure you have imported the `IRbaseToken` interface. When creating the `Vault`, cast the `sepoliaToken` instance (which is type `RebaseToken`) to `IRbaseToken`.
    ```solidity
    // Inside the Sepolia vm.startPrank(owner); block:

    // Deploy the Sepolia token first (as shown previously)
    sepoliaToken = new RebaseToken();

    // Now deploy the Vault, passing the Sepolia token address cast to the interface
    vault = new Vault(IRbaseToken(sepoliaToken));

    // The vm.stopPrank(); follows after all deployments for this owner/chain
    ```
    *Note: Be mindful of potential compiler warnings or errors related to type casting or typos in interface names (`IRbaseToken`). Ensure the interface is correctly defined and imported.*

## Key Foundry Cheat Codes Used

This deployment process relies heavily on Foundry's cheat codes:

*   `vm.createSelectFork(string calldata urlOrAlias)`: Creates and selects a fork of a network.
*   `vm.createFork(string calldata urlOrAlias)`: Creates a fork but doesn't select it immediately.
*   `vm.makePersistent(address target)`: Makes an address retain its state and code across `vm.selectFork` calls.
*   `makeAddr(string calldata label)`: Generates a deterministic address based on a string label.
*   `vm.startPrank(address sender)`: Sets `msg.sender` to the specified address for subsequent calls.
*   `vm.stopPrank()`: Resets `msg.sender` back to the test contract address (or the address set by a previous prank).
*   `vm.selectFork(uint256 forkId)`: Switches the active execution context to a previously created fork.

With the `RebaseToken` deployed on both chains and the `Vault` deployed on the source chain, the basic contract infrastructure for testing CCIP cross-chain token transfers is now in place. Subsequent steps will involve configuring these contracts (e.g., granting roles) and interacting with the CCIP simulator.