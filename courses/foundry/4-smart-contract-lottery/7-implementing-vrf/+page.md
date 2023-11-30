---
title: Implementing Chainlink VRF
---

_Follow along with this lesson and watch the video below:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/igV7TVPEIQY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Today, we will explore how to deploy a Chainlink Verifiable Random function (VRF) and integrate it into our existing code. It is a crucial element when we need to generate a random number within a blockchain application.

## A Closer Look at Chainlink VRF

Before we dive into the process, let's take a closer look at Chainlink and its VRF.

Chainlink VRF provides auditable, transparent, and easily verifiable randomness in smart contract use-cases. It employs Verifiable Random Functionality, which takes a seed input to derive a Random output.

This process is done in a way that a third-party observer can public-verify the result, ensuring randomness that can't be biased or manipulated, because it leverages the security of the blockchain network itself.

Browse through the official [Chainlink documentation](https://docs.chain.link/docs/get-a-random-number/) to get a good first-hand experience of deploying and using Chainlink VRF. Different forms of usage are listed here, which will be explained below.

## Getting Started with Chainlink VRF

To get started, fire up Remix and open the Chainlink documentation. Scroll down to the section titled `Get a Random Number` and look for the button labeled 'open in Remix'. This will bring up a code editor for you to modify.

In Remix, you will find pre-written code that uses the Sepolia chain as its default. Two primary methods are explained in the docs- one is Subscription, and the other is Direct Funding.

Subscription is preferable as it scales better, as the contract pulls the link from a separate fund which you previously loaded up with the link.

<img src="/foundry-lottery/7-implement/implement1.png" style="width: 100%; height: auto;">

After setting up the subscription, you will promptly learn how to complete these steps programmatically, avoiding the need for navigating the user interface.

The primary goal is to add a randomization function. As developing with Chainlink VRF involves two transactions, the random number generation is also completed in two steps.

Firstly, you send a request to generate a random number, followed by a second request to receive that random number. The request function signals Chainlink to select the lottery winner, while Chainlink returns the random number to the `callback` function, which announces the actual winner.

## Implementing Random Number Function

You will find a code snippet in the 'Get a Random Number' section of the Chainlink documentation that will help you implement this random number fetch process.

The function call that enables this looks like this:

```js
uint256 requestId = i_vrfCoordinator.requestRandomWords(
  keyHash,
  s_subscriptionId,
  requestConfirmations,
  callbackGasLimit,
  numWords
);
```

This is the code you will insert into the existing code. After pasting the code, you will observe a multitude of red lines- don't worry; these will be resolved shortly.

This function requires a coordinator address, which is the address of the Chainlink VRF Coordinator to whom the random number is requested. This `keyHash` is your 'gas lane', and is something you can specify if you don't wish to consume much gas. Your `subscriptionId` is essentially the ID that you previously loaded with link to create requests.

The `requestConfirmations` is the number of block confirmations after which your random number is considered good, and the `callbackGasLimit` ensures you don't overspend on the request. Finally, `numWords` indicates the number of random numbers you require.

On receiving the request, Chainlink will return a `requestId`.

## Configuring the Constructor

The `keyhash` is subject to variation depending on the chain, so I prefer calling it the 'gas lane'. As it's a constant in your smart contract, add `gasLane` to the constructor, making it an immutable variable.

You will need the VRF coordinator's address, which is unique to each chain, and thus needs to be passed through the constructor and made an immutable variable.

Your `subscriptionId` will be specific to your Chainlink VRF subscription often received from the constructor, and the number of confirmations can be set as a constant variable- three confirmations being a common choice. The max gas for the callback function can be limited to prevent excessive gas costs caused by the second transaction when returning the random number.

<img src="/foundry-lottery/7-implement/implement2.png" style="width: 100%; height: auto;">

Finally, since you will only require one random number for selecting a winner, you can set the `numWords` as the constant variable equal to one. Now, when you fire and use Chainlink VRF, you can efficiently make a request.

## Receiving a Response From Chainlink

Implementing randomness into your contract is not simply about making request for a random number from Chainlink, you also need to be set up to receive that number back by implementing the function: `fulfillRandomWords`. This function is called by the Chainlink node, and should be set up to execute a specific action with the received random number- in this context, it will be selecting a lottery winner.

## Wrapping It Up

In summary, the steps to implement Chainlink VRF are as follows:

1. Make a request to Chainlink for a random number.
2. Chainlink sends back that random number to a specified function, using VRF.
3. Use the returned random number to pick a user as the lottery winner.

This lesson covered a range of helpful tips on how to deploy Chainlink, so feel free to go back through to fully understand the process. Generating secure and verifiable random numbers within the blockchain is an essential capability, and hopefully you now feel comfortable in deploying this for your future smart contracts. As always, happy coding!
