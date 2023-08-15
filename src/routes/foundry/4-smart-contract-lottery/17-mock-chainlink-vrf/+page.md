---
title: Mock Chainlink VRF
---

_Follow along with this lesson and watch the video below:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/2LwfdDw43Bk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Greetings, everyone! If you've been following our journey so far, you may recall that we recently moved from creating and running code completely on a chain from scratch, like Sepolia, to trying it out on a forked testnet. Now, our exploration takes us further. The question before us today is -

<img src="/foundry-lottery/17-mock/mock1.png" style="width: 100%; height: auto;">

## The Battle Preparations

To start with, we need several different contracts. At the very least, we definitely need a VRF (Verifiable Random Function) Coordinator. So, let's dive in and see how we can deploy our own VRF Coordinator.

In our Lib folder `chainLink-brownie-contracts/contracts/SRC/0.8`, we can start looking for this significant VRF code. This is where we'll find a treasure trove of mocks.

## Unveiling the Mocks

In fact, there's a specific folder titled `VRFCoordinatorV2Mock` amongst these mocks. The brilliance here is that we can directly use this in our tests, instead of crafting one ourselves. Chainlink VRF has indeed done the job for us.

Hence, let's exploit this VRF Coordinator v Two mock that is already in place. The next step in our process is to deploy this mock, which leads us to...

## Deploying the Mock

We can find the import pathway in the location `@chainlink/contracts/src/v0.8/mocks/VRFCoordinatorV2Mock.sol`.

With that, we are now equipped to deploy it using a ` vm.stopBroadcast();`. This is vital to deploy to any network.

## Constructor Parameters

Delving into the VRF Coordinator, we are made aware that it requires two important parameters - a base fee and a gas price link. For all your Chainlink VRF interactions, payments are made in Chainlink tokens or link tokens. That is the fundamental principle we are operating upon here.

The base fee encapsulates a flat fee, while the gas price link represents the amount of link tokens gained for each additional piece of gas you use. It is crucial to remember that when the Chainlink node calls back, the Chainlink node is responsible for the gas costs, and it gets reimbursed in link tokens, based on the gas price link parameter.

## Wrapping Up

And voila! We’ve successfully set up a Sepolia config and an anvil config with our mock contracts. The primary variation between Sepolia and Anvil is the different VRF coordinator mocks. This might be a challenging venture if one is new to the crypto world, but with time, patience and a tutorial like this, it becomes more accessible. Tune in next time for more exciting exploration of decentralized digital wonders!

Stay curious, stay knowledgeable and happy coding!
