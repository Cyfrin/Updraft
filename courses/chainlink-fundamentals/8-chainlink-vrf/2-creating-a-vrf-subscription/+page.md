# Creating a VRF Subscription

In the next two lessons, we will learn how to use the subscription method (rather than the direct functing method) to use Chainlink VRF in a smart contract. 

The first step in using Chainlink VRF is creating a subscription to fund our requests for randomness. In this lesson, we will learn how to create a VRF subscription.

## Prerequisites 

- You have some [Sepolia ETH funds](https://faucets.chain.link/).
- You have some [Sepolia LINK](https://faucets.chain.link/).

## Create a subscription

- Navigate to the [VRF App](https://vrf.chain.link/) and connect your wallet.
- Click the **Create Subscription** button.

![vrf-app](../assets/vrf-app.png)

- Optionally,
    - Give your subscription a name.
    - Enter your email address.
- Click **Create Subscription**:

![create-subscription](../assets/create-subscription.png)

- Confirm the transaction to approve the subscription creation:

![approve-subscription](../assets/approve-subscription.png)

- Wait until the transaction has been confirmed, and sign the message to ensure you are the owner of the subscription:

![sign-message](../assets/sign-message.png)

- Your subscription will have been created! Now, you need to add LINK to the subscription to fund requests for randomness. Click **Add funds**:

![add-funds](../assets/add-funds.png)

- Enter the **Amount to fund** as `10` LINK, click **Fund subscription**, and confirm the transaction to send the LINK to the subscription.  

![5-link](../assets/5-link.png)

- You are now ready to add consumer smart contracts to your subscription to make requests for randomness. Click **Add consumers**:

![add-consumers](../assets/add-consumers.png)

- Copy the **Subscription ID** (don't worry, you can view this ID again later). We now need to create a consumer contract!

![subscription-id](../assets/subscription-id.png)

Let's do that now! We will return to this page once we have deployed our consumer contract.
