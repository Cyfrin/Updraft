## Deploying Your First Cross-Chain Tokens with Chainlink CCIP in Foundry

This lesson guides you through the initial steps of deploying and configuring smart contracts for a cross-chain token (CCT) setup using Chainlink CCIP. We'll be working within a Foundry testing environment, simulating a multi-chain scenario with Sepolia as our source chain and Arbitrum Sepolia as our destination chain. Our goal is to lay the groundwork for enabling tokens to move seamlessly between these two networks.

We'll be following the Chainlink Cross-Chain Token (CCT) standard, as detailed in the Chainlink DevHub documentation (specifically under "CCIP -> Guides -> Cross-Chain Token (CCT) standard -> Register from an EOA (Burn & Mint) -> Foundry (Burn & Mint)"). This standard involves deploying tokens, potentially a vault for managing token supply (e.g., locking/burning), and token pools, then configuring them for cross-chain transfers.

## Understanding Your Cross-Chain Environment

Before diving into code, let's clarify the key components:

*   **Source Chain (Sepolia):** This is where our primary token (`RebaseToken`) and a `Vault` contract (for a burn/mint or lock/unlock mechanism) will reside. A token pool will also be deployed here later.
*   **Destination Chain (Arbitrum Sepolia):** This chain will host a corresponding `RebaseToken` (representing the token on this chain, typically minted) and its own token pool.
*   **Foundry:** We're using Foundry, a powerful toolkit for Ethereum smart contract development, to simulate this multi-chain environment. Foundry's cheat codes allow us to create forks of existing networks, switch between them, deploy contracts, and impersonate accounts, all within a local test.
*   **Owner Account:** A designated `owner` address will be responsible for deploying contracts and performing administrative actions. This ensures controlled management of the CCT setup.

Our deployment order in this segment will be:
1.  `RebaseToken` on Sepolia.
2.  `RebaseToken` on Arbitrum Sepolia.
3.  `Vault` on Sepolia.

Token pools will be addressed in subsequent steps.

## Setting Up Your Foundry Test Environment: `CrossChainTest.sol`

We begin by preparing our Foundry test contract, typically named something like `CrossChainTest.sol`.

### Declaring State Variables

First, we declare state variables to hold instances of our deployed contracts and fork identifiers. This allows us to interact with them throughout our tests.

```solidity
// In CrossChainTest.sol
// ... (import statements for Ownable, RebaseToken, Vault, IRbaseToken, etc.)

contract CrossChainTest is Test { // Assuming `Test` is from forge-std
    uint256 sepoliaFork;
    uint256 arbSepoliaFork;

    CCIPLocalSimulatorFork ccipLocalSimulatorFork;

    RebaseToken sepoliaToken;
    RebaseToken arbSepoliaToken;
    Vault vault; // Vault will only be on the source chain (Sepolia)
    // TokenPools would be declared here later

    address owner;
    // ...
}
```
Notice `vault` is singular, as it's intended only for the source chain in this burn-and-mint example.

### Creating the Owner Account

We need an owner account to deploy contracts and manage permissions. Foundry's `vm.makeAddr()` cheat code is perfect for creating a consistent address for testing.

```solidity
// Inside CrossChainTest.sol, at the contract level or in setUp()
// address constant owner = makeAddr("owner"); // Incorrect: makeAddr is a runtime cheat code
address owner = vm.makeAddr("owner"); // Correct way
```
It's important to note that `vm.makeAddr()` is a runtime cheat code, so `owner` cannot be a `constant`. It's typically initialized in the `setUp()` function or directly as a state variable initialized using the cheat code. For clarity, we'll assume it's initialized so `owner` is available. If initializing directly as a state variable like `address owner = vm.makeAddr("owner");`, ensure your Foundry version supports this. Otherwise, assign it in `setUp()`.

For this lesson, we'll assume `owner` is initialized as a state variable for simplicity:
```solidity
// In CrossChainTest.sol
// ...
address owner = vm.makeAddr("owner");
// ...
```

### The `setUp()` Function: Initializing Forks

The `setUp()` function in Foundry tests is executed before each test case. We use it to initialize our blockchain forks.

```solidity
// In CrossChainTest.sol
function setUp() public {
    owner = vm.makeAddr("owner"); // Ensure owner is initialized

    sepoliaFork = vm.createSelectFork("sepolia"); // Creates and selects the Sepolia fork
    arbSepoliaFork = vm.createFork("arb-sepolia");   // Creates the Arbitrum Sepolia fork (but doesn't select it yet)

    ccipLocalSimulatorFork = new CCIPLocalSimulatorFork();
    vm.makePersistent(address(ccipLocalSimulatorFork)); // Makes the simulator persistent across fork switches
    // Further CCIP-specific setup, like setting router addresses, might go here
}
```
*   `vm.createSelectFork("sepolia")`: This Foundry cheat code creates a fork of the Sepolia network and immediately makes it the active EVM context for subsequent operations.
*   `vm.createFork("arb-sepolia")`: This creates a fork of Arbitrum Sepolia but doesn't switch to it yet. We'll use `vm.selectFork()` later to switch to this fork.
*   `CCIPLocalSimulatorFork`: This contract (not detailed here but assumed to be part of the setup) likely helps simulate CCIP interactions locally. `vm.makePersistent` ensures its state is preserved even when we switch between `sepoliaFork` and `arbSepoliaFork`.

## Deploying Contracts on the Source Chain (Sepolia)

