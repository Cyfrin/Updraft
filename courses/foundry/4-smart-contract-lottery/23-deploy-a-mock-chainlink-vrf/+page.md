---
title: Deploy a mock Chainlink VRF
---

_Follow along with this video:_

---

### Chainlink VRF mock contract

A mock contract is a type of smart contract used in testing and development environments to simulate the behavior of real contracts. It allows us to create controlled and predictable scenarios for testing purposes without relying on actual external contracts or data sources. Moreover, it facilitates testing using Anvil, which is extremely fast and practical in comparison to a testnet.

In the last lesson, we stopped on `HelperConfig.s.sol`:

```solidity
function getOrCreateAnvilEthConfig()
    public
    returns (NetworkConfig memory anvilNetworkConfig)
{
    // Check to see if we set an active network localNetworkConfig
    if (localNetworkConfig.vrfCoordinator != address(0)) {
        return localNetworkConfig;
    }
}
```

We need to treat the other side of the `(localNetworkConfig.vrfCoordinatorV2 != address(0))` condition. What happens if that is false?

If that is false we need to deploy a mock vrfCoordinatorV2_5 and pass its address inside a `NetworkConfig` that will be used on Anvil. 

Please use your Explorer on the left side to access the following path:

`foundry-smart-contract-lottery-cu/lib/chainlink/contracts/src/v0.8/vrf/`

Inside you'll find multiple folders, one of which is called `mocks`. Inside that folder, you can find the `VRFCoordinatorV2_5Mock` mock contract created by Chainlink.

Add the following line in the imports section of `HelperConfig.s.sol`:

```solidity
import {VRFCoordinatorV2_5Mock} from "chainlink/src/v0.8/vrf/mocks/VRFCoordinatorV2_5Mock.sol";
```

Amazing! Now let's keep on working on the `getOrCreateAnvilEthConfig` function. We need to deploy the `vrfCoordinatorV2_5Mock`, but if we open it we'll see that its constructor requires some parameters:

```solidity
contract VRFCoordinatorV2_5Mock is SubscriptionAPI, IVRFCoordinatorV2Plus {
    uint96 public immutable i_base_fee;
    uint96 public immutable i_gas_price;
    int256 public immutable i_wei_per_unit_link;
}
```

The `i_base_fee` is the flat fee that VRF charges for the provided randomness. `i_gas_price` which is the gas consumed by the VRF node when calling your function. `i_wei_per_unit_link` is the LINK price in ETH in wei units. Given the way it's structured the callback gas is paid initially by the node which needs to be reimbursed.

We add the following lines to the `getOrCreateAnvilEthConfig` function:

```solidity
/* VRF Mock Values */
uint96 public constant MOCK_BASE_FEE = 0.25 ether;
uint96 public constant MOCK_GAS_PRICE_LINK = 1e9;
int256 public constant MOCK_WEI_PER_UNIT_LINK = 4e15;

vm.startBroadcast();
VRFCoordinatorV2_5Mock vrfCoordinatorMock = new VRFCoordinatorV2_5Mock(
    MOCK_BASE_FEE,
    MOCK_GAS_PRICE_LINK,
    MOCK_WEI_PER_UNIT_LINK,
);
vm.stopBroadcast();
```

Amazing! Now that we have everything we need, let's perform the return, similar to what we did in `getSepoliaEthConfig`.
```solidity
return NetworkConfig({
    entranceFee: 0.01 ether,
    interval: 30, // 30 seconds
    vrfCoordinator: address(vrfCoordinatorMock),
    // gasLane value doesn't matter.
    gasLane: 0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae,
    subscriptionId: 0,
    callbackGasLimit: 500_000,
});
```

Great! Now this is fixed let's continue testing and deploying our Raffle contract.
