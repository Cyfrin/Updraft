---
title: Finishing The Rule
---

_Follow along with this video:_

---

### Finishing The Rule

```js
rule calling_any_function_should_result_in_each_contract_having_the_same_state(method f){
    env e;
    calldataarg args;
    gasBadNftMarketplace.f(e, args);
    nftMarketplace.f(e, args);
}
```

With things as we've set them up, we'd expect our rule to call the same method on each of our in scope contracts ... except the [**Certora Documentation**](https://docs.certora.com/en/latest/docs/cvl/rules.html#parametric-rules) says this is wrong 😅.

![finishing-the-rule1](/formal-verification-3/25-finishing-the-rule/finishing-the-rule1.png)

So, this means we'll need to use a different variable for the method called on each contract. The catch is, we need to assure the **same** method is called on each, this is where we'll use a require to ensure the selectors of both arbitrary methods match.

```js
rule calling_any_function_should_result_in_each_contract_having_the_same_state(method f, method f2){
    require(f.selector == f2.selector);

    env e;
    calldataarg args;
    gasBadNftMarketplace.f(e, args);
    nftMarketplace.f2(e, args);
}
```

Our next step is to assure that our different contracts both begin in the same state. Since we'll be working with the 2 getter functions, `getListing` and `getProceeds`, we can configure these prior to function calls to accomplish this. Let's first add these to our methods block.

```js
methods {
    function getListing(address, uint256) external returns(INftMarketplace.Listing) envfree;
    function getProceeds(address) external returns(uint256) envfree;
    function _.onERC721Received(address, address, uint256, bytes) external => DISPATCHER(true);
    function _.safeTransferFrom(address,address,uint256) external => DISPATCHER(true);
}
```

> ❗ **NOTE**
> Because the getListing function returns a struct, we're using INftMarketplace, which is inherited by both `NftMarketplace` and `GasBadNftMarketplace`, as a base class to reference this return type.

With these added to our methods block, we can then write the require statements assuring these calls match between implementations, in our rule. We'll also need to declare variables to pass to our methods.

```js
rule calling_any_function_should_result_in_each_contract_having_the_same_state(method f, method f2){
    require(f.selector == f2.selector);

    env e;
    calldataarg args;
    address listingAddr;
    uint256 tokenId;
    address seller;

    require(gasBadNftMarketplace.getProceeds(seller) == nftMarketplace.getProceeds(seller));
    require(gasBadNftMarketplace.getListing(seller, tokenId).price == nftMarketplace.getListing(seller, tokenId).price); // we use .price because Certora doesn't understand structs!
    require(gasBadNftMarketplace.getListing(seller, tokenId).seller == nftMarketplace.getListing(seller, tokenId).seller); // we use .price because Certora doesn't understand structs!

    gasBadNftMarketplace.f(e, args);
    nftMarketplace.f2(e, args);
}
```

The last thing we should need to do is assert that all of our required values remain equal after our function calls are executed on both our contracts.

```js
gasBadNftMarketplace.f(e, args);
nftMarketplace.f2(e, args);

assert(
  gasBadNftMarketplace.getProceeds(seller) == nftMarketplace.getProceeds(seller)
);
assert(
  gasBadNftMarketplace.getListing(seller, tokenId).price ==
    nftMarketplace.getListing(seller, tokenId).price
);
assert(
  gasBadNftMarketplace.getListing(seller, tokenId).seller ==
    nftMarketplace.getListing(seller, tokenId).seller
);
```

With things in place, let's try to run the prover! I've included our total spec file so far below for reference.

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

// // The methods that we acknowledge in CVL
methods {

    // View Functions
    function getListing(address,uint256) external returns (INftMarketplace.Listing) envfree;
    function getProceeds(address) external returns (uint256) envfree;

    // // View Summary Example
    function _.onERC721Received(address, address, uint256, bytes) external => DISPATCHER(true);
    // Dispatcher Summary Example, means the safeTransferFrom function will only be called by an NftMock
    function _.safeTransferFrom(address,address,uint256) external => DISPATCHER(true);
}

ghost mathint listingUpdatesCount {
    init_state axiom listingUpdatesCount == 0;
}

ghost mathint log4Count {
    init_state axiom log4Count == 0;
}

// Can't do `s_listings[KEY address nftAddress][KEY uint256 tokenId]` since that returns a struct
hook Sstore s_listings[KEY address nftAddress][KEY uint256 tokenId].price uint256 price {
    listingUpdatesCount = listingUpdatesCount + 1;
}

// Hooks don't get applied sequentially.
hook LOG4(uint offset, uint length, bytes32 t1, bytes32 t2, bytes32 t3, bytes32 t4) uint v {
    log4Count = log4Count + 1;
}

/*//////////////////////////////////////////////////////////////
                                RULES
//////////////////////////////////////////////////////////////*/

// It shouldn't be possible to have more storage updates than events
invariant anytime_mapping_updated_emit_event()
    listingUpdatesCount <= log4Count;



rule calling_any_function_should_result_in_each_contract_having_the_same_state(method f, method f2){
    env e;
    calldataarg args;
    address listingAddr;
    address seller;
    uint256 tokenId;

    // They start in the same state
    require(gasBadMarketplace.getProceeds(seller) == marketplace.getProceeds(seller));
    require(gasBadMarketplace.getListing(listingAddr, tokenId).price == marketplace.getListing(listingAddr, tokenId).price);
    require(gasBadMarketplace.getListing(listingAddr, tokenId).seller == marketplace.getListing(listingAddr, tokenId).seller);

    // It's the same function on each
    require(f.selector == f2.selector);
    gasBadMarketplace.f(e, args);
    marketplace.f2(e, args);

    // They end in the same state
    assert(gasBadMarketplace.getListing(listingAddr, tokenId).price == marketplace.getListing(listingAddr, tokenId).price);
    assert(gasBadMarketplace.getListing(listingAddr, tokenId).seller == marketplace.getListing(listingAddr, tokenId).seller);
    assert(gasBadMarketplace.getProceeds(seller) == marketplace.getProceeds(seller));
}
```

</details>


![finishing-the-rule2](/formal-verification-3/25-finishing-the-rule/finishing-the-rule2.png)

Uh oh, what's happening here? The error is telling us we have a missing environment variable, even though we tagged these functions as `envfree`...

```js
function getListing(address,uint256) external returns (INftMarketplace.Listing) envfree;
function getProceeds(address) external returns (uint256) envfree;
```

Remember, these calls above are equivalent to:

```js
function currentContract.getListing(address,uint256) external returns (INftMarketplace.Listing) envfree;
function currentContract.getProceeds(address) external returns (uint256) envfree;
```

This doesn't align with how we're calling these functions in our rule:

```js
require(gasBadMarketplace.getProceeds(seller) ==
  marketplace.getProceeds(seller));
```

Because of this, we need to add the environment variable `e` to our function calls, telling `Certora` where this rule should be applied.

```js
rule calling_any_function_should_result_in_each_contract_having_the_same_state(method f, method f2){
    env e;
    calldataarg args;
    address listingAddr;
    address seller;
    uint256 tokenId;

    // They start in the same state
    require(gasBadMarketplace.getProceeds(e, seller) == marketplace.getProceeds(e, seller));
    require(gasBadMarketplace.getListing(e, listingAddr, tokenId).price == marketplace.getListing(e, listingAddr, tokenId).price);
    require(gasBadMarketplace.getListing(e, listingAddr, tokenId).seller == marketplace.getListing(e, listingAddr, tokenId).seller);

    // It's the same function on each
    require(f.selector == f2.selector);
    gasBadMarketplace.f(e, args);
    marketplace.f2(e, args);

    // They end in the same state
    assert(gasBadMarketplace.getListing(e, listingAddr, tokenId).price == marketplace.getListing(e, listingAddr, tokenId).price);
    assert(gasBadMarketplace.getListing(e, listingAddr, tokenId).seller == marketplace.getListing(e, listingAddr, tokenId).seller);
    assert(gasBadMarketplace.getProceeds(seller) == marketplace.getProceeds(e, seller));
}
```

With this adjustment in place, we can run the prover again.

![finishing-the-rule3](/formal-verification-3/25-finishing-the-rule/finishing-the-rule3.png)

It looks like it found a bunch of violations, but the CLI output doesn't provide many details, we should dig deeper into the calls and investigate. If we turn the the `Certora` UI, we can see that a huge number of our function calls failed their `sanity` check!

![finishing-the-rule4](/formal-verification-3/25-finishing-the-rule/finishing-the-rule4.png)

This is actually a product of how we're handling the functions in `GasBad.spec`.

```js
require(gasBadMarketplace.getProceeds(e, seller) ==
  marketplace.getProceeds(e, seller));
require(gasBadMarketplace.getListing(e, listingAddr, tokenId).price ==
  marketplace.getListing(e, listingAddr, tokenId).price);
require(gasBadMarketplace.getListing(e, listingAddr, tokenId).seller ==
  marketplace.getListing(e, listingAddr, tokenId).seller);
```

Because we're using `require` statements, instead of a `filter block`, `Certora` recognizes calls that don't satisfy these requires as unsound and thus flags them as failing our `sanity` check. If we look closely, we can see the calls with were successfully verified were those in which the function signatures match between our implementations, while those without matches fail this `sanity` check.

![finishing-the-rule5](/formal-verification-3/25-finishing-the-rule/finishing-the-rule5.png)

### Wrap Up

Despite the `sanity` errors, we can clearly see that any time the function selectors being called match, our rule is verifying the call. This test is indeed proving to us that the contracts are functioning identically under identical circumstances.

> ❗ **PROTIP**
> We _could_ set `"rule_sanity": "none"`, in our `GasBad.conf`, in order for these sanity checks to reflect `passed`, but we should always be cautious when removing these checks.
