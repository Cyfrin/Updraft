---
title: MEV - Boss Bridge
---

_Follow along with this video:_

---

### MEV - Boss Bridge

Now you're starting to see the picture, and the Boss Bridge MEV becomes clear.

![boss bridge mev](/security-section-8/8-mev-boss/mev-boss-bridge1.png)

Similarly to the Signature Replay attack, a malicious actor could see a signer's call to sendToL1 pending in the MemPool. With access to the signature sent in the transaction, it can be front run, causing the sendToL1 transaction to happen unexpectedly, or multiple times.

Without specifying some sort of protection against this (leveraging a nonce, requiring the signer to call it first etc), Boss Bridge is wide open to these kinds of vulnerabilities.

### Wrap Up

Every single once of the protocols we reviewed was at risk of being exploited through MEV vulnerabilities!?

Hopefully it's clear how pervasive these security risks can be.

In the next lesson I'll demonstrate a live example of being rekt by an MEV Bot. You won't want to miss it! See you there!
