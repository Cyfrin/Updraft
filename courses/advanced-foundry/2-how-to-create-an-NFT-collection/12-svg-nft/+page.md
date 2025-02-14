---
title: SVG NFT
---

_Follow along the course with this video._

---

### SVG NFT

Ok, we've gained lots of context and understand about data storage in general and the benefits of `SVGs` specifically. Let's begin creating our very own dynamic `MoodNFT` with its `SVG` art stored on-chain.

At the core of the NFT we'll build is a `flipMood` function which allows the owner to flip their NFT between happy and sad images.

::image{src='/foundry-nfts/12-svg-nft/svg-nft1.png' style='width: 100%; height: auto;'}

Start with creating the file `src/MoodNft.sol` and filling out the usual boilerplate. We're definitely getting good at this by now.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MoodNft is ERC721 {
    constructor() ERC721("Mood NFT", "MN"){}
}
```

Looking good! We want to store the `SVG` art on chain, we're actually going to pass these to our `constructor` on deployment.

```solidity
constructor(string memory sadSvg, string memory happySvg) ERC721("Mood NFT", "MN"){}
```

We know we'll need a `tokenCounter`, along with this let's declare our `sadSvg` and `happySvg` as storage variables as well. All together, before getting into our functions, things should look like this:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MoodNft is ERC721 {
    string private s_sadSvg;
    string private s_happySvg;
    uint256 private s_tokenCounter;

    constructor(string memory sadSvg, string memory happySvg) ERC721("Mood NFT", "MN"){
        s_tokenCounter = 0;
        s_sadSvg = sadSvg;
        s_happySvg = happySvg;
    }
}
```

Now we need a `mint` function, anyone should be able to call it, so it should definitely be `public`. This shouldn't be anything especially new to us so far.

```solidity
function mintNft() public {
    _safeMint(msg.sender, s_tokenCounter);
    s_tokenCounter++;
}
```

And now the moment of truth! As we write the `tokenURI` function, we know this is what defines what our NFT looks like and the metadata associated with it. Remember that we'll need to `override` this `virtual` function of the `ERC721` standard.

```solidity
function tokenURI(uint256 tokenId) public view override returns (string memory){}
```

### Wrap Up

Our on-chain, dynamic, `SVG NFT` is slowly coming to life! In the next lesson, let's walk through the contents of our `tokenURI` function and how we can encode our `SVGs` in a way such that they can be reasonably stored on the blockchain.

See you there!
