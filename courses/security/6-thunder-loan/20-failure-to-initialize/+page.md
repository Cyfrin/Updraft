---
title: Exploit - Failure to Initialize
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/ud4dDYNGgVU?si=GPu5LNcioNvYLIuT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Unmasking a Major Pitfall in Smart Contracts: Initialization Vulnerability

Hello code enthusiasts and blockchain fans! Today, I want to share with you my recent findings while perusing the Thunderloan smart contract. For the uninitiated, smart contracts are self-executing contracts that live on the blockchain. They are primarily used to enforce agreed-upon rules without requiring the presence of third parties.

## The Constructor in Smart Contracts

Let's delve into a peculiar problem I've observed multiple times - particularly concerning initializers. As someone who has been doing this for quite a while, I've developed an instinct for catching certain risks. While examining Thunderloan's `initialize()` function, I knew I had stumbled upon an interesting issue.

![](https://cdn.videotap.com/OpjaMfHKQ2Zje0pNKhzI-13.95.png)

Let's break down what an `initializer` is. This method is essentially replacing the traditional contract `constructor` as a setup function in contracts. It serves to initialize contract parameters when the contract is deployed.

## The Vulnerability: Front-running Initializers

What could possibly go wrong with this, you may wonder? I'd like to pose a question: What if we deploy a contract and someone else gets to initialize it before we do? In other words, what if another person jumps the queue and sets the essential contract parameters prior to our initialization?

This is akin to someone else picking up your rental car and setting the GPS addresses before you even get the keys!

Taking this potential scenario into consideration, it becomes clear why 'initializers being front-run' have often been flagged in audits as low-risk vulnerabilities.

```
audit('low', 'initializers can be front run');
```

Imagine you have deployed a contract and forgotten to call the `initialize()` function. The scammer in our scenario notices this, exploits the vulnerability, and changes the `TSWAP` (Token Swap) address before you. The entire contract ends up being skewed towards this malicious user's benefit.

## The Result of the Attack

So, what happens to the contract we just deployed? If the contract hasn't been initialized, it will likely malfunction or fail to work as smoothly as intended.

For instance, within the Thunderloan contract, if the `SPoolFactory` (smart pool factory) is not initialized, the `getPrice()`, and `WETH()` function calls may instead invoke the Ethereum null address, leading to unexpected behavior.

```
if (!initialized) {getPrice() --> address(0)WETH() --> address(0)}
```

This scenario emphasizes the critical importance of ensuring initialization. Without it, the protocol ends up under-performing or in worse scenarios, completely breaks.

## Mitigation: Keeping it Tight and Right

Identifying the problem is half the task. Knowing how to prevent it, however, is the real deal. How do we solve this initialization front-running problem in our contracts? It can be slightly tricky, and the best practice to ensure your contract's safety is actually quite simple - automate the initialization during deployment.

By automatically calling the initialize function during deployment, developers can reduce the risk of forgetting to manually trigger it post-deployment. This tactic not only ensures that all contract parameters are set as soon as the contract is deployed, but it also provides a consistent testing and deployment flow.

## Conclusion

Despite `initializers` being flagged as a low risk, they pose an architecture flaw that can easily be exploited if left unchecked. As blockchain developers, we need to not only write rock-solid smart contracts but ensure they're thoroughly tested and deployed without leaving potential loopholes for others to exploit.

And to the auditors out there, next time you come across an `initializer`, remember:

> "An initializer, though small, can cause great wreckage."
