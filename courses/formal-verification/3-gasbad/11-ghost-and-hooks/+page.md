---
title: Ghost and Hooks
---

_Follow along with this video:_

---

### Ghost and Hooks

As a reminder of where we're at in our game plan, let's look back to our `README` and see what's next.

**Game Plan:**

1. Warm up by verifying some stats of our NftMock ✅
   1. Sanity Checks ✅
   2. Total Supply is never negative ✅
   3. Minting mints 1 NFT ✅
   4. Parametric Example ✅
2. Formally Verify GasBadNftMarketplace
   1. Anytime a mapping is updated, an event is emitted
   2. Calling ANY function on the GasBadMarketplace OR the NftMarketplace results in the same contract state

Alright, next up is assuring that events are emitted any time a mapping is updated.

Sounds hard.

This may be a little tricky, but it's entirely possible. However, we first need to learn about [**Ghost Variables**](https://docs.certora.com/en/latest/docs/cvl/ghosts.html).

### Ghost Variables

![ghosts-and-hooks1](/formal-verification-3/11-ghosts-and-hooks/ghosts-and-hooks1.png)

At their core, `Ghost Variables` are variable which are declared specifically to be used by `Certora`. Declaring them this way allows them to act as extensions to contract state and their values will mimic the behaviour of contract storage (reverting and resetting when appropriate).

The most common use of `Ghost Variables` is in conjunction with `Hooks` to communication information back to specified `rules`.

A fitting Ghost Variable that we might want to track for our current situation is how many times listings are updated.

```js
/*
 * Verification of GasBadNftMarketplace
 */

ghost mathint listingUpdatesCount;
```

### Hooks

![ghosts-and-hooks2](/formal-verification-3/11-ghosts-and-hooks/ghosts-and-hooks2.png)

[**`Hooks`**](https://docs.certora.com/en/latest/docs/cvl/hooks.html) allow us to specify an operation which triggers the `hook` and logic that is executed when the `hook` is triggered. For example - any time a particular variable is invoked with `SLOAD` - a `hook` could trigger something to happen.

**_How does this apply to GasBadNftMarketplace?_**

Hooks will be perfect for our current situation. We can configure a hook to increment our `listingUpdatesCount` ghost variable each time SSTORE is called

```js
/*
 * Verification of GasBadNftMarketplace
 */

ghost mathint listingUpdatesCount;

hook Sstore s_listings[KEY address nftAddress][KEY uint256 tokenId].price uint256 price {...}
```

Ok, so our hook looks kinda gross, let me break it down.

![ghosts-and-hooks3](/formal-verification-3/11-ghosts-and-hooks/ghosts-and-hooks3.png)

> ❗ **NOTE**
> The STORAGE keyword was made unnecessarily in later updates to Certora

Now that we have this hook, what do we want to do whenever this value is updated in our contract's storage? We want to increment our listingsUpdateCount!

> ❗ **PROTIP**
> We're just hooking SSTORE in our example here, but hooks are compatible with a wide range of EVM opcodes. Check out the full list [**here**](https://docs.certora.com/en/latest/docs/cvl/hooks.html#evm-opcode-hooks).

```js
/*
 * Verification of GasBadNftMarketplace
 */

ghost mathint listingUpdatesCount;

hook Sstore s_listings[KEY address nftAddress][KEY uint256 tokenId].price uint256 price {
    listingUpdatesCount = listingUpdatesCount + 1;
}
```

We're now tracking each time our `s_listings` storage variable is updated in our contract, we _could_ improve this even further by having `listingUpdatesCount` be an array, and we could track that the `price` variable is actually being emitted etc. For the purposes of our lesson this is sufficient.

> ❗ **PROTIP**
> This set up is so simple, there's really no reason something this couldn't be verified on every protocol. Go out there and write formal verification tests!

Alright, we're only half done. We're counting the number of times our s_listing variable is updated, but we should also track how many events are called. Let's do that now. Remember to reference the hook patterns details on the [**Certora docs**](https://docs.certora.com/en/latest/docs/cvl/hooks.html#evm-opcode-hooks) if you're confused about where the syntax is coming from.

```js
ghost mathint log4Count;

hook LOG4(uint offset, uint length, bytes32 t1, bytes32 t2, bytes32 t3, bytes32 t4) {
    log4Count = log4Count + 1;
}
```

### Wrap Up

Our spec file looks great so far! We've learnt about Ghost Variables, Hooks and how they can be used to track the details and changes of our protocol during formal verification.

We'll continue setting up the implementation of our ghosts and hooks, in the next lesson. See you soon!

<details>
<summary>GasBad.spec</summary>

```js
/*
 * Verification of GasBadNftMarketplace
 */

ghost mathint listingUpdatesCount;
ghost mathint log4Count;

hook Sstore s_listings[KEY address nftAddress][KEY uint256 tokenId].price uint256 price STORAGE{
    listingUpdatesCount = listingUpdatesCount + 1;
}

hook LOG4(uint offset, uint length, bytes32 t1, bytes32 t2, bytes32 t3, bytes32 t4) {
    log4Count = log4Count + 1;
}
```

</details>
