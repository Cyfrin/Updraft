---
title: Create Subscriptions
---

_Follow along with this lesson and watch the video below:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/oLvQR5FNCu0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Have you ever encountered an `invalid consumer error` while deploying your raffle contracts using Chainlink VRF? Maybe you aren't familiar with the subscription model that Chainlink VRF uses, or perhaps you're uncertain about testing your contract. In this post, we'll guide you through the process of deploying raffle contracts, creating and funding a subscription, and adding a raffle contract as a consumer to the subscription.

By the end of this tutorial, you should be able to handle Chainlink VRF deployment with confidence. Let's dive right in!

## Debugging: Invalid Consumer Error

Let's start by adding some variables to see what's causing the problem. After adding five variables, we encountered an `invalid consumer error` on our VRF Coordinator mock. On opening the `VRFCoordinatorV2Mock.sol` file, we discovered a modifier named `only valid consumer`.

This modifier only allows operations if a consumer is added. This requirement hints at the subscription model that Chainlink VRF uses.

Here’s a brief overview of the Chainlink VRF subscription model. When working with it, you'll need to follow these steps:

1. Create a subscription
2. Fund the subscription
3. Add the raffle contract as a consumer to the subscription

The subscription model prevents random people from using your subscription. We learned this process by watching a video walkthrough that demonstrates how to perform all these steps via UI.

## Improving the Deployment Script

Our existing deployment script needs to ensure a valid subscription upon deployment. Each raffle contract we deploy needs to be added as a consumer to our subscription. On a real test network (testnet), we can perform these operations in the UI. However, for testing purposes, we need to do this programmatically.

Rather than tweaking the VRF Coordinator mock to automatically add a consumer, we opted for a more thorough solution. Refactoring our `DeployRaffle.s.sol` script allows us to run tests to simulate real usage. We're going to implement this process step-by-step below.

## Refactoring to Create Subscription

The first change we make is to check the subscription ID. If it's absent or defaults to zero, calls to the function won't go through. We need a valid subscription ID from the helper configuration or from creating a new subscription manually.

The script below can identify whether we have a subscription ID or not:

```javascript
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

The rest of the `DeployRaffle.s.sol` script will be housed in the `Interactions.s.so` contract, which includes a `createSubscription` function:

```javascript
 function createSubscription(
        address vrfCoordinatorV2,
        uint256 deployerKey
    ) public returns (uint64) {
        console.log("Creating subscription on chainId: ", block.chainid);
        vm.startBroadcast(deployerKey);
        uint64 subId = VRFCoordinatorV2Mock(vrfCoordinatorV2)
            .createSubscription();
        vm.stopBroadcast();
        console.log("Your subscription Id is: ", subId);
        console.log("Please update the subscriptionId in HelperConfig.s.sol");
        return subId;
    }
```

For the `createSubscription` function, we'll be using the helper `config` to get the `VRF Coordinator` address, allowing us to create the subscription.

To call the `CreateSubscription` function, we use a `broadcast`. This action calls the `createSubscription` function on the `VRFCoordinator` mock:

```javascript
CreateSubscription createSubscription = new CreateSubscription();
subscriptionId = createSubscription.createSubscription(
    vrfCoordinatorV2,
    deployerKey
);
```

<img src="/foundry-lottery/22-subscriptions/subscription1.png" style="width: 100%; height: auto;">
