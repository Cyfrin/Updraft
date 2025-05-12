---
title: Deploy a smart contract locally using Ganache
---

_Follow along with this video:_


### Deploying a smart contract

There are multiple ways and multiple places where you could deploy a smart contract.

While developing using the Foundry framework the easiest and most readily available place for deployment is Anvil.

Anvil is a local testnet node shipped with Foundry. You can use it for testing your contracts from frontends or for interacting over RPC.

To run Anvil you simply have to type `anvil` in the terminal.

::image{src='/foundry-simply-storage/10-deploy-a-smart-contract-locally-using-ganache/Image1.PNG' style='width: 75%; height: auto;'}

You now have access to 10 test addresses funded with 10_000 ETH each, with their associated private keys.

This testnet node always listens on `127.0.0.1:8545` this will be our `RPC_URL` parameter when we deploy smart contracts here. More on this later!

More info about Anvil is available [here](https://book.getfoundry.sh/reference/anvil/).

Please press `Ctrl/CMD + C` to close Anvil.

Anvil will be used throughout the course to deploy and test our smart contracts, but before that, let's quickly check an intermediary step.

### Ganache

_Ganache is a glaze, icing, sauce, or filling for pastries usually made by heating equal parts weight of cream and chopped chocolate, warming the cream first, then pouring it over the chocolate._

Wait, not that ganache! The other ganache:

Ganache is a personal blockchain for rapid Ethereum and Filecoin distributed application development. You can use Ganache across the entire development cycle; enabling you to develop, deploy, and test your dApps in a safe and deterministic environment.

Better!

Please download Ganache from [here](https://archive.trufflesuite.com/ganache/).

For people using Windows WSL please read [this](https://github.com/Cyfrin/foundry-simple-storage-f23?tab=readme-ov-file#windows-wsl--ganache). Using Ganache in this environment is not the easiest thing to do. We are not going to use this in the future, so don't worry if you can't configure it properly.

Hit `Quickstart Ethereum`. Voila! A brand new blockchain. We get some addresses, that have balances and private keys.

### Configuring MetaMask

To deploy to a custom network (like your localhost), you'll need MetaMask. MetaMask is a popular cryptocurrency wallet and browser extension that allows users to interact with the Ethereum blockchain and its ecosystem. If you don't have it download it from [here](https://metamask.io/download/)

Follow these steps:

1. Open MetaMask.

2. Click the three little dots and select 'Expand View'.

3. Go to 'Settings', then 'Networks'.

4. Here, you'll see the list of networks (Ethereum, Mainnet, etc.) with plenty of details about each one. Locate the RPC URL - this is key.

The RPC URL is essentially the endpoint we make API calls to when sending transactions. For every blockchain transaction you execute, you're making an API to whatever is in here.
To send a transaction to your custom blockchain, you need to add it as a network:

1. Click on 'Add a Network'

2. Scroll to the bottom of the list of networks.

3. Hit 'Add a Network manually'.

4. Enter the details of your local network

   Network name: `Localhost`

   New RPC URL: Ganache`http://127.0.0.1:7545` or Anvil `http://127.0.0.1:8545` (make sure you always add `http://`) - these two could differ on your machine, please consult the Ganache UI or Anvil terminal for the exact RPC URL.

   Chain ID: Ganache `5777`(sometimes `1337`) or Anvil `31337` - these two could differ on your machine, please consult the Ganache UI or Anvil terminal for the exact Chain ID.

   Currency symbol: ETH

   Block explorer URL: - (we don't have a block explorer for our newly created blockchain, which will most likely disappear when we close the VS Code / Ganache app)

Great! Now that we configured our local network, the next step is to add one of the accounts available in Ganache or Anvil into our MetaMask. [This is done as follows](https://support.metamask.io/hc/en-us/articles/360015489331-How-to-import-an-account#h_01G01W07NV7Q94M7P1EBD5BYM4):

1. Click the account selector at the top of your wallet.

2. Click `Add account or hardware wallet`.

3. Click `Import account`

4. You will be directed to the Import page. Paste your Ganache/Anvil private key. Click `Import`.

**NOTE: Do not use this account for anything else, do not interact with it or send things to it on mainnet or any other real blockchain, use it locally, for testing purposes. Everyone has access to it.**

Next up we shall talk more about adding a new network to MetaMask.
