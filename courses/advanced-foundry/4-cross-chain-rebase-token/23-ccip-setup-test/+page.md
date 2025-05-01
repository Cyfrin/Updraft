## Setting Up the Foundry Project and Initial Compilation

This lesson guides you through the initial setup phase for testing a Cross-Chain Interoperability Protocol (CCIP) application involving custom rebase tokens using Foundry. We will focus on deploying and configuring these tokens and their associated pools on forked Sepolia (source) and Arbitrum Sepolia (destination) testnets.

We begin within a Foundry project (`ccip-rebase-token`) containing the `CrossChainTest.sol` contract. The first step is to compile the project:

```bash
% forge build
```

During the initial compilation attempt, you might encounter an error related to type casting:

```
Error [9640]: Explicit type conversion not allowed from "contract RebaseToken" to "contract IRebaseToken".
```

This typically occurs when instantiating a contract that expects an interface type, but you provide an instance of the concrete contract implementing that interface. For example, consider this line within the `setup()` function:

```solidity
// Original problematic line
vault = new Vault(IRebaseToken(sepoliaToken));
```

Here, `sepoliaToken` is of type `RebaseToken`, but the `Vault` constructor expects an `IRebaseToken`. Solidity requires an explicit intermediate cast to `address` to resolve this:

```solidity
// Fixed line
vault = new Vault(IRebaseToken(address(sepoliaToken)));
```

Applying this fix allows the `forge build` command to succeed. At this point, the basic `setup()` function in `CrossChainTest.sol` successfully deploys the `sepoliaToken` (type `RebaseToken`), the `vault` contract on the Sepolia fork, and the `arbSepoliaToken` (type `RebaseToken`) on the Arbitrum Sepolia fork.

## Deploying Rebase Token Pools

Following the Chainlink CCIP documentation for enabling Burn & Mint tokens using Foundry (Step 2), the next task is deploying Token Pools for our custom rebase tokens on both chains.

First, declare state variables in `CrossChainTest.sol` to hold the deployed pool contract instances:

```solidity
RebaseTokenPool sepoliaPool;
RebaseTokenPool arbSepoliaPool;
```

Our `RebaseTokenPool.sol` contract inherits from Chainlink's `TokenPool`. To deploy it, we need to examine its constructor signature:

```solidity
// RebaseTokenPool constructor (inherits TokenPool)
constructor(IERC20 _token, address[] memory _allowlist, address _rmnProxy, address _router)
    TokenPool(_token, 18, _allowlist, _rmnProxy, _router) // Calls parent constructor
{}
```

The constructor requires:
1.  `_token`: The address of the ERC20 token managed by the pool. Note: This often requires the specific `IERC20` interface used within Chainlink's contracts.
2.  `_allowlist`: An array of addresses allowed to interact with the pool. An empty array (`new address[](0)`) signifies an open allowlist.
3.  `_rmnProxy`: The address of the chain-specific Risk Management Network proxy contract.
4.  `_router`: The address of the chain-specific CCIP Router contract.

The chain-specific addresses (`_rmnProxy`, `_router`) are crucial for CCIP interaction. In a local forked testing environment using Chainlink Local, we can retrieve these using the `CCIPLocalSimulatorFork` utility contract. This contract provides a `getNetworkDetails(uint256 chainId)` function which returns a `Register.NetworkDetails` struct.

First, ensure the necessary imports are present in `CrossChainTest.sol`:

```solidity
import {CCIPLocalSimulatorFork, Register} from "@chainlink-local/src/ccip/CCIPLocalSimulatorFork.sol";
// Import the specific IERC20 interface expected by TokenPool
import {IERC20} from "@ccip/contracts/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol"; // Example path
```

Declare state variables to store the network details for each chain:

```solidity
Register.NetworkDetails sepoliaNetworkDetails;
Register.NetworkDetails arbSepoliaNetworkDetails;
```

Inside the `setup()` function, after selecting the appropriate fork using `vm.selectFork()`, fetch the network details using the current chain ID:

```solidity
// Assuming vm.selectFork(sepoliaFork) was called earlier
sepoliaNetworkDetails = ccipLocalSimulatorFork.getNetworkDetails(block.chainid);

// Select the destination fork
vm.selectFork(arbSepoliaFork);
arbSepoliaNetworkDetails = ccipLocalSimulatorFork.getNetworkDetails(block.chainid);

// Return to the source fork for subsequent Sepolia setup steps
vm.selectFork(sepoliaFork);
```

Now we have all the necessary components to deploy the token pools. Note the required cast from the token's concrete type (`RebaseToken`) to `address`, and then to the specific `IERC20` interface expected by the `RebaseTokenPool` constructor.

```solidity
// Deploy Sepolia Pool (on Sepolia fork)
sepoliaPool = new RebaseTokenPool(
    IERC20(address(sepoliaToken)), // Cast token address to specific IERC20
    new address[](0),              // Empty allowlist
    sepoliaNetworkDetails.rmnProxyAddress,
    sepoliaNetworkDetails.routerAddress
);

// Select Arbitrum Sepolia fork to deploy its pool
vm.selectFork(arbSepoliaFork);

// Deploy Arbitrum Sepolia Pool (on Arbitrum Sepolia fork)
arbSepoliaPool = new RebaseTokenPool(
    IERC20(address(arbSepoliaToken)),
    new address[](0),
    arbSepoliaNetworkDetails.rmnProxyAddress,
    arbSepoliaNetworkDetails.routerAddress
);

// Return to the source fork if needed for subsequent setup steps
vm.selectFork(sepoliaFork);
```

## Granting Mint and Burn Permissions

Step 3 in the CCIP Burn & Mint setup involves granting the necessary permissions. The deployed Token Pools need the authority to burn tokens on the source chain and mint tokens on the destination chain. Our custom `RebaseToken` contract includes a `grantMintAndBurnRole` function for this purpose.

