## Setting Up Your CCIP Test Environment with Foundry

This lesson guides you through the initial setup and configuration of smart contracts required for testing Chainlink's Cross-Chain Interoperability Protocol (CCIP) using the Foundry development framework. We will focus on setting up a custom "Burn & Mint" token type, specifically a `RebaseToken`, for cross-chain interaction between Sepolia and Arbitrum Sepolia testnet forks. This involves deploying the token contracts, a vault contract on the source chain, token pool contracts on both chains, and interacting with Chainlink's local simulator and registry contracts.

## Resolving Solidity Type Casting Errors

When working with Foundry and complex contract interactions, you might encounter type casting issues. A common scenario occurs when passing a contract instance to a constructor or function that expects an interface type.

For example, during the deployment of a `Vault` contract designed to interact with our `RebaseToken`, the `Vault` constructor might expect an `IRebaseToken` interface:

```solidity
// Vault constructor might look like this:
// constructor(IRebaseToken _token, ...) { ... }

// Attempting deployment in Foundry setup:
RebaseToken sepoliaToken = new RebaseToken();
// Incorrect - Causes compilation error:
// vault = new Vault(IRebaseToken(sepoliaToken));
```

This direct cast from the concrete `RebaseToken` contract type to the `IRebaseToken` interface type within the constructor arguments can lead to a Solidity compiler error: `Error [9640]: Explicit type conversion not allowed from "contract RebaseToken" to "contract IRebaseToken"`.

To resolve this, you need to perform an intermediate cast to the `address` type before casting to the target interface:

```solidity
// Correct deployment:
RebaseToken sepoliaToken = new RebaseToken();
vault = new Vault(IRebaseToken(address(sepoliaToken)));
```

This explicit two-step cast (`RebaseToken` -> `address` -> `IRebaseToken`) satisfies the Solidity type system requirements for this context.

## Deploying Base Contracts: Token and Vault

Before configuring CCIP-specific components, we deploy the core contracts:

1.  **`RebaseToken`:** Deploy an instance on the Sepolia fork (`sepoliaToken`) and another on the Arbitrum Sepolia fork (`arbSepoliaToken`).
2.  **`Vault`:** Deploy an instance on the Sepolia fork only. This vault will interact with the `sepoliaToken` for operations like deposits and withdrawals on the source chain.

These deployments are typically done within the `setUp` function of your Foundry test contract, ensuring the appropriate fork is selected using `vm.selectFork()` and deployments are performed by the desired `owner` address using `vm.startPrank()`.

## Fetching CCIP Network Details with `CCIPLocalSimulatorFork`

To interact with CCIP, particularly when deploying Token Pools, we need network-specific addresses for core CCIP components like the Router and the Risk Management Network (RMN) Proxy. In a local forked testing environment, Chainlink provides the `CCIPLocalSimulatorFork` contract to retrieve these details.

First, import the necessary contract and struct definition:

```solidity
import {CCIPLocalSimulatorFork, Register} from "@chainlink-local/src/ccip/CCIPLocalSimulatorFork.sol";
```

Declare state variables to hold the network details for each chain:

```solidity
CCIPLocalSimulatorFork ccipLocalSimulatorFork; // Assume this is initialized
Register.NetworkDetails sepoliaNetworkDetails;
Register.NetworkDetails arbSepoliaNetworkDetails;
```

Inside your `setUp` function, after selecting the appropriate fork, call the `getNetworkDetails` function using the current `block.chainid`:

```solidity
// Initialize the simulator fork instance (typically done once)
// ccipLocalSimulatorFork = new CCIPLocalSimulatorFork();

// --- On Sepolia Fork ---
vm.selectFork(sepoliaForkId); // Select the Sepolia fork
// ... deploy Sepolia token and vault ...
sepoliaNetworkDetails = ccipLocalSimulatorFork.getNetworkDetails(block.chainid);

// --- On Arbitrum Sepolia Fork ---
vm.selectFork(arbSepoliaForkId); // Select the Arbitrum Sepolia fork
// ... deploy Arbitrum Sepolia token ...
arbSepoliaNetworkDetails = ccipLocalSimulatorFork.getNetworkDetails(block.chainid);
```

The `Register.NetworkDetails` struct returned by `getNetworkDetails` contains vital addresses, including:

