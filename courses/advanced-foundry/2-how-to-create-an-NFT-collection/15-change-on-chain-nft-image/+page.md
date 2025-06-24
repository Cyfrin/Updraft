---
title: SVG NFT Flipping the Mood
---

_Follow along the course with this video._

---

### SVG NFT Flipping the Mood

With the assurance that our tokenURI function is returning a correctly formatting string, for both our tokenURI itself _and_ our imageURI, I think we're ready to make this NFT dynamic!

Because our SVGs are on-chain, this affords us the ability to easily swap between them by calling a function. Let's write that function now.

Our first consideration should be that _only the owner_ of an NFT should be able to flip its mood. We can use the \_isApprovedOrOwner function, included within the ERC721 standard to verify this before our flipMood function execution.

```solidity
function flipMood(uint256 tokenId) public {
    if(!_isApprovedOrOwner(msg.sender, tokenId)){
        revert MoodNFT__CantFlipMoodIfNotOwner();
    }
}
```

Remember to create our new custom error at the start of the contract! `error MoodNFT__CantFlipMoodIfNotOwner();`.

From here, we'll just check if it NFT is happy, and if so, make it sad, otherwise we'll make it happy. This will flip the NFT's mood regardless of it's current mood.

With openzeppelin version 5.0.0 `_isApprovedOrOwner` was removed in favor of a new `_isAuthorized` function. However, this function has a downside. 

_WARNING: This function assumes that `owner` is the actual owner of `tokenId` and does not verify this assumption._

A more elegant solution is to check for approval and for the owner of the token separately. Therfore, we can use `getApproved()` and `ownerOf()` from openzeppelin contract in `ERC721.sol`.


```solidity
function flipMood(uint256 tokenId) public view {
    if(getApproved(tokenId) != msg.sender && ownerOf(tokenId) != msg.sender){
        revert MoodNFT__CantFlipMoodIfNotOwner();
    }

    if(s_tokenIdToMood[tokenId] == Mood.HAPPY){
        s_tokenIdToMood[tokenId] == Mood.SAD;
    } else{
        s_tokenIdToMood[tokenId] == Mood.HAPPY;
    }
}
```

### Wrap Up

This was easy enough, we've now got a function which an owner can use to flip the mood of their NFT. Wonderful!

In the next lesson we'll walkthrough the creation of our deployment script!
