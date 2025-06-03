---
title: Summary Implementations
---

_Follow along with this video:_

---

### Summary Implementations

Let's dive right into writing the methods block for our `GasBad.spec`. We know from our error in the Certora proof we ran that we saw our issue in the safeTransferFrom function. Because this function is calling externally, the prover can't predict what the effects will be, so things HAVOC. This will be a good place to start.

```js
methods {
    function safeTransferFrom(address,address,uint256) external => DISPATCHER(true)
}
```

With our `DISPATCHER` summary set to `true` we're telling the prover not to assume anything about this function and to only draw logic from examples of this function found within _known_ contracts.

Certora will look through known contracts, searching for a function declaration for `safeTransferFrom` and will only apply that logic to our verification. In the case of our GasBad protocol, Certora will see that NftMock.sol is ERC721Enumerable, which inherits from ERC721 ... which means the prover is going to assume this external call does this:

```js
function safeTransferFrom(address from, address to, uint256 tokenId) public {
    safeTransferFrom(from, to, tokenId);
}
```

**_or_**

```js
function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) private {
    transferFrom(from, to, tokenId);
    _checkOnERC721Received(from, to, tokenId, data);
}
```

**Dispatcher Function Summary:**
If "true", Certora will look through its list of known contracts for functions that have matching function signatures. It will then assume the function will act the same as one of the _known_ functions.

### Auto Summaries

If we look closely as our error in Certora we can see something labelled `AUTO summary`.

![summary-implementations1](/formal-verification-3/18-summary-implementations/summary-implementations1.png)

