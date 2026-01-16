---
title: Mid Lesson Recap
---

_Follow along with this video:_

---

### Mid Lesson Recap

We've learnt tonnes already, let's do a quick summary of what we've gone over so far.

### Ghost Variables

We investigated ghost variables and how they're configured within a .spec file. We learnt that these variables are treated as temporary parts of the contract which are used by the prover alone.

Ghost variables are initialized using an `init_state axiom`.

In many instances a situation arrived at by the prover may result in ghost variables being HAVOC'd (randomized). To prevent this, we can use the `persistent` key word when declaring our ghost variables.

```js
persistent ghost mathint listingUpdatesCount{
    init_state axiom listingUpdatesCount == 0;
}
```

### Hooks

We learnt about Hooks! Hooks are used to configure logic which is executed based on particular opcodes being executed at run time.

```js
hook Sstore s_listings[KEY address nftAddress][KEY uint256 tokenId].price uint256 price {
    listingUpdatesCount = listingUpdatesCount + 1;
}
```

We define an opcode and the storage variable we want to watch for interaction with. When the prover detects this relationship being manipulated, the defined logic in the hook will be executed. In the above example, we increment our listingUpdatesCount variable.

It's through the combined used of Hooks and Ghost Variables that we were able to define the invariant we wanted to verify:

```js
invariant anytime_mapping_updated_emit_event()
    listingUpdatesCount <= log4Count;
```

### Prover Args and Sanity Checks

Another thing we touched on were some of the configuration options of our .conf file and how we can leverage `rule_sanity` and `prover_args` to dial in the soundness and validity of our verifications.

We saw that `rule_sanity` set to `basic` can point out when our verifications are vacuous, or not actually checking anything, and we learnt how optimistic_fallback can be used to avoid HAVOC situations in our external calls.

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
    "msg": "Verification of NftMarketplace"

}
```

### Wrap Up

The root of what I'm trying to instill is this idea that - the prover is going to try to constantly find these situations where undefined actions or executions can occur and it's going to HAVOC, it's going to do random things until it breaks when it finds those situations.

It's ultimately our job to vet these outputs and determine - is this the fault of my code, or is the prover unclear about what my goals are?

In the next lesson we'll drill this concept in with a final rule that should be a blast to configure.

See you there!
