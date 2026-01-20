---
title: Formal Verification Game Plan
---

_Follow along with this video:_

---

### Formal Verification Game Plan

In this lesson we'll map out an explicit game plan for how we're going to approach formally verifying this protocol. Open up your README and let's jot some steps down!

### Game Plan

1. Warm up by verifying some stats of our NFTMock
   1. Sanity Checks
   2. Total Supply is never negative
   3. Minting mints 1 NFT
   4. Parametric Example
2. Formally Verify a lot of stuff for GasBadNFTMarketplace
   1. Anytime a mapping is updated, we emit an event
   2. Calling ANY function on GasBadNFTMarketplace or NFTMarketplace, leaves the protocol in the same state

Through these goals we're going to learn lots pertaining to the process of formally verifying contracts and comparing two implementations through equivalency tests.

### Wrap Up

With a plan in place, let's get started. As mentioned, we'll warm up by verifying some things on NFTMock.sol by using Certora. I want you to get lots of practice employing these skills and leveraging these tools because as I always say:

**_Repetition is the mother of skill._**

I'm excited to get started, see you in the next lesson!
