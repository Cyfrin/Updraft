## Setting Up Your CCIP Test Environment in Foundry

This lesson guides you through the initial steps of establishing a Chainlink CCIP (Cross-Chain Interoperability Protocol) test environment using Foundry. We'll focus on deploying the necessary contracts—specifically a `RebaseToken`, a `Vault`, and `TokenPool` contracts—on two simulated chains: Sepolia (as the source chain) and Arbitrum Sepolia (as the destination chain). We will also configure the essential roles and links required for these contracts to interact within the CCIP framework.

## Initial Project Compilation and Resolving Type Errors

We begin by attempting to compile our Foundry project. This is a standard first step to ensure our smart contracts are syntactically correct and all dependencies are properly resolved.

Executing `forge build` might initially lead to a compilation error. A common issue encountered is:
`Error (9640): Explicit type conversion not allowed from "contract RebaseToken" to "contract IRebaseToken"`.
This error typically points to a line in your test setup, for example, within the `setup()` function when instantiating a `Vault` contract:

```solidity
// Original problematic line in test/CrossChain.t.sol
vault = new Vault(IRebaseToken(sepoliaToken));
```

The root cause is that Solidity sometimes struggles with direct type casting from a concrete contract implementation (e.g., `RebaseToken`) to an interface it implements (e.g., `IRebaseToken`), especially if the compiler cannot implicitly verify the cast due to complex inheritance structures or how types are passed.

To resolve this, an intermediate cast to `address` is required. This explicitly tells the compiler that you are aware of the underlying address and are then casting that address to the desired interface type:

```solidity
// Corrected line
vault = new Vault(IRebaseToken(address(sepoliaToken)));
```

After applying this fix and successfully compiling, our initial setup should have the following contracts deployed:
*   `sepoliaToken` (an instance of `RebaseToken`) deployed on the Sepolia fork.
*   `vault` (an instance of `Vault`) deployed on the Sepolia fork, configured with the address of `sepoliaToken`.
*   `arbSepoliaToken` (an instance of `RebaseToken`) deployed on the Arbitrum Sepolia fork.

## Deploying Token Pool Contracts for CCIP

With our basic contracts deployed, the next crucial step, following the Chainlink CCIP documentation (specifically, "Enable your tokens in CCIP (Burn & Mint): Register from an EOA using Foundry"), is to deploy Token Pool contracts. These contracts are essential for managing the burn/lock and mint/unlock mechanics of tokens in CCIP.

First, we'll declare state variables in our test contract (`CrossChainTest.sol`) for these pools:

```solidity
RebaseTokenPool sepoliaPool;
RebaseTokenPool arbSepoliaPool;
```

To instantiate these `RebaseTokenPool` contracts, we need to identify their constructor arguments. Our `RebaseTokenPool.sol` likely inherits from Chainlink's base `TokenPool` contract. The constructor for `TokenPool` typically requires:
*   `IERC20 _token`: The ERC20 token that this pool will manage.
*   `address[] memory _allowlist`: A list of addresses permitted to use this pool. An empty array `[]` signifies that anyone can use it.
*   `address _rmnProxy`: The address of the Risk Management Network (RMN) proxy contract for the respective chain.
*   `address _router`: The address of the CCIP Router contract for the respective chain.

These RMN Proxy and Router addresses are chain-specific and vital for CCIP operations. For local testing with Foundry, Chainlink provides the `CCIPLocalSimulatorFork` contract. This simulator contract exposes a function `getNetworkDetails(uint256 chainId)` which returns a `Register.NetworkDetails` struct. This struct conveniently packages various critical addresses for a given chain, including `routerAddress` and `rmnProxyAddress`.

To use this, we need to import `CCIPLocalSimulatorFork` and the `Register` struct (which contains the `NetworkDetails` definition) from `@chainlink-local/src/ccip/CCIPLocalSimulatorFork.sol`:

```solidity
import {CCIPLocalSimulatorFork, Register} from "@chainlink-local/src/ccip/CCIPLocalSimulatorFork.sol";
```

We'll also add state variables to store these network details:

