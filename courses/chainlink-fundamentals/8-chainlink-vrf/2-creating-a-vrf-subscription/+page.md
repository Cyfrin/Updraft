# Creating a VRF Subscription

In the next two lessons, we will learn how to use the subscription method (rather than the direct functing method) to use Chainlink VRF in a smart contract. 

The first step in using Chainlink VRF is creating a subscription to fund our requests for randomness. In this lesson, we will learn how to create a VRF subscription.

## Prerequisites 

- You have some [Sepolia ETH funds](https://faucets.chain.link/).
- You have some [Sepolia LINK](https://faucets.chain.link/).

## Create a subscription

- Navigate to the [VRF App](https://vrf.chain.link/) and connect your wallet.
- Click the **Create Subscription** button.

::image{src='/chainlink-fundamentals/8-chainlink-vrf/assets/vrf-app.png' style='width: 100%; height: auto;' alt='vrf-app'}

- Optionally,
    - Give your subscription a name.
    - Enter your email address.
- Click **Create Subscription**:

::image{src='/chainlink-fundamentals/8-chainlink-vrf/assets/create-subscription.png' style='width: 100%; height: auto;' alt='create-subscription'}

- Confirm the transaction to approve the subscription creation:

::image{src='/chainlink-fundamentals/8-chainlink-vrf/assets/approve-subscription.png' style='width: 100%; height: auto;' alt='approve-subscription'}

- Wait until the transaction has been confirmed, and sign the message to ensure you are the owner of the subscription:

::image{src='/chainlink-fundamentals/8-chainlink-vrf/assets/sign-message.png' style='width: 100%; height: auto;' alt='sign-message'}

- Your subscription will have been created! Now, you need to add LINK to the subscription to fund requests for randomness. Click **Add funds**:

::image{src='/chainlink-fundamentals/8-chainlink-vrf/assets/add-funds.png' style='width: 100%; height: auto;' alt='add-funds'}

- Enter the **Amount to fund** as `10` LINK, click **Fund subscription**, and confirm the transaction to send the LINK to the subscription.  

::image{src='/chainlink-fundamentals/8-chainlink-vrf/assets/5-link.png' style='width: 100%; height: auto;' alt='5-link'}

- You are now ready to add consumer smart contracts to your subscription to make requests for randomness. Click **Add consumers**:

::image{src='/chainlink-fundamentals/8-chainlink-vrf/assets/add-consumers.png' style='width: 100%; height: auto;' alt='add-consumers'}

- Copy the **Subscription ID** (don't worry, you can view this ID again later). We now need to create a consumer contract!

::image{src='/chainlink-fundamentals/8-chainlink-vrf/assets/subscription-id.png' style='width: 100%; height: auto;' alt='subscription-id'}

Let's do that now! We will return to this page once we have deployed our consumer contract.
