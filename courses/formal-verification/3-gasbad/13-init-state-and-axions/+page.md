---
title: Init State and Axions

---

_Follow along with this video:_

---

### Init State and Axions

Welcome back! We're almost ready to start verifying this protocol, but we've left out an important component. As things stand in `GasBad.spec` currently, nothing will work. Unlike Solidity, the ghost variables we've declared aren't initialized with any value. The `Certora Verification Language (CVL)` requires [**Initial State Axioms**](https://docs.certora.com/en/latest/docs/cvl/ghosts.html#initial-state-axioms) in order to assign starting points to our `listingUpdatesCount` and `log4Count` variables.

![init-state-and-axioms1](/formal-verification-3/12-init-state-and-axioms/init-state-and-axioms1.png)

---

#### init_state

- Sets the initial state or value of a variable, the starting point

#### axiom

- declare that something must always hold true. Tells the prover to assume this to always be the case. Acts similar to `require`

Let's apply this to our GasBad.spec ghost variables.

```js
/*
 * Verification of GasBadNftMarketplace
 */

ghost mathint listingUpdatesCount {
    // initial state will be 0
    // require such to be true
    init_state axiom listingUpdatesCount == 0;
}

ghost mathint log4Count {
    // initial state will be 0
    // require such to be true
    init_stat axiom log4Count == 0;
}
```

> ❗ **PROTIP**
> Try running the prover _without_ initializing these variables. What happens?

### The Rule

We now have 2 hooks configured. One is tracking whenever our s_listings storage variable is updated and the other is tracking when our LOG4 events are emitted. All that's missing now is to write the rule/invariant to assert that these match.

Because we've set things up with these hooks, we can just write a very simple invariant pertaining to them.

```js
invariant anytime_mapping_updated_emit_event()
    listingUpdatesCount <= log4Count;
```

That's it, that's all we need. The reason we chose `<=` is because there may be other LOG4 emissions we aren't accounting for, when other storage variables are emitted, but this should allow us to verify this one case!

> ❗ **NOTE**
> In an audit scenario you would **definitely** want to expand on what we've done here, assuring that _any time_ storage is updated an event is emitted, but for simplicity's sake we've pared down our example.

### Wrap Up

<details>
<summary>GasBad.spec</summary>

```js
/*
 * Verification of GasBadNftMarketplace
 */

ghost mathint listingUpdatesCount {
    init_state axiom listingUpdatesCount == 0;
}

ghost mathint log4Count {
    init_state axiom log4Count == 0;
}

hook Sstore s_listings[KEY address nftAddress][KEY uint256 tokenId].price uint256 price STORAGE {
    listingUpdatesCount = listingUpdatesCount + 1;
}

hook LOG4(uint offset, uint length, bytes32 t1, bytes32 t2, bytes32 t3, bytes32 t4) uint v {
    log4Count = log4Count + 1;
}

/*//////////////////////////////////////////////////////////////
                                RULES
//////////////////////////////////////////////////////////////*/

// It shouldn't be possible to have more storage updates than events
invariant anytime_mapping_updated_emit_event()
    listingUpdatesCount <= log4Count;
```

</details>


### Wrap Up

We've taken a bit of an easier approach to things, but that's ok. This is a great stepping stone towards what's more complex. What we've set up here _should_ hold. The number of times storage is updated should always be less than or equal to our `LOG4` count.

In the next lesson, let's run the prover and see what happens.