[**Auto summaries**](https://docs.certora.com/en/latest/docs/cvl/methods.html#auto-summaries) effectively represent the Certora prover just trying to figure out what should be happening when not explicitly told. It's specific affect will vary dependent on the type of call being performed.

![summary-implementations2](/formal-verification-3/18-summary-implementations/summary-implementations2.png)

Our `safeTransferFrom` scenario would be classified as `other calls`, as a result `HAVOC_ECF` is employed, and this is why we see our function HAVOCing in our test.

### Further Consideration

Remember, in our methods block right now, we're effectively saying:

```js
methods {
    function currentContract.safeTransferFrom(address,address,uint256) external => DISPATCHER(true)
}
```

The currentContract syntax is implied. So, when the prover is run, it's looking for this function declaration to be contained within the current contract it's verifying. We have an issue, however. Look at how this function is actually being called within `GasBadNftMarketplace.sol`:

```js
function listItem(address nftAddress, uint256 tokenId, uint256 price) external {
    ...
    // Interactions (External)
    IERC721(nftAddress).safeTransferFrom(msg.sender, address(this), tokenId);
}
```

> ❗ **NOTE**
> Similar calls to this function in `IERC721` can be seen in the `buyItem` and `cancelListing` functions as well.

This means that the function declaration we're using won't actually be in the contract we're verifying. Fortunately, we've learnt a way we can resolve this.

```js
methods {
    function _.safeTransferFrom(address,address,uint256) external => DISPATCHER(true)
}
```

By employing the `wildcard entry` we can avoid issues with where this function is called from. The `wildcard entry` will tell the prover to apply our `summary declaration` to any function of this signature called from any contract.

Because the scope we're providing the prover includes `NftMock.sol`, we're instructing `Certora`, through our above configuration, to treat every `safeTransferFrom` call as though it behaves like the one in our `NftMock.sol` contract.

Now, it's worth pointing out that by employing our declaration this way we're adopting some assumptions. Primarily, we're assuming that our NFTs `safeTransferFrom` function won't alter storage and that the `safeTransferFrom` function behaves fairly innocuously. This may not necessarily be a safe assumption, but for the purposes of our example this is fine.

### Running the Prover

Ok, we've just been buried in new information, I know. Let's just run things as they are now and see what happens, then we can recap what we've learnt and how things are working.

For reference, here's where we stand with our GasBad.spec so far:

<details>
<summary>GasBad.Spec</summary>

```js
/*
 * Certora Formal Verification Spec for GasBadNftMarketplace
 *
 * This spec is technically unsound because we make summaries about the functions, and are using optimistic fallback
 */

using GasBadNftMarketplace as gasBadMarketplace;
using NftMock as nft;
using NftMarketplace as marketplace;

methods {
    function _.safeTransferFrom(address,address,uint256) external => DISPATCHER(true);
}

ghost mathint listingUpdatesCount {
    init_state axiom listingUpdatesCount == 0;
}

ghost mathint log4Count {
    init_state axiom log4Count == 0;
}

hook Sstore s_listings[KEY address nftAddress][KEY uint256 tokenId].price uint256 price {
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


![summary-implementations3](/formal-verification-3/18-summary-implementations/summary-implementations3.png)

Uh oh, we're still seeing an issue. Let's drill into the call trace to determine what's happening. If we navigate through the call trace Certora provides to the safeTransferFrom call that was previously failing, we can see a few interesting things.

![summary-implementations4](/formal-verification-3/18-summary-implementations/summary-implementations4.png)

It looks like our `safeTransferFrom` function is being called from `NftMock`'s implementation of it, like we'd expect. This function is subsequently calling `_checkOnERC721Received`, and ultimately `onERC721Received`!

**_We_** know that onERC721Received is being called on our `to` address, which in this case is the `GadBadNftMarketplace`, but from Certora's point of view, this is a random address and the function being called on it could do anything! Certora's response is to HAVOC again, randomizing our ghost variables and breaking our invariant.

Fortunately for us, with what we've learnt so far, we should be able to account for this in our GasBad.spec file. Our goal will be to tell the prover to only run the implementation of onERC721 received that's contained within GasBadNftMarketplace.sol itself. There's actually a couple ways we can handle this.

One way we could approach this is exactly how we solve the issue with `safeTransferFrom`. We can add a `wildcard entry` and a `DISPATCHER summary declaration`.

```js
function _.onERC721Received(address, address, uint256, bytes) external => DISPATCHER(true);
```

Alternatively, if we consider what the implementation of `onERC721Received` in GasBadNftMarketplace is doing...

```js
function onERC721Received(address, /*operator*/ address, /*from*/ uint256, /*tokenId*/ bytes calldata /*data*/ )
    external
    pure
    returns (bytes4)
{
    // return this.onERC721Received.selector;
    // This saves 0 gas - good job solidity!
    return bytes4(0x150b7a02);
}
```

...we can see that this function is returning a static value. We could also handle our `HAVOC` situation by leveraging one of the view summaries such as `CONSTANT` or `NONDET`.

```js
function _.onERC721Received(address, address, uint256, bytes) external => CONSTANT(0x150b7a02);
```

> ❗ **IMPORTANT**
> While we expect this to solve our HAVOC issue with the prover, it's always important to consider the restrictions we're putting on the validity of our verification. If these functions _don't_ always perform this way, this may be a bad idea!

Let's try running the prover again, now that we've added this additional method block function.

![summary-implementations5](/formal-verification-3/18-summary-implementations/summary-implementations5.png)

Well, at least our number of violations are falling. We're also getting lots of practice at debugging these call traces! Let's see what's happening this time.

![summary-implementations6](/formal-verification-3/18-summary-implementations/summary-implementations6.png)

Of course this would HAVOC, `call` can _literally_ do anything! As we've seen, if a situation arises which `Certora` can't predict outcomes of, it's going to let slip its dogs of war (cry HAVOC), breaking our invariant.

### Wrap Up

We're making lots of progress and gaining tonnes of experience reading through `Certora` reports. This is a good thing. The more familiar you are, the more natural this process will be when it's needed.

Now, we're still getting errors. At some point we could throw our hands up and make our `ghost variables persistent` - this _would_ solve the issue of them being `HAVOC`'d, but accounting for these outlying situations within our `methods block` allows us explicit visibility into the assumptions we're making about our tests.

Where does this leave us? We can't really add `call` as a function within our `methods block`, it isn't defined in our scope anywhere. Call exists as a low level primitive in the language.

We aren't without options. Let's take a look at how we can manage the `HAVOC` we're seeing now, in the next lesson!
