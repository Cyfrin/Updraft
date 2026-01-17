---
title: Boss Bridge Diagram
---

_Follow along with the video lesson:_

---

### Boss Bridge Diagram

![boss-bridge-diagram1](/security-section-7/6-boss-bridge-diagram/boss-bridge-diagram1.png)

How does your diagram compare to mine? You _did_ try to do one .. **_right?_**

...

At any rate, let's see what's happening here.

To begin, `TokenFactory.sol`'s sole purpose is to deploy `L1Token.sol` contracts. Easy.

We can see (start from the top left) that a User on L1 will call the `depositToL2` function on `L1BossBridge.sol`. This tells `Boss Bridge` to lock up a given amount of the user's `L1Tokens` into the `L1Vault`.

As the user's tokens are moved to the `L1Vault` an event is emitted. This tells the `Boss Bridge Signer` that a given amount of tokens have been received and they are free to unlock that amount of tokens from the `L2Vault`. These `Signers` represent that centralized bottleneck that many bridge protocols suffer from. The role is important and impactful and we should be very aware of what they're capable of.

`L2Token` exists as a copy of the L1 asset, on L2.

Tokens from the `L2Vault` are transferred to the User on L2.

The same flow of transactions is generally expected to work in reverse as well, where a user will lock tokens on L2 to unlock them on L1, but this process isn't in the scope of our Boss Bridge review!

### Wrap Up

Visualizing a protocol's flow is much easier when protocol diagrams are leveraged. Let's dip our toes into the code in the next lesson, beginning with L1Token.sol.
