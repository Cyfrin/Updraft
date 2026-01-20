---
title: Exploit - Failure to Initialize - Case Study
---

### Exploit - Failure to Initialize - Case Study

![failure-to-initialize-case-study1](/security-section-6/22-failure-to-initialize-case-study/failure-to-initialize-case-study1.png)

The post above lives in infamy in the Web3 ecosystem.

You can check out the thread and read more about the hack [**here**](https://github.com/openethereum/parity-ethereum/issues/6995), but in a nut shell, Parity Wallet failed to initialize their contracts and a curious user bricked their protocol.

Within that thread there's a [**link to the transaction**](https://etherscan.io/tx/0x05f71e1b2cb4f03e547739db15d080fd30c989eda04d37ce6264c5686e0722c9) that caused the Parity Bug. Let's have a look at what was done.

![failure-to-initialize-case-study2](/security-section-6/22-failure-to-initialize-case-study/failure-to-initialize-case-study2.png)

We can see in the transaction which function was called `initWallet`. This function is taking important parameters such as `_owners` and `_required`.

Because the contract hadn't been initialized, the hacker was able to set their own wallet as the owner of the contract and the required multisig signatures to zero.

![failure-to-initialize-case-study3](/security-section-6/22-failure-to-initialize-case-study/failure-to-initialize-case-study3.png)

This ultimately resulted in a scramble to free locked funds and chaos in the ecosystem, all because the initialize function had been forgotten.

### Wrap Up

The above outlines the importance of properly initializing smart contracts on deployment.

It's becoming an increasingly good idea to protect against this type of exploit using method such as:

- assuring initialization functions are called _in_ deploy scripts.
- adding modifiers that require a protocol be initialized before it can be interacted with

Let's continue with `OracleUpgradeable.sol` in the next lesson.
