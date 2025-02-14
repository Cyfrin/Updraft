## Account Abstraction Lesson 8: Deploy Ethereum

This is an exciting time in our learning journey. We have finished our **minimal contract**. Now it is time to write some **deploy scripts**. We will be setting up a lot of code in this lesson. **We won't be going too deep into explanations here**. However, you are encouraged to do so on your own.

---

Let's start by naming our first script in the `script` folder. Name it `DeployMinimal.s.sol`. Let's also go ahead and another script - `HelperConfig.s.sol`. We will need a HelperConfig because the EntryPoint contract will vary on different chains. And we will also need a `SendPackedUserOp.s.sol` This will be a vital piece for us and we will be doing a lot of work in this script. Let's get started in `DeployMinimal.s.sol`.

**<span style="color:red">DeployMinimal.s.sol</span>**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";
import {MinimalAccount} from "src/ethereum/MinimalAccount.sol";

contract DeployMinimal is Script {
    function run() public {}

    function deployMinimalAccount() public {}
}
```

If you remember(or go back) to our MinimalAccount, the constructor passes `address entrypoint`.

**<span style="color:red">MinimalAccount.sol</span>**

```solidity
constructor(address entrypoint)
```

Let's set this up in our `HelperConfig.s.sol`.

> ❗ **NOTE** This is a large block of code below. Please be sure to follow along with the video.

**<span style="color:red">HelperConfig.s.sol</span>**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";

contract HelperConfig is Script {
    error HelperConfig__InvalidChainId();

    struct NetworkConfig {
        address entryPoint;
        address account;
    }

    uint256 constant ETH_SEPOLIA_CHAIN_ID = 11155111;
    uint256 constant ZKSYNC_SEPOLIA_CHAIN_ID = 300;
    uint256 constant LOCAL_CHAIN_ID = 31337;
    address constant BURNER_WALLET = 0X; //Your burner testnet wallet address here

    NetworkConfig public localNetworkConfig;
    mapping(uint256 chainId => NetworkConfig) public networkConfigs;

    constructor() {
        networkConfigs[ETH_SEPOLIA_CHAIN_ID] = getEthSepoliaConfig();

    }

    function getConfig() public returns (NetworkConfig memory) {
        return getConfigByChainId(block.chainid);
    }

    function getConfigByChainId(uint256 chainId) public returns (NetworkConfig memory) {
        if (chainId == LOCAL_CHAIN_ID) {
            return getOrCreateAnvilEthConfig();
        } else if (networkConfigs[chainId].account != address(0)) {
            return networkConfigs[chainId];
        } else {
            revert HelperConfig__InvalidChainId();
        }
    }

    function getEthSepoliaConfig() public pure returns (NetworkConfig memory) {
        return NetworkConfig({
            entryPoint: 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789,
            account: BURNER_WALLET
        });
    }

    function getZkSyncSepoliaConfig() public pure returns (NetworkConfig memory) {
        return NetworkConfig({
            entryPoint: address(0), // There is no entryPoint in ZKsync!
            account: BURNER_WALLET
        });
    }

    function getOrCreateAnvilEthConfig() public returns (NetworkConfig memory) {
        if (localNetworkConfig.account != address(0)) {
            return localNetworkConfig;
        }
    }
}
```

Now that we have our `HelperConfig`, let's import it in `DeployMinimal.s.sol`.

**<span style="color:red">DeployMinimal.s.sol</span>**

```solidity
import { HelperConfig } from "script/HelperConfig.s.sol";
```

Then we need to add it to our `deployMinimalAccount` function.

```solidity
function deployMinimalAccount() public returns (HelperConfig, MinimalAccount) {
    HelperConfig helperConfig = new HelperConfig();
    HelperConfig.NetworkConfig memory config = helperConfig.getConfig();

    vm.startBroadcast();
    MinimalAccount minimalAccount = new MinimalAccount(config.account);
    minimalAccount.transferOwnership(msg.sender);
    vm.stopBroadcast();
    return (helperConfig, minimalAccount);
}
```

Let's run `forge build` in our terminal to check that everything is compiling.

> ❗ **NOTE** You may see some yellow warnings, but that is not concerning at this point. As long as there aren't any red errors, you are good.

We did a lot of coding in this lesson. However, we've still go a way to go. Take a minute to reflect on the code that we have written so far. When you are ready, move on to the next lesson.
