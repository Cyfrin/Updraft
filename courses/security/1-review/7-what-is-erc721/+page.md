---
title: What is an ERC721/NFT?
---

_Follow along the with the video_

---

The buzz around non-fungible tokens (NFTs) or `ERC721s` lately is becoming impossible to ignore, especially within the spheres of art and blockchain technology. NFTs, originally authored on the Ethereum platform, present a unique form of digital asset that holds the potential to revolutionize the world of art, gaming and beyond. But what exactly are they?

## Understanding NFTs

NFT stands for non-fungible token. Unlike `ERC20` tokens, such as LINK, DAI etc, each NFT is entirely unique, and no two tokens can be interchanged.

To better understand, let's look at a simple analogy. Think of a dollar bill; it holds the same value as any other dollar out there. You can freely exchange a dollar for another, and their value remains the same. This makes them _fungible_. Contrastingly, an NFT is the complete opposite. It could be likened to a unique Pokemon. Each Pokemon is unique and no two Pikachu's are exactly the same.

As a more relatable analogy, consider an NFT as a distinct piece of art, trading card, or any other one-of-a-kind item. So to sum up, NFTs are unique, non-interchangeable tokens best thought of as indestructible digital pieces of art with a permanent history detailing their ownership and alterations.

## The Many Uses of NFTs

Although NFTs are mostly associated with art, they extend beyond that. They can be assigned any property, or manipulated in any way you like, thanks to the underlying smart contract technology.


![block fee](/security-section-1/6-erc721s/erc721s1.png)

![block fee](/security-section-1/6-erc721s/erc721s2.png)

These unique tokens are deployed on a smart contract platform and can be traded on numerous NFT platforms such as [OpenSea](https://opensea.io/) or [Rarible](https://rarible.com/). While these decentralized marketplaces provide user-friendly interfaces for trading NFTs, one could just as easily buy and sell outside of them.

## NFTs: Bridging the Gap for Artists

Many might find the whole concept of NFTs puzzling. Isn't art meant to be tangible? But consider this: artists often aren't adequately compensated for their work. Their creations get copied and shared with zero attribution; they simply lose ownership. But with NFTs, artists can finally get the recognition, and more importantly, the compensation they deserve.

> "Having a decentralized royalty mechanism, or some type of mechanism where these artists can get accurately comped for what they're doing, is crucial."

Yes, NFTs can be a solution to current issues plaguing the art industry by creating an auditable and transparent trail of royalties without the need for any centralized service.

## The Role of the ERC721 Standard

`ERC721`, or the NFT standard, forms the basis of it all. To keep it simple, the main distinction between `ERC721` and `ERC20` tokens is that each `ERC721` token has a unique Token ID, an attribute that indirectly represents the asset linked to that token.

To illustrate the unique attributes of an asset, let's say a piece of art or a character in a game, NFTs rely on metadata and `Token URIs`. Due to the prohibitively high gas prices on Ethereum, it's quite impractical to store these intricate art pieces directly on the chain.

## How Token URIs Work

The solution? The developers introduced what is known as a `Token URI` in the NFT standard—a universally unique identifier that provides information about what an asset (or token) looks like, and the attributes of that token. Data storage platforms like IPFS or a centralized API usually provide this `Token URI` through a simple API call.

The `Token URI` should return data in a preset format, including the name, image location, description, and any other attributes that add to the uniqueness of the token.

However, storing metadata off-chain does come with its challenges. If the centralized system hosting these assets crashes, every link associated with your NFT is lost. Modern discussions in the NFT world often debate the pros and cons of on-chain metadata versus off-chain metadata. Regardless of the limitations, there's something truly groundbreaking about NFTs, and it's exciting to envision where this technology could lead us.
