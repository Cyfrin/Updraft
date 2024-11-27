---
title: Alchemy & The Mempool
---

_Follow along the course with this video._



---

## Alchemy: A Game Changer for Decentralized Application Development

Innovation in the blockchain industry has come a long way, with powerful tools making their way into the ecosystem to support developers and bring efficiency to their workflows. Among these tools is Alchemy, and today we have Vito, the lead developer experience at Alchemy, to walk us through the platform, its features, and how you can leverage it to exponentially increase your productivity.

## What is Alchemy?

Alchemy is a platform equipped with APIs, SDKs, and libraries to enhance your developer experience while working on Web3 projects. Think of Alchemy as the AWS of Web3. It functions as a node provider and developer tooling platform predominantly used in thousands of Web3 and Web2 applications, including large Web2 corporations like Adobe, Shopify, and Stripe.

The need for platforms such as Alchemy arises from the fact that, as a developer, you don't usually have to worry about running the servers your code operates on or developing the deployment and integration pipelines for your application. Instead, you use services such as AWS, Azure, and Google Cloud for that—Alchemy does the same but for Web3.

## How Does Alchemy Work?

Alchemy enhances your developer experience through a combination of features. The platform's primary component is the _Supernode_, a proprietary blockchain engine that works as a load balancer on top of your node.

Like its name suggests, the Supernode ensures data from the blockchain is always up-to-date and readily available. Using the Supernode as a foundation, Alchemy has built the _Enhanced APIs_—a set of APIs that makes pulling data from the blockchain a breeze.

To put it simply, the Alchemy Supernode sits at the core of its ecosystem, powering up functionalities like Enhanced APIs and monitoring tools while supporting multiple chains.

What follows is a step-by-step guide on how to create a new account on Alchemy and leverage this platform to its full extent:

## Creating a New Account on Alchemy

Creating an account on Alchemy is not only easy but also completely free. You can also freely scale your applications up using the platform's generous premium plans.

#### Step 1: Navigate to Alchemy.com

Head over to [Alchemy.com](https://www.alchemy.com/) and create a new account.

#### Step 2: Create a New Application

Once you have signed in, create a new application.

Next, give your application a name and a description. Then, select a chain and network. Alchemy currently supports the majority of EVM-compatible chains, including:

- Ethereum
- Polygon PoS
- Polygon zkEVM
- Optimism
- Arbitrum
- Solana (non-EVM chain)

## The Application-Specific Dashboard

Once your application is up and running, you will have access to the application-specific dashboard. This dashboard provides crucial insights into your application and infrastructure health, such as latency, compute units, and transaction success rate, which can be valuable for debugging and identifying issues.

If you observe a lower success rate for your transactions, go to the "Recent Invalid Request" tab. This will list all unsuccessful requests along with the reasons for their failure, making it easier for you to debug and fix issues.

::image{src='/foundry/22-alchemy/alchemy1.png' style='width: 100%; height: auto;'}

## Mempool Watcher

Another powerful tool provided by Alchemy is the Mempool watcher. Picture it as Ethereum's mempool, where all pending transactions reside waiting for validation or mining.

The Mempool watcher provides extensive details about your transactions, such as:

- Transaction status (mined, pending, dropped, replaced)
- Gas used
- Time taken for validation
- Transaction value
- Sender's and receiver's address

This detailed transaction tracking allows you to have a better understanding of each transaction and aids immensely in debugging specific issues related to individual transactions.

## Wrapping Up

To sum up, Alchemy is a revolutionary platform that brings a plethora of tools to aid your Web3 development experience. From Supernode to Enhanced APIs and crucial troubleshooting tools, Alchemy is undeniably a game changer in the world of decentralized applications.

"Alchemy can be a powerful asset to any blockchain developer, offering a simplified experience in an inherently complicated Web3 environment." – Vito, Lead Developer Experience at Alchemy.

Vito suggests that you check out Alchemy's [documentation](https://docs.alchemy.com/) to explore more about the platform, its APIs, SDKs, libraries, and tools. Also, don't forget to follow them on Twitter at [@AlchemyPlatform](https://twitter.com/alchemyplatform) and [@AlchemyLearn](https://twitter.com/alchemyLearn). And if you want to connect directly with Vito, feel free to reach out to him on Twitter at [@VitoStack](https://twitter.com/VittoStack).

Alchemy is revolutionizing the landscape of blockchain development and making it more accessible and efficient for everyone involved. Happy building with Alchemy!
