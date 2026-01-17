---
title: Weak Randomness - Multiple Issues
---

_Follow along with this video:_

---

### Weak Randomness Breakdown

Let's look at a few ways that randomness, as we've seen in `PuppyRaffle` and our [**sc-exploits-minimized**](https://github.com/Cyfrin/sc-exploits-minimized) examples, can be manipulated.

![randomness-issues1](/security-section-4/26-weak-randomness-issues/randomness-issues1.png)

### block.timestamp

Relying on block.timestamp is risky for a few reasons as node validators/miners have privileges that may give them unfair advantages.

The validator selected for a transaction has the power to:

- Hold or delay the transaction until a more favorable time
- Reject the transaction because the timestamp isn't favorable

Timestamp manipulation has become less of an issue on Ethereum, since the merge, but it isn't perfect. Other chains, such as Arbitrum can be vulnerable to several seconds of slippage putting randomness based on `block.timestamp` at risk.

### block.prevrandao

`block.prevrandao` was introduced to replace `block.difficulty` when the merge happened. This is a system to choose random validators.

The security issues using this value for randomness are well enough known that many of them are outlined in the [**EIP-4399**](https://eips.ethereum.org/EIPS/eip-4399) documentation already.

The security considerations outlined here include:

**Biasability:** The beacon chain RANDAO implementation gives every block proposer 1 bit of influence power per slot. Proposer may deliberately refuse to propose a block on the opportunity cost of proposer and transaction fees to prevent beacon chain randomness (a RANDAO mix) from being updated in a particular slot.

**Predictability:** Obviously, historical randomness provided by any decentralized oracle is 100% predictable. On the contrary, the randomness that is revealed in the future is predictable up to a limited extent.

### msg.sender

Any field controlled by a caller can be manipulated. If randomness is generated from this field, it gives the caller control over the outcome.

By using msg.sender we allow the caller the ability to mine for addresses until a favorable one is found, breaking the randomness of the system.

### Wrap Up

This should all make sense. The blockchain is a deterministic system, any number we derive from it, is by definition going to be deterministic.

We've touched on a few ways this vulnerability can be exploited, in the next lesson we'll investigate a case study that should illustrate the potential impact of a weakness like this.

Meanwhile, I encourage you to experiment further with how the vulnerability works within our [**Remix**](https://remix.ethereum.org/#url=https://github.com/Cyfrin/sc-exploits-minimized/blob/main/src/weak-randomness/WeakRandomness.sol&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.20+commit.a1b79de6.js) and [**sc-exploits-minimized**](https://github.com/Cyfrin/sc-exploits-minimized) examples.
