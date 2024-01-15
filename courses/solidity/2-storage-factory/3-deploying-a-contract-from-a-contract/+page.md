---
title: Deploying a Contract from a Contract (Factory)
---

*If you'd like, you can follow along with the course here.*




This chapter covers the process of deploying a Simple Storage contract in Solidity by saving it to a storage or state variable. This will be implemented similarly to saving any variable.

## Understanding the Syntax

Let's begin by recalling an example of assigning a variable: `uint256 public favoriteNumber`. This follows the format `type visibility name`. In our case, we are going to do the exact same thing.

The type of a Simple Storage contract will be `SimpleStorage`. The contract keyword here is similar to the Struct keyword, allowing us to create a new type.

<img src="/solidity/remix/lesson-3/deploying/deploying-4.png" style="width: 100%; height: auto;">


It is important to point out a syntax frequently used in Solidity and can be confusing for beginners: `SimpleStorage simpleStorage;`. The difference between `SimpleStorage` on the left and `simpleStorage` on the right lies in the case sensitivity. `Simple Storage` refers to the contract type while `simpleStorage` refers to the variable name.

<img src="/solidity/remix/lesson-3/deploying/deploying-3.png" style="width: 100%; height: auto;">


You will often find programmers naming the variable the same way as the contract itself.

## Creating A Simple Storage Contract

We will go ahead and identify our contract in our `createSimpleStorageContract()` function. To do this, we will assign `simpleStorage = new SimpleStorage();`. Solidity knows to deploy a contract when we use the `new` keyword.

This code should now succesfully compile. We can proceed to deploy it. Ensure that you are on the storagefactory.sol on the right-hand side, then scroll down to the contract. Now, you should be able to deploy the `StorageFactory`.

## Testing The Deployment

After hitting the deploy button, you can observe the transaction visibility in the terminal. You will notice two buttons: a blue `View Function` button, which is there because the public keyword automatically gives the variable name a getter function, and an orange `createSimpleStorageContract` button that corresponds to the transaction.

If we call the `createSimpleStorageContract` and then call `SimpleStorage` blue view function, the address that appears verifies that our `SimpleStorage` contract has been deployed.

<img src="/solidity/remix/lesson-3/deploying/deploy-factory1.png" style="width: 100%; height: auto;">


And just like that, you now know how to have a contract deploy another contract. Congratulations on tackling this important aspect of smart contract programming in Solidity. Despite the often subtle and sometimes confusing notation, the process itself is fairly straightforward. Familiarity comes with practice, so keep working with contracts and making deployments!