---
title: Formal Verification Setup
---

_Follow along with this video:_

---

### Formal Verification Setup

We're ready to finally formally verify our GasBadNftMarketplace contract! Start by creating `GasBad.spec` and `GasBad.conf` files in their respective Certora folders.

For our configuration file, we can copy over most of what we've already written from NftMock.conf. We'll need to add a couple additional files for the prover this time.

```js
{
    "files": [
        "src/GasBadNftMarketplace.sol:GasBadNftMarketplace",
        "src/NftMarketplace.sol:NftMarketplace",
        "test/mocks/NftMock.sol:NftMock"
    ],
    "verify": "NftMock:./certora/spec/GasBad.spec",
    "wait_for_results": "all",
    "msg": "Verification of GasBad",
    "rule_sanity": "basic",
    "optimistic_loop": true
}
```

Make note that we're setting our `rule_sanity` to `basic` and `optimistic_loop` to `true`. We'll likely be adding an additional prover arg in future, but this is a great place to start.

We can start our spec file with the usual expected comment block...

```js
/*
 * Verification of GasBadNftMarketplace
 */
```

In the next lesson, we'll go back to our README and outline what needs verifying in this protocol!
