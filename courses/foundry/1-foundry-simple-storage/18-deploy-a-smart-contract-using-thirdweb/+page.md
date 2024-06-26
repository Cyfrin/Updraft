---
title: Deploy a smart contract using Thirdweb
---

_Follow along with this video:_

---

### What is Thirdweb

[Thirdweb](https://thirdweb.com/) is a development platform designed to streamline the process of building and deploying  Web3 applications, particularly those involving smart contracts. They help you with reduced complexity, faster deployment, security enhancement and extended management features.

### Deploying using Thirdweb

Get a fresh clone of the [Simple Storage repo](https://github.com/Cyfrin/foundry-simple-storage-f23/tree/main).

You don't need to configure a `.env` file, don't need to do any kind of setup or preinstall any dependencies.

All you need to do is run the following command `npx thirdweb deploy`.

**Note**: If you are unfamiliar with the npx command, it comes pre-bundled with the node.js and NPM installation. You can [download Node.js from here](https://nodejs.org/en/download).

After you install `Node.js` and run `npx thirdweb deploy` you'll be asked to install `thirdweb@5.7.0` (version might differ), press `y`. Then, after you make an account, the terminal will ask you what contract you want to deploy. 

More details are available [here](https://portal.thirdweb.com/contracts/deploy/overview).

On executing this command, Third Web will ascertain the project type, compile contracts, and permit you to choose the contract you wish to deploy. This action leads to the contract metadata getting uploaded to IPFS, resulting in automatic contract verification.

Following these steps, a browser tab will open where you can deploy your contract through a front-end interface. In circumstances where constructor parameters are required (they aren't in this case), you'll be able to fill them out directly.

Next, you select the chain you wish to deploy to. Third Web supports all EVM networks, from the popular ones like Base to custom networks if they aren't listed already. 

When you click `Deploy Now` you'll be prompted to sign two transactions. One is for the actual deployment of the selected contract, the other one is for adding that contract to your dashboard.

***Super easy, super safe!***

### Navigating Third Web's Dashboard

On successful deployment, the contract address will be visible, which you can copy for future use. The dashboard also offers several features for easy contract management:

- The Build tab facilitates effortless front-end interface creation for contracts with easy-to-use hooks in various languages.
- The Explorer tab allows the view and modifies the read and write functions of your contract. All functions you have in your contract are listed here.
- You can monitor the events related to your contract and even access the source code.

Next up, let's learn how to interact with a smart contract using the CLI!

