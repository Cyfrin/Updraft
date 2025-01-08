## CCIP Setup Test

This lesson covers some steps involved in setting up CCIP (Cross-Chain Inter-Process) on a fork. We will cover the following steps.

- Deploying tokens and token pools
- Claiming and Accepting Admin Role
- Linking Tokens to Pools
- Configuring Token Pools

**Deploying tokens and token pools**

We will begin by adding the necessary imports.

```javascript
import "forge-std/Test.sol";
import {CCIPLocalSimulatorFork, Register} from "chainlink-local/src/ccip/CCIPLocalSimulatorFork.sol";
import {RebaseToken} from "./src/RebaseToken.sol";
import {RebaseTokenPool} from "./src/RebaseTokenPool.sol";
import {Vault} from "./src/Vault.sol";
import {IRebaseToken} from "./src/interfaces/IRebaseToken.sol";
```

We will then define a test contract.

```javascript
contract CrossChainTest is Test {
  address owner = makeAddr("owner");
  uint256 arbSepollaFork;

  CCIPLocalSimulatorFork ccipLocalSimulatorFork;

  RebaseToken sepollaToken;
  RebaseToken arbSepollaToken;

  Vault vault;

  RebaseTokenPool sepollaLiPool;
  RebaseTokenPool arbSepollaLiPool;

  function setup() public {
    sepollaFork = vm.createSelectFork("sepolla");
    arbSepollaFork = vm.createSelectFork("arb-sepolla");
    ccipLocalSimulatorFork = new CCIPLocalSimulatorFork();
    vm.makePersistent(address(ccipLocalSimulatorFork));

    // 1. Deploy and configure on Sepollia
    vm.startPrank(owner);
    sepollaToken = new RebaseToken();
    vault = new Vault(RebaseToken(address(sepollaToken)));
    sepollaLiPool = new RebaseTokenPool();
    vm.stopPrank();

    // 2. Deploy and configure on Arbitrum Sepollia
    vm.selectFork(arbSepollaFork);
    arbSepollaToken = new RebaseToken();
    vm.startPrank(owner);
    vm.stopPrank();
  }
}
```

In our setup, we define the following.

* `sepollaToken` is an instance of the `RebaseToken` contract.
* `arbSepollaToken` is another instance of the `RebaseToken` contract.
* `vault` is an instance of the `Vault` contract that takes our `sepollaToken`.
* `sepollaLiPool` is an instance of the `RebaseTokenPool` contract.
* `arbSepollaLiPool` is another instance of the `RebaseTokenPool` contract.

We also create a `CCIPLocalSimulatorFork` instance. We then use the `vm.makePersistent` method to make the address of the `ccipLocalSimulatorFork` permanent in our test environment.

**Claiming and Accepting Admin Role**

We need to claim the burn and mint roles in our test environment.

We need to import the `Register` and `RegisterModuleOwnerCustom` contracts.

```javascript
import {Register} from "ccicp/contracts/src/v0.8/RegistryModuleOwnerCustom.sol";
import {RegisterModuleOwnerCustom} from "ccicp/contracts/src/v0.8/RegistryModuleOwnerCustom.sol";
```

We need to import `IERC20` for the `sepollaToken`.

```javascript
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

We are now ready to add the code to claim and accept the admin role. We will use the `vm.startPrank` method to impersonate the owner. We will then use the `sepollaToken` contract's `grantMintAndBurnRole` method and pass in the address of the `vault`. Next, we will use the `RegisterModuleOwnerCustom` contract's `registerAdminViaOwner` method and pass in the address of the `sepollaToken` to register it as a token admin. Finally, we will use the `TokenAdminRegistry` contract's `acceptAdminRole` method and pass in the address of the `sepollaToken` to accept the token admin role.

```javascript
  function setup() public {
    sepollaFork = vm.createSelectFork("sepolla");
    arbSepollaFork = vm.createSelectFork("arb-sepolla");
    ccipLocalSimulatorFork = new CCIPLocalSimulatorFork();
    vm.makePersistent(address(ccipLocalSimulatorFork));

    // 1. Deploy and configure on Sepollia
    vm.startPrank(owner);
    sepollaToken = new RebaseToken();
    vault = new Vault(RebaseToken(address(sepollaToken)));
    sepollaLiPool = new RebaseTokenPool();
    sepollaToken.grantMintAndBurnRole(address(vault));
    sepollaToken.registerAdminViaOwner(address(sepollaToken), sepollaNetworkDetails.registryModuleOwnerCustomAddress, registerAdminViaOwner);
    vm.stopPrank();

    // 2. Deploy and configure on Arbitrum Sepollia
    vm.selectFork(arbSepollaFork);
    arbSepollaToken = new RebaseToken();
    vm.startPrank(owner);
    vm.stopPrank();
  }
```

**Linking Tokens to Pools**

Now that we have claimed and accepted the admin role, we need to link our tokens to the token pools.

We need to import the `Pool` contract.

```javascript
import {Pool} from "ccicp/contracts/src/v0.8/libraries/Pool.sol";
```

Now we can add the code to link the tokens to the pools using the `Pool` contract's `setPool` method.

```javascript
   function setup() public {
    sepollaFork = vm.createSelectFork("sepolla");
    arbSepollaFork = vm.createSelectFork("arb-sepolla");
    ccipLocalSimulatorFork = new CCIPLocalSimulatorFork();
    vm.makePersistent(address(ccipLocalSimulatorFork));

    // 1. Deploy and configure on Sepollia
    vm.startPrank(owner);
    sepollaToken = new RebaseToken();
    vault = new Vault(RebaseToken(address(sepollaToken)));
    sepollaLiPool = new RebaseTokenPool();
    sepollaToken.grantMintAndBurnRole(address(vault));
    sepollaToken.registerAdminViaOwner(address(sepollaToken), sepollaNetworkDetails.registryModuleOwnerCustomAddress, registerAdminViaOwner);
    vm.stopPrank();

    sepollaLiPool.setPool(address(sepollaToken));

    // 2. Deploy and configure on Arbitrum Sepollia
    vm.selectFork(arbSepollaFork);
    arbSepollaToken = new RebaseToken();
    vm.startPrank(owner);
    vm.stopPrank();
  }
```

**Configuring Token Pools**

We need to configure the token pools by calling the `applyChainUpdates` method.

We will cover this step in the next lesson.
