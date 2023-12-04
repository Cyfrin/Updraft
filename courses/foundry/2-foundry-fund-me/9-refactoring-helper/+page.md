---
title: Refactoring II - Helper Config
---

_Follow along the course with this video._



---

When building and testing your blockchain, you've likely found yourself often making calls to your Alchemy node. Furthermore, you may have noticed the undesirable outcome of this, running up your bill with each test suite execution. So, how can you streamline this process for local development and eliminate redundant API calls to Alchemy? The answer lies in creating mock contracts on your local chain.

In this blog, we'll detail how to set up a mocked environment for local testing and bypass the need to hard-code addresses, while ensuring the functionality remains undisturbed.

### The Importance of Local Testing

Before we dive into the code, let's emphasize why this practice is so beneficial. By creating a local testing environment, you reduce your chances of breaking anything in the refactoring process, as you can test all changes before they go live. No more hardcoding of addresses and no more failures when you try to run a test without a forked chain. As a powerful yet simple tool, a mock contract allows you to simulate the behavior of a real contract without the need to interact with a live blockchain.

### Creating the Mock Contract

Let's start by creating a new contract called `HelperConfig.s.sol`. This contract serves two main purposes:

1. It deploys mocks when we're on a local anvil chain
2. Maintains track of contract addresses across various chains

```js

import {Script} from "forge-stf/Scripts.sol"

contract HelperConfig {}
```

Now, you'll notice `forge-stf/Scripts.sol` being imported at the start of this contract. This helps us determine whether we're in a local anvil chain so that we can deploy the mock contracts accordingly. Similarly, we keep a tab on contract addresses depending on the chain we're on with the aid of address tracking logic.

### Developing Specific Network Configurations

Next, let's create functions `getSapoliaEthConfig` and `getAnvilEthConfig` that return configurations for the respective chains.

```javascript

    NetworkConfig public activeNetworkConfig;

    function getSepoliaEthConfig() public pure returns (NetworkConfig memory) {
        NetworkConfig memory sepoliaConfig = NetworkConfig(address);
        return sepoliaConfig;
    }
    function getAnvilEthConfig() public pure returns (NetworkConfig memory) {NetworkConfig memory config = NetworkConfig(address);// other logicreturn config;}
```

In this way, you can create multiple network configurations quickly.

However, the main challenge arises when you have to decide which configuration to use. For that, we'll create a public variable `activeNetworkConfig`, which gives us an insight into the current network type. Based on the network type, we can set the `activeNetworkConfig` and make our tests much more flexible.

```javascript
if (block.chainId == 11155111) {
  activeNetworkConfig = getSepoliaEthConfig();
} else {
  activeNetworkConfig = getAnvilEthConfig();
}
```

Note that the `block.chainId` equals `11155111` is the specific chain ID for the Sapolia chain. For each chain, you can find their respective IDs using this [chainlist](https://chainlist.org).

### Toward More Effective Testing

With such an architecture in place, you can now test against a forked Mainnet or any other blockchain you choose to deploy. Import your `HelperConfig` in the test files and set the `activeNetworkConfig` at the beginning of every test suite.

```javascript
   import HelperConfig from 'HelperConfig.s.sol';
   HelperConfig helperConfig = new HelperConfig;
   // then get the price feed address
   address ethUsdPriceFeed = helperConfig.activeNetworkConfig.priceFeed;
```

This setup enables you to check your code against different chains without having to hard-code any addresses.

Just remember to define a new `NetworkConfig` type for every chain you want to test against, and you're good to go.

For example, if you want to deploy on the Ethereum Mainnet, you can define a dedicated function to get the mainnet's ETH config.

```javascript
    function getMainnetEthConfig() public pure returns (NetworkConfig memory) {
        NetworkConfig memory config = NetworkConfig(address);// other logic
        return config;
    }
```

And in your constructor, add a new condition to check if the current chain is the Ethereum Mainnet.

```javascript
   else if (block.chainId == 1) {activeNetworkConfig = getMainnetETHConfig;}
```

This modularity ensures that you can run your tests on any chain, simply adding additional network configuration as necessary. Run `forge test, fork URL, mainnetrpcURL`, and get to testing on the Ethereum Mainnet right away.

### Conclusion

In conclusion, mock contracts are a valuable asset for local development. They enable you to test and refine your contract without the need for constant calls to your Alchemy node, saving you valuable time and resources. Plus, having a well-structured way to manage different configurations for different networks makes running tests and deploying on different chains a breeze.

<img src="/foundry-fund-me/9-config/config1.png" style="width: 100%; height: auto;">

As we've highlighted here, each blockchain development project can be optimized with a few simple steps. As long as you're armed with the knowledge of your chain's ID and the addresses you need, you can create a local testing environment that aids you in creating a well-structured, efficient, and robust product.
