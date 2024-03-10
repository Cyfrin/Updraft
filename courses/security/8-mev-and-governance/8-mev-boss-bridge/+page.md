---
title: MEV - Boss Bridge
---

_Follow along with this video:_

<!-- TODO -->


---

## MEV - Boss Bridge

Now you're starting to see the picture, and the Boss Bridge MEV becomes clear. 

<img src="/security-section-8/8-mev-boss-bridge/mev-boss-bridge.png" style="width: 100%; height: auto;" alt="boss bridge mev">

If you send a transaction with your signature on-chain, someone can easily see that transaction in the mempool, and then send their own transaction with your signature!

## Prevention

To prevent this, we can do something similar to the Signature Replay protection, where we add a nonce, make sure the first time it's called with the signer, etc. 

