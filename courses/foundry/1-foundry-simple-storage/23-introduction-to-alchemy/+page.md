---
title: Introduction to Alchemy
---

_Follow along with this video:_

---

### What is Alchemy?

Alchemy is a development platform that provides a suite of tools and infrastructure for blockchain developers. Alchemy is the AWS for web3.

Here are some key features of Alchemy:

- Node infrastructure: Access to various blockchain nodes (Ethereum, Polygon, Arbitrum etc.) for running decentralized applications (dApps).
- API access: Interact with blockchains programmatically through Alchemy's APIs for tasks like fetching data, deploying smart contracts, and managing transactions.
- Developer tools: Alchemy offers developer tools to streamline the development workflow, including a debugger, monitors, and a mempool viewer.
- Analytics: Get insights into blockchain activity and application performance with Alchemy's analytics tools.

### How does Alchemy do all these?

Alchemy aims to improve your development experience by masterfully combining the above-mentioned features. 

The platform's primary component is the Supernode, a proprietary blockchain engine that works as a load balancer on top of your node.

As its name suggests, the Supernode ensures data from the blockchain is always up-to-date and readily available. Using the Supernode as a foundation, Alchemy has built the Enhanced APIs—a set of APIs that makes pulling data from the blockchain a breeze.

To put it simply, the Alchemy Supernode sits at the core of its ecosystem, powering up functionalities like Enhanced APIs and monitoring tools while supporting multiple chains.

### How to get started?

But ... we already did get started with Alchemy, back in [Lesson 20](https://updraft.cyfrin.io/courses/foundry/foundry-simple-storage/deploying-smart-contract-testnet-sepolia) we learned how to make an account, create an App and obtain a Sepolia RPC URL.

Please [login](https://auth.alchemy.com/?redirectUrl=https%3A%2F%2Fdashboard.alchemy.com%2Fsignup%2F) and open your App in the dashboard. 

This dashboard provides crucial insights into your application and infrastructure health, such as latency, compute units, and transaction success rate, which can be valuable for debugging and identifying issues.

If you observe a lower success rate for your transactions, go to the `Latest Invalid Request` tab. This will list all unsuccessful requests along with the reasons for their failure, making it easier for you to debug and fix issues.

Another extremely important feature is the `Mempool` watcher. You can access this by clicking on `Mempool` on the left panel of your dashboard. Here you can see all the transactions from all your apps.

[***By the way, what is a mempool?***](https://www.alchemy.com/overviews/what-is-a-mempool)

The Mempool watcher provides extensive details about your transactions, such as:

- Transaction status (mined, pending, dropped, replaced);
- Network;
- Block number;
- Gas used;
- Time taken for validation;
- Transaction value;
- Sender's and receiver's address;

You can filter the transactions by `Mined`, `Pending`, `Dropped & Replaced` and `Dropped`. All this for all/a specific app, in a certain timeframe.

To sum up, Alchemy is a revolutionary platform that brings a plethora of tools to aid your Web3 development experience. From Supernode to Enhanced APIs and crucial troubleshooting tools, Alchemy is undeniably a game changer in the world of decentralized applications.

You can find more about what can you do and how to do it in [Alchemy's documentation](https://docs.alchemy.com/). Give them a follow on X at [@AlchemyPlatform](https://twitter.com/alchemyplatform) and [@AlchemyLearn](https://twitter.com/alchemyLearn).

Moreover, Vitto loves hearing about other people's projects, so tag him using [@VittoStack](https://twitter.com/VittoStack).