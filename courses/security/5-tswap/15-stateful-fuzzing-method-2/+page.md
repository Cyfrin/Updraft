---
title: Stateful Fuzzing Method 2
---

_Follow along with the video:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/kB3CIfSXetc?si=o3nPT71dAc2i7YrQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Working with Smart Contracts Using Foundry: Setting up Handlers and Invariant

In this digital world where cryptocurrencies like Bitcoin, Ethereum, and others are trending, it's essential to understand how to use and create smart contracts. This article will guide you on how to create two new contracts utilizing Foundry; a known blockchain testing framework. The contracts to be created are `handler.t.sol` and `Invariant.t.sol`.

Coming along, we will also explore how to work with the `fail on revert` function.

## Setting up the Handler Contract: `handler.t.sol`

Handling smart contracts could be complex, especially if you're a beginner. However, with Foundry, we can manage our function calls to focus on vital operations for our code base, resulting in a less error-prone contract.

Consider the idea that we have two types of users in our system; one who can deposit and another, withdraw. This simplification gives us a better sense of controlling bugs by ensuring an easier flow of interactions. Consequently, the `fail on revert` option should ideally be set to true. This validation will allow us to confirm the validity of our tests.

When set to false, if our fail on revert test passes, it presents no valuable insight because there are too many pathways for the fuzzer to follow, potentially calling irrelevant functions. Although starting with the fail on revert set to false can be a suitable starting point, the intention should always be to work towards getting it set to true.

Now, to the creation of our `handler.t.sol`. This particular contract will be set up as the intermediary for restricting the `handler stateful Fuz catches` contract.

Through the handler, we will instruct our Foundry and `Stateful Fuzzing Test Suite` to correlate with the `handler stateful Fuz catches` contract appropriately. We are essentially telling the Foundry when to call deposit, to approve, mint, and have the tokens. Likewise, when to call withdraw; all these with precise guidelines on avoiding explosive function calls.

In the handler contract, specific lines are written for the 'ERC20 token' and the 'USDC token'. Here's what the snippet looks like:

This handling setup focuses on 'deposit' and 'withdraw' functions thus curbs randomness and gives our fuzzer more accurate paths to follow, thereby giving correct and more reliable test results.

## Setting up the Invariant Contract: `Invariant.t.sol`

The `Invariant.t.sol` involves creating the invariant test. Here, unlike in the handler contract `handlerT.sol`, we are particularly interested in an invariant that interacts with the handler contract and not the actual contract.

To begin setting up `Invariant.t.sol`, start by importing the handler with a line of code that looks like this:

Consequently, instead of fuzzing the actual contract, we are going to fuzz the handler in a process that is easier and more sensible. The logic is that we want our transactions handled in a way that makes sense and thus the adoption of the `fuzz selector` as seen in the code below:

This instructs the contract that the selectors and the target address to be used are those outlined in the handler.

## In Conclusion

Setting up the `handlerT.sol` and `Invariant.t.sol` contracts helps break down the complexity of dealing with smart contracts. By implementing these contracts, we have given Foundry a framework to follow that makes its function calls more logical and less random. Therefore, we no longer have to deal with reverts, and we can focus better on our tests, making our iterations more meaningful and insightful.

Remember, the best way to become proficient at handling smart contracts is repetition. Practice by trying these methods out on your old code bases, which should help you improve your coding skills and understanding of stateful fuzzing. You don't have to become an expert all at once; take small steps and ask questions when you face roadblocks.

All being said, smart contracts could save significant time, reduce the risk of manual errors, and thus revolutionize the way we perform secure transactions. Learning how to work with them will not only keep you relevant but also give your work an edge.

> Note: This article assumes that you have a basic knowledge of smart contracts Foundry and programming. It might be helpful to do a bit of reading if you're not familiar with these topics.

Happy coding!
