---
title: Deploying to a Local Blockchain III
---

_Follow along with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/-PMG_wlBxfY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Deploying Contracts on Any Blockchain with Solidity

After familiarizing ourselves on how to deploy a contract to any blockchain using the command line, it's time to engage in another method of deploying our contracts. This method is particularly handy because it provides a consistent and repeatable way to deploy smart contracts reliably and its features enhance the testing of both the deployment processes and the code itself.

Contrary to the popular command-line approach, we create a script for our code deployment. This method enriches our learning process and makes the entire session enjoyable.

## The Solidity Contract Language

Foundry eases the whole process since it is written in Solidity. This means our deployment scripts will also be in Solidity. It is essential to distinguish Solidity as a contract language from Solidity as a scripting language. Foundry also incorporates elements that enhance our Solidity experience beyond the smart contracts realm. So, let's get started on creating a script to deploy our simple storage contract.

### Creating the Deployment Script

To create the script, follow these easy steps:

1. Go to our script folder.
2. Right-click on a new file.
3. Create the file deploy `DeploySimpleStorage.s.sol`.

The letter `S` in `s.sol` is a Foundry custom. Usually, scripts bear an `s.sol` extension instead of sol.

Inside it, we are going to write our contract in Solidity to deploy our smart contract.

And by the way, this script is written in Solidity but should not be considered as a contract for deployment. It is solely for deploying our code. Since it is written in Solidity, we start with the MIT SPDX License Identifier as usual.

Check out the Foundry documentation for a comprehensive understanding of Solidity scripting in the tutorials section.

To notify Foundry that our contract `DeploySimpleStorage.s.sol` is a script, we need to import additional code.

Here is the code sample:

```js
    //SPDX-License-Identifier: MIT
    pragma solidity ^0.8.18;
    contract deploySimpleStorage{}
```

Founder also has a lib folder which entails the Forge STD. Forge STD stands for Forge Standard Library. The library bears numerous beneficial tools and scripts for working with Foundry.

Let's now make our contract `DeploySimpleStorage.s.sol` inherit from the functionality of this script by importing `forge-std/Script.sol` and stating is script. Foundry will then understand that this contract is a script.

For clarification, our Deploy Simple Storage requires knowledge of our simple storage contract. Therefore, we'll import that too. We must also bear in mind that there is a superior method to run imports, known as named imports.

Now here is where it gets exciting. Every Deploy or script contract should have a primary function known as Run. This function executes when we need to deploy our contract.

Here is the code snippet:

```js
 function run() external returns (SimpleStorage) {
        vm.startBroadcast();

        SimpleStorage simpleStorage = new SimpleStorage();

        vm.stopBroadcast();
        return simpleStorage;
    }
```

### Using Cheat Codes in Foundry

In the Run function, we are going to use a distinctive keyword: vm. Foundry has a distinctive feature known as cheat codes. The vm keyword is a cheat code in Foundry, and thereby only works in Foundry. You won't have much success trying it out in Remix or any other framework. Though, if we're inheriting Forge STD code, the vm keyword comes in handy.

You can learn more about Foundry cheat codes in the Foundry documentation and Forge Standard Library references section.

Are you confused about the vm keyword? No worries! The vm keyword is just a tool for controlling the interactions with Forge's local Ethereum testnet. We're using it here to specify that all the activities within the `startBroadcast` and `stopBroadcast` functions should take place on-chain.

We deploy our simple storage contract via the `new` keyword. Simple Storage, denotes the contract, and simple storage the variable, are quite different.

The new keyword in Solidity creates a new contract. It is also going to come up with a new contract amid the vm Star broadcasts. Should you find this a bit confusing, don't worry. We shall delve into the details later in the course. For now, remaining focused is the key. And finally, we can say return Simple Storage.

## Testing the Deployment

Now to the exciting part. It's time to test our script by running it. If Forge is already running, we can kill it using the control C command. Now, let's ru:

```bash
forge script script/DeploySimpleStorage.s.sol
```

Ensure you adhere to the Solidity standards for smooth running.

If an error message pops up about Solidity versions, just change both versions in the code to use the caret (^) symbol in order to allow use of the highest non-breaking version.

Once everything is set, it's time for the real thing. First, compile the scripts to be deployed and the simple storage contract using version 0.8.19.

## Running Anvil

If we try to run the Forge script without Anvil, Foundry will automatically deploy the contract or run the script on a temporary Anvil chain.

But the beauty of Anvil comes in when we wish to simulate on-chain transactions. You can do this by passing an RPC URL when running the script. Once this is done, Anvil keeps records of previous deployments in case you need to refer to them.

A final test is done by deploying the script to the blockchain. You use the `broadcast` command to send this out and also provide a private key to sign the transaction with.

If all goes successfully, you'll be greeted with the message "on chain execution complete and successful".

Hope this tutorial was insightful. Let's explore more in our next learning chapter!
