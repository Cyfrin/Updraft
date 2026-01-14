---
title: Testnet Demo
---

_You can follow along with the video course from here._

### Introduction

In this lesson, we'll delve into _end-to-end testing_ of a Solidity contract's deployment and execution.

### Deployment Transaction

First, we need to _compile_ the contract to ensure the code is correct. On Remix, set the **injected provider** to MetaMask and confirm it is properly synced to the testnet. Ensure you have some Sepolia Ether (ETH) in your wallet if you plan to deploy the contract on Sepolia.

![testnet1](/solidity/remix/lesson-4/testnet/testnet1.png)

We'll deploy the `FundMe` contract by clicking deploy and then confirming the transaction in MetaMask, which may take some time.

### Contract Interaction

After successfully deploying the `FundMe` contract, you'll see several buttons to interact with it:

- **Red button**: Payable functions (e.g., `fund`)
- **Orange button**: Non-payable functions (e.g., `withdraw`)
- **Blue buttons**: `view` and `pure` functions

The `fund` function allows us to send ETH to the contract (minimum 5 USD). The `owner` of the contract is our MetaMask account, as the **constructor** sets the deployer as the owner.

> 🗒️ **NOTE**:br
> If the `fund` function is called without any value or with less than 5 USD, you will encounter a gas estimation error, indicating insufficient ETH, and gas will be wasted.

### Successful Transaction

If you set the amount to `0.1 ETH` and confirm it in MetaMask, you can then track the successful transaction on a block explorer like Etherscan or Blockscout. In the transaction log, you will see that the `fundMe` balance has increased by `0.1 ETH`. The `funders` array will register your address, and the mapping `addressToAmountFunded` will record the amount of ETH sent.

### Withdraw Function and Errors

After funding the contract, we can initiate the `withdraw` function. This function can only be called by the owner; if a non-owner account attempts to withdraw, a gas estimation error will be thrown, and the function will revert.

Upon successful withdrawal, the `fundMe` balance, the `addressToAmountFunded` mapping, and the `funders` array will all reset to zero.

### Conclusion

In this lesson, we've explored the end-to-end process of deploying and interacting with a Solidity contract using Remix and MetaMask. We covered the deployment transaction, contract interaction, and how to handle successful transactions and potential errors.

### 🧑‍💻 Test yourself

1. 🧑‍💻 Interact with the `FundMe` contract on Remix and explore all possible outcomes that its functions can lead to.
