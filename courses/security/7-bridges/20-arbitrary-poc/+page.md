---
title: Arbitrary POC
---



---

# Testing Token Movement In Solidity

In this blog post, we will delve into a test suite in Solidity, focusing on testing the movement of approved tokens from one user to another. By simulating a situation where a malicious actor can swoop in and steal tokens, we will unearth potential vulnerabilities and show how to spot a high-severity bug with a tool like Slither.

## Writing A Test Suite Function

Let us begin by scrolling down to our current test harness. Our primary objective is to pen a new test suite function; we will adopt the name `testCanMoveApprovedTokensOfOtherUsers` for this function. Our mission is to verify an occurrence – the actual transfer or move of tokens from one user to another.

To achieve this, we will repurpose some sections of our existing test suite.

![](https://cdn.videotap.com/kSIFNqF1jGk1jsDF3enL-24.57.png)

Within our current test suite, we have entities such as `user`, `deployer`, `operator`, `token`, `tokenBridge`, and `vault`. We also have a user account named Alice, tagged in this context as 'poor Alice'.

## Approving Tokens For Transfer

First, Alice has to approve the `tokenBridge` to move her tokens to Layer 2. She will just use the L1 Token object (described in code as `L1Token`) and call the `approve` method, passing in the `tokenBridge’s` address as well as the maximum token number, expressed as `uint256.max`.

```js
VM.prank(Alice);
L1Token.approve(addressTokenBridge, uint256.max);
```

![](https://cdn.videotap.com/u94ZnNK43eS6i6Y9HY71-58.98.png)

## Defining A Malicious Actor

After Alice has approved the Token Bridge to lawfully move her tokens, we introduce 'Bob', who maliciously swoops in to steal and deposit all of Alice's tokens on Layer 2. To do this, we first need to obtain the token balance of Alice.

```js
uint256 depositAmount = Token.balanceOf(userAlice);
```

We now need to create an address for our mischief-maker, Bob. Assuming Bob's address as `attackerAddress`, we start a prank with this address and make Bob execute a `depositTokensToL2` call.

```js
address attackerAddress = make.addr(attacker);
vm.startPrank(attackerAddress);
```

Now, Bob can steal Alice's tokens by depositing them into his own account on Layer 2.

```js
TokenBridge.depositTokensToL2(userAlice, attackerAddress, depositAmount);
```

## Ensuring Data Integrity With Emit

In this scenario, we need to emit an event since the tokens are being locked into the `vault`. Emitting the correct details in this event serves an important role as the off-chain service, which listens to these events, triggers the unlocking on Layer 2.

```js
vm.expectEmit(
  addressTokenBridge,
  emitDeposit(userAlice, attackerAddress, depositAmount)
);
```

## Asserting The State

Now, we make assertions to verify that the token balance of Alice is zero and the token vault's balance equals the `depositAmount`.

```js
assertEqual(Token.balanceOf(userAlice), 0);
assertEqual(Token.balanceOf(addressVault), depositAmount);
```

Once the verification process is complete, we stop the prank.

```js
vm.stopPrank();
```

## Verifying The Test Case

On running the test suit, we observe that the test case succeeds, indicating that there's a high-severity bug - easy pickings for a malicious actor.

This explorative approach reveals how even advanced code bases can fall prey to serious issues, and tools like Slither prove indispensable in identifying them. So, let's continue analyzing with Slither and see what other 'goodies' we can find!

> "Even in some of these more advanced code bases, tools like Slither can find really good issues. So thank you, Slither. Let's keep walking down, Slither. Let's see what other goodies are in here. This turned out to be a high."
