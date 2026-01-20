---
title: Introduction
---

_Follow along with this video:_

---

### Introduction

Ok, welcome back to the final section of this Assembly, EVM, Op code and formal verification course.

Before we dive into what we can expect to cover in this section, I'm going to draw your attention to [**CodeHawks**](https://www.codehawks.com/) again. Once you complete this section you'll be well prepared for competitive formal verification audits, So keep an eye out!

### Gas Bad NFT Marketplace

For this section we'll be focusing on [**this code base**](https://github.com/Cyfrin/3-gas-bad-nft-marketplace-audit), and we'll be approaching things a little bit differently and primarily writing the Certora formal verification tests for this protocol.

At first glance, this seems like a fairly standard foundry code base. The Gas Bad NFT Marketplace is based off the [**Seaport code base**](https://github.com/ProjectOpenSea/seaport) (with a personal touch 😉). Seaport is an open source NFT marketplace which powers OpenSea!

Seaport had two distinct versions of their code base written, one in Solidity and one almost entirely in Assembly, they did this in an effort to hyper optimize the gas costs of transactions on the protocol

So, what the Gas Bad NFT Marketplace is doing, is similar to Seaport in that they've created `NFTMarketplace.sol` a minimalistic marketplace smart contract with basic expected functions such as `listItem`, `cancelListing`, `buyItem`, `updateListing` and `withdrawProceeds`. Something worth noting is that the NFTMarketplace actually takes ownership of a listed asset when `listItem` is executed.

In addition to the `NFTMarketplace.sol` contract they've also written `GasBadNFTMarketplace.sol` which is essentially the exact same code base, but much of the logic has been converted to assembly to save gas. Here's a comparison between the `listItem` functions of each:

**NFTMarketplace.sol**

```js
function listItem(address nftAddress, uint256 tokenId, uint256 price) external {
    // Checks
    if (price <= 0) {
        revert NftMarketplace__PriceMustBeAboveZero();
    }

    // Effects (Internal)
    s_listings[nftAddress][tokenId] = Listing(price, msg.sender);
    emit ItemListed(msg.sender, nftAddress, tokenId, price);

    // Interactions (External)
    IERC721(nftAddress).safeTransferFrom(msg.sender, address(this), tokenId);
}
```

**GasBadNFTMarketplace.sol**

```js
function listItem(address nftAddress, uint256 tokenId, uint256 price) external {
    // Checks
    if (price <= 0) {
        revert NftMarketplace__PriceMustBeAboveZero();
    }

    // Effects (Internal)
    s_listings[nftAddress][tokenId] = Listing(price, msg.sender);

    // emit ItemListed(msg.sender, nftAddress, tokenId, price);
    assembly {
        // This is the data
        mstore(0x00, price)
        log4(
            0x00,
            0x20,
            // keccak256("ItemListed(address,address,uint256,uint256)")
            0xd547e933094f12a9159076970143ebe73234e64480317844b0dcb36117116de4,
            caller(),
            nftAddress,
            tokenId
        )
    }

    // Interactions (External)
    IERC721(nftAddress).safeTransferFrom(msg.sender, address(this), tokenId);
}
```

A major challenge of ours in this section will be assuring that these two code bases are _actually_ doing the same thing, and we're going to use formal verification to mathematically prove this to be true (or not!).

I see this methodology as being a great way for protocols to be gas optimized in the future. A contract is written in solidity, and then written again in a more gas efficient way. The two contracts can be compared to assure they are behaving identically and that the cheaper execution is valid.

The Gas Bad NFT Marketplace code base contains Certora configuration and spec files already, but this is what we're going to be trying to replicate together. You can use these files as an answer key to check your work, or if you get stuck.

### Wrap Up

Ok, let's get warmed up and learn some new Certora tricks with the NFTMock.spec. Once we're done there we'll move into GasBadNFT.spec and put our formal verification skills to the test by verifying these two code bases work the same.

We'll get things set up, in the next lesson. See you there!
