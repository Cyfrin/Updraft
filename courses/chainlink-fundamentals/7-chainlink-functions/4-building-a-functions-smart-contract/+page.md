# Building a Chainlink Functions Consumer Smart Contract

In this lesson, we will write a smart contract that requests data from an external API using Chainlink Functions.

**Note**: the code for this section is advanced. While we will be doing a code walkthrough, I do not expect you to understand everything perfectly. If you prefer to copy-paste the code and get a feel for using Chainlink Functions without understanding the Soldity, go ahead. If you're a developer wanting to understand how to integrate Chainlink Functions into a smart contract, then we have added a code breakdown.

## Prerequisites

- You have Sepolia ETH and LINK testnet funds.
- You have imported the LINK token on Sepolia to MetaMask.

## Writing a Chainlink Functions Consumer contract

Let's write a Chainlink Functions consumer smart contract that fetches the weather for a specific city. 

In Remix, create a new workspace named "Functions," create a folder called `contracts` and a file called `FunctionsConsumer.sol`. Paste the `FunctionsConsumer.sol` code from the [course code repo](https://github.com/ciaranightingale/chainlink-fundamentals-code/blob/main/functions/FunctionsConsumer.sol).

If you need a reminder of how to create workspaces, files etc., visit the Introduction to Remix lesson in Section 2. 

## Code explainer

### Imports 

We import the following dependencies:

```solidity
import {FunctionsClient} from "@chainlink/contracts@1.3.0/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts@1.3.0/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
```

Chainlink Functions consumer contracts need to inherit the `FunctionsClient` contract. The `FunctionsClient` constructor requires the Chainlink `Router` contract address (on the chain the contract is being deployed to) as a constructor parameter:

```solidity
constructor() FunctionsClient(ROUTER) {}
```

`FunctionsRequest` is the library we use to create Functions `Request` structs. We use the `using` keyword to make functions from the `FunctionsRequest` library callable on the `Request` struct variables:

```solidity
using FunctionsRequest for FunctionsRequest.Request;
```

### State Variables 

We define the following storage variables:

```solidity
string public s_lastCity; // The latest city a Chainlink Functions got a temperature for
string public s_requestedCity; // The city for the latest pending Chainlink Functions request 
string public s_lastTemperature; // The temperature of the latest city Chainlink Functions got a temperature for

bytes32 public s_lastRequestId; // The ID of the latest request
bytes public s_lastResponse; // The response for the latest request
bytes public s_lastError; // The errors for the latest request
```

And the following constant variables:

```solidity
// Hardcoded for Sepolia
// Supported networks https://docs.chain.link/chainlink-functions/supported-networks
address constant ROUTER = 0xb83E47C2bC239B3bf370bc41e1459A34b41238D0;
bytes32 constant DON_ID =
    0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000;

//Callback gas limit
uint32 constant GAS_LIMIT = 300000;

// JavaScript source code
string public  constant SOURCE =
    "const city = args[0];"
    "const apiResponse = await Functions.makeHttpRequest({"
    "url: `https://wttr.in/${city}?format=3&m`,"
    "responseType: 'text'"
    "});"
    "if (apiResponse.error) {"
    "throw Error('Request failed');"
    "}"
    "const { data } = apiResponse;"
    "return Functions.encodeString(data);";
```

We also define some errors and events we will use in our contract:

```solidity
// Event to log responses
event Response(
    bytes32 indexed requestId,
    string temperature,
    bytes response,
    bytes err
);

error UnexpectedRequestID(bytes32 requestId);
```

## getTemperature

`getTemperature` is the function we will call to get the temperature for a specific city. It takes:
- `city`: the city to get the temperature using Chainlink Functions.
- `subscriptionId`: The Chainlink Functions subscription you want to use to fund your Chainlink Functions request.

It returns:
- `requestId`: The ID for the request so you can track the response. 

```solidity
function getTemperature(
        string memory city,
        uint64 subscriptionId
    ) external returns (bytes32 requestId) {}
```

Remember that, in the `SOURCE` variable, we had the Javascript code that would be run. We need to initialize a request using this code. 
- First, we create a `FunctionsRequest.Request` struct, called `req`, which, remember, we can call functions from the `FunctionsRequest` library on. 
- Then, we call `initializeRequestForInlineJavaScript` on the `req` and pass the `SOURCE` to initialize the request.

```solidity
function getTemperature(
    string memory _city,
    uint64 subscriptionId
) external returns (bytes32 requestId) {
    FunctionsRequest.Request memory req;
    req.initializeRequestForInlineJavaScript(SOURCE); // Initialize the request with JS code
}
```

The first line of the `SOURCE` code took an argument, which it then passed into the API URL:

```solidity
"const city = args[0];"
```

We need to create an argument in our `getTemperature` function. To do this, we:
- Create a string array, with one element, that'll contain the arguments, called `args`.
- Set the first element to `city`, since this is the argument in the JavaScript source code. 
- Call the `setArgs` function from the `FunctionsRequest` library on the `req` struct and pass the newly created `args` variable.

Altogether, this function so far is:

```solidity
function getTemperature(
    string memory _city,
    uint64 subscriptionId
) external returns (bytes32 requestId) {
    FunctionsRequest.Request memory req;
    req.initializeRequestForInlineJavaScript(SOURCE); // Initialize the request with JS code

    string[] memory args = new string[](1);
    args[0] = _city;
    req.setArgs(args); // Set the arguments for the request
}
```

Then, we send the request using the `_sendRequest` function implemented on the `FunctionsClient` contract we inherited. Here, we pass:
- The encoded request.
- The subscription ID funding the request.
- The gas limit for the callback function (which we will go through shortly).
- The DON ID the request will be sent to.

```solidity
// Send the request and store the request ID
s_lastRequestId = _sendRequest(
    req.encodeCBOR(),
    subscriptionId,
    GAS_LIMIT,
    DON_ID
);
```

Finally, set `s_requestedCity` as the `city` we requested the temperature for and then return the `s_lastRequestId` so that we can later check our request.

```solidity
// set the city for which we are obtaining the temperature
s_requestedCity = _city;
return s_lastRequestId;
```

## fulfillRequest

`fulfillRequest` is the callback function that Chainlink Functions consumer contracts must implement. The DON will call this function after the JavaScript code has been run and the request has been fulfilled. The function is expected to have the following definition:

```solidity
function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {}
```

In this function, we initially check whether the `requestId` was, in fact, the latest request we made, or `s_lastRequestId`.

```solidity
if (s_lastRequestId != requestId) {
    revert UnexpectedRequestID(requestId); // Check if request IDs match
}
```

Then we take the response and set the state variables corresponding to the error and response for the latest request.

```solidity
s_lastError = err;
s_lastResponse = response;
```

And finally, we set the `s_lastTemperature` and `s_lastCity` using the request reponse and emit an event to say that we have received the response.

```solidity
s_lastTemperature = string(response);
s_lastCity = s_requestedCity;

// Emit an event to log the response
emit Response(requestId, s_lastTemperature, s_lastResponse, s_lastError);
```

Remember the `GAS_LIMIT` we defined earlier? This is the maximum gas rquired to execute the `fulfillRequests` function adn therefore fulfill your request. 

## Deploy the Chainlink Functions consumer contracts

Using the steps detailed in Section 2, compile and deploy your `FunctionsConsumer` contract to Sepolia, and remember to pin it to the workspace!

Now, we are ready to create a subscription and add our consumer contract to that subscription.
