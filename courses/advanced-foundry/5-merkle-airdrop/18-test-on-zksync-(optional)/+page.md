---
title: zkSync tests
---

_Follow along with the video_

---

> 🗒️ **NOTE**:br
> This lesson is optional

We can also run our `MerkleAirdrop.t::testUsersCanClaim` test on the ZKsync chain.

To do this, we can start by switching to the ZKsync version by running `foundryup-zksync`. Since the ZKsync compiler operates differently from the standard solc compiler, it's better to verify that everything builds correctly before deploying.

```js
forge build --zksync
```

> 🗒️ **NOTE**:br
> If you encounter any warnings, they may be related to the use of `ecrecover`. These warnings can be safely ignored since indicate that the accounts should use an ECDSA private key and should be EOAs. This warning are shown because the ZKsync era supports native account abstraction.

Finally, we can run our tests on ZKsync with the following command:

```js
forge test --zksync -vvv
```
