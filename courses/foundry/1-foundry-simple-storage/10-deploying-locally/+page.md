---
title: Deploying to a Local Blockchain
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/IK2irq6_2fw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Deploying Code to a Virtual Environment with Foundry and Anvil

In this lesson, we'll explore how you can deploy your code to a Foundry VM or a JavaScript virtual environment using Foundry, Anvil, and the Ganache Ethereum chain.

## Foundry and Anvil: Built-In Virtual Environment

Foundry comes built-in with a virtual environment in its shell, similar to **Remix**, the integrated development environment (IDE) best known for smart contract development and deployment. Inside the virtual environment of foundry, we use **Anvil** to create a fake available accounts, fully equipped with **fake private keys**, a wallet mnemonic, blockchain details, and an RPC URL, which we'll discuss later.

Here's how to launch the Anvil blockchain:

```bash
anvil
```

To end the session, you can press Ctrl+C or close your terminal.

## Deploying with Ganache

Ganache is a one-click blockchain. It offers a user interface that gives developers easier access to their transactions.

<img src="/foundry/10-deploy-local/deploying1.png" style="width: 100%; height: auto;">

After installing Ganache, you can create a new locally running blockchain by hitting 'Quickstart for Ethereum'. This will generate a list of addresses with individual balances, and dummy private keys.

Here's a glimpse of how Ganache looks:

<img src="/foundry/10-deploy-local/deploying2.png" style="width: 100%; height: auto;">

The Ganache blockchain is temporary; if it's causing any issues, you can always switch back to Anvil.

<img src="/foundry/10-deploy-local/deploying3.png" style="width: 100%; height: auto;">

## Deploying to Custom Networks with MetaMask

To deploy to a custom network (like your localhost), you'll need MetaMask. MetaMask is a browser extension that allows you to run Ethereum dApps (decentralized apps) right in your browser.

Follow these steps:

1. Open MetaMask.
2. Click the three little dots, select 'Expand View'.
3. Go to 'Settings', then 'Networks'.
4. Here, you'll see the list of networks (Ethereum, Mainnet, etc.) with plenty of details about each one. Locate the RPC URL - this is key.

The RPC URL is essentially the endpoint we make API calls to when sending transactions. For every blockchain transaction you execute, you're making an API to whatever is in here.

To send a transaction to your custom blockchain, you need to add it as a network:

1. Scroll to the bottom of the list of networks.
2. Hit 'Add Network'.
3. Enter the details of your local network - the name, RPC URL (you can get this from Ganache or Anvil), chain ID, etc.

<img src="/foundry/10-deploy-local/deploying4.png" style="width: 100%; height: auto;">

4. Save your new network.

Once your network is added, you should be able to switch to it from the dropdown menu. From here, you can import an account by pasting its private key and hitting 'Import'.

And voila! You now know how to deploy code to a virtual environment with Foundry, Anvil, Ganache and MetaMask. Happy coding!
