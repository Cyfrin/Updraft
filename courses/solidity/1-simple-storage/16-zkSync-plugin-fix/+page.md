---
title: zkSync Plugin Fix
---

_Follow along with the video_

---

### zkSync Remix plugin minor bug

Ensure that your `SimpleStorage.sol` smart contract is on Remix. Then, you can enter the zkSync plugin and compile the file. However, even after a successful compilation, the deploy tab will still display the message _`no smart contracts ready for deployment`_.

This issue arises due to a small bug in the plugin, which requires your smart contracts to be inside a **`contracts` folder**. To resolve this, you can create a new folder named 'contracts' and move your smart contract into it. You can then proceed to compile the contract again, and you should be able to deploy it without any issues.
