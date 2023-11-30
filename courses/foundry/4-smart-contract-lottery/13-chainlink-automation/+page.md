---
title: Chainlink Automation Introduction
---

_Follow along with this lesson and watch the video below:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/6-bmw6VHZ6Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

We've been working towards building a lottery application with Chainlink VRF to handle the randomness needed to pick a winner. So far, we've developed a `Pick Winner` function which initiates a Chainlink VRF call and carries out the `fulfill` function to generate a random number and select a winner from the lot. However, the current flow has an issue; the `Pick Winner` function isn’t called automatically - leaving it up-to manual intervention.

This is where the beauty of automation kicks in. As software engineers, we aim for efficient and effective solutions. Speaking of efficiency, I’d like to introduce you to **Chainlink Automation**, which will allow us to automatically run our `Pick Winner` function.

## Using Chainlink Automation

The [Chainlink documentation](https://docs.chain.link/chainlink-automation/introduction) provides a wealth of information when it comes to automation. We can access guides from the `Automation` tab present on the left-hand panel. For our purpose, we'll be exploring the `Time Based` automation and `Custom Logic` sections.

Although this guide shows how to work with Chainlink from the UI, we will be primarily approaching this programmatically - remaining true to our prudent working style!

If we scroll down, we can find an example of a contract named `Create Compatible Contracts` suitable for use with Chainlink automation. Either you can try it out in the Remix IDE yourself or we can collectively go through a video where Richard, one of the developer advocates at Chainlink Labs, explains Chainlink Automation and conducts a demonstration.

## Exploring Automatic Keepers

In this video, Richard provides a walkthrough on updates to Chainlink’s Keepers, starting with how to connect a wallet from the Chainlink Keepers UI, registering a new upkeep, and implementing time-based trigger mechanisms.

The `Keepers Chainlink` page has changed a bit, but it’s quite straightforward. Upon registering a new upkeep, you will find the `trigger` option. As Richard explains, this option is extremely useful for implementing timed-based triggers which was formerly achieved by checking upkeep with block hashes.

After connecting the wallet and setting up the Keepers, the next step is to work on a simple contract known as `Keeper compatible contracts`. If you’ve worked with previous versions, you'll recognize the `check Upkeep function` and `perform Upkeep function`.

## Modifying the Contract

Time to roll up our sleeves and modify this sample contract. As explained, `Remix` is an online IDE for developing solidity smart contracts, which we will be using to modify our existing contract. We aim to create the same functionality in an easier, more readable way.

Starting with a contract count function that doesn’t require any external input, we aim to increment the counter at regular intervals. Notably, with time-based triggers, we can get rid of the `check upkeep` function and `perform upkeep` function.

Upon getting rid of unnecessary functions, the contract is compiled, displaying a green checkmark for successful compilation. From there, constructor values are set and deployed. In this case, the contract was deployed to the `Fuji Avalanche Test Network`.

## Using Keepers in Practice

Next, we head to the `Keepers` interface and fill necessary details like the address of our contract and schedule for triggering in terms of Cron syntax. Post registration, you may need to receive some link tokens - which you can get from the faucet linked from the register page.

After registering and making necessary confirmations, the interface will present a page detailing the upkeep, historical data, and options for editing gas limits or adding more link tokens.

Just like that, using Chainlink Keepers, we're able to automate our smart contracts! Tiny contracts that are easy to understand and cleaner, just how we like them.

<img src="/foundry-lottery/13-automation-intro/automation1.png" style="width: 100%; height: auto;">
