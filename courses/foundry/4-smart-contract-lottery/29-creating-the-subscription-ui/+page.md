---
title: Creating the subscription UI
---

_Follow along with this video:_

---

### Creating a subscription using the UI

Let's learn how to create a subscription using the Chainlink UI.

First, you need to access this link: https://vrf.chain.link/sepolia

Click on `Create Subscription`. On the next page, it's not necessary to put in any email address or project name. Click again on `Create Subscription`. Your Metamask will pop up, click on approve to approve the subscription creation. Wait to receive the confirmation then sign the message. After everything is confirmed you will be prompted to add funds, but let's not do that right now.

Access the [first link](https://vrf.chain.link/sepolia) again. In this dashboard, you will see your new subscription in the `My Subscriptions` section. You could add this in your `HelperConfig` in the Sepolia section and everything would work. 

Click on the id. On this page, you can see various information about your subscription like Network, ID, admin address, registered consumers and balance. As you can see the balance is 0, thus, we need to fund it with LINK.

Before going on with that we need to make sure we have Sepolia LINK in our wallet. Please visit the https://faucets.chain.link/ link and request some testnet funds. Tick both LINK and Sepolia ETH. Make sure to log in using your GitHub to pass Chainlink's verification. Click on `Send request` and wait for the funds to arrive.

Follow Patrick's guidance to add LINK token to your wallet on Sepolia testnet.

Back on the subscription tab, click on the top-right button called `Actions` then click on `Fund Subscription`. Select `LINK`, enter the `Amount to fund` and click on `Confirm`. Wait for the funds to arrive. 

This process was simple, but we can make it even smoother via forge scripts.