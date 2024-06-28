---
title: Test and Deploy Script
---

_Follow along with this lesson and watch the video below:_



---

Before we dive into writing tests to confirm the functionality and performance, We'd like to cover the need for additional getter functions which will make our code even more efficient. However, the main focus will be on developing sound, fail-safe test cases.

## Plan for Writing Test Cases

Here's our comprehensive plan:

1. Write deploy scripts
2. Write tests that will work on a local chain, a forked testnet, and a forked mainnet in tandem with our deployment scripts.

So, let's proceed without further ado!

## Writing the Deploy Script

Let's start by creating our deploy script. To do this, simply go to scripts, create a new file and name it: `DeployRaffle.sol`. Here we will define our SPDX license identifier as MIT. We will need to import a script from `forge-std/Script.sol`.

Remember to run a sanity check by building our contract in the terminal. We need to specify our compiler version (0.8.18 in this instance) using the pragma solidity directive for it to work perfectly!

```bash
pragma solidity 0.8.18;
```

<img src="/foundry-lottery/16-deploy/deploy1.png" style="width: 100%; height: auto;">

## Creating the Run Function

We need to create a `run` function that will return our `Raffle` contract.

```js
function run() external returns (Raffle, HelperConfig) {}
```

## Writing the Deployment Script

When writing down the deployment script, it's important that we refer back to the `Raffle` contract parameters as they are vital to the process. These parameters include an entrance fee, interval, VRF coordinator, gas lane, subscription ID, and callback gas limit.

As each of these parameters will vary depending on the chain used, a helper config file needs to be set up. This file will store these parameters, ensuring flexibility for deployment to any chain. Time to create a new file named: `Helperconfig.sol`.

## Creating the HelperConfig Contract

In `Helperconfig.sol`, we'll create a `struct` called NetworkConfig. This struct will be populated with the parameters needed for each specific network we plan to deploy our protocol on - such as Sepolia and Anvil.

```shell
contract HelperConfig is Script {
     struct NetworkConfig {
        uint64 subscriptionId;
        bytes32 gasLane;
        uint256 automationUpdateInterval;
        uint256 raffleEntranceFee;
        uint32 callbackGasLimit;
        address vrfCoordinatorV2;
        address link;
        uint256 deployerKey;
    }
}
```

## Creating Network-Specific Config Functions

For both Sepolia and Anvil, we'll define corresponding `get` functions, `getSepoliaETHConfig` and `getAnvilETHConfig`, which return network specific configurations.

```js
 function getSepoliaEthConfig()
        public
        view
        returns (NetworkConfig memory sepoliaNetworkConfig)
    {
        sepoliaNetworkConfig = NetworkConfig({
            subscriptionId: 0, // If left as 0, our scripts will create one!
            gasLane: 0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c,
            automationUpdateInterval: 30, // 30 seconds
            raffleEntranceFee: 0.01 ether,
            callbackGasLimit: 500000, // 500,000 gas
            vrfCoordinatorV2: 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625,
            link: 0x779877A7B0D9E8603169DdbD7836e478b4624789,
            deployerKey: vm.envUint("PRIVATE_KEY")
        });
    }

```

Remember, for the Anvil network, we'll be working with mocks, a kind of 'just-for-test' dummy data that emulates the behavior of real data. This makes the Anvil network a bit more involved, but equally as important.

## Conclusion

The deployment of intelligent contracts has been simplified through the use of helper function configuration and smart deployment. The key is defining the correct network parameters for the chain of interest, and ensuring accurate deployment, as demonstrated with our Ethereum-based Raffle app. This process, although demanding, ensures that code deployment becomes seamless, regardless of the network chain used.

Stay tuned to see how our test cases perform in different network environments!

<img src="/foundry-lottery/16-deploy/deploy2.png" style="width: 100%; height: auto;">
