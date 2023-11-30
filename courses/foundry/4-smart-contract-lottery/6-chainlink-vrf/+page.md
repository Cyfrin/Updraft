---
title: Chainlink VRF
---

_Follow along with this lesson and watch the video below:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/A8obi954JXU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Welcome! It's time to explore the tech behind **random number generation** on the blockchain using Chainlink VRF! This post will walk you through the concepts, step by step, aided by a helpful video from Chainlink team. By the end, you will understand how to use Chainlink VRF to draw a random winner for your dApp.

## What is Chainlink VRF?

VRF stands for **Verifiable Random Function**, a technology that enhances cryptographic capabilities. Chainlink's implementation provides developers with improved scalability, flexibility, and usability. According to Richard, a developer advocate at Chainlink Labs, a key element of VRF is its **subscription model**.

<img src="/foundry-lottery/6-chainlink-vrf/vrf1.png" style="width: 100%; height: auto;">

## Walkthrough: Integrating Chainlink VRF

To wrap our heads around Chainlink VRF, we'll follow a well-detailed example using the Chainlink Labs documentation and one of their setup tutorials. This guide will help you:

- Understand Chainlink VRF.
- Create and fund a subscription.
- Deploy a contract that uses VRF.
- Make a request to draw a random number.

### Getting Started with Chainlink VRF

Jump into the [Chainlink Documentation](https://docs.chain.link/) and navigate to the **VRF section**. In this guide, we're skipping everything else to focus on obtaining a random number.

### Create &amp; Fund a Subscription

To use Chainlink VRF, you need to establish a subscription, which you can visualize as a bucket from which your contracts extract. Navigate to the **Subscription Manager** and create your subscription; you can input an email and project name for personalization.

The process requires confirmation on a **test network**. For simplicity, this guide uses the Sepolia test network referenced in most Chainlink documentation.

If you don’t already have ETH and link tokens, you can secure them from [Chainlink Faucets](https://faucets.chain.link/).

Once you've got your tokens, add funds to the subscription (e.g., 5 link tokens).

### Adding VRF Consumers

At this point, you've created your subscription, poured in funds, and are ready to deploy your contract.

You need to let your subscription know about the contract you're deploying and vice versa. To help them work in synchrony, you add consumers to your subscription.

<img src="/foundry-lottery/6-chainlink-vrf/vrf3.png" style="width: 100%; height: auto;">

### Deploying a Chainlink VRF Contract

Return to the Chainlink documentation and click to open **Remix**, a development environment that enables you to deploy and interact with your contract on the blockchain.

The Chainlink VRF contract comprises various components:

- **Contract imports**: Coordinator interface, Consumer base and Confirmed owner.
- **Contract variables**: Subscription ID, Request IDs, Key hash, and more.
- **Functions**: `RequestRandomWords()`, `FulfillRandomWords()`, `getStatusRequest()` etc.

The ultimate objective is to use the `RequestRandomWords()` function to call for random values from the Oracle network. Once those values are ready, the `FulfillRandomWords()` function allows you to process those values back in your contract.

To deploy the contract, specify your **subscription ID** and approve the transaction.

<img src="/foundry-lottery/6-chainlink-vrf/vrf2.png" style="width: 100%; height: auto;">

### Making a Request

Once you've deployed your contract, copy its address and register it as a consumer in your subscription.

Back in Remix, call the `RequestRandomWords()` function and confirm.

Your request will show as pending on the Subscription page. Completion times can vary based on the number of block confirmations you specified and the network you're using.

### Confirming Request Completion

To check whether your request has been fulfilled, copy the ID from `lastRequest()` function, then use `getStatusRequest()` to get the current status.

)Once your request is marked as 'Fulfilled,' you've successfully drawn ! your random values using Chainlink VRF.

The transcript calls a wrap at this point, but now that you know how to generate random numbers on the blockchain, the opportunities are limitless. You can assign random traits to NFTs, determine game asset allocations, and so much more.

_Please note: Cloud-based RNGs are not recommended for high-value use-cases and a combination of on and off-chain RNGs can offer a robust solution._

That was it for todays lesson! I hope you enjoyed it and learned something new. If you have any questions, don't forget to ask on the Github Forum.
