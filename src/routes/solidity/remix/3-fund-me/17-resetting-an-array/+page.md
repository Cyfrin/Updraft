---
title: Resetting an Array
---

_Follow along this chapter with the video bellow_

<iframe width="560" height="315" src="https://www.youtube.com/embed/0KRhBO6JgSM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

In the previous lesson on smart contracts in Ethereum, we discussed how to handle value funds and introduced the `mapping` keyword with Ethereum's Solidity. In this stage of our course, our main focus will be on how to reset an array effectively and to withdraw funds appropriately from our smart contract.

Now, you might remember that we have two overdue tasks from our last session:

1. Resetting the array
2. Withdrawing the funds

Let's get started by tackling these one by one.

## Resetting the Array

We have previously learned that one can accumulate value in the `msg.value` function with a fund function and then subsequently reset the funders array. For this purpose, we can adopt the same tactic we previously employed with 'mapping'; accessing and resetting each single address at each index.

However, there also exists a simpler solution: let's just recreate the whole funders array anew! Here's how you can do that:

```js
funders = new address[](0);
```

The `new` keyword, you may recall, we used in a different context within our last course - deploying a contract. Its use here, however, is to reset the `funders` array. This equates to initializing a brand-new, blank address array.

I want to take a moment here to remind you that this particular use might initially seem perplexing. Nonetheless, it is crucial not to let it deter your learning progress.

<img src="/solidity/remix/lesson-4/arrays/arrays1.png" style="width: 100%; height: auto;">

Now that we successfully reset the array, our next step would be to handle the fund withdrawal from the contract.

## Withdrawing the Funds

For this section, I would refer back to a course we had done previously as the content to withdraw funds aligns precisely with this function. If you need a refresher.

Remember, even if we're dealing with a smart contract this round, the concept remains the same, even in a JavaScript runtime environment, like Remix VM.

Code functionality, be it resetting arrays or withdrawing funds, may seem simple on the surface but they carry great weight in the realm of smart contracts. Remember, clarity of function and security of execution is the mantra to follow in our line of work. Remain persistent and keep exploring. Happy coding!
