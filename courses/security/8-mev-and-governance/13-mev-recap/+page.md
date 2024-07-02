---
title: MEV - Recap
---

_Follow along with this video:_

---

### MEV - Recap

Mev refers to the potential attack vector whereby a miner, node, or bot uses knowledge gleaned from the mempool to their advantage.

**Types of Mev Attacks:**

- Front-running
- JIT (Just In Time)
- Sandwich
- Many more...

### Protecting Against Mev Attacks

As mentioned earlier, as security researchers, we should always be asking:

**_If someone see this transaction in the mempool, how can they abuse that knowledge?_**

There are a few reliable ways to protect against MEV exploits, such as:

1. **Better Design** – Constructing the transaction in a manner that makes it harder for bots to gain useful knowledge. This might involve masking critical information or employing other strategic measures.
2. **Use of Private RPC or Dark Pools** – These are networks that allow transactions to be processed outside of the public mempool. Services such as [**Flashbots Protect**](https://docs.flashbots.net/flashbots-protect/overview), [**MevBlocker**](https://mevblocker.io/), and [**SecureRPC**](https://securerpc.com/) play an essential role in this regard.

We should note that Mev is not some mythical concept – it does have real-world consequences on the Ethereum blockchain, and we should be prepared for it.
