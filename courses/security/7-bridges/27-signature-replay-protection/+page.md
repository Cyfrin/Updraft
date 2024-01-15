---
title: Signature Replay Protection
---



---

# Vulnerabilities Found in the V, R and S: A Deep Dive into Replay Protection

Welcome to another deep dive into smart contract vulnerabilities. We're dissecting V, R and S -- a signature often found in blockchain technology.

![](https://cdn.videotap.com/fepx5pOEwGHrxsJGEs9y-17.14.png)

During this long and fascinating journey, we'll be breaking down each step to understand the vulnerabilities at a granular level. In particular, we'll be examining whether this signature benefits from replay protection. Spoiler alert: it doesn't. Let's delve in!

## Crafting a Proof of Concept Code

Our journey starts by raising a sobering question: Can this signature be deployed more than once? To answer this, we put together a proof-of-concept code that shows how this could potentially occur, leading to vulnerabilities.

```javascript
function testSignatureReplay() public {
    uint vaultInitialBalance = 1000e18;
    uint attackerInitialBalance = 100e18;
    address attacker = makeAdr(attacker);
    deal(address tokenAddress, vault, vaultInitialBalance);
    deal(address tokenAddress, attacker, attackerInitialBalance);
    uint v, bytes32 r, bytes32 s = vm.sign(private key ...);
    bytesmemory message = abi.encode(address token, 0, encodeCall(IERC20.transferFrom(address vault, attacker, attackerInitialBalance) ));//in a loop until vault balance is zero
    tokenbridge.withdrawTokensToL1(attacker, attackerInitialBalance, V, R, S);
    assertEqual(token.balanceOf(address attacker), attackerInitialBalance + vaultInitialBalance);
    assertEqual(token.balanceOf(address. Vault), 0);
}
```

Let's break this down.

The function `testSignatureReplay()` assumes that a vault already holds some tokens. The initial balance of the vault and an attacker are given. The function then carries forth several deals. An attacker is set up who deposits tokens to a layer 2 (L2) chain.

## Signature and Transfer

```javascript
 uint v, bytes32 r, bytes32 s = vm.sign(private key ...);
```

This part of our code does a bit of magic by signing the data with a private key. Thanks to Foundry, we can utilise a cheat code `VM.sign` to sign with the operator key, and then hash the actual data.

The next step is to formulate our `message`.

```javascript
bytes memory message = abi.encode(address token, 0, encodeCall(IERC20.transferFrom(address vault, attacker, attackerInitialBalance) ));
```

Here, we're essentially encoding a message instructing a transfer from the vault to the attacker. The signed message containing the V, R, and S values are usually what prompts MetaMask to ask for confirmation.

The signed message indicates a legitimate deposit of tokens from Layer 1 (L1) to L2. The operator, seeing this as valid, then submits V,R,and S on-chain.

This is the point where the replay attack becomes feasible. As soon as the operator's signature is placed on-chain, an attacker can simply keep invoking `withdrawTokensToL1` using that very same signature, draining balance from the vault until it's completely empty.

## The Aftermath

And how do we know it works? After running this function, we have successfully drained the vault entirely whilst increasing the attacker's balance accordingly:

```javascript
assertEqual(token.balanceOf(address attacker), attackerInitialBalance + vaultInitialBalance);
assertEqual(token.balanceOf(address. Vault), 0);
```

In short, we've just carried out a successful attack!

## Wrapping up

Looking at the given scenario, it becomes evident how signatures without replay protection, such as the one in our example, can pose significant security risks. Despite its relatively small codebase, such attacks can have substantial consequences. Always remember, when coding smart contracts, always ensure that your code includes mechanisms to prevent a replay attack.

Audit data and additional findings related to the topic can be found in the corresponding Git Repo. Happy coding and be safe!

> "Security in blockchain technology involves a constant combat against potential threats and vulnerabilities."
