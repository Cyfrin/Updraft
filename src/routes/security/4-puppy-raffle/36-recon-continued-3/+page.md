---
title: Recon Continued 3
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://vimeo.com/889508879/c758535052?share=copy" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Manual Code Review: The Puppy Raffle Codebase

Hello folks, in our continuous journey to explore the world of code, let's dive into a manual code review of the Puppy Raffle codebase. We're going to sift through the codebase together and try to understand how it works, pointing out areas of concern.

## Change Fee Address Function

To begin with, let's look into the `changeFeeAddress` function. This function ensures that only the contract owner can make changes to the contract's fee address. The modifier `onlyOwner` that is used in this function is sourced from the OpenZeppelin library. By inspecting these functions, it becomes apparent that they do perform the required tasks.

```javascript
require(owner == msg.sender);
```

Set the new fee address and check whether the fee address is used where it is supposed to. An event is then emitted.

It's worth noting that there may be some events missing from other functions, such as 'Withdraw Fees' and 'Select Winner'. This sparks a query for our manual audit of whether there are events missing elsewhere in the code that need to be added.

## Active Player Function

```javascript
    function isActivePlayer() public view returns (bool) {
        return activePlayers[msg.sender];
    }
```

The function above is supposed to return true if the message sender is an active player. On attempting to identify its use within the protocol, we realize it isn't utilized anywhere. In the face of this finding, we add it to our audit report emphasizing the unused function may not contribute much impact or likelihood but is a wastage of gas and redundant clutter in our codebase.

## Base URI and NFT Stuff

![](https://cdn.videotap.com/x2QzHSr5HPaTEkOKw0xW-194.4.png)

Next up is our base URI function that's tied to the creation of SVG-based NFTs. This function is critical for anyone wanting to comprehend NFTs and their role within the Defi and Web3 ecosystems. Understanding how NFTs operate under the hood is crucial for any security researcher.

The function as we see it here is essentially a classic SVG. It has an override for OpenZeppelin's method, checks if a token exists and then event tickets are mapped to rarity levels.

```javascript
function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), "PuppyRaffle: URI query for nonexistent token");
    uint256 rarity = tokenIdToRarity[tokenId];
    string memory imageUri = rarityToUri[rarity];
    string memory rareName = rarityToName[rarity];
    ...
    }
```

This function deserves a more in-depth exploration along with cross-checking and verifying aspects like Rarity levels, URI mapping, token Id's, among other things.

## In Retrospect

Having swept over the codebase once, we notice several areas deserving of keen attention, for instance, the sparing use of state variables and event emitters. Despite the detailed walkthrough, the first pass through the Puppy Raffle codebase has thrown up a host of questions to be answered as part of our codebase review. As we explore these points, we might end up with even more questions or uncover potential vulnerabilities.

Take the challenge and dive deeper into the codebase, explore it thoroughly until you get a complete understanding. You can start trying to answer the questions we've stirred up, or even better, stir up a few of your own. It's a fantastic opportunity to practise your debugging skills and understand the codebase better.

And if you choose not to, that's okay too! There's always more to learn and more adventures to embark on, in the vast world of coding. Keep exploring!
