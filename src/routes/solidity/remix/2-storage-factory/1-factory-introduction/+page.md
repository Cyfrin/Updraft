---
title: Introduction
---
*If you'd like, you can follow along with the course here.*

<iframe width="560" height="315" src="https://www.youtube.com/embed/mlu8ISV3ZH4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Welcome back to our developer tutorial series! We've made our way to lesson three, where we'll dive deeper into the world of contracts, by discussing their deployment and interaction abilities. As always, all the resources for this session can be found in the [Github Repo](https://github.com/Cyfrin/foundry-full-course-f23#lesson-3-remix-storage-factory). For this lesson, we'll focus on the Remix Storage Factory.


## What To Expect in This Lesson

In this session, we'll be working with three new contract files, namely:

1. `SimpleStorage.sol` - we'll be working with a slightly modified version of this Smart Contract,
2. `AddFiveStorage.sol` - a completely new one for this lesson,
3. `StorageFactory.sol` - our main character for this lesson.

Our `StorageFactory.sol` will serve as a workshop, creating and deploying new Simple Storage contracts. It's crucial to note that other contracts can indeed deploy new contracts. Beyond deployment, our storage factory will also interact with these freshly minted contracts.

## Diving Deeper Into the Code

Before we delve into writing code, let's visualize how this whole thing works. We'll take you through these steps with the help of the Remix VM, let's take a look to the main functions we are going to work with.

```js
contract simplestorage {
    function createSimpleStorageContract() public {};
    function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public {};
    function sFGet(uint256 _simpleStorageIndex) public view returns (uint256) {}
    }
```

Follow along:

1. Compile our code and deploy to the Remix VM.
2. Scroll down to choose 'storage factory' from the contract selection.
3. Now we have deployed this contract.

The first function is `createSimpleStorageContract()`. We'll trigger this and see a new transaction appear. This transaction shows us deploying a Simple Storage contract from our Storage Factory contract.

As a bonus, we can interact with our Simple Storage contract via the `Store` function. This function accepts a favorite number input. Let's test this by using the `sfStore` function from our Storage Factory contract. We'll enter `0` as the index for our Simple Storage contract (as we've only deployed one so far), and we'll say our new favorite number is `123`. We'll execute `sfStore` and voila!

Now type `sFGet(0)`, we'll retrieve the favorite number 123 we stored earlier.


## Wrapping Up

Aside from the storage factory, this lesson is also about introducing you to critical Solidity features such as imports and inheritance. But remember this is just a introduction, we are going to dive on how this contracts works step by step on the next lessons.