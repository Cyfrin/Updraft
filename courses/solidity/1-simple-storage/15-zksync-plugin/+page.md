---
title: ZKsync Plugin
---

_Follow along with the video_

---

### Introduction

In this lesson, you're about to learn the same type of layer 2 or rollup deployment that professional developers are using. On Remix, we can start by activating the **ZKsync plugin** in our environment. In the _plugin manager_, search for "ZKsync" and activate the ZKsync module. You'll notice that a new ZKsync tab on the left side will appear.

::image{src='/solidity/1-simple-storage/15-ZKsync-plugin/ZKsync-module.png' style='width: 100%; height: auto;'}

This module is made of sections for compiling, deploying, and interacting with contracts on ZKsync.

### Compiling

Let's start by compiling the `SimpleStorage.sol` file by hitting the "Compile" button.

> 👀❗**IMPORTANT**:br
> Ensure that the **Solidity Compiler Version** in the contract matches the _[ZKsync compiler requirements](https://github.com/Cyfrin/foundry-full-course-cu?tab=readme-ov-file#ZKsync-l2-deploy)_. As of this recording, the required version is `0.8.24`.

### Deploying

After compilation, you can go to the `environment tab` to connect your MetaMask wallet, ensuring it is set to the _zkSync Sepolia testnet_. Once connected, you can **deploy and verify** the `SimpleStorage` contract.

::image{src='/solidity/1-simple-storage/15-ZKsync-plugin/wallet.png' style='width: 100%; height: auto;'}

### Verifying Deployment

After hitting the deploy button, MetaMask will request a **signature**. Approve it, and after a short delay, a detailed output will appear indicating the deployment status. If the terminal output shows a green "verification successful" message, it means that your contract has been both deployed and verified correctly.

### Checking the Deployment

To check our deployment, you can copy the contract address and paste it into the [ZKsync Sepolia explorer](https://sepolia.explorer.ZKsync.io/). Here, you can view the contract details.

> 👀❗**IMPORTANT**:br
> At the moment of recording, the ZKsync plugin contains a minor bug. Please refer to lesson 14.

### Conclusion

Well done! You've successfully deployed a smart contract to the ZKsync testnet, marking a notable achievement and a significant step forward in your development journey.
