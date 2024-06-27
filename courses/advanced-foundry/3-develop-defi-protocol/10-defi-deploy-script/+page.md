---
title: Deploy Script
---

_Follow along the course with this video._



# Testing and Deployment

We've done a lot, so far and it's getting really complex. Now's a great time to perform a sanity check and write some tests.

## 1. The Importance of Testing

_I have no idea if what I'm doing makes any sort of sense. I want to make sure I write some tests here._

Testing is crucial to ensure that our code is functioning as intended. We can go ahead and create a new folder under 'test' named 'unit'. If you wish, you could skip writing the scripts and deploy in your unit tests. In our scenario, we'll have our unit tests also serve as our integration tests.

## 2. Deploying DSC

To set the ball rolling, let's write a script to deploy our DSC. Here is a snippet of how this might look:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract DeployDSC is Script {
    function run() external returns (DecentralizedStableCoin, DSCEngine, HelperConfig){
        //Code here
        }
    }
```

The `run` function is going to return a few things such as the DSC and the DSCEngine. To import our DSC, we're going to use the following line of code:

```javascript
import { DecentralizedStableCoin } from "../src/DecentralizedStableCoin.sol";
```

Your `run()` function may look something like this:

```javascript
    function run() external returns (DecentralizedStableCoin, DSCEngine, HelperConfig) {
        HelperConfig helperConfig = new HelperConfig(); // This comes with our mocks!

        (address wethUsdPriceFeed, address wbtcUsdPriceFeed, address weth, address wbtc, uint256 deployerKey) =
            helperConfig.activeNetworkConfig();
        tokenAddresses = [weth, wbtc];
        priceFeedAddresses = [wethUsdPriceFeed, wbtcUsdPriceFeed];

        vm.startBroadcast(deployerKey);
        DecentralizedStableCoin dsc = new DecentralizedStableCoin();
        DSCEngine dscEngine = new DSCEngine(
            tokenAddresses,
            priceFeedAddresses,
            address(dsc)
        );
```

The DSCEngine plays a critical role in our contract. However, deploying it involves a lot of parameters, making the task a bit complicated. It takes parameters such as `tokenAddresses`, `priceFeedAddresses`, and the DSC address.

The question then arises, where do we get these addresses from ?

Here, a HelperConfig saves the day.

## 4. HelperConfig

The HelperConfig will provide us with the addresses needed by the DSCEngine.

Here is a little sneak-peek into the helper config file:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {MockV3Aggregator} from "../test/mocks/MockV3Aggregator.sol";
import {Script} from "forge-std/Script.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/ERC20Mock.sol";

contract HelperConfig is Script {
    NetworkConfig public activeNetworkConfig;

    uint8 public constant DECIMALS = 8;
    int256 public constant ETH_USD_PRICE = 2000e8;
    int256 public constant BTC_USD_PRICE = 1000e8;

    struct NetworkConfig {
        address wethUsdPriceFeed;
        address wbtcUsdPriceFeed;
        address weth;
        address wbtc;
        uint256 deployerKey;
    }

    uint256 public DEFAULT_ANVIL_PRIVATE_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;

    constructor() {
        if (block.chainid == 11155111) {
            activeNetworkConfig = getSepoliaEthConfig();
        } else {
            activeNetworkConfig = getOrCreateAnvilEthConfig();
        }
    }
```

The `getSepoliaEthConfig` function returns the network configuration for Sepolia:

```javascript
function getSepoliaEthConfig() public view returns (NetworkConfig memory sepoliaNetworkConfig) {
        sepoliaNetworkConfig = NetworkConfig({
            wethUsdPriceFeed: 0x694AA1769357215DE4FAC081bf1f309aDC325306, // ETH / USD
            wbtcUsdPriceFeed: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43,
            weth: 0xdd13E55209Fd76AfE204dBda4007C227904f0a81,
            wbtc: 0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063,
            deployerKey: vm.envUint("PRIVATE_KEY")
        });
    }
```

The `getOrCreateAnvilEthConfig` function either returns the existing anvil configuration or creates a new one.

```javascript
function getOrCreateAnvilEthConfig() public returns (NetworkConfig memory anvilNetworkConfig) {
        // Check to see if we set an active network config
        if (activeNetworkConfig.wethUsdPriceFeed != address(0)) {
            return activeNetworkConfig;
        }

        vm.startBroadcast();
        MockV3Aggregator ethUsdPriceFeed = new MockV3Aggregator(
            DECIMALS,
            ETH_USD_PRICE
        );
        ERC20Mock wethMock = new ERC20Mock("WETH", "WETH", msg.sender, 1000e8);

        MockV3Aggregator btcUsdPriceFeed = new MockV3Aggregator(
            DECIMALS,
            BTC_USD_PRICE
        );
        ERC20Mock wbtcMock = new ERC20Mock("WBTC", "WBTC", msg.sender, 1000e8);
        vm.stopBroadcast();

        anvilNetworkConfig = NetworkConfig({
            wethUsdPriceFeed: address(ethUsdPriceFeed), // ETH / USD
            weth: address(wethMock),
            wbtcUsdPriceFeed: address(btcUsdPriceFeed),
            wbtc: address(wbtcMock),
            deployerKey: DEFAULT_ANVIL_PRIVATE_KEY
        });
    }
```

## 5. Final Steps

We're almost there. Having obtained the needed addresses from our HelperConfig, we can now return to our DeployDSC script. We can import HelperConfig like so:

```javascript
import { HelperConfig } from "./HelperConfig.s.sol";
```

Once imported, if we look back to our run function, we can see we pull the addresses from the `activeNetworkConfiguration` of our HelperConfig and then create the arrays for token addresses and price feeds.

```javascript
    function run() external returns (DecentralizedStableCoin, DSCEngine, HelperConfig) {
        HelperConfig helperConfig = new HelperConfig(); // This comes with our mocks!

        (address wethUsdPriceFeed, address wbtcUsdPriceFeed, address weth, address wbtc, uint256 deployerKey) =
            helperConfig.activeNetworkConfig();
        tokenAddresses = [weth, wbtc];
        priceFeedAddresses = [wethUsdPriceFeed, wbtcUsdPriceFeed];

        vm.startBroadcast(deployerKey);
        DecentralizedStableCoin dsc = new DecentralizedStableCoin();
        DSCEngine dscEngine = new DSCEngine(
            tokenAddresses,
            priceFeedAddresses,
            address(dsc)
        );
        dsc.transferOwnership(address(dscEngine));
        vm.stopBroadcast();
        return (dsc, dscEngine, helperConfig);
```

With our arrays in place, we're ready to deploy our DSCEngine. Our last step involves transferring ownership of the deployed contract to the DSCEngine, in this line:

```javascript
dsc.transferOwnership(address(engine));
```

Only the engine can now interact with the DSC.

## 6. Conclusion

Wow, we've covered a lot and we have so much more to go. In this section we set up a HelperConfig to assist us with assigning network and token addresses. We also wrote a deployment script which uses that HelperConfig to deploy our contract AND we assign ownership of that contract to our DSCEngine. Whew, take a break - you've earned it!
