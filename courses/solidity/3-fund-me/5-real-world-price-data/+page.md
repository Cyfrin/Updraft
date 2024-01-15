---
title: Real World Price Data
---

*Follow along this chapter with the video bellow*




With the advancement of blockchain technology and the increasing integration of decentralized finance (DeFi) platforms, the need to accommodate a range of digital currencies has exploded. Allowing users to transact in their preferred digital coinage not only enhances the user experience, but also broadens the market reach of your platform. This lesson will walk you through the steps to adding currency conversion features and setting price thresholds in your smart contracts with Chainlink Oracle, a decentralized network for external data.

<img src="/solidity/remix/lesson-4/datafeeds/datafeed1.png" style="width: 100%; height: auto;">


## Updating Our Minimal Contract

Currently, our contract is too simplified. It requires the message value to exceed one full Ethereum (ETH). If we want our users to spend a minimum of $5 instead of one ETH, we will need to update our contract. To specify this new value, add the line `uint256 minimumUSD = 5` at the top of your contract. To make this value public, replace `internal` with `public`. You can optimize this `minimumUSD` later on for a more gas-efficient contract.

For the `fund` function within the contract, change the condition to check if the message value meets or exceeds `minimumUSD`. However, we face a roadblock here. The `minimumUSD` value is in USD while the message value is in terms of ETH. This is the part where we introduce *Oracles*, particularly *Chainlink*, into our code.

## Understanding Decentralized Oracles and Chainlink

In the financial markets, the USD price of assets like Ethereum is externally assigned and does not originate from the blockchain technology itself. Abstracting this price information requires a bridge between the off-chain and on-chain data, which is achieved by using a *decentralized Oracle network* or an Oracle.

<img src="/solidity/remix/lesson-4/datafeeds/datafeed2.png" style="width: 100%; height: auto;">


Blockchain exists in a vacuum, ignorant of real-world data and occurrences. It doesn't inherently know the value of ETH or other external data like the weather or a random number. This limitation is due to its deterministic nature that allows all nodes to reach a consensus without diverging or causing conflicts. Attempting to introduce external and variable data or results of API calls will disrupt this consensus, resulting in what is referred to as a *smart contract connectivity issue* or *the Oracle problem*.

## Chainlink and Blockchain Oracles

In order for our smart contracts to replace traditional understandings of agreement, they must be able to interact with real-world data. This is achievable with Chainlink and blockchain Oracles. A blockchain Oracle serves as a device that broadcasts off-chain data or computations to the smart contracts.

It's not enough to cascade data through a centralized Oracle because that reintroduces failure point. Centralizing our data source contradicts our goal of decentralization and potentially jeopardizes the trust assumptions that are vital to the operations of blockchains. Consequently, centralized nodes make poor sources for external data or computation capacity. Chainlink provides a solution to these centralized problems.

## How Chainlink Works

Chainlink is a modular, decentralized Oracle network that enables the integration of data and external computation into our smart contracts. As mentioned earlier, hybrid smart contracts are highly feature-rich and powerful applications that combine on-chain and off-chain data.

With Chainlink, we discard the idea of making HTTP calls on blockchain nodes to an API endpoint. These nodes cannot make HTTP calls without breaking consensus. Instead, we assign a network of decentralized Chainlink Oracles the job of delivering data to our smart contracts.

Chainlink networks offer flexibility in that they can be configured to deliver any data or execute any external computation at will. Although it requires some work to achieve this level of customization, Chainlink offers ready-made features that can be added to your smart contract applications. Let's go over these features.

## Chainlink Data Feeds

Responsible for powering over $50 billion in the DeFi world, Chainlink data feeds are arguably the most utilized feature. This network of Chainlink nodes sources data from various exchanges and data providers, with each node independently evaluating the asset price.

They aggregate this data and deliver it to a reference contract, price feed contract, or data contract in a single transaction. These contracts contain the pricing information that powers DeFi applications.



## Chainlink Verifiable Randomness Function (VRF)

Next up is the Chainlink VRF, a solution for generating provably random numbers. This feature ensures fairness in applications, randomizing NFTs, lotteries, gaming, and more within the blockchain environment. These numbers can't be manipulated as they are determined outside of the blockchain.

<img src="/solidity/remix/lesson-4/datafeeds/datafeed3.png" style="width: 100%; height: auto;">


## Chainlink Keepers

Another great feature is Chainlink's system of keepers—nodes that listen to a registration contract for specific events. Upon detection of triggers that have been programmed into the contract, these nodes perform the intended actions.

Finally, *Chainlink Functions* offer an extreme level of customization—it allows making API calls in a decentralized context. It can be used to create novel applications and is recommended for advanced users who have a deep understanding of Chainlink.

## Conclusion

Integrating currency conversion and setting a price threshold in your smart contract is made easy with Chainlink. This decentralized Oracle network not only addresses the 'Oracle problem', but provides a suite of additional features for enhancing your dApp capabilities. With Chainlink, you can create a more user-friendly experience for your blockchain platform users.

We look forward to seeing you unleash the true potential of your smart contracts and how to implement Chainlink in your dApps.