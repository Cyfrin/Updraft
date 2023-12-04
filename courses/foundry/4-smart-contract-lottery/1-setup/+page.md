---
title: Setup
---

_Follow along the course with this video._



---

Welcome back! I hope you enjoyed your break because we're about to dive into project number nine. As always, our goal is not just to teach you to build amazing projects, but to ensure you understand best practices and how to make your code look phenomenal.

## Getting Started

For the project, we'll be working with an **advanced lottery or raffle smart contract**. This won't just be an exercise in coding, but a chance to learn more about:

- Events
- Working with true random numbers
- Working with Modulo
- Chainlink automation
- And so much more.

Feel free to explore the code base right in the course down to lesson nine. No need to follow along right now, just watch and get a feel for what we're about to build.

<img src="/foundry-lottery/1-setup/setup1.png" style="width: 100%; height: auto;">

## A Closer Look at the Smart Contract

In this project, we're introducing some **professional Nat spec for an even better looking codebase**. A key feature here is the raffle or lottery smart contract. This contract includes various functionality such as:

- Enabling users to enter the raffle
- A unique `checkUpkeep` functionality
- A `fulfillRandomWords` function that chooses a winner and awards them a sum of money based on the entries
- Multiple getter functions

Having made sure our foundational setup is in place with `forge build`, we then move to our make file where we have different commands like deploying our smart contracts and interacting with the Chainlink automation.

## Building From Scratch

One crucial lesson we should all remember is that repetition is the mother of skill. The more you code, the better you get. As such, it advisable to code along, pausing the tutorial occasionally to try coding on your own.

We start fresh by creating a new Foundry project. Right before diving into code, it's essential to plan out what you want your project to achieve. Define those goals clearly, while making sure they align with the project's requirements. For the lottery project, the goals include:

- Users should be able to enter the raffle by paying for a ticket
- The lottery should automatically and programmatically draw a winner after a certain period
- Chainlink VRF should generate a provably random number
- Chainlink Automation should trigger the lottery draw regularly

**Rope in Chainlink for the win!**

- Chainlink VRF is an essential tool to instill trust in the lottery process. It generates a provably random number outside of the blockchain, ensuring the process is fair and transparent.- Chainlink Automation, a time-based trigger, eliminates the need for manual trigger of the lottery draw, making the process even smoother.

Given the goals, the functions necessary to achieve this are `enterRaffle` and `pickWinner`. The `enterRaffle` function allows users to buy a ticket to enter the raffle and the `pickWinner` function randomly picks a winner and awards them the accumulated entry fees.

## The Layout for Your Code

Code layout matters! As they say, "Clean code is a process, not a point in time." We can improve our code's layout and readability with the best practices we have learned.

<img src="/foundry-lottery/1-setup/setup2.png" style="width: 100%; height: auto;">

So let's get back to our Enter raffle function. You would probably want to set a ticket price or entry fee, right? Therefore, setting up an `entranceFee` state variable promptly at the top of the contract is recommended. We want to be mindful of our gas costs though, hence making the variable immutable.

```js
uint256 private immutable _entranceFee;
```

Creating a getter function for the entrance fee allows for transparency since the world can see the fee.

```js
// Getter functions
function getEntranceFee() external view returns(uint256){
    return _entranceFee;
}
```

We are just getting warmed up! There’s more to building this lottery contract. No worries, though, the journey to creating a provably fair, a provably random lottery, while learning and implementing best practices to making your code look phenomenal, is going to be amazing.

Let's jump in!
