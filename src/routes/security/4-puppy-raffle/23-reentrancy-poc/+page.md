---
title: Reentrancy - PoC
---

_Follow along with this video:_

## <iframe width="560" height="315" src="VIDEO_LINK" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Exploiting the Reentrancy Bug: An In-Depth Guide

Uncovering vulnerabilities in smart contracts has emerged as a critical task, particularly with the rise of DeFi protocols. In this blog post, we will guide you through the process of exploiting one of these vulnerabilities known as the 'reentrancy bug.' For this, we'll use a fictional contract called 'Puppy Raffle' as our case study.

## What is Reentrancy Bug and Why is it Dangerous?

![](https://cdn.videotap.com/nWd247DHc5JaG5n6O8uq-37.66.png)A _reentrancy bug_ occurs when an external contract gets called before updating the state in a given function. This flaw is potentially destructive as it leads to a condition where the same function can be recursively invoked before the first execution is complete. In essence, it makes it possible for an attacker to drain all funds from the affected contract.

Now, let's get to the heart of the matter and dive into how this reentrancy bug could be exploited in our case study, Puppy Raffle.

## Implementing a Proof-of-Code for Reentrancy Attack

Initially, we have the Puppy Raffle Test - `PuppyRaffleTest.sol`. Here, we'll take advantage of the existing refund test to carry out our exploit. We'll begin by copying the `refund test` and then refactor it to serve our needs.

```python
// Copy pasted refund testtestReentranceCRefund() { ... }
```

We perceive a `playerEntered` modifier is already implemented. We could use this, but we'll opt to copy and paste it directly into our test function.

Next, we are faced with this function:

```python
address[] memory players = new address[](1);
```

Here, only one player is being instanced. However, we plan to test multiple entrants to the raffle. Therefore, we will change it to include more players - in this case, four.

```python
address[] memory players = new address[](4);
```

![](https://cdn.videotap.com/EsowklYmOJTJLU3Cxgzb-225.95.png)## Building our Attack Contract: TransAttacker.sol

Having completed our set up, we can now proceed to build our attack contract. We'll name it `TransAttacker.sol`.

In our attack contract, we need to create a recipient or a `fallback` function that will re-enter into the affected contract.

```python
function() external payable { ... }
```

This `fallback` function will only be triggered when the balance of the 'Puppy Raffle' contract is more than the `entrance fee`.

```python
if (address(puppyRaffle).balance >= entranceFee) { ... }
```

In line with this, our attack contract will keep calling the `refund` function recursively until it has drained all the funds from the 'Puppy Raffle' contract.

Now the attack execution is ready. We can create our malicious 'TransAttacker' contract and an attacker user with a sufficient balance to join the raffle. We will establish a starting and ending balance for both the 'TransAttacker' contract and the 'Puppy Raffle' contract.

If the attack is successful, the final balance of the 'Puppy Raffle' contract should read zero, and the 'TransAttacker' contract should have stolen all the funds.

## Wrapping Up

From our proof-of-code run, the attack was indeed successful. This reentrancy issue in 'Puppy Raffle' contract is evidently a major vulnerability, and one must be appropriately addressed in our audit report.

> "We have successfully written a Proof-of-Code (PoC) for reentrancy on this 'Puppy Raffle.' This is definitely going to be a high-risk vulnerability on our audit report."

By far, you've learned about the nature of a reentrancy bug and how to exploit it, making you a highly alert and more skilled blockchain developer.

So, take pride in yourself. This bug is a common and critical one; recognizing and fixing it takes your skills to another level.

Now, let's head back to the 'Puppy Raffle' and carry on with our audit. So far, we have revealed a significant reentrancy issue. Keep your guard up; there's more to discover!
