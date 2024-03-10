---
title: Advanced EVM - Opcodes, Calling, and Encoding
---

_Follow along the course with this video._



---

Today, we're embarking on an exciting journey to unveil the mystery behind decoding transaction data using MetaMask. This wallet is used to perform many activities in the cryptocurrency world, but one activity that may seem challenging is the "decoding of transaction data." Here, we explain this process using Wet, a contract that wraps native ETH into an ERC-20 token.

## Setting up MetaMask

The first step in our journey is as easy as pie. It's the setup phase which calls for the connection to MetaMask. Here, we will be using the Sepolia Contract, as it is one of the existing contracts.

For this stage, all you need to do is:

1. Navigate to your contract.
2. Click on "Write Contract."
3. Connect to web3 and open up your MetaMask.

In this scenario, we will be calling the "Transfer From" function. As an aside, you should note that at times, MetaMask may fail to identify the function you are trying to call—this is where the fun begins.

<img src="/foundry-nfts/19-evm/evm1.png" style="width: 100%; height: auto;">

## Variance Check

From there, you need to verify if your transaction data is accurate.

To do this, you decode the function you’re calling and its parameters by pasting the hex string from the transaction into the call data decode command.

When you complete these steps, MetaMask will display your decoded data. This data keeps the essence of your transaction, the information about the function you're calling and the parameters it utilizes.

<img src="/foundry-nfts/19-evm/evm2.png" style="width: 100%; height: auto;">

## Performing Transactions Safely

The said steps are applicable when performing transactions of any form in the cryptocurrency world.

### An example:

Let's say you wish to swap ETH for a token using Uniswap. After initiating the "swap" process, MetaMask shows you a transaction, but are you sure it's the transaction you want to make?

To confirm, you follow the steps previously outlined:

1. Check your contract addresses.
2. Read the function of the contract.
3. Check the function selector.
4. Decode the call data parameters.

By doing so, you can be utterly sure your wallets are performing the expected transactions.

Meanwhile, it's important to note that some upcoming projects like Fire are working on the creation of wallets that can automatically decode transaction data. Hopefully, this will make for safer transactions and effectively eliminate the chances of falling victim to malicious transactions.

## Wrapping Up

Always remember to verify the details of your transactions when dealing with large amounts of money in the cryptocurrency world, as transactions cannot be undone. With this guide, sending transactions, especially on MetaMask, should be a walk in the park. Stay safe and Happy Trading!
