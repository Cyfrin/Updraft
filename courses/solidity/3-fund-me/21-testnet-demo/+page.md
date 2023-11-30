---
title: Testnet Demo
---

_Follow along this chapter with the video bellow_

<iframe width="560" height="315" src="https://www.youtube.com/embed/Xt7tzGhMMII" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

In this lesson, we'll explore end-to-end testing of a Solidity contract deployment and execution without actually deploying to a testnet. However, if you wish to follow along and deploy on a testnet, feel free to do so.

## Getting Started

First off, let's compile our `FundMe.sol` Solidity contract to check if our code is correct. If any contracts were deployed previously, delete them so that you can start fresh.

<img src="/solidity/remix/lesson-4/testnet/testnet1.png" style="width: 100%; height: auto;">

Now, set the **injected provider** to MetaMask and check if it's synced to the correct testnet. Validate that you have some ether (ETH) available in your wallet for testnet transactions.

<img src="/solidity/remix/lesson-4/testnet/testnet2.png" style="width: 100%; height: auto;">

## Locating and Selecting the Contract

Next, we'll navigate to our contract area to identify the correct contract we wish to deploy. If you attempt to deploy an interface, an alert message like, _"This contract might be abstract"_ will pop up. However, we'll be deploying the `FundMe` contract. Hit deploy and confirm in MetaMask.

Note that the contract's deployment might take some time, which you can track in the terminal.

## Contract Interaction

Upon successful deployment, you'll find several buttons to interact with your Solidity contract:

- Red button for payable function `fund`
- Orange button for non-payable withdrawing function
- Blue buttons for `view` and `pure` functions

The fund button allows us to send ETH to the contract, the `owner` of the contract is our MetaMask account since we deployed this contract. The minimum value will be set to 5 USD.

You can call the `fund` function, provided you send some ETH along with it. If called without any value, you will encounter a gas estimation error, indicating insufficient ETH.

```
Warning: The fund() function encounter a gas estimation error, hinting that you might not have sent enough ETH along with your transaction!
```

Avoid wasting gas by cancelling the transaction and providing a sufficient amount.

## Ensuring Successful Transaction

Set the amount to 0.1 ETH (or an amount equivalent to the minimum USD amount) and hit confirm on MetaMask. You can track the transaction on etherscan.

Following your transaction's successful processing, you'll see the contract’s balance increase by the set value. The `funders` array will register your address, and the mapping `addressToAmountFunded` will reflect your transaction.

You can check these changes in the ether scan transaction log, which will show the `fund` function call.

## Withdraw Function and Errors

Next, you can initiate the `withdraw` function to reset the mapping and the array. However, keep in mind that our contract set-up only permits the owner to withdraw.

If a non-owner account tries to withdraw, you will encounter another gas estimation error, indicating that the sender is not an owner. So, we revert to the owner account and initiate a successful withdrawal. Again, this can be tracked in the terminal.

Upon successful withdrawal, the balance resets to zero. Additionally, the `funders` array and mapping also reset to their initial zero states. Attempting to call `addressToAmountFunded` with the same address returns zero.

## Advanced Solidity Concepts

Remember, the following section explores more sophisticated attributes of Solidity. Don't worry if you find difficulty understanding it the first time. Mastery of these concepts isn't necessary to continue.

You may remember that earlier editions of this tutorial deployed to the Rinkeby testnet, while latest versions encourage deployment to the Sepolia testnet or the most contemporary testnet. Alternatively, you can follow along without deploying to a testnet.

In this section, we'll explore advanced Solidity pieces focused on efficient gas usage, coding practices that make your code cleaner, and improving overall coding practices. You'll want to pay close attention to these concepts if you aim to excel as an Ethereum Smart Contract coder.

Always remember that when we refer to the JavaScript VM, we mean the Remix VM. Stay tuned for more fun and learning with Solidity in subsequent posts!
