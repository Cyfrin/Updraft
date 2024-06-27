---
title: Welcome & Setup
---

_Follow along the course with this video._



---

Welcome to Lesson 7, where we will cover 'Foundry FundMe,' a crucial part of our smart contract journey. The aim of this lesson is to learn how to professionally deploy the code, master the art of creating fantastic tests, and gain insights into advanced debugging techniques.

## Your First GitHub Contribution

This will be the first codebase that you will be contributing to GitHub yourself. Using a version control system such as GitHub, GitLab, or Radical is integral to being part of the Web Three ecosystem. For this lesson, we will be utilizing GitHub, given its popularity.

## Understanding the Foundry FundMe

We start by delving into the FundMe contracts that we created previously. The source folder (`src`) contains these contracts, exhibiting the advanced syntax with all caps constants and underscores (`i_`, `s_`) fore immutables and storage/state variables, respectively.

Until now, we talked a lot about storage and state, but we didn't delve into what they really mean. Through a 'Fun with Storage' example, we will uncover these concepts in this lesson. This will form the backbone of understanding how to make contracts more gas efficient. Hence, making transactions less expensive for users.

## Taking the Plunge

All right, let's jump into the code!

We will be working within our VS code, in our Foundry `F23` folder. To date, the only folder we have created is `foundry-simple-storage`. Now we will create a new one called `foundry-FundMe-f23` using the `mkdir` (make directory) command.

```bash
$ mkdir foundry-FundMe-f23
```

Using the `ls` (list) command, we will see these two folders. Following this, we will initiate VS code in the newly created `foundry-FundMe-f23` folder.

```bash
$ code foundry-FundMe-f23
```

<img src="/foundry-fund-me/1-setup/setup1.png" style="width: 100%; height: auto;">


Once we set up our new VS code, we can initialize our blank Foundry project using the `forge init` command.

```bash
$ forge init --force
```

## Understanding the Fundamentals through Counter.sol

Subsequently, we come across the counter.sol contract within the `src` (source) folder. This is a basic contract that allows us to understand the foundational principles in depth. The contract has a `setNumber` function, an input parameter, `uint256 newNumber`, which modifies the variable as per the new number.

It also includes an `increment` function employing the `++` syntax equivalent to the expression `number = number + 1`.



```js
function increment() public {
    number = number + 1;
}
```

## Deploying the Code

Further, we learn how to deploy this code using Foundry scripts and make it easier to run these contracts on different chains requiring unique addresses. We also acquire insights into how to use Foundry scripting to interact with our contracts in reproducible scripts instead of always from the command line.

## Wrapping Up

By the end of this lesson, you should have a thorough understanding of this code, how to use it, discuss it effectively, and more importantly, how to write fantastic tests for your contracts. This is a crucial skill for any aspiring smart contract engineer.

Upon completion, you should 100% share the project on your GitHub and social channels. Remember, this lesson is an enormous step in your Smart Contract journey.

Keep learning and let's get started with the Fund Me project!