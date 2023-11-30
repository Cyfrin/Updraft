---
title: Using IPFS
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/pX9UB0hqQPk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Hello and welcome back to our discussion on an exciting topic, IPFS, and the Token Uri in the realm of Non-Fungible Tokens (NFTs). After immersing ourselves in understanding these novel technology elements, let's put our knowledge into practice by exploring a marketplace for selling NFTs, such as OpenSea.

## Exploring NFTs on OpenSea

OpenSea, a marketplace nurturing a vibrant ecosystem for buying and selling NFTs, provides countless opportunities for examination. Here's how we do it:

1. Scroll down the OpenSea page and select any NFT you fancy. For this discussion, let's take a look at the Pudgy Penguins.
2. Click on the chosen NFT and navigate to its on-chain details.
3. Click through to the source code, scroll down to 'read contracts' and connect to web three.
4. Scroll further down to find the 'Token Uri' and get the ID for our chosen NFT.

Subsequently, we can see the metadata object that features 'attributes', 'description', and the 'name' piece. If we input this name piece into the address bar, we visualize the image of the NFT.

<img src="/foundry-nfts/5-using-ipfs/using1.png" style="width: 100%; height: auto;">

## Creating Your Own NFT Image

With your own image ready, the next step is uploading it using your IPFS node in your browser. Get the hash and use that as the image Uri for your own NFT.During the upload process to IPFS, both the image and the file (which contains the Uri of the image) must be uploaded. But remember, we're taking the path of least resistance here. We'll go on and use the Foundry IPFS Uri.

## Diving Deeper into Our NFT

Back to our NFT, instead of pasting the Token Uri for all our dogs to look the same, we're taking a more enticing route. We will allow people to customize their own Token Uri, hence choosing how their tokens will look.

Let's code this idea:

```js
    function mintNft(string memory tokenUri) public {
        s_tokenIdToUri[s_tokenCounter] = tokenUri;
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        if (!_exists(tokenId)) {
            revert BasicNft__TokenUriNotFound();
        }
        return s_tokenIdToUri[tokenId];
    }
```

And that's it! We've created a simple yet advanced NFT able to have its look customized by anyone.

Happy Ethereum Contracting!

Remember,

<img src="/foundry-nfts/5-using-ipfs/using2.png" style="width: 100%; height: auto;">
