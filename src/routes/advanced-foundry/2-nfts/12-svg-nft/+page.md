---
title: SVG NFT Intro
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/Xwt7MXrYIg4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Creating SVG NFTs is a fascinating endeavor, especially if these NFTs can change their mood! In this practical guide, we'll build our dynamic SVG NFT—an innovative NFT whose image changes and whose data is 100% stored on-chain.

## What Are We Building?

Our ultimate task is to create a mood-changing NFT—bam, a Mood NFT! That's right, we're developing an NFT that can switch from happy to sad and vice versa.

Our Mood NFT is housed with an intelligent function we call "Flip Mood." This function alternates the mood of our NFT—if its mood is happy, it turns sad, and vice versa. As per the mood, our NFT will either display a happy or sad SVG that we will store on-chain.

## Setting the Mood

Time to roll up our sleeves and kick-off our Mood NFT project. Open up your SRC, create a new file—let's name it `MoodNft.sol`. Remember, before we start writing our contract, we need to define the SPDX license Identifier (MIT) and establish which version of Solidity we're working with (0.8.18 in our case). Now, let's begin to define our `MoodNft` contract.

```js
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
contract MoodNft {}
```

Our NFT contract will contain several vital elements from the basic NFT, so let’s take some of that and import it into our new folder. Next, our NFT will be defined as an ERC721 token. Sustaining the moods (happy and sad SVGs) of our NFT is critical, so we'll pass these mood SVGs in our constructor. You can make your personalized Sad SVG. For this tutorial, we'll use this happy SVG.

```js
constructor(
        string memory sadSvgUri,
        string memory happySvgUri
    ) ERC721("Mood NFT", "MN") {}

```

## Mood Tracking: Creat a Token Counter

A token counter is an essential part of our Mood NFT. Hence, we need to create a private token counter `uint256 private s_tokenCounter`. We'll initiate the token counter in the constructor to zero.

```js
 uint256 private s_tokenCounter;

constructor(
        string memory sadSvgUri,
        string memory happySvgUri
    ) ERC721("Mood NFT", "MN") {
        s_tokenCounter = 0;
    }

```

Let's save these SVGs as `string private s_sadSvgUri` and `string private s_happySvgUri`, and pass them:

```js
string private s_sadSvgUri;
string private s_happySvgUri;
```

## Minting the Mood NFT

Our mood NFT is now ready for anybody to mint! We'll define a public function `mintNFT()` that enables anyone to mint their Mood NFT. This function will contain a `safemint` statement that provides the `msg.sender` their Token ID. Also, remember to increment the token counter so that every new token gets a unique ID.

```js
  function mintNft() public {
        // how would you require payment for this NFT?
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
        emit CreatedNFT(s_tokenCounter);
    }
```

Finally, we need to define what our NFT will look like. This is done using the `TokenURI` function, which takes the token ID as a parameter and returns a string memory.

```js
function tokenURI(uint256 _tokenId) public view override returns (string memory) {}
```

And that's a wrap! Developing mood-changing NFTs can be as fun as it sounds. Now it's your turn to create your mood NFT and bring your crazy, creative ideas to life!