```solidity
Register.NetworkDetails sepoliaNetworkDetails;
Register.NetworkDetails arbSepoliaNetworkDetails;
```

In our `setup()` function, we populate these structs by first selecting the appropriate fork using `vm.selectFork()` and then calling `getNetworkDetails()`. The `block.chainid` will automatically provide the correct chain ID of the currently selected fork:

```solidity
// Inside setup()

// Select Sepolia fork
vm.selectFork(sepoliaFork);
sepoliaNetworkDetails = ccipLocalSimulatorFork.getNetworkDetails(block.chainid);

// Select Arbitrum Sepolia fork
vm.selectFork(arbSepoliaFork);
arbSepoliaNetworkDetails = ccipLocalSimulatorFork.getNetworkDetails(block.chainid);
```

Finally, we can deploy the token pools. We'll need to import `IERC20` from OpenZeppelin to correctly cast our token contract addresses to the `IERC20` interface type expected by the `RebaseTokenPool` constructor:

```solidity
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

Now, we deploy the pools using the retrieved network details and our token instances:

```solidity
// Inside setup(), after getting sepoliaNetworkDetails
vm.selectFork(sepoliaFork); // Ensure correct fork is selected
sepoliaPool = new RebaseTokenPool(
    IERC20(address(sepoliaToken)),       // Cast token via address
    new address[](0),                   // Empty allowlist
    sepoliaNetworkDetails.rmnProxyAddress,
    sepoliaNetworkDetails.routerAddress
);

// Inside setup(), after getting arbSepoliaNetworkDetails
vm.selectFork(arbSepoliaFork); // Ensure correct fork is selected
arbSepoliaPool = new RebaseTokenPool(
    IERC20(address(arbSepoliaToken)),     // Cast token via address
    new address[](0),                     // Empty allowlist
    arbSepoliaNetworkDetails.rmnProxyAddress,
    arbSepoliaNetworkDetails.routerAddress
);
```

## Granting Mint and Burn Roles to Key Contracts

For the CCIP Burn-and-Mint token transfer mechanism to function, the `TokenPool` contract associated with a token must have permission to mint new tokens (on the destination chain) and burn existing tokens (on the source chain). Our `RebaseToken.sol` should have a mechanism to grant these permissions, typically via a role-based access control system. Let's assume it has a `grantMintAndBurnRole` function:

```solidity
// Example function in RebaseToken.sol
function grantMintAndBurnRole(address _account) external onlyOwner {
    _grantRole(MINT_AND_BURN_ROLE, _account); // MINT_AND_BURN_ROLE is a bytes32 identifier
}
```

Within our `setup()` function, while pranking as the owner of the tokens (using `vm.startPrank(owner)`), we grant these roles. The `Vault` contract might also require these roles for its operations, so we'll grant it permissions on the Sepolia chain as well.

```solidity
// Inside setup()

// On Sepolia fork
vm.selectFork(sepoliaFork);
vm.startPrank(owner); // Assuming 'owner' is the deployer and owner of sepoliaToken
sepoliaToken.grantMintAndBurnRole(address(vault));
sepoliaToken.grantMintAndBurnRole(address(sepoliaPool));
vm.stopPrank();

// On Arbitrum Sepolia fork
vm.selectFork(arbSepoliaFork);
vm.startPrank(owner); // Assuming 'owner' is the deployer and owner of arbSepoliaToken
arbSepoliaToken.grantMintAndBurnRole(address(arbSepoliaPool));
vm.stopPrank();
```

## Claiming and Accepting Token Administrator Roles for CCIP

The next step outlined in the Chainlink documentation (Step 4) involves establishing the administrative control of your token within the CCIP system. This is a two-part process involving the `RegistryModuleOwnerCustom` and `TokenAdminRegistry` contracts.

**1. Registering Admin via Owner**

First, the owner of the token (our EOA in this test setup) needs to nominate themselves (or another designated address) as the pending administrator for the token. This is done by calling the `registerAdminViaOwner(address token)` function on the `RegistryModuleOwnerCustom` contract. The address of this contract is available in the `networkDetails.registryModuleOwnerCustomAddress` field obtained earlier.

We'll need to import the `RegistryModuleOwnerCustom` interface:

```solidity
import {RegistryModuleOwnerCustom} from "@ccip/contracts/src/v0.8/ccip/TokenAdminRegistry/RegistryModuleOwnerCustom.sol";
```

Then, in `setup()`, we make the calls:

```solidity
// Inside setup()

