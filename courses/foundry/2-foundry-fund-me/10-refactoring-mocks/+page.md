---
title: Refactoring II - Mocks
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/7iHW8Ro_eog" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Let's deep-dive into how we can adapt our existing environment, where we grab contract addresses from the live network, to our local network which does not yet have these contracts. For this, we will use the 'anvil config.'

But before we proceed, a key clarification: a **mock contract** is akin to a placeholder - it's a real contract that we control, but its primary purpose is in testing scenarios. This means, in the context of a local blockchain, we need to deploy these mock contracts manually.

## Broadcasting the Deployment of Mock Contracts with VM

Now, the first step in this journey is to initialize the process for deploying our contracts. Let's take it in stride.

We'll kick off by incorporating the VM start and stop broadcast within our implementation. These provisions ensure we can deploy the mock contracts to the Anvil chain we're working with:

```javascript
VM.startBroadcast(); //Block for deploying mock contractsVM.stopBroadcast();
```

Remember, since we're using this VM keyword, we can't configure this as a public pure and the helper config must be a script to have access to the VM keyword.

## Deploying Price Feed Mock Contract

Moving on, let's delve into deploying our price feed mock contract:

<img src="/foundry-fund-me/10-mocks/mocks1.png" style="width: 100%; height: auto;">

First, create a new folder within the test called 'mocks' to store our mock contracts. Then create a new file and name it 'mockv3aggregator.sol.'

Instead of building this file from scratch, reuse the existing mock version already available on chainlink's brownie contracts. But beware, it uses an older version (0.6.0) of Solidity. To save time, fetch the upgraded version from the 'Foundry FundMe F 23' folder:

```shell
cd FoundryFundMeF23/testFolder
```

Then copy and paste the content into your project.

This mock contract contains functions like 'latest round data,' which one might remember from our price converter. Moreover, its constructor allows updates and manipulation during testing, making it perfect for our local Anvil Chain. Now, we have all the necessary provisions to deploy.

```javascript
import mockv3aggregator from "mocks/test/mocks/MockV3Aggregator.sol";
mockv3aggregator mockPriceFeed = new mockv3aggregator(8, 2000e8);
```

The constructor, as seen in the mock contract, requires decimals (in our case, for ETH/USD, it's 8), and an initial answer, which could be any desired starting price (say, 2000).

After deploying our mockPriceFeed contract, the resulting address can be allocated to the network config of the Anvil chain:

```javascript
networkConfig memory anvilConfig = networkConfig(priceFeed: address(mockPriceFeed));
return anvilConfig;
```

With this, we've set the stage for deploying your smart contracts and running your tests on a local network. We've seen how to configure and use a mock contract for the price feed, adapting it to our local Anvil chain. These steps can also be applied to deploy any other mock contracts as per your development and testing needs.

Stay tuned for more such exciting DevOps adventures with Ethereum, Solidity, and smart contracts!
