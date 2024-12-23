---
title: Making Your First Transaction
---

_Follow along with this video:_

---

## Setting up MetaMask for Ethereum Transactions

In this lesson, we will learn how to make a transaction on a test Ethereum blockchain using MetaMask, a popular cryptocurrency wallet.

### Visiting Ethereum Website

- Go to the Ethereum website [ethereum.org](https://ethereum.org).

### Understanding Blockchains

- We will make our first transaction on a test Ethereum blockchain.
- This process works the same across all EVM (Ethereum Virtual Machine) compatible blockchains and layer 2 solutions like Arbitrum, Ethereum, ZKsync, etc.
- EVM compatibility will be explained later.

### Setting up MetaMask Wallet

To set up a wallet, we really just need to follow these steps:

1. To send a transaction on EVM chains, set up a wallet. We'll use MetaMask as it's one of the most popular and easiest wallets to start with.
2. Go to [MetaMask](https://metamask.io).
3. Install the MetaMask extension for your browser (e.g., Chrome, Firefox, or Brave).
4. Once installed, you’ll see the extension in the top-right corner of your browser.
5. Click "Get Started".
6. Select "Create a New Wallet".
7. Agree to help MetaMask improve (optional).
8. Create a password. Make sure it’s secure.

   > **Note**: This wallet will be for development purposes, so you may use a weaker password. But never put real money into this wallet. Treat it as a real wallet to familiarize yourself with good wallet safety.

### Secret Recovery Phrase (Master Key)

MetaMask is going to provide you with a secret recovery phrase. This is a series of 12 words generated when you first set up MetaMask. Ultimately this phrase will allow you to recover your wallet and funds within, should you ever lose access.

This recovery phrase (sometimes referred to as a mnemonic) is your master key, so keep it safe. Write it down, store it in a safe deposit box, or use a secure password manager. Some even engrave their phrase on a metal plate.

> **Warning**: If anyone gets access to your secret recovery phrase, they can access and take all your funds. No one, including the MetaMask team, can help you recover your wallet if you lose the phrase.

9. Watch the Video offered by MetaMask detailing how to keep your wallet secure.
10. Select "Secure My Wallet".
11. Write down your secret recovery phrase and save it securely.
12. Confirm by re-entering your phrase.
13. Click "Got it" after creating your wallet.

> **Note AGAIN:** This wallet will be your **development wallet** do not add real funds!

### Understanding the MetaMask Interface

From this point, you should be able to see your MetaMask interface. It should look something like this:

::image{src='/blockchain-basics/05-first-transaction/first-transaction1.png' style='width: 75%; height: auto;'}

You can Pin MetaMask to the top of your browser for easy access to this view in future.

A couple things to note:

1. In MetaMask, you can create multiple accounts. Each account has a different address. You can do this by selected `Create Account` from the menu in the top right.
2. All accounts created in MetaMask share the same secret phrase but have different private keys.

   **Note**: Access to the secret phrase grants control to all accounts, while access to a private key only grants control to a single account.

### Selecting a Network

Near the top of the MetaMask interface, you’ll see “Ethereum Mainnet”. Click on it to see all the networks that MetaMask can access.

Ethereum Mainnet is a live blockchain where real money is used. For the purposes of this course, we're not going to be working with Ethereum Mainnet. Instead, we'll be leveraging a testnet, a development chain used for creating and testing smart contracts.

In addition to this, we'll also be covering how to test and deploy on a _local_ chain, which we'll quickly learn is the _preferred_ way to test our code in most circumstances!

By toggling the `show test networks` option, we can see which testnets come included by default.

::image{src='/blockchain-basics/05-first-transaction/first-transaction2.png' style='width: 75%; height: auto;'}

We're able to switch networks simply by clicking on any network on the available list. Try out Sepolia!

> Do note - Testnets change often, they're run out of the goodness in people's hearts. If a particular testnet is unavailable or changes, please checkout the course GitHub repo or the section Updates area on Updraft for the latest testnet.

Just like Mainnets, testnets have blockexplorers available to us as well. We can navigate to [**Sepolia Etherscan**](https://sepolia.etherscan.io/) to see records of all the transactions that are happening on Sepolia.

### First Transaction

In order to experience your first transaction, we're going to navigate to a `faucet`. Faucets are services which allow you to claim some free `testEth` (in our case SepoliaEth) and use it in development.

[**Sepolia Faucet**](https://faucets.chain.link/sepolia)

::image{src='/blockchain-basics/05-first-transaction/first-transaction3.png' style='width: 75%; height: auto;'}

From this page you can connect your wallet with the click of a button. Once clicked, agree to the terms of service and select `MetaMask`.

::image{src='/blockchain-basics/05-first-transaction/first-transaction4.png' style='width: 75%; height: auto;'}

Your MetaMask should pop up and give you the option to select your account, following by a confirmation to connect your wallet.

::image{src='/blockchain-basics/05-first-transaction/first-transaction5.png' style='width: 75%; height: auto;'}
::image{src='/blockchain-basics/05-first-transaction/first-transaction6.png' style='width: 75%; height: auto;'}

In order to request testnet native tokens (like SepoliaEth) you'll need to verify your GitHub account. Once that's done, you should be ready to send your request!

::image{src='/blockchain-basics/05-first-transaction/first-transaction7.png' style='width: 75%; height: auto;'}

After a brief delay we should see something like this!

::image{src='/blockchain-basics/05-first-transaction/first-transaction8.png' style='width: 75%; height: auto;'}

I encourage you to click the transaction hash, you'll be brought to Sepolia Etherscan and provided a tonne of information about the details of your transaction. Additionally, you should be able to open up your MetaMask wallet and confirm you did indeed receive your requested Sepolia Eth!

::image{src='/blockchain-basics/05-first-transaction/first-transaction9.png' style='width: 75%; height: auto;'}

Try toggling your MetaMask wallet between networks now, you'll notice that it's only on Sepolia that you've gained your test ETH. If you want to practice further, there are additional testnet blockchains with faucets available for you to try.

### Transaction Details

Taking a brief look at some of the details of our transaction on Etherscan, we're given a lot of insight. Understanding these properties is a fundamental part of being a blockchain developer. Some of the basic details include:

- Transaction Hash - This is a unique identifier for our transaction
- From - The originating address of the transaction request
- To - The address a transaction was sent to
- Value - Any funds included with the transaction
- Gas - The cost of the transaction to execute, we'll be looking into gas more closely in the next lesson.

::image{src='/blockchain-basics/05-first-transaction/first-transaction10.png' style='width: 75%; height: auto;'}

### Wrap Up

Congratulations! You've just sent your first transaction! You should be really proud. In the next lesson we're going to dive into the details of that transaction in an introduction to gas fees!
