## Token and Pool Deployer Script

We will deploy our token and pool contracts. We will use the Chainlink documentation and deploy the tokens. 

We'll create a function called `run` which is public and returns both the rebase token and the pool:

```javascript
function run(address rebaseToken, address pool) public returns (Vault vault) {
    CCIPLocalSimulatorFork ccipLocalSimulatorFork = new CCIPLocalSimulatorFork();
    register.networkDetails networkDetails = ccipLocalSimulatorFork.getNetworkDetails({ block: chainId });
    vm.startBroadcast();
    token = new rebaseToken();
    pool = new rebaseTokenPool(
        IERC20(address(token)), new address[](0), networkDetails.rmnProxyAddress, networkDetails.routerAddress
    );
    RegistryModuleOwnerCustom(address(pool)).registerAdminViaOwner(address(token));
    tokenAdminRegistry(networkDetails.tokenAdminRegistryAddress).acceptAdminRole(address(token), address(pool));
    vm.stopBroadcast();
}
```

We will use the `vm.startBroadcast` and `vm.stopBroadcast` functions to deploy our contracts. 

We will import our rebaseToken and rebaseTokenPool:

```javascript
import "forge-std/Script.sol";
import "./CCIPLocalSimulatorFork.sol";
import "@chainlink/contracts/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";
import "./RebaseToken.sol";
import "./RebaseTokenPool.sol";
import "./Vault.sol";
import "./Interfaces/RebaseToken.sol";

contract TokenAndPoolDeployer is Script {
```
We will deploy the token and pool contracts using the constructor arguments of the `rebaseTokenPool` contract:

```javascript
    function run(address rebaseToken, address pool) public returns (Vault vault) {
        CCIPLocalSimulatorFork ccipLocalSimulatorFork = new CCIPLocalSimulatorFork();
        register.networkDetails networkDetails = ccipLocalSimulatorFork.getNetworkDetails({ block: chainId });
        vm.startBroadcast();
        token = new rebaseToken();
        pool = new rebaseTokenPool(
            IERC20(address(token)), new address[](0), networkDetails.rmnProxyAddress, networkDetails.routerAddress
        );
        RegistryModuleOwnerCustom(address(pool)).registerAdminViaOwner(address(token));
        tokenAdminRegistry(networkDetails.tokenAdminRegistryAddress).acceptAdminRole(address(token), address(pool));
        vm.stopBroadcast();
        vault = new Vault(rebaseToken, grantMintAndBurnRole(address(vault)));
        vm.stopBroadcast();
    }
}
```

We will also deploy the Vault contract and grant the mint and burn role to the vault.

```javascript
import "forge-std/Script.sol";
import "./CCIPLocalSimulatorFork.sol";
import "@chainlink/contracts/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";
import "./RebaseToken.sol";
import "./RebaseTokenPool.sol";
import "./Vault.sol";
import "./Interfaces/RebaseToken.sol";

contract TokenAndPoolDeployer is Script {
    function run(address rebaseToken, address pool) public returns (Vault vault) {
        CCIPLocalSimulatorFork ccipLocalSimulatorFork = new CCIPLocalSimulatorFork();
        register.networkDetails networkDetails = ccipLocalSimulatorFork.getNetworkDetails({ block: chainId });
        vm.startBroadcast();
        token = new rebaseToken();
        pool = new rebaseTokenPool(
            IERC20(address(token)), new address[](0), networkDetails.rmnProxyAddress, networkDetails.routerAddress
        );
        RegistryModuleOwnerCustom(address(pool)).registerAdminViaOwner(address(token));
        tokenAdminRegistry(networkDetails.tokenAdminRegistryAddress).acceptAdminRole(address(token), address(pool));
        vm.stopBroadcast();
        vault = new Vault(rebaseToken, grantMintAndBurnRole(address(vault)));
        vm.stopBroadcast();
    }
}
```

We will then use `forge build` to check if we haven't done anything incorrectly. 

```bash
forge build
```