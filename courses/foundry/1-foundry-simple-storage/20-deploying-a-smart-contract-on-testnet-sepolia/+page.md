---
title: Deploying a smart contract on testnet (Sepolia)
---

_Follow along with this video:_

---

### Deploying our Contract to Testnet or Live Network with Foundry and Alchemy

Until now, all the deployments we made were either on Ganache or Anvil, i.e. locally hosted blockchains. Let's upgrade our game! Let's deploy on a real testnet that mimics Ethereum. Let's deploy on Sepolia.

Before we can do that we need an RPC URL for Spolia, you can get one by running a node, but at the end of the day, not many people want to do that. The solution to this predicament is simple, we could benefit from a free `node as a service`.

We can get this from [Alchemy](https://www.alchemy.com/). Sign up using your preferred way. You will be redirected to Alchemy's dashboard.

How to get the RPC URL we will use in our deployment?

1. Click on `Create new app`;
2. Select the `Ethereum` chain and `Ethereum Sepolia` network;
3. Give it a super nice name;
4. Give it an even nicer description;
5. Click on `Create App`

After you create the app, this will be opened in the dashboard. On the top right click on `API key` and copy the `HTTPS` link:

`https://eth-sepolia.g.alchemy.com/v2/ALotOfLettersAndNumbersHereOMG`

This is similar to the RPC used before in Ganache or Anvil.

Open your `.env`. On a new line declare the newly obtained RPC:
```
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/ALotOfLettersAndNumbersHereOMG
```

Is it enough?

As you guessed ... no.

If you remember correctly, to deploy a smart contract we need to specify the place where to deploy (in our case Sepolia) and an account/private key that is used to sign the transaction and pay the gas fees.

### Setup a new account using MetaMask

Please follow these steps:

1. Click on your MetaMask extension in your favorite browser. Type your password to unlock it.
2. On the top left of the extension change the network to Sepolia - If you don't see it make sure you have the `Show test networks` options ticked.
3. Create a new account. This will only be used for Sepolia, you will never use this account to hold any type of currency that has a monetary value.
4. Copy the private key and paste it on a new line in your `.env`.

```
SEPOLIA_PRIVATE_KEY=YourKeyGoesHere
```
5. Make sure to save your `.env` (else it won't work)

Now we are ready to proceed with the deployment:

Run the following commands in your terminal:

```
source .env
forge script script/DeploySimpleStorage.s.sol --private-key $SEPOLIA_PRIVATE_KEY --rpc-url $SEPOLIA_RPC_URL --broadcast
```

After some time you will get the following output:
```
== Return ==
0: contract SimpleStorage 0x1093560Fe9029c4fB9044AbF2fC94288970D98Db

## Setting up 1 EVM.

==========================

Chain 11155111

Estimated gas price: 3.078892546 gwei

Estimated total gas used for script: 464097

Estimated amount required: 0.001428904793920962 ETH

==========================
##
Sending transactions [0 - 0].
⠁ [00:00:00] [##########################################################################################] 1/1 txes (0.0s)##
Waiting for receipts.
⠉ [00:00:22] [######################################################################################] 1/1 receipts (0.0s)
##### sepolia
✅  [Success]Hash: 0xe3a0c43089b7a24e999a41955428baf9944838844bb2d5e41a19f5e54150c43b
Contract Address: 0x1093560Fe9029c4fB9044AbF2fC94288970D98Db
Block: 5732055
Paid: 0.000716053418369952 ETH (357088 gas * 2.005257579 gwei)



==========================

ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.
```

This indicates we successfully deployed our contract on Sepolia ... but how can we be sure?

Go on [Sepolia Etherscan](https://sepolia.etherscan.io/) and search for the contract address or the transaction hash provided in the terminal output.

In my case: https://sepolia.etherscan.io/address/0x1093560Fe9029c4fB9044AbF2fC94288970D98Db

You can go back to your App in Alchemy Dashboard to see that you've sent some requests, confirming that we've successfully interacted with Sepolia.