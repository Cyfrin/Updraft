---
title: Modifiers
---

_Follow along this chapter with the video bellow_

<iframe width="560" height="315" src="https://www.youtube.com/embed/FfBPHTBSzk0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

In an earlier lesson, we looked at Solidity and how to create smart contracts on the Ethereum blockchain. One of the most useful aspects of Solidity, especially when dealing with functions that should only be called by a certain administrator or contractor, are its modifiers. In this piece, we are going to dive deep into how modifiers can simplify our code and boost productivity.

## The Problem with Repeated Conditions

Let's imagine we have a smart contract full of administrative functions; these functions should only be executed by the contract owner. The straightforward way to achieve this is by adding a condition to every function to check whether the caller (message sender) is the owner:

```js
require(msg.sender == owner, "Sender is not owner");
```

However, having to copy and paste this line of code in every function is a surefire way to clutter our contract, making it more difficult to read, maintain, and debug. What we need is a technique or tool to bundle up this common functionality and apply it to our functions when necessary. This is where Solidity's modifiers come into play.

## Introducing Solidity Modifiers

A modifier in Solidity allows us to embed functionality easily and quickly within any function. They are like regular functions but are used to modify the behavior of the functions in our contract. Let’s create our first modifier.

Here is how we create a modifier:

```js
modifier onlyOwner {
    require(msg.sender == owner, "Sender is not owner");
    _;
}
```

**Note**: The modifier's name is 'onlyOwner', mimicking the condition it checks. There's also this weird underscore (`_`) sitting right there in our code.

### Understanding the `_` (Underscore) in Modifiers

The underscore in the modifier signifies where the remaining code of our function will execute. So if you stick it right after the `require` statement, your function's logic will run only if the `require` condition is met.

Here's an example of how we can apply the `onlyOwner` modifier to our contract's `withdraw` function:

```js
function withdraw(uint amount) public onlyOwner {}
```

Now when `withdraw` is called, the smart contract checks the `onlyOwner` modifier first. If the `require` statement in the modifier passes, the rest of the function's code is then executed. We can see how this not only streamlines our code, but also enhances visibility of function behaviours.

## The Order of Underscores in Modifiers

<img src="/solidity/remix/lesson-4/modifier/modifier1.png" style="width: 100%; height: auto;">

For instance, assuming that all the necessary conditions in our `onlyOwner` modifier have been met, if we had the underscore above the `require` statement, the contract executes the `withdraw` function's code first before executing the `require` statement.

## Summary

In essence, modifiers offer a smart and effective way of handling preconditions in our functions, without having to repeat lines of code. Now, the next time you find yourself having to copy, paste, and check the same line of conditions in multiple functions, consider using a modifier instead- because the best developers, they never work harder, they work smarter.

In upcoming lessons, we'll look into advanced modifier usages and explore more ways to optimize our smart contract code. Stay tuned!
