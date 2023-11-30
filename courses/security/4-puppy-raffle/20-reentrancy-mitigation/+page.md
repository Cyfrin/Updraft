---
title: Reentrancy - Mitigation
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://youtu.be/LbxQz6D2sP4" title="YouTube Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Solving Reentrancy Attacks in Smart Contracts

In today's discussion, we will figure out possible methods to deal with common challenges we face while working with Smart Contracts. There are different ways to solve issues in smart contracts, and one of those frequently used methods is known as Checks-Effects-Interactions or CEI approach. Other new models have been introduced like new CEI or freePi but today, we will focus on the CEI approach.

## What is Check-Effect-Interactions?

It's essential to understand the Check-Effect-Interactions model properly. CEI is broken down into three steps:

1. Running checks like any required statements or conditionals;
2. Updating the state of your contracts, which is known as running your effects;
3. Lastly, interactions with external contracts.

In the following segment, we'll discuss how we can implement these steps in our contract in a function called "`withdrawBalance`". Please note, for demonstration purposes, we assume a contract without any checks since the balance line provided isn't treated as a check.

## Implementing CEI in your Smart Contract

Let's consider a function like "`withdrawBalance`" and see how we can use the CEI model to avoid potential contract issues.

![](https://cdn.videotap.com/NPmvbUFZtOy30kA6ekhR-74.82.png)

So, first, we'll move the balance line, which is an effect since it indicates a state change, to the top. Next, locate the interaction and move it up as well. Finally, order the effect and interaction in place.

With these modifications, we are ready to redeploy the contract. Following the deployment, a user deposits ether. Like in the previous example, we switch the accounts and call an attack. This time, an alert pops up saying it's reverted.

But why did it revert?

> "The contract reverted because when calling the attack, the withdrawal process didn't send any data or value and instead was reverted."

So we can see with these changes, we have protected our contract against the issue causing it to fail when attacked.

## Another Approach: Locks on Functions

Another way to solve this problem, besides the Checks-Effects-Interactions model, is to put a type of lock on the function using boolean variables. When we lock the function, it's prohibited for anyone to enter it until its status changes to unlocked.

```js
bool locked = false // Declare a boolean variable called `locked` and set it to false.
// Inside your function
if (locked) {
    revert(); // If locked equals true, the function will terminate.
    } else {locked = true; // If locked equals false, the function will operate and change the state of locked to true.
    }
```

After the process, we can safely unlock the function again by assigning `false` to the `locked` variable.

However, the lock process can also be accomplished more effectively using professional, open-source tools like Open Zeppelin Package Manager. The Open Zeppelin package includes a tool, `ReentrancyGuard`, that provides a `non-reentrant` modifier to protect against double spend attacks and contract reentry.

So, these are the two main ways to protect your smart contract from reentrancy issues. Always remember to perform necessary checks, run your effects, and then handle the interactions. Alternatively, you can optimally secure your functions with the aid of locks.

Protect your contracts. Happy coding!
