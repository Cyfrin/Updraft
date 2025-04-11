---
title: Docs
---

_Follow along with the video lesson:_

---

### Docs

Alright, let's finally get into this. The `README` is going to continue to be useful at this point as we proceed to gain context and understanding of what `Boss Bridge` is meant to do.

<details open>
<summary>README</summary>

### Boss Bridge

This project presents a simple bridge mechanism to move our ERC20 token from L1 to an L2 we're building.
The L2 part of the bridge is still under construction, so we don't include it here.

In a nutshell, the bridge allows users to deposit tokens, which are held into a secure vault on L1. Successful deposits trigger an event that our off-chain mechanism picks up, parses it and mints the corresponding tokens on L2.

To ensure user safety, this first version of the bridge has a few security mechanisms in place:

- The owner of the bridge can pause operations in emergency situations.
- Because deposits are permissionless, there's an strict limit of tokens that can be deposited.
- Withdrawals must be approved by a bridge operator.

We plan on launching `L1BossBridge` on both Ethereum Mainnet and ZKSync.

### Token Compatibility

For the moment, assume _only_ the `L1Token.sol` or copies of it will be used as tokens for the bridge. This means all other ERC20s and their [weirdness](https://github.com/d-xo/weird-erc20) is considered out-of-scope.

### On withdrawals

The bridge operator is in charge of signing withdrawal requests submitted by users. These will be submitted on the L2 component of the bridge, not included here. Our service will validate the payloads submitted by users, checking that the account submitting the withdrawal has first originated a successful deposit in the L1 part of the bridge.

</details>


The docs seem thorough, but unless we have experience with bridges, or similar protocols this is pretty confusing. This would be the point in a private audit that I would ask for some `protocol diagrams`.

I challenge you to pause right now and create some diagrams yourself. In the next lesson we'll go through some together and gain a clearly understanding of what's happening in `Boss Bridge`.
