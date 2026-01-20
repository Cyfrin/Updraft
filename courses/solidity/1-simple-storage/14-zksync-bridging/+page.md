---
title: Remix zkSync Bridging
---

_Follow along with the video_

---

### Introduction

In this lesson, we will guide you step-by-step to acquire zkSync ETH on the testnet using the _bridging method_. All the links referred to in this lesson can be found in the [GitHub repository](https://github.com/Cyfrin/foundry-full-course-cu?tab=readme-ov-file#recommended-tools) associated with this course.

### Wallet Connection

You can begin by navigating to the [zkSync Bridge](https://portal.zksync.io/bridge) app and clicking on the "Connect Wallet" button. Select MetaMask, and when prompted, enter your password. After connecting, ensure you are on the **Sepolia Test Network**. If you lack Sepolia ETH, use the [GCP faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia) or any other [recommended testnet faucets](https://github.com/Cyfrin/foundry-full-course-cu?tab=readme-ov-file#testnet-faucets).

### Bridging Sepolia

To bridge Sepolia ETH to zkSync, select the "zkSync" button at the top right of the zkSync bridge page and switch to the ["zkSync Sepolia Testnet"](https://portal.zksync.io/bridge/?network=sepolia). The interface will display the option to bridge from the Ethereum Sepolia Testnet.

### Transferring Funds

Next, return to MetaMask and make a small transfer of Sepolia ETH to zkSync Sepolia (even 0.001 ETH is sufficient to deploy a smart contract).

> 👀❗ **IMPORTANT**  
> Be sure to use a testnet wallet, where no real money is present.

Select "Continue," and proceed to bridge your funds. Confirm the transaction on MetaMask, and your funds will be transferred within 15 minutes.

While waiting, you can add the zkSync Sepolia Testnet to MetaMask. Go to [Chainlist](https://chainlist.org/), search for "zkSync Sepolia" while including testnets, and connect your wallet. Approve the network addition and switch to the zkSync Sepolia Testnet.

Once the transaction completes, you will see the funds appear in your MetaMask wallet under the zkSync Sepolia Testnet. With the correct funds in your wallet, you can now proceed to deploy contracts in Remix.
