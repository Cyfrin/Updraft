---
title: Optimistic Fallback Prover Args
---

_Follow along with this video:_

---

### Optimistic Fallback Prover Args

In the last lesson we saw our verification HAVOCing because Certora didn't know how to resolve the low level `call` function executed within withdrawProceeds. So, how do we account for these arbitrary calls with the prover?

Introducing: [**Prover Arguments**](https://docs.certora.com/en/latest/docs/prover/cli/options.html#prover-args)

Prover arguments (prover_args) are CLI (or conf file) options which can be used to fine tune the behaviour of the prover. I greatly encourage you to read through the options available on the Certora Docs. For our purposes, we want to consider the `-optimisticFallback` option is going to be useful.

![optimistic-fallback-prover-args1](/formal-verification-3/19-optimistic-fallback-prover-args/optimistic-fallback-prover-args1.png)

Let's apply this argument to our `GasBad.conf`.

```js
{
    "files": [
        "src/GasBadNftMarketplace.sol:GasBadNftMarketplace",
        "src/NftMarketplace.sol:NftMarketplace",
        "test/mocks/NftMock.sol:NftMock"
    ],
    "verify": "GasBadNftMarketplace:certora/spec/GasBadNft.spec",
    "wait_for_results": "all",
    "rule_sanity": "basic",
    "optimistic_loop": true,
    "msg": "Verification of NftMarketplace",
    "prover_args":[
        "-optimistic_fallback true"
        ]
}
```

Any of the options we add to this `prover_args` list will act as though we passed that option to our CLI command when running the prover!

> ❗ **NOTE**
> As of May 25, 2024 the above conf configuration may not work. You can pass this option _with_ your CLI command if necessary: `certoraRun ./certora/conf/GasBadNft.conf --optimistic_fallback`

### Wrap Up

Ok, we have `prover_args` configured and we've constructed our method block to include `wildcard entries` as well as summary declarations. With all of this defined, let's run the prover again.

```bash
certoraRun ./certora/conf/GasBadNft.conf
```

See you in the next lesson for the results!
