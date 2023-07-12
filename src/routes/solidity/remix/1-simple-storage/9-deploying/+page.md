---
title: Deploying a Contract
---

*Follow along with the course here.*


<iframe width="560" height="315" src="https://www.youtube.com/embed/qHfWQpnvVLY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Deploying A Simple Storage Contract On A Testnet

If you’ve been following along through our work with simple storage contract, you will see that we have progressively added functionality to our solidity contract. With our favorite number feature, typing person, public list, favorite number retrieval, and update functions, we’ve built up a solid contract structure. Now, it’s time to steer away from abstract theorizing and practically deploy this to a real **testnet**.


## Pre-Deployment Audit

<img src="/solidity/remix/lesson-2/deploying/deploying1.png" style="width: 100%; height: auto;">


## Compilation Check

This ensures that our contract has no errors or warnings and is fit for deployment. Go to your development environment and ensure that you have a green checkmark, indicating a successful compilation.

## Changing The Environment

The deployment process Kicks off by switching from the local virtual environment (Remix VM) to MetaMask as the Injected provider. Here's how you can make the switch:

1. Navigate to the deploy tab
2. Delete any content there
3. Change the environment

Choose the **Injected Provider MetaMask** option. This allows the web interface to interact with your MetaMask account.

<img src="/solidity/remix/lesson-2/deploying/deploying2.png" style="width: 100%; height: auto;">


## Connecting The Account

Upon choosing MetaMask as your injected provider, you will be prompted to pick a specific account for use. Choose your desired account and proceed to connect it. Next, check your MetaMask display and ensure that your account is properly connected to Remix. It’s critical to double-check that you are on the correct testnet as this guide uses the Sapolia testnet.

<img src="/solidity/remix/lesson-2/deploying/deploying3.png" style="width: 100%; height: auto;">


If have sufficient Sapolia ETH in your account provided from a [faucet](https://sepoliafaucet.com/), you can now go ahead and click the "Deploy" button.


## Confirming The Transaction

Upon hitting the deploy button, MetaMask will prompt you to confirm the transaction for contract deployment.

Since we are on the Sapolia testnet and not on a mainnet, the money spent here is not real.

Click "Confirm" to launch the contract deployment.

<img src="/solidity/remix/lesson-2/deploying/deploying4.png" style="width: 100%; height: auto;">


## Checking The Deployment

After you confirm, you should now find the following indicators that your contract deployment is successful:

- Green checkmark appears
- Invocation status changes to ‘block confirmations’
- Contract address appears under deployed contracts

<img src="/solidity/remix/lesson-2/deploying/deploying5.png" style="width: 100%; height: auto;">



If you wait and refresh your etherscan page, you’ll see a "Success" status, along with the complete details of your transaction. For deployment transactions, the input data field will be larger than normal transaction data; it contains contract creation data, along with the gas fee details because any action that alters the blockchain requires gas for implementation.

<img src="/solidity/remix/lesson-2/deploying/deploying6.png" style="width: 100%; height: auto;">


# Interacting With The Deployed Contract

Now that your contract has been successfully deployed, we can recreate the same Flexibility as we had on the virtual environment on this testnet.

We can call the Retrieve function, and Name to favorite function which returns zero and nothing respectively as we haven't updated anything. Adding zero in for the list of people also returns nothing as expected.

# Updating The Blockchain

To update the blockchain, press store and input a number (e.g., 7878). MetaMask will prompt you to confirm the update transaction. This will update the favorite number on the contract.

Similar confirmation checks will be run, with transaction details available on etherscan.

<img src="/solidity/remix/lesson-2/deploying/deploying7.png" style="width: 100%; height: auto;">

## Celebrate Small Wins

If you’ve successfully followed all these steps, you’ve just navigated your first practical deployment of a smart contract to a testnet! Don't underestimate the importance of celebrating small developmental milestones. They are key psychological boosts that will keep you motivated and engage with any new skill you’re learning.


## Deploying to Another Testnet

If you wanted to deploy to another testnet, just switch to the testnet, ensure sufficient ETH and repeat the deployment process.

## Deploying to Mainnet

For the mainnet, the same process is applicable with the main difference being that you would require Ethereum, or in other words real money, to deploy.

Moreover, if you want to deploy to other EVM compatible networks, we'll cover that in future guides.

## Coining Yourself As A Solidity Developer

By deploying and interacting with your smart contract, you can confidently call yourself a solidity developer. Remember, every developer's journey comes with constant learning curves, so don’t stop here. Keep exploring and experimenting with Solidity and of course keep learning with the next lessons.