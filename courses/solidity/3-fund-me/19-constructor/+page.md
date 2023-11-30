---
title: Constructor
---

_Follow along this chapter with the video bellow_

<iframe width="560" height="315" src="https://www.youtube.com/embed/GCi3LWYSk_g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Solidity: Bolstering Contract Security

Welcome to another exciting guide on Solidity. In this blog, we will further explore the complex, puzzling, but intriguing world of smart contracts. Our primary focus will be on securing the withdrawal functions in contracts. This effort ensures that only contract owners can withdraw funds, not just any layperson.

To sweeten the deal, I'll be using the same code we used in the previous video tutorial. Thus those familiar with the old code (or those brave enough to peek at the previous guide) will be at ease. Now let's dive in!

## Addressing the Security Gap

Every complex code has a potential loophole, and our contract code is no exception. In our current setup, anyone - you heard me correctly, anyone - can call the `withdraw` function and empty all the funds from the contract. Unacceptable, right? So we need to seal that loophole tightly, and the best way to do this is by restricting the withdrawal privilege to only the contract owner.

<img src="/solidity/remix/lesson-4/constructor/constructor1.png" style="width: 100%; height: auto;">

## Implementing the Constructor for Role Assignment

The crucial question now becomes: How can we set up this contract such that only the contract owner can call the `withdraw` function?

We could try to create a function, let's name it `callMeRightAway`. This function would assign the role of contract owner to the contract's creator as soon as the contract is deployed. However, this would require two transactions. As engineers, we strive for efficiency; we need a leaner solution.

Luckily for us, Solidity has a tool built for this task: the Constructor function. For those familiar with other programming languages, you'll notice the Constructor function is quite similar across the spectrum.

In Solidity, creating a constructor function is straightforward:

```js
constructor() {}
```

Note that we don't use the `function` keyword, nor do we need the `public` keyword. Remix will even conveniently highlight it pink for us.

## Using Constructor to Assign Contract Owner

Now that we have our constructor sorted out, let's discuss its functionality. The constructor function is immediately and automatically called when you deploy your contract, within the same transaction that deploys the contract.

Given this attribute, we can use the constructor to set an address as the contract's owner right after the contract's deployment.

```js
address public owner;
constructor() {
    owner = msg.sender;
}
```

Here, we initiated `address public owner;` a global variable which will hold the contract owner address. Then in the constructor function, we assign `msg.sender` to the owner variable. In this context, `msg.sender` refers to the contract's deployer.

## Modifying the Withdraw Function

With the contract owner now set using the `constructor`, the next step is to update the `withdraw` function, ensuring it can only be called by the owner.

```js
function withdraw() public {
    require(msg.sender == owner, "must be owner");
}
```

The `require` keyword checks to ensure that the `msg.sender`, which, as we noted earlier, refers to the caller of the function, must be the owner. If the caller isn't the owner, the operation reverts with an error message "must be owner."

## Wrapping Up

This modification essentially restricts the access to the `withdraw` function to the contract's owner, sealing the security loophole we identified earlier.

Once you've updated your contract, you're free to deploy, test your code, and appreciate the efficiency of our new smart contract. With this, you have a more secure and efficient contract.

Happy Coding!