Within the `setup()` function, using `vm.startPrank` to simulate calls from the token owner, grant these roles:

```solidity
// Ensure the Sepolia fork is selected
vm.selectFork(sepoliaFork);
// Prank as the owner (deployer)
vm.startPrank(owner); // Assuming 'owner' holds the deployer address

// Grant roles on Sepolia
// The Vault also needs permission if it handles burning/locking
sepoliaToken.grantMintAndBurnRole(address(vault));
sepoliaToken.grantMintAndBurnRole(address(sepoliaPool));

// Select the Arbitrum Sepolia fork
vm.selectFork(arbSepoliaFork);

// Grant roles on Arbitrum Sepolia (only the pool needs minting rights here)
arbSepoliaToken.grantMintAndBurnRole(address(arbSepoliaPool));

// Stop the prank
vm.stopPrank();

// Optionally, return to the source fork
vm.selectFork(sepoliaFork);
```

## Enabling Tokens for CCIP: Admin Role Registration

Step 4 is a crucial two-part process to formally enable our custom tokens for use with CCIP by registering them with the CCIP administrative contracts.

**Step 4.1: Register Admin via Owner**

This step involves the token owner calling the `registerAdminViaOwner` function on the `RegistryModuleOwnerCustom` contract for each chain. The address of this contract is available in the `NetworkDetails` struct we fetched earlier.

First, import the necessary contract interface:

```solidity
import {RegistryModuleOwnerCustom} from "@ccip/contracts/src/v0.8/ccip/TokenAdminRegistry/RegistryModuleOwnerCustom.sol"; // Example path
```

Then, within `setup()` (again, likely using `vm.startPrank(owner)`):

```solidity
// Prank as owner if not already doing so
vm.startPrank(owner);

// Ensure the Sepolia fork is selected
vm.selectFork(sepoliaFork);

// Call registerAdminViaOwner on Sepolia
RegistryModuleOwnerCustom(sepoliaNetworkDetails.registryModuleOwnerCustomAddress)
    .registerAdminViaOwner(address(sepoliaToken));

// Select the Arbitrum Sepolia fork
vm.selectFork(arbSepoliaFork);

// Call registerAdminViaOwner on Arbitrum Sepolia
RegistryModuleOwnerCustom(arbSepoliaNetworkDetails.registryModuleOwnerCustomAddress)
    .registerAdminViaOwner(address(arbSepoliaToken));

// Stop prank if done with owner actions for now
// vm.stopPrank();

// Return to source fork
vm.selectFork(sepoliaFork);
```

**Step 4.2: Accept Admin Role**

After registering, the token contract itself (or its designated admin, which defaults to the owner if setup this way) must accept the admin role by calling `acceptAdminRole` on the `TokenAdminRegistry` contract. This contract's address is also found in the `NetworkDetails`.

Import the interface:

```solidity
import {TokenAdminRegistry} from "@ccip/contracts/src/v0.8/ccip/TokenAdminRegistry/TokenAdminRegistry.sol"; // Example path
```

Call the function within `setup()` (continuing the owner's prank):

```solidity
// Still pranking as owner
// Ensure the Sepolia fork is selected
vm.selectFork(sepoliaFork);

// Call acceptAdminRole on Sepolia
TokenAdminRegistry(sepoliaNetworkDetails.tokenAdminRegistryAddress)
    .acceptAdminRole(address(sepoliaToken));

// Select the Arbitrum Sepolia fork
vm.selectFork(arbSepoliaFork);

// Call acceptAdminRole on Arbitrum Sepolia
TokenAdminRegistry(arbSepoliaNetworkDetails.tokenAdminRegistryAddress)
    .acceptAdminRole(address(arbSepoliaToken));

// Stop the prank
vm.stopPrank();

// Return to source fork
vm.selectFork(sepoliaFork);
```

With these two steps completed, the tokens are now recognized and administered within the CCIP system on their respective chains.

## Linking Tokens to Their Respective Pools

The final setup step covered in this part (Step 5 from the documentation) is to link each registered token to its corresponding deployed Token Pool. This explicitly tells the CCIP system which pool contract is responsible for handling the Burn & Mint operations for that specific token on that chain.

This is done by calling the `setPool` function on the `TokenAdminRegistry` contract for each chain. This function takes the token address and the pool address as arguments.

Continuing within the `setup()` function (requires admin privileges, typically the owner who just accepted the role):

```solidity
// Prank as owner again, as setting the pool requires admin rights
vm.startPrank(owner);

// Ensure the Sepolia fork is selected
vm.selectFork(sepoliaFork);

// Link the Sepolia token to the Sepolia pool
TokenAdminRegistry(sepoliaNetworkDetails.tokenAdminRegistryAddress)
    .setPool(address(sepoliaToken), address(sepoliaPool));

// Select the Arbitrum Sepolia fork
vm.selectFork(arbSepoliaFork);

// Link the Arbitrum Sepolia token to the Arbitrum Sepolia pool
TokenAdminRegistry(arbSepoliaNetworkDetails.tokenAdminRegistryAddress)
    .setPool(address(arbSepoliaToken), address(arbSepoliaPool));

// Stop the prank
vm.stopPrank();

// Return to the source fork
vm.selectFork(sepoliaFork);
```

At this stage, the custom rebase tokens have been deployed, the token pools are deployed and configured with the correct CCIP component addresses, necessary permissions have been granted, the tokens are registered as administered assets within CCIP, and finally, each token is explicitly linked to its managing pool on its respective chain. The foundational setup for testing CCIP Burn & Mint transfers is now largely complete. Further steps will involve configuring pool rates and initiating test transfers.