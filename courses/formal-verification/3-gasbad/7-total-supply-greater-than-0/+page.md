---
title: totalSupply > 0
---

_Follow along with this video:_

---

### totalSupply > 0

Now that things are set up and we've performed our sanity check, let's start writing some of the invariants we want to apply to our NftMock contract. Don't lose sight of our game plan!

1. Warm up by verifying some stats of our NFTMock
   1. Sanity Checks
   2. Total Supply is never negative
   3. Minting mints 1 NFT
   4. Parametric Example
2. Formally Verify a lot of stuff for GasBadNFTMarketplace
   1. Anytime a mapping is updated, we emit an event
   2. Calling ANY function on GasBadNFTMarketplace or NFTMarketplace, leaves the protocol in the same state

`totalSupply` is a perfect simple test case for our formal verification. It's a single function that the prover can check like mad. Let's write out our methods block and invariant in `NftMock.spec`.

```js

/*
* Verification of NftMock
*/

methods {
    function totalSupply() external returns uint256 envfree;
}

invariant totalSupplyIsNotNegative(){
    totalSupply() >= 0;
}

// rule sanity {
//     satisfy true;
// }
```

Now we just need to run the prover.

```bash
certoraRun ./certora/conf/NftMock.conf
```

This to me is the real power of Certora. We didn't need to do any major set up, we didn't have to worry about contract deployments, nothing. A simple one liner defining our invariant is all we need.

You may receive an error at this point when you run the prover as it may detect an `unwinding loop` in our contract. The prover is detecting possible `reentrancy` through the `onERC721Received` function. We know this to be unimpactful in our code base, so we can avoid this error through further adjusting our `NftMock.conf` file.

```js
{
    "files": [
    "./test/mocks/NftMock.sol"
    ],
    "verify": "NftMock:./certora/spec/NftMock.spec",
    "wait_for_results": "all",
    "msg": "Verification of NftMock",
    "rule_sanity": "none",
    "optimistic_loop": true
}
```

By sidestepping this loop being detected we should see things pass...

![total-supply-greater-than-01](/formal-verification-3/6-total-supply-greater-than-0/total-supply-greater-than-01.png)

...and our job passes without errors! Although, if we turn our `rule_sanity` back to `basic`, what do you think is going to happen?

![total-supply-greater-than-02](/formal-verification-3/6-total-supply-greater-than-0/total-supply-greater-than-02.png)

### Wrap Up

We failed our vacuity check! Of course totalSupply is going to be positive, it's a uint256 based on the length of an array! Kind of a silly thing to verify, but an amazing test for us to build our familiarity with the process nonetheless.

In the next lesson we'll try something with a little more meat and verify that minting an NFT only mints a single NFT.

Let's go!