*   `routerAddress`: The address of the CCIP Router contract for the chain.
*   `rmnProxyAddress`: The address of the Risk Management Network Proxy contract.
*   `tokenAdminRegistryAddress`: The address of the CCIP Token Admin Registry.
*   `registryModuleOwnerCustomAddress`: The address of a helper contract for registering token admins.

Refer to the Chainlink documentation on using the CCIP Local Simulator with forked environments for more details.

## Deploying CCIP Token Pools

Following the Chainlink documentation for enabling Burn & Mint tokens, the next step is to deploy the `RebaseTokenPool` contracts on each chain. These pools handle the locking/burning of tokens on the source chain and the minting/releasing on the destination chain during a CCIP transfer.

Ensure you have the correct `IERC20` interface import, preferably the one used internally by CCIP contracts for compatibility:

```solidity
import {IERC20} from "@ccip/contracts/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";
```

Declare state variables for the pools:

```solidity
RebaseTokenPool sepoliaPool;
RebaseTokenPool arbSepoliaPool;
```

The `RebaseTokenPool` constructor (inheriting from `TokenPool`) requires the token address, an allowlist (we'll use an empty list `new address[](0)` to allow all), the RMN Proxy address, and the Router address. We use the details fetched previously.

Deploy the pools within the `setUp` function, ensuring you are on the correct fork and pranking as the `owner`:

```solidity
// --- On Sepolia Fork ---
vm.selectFork(sepoliaForkId);
vm.startPrank(owner);
// ... deploy token and vault, get network details ...
sepoliaPool = new RebaseTokenPool(
    IERC20(address(sepoliaToken)),          // Cast deployed token to IERC20
    new address[](0),                       // Empty allowlist
    sepoliaNetworkDetails.rmnProxyAddress,  // RMN Proxy from Sepolia details
    sepoliaNetworkDetails.routerAddress     // Router from Sepolia details
);
// ... rest of Sepolia setup ...
vm.stopPrank();


// --- On Arbitrum Sepolia Fork ---
vm.selectFork(arbSepoliaForkId);
vm.startPrank(owner);
// ... deploy token, get network details ...
arbSepoliaPool = new RebaseTokenPool(
    IERC20(address(arbSepoliaToken)),       // Cast deployed token to IERC20
    new address[](0),                       // Empty allowlist
    arbSepoliaNetworkDetails.rmnProxyAddress, // RMN Proxy from Arb Sepolia details
    arbSepoliaNetworkDetails.routerAddress    // Router from Arb Sepolia details
);
// ... rest of Arbitrum Sepolia setup ...
vm.stopPrank();
```

## Granting Mint and Burn Roles for CCIP Interaction

Our custom `RebaseToken` utilizes Access Control for minting and burning capabilities, governed by a `MINT_AND_BURN_ROLE`. For CCIP to function correctly with this Burn & Mint token:

1.  The `Vault` (on the source chain, Sepolia) needs the role to handle potential mint/burn operations during local deposits/withdrawals (if applicable to its design).
2.  The `RebaseTokenPool` on the *source* chain (Sepolia) needs the role to burn tokens when they are sent cross-chain.
3.  The `RebaseTokenPool` on the *destination* chain (Arbitrum Sepolia) needs the role to mint tokens when they arrive from another chain.

Assuming the `RebaseToken` contract has a helper function `grantMintAndBurnRole(address _account)`, we grant these roles as the token `owner`:

```solidity
// --- On Sepolia Fork ---
vm.selectFork(sepoliaForkId);
vm.startPrank(owner);
// ... deployments ...
sepoliaToken.grantMintAndBurnRole(address(vault));       // Grant role to Vault
sepoliaToken.grantMintAndBurnRole(address(sepoliaPool)); // Grant role to Sepolia Pool
// ... other setup ...
vm.stopPrank();

// --- On Arbitrum Sepolia Fork ---
vm.selectFork(arbSepoliaForkId);
vm.startPrank(owner);
// ... deployments ...
arbSepoliaToken.grantMintAndBurnRole(address(arbSepoliaPool)); // Grant role to Arbitrum Sepolia Pool
// ... other setup ...
vm.stopPrank();
```

## Registering Your Token with CCIP via Admin Roles

To officially enable your token within the CCIP framework, you (as the token owner) need to register as the token's administrator within the CCIP system. This is a two-step process performed on each chain where the token is deployed.

First, import the necessary CCIP registry contracts:

```solidity
import {RegistryModuleOwnerCustom} from "@ccip/contracts/src/v0.8/ccip/TokenAdminRegistry/RegistryModuleOwnerCustom.sol";
import {TokenAdminRegistry} from "@ccip/contracts/src/v0.8/ccip/TokenAdminRegistry/TokenAdminRegistry.sol";
```

**Step 1: Register Admin via Owner**
Call `registerAdminViaOwner(address token)` on the `RegistryModuleOwnerCustom` contract. The address for this contract is obtained from the `networkDetails.registryModuleOwnerCustomAddress` retrieved earlier.

**Step 2: Accept Admin Role**
Call `acceptAdminRole(address localToken)` on the `TokenAdminRegistry` contract. Its address is found in `networkDetails.tokenAdminRegistryAddress`.

Perform these steps for both chains, pranking as the `owner`:

```solidity
// --- On Sepolia Fork ---
vm.selectFork(sepoliaForkId);
vm.startPrank(owner);
// ... deployments and role granting ...
RegistryModuleOwnerCustom(sepoliaNetworkDetails.registryModuleOwnerCustomAddress)
    .registerAdminViaOwner(address(sepoliaToken));
TokenAdminRegistry(sepoliaNetworkDetails.tokenAdminRegistryAddress)
    .acceptAdminRole(address(sepoliaToken));
// ... other setup ...
vm.stopPrank();

// --- On Arbitrum Sepolia Fork ---
vm.selectFork(arbSepoliaForkId);
vm.startPrank(owner);
// ... deployments and role granting ...
RegistryModuleOwnerCustom(arbSepoliaNetworkDetails.registryModuleOwnerCustomAddress)
    .registerAdminViaOwner(address(arbSepoliaToken));
TokenAdminRegistry(arbSepoliaNetworkDetails.tokenAdminRegistryAddress)
    .acceptAdminRole(address(arbSepoliaToken));
// ... other setup ...
vm.stopPrank();
```

## Linking Tokens to Their Respective CCIP Pools

The final step in this initial setup phase is to explicitly link each deployed token to its corresponding token pool within the CCIP `TokenAdminRegistry`. This tells CCIP which pool contract manages the cross-chain operations for that specific token on that chain.

Call the `setPool(address localToken, address pool)` function on the `TokenAdminRegistry` contract for each chain, again pranking as the `owner`:

```solidity
// --- On Sepolia Fork ---
vm.selectFork(sepoliaForkId);
vm.startPrank(owner);
// ... previous setup including admin registration ...
TokenAdminRegistry(sepoliaNetworkDetails.tokenAdminRegistryAddress)
    .setPool(address(sepoliaToken), address(sepoliaPool));
vm.stopPrank();

// --- On Arbitrum Sepolia Fork ---
vm.selectFork(arbSepoliaForkId);
vm.startPrank(owner);
// ... previous setup including admin registration ...
TokenAdminRegistry(arbSepoliaNetworkDetails.tokenAdminRegistryAddress)
    .setPool(address(arbSepoliaToken), address(arbSepoliaPool));
vm.stopPrank();
```

## Completing the Initial Setup

At this point, your Foundry `setUp` function has successfully:

*   Forked the Sepolia and Arbitrum Sepolia testnets.
*   Initialized the `CCIPLocalSimulatorFork` contract.
*   Deployed the `RebaseToken` on both forks and the `Vault` on Sepolia.
*   Retrieved essential CCIP network addresses (Router, RMN Proxy, Registries) for both chains.
*   Deployed the `RebaseTokenPool` contracts on both forks, configured with the correct token and network addresses.
*   Granted the necessary `MINT_AND_BURN_ROLE` to the Vault and Token Pools.
*   Registered the `owner` as the token admin via the `RegistryModuleOwnerCustom`.
*   Accepted the token admin role via the `TokenAdminRegistry`.
*   Linked each token to its corresponding `RebaseTokenPool` in the `TokenAdminRegistry`.

The environment is now prepared for the subsequent configuration steps, such as configuring chain-specific parameters on the token pools (often involving calling `applyChainUpdates`), which is typically handled in separate functions or test cases.