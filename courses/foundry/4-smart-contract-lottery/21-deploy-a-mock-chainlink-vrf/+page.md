---
title: Deploy a mock Chainlink VRF

_Follow along with this video:_

---

### Chainlink VRF mock contract 

A mock contract is a type of smart contract used in testing and development environments to simulate the behavior of real contracts. It allows us to create controlled and predictable scenarios for testing purposes without relying on actual external contracts or data sources. Moreover, it facilitates testing using Anvil, which is extremely fast and practical in comparison to a testnet.

In the last lesson, we stopped on `HelperConfig.s.sol`:

```javascript
    function getOrCreateAnvilEthConfig()
        public
        returns (NetworkConfig memory anvilNetworkConfig)
    {
        // Check to see if we set an active network config
        if (activeNetworkConfig.vrfCoordinatorV2 != address(0)) {
            return activeNetworkConfig;
        }
    }
```

We need to treat the other side of the `(activeNetworkConfig.vrfCoordinatorV2 != address(0))` condition. What happens if that is false?

If that is false we need to deploy a mock vrfCoordinatorV2 and pass its address inside a `NetworkConfig` that will be used on Anvil. 

Please use your Explorer on the left side to access the following path:

`foundry-f23/foundry-smart-contract-lottery-f23/lib/chainlink/contracts/src/v0.8/vrf`

Inside you'll find multiple folders, one of which is called `mocks`. Inside that folder, you can find the `VRFCoordinatorV2Mock` mock contract created by Chainlink.

Add the following line in the imports section of `HelperConfig.s.sol`:

```javascript
import {VRFCoordinatorV2Mock} from "chainlink/src/v0.8/vrf/mocks/VRFCoordinatorV2Mock.sol";
```

Amazing! Now let's keep on working on the `getOrCreateAnvilEthConfig` function. We need to deploy the `vrfCoordinatorV2Mock`, but if we open it we'll see that its constructor requires some parameters:

```javascript
  constructor(uint96 _baseFee, uint96 _gasPriceLink) ConfirmedOwner(msg.sender) {
    BASE_FEE = _baseFee;
    GAS_PRICE_LINK = _gasPriceLink;
    setConfig();
  }
```

The `_baseFee` is the flat fee that VRF charges for the provided randomness and `_gasPriceLink` which is the gas consumed by the VRF node when calling your function. Given the way it's structured the callback gas is paid initially by the node which needs to be reimbursed. Both these parameters are denominated in LINK tokens. 

We add the following lines to the `getOrCreateAnvilEthConfig` function:

```javascript
        uint96 baseFee = 0.25 ether; // To be understood as 0.25 LINK
        uint96 gasPriceLink = 1e9; // 1 gwei LINK

        vm.startBroadcast();
        VRFCoordinatorV2Mock vrfCoordinatorV2Mock = new VRFCoordinatorV2Mock(
            baseFee,
            gasPriceLink
        );
```

Amazing! Now that we have everything we need, let's perform the return, similar to what we did in `getSepoliaEthConfig`.
```javascript
        return NetworkConfig({
            entranceFee: 0.01 ether,
            interval: 30, // 30 seconds
            vrfCoordinator: address(vrfCoordinatorV2Mock),
            gasLane: 0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae,
            subscriptionId: 0, // If left as 0, our scripts will create one!
            callbackGasLimit: 500000 // 500,000 gas
        });
```

Great! Now this is fixed let's continue testing and deploying our Raffle contract.