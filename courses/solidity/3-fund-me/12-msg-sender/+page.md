---
title: Message Sender (msg.sender)
---

*Follow along this chapter with the video bellow*

<iframe width="560" height="315" src="https://www.youtube.com/embed/sSlMakVGEHg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


As you continue to dive deeper into the world of Solidity, you may find yourself wondering: "How can I keep track of users sending money within a contract?" and "How can I easily look up how much each user has spent?" In today's lesson, we'll walk through how to achieve this using Solidity's global variables, arrays, and mappings.

## What are we doing next?

The first task at hand is to create a mechanism within the contract that keeps track of the users (addresses) who send money to the contract. For this purpose, we will create an array of addresses. The array will constantly be updated depending on who sends us money.

```js
address[] public funders;
```

Note that the array is `public`. Meaning, it is accessible to anyone who interacts with the contract.

We will then update this array whenever money is incoming. Let's indicate this action by adding:

```js
funders.push(msg.sender);
```

The `msg.sender` global variable is a key feature in Solidity. It refers to the address that initiates a transaction (i.e., the sender of the transaction). In essence, we're saying "whenever someone sends us money, add their address to the `funders` array".

<img src="/solidity/remix/lesson-4/sender/sender1.png" style="width: 100%; height: auto;">


## Mapping addresses to their funds

Let's take this a step further and also associate the address of each funder to the amount sent using mappings.

This mapping will make it easier to look up the total amount each user has sent quick and easy. Let’s denote a mapping within Solidity as:

```js
mapping (address => uint256) public addressToAmountFunded;
```

In Solidity, we now also have the capability to name the types in your mapping which adds clarity to our code. Here's an example:

```js
mapping (address => uint256 funderMappedToAmountFunded) public addressToAmountFunded;
```

In this line of code, the variable name `addressToAmountFunded` is highly explicit and self-explanatory. It adds what is commonly referred to as "syntactic sugar," making it easier to read what the mapping is about.

Finally, let’s complete this mapping by adding the amount the user sends to their total funds.

```js
addressToAmountFunded[msg.sender] += msg.value;
```

## What Have We Achieved?

<img src="/solidity/remix/lesson-4/sender/sender2.png" style="width: 100%; height: auto;">

We now have a way to keep track of funders sending money to our contract and to easily determine how much they've sent in total. This knowledge will aid in designing more complex contracts in the future, as well as creating a more intuitive and user-friendly blockchain experience.

Be sure to join us for our next tutorial to further your understanding of Solidity and blockchain!