With our environment prepared, we can deploy contracts to our simulated Sepolia chain. Since `setUp()` finished by selecting the `sepoliaFork`, we are currently operating on Sepolia.

### Impersonating the Owner

To ensure contracts are deployed by our designated `owner`, we use Foundry's impersonation cheat codes: `vm.startPrank(address)` and `vm.stopPrank()`. All calls between these two will have `msg.sender` set to the address provided to `vm.startPrank()`.

### Deploying `RebaseToken` on Sepolia

Let's deploy our `RebaseToken`. For this example, the `RebaseToken` constructor is empty as its name and ticker are hardcoded within the contract. It's also `Ownable`, meaning the deployer (our `owner`) will be the initial owner.

This deployment can happen directly in `setUp()` after the fork creation, or within a specific test function. We'll illustrate it as if continuing in `setUp()` or a dedicated deployment section.

```solidity
// Continuing in setUp() or a dedicated Sepolia deployment logic block:
// We are currently on the Sepolia fork.

vm.startPrank(owner); // All subsequent calls will be from 'owner'

sepoliaToken = new RebaseToken(); // Deploy RebaseToken on Sepolia

// ... Vault deployment will follow ...

// vm.stopPrank(); // We'll stop the prank after all Sepolia deployments
```

### Deploying the `Vault` on Sepolia

The `Vault` contract is deployed only on the source chain (Sepolia). Its constructor requires an instance of `IRbaseToken`. Our `sepoliaToken` is of type `RebaseToken`, so we need to cast it to the `IRbaseToken` interface.

```solidity
// In Vault.sol (for context, not part of CrossChainTest.sol)
// interface IRbaseToken { /* ... relevant functions ... */ }
// contract Vault {
//     IRbaseToken public i_rebaseToken;
//     constructor(IRbaseToken _rebaseToken) {
//         i_rebaseToken = _rebaseToken;
//     }
// }

// Continuing in setUp() or a dedicated Sepolia deployment logic block, still under vm.startPrank(owner):
// sepoliaToken = new RebaseToken(); // Already deployed above

vault = new Vault(IRbaseToken(address(sepoliaToken))); // Pass the Sepolia token address, cast to IRbaseToken

vm.stopPrank(); // Crucial to stop impersonating the owner
```
Casting `address(sepoliaToken)` to `IRbaseToken` allows us to pass our deployed `RebaseToken` instance to the `Vault` constructor, satisfying its type requirement. Ensure the `IRbaseToken` interface is correctly defined and imported in your `Vault.sol` and accessible in your test file if needed for type checking.

## Deploying the Token on the Destination Chain (Arbitrum Sepolia)

Next, we deploy the corresponding `RebaseToken` on our simulated Arbitrum Sepolia chain.

### Switching Forks

First, we must switch the active EVM context to the Arbitrum Sepolia fork we created earlier.

```solidity
// This can be in setUp() after Sepolia deployments, or in a separate test function.
// 2. Deploy and configure on Arbitrum Sepolia
vm.selectFork(arbSepoliaFork); // Switch to the Arbitrum Sepolia fork

vm.startPrank(owner); // Impersonate owner for deployment on Arbitrum Sepolia

arbSepoliaToken = new RebaseToken(); // Deploy RebaseToken on Arbitrum Sepolia

// ... Token Pool deployment for Arbitrum Sepolia would follow here in a later stage ...

vm.stopPrank(); // Stop impersonating
```
The `vm.selectFork(arbSepoliaFork)` call is essential here. Without it, `arbSepoliaToken` would be deployed on the Sepolia fork.

## Essential Foundry Practices for Multi-Chain Testing

Working with multiple simulated chains in Foundry requires attention to a few key practices:

*   **Prank Management:** Always pair `vm.startPrank(address)` with `vm.stopPrank()`. Forgetting to stop a prank can lead to subsequent calls being unintentionally made by the impersonated account, causing hard-to-debug issues. It's good practice to add `vm.stopPrank()` immediately after `vm.startPrank()` and fill in the operations in between.
*   **Fork Management:**
    *   `vm.createSelectFork(rpcUrlAlias)`: Creates a new fork and immediately switches the EVM context to it.
    *   `vm.createFork(rpcUrlAlias)`: Creates a new fork but does not switch to it.
    *   `vm.selectFork(forkId)`: Switches the EVM context to an already created fork, identified by its `forkId` (the `uint256` returned by `createFork` or `createSelectFork`).
*   **Clarity in Tests:** Use comments and descriptive naming to distinguish between operations on different chains (e.g., `// 1. Deploy and configure on Sepolia`, `sepoliaToken`, `arbSepoliaToken`). This significantly improves the readability and maintainability of your multi-chain tests.

## Next Steps in Your CCIP Journey

With the `RebaseToken` deployed on both simulated chains and the `Vault` deployed on the source chain, we have established the foundational smart contracts. The subsequent steps in configuring this Cross-Chain Token setup for Chainlink CCIP would involve:

1.  **Deploying Token Pools:** A token pool contract needs to be deployed on both Sepolia and Arbitrum Sepolia. These pools are critical for CCIP to manage token transfers.
2.  **CCIP Configuration:** This includes:
    *   Granting appropriate roles (e.g., minter/burner roles to the token pools or vault).
    *   Registering the token pools with the CCIP routers on each chain.
    *   Setting supported chains and other CCIP-specific parameters.

These further configurations will enable the actual cross-chain transfer functionality, allowing tokens locked or burned on Sepolia to be minted on Arbitrum Sepolia, and vice-versa, facilitated by Chainlink CCIP.