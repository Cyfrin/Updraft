---
title: How MetaMask works with the Browser
---

_Follow along the course with this video._



---

In our web development journey, we often interact with JavaScript-enabled websites. But when it comes to dealing with MetaMask -- a cryptocurrency wallet and Ethereum gateway -- things become a little more intriguing. Let's uncover the puzzle and understand how MetaMask works with your website. Moreover, I will guide you on how to interact with such a website connected to a blockchain and a FundMe contract on the Anvil network.

## MetaMask &amp; Its Interaction with Websites

MetaMask is more than just a cryptocurrency wallet -- it acts as an interface that allows websites to interact with the Ethereum blockchain. Notably, these websites interact predominantly with the `window.ethereum` JavaScript object injected into the web browser by MetaMask. By utilizing this object, websites send transactions to MetaMask or any connected wallet.

However, keep in mind that if you switch to a browser without MetaMask installed, you won't be able to establish this connection. If you inspect the console and type `window.ethereum`, you'll encounter `undefined`. For detailed information about working with the `window.ethereum` object, refer to the MetaMask documentation [here](https://docs.metamask.io/guide/).

<img src="/html-fundme/2-metamask/metamask1.png" style="width: 100%; height: auto;">

## Establishing Connection with MetaMask

For your website to interact with MetaMask, you should have a mechanism to establish a connection. In order to do so, most websites feature a 'connect' button that on being clicked initiates the connection.

When you click the 'connect' button on your website, MetaMask will prompt you to connect one of your accounts. Once the connection is set up, your website will be able to fetch the account's balance and carry out transactions.

This JavaScript code shows the process to establish a connection via the 'connect' button. On clicking this button, the function checks if MetaMask is available on the browser. If found, it sends a request to MetaMask to connect one of the existing accounts.

## Interacting with Smart Contracts

Once the connection is established, we can interact with the functions of deployed smart contracts. For this demonstration, I will show you how to interact with a contract called `FoundryFundMe`. This contract has functions such as `fund`, `withdraw`, and `getBalance`. Here is an example of how to interact with the `getBalance` function:

Firstly, an Ethers provider gets the RPC URL from MetaMask. Secondly, it gets the signer using this provider. The signer, in context, is the connected account. Lastly, it creates a contract instance using the contract address, ABI, and signer.

```js
// JavaScript code to interact with the `getBalance` function
let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer = provider.getSigner();
let contract = new ethers.Contract(contractAddress, ABI, signer);
// Retrieve the balance
let balance = await contract.getBalance();
```

## Switching to the Anvil Network

At some point, you may want to practice interacting with smart contracts on a local Anvil chain instead of the Ethereum Mainnet. Through MetaMask, you can easily shift from the Ethereum Mainnet to the Anvil network.

To do this, go to `Settings -> Networks -> Add Network`, and manually enter the following network details:

- Network Name: Anvil
- New RPC URL: \[RPC-URL-OF-ANVIL-NETWORK\]
- Chain ID: 31337
- Currency Symbol: Eth or whatever you prefer.
- Block Explorer URL: \[This field can be left blank\]

After the network is added, you can switch to Anvil chain in MetaMask and start interacting with the smart contracts deployed there.

## Interacting with the `FundMe` Contract

Once you've switched to the Anvil network, repeating the process as discussed in the previous section, you can deploy the `FundMe` contract and interact with it using MetaMask.

From the website, enter an amount in the `fund` section and click `fund`. This will create a transaction sent to MetaMask for you to sign.

```js
// JavaScript code to interact with the `fund` function
let ethAmount = document.getElementById("ethAmount").value;
let tx = await contract.fund({ value: ethers.utils.parseEther(ethAmount) });
```

Through this process, the website sends a transaction to MetaMask, and MetaMask returns a popup asking whether you want to sign this transaction with your private key.

## Recap and Takeaways

Working with MetaMask and JavaScript websites might seem daunting at first glance, but breaking it down to basics makes it accessible and transparent. MetaMask acts as a liaison connecting the JavaScript website to the Ethereum blockchain all the while prioritizing the security of your private keys. By comfortably setting up local Anvil chains and interfacing smart contracts via JavaScript functions, you can create an interactive, secure, and real-world-ready dApp.
