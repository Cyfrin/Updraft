---
title: SVG NFT Flipping the Mood
---

_Follow along the course with this video._



---

## The "Flip Mood" Functionality

Imagine if we could interact with our NFTs and change their mood between happy and sad. It can add a new dimension to how we engage with our assets. Let's write a function to achieve this.

```js
function flipMood(uint256 tokenId) public {

        if (s_tokenIdToState[tokenId] == NFTState.HAPPY) {
            s_tokenIdToState[tokenId] = NFTState.SAD;
        } else {
            s_tokenIdToState[tokenId] = NFTState.HAPPY;
        }
    }
```

In this function, `tokenId` is a unique identifier for our NFT. We're stating that this function should be public, available for interaction.

But first, we should ensure that only the owner of the NFT can flip its mood, right?

## Ensuring Owner Access

Of course this is something just the owner of the NFT should be able to do. We can achieve this by adding a if statement to our function and a modifier to our contract.

```js
error MoodNft__CantFlipMoodIfNotOwner();

 if (!_isApprovedOrOwner(msg.sender, tokenId)) {
            revert MoodNft__CantFlipMoodIfNotOwner();
        }
```

Here, we use the 'require' statement to validate that it's the NFT owner attempting to flip the mood. If it isn't, the operation doesn't proceed, and we get a custom error stating, "MoodNFT: Can't flip mood if not owner".

## Closing thoughts

<img src="/foundry-nfts/14-flipping/flipping1.png" style="width: 100%; height: auto;">

Sprucing up our NFTs with a "Mood Flip" functionality provides a unique way for their owners to engage with these digital assets, marking a significant step forward in the NFT space. With the continuous evolution of this technology, the possibilities for future interaction and personalization are limitless. We're just getting started!
