---
title: Third Web Deploy
---

_Follow along the course with this video._



---

# Secure Contract Deployment with Third Web

When developing on a blockchain, you inevitably come across challenges – like managing private keys in plaintext – that can potentially compromise the security of your solution. Third Web Deploy, a product of Third Web, offers a hassle-free and secure solution to such challenges.

Kira from the Third Web team has provided a comprehensive overview of how Third Web can help you effortlessly deploy contracts on any EVM chain that you prefer. For those unfamiliar with the `npx` command, it comes pre-bundled with the node.js and NPM installation. You can refer to our GitHub repository to learn more. Now, let's dive into Ciara’s explanation.

<img src="/foundry/17-thirdweb/thirdweb1.png" style="width: 100%; height: auto;">

## Easy Contract Deployment with a Single Command

To deploy a contract, generally, you would need to set up hardcoded private keys as well as RPC URLs, and they need some level of scripting. However, with Third Web, you can surpass all these tedious steps for deployment. Since you're not exporting your private key in this process, it enhances your contract's security significantly.

The deployment process happens through a dashboard UI, enabling you to manage everything right from your wallet. Let's walk through the process of deploying contracts with Third Web.

## Deploying Contracts with Third Web

Suppose you have already cloned a repository, or maybe you've written your contract. This could be any contract; for this walkthrough, I've cloned a simple storage contract.

For this contract, there's no `.env` file, no RPC URL setup, and I haven't exported my private key. This is one of the fantastic aspects of Third Web - there is absolutely no pre-installation needed, no dependencies whatsoever, making the entire process much more straightforward and less time-consuming.

To commence the deployment, all you need to do is run the simple command `npx thirdweb deploy`.

## What Happens When You Deploy

On executing this command, Third Web will ascertain the project type, compile contracts, and permit you to choose the contract you wish to deploy. In this demonstration, I am deploying a simple storage contract.

This action leads to the contract metadata getting uploaded to IPFS, resulting in automatic contract verification. For those interested in a more in-depth explanation of this mechanism, please visit the [Third Web Developer Docs](https://portal.thirdweb.com/deploy).

<img src="/foundry/17-thirdweb/thirdweb2.png" style="width: 100%; height: auto;">

Following these steps, a browser tab will open where you can deploy your contract through a front-end interface. In circumstances where construct params are required (they aren't in this case), you'll be able to fill them out directly.

Next, you select the chain you wish to deploy to. Third Web supports all EVM networks, from the popular ones like Base to custom networks if they aren't listed already. In this case, I selected the Mumbai network for deployment.

This process triggers two transactions – one, a transaction to deploy the contract, and two, a gasless message that you sign. This message adds your contract to your dashboard, providing a user-friendly interface to interact with the contract, very similar to Remix.

Once these transactions are completed, your contract is successfully deployed, as simple as that!

## Navigating Third Web's Dashboard

On successful deployment, the contract address will be visible, which you can copy for future use. The dashboard also offers several features for easy contract management:

- The **Build tab** facilitates effortless front-end interface creation for contracts with easy-to-use hooks in various languages.
- The **Explorer tab** allows you to view the read and write functions on your contract, all functions you have in your contract are listed here.
- You can also monitor the events related to your contract and even access the source code.

<img src="/foundry/17-thirdweb/thirdweb3.png" style="width: 100%; height: auto;">

In a nutshell, Third Web provides a swift, easy, and secure way to deploy contracts. It's a one-stop-shop for your web three development needs with multiple language SDKs, prebuilt contracts, and a solid infrastructure for all your web3 development requirements.

For more information, visit [Third Web](https://www.thirdweb.com/) or refer to their detailed [Documentation](https://docs.thirdweb.com/).

<img src="/foundry/17-thirdweb/thirdweb4.png" style="width: 100%; height: auto;">
