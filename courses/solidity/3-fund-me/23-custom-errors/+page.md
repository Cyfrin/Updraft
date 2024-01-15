---
title: Custom Errors
---

_Follow along this chapter with the video bellow_



## Optimizing Smart Contracts for Gas Efficiency Using Custom Errors

Hello, everyone! It's great to have you back. In this lesson, we'll be taking strides to improve the efficiency of our smart contracts. Recently, we've emphasized making our contracts more gas-efficient. Little by little, we've introduced elements of gas efficiency — something I will be explaining further as we delve deeper into the complexities of smart contracts.

For now, let's not get too bogged down in the nitty-gritty details of these gas efficiencies. If you find the details too complex, don't sweat! We will elaborate on them later.

## Existing Gas Optimizations

With recent enhancements, we're able to adopt more efficient approaches with our contracts. Let's discuss our current gas optimizations and how to improve yet further.

## Enhancing Efficiency: Updating Requires

One way to elevate our gas efficiency is by updating our `require` statements. As it stands, our `require` statement forces us to store this 'sender is not an owner' as a string array. When you consider how each character in this error log is stored individually, it quickly becomes apparent that the logic required to manage it all can be bulky and inefficient, especially when there is a far more gas-friendly alternative available.

## Utilize Custom Errors for Reverts

Introduced with Solidity 0.8.4, we can now take advantage of custom errors for our reverts. This feature allows us to declare errors at the top of our code, and utilize `if` statements instead of `require`. All our error calls will no longer need to address the entire error message string - instead, we'll simply call the error code.

Let's break this down into a practical example.

Instead of using the `require` statement, we could create a custom error of our own:

```js
error NotOwner()
```

Please note that this definition is out of the contract's scope. With our custom error defined named 'NotOwner', we can amend our 'onlyOwner' function.

Firstly, we'll replace the `require` function with an `if` statement:

```js
if (msg.sender != I owner) {}
```

By using the `revert` function with our newly-created 'NotOwner' error, we replace the necessity for the error string.

```js
revert NotOwner();
```

This strategy saves us resources as we no longer need to store or emit an extensive string, and instead, rely on the much more efficient error code.

Please bear in mind, this less efficient coding style is still prevalent as custom errors are relatively new to Solidity. Hence, becoming proficient in both methods will prove beneficial.

<img src="/solidity/remix/lesson-4/errors/customerrors1.png" style="width: 100%; height: auto;">

While the current syntax is more abundant, I anticipate, as the shorthand syntax gains popularity, we will see a shift towards the more legible and compact style.

## The Power of Revert

The "revert" keyword performs the same function as `require`, but it doesn't need a conditional statement beforehand. Therefore, it provides an efficient way to revert any transaction or function call midway through the function call.

Improving our require statement is just one way to increase gas efficiency. We could convert all of our require statements to this more efficient form, but I'll leave some in their original state in this post to illustrate both methods.

Stay tuned for more posts where we delve deeper into the finer details of Solidity and its best practices.