// On Sepolia fork
vm.selectFork(sepoliaFork);
vm.startPrank(owner);
RegistryModuleOwnerCustom(sepoliaNetworkDetails.registryModuleOwnerCustomAddress)
    .registerAdminViaOwner(address(sepoliaToken));
vm.stopPrank();

// On Arbitrum Sepolia fork
vm.selectFork(arbSepoliaFork);
vm.startPrank(owner);
RegistryModuleOwnerCustom(arbSepoliaNetworkDetails.registryModuleOwnerCustomAddress)
    .registerAdminViaOwner(address(arbSepoliaToken));
vm.stopPrank();
```

**2. Accepting the Admin Role**

After registering as a pending admin, the nominated address (our owner EOA) must finalize the process by accepting the admin role. This is achieved by calling the `acceptAdminRole(address localToken)` function on the `TokenAdminRegistry` contract. The address for this contract is found in `networkDetails.tokenAdminRegistryAddress`.

Import the `TokenAdminRegistry` interface:

```solidity
import {TokenAdminRegistry} from "@ccip/contracts/src/v0.8/ccip/TokenAdminRegistry/TokenAdminRegistry.sol";
```

And implement the calls in `setup()`:

```solidity
// Inside setup()

// On Sepolia fork
vm.selectFork(sepoliaFork);
vm.startPrank(owner);
TokenAdminRegistry(sepoliaNetworkDetails.tokenAdminRegistryAddress)
    .acceptAdminRole(address(sepoliaToken));
vm.stopPrank();

// On Arbitrum Sepolia fork
vm.selectFork(arbSepoliaFork);
vm.startPrank(owner);
TokenAdminRegistry(arbSepoliaNetworkDetails.tokenAdminRegistryAddress)
    .acceptAdminRole(address(arbSepoliaToken));
vm.stopPrank();
```

With these two steps, our EOA is now the recognized administrator for `sepoliaToken` and `arbSepoliaToken` within their respective CCIP environments.

## Linking Tokens to Their Respective Pools

The final configuration step covered in this part of the setup (Step 5 in the documentation) is to inform the `TokenAdminRegistry` about which `TokenPool` contract is associated with which token on each chain. This is done by the token administrator (our EOA) calling the `setPool(address localToken, address pool)` function on the `TokenAdminRegistry` contract.

We already have the `TokenAdminRegistry` imported and its address via `networkDetails`. The implementation is as follows:

```solidity
// Inside setup()

// On Sepolia fork
vm.selectFork(sepoliaFork);
vm.startPrank(owner);
TokenAdminRegistry(sepoliaNetworkDetails.tokenAdminRegistryAddress)
    .setPool(address(sepoliaToken), address(sepoliaPool));
vm.stopPrank();

// On Arbitrum Sepolia fork
vm.selectFork(arbSepoliaFork);
vm.startPrank(owner);
TokenAdminRegistry(arbSepoliaNetworkDetails.tokenAdminRegistryAddress)
    .setPool(address(arbSepoliaToken), address(arbSepoliaPool));
vm.stopPrank();
```

This links our `RebaseToken` instances to their corresponding `RebaseTokenPool` instances on both the Sepolia and Arbitrum Sepolia forks.

## Next Steps: Configuring Token Pools

At this point, we have deployed our core contracts, assigned necessary mint/burn permissions, and established administrative control and linkage for our tokens within the CCIP system.

The subsequent step in the Chainlink documentation (Step 6) involves "Configuring Token Pools." This typically requires calling the `applyChainUpdates` function on the `TokenPool` contracts themselves to finalize their setup based on the chain-specific parameters and linked tokens. To keep our `setup()` function organized, these configuration calls will be encapsulated in a separate, dedicated function, which will then be invoked from within `setup()`. This will be covered in the continuation of our CCIP test environment setup.