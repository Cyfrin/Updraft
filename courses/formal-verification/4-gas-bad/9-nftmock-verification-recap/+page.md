---
title: NftMock Verification Recap
---

_Follow along with this video:_

---

### NftMock Verification Recap

Welcome back! Now that we've warmed up with `NftMock`, let's take a quick minute to recap the concepts and methodologies we've covered so far. Things are going to ramp up when we apply these ideas to `Gas Bad NFT Marketplace`.

The first thing we did with Certora was walk through another simple example of invariants. Through an invariant specification we verified that NftMock's totalSupply will never be negative.

```js
invariant totalSupplyIsNotNegative()
    totalSupply() >= 0;
```

In so doing we were introduced to configuring `rule_sanity` and how this can be used to strengthen our sanity checks by informing us of our tests `vacuity`. A `vacuous test` is defined as one which is self-evident, a tautology, or one that ultimately isn't verifying anything of value.

```js
{
    "files": [
        "./test/mocks/NftMock.sol"
    ],
    "verify": "NftMock:./certora/spec/NftMock.spec",
    "wait_for_results": "all",
    "msg": "Verification of NftMock",
    "rule_sanity": "basic", // none
    "optimistic_loop": true
}
```

We also walked through an example of a simple rule in which we verified that only 1 NFT was minted each time the mint function is called. In this process we explored working directly with the environment variable `e` as well as learnt about using currentContract to reference the file currently being "proved".

```js
rule minting_mints_one_nft() {
// Arrange
    env e;
    address minter;
    require e.msg.value == 0;
    require e.msg.sender == minter;
    mathint balanceBefore = nft.balanceOf(minter);

    // Act
    currentContract.mint(e);

    // Assert
    assert to_mathint(nft.balanceOf(minter)) == balanceBefore + 1, "Only 1 NFT should be minted";
}
```

Lastly, we learnt about the strength of parametric rules and how they leverage ambiguous functions as input parameters. This configures the prover to effectively call _any_ function in the scene with the provided parameters, at each step assuring that the assertion isn't broken. We learnt that these parametric rules function similarly to our static fuzz tests, in this way!

```js
rule no_change_to_total_supply(method f) {
    uint256 totalSupplyBefore = totalSupply();

    env e;
    calldataarg arg;
    f(e, arg);

    assert totalSupply() == totalSupplyBefore, "Total supply should not change!";
}
```

### Wrap Up

We've covered a lot in this section already, but this has just been the warm up! In the next lesson we'll start on getting set up to formally verify the real deal: `GasBadNftMarketplace`!

See you soon!
