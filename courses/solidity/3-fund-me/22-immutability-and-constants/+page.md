---
title: Immutability and Constants
---

_Follow along this chapter with the video bellow_

<iframe width="560" height="315" src="https://www.youtube.com/embed/BLLyOCo-GKU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

The Solidity programming language provides tools for improving the efficiency of smart contracts. These tools can be useful when modifying existing contracts to achieve higher levels of professionalism. Although contracts might not reach an 'end to end' level of amazement, they can certainly become better. This blog post focuses on how to utilize these tools in the case of variables set only one time. We will explore this through the optimization of example variables, namely, `owner` and `minimumUSD`.

## Identifying Variables for Optimization

We talk about `owner` and `minimumUSD` because once these variables are set in our contract, they never change again. Specifically, the `owner` gets set one time during our contract creation whereas the `minimumUSD` gets set one time outside of the constructor function itself. Solidity has some tools that make the process of setting these variables more gas efficient.

Let's use an example contract, named `FundMe`, to illustrate this. We first compile and then deploy this contract onto a JavaScript virtual machine. Money related actions such as funding and withdrawing aren't operational since there's currently no Chainlink network on our JavaScript VM. However, that's not what we're primarily concerned with right now.

## Evaluating the FundMe Contract

Our concerns are twofold:

1. The amount of gas required to send the contract.
2. The gas cost required to create the contract.

To give a sense of scale, creating this contract initially costs about 859,000 gas. Throughout this lesson, we're going to learn some tricks to reduce this number.

## Implementing Tricks: Constant and Immutable

The two tricks in focus today are `constant` and `immutable` keywords. The Solidity language provides these keywords to ensure that your variables remain unchanged. To understand these keywords in greater depth, consult the [Solidity documentation](https://solidity.readthedocs.io/).

We can apply the `constant` keyword to a variable that we assign once outside of a function and then never change afterwards. If it's assigned at compile time, we can add the `constant` keyword. Adding the 'constant' keyword has an additional benefit in that it prevents our variable from occupying a storage slot, thus making it easier to read.

### Constant Optimization

To assess the benefits of adding the 'constant' keyword, let's contrast the gas usage between both contracts. Remarkably, applying the 'constant' keyword results in a saving of approximately 19,000 gas. This reduction is of the order of the gas cost necessary to send Ethereum. However, keep in mind that naming conventions for 'constant' variables usually involve all caps with underscores (e.g. `MINIMUM_USD`).

A little experiment to corroborate this: if we remove the 'constant' keyword and repeat all actions, the system indeed shows higher gas cost for non-'constant' variables. This might not make much difference in cheaper chains but for expensive chains like Ethereum, it's going to be significant.

- As an aside, to convert gas cost to actual monetary terms, you can take the current gas price of Ethereum and multiply this by the cost of calling our 'minimumUSD'.

<img src="/solidity/remix/lesson-4/constants/constant1.png" style="width: 100%; height: auto;">

### Immutable Optimization

While 'constant' variables are assigned outside of a function, 'immutable' keyword can be used in case we want to assign a variable within a function, but only once. A good practice for specifying 'immutable' variables is prefixing the variable with 'I\_' (e.g. `i_owner`).

For our 'owner' variable, we can't set it in the global scope because no function is executing there. However, in functions, there's a message sender. So, we set `i_owner` to message sender within the function. We then modify our 'Require' statement in the contract to check against `i_owner` instead of 'owner'.

Comparing the gas usage after making 'owner' an 'immutable' variable, we observe savings similar to the 'constant' case.

## Wrapping up and looking forward

These small gas optimization tricks will make a world of difference in running smart contracts. However, as you're learning Solidity, don't fret about making your contracts as gas efficient as possible from the get-go. As you become more seasoned and grasp Solidity efficiently, you can revisit and work on gas optimization.

<img src="/solidity/remix/lesson-4/constants/constant2.png" style="width: 100%; height: auto;">

Optimized contracts store variables directly into the bytecode of the contract instead of storing them inside a storage slot. The implications of this fact will unfold more clearly as you grow in your Solidity journey, so stay tuned!
