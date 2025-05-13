---
title: Recap
---

_Follow along with this video._

---

### Recap

Guess what. You just learnt an insane amount in this section. Let's run down the things we covered.

We started off by learning what a `Non-fungible token (NFT)` is. And we explored this technology by creating our very own `BasicNFT`.

::image{src='/foundry-nfts/24-recap/recap1.png' style='width: 100%; height: auto;'}

While going through this process, we learnt all about options for decentralized data storage including services like

- [**IPFS**](https://ipfs.tech/)
- [**Pinata**](https://www.pinata.cloud/)
- [**NFT Storage**](https://nft.storage/)
- [**Web3 Storage**](https://web3.storage/)

We also learnt that we could store data and image directly on the blockchain by creating a dynamic, on-chain `SVG NFT` that we can use to reflect our mood!

::image{src='/foundry-nfts/24-recap/recap2.png' style='width: 100%; height: auto;'}

While we're able to store this data on chain, it's important to note that it may become prohibitively expensive from the perspective of gas and computation. We proposed protocols such as [**Filecoin**](https://filecoin.io/) and [**Arweave**](https://arweave.org/) which serve to mitigate these concerns in decentralized data storage.

Beyond `NFTs` we learnt a great deal about encoding!

We used `base64` encoding to encode our `tokenURI` data to store on-chain.

We explored how a compiled contract is broken into not just an ABI, but a bytecode component and that it's this encoded, binary, bytecode that is read and understood by the EVM.

In addition to this we learnt how to encode our transaction data into this bytecode and how we can make low-level calls using this encoded data. We learnt the power of `abi.encode/abi.decode/abi.encodePacked` and how these globally available methods can allow us fine control over our interactions with the `EVM` and our transactions.

As a result of our greater understanding of how encoded data is used in EVM transactions, we also gained the ability to verify any transaction sent to our wallet and to keep ourselves safe from malicious ones.

::image{src='/foundry-nfts/24-recap/recap3.png' style='width: 100%; height: auto;'}

### Wrap Up

Now's a great time to take a break. You've made it through another massive section and just by getting this far you've gained skills that only a small selection of Solidity devs have.

You're growing very quickly.

We've only got a few more sections that remain:

- DeFi
- Upgradeable Contracts
- Introduction to Security

The next lesson in particular is going to really put you to the test. So, take your break, and I'll see you when you get back!

🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊

NFT Challenge

[**Sepolia**](https://sepolia.etherscan.io/address/0x93c7A945af9c453a8c932bf47683B5eB8C2F8792#code)
