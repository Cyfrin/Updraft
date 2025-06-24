# Chainlink Functions Subscription 

In this lesson, we are going to create a Chainlink Functions subscription so we can add Chainlink Functions consumer contracts to it to fund their Chainlink Functions requests. 

## Creating a Chainlink Functions subscription 

Let's create a Chainlink Functions subscription on Sepolia. 

As a recap, Chainlink Functions subscriptions are used to pay for, manage, and track Chainlink Functions requests.

1. Open [functions.chain.link](https://functions.chain.link/), connect your wallet (make sure you are still connected to Sepolia) and click **Create Subscription**:

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/create-subscription.png' style='width: 100%; height: auto;' alt='create-subscription'}

2. Enter your email and, optionally, a subscription name.

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/email-and-name.png' style='width: 100%; height: auto;' alt='email-and-name'}

3. The first time you interact with the Subscription Manager using your wallet, you must accept the Terms of Service (ToS). A MetaMask popup will prompt you to sign a message to accept the TOS.

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/tos.png' style='width: 100%; height: auto;' alt='tos'}

4. MetaMask will then pop up again and ask you to sign a message to approve the subscription creation:

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/approve-subscription-creation.png' style='width: 100%; height: auto;' alt='approve-subscription-creation'}

5. After the subscription has been approved, MetaMask will pop up a third time and prompt you to sign a message that links the subscription name and email address you provided and ensure you are the subscription owner:

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/link-email-and-name.png' style='width: 100%; height: auto;' alt='link-email-and-name'}

## Funding a subscription

After the subscription has been created, add funds by clicking the **Add funds** button:

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/add-funds.png' style='width: 100%; height: auto;' alt='add-funds'}

For this example, enter `5 LINK` and click **Add funds**:

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/fund-subscription.png' style='width: 100%; height: auto;' alt='fund-subscription'}

Sign the transaction and send the LINK tokens to your subscription. Once the transaction has gone through, your subscription will have been successfully created and funded. It is now ready to add consumer contracts to make Chainlink Functions requests.

## Adding a consumer contract

To add the `FunctionsConsumer` contract to your subscription, click **Add consumer**:

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/add-consumer.png' style='width: 100%; height: auto;' alt='add-consumer'}

Then, go back to Remix and copy the address of the `FunctionsConsumer` contract we deployed in the previous lesson:

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/copy-address.png' style='width: 100%; height: auto;' alt='copy-address'}

Back in the Chainlink Functions app, paste this in as the **Consumer address** and click **Add consumer**:

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/consumer-address.png' style='width: 100%; height: auto;' alt='consumer-address'}

Sign the message in MetaMask to send the transaction to add the consumer contract to the subscription. Once the transaction has gone through, the subscription configuration is complete, and you will be ready to make your first request!

Click **View subscription** to see an overview of your subscription, including the history of requests, the consumers added, and the LINK balance:

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/subscription-overview.png' style='width: 100%; height: auto;' alt='subscription-overview'}

Copy the subscription ID - we are going to need this!

## Sending a Request

Let's finally send a Chainlink Functions request to get the temperature for a specific city. 

Back in Remix, expand the `FunctionsConsumer` contract dropdown in the **Deployed Contracts** section. Find the `getTemperature` function and enter the following parameters:
- `_city`: `London`
- `subscriptionId`: the ID you just copied.
Click **transact** and then sign the transaction in MetaMask to make the Chainlink Functions request

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/get-temp.png' style='width: 100%; height: auto;' alt='get-temp'}

On your subscription overview page, you can see your pending Chainlink Functions request:

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/pending-request.png' style='width: 100%; height: auto;' alt='pending-request'}

Once the request has been filled, you will be able to see it in the **History** section:

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/history.png' style='width: 100%; height: auto;' alt='history'}

Now, in Remix, if we interact with our `FunctionsConsumer` contract and call the `s_lastTemperature` and `s_lastCity` functions, we can see the returned result:

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/london-price.png' style='width: 100%; height: auto;' alt='london-price'}

As you can see, we successfully used Chainlink Functions to bring API data on-chain in a decentralized and secure way! 
