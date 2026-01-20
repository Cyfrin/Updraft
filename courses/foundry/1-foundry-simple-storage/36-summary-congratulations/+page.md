---
title: Summary & Congratulations
---

_Follow along the course with this video._



---

## Celebrating Milestones in Foundry: A Complete Walkthrough of Our Recent Project

You should feel a warm sense of accomplishment envelop you. Completing an entire project in Foundry is no mean feat. A hearty congratulation is in order for such an indomitable effort. This article serves as a quick, yet comprehensive, recap of everything we learnt in our project, proceeding into our next engagement. From the onset, rest assured, we are set to advance our Foundry skills, push upcoming projects on GitHub, and familiarize ourselves with advanced tooling.

## A Quick Trip Down Memory Lane: Key Takeaways from the Project

Firstly, we journeyed through the process of creating a new Foundry project using Forge and Knit. These essential tools afforded us a structured, professional environment complete with folders to keep our work organized.

We not only learnt about Foundry’s basic commands but also their specific functionalities such as:

- **Cast**: interacts with contracts that have been previously deployed.
- **Forge**: compiles and interacts with our contracts.
- **Anvil**: deploys a local blockchain, similar to another tool we used, Ganache.

A pivotal part of our learning process was comprehending that sending a transaction via our MetaMask is tantamount to making an HTTP post request to a particular RPC URL. A similar RPC URL can be obtained from a node-as-a-service provider like [Alchemy](https://www.alchemyapi.io/) and used to send transactions directly from our Foundry projects.

We obtained practical knowledge on how to compile code in Foundry and write a Solidity script for its subsequent deployment. We also find it critical to ensure the security of our private keys. Hence, throughout this course, we will be using an `.env` file. But be warned when dealing with real money, having your private key in plain text is not advisable.

## Understanding Contract Deployment and Interaction on the Blockchain

We delved into the automation of contract deployments to a blockchain. Post-deployment, we interacted with them using the `cast` keyword and `send` to make transactions, then `cast call` to read from those contracts.

Moreover, the knowledge on how to auto format contracts with `Forge format` was acquired. We also learnt the painstaking yet rewarding manual method of verifying our contracts on the blockchain.

```bash
forge format my_contract.sol
```

![summary1](/foundry/23-summary/summary1.png)

## Looking Ahead

With these tools in your web development arsenal, you've performed exceptionally well – and yes, you should be incredibly proud. Remember, even something as small as installing tools like `Vs code` and `Foundry` can pose great difficulties, so, you're doing fantastic.

Take a breather. Remember, breaks enhance productivity. Till next time, continue to strive for greatness in every line of code you write!

![summary2](/foundry/23-summary/summary2.png)
