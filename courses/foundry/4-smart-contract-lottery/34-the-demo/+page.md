---
title: Testnet Demo... The Demo
---

_Follow along with this lesson and watch the video below:_



---

Being able to deploy smart contracts to a real testnet is a crucial skill for any blockchain developer. If you ever find yourself at a loss trying to deploy your contract, this comprehensive guide has got you covered. We will be deploying a contract onto network Sepolia, using a makefile that conveniently eliminates the need for running `source .env`. Ultimately, we will interact with our live contract directly on Etherscan!

## The Deployment and Verification Process

Initiate the deployment by using the `make deploy` code. The deployment will result in a series of logs being printed out, reassuring you about the success of the scripts. The transactions will then appear on-chain, marked by the statement `Execute. Completely successful.`.

```bash
make deploy ARGs="--network sepolia"
```

### Addressing Foundry

As of the time of writing, Foundry, a development tool for Substrate, has a known bug where it deploys libraries along with on-chain deployments.

### Accessing the Contract on Sepolia

The second contract address on Sepolia can be accessed by pasting it on the given network. Once navigated to the contract, you should find it already verified.

### Understanding Chainlink

Navigating to VRF Chainlink Sepolia 1893, if you have already subscribed and funded, you will find your latest consumer already added. In our case, it was the raffle contract we had just launched.

Don't forget: for the contract to work, ensure you have sufficient LINK in your deploying wallet!

```bash
VRF Chainlink Sepolia 1893
```

## Write More Interactions for Your Contract

Once the contract is deployed, new interactions can be written, examples being `enter lottery`, `wait for a winner`, etc. Ethereum's Etherscan allows for connecting and interacting directly with contracts on the platform.

This guide focuses on using Etherscan, but for those who prefer good ol' Badass, the `cast` command works perfectly fine too.

### Coming Face-to-Face with Raffle

Under the "write contract" tab on Etherscan, connect to Web3 and navigate to the `enter raffle` command. Select `write contract` and enter the amount you'd like for the transaction.

Go to the `read contract` to check the contract's current state. Here, you can view the `recent winner`, `players`, `raffle state`, `entrance fee`, amongst other variables.

### Registering a New Upkeep with Chainlink

Create and register a new upkeep on Chainlink, either manually or programmatically. Connect your wallet and fill in the contract address. After entering the desired `gas limit` and `starting balance`, click on 'register'.

The reason we have to register again is because our raffle has a `check upkeep` and `perform upkeep`, which can be called by anyone provided the conditions are met. To have the Chainlink network automatically perform these functions without interaction, create a subscription with Chainlink's network.

A subscription can be set up on-chain and would be added to the active drawing upon sufficient funding. The Chainlink VRF would kick off when `performupkeep` runs.

### Checking the Recent Winner

While waiting for the VRF response, head back to the contract on Etherscan. Click 'refresh', connect to Web3 again, and scroll down to find the `recent winner`.

<img src="/foundry-lottery/34-demo/demo1.png" style="width: 100%; height: auto;">

Alternatively, transactions can be sent via Cast, which can be added to our makefile. Use the `cast call` command for calls not needing transaction publication. For the `get recent winner` parameter, use the `cast call` command. Don't forget the RPC URL, which in our case, is the Sepolia RPC URL.

```bash
cast call --help
```

```bash
cast call [Lottery Address]
```

```bash
source .env
```

With the contract address copy-pasted, the result is zero-padded. By trimming off the excess zeroes, you can confirm that it is indeed your contract address. Congratulations, you won your own lottery!
