---
title: The issue with IPFS vs HTTPS
---

_Follow along the course with this video._



---


In the world of **Non-Fungible Tokens (NFTs)**, several questions often arise about where and how these digital assets should be stored. In this blog post, we'll discuss two main topics: the potential issues related to storing NFTs on IPFS and how to use *abi encode packed* for creating on-chain SVGs.

## Part 1: What's The Issue with IPFS?

First things first: Let's discuss the **InterPlanetary File System (IPFS**), a popular decentralized storage system for NFTs.

You might wonder - Is it a good idea to host my precious NFTs on IPFS? Isn't it better than the commonly used Https and websites for storing digital assets?

Well, let's paint a clear picture for you.

### What's Wrong with Using Websites for Storing NFTs?

Many NFT creators use websites—with https—to store their tokens. However, should these websites go offline or worse, collapse, the NFT owner finds themselves with a broken JPEG link and a, dare we say, worthless NFT!

Despite the apparent risk, this storage option remains popular because it's significantly cheaper and comfortable to spin up an IPFS node and pin your data to the node.


### Why IPFS Might Not Be The Best Option Either

Compared to storing digital assets on a website, IPFS is undoubtedly a better choice. It is a decentralized storage platform, meaning that it allows users to maintain control over their data. Furthermore, on IPFS, anyone can pin the NFT data and keep the image accessible permanently.

However, IPFS has its pitfall. If a creator's IPFS node goes offline (like turning off their PC), it could result in an inaccessible file. That means anyone trying to access that NFT on platforms like MetaMask or OpenSea would stumble upon a broken JPEG image, not the intended item.

The fact that others can pin the NFT data offsets this inconvenience to an extent. But, how many users actually pin data and how reliable can that be?

This is where services like **Piñata Cloud** come into the picture. They keep your metadata for your stored NFTs up even if your IPFS node goes offline. Protocols like these provide an additional security blanket for your digital assets.


## Part 2: Putting On-chain SVGs to Work

While IPFS remains a viable option—despite its potential fallibility—enterprising NFT creators and users have found another way to store NFTs—on-chain SVGs.

"*So, what exactly is an SVG.*", you ask? Let's delve deeper.

### An Introduction to SVGs

Scalable Vector Graphics (SVGs) are a way to represent images and graphics. When stored on the blockchain, these images become 100% immutable and decentralized.

Creators can encode their NFTs as SVG types; thus, the entire image is stored directly on the blockchain. Even though this method may be a little more expensive than IPFS, it's a surefire way to ensure the longevity and accessibility of your precious NFTs.


### SVG NFT


<img src="/foundry-nfts/10-svg/svg1.png" style="width: 100%; height: auto;">

As illustrious as this looks, the actual visual output of SVGs can sometimes be unsightly. But remember, beauty lies in the eye of the beholder. The real allure of on-chain SVGs is the knowledge that your NFT remains accessible, immutable, and in its truest form, no matter what.


<img src="/foundry-nfts/10-svg/svg2.png" style="width: 100%; height: auto;">

By understanding how NFT storage works, you can ensure your digital assets' safety and longevity. The choice—whether IPFS, on-chain SVGs, or a comprehensive mix of both—is yours to make. Happy creating!

