# Chainlink Functions Subscription 

In this lesson, we are going to create a Chainlink Functions subscription so we can add Chainlink Functions consumer contracts to it to fund their Chainlink Functions requests. 

## Creating a Chainlink Functions subscription 

Let's create a Chainlink Functions subscription on Sepolia. 

As a recap, Chainlink Functions subscriptions are used to pay for, manage, and track Chainlink Functions requests.

1. Open [functions.chain.link](functions.chain.link), connect your wallet (make sure you are still connected to Sepolia) and click **Create Subscription**:

![create-subscription](/chainlink-fundamentals/7-chainlink-functions/assets/create-subscription.png)

2. Enter your email and, optionally, a subscription name.

![email-and-name](/chainlink-fundamentals/7-chainlink-functions/assets/email-and-name.png)

3. The first time you interact with the Subscription Manager using your wallet, you must accept the Terms of Service (ToS). A MetaMask popup will prompt you to sign a message to accept the TOS.

![tos](/chainlink-fundamentals/7-chainlink-functions/assets/tos.png)

4. MetaMask will then pop up again and ask you to sign a message to approve the subscription creation:

![approve-subscription-creation](/chainlink-fundamentals/7-chainlink-functions/assets/approve-subscription-creation.png)

5. After the subscription has been approved, MetaMask will pop up a third time and prompt you to sign a message that links the subscription name and email address you provided and ensure you are the subscription owner:

![link-email-and-name](/chainlink-fundamentals/7-chainlink-functions/assets/link-email-and-name.png)

## Funding a subscription

After the subscription has been created, add funds by clicking the **Add funds** button:

![add-funds](/chainlink-fundamentals/7-chainlink-functions/assets/add-funds.png)

For this example, enter `5 LINK` and click **Add funds**:

![fund-subscription](/chainlink-fundamentals/7-chainlink-functions/assets/fund-subscription.png)

Sign the transaction and send the LINK tokens to your subscription. Once the transaction has gone through, your subscription will have been successfully created and funded. It is now ready to add consumer contracts to make Chainlink Functions requests.

## Adding a consumer contract

To add the `FunctionsConsumer` contract to your subscription, click **Add consumer**:

![add-consumer](/chainlink-fundamentals/7-chainlink-functions/assets/add-consumer.png)

Then, go back to Remix and copy the address of the `FunctionsConsumer` contract we deployed in the previous lesson:

![copy-address](/chainlink-fundamentals/7-chainlink-functions/assets/copy-address.png)

Back in the Chainlink Functions app, paste this in as the **Consumer address** and click **Add consumer**:

![consumer-address](/chainlink-fundamentals/7-chainlink-functions/assets/consumer-address.png)

Sign the message in MetaMask to send the transaction to add the consumer contract to the subscription. Once the transaction has gone through, the subscription configuration is complete, and you will be ready to make your first request!

Click **View subscription** to see an overview of your subscription, including the history of requests, the consumers added, and the LINK balance:

![subscription-overview](/chainlink-fundamentals/7-chainlink-functions/assets/subscription-overview.png)

Copy the subscription ID - we are going to need this!

## Sending a Request

Let's finally send a Chainlink Functions request to get the temperature for a specific city. 

Back in Remix, expand the `FunctionsConsumer` contract dropdown in the **Deployed Contracts** section. Find the `getTemperature` function and enter the following parameters:
- `_city`: `London`
- `subscriptionId`: the ID you just copied.
Click **transact** and then sign the transaction in MetaMask to make the Chainlink Functions request

![get-temp](/chainlink-fundamentals/7-chainlink-functions/assets/get-temp.png)

On your subscription overview page, you can see your pending Chainlink Functions request:

![pending-request](/chainlink-fundamentals/7-chainlink-functions/assets/pending-request.png)

Once the request has been filled, you will be able to see it in the **History** section:

![history](/chainlink-fundamentals/7-chainlink-functions/assets/history.png)

Now, in Remix, if we interact with our `FunctionsConsumer` contract and call the `s_lastTemperature` and `s_lastCity` functions, we can see the returned result:

![london-price](/chainlink-fundamentals/7-chainlink-functions/assets/london-price.png)

As you can see, we successfully used Chainlink Functions to bring API data on-chain in a decentralized and secure way! 
