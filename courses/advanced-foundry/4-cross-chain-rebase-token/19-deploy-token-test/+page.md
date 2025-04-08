## Deploying Tokens in a Foundry CCIP Test Environment

This lesson walks through the initial steps of setting up a Foundry test environment to deploy tokens for a cross-chain project utilizing Chainlink CCIP. We'll focus on deploying a `RebaseToken` contract on both a source chain (Sepolia fork) and a destination chain (Arbitrum Sepolia fork) using a Burn & Mint mechanism, preparing for cross-chain testing.

**Objective:** Deploy the necessary `RebaseToken` contracts on both Sepolia and Arbitrum Sepolia forks within a Foundry test setup.

**Prerequisites:** Familiarity with Solidity, Foundry testing framework, and the basic concepts of cross-chain interactions.

### 1. Setting Up Initial State Variables

Before deploying contracts, we need to declare state variables within our Foundry test contract (`CrossChainTest.sol` which inherits from `Test`) to hold references to the deployed token contracts and potentially other necessary components like a vault.

```solidity
// Inside contract CrossChainTest is Test { ... }

// State variables for token contracts on each chain
RebaseToken sepoliaToken;
RebaseToken arbSepoliaToken;

// State variable for the vault (used later)
Vault vault;

// ... other test setup variables ...
```

These variables will store the instances of our contracts once deployed on their respective chain forks.

### 2. Creating a Designated Owner Address

Many contracts, especially those using patterns like OpenZeppelin's `Ownable`, require specific permissions for deployment or configuration. We also need a consistent address to act as the deployer and later as the CCIP Admin. Foundry's cheatcodes provide a way to generate deterministic addresses for testing.

We use the `makeAddr` cheatcode to create an address labeled "owner". It's important to note that `makeAddr` executes at runtime within the test, so the resulting address cannot be assigned to a `constant` variable. Assign it to a regular state variable instead:

```solidity
// Create a deterministic address for the owner/deployer
address owner = makeAddr("owner");
```

This `owner` address will be used as the `msg.sender` for contract deployment calls.

### 3. Managing msg.sender with Foundry Pranks

Foundry cheatcodes allow us to manipulate the EVM execution environment during tests. To deploy contracts *as* the `owner` address we just created, we need to set the `msg.sender` context for the deployment transaction.

*   `vm.prank(address)`: Sets `msg.sender` for the *next* contract call only.
*   `vm.startPrank(address)` / `vm.stopPrank()`: Sets `msg.sender` for a *block* of subsequent calls until `vm.stopPrank()` is invoked.

Since deployment might involve multiple steps or we want to perform several actions as the owner consecutively, `vm.startPrank` and `vm.stopPrank` are suitable. We'll wrap our deployment logic within these calls. A good practice is to add `vm.stopPrank()` immediately after `vm.startPrank()` to avoid forgetting it later.

```solidity
// Example structure for deploying as owner
vm.startPrank(owner);
// ... deployment transaction(s) go here ...
vm.stopPrank(); // Revert msg.sender back to the default test address
```

### 4. Managing Fork Context for Multi-Chain Deployment

Our test setup involves interacting with two different blockchain forks: Sepolia and Arbitrum Sepolia. Foundry tests typically start execution on a default fork specified during setup (e.g., using `vm.createSelectFork("sepolia")` in the `setUp()` function).

To deploy contracts on the *correct* chain fork, we must explicitly switch the execution context using `vm.selectFork(forkId)`. The `forkId` corresponds to the `uint256` identifier returned by `vm.createFork` when the fork was initially created earlier in the test setup.

We'll structure our deployment steps clearly, ensuring we select the appropriate fork before deploying contracts intended for that chain.

```solidity
// Assuming setUp() established 'sepoliaFork' and 'arbSepoliaFork' identifiers
// and started on sepoliaFork via vm.createSelectFork("sepolia")

// --- 1. Deploy and configure on Sepolia ---
// Code here runs on the Sepolia fork context by default

// ... Sepolia deployment logic ...

// --- 2. Deploy and configure on Arbitrum Sepolia ---
vm.selectFork(arbSepoliaFork); // Switch execution context to Arbitrum Sepolia fork

// ... Arbitrum Sepolia deployment logic ...
```

### 5. Deploying the RebaseToken Contracts

Now we combine the concepts of owner pranking and fork management to deploy the `RebaseToken`. Our `RebaseToken` constructor takes no arguments in this example (assuming name and ticker are hardcoded).

**Deploying on Sepolia (Source Chain):**

Since we typically start on the Sepolia fork, we don't need an explicit `vm.selectFork` here initially.

```solidity
// --- 1. Deploy and configure on Sepolia ---

// Deploy RebaseToken as owner
vm.startPrank(owner);
sepoliaToken = new RebaseToken(); // Deploy the token contract
vm.stopPrank();

// sepoliaToken variable now holds the instance deployed on the Sepolia fork
```

**Deploying on Arbitrum Sepolia (Destination Chain):**

Before deploying the token for the destination chain, we must switch the fork context.

```solidity
// --- 2. Deploy and configure on Arbitrum Sepolia ---

// Switch context to the Arbitrum Sepolia fork
vm.selectFork(arbSepoliaFork);

// Deploy RebaseToken as owner on Arbitrum Sepolia
vm.startPrank(owner);
arbSepoliaToken = new RebaseToken(); // Deploy the token contract
vm.stopPrank();

// arbSepoliaToken variable now holds the instance deployed on the Arbitrum Sepolia fork
```

At this point, we have successfully deployed instances of our `RebaseToken` on both the source and destination chain forks within our Foundry test.

### 6. Initiating Vault Deployment (Source Chain)

A `Vault` contract is often used on the source chain in Burn & Mint token bridging scenarios. Users might deposit assets into the vault to trigger the minting of bridgeable tokens. Let's begin deploying the `Vault` on the Sepolia chain.

First, ensure we are back on the correct fork context if necessary (though following the structure above, we might still be on Arbitrum Sepolia; careful context management is key). Assuming we switch back or are structuring setup differently:

```solidity
// Ensure we are operating on the Sepolia fork context
vm.selectFork(sepoliaFork); // Switch back if needed, or structure differently

// Check the Vault constructor requirements. Let's assume it looks like:
// constructor(IRebaseToken _rebaseToken) { ... }

// Deploy the Vault as owner, passing the Sepolia token address
vm.startPrank(owner);
// We need to pass the deployed sepoliaToken instance.
// The constructor expects type IRebaseToken, so we cast:
vault = new Vault(IRebaseToken(address(sepoliaToken)));
vm.stopPrank();

// vault variable now holds the instance deployed on the Sepolia fork
```

**Note on Type Casting:** The `Vault` constructor requires an argument of type `IRebaseToken` (an interface). Since our `sepoliaToken` variable holds an instance of the concrete `RebaseToken` contract (which presumably implements `IRebaseToken`), we cast its address to the required interface type (`IRebaseToken(address(sepoliaToken))`) when calling the constructor. This is standard practice in Solidity when interacting with contracts via their interfaces.

This concludes the initial deployment of the token contracts on both chains and the start of the vault deployment on the source chain, setting the stage for further configuration and testing of the cross-chain functionality.