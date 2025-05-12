# Chainlink Functions Playground

Chainlink Functions allows us to run JavaScript code off-chain and bring the result on-chain in a decentralized and secure way. In this lesson, we will learn about the Chainlink Functions Playground, a tool that helps you learn how to use Chainlink Functions and test your JavaScript code. 

## What is the Chainlink Functions Playground?

[The Chainlink Functions Playground](https://functions.chain.link/playground/60f46de7-d42a-45d6-aade-e41a15160dbe) is an easy, overhead-free way to test the custom JavaScript code you want Chainlink Functions to execute. With the Functions Playground, you can even call third-party public APIs! This sandbox environment is the best way to experiment with Chainlink Functions without deploying a smart contract to a test network.

Key features of the Chainlink Functions Playground include:

- **Simulating Chainlink Functions**: Execute custom JavaScript code using Chainlink Functions directly in your web browser.
- **Real-Time Execution**: Run JavaScript source code and its provided arguments and see the output within seconds.
- **Calling APIs**: Quickly test API integrations, including HTTP requests to external data sources, and inspect the returned data.
- **Output Visualization**: Get results from your Chainlink Functions request in real-time, with a user-friendly interface showcasing both console logs and the final returned output.

The Chainlink Functions Playground is a useful tool for developers to get hands-on experience with Chainlink Functions and test out different use cases before going on-chain. This significantly lowers the barrier to testing externally connected smart contracts.

## How to use the Chainlink Functions Playground

Navigate to the [Chainlink Functions Playground](https://functions.chain.link/playground) where you will see an **Input** window:

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/functions-playground.png' style='width: 100%; height: auto;' alt='functions-playground'}

The playground has the following fields:

- **Source code**: This is where you put the JavaScript source code you want to test to send in your Chainlink Functions request.
- **Argument(s)**: Argument(s) to your JavaScript code. Arguments are variables in your JavaScript code, the values in your code you want to change, e.g., the city to retrieve a temperature for or some on-chain data.
- **Secret(s)**: private arguments, e.g., API keys, credentials, etc. This is the sensitive data you don't want to be publically visible. Chainlink Functions "injects" these values into your JavaScript at "runtime" (when the JavaScript is run).

To run the code:

- Click the **Run code** button 
- The **Output** window will be populated with the returned data. 
- If there are any logs, they will be visible in the **Console log** section.

## Using an external API in the Chainlink Functions Playground

Let's use the Chainlink Functions Playground to call an API to get a Star Wars character associated with a character ID.

Click the **Fill with example code** dropdown button and click the **Star Wars characters** example:

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/code-example.png' style='width: 100%; height: auto;' alt='code-example'}

The following JavaScript source code will populate the **Source code** window:

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/star-wars-code.png' style='width: 100%; height: auto;' alt='star-wars-code'}

### Arguments 

```javascript
const charactedId = args[0]
```

`args` is the array of variables that get injected into your JavaScript code at runtime.

This code has one argument–`characterId`: a unique ID to identify a Star Wars character. 

### Calling the API

```javascript
const apiResponse = await Functions.makeHttpRequest({
  url: `https://swapi.info/api/people/${characterId}/`
})
```

A HTTP request is made to the URL: https://swapi.info/api/people/${characterId} using the Chainlink `Functions` library that is also injected into the source code at runtime.

Let’s assume that your first argument (which gets assigned to `characterId`) is `1`. If you go to the link in a new browser tab, the swapi.info API server will send you back the following information:

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/api.png' style='width: 100%; height: auto;' alt='api'}

This has all the data about the Star Wars character with ID `1`: Luke Skywalker in Swapi’s database. If you change the `characterId` argument to `2` (and so on), you will get information on other Star Wars characters assigned to that specific ID.

### Running the code

To run the code:

- Type `1` in the **Argument** input box to get the information for the character with ID `1`.
- We do not need any Secrets. Leave this input blank.
- Click the **Run Code** button.

You will see the **Console log** and **Output** populate on the right with all the information about Luke Skywalker:

::image{src='/chainlink-fundamentals/7-chainlink-functions/assets/output.png' style='width: 100%; height: auto;' alt='output'}

By utilizing the Chainlink Functions Playground, you verified your JavaScript code works without needing to deploy a smart contract, interact with Chainlink Functions, or make a subscription (more on this shortly).

Let's now use Chainlink Functions in a smart contract.
