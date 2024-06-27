---
title: What is a NFT?
---

_Follow along the course with this video._



---

Hello dear students! Today, we'll be diving deep into Non-Fungible Tokens (NFTs) from the perspective of a Python novice while also embarking on an ultimate NFT tutorial. Our journey will help unravel the inquisitiveness in you, becoming experts in blockchain and cryptocurrency technology.

## Defining NFTs

NFTs, called `ERC721`s, are the latest craze in the digital world as they are considered a prized possession on the Ethereum platform. For the uninitiated, NFT stands for Nonfungible token and is a token standard similar to ERC 20. You might recognize `ERC20s` by familiar names like Link, Ave Maker, which are found on the Ethereum chain.

<img src="/foundry-nfts/2-what-is/whatis1.png" style="width: 100%; height: auto;">

The sparkle of NFTs lies in their unique nature. Unlike ERC 20s where one token is always equivalent to another same token, NFT or nonfungible token is unique and not interchangeable with any other token of its class. To simplify, consider this: one dollar is equivalent to another dollar. However, this is not the case in NFTs.

<img src="/foundry-nfts/2-what-is/whatis2.png" style="width: 100%; height: auto;">

## The Unparallel Power of Art in NFTs

NFTs aren't limited in scope. They can be deemed as a digital version of art pieces possessing an incorruptible and permanent history. Of course, their application isn't only confined to art. You can enrich them with stats, make them do battle, or do unique stuff with them. For instance, NFTs are viewed, bought, and sold on various platforms like [OpenSea](https://opensea.io/) or [Rarible](https://rarible.com/).

Though one might consider NFTs ridiculous initially (I too was in that boat once!), their value becomes clear when pondered over their benefits. Artists often face attribution and compensation problems. With NFTs, artists can be adequately compensated for their contributions through a decentralized royalty mechanism, which is fair, transparent, and free from intermediary service.

## Exploring ERC721 and ERC20

Now, let's delve further into the NFT standards: the ERC 721 standard or the NFT standard. They serve as the foundation for NFTs. However, the semi-fungible token standard, the ERC 1155, isn't the focus of our discussion today but is still worth exploring.

The key differences between a 721 and ERC 20 lie in the mapping between an address and its holdings. ERC 20s have a simple mapping compared to 721’s that holds unique token IDs. Each token is unique, with a unique owner and a 'token Uri', defining what each asset looks like.

If you know Ethereum, you are aware of the high gas prices and expensive costs of storing a lot of space. This is where 'Token Uri' enters the scene. They are a unique indicator of what assets or tokens look like, and the characteristics of these tokens. A regular 'token uri' returns a format with the name, image location, description, and below mentioned attributes.

## The Dilemma: On-chain Vs. Off-chain Metadata

There's often discourse on whether to store NFT data on-chain or off-chain. Off-chain storage is simpler and cheaper, with options like [IPFS](https://ipfs.io/) or even a centralized API. However, this come with risks of losing the image and all data associated with the NFT if the API goes down.

<img src="/foundry-nfts/2-what-is/whatis3.png" style="width: 100%; height: auto;">

## Getting Hands-on with NFT Deployment

If you're a newbie in NFTs and all that we've discussed feels a bit overwhelming, do not worry. Here's a simplified process for you: add your image to IPFS, add a metadata file pointing to that image file on IPFS, and grab that Token Uri and set it as your NFT.

In short, understanding NFTs and its various characteristics and usages can render you capable of building creative NFTs and games with unique properties. And most importantly, it authenticates the NFTs as the properties will always remain on the chain.

Stay tuned for more engaging content about NFTs, Blockchain, Ethereum, and more. Let's continue on this exciting journey of digital innovations together!
