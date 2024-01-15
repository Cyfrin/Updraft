---
title: Recap
---

_Follow along with this video._



---

Wow! We’ve traversed quite the technological terrain in this course. We've gained knowledge about NFTs, financial wallets, encoding, transaction viewing, decoding hex data and more. We have also had hands-on exercises to create a basic NFT with all the main functionalities necessary. So, let's do a quick run-through of all that we've covered in this course.

## Understanding NFTs

First and foremost, we demystified what an NFT actually is. NFT stands for Non-Fungible Token, a unique cryptographic token on blockchain that represents ownership or proof of authenticity of an item or asset, digital or physical.

We didn't stop at learning theoretically, we created our own basic NFT equipped with all the essential functions, such as the Token URI, which pointed to the metadata, and the Mint NFT function.

```js
  function mintNftOnContract(address basicNftAddress) public {
        vm.startBroadcast();
        BasicNft(basicNftAddress).mintNft(PUG_URI);
        vm.stopBroadcast();
    }
```

## Storing NFTs: On-chain vs IPFS

Next, we learnt about NFT storage, specifically the difference between storing the NFT metadata on-chain vs on IPFS. On-chain storage translates into a higher cost but boasts a more decentralized version. Storing on IPFS, on the other hand, is a bit cheaper.

Aside from IPFS and on-chain, we also briefly explored Filecoin and Rweave, two other decentralized storage platforms to consider. These offer a more decentralized, yet still cost-effective, solution than storing on the ETH mainnet.

## Beyond the Basics

Our learning journey didn't end there. We delved into more advanced matters like file reading from scripts, base 64 encoding, function signatures, function selectors, different encoding types and diverse methods for data encoding. We also mastered calling any function regardless of whether we have the interface, provided we have the function signature.

## Behind the Scenes of Transactions

Exploring further, we got a handle on the nitty-gritty of transactions on the blockchain and the data included when sending transactions. We also learnt how to view transactions on a block explorer and delve into the related input data.

A great example can be found when checking out previous transactions. On any block explorer, select a transaction, and join us as we navigate to more details to discover function information and input data.

<img src="/foundry-nfts/24-recap/recap1.png" style="width: 100%; height: auto;">

## The Journey Ahead

Reflecting on the lessons, it's clear we've learnt so much! And it is exciting to see how quickly the knowledge and skills are growing. As we move forward, you'll go through more advanced sections like the Foundry DFI stablecoin, upgrades, governance and introduction to security.

Take a well-deserved break, and when you're ready, tweet your excitement about your super advanced learnings. You're on the path towards becoming a phenomenal smart contract developer. I can't wait to see you in the next lessons.

_"By getting this far, you have learned some skills that even some top solidity devs don't even know. You are growing incredibly quickly."_

Good job, everyone! Until next time.
