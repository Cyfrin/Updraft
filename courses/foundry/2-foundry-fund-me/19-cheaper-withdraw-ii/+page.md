---
title: Cheaper Withdraw (Continued)
---

_Follow along with this video._



---

As budding young developers navigating through the intricacies of gas optimization in Ethereum, the issue of storage is one area that arguably minces no words. Sure, it could appear all fancy and sophisticated if you squint your eyes at the right angle – but we have to ask ourselves: why all this fuss about storage?

The reason is hardly elusive: reading and writing from storage is an overwhelming expense on our tightly-strapped gas resources. Unpicking or compressing any data stored in it drains the gas faster than you can imagine.

Let's delve into this a little deeper to help iron out the creases:

## The Web of Bytecode:

When you compile your solidity code, it gets whittled down to bytecode per se. This enigmatic-looking bytecode can be unhashed to find the correlation between gas consumption and how storage is utilized when your contract is running on the Ethereum Virtual Machine (EVM). For this, you could simply switch over to [Remix](https://remix.ethereum.org/), hit compile, navigate to the compilation details, and select bytecode.

When we scroll down to the end, we'll uncover two vital entities: Object and Opcodes. The object is an intricate pattern of your contract in bytecode, and the Opcodes are simply the bytecode version translated into a rudimentary set of instructions. Each Opcode — the lowest level of computer language — tattoos specific gas costs on each operation it conducts; the costs quickly aggregate to a monumental sum when you perform an operation through EVM.

We scroll through the Opcodes and observe a pattern in gas costs – most of them like addition, multiplication, and division cost around two or three gas. And then, boom!

<img src="/foundry-fund-me/18-cheaper-2/cheaper1.png" style="width: 100%; height: auto;">

`SLOAD` is the Opcode that reads from storage, and it sets you back by a massive 100 gas. Similarly, S-store saves to storage, costing us the same gargantuan amount of gas. This instantly makes us realize the vast chasm of difference between storage and alternate operations, which usually cost just a few gas.

## Aiming for Optimization:

But the conversation shouldn’t stop there. The dialogue around storage also goes beyond to unearth the possibility of a memory-load (M-load) and a memory-store (M-store) which cost just three gas each. We’re staring at a stark disproportion here: it’s almost 33 times more expensive to read and write from storage than it is to access memory. So, voila! The most straightforward initiative to optimizing gas is to perform read-write actions from memory, respecting the notion of expensive storage access.

Having keyed into this knowledge, we spring back to our FundMe contract’s withdrawal function. To dodge ransacking the holistic storage multiple times, we replace the subsequent reads with a prerecorded memory variable. We can quickly establish the new function for cheaper withdrawal. In this manner, we alter the looping process by initially reading from the storage just once and replace further iterated reads with a memory variable.

This yields the revised code:

```js
function cheaperWithdraw() public onlyOwner {
        address[] memory funders = s_funders;
        // mappings can't be in memory, sorry!
        for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        // payable(msg.sender).transfer(address(this).balance);
        (bool success,) = i_owner.call{value: address(this).balance}("");
        require(success);
    }
```

## Comparative Testing and Results

With that code snippet fleshed out, we can simply copy and adapt our previous test function, amending the call to use 'cheaperWithdraw'. Next, we establish a gas snapshot to encapsulate all of our tests. This can be done with the `forge snapshot` command in the terminal. We can then compare the gas usage of the two functions: the original `withdraw` and the optimized `cheaperWithdraw`. Already, we can observe an improvement with an approximate saving of 800 gas.

## Style Guidelines in Etherem Development

The brandishing of style guides in developmental structure is a cornerstone to efficient coding. While ensuring code readability, it also provides a recognizable attribution to certain key identifiers in a solidity code environment.

In the Chainlink style guide, for instance, immutable variables are prefixed with `i_` while storage variables bear `s_`. These prefixes act as signals to the coders about the nature of these variable and the subsequent gas costs associated with them. It provides an opportunity for developers to consider cheaper alternatives like memory variables over storage variables.

The [Solidity Documentation](https://docs.soliditylang.org/en/v0.8.4/style-guide.html) provides a comprehensive guide to code layout, function names, and more. Chainlink has its own style guide, which is linked to the GitHub repo for this article.

## Wrapping Up

This blog was all about imparting the importance of optimizing storage access in order to conserve gas in contract execution. It’s crucial to adapt to these techniques early on in your career as a blockchain developer. The ability to identify and adapt constructs that optimize gas usage will undoubtedly enhance your proficiency in developing efficient, less costly smart contracts.

Remember that while it might seem like a small gain in the beginning, these savings will aggregate into substantial saving when you’re dealing with larger scale operations. You've done great work today! It's time now to push this code up to your GitHub and celebrate your first smart contract project.
