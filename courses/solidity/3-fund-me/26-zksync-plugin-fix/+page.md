---
title: ZKsync Plugin Fix
---

_Follow along with the video_

---

### ZKsync Remix plugin minor bug

As we saw in the _Simple Storage_ section, there is a small bug in the Remix ZKsync module. After a successful compilation, the deploy tab will still display the message _`no smart contracts ready for deployment`_.

This issue arises due to a small bug in the plugin, which requires your smart contracts to be inside a **`contracts` folder**. To resolve this, you can create a new folder named 'contracts' and move your smart contract into it. You can then proceed to compile the contract again, and you should be able to deploy it without any issues.
