---
title: Fund Subscriptions
---

_Follow along with this lesson and watch the video below:_



---

## Creating a New Contract

First things first. Head over to the Interactions section, and create a new contract, named `FundSubscription`. This contract script, residing within `interactions.s.sol`, will allow you to select an amount and fund your subscription.

Remember, the amount has to be a `uint96` , but let's keep things simple for now and set a public constant `FUND_AMOUNT` to three ether.

```js
uint96 public constant FUND_AMOUNT = 3 ether;
```

## Setting the Parameters

To fund your subscription, you will need three important elements:

- Subscription ID
- VRF Coordinator V2 address
- Link address

>UPDATE: on the recent versions of Chainlink VRF, the subscription ID is a uint256 instead of a uint64.


Start by specifying the `VRFCoordinator` address and the `uint64` `subId`. The `subID` corresponds to the subscription you want to fund.

```js
HelperConfig helperConfig = new HelperConfig();
        (
            uint64 subId,
            ,
            ,
            ,
            ,
            address vrfCoordinatorV2,
            address link,
            uint256 deployerKey
        ) = helperConfig.activeNetworkConfig();
```

For these configurations, you'll use the already existing `HelperConfig.s.sol`. However, you'll notice, it doesn't yet include a link token. Adding a link token will facilitate funding the subscription as it forms the basis of the contract call.

The link tokens for Sepolia already exist, and they can be easily found and added.

Next, for Anvil, you'll need to deploy a mock link token. To ease the process, simply rewrite the link contract for a newer version of Solidity. This can be easily done using my Foundry smart contract lottery F23.

## Funding the Subscription

Now that the `link_address` is ready, go back to your interactions and create a new function named `fund_subscription`. The function should have three inputs: `VRF_Coordinator`, `sub_ID`, and `link`.

```js
contract FundSubscription is Script {
    uint96 public constant FUND_AMOUNT = 3 ether;

    function fundSubscriptionUsingConfig() public {
        HelperConfig helperConfig = new HelperConfig();
        (
            uint64 subId,
            ,
            ,
            ,
            ,
            address vrfCoordinatorV2,
            address link,
            uint256 deployerKey
        ) = helperConfig.activeNetworkConfig();
        fundSubscription(vrfCoordinatorV2, subId, link, deployerKey);
    }
```

This function works in much the same way as the front-end does to fund subscriptions. However, remember that the VRF Coordinator Mock interacts with the link token transfers in a different way than the actual contract, hence the mock's funding subscription mechanism is different.

When you're testing your code on your local chain, you can call the `VM_Start_Broadcast` function before and `VM_Stop_Broadcast` function after the line of code which contains the `fundSubscriptionUsingConfig` method.

```js
if (subscriptionId == 0) {
            CreateSubscription createSubscription = new CreateSubscription();
            subscriptionId = createSubscription.createSubscription(
                vrfCoordinatorV2,
                deployerKey
            );

            FundSubscription fundSubscription = new FundSubscription();
            fundSubscription.fundSubscription(
                vrfCoordinatorV2,
                subscriptionId,
                link,
                deployerKey
            );
        }

```

Finally, compile all the contracts using forge build. If everything compiles successfully, your contract has been created and is ready to perform transactions!

## A Final Comment

The above steps outline a process whereby you can automate the process of funding blockchain-based subscriptions. Remember, this is not the final product, but an intermediary step in the development of a blockchain-based subscription service. Please do not use this code in a production environment without further testing and validation.

Remember, it's always better to test your code in a secure environment before deploying it. The world of coding is vast, and there's so much more to explore. Happy coding!
